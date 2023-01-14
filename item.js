const main = document.getElementById('mai');
console.log("in the main ",localStorage.getItem("id"));
searchById(localStorage.getItem("id"));

function searchById(id){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{
            // console.log(data);
            // itemList = data.meals;
            console.log(data.meals[0]);
            showData(data.meals[0]);
        })
        .catch((e)=>{
            console.log(e);
        });
}


{/* <h1 id="name">Salmon Prawn Risotto</h1>
        <div id="body-div">
            <img src="https://www.themealdb.com/images/media/meals/xxrxux1503070723.jpg"/>
            <div id="insta">
                <h2>Instructions</h2>
                <p>"Melt the butter in a thick-based pan and gently cook the onion without colour until it is soft.\r\nAdd the rice and stir to coat all the grains in the butter\r\nAdd the wine and cook gently stirring until it is absorbed\r\nGradually add the hot stock, stirring until each addition is absorbed. Keep stirring until the rice is tender\r\nSeason with the lemon juice and zest, and pepper to taste. (there will probably be sufficient saltiness from the salmon to not need to add salt) Stir gently to heat through\r\nServe scattered with the Parmesan and seasonal vegetables.\r\nGrill the salmon and gently place onto the risotto with the prawns and asparagus"</p>
                <button>watch video</button>
            </div>
        </div> */}
function showData(item){
    main.innerHTML = '';
    
    const div = document.createElement('div');
    div.innerHTML = `
        <h1 id="name">${item.strMeal}</h1>
        <div  id="body-div">
            <img src ="${item.strMealThumb}" />
            <div id="insta">
                <h2>Instructions</h2>
                <p>${item.strInstructions}</p>
                <button>Watch Video</button>
            </div>
            
        </div>                
    `;
    main.append(div);
}
