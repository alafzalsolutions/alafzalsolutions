/* =========================================
   Al Afzal Solutions — Article JavaScript
========================================= */

// =========================================
// Table of Contents: highlight active section
// =========================================
(function () {
  const tocLinks = document.querySelectorAll(".toc__link");
  if (!tocLinks.length) return;

  // Collect all headings that have an id
  const headings = Array.from(
    document.querySelectorAll(".prose h2[id], .prose h3[id], .prose h4[id]")
  );

  if (!headings.length) return;

  const onScroll = () => {
    // Find the last heading that has scrolled past the top (with offset)
    const scrollY = window.scrollY + 120;
    let activeId = headings[0].id;

    headings.forEach((heading) => {
      if (heading.offsetTop <= scrollY) {
        activeId = heading.id;
      }
    });

    // Update active class on TOC links
    tocLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (href === `#${activeId}`) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); // run once on load
})();

// =========================================
// Copy Link button
// =========================================
(function () {
  const copyBtn = document.getElementById("copy-link-btn");
  if (!copyBtn) return;

  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      const original = copyBtn.textContent;
      copyBtn.textContent = "✓ Copied!";
      setTimeout(() => {
        copyBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
          Copy Link
        `;
      }, 2000);
    } catch {
      // Fallback for older browsers
      copyBtn.textContent = "Use Ctrl+C";
    }
  });
})();