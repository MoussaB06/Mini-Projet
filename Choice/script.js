document.addEventListener("DOMContentLoaded", function () {
  const roleCards = document.querySelectorAll(
    ".espace_passager, .espace_conducteur"
  );
  const button = document.querySelector(".btn");
  const radios = document.querySelectorAll(".radio-btn");

  // Désactiver le bouton au départ
  button.disabled = true;
  button.style.backgroundColor = "#D9D9D9";
  button.style.cursor = "not-allowed";

  roleCards.forEach((card, index) => {
    card.addEventListener("click", () => {
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

      // Mise à jour visuelle
      roleCards.forEach((c) => c.classList.remove("active-card"));
      card.classList.add("active-card");
    });
  });

  // ✅ Redirection selon le rôle sélectionné
  button.addEventListener("click", () => {
    const selected = [...radios].find((r) => r.checked);

    if (!selected) {
      alert("Veuillez sélectionner un rôle !");
      return;
    }

    if (selected.value === "conducteur") {
      window.location.href = "../Conducteur/Completer info/index.html";
    } else if (selected.value === "passager") {
      window.location.href = "../Passager/index.html"; // à créer plus tard
    }
  });
});
