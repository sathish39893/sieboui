//Regenerate using:https://duncanford.github.io/prpm-code-generator/?prpm=PR&object=DesktopList&name=OTEFindAllResults&userprops=&comments=No&logging=No
if (typeof(SiebelAppFacade.FindAllResultsCustomPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.FindAllResultsCustomPR");
 define("siebel/custom/FindAllResultsCustomPR", ["siebel/findallresultsprenderer","siebel/jqgridrenderer"],
  function () {
   SiebelAppFacade.FindAllResultsCustomPR = (function () {

    function FindAllResultsCustomPR(pm) {
     SiebelAppFacade.FindAllResultsCustomPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(FindAllResultsCustomPR, SiebelAppFacade.FindAllResultsPRenderer);

    FindAllResultsCustomPR.prototype.Init = function () {
     SiebelAppFacade.FindAllResultsCustomPR.superclass.Init.apply(this, arguments);
    }

    FindAllResultsCustomPR.prototype.ShowUI = function () {
     SiebelAppFacade.FindAllResultsCustomPR.superclass.ShowUI.apply(this, arguments);
	 console.log("inside ShowUI");
    }

    FindAllResultsCustomPR.prototype.BindData = function (bRefresh) {
     SiebelAppFacade.FindAllResultsCustomPR.superclass.BindData.apply(this, arguments);
    }

    FindAllResultsCustomPR.prototype.BindEvents = function (j) {
		
	 var g = this.GetPM();
			switch (j) {
			case "drilldown":
				var f = 0;
				for (f = 0; f < 10; f++) {
					var h = "URL" + f;
					var k;
					$("#" + h + "").bind("click", {
						ctx: this
					}, function (i) {
						k = i.currentTarget.getAttribute("value");
						var astId = i.currentTarget.text;
						console.log("AssetId:"+astId);
						SiebelApp.S_App.SetProfileAttr("AssetId",astId);
						var sId = SiebelApp.S_App.GetProfileAttr("AssetId");
						console.log("sID"+sId);
						SiebelApp.S_App.GotoView("", "", k, "")
					})
				}
				break;
			default:
				SiebelAppFacade.FindAllResultsCustomPR.superclass.BindEvents.apply(this, arguments);
			}
     
    }

    FindAllResultsCustomPR.prototype.EndLife = function () {
     SiebelAppFacade.FindAllResultsCustomPR.superclass.EndLife.apply(this, arguments);
    }

    return FindAllResultsCustomPR;
   }()
  );
  return "SiebelAppFacade.FindAllResultsCustomPR";
 })
}
