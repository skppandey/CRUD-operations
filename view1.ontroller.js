# CRUD-operations
sap.ui.controller("tablebinding.view1", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf tablebinding.view1
*/
	onInit: function(){
		var that=this;
		this.flag="";
		this.oModel = new sap.ui.model.odata.ODataModel("http://DEWDFCTO021.WDF.sap.corp:1080/sap/opu/odata/SAP/ZTABLE_T_SRV/");
		this.getView().setModel(this.oModel);
		
		this.oModel.setHeaders({"X-Requested-With" : "X"},{"X-CSRF-Token": "x-csrf-token"});
		var oGrid = this.getView().byId("gridId");
		oGrid.setVisible(false);
	
		this.oModel.read("/ztableset", {
			  success: function(oData) {  //"do something"  
				  var t = new sap.ui.model.json.JSONModel();
					t.setData(oData);
					that.getView().setModel(t,"q_model");
			  },
			  error: function(oError) {  //"do something" 
			  }
			  
			});
		
		
	}
	,
	onObjectListItemPress:function(oEvent){
		var a = oEvent.getSource().getBindingContext("q_model").getObject();
		var b = oEvent.getSource().getBindingContext("g_model").getObject();
	}
,
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf tablebinding.view1
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf tablebinding.view1
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf tablebinding.view1
*/
//	onExit: function() {
//
//	}

    onDisplay: function(){
    	var that=this;
    	var oGrid = this.getView().byId("gridId");
    	oGrid.setVisible(false);
		
		var oSave = this.getView().byId("saveBtnId");
		oSave.setVisible(false);
		
		var oTable = this.getView().byId("idEmployeTable");
		var contexts = oTable.getSelectedContexts("q_model");
		
		if(contexts.length == 0){
			alert("Please select an Employee");
			
			
		}
		else if(contexts.length > 1){
			alert("Please select Single Employee");
			
		}
		else{
			oGrid.setVisible(true);
			var items = contexts.map(function(c){
				return c.getObject();
			});
			var new_model = new sap.ui.model.json.JSONModel();
			that.getView().setModel(new_model,"new_model");
			this.getView().getModel("new_model").getData().Empno=items[0].Empno;
			this.getView().getModel("new_model").getData().Fname=items[0].Fname;
			this.getView().getModel("new_model").getData().Lname=items[0].Lname;
			this.getView().getModel("new_model").getData().Addrs=items[0].Addrs;
			this.getView().getModel("new_model").getData().Desgn=items[0].Desgn;
			this.getView().getModel("new_model").refresh(true);

			
			var oId = this.getView().byId("empId"); 
			oId.setEditable(false);
//			oId.setValue(items[0].Empno);
			
			var oId = this.getView().byId("fnameId"); 
			oId.setEditable(false);
//			oId.setValue(items[0].Fname);
			
			var oId = this.getView().byId("lnameId"); 
			oId.setEditable(false);
//			oId.setValue(items[0].Lname);
			
			var oId = this.getView().byId("addrsId"); 
			oId.setEditable(false);
//			oId.setValue(items[0].Addrs);
			
			var oId = this.getView().byId("desgnId"); 
			oId.setEditable(false);
//			oId.setValue(items[0].Desgn);
			
	    	
		};
		
		
    },
    mode:0,
    onUpdate: function(){
    	this.flag="u";
    	var oTable = this.getView().byId("idEmployeTable");
    	var oGrid = this.getView().byId("gridId");	
    	var oSave = this.getView().byId("saveBtnId");
    	
    	
		
		
		var contexts = oTable.getSelectedContexts("q_model");
		if(contexts.length == 0){
			alert("Please select an Employee");
			
			
		}
		else if(contexts.length > 1){
			alert("Please select Single Employee");
			
		}
		else{
			oGrid.setVisible(true);
			oSave.setVisible(true);
			var items = contexts.map(function(c){
				return c.getObject();
			});
			var that=this;
			var new_model = new sap.ui.model.json.JSONModel();
			that.getView().setModel(new_model,"new_model");
			this.getView().getModel("new_model").getData().Empno=items[0].Empno;
			this.getView().getModel("new_model").getData().Fname=items[0].Fname;
			this.getView().getModel("new_model").getData().Lname=items[0].Lname;
			this.getView().getModel("new_model").getData().Addrs=items[0].Addrs;
			this.getView().getModel("new_model").getData().Desgn=items[0].Desgn;
			this.getView().getModel("new_model").refresh(true);

			var oId = this.getView().byId("empId"); 
			oId.setEditable(false);
//			oId.setValue(items[0].Empno);
			
			var oId = this.getView().byId("fnameId"); 
			oId.setEditable(true);
//			oId.setValue(items[0].Fname);
			
			var oId = this.getView().byId("lnameId"); 
			oId.setEditable(true);
//			oId.setValue(items[0].Lname);
			
			var oId = this.getView().byId("addrsId"); 
			oId.setEditable(true);
//			oId.setValue(items[0].Addrs);
			
			var oId = this.getView().byId("desgnId"); 
			oId.setEditable(true);
//			oId.setValue(items[0].Desgn);
			
		}
	
    },
    onCreate: function(){
    	this.flag="c";
    	var oTable = this.getView().byId("idEmployeTable");
    	var oGrid = this.getView().byId("gridId");	
    	var oSave = this.getView().byId("saveBtnId");
    	
		
		var contexts = oTable.getSelectedContexts("q_model");
		if(contexts.length == 0){
			
			oGrid.setVisible(true);
			oSave.setVisible(true);
	    	var oId = this.getView().byId("empId"); 
			oId.setEditable(true);
			oId.setValue("");
			
			var oId = this.getView().byId("fnameId"); 
			oId.setEditable(true);
			oId.setValue("");
			
			var oId = this.getView().byId("lnameId"); 
			oId.setEditable(true);
			oId.setValue("");
			
			var oId = this.getView().byId("addrsId"); 
			oId.setEditable(true);
			oId.setValue("");
			
			var oId = this.getView().byId("desgnId"); 
			oId.setEditable(true);
			oId.setValue("");
			
		}
		else{
			alert("Please do not select any Employee");
			
			
			
		}
		
    },
    onDelete: function(){
    	
    	var oTable = this.getView().byId("idEmployeTable");
		var contexts = oTable.getSelectedContexts("q_model");
		var items = contexts.map(function(c){
			return c.getObject();
		});
		var removeIndex = this.getView().getModel("q_model").getData().results.map(function(item) {
			return item.Empno;
		}).indexOf(items[0].Empno);
		this.getView().getModel("q_model").getData().results.splice(removeIndex, 1);
		this.getView().getModel("q_model").refresh(true);
		oTable.removeSelections(true);
		
		this.oModel.remove("/ztableset(Empno='"+items[0].Empno+"')",null,function(){
			sap.m.MessageToast.show("Successfully Deleted");
		},function(){
			
		});
    },
    
    onSave: function(){
    	
    	view = this.getView();
    	var oGrid = this.getView().byId("gridId");	
    	var oSave = this.getView().byId("saveBtnId");
    	
    	
    	var oId = this.getView().byId("empId").getValue(); 
    	var fname = this.getView().byId("fnameId").getValue(); 
    	var lname = this.getView().byId("lnameId").getValue(); 
    	var addrs = this.getView().byId("addrsId").getValue(); 
    	var desgn = this.getView().byId("desgnId").getValue(); 
    	var oEntity = {};
    	oEntity.Empno = oId;
    	oEntity.Fname = fname;
    	oEntity.Lname = lname;
    	oEntity.Addrs = addrs;
    	oEntity.Desgn = desgn;
    	
    	if(this.flag == "u"){
    	this.oModel.update("/ztableset(Empno='"+oEntity.Empno+"')",oEntity,null,function(){
			sap.m.MessageToast.show("Successfully Updated");
			
			var q_model = view.getModel("q_model").getData().results;
			for(var i = 0; i < q_model.length; i++) {
			    var obj = q_model[i];
			    if(q_model[i].Empno == oEntity.Empno){
			    	
			    	
			    q_model[i].Empno = oEntity.Empno;
			    q_model[i].Fname = oEntity.Fname;
			    q_model[i].Lname = oEntity.Lname;
			    q_model[i].Addrs = oEntity.Addrs;
			    q_model[i].Desgn = oEntity.Desgn;
			    break;
			    } 			    			    
			}
				
			view.getModel("q_model").refresh(true);
			
			oGrid.setVisible(false);
			oSave.setVisible(false);
//			sap.ui.getCore().byId("idEmployeTable").getModel().refresh(true);
			
//			that.getView().getModel("userModel").getData().AUTH = tokens;
			
		},function(){
			
		});
    	}
    if(this.flag == "c"){
    	this.oModel.create("/ztableset",oEntity,null,function(){
			sap.m.MessageToast.show("Successfully Created");
			
			var q_model = view.getModel("q_model").getData().results;
/*			for(var i = 0; i < q_model.length; i++) {
			    var obj = q_model[i];
//			
			    if(q_model[i].Empno != oEntity.Empno && i == q_model.length){
			    	
			    	q_model[i+1].Empno = oEntity.Empno;
				    q_model[i+1].Fname = oEntity.Fname;
				    q_model[i+1].Lname = oEntity.Lname;
				    q_model[i+1].Addrs = oEntity.Addrs;
				    q_model[i+1].Desgn = oEntity.Desgn;					  				    
			    }			    			    			    
			}*/
			q_model.push(oEntity);
			view.getModel("q_model").refresh(true);
			
			oGrid.setVisible(false);
			oSave.setVisible(false);
			
		},function(){
			
		});
    }
    }
 
});
