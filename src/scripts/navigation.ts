export function initNavigation() {
  const toggle = document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
  const menu = document.querySelector<HTMLElement>("[data-mobile-nav]");

  if (!toggle || !menu || toggle.dataset.bound === "true") return;

  const setOpen = (open: boolean) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar navegación" : "Abrir navegación");
    toggle.classList.toggle("is-open", open);
    menu.hidden = !open;
    document.documentElement.classList.toggle("has-open-menu", open);
  };

  toggle.dataset.bound = "true";
  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });
}
