// Restore scroll position when the page loads
window.addEventListener('load', () => {
  const y = sessionStorage.getItem('scrollY');
  if (y !== null) {
    window.scrollTo(0, parseInt(y, 10));
  }
});

// Save scroll position when navigating away
window.addEventListener('beforeunload', () => {
  sessionStorage.setItem('scrollY', window.scrollY);
});

// Optional: Save it on every scroll (so it's always fresh)
window.addEventListener('scroll', () => {
  sessionStorage.setItem('scrollY', window.scrollY);
});