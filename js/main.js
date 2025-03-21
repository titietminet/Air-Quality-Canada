import { view } from "./view.js";
import { Plat } from "./modelPlat.js";

console.log("main.js");

const listLocaleStorage = localStorage.getItem("like");

const plats = [];

fetch('https://data.sncf.com/api/explore/v2.1/catalog/datasets/menus-des-bars-tgv/records?limit=100',{
    method: 'GET',
}).then(response => response.json())
.then(data => {
    data.results.forEach(element => {
        plats.push(new Plat(element.date_debut, element.date_fin, element.produit, element.prix_au_produit, element.type, element.categorie, element.presence_de_porc, element.presence_alcool, element.composants, element.allergenes, element.allergenes_croises, element.kcal, element.recette_vegetarienne, element.recette_vegane, element.bio, element.sans_gluten, element.poids, element.proteines, element.glucides, element.lipides));
    });
    console.log(plats);
})

for (const el of view.headerLink) {
    el.addEventListener("mouseover", function() {
        console.log(el);
        const borderLineHeader = view.borderlineHeader;
        console.log(el.getBoundingClientRect().left);
        borderLineHeader.style.transform = `translateX(${el.getBoundingClientRect().left}px)`;
        borderLineHeader.style.opacity = `1`;
        borderLineHeader.style.width = `${el.getBoundingClientRect().width}px`;
    });
    el.addEventListener("mouseout", function() {
        const borderLineHeader = view.borderlineHeader;
        borderLineHeader.style.opacity = `0`;
    });
}

view.searchInput.addEventListener("input", function() {
    view.searchBox.innerHTML = "";
    console.log(view.searchInput.value);
    if (view.searchInput.value !== "") {
        view.searchBox.style.opacity = `1`;
        view.searchBox.style.top = `${view.searchBar.getBoundingClientRect().top + window.scrollY + view.searchBar.getBoundingClientRect().height}px`;
        view.searchBox.style.width = `${view.searchBar.getBoundingClientRect().width}px`;
        view.searchBox.style.left = `${view.searchBar.getBoundingClientRect().left}px`;
        view.searchBox.style.zIndex = `1`;
        view.searchBar.style.borderBottomLeftRadius = `0`;
        view.searchBar.style.borderBottomRightRadius = `0`;
        let i = 0;
        while (i < 6 && i < plats.length) {
            if (plats[i].produit.toLowerCase().includes(view.searchInput.value.toLowerCase())) {
                view.searchBox.innerHTML += plats[i].getHtmlRecherche();
            }
            i++;
        }
        console.log(view.searchBox.innerHTML);  
    } else {
        view.searchBox.style.opacity = `0`;
        view.searchBox.style.zIndex = `-1`;
        view.searchBar.style.borderBottomLeftRadius = `32px`;
        view.searchBar.style.borderBottomRightRadius = `32px`;
    }
});

