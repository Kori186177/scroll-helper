(function () {
  const SCROLL_KEY = 'scrollY';
  const SCROLL_RESTORED_KEY = 'scrollRestored';
  const MAX_ATTEMPTS = 5;
  const RETRY_DELAY = 300; // ms

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

  function tryRestoreScroll(attempt = 1) {
    if (sessionStorage.getItem(SCROLL_RESTORED_KEY)) {
      console.log(`[Scroll] Scroll already restored. Skipping attempt ${attempt}`);
      return;
    }

    if (!shouldScroll()) {
      console.log(`[Scroll] Attempt ${attempt}: Not scrollable yet, retrying...`);
      if (attempt < MAX_ATTEMPTS) {
        setTimeout(() => tryRestoreScroll(attempt + 1), RETRY_DELAY);
      }
      return;
    }

    const scrollY = sessionStorage.getItem(SCROLL_KEY);
    if (scrollY !== null) {
      console.log(`[Scroll] Restoring scroll to Y=${scrollY} on attempt ${attempt}`);
      window.scrollTo(0, parseInt(scrollY, 10));
      sessionStorage.setItem(SCROLL_RESTORED_KEY, 'true');
    } else {
      console.log(`[Scroll] Attempt ${attempt}: No scrollY found in sessionStorage`);
    }
  }

  window.addEventListener('scroll', saveScrollPosition);

  document.addEventListener('DOMContentLoaded', () => {
    console.log('[Scroll] DOMContentLoaded, starting scroll restoration attempts...');
    setTimeout(() => tryRestoreScroll(), RETRY_DELAY);
  });
})();
