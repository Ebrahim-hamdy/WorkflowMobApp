sap.ui.controller("app.details.Decision", {
    
	onBeforeShow : function(oData) {
		var oView = this.getView();
		this.bindingContext = oData.bindingContext;
		
		oView.oDecisionButton.data("decision", oData);
		oView.oDecisionButton.setText( oData.dec_text);
		oView.oTextArea.setValue("");
	},
	
    onNavButtonTap : function() {
    	sap.ui.getCore().getEventBus().publish("nav", "back");
    		
    	// update the detail with the appropriate data
		sap.ui.getCore().getEventBus().publish("loadData", "RefreshTaskDetail", {
			bindingContext : this.bindingContext 
		});
    },
  
	onExecuteDecision : function(oEvent){
		sap.ui.getCore().getEventBus().publish("busyDialog","open");
		var oView = this.getView();
		var oDecision = oView.oDecisionButton.data("decision");
		
		
		var oParameters = {};
		oParameters["workitem_id"] = oDecision.workitem_id;
		oParameters["dec_key"] =  oDecision.dec_key;
		oParameters["comments"] =  escape(oView.oTextArea.getValue());
		// in case Multi Origin (mo;) is used then SAP__Origin exist
		if (oDecision.SAP__Origin){
			oParameters["SAP__Origin"] = oDecision.SAP__Origin;
		}
					
		this.applyDecision("ApplyDecision", oParameters, 
		function(oData, oResponse){
			var decisionText =  oDecision.DecisionText;
			jQuery.sap.log.info(oBundle.getText("DECISION_OF_TYPE_WAS_EXECUTED", [decisionText]));
			//On tablet,we set the details section to empty when returning back to the data list 
			if (!jQuery.device.is.phone) {
				var splitApp = sap.ui.getCore().byId("app.App").splitApp;
				splitApp.toDetail("app.details.Empty");
			}else{
				sap.ui.getCore().getEventBus().publish("nav", "to", {
					viewId : "app.master.TaskList",
					data : ""
				});
			}
			sap.ui.getCore().getEventBus().publish("tasks", "modified");
			sap.ui.getCore().getEventBus().publish("busyDialog","close");
		},	
		function(oError){
			var oErrorFormatted = formatErrorResponse(oError, oBundle.getText("APPLY_DECSION_FAILED"));
			displayError(oErrorFormatted);
			sap.ui.getCore().getEventBus().publish("busyDialog","close");
		});		
	},
	
	applyDecision : function(sFunctionName, oParameters, fnSuccess, fnError){
		var oHeaders = {};
		oHeaders["x-csrf-token"] = "Fetch";
		
		//Get updated x-csrf token before Post request
		executeAjaxCall("GET", serviceUrl, null, oHeaders, 
				function(oData, status, oResponse){
					
					oHeaders["x-csrf-token"] =  oResponse.getResponseHeader("x-csrf-token");
					
					var sParam = "";
					
					for (var key in oParameters) {
						  if (oParameters.hasOwnProperty(key)) {
							  if (sParam.length == 0) {
								  sParam = "?";
							  }else{
								  sParam = sParam + "&";
							  }
							  sParam = sParam + key + "='" + oParameters[key] + "'";
						  }
						}
					
					var url = serviceUrl + sFunctionName + sParam;
					executeAjaxCall("POST", url, null, oHeaders, fnSuccess, fnError);
		});
	},
});