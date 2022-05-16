const search = document.getElementById('search'),
  submit = document.getElementById('submit'),
  random = document.getElementById('random'),
  meals = document.getElementById('meals'),
  resultHeading = document.getElementById('result-heading'),
  single_meal = document.getElementById('single-meal');

// Search meal and fetch from API
function searchMeal(e) {
  e.preventDefault();

  single_meal.innerHTML = '';

  const term = search.value;

 
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        resultHeading.innerHTML = `<h2 class="my-2">Search results for "${term}":
        </h2>`;

        if (data.meals === null) {
          
          resultHeading.innerHTML = `<p class="my-3 fs-4">There are no results!
          </p>`;
        } else {
          meals.innerHTML = data.meals
            .map(
              meal => `
            <div class="meal rounded">
                  <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="rounded">
                  <div class="meal-info" data-mealID="${meal.idMeal}">
                  <h3>${meal.strMeal}</h3></div>
                </div>
          `
            )
            .join('');
        }
      });
    
    search.value = '';
  } else {
    alert('Please enter a search term');
  }
}

// Fetch meal by ID
function getMealById(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(res => res.json())
    .then(data => {
      const meal = data.meals[0];

      addMealToDOM(meal);
    });
}

// Fetch random meal from API
function getRandomMeal() {
  // Clear meals and heading
  meals.innerHTML = '';
  resultHeading.innerHTML = '';

  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data => {
      const meal = data.meals[0];

      addMealToDOM(meal);
    });
}

// Add meal to DOM
function addMealToDOM(meal) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  single_meal.innerHTML = `
    <div class="single-meal">
     <h1>${meal.strMeal}</h1>
     <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="rounded">
    </div>


    <div class="single-meal-info">
        <p>${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}</p>
        <p>${meal.strArea ? `<p>${meal.strArea}</p>` : ''}</p>
    </div>


      <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
          ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;
}

// Event listeners
submit.addEventListener('submit', searchMeal);
random.addEventListener('click', getRandomMeal);

meals.addEventListener('click', e => {
  const mealInfo = e.path.find(item => {
    if (item.classList) {
      return item.classList.contains('meal-info');
    } else {
      return false;
    }
  });

  if (mealInfo) {
    const mealID = mealInfo.getAttribute('data-mealid');
    getMealById(mealID);
  }
});