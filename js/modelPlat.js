export class Plat {
    #dateDebut;
    #dateFin;
    #produit;
    #prix;
    #type;
    #categorie;
    #presencePorc;
    #presenceAlcool;
    #composants;
    #allergenes;
    #allergenesCroises;
    #kcal;
    #vegetarien;
    #vegan;
    #bio;
    #sansGluten;
    #poids;
    #proteines;
    #glucides;
    #lipides;

    constructor(dateDebut, dateFin, produit, prix, type, categorie, presencePorc, presenceAlcool, composants, allergenes, allergenesCroises, kcal, vegetarien, vegan, bio, sansGluten, poids, proteines, glucides, lipides) {
        this.#dateDebut = dateDebut;
        this.#dateFin = dateFin;
        this.#produit = produit;
        this.#prix = prix;
        this.#type = type;
        this.#categorie = categorie;
        this.#presencePorc = presencePorc;
        this.#presenceAlcool = presenceAlcool;
        this.#composants = composants;
        this.#allergenes = allergenes;
        this.#allergenesCroises = allergenesCroises;
        this.#kcal = kcal;
        this.#vegetarien = vegetarien;
        this.#vegan = vegan;
        this.#bio = bio;
        this.#sansGluten = sansGluten;
        this.#poids = poids;
        this.#proteines = proteines;
        this.#glucides = glucides;
        this.#lipides = lipides;
    }   

    get dateDebut() { return this.#dateDebut; }
    set dateDebut(value) { this.#dateDebut = value; }

    get dateFin() { return this.#dateFin; }
    set dateFin(value) { this.#dateFin = value; }

    get produit() { return this.#produit; }
    set produit(value) { this.#produit = value; }

    get prix() { return this.#prix; }
    set prix(value) { this.#prix = value; }

    get type() { return this.#type; }
    set type(value) { this.#type = value; }

    get categorie() { return this.#categorie; }
    set categorie(value) { this.#categorie = value; }

    get presencePorc() { return this.#presencePorc; }
    set presencePorc(value) { this.#presencePorc = value; }

    get presenceAlcool() { return this.#presenceAlcool; }
    set presenceAlcool(value) { this.#presenceAlcool = value; }

    get composants() { return this.#composants; }
    set composants(value) { this.#composants = value; }

    get allergenes() { return this.#allergenes; }
    set allergenes(value) { this.#allergenes = value; }

    get allergenesCroises() { return this.#allergenesCroises; }
    set allergenesCroises(value) { this.#allergenesCroises = value; }

    get kcal() { return this.#kcal; }
    set kcal(value) { this.#kcal = value; }

    get vegetarien() { return this.#vegetarien; }
    set vegetarien(value) { this.#vegetarien = value; }

    get vegan() { return this.#vegan; }
    set vegan(value) { this.#vegan = value; }

    get bio() { return this.#bio; }
    set bio(value) { this.#bio = value; }

    get sansGluten() { return this.#sansGluten; }
    set sansGluten(value) { this.#sansGluten = value; }

    get poids() { return this.#poids; }
    set poids(value) { this.#poids = value; }

    get proteines() { return this.#proteines; }
    set proteines(value) { this.#proteines = value; }

    get glucides() { return this.#glucides; }
    set glucides(value) { this.#glucides = value; }

    get lipides() { return this.#lipides; }
    set lipides(value) { this.#lipides = value; }

    getHtmlRecherche() {
        let html = "";
        if (this.vegetarien === "OUI"){
            html += '<img class="img-food-search" src="img/food-no-meat-svgrepo-com.svg" alt="no-meat"/>';
        }
        if (this.vegan === "OUI"){
            html += '<img class="img-food-search" src="img/vegan-svgrepo-com.svg" alt="vegan"/>';
        }
        if (this.presencePorc === "OUI"){
            html += '<img class="img-food-search" src="img/pig-illustration-svgrepo-com.svg" alt="porc"/>';
        }
        return '<div class="search-plat"> <p>' + this.#produit + '</p> <div class="search-left-plat">'+html+'<p>' + this.#prix + '€</p> <button id="btn-'+this.produit+' class="search-btn"><img src="img/add-favorite-marked-svgrepo-com.svg"/></button></div> </div>';
    }

    engeristrerLocal() {
        let listLocaleStorage = localStorage.getItem("plat");
        if (listLocaleStorage === null) {
            listLocaleStorage = [];
        } else {
            listLocaleStorage = JSON.parse(listLocaleStorage);
        }
        listLocaleStorage.push(this.#produit);
        localStorage.setItem("plat", JSON.stringify(listLocaleStorage));
    }

    supprimerLocal() {
        let listLocaleStorage = localStorage.getItem("plat");
        if (listLocaleStorage === null) {
            listLocaleStorage = [];
        } else {
            listLocaleStorage = JSON.parse(listLocaleStorage);
        }
        listLocaleStorage = listLocaleStorage.filter(plat => plat !== this.#produit);
        localStorage.setItem("plat", JSON.stringify(listLocaleStorage));
    }
}