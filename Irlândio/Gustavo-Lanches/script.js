document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('nav');
  const header = document.querySelector('header');
  const contentDiv = document.getElementById('content');

  // Function to load page content dynamically with fade transitions
  async function loadPage(url, push = true) {
    try {
      // Fade out current content
      contentDiv.style.transition = 'opacity 0.3s ease';
      contentDiv.style.opacity = 0;

      // Wait for transition to complete before loading new content
      contentDiv.addEventListener('transitionend', async function onTransitionEnd() {
        contentDiv.removeEventListener('transitionend', onTransitionEnd);

        try {
          const response = await fetch(url);
          if (!response.ok) throw new Error('Network response was not ok');
          const text = await response.text();
          const parser = new DOMParser();
          const doc = parser.parseFromString(text, 'text/html');
          const newContent = doc.getElementById('content');
          if (newContent) {
            contentDiv.innerHTML = newContent.innerHTML;
            // Fade in new content
            contentDiv.style.opacity = 1;
            // Update active nav link
            updateActiveLink(url);
            // Update URL in browser
            if (push) history.pushState({url}, '', url);
            // Scroll to top after content load
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        } catch (error) {
          console.error('Failed to load page:', error);
          // Fade in current content if error occurs
          contentDiv.style.opacity = 1;
        }
      }, { once: true });
    } catch (error) {
      console.error('Error during page load:', error);
      contentDiv.style.opacity = 1;
    }
  }

  // Update active navigation link based on URL
  function updateActiveLink(url) {
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === url) {
        link.classList.add('active');
      }
    });
  }

  // Use event delegation to handle nav link clicks
  nav.addEventListener('click', e => {
    const link = e.target.closest('a');
    if (link && nav.contains(link)) {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('#')) {
        e.preventDefault();
        loadPage(href);
      }
    }
  });

  // Handle browser back/forward buttons
  window.addEventListener('popstate', e => {
    if (e.state && e.state.url) {
      loadPage(e.state.url, false);
    }
  });

  // Initial setup: ensure content is visible
  contentDiv.style.opacity = 1;

  // Header scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
});
