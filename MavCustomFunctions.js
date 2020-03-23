//Custom functions to support for common utilities
if (typeof(SiebelAppFacade.MavCustomFunctions) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.MavCustomFunctions");

   SiebelAppFacade.MavCustomFunctions = (function () {

	function MavCustomFunctions(){
		
	}
	MavCustomFunctions.SetProfileAttr = function(AttrName,AttrValue){
		 //console.log("MavCustomFunctions:setProfileAttr:  attribute name and value",AttrName,AttrValue);
		 let inPS = SiebelApp.S_App.NewPropertySet();
		 let outPS = SiebelApp.S_App.NewPropertySet();
		 
		 inPS.SetProperty("Profile Attribute Name",AttrName);
		 inPS.SetProperty("Profile Attribute Value",AttrValue);
		 let bsPMT = SiebelApp.S_App.GetService("SIS OM PMT Service");
		 
		 bsPMT.InvokeMethod("Set Profile Attribute",inPS,outPS);
	}

    return MavCustomFunctions;
   }()
  );

}
