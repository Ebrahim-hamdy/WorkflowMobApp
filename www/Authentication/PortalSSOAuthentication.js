jQuery.sap.declare("Authentication.PortalSSOAuthentication");

//Change sPortalURL to your portal url
var sPortalURL = '/sap/opu/odata/IWWRK/WFSERVICE/';
function executePortalSSOAuthentication() {
    executeAjaxCall("GET", sPortalURL, null, null, launchApplication);
};

