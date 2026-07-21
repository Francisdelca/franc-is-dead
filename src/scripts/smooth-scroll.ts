import Lenis from "lenis";
import "lenis/dist/lenis.css";

declare global {
  interface Window {
    __lenis?: Lenis;
    gsap?: any;
    ScrollTrigger?: any;
  }
}

export function initSmoothScroll() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || window.__lenis) return window.__lenis;

  const lenis = new Lenis({
    lerp: 0.085,
    smoothWheel: true,
    syncTouch: false,
    anchors: { duration: 1.15 },
    stopInertiaOnNavigate: true,
  });

  window.__lenis = lenis;

  if (window.gsap && window.ScrollTrigger) {
    lenis.on("scroll", window.ScrollTrigger.update);
    window.gsap.ticker.add((time: number) => lenis.raf(time * 1000));
    window.gsap.ticker.lagSmoothing(0);
  } else {
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }

  return lenis;
}
