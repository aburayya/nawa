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
    cell.innerHTML = `
      <img src="${w.image}">
      <div>${w.label} - ${w.col}</div>
      <div>${w.word}</div>
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
  text.textContent =
    `The ${w2.word} was affected by ${w1.word}, ` +
    `the change led to ${w4.word}, then ${w3.word}.`;
}

