console.log = function() {} 

import { findAllMatchingRecipes } from './filterLoop.js';

export function filterRecipes(data) {

  const recipeList = document.querySelector('.recipe_list');
  recipeList.textContent = ""

  let recipesCount = 0

  data.forEach(recipe => {

    const recipeImage = recipe.image;
    const recipeName = recipe.name;
    const recipeTime = recipe.time;
    const recipeInstructions = recipe.description;
    const recipeIngredients = recipe.ingredients;

    const anchor = document.getElementsByClassName("recipe_list")[0];
    let article = createRecipeArticle(recipeName, recipeInstructions, recipeTime, recipeImage, recipeIngredients);
    anchor.appendChild(article);

    recipesCount++

    const recipesCounter = document.getElementById("recipesCounter");
    recipesCounter.textContent = recipesCount + " recettes"

  });
}

//Tris label

export function selectFilter(data, filterType) {
  const filterLabelAnchor = document.getElementById("labelAnchor");
  const labelItem = document.createElement('button');
  const labelItemDelete = document.createElement('i');
  labelItem.setAttribute("class", "filter_selected")
  labelItem.innerHTML = data
  labelItemDelete.setAttribute("class", "fa-solid fa-xmark filter_close")
  labelItemDelete.onclick = () => { labelItemDelete.parentNode.remove(), removeFilter(data, filterType) }
  labelItem.appendChild(labelItemDelete);
  filterLabelAnchor.appendChild(labelItem);
}

export function updateFilter(filterValue, filterType) {
  labelsTable[filterType].push(filterValue)

  console.log(labelsTable)
  filterByLabel(labelsTable)
}

export function removeFilter(data, filterType) {
  const index = labelsTable[filterType].indexOf(data);
  if (index !== -1) {
    labelsTable[filterType].splice(index, 1);
  }
  console.log(labelsTable);
  filterByLabel(labelsTable);
}

export function filterByLabel(filter) {
  let filteredIngredients = localRecipes.filter(recipe => {
    // Check if all filter values are contained in the ingredients' "ingredient" property
    return filter.Ing.every(filterValue => {
      return recipe.ingredients.some(ingredient => {
        return ingredient.ingredient.toLowerCase().includes(filterValue.toLowerCase());
      });
    });
  });

  //console.log(filteredIngredients);

  let filteredAppliances = localRecipes.filter(recipe => recipe.appliance === filter.App[0]);
  if (filteredAppliances.length === 0) {
    filteredAppliances = localRecipes
  }

  //console.log(filteredAppliances);

  let filteredUstensils = localRecipes.filter(recipe =>
    filter.Ust.every(
      filterValue => recipe.ustensils.some( ustensil =>
        ustensil.toLowerCase().includes(filterValue.toLowerCase())
      )
    )
  );

  //console.log(filteredUstensils);
  getCombinedTable(filteredIngredients,filteredAppliances,filteredUstensils)
}

function getCombinedTable(table1, table2, table3) {
  // Find common IDs in all three tables
  let commonIds = table1
    .filter(item => table2.some(t => t.id === item.id))
    .filter(item => table3.some(t => t.id === item.id))
    .map(item => item.id);

  // Filter combinedTable based on common IDs
  let combinedTable = table1
    .filter(item => commonIds.includes(item.id))
    .map(item => ({
      ...item,
      ...table2.find(t => t.id === item.id),
      ...table3.find(t => t.id === item.id)
    }));

  console.log(combinedTable);
  window.combinedTable = combinedTable
  findAllMatchingRecipes()
}

/* 
1 fonction 
update texte ou update label appelle fonction
Fonction crée un tableau qui croise les filtres texte et labels
Retirer une label enleve cette label de son tableau et relance la fonction
Pareil pour changer le texte
on change aussi dynamiquement l'affichage dans les labels avec le tableau final filtré pour avoir uniquement des choix possibles dans la range ou on est
affichage

en gros il faut un tableau croisé des tableaux filtrés texte, et 3 labels

Les fonction tri des labels doivent etre indépendantes, mais leur affichage et les listes groupées
*/








