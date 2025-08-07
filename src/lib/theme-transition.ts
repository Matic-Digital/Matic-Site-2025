// Prevent flash of unstyled content and ensure smooth transitions
export function initializeThemeTransitions() {
  if (typeof document === 'undefined') return;

  // Add no-transition class to prevent initial transition
  document.documentElement.classList.add('no-transition');

  // Remove no-transition class after a short delay
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.documentElement.classList.remove('no-transition');
    });
  });

  // Optimize theme changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class') {
        // Add hardware acceleration before transition
        document.documentElement.style.transform = 'translateZ(0)';

        // Clean up after transition
        const cleanup = () => {
          document.documentElement.style.transform = '';
          document.documentElement.removeEventListener('transitionend', cleanup);
        };

        document.documentElement.addEventListener('transitionend', cleanup, { once: true });
      }
    });
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  });
}
