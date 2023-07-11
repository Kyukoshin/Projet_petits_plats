const searchField = document.querySelector('input');

import { filterIngLabels } from './ingredients.js';
import { filterUstLabels } from './ustensils.js';
import { filterAppLabels } from './appliances.js';

searchField.addEventListener('keyup', function () {
  if (searchField.value.length >= 3) {
    let regex = new RegExp(searchField.value, 'gmi');
    let filteredRecipes = localRecipes.filter(recipe => {
      const matchedIngredients = recipe.ingredients.filter(ingredient => {
        return ingredient.ingredient.match(regex);
      });
      return recipe.name.match(regex) || matchedIngredients.length > 0;
    });

    if (filteredRecipes.length === 0) {
      recipesCounter.textContent = "0 recettes";
    }

    filterRecipes(filteredRecipes);
    filterIngLabels(filteredRecipes);
    filterUstLabels(filteredRecipes);
    filterAppLabels(filteredRecipes);
  } else {
    filterRecipes(localRecipes);
    filterIngLabels(localRecipes);
    filterUstLabels(localRecipes);
    filterAppLabels(localRecipes);
  }
});


filterRecipes(localRecipes)