"use strict";

const nav = document.querySelector("#primary-nav");
const menu = document.querySelector(".menu-toggle");
const mobile = matchMedia("(max-width: 48rem)");

function setMenu(open) {
  menu.setAttribute("aria-expanded", String(open));
  nav.hidden = mobile.matches && !open;
}

function updateNavigation() {
  const focusWasInNav = nav.contains(document.activeElement);
  const focusWasOnToggle = document.activeElement === menu;
  menu.hidden = !mobile.matches;
  nav.toggleAttribute("data-menu", mobile.matches);
  setMenu(false);

  if (mobile.matches && focusWasInNav) menu.focus();
  if (!mobile.matches && focusWasOnToggle) nav.querySelector("a").focus();
}

menu.addEventListener("click", () => {
  setMenu(menu.getAttribute("aria-expanded") === "false");
});
document.querySelector(".site-header").addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menu.getAttribute("aria-expanded") === "true") {
    setMenu(false);
    menu.focus();
  }
});
nav.addEventListener("click", (event) => {
  const link = event.target.closest("a");
  if (!link || !mobile.matches) return;
  const section = document.querySelector(link.hash);
  if (section) {
    section.setAttribute("tabindex", "-1");
    section.focus({ preventScroll: true });
  }
  setMenu(false);
});
mobile.addEventListener("change", updateNavigation);
updateNavigation();

// Local event contract. No network calls, storage, or form values.
function track(event, details = {}) {
  document.dispatchEvent(new CustomEvent("nomad:analytics", { detail: { event, ...details } }));
}

document.querySelectorAll("[data-demo-cta]").forEach((link) => {
  link.addEventListener("click", () => {
    track("demo_cta_click", { placement: link.dataset.demoCta });
  });
});

const form = document.querySelector("#demo-form");
const requiredFields = [...form.querySelectorAll("input[required]")];
const alert = document.querySelector("#form-alert");
const success = document.querySelector("#form-success");

let formStarted = false;

function trackFormStart() {
  if (formStarted) return;
  formStarted = true;
  track("demo_form_start", { placement: "demo" });
}

form.addEventListener("focusin", (event) => {
  if (event.target.matches("input")) trackFormStart();
});

function validate(input) {
  const emptyMessages = {
    "full-name": "Enter your full name.",
    "work-email": "Enter your work email.",
    company: "Enter your company name."
  };
  let message = "";
  if (!input.value.trim()) {
    message = emptyMessages[input.id];
  } else if (input.validity.typeMismatch) {
    message = "Enter an email address like name@company.com.";
  }

  const error = document.getElementById(input.getAttribute("aria-describedby"));
  error.textContent = message;
  error.hidden = !message;
  if (message) input.setAttribute("aria-invalid", "true");
  else input.removeAttribute("aria-invalid");
  return !message;
}

requiredFields.forEach((input) => {
  input.addEventListener("input", () => {
    if (input.hasAttribute("aria-invalid")) validate(input);
    if (requiredFields.every((field) => !field.hasAttribute("aria-invalid"))) {
      alert.textContent = "";
    }
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (form.hidden) return;
  trackFormStart();

  const invalidFields = requiredFields.filter((input) => !validate(input));
  if (invalidFields.length) {
    alert.textContent = "Check the highlighted fields and try again.";
    invalidFields[0].focus();
    track("demo_form_error", { placement: "demo", fieldCount: invalidFields.length });
    return;
  }

  form.reset();
  alert.textContent = "";
  form.hidden = true;
  success.hidden = false;
  success.focus();
  track("demo_form_submit", { placement: "demo", simulated: true });
});

document.querySelector("#form-fallback").hidden = true;
form.hidden = false;
