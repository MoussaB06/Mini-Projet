document.addEventListener("DOMContentLoaded", () => {
  const tripCards = document.querySelectorAll(".trip-card");

  tripCards.forEach((card) => {
    const status = card.dataset.status;

    if (status === "active") {
      card.style.cursor = "pointer";

      card.addEventListener("click", () => {
        // 🧠 Récupération des infos affichées dans la carte
        const times = card.querySelectorAll(".times span");
        const cities = card.querySelectorAll(".cities strong");
        const priceEl = card.querySelector(".price");

        const trajetData = {
          depart: cities[0]?.textContent || "",
          arrivee: cities[1]?.textContent || "",
          prix: priceEl?.textContent || "",
          heureDepart: times[0]?.textContent || "",
          heureArrivee: times[2]?.textContent || "",
          date: "2024-05-10", // (optionnel) : à remplacer dynamiquement si tu ajoutes un champ date
          passagers: "3", // (temporaire, à remplacer par des vraies données plus tard)
          marque: "Peugeot", // idem
          modele: "301",
          confort: "Climatisation, USB",
          options: "Musique, Animaux",
        };

        // 💾 Enregistrement dans localStorage
        localStorage.setItem("selectedTrip", JSON.stringify(trajetData));

        // 🔀 Redirection
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
});
