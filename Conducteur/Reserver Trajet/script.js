document.addEventListener("DOMContentLoaded", () => {
  // ===== Panel utilisateur =====
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

  // ===== Récupération des infos du trajet depuis localStorage =====
  const tripData = JSON.parse(localStorage.getItem("selectedTrip"));
  const trajetId = tripData?.id || "trajet_001"; // ID unique, transmis depuis Search

  const key = `reservations_${trajetId}`;
  const passagerMax = parseInt(tripData?.passagers || "3");
  let reservedCount = parseInt(localStorage.getItem(key)) || 0;

  const statusDiv = document.getElementById("status");
  const reserveBtn = document.getElementById("reserveBtn");
  const confirmation = document.getElementById("confirmation");

  // Remplir les infos dans l'écran
  if (tripData) {
    document.getElementById("depart").textContent = tripData.depart;
    document.getElementById("arrivee").textContent = tripData.arrivee;
    document.getElementById("date").textContent = tripData.date;
    document.getElementById("heure").textContent = tripData.heureDepart;
    document.getElementById("passagers").textContent = tripData.passagers;
    document.getElementById("marque").textContent = tripData.marque;
    document.getElementById("modele").textContent = tripData.modele;
    document.getElementById("prix").textContent = tripData.prix;
  }

  // 🔁 Réinitialisation automatique des réservations à chaque chargement
  localStorage.setItem(key, "0");
  reservedCount = 0;

  function updateStatus() {
    if (reservedCount >= passagerMax) {
      statusDiv.textContent = "🛑 Statut : Complet";
      statusDiv.classList.add("complet");
      reserveBtn.disabled = true;
      reserveBtn.style.opacity = "0.5";
      reserveBtn.style.cursor = "not-allowed";
    } else {
      statusDiv.textContent = `🚶‍♂️ Réservations : ${reservedCount} / ${passagerMax}`;
      statusDiv.classList.remove("complet");
      reserveBtn.disabled = false;
      reserveBtn.style.opacity = "1";
      reserveBtn.style.cursor = "pointer";
    }
  }

  updateStatus();

  reserveBtn?.addEventListener("click", () => {
    if (reservedCount < passagerMax) {
      reservedCount++;
      localStorage.setItem(key, reservedCount);
      updateStatus();

      confirmation.classList.remove("hidden");
      setTimeout(() => {
        confirmation.classList.add("hidden");
      }, 4000);
    }
  });
});
