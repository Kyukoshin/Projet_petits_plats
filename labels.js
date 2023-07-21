import { recipes } from "./recipes.js";

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
    
    if (item.classList.toggle("show")) {
      arrow.classList.replace("fa-angle-down", "fa-angle-up");
    } else {
      arrow.classList.replace("fa-angle-up", "fa-angle-down");
    }
}

let uniqueIngredients = new Set();

export function filterIngLabels(premadeData) {
  uniqueIngredients = new Set();
  premadeData.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      uniqueIngredients.add(ingredient.ingredient);
    });
  });
  let sortedIngredients = Array.from(uniqueIngredients).sort();

  displayFilterItems(sortedIngredients, "Ing")
}

filterIngLabels(recipes)

function displayFilterItems(data, type) {

    const anchorElement = document.getElementById(type + "Anchor");
    console.log(type)
    console.log(anchorElement)
    anchorElement.innerHTML = "";
  
    data.forEach(item => {
      const filterItem = item;
      const filterElement = document.createElement('li');
      filterElement.setAttribute("class", "li_item");
      filterElement.onclick = () => { selectFilter(item, type), udapteFilter(item, type) };
      filterElement.innerHTML = filterItem;
      filterElement.click(displayLabel(type))
      anchorElement.appendChild(filterElement);
    });
  }