let words = [];
let selectedWords = [];

async function loadWords() {
  const res = await fetch('data/words.json');
  words = await res.json();
  renderWordsTable();
}

function renderWordsTable() {
  const panel = document.getElementById('words-panel');
  // build table with rows/cols, Arabic row labels, numeric column labels
}

function selectWord(word) {
  if (selectedWords.length === 4) selectedWords = [];
  selectedWords.push(word);
  if (selectedWords.length === 4) {
    renderStory(selectedWords);
    renderStoryText(selectedWords);
  }
}

function renderStory([w1, w2, w3, w4]) {
  // apply layout:
  // w2 main 300x300, w1 bottom-left 150x150, w4 bottom-right 150x150, w3 300x300 to the right
}

function renderStoryText([w1, w2, w3, w4]) {
  const textDiv = document.getElementById('story-text');
  const sentence = `The ${w2.englishLabel} was affected by ${w1.englishLabel}, `
    + `the change led to ${w4.englishLabel}, then ${w3.englishLabel}.`;
  textDiv.textContent = sentence;
}

loadWords();