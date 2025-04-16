document.addEventListener("DOMContentLoaded", () => {
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

  const reserveBtn = document.getElementById("reserveBtn");
  const confirmation = document.getElementById("confirmation");
  const statusDiv = document.getElementById("status");
  const passagerMax = parseInt(
    document.getElementById("passagers").textContent
  );

  const trajetId = "trajet_001";
  const key = `reservations_${trajetId}`;

  // 🧹 Réinitialiser à chaque rafraîchissement
  localStorage.removeItem(key);

  // On redémarre à zéro
  let reservedCount = 0;

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
      }, 5000);
    }
  });

  console.log("🔁 Réservations remises à zéro. Passagers max :", passagerMax);
});
