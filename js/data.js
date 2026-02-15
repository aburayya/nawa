async function loadWords() {
  const local = localStorage.getItem("nawa_words");
  if (local) return JSON.parse(local);

  const res = await fetch("data/words.json");
  return await res.json();
}
