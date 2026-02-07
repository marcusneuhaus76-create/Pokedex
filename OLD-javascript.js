const images = [
  "bild1.jpg",
  "bild2.jpg",
  "bild3.jpg",
  "bild4.jpg",
  "bild5.jpg",
  "bild6.jpg",
  "bild7.jpg",
  "bild8.jpg",
  "bild9.jpg",
  "bild10.jpg",
  "bild11.jpg",
  "bild12.jpg",
];

function showGallery() {
  let contentRef = document.getElementById("maingall");
  for (i = 0; i < images.length; i++) {
    contentRef.innerHTML += `<img src="${images[i]}" class="smallphoto" onclick="showPhoto(${i})">`;
  }
}

function showPhoto(i) {
  let contentRef = document.getElementById("maingall");

  if (!document.getElementById("bildOverlay")) {
    contentRef.innerHTML += `<div id="bildOverlay" class="overlay" onclick="toggleOverlay()">
                                         </div>`;
  }

  contentRef.innerHTML += ` 
  <div id="bspos" class="basicposition" onclick="toggleOverlay()">
    <div id="bscpos" class="bigphoto" onclick="toggleStop()">                                                              
        <span class="picture_name">${images[i]}</span><b class="xclose" onclick="toggleOverlay()">X</b> 
        <img src="bild${i + 1}.jpg" class="bigphoto_size">
        <img src="./img/arrowleft.png" class="arrowposition_left" onclick="showPhotoOnArrow(${i - 1})">
        <span id="picnumber" class="picture_number">${i + 1} / ${images.length}</span>
        <img src="./img/arrowright.png" class="arrowposition_right" onclick="showPhotoOnArrow(${i + 1})">                                                                      
    </div>
  </div>`;


  event.stopPropagation();
}

function showPhotoOnArrow(i) {
  if (i > 11) i = 0;
  if (i < 0) i = 11;
  

  let contentRef = document.getElementById("bscpos");

  contentRef.innerHTML = `<span class="picture_name">${images[i]}</span><b class="xclose" onclick="toggleOverlay()">X</b> 
                          <img src="bild${i + 1}.jpg" class="bigphoto_size">
                          <img src="./img/arrowleft.png" class="arrowposition_left" onclick="showPhotoOnArrow(${i - 1})">
                          <span id="picnumber" class="picture_number">${i + 1} / ${images.length}</span>
                          <img src="./img/arrowright.png" class="arrowposition_right" onclick="showPhotoOnArrow(${i + 1})"> `;
}

function toggleStop() {
  event.stopPropagation();
}


function toggleOverlay() {
  let overlay = document.getElementById("bildOverlay");
  if (overlay) overlay.remove(); 
  
  let frame = document.getElementById("bspos");
  if (frame) frame.remove();   
}
