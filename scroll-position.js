// Save scroll position frequently (e.g., every scroll)
window.addEventListener('scroll', () => {
  sessionStorage.setItem('scrollY', window.scrollY);
});

// Restore scroll position on load
window.addEventListener('load', () => {
  const y = sessionStorage.getItem('scrollY');
  if (y !== null) {
    window.scrollTo(0, parseInt(y, 10));
  }
});

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  localStorage.setItem('scrollY', y);
  console.log('Saving scrollY:', y);
});

window.addEventListener('load', () => {
  const y = localStorage.getItem('scrollY');
  console.log('Restoring scrollY:', y);
  if (y !== null) {
    window.scrollTo(0, parseInt(y, 10));
  }
});
