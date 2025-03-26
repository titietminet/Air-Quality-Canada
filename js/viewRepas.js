export const view = {
    
    sectionRepas : document.getElementById("repas-container"),

    getHtmlRepas(lRepas) {
        this.sectionRepas.innerHTML = "";
        let html = "";
        lRepas.forEach(repas => {
            html += '<div class="repas-box">';
            html += '<h1 class="repas-title">' + repas.nom + '</h1>';
            
            // Liste des plats
            html += '<div class="plats">';
            for (const plat of repas.plats) {
                html += '<div class="plat-item">';
                html += '<p class="plat-nom">' + plat.produit +'</p>';
                html += '<p class="plat-prix">' + plat.prix +  ' €</p>';
                html += '</div>';
            }
            html += '</div>';
        
            // Icônes
            html += '<div class="repas-icons">';
            if (repas.isVegetarien()) {
                html += '<img class="img-food-search" src="img/food-no-meat-svgrepo-com.svg" alt="no-meat"/>';
            }
            if (repas.isVegan()) {
                html += '<img class="img-food-search" src="img/vegan-svgrepo-com.svg" alt="vegan"/>';
            }
            if (repas.isPresencePorc()) {
                html += '<img class="img-food-search" src="img/pig-illustration-svgrepo-com.svg" alt="porc"/>';
            }
            html += '</div>';
        
            // Infos nutritionnelles en ligne
            html += '<div class="nutrition-info">';
            html += '<p>Glucides : ' + repas.getGlucides() + 'g</p>';
            html += '<p>Protéines : ' + repas.getProteines() + 'g</p>';
            html += '<p>Lipides : ' + repas.getLipides() + 'g</p>';
            html += '<p>Kcal : ' + repas.getKcal() + '</p>';
            html += '</div>';
        
            // Allergènes sous forme de box grises
            const allergenes = repas.getAllergenes();
            if (allergenes.length > 0) {
                html += '<div class="allergenes-container">';
                for (const allergene of allergenes) {
                    html += '<span class="allergene-box">' + allergene + '</span>';
                }
                html += '</div>';
            }
        
            // Prix à droite en gras
            html += '<p class="prix">Prix : ' + repas.getPrix() + ' €</p>';
            
            html += '</div>';
        });
        this.sectionRepas.innerHTML = html;
    }
};