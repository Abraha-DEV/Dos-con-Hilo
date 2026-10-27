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
  const lightboxCount = lightbox.querySelector(".lightbox-count");
  const closeButton = lightbox.querySelector(".lightbox-close");
  const previousButton = lightbox.querySelector(".lightbox-previous");
  const nextButton = lightbox.querySelector(".lightbox-next");
  const exhibitionPhotos = Array.from({ length: 6 }, (_, index) => ({
    src: `assets/MLBZ${index + 1}.jpeg`,
    alt: `Me lo llevo Bazar, foto ${index + 1} de 6`,
  }));
  let activePhotos = [];
  let activePhotoIndex = 0;

  const showPhoto = (index) => {
    activePhotoIndex = (index + activePhotos.length) % activePhotos.length;
    const photo = activePhotos[activePhotoIndex];
    lightboxImage.src = photo.src;
    lightboxImage.alt = photo.alt;
    lightboxCaption.textContent = photo.alt;
    lightboxCount.textContent = `${activePhotoIndex + 1} / ${activePhotos.length}`;
    const isGallery = activePhotos.length > 1;
    previousButton.hidden = !isGallery;
    nextButton.hidden = !isGallery;
    lightbox.classList.toggle("is-gallery", isGallery);
  };

  document.querySelectorAll(".product-image, .exhibition-image").forEach((imageLink) => {
    imageLink.setAttribute("aria-haspopup", "dialog");
    imageLink.addEventListener("click", (event) => {
      event.preventDefault();
      const image = imageLink.querySelector("img");
      if (!image) return;
      activePhotos = imageLink.hasAttribute("data-exhibition-gallery")
        ? exhibitionPhotos
        : [{ src: image.currentSrc || image.src, alt: image.alt }];
      showPhoto(0);
      lightbox.showModal();
    });
  });

  previousButton.addEventListener("click", () => showPhoto(activePhotoIndex - 1));
  nextButton.addEventListener("click", () => showPhoto(activePhotoIndex + 1));
  closeButton.addEventListener("click", () => lightbox.close());
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) lightbox.close();
  });
  lightbox.addEventListener("close", () => {
    lightboxImage.removeAttribute("src");
    lightboxCaption.textContent = "";
    lightboxCount.textContent = "";
    activePhotos = [];
    lightbox.classList.remove("is-gallery");
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
