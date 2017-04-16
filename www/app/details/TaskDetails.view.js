sap.ui.jsview("app.details.TaskDetails", {

    getControllerName : function() {
		return "app.details.TaskDetails";
    },

    createContent : function(oController) {
		this.oFiestList = new sap.m.List({
	    	inset: true,
	    	headerText: "{subject}",
	    	items : [
	    	         new sap.m.DisplayListItem({ label : oBundle.getText("TASK_STATUS"), value : oBundle.getText("{status_txt}")}),
	    	         new sap.m.DisplayListItem({ label : oBundle.getText("TASK_CREATEDON"), value :{path : "created_at", formatter : fnDateTimeFormatter}}),
					 new sap.m.DisplayListItem({ label : oBundle.getText("TASK_CREATEDBY"), value : "{created_by}"}),
				  	 new sap.m.DisplayListItem({ label : oBundle.getText("TASK_PRIORITY"), value : {path: "priority", formatter : fnPriorityFormatter}}),
				  	 new sap.m.DisplayListItem({ label : oBundle.getText("TASK_STARTDEADLINE"),value :{path : "start_dl", formatter : fnNoDateFormatter}}),
				  	 new sap.m.DisplayListItem({ label : oBundle.getText("TASK_COMPLETIONDEADLINE"),value :{path : "end_dl", formatter : fnNoDateFormatter}}),
                  	]
		});
		
		this.oDescriptiontList = new sap.m.List({
	    	inset: true,
	    	items : [
	    	        new sap.m.DisplayListItem({ label : oBundle.getText("DESCRIPTION"),
	    	        	 						type : sap.m.ListType.Navigation,
												tap : oController.onListItemTap
											 }).data("viewID", "Description"),
	    	        new sap.m.DisplayListItem({ label : oBundle.getText("EXTENSIBLE_ELEMENTS"),
												type:sap.m.ListType.Navigation,
												tap : oController.onListItemTap
											 }).data("viewID", "ExtensibleElements")
                  	]
		});
		
		this.oNavigationList = new sap.m.List({
	    	inset: true,
	    	items : [
				  	  new sap.m.DisplayListItem({ label : oBundle.getText("COMMENTS"), 
												  type:sap.m.ListType.Navigation, 
												  tap : oController.onListItemTap 
												}).data("viewID", "Comments"),
 				  	  new sap.m.DisplayListItem({ label : oBundle.getText("ATTACHMENTS"), 
												  type:sap.m.ListType.Navigation, 
												  tap : oController.onListItemTap
												}).data("viewID", "Attachments"),
 				  	  new sap.m.DisplayListItem({ label : oBundle.getText("PARTICIPANTS"), 
												  type:sap.m.ListType.Navigation, 
												  tap : oController.onListItemTap
												}).data("viewID", "PotentialOwners")
                  	]
		});
		
		// create action sheet containing several options
		this.oActionSheet = new sap.m.ActionSheet({
			title: oBundle.getText("PLEASE_CHOOSE_ONE_ACTION"),
			showCancelButton: true,
			cancelButtonText: oBundle.getText("CANCEL"),
			placement: sap.m.PlacementType.Bottom,
		});

		this.page = new sap.m.Page({
	    	title : oBundle.getText("DETAIL_TASKDETAILS_TITLE"),
	    	// set back button on details pages only on smartphones
	    	showNavButton : jQuery.device.is.phone,
	    	navButtonTap : [ oController.onNavButtonTap, oController ],
	    	content : [ this.oFiestList, 
	    	            this.oDescriptiontList, 
	    	            this.oExtendedPropertiesList, 
	    	            this.oNavigationList ],
			headerContent: [new sap.m.Button({
	    		text:  oBundle.getText("MAKE_DECISION"),
				tap : [ oController.onMakeDecisionButtonTap, oController]
	    	})]
		});

		return this.page;
    }
});