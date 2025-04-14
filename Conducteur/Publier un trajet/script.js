document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("createRideForm");
  const confirmation = document.getElementById("confirmation");

  // ✅ Villes algériennes
  const villesAlgeriennes = [
    "Alger",
    "Oran",
    "Constantine",
    "Annaba",
    "Blida",
    "Tizi Ouzou",
    "Béjaïa",
    "Sétif",
    "Batna",
    "Tlemcen",
    "Mostaganem",
    "Ghardaïa",
    "Boumerdès",
    "Bouira",
    "Laghouat",
    "Biskra",
    "El Oued",
    "Skikda",
    "Jijel",
    "Adrar",
    "Saïda",
    "Mascara",
    "Guelma",
    "Relizane",
    "Tiaret",
    "Souk Ahras",
    "Naâma",
    "Aïn Témouchent",
    "Tamanrasset",
  ];

  const departInput = document.getElementById("depart");
  const arriveeInput = document.getElementById("arrivee");
  const suggestDepart = document.getElementById("suggest-depart");
  const suggestArrivee = document.getElementById("suggest-arrivee");

  // 🔁 Autocomplétion
  function setupAutocomplete(input, suggestionsBox) {
    input.addEventListener("input", function () {
      const val = input.value.toLowerCase();
      suggestionsBox.innerHTML = "";
      if (val.length === 0) return;

      const matched = villesAlgeriennes.filter((v) =>
        v.toLowerCase().startsWith(val)
      );

      matched.forEach((city) => {
        const li = document.createElement("li");
        li.textContent = city;
        li.addEventListener("click", () => {
          input.value = city;
          suggestionsBox.innerHTML = "";
        });
        suggestionsBox.appendChild(li);
      });
    });

    document.addEventListener("click", (e) => {
      if (!input.contains(e.target) && !suggestionsBox.contains(e.target)) {
        suggestionsBox.innerHTML = "";
      }
    });
  }

  setupAutocomplete(departInput, suggestDepart);
  setupAutocomplete(arriveeInput, suggestArrivee);

  // ✅ Dropdown toggle
  document.querySelectorAll(".dropdown-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const block = btn.parentElement;
      block.classList.toggle("open");
    });
  });

  // Fermer dropdowns si clic à l’extérieur
  document.addEventListener("click", function (e) {
    document.querySelectorAll(".dropdown-block").forEach((block) => {
      if (!block.contains(e.target)) {
        block.classList.remove("open");
      }
    });
  });

  // ✅ Afficher la confirmation pendant 5 secondes
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    confirmation.classList.remove("hidden");

    setTimeout(() => {
      confirmation.classList.add("hidden");
    }, 5000);
  });

  // ✅ Panel utilisateur (menu déroulant avatar)
  const userIcon = document.getElementById("toggleMenu");
  const dropdown = document.getElementById("dropdownMenu");

  if (userIcon && dropdown) {
    userIcon.addEventListener("click", () => {
      dropdown.classList.toggle("hidden");
    });

    document.addEventListener("click", (e) => {
      if (!userIcon.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.add("hidden");
      }
    });
  }
});
