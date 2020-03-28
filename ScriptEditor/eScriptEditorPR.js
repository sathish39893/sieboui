/*************************************************************
*   eScript Editor
*	Description: a intutive script editor for eScript in Siebel
*	Author : Sathish Panthagani
***************************************************************/
if (typeof(SiebelAppFacade.eScriptEditorPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.eScriptEditorPR");
 define("siebel/custom/ScriptEditor/eScriptEditorPR", ["siebel/phyrenderer","3rdParty/ace/ace","3rdParty/ace/worker-javascript","3rdParty/ace/mode-javascript","3rdParty/ace/theme-twilight","3rdParty/ace/ext-static_highlight"],
  function () {
   SiebelAppFacade.eScriptEditorPR = (function () {
	
	var editor;
	
    function eScriptEditorPR(pm) {
     SiebelAppFacade.eScriptEditorPR.superclass.constructor.apply(this, arguments);
    }
	
    SiebelJS.Extend(eScriptEditorPR, SiebelAppFacade.PhysicalRenderer);

    eScriptEditorPR.prototype.Init = function () {
     SiebelAppFacade.eScriptEditorPR.superclass.Init.apply(this, arguments);
	 this.AttachPMBinding("isDataChanged", invokeScriptEditor);
    }

	function invokeScriptEditor(){
		var pm = this.GetPM();
		var controls = pm.Get("GetControls");
		var FieldValue = pm.ExecuteMethod("GetFieldValue",controls["Script"]);		 
		//SiebelJS.Log("Script Field Value",FieldValue); 
		editor.setValue(FieldValue,1);
	}
	
    eScriptEditorPR.prototype.ShowUI = function () {
     SiebelAppFacade.eScriptEditorPR.superclass.ShowUI.apply(this, arguments);
	 
		 var pm = this.GetPM();
		 var controls = pm.Get("GetControls");
		 var fullId = pm.Get("GetFullId");
		 var inpName = controls["Script"].GetInputName();
		 
		 var sHtml = `<div id="script-editor" style="width: 90%;height: 500px;"></div>`;
		 $(`textarea[name='${inpName}']`).replaceWith(sHtml);
		 
		// invoke ace editor
		 editor = ace.edit("script-editor");
		 editor.setTheme("ace/theme/twilight");
		 editor.session.setMode("ace/mode/javascript");
		 //editor.setOption("useWorker",false);
		 
		 editor.getSession().on("change", function(){
			 var scriptVal = editor.getValue();
			 SiebelApp.S_App.GetBusObj().GetBusCompByName("Business Service Script").SetFieldValue("Script",scriptVal);
		 })

    }

    eScriptEditorPR.prototype.EndLife = function () {
     SiebelAppFacade.eScriptEditorPR.superclass.EndLife.apply(this, arguments);
	 editor.destroy();
    }

    return eScriptEditorPR;
   }()
  );
  return "SiebelAppFacade.eScriptEditorPR";
 })
}
