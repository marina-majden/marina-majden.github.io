// navbar.js

document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.querySelector(".menu-button");
  const navbar = document.querySelector(".navbar");

  menuButton.addEventListener("click", function () {
    navbar.classList.toggle("active");
    menuButton.classList.toggle("hidden");
  });

  // Optional: Close the navbar when a link is clicked
  const navLinks = navbar.querySelectorAll("a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navbar.classList.remove("active");
      menuButton.classList.remove("hidden");
    });
  });
});
