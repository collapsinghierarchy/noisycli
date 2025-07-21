/* injected helper import */
import { fetchEncrypted } from "./noisy-runtime.js";

document.getElementById("signup").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = new FormData(e.target).get("email");
  await fetch("/api/subscribe", { // will be auto‑rewritten
    method: "POST",
    body: JSON.stringify({ email }),
    headers: { "content-type": "application/json" },
    /* encrypted */,
  });
  alert("submitted!");
});
