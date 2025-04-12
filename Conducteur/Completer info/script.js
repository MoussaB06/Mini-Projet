document.addEventListener("DOMContentLoaded", function () {
  // 📸 Photo de profil (unique)
  const photoInput = document.getElementById("photo-upload");
  const photoPreview = document.getElementById("photoPreview");
  const placeholder = document.getElementById("placeholder");

  photoInput.addEventListener("change", function () {
    const file = photoInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      photoPreview.src = e.target.result;
      photoPreview.classList.remove("hidden");
      placeholder.classList.add("hidden");
    };
    reader.readAsDataURL(file);
  });

  // 📂 Fonction pour gérer les uploads avec aperçu + bouton suppression
  function setupMultiUpload(inputId, previewId) {
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);

    input.addEventListener("change", () => {
      const files = Array.from(input.files);

      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const wrapper = document.createElement("div");
          wrapper.classList.add("preview-image-wrapper");

          const img = document.createElement("img");
          img.src = e.target.result;

          const deleteBtn = document.createElement("button");
          deleteBtn.textContent = "×";
          deleteBtn.classList.add("delete-btn");

          deleteBtn.addEventListener("click", () => {
            wrapper.remove();
          });

          wrapper.appendChild(img);
          wrapper.appendChild(deleteBtn);
          preview.appendChild(wrapper);
        };
        reader.readAsDataURL(file);
      });

      input.value = ""; // Réinitialise pour permettre de re-uploader la même image
    });
  }

  // 🔁 Appliquer aux champs
  setupMultiUpload("identity-upload", "identityPreview");
  setupMultiUpload("permit-upload", "permitPreview");
  setupMultiUpload("vehicle-upload", "vehiclePreview");

  // 🧾 Validation des champs texte
  const inputs = document.querySelectorAll(
    'input[type="text"], input[type="tel"]'
  );
  inputs.forEach((input) => {
    input.addEventListener("focus", () => {
      input.classList.remove("error");
      input.parentElement.querySelector(".error-message").textContent = "";
    });

    input.addEventListener("blur", () => {
      if (input.value.trim() === "") {
        input.classList.add("error");
        input.parentElement.querySelector(".error-message").textContent =
          "Ce champ est requis.";
      }
    });
  });

  // ✅ Soumission finale
  document.getElementById("submitBtn").addEventListener("click", (e) => {
    let valid = true;
    inputs.forEach((input) => {
      if (input.value.trim() === "") {
        input.classList.add("error");
        input.parentElement.querySelector(".error-message").textContent =
          "Ce champ est requis.";
        valid = false;
      }
    });

    if (!valid) {
      e.preventDefault();
      alert("Veuillez remplir tous les champs obligatoires.");
    } else {
      alert("Formulaire soumis !");
    }
  });
});
