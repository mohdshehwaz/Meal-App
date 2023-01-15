var storedNames = JSON.parse(localStorage.getItem("favs"));
var fId = document.getElementById('fav-items');
let favItems = [];
let itemLists =[];
// if favorite items contain an item
if(storedNames.length!=0){
    
    favItems=storedNames.map((item) =>{
        return item.slice(4);
    });
    let c=0;
    for(i of favItems){
        searchById(i);
        c++;
    }
    console.log(c);
    
    
}
// search the description of the item
function searchById(id){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{
            
            itemLists.push(data.meals[0]);
            showData(data.meals[0]);
            
        })
        .catch((e)=>{
            console.log(e);
        });
}
// display data into our page
function showData(item){
    
    

    const div = document.createElement('div');
    div.innerHTML = `
        <div class="item" id="${item.idMeal}">
            <img src ="${item.strMealThumb}" />
            <p>${item.strMeal}</p>
            <button class ="fav-btn" id="btn-${item.idMeal}">Add to favourite</button>
        </div>       
    `;
    fId.append(div);
}