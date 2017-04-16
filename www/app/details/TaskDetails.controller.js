sap.ui.controller("app.details.TaskDetails", {
	
	/**
	 * Called by the UI5 runtime to init this controller
	 */
	onInit : function() {
		// subscribe for refresh events
		var bus = sap.ui.getCore().getEventBus();
		bus.subscribe("loadData", "RefreshTaskDetail", this._loadData, this);
	},
	
   	_loadData : function(sChannelId, sEventId, oData) {
		this.getView().bindElement(oData.bindingContext.getPath());
		var oModel = sap.ui.getCore().getModel();
		var oView = this.getView();
		oModel.refreshSecurityToken(function() {
			var aReadOperations = [];
			
			aReadOperations.push(oModel.createBatchOperation(oData.bindingContext.getPath()+ "/Comments/$count", "GET" ));
			aReadOperations.push(oModel.createBatchOperation(oData.bindingContext.getPath()+ "/Attachments/$count", "GET" ));
			aReadOperations.push(oModel.createBatchOperation(oData.bindingContext.getPath()+ "/Participants/$count", "GET" ));
			oModel.addBatchReadOperations(aReadOperations);
		
			var oNavigationList = oView.oNavigationList;
			oModel.submitBatch(
					function(oData,oResponse,aErrorResponses) {
						$.each(oNavigationList.getItems(),function(i,item){
									if(oData.__batchResponses[i].statusCode && oData.__batchResponses[i].statusCode == "200"){
										item.setCounter(parseInt(oData.__batchResponses[i].data));
									}else{
										displayError(formatErrorResponse(oData.__batchResponses[i],  oBundle.getText("GET_BATCH_FAILED",[item.getLabel()])));
									}
						});
			
					},
					function(oError) {
						displayError(oError);
					}
			);
		}, function(oError){
			displayError(formatErrorResponse(oError, oBundle.getText("X-CSRF_REFRESH_TOKEN_FAILED")));
		});
	},
		
	onListItemTap : function(oEvent) {
          var oBindingContext = oEvent.oSource.getBindingContext();
          
		  var viewId = 	oEvent.getSource().data("viewID");
          sap.ui.getCore().getEventBus().publish("nav", "to", {
              viewId : "app.details." + viewId,
              data : { bindingContext : oBindingContext }
          });
    },
    
	onNavButtonTap : function() {
		sap.ui.getCore().getEventBus().publish("nav", "back");
	},

	onMakeDecisionButtonTap : function(oEvent) {

		var oModel = sap.ui.getCore().getModel();
		var oBindingContext = oEvent.getSource().getBindingContext();
		var oView = this.getView();

		if (oView.oActionSheet.getButtons().length > 0){
			oView.oActionSheet.removeAllButtons();
		}
		
		var oSource = oEvent.getSource();

		this.getDecisionOptions(oModel, oBindingContext, function(decisions) {
			
			for ( var i = 0; i < decisions.length; i++) {
				var type = sap.m.ButtonType.Default;
				var icon = "";
								
				var oButton = new sap.m.Button({
					type: type,
					icon: icon,
					tap: [decisions[i], oView.getController().onDecisionTap],
					text:  decisions[i].dec_text				});
				
				oView.oActionSheet.addButton(oButton);
			}

			oView.oActionSheet.openBy(oSource);
		});

	},


	getDecisionOptions : function(oModel, oBindingContext, fnSuccess) {
		
		var decisionOptions = oBindingContext + "/DecisionOptions";
		 
			oModel.read(decisionOptions, oBindingContext, [ "$format=json" ], true,
				function(oData, response) {
					var json = JSON.parse(response.body);
					fnSuccess(json.d.results);

				}, 
		function(oError) {
					var oErrorFormatted = formatErrorResponse(oError, oBundle.getText("GET_DECISION_OPTIONS_FAILED"));
					displayError(oErrorFormatted);
				}
		);
	},
	
	onDecisionTap: function(oEvent, oDecision){
		sap.ui.getCore().getEventBus().publish("nav", "to", {
	    	viewId : "app.details.Decision",
	    	data : oDecision
		});
	},
	
});