import type Lenis from "lenis";

declare global {
  interface Window {
    gsap?: any;
    ScrollTrigger?: any;
    __lenis?: Lenis;
  }
}

export function initAnimations() {
  if (document.documentElement.dataset.animationsReady === "true") return;
  document.documentElement.dataset.animationsReady = "true";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasGsap = Boolean(window.gsap && window.ScrollTrigger);

  splitWords();

  if (document.documentElement.classList.contains("is-slide-mode")) {
    initSlideMode({ hasGsap, reduceMotion });
    return;
  }

  bindHeaderLogoScroll();

  if (!hasGsap || reduceMotion) {
    showStatic();
    return;
  }

  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);

  const hasProjectCollageIntro = initProjectCollageIntro(gsap);

  if (!hasProjectCollageIntro) {
    gsap.timeline({ defaults: { ease: "power3.out" } })
      .from(".word span", {
        yPercent: 112,
        duration: 1.05,
        stagger: 0.035,
        delay: 0.12,
      })
      .to(
        ".hero [data-reveal]",
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
        },
        "-=0.55",
      );
  }

  gsap.utils.toArray("[data-reveal]").forEach((element: Element) => {
    if (hasProjectCollageIntro && element.closest("[data-project-collage]")) return;

    gsap.to(element, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 86%",
      },
    });
  });

  if (document.querySelector(".stage-media img")) {
    gsap.to(".stage-media img", {
      yPercent: -8,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }

  if (document.querySelector(".motion-line span")) {
    gsap.to(".motion-line span", {
      scaleX: 0.32,
      opacity: 0.36,
      duration: 1.4,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      stagger: 0.16,
      scrollTrigger: {
        trigger: ".motion-panel",
        start: "top 80%",
      },
    });
  }
}

function initProjectCollageIntro(gsap: any) {
  const hero = document.querySelector<HTMLElement>("[data-project-collage]");
  if (!hero) return false;

  const stage = hero.querySelector<HTMLElement>("[data-collage-stage]");
  const activeCard = hero.querySelector<HTMLElement>('[data-collage-slot="active"]');
  const stackCards = Array.from(hero.querySelectorAll<HTMLElement>('[data-collage-slot="stack"]'));
  const titleWords = hero.querySelectorAll<HTMLElement>("h1 .word span");
  const copyReveal = hero.querySelectorAll<HTMLElement>(".project-hero__copy [data-reveal]");
  const arrows = hero.querySelectorAll<HTMLElement>(
    "[data-collage-previous], [data-collage-next]",
  );
  const counter = hero.querySelector<HTMLElement>("[data-collage-counter]");

  if (!stage || !activeCard) return false;

  gsap.set(copyReveal, { opacity: 0, y: 18 });

  const timeline = gsap.timeline({
    defaults: { ease: "power3.out" },
    delay: 0.08,
  });

  timeline
    .from(stage, { opacity: 0, duration: 0.42 })
    .from(
      stackCards,
      {
        autoAlpha: 0,
        scale: 0.82,
        duration: 0.72,
        stagger: { each: 0.075, from: "end" },
      },
      0.12,
    )
    .from(
      activeCard,
      {
        autoAlpha: 0,
        scale: 0.9,
        duration: 0.95,
        ease: "power4.out",
      },
      0.34,
    )
    .from(
      titleWords,
      {
        yPercent: 112,
        duration: 0.82,
        stagger: 0.035,
      },
      0.68,
    )
    .to(
      copyReveal,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
      },
      0.76,
    )
    .from(
      arrows,
      {
        autoAlpha: 0,
        x: (index: number) => index === 0 ? -18 : 18,
        duration: 0.5,
        stagger: 0.08,
      },
      0.96,
    );

  if (counter) {
    timeline.from(counter, { autoAlpha: 0, y: 10, duration: 0.45 }, 1.04);
  }

  timeline.set([...stackCards, activeCard], { clearProps: "opacity,visibility,transform" });
  return true;
}

interface SlideModeOptions {
  hasGsap: boolean;
  reduceMotion: boolean;
}

function initSlideMode({ hasGsap, reduceMotion }: SlideModeOptions) {
  const stage = document.querySelector<HTMLElement>("[data-home-stage]");
  const slides = Array.from(document.querySelectorAll<HTMLElement>(".home-slide"));
  const dots = Array.from(document.querySelectorAll<HTMLElement>(".slide-dots-nav__item"));
  const headerLink = document.querySelector<HTMLElement>("[data-header-logo-link]");
  const headerLogo = document.querySelector<HTMLElement>("[data-header-logo]");

  if (!stage || slides.length === 0) return;

  const setActiveScene = (index: number) => {
    dots.forEach((dot, dotIndex) => dot.classList.toggle("is-active", dotIndex === index));
    slides.forEach((slide, slideIndex) => slide.classList.toggle("is-active", slideIndex === index));

    const activeSlide = slides[index];
    const shape = activeSlide?.dataset.headerShape;
    if (headerLogo && shape) headerLogo.dataset.shape = shape;
  };

  setActiveScene(0);

  if (headerLink) {
    bindHeaderState(headerLink);
  }

  if (!hasGsap || reduceMotion) {
    document.documentElement.classList.add("is-static-slide-mode");
    showStatic();
    observeSlides(slides, setActiveScene);
    bindKeyboardNavigation(slides);
    return;
  }

  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);

  const sceneClips: Record<string, { from: string; to: string }> = {
    split: {
      from: "inset(0 50% 0 50%)",
      to: "inset(0 0% 0 0%)",
    },
    circle: {
      from: "circle(0% at 50% 50%)",
      to: "circle(76% at 50% 50%)",
    },
    rise: {
      from: "inset(100% 0 0 0)",
      to: "inset(0% 0 0 0)",
    },
    iris: {
      from: "circle(0% at 78% 28%)",
      to: "circle(120% at 78% 28%)",
    },
  };

  const headerIntroTokens = document.querySelectorAll(
    ".header-logo .brand-logo__line--name > *, .header-logo .brand-logo__line--dots .brand-logo__dot",
  );

  slides.forEach((slide, index) => {
    gsap.set(slide, {
      autoAlpha: index === 0 ? 1 : 0,
      pointerEvents: index === 0 ? "auto" : "none",
      zIndex: index + 1,
    });
  });

  gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.08 })
    .from(headerIntroTokens, {
      opacity: 0,
      yPercent: 85,
      duration: 0.7,
      stagger: 0.025,
    })
    .set(headerIntroTokens, { clearProps: "opacity,transform" })
    .from(".slide-opening .word span", {
      yPercent: 112,
      duration: 1.2,
      stagger: 0.045,
    }, "-=0.38")
    .fromTo(
      ".slide-opening__portrait-crop",
      { clipPath: "inset(0 0 100% 0)" },
      { clipPath: "inset(0 0 0% 0)", duration: 1.25, ease: "power4.inOut" },
      "-=0.9",
    )
    .to(
      ".slide-opening__portrait[data-reveal]",
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
      },
      "-=0.6",
    )
    .fromTo(
      ".slide-opening__quick-contact",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        ease: "power3.out",
        immediateRender: false,
      },
      "-=0.38",
    )
    .fromTo(
      ".slide-opening__availability, .slide-opening__socials > *",
      { opacity: 0, y: 12 },
      {
        opacity: 1,
        y: 0,
        duration: 0.44,
        stagger: 0.06,
        ease: "power3.out",
        immediateRender: false,
      },
      "-=0.48",
    )
    .fromTo(
      ".slide-opening__panel",
      {
        clipPath: "inset(0 100% 0 0)",
        opacity: 1,
        y: 0,
      },
      {
        clipPath: "inset(0 0% 0 0)",
        opacity: 1,
        y: 0,
        duration: 1.05,
        ease: "power4.inOut",
        immediateRender: false,
      },
      "-=0.38",
    )
    .fromTo(
      ".slide-opening__panel > *",
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.62,
        stagger: 0.055,
        ease: "power3.out",
        immediateRender: false,
      },
      "-=0.52",
    );

  const stageTimeline = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: stage,
      start: "top top",
      end: () => `+=${window.innerHeight * (slides.length - 1)}`,
      pin: true,
      scrub: 0.85,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self: any) => {
        const sceneIndex = Math.min(
          slides.length - 1,
          Math.floor(self.progress * (slides.length - 1) + 0.5),
        );
        setActiveScene(sceneIndex);
      },
    },
  });

  slides.slice(1).forEach((nextSlide, transitionIndex) => {
    const previousSlide = slides[transitionIndex];
    const at = transitionIndex;
    const transition = nextSlide.dataset.sceneTransition ?? "rise";
    const clip = sceneClips[transition] ?? sceneClips.rise;
    const previousContent = previousSlide.querySelector<HTMLElement>(".home-slide__content");
    const previousBackdrop = previousSlide.querySelector<HTMLElement>("[data-scene-backdrop]");
    const nextBackdrop = nextSlide.querySelector<HTMLElement>("[data-scene-backdrop]");
    const nextShine = nextSlide.querySelector<HTMLElement>("[data-scene-shine]");
    const nextReveal = nextSlide.querySelectorAll<HTMLElement>("[data-reveal]");
    const nextTitleWords = nextSlide.querySelectorAll<HTMLElement>("[data-split] .word span");

    stageTimeline.set(nextSlide, { autoAlpha: 1 }, at);

    if (transitionIndex === 0) {
      const openingCopy = previousSlide.querySelector<HTMLElement>(".slide-opening__copy");
      const openingPortrait = previousSlide.querySelector<HTMLElement>(".slide-opening__portrait");

      if (openingCopy) {
        stageTimeline.fromTo(
          openingCopy,
          { xPercent: 0, yPercent: 0, scale: 1, opacity: 1 },
          {
            xPercent: 105,
            yPercent: 0,
            scale: 1,
            opacity: 0.04,
            duration: 0.72,
            ease: "power2.inOut",
            immediateRender: false,
          },
          at,
        );
      }
      if (openingPortrait) {
        stageTimeline.fromTo(
          openingPortrait,
          { xPercent: 0, yPercent: 0, scale: 1, opacity: 1 },
          {
            xPercent: -28,
            yPercent: 0,
            scale: 1,
            opacity: 0.04,
            duration: 0.72,
            ease: "power2.inOut",
            immediateRender: false,
          },
          at,
        );
      }
    } else if (previousContent) {
      stageTimeline.to(
        previousContent,
        { yPercent: -18, scale: 0.94, opacity: 0.03, duration: 0.72 },
        at,
      );
    }

    if (previousBackdrop) {
      stageTimeline.to(
        previousBackdrop,
        { yPercent: -5, scale: 1.12, duration: 0.92 },
        at,
      );
    }

    if (nextBackdrop) {
      stageTimeline.fromTo(
        nextBackdrop,
        { clipPath: clip.from, scale: 1.14, yPercent: 5 },
        { clipPath: clip.to, scale: 1, yPercent: 0, duration: 0.68 },
        at,
      );
    }

    if (nextShine) {
      stageTimeline.fromTo(
        nextShine,
        { opacity: 0, scale: 0.35, xPercent: -14 },
        { opacity: 1, scale: 1.12, xPercent: 8, duration: 0.5, ease: "power2.out" },
        at + 0.12,
      );
    }

    stageTimeline.fromTo(
      nextReveal,
      { opacity: 0, y: 64 },
      { opacity: 1, y: 0, duration: 0.3, stagger: 0.014, ease: "power3.out" },
      at + 0.62,
    );

    if (nextTitleWords.length > 0) {
      stageTimeline.fromTo(
        nextTitleWords,
        { yPercent: 120 },
        { yPercent: 0, duration: 0.3, stagger: 0.01, ease: "power3.out" },
        at + 0.61,
      );
    }

    stageTimeline.set(nextSlide, { pointerEvents: "auto" }, at + 0.66);
    stageTimeline.to(previousSlide, { autoAlpha: 0, duration: 0.02 }, at + 0.96);
    stageTimeline.set(previousSlide, { pointerEvents: "none" }, at + 0.98);
  });

  bindStageNavigation(slides, stageTimeline);
  ScrollTrigger.refresh();
}

function observeSlides(slides: HTMLElement[], callback: (index: number) => void) {
  if (!("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number((entry.target as HTMLElement).dataset.slideIndex);
          callback(index);
        }
      });
    },
    { threshold: 0.5 },
  );

  slides.forEach((slide) => observer.observe(slide));
}

function bindStageNavigation(slides: HTMLElement[], timeline: any) {
  const scrollTrigger = timeline.scrollTrigger;
  if (!scrollTrigger || slides.length < 2) return;

  const scrollToScene = (index: number) => {
    const progress = index / (slides.length - 1);
    const target = scrollTrigger.start + (scrollTrigger.end - scrollTrigger.start) * progress;

    if (window.__lenis) {
      window.__lenis.scrollTo(target, { duration: 1.15 });
    } else {
      window.scrollTo({ top: target, behavior: "smooth" });
    }
  };

  document.querySelectorAll<HTMLAnchorElement>('a[href^="#slide-"]').forEach((anchor) => {
    if (anchor.dataset.stageBound === "true") return;
    const targetId = anchor.getAttribute("href")?.slice(1);
    const index = slides.findIndex((slide) => slide.id === targetId);
    if (index < 0) return;

    anchor.dataset.stageBound = "true";
    anchor.addEventListener("click", (event) => {
      event.preventDefault();
      scrollToScene(index);
    });
  });

  if (document.documentElement.dataset.stageKeyboardBound === "true") return;
  document.documentElement.dataset.stageKeyboardBound = "true";

  window.addEventListener(
    "keydown",
    (event) => {
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp" && event.key !== "PageDown" && event.key !== "PageUp") {
        return;
      }

      event.preventDefault();
      const currentIndex = Math.max(0, slides.findIndex((slide) => slide.classList.contains("is-active")));
      const direction = event.key === "ArrowDown" || event.key === "PageDown" ? 1 : -1;
      const nextIndex = Math.max(0, Math.min(slides.length - 1, currentIndex + direction));
      if (nextIndex !== currentIndex) scrollToScene(nextIndex);
    },
    { passive: false },
  );
}

function bindKeyboardNavigation(slides: HTMLElement[]) {
  if (slides.length === 0) return;

  let isScrolling = false;
  const scrollCooldown = 900;

  window.addEventListener(
    "keydown",
    (event) => {
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp" && event.key !== "PageDown" && event.key !== "PageUp") {
        return;
      }

      event.preventDefault();
      if (isScrolling) return;

      const currentIndex = getCurrentSlideIndex(slides);
      const direction = event.key === "ArrowDown" || event.key === "PageDown" ? 1 : -1;
      const nextIndex = Math.max(0, Math.min(slides.length - 1, currentIndex + direction));

      if (nextIndex !== currentIndex) {
        isScrolling = true;
        if (window.__lenis) {
          window.__lenis.scrollTo(slides[nextIndex], { duration: 1.15 });
        } else {
          slides[nextIndex].scrollIntoView({ behavior: "smooth" });
        }
        setTimeout(() => {
          isScrolling = false;
        }, scrollCooldown);
      }
    },
    { passive: false },
  );
}

function getCurrentSlideIndex(slides: HTMLElement[]): number {
  const scrollCenter = window.scrollY + window.innerHeight / 2;
  let closestIndex = 0;
  let closestDistance = Infinity;

  slides.forEach((slide, index) => {
    const slideCenter = slide.offsetTop + slide.offsetHeight / 2;
    const distance = Math.abs(scrollCenter - slideCenter);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });

  return closestIndex;
}

function splitWords() {
  document.querySelectorAll<HTMLElement>("[data-split]").forEach((element) => {
    splitWordsForElement(element);
  });
}

function splitWordsForElement(element: HTMLElement) {
  if (element.dataset.splitReady === "true") return;
  const words = element.textContent?.trim().split(/\s+/) ?? [];
  element.innerHTML = words
    .map((word) => `<span class="word"><span>${word}</span></span>`)
    .join(" ");
  element.dataset.splitReady = "true";
}

function showStatic() {
  document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => {
    element.style.opacity = "1";
    element.style.transform = "none";
  });
  document.querySelectorAll<HTMLElement>(".word span").forEach((element) => {
    element.style.transform = "none";
  });
}

function bindHeaderLogoScroll() {
  const headerLink = document.querySelector<HTMLElement>("[data-header-logo-link]");
  if (!headerLink || headerLink.dataset.scrollBound === "true") return;

  let currentState = "expanded";

  function updateHeaderState() {
    const nextState = window.scrollY > 90 ? "collapsed" : "expanded";
    if (nextState === currentState || !headerLink) return;
    currentState = nextState;
    headerLink.classList.toggle("is-collapsed", nextState === "collapsed");
    headerLink.classList.toggle("is-expanded", nextState === "expanded");
  }

  headerLink.dataset.scrollBound = "true";
  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });
}

function bindHeaderState(headerLink: HTMLElement) {
  if (headerLink.dataset.scrollBound === "true") return;

  let currentState = "expanded";

  function updateHeaderState() {
    const nextState = window.scrollY > 90 ? "collapsed" : "expanded";
    if (nextState === currentState) return;
    currentState = nextState;
    headerLink.classList.toggle("is-collapsed", nextState === "collapsed");
    headerLink.classList.toggle("is-expanded", nextState === "expanded");
  }

  headerLink.dataset.scrollBound = "true";
  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });
}
