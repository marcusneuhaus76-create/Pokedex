const colours = {
	normal: '#A8A77A',
	fire: '#EE8130',
	water: '#6390F0',
	electric: '#F7D02C',
	grass: '#7AC74C',
	ice: '#96D9D6',
	fighting: '#C22E28',
	poison: '#A33EA1',
	ground: '#E2BF65',
	flying: '#A98FF3',
	psychic: '#F95587',
	bug: '#A6B91A',
	rock: '#B6A136',
	ghost: '#735797',
	dragon: '#6F35FC',
	dark: '#705746',
	steel: '#B7B7CE',
	fairy: '#D685AD',
};

const icons = {
	normal: './icons/normal.svg',
	fire: './icons/fire.svg',
	water: './icons/water.svg',
	electric: './icons/electric.svg',
	grass: './icons/grass.svg',
	ice: './icons/ice.svg',
	fighting: './icons/fighting.svg',
	poison: './icons/poison.svg',
	ground: './icons/ground.svg',
	flying: './icons/flying.svg',
	psychic: './icons/psychic.svg',
	bug: './icons/bug.svg',
	rock: './icons/rock.svg',
	ghost: './icons/ghost.svg',
	dragon: './icons/dragon.svg',
	dark: './icons/dark.svg',
	steel: './icons/steel.svg',
	fairy: './icons/fairy.svg',
};


const nameDictionary = [];

let pokemons = [];

let pokemonNames = [];

let filteredPokemons = [];

let more = 0;

let imageMode = "normal";

let pushedButton = null;


async function fillNameDictionary() {
  for (let id = 1; id <= 10 + more; id++) {  
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
      const data = await response.json();
      nameDictionary[id] = data.name;
    } catch (error) {
      console.error("Fehler:", error);
    }
  }
}


async function showLoadingSpinner() { 
  let contentRef = document.getElementById("pokemon-list");
  contentRef.innerHTML = "";
  contentRef.innerHTML += `<div class="loading-spinner"></div>`; 
  await delay(3000); 
  contentRef.innerHTML = "";    
  showLoadButton(); 
  showButtons();
  showGallery();
  fillarray();   
  }


function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function showLoadButton() {
  let contentRef = document.getElementById("loading");
  contentRef.innerHTML = "";
  contentRef.innerHTML += `<button class="morebutton" onclick="loadMore()">Load More</button>`;
}


function showButtons() {
  let contentRef = document.getElementById("mainpart");  
  contentRef.innerHTML = "";
  contentRef.innerHTML += `<button onclick="setNormal()" class="shinybuttons">Normal</button>
                           <button onclick="setShiny()" class="shinybuttons">Shiny</button>`;
  }


async function showGallery() {
  pokemons.length = 0;
  for (let id = 1; id <= 10 + more; id++) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const data = await response.json();
    pokemons.push(data);
    }
  renderPokemonCard(pokemons);  
}


function renderPokemonCard(pokemons) {
    let contentRef = document.getElementById("pokemon-list");
    contentRef.innerHTML = "";
  for (let i = 0; i < pokemons.length; i++) {
            pokemons[i].types.map(type => type.type.name);
    contentRef.innerHTML += `
      <div class="pokemon-card" id="card-${i}" onclick="showPhoto(${i})">
          <span class="picture_name_card"><b>${first_uppercase(pokemons[i].name)}</b><img src="${getPokemonImage(i)}" class="smallphoto"></span>
          <span class="type">Type: ${pokemons[i].types.map(type => first_uppercase(type.type.name)).join(", ")}</span>
          ${renderIcons(pokemons[i].types)}
          ${checkTypeArray(pokemons, i)}
        </div>`;   
      setColorType(i);                   
      }      
    }  


function renderIcons(types) {
  let result = `<span class="pokemon-type-icon">`;

  types.forEach(function(type) {
    result += `<img src="${icons[type.type.name]}" class="type-icon" title="${first_uppercase(type.type.name)}">`;
  });
  result += `</span>`;
  return result;
}



 function checkTypeArray(pokemons, i) {
        const typename = pokemons[i].types[0].type.name; 
        return `<span ><img src="${icons[typename]}" class="type-icon" title="${first_uppercase(typename)}"></span>`;  
    }



function setColorType(i) {
  const type = pokemons[i].types[0].type.name; 
  const card = document.getElementById(`card-${i}`);
  card.style.setProperty("--pokemon-color", colours[type]);
}


function setColorTypeBig(i) {
  const type = pokemons[i].types[0].type.name; 
  const bigCard = document.getElementById(`bscpos`);
  bigCard.style.setProperty("--pokemon-color", colours[type]);
}


function first_uppercase(name) {
  if (!name) return ""; 
  return name[0].toUpperCase() + name.slice(1);
}
   

function loadMore() {
  more += 10;
  showLoadingSpinner();
  return more;
}


async function fillarray() {
  for (let id = 1 + more; id <= 10 + more; id++) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      nameDictionary.push(data.name);
    } catch (error) {
      console.error("Fehler:", error);
    }
  }
}


async function init() {
  await fillarray();
}


  function showPhoto(i) {
    let contentRef = document.getElementById("pokemon-list");
    document.body.classList.add("no-scroll");
    document.documentElement.classList.add("no-scroll");
    if (!document.getElementById("bildOverlay")) {
      contentRef.innerHTML += `<div id="bildOverlay" class="overlay" onclick="toggleOverlay()"></div>
                                <div id="bspos" class="basicposition" onclick="toggleOverlay(this)">
                                </div>`;
    }
      creatingTabs(i);
      creatingDetails(i)
      checkPushed(pushedButton, i);
      setColorTypeBig(i);
      roar(i);
  }



function creatingTabs(i) {
  let bspos = document.getElementById("bspos");
  bspos.innerHTML = `
                      <div id="bscpos" class="bigphoto" onclick="toggleStop()">  
                        <div id="tabcontainer" class="tabposition">
                          <span class="datasheet" onclick="showPokemonDetails(${i})"><b>Body</b></span>
                          <span class="evosheet" onclick="showBackImage(${i})"><b>Back Image</b></span>
                          <span class="fightingsheet" onclick="showFighting(${i})"><b>Fighting</b></span>
                        </div>
                      </div> `;
                  }

                  
function creatingDetails(i) {
  let bscpos = document.getElementById("bscpos");
  bscpos.innerHTML += `
                        <div id="pokemondetails" class="details"></div>
                        <span class="picture_name">${first_uppercase(pokemons[i].name)}</span>
                        <b class="xclose" onclick="toggleOverlay()">X</b> 
                        <div id="bigphoto-container">
                          <img src="${getPokemonImage(i)}" class="bigphoto_size ${getScaleClass()}">   
                        </div>                                                
                        <img src="./img/arrowleft.png" class="arrowposition_left" onclick="showPhotoOnArrow(${i - 1})">
                        <span class="picture_number">${i + 1} / ${pokemons.length}</span>
                        <img src="./img/arrowright.png" class="arrowposition_right" onclick="showPhotoOnArrow(${i + 1})">
                      `;
}


function showPhotoOnArrow(i) {
  if (i > 9 +  more) i = 0;
  if (i < 0) i = 9 + more;
  let contentRef = document.getElementById("bscpos");
  contentRef.innerHTML = `<div id="tabcontainer" class="tabposition">
                            <span id="pokemondata" class="datasheet" onclick="showPokemonDetails(${i})"><b>Body</b></span>
                            <span id="frontBack" class="evosheet" onclick="showBackImage(${i})"><b>Back Image</b></span>
                            <span id="fighting" class="fightingsheet" onclick="showFighting(${i})"><b>Fighting</b></span>
                          </div>
                          <div id="pokemondetails" class="details"></div>
                          <span class="picture_name">${first_uppercase(pokemons[i].name)}</span>
                          <b class="xclose" onclick="toggleOverlay()">X</b> 
                          <div id="bigphoto-container">
                            <img src="${getPokemonImage(i)}" class="bigphoto_size ${getScaleClass()}">   
                          </div>                                                
                          <img src="./img/arrowleft.png" class="arrowposition_left" onclick="showPhotoOnArrow(${i - 1})">
                          <span id="picnumber" class="picture_number">${i + 1} / ${pokemons.length}</span>
                          <img src="./img/arrowright.png" class="arrowposition_right" onclick="showPhotoOnArrow(${i + 1})">`;
                          checkPushed(pushedButton, i)
                          setColorTypeBig(i);
                          roar(i);
}


function showPokemonDetails(i) {
  document.querySelector(".datasheet").classList.add("pushed");
  document.querySelector(".fightingsheet").classList.remove("pushed");  
  pushedButton = 1;
  let container = document.getElementById("pokemondetails");
  container.innerHTML =  
               `<span id="long" class="height">Height: ${pokemons[i].height / 10} m</span>   
                <span id="mass" class="weight">Weight: ${pokemons[i].weight / 10} kg</span> 
                <span id="speedy" class="speed">Speed: ${pokemons[i].stats[5].base_stat}</span>
                <span id="hitpoint" class="hitpoints">Hit Points: ${pokemons[i].stats[0].base_stat}</span>          
                <br><br>`;
  return pushedButton;
}


function showBackImage(i) {
  document.querySelector(".datasheet").classList.remove("pushed");
  document.querySelector(".fightingsheet").classList.remove("pushed");  
  pushedButton = 2;
  let container = document.getElementById("bigphoto-container");
  container.innerHTML = "";
  container.innerHTML = `<img src="${getPokemonBackImage(i)}" class="bigphoto_size ${getScaleBackClass()}"></img>`;
  let nextContainer = document.getElementById("tabcontainer");
  nextContainer.innerHTML = ` <span id="pokemondata" class="datasheet" onclick="showPokemonDetails(${i})"><b>Body</b>                          
                              </span>
                              <span id="frontBack" class="evosheet" onclick="showFrontImage(${i})"><b>Front Image</b></span>
                              <span id="fighting" class="fightingsheet" onclick="showFighting(${i})"><b>Fighting</b></span>`;
  return pushedButton;
  }
    

function showFrontImage(i) {
  document.querySelector(".datasheet").classList.remove("pushed");
  document.querySelector(".fightingsheet").classList.remove("pushed");  
  pushedButton = 2;
  let container = document.getElementById("bigphoto-container");
  container.innerHTML = "";
  container.innerHTML = `<img src="${getPokemonImage(i)}" class="bigphoto_size ${getScaleClass()}"></img>`;
  let nextContainer = document.getElementById("tabcontainer");
  nextContainer.innerHTML = `<span id="pokemondata" class="datasheet" onclick="showPokemonDetails(${i})"><b>Body</b></span>
                             <span id="frontBack" class="evosheet" onclick="showBackImage(${i})"><b>Back Image</b></span>
                             <span id="fighting" class="fightingsheet" onclick="showFighting(${i})"><b>Fighting</b></span>`;
  return pushedButton;
  }


function showFighting(i) {
  document.querySelector(".fightingsheet").classList.add("pushed");
  document.querySelector(".datasheet").classList.remove("pushed");
  pushedButton = 3;

  let container = document.getElementById("pokemondetails");
  container.innerHTML =  
               `<span id="attacker" class="height">Attack: ${pokemons[i].stats[1].base_stat}</span>
                <span id="defender" class="weight">Defense: ${pokemons[i].stats[2].base_stat}</span>
                <span id="specialattacker" class="special-attack">Special-Attack: ${pokemons[i].stats[3].base_stat}</span>      
                <span id="specialdefender" class="special-defense">Special-Defense: ${pokemons[i].stats[4].base_stat}</span>          
                <br><br>`;
return pushedButton;
}


function getPokemonDetailsHTML(i) {
  return `
    <span id="long" class="height">Height: ${pokemons[i].height / 10} m</span>   
    <span id="mass" class="weight">Weight: ${pokemons[i].weight / 10} kg</span> 
    <br><br>`;
}


function checkPushed(pushedButton, i) {
  if (pushedButton === 1) {
    showPokemonDetails(i);
  }
  else 
      {
    showFighting(i);
  }
}


function toggleStop() {
  event.stopPropagation();
}


function toggleOverlay() {
  let overlay = document.getElementById("bildOverlay");
  if (overlay) {
    overlay.remove();
    let frame = document.getElementById("bspos");
    if (frame) frame.remove();
    document.body.classList.remove("no-scroll");
    document.documentElement.classList.remove("no-scroll");
  } else {
    document.body.classList.add("no-scroll");
    document.documentElement.classList.add("no-scroll");
  }
}


function roar(id) {  
  fetch(`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${id}.ogg`)
    .then(response => response.blob())
    .then(blob => { 
      const audioURL = URL.createObjectURL(blob); 
      const audio = new Audio(audioURL);
      audio.play(); 
    })
    .catch(error => console.error("Fehler:", error));
  }


function setNormal() {
  imageMode = "normal";
  showGallery();
}


function setShiny() {
  imageMode = "shiny";  
  showGallery();
}



function getPokemonImage(i) {
  if (imageMode === "shiny") {
    return pokemons[i].sprites.other.home.front_shiny;
  } else {
    return pokemons[i].sprites.front_default;
  }
}


function getPokemonBackImage(i) {
  if (imageMode === "shiny") {
    return pokemons[i].sprites.back_shiny;    
  } else {  
    return pokemons[i].sprites.back_default;
  }
}


function getScaleClass() {
  if (imageMode === "shiny") {
    return "bigphoto_shiny";
  } else {
    return "bigphoto_normal";
  }
}


function getScaleBackClass() {
  if (imageMode === "shiny") {
  return "bigphoto_back_shiny";
  } else {
    return "bigphoto_normal";
  }
}


function getSearchInput() {
    const textInput = document.getElementById("searchInput").value.toLowerCase();
    const filteredPokemons = pokemons.filter(function(pokemon) {
        return pokemon.name.includes(textInput);
    });
    pokemons = filteredPokemons;
    renderPokemonCard(pokemons);
}

function startsWithInput(str) {
  return str.startsWith(input);
}


function filter(textInput) {
  return nameDictionary.filter(function(str) {
    return str.startsWith(textInput);
  });
}







