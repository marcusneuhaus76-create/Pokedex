let pokemons = [];


async function showGallery() {
  for (let id = 1; id <= 10; id++) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const data = await response.json();
    pokemons.push(data);
  }

  let contentRef = document.getElementById("pokemon-list");

  for (let i = 0; i < pokemons.length; i++) {
    contentRef.innerHTML += `
      <img 
        src="${pokemons[i].sprites.front_default}" 
        class="smallphoto"
        onclick="showPhoto(${i})"
      >
    `;
  }
}




async function fillarray() {
  for (let id = 1; id <= 10; id++) {
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
    contentRef.innerHTML += `<div id="bildOverlay" class="overlay" onclick="toggleOverlay()">
                                         </div>`;
  }

  contentRef.innerHTML += ` 
  <div id="bspos" class="basicposition" onclick="toggleOverlay(this)">
    <div id="bscpos" class="bigphoto" onclick="toggleStop()">                                                              
        <span class="picture_name">${pokemons[i].name}</span><b class="xclose" onclick="toggleOverlay()">X</b> 
        <img src="${pokemons[i].sprites.front_default}" class="bigphoto_size">
        <img src="./img/arrowleft.png" class="arrowposition_left" onclick="showPhotoOnArrow(${i - 1})">
        <span id="picnumber" class="picture_number">${i + 1} / ${pokemons.length}</span>
        <img src="./img/arrowright.png" class="arrowposition_right" onclick="showPhotoOnArrow(${i + 1})">                                                                      
    </div>
  </div>`;


  event.stopPropagation();
}

function showPhotoOnArrow(i) {
  if (i > 11) i = 0;
  if (i < 0) i = 11;
  

  let contentRef = document.getElementById("bscpos");

  contentRef.innerHTML = `<span class="picture_name">${pokemons[i].name}</span><b class="xclose" onclick="toggleOverlay()">X</b> 
                          <img src="${pokemons[i].sprites.front_default}" class="bigphoto_size">
                          <img src="./img/arrowleft.png" class="arrowposition_left" onclick="showPhotoOnArrow(${i - 1})">
                          <span id="picnumber" class="picture_number">${i + 1} / ${pokemons.length}</span>
                          <img src="./img/arrowright.png" class="arrowposition_right" onclick="showPhotoOnArrow(${i + 1})"> `;
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