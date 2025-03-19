import { view } from "./view.js";
import { Plat } from "./modelPlat.js";

console.log("main.js");

const listLocaleStorage = localStorage.getItem("like");

fetch('https://data.sncf.com/api/explore/v2.1/catalog/datasets/menus-des-bars-tgv/records?limit=20',{
    method: 'GET',
}).then(response => response.json())
.then(data => {console.log(data)
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