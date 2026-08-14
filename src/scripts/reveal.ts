// Scroll reveal: add .is-visible once an element enters the viewport.
// Runs at the end of <body> (is:inline). A <noscript> style override in the
// layout keeps content visible when JavaScript is disabled.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const targets = document.querySelectorAll('.reveal, .chain');

if (reduceMotion || !('IntersectionObserver' in window)) {
  targets.forEach((el) => el.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
  );
  targets.forEach((el) => observer.observe(el));
}
