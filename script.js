console.log("Hello, World!");
// my_modal_5.showModal();
document.getElementById("year").textContent = new Date().getFullYear();

// grab all section
const header = document.querySelector("header");
const loginSection = document.getElementById("login");
const loginForm = document.querySelector("#login form");
const mainSection = document.getElementById("maincontent");
const footer = document.querySelector("footer");

// Hide All Except Login
// header.classList.add("hidden");
// mainSection.classList.add("hidden");
// footer.classList.add("hidden");

// header.style.display = "none";
// mainSection.style.display = "none";
// footer.style.display = "none";

// Login credentials checking

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("event stop");

  const username = document
    .getElementById("username")
    .value.trim()
    .toLowerCase();
  const password = document
    .getElementById("password")
    .value.trim()
    .toLowerCase();

  console.log(username);
  console.log(password);

  if (username == "admin" && password == "admin123") {
    alert("Login Successfull");
    loginSection.classList.add("hidden");
    header.classList.remove("hidden");
    mainSection.classList.remove("hidden");
    footer.classList.remove("hidden");
  } else {
    alert("Username or Password is Wrong");
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
  }
});

// fetch all data in the all tabs
