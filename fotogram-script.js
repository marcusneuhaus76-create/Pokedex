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

const nameDictionary = {};

let pokemons = [];

let more = 0;


async function fillNameDictionary() {

  for (let id = 1 + more; id <= 10 + more; id++) {
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
  contentRef.innerHTML += `<div class="loading-spinner"></div>`; 
  await delay(3000); 
  contentRef.innerHTML = "";
  showGallery();
  }

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
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
        <img src="${pokemons[i].sprites.front_default}" class="smallphoto"><span>
        <span>Type: ${pokemons[i].types.map(type => first_uppercase(type.type.name)).join(", ")}</span>
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
  showGallery();
}


async function fillarray() {
  for (let id = 1 + more; id <= 10 + more; id++) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
      const data = await response.json();
      pokemons.push(data);
    } catch (error) {
      console.error("Fehler:", error);
    }
  }
}

async function init() {
  await fillarray();
  console.log(pokemons); // Jetzt sind sie drin
}


function showPhoto(i) {
  let contentRef = document.getElementById("pokemon-list");

  if (!document.getElementById("bildOverlay")) {
    contentRef.innerHTML += `<div id="bildOverlay" class="overlay" onclick="toggleOverlay()"></div>`;
  }

  contentRef.innerHTML += ` 
  <div id="bspos" class="basicposition" onclick="toggleOverlay(this)">
    <div id="bscpos" class="bigphoto" onclick="toggleStop()">                                                              
        <span class="picture_name">${first_uppercase(pokemons[i].name)}</span><b class="xclose" onclick="toggleOverlay()">X</b> 
        <img src="${pokemons[i].sprites.front_default}" class="bigphoto_size">
        <img src="./img/arrowleft.png" class="arrowposition_left" onclick="showPhotoOnArrow(${i - 1})">
        <span id="picnumber" class="picture_number">${i + 1} / ${pokemons.length}</span>
        <img src="./img/arrowright.png" class="arrowposition_right" onclick="showPhotoOnArrow(${i + 1})">                                                                      
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
                            <img src="${pokemons[i].sprites.front_default}" class="bigphoto_size">
                            <img src="./img/arrowleft.png" class="arrowposition_left" onclick="showPhotoOnArrow(${i - 1})">
                            <span id="picnumber" class="picture_number">${i + 1} / ${pokemons.length}</span>
                            <img src="./img/arrowright.png" class="arrowposition_right" onclick="showPhotoOnArrow(${i + 1})"> `
                            setColorTypeBig(i);
                            roar(i);
}

function toggleStop() {
  event.stopPropagation();
}


function toggleOverlay(img) {
  let overlay = document.getElementById("bildOverlay");
  if (overlay) overlay.remove(); 
  
  let frame = document.getElementById("bspos");
  if (frame) frame.remove();   

  let card = img.closest(".pokemon-card");
  card.classList.toggle("big");
}


/* 
async function showGallery() {
  fillarray();
  init();
  console.log(pokemons);
  let contentRef = document.getElementById("pokemon-list");
  for (i = 0; i < pokemons.length; i++) {
    contentRef.innerHTML += `<img src="${pokemons[i].sprites.front_default}" class="smallphoto" onclick="showPhoto(${i})">`;
  }
} */

function roar(id) {  
  fetch(`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/legacy/${id}.ogg`)
    .then(response => response.blob()) // Das Ergebnis von response ist die heuntergeladene Datei, aber noch nicht als abspielbares Audio. Mit "response.blob()" wird die geladene Datei in ein Blob umgewandelt.
    .then(blob => { // Blob = Binary Large Object ist ein Object, das Audio, Video oder ein Bild enthält.
      const audioURL = URL.createObjectURL(blob); //eine lokale URL, die der Browser abspielen kann wird in der Datei audioURL gespeichert. 
      const audio = new Audio(audioURL); // Daraus wird ein´Audio-Objekt, dass Sound abspielen kann, erstellt.
      audio.play(); // Die Datei wird abgespielt.
    })
    .catch(error => console.error("Fehler:", error));
  }