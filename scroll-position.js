(function () {
  const SCROLL_KEY = 'savedScrollY';
  let lastSavedY = 0;
  let ticking = false;

  console.log('[Scroll] Script loaded');

  // Save scroll position (throttled with requestAnimationFrame)
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        lastSavedY = window.scrollY;
        sessionStorage.setItem(SCROLL_KEY, lastSavedY);
        console.log('[Scroll] Stored scrollY:', lastSavedY);
        ticking = false;
      });
      ticking = true;
    }
  }

  // Restore scroll position
  function restoreScroll() {
    const savedY = sessionStorage.getItem(SCROLL_KEY);
    console.log('[Scroll] Attempting to restore scrollY from sessionStorage');
    if (savedY !== null) {
      const y = parseInt(savedY, 10);
      console.log('[Scroll] Restoring scrollY to:', y);
      window.scrollTo(0, y);
    } else {
      console.log('[Scroll] No scrollY value found in sessionStorage');
    }
  }

  // Restore scroll on full page load
  window.addEventListener('load', () => {
    console.log('[Scroll] Page loaded');
    restoreScroll();
  });

  // Start saving scroll on scroll event
  window.addEventListener('scroll', () => {
    console.log('[Scroll] Scroll event detected');
    onScroll();
  });

})();
