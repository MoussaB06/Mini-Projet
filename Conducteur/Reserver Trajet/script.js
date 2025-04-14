document.addEventListener("DOMContentLoaded", () => {
  // ===== Menu déroulant utilisateur =====
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

  // ===== Message de confirmation =====
  const reserveBtn = document.getElementById("reserveBtn");
  const confirmation = document.getElementById("confirmation");

  if (reserveBtn && confirmation) {
    reserveBtn.addEventListener("click", () => {
      // Afficher le message
      confirmation.classList.remove("hidden");

      // Masquer après 5 secondes
      setTimeout(() => {
        confirmation.classList.add("hidden");
      }, 5000);
    });
  }
});
