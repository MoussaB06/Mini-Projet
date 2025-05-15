const modal = document.getElementById("modal");
const autoriserBtn = document.getElementById("autoriserBtn");

let selectedCell = null;
let selectedRowId = null;
let isCurrentlyAuthorized = false;

// 🔁 Charger les statuts depuis localStorage
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

// 📌 Clic sur cellule action
document.querySelectorAll(".action-cell").forEach((cell) => {
  cell.addEventListener("click", () => {
    selectedCell = cell;
    selectedRowId = cell.closest("tr").dataset.id;

    const currentStatus = cell.querySelector(".status").textContent.trim();
    isCurrentlyAuthorized = currentStatus === "Autorisé";

    // Mise à jour du texte de la modale
    const modalText = isCurrentlyAuthorized
      ? "Souhaitez-vous bloquer cet utilisateur ?"
      : "Souhaitez-vous autoriser cet utilisateur ?";
    document.querySelector(".modal-content p").textContent = modalText;

    // Mise à jour du bouton (texte + couleur)
    autoriserBtn.textContent = isCurrentlyAuthorized
      ? "❌ Bloquer"
      : "✅ Autoriser";
    autoriserBtn.classList.remove("success-btn", "danger-btn");
    autoriserBtn.classList.add(
      isCurrentlyAuthorized ? "danger-btn" : "success-btn"
    );

    // Afficher la modale
    modal.classList.remove("hidden");
  });
});

// ✅ Clic sur le bouton d'action dans la modale
autoriserBtn.addEventListener("click", () => {
  if (!selectedCell || !selectedRowId) return;

  const status = selectedCell.querySelector(".status");
  const icon = selectedCell.querySelector(".icon");

  if (isCurrentlyAuthorized) {
    // 🔒 Bloquer
    status.textContent = "Bloqué";
    status.classList.remove("autorisé");
    status.classList.add("bloqué");
    icon.textContent = "❌";
    localStorage.setItem(selectedRowId, "bloqué");
  } else {
    // ✅ Autoriser
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
