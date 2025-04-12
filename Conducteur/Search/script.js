document.addEventListener("DOMContentLoaded", () => {
  const tripCards = document.querySelectorAll(".trip-card");

  tripCards.forEach((card) => {
    const status = card.dataset.status;

    if (status === "active") {
      card.style.cursor = "pointer";
      card.addEventListener("click", () => {
        window.location.href = "../Reserver Trajet/index.html";
      });
    } else {
      card.style.opacity = "0.6";
      card.style.cursor = "not-allowed";
    }
  });

  // === Navigation via le header ===
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
