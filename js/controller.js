import { view } from "./view.js";
import { Plat } from "./modelPlat.js";
import { modelRepas } from "./modelRepas.js";

export class Controller {
    constructor() {
        this.plats = [];
        this.platMarked = [];
        this.init();
        this.repas = [];
    }

    init() {
        this.loadPlatsFromLocalStorage();
        this.fetchPlatsFromAPI();
        this.setupEventListeners();
        this.repas = this.loadRepasFromLocalStorage();
    }

    loadRepasFromLocalStorage() {
        let repasLocalStorage = localStorage.getItem("repas");
        if (repasLocalStorage) {
            return JSON.parse(repasLocalStorage).map(repas => new modelRepas(repas.nom, repas.plats));
        }
        return [];
    }

    loadPlatsFromLocalStorage() {
        let platLocalStorage = localStorage.getItem("plat");
        if (platLocalStorage) {
            this.platMarked = JSON.parse(platLocalStorage).map(
                (element) => new Plat(
                    element.dateDebut, element.dateFin, element.produit, element.prix, 
                    element.type, element.categorie, element.presencePorc, element.presenceAlcool, 
                    element.composants, element.allergenes, element.allergenesCroises, 
                    element.kcal, element.vegetarien, element.vegan, element.bio, 
                    element.sansGluten, element.poids, element.proteines, element.glucides, element.lipides, element.train
                )
            );
            this.updateMarkedSection();
        }
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
                element.type, element.categorie, element.presence_de_porc, element.presence_alcool, 
                element.composants, element.allergenes, element.allergenes_croises, 
                element.kcal, element.recette_vegetarienne, element.recette_vegane, element.bio, 
                element.sans_gluten, element.poids, element.proteines, element.glucides, element.lipides, "TGV"
            ));

            const intercitePlats = interciteData.results.map(element => new Plat(
                element.date_debut, element.date_fin, element.produit, element.prix_au_produit, 
                element.type, element.categorie, element.presence_de_porc, element.presence_alcool, 
                element.composants, element.allergenes, element.allergenes_croises, 
                element.kcal, element.recette_vegetarienne, element.recette_vegane, element.bio, 
                element.sans_gluten, element.poids, element.proteines, element.glucides, element.lipides, "INTERCITE"
            ));

            this.plats = [...tgvPlats, ...intercitePlats];
        });
    }
    

    setupEventListeners() {
        view.searchInput.addEventListener("input", () => this.handleSearch());
        view.searchInput.addEventListener("focusout", () => {
            view.searchBox.addEventListener("mouseout", () => {
            view.clearSearchBox();
            }, { once: true });
        });
        for (const el of view.headerLink) {
            el.addEventListener("mouseover", (e) => view.handleHeaderHover(e.target, true));
            el.addEventListener("mouseout", (e) => view.handleHeaderHover(e.target, false));
        }
    }

    handleSearch() {
        const query = view.searchInput.value.toLowerCase();
        view.clearSearchBox();
        if (query) {
            const filteredPlats = this.plats.filter(plat => plat.produit.toLowerCase().includes(query));
            view.displaySearchResults(filteredPlats.slice(0, 6), (produit) => this.addPlatToMarked(produit), this.platMarked);
        }
    }

    addPlatToMarked(produit) {
        const plat = this.plats.find(p => p.produit === produit);
        if (plat && !this.platMarked.includes(plat => plat.produit.toLowerCase().includes(produit))) {
            plat.engeristrerLocal();
            this.platMarked.push(plat);
            this.updateMarkedSection();
        }
    }

    removePlatToMarked(produit) {
        const plat = this.plats.find(p => p.produit === produit);
        if (plat) {
            plat.supprimerLocal();
            this.platMarked = this.platMarked.filter(p => p.produit !== produit);
            this.updateMarkedSection();
        }
    }

    updateMarkedSection() {
        view.addMarkedPlat(this.platMarked, (produit) => this.removePlatToMarked(produit));
    }
}
