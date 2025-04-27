document.addEventListener("DOMContentLoaded", () => {
  // === Gestion du Panel utilisateur ===
  const userIcon = document.getElementById("toggleMenu");
  const dropdown = document.getElementById("dropdownMenu");

  if (userIcon && dropdown) {
    userIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdown.classList.toggle("hidden");
    });

    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target) && !userIcon.contains(e.target)) {
        dropdown.classList.add("hidden");
      }
    });
  }

  // === Gestion du formulaire (passager) ===
  const nameInput = document.getElementById("name");
  const phoneInput = document.getElementById("phone");
  const submitBtn = document.getElementById("submitBtn");

  const defaultData = {
    name: "Moussa Mohamed Benmouhoub",
    phone: "0555 66 77 88",
  };

  const savedData =
    JSON.parse(localStorage.getItem("passagerProfil")) || defaultData;

  nameInput.value = savedData.name;
  phoneInput.value = savedData.phone;

  disableSubmitButton();

  [nameInput, phoneInput].forEach((input) => {
    input.addEventListener("input", () => {
      enableSubmitButton();
    });
  });

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const updatedData = {
      name: nameInput.value,
      phone: phoneInput.value,
    };
    localStorage.setItem("passagerProfil", JSON.stringify(updatedData));
    disableSubmitButton();
  });

  function disableSubmitButton() {
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.6";
    submitBtn.style.cursor = "not-allowed";
  }

  function enableSubmitButton() {
    submitBtn.disabled = false;
    submitBtn.style.opacity = "1";
    submitBtn.style.cursor = "pointer";
  }
});
