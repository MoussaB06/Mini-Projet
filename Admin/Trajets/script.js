const modal = document.getElementById("modal");
const autoriserBtn = document.getElementById("autoriserBtn");

let selectedCell = null;
let selectedRowId = null;
let isCurrentlyAuthorized = false;

// 🔁 Charger depuis localStorage
document.querySelectorAll("tr[data-id]").forEach((row) => {
  const id = row.dataset.id;
  const savedStatus = localStorage.getItem(id);

  if (savedStatus === "autorisé") {
    const status = row.querySelector(".status");
    const icon = row.querySelector(".icon");

    status.textContent = "Autorisé";
    status.classList.remove("bloqué");
    status.classList.add("autorisé");
    icon.textContent = "✅";
  }
});

// 📌 Clic sur une cellule d'action
document.querySelectorAll(".action-cell").forEach((cell) => {
  cell.addEventListener("click", () => {
    selectedCell = cell;
    selectedRowId = cell.closest("tr").dataset.id;

    const currentStatus = cell.querySelector(".status").textContent.trim();
    isCurrentlyAuthorized = currentStatus === "Autorisé";

    // Texte de la modale
    const modalText = isCurrentlyAuthorized
      ? "Souhaitez-vous bloquer ce trajet ?"
      : "Souhaitez-vous autoriser ce trajet ?";
    document.querySelector(".modal-content p").textContent = modalText;

    // Texte et couleur du bouton
    autoriserBtn.textContent = isCurrentlyAuthorized
      ? "❌ Bloquer"
      : "✅ Autoriser";
    autoriserBtn.classList.remove("success-btn", "danger-btn");
    autoriserBtn.classList.add(
      isCurrentlyAuthorized ? "danger-btn" : "success-btn"
    );

    modal.classList.remove("hidden");
  });
});

// ✅ Clic sur le bouton dans la modale
autoriserBtn.addEventListener("click", () => {
  if (!selectedCell || !selectedRowId) return;

  const status = selectedCell.querySelector(".status");
  const icon = selectedCell.querySelector(".icon");

  if (isCurrentlyAuthorized) {
    status.textContent = "Bloqué";
    status.classList.remove("autorisé");
    status.classList.add("bloqué");
    icon.textContent = "❌";
    localStorage.setItem(selectedRowId, "bloqué");
  } else {
    status.textContent = "Autorisé";
    status.classList.remove("bloqué");
    status.classList.add("autorisé");
    icon.textContent = "✅";
    localStorage.setItem(selectedRowId, "autorisé");
  }

  modal.classList.add("hidden");
  selectedCell = null;
  selectedRowId = null;
});

// ❌ Fermer la modale si clic en dehors
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});
