document.getElementById("toggle-theme").onclick = () => {
  document.body.classList.toggle("theme-light");
};

document.getElementById("toggle-lang").onclick = () => {
  const html = document.documentElement;

  if (currentLang === "ar") {
    currentLang = "en";
    html.lang = "en";
    html.dir = "rtl"; // keep layout the same
  } else {
    currentLang = "ar";
    html.lang = "ar";
    html.dir = "rtl";
  }

  renderWords(words); // re-render table
};
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

const uiText = {
  ar: {
    title: "NAWA – الخوارزمية الجديدة للكلمات العربية",
    edit: "تعديل",
    save: "حفظ",
    logout: "تسجيل الخروج",
    adminPanel: "لوحة التحكم"
  },
  en: {
    title: "NAWA – The New Arabic Words Algorithm",
    edit: "Edit",
    save: "Save",
    logout: "Logout",
    adminPanel: "Admin Panel"
  }
};
