//Filtre bulle ingrédients

import { recipes } from "./recipes.js";

let filterButtonIng = document.getElementById("ingredientsFilter");
let filterMenuIng = document.getElementById("ingredientsFilterList");

filterButtonIng.addEventListener("click", function () {
  filterMenuIng.classList.toggle("show")

  console.log(filterMenuIng.classList.toggle("show"))

  let arrowIng = document.getElementById("arrow_ing");
  if (filterMenuIng.classList.toggle("show")) {
    arrowIng.classList.replace("fa-angle-down", "fa-angle-up");
  } else {
    arrowIng.classList.replace("fa-angle-up", "fa-angle-down");
  }
});

let uniqueIngredients = new Set();

export function filterIngLabels(premadeData) {
  uniqueIngredients = new Set();
  premadeData.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      uniqueIngredients.add(ingredient.ingredient);
    });
  });
  let sortedIngredients = Array.from(uniqueIngredients).sort();

  displayFilterItems(sortedIngredients)
}

filterIngLabels(recipes)

let sortedIngredients = Array.from(uniqueIngredients).sort();

displayFilterItems(sortedIngredients);

const searchFieldIngredients = document.getElementById('inputIngredients');
searchFieldIngredients.addEventListener('keyup', function () {
  if (searchFieldIngredients.value.length >= 3) {
    let regex = new RegExp(searchFieldIngredients.value, 'gmi');
    let filteredIngredients = sortedIngredients.filter(recipe => {
      return recipe.match(regex);
    });
    displayFilterItems(filteredIngredients);
  } else {
    displayFilterItems(sortedIngredients);
  }
});

let crossResearchClearIng = document.getElementById("clear_ing");

crossResearchClearIng.addEventListener("click", function () {
  crossResearchClearIng.previousElementSibling.value = "";
  displayFilterItems(sortedIngredients);
});

function displayFilterItems(data) {

  let anchorIngredients = document.getElementById("ingredientAnchor");
  anchorIngredients.innerHTML = "";

  data.forEach(item => {
    const recipeIngredients = item;
    const ingredientFilterName = document.createElement('li');
    ingredientFilterName.setAttribute("class", "li_item")
    ingredientFilterName.onclick = () => { selectFilter(item, "ingredient"), udapteFilter(item, "ingredient") }
    ingredientFilterName.innerHTML = recipeIngredients
    ingredientFilterName.addEventListener("click", function () {
      filterMenuIng.classList.toggle("show")

      console.log(filterMenuIng.classList.toggle("show"))

      let arrowIng = document.getElementById("arrow_ing");
      if (filterMenuIng.classList.toggle("show")) {
        arrowIng.classList.replace("fa-angle-down", "fa-angle-up");
      } else {
        arrowIng.classList.replace("fa-angle-up", "fa-angle-down");
      }
    });
    anchorIngredients.appendChild(ingredientFilterName)
  });
}