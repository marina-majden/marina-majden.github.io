new Glide(".glide", {
  type: "carousel",
  startAt: 0,

  gap: 30,
  perView: 3,
  breakpoints: {
    999: {
      perView: 2,
    },
    789: {
      perView: 1,
    },
  },
  focusAt: "center",
  autoplay: 2500,
  hoverpause: true,
}).mount();
