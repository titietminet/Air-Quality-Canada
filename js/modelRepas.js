export class modelRepas {
    constructor(nom) {
        this.nom = nom;
        this.plats = [];
    }

    addPlat(plat) {
        this.plats.push(plat);
    }

    removePlat(plat) {
        this.plats = this.plats.filter(p => p !== plat);
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
            if (plat.presenceAlcool) {
                presenceAlcool = true;
            }
        }
        return presenceAlcool;
    }

    isVegetarien() {
        vegetarien = false;
        for (const plat of this.plats) {
            if (plat.vegetarien) {
                vegetarien = true;
            }
        }
        return vegetarien;
    }

    isVegan() {
        vegan = false;
        for (const plat of this.plats) {
            if (plat.vegan) {
                vegan = true;
            }
        }
        return vegan;
    }

    isBio() {
        bio = false;
        for (const plat of this.plats) {
            if (plat.bio) {
                bio = true;
            }
        }
        return bio;
    }

    isSansGluten() {
        sansGluten = false;
        for (const plat of this.plats) {
            if (plat.sansGluten) {
                sansGluten = true;
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
    
}