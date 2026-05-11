/* =========================================
   Al Afzal Solutions — Main JavaScript
========================================= */

// =========================================
// Header: add shadow on scroll
// =========================================
(function () {
  const header = document.getElementById("site-header");
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 10);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); // run once on load
})();

// =========================================
// Mobile menu: hamburger toggle
// =========================================
(function () {
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobile-nav");
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener("click", () => {
    const isOpen = hamburger.classList.toggle("open");
    mobileNav.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", isOpen);
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
      hamburger.classList.remove("open");
      mobileNav.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    }
  });
})();

// =========================================
// Footer: dynamic year
// =========================================
(function () {
  const yearEl = document.getElementById("footer-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();