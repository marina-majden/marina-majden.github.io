const logos = document.querySelectorAll(".skills svg");
const techName = document.querySelector("#techName");
const animationBox = document.querySelector(".animation-box");

// Flags to monitor various states and events in the animation interaction
// Indicates whether the mouse is currently hovering over a technology icon
let mouseOn = false;
// Indicates whether the mouse remains over a technology icon after the transition
let mouseStillOn = false;
// Indicates whether the transition animation has ended
let transitionEnd = true;
// Stores the name of the technology icon currently being hovered over by the mouse
let targetName;

// Handling mouse enter event on technology icon
const handleMouseEnter = (e) => {
  mouseOn = true;
  targetName = e.target.name;
  if (transitionEnd) {
    techName.innerHTML = targetName;
    animationBox.classList.add("hovered");
  }
  transitionEnd = false;
};

// Handling mouse leave event from technology icon
const handleMouseLeave = () => {
  mouseOn = false;
  if (mouseStillOn && !mouseOn) {
    animationBox.classList.remove("hovered");
    mouseStillOn = false;
  }
  transitionEnd = false;
};

// Handling transition end event
const handleTransitionEnd = () => {
  if (!mouseOn && !transitionEnd) {
    animationBox.classList.remove("hovered");
    mouseStillOn = false;
  }
  if (mouseOn) {
    mouseStillOn = true;
    animationBox.classList.add("hovered");
  }
  transitionEnd = true;
  techName.innerHTML = targetName;
};

// Add event listeners to each technology icon
logos.forEach((logo) => {
  logo.addEventListener("mouseenter", handleMouseEnter);
  logo.addEventListener("mouseleave", handleMouseLeave);
});

// Add event listener for transition end event to the animation box container
animationBox.addEventListener("transitionend", handleTransitionEnd);