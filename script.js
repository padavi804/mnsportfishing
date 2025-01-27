// Toggle the navigation menu on mobile
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector("header nav ul");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Add a class to show the menu on mobile when the hamburger is clicked
// Toggle the 'show' class which is not defined in the CSS, but will be toggled to show the menu
