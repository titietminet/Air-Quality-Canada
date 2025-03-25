export class modelRepas {
    constructor(nom) {
        this._nom = nom;
        this._plats = [];
    }

    addPlat(plat) {
        this.plats.push(plat);
        this.enregistrerLocal();
    }

    removePlat(plat) {
        this.plats = this.plats.filter(p => p !== plat);
        this.enregistrerLocal();
    }

    get plats() {
        return this._plats;
    }

    getlat(nom) {
        return this.plats.find(p => p.produit === nom);
    }

    get nom() {
        return this._nom;
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
            if (plat.presenceAlcool === "OUI") {
                presenceAlcool = true;
            }
        }
        return presenceAlcool;
    }

    isVegetarien() {
        vegetarien = true;
        for (const plat of this.plats) {
            if (plat.vegetarien === "NON") {
                vegetarien = false;
            }
        }
        return vegetarien;
    }

    isVegan() {
        vegan = false;
        for (const plat of this.plats) {
            if (plat.vegan === "OUI") {
                vegan = true;
            }
        }
        return vegan;
    }

    isBio() {
        bio = true;
        for (const plat of this.plats) {
            if (plat.bio === "NON") {
                bio = false;
            }
        }
        return bio;
    }

    isSansGluten() {
        sansGluten = true;
        for (const plat of this.plats) {
            if (plat.sansGluten === "NON") {
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


    enregistrerLocal() {
        let listLocalStorage = localStorage.getItem("repas");
        if (listLocalStorage === null) {
            listLocalStorage = [];
        } else {
            listLocalStorage = JSON.parse(listLocalStorage);
        }

        listLocalStorage[this.nom] = this;

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
        listLocaleStorage = listLocaleStorage.filter(p => p !== this.nom);
        localStorage.setItem('repas', JSON.stringify(listLocaleStorage));
    }

    getHtmlRepas() {
        let html = "";
        html += '<div class="repas-box">';
        html += '<h1 class="repas-title">Repas ' + this.nom + '</h1>';
        
        // Liste des plats
        html += '<div class="plats">';
        for (const plat of this.plats) {
            html += '<p>' + plat.produit + ' - ' + plat.prix + '€</p>';
        }
        html += '</div>';
    
        // Icônes
        html += '<div class="repas-icons">';
        if (this.isVegetarien()) {
            html += '<img class="img-food-search" src="img/food-no-meat-svgrepo-com.svg" alt="no-meat"/>';
        }
        if (this.isVegan()) {
            html += '<img class="img-food-search" src="img/vegan-svgrepo-com.svg" alt="vegan"/>';
        }
        if (this.isPresencePorc()) {
            html += '<img class="img-food-search" src="img/pig-illustration-svgrepo-com.svg" alt="porc"/>';
        }
        html += '</div>';
    
        // Infos nutritionnelles en ligne
        html += '<div class="nutrition-info">';
        html += '<p>Glucides : ' + this.getGlucides() + 'g</p>';
        html += '<p>Protéines : ' + this.getProteines() + 'g</p>';
        html += '<p>Lipides : ' + this.getLipides() + 'g</p>';
        html += '<p>Kcal : ' + this.getKcal() + '</p>';
        html += '</div>';
    
        // Allergènes sous forme de box grises
        const allergenes = this.getAllergenes();
        if (allergenes.length > 0) {
            html += '<div class="allergenes-container">';
            for (const allergene of allergenes) {
                html += '<span class="allergene-box">' + allergene + '</span>';
            }
            html += '</div>';
        }
    
        // Prix à droite en gras
        html += '<p class="prix">Prix : ' + this.getPrix() + '€</p>';
        
        html += '</div>';
        
        return html;
    }
    
}