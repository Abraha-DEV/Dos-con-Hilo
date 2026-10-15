/* Datos oficiales de contacto de Dos Con Hilo. */
const CONFIG = {
  whatsappNumber: "528331701419", // Código de país + número, solo dígitos
  instagramUsername: "dosconhilo", // Usuario sin @
  instagramUrl: "https://www.instagram.com/dosconhilo?rpxt=cGxhbXlldTZuNjZt",
  facebookUrl: "https://www.facebook.com/share/1FGAv4Yr2a/",
  whatsappMessage: "Hola, quiero hacer una consulta a Dos Con Hilo."
};

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");

function closeMenu() {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Abrir menú");
  navigation.classList.remove("is-open");
}

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Abrir menú" : "Cerrar menú");
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
  document.addEventListener("click", (event) => {
    if (!navigation.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
  });
}

function whatsappUrl(message) {
  const number = CONFIG.whatsappNumber.replace(/\D/g, "");
  if (!number) return "";
  return `https://wa.me/${number}?text=${encodeURIComponent(message || CONFIG.whatsappMessage)}`;
}

document.querySelectorAll("[data-whatsapp]").forEach((link) => {
  const url = whatsappUrl(link.dataset.message);
  if (url) {
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  } else {
    link.href = "#contacto";
    link.addEventListener("click", (event) => {
      event.preventDefault();
      window.alert("Configura el número de WhatsApp en js/script.js para activar este enlace.");
    });
  }
});

document.querySelectorAll("[data-instagram]").forEach((link) => {
  const username = CONFIG.instagramUsername.replace(/^@/, "").trim();
  if (username) {
    link.href = CONFIG.instagramUrl || `https://www.instagram.com/${encodeURIComponent(username)}/`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  } else {
    link.href = "#contacto";
    link.addEventListener("click", (event) => {
      event.preventDefault();
      window.alert("Configura el usuario de Instagram en js/script.js para activar este enlace.");
    });
  }
});

document.querySelectorAll("[data-facebook]").forEach((link) => {
  if (CONFIG.facebookUrl) {
    link.href = CONFIG.facebookUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }
});


const lightbox = document.querySelector(".image-lightbox");
if (lightbox) {
  const lightboxImage = lightbox.querySelector(".lightbox-image");
  const lightboxCaption = lightbox.querySelector(".lightbox-caption");
  const closeButton = lightbox.querySelector(".lightbox-close");

  document.querySelectorAll(".product-image").forEach((imageLink) => {
    imageLink.setAttribute("aria-haspopup", "dialog");
    imageLink.addEventListener("click", (event) => {
      event.preventDefault();
      const image = imageLink.querySelector("img");
      if (!image) return;
      lightboxImage.src = image.currentSrc || image.src;
      lightboxImage.alt = image.alt;
      lightboxCaption.textContent = image.alt;
      lightbox.showModal();
    });
  });

  closeButton.addEventListener("click", () => lightbox.close());
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) lightbox.close();
  });
  lightbox.addEventListener("close", () => {
    lightboxImage.removeAttribute("src");
    lightboxCaption.textContent = "";
  });
}

const year = document.querySelector("#current-year");
if (year) year.textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll(".reveal");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (reduceMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });
  revealItems.forEach((item) => observer.observe(item));
}
