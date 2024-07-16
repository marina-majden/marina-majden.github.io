
  const prev = document.querySelector(".prev");
  const next = document.querySelector(".next");
  const images = document.querySelectorAll(".card");
  const totalImages = images.length;
  let index = 0;

  prev.addEventListener("click", () => {
    nextImage("prev");
  });

  next.addEventListener("click", () => {
    nextImage("next");
  });

  function nextImage(direction) {
    if (direction === "next") {
      index++;
      if (index === totalImages) {
        index = 0;
      }
    } else if (direction === "prev") {
      if (index == 0) {
        index = totalImages - 1;
      } else {
        index--;
      }
    }

    for (let i = 0; i < images.length; i++) {
      images[i].classList.add("hidden-card");
    }
    images[index].classList.remove("hidden-card");
  }

  setInterval(() => {
    nextImage("next");
  }, 5000);