import { Controller } from "../controller/controller.js";
import { ControllerRepas } from "../controller/controlleurRepas.js";

document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname === "/repas.html") {
    new ControllerRepas();
    } else {
    new Controller();
    }
});