jQuery.sap.declare("util.Connectivity");
 //Service Root URL
// "http://ides.test.com.sa:8080/sap/opu/odata/iwwrk/WFSERVICE/?sap-client=800";
//Extract the relative URL to use this application for deployment on any Web Server
var serviceUrl = "http://192.168.21.2:8000/sap/opu/odata/iwwrk/WFSERVICE/";

function getServiceURL(){
	//Get the service URL from the SAP NetWeaver Gateway Catalog service.
	jQuery.sap.require("util.ServiceNegotiation");
	return useNegotiation ? getNegotiationService() : serviceUrl;
}

function createModel(){  

	var oModel = new sap.ui.model.odata.ODataModel(getServiceURL(), false, "", "", null,null, null, true);
    oModel.setCountSupported(false);
	// set global models
	
	//var oModel = new sap.ui.model.odata.ODataModel(serviceUrl, false);
	sap.ui.getCore().setModel(oModel);
    
	oModel.attachRequestCompleted(function(oEvent) {
	    sap.ui.getCore().getEventBus().publish("busyDialog","close");
	});

	oModel.attachRequestSent(function(oEvent) {
	    sap.ui.getCore().getEventBus().publish("busyDialog","open");
	});

	oModel.attachParseError(function(oEvent) {
	    displayError({
		message : oEvent.getParameter("message"),
		responseText : oEvent.getParameter("responseText"),
		statusCode : oEvent.getParameter("statusCode"),
		statusText : oEvent.getParameter("statusText")
	    });
	});

	oModel.attachRequestFailed(function(oEvent) {
	    displayError({
		message : oEvent.getParameter("message"),
		responseText : oEvent.getParameter("responseText"),
		statusCode : oEvent.getParameter("statusCode"),
		statusText : oEvent.getParameter("statusText")
	    });
	});
	
}

	
