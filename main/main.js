import { Controller } from "../controller/controller.js";
import { ControllerRepas } from "../controller/controllerRepas.js";

document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname === "/Air-Quality-Canada/repas.html") {
    new ControllerRepas();
    } else {
    new Controller();
    }
});
