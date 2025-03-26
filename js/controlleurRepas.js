import { modelRepas } from "./modelRepas.js";
import { view } from "./viewRepas.js";
import { Plat } from "./modelPlat.js";

export class Controller {
    constructor() {
        this.repas = [];
        this.plats = [];
        this.init();
    }

    init() {
        this.fetchPlatsFromAPI();
        this.repas = this.loadRepasFromLocalStorage();
    }

    fetchPlatsFromAPI() {
        Promise.all([
            fetch('https://data.sncf.com/api/explore/v2.1/catalog/datasets/menus-des-bars-tgv/records?limit=100', {
                method: 'GET',
            }).then(response => response.json()),
            fetch('https://data.sncf.com/api/explore/v2.1/catalog/datasets/carte-restauration-intercites/records?limit=100', {
                method: 'GET',
            }).then(response => response.json())
        ])
        .then(([tgvData, interciteData]) => {
            const tgvPlats = tgvData.results.map(element => new Plat(
                element.date_debut, element.date_fin, element.produit, element.prix_au_produit, 
                element.type, element.categorie_produit, element.presence_de_porc, element.presence_d_alcool, 
                element.composants, element.allergenes, element.allergenes_susceptibles_de_provenir_de_contaminations_croisees, 
                element.kcal_pour_100_ml_ou_100g, element.recette_vegetarienne, element.recette_vegane, element.bio, 
                element.sans_gluten, element.poids_cl_g, element.proteines_100g_100ml, element.glucides_100g_100ml, element.lipides_100g_100ml, "TGV"
            ));

            const intercitePlats = interciteData.results.map(element => new Plat(
                element.date_debut, element.date_fin, element.produit, element.prix_au_produit, 
                element.type_au_produit, element.categorie_produit, element.presence_de_porc, element.presence_d_alcool, 
                element.composants, element.allergenes, element.allergenes_susceptibles_de_provenir_de_contaminations_croisees, 
                element.kcal_pour_100_ml_ou_100g, element.recette_vegetarienne, element.recette_vegane, element.bio, 
                element.sans_gluten, element.poids_g_cl, element.proteines_100g_100ml, element.glucides_100g_100ml, element.lipides_100g_100ml, "INTERCITE"
            ));

            this.plats = [...tgvPlats, ...intercitePlats];
            view.getHtmlRepas(this.repas);
        });
    }
    

    loadRepasFromLocalStorage() {
        let repasLocalStorage = localStorage.getItem("repas");
        if (repasLocalStorage) {
            return JSON.parse(repasLocalStorage).map(repasData => modelRepas.fromJSON(repasData));
        }
        return [];
    }
}
