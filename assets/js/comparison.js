const compare = document.getElementById("example");

const options = {
  controlColor: "#294356b2",
  controlShadow: true,
  addCircle: true,
  addCircleBlur: true,
  smoothing: true,
  smoothingAmount: 100,
  hoverStart: true,
};
const viewer = new ImageCompare(compare, options).mount();
