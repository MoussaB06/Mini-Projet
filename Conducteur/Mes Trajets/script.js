document.addEventListener("DOMContentLoaded", () => {
  const userIcon = document.getElementById("toggleMenu");
  const dropdown = document.getElementById("dropdownMenu");

  const deleteButtons = document.querySelectorAll(".delete-btn");

  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // Évite de déclencher d'autres clics
      const card = btn.closest(".trip-card");
      card.remove(); // Supprime la carte
    });
  });

  // Toggle du menu uniquement au clic sur l'icône
  userIcon?.addEventListener("click", (e) => {
    e.stopPropagation(); // ⛔ n'envoie pas l'événement plus loin
    dropdown.classList.toggle("hidden");
  });

  // Clique en dehors → fermer le menu
  document.addEventListener("click", (e) => {
    // Vérifie qu'on ne clique pas ni sur le menu ni sur l'icône
    if (!dropdown.contains(e.target) && !userIcon.contains(e.target)) {
      dropdown.classList.add("hidden");
    }
  });
});
