async function loadWords() {
  const res = await fetch("data/words.json");
  return await res.json();
}
