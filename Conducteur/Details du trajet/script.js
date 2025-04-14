document.addEventListener("DOMContentLoaded", () => {
  // ====== Panel utilisateur ======
  const userIcon = document.getElementById("toggleMenu");
  const dropdown = document.getElementById("dropdownMenu");

  userIcon?.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("hidden");
  });

  document.addEventListener("click", (e) => {
    if (!userIcon.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown?.classList.add("hidden");
    }
  });

  // ====== Dropdowns ======
  document.querySelectorAll(".dropdown-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const block = btn.parentElement;
      block.classList.toggle("open");
    });
  });

  document.addEventListener("click", (e) => {
    document.querySelectorAll(".dropdown-block").forEach((block) => {
      if (!block.contains(e.target)) {
        block.classList.remove("open");
      }
    });
  });

  // ====== Préremplissage des champs ======
  const form = document.getElementById("createRideForm");
  const submitBtn = form.querySelector(".submit-btn");

  const defaultData = {
    depart: "Alger – Gare Routière Kharrouba",
    arrivee: "Béjaïa – Gare Routière Tafsout",
    date: "2024-05-10",
    time: "06:45",
    passagers: 3,
    marque: "Peugeot",
    modele: "301",
    prix: "1000 DA",
    habitual: true,
  };

  const fields = {
    depart: document.getElementById("depart"),
    arrivee: document.getElementById("arrivee"),
    date: form.querySelector('input[type="date"]'),
    time: form.querySelector('input[type="time"]'),
    passagers: form.querySelector('input[type="number"]'),
    marque: form.querySelector('input[placeholder*="Marque"]'),
    modele: form.querySelector('input[placeholder*="Modèle"]'),
    prix: form.querySelector('input[placeholder*="Prix"]'),
    habitual: document.getElementById("habituel-ride"),
  };

  // Remplir les champs
  fields.depart.value = defaultData.depart;
  fields.arrivee.value = defaultData.arrivee;
  fields.date.value = defaultData.date;
  fields.time.value = defaultData.time;
  fields.passagers.value = defaultData.passagers;
  fields.marque.value = defaultData.marque;
  fields.modele.value = defaultData.modele;
  fields.prix.value = defaultData.prix;
  fields.habitual.checked = defaultData.habitual;

  // Désactiver bouton tant que pas modifié
  submitBtn.disabled = true;
  submitBtn.style.opacity = "0.6";
  submitBtn.style.cursor = "not-allowed";

  const watchInputs = [
    fields.depart,
    fields.arrivee,
    fields.date,
    fields.time,
    fields.passagers,
    fields.marque,
    fields.modele,
    fields.prix,
    fields.habitual,
  ];

  watchInputs.forEach((input) => {
    input.addEventListener("input", enableSubmit);
    input.addEventListener("change", enableSubmit);
  });

  function enableSubmit() {
    submitBtn.disabled = false;
    submitBtn.style.opacity = "1";
    submitBtn.style.cursor = "pointer";
  }

  // ====== Soumission ======
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
      depart: fields.depart.value,
      arrivee: fields.arrivee.value,
      date: fields.date.value,
      time: fields.time.value,
      passagers: fields.passagers.value,
      marque: fields.marque.value,
      modele: fields.modele.value,
      prix: fields.prix.value,
      habitual: fields.habitual.checked,
    };

    console.log("🚗 Données sauvegardées :", data);
    localStorage.setItem("detailsTrajetConducteur", JSON.stringify(data));

    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.6";
    submitBtn.style.cursor = "not-allowed";
  });

  // ====== Autocomplétion ======
  const villes = [
    "Alger – Gare Routière Kharrouba",
    "Oran – Gare Routière Est (El Hamri)",
    "Constantine – Gare Routière Sidi Mabrouk",
    "Annaba – Gare Routière El Hadjar",
    "Blida – Gare Routière Centre-ville",
    "Béjaïa – Gare Routière Tafsout",
    "Sétif – Gare Routière El Eulma",
    "Tlemcen – Gare Routière Imama",
    "Tizi Ouzou – Gare Routière Centre-ville",
    "Biskra – Gare Routière 20 Août",
    "Ghardaïa – Gare Routière Bounoura",
    "Batna – Gare Routière Centrale",
    "Mostaganem – Gare Routière Centre",
    "Boumerdès – Gare Routière Ville",
    "Ouargla – Gare Routière Nassira",
    "Skikda – Gare Routière Centre",
    "El Oued – Gare Routière Oued Souf",
    "Relizane – Gare Routière Centre-ville",
    "Laghouat – Gare Routière Centrale",
    "Chlef – Gare Routière Hay Salem",
    "Djelfa – Gare Routière Principale",
    "Tiaret – Gare Routière Centre",
    "Saïda – Gare Routière Ville",
    "Tamanrasset – Gare Routière Abalessa",
    "Adrar – Gare Routière Centre",
    "Médéa – Gare Routière Principale",
    "Mascara – Gare Routière Centre",
    "Jijel – Gare Routière El Aouana",
    "Tipaza – Gare Routière Tipaza Ville",
    "Aïn Témouchent – Gare Routière Centrale",
  ];

  function setupAutocomplete(inputId, suggestId) {
    const input = document.getElementById(inputId);
    const suggestBox = document.getElementById(suggestId);

    input.addEventListener("input", () => {
      const val = input.value.toLowerCase();
      suggestBox.innerHTML = "";

      if (!val) return;

      const matches = villes.filter((v) => v.toLowerCase().startsWith(val));
      matches.forEach((ville) => {
        const li = document.createElement("li");
        li.textContent = ville;
        li.addEventListener("click", () => {
          input.value = ville;
          suggestBox.innerHTML = "";
          enableSubmit();
        });
        suggestBox.appendChild(li);
      });
    });

    document.addEventListener("click", (e) => {
      if (!suggestBox.contains(e.target) && e.target !== input) {
        suggestBox.innerHTML = "";
      }
    });
  }

  setupAutocomplete("depart", "suggest-depart");
  setupAutocomplete("arrivee", "suggest-arrivee");
});
