console.log("Hello, World!");
// my_modal_5.showModal();
document.getElementById("year").textContent = new Date().getFullYear();

// grab all Major section
const header = document.querySelector("header");
const loginSection = document.getElementById("login");
const loginForm = document.querySelector("#login form");
const mainSection = document.getElementById("maincontent");
const footer = document.querySelector("footer");

//subsection section for data manupulations

const loader = document.getElementById("loader");
const issueTab = document.getElementById("issue-tab");
const issueCount = document.getElementById("issue-count");
const issueListContainer = document.getElementById("issue-list-container");

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

const allDataShow = async () => {
  const allDataUrl = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

  try {
    const res = await fetch(allDataUrl);
    const data = await res.json();
    showIssueData(data);

    loader.classList.add("hidden");
  } catch (error) {}
};

allDataShow();

const showIssueData = (res) => {
  const issueList = res.data;
  console.log(issueList);
  //   id": 1,
  // "title": "Fix navigation menu on mobile devices",
  // "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
  // "status": "open",
  // "labels": [
  // "bug",
  // "help wanted"
  // ],
  // "priority": "high",
  // "author": "john_doe",
  // "assignee": "jane_smith",
  // "createdAt": "2024-01-15T10:30:00Z",
  // "updatedAt": "2024-01-15T10:30:00Z"

  issueListContainer.innerHTML = "";
  issueCount.innerHTML = `${issueList.length} Issues `;

  issueList.forEach((issue) => {
    issue.innerHTML = `
  <div
                  class="single-issue-card border-t-5 border-t-green-500 card w-full bg-base-100 shadow-sm"
                >
                  <div class="card-body overflow-hidden">
                    <div class="flex justify-between items-center">
                      <img src="./assets/Open-Status.png" alt="" />
                      <span class="uppercase badge badge-soft badge-secondary">${issue.priority}</span>
                    </div>

                    <div class="space-y-2">
                      <h2 class="font-semibold text-lg">
                        ${issue.title}
                      </h2>
                      <p class="text-gray-400">
                        ${issue.description}
                      </p>
                      <div>
                        <span
                          class="uppercase badge badge-soft badge-secondary gap-1"
                          ><img src="./assets/bug.svg" alt="" /></span
                        >
                        <span
                          class="uppercase badge badge-soft badge- gap-1"
                        >
                          <img src="./assets/lifebouy.svg" alt="" />help
                          wanted</span
                        >
                        ${issue.labels.map((label) => {
                          label = label.toLowerCase();
                          let badgeColor = "badge-error";
                          if (label === "bug") {
                            badgeColor = "badge-secondary";
                          } else if (label === "help wanted") {
                            badgeColor = "badge-warning";
                          } else if (label === "enhancement") {
                            badgeColor = "badge-accent";
                          } else if (label === "good first issue") {
                            badgeColor = "badge-success";
                          } else {
                            badgeColor = "badge-success";
                          }
                        })}
                      </div>
                    </div>
                    <div class="divider my-0 gap-0 w-[130%] -ml-[15%]"></div>
                    <div class="flex justify-between items-center">
                      <span class="text-gray-400">#1 by John Doe</span>
                      <span class="text-gray-400">1/15/2024</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-gray-400"
                        >Assignee:<br />
                        <span class="font-semibold text-neutral-500"
                          >john doe
                        </span>
                      </span>
                      <span class="text-gray-400"
                        >Updated:<br /><span
                          class="font-semibold text-neutral-500"
                          >1/15/2024</span
                        ></span
                      >
                    </div>
                  </div>
                </div>
  `;
  });
};
