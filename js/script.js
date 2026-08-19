const WHATSAPP_NUMBER = "5549999101527";
const WHATSAPP_MESSAGE =
  "Olá, Dra. Renata! Encontrei o consultório pelo site e gostaria de solicitar informações para agendar uma consulta.";

const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
document.querySelectorAll(".js-whatsapp").forEach((link) => { link.href = whatsappUrl; });

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");

function closeMenu({ restoreFocus = false } = {}) {
  if (!menuButton || !navigation) return;
  navigation.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Abrir menu");
  document.body.classList.remove("menu-open");
  if (restoreFocus) menuButton.focus();
}

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  navigation?.classList.toggle("open", !isOpen);
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Abrir menu" : "Fechar menu");
  document.body.classList.toggle("menu-open", !isOpen);
});

navigation?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => closeMenu()));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navigation?.classList.contains("open")) closeMenu({ restoreFocus: true });
});
window.addEventListener("resize", () => { if (window.innerWidth > 900) closeMenu(); });

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealItems = document.querySelectorAll(".reveal");
if (reduceMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("visible"));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
}

const yearElement = document.getElementById("current-year");
if (yearElement) yearElement.textContent = new Date().getFullYear();

const serviceCards = document.querySelectorAll(".service-card");

function closeServiceCards(exceptCard = null) {
  serviceCards.forEach((card) => {
    if (card === exceptCard) return;
    card.classList.remove("is-open");
    card.setAttribute("aria-expanded", "false");
    card.querySelector(".service-details")?.setAttribute("aria-hidden", "true");
  });
}

function toggleServiceCard(card) {
  const willOpen = !card.classList.contains("is-open");
  closeServiceCards(card);
  card.classList.toggle("is-open", willOpen);
  card.setAttribute("aria-expanded", String(willOpen));
  card.querySelector(".service-details")?.setAttribute("aria-hidden", String(!willOpen));
}

serviceCards.forEach((card) => {
  card.addEventListener("click", () => toggleServiceCard(card));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleServiceCard(card);
    }
  });
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".service-card")) closeServiceCards();
});
