new Glide(".glide", {
  type: "carousel",
  startAt: 0,
  gap: 10,
 perView: 8,
  breakpoints: {
    999: {
      perView: 7,
    },
    789: {
      perView: 6,
    },
    600: {
      perView: 5,
    },
    400: {
      perView: 4,
    }
  }, 
  autoplay: 2000,
  animationDuration: 2000,
  animationTimingFunc: "linear",
  focusAt: "center",
  hoverpause: true,
}).mount();
