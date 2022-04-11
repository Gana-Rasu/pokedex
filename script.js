
// creating the starting page in dom

let div = document.createElement("div");
// div.setAttribute("class","search");
div.innerHTML=`
<div class="display">
</div>
<div class="search">
<p class="tag">search your favorite childhood pokemon !</p>
<input type="text" id="pokemonname" placeholder="for example : charizard" class="css-input">
<button class="btn" id="search">search</button>
</div>`;
document.body.append(div);


// declaring the dom elements
let search_button  = document.querySelector("#search");
search_button.addEventListener("click",fetching_pokemon);


// enter key to work like search button
window.addEventListener("keydown",(e)=>{
    if(e.key==="Enter"){
        fetching_pokemon();
    }
})


// fetching the required pokemon data using fetch, using an async function to make sure 
// the fetch and the data collection happens synchromously, catching the error if the fetch fails.

async function fetching_pokemon(){
    // declaring the dom for search input text and taking the value
    let pokemon_name = document.querySelector("#pokemonname").value;

    try{       
      let response = await  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon_name}`);
      let fetched_data = await response.json();
      console.log(fetched_data);
      let display = document.querySelector(".display");
      display.innerHTML = ` 
      
    <div class="info">
      <p>NAME : <span>${fetched_data.name}</span> </p>
      <p>ABILILTY : <span>${fetched_data.abilities[0].ability.name}</span> </p>
      <p>MOVE : <span>${fetched_data.moves[0].move.name}</span></p>
      <p>WEIGHT : <span>${fetched_data.weight}</span></p>
    </div>
  
    <div class="empty"></div>
  
    <div class="image">
    <img src="${fetched_data.sprites.other["official-artwork"].front_default}" alt="image">
    </div>

    `;

    }
    catch(error){
        console.log("pokemon not found",error);
    }

}


// calling the function
fetching_pokemon();

