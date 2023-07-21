const searchField = document.querySelector('input');

import { filterIngLabels } from './ingredients.js';
import { filterUstLabels } from './ustensils.js';
import { filterAppLabels } from './appliances.js';
import { filterRecipes } from './script.js';
/* import { filterLabels } from './labels.js'; */

searchField.addEventListener('keyup', function(){findAllMatchingRecipes()});

export function findAllMatchingRecipes() {
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
    console.log(combinedTable)
    if (combinedTable.length === 0){
      combinedTable = localRecipes
    }
    let resultAll = findCommonMatchingIds(filteredRecipes,combinedTable)
    console.log(filteredRecipes)
    console.log(combinedTable)
    console.log(resultAll)

    filterRecipes(resultAll);
    filterIngLabels(resultAll);
    filterUstLabels(resultAll);
    filterAppLabels(resultAll);
/*     filterLabels(filteredRecipes); */
  } else {
    filterRecipes(combinedTable);
    filterIngLabels(combinedTable);
    filterUstLabels(combinedTable);
    filterAppLabels(combinedTable);
/*     filterLabels(localRecipes); */
  }
};

filterRecipes(localRecipes)

function findCommonMatchingIds(table1, table2) {
  const result = [];

  // Create a set of IDs from table2 for faster lookup
  const table2Ids = new Set(table2.map((item) => item.id));

  // Iterate through table1 and check for matching IDs in table2
  for (const item of table1) {
    if (table2Ids.has(item.id)) {
      result.push(item);
    }
  }

  return result;
}

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
filterRecipes(combinedTable);
filterIngLabels(localRecipes);
filterUstLabels(localRecipes);
filterAppLabels(localRecipes);
});