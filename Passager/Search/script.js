document.addEventListener("DOMContentLoaded", () => {
  const tripCards = document.querySelectorAll(".trip-card");

  tripCards.forEach((card, index) => {
    const status = card.dataset.status;

    // 🔑 On définit un ID unique pour chaque carte (simulation)
    const trajetId = `trajet_${index + 1}`;
    const key = `reservations_${trajetId}`;

    const passagersMax = 3; // 🔧 À rendre dynamique plus tard si besoin
    let reservedCount = parseInt(localStorage.getItem(key)) || 0;

    // ✅ Si complet, on modifie la carte visuellement
    if (reservedCount >= passagersMax) {
      card.dataset.status = "complet";
      card.innerHTML += `<div class="status complet">Complet</div>`;
      card.style.cursor = "not-allowed";
      card.style.opacity = "0.6";
      return; // on empêche le clic
    }

    // Sinon on rend cliquable
    if (status === "active") {
      card.style.cursor = "pointer";

      card.addEventListener("click", () => {
        const times = card.querySelectorAll(".times span");
        const cities = card.querySelectorAll(".cities strong");
        const priceEl = card.querySelector(".price");

        const trajetData = {
          id: trajetId,
          depart: cities[0]?.textContent || "",
          arrivee: cities[1]?.textContent || "",
          prix: priceEl?.textContent || "",
          heureDepart: times[0]?.textContent || "",
          heureArrivee: times[2]?.textContent || "",
          date: "2024-05-10",
          passagers: passagersMax,
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
