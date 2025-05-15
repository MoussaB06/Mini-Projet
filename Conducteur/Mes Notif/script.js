// 🔄 Gestion du menu utilisateur
document.getElementById("toggleMenu").addEventListener("click", () => {
  const menu = document.getElementById("dropdownMenu");
  menu.classList.toggle("hidden");
});

// 🔁 Fonction pour traiter la réservation (valider ou refuser)
function traiterReservation(passagerId, action, parent) {
  fetch(`http://localhost:3000/api/reservations/${action}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ passagerId }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Erreur serveur");
      return res.json();
    })
    .then(() => {
      if (action === "valider") {
        showMessage("✅ Réservation confirmée (SMS envoyé) !");
      } else {
        showMessage("❌ Réservation non prise en compte.");
      }

      // ❌ Empêcher nouvelle action
      parent.querySelectorAll("button").forEach((btn) => {
        btn.disabled = true;
        btn.style.opacity = "0.4";
        btn.style.cursor = "not-allowed";
      });

      // 🎨 Griser la ligne
      parent.style.backgroundColor = "#f0f0f0";
    })
    .catch(() => {
      showMessage("❌ Une erreur est survenue. Veuillez réessayer.");
    });
}

// ✅ Bouton de validation
document.querySelectorAll(".validate").forEach((button) => {
  button.addEventListener("click", () => {
    const parent = button.closest(".notif-item");
    const passagerId = parent.dataset.passagerId;
    traiterReservation(passagerId, "valider", parent);
  });
});

// ❌ Bouton de rejet
document.querySelectorAll(".reject").forEach((button) => {
  button.addEventListener("click", () => {
    const parent = button.closest(".notif-item");
    const passagerId = parent.dataset.passagerId;
    traiterReservation(passagerId, "refuser", parent);
  });
});

// ✅ Message temporaire (toast)
function showMessage(text) {
  const message = document.createElement("div");
  message.className = "toast-message";
  message.textContent = text;

  document.body.appendChild(message);

  setTimeout(() => {
    message.classList.add("visible");
  }, 50);

  setTimeout(() => {
    message.classList.remove("visible");
    setTimeout(() => message.remove(), 300);
  }, 1500);
}
