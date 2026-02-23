function toggleSize(img) { 
  const card = img.closest(".pokemon-card");
  card.classList.toggle("big");

  let contentRef = document.getElementById("mainpart");

  if (!document.getElementById("bildOverlay")) {
      contentRef.innerHTML += `
        <div id="bildOverlay" class="overlay">
        </div>`;
      
      const overlay = document.getElementById("bildOverlay");

      // Klick außerhalb der Card → alles schließen
      overlay.addEventListener("click", function() {
          card.classList.remove("big");
          overlay.remove();
      });

      // Klick auf die Card selbst → Overlay NICHT schließen
      card.addEventListener("click", function(event) {
          event.stopPropagation();
      });
  }
}