let currentLang = "ar";
let words = [];

const uiText = {
  ar: {
    title: "NAWA – الخوارزمية الجديدة للكلمات العربية"
  },
  en: {
    title: "NAWA – The New Arabic Words Algorithm"
  }
};

document.getElementById("toggle-theme").onclick = () => {
  document.body.classList.toggle("theme-light");
};

document.getElementById("toggle-lang").onclick = () => {
  const html = document.documentElement;

  if (currentLang === "ar") {
    currentLang = "en";
    html.lang = "en";
    html.dir = "rtl"; // keep layout same
  } else {
    currentLang = "ar";
    html.lang = "ar";
    html.dir = "rtl";
  }

  updateUI();
  if (words.length) renderWords(words);
};

function updateUI() {
  document.querySelector("header h1").textContent = uiText[currentLang].title;
}

/* Login modal */

const loginBtn = document.getElementById("login-btn");
const loginModal = document.getElementById("login-modal");
const loginSubmit = document.getElementById("login-submit");
const loginClose = document.getElementById("login-close");

loginBtn.onclick = () => {
  loginModal.classList.remove("hidden");
};

loginClose.onclick = () => {
  loginModal.classList.add("hidden");
};

loginSubmit.onclick = async () => {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  const user = await login(username, password);

  if (!user) {
    document.getElementById("login-error").textContent = "خطأ في تسجيل الدخول";
    return;
  }

  loginModal.classList.add("hidden");

  if (user.role === "admin") {
    window.location.href = "admin.html";
  }
};
