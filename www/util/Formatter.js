jQuery.sap.declare("util.Formatter"); 

/**
 * Function that formats date time values as received from an Odata service. 
 */
function fnDateTimeFormatter(oValue){
	if (oValue == undefined || oValue == "")
		return;
	
    var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance();
    return oDateFormat.format(new Date(oValue));
};
function fnDateFormatter(oValue){
	if (oValue == undefined || oValue == "")
		return;
	
    var oDateFormat = sap.ui.core.format.DateFormat.getDateInstance();
    return oDateFormat.format(new Date(oValue));
};

function fnTextFormatter(oValue){
	if (oValue == undefined || oValue == "")
		return oBundle.getText("NO_DESCRIPTION_AVAILABLE");
		
	return oValue;
};

function fnNoDateFormatter(oValue){
	if (oValue == undefined || oValue == "")
		return oBundle.getText("UNDECLARED");
		
	return fnDateFormatter(oValue);
};

function fnIconFormatter(oValue){
	if (oValue == undefined || oValue == "")
		return;

	var sIconName = "arrow-right"; //MEDIUM
	if (oValue > 5)
		sIconName = "arrow-bottom"; // LOW
	else if (oValue > 2 && oValue < 5)
		sIconName = "arrow-top"; // HIGH
	else if (oValue < 3)
		sIconName = "warning"; //VERY_HIGH

    return "sap-icon://"+sIconName;
};

var priorityMap = {
	"1" : "VERY_HIGH",
	"2" : "VERY_HIGH",
	"3" : "HIGH",
	"4" : "HIGH",
	"5" : "MEDIUM",
	"6" : "LOW",
	"7" : "LOW",
	"8" : "LOW",
	"9" : "LOW",
};

function fnPriorityFormatter(oValue){
	if (oValue == undefined || oValue == "")
		return "";
	return oBundle.getText(priorityMap[oValue]);
};

function fnCommentTitleFormatter(oCreateBy, oCreatedAt ){
	if (oCreateBy == undefined || oCreateBy == "")
		return oBundle.getText("NO_AVAILABLE_DETAILS");
	if (oCreatedAt == undefined || oCreatedAt == "")
		return oBundle.getText("CREATEDBY_NAME", [oCreateBy]);
		
	return oBundle.getText("CREATEDBY_NAME_AT_TIMESTAMP", [oCreateBy, oCreatedAt]);
};

/**
 * This object contains all the navigation property names that are 
 * used to navigate to the user info page.
 */
var userInfoNavigation = {
		ownerDetails: "/OwnerDetails",
		createdByDetails : "/CreatedByDetails"
};
