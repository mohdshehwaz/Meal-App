var mainId = document.getElementById('main');
var searchBtn = document.getElementById('search-btn');
var searchBox = document.getElementById('search-box');
var favId = document.getElementById("fav-id");

// var mainId = document.getElementById('main');
// mainId.addEventListener('click',(e)=>{
//     e.stopPropagation();
//     console.log(e.target);
// })


let itemList =[];
let favs =[];
let searchItems =[];
fetchData();
//search box event listener
searchBox.addEventListener('keyup', (e) => {   
    console.log(searchItems)
    remove();
    for(var i of searchItems){
        if(i.toLowerCase().startsWith(searchBox.value.toLowerCase()) && searchBox.value != ""){
            let litem = document.createElement("li");
            litem.style.cursor = "pointer";
            litem.classList.add("list-item");
            litem.textContent = i;
            litem.setAttribute("onclick",() =>{
                searchBox.value = i;
            });
            document.querySelector(".list").appendChild(litem);
        }
        
    }
});
// remove items from search suggestions
function remove(){
    let ritems = document.querySelectorAll(".list-item");
    ritems.forEach((ritem)=>{
        ritem.remove();
    })
}
// var items  = document.getElementsByClassName('item');
// console.log(items);
// for(let i=0;i<items.length;i++){
//     items[i].addEventListener('click',(e)=>{
//         e.preventDefault();
//         console.log("dsfds");
//         window.location.href('/item.html');
//     })
// }
function handleClickListener(e){
    let searchItem = searchBox.value;
    if(e.target.id == 'search-btn'){
        
        searchBox.textContent="";
        console.log("search name");
        searchItems.push(searchItem);
        
        searchByName(searchItem);
    }
    
    if(e.target.className == 'item'){
        localStorage.setItem("id",e.target.id);
        window.location.href = '/item.html';
    }
    if(e.target.className =="fav-btn"){
        console.log(e.target.id, "the id of fav btn");
        favs.push(e.target.id);
        
    }
    if(e.target.id==='fav-id'){
        localStorage.setItem("favs", JSON.stringify(favs));
        window.location.href = '/fav.html';
    }
    
}
// search by id
function searchById(id){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{
           
            
            
        })
        .catch((e)=>{
            console.log(e);
        });
}
function initializeApp(){
    // addTaskInput.addEventListener('keyup',handleInputKeypress);
    document.addEventListener('click',handleClickListener);
}
initializeApp();
//search by name 
function searchByName(name){
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
        .then((response)=>{
            
            return response.json();
        })
        .then((data)=>{

          
            itemList = data.meals;
            if(itemList!=null){
                showData();

            }
            
            
        })
        .catch((e)=>{
            console.log(e);
        });
}
// fetch data by category of items
function fetchData(){
    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood')
        .then((response)=>{
            
            return response.json();
        })
        .then((data)=>{
        
            // searchByName();
            itemList = data.meals;
            showData();
        })
        .catch((e)=>{
            console.log(e);
        });

}
// show data in our body page
function showData(){
    mainId.innerHTML = '';

    for(var item of itemList){
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="item" id="${item.idMeal}">
                <img src ="${item.strMealThumb}" />
                <p>${item.strMeal}</p>
                <button class ="fav-btn" id="btn-${item.idMeal}">Add to favourite</button>
            </div>       
        `;
        mainId.append(div);
    }
}