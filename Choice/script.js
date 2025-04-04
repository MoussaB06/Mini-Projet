document.addEventListener("DOMContentLoaded", function () {
  const roleCards = document.querySelectorAll(
    ".espace_passager, .espace_conducteur"
  );
  const button = document.querySelector(".btn");

  // Désactiver le bouton au départ
  button.disabled = true;
  button.style.backgroundColor = "#D9D9D9";
  button.style.cursor = "not-allowed";

  roleCards.forEach((card, index) => {
    card.addEventListener("click", () => {
      // Sélectionne le bouton radio à l'intérieur
      const radio = card.querySelector(".radio-btn");
      radio.checked = true;

      // Active le bouton
      button.disabled = false;
      button.style.backgroundColor = "#4CAF50";
      button.style.cursor = "pointer";

      // Met à jour le texte du bouton
      if (index === 0) {
        button.textContent = "Continuer en tant que Passager";
      } else {
        button.textContent = "Continuer en tant que Conducteur";
      }

      // Retirer le style "sélectionné" des autres cartes
      roleCards.forEach((c) => c.classList.remove("active-card"));
      card.classList.add("active-card");
    });
  });
});
