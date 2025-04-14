// script.js - Complet pour l'écran Search avec panel utilisateur

document.addEventListener("DOMContentLoaded", () => {
  const tripCards = document.querySelectorAll(".trip-card");

  tripCards.forEach((card) => {
    const status = card.dataset.status;

    if (status === "active") {
      card.style.cursor = "pointer";

      card.addEventListener("click", () => {
        const times = card.querySelectorAll(".times span");
        const cities = card.querySelectorAll(".cities strong");
        const priceEl = card.querySelector(".price");

        const trajetData = {
          depart: cities[0]?.textContent || "",
          arrivee: cities[1]?.textContent || "",
          prix: priceEl?.textContent || "",
          heureDepart: times[0]?.textContent || "",
          heureArrivee: times[2]?.textContent || "",
          date: "2024-05-10",
          passagers: "3",
          marque: "Peugeot",
          modele: "301",
          confort: "Climatisation, USB",
          options: "Musique, Animaux",
        };

        localStorage.setItem("selectedTrip", JSON.stringify(trajetData));
        window.location.href = "../Reserver Trajet/index.html";
      });
    } else {
      card.style.cursor = "not-allowed";
      card.style.opacity = "0.6";
    }
  });

  // === Navigation Header ===
  document.getElementById("goHome")?.addEventListener("click", () => {
    window.location.href = "../Home/index.html";
  });

  document.getElementById("goSearch")?.addEventListener("click", () => {
    window.location.href = "../Home/index.html";
  });

  document.getElementById("goPublish")?.addEventListener("click", () => {
    window.location.href = "../Publier un trajet/index.html";
  });

  // === Panel utilisateur déroulant ===
  const userIcon = document.getElementById("toggleMenu");
  const dropdown = document.getElementById("dropdownMenu");

  userIcon?.addEventListener("click", () => {
    dropdown?.classList.toggle("hidden");
  });

  document.addEventListener("click", (e) => {
    if (!userIcon?.contains(e.target) && !dropdown?.contains(e.target)) {
      dropdown?.classList.add("hidden");
    }
  });
});
