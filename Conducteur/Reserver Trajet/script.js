document.addEventListener("DOMContentLoaded", () => {
  const reserveBtn = document.getElementById("reserveBtn");
  const confirmation = document.getElementById("confirmation");

  reserveBtn.addEventListener("click", () => {
    confirmation.classList.remove("hidden");

    // Masquer après 5 secondes
    setTimeout(() => {
      confirmation.classList.add("hidden");
    }, 5000);
  });
});
