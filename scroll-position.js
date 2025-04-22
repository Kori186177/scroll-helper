(function () {
  const SCROLL_KEY = 'scrollY';
  const SCROLL_RESTORED_KEY = 'scrollRestored';

  console.log('[Scroll] Script loaded');

  function shouldScroll() {
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const needScroll = scrollHeight > clientHeight;
    console.log(`[Scroll] ScrollHeight: ${scrollHeight}, ClientHeight: ${clientHeight}, Need to scroll: ${needScroll}`);
    return needScroll;
  }

  function saveScrollPosition() {
    sessionStorage.setItem(SCROLL_KEY, window.scrollY);
    console.log(`[Scroll] ScrollY saved: ${window.scrollY}`);
  }

  function restoreScrollPosition() {
    console.log('[Scroll] Attempting to restore scrollY from sessionStorage');

    const alreadyRestored = sessionStorage.getItem(SCROLL_RESTORED_KEY);
    if (alreadyRestored) {
      console.log('[Scroll] Scroll restoration already attempted. Skipping.');
      return;
    }

    const scrollY = sessionStorage.getItem(SCROLL_KEY);
    if (scrollY !== null) {
      console.log(`[Scroll] Found scrollY in sessionStorage: ${scrollY}`);
      window.scrollTo(0, parseInt(scrollY, 10));
      sessionStorage.setItem(SCROLL_RESTORED_KEY, 'true');
      console.log('[Scroll] Scroll restored and flag set.');
    } else {
      console.log('[Scroll] No scrollY value found in sessionStorage');
    }
  }

  window.addEventListener('scroll', () => {
    saveScrollPosition();
  });

  document.addEventListener('DOMContentLoaded', () => {
    console.log('[Scroll] DOMContentLoaded');
    if (shouldScroll()) {
      restoreScrollPosition();
    } else {
      console.log('[Scroll] Page not scrollable, skipping scroll restoration');
    }
  });
})();
