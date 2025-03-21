export class modelRepas {
    constructor(nom) {
        this.nom = nom;
        this.plats = [];
    }

    addPlat(plat) {
        this.plats.push(plat);
        this.saveToLocalStorage();
    }

    removePlat(plat) {
        this.plats = this.plats.filter(p => p !== plat);
        this.saveToLocalStorage();
    }

    get plats() {
        return this.plats;
    }

    getlat(nom) {
        return this.plats.find(p => p.produit === nom);
    }

    get nom() {
        return this.nom;
    }

    getPrix() {
        prix = 0;
        for (const plat of this.plats) {
            prix += plat.prix;
        }
        return prix;
    }

    getKcal() {
        kcal = 0;
        for (const plat of this.plats) {
            kcal += plat.kcal;
        }
        return kcal;
    }

    getProteines() {
        proteines = 0;
        for (const plat of this.plats) {
            proteines += plat.proteines;
        }
        return proteines;
    }

    getGlucides() {
        glucides = 0;
        for (const plat of this.plats) {
            glucides += plat.glucides;
        }
        return glucides;
    }

    getLipides() {
        lipides = 0;
        for (const plat of this.plats) {
            lipides += plat.lipides;
        }
        return lipides;
    }

    isPresenceAlcool() {
        presenceAlcool = false;
        for (const plat of this.plats) {
            if (plat.presenceAlcool == "OUI") {
                presenceAlcool = true;
            }
        }
        return presenceAlcool;
    }

    isVegetarien() {
        vegetarien = true;
        for (const plat of this.plats) {
            if (plat.vegetarien == "NON") {
                vegetarien = false;
            }
        }
        return vegetarien;
    }

    isVegan() {
        vegan = false;
        for (const plat of this.plats) {
            if (plat.vegan == "OUI") {
                vegan = true;
            }
        }
        return vegan;
    }

    isBio() {
        bio = true;
        for (const plat of this.plats) {
            if (plat.bio == "NON") {
                bio = false;
            }
        }
        return bio;
    }

    isSansGluten() {
        sansGluten = true;
        for (const plat of this.plats) {
            if (plat.sansGluten == "NON") {
                sansGluten = false;
            }
        }
        return sansGluten;
    }  

    isPresencePorc() {
        presencePorc = false;
        for (const plat of this.plats) {
            if (plat.presencePorc) {
                presencePorc = true;
            }
        }
        return presencePorc;
    }
    
    getAllergenes() {
        allergenes = [];
        for (const plat of this.plats) {
            for (const allergene of plat.allergenes) {
                if (!allergenes.includes(allergene)) {
                    allergenes.push(allergene);
                }
            }
        }
        return allergenes;
    }

    static getAllRepas() {
        const repasData = localStorage.getItem('repasCollection');
        return repasData ? JSON.parse(repasData) : {};
    }

    static saveToLocalStorage() {
        const repas = modelRepas.getAllRepas();
        repas[this.nom] = this;
        localStorage.setItem('repasCollection', JSON.stringify(repas));
    }

    static loadFromLocalStorage(nom) {
        const repasCollection = modelRepas.getAllRepas();
        if (!repasCollection[nom]) return null;

        const obj = repasCollection[nom];
        const repas = new modelRepas(obj.nom);
        repas.plats = obj.plats;
        return repas;
    }

    static removeRepas(nom) {
        const repasCollection = modelRepas.getAllRepas();
        delete repasCollection[nom];
        localStorage.setItem('repasCollection', JSON.stringify(repasCollection));
    }
}