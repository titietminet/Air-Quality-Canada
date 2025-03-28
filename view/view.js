export const view = {
    
    borderlineHeader: document.getElementById("borderline-header"),

    headerLink: document.getElementsByClassName("header-link"),

    searchBar : document.getElementById("search-bar"),
    
    searchBox : document.getElementById("search-box"),

    searchInput : document.getElementById("input-search"),

    btnProduits : document.getElementsByClassName("search-btn"),

    markekSectionTgv : document.getElementById("tgv-marked"),

    markekSectionIntecrite : document.getElementById("intercite-marked"),

    btnRemovePlat : document.getElementsByClassName("remove-btn"),

    choiceRepas : document.getElementsByClassName("choice-repas"),

    
    clearSearchBox() {
        this.searchBox.innerHTML = "";
        this.searchBox.style.opacity = `0`;
        this.searchBox.style.zIndex = `-1`;
        this.searchBar.style.borderBottomLeftRadius = `32px`;
        this.searchBar.style.borderBottomRightRadius = `32px`;
    },

    generateHtmlForPlat(plat, isMarked, lRepas) {
        let htmlRepas = "";

        for (const repas of lRepas) {
            htmlRepas += `<option value="${repas.nom}">${repas.nom}</option>`;
        }

        let html = "";
        if (plat.vegetarien === "OUI") {
            html += '<img class="img-food-search" src="img/food-no-meat-svgrepo-com.svg" alt="no-meat"/>';
        }
        if (plat.vegan === "OUI") {
            html += '<img class="img-food-search" src="img/vegan-svgrepo-com.svg" alt="vegan"/>';
        }
        if (plat.presencePorc === "OUI") {
            html += '<img class="img-food-search" src="img/pig-illustration-svgrepo-com.svg" alt="porc"/>';
        }
        if (plat.train === "TGV") {
            html += '<img style="height: 0.7rem; width: auto;" class="img-food-search" src="img/TGV.svg" alt="tgv"/>';
        } else {
            html += '<img style="height: auto; width: 2.7rem;" class="img-food-search" src="img/intercite.svg" alt="intercite"/>';
        }
        if (isMarked) {
            return `
                <div class="search-plat">
                    <p>${plat.produit}</p>
                    <div class="search-left-plat">
                        ${html}
                        <p>${plat.prix}€</p>
                        <select class="choice-repas" name="choice-repas" id="select-${plat.produit}">
                            <option value="none">choisir un repas</option>
                            ${htmlRepas}
                            <option value="new">nouveau repas</option>
                        </select>
                        <button id="btn-${plat.produit}" class="search-btn">
                            <img src="img/add-favorite-marked-svgrepo-com.svg"/>
                        </button>
                    </div>
                </div>
            `;
        }else{ 
        return `
            <div class="search-plat">
                <p>${plat.produit}</p>
                <div class="search-left-plat">
                    ${html}
                    <p>${plat.prix}€</p>
                        <select class="choice-repas" name="choice-repas" id="select-${plat.produit}">
                            <option value="none">choisir un repas</option>
                            ${htmlRepas}
                            <option value="new">nouveau repas</option>
                        </select>
                    <button style="background-color: #8de8fe;" id="btn-${plat.produit}" class="search-btn">
                        <img src="img/add-favorite-marked-svgrepo-com.svg"/>
                    </button>
                </div>
            </div>
        `;
        }
    },

    generateHtmlForPlatMarkedSection(plat, lRepas) {

        let htmlRepas = "";

        for (const repas of lRepas) {
            htmlRepas += `<option value="${repas.nom}">${repas.nom}</option>`;
        }
        
        let html = "";
        if (plat.vegetarien === "OUI") {
            html += '<img class="img-food-search" src="img/food-no-meat-svgrepo-com.svg" alt="no-meat"/>';
        }
        if (plat.vegan === "OUI") {
            html += '<img class="img-food-search" src="img/vegan-svgrepo-com.svg" alt="vegan"/>';
        }
        if (plat.presencePorc === "OUI") {
            html += '<img class="img-food-search" src="img/pig-illustration-svgrepo-com.svg" alt="porc"/>';
        }
        if (plat.train === "TGV") {
            html += '<img style="height: 0.7rem; width: auto;" class="img-food-search" src="img/TGV.svg" alt="tgv"/>';
        } else {
            html += '<img style="height: auto; width: 2.7rem;" class="img-food-search" src="img/intercite.svg" alt="intercite"/>';
        }
        return `
            <div style="width: 90%;" class="search-plat">
                <p>${plat.produit}</p>
                <div class="search-left-plat">
                    ${html}
                    <p>${plat.prix}€</p>
                        <select class="choice-repas" name="choice-repas" id="select-${plat.produit}">
                            <option value="none">choisir un repas</option>
                            ${htmlRepas}
                            <option value="new">nouveau repas</option>
                        </select>
                    <button style="background-color: #8de8fe;" id="btn-${plat.produit}" class="remove-btn">
                        <img src="img/add-favorite-marked-svgrepo-com.svg"/>
                    </button>
                </div>
            </div>
        `;
    },

    displaySearchResults(plats, onAddCallback, isMarked, repas) {
        this.searchBar.style.borderBottomLeftRadius = `0`;
        this.searchBar.style.borderBottomRightRadius = `0`;
        this.searchBox.style.opacity = `1`;
        this.searchBox.style.zIndex = `1`;
        this.searchBox.style.borderBottom = `1px solid #000`;
        this.searchBox.style.borderLeft = `1px solid #000`;
        this.searchBox.style.borderRight = `1px solid #000`;
        this.searchBar.style.borderTop = `1px solid #000`;
        this.searchBar.style.borderLeft = `1px solid #000`;
        this.searchBar.style.borderRight = `1px solid #000`;
        this.searchBox.style.top = `${this.searchBar.getBoundingClientRect().top + window.scrollY + this.searchBar.getBoundingClientRect().height}px`;
        this.searchBox.style.width = `${this.searchBar.getBoundingClientRect().width}px`;
        this.searchBox.style.left = `${this.searchBar.getBoundingClientRect().left}px`;
        plats.forEach(plat => {
            let html = "";
            if(isMarked.find(p => p.produit === plat.produit) !== undefined) {  
                html = this.generateHtmlForPlat(plat,false, repas);
            } else {
                html = this.generateHtmlForPlat(plat,true, repas);
            }
            this.searchBox.innerHTML += html;
        });
        Array.from(this.btnProduits).forEach(btn => {
            btn.addEventListener("click", () => onAddCallback(btn.id.split("-")[1]));
        });
    },

    clearMarkedSection() {
        if (this.markekSectionTgv) {
            Array.from(this.markekSectionTgv.children).forEach(child => {
                if (child.tagName !== "H1") {
                    child.remove();
                }
            });
        }
        if (this.markekSectionIntecrite) {
            Array.from(this.markekSectionIntecrite.children).forEach(child => {
                if (child.tagName !== "H1") {
                    child.remove();
                }
            });
        }
    },

    addMarkedPlat(plats, onRemoveCallback, repas) {
        this.clearMarkedSection();
        plats.forEach(plat => {
            if (plat.train === "TGV") {
                const html = this.generateHtmlForPlatMarkedSection(plat, repas);
                this.markekSectionTgv.innerHTML += html;
            } else {
                const html = this.generateHtmlForPlatMarkedSection(plat, repas);
                this.markekSectionIntecrite.innerHTML += html;
            }
        });
        Array.from(this.btnRemovePlat).forEach(btn => {
            btn.addEventListener("click", () => onRemoveCallback(btn.id.split("-")[1]));
        });
    },

    handleHeaderHover(element, isHovering) {
        const borderLineHeader = this.borderlineHeader;
        if (isHovering) {
            borderLineHeader.style.transform = `translateX(${element.getBoundingClientRect().left}px)`;
            borderLineHeader.style.opacity = `1`;
            borderLineHeader.style.width = `${element.getBoundingClientRect().width}px`;
        } else {
            borderLineHeader.style.opacity = `0`;
        }
    },
    
    getHtmlRepas(repas) {
        let html = "";
        html += '<div class="repas-box">';
        html += '<h1 class="repas-title">Repas ' + repas.nom + '</h1>';
        
        // Liste des plats
        html += '<div class="plats">';
        for (const plat of repas.plats) {
            html += '<p>' + plat.produit + ' - ' + plat.prix + '€</p>';
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
        html += '<p class="prix">Prix : ' + repas.getPrix() + '€</p>';
        
        html += '</div>';
        
        return html;
    }
};