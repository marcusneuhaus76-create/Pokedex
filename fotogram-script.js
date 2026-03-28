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

// const nameDictionary = {};

const nameDictionary = [];

let pokemons = [];

let pokemonNames = [];

let more = 0;

let imageMode = "normal";


async function fillNameDictionary() {
  // Leere das Array, um die neuen Daten zu speichern

  // for (let id = 1 + more; id <= 10 + more; id++) {
  for (let id = 1; id <= 10 + more; id++) {  
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
      const data = await response.json();
      nameDictionary[id] = data.name;
    } catch (error) {
      console.error("Fehler:", error);
    }
  }
  console.log(nameDictionary);
  // console.log(pokemons); Zugriff auf den Namen des Pokémon
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
  contentRef.innerHTML += `<button onclick="setNormal()">Normal</button>
                           <button onclick="setShiny()">Shiny</button>`;
  }


async function showGallery() {
  // await showLoadingSpinner();  
  pokemons.length = 0;
  // for (let id = 1 + more; id <= 10 + more; id++) {
  for (let id = 1; id <= 10 + more; id++) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const data = await response.json();
    pokemons.push(data);
    console.log("Pokemons-Array:", pokemons);
    }
  renderPokemonCard(pokemons);  
}

  

 // <img src="${pokemons[i].sprites.front_default}" class="smallphoto"><span>
 // <img src="${pokemons[i].sprites.other.home.front_shiny}" class="smallphoto"><span>

function renderPokemonCard(pokemons) {
    console.log("Länge des Pokemons-Arrays:", pokemons.length);
    let contentRef = document.getElementById("pokemon-list");
  contentRef.innerHTML = "";
  for (let i = 0; i < pokemons.length; i++) {
    contentRef.innerHTML += `
      <div class="pokemon-card" id="card-${i}" onclick="showPhoto(${i})">
        <span class="picture_name_card"><b>${first_uppercase(pokemons[i].name)}</b>
        <img src="${getPokemonImage(i)}" class="smallphoto"><span>
        <span>Type: ${pokemons[i].types.map(type => first_uppercase(type.type.name)).join(", ")}</span></span>
      </div>`;    
      setColorType(i);
      }      
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
  if (!name) return ""; /*!name prüft, ob name null, undefined, leerer String oder aus weiteren Gründen falsch ist. */
  return name[0].toUpperCase() + name.slice(1);
}
   

function loadMore() {
  more += 10;
  // showGallery();
  showLoadingSpinner();
  return more;
}


async function fillarray() {
  for (let id = 1 + more; id <= 10 + more; id++) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      console.log("Name des Pokémon, Funktion fillarray mit data.name:", data.name); // Zugriff auf den Namen des Pokémon
      nameDictionary.push(data.name);
    } catch (error) {
      console.error("Fehler:", error);
    }
  }
  console.log("Gefilterte Pokemons aus Funktion 'fillarray' aus nameDictionary:", nameDictionary); 
}


async function init() {
  await fillarray();
  console.log("Pokemons aus Funktion 'init' aus nameDictionary:", nameDictionary); // Jetzt sind sie drin
}


function showPhoto(i) {
  let contentRef = document.getElementById("pokemon-list");
  document.body.classList.add("no-scroll");
  document.documentElement.classList.add("no-scroll");

  if (!document.getElementById("bildOverlay")) {
    contentRef.innerHTML += `<div id="bildOverlay" class="overlay" onclick="toggleOverlay()"></div>`;
  }
  contentRef.innerHTML += ` 
  <div id="bspos" class="basicposition" onclick="toggleOverlay(this)">
    <div id="bscpos" class="bigphoto" onclick="toggleStop()">                                                              
        <span class="picture_name">${first_uppercase(pokemons[i].name)}</span><b class="xclose" onclick="toggleOverlay()">X</b>              
        <img src="${getPokemonImage(i)}" class="bigphoto_size ${getScaleClass()}">       
        ${getPokemonDetailsHTML(i)}        
    </div>
  </div>`
  setColorTypeBig(i);
  roar(i);
  event.stopPropagation();
}


function showPhotoOnArrow(i) {
  if (i > 9 +  more) i = 0;
  if (i < 0) i = 9 + more;
  let contentRef = document.getElementById(`bscpos`);
  contentRef.innerHTML = `<span class="picture_name">${first_uppercase(pokemons[i].name)}</span><b class="xclose" onclick="toggleOverlay()">X</b> 
                            <img src="${getPokemonImage(i)}" class="bigphoto_size ${getScaleClass()}">
                            <img src="./img/arrowleft.png" class="arrowposition_left" onclick="showPhotoOnArrow(${i - 1})">
                            <span id="picnumber" class="picture_number">${i + 1} / ${pokemons.length}</span>
                            <img src="./img/arrowright.png" class="arrowposition_right" onclick="showPhotoOnArrow(${i + 1})"> 
                            ${getPokemonDetailsHTML(i)}`
                            setColorTypeBig(i);
                            roar(i);
                            event.stopPropagation();
}


function getPokemonDetailsHTML(i) {
  return `
    <span id="long" class="height">Height: ${pokemons[i].height / 10} m</span>   
    <span id="mass" class="weight">Weight: ${pokemons[i].weight / 10} kg</span> 
    <span id="attacker" class="attack">Attack: ${pokemons[i].stats[1].base_stat}</span>
    <span id="defender" class="defense">Defense: ${pokemons[i].stats[2].base_stat}</span>       
    <img src="./img/arrowleft.png" class="arrowposition_left" onclick="showPhotoOnArrow(${i - 1})">
    <span id="picnumber" class="picture_number">${i + 1} / ${pokemons.length}</span>
    <img src="./img/arrowright.png" class="arrowposition_right" onclick="showPhotoOnArrow(${i + 1})">
    <br><br>`;
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
  // fetch(`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/legacy/${id}.ogg`)
  fetch(`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${id}.ogg`)
    .then(response => response.blob()) // Das Ergebnis von response ist die heuntergeladene Datei, aber noch nicht als abspielbares Audio. Mit "response.blob()" wird die geladene Datei in ein Blob umgewandelt.
    .then(blob => { // Blob = Binary Large Object ist ein Object, das Audio, Video oder ein Bild enthält.
      const audioURL = URL.createObjectURL(blob); //eine lokale URL, die der Browser abspielen kann wird in der Datei audioURL gespeichert. 
      const audio = new Audio(audioURL); // Daraus wird ein´Audio-Objekt, dass Sound abspielen kann, erstellt.
      audio.play(); // Die Datei wird abgespielt.
    })
    .catch(error => console.error("Fehler:", error));
  }


function setNormal() {
  imageMode = "normal";
  console.log(imageMode);
  showGallery();
}


function setShiny() {
  imageMode = "shiny";  
  console.log(imageMode);
  showGallery();
}


function getPokemonImage(i) {
  if (imageMode === "shiny") {
    return pokemons[i].sprites.other.home.front_shiny;
  } else {
    return pokemons[i].sprites.front_default;
  }
}


function getScaleClass() {
  if (imageMode === "shiny") {
    return "bigphoto_shiny";
  } else {
    return "bigphoto_normal";
  }
}


function getSearchInput() {
    const textInput = document.getElementById("searchInput").value.toLowerCase();

    const result = filter(textInput);

    console.log("Inhalt der Suchvariable:", result);

    pokemons = pokemons.filter(function(pokemon) {
        return pokemon.name.includes(result);
    });

    console.log("Gefilterte Pokemons:", pokemons);

    renderPokemonCard(pokemons);
}
      

function startsWithInput(str) {
  return str.startsWith(input);
}

// const result = arr.filter(startsWithInput);


function filter(textInput) {
  return nameDictionary.filter(function(str) {
    return str.startsWith(textInput);
  });
}




/* 
function filter() {
  nameDictionary.filter(startsWith("bulb"));
  return result;
}

 */

/* const arr = ["apple", "banana", "apricot", "berry"];

const result = arr.filter(str => str.startsWith("ap"));

console.log(result); */
// ["apple", "apricot"]

/*

document.getElementById("demo").innerHTML = ages.filter(checkAdult);

function checkAdult(age) {
  return age >= 18;
}

 async function showGallery() {

  // await showLoadingSpinner();  
  
  for (let id = 1 + more; id <= 10 + more; id++) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const data = await response.json();
    pokemons.push(data);
    console.log(pokemons);
    }

  let contentRef = document.getElementById("pokemon-list");

  for (let i = 0 + more; i < pokemons.length; i++) {
    contentRef.innerHTML += `
      <div class="pokemon-card" id="card-${i}" onclick="showPhoto(${i})">
        <span class="picture_name_card"><b>${first_uppercase(pokemons[i].name)}</b>
        <img src="${pokemons[i].sprites.other.home.front_shiny}" class="smallphoto"><span>
        <span>Type: ${pokemons[i].types.map(type => first_uppercase(type.type.name)).join(", ")}</span>
      </div>`;
    setColorType(i);
  }
} 
  
<img src="${getPokemonImage(i)}" class="bigphoto_size">
<img src="${pokemons[i].sprites.front_default}" class="bigphoto_size">

<img src="${getPokemonImage(i)}" class="bigphoto_size">

<img src="${pokemons[i].sprites.front_default}" class="bigphoto_size">


<img src="./img/arrowleft.png" class="arrowposition_left" onclick="showPhotoOnArrow(${i - 1})">

  <img src="./img/arrowright.png" class="arrowposition_right" onclick="showPhotoOnArrow(${i + 1})"> <br><br>   




  function showPhoto(i) {
  let contentRef = document.getElementById("pokemon-list");

  if (!document.getElementById("bildOverlay")) {
    contentRef.innerHTML += `<div id="bildOverlay" class="overlay" onclick="toggleOverlay()"></div>`;
  }

  contentRef.innerHTML += ` 
  <div id="bspos" class="basicposition" onclick="toggleOverlay(this)">
    <div id="bscpos" class="bigphoto" onclick="toggleStop()">                                                              
        <span class="picture_name">${first_uppercase(pokemons[i].name)}</span><b class="xclose" onclick="toggleOverlay()">X</b>              
        <img src="${getPokemonImage(i)}" class="bigphoto_size ${getScaleClass()}">
        <span id="long" class="height">Height: ${pokemons[i].height / 10} m</span>   
        <span id="mass" class="weight">Weight: ${pokemons[i].weight / 10} kg</span> 
        <span id="attacker" class="attack">Attack: ${pokemons[i].stats[1].base_stat}</span>
        <span id="defender" class="defense">Defense: ${pokemons[i].stats[2].base_stat}</span>       
        <img src="./img/arrowleft.png" class="arrowposition_left" onclick="showPhotoOnArrow(${i - 1})">
        <span id="picnumber" class="picture_number">${i + 1} / ${pokemons.length}</span>
        <img src="./img/arrowright.png" class="arrowposition_right" onclick="showPhotoOnArrow(${i + 1})"> <br><br>                                                                          
    </div>
  </div>`
  setColorTypeBig(i);
  roar(i);
  event.stopPropagation();
}

*/


