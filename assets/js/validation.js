const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const submitBtn = document.getElementById("submit-btn");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (validateForm()) {
    // Code to handle form submission (e.g., sending data to server)
    form.reset();
  }
});

function validateForm() {
  if (
    nameInput.value.trim() === "" ||
    emailInput.value.trim() === "" ||
    messageInput.value.trim() === ""
  ) {
    alert("Please, fill in all fields!");
    return false;
  }

  if (!isValidEmail(emailInput.value)) {
    alert("Please, enter a valid email address!");
    return false;
  }

  return true;
}

function isValidEmail(email) {
  // Simple email validation using regex
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

submitBtn.addEventListener("click", function () {
  submitBtn.classList.add("submit-animation");

  setTimeout(() => {
    submitBtn.classList.remove("submit-animation");
  }, 1000); // Adjust the animation duration as needed
});
