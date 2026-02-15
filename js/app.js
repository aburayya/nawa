let selected = [];

loadWords().then(ws => {
  words = ws;
  updateUI();
  renderWords(words);
});

function renderWords(list) {
  const panel = document.getElementById("words-panel");
  panel.innerHTML = "";

  list.forEach(w => {
    const cell = document.createElement("div");
    cell.className = "word-cell";
    const text = currentLang === "ar" ? w.arabicWord : w.englishWord;

    cell.innerHTML = `
      <img src="${w.image}">
      <div>${w.label} - ${w.col}</div>
      <div>${text}</div>
    `;
    cell.onclick = () => selectWord(w);
    panel.appendChild(cell);
  });
}

function selectWord(w) {
  if (selected.length === 4) selected = [];
  selected.push(w);

  if (selected.length === 4) {
    renderStory(selected);
    renderStoryText(selected);
  }
}

function renderStory([w1, w2, w3, w4]) {
  const story = document.getElementById("story-images");

  story.innerHTML = `
    <div class="story-main">
      <img src="${w2.image}">
    </div>

    <div class="story-row">
      <div class="story-small">
        <img src="${w1.image}">
      </div>
      <div class="story-small">
        <img src="${w4.image}">
      </div>
    </div>

    <div class="story-outcome">
      <img src="${w3.image}">
    </div>
  `;
}

function renderStoryText([w1, w2, w3, w4]) {
  const textDiv = document.getElementById("story-text");

  const w1t = currentLang === "ar" ? w1.arabicWord : w1.englishWord;
  const w2t = currentLang === "ar" ? w2.arabicWord : w2.englishWord;
  const w3t = currentLang === "ar" ? w3.arabicWord : w3.englishWord;
  const w4t = currentLang === "ar" ? w4.arabicWord : w4.englishWord;

  if (currentLang === "ar") {
    textDiv.textContent = `${w2t} تأثر بـ ${w1t}، ثم أدى التغيير إلى ${w4t}، ثم ${w3t}.`;
  } else {
    textDiv.textContent =
      `The ${w2t} was affected by ${w1t}, ` +
      `the change led to ${w4t}, then ${w3t}.`;
  }
}

