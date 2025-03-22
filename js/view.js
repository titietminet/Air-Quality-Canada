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

    generateHtmlForPlat(plat) {
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
    },

    displaySearchResults(plats, onAddCallback) {
        this.searchBox.style.opacity = `1`;
        this.searchBox.style.zIndex = `1`;
        this.searchBox.style.top = `${this.searchBar.getBoundingClientRect().top + window.scrollY + this.searchBar.getBoundingClientRect().height}px`;
        this.searchBox.style.width = `${this.searchBar.getBoundingClientRect().width}px`;
        this.searchBox.style.left = `${this.searchBar.getBoundingClientRect().left}px`;
        plats.forEach(plat => {
            const html = this.generateHtmlForPlat(plat);
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