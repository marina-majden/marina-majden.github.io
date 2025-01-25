// sticky navbar color animation
let marker = document.querySelector('#marker');
let list = document.querySelectorAll('.navbar ul li');

function moveIndicator(e) {
    marker.style.left = e.offsetLeft + 'px';
    marker.style.width = e.offsetWidth + 'px';
}
list.forEach(link => {
    link.addEventListener('mousemove', (e) => {
        moveIndicator(e.target);
    })
})
function activeLink() {
    list.forEach((item) =>
        item.classList.remove('active'));
    this.classList.add('active');
}
list.forEach((item) =>
    item.addEventListener('mouseover', activeLink));

//switch mobile / desktop navbar
 /* document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.querySelector(".menu-button");
  const navbar = document.querySelector(".mobile-navbar");

  menuButton.addEventListener("click", function () {
    navbar.classList.toggle("active");
    menuButton.classList.toggle("hidden");
  });  */

  // Optional: Close the navbar when a link is clicked
/*  const navLinks = navbar.querySelectorAll("a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navbar.classList.remove("active");
      menuButton.classList.remove("hidden");
    });
  }); 
}); */
const nav = document.querySelector('#nav');
const menu = document.querySelector('#menu');
const menuToggle = document.querySelector('.nav__toggle');
let isMenuOpen = false;


// TOGGLE MENU ACTIVE STATE
menuToggle.addEventListener('click', e => {
  e.preventDefault();
  isMenuOpen = !isMenuOpen;

  // toggle a11y attributes and active class
  menuToggle.setAttribute('aria-expanded', String(isMenuOpen));
  menu.hidden = !isMenuOpen;
  nav.classList.toggle('nav--open');

});


// TRAP TAB INSIDE NAV WHEN OPEN
nav.addEventListener('keydown', e => {
  // abort if menu isn't open or modifier keys are pressed
  if (!isMenuOpen || e.ctrlKey || e.metaKey || e.altKey) {
    return;
  }

  // listen for tab press and move focus
  // if we're on either end of the navigation
  const menuLinks = menu.querySelectorAll('.nav__link');
  if (e.keyCode === 9) {
    if (e.shiftKey) {
      if (document.activeElement === menuLinks[0]) {
        menuToggle.focus();
        
        e.preventDefault();
      }
    } else if (document.activeElement === menuToggle) {
      menuLinks[0].focus();
      nav.classList.toggle('nav--open');
      e.preventDefault();
    }
  }
});