sap.ui.jsview("app.details.Comments", {

	getControllerName : function() {
		return "app.details.Comments";
	},
	/**
	 * Handler to onBeforeShow event that fires by the NavContainer.<BR>
	 * @param oEvent
	 */
	onBeforeShow : function(oEvent) {
		this.getController().onBeforeShow(oEvent.data, oEvent.backData);
    },
    
	createContent : function(oController) {
		this.oList = new sap.m.List({inset: true});
		this.itemTemplate = new sap.m.StandardListItem({
		    title: "{text}",
		    description: {	
					parts: [ 
					         {path: "creator_name"},
				        	 {path: "created_at"}
				    ],
				    formatter: fnCommentTitleFormatter,
			},
		});	

		this.page = new sap.m.Page({
	   	    title : oBundle.getText("DETAIL_COMMENTS_TITLE"),
		    showNavButton : true,
		    navButtonTap : [ oController.onNavButtonTap, oController ],	    
		    content : [ this.oList ]
		});

		return this.page;
	}
	
});