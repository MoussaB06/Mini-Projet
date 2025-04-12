const villesAlgerie = [
  "Alger",
  "Oran",
  "Constantine",
  "Annaba",
  "Blida",
  "Béjaïa",
  "Sétif",
  "Tlemcen",
  "Tizi Ouzou",
  "Biskra",
  "Ghardaïa",
  "Batna",
  "Mostaganem",
  "Boumerdès",
  "Ouargla",
  "Skikda",
  "El Oued",
  "Relizane",
  "Laghouat",
  "Chlef",
  "Djelfa",
  "Tiaret",
  "Saïda",
  "Tamanrasset",
  "Adrar",
  "Médéa",
  "Mascara",
  "Jijel",
  "Tipaza",
  "Aïn Témouchent",
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
