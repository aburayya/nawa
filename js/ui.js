document.getElementById("toggle-theme").onclick = () => {
  document.body.classList.toggle("theme-light");
};

document.getElementById("toggle-lang").onclick = () => {
  const html = document.documentElement;
  if (html.lang === "ar") {
    html.lang = "en";
    html.dir = "ltr";
  } else {
    html.lang = "ar";
    html.dir = "rtl";
  }
};
