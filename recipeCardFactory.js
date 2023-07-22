function createRecipeArticle(recipeName, recipeInstructions, recipeTime, recipeImage, recipeIngredients) {

    const article = document.createElement('article');
    article.classList.add('recipe_item');
  
    const img = document.createElement('img');
    img.src = "img/recipes/" + recipeImage;
    img.alt = 'recipeName';
    img.classList.add('recipe_pic');
    article.appendChild(img);
  
    const prepTimeElement = document.createElement('p');
    prepTimeElement.textContent = recipeTime + " min";
    prepTimeElement.classList.add('prep_time');
    article.appendChild(prepTimeElement);
  
    const textContainer = document.createElement('div');
    textContainer.classList.add('recipe_text_container');
    article.appendChild(textContainer);
  
    const titleElement = document.createElement('h1');
    titleElement.textContent = recipeName;
    titleElement.classList.add('article_title');
    textContainer.appendChild(titleElement);
  
    const recipeSection = document.createElement('div');
    textContainer.appendChild(recipeSection);
  
    const subtitleElement = document.createElement('h2');
    subtitleElement.textContent = "Recette";
    subtitleElement.classList.add('article_subtitle');
    recipeSection.appendChild(subtitleElement);
  
    const recipeTextElement = document.createElement('p');
    recipeTextElement.textContent = recipeInstructions;
    recipeTextElement.classList.add('recipe_text');
    recipeSection.appendChild(recipeTextElement);
  
    const ingredientsContainer = document.createElement('div');
    ingredientsContainer.classList.add('indredients_container');
    textContainer.appendChild(ingredientsContainer);
  
    const ingredientsSubtitleElement = document.createElement('h2');
    ingredientsSubtitleElement.textContent = 'Ingrédients';
    ingredientsSubtitleElement.classList.add('article_subtitle');
    ingredientsContainer.appendChild(ingredientsSubtitleElement);
  
    const ingredientContainer = document.createElement('div');
    ingredientContainer.classList.add('ingredient_container');
    ingredientsContainer.appendChild(ingredientContainer);
  
    recipeIngredients.forEach((ingredient) => {
      const ingredientItem = document.createElement('div');
      ingredientItem.classList.add('ingredient_item');
  
      const ingredientName = document.createElement('h3');
      ingredientName.textContent = ingredient.ingredient;
      ingredientName.classList.add('recipe_text');
      ingredientItem.appendChild(ingredientName);
  
      const ingredientQty = document.createElement('p');
      ingredientQty.textContent = (ingredient.quantity || "") + " " + (ingredient.unit || "");
      ingredientQty.classList.add('recipe_ing_qty');
      ingredientItem.appendChild(ingredientQty);
  
      ingredientContainer.appendChild(ingredientItem);
    });
  
    return article;
  }