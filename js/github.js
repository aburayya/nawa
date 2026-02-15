const GITHUB_USER = "YOUR_GITHUB_USERNAME";
const GITHUB_REPO = "nawa";
const WORDS_PATH = "data/words.json";
const IMAGES_PATH = "images/";

function getToken() {
  return localStorage.getItem("nawa_github_token");
}

function saveToken(token) {
  localStorage.setItem("nawa_github_token", token);
}

async function getFileSha(path) {
  const res = await fetch(`https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/${path}`);
  const data = await res.json();
  return data.sha;
}

async function updateFile(path, content, message) {
  const token = getToken();
  const sha = await getFileSha(path);

  const body = {
    message,
    content: btoa(unescape(encodeURIComponent(content))),
    sha
  };

  const res = await fetch(`https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/${path}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  return await res.json();
}

async function uploadImage(filename, file) {
  const token = getToken();
  const reader = new FileReader();

  return new Promise(resolve => {
    reader.onload = async () => {
      const base64 = reader.result.split(",")[1];

      const body = {
        message: `Uploaded ${filename}`,
        content: base64
      };

      const res = await fetch(`https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/${IMAGES_PATH}${filename}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      resolve(await res.json());
    };

    reader.readAsDataURL(file);
  });
}
