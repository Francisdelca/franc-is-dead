import { initAnimations } from "./animations";
import { initNavigation } from "./navigation";
import { initSmoothScroll } from "./smooth-scroll";

export function initSite() {
  const year = document.querySelector("#year");
  if (year) year.textContent = String(new Date().getFullYear());

  initNavigation();
  initSmoothScroll();
  initAnimations();
  initProjectPreview();
}

function initProjectPreview() {
  const projectGroups = document.querySelectorAll<HTMLElement>("[data-project-list-group]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");

  projectGroups.forEach((group) => {
    const preview = group.querySelector<HTMLElement>(".project-preview");
    const projectRows = group.querySelectorAll<HTMLElement>("[data-project-preview-item]");
    if (!preview) return;

    const previewImage = preview.querySelector<HTMLImageElement>("[data-project-preview-image]");
    const previewNumber = preview.querySelector<HTMLElement>("[data-project-preview-number]");
    const previewTitle = preview.querySelector<HTMLElement>("[data-project-preview-title]");

    const showPreview = (row: HTMLElement) => {
      if (!canHover.matches || window.innerWidth < 721) return;

      const src = row.dataset.projectPreviewSrc;
      if (!src || !previewImage) return;

      previewImage.src = src;
      if (previewNumber) previewNumber.textContent = row.dataset.projectPreviewNumber ?? "";
      if (previewTitle) previewTitle.textContent = row.dataset.projectPreviewTitle ?? "Proyecto";

      if (window.gsap && !reduceMotion) {
        window.gsap.to(preview, { opacity: 1, y: 0, duration: 0.25, ease: "power2.out", overwrite: true });
      } else {
        preview.style.opacity = "1";
        preview.style.transform = "translateY(0)";
      }
    };

    const hidePreview = () => {
      if (!canHover.matches || window.innerWidth < 721) return;

      if (window.gsap && !reduceMotion) {
        window.gsap.to(preview, { opacity: 0, y: 16, duration: 0.25, ease: "power2.out", overwrite: true });
      } else {
        preview.style.opacity = "0";
        preview.style.transform = "translateY(16px)";
      }
    };

    projectRows.forEach((row) => {
      if (row.dataset.previewBound === "true") return;
      row.dataset.previewBound = "true";

      row.addEventListener("pointerenter", () => showPreview(row));
      row.addEventListener("pointerleave", hidePreview);
      row.addEventListener("focus", () => showPreview(row));
      row.addEventListener("blur", hidePreview);
    });
  });
}
