// JavaScript
window.addEventListener('scroll', function() {
  var decorativeBreak = document.querySelector('header .decorative-break');
  if (window.scrollY > 50) { // adjust this value as needed
      decorativeBreak.classList.add('hide');
      decorativeBreak.classList.add('small');
  } else {
      decorativeBreak.classList.remove('hide');
      decorativeBreak.classList.remove('small');
  }
});

const dynamicText = document.getElementById("dynamic-text");
const words = ['Web Designer','Web Developer', 'Front-end Developer', 'JavaScript Developer', 'React Developer', 'UI/UX Designer'];


let index = 0;
(function changeWords() {
    dynamicText.textContent = `Hi, I'm a ${words[index]} 🚀 from Zagreb, Croatia`;
    index++;
    if (index >= words.length) {
        index = 0;
    }
    setTimeout(changeWords, 1800);
}
)();

const burgerMenu = document.querySelector('.burger-menu');
const closeBtn = document.querySelector('.close-btn');
const mobileNavbar = document.querySelector('.mobile-navbar');
const navbar = document.querySelector('.nav-links');

burgerMenu.addEventListener('click', () => {
    mobileNavbar.style.left = '0';
});

closeBtn.addEventListener('click', () => {
    mobileNavbar.style.left = '-80%';
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        mobileNavbar.style.left = '-80%';
        burgerMenu.style.display = 'none';
           navbar.style.display = 'flex';
    } else {
        burgerMenu.style.display = 'block';
        navbar.style.display = 'none';

    }
});


const carousel = document.querySelector('.project-carousel');
const projects = document.querySelectorAll('.project-item');

let isDown = false;
let startX;
let scrollLeft;

carousel.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
});

carousel.addEventListener('mouseleave', () => {
    isDown = false;
});

carousel.addEventListener('mouseup', () => {
    isDown = false;
});

carousel.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2; // Adjust the speed of scrolling here
    carousel.scrollLeft = scrollLeft - walk;
});

projects.forEach(project => {
    project.addEventListener('click', () => {
        // Handle click event for project item
    });
});
const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const submitBtn = document.getElementById('submit-btn');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateForm()) {
        // Code to handle form submission (e.g., sending data to server)
        form.reset();
    }
});

function validateForm() {
    if (nameInput.value.trim() === '' || emailInput.value.trim() === '' || messageInput.value.trim() === '') {
        alert('Please, fill in all fields!');
        return false;
    }
    
    if (!isValidEmail(emailInput.value)) {
        alert('Please, enter a valid email address!');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    // Simple email validation using regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

submitBtn.addEventListener('click', function() {
    submitBtn.classList.add('submit-animation');

    setTimeout(() => {
        submitBtn.classList.remove('submit-animation');
    }, 1000); // Adjust the animation duration as needed
});
