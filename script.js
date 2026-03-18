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
const issueCountArea = document.getElementById("issue-count-area");
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
    setTimeout(() => {
      showIssueData(data);
      loader.classList.add("hidden");
    }, 1000);
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

  issueCount.innerHTML = `${issueList.length} Issues `;

  issueListContainer.innerHTML = "";

  issueList.forEach((issue) => {
    const singleIssue = document.createElement("div");

    singleIssue.innerHTML = `
  <div
                  class="single-issue-card border-t-5 border-t-green-500 card w-full bg-base-100 shadow-sm"
                >
                  <div class="card-body overflow-hidden">
                    <div class="flex justify-between items-center">
                    
                    ${
                      issue.status == "open"
                        ? `<img src="./assets/Open-Status.png" alt="" />`
                        : `<img src="./assets/Closed- Status .png" alt="" />`
                    }
                    
                    ${(() => {
                      let priorityBadge;
                      const prio = issue.priority.toLowerCase();
                      switch (prio) {
                        case "high":
                          priorityBadge = "badge-error";
                          break;
                        case "medium":
                          priorityBadge = "badge-warning";
                          break;
                        case "low":
                          priorityBadge = "badge-success";
                          break;
                      }
                      return `<span class="uppercase badge badge-soft ${priorityBadge}">${prio}</span>`;
                    })()}
                    </div>

                    <div class="space-y-2">
                      <h2 class="font-semibold text-lg">
                        ${issue.title}
                      </h2>
                      <p class="text-gray-400">
                        ${issue.description}
                      </p>
                      <div>
                        ${issue.labels
                          .map((label) => {
                            label = label.toLowerCase();

                            let badgeColor = "badge-error";
                            let icon = "";

                            if (label === "bug") {
                              badgeColor = "badge-secondary";
                              icon = `<img src="./assets/bug.svg" class="w-4 h-4" />`;
                            } else if (label === "help wanted") {
                              badgeColor = "badge-warning";
                              icon = `<img src="./assets/lifebouy.svg" class="w-4 h-4" />`;
                            } else if (label === "enhancement") {
                              badgeColor = "badge-accent";
                            } else if (label === "good first issue") {
                              badgeColor = "badge-success";
                            }

                            return `
                                        <span class="badge badge-soft ${badgeColor} gap-2 my-1 ">
                                                ${icon} ${label}
                                        </span>
                                        `;
                          })
                          .join("")}
                      </div>
                    </div>
                    <div class="divider my-0 gap-0 w-[130%] -ml-[15%]"></div>
                    <div class="flex justify-between items-center">
                      <span class="text-gray-400">#${issue.id} by ${issue.author}</span>
                      <span class="text-gray-400"><span>
                        ${new Date(issue.createdAt).toLocaleDateString()}
                        </span></span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-gray-400"
                        >Assignee:<br />
                        <span class="font-semibold text-neutral-500"
                          >${issue.assignee}
                        </span>
                      </span>
                      <span class="text-gray-400"
                        >Updated:<br /><span
                          class="font-semibold text-neutral-500"
                          >${new Date(issue.updatedAt).toLocaleDateString()}</span
                        ></span
                      >
                    </div>
                  </div>
                </div>
  `;

    issueCountArea.classList.remove("hidden");
    issueListContainer.appendChild(singleIssue);
  });
};
