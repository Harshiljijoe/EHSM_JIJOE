sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller, JSONModel, MessageToast, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("com.kaar.ehsm.controller.Incidents", {
        onInit() {
            if (!sessionStorage.getItem("employeeId")) {
                this.getRouter().navTo("login");
                return;
            }
            
            const oModel = new JSONModel({ incidents: [] });
            this.getView().setModel(oModel);
            this._loadIncidents();
        },

        _loadIncidents() {
            const sEmployeeId = sessionStorage.getItem("employeeId");
            const oDataModel = this.getOwnerComponent().getModel();
            const aFilters = [new Filter("EmployeeId", FilterOperator.EQ, sEmployeeId)];

            oDataModel.read("/ZEHSM_INCIDENTSet", {
                filters: aFilters,
                success: (oData) => {
                    this.getView().getModel().setProperty("/incidents", oData.results);
                },
                error: () => {
                    MessageToast.show("Failed to load incidents");
                }
            });
        },

        onRefresh() {
            this._loadIncidents();
        },

        onNavBack() {
            this.getRouter().navTo("dashboard");
        },

        onLogout() {
            sessionStorage.removeItem("employeeId");
            this.getRouter().navTo("login");
        },

        getRouter() {
            return this.getOwnerComponent().getRouter();
        }
    });
});