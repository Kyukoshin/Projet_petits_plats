import { recipes } from "./recipes.js";
import { selectFilter } from './script.js';
import { updateFilter } from './script.js';

let filterButtonIng = document.getElementById("ingredientsFilter");
filterButtonIng.onclick = () => {displayLabel("Ing")}

let filterButtonUst = document.getElementById("ustensilsFilter");
filterButtonUst.onclick = () => {displayLabel("Ust")}

let filterButtonApp = document.getElementById("appliancesFilter");
filterButtonApp.onclick = () => {displayLabel("App")}

function displayLabel(type){
    let item = document.getElementById(type + "FilterList");
    let arrow = document.getElementById("arrow_"+type);
    item.classList.toggle("show")  
   
    console.log(item.classList.toggle("show"))
    
    if (item.classList.toggle("show")) {
      arrow.classList.replace("fa-angle-down", "fa-angle-up");
    } else {
      arrow.classList.replace("fa-angle-up", "fa-angle-down");
    }
}

let uniqueIngredients = new Set();
let uniqueUstensils = new Set();
let uniqueAppliances = new Set();

export function filterIngLabels(premadeData) {
  uniqueIngredients = new Set();
  premadeData.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      uniqueIngredients.add(ingredient.ingredient);
    });
  });
  sortedIngredients = Array.from(uniqueIngredients).sort();
  displayFilterItems(sortedIngredients, "Ing")
}

export function filterUstLabels(premadeData) {
  uniqueUstensils = new Set();
  premadeData.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      uniqueUstensils.add(ustensil);
    });
  });
  sortedUstensils = Array.from(uniqueUstensils).sort();
  displayFilterItems(sortedUstensils, "Ust")
}

export function filterAppLabels(premadeData) {
  uniqueAppliances = new Set();
  premadeData.forEach((appliance) => {
    uniqueAppliances.add(appliance.appliance);
  });
  sortedAppliances = Array.from(uniqueAppliances).sort();
  displayFilterItems(sortedAppliances, "App")
}

filterIngLabels(recipes)
filterUstLabels(recipes)
filterAppLabels(recipes)

let crossResearchClearIng = document.getElementById("clear_Ing");
crossResearchClearIng.onclick = () => {clearLabelSearch("Ing")}

let crossResearchClearApp = document.getElementById("clear_App");
crossResearchClearApp.onclick = () => {clearLabelSearch("App")}

let crossResearchClearUst = document.getElementById("clear_Ust");
crossResearchClearUst.onclick = () => {clearLabelSearch("Ust")}

function clearLabelSearch(type) {
  let fieldToClear = document.getElementById("clear_"+type);
  fieldToClear.previousElementSibling.value = "";
  displayFilterItems(sortedIngredients, type);
};

function displayFilterItems(data, type) {

    const anchorElement = document.getElementById(type + "Anchor");
    anchorElement.innerHTML = "";
  
    data.forEach(item => {
      const filterItem = item;
      const filterElement = document.createElement('li');
      filterElement.setAttribute("class", "li_item");
      filterElement.innerHTML = filterItem;
      filterElement.onclick = () => {displayLabel(type), selectFilter(item, type), updateFilter(item, type), console.log("ok")}
      anchorElement.appendChild(filterElement);
    });
  }