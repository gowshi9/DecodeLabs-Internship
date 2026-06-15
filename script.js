/**
 * The Responsive Architecture - Interactivity Controller
 * DecodeLabs Internship Program 2026
 * Native Vanilla ES6 JavaScript for UI state changes and keyboard compliance
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNavigation();
  initCardInteractivity();
});

/**
 * Initializes the responsive navigation drawer toggle behavior.
 * Manages standard ARIA roles and expands state transitions.
 *
 * @returns {void}
 */
function initMobileNavigation() {
  const toggleBtn = document.querySelector('.nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (!toggleBtn || !navMenu) return;

  // Toggle mobile navigation when hamburger button is clicked
  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    
    // Toggle active classes and accessibility states
    toggleBtn.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('nav-active');
  });

  // Closes navigation menu when a link inside is clicked (useful on small devices)
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleBtn.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('nav-active');
    });
  });

  // Closes the menu if focus leaves the navigation structure (WCAG 2.1 compliance)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('nav-active')) {
      toggleBtn.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('nav-active');
      toggleBtn.focus();
    }
  });
}

/**
 * Initializes the card hover and focus states, including the active interactive trigger.
 * Handles both click interactions and keydown events for keyboards.
 *
 * @returns {void}
 */
function initCardInteractivity() {
  const cards = document.querySelectorAll('.card');

  if (!cards.length) return;

  cards.forEach(card => {
    const actionBtn = card.querySelector('.btn-card-action');
    
    // Function to handle the active selection style
    const toggleCardState = () => {
      // Clear active classes from other sibling cards to focus current selection
      cards.forEach(c => {
        if (c !== card) c.classList.remove('is-active');
      });
      card.classList.toggle('is-active');
    };

    if (actionBtn) {
      actionBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Avoid double bubbling trigger
        toggleCardState();
      });
    }

    // Direct card wrapper click toggle for touch friendliness
    card.addEventListener('click', toggleCardState);

    // Support keyboard activation on cards (Enter key)
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        toggleCardState();
      }
    });
  });
}
