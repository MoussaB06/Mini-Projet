document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Empêche l'envoi par défaut

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    // Vérifie si tous les champs sont remplis
    if (
      name.value.trim() !== "" &&
      email.value.trim() !== "" &&
      password.value.trim() !== ""
    ) {
      // Redirige vers le 2e écran
      window.location.href = "../Choice/index.html";
    } else {
      alert("Merci de remplir tous les champs !");
    }
  });
});
