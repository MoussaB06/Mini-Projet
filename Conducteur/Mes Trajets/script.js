document.addEventListener("DOMContentLoaded", () => {
  const userIcon = document.getElementById("toggleMenu");
  const dropdown = document.getElementById("dropdownMenu");

  const modalOverlay = document.getElementById("modalOverlay");
  const confirmBtn = document.getElementById("confirmDelete");
  const cancelBtn = document.getElementById("cancelDelete");

  let cardToDelete = null;

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      cardToDelete = btn.closest(".trip-card");
      modalOverlay.classList.remove("hidden");
    });
  });

  confirmBtn.addEventListener("click", () => {
    if (cardToDelete) {
      cardToDelete.remove();
      cardToDelete = null;
    }
    modalOverlay.classList.add("hidden");
  });

  cancelBtn.addEventListener("click", () => {
    modalOverlay.classList.add("hidden");
    cardToDelete = null;
  });

  // Toggle menu
  userIcon?.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("hidden");
  });

  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target) && !userIcon.contains(e.target)) {
      dropdown.classList.add("hidden");
    }
  });
});
