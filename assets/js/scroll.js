/* document.addEventListener("scroll", function () {
  const elements = document.getElementsByTagName("section");
  elements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
      element.classList.add("fade-in");
      element.classList.remove("fade-out");
    } else {
      element.classList.add("fade-out");
      element.classList.remove("fade-in");
    }
  });
}); */
function reveal() {
  const reveals = document.querySelectorAll(".reveal");
  const viewport = document.getElementByTagName("main");

  for (let i = 0; i < reveals.length; i++) {
    let windowHeight = window.innerHeight;
    let viewportHeight = viewport.clientHeight;
    let elementTop = reveals[i].getBoundingClientRect().top;
    let elementVisible = 150;

    if (elementTop < viewportHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal, { passive: true });
