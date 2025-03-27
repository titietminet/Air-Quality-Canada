export class modelRepas {

    #nom;

    #plats;

    constructor(nom, plats = []) {
        this.#nom = nom;
        this.#plats = plats;
    }

    addPlat(plat) {
        this.#plats.push(plat);
        this.enregistrerLocal();
    }

    removePlat(plat) {
        this.#plats = this.#plats.filter(p => p !== plat);
        this.enregistrerLocal();
    }

    get plats() {
        return this.#plats;
    }

    getlat(nom) {
        return this.#plats.find(p => p.produit === nom);
    }

    get nom() {
        return this.#nom;
    }

    getPrix() {
        let prix = 0;
        for (const plat of this.#plats) {
            prix += plat.prix;
        }
        return prix.toFixed(2);
    }

    getKcal() {
        let kcal = 0;
        for (const plat of this.#plats) {
            kcal += plat.kcal;
        }
        return kcal.toFixed(2);
    }

    getProteines() {
        let proteines = 0;
        for (const plat of this.#plats) {
            proteines += plat.proteines;
        }
        return proteines.toFixed(2);
    }

    getGlucides() {
        let glucides = 0;
        for (const plat of this.#plats) {
            glucides += plat.glucides;
        }
        return glucides.toFixed(2); 
    }

    getLipides() {
        let lipides = 0;
        for (const plat of this.#plats) {
            lipides += plat.lipides;
        }
        return lipides.toFixed(2);
    }

    isPresenceAlcool() {
        let presenceAlcool = false;
        for (const plat of this.#plats) {
            if (plat.presenceAlcool === "OUI") {
                presenceAlcool = true;
            }
        }
        return presenceAlcool;
    }

    isVegetarien() {
        let vegetarien = true;
        for (const plat of this.#plats) {
            if (plat.vegetarien === "NON") {
                vegetarien = false;
            }
        }
        return vegetarien;
    }

    isVegan() {
        let vegan = true;
        for (const plat of this.#plats) {
            if (plat.vegan === "NON") {
                vegan = false;
            }
        }
        return vegan;
    }

    isBio() {
        let bio = true;
        for (const plat of this.#plats) {
            if (plat.bio === "NON") {
                bio = false;
            }
        }
        return bio;
    }

    isSansGluten() {
        let sansGluten = true;
        for (const plat of this.#plats) {
            if (plat.sansGluten === "NON") {
                sansGluten = false;
            }
        }
        return sansGluten;
    }  

    isPresencePorc() {
        let presencePorc = false;
        for (const plat of this.#plats) {
            if (plat.presencePorc) {
                presencePorc = true;
            }
        }
        return presencePorc;
    }
    
    getAllergenes() {
        let allergenes = new Set(); //set pour éviter les doublons
    
        for (const plat of this.#plats) {
            if (plat.allergenes && plat.allergenes.trim() !== "") { 
                let listeAllergenes = plat.allergenes.split(",").map(a => a.trim()); 
    
                for (const allergene of listeAllergenes) {
                    allergenes.add(allergene.toLowerCase()); 
                }
            }
        }
    
        return Array.from(allergenes); //conversion en array
    }
    

    enregistrerLocal() {
        let listLocalStorage = localStorage.getItem("repas");
        if (listLocalStorage === null) {
            listLocalStorage = [];
        } else {
            listLocalStorage = JSON.parse(listLocalStorage);
        }

        listLocalStorage[this.#nom] = this;

        localStorage.setItem('repas', JSON.stringify(listLocalStorage));
    }

    /*
    static loadFromLocalStorage(nom) {
        const repasCollection = modelRepas.getAllRepas();
        if (!repasCollection[nom]) return null;

        const obj = repasCollection[nom];
        const repas = new modelRepas(obj.nom);
        repas.plats = obj.plats;
        return repas;
    }
        */

    supprimerLocal() {
        let listLocaleStorage = localStorage.getItem("repas");
        if(listLocaleStorage === null) {
            listLocaleStorage = [];
        }
        else {
            listLocaleStorage = JSON.parse(listLocaleStorage);
        }
        listLocaleStorage = listLocaleStorage.filter(p => p !== this.#nom);
        localStorage.setItem('repas', JSON.stringify(listLocaleStorage));
    }


    
}