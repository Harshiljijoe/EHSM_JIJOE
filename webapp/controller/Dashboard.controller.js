sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], (Controller, MessageToast) => {
    "use strict";

    return Controller.extend("com.kaar.ehsm.controller.Dashboard", {
        onInit() {
            if (!sessionStorage.getItem("employeeId")) {
                this.getRouter().navTo("login");
            }
        },

        onIncidentPress() {
            this.getRouter().navTo("incidents");
        },

        onRiskPress() {
            this.getRouter().navTo("risks");
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