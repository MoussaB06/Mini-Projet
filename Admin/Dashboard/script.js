const uploadInput = document.getElementById("upload");
const profileImage = document.getElementById("profileImage");

// Charger l'image si déjà enregistrée
const savedImage = localStorage.getItem("profileImage");
if (savedImage) {
  profileImage.src = savedImage;
}

// Quand l'utilisateur sélectionne un fichier
uploadInput.addEventListener("change", () => {
  const file = uploadInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      profileImage.src = reader.result;
      localStorage.setItem("profileImage", reader.result);
    };
    reader.readAsDataURL(file);
  }
});
