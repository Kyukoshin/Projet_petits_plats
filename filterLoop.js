const searchField = document.querySelector('input');

import { filterIngLabels } from './ingredients.js';
import { filterUstLabels } from './ustensils.js';
import { filterAppLabels } from './appliances.js';
/* import { filterLabels } from './labels.js'; */

searchField.addEventListener('keyup', function () {
  crossDisplay()
  if (searchField.value.length >= 3) {
    let regex = new RegExp(searchField.value, 'gmi');
    let filteredRecipes = localRecipes.filter(recipe => {
      const matchedIngredients = recipe.ingredients.filter(ingredient => {
        return ingredient.ingredient.match(regex);
      });
      return (
        recipe.name.match(regex) ||
        recipe.description.match(regex) || // Add recipe.description matching
        matchedIngredients.length > 0
      );
    });

    if (filteredRecipes.length === 0) {
      recipesCounter.textContent = "0 recettes";
    }

    filterRecipes(filteredRecipes);
    filterIngLabels(filteredRecipes);
    filterUstLabels(filteredRecipes);
    filterAppLabels(filteredRecipes);
/*     filterLabels(filteredRecipes); */
  } else {
    filterRecipes(localRecipes);
    filterIngLabels(localRecipes);
    filterUstLabels(localRecipes);
    filterAppLabels(localRecipes);
/*     filterLabels(localRecipes); */
  }
});

filterRecipes(localRecipes)

function crossDisplay(){
  if (searchField.value.length > 0) {
    let crossClearMain = document.getElementById("clear_main")
    crossClearMain.style.visibility = "visible"
  }
  if (searchField.value.length == 0) {
    let crossClearMain = document.getElementById("clear_main")
    crossClearMain.style.visibility = "hidden"
  }
}

const crossClearMain = document.getElementById("clear_main")
const mainResArea = document.getElementById("mainRes")
crossClearMain.addEventListener("click", function () {
mainResArea.value = "";
crossDisplay()
filterRecipes(localRecipes);
filterIngLabels(localRecipes);
filterUstLabels(localRecipes);
filterAppLabels(localRecipes);
});