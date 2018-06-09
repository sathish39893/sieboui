//SATHISH: Added customization for Find Results View to display as a table
// Created for IP15.18
// Date: 09-06-2018 
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

	var b = SiebelJS.Dependency("SiebelApp.Utils");
	var d = SiebelJS.Dependency("SiebelApp.Constants");
	var a = SiebelApp.S_App.LocaleObject;
	
	function c(f) {
                var B = 0;
                var A, z;
                var K, J, L, s, y, q, g, n, x, w, D;
                var I = "";
                var v = "#";
                var m = [];
                var l = [];
                var t = '<span class="siebui-search-bigheadingtext-dialog">' + a.GetLocalString("IDS_SEARCH_OUI_SRCH_TITLE_TEXT") + "</span>";
                var p = '<span class="siebui-search-bigheadingtext-dialog">' + a.GetLocalString("IDS_SWE_CKEDITOR_SOURCE") + "</span>";
                var u = f.Get("GetRecordSet");
                var E = u.length;
                if (E === 0) {
                    var G = SiebelAppFacade.ComponentMgr.FindComponent({
                        id: d.get("SWE_PST_SEARCH_NAME")
                    });
                    if (!G) {
                        LogMsg(1, "Failed at Find All Result View, Search component unavailable!");
                        return
                    }
                    if (G.Get("EnableNewRecordFeature") === "TRUE") {
                        var h = '<button type = "button" id= "find-new-button" class="refineappletButton" title="' + a.GetLocalString("IDS_NEW_STRING") + '">' + a.GetLocalString("IDS_NEW_STRING") + "</button>";
                        var H = "<div id='findresulttable'><div id='div-find-results' class=siebui-applet-content><table title=" + a.GetLocalString("RTCFindTxt") + a.GetLocalString("IDS_SEARCH_OUI_SRCH_RESULTS_TEXT") + ">" + h + "<tbody><tr></tr>";
                        H += "</tbody></table></div>";
                        $("#findresulttable").append(H).trigger("create");
                        this.BindEvents("newrecord")
                    }
                } else {
					var fieldSet = u[0]["Result Field With Method"];
					var fieldArr = b.TokenizeString(fieldSet, ";");
					var fieldArr1 = [];
					fieldArr.forEach((el) => fieldArr1.push(b.Trim(b.TokenizeString(el,":")[0])));
					//console.log("FieldArray: "+fieldArr1);
					var H = "<div id='findresulttable'><div id='div-find-results' class=siebui-applet-content><table title=" + a.GetLocalString("RTCFindTxt") + a.GetLocalString("IDS_SEARCH_OUI_SRCH_RESULTS_TEXT") + "><tbody><tr>";
					H += "<th class=siebui-search-table-h1>Title</th>";
					fieldArr1.forEach(function(el){H += "<th class=siebui-search-table-h1>" + el + "</th>";});
					H +="</tr>";
                   // var H = "<div id='div-find-results' class=siebui-applet-content><table title=" + a.GetLocalString("RTCFindTxt") + a.GetLocalString("IDS_SEARCH_OUI_SRCH_RESULTS_TEXT") + "><tbody><tr><th class=siebui-search-table-h1>" + t + "</th><th class=siebui-search-table-h2>" + p + "</th></tr>";
                    var r = "<tr class=siebui-row-first siebui-row-odd>";
                    var F = "<tr class=siebui-row-odd>";
                    var C = "<tr class=siebui-row-even>";
                    for (B = 0; B < E; B++) {
                        K = u[B]["URL"];
                        m = b.TokenizeString(K, v);
                        J = b.Trim(m[0].substring(5));
                        L = b.Trim(m[1].substring(7));
                        s = b.Trim(m[2].substring(6));
                        s = URLEncode(s);
                        y = b.Trim(m[3].substring(5));
                        q = b.Trim(m[4].substring(8));
                        n = u[B]["Result Field With Method"];
                        l = b.TokenizeString(n, ";");
						var FieldVal = [];
						l.forEach((el)=> FieldVal.push(b.Trim(el.split(":")[1])));
						//console.log(FieldVal);
                        if (l.length % 2 === 0) {
                            D = l.length / 2
                        } else {
                            D = (l.length - 1) / 2
                        }
                        x = "";
                        w = "";
                        for (A = 0; A < D; A++) {
                            x = x + l[A] + " ; "
                        }
                        for (z = D; z < l.length; z++) {
                            w = w + l[z] + " ; "
                        }
                        if (y === "0") {
                            I = "SWECmd=GotoView&SWEView=" + J + "&SWEPostnApplet=" + L + "&SWEPostnRowId=" + s + "&SWEKeepContext=0"
                        } else {
                            I = "SWECmd=GotoView&SWEView=" + J + "&SWEApplet0=" + L + "&SWERowId0=" + s
                        }
                        g = '<a href="javascript:void(0)"id="URL' + B + '"value ="' + I + '">' + u[B]["Result Field"] + "</a>";
                        //var o = "<td class=siebui-search-col1><p><span class=siebui-search-highlight>" + g + "</span></p><p><span class=siebui-search-subtext>" + x + "</span></p><p><span class=siebui-search-subtext>" + w + "</span></p></td><td class=siebui-search-col2>" + q + "</td></tr>";
						var o = "<td class=siebui-search-col1><p><span class=siebui-search-highlight>" + g + "</span></p></td>";
						//"<p><span class=siebui-search-subtext>" + x + "</span></p><p><span class=siebui-search-subtext>" + w + "</span></p></td><td class=siebui-search-col2>" + q + "</td></tr>";
						
						FieldVal.forEach( function(el){
							if(el === undefined) el = "";
							o += "<td class=siebui-search-col2><p><span class=siebui-search-highlight>" + el + "</span></p></td>";
						});//forEach
						
						o +="</tr>";
						//console.log(o);
						
                        if (B === 0) {
                            H += r + o
                        } else {
                            if (B % 2 === 0) {
                                H += C + o
                            } else {
                                H += F + o
                            }
                        }
                    }
                    H += "</tbody></table></div></div>";
                    $("#findresulttable").replaceWith(H).trigger("create")
                }
            }
			
    FindAllResultsCustomPR.prototype.ShowUI = function () {
     var f = this.GetPM();
	 SiebelAppFacade.FindAllResultsCustomPR.superclass.ShowUI.call(this);
	 c.call(this, f);
	 
					
    }

    FindAllResultsCustomPR.prototype.BindData = function (bRefresh) {
     
	 
	 var f = this.GetPM();
	SiebelAppFacade.FindAllResultsCustomPR.superclass.BindData.apply(this, arguments);
	$("#div-find-results").remove();
	c.call(this, f);
	this.BindEvents("drilldown");
    }

    FindAllResultsCustomPR.prototype.BindEvents = function (j) {
		
	 var g = this.GetPM();
			switch (j) {
			case "newrecord":
					$("#find-new-button").unbind("click");
					$("#find-new-button").bind("click", {
						ctx: this
					}, function (l) {
						var m = SiebelAppFacade.ComponentMgr.FindComponent({
								id: d.get("SWE_PST_SEARCH_NAME")
							});
						if (!m) {
							LogMsg(1, "Failed at invoking Search Pane, Search component unavailable! ");
							return
						}
						var i = CCFMiscUtil_CreatePropSet();
						m.ExecuteMethod("ExposedCurrentFind", i)
					});
					break;
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
						//console.log("AssetId:"+astId);
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
