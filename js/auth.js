async function loadUsers() {
  const res = await fetch("data/users.json");
  return await res.json();
}

async function hash(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

async function login(username, password) {
  const users = await loadUsers();
  const hashed = await hash(password);

  const user = users.find(
    u => u.username === username && u.password === hashed
  );

  if (!user) return null;

  localStorage.setItem("nawa_user", JSON.stringify(user));
  return user;
}

function getCurrentUser() {
  const data = localStorage.getItem("nawa_user");
  return data ? JSON.parse(data) : null;
}

function logout() {
  localStorage.removeItem("nawa_user");
  location.href = "index.html";
}
