const villesAlgerie = [
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

document.addEventListener("DOMContentLoaded", () => {
  const userIcon = document.getElementById("toggleMenu");
  const dropdown = document.getElementById("dropdownMenu");

  // Toggle menu utilisateur
  userIcon.addEventListener("click", () => {
    dropdown.classList.toggle("hidden");
  });

  document.addEventListener("click", (e) => {
    if (!userIcon.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.add("hidden");
    }
  });

  // Redirection vers la page Search
  const searchForm = document.getElementById("searchForm");
  searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    window.location.href = "../Search/index.html";
  });

  // Autocomplete Départ et Arrivée
  setupAutocomplete("depart", "suggest-depart");
  setupAutocomplete("arrivee", "suggest-arrivee");
});

function setupAutocomplete(inputId, suggestionId) {
  const input = document.getElementById(inputId);
  const suggestionBox = document.getElementById(suggestionId);

  input.addEventListener("input", () => {
    const value = input.value.trim().toLowerCase();
    suggestionBox.innerHTML = "";

    if (value.length < 1) return;

    const matches = villesAlgerie.filter((ville) =>
      ville.toLowerCase().startsWith(value)
    );

    matches.forEach((ville) => {
      const li = document.createElement("li");
      li.textContent = ville;
      li.addEventListener("click", () => {
        input.value = ville;
        suggestionBox.innerHTML = "";
      });
      suggestionBox.appendChild(li);
    });
  });

  document.addEventListener("click", (e) => {
    if (!suggestionBox.contains(e.target) && e.target !== input) {
      suggestionBox.innerHTML = "";
    }
  });
}

// Nominatim API fonctionne pas bien
