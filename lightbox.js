document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("[data-lightbox]");
  if (!images.length) return;

  // cria overlay
  const overlay = document.createElement("div");
  overlay.className = "lightbox-overlay";

  const img = document.createElement("img");
  img.className = "lightbox-img";

  overlay.appendChild(img);
  document.body.appendChild(overlay);

  // abrir imagem
  images.forEach(image => {
    image.style.cursor = "zoom-in";

    image.addEventListener("click", () => {
      img.src = image.src;
      overlay.classList.add("active");
      document.body.style.overflow = "hidden"; // trava scroll
    });
  });

  // fechar clicando fora
  overlay.addEventListener("click", () => {
    overlay.classList.remove("active");
    img.src = "";
    document.body.style.overflow = "";
  });

  // fechar com ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("active")) {
      overlay.classList.remove("active");
      img.src = "";
      document.body.style.overflow = "";
    }
  });
});
