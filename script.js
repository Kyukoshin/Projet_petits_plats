console.log = function() {}

function filterRecipes(data) {

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

function selectFilter(data, filterType) {
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

function udapteFilter(filterValue, filterType) {
  labelsTable[filterType].push(filterValue)

  console.log(labelsTable)
  filterByLabel(labelsTable)
}

function removeFilter(data, filterType) {
  const index = labelsTable[filterType].indexOf(data);
  if (index !== -1) {
    labelsTable[filterType].splice(index, 1);
  }
  console.log(labelsTable);
  filterByLabel(labelsTable);
}

function filterByLabel(filter) {
  let filteredIngredients = localRecipes.filter(recipe => {
    // Check if all filter values are contained in the ingredients' "ingredient" property
    return filter.ingredient.every(filterValue => {
      return recipe.ingredients.some(ingredient => {
        return ingredient.ingredient.toLowerCase().includes(filterValue.toLowerCase());
      });
    });
  });

  console.log(filteredIngredients);

  let filteredAppliances = localRecipes.filter(recipe => recipe.appliance === filter.appliance[0]);
  if (filteredAppliances.length === 0) {
    filteredAppliances = localRecipes
  }

  console.log(filteredAppliances);

  let filteredUstensils = localRecipes.filter(recipe =>
    filter.ustensil.every(
      filterValue => recipe.ustensils.some( ustensil =>
        ustensil.toLowerCase().includes(filterValue.toLowerCase())
      )
    )
  );

  console.log(filteredUstensils);
  getCombinedTable(filteredIngredients,filteredAppliances,filteredUstensils)
}

function getCombinedTable(table1, table2, table3) {
  // Find common IDs in all three tables
  const commonIds = table1
    .filter(item => table2.some(t => t.id === item.id))
    .filter(item => table3.some(t => t.id === item.id))
    .map(item => item.id);

  // Filter combinedTable based on common IDs
  const combinedTable = table1
    .filter(item => commonIds.includes(item.id))
    .map(item => ({
      ...item,
      ...table2.find(t => t.id === item.id),
      ...table3.find(t => t.id === item.id)
    }));

  console.log(combinedTable);
  filterRecipes(combinedTable);
}

/* function filterByLabel(data) {
  let regexLabel = new RegExp(data.join("|"), "i");
  console.log(regexLabel);

  let filteredRecipes = localRecipes.filter(recipe => {
    const matchedIngredients = recipe.ingredients.filter(ingredient => {
      return ingredient.ingredient.match(regexLabel);
    });

    return (
      recipe.name.match(regexLabel) ||
      recipe.appliance.match(regexLabel) ||
      recipe.ustensils.some(ustensil => ustensil.match(regexLabel)) ||
      matchedIngredients.length > 0
    );
  });

  if (filteredRecipes.length === 0) {
    recipesCounter.textContent = "0 recettes";
  }

  filterRecipes(filteredRecipes);
} */

/*   for (var i = 0; i < localRecipes.length; i++) {
 
    if (localRecipes[i].ingredient.ingredient.match(regexLabel)){
      filteredRecipes = localRecipes[i]
    }else {
      filteredRecipes = localRecipes
    }
 
    if (localRecipes[i].appliance.match(regexLabel)){
      filteredRecipes = localRecipes[i]
    }else {
      filteredRecipes = localRecipes
    }
 
    if (localRecipes[i].ustensils.match(regexLabel)){
      filteredRecipes = localRecipes[i]
    }else {
      filteredRecipes = localRecipes
    }
 
  } */








