sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], (Controller, MessageToast) => {
    "use strict";

    return Controller.extend("com.kaar.ehsm.controller.Login", {
        onLogin() {
            const sEmployeeId = this.byId("employeeId").getValue();
            const sPassword = this.byId("password").getValue();

            if (!sEmployeeId || !sPassword) {
                MessageToast.show("Please enter Employee ID and Password");
                return;
            }

            const oModel = this.getOwnerComponent().getModel();
            const sPath = `/ZEHSM_LOGIN_PP6Set(EmployeeId='${sEmployeeId}',Password='${sPassword}')`;

            oModel.read(sPath, {
                success: (oData) => {
                    if (oData.Status === "Success") {
                        sessionStorage.setItem("employeeId", sEmployeeId);
                        this.getRouter().navTo("dashboard");
                    } else {
                        MessageToast.show("Invalid credentials");
                    }
                },
                error: () => {
                    MessageToast.show("Login failed");
                }
            });
        },

        getRouter() {
            return this.getOwnerComponent().getRouter();
        }
    });
});