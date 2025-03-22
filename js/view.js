export const view = {
    
    borderlineHeader: document.getElementById("borderline-header"),

    headerLink: document.getElementsByClassName("header-link"),

    searchBar : document.getElementById("search-bar"),
    
    searchBox : document.getElementById("search-box"),

    searchInput : document.getElementById("input-search"),

    btnProduits : document.getElementsByClassName("search-btn"),

    markekSection : document.getElementById("marked-section"),

    clearSearchBox() {
        this.searchBox.innerHTML = "";
        this.searchBox.style.opacity = `0`;
        this.searchBox.style.zIndex = `-1`;
        this.searchBar.style.borderBottomLeftRadius = `32px`;
        this.searchBar.style.borderBottomRightRadius = `32px`;
    },

    generateHtmlForPlat(plat, isMarked) {
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
                    <button style="background-color: #8de8fe;" id="btn-${plat.produit}" class="search-btn">
                        <img src="img/add-favorite-marked-svgrepo-com.svg"/>
                    </button>
                </div>
            </div>
        `;
        }
    },

    displaySearchResults(plats, onAddCallback, isMarked) {
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
                html = this.generateHtmlForPlat(plat,false);
            } else {
                html = this.generateHtmlForPlat(plat,true);
            }
            this.searchBox.innerHTML += html;
        });
        Array.from(this.btnProduits).forEach(btn => {
            btn.addEventListener("click", () => onAddCallback(btn.id.split("-")[1]));
        });
    },

    clearMarkedSection() {
        this.markekSection.innerHTML = "";
    },

    addMarkedPlat(plat) {
        const html = this.generateHtmlForPlat(plat);
        this.markekSection.innerHTML += html;
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
    }
    
};