document.addEventListener("DOMContentLoaded", function () {
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

  // Initialiser tous les uploads image
  setupMultiUpload("identity-upload", "identityPreview");
  setupMultiUpload("permit-upload", "permitPreview");
  setupMultiUpload("vehicle-upload", "vehiclePreview");
  setupMultiUpload("registration-upload", "registrationPreview");
  setupMultiUpload("insurance-upload", "insurancePreview");

  const inputs = document.querySelectorAll(
    'input[type="text"], input[type="tel"]'
  );
  const phoneInput = document.getElementById("phone");
  const phoneRegex = /^(\+?\d{7,15})$/;

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

  document.getElementById("submitBtn").addEventListener("click", (e) => {
    let valid = true;

    // ✅ Vérification des champs texte
    inputs.forEach((input) => {
      if (input.value.trim() === "") {
        input.classList.add("error");
        input.parentElement.querySelector(".error-message").textContent =
          "Ce champ est requis.";
        valid = false;
      }
    });

    // ✅ Vérification du numéro de téléphone
    if (!phoneRegex.test(phoneInput.value.trim())) {
      phoneInput.classList.add("error");
      phoneInput.parentElement.querySelector(".error-message").textContent =
        "Numéro de téléphone invalide.";
      valid = false;
    }

    // ✅ Vérification des previews images obligatoires
    const hasIdentity =
      document.querySelectorAll("#identityPreview .preview-image-wrapper")
        .length > 0;
    const hasPermit =
      document.querySelectorAll("#permitPreview .preview-image-wrapper")
        .length > 0;
    const hasRegistration =
      document.querySelectorAll("#registrationPreview .preview-image-wrapper")
        .length > 0;
    const hasInsurance =
      document.querySelectorAll("#insurancePreview .preview-image-wrapper")
        .length > 0;

    if (!hasIdentity || !hasPermit || !hasRegistration || !hasInsurance) {
      alert(
        "Veuillez ajouter toutes les images obligatoires : carte d'identité, permis, carte grise et assurance."
      );
      valid = false;
    }

    if (!valid) {
      e.preventDefault();
    } else {
      alert("Formulaire soumis !");
      // ✅ Redirection vers l'accueil (Home)
      window.location.href = "../Home/index.html"; // adapte le chemin si besoin
    }
  });

  function setupMultiUpload(inputId, previewId) {
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);

    input.addEventListener("change", () => {
      const files = Array.from(input.files);

      files.forEach((file) => {
        const validTypes = ["image/jpeg", "image/png"];
        if (!validTypes.includes(file.type)) {
          alert("Seules les images JPG ou PNG sont acceptées.");
          return;
        }

        if (file.size < 52 * 1024 || file.size > 60 * 1024) {
          alert(
            "La taille de l’image doit être comprise entre 52 Ko et 60 Ko. Veuillez fournir un document clair et lisible."
          );
          return;
        }

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

      input.value = "";
    });
  }
});
