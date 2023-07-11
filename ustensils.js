// Filtre bulle ustensiles

import { recipes } from "./recipes.js";

let filterButtonUst = document.getElementById("ustensilsFilter");
let filterMenuUst = document.getElementById("ustensilsFilterList");

filterButtonUst.addEventListener("click", function () {
  filterMenuUst.classList.toggle("show");

  console.log(filterMenuUst.classList.toggle("show"))

  let arrowUst = document.getElementById("arrow_ust");
  if (filterMenuUst.classList.toggle("show")) {
    arrowUst.classList.replace("fa-angle-down", "fa-angle-up");
  } else {
    arrowUst.classList.replace("fa-angle-up", "fa-angle-down");
  }
});

let uniqueUstensils = new Set();

export function filterUstLabels(premadeData) {
  uniqueUstensils = new Set();
  premadeData.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      uniqueUstensils.add(ustensil);
    });
  });
  let sortedUstensils = Array.from(uniqueUstensils).sort();
  displayFilterUstensils(sortedUstensils);
}

filterUstLabels(recipes)

let sortedUstensils = Array.from(uniqueUstensils).sort();

displayFilterUstensils(sortedUstensils);

const searchFieldUstensils = document.getElementById('inputUstensils');
searchFieldUstensils.addEventListener('keyup', function () {
  if (searchFieldUstensils.value.length >= 3) {
    let regex = new RegExp(searchFieldUstensils.value, 'gmi');
    let filteredUstensils = sortedUstensils.filter(appliance => {
      return appliance.match(regex);
    });
    displayFilterUstensils(filteredUstensils);
  } else {
    displayFilterUstensils(sortedUstensils);
  }
});

let crossResearchClearUst = document.getElementById("clear_ust");

crossResearchClearUst.addEventListener("click", function () {
  crossResearchClearUst.previousElementSibling.value = "";
  displayFilterUstensils(sortedUstensils);
});

function displayFilterUstensils(data) {

  let anchorUstensils = document.getElementById("ustensilsAnchor");
  anchorUstensils.innerHTML = "";

  data.forEach(item => {
    const recipeUstensils = item;
    const ustensilsFilterName = document.createElement('li');
    ustensilsFilterName.setAttribute("class", "li_item")
    ustensilsFilterName.onclick = () => { selectFilter(item, "ustensil"), udapteFilter(item, "ustensil") }
    ustensilsFilterName.innerHTML = recipeUstensils
    ustensilsFilterName.addEventListener("click", function () {
      filterMenuUst.classList.toggle("show");

      console.log(filterMenuUst.classList.toggle("show"))

      let arrowUst = document.getElementById("arrow_ust");
      if (filterMenuUst.classList.toggle("show")) {
        arrowUst.classList.replace("fa-angle-down", "fa-angle-up");
      } else {
        arrowUst.classList.replace("fa-angle-up", "fa-angle-down");
      }
    });
    anchorUstensils.appendChild(ustensilsFilterName)
  });
}