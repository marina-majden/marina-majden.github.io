let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
<<<<<<< Updated upstream
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
=======
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
>>>>>>> Stashed changes
}

function showSlides(n) {
  var i;
<<<<<<< Updated upstream
  var slides = document.getElementsByClassName("container-service");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "flex";
  dots[slideIndex - 1].className += " active";
}
=======
  var slides = document.getElementsByClassName("container-skill");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
  slides[slideIndex-1].style.display = "flex";
  dots[slideIndex-1].className += " active";
}
>>>>>>> Stashed changes
