document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("quoteForm");
  const sendWhatsappBtn = document.getElementById("sendWhatsappBtn");

  if (!form) return;

  function getFormData() {
    const name = document.getElementById("clientName").value.trim() || "Cliente";
    const phone = document.getElementById("clientPhone").value.trim() || "No especificado";
    const service = document.getElementById("serviceSelect").value;
    const message = document.getElementById("clientMessage").value.trim() || "Solicito cotización.";
    return { name, phone, service, message };
  }

  function buildFormattedText({ name, phone, service, message }) {
    return (
      `Hola SIAL SOLUTIONS, deseo cotizar un servicio.\n` +
      `Nombre/Empresa: ${name}\n` +
      `Teléfono: ${phone}\n` +
      `Servicio: ${service}\n` +
      `Detalle: ${message}`
    );
  }

  if (sendWhatsappBtn) {
    sendWhatsappBtn.addEventListener("click", () => {
      const data = getFormData();
      const url = buildWhatsAppUrl(buildFormattedText(data));
      window.open(url, "_blank", "noopener,noreferrer");
    });
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = getFormData();
    const targetEmail = (typeof SIAL_CONFIG !== "undefined" && SIAL_CONFIG.email)
      ? SIAL_CONFIG.email
      : "contacto@sialsolutions.pe";

    const subject = encodeURIComponent(`Cotización: ${data.service} - ${data.name}`);
    const body = encodeURIComponent(buildFormattedText(data));
    window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
  });
});