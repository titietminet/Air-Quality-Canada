export class Plat {
    #id;
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

    constructor(id, dateDebut, dateFin, produit, prix, type, categorie, presencePorc, presenceAlcool, composants, allergenes, allergenesCroises, kcal, vegetarien, vegan, bio, sansGluten, poids, proteines, glucides, lipides) {
        this.#id = id;
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

    get id() { return this.#id; }
    set id(value) { this.#id = value; }

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
}