// Filtre bulle appareils

import { recipes } from "./recipes.js";

let filterButtonApp = document.getElementById("appliancesFilter");
let filterMenuApp = document.getElementById("appliancesFilterList");

filterButtonApp.addEventListener("click", function () {
  filterMenuApp.classList.toggle("show");

  console.log(filterMenuApp.classList.toggle("show"))

  let arrowApp = document.getElementById("arrow_app");
  if (filterMenuApp.classList.toggle("show")) {
    arrowApp.classList.replace("fa-angle-down", "fa-angle-up");
  } else {
    arrowApp.classList.replace("fa-angle-up", "fa-angle-down");
  }
});

let uniqueAppliances = new Set();

export function filterAppLabels(premadeData) {
  uniqueAppliances = new Set();
  premadeData.forEach((appliance) => {
    uniqueAppliances.add(appliance.appliance);
  });
  let sortedAppliances = Array.from(uniqueAppliances).sort();

  displayFilterAppliances(sortedAppliances);
}

filterAppLabels(recipes)

let sortedAppliances = Array.from(uniqueAppliances).sort();

displayFilterAppliances(sortedAppliances);

const searchFieldAppliances = document.getElementById('inputAppliances');
searchFieldAppliances.addEventListener('keyup', function () {
  if (searchFieldAppliances.value.length >= 3) {
    let regex = new RegExp(searchFieldAppliances.value, 'gmi');
    let filteredAppliances = sortedAppliances.filter(appliance => {
      return appliance.match(regex);
    });
    displayFilterAppliances(filteredAppliances);
  } else {
    displayFilterAppliances(sortedAppliances);
  }
});

let crossResearchClearApp = document.getElementById("clear_app");

crossResearchClearApp.addEventListener("click", function () {
  crossResearchClearApp.previousElementSibling.value = "";
  displayFilterAppliances(sortedAppliances);
});

function displayFilterAppliances(data) {

  let anchorAppliances = document.getElementById("appliancesAnchor");
  anchorAppliances.innerHTML = "";

  data.forEach(item => {
    const recipeAppliances = item;
    const appliancesFilterName = document.createElement('li');
    appliancesFilterName.setAttribute("class", "li_item")
    appliancesFilterName.onclick = () => { selectFilter(item, "appliance"), udapteFilter(item, "appliance") }
    appliancesFilterName.innerHTML = recipeAppliances
    appliancesFilterName.addEventListener("click", function () {
      filterMenuApp.classList.toggle("show");

      console.log(filterMenuApp.classList.toggle("show"))

      let arrowApp = document.getElementById("arrow_app");
      if (filterMenuApp.classList.toggle("show")) {
        arrowApp.classList.replace("fa-angle-down", "fa-angle-up");
      } else {
        arrowApp.classList.replace("fa-angle-up", "fa-angle-down");
      }
    });
    anchorAppliances.appendChild(appliancesFilterName)
  });
}