  function showGallery() {
    const container = document.getElementById("pokemon-list");
    container.innerHTML = "";

  for (let id = 1; id <= 40; id++) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then(response => response.json())
      .then(data => {
        const card = document.createElement("div");
        card.classList.add("pokemon-card");

        card.innerHTML = `
          <h3>${data.name}</h3><br>
          <h2>${data.id}</h2>
          <img src="${data.sprites.front_default}" alt="${data.name}"
          onclick="toggleSize(this)">
          <button onclick="roar(${data.id})">Roar</button>
          <button onclick="change(${data.id})">Color</button>          
          `;
        container.appendChild(card);
      });
  }
}

function roar(id) {
  fetch(`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/legacy/${id}.ogg`)
    .then(response => response.blob())
    .then(blob => {
      const audioURL = URL.createObjectURL(blob);
      const audio = new Audio(audioURL);
      audio.play();
    })
    .catch(error => console.error("Fehler:", error));
  }



function toggleSize(img) {
  const card = img.closest(".pokemon-card");
  card.classList.toggle("big");

  let contentRef = document.getElementById("mainpart");

  if (!document.getElementById("bildOverlay")) {
    contentRef.innerHTML += `<div id="bildOverlay" class="overlay" onclick="toggleOverlay()">
                              <div onclick="toggleStop()"></div>
                            </div>`;}
}


function change(id) { // Funktion zum Ändern des Bildes, insbesondere der Farbe des Pokémons
  fetch("https://pokeapi.co/api/v2/pokemon/" + id) // Die jeweilige Farbe wird über die ID des Pokémons abgerufen, Wenn id = 4, wird daraus: //pokeapi.co/api/v2/pokemon/4
    .then(function(response) { //fetch() gibt ein Promise zurück. Wenn die Antwort des Servers eintrifft, wird die Funktion im .then() Block ausgeführt.
      return response.json();
    })
    .then(function(data) {
      const card = document.querySelector(".pokemon-card:nth-child(" + id + ")"); //Hier suche ich im DOM nach der .pokemon-card, die an Position id steht.
      const img = card.querySelector("img"); // In der gefundenen Karte wird das erste <img>-Element gesucht. Ich bekomme also das Pokémon-Bild.
      img.src = data.sprites.front_shiny; //Hier wird die Quelle des Bildes auf die shiny-Version geändert, die in den Daten des Pokémons enthalten ist. data.sprites.front_shiny ist die Shiny-Version des Pokémon.
    })
    .catch(function(error) {
      console.error("Fehler:", error);
    });
}


function showtype(id) {
  fetch(`https://pokeapi.co/api/v2/type/${id}/`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      return data;
    })
    .catch(function(error) {
      console.error("Fehler:", error);
      
    });
}


function toggleStop() {
  event.stopPropagation();
}


function toggleOverlay() {
  let overlay = document.getElementById("bildOverlay");
  if (overlay) overlay.remove(); 
  
  /* let frame = document.getElementById("pokemon-list");
  if (frame) frame.remove();    */
}