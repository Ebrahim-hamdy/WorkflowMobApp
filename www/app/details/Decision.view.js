sap.ui.jsview("app.details.Decision", {

	getControllerName : function() {
		return "app.details.Decision";
	},
	
	onBeforeShow : function(oEvent) {
		this.getController().onBeforeShow(oEvent.data);
	},

	createContent : function(oController) {
		
		this.oDecisionButton = new sap.m.Button({
			text: "",
			tap: [oController.onExecuteDecision, oController]
		});
		
		this.oTextArea = new sap.m.TextArea({
			maxLength : 255,
			rows: 10,
			placeholder : oBundle.getText("ENTER_COMMENT_HERE"),
			width: "100%",
			height: "50%"
		});

		this.page = new sap.m.Page({
	    	showNavButton : true,
			navButtonText : oBundle.getText("CANCEL_BUTTON"), 
			navButtonTap : [ oController.onNavButtonTap, oController ],
			content : [	 this.oTextArea ],
			headerContent: [ this.oDecisionButton ],
		});

		return this.page;
	},
	


});
