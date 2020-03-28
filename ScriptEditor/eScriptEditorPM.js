/*************************************************************
*   eScript Editor
*	Description: a intutive script editor for eScript in Siebel
*	Author : Sathish Panthagani
***************************************************************/
if (typeof(SiebelAppFacade.eScriptEditorPM) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.eScriptEditorPM");
 define("siebel/custom/ScriptEditor/eScriptEditorPM", ["siebel/pmodel"],
  function () {
   SiebelAppFacade.eScriptEditorPM = (function () {

    function eScriptEditorPM(pm) {
     SiebelAppFacade.eScriptEditorPM.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(eScriptEditorPM, SiebelAppFacade.PresentationModel);

    eScriptEditorPM.prototype.Init = function () {
     SiebelAppFacade.eScriptEditorPM.superclass.Init.apply(this, arguments);
	 this.AddProperty("isDataChanged", "");
     this.AddMethod("ShowSelection", SelectionChange, { sequence: false, scope: this });
    }
	
	function SelectionChange() {
		var controls = this.Get("GetControls");
		var control = controls["Script"];
		var value = this.ExecuteMethod("GetFieldValue", control);
		this.SetProperty("isDataChanged", (value ? true : false));
    }

    eScriptEditorPM.prototype.Setup = function (propSet) {
     SiebelAppFacade.eScriptEditorPM.superclass.Setup.apply(this, arguments);
    }

    return eScriptEditorPM;
   }()
  );
  return "SiebelAppFacade.eScriptEditorPM";
 })
}
