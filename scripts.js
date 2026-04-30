/**
 * Vask Labs - Landing Page Scripts
 * Implements intersection observer for scroll reveals and smooth transitions.
 */

document.addEventListener('DOMContentLoaded', () => {
  const aboutSection = document.getElementById('sobre');
  const learnMoreLink = document.querySelector('.learn-more');

  if (!aboutSection) return;

  /**
   * Triggers the reveal animation for the About section
   */
  const revealAbout = () => {
    aboutSection.classList.add('is-visible');
  };

  // Immediate reveal for link click (fallback for slow scroll)
  if (learnMoreLink) {
    learnMoreLink.addEventListener('click', () => {
      setTimeout(revealAbout, 250);
    });
  }

  // Intersection Observer for scroll-based reveal
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          revealAbout();
          observer.disconnect();
        }
      });
    }, observerOptions);

    observer.observe(aboutSection);
  } else {
    // Fallback for older browsers
    const onScroll = () => {
      const rect = aboutSection.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.8) {
        revealAbout();
        window.removeEventListener('scroll', onScroll);
      }
    };
    window.addEventListener('scroll', onScroll);
  }
});
