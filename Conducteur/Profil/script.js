document.addEventListener("DOMContentLoaded", () => {
  // Panel utilisateur
  const userIcon = document.getElementById("toggleMenu");
  const dropdown = document.getElementById("dropdownMenu");

  userIcon?.addEventListener("click", () => {
    dropdown?.classList.toggle("hidden");
  });

  document.addEventListener("click", (e) => {
    if (!userIcon.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.add("hidden");
    }
  });

  // Données par défaut
  const defaultData = {
    name: "Moussa Mohamed Benmouhoub",
    phone: "0555 66 77 88",
    brand: "Peugeot",
    model: "301",
  };

  // Champs à remplir
  const name = document.getElementById("name");
  const phone = document.getElementById("phone");
  const brand = document.getElementById("brand");
  const model = document.getElementById("model");
  const submitBtn = document.getElementById("submitBtn");

  name.value = defaultData.name;
  phone.value = defaultData.phone;
  brand.value = defaultData.brand;
  model.value = defaultData.model;

  submitBtn.disabled = true;
  submitBtn.style.opacity = "0.6";
  submitBtn.style.cursor = "not-allowed";

  const fields = [name, phone, brand, model];

  fields.forEach((input) => {
    input.addEventListener("input", () => {
      submitBtn.disabled = false;
      submitBtn.style.opacity = "1";
      submitBtn.style.cursor = "pointer";
    });
  });

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const updatedData = {
      name: name.value,
      phone: phone.value,
      brand: brand.value,
      model: model.value,
    };

    localStorage.setItem("conducteurProfil", JSON.stringify(updatedData));
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.6";
    submitBtn.style.cursor = "not-allowed";
  });
  const ratingLine = document.querySelector(".rating-line");
  const popup = document.getElementById("ratingPopup");
  const stars = popup.querySelectorAll(".star");
  const submitRating = document.getElementById("submitRating");

  let selectedRating = 5;

  // Afficher le popup au clic
  ratingLine.addEventListener("click", () => {
    popup.classList.remove("hidden");
    updateStars(selectedRating);
  });

  // Fermer si on clique en dehors
  window.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.classList.add("hidden");
    }
  });

  // Interaction étoile
  stars.forEach((star) => {
    star.addEventListener("click", () => {
      selectedRating = parseInt(star.dataset.value);
      updateStars(selectedRating);
    });
  });

  // Fermer le popup au clic sur envoyer
  submitRating.addEventListener("click", () => {
    console.log(`⭐ Noté : ${selectedRating}/5`);
    popup.classList.add("hidden");
  });

  function updateStars(value) {
    stars.forEach((s) => {
      s.style.color = parseInt(s.dataset.value) <= value ? "gold" : "#ccc";
    });
  }
});
