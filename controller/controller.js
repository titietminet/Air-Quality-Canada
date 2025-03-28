import { view } from "../view/view.js";
import { Plat } from "../model/modelPlat.js";
import { modelRepas } from "../model/modelRepas.js";

export class Controller {
    constructor() {
        this.plats = [];
        this.platMarked = [];
        this.repas = [];
        this.init();
    }

    init() {
        this.repas = this.loadRepasFromLocalStorage();
        this.loadPlatsFromLocalStorage();
        this.fetchPlatsFromAPI();
        this.setupEventListeners();
    }

    loadRepasFromLocalStorage() {
        let repasLocal = localStorage.getItem("repas");
        if (repasLocal) {
            const repasData = JSON.parse(repasLocal);
            return repasData.map(repas => modelRepas.fromJSON(repas));
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
                element.type, element.categorie_produit, element.presence_de_porc, element.presence_d_alcool, 
                element.composants, element.allergenes, element.allergenes_susceptibles_de_provenir_de_contaminations_croisees, 
                element.kcal_pour_100_ml_ou_100g, element.recette_vegetarienne, element.recette_vegane, element.bio, 
                element.sans_gluten, element.poids_cl_g, element.proteines_100g_100ml, element.glucides_100g_100ml, element.lipides_100g_100ml, "TGV"
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
        // view.searchInput.addEventListener("focusout", () => {
        //     view.searchBox.addEventListener("mouseout", () => {
        //     view.clearSearchBox();
        //     }, { once: true });
        // });
        for (const el of view.headerLink) {
            el.addEventListener("mouseover", (e) => view.handleHeaderHover(e.target, true));
            el.addEventListener("mouseout", (e) => view.handleHeaderHover(e.target, false));
        }
        for (const el of view.choiceRepas){
            el.addEventListener("change", (e) => {
                const parentId = e.target.closest("[id]").id.split('_')[1];
                this.addPlatToRepas(e.target.value, parentId);
            });
        }
    }

    handleSearch() {
        const query = view.searchInput.value.toLowerCase();
        view.clearSearchBox();
        if (query) {
            const filteredPlats = this.plats.filter(plat => plat.produit.toLowerCase().includes(query));
            view.displaySearchResults(filteredPlats.slice(0, 6), (produit) => this.addPlatToMarked(produit), this.platMarked, this.repas);
        }
        for (const el of view.choiceRepas){
            el.addEventListener("change", (e) => {
                const parentId = e.target.closest("[id]").id.split('_')[1];
                this.addPlatToRepas(e.target.value, parentId);
            });
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
        view.addMarkedPlat(this.platMarked, (produit) => this.removePlatToMarked(produit), this.repas);
    }

    addPlatToRepas(repas,produit) {
        console.log(repas, produit);
        const plat = this.plats.find(p => p.produit === produit);
        if (plat) {
            if(repas === "new") {
                const nom = prompt("Nom du repas :");
                if (nom) {
                    this.repas.push(new modelRepas(nom, []));
                    const newRepas =this.repas.find(p=> p.nom === nom);
                    newRepas.addPlat(plat);
                    this.handleSearch();
                    this.updateMarkedSection();
                }
            }else {
                const newRepas =this.repas.find(p=> p.nom === repas);
                newRepas.addPlat(plat);
            }
        }
    }
}
