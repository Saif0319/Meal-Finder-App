const search = document.getElementById("search")
const submit = document.getElementById("submit")
const meals = document.getElementById("meals")
const resultHeading = document.getElementById("result-heading")
const random = document.getElementById("random")
const singleMeal = document.getElementById("single-meal")







async function searchMeal(meal){

    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)

    const data = await res.json();

    console.log(data);
}




function showMeals(){

}










// EVENT LISTENERS
submit.addEventListener("submit", (e) => {
    e.preventDefault();

    singleMeal.innerHTML = "";

    const term = search.value;
    
    if(term && term != ""){
        searchMeal(term);
        
    } else {
        window.location.reload();
    }
})

