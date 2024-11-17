// JavaScript function that hides the decorative image on scroll
window.addEventListener("scroll", function () {
  var decorativeBreak = document.querySelector("header .opening-img");
  if (window.scrollY > 100) {
    // adjust this value as needed
    decorativeBreak.classList.add("hide");
    decorativeBreak.classList.add("small");
  } else {
    decorativeBreak.classList.remove("hide");
    decorativeBreak.classList.remove("small");
  }
});

// JS function that creates an animated dynamic text
const dynamicText = document.getElementById("dynamic-text");
const words = [
  "Web Designer",
  "Web Developer",
  "Front-end Developer",
  "JavaScript Developer",
  "React Developer",
  "UI/UX Designer",
];

let index = 0;
(function changeWords() {
  dynamicText.textContent = `Hi, I'm a ${words[index]} 🚀 from Zagreb, Croatia`;
  index++;
  if (index >= words.length) {
    index = 0;
  }
  setTimeout(changeWords, 1800);
})();

// JS function that handles the mobile navigation
const burgerMenu = document.querySelector(".hamburger");
const closeBtn = document.querySelector(".close-btn");
const mobileNavbar = document.querySelector(".mobile-navbar");
const navbar = document.querySelector(".nav-links");

burgerMenu.addEventListener("click", () => {
  mobileNavbar.style.left = "0";
});

closeBtn.addEventListener("click", () => {
  mobileNavbar.style.left = "-80%";
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    mobileNavbar.style.left = "-80%";
    burgerMenu.style.display = "none";
    navbar.style.display = "flex";
  } else {
    burgerMenu.style.display = "block";
    navbar.style.display = "none";
  }
});

// JS function that handles the carousel
const carousel = document.querySelector(".carousel");
const projects = document.querySelectorAll(".carousel-item");

let isDown = false;
let startX;
let scrollLeft;

carousel.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.pageX - carousel.offsetLeft;
  scrollLeft = carousel.scrollLeft;
});

carousel.addEventListener("mouseleave", () => {
  isDown = false;
});

carousel.addEventListener("mouseup", () => {
  isDown = false;
});

carousel.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - carousel.offsetLeft;
  const walk = (x - startX) * 2; // Adjust the speed of scrolling here
  carousel.scrollLeft = scrollLeft - walk;
});

carousel.addEventListener("touchstart", (e) => {
  isDown = true;
  startX = e.touches[0].pageX - carousel.offsetLeft;
  scrollLeft = carousel.scrollLeft;
});

carousel.addEventListener("touchend", () => {
  isDown = false;
});

carousel.addEventListener("touchmove", (e) => {
  if (!isDown) return;
  const x = e.touches[0].pageX - carousel.offsetLeft;
  const walk = (x - startX) * 2; // Adjust the speed of scrolling here
  carousel.scrollLeft = scrollLeft - walk;
});

// Handle scroll event for project carousel
carousel.addEventListener("scroll", () => {
  projects.forEach((project) => {
    const rect = project.getBoundingClientRect();
    if (rect.left >= 0 && rect.right <= window.innerWidth) {
      project.classList.add("active");
    } else {
      project.classList.remove("active");
    }
    const projectRect = project.getBoundingClientRect();
    const carouselRect = carousel.getBoundingClientRect();

    if (projectRect.left < carouselRect.left) {
      carousel.scrollLeft -= carouselRect.left - projectRect.left;
    } else if (projectRect.right > carouselRect.right) {
      carousel.scrollLeft += projectRect.right - carouselRect.right;
    }
  });
});
