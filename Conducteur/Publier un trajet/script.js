document.addEventListener("DOMContentLoaded", () => {
  // ==== Panel utilisateur ====
  const userIcon = document.getElementById("toggleMenu");
  const dropdown = document.getElementById("dropdownMenu");

  userIcon?.addEventListener("click", () => {
    dropdown?.classList.toggle("hidden");
  });

  document.addEventListener("click", (e) => {
    if (!userIcon.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown?.classList.add("hidden");
    }
  });

  // ==== Dropdowns confort et options ====
  document.querySelectorAll(".dropdown-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const block = btn.parentElement;
      block.classList.toggle("open");
    });
  });

  document.addEventListener("click", (e) => {
    document.querySelectorAll(".dropdown-block").forEach((block) => {
      if (!block.contains(e.target)) {
        block.classList.remove("open");
      }
    });
  });

  // ==== Confirmation de publication ====
  const form = document.getElementById("createRideForm");
  const confirmation = document.getElementById("confirmation");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Optionnel : récupérer si c'est un trajet habituel
    const isHabitual = document.getElementById("habitualRide")?.checked;

    console.log("🚌 Trajet publié !");
    console.log("Trajet habituel :", isHabitual ? "Oui" : "Non");

    confirmation.classList.remove("hidden");
    setTimeout(() => {
      confirmation.classList.add("hidden");
    }, 5000);
  });

  // ==== Autocomplétion (optionnel à connecter à une API ou liste) ====
  const villes = [
    "Alger – Gare Routière Kharrouba",
    "Oran – Gare Routière Est (El Hamri)",
    "Constantine – Gare Routière Sidi Mabrouk",
    "Annaba – Gare Routière El Hadjar",
    "Blida – Gare Routière Centre-ville",
    "Béjaïa – Gare Routière Tafsout",
    "Sétif – Gare Routière El Eulma",
    "Tlemcen – Gare Routière Imama",
    "Tizi Ouzou – Gare Routière Centre-ville",
    "Biskra – Gare Routière 20 Août",
    "Ghardaïa – Gare Routière Bounoura",
    "Batna – Gare Routière Centrale",
    "Mostaganem – Gare Routière Centre",
    "Boumerdès – Gare Routière Ville",
    "Ouargla – Gare Routière Nassira",
    "Skikda – Gare Routière Centre",
    "El Oued – Gare Routière Oued Souf",
    "Relizane – Gare Routière Centre-ville",
    "Laghouat – Gare Routière Centrale",
    "Chlef – Gare Routière Hay Salem",
    "Djelfa – Gare Routière Principale",
    "Tiaret – Gare Routière Centre",
    "Saïda – Gare Routière Ville",
    "Tamanrasset – Gare Routière Abalessa",
    "Adrar – Gare Routière Centre",
    "Médéa – Gare Routière Principale",
    "Mascara – Gare Routière Centre",
    "Jijel – Gare Routière El Aouana",
    "Tipaza – Gare Routière Tipaza Ville",
    "Aïn Témouchent – Gare Routière Centrale",
  ];

  function setupAutocomplete(inputId, suggestId) {
    const input = document.getElementById(inputId);
    const suggestBox = document.getElementById(suggestId);

    input.addEventListener("input", () => {
      const val = input.value.toLowerCase();
      suggestBox.innerHTML = "";

      if (!val) return;

      const matches = villes.filter((v) => v.toLowerCase().startsWith(val));
      matches.forEach((ville) => {
        const li = document.createElement("li");
        li.textContent = ville;
        li.addEventListener("click", () => {
          input.value = ville;
          suggestBox.innerHTML = "";
        });
        suggestBox.appendChild(li);
      });
    });

    document.addEventListener("click", (e) => {
      if (!suggestBox.contains(e.target) && e.target !== input) {
        suggestBox.innerHTML = "";
      }
    });
  }

  setupAutocomplete("depart", "suggest-depart");
  setupAutocomplete("arrivee", "suggest-arrivee");
});
