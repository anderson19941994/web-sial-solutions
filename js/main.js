const SIAL_CONFIG = {
  companyName: "SIAL SOLUTIONS",
  phoneDisplay: "+51 902 874 616",
  whatsappNumber: "51902874616",
  defaultMessage: "Hola SIAL SOLUTIONS, deseo cotizar un servicio.",
  email: "contacto@sialsolutions.pe",
  socials: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    tiktok: "https://www.tiktok.com/"
  }
};

function buildWhatsAppUrl(customMessage) {
  const text = encodeURIComponent(customMessage || SIAL_CONFIG.defaultMessage);
  return `https://wa.me/${SIAL_CONFIG.whatsappNumber}?text=${text}`;
}

document.addEventListener("DOMContentLoaded", () => {
  // 1. Menú móvil (hamburguesa)
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
      });
    });
  }

  // 2. Configurar enlaces de WhatsApp con mensaje predefinido
  document.querySelectorAll("[data-wa-message]").forEach((el) => {
    const msg = el.getAttribute("data-wa-message");
    el.setAttribute("href", buildWhatsAppUrl(msg));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener noreferrer");
  });

  // 3. Configurar enlaces de redes sociales desde SIAL_CONFIG
  document.querySelectorAll("[data-social]").forEach((el) => {
    const network = el.getAttribute("data-social");
    if (SIAL_CONFIG.socials[network]) {
      el.setAttribute("href", SIAL_CONFIG.socials[network]);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
    }
  });
});