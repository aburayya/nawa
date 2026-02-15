let currentLang = "ar";
let selected = [];

loadWords().then(words => {
  renderWords(words);
});

function renderWords(words) {
  const panel = document.getElementById("words-panel");
  panel.innerHTML = "";

  words.forEach(w => {
    const cell = document.createElement("div");
    cell.className = "word-cell";
    ccell.innerHTML = `
  <img src="${w.image}">
  <div>${w.label} - ${w.col}</div>
  <div>${currentLang === "ar" ? w.arabicWord : w.englishWord}</div>
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
    <div class="main-box">
      <img src="${w2.image}" class="main-box">
      <img src="${w1.image}" class="small-box bottom-left">
      <img src="${w4.image}" class="small-box bottom-right">
    </div>

    <img src="${w3.image}" class="outcome-box">
  `;
}

function renderStoryText([w1, w2, w3, w4]) {
  const text = document.getElementById("story-text");
  const w1t = currentLang === "ar" ? w1.arabicWord : w1.englishWord;
const w2t = currentLang === "ar" ? w2.arabicWord : w2.englishWord;
const w3t = currentLang === "ar" ? w3.arabicWord : w3.englishWord;
const w4t = currentLang === "ar" ? w4.arabicWord : w4.englishWord;

if (currentLang === "ar") {
  text.textContent = `${w2t} تأثر بـ ${w1t}، ثم أدى التغيير إلى ${w4t}، ثم ${w3t}.`;
} else {
  text.textContent = `The ${w2t} was affected by ${w1t}, the change led to ${w4t}, then ${w3t}.`;
}



