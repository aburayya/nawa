let adminWords = [];

async function loadAdminWords() {
  const res = await fetch("data/words.json");
  adminWords = await res.json();
  renderAdminTable();
}

function renderAdminTable() {
  const tbody = document.querySelector("#admin-table tbody");
  tbody.innerHTML = "";

  adminWords.forEach((w, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${w.id}</td>

      <td>
        <input type="text" value="${w.label}" data-field="label" data-index="${index}">
      </td>

      <td>
        <input type="text" value="${w.word}" data-field="word" data-index="${index}">
      </td>

      <td>
        <input type="number" min="1" max="4" value="${w.col}" data-field="col" data-index="${index}">
      </td>

      <td>
        <img src="${w.image}">
      </td>

      <td>
        <input type="file" accept="image/*" data-field="image" data-index="${index}">
      </td>
    `;

    tbody.appendChild(row);
  });

  attachAdminListeners();
}

function attachAdminListeners() {
  document.querySelectorAll("#admin-table input").forEach(input => {
    input.addEventListener("change", e => {
      const index = e.target.dataset.index;
      const field = e.target.dataset.field;

      if (field === "image") {
        const file = e.target.files[0];
        if (file) {
          const url = URL.createObjectURL(file);
          adminWords[index].image = url; // preview only
        }
      } else {
        adminWords[index][field] = e.target.value;
      }
    });
  });
}

document.getElementById("save-changes").onclick = async () => {
  const json = JSON.stringify(adminWords, null, 2);

  document.getElementById("save-status").textContent = "جاري الحفظ...";

  await updateFile(
    WORDS_PATH,
    json,
    "Updated NAWA words via Admin Panel"
  );

  document.getElementById("save-status").textContent = "تم الحفظ في GitHub بنجاح";
};

loadAdminWords();

