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
    allDataShow();
  } else {
    alert("Username or Password is Wrong");
    loginForm.reset();
  }
});

// fetch all data in the all tabs

const allDataShow = async () => {
  const allDataUrl = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  loader.classList.remove("hidden");
  issueListContainer.innerHTML = "";
  issueCountArea.classList.add("hidden");
  try {
    const res = await fetch(allDataUrl);
    const data = await res.json();
    setTimeout(() => {
      showIssueData(data);
      loader.classList.add("hidden");
    }, 2000);
  } catch (error) {
    console.error("Error fetching issues:", error);
    issueListContainer.innerHTML =
      "<p class='text-red-500'>Failed to load issues.</p>";
  }
};

const showIssueData = (res) => {
  const issueList = res.data;
  //   console.log(issueList);

  issueCount.innerHTML = `${issueList.length} Issues `;
  issueListContainer.innerHTML = "";

  issueList.forEach((issue) => {
    const singleIssue = document.createElement("div");
    singleIssue.innerHTML = `
  <div data-status="${issue.status}" data-issue="${issue.id}"
                  class="single-issue-card border-t-5 cursor-pointer
                  ${
                    issue.status == "open"
                      ? ` border-t-green-500`
                      : ` border-t-purple-500`
                  }
                   card w-full bg-base-100 shadow-sm"
                >
                  <div class="card-body overflow-hidden">
                    <div   class="flex justify-between items-center">
                    
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
    issueListContainer.appendChild(singleIssue);
    issueCountArea.classList.remove("hidden");
  });
};

// tab activation and data filtering
const filterIssue = (status) => {
  const issueCards = document.querySelectorAll(".single-issue-card");
  let count = 0;
  //   console.log(issueCards);

  issueCards.forEach((card) => {
    const cardStatus = card.getAttribute("data-status");
    //     console.log(cardStatus);
    if (status == "all" || cardStatus == status) {
      card.parentNode.classList.remove("hidden");
      count++;
    } else {
      card.parentNode.classList.add("hidden");
    }
  });
  issueCount.innerHTML = `${count} Issues`;
};

//tab event
const tabs = document.querySelectorAll("#issue-tab button");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    // remove styling
    //     console.log(tab);
    const tabName = tab.dataset.tab;

    tabs.forEach((t) => {
      t.classList.remove("btn-primary");
      t.classList.add("btn-outline");
    });
    tab.classList.add("btn-primary");
    tab.classList.remove("btn-outline");
    console.log(tabName);
    filterIssue(tabName);
  });
});

//data fetch based on id

const singleCard = async (id) => {
  try {
    const res = await fetch(
      `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`,
    );
    const details = await res.json();
    //     console.log(details.data);
    displayIssueModal(details.data);
  } catch (error) {
    console.error(error);
  }
};

// modal popup

displayIssueModal = (data) => {
  const issueModal = document.getElementById("issue-modal");
  //   console.log(data);
  issueModal.innerHTML = `
        <div class="modal-box max-w-2xl">
        <h2 class="font-bold text-2xl">${data.title}</h2>
        <ul class="flex gap-8 list-disc">
        ${
          data.status == "open"
            ? `<li class="list-none badge badge-success text-white">Opened</li>`
            : `<li class="list-none badge badge-error text-white">Closed</li>`
        }
          

          <li>${
            data.status == "open" ? "Opened" : "Closed"
          } By ${data.author}</li>

          <li>${new Date(data.updatedAt).toLocaleDateString()}</li>
        </ul>
        <div class="my-5">

           ${data.labels
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
        <p class="mb-5">
          ${data.description}
        </p>
        <div class="bg-gray-50 rounded-xl grid grid-cols-2 items-center p-5">
          <div class="font-light">
            Assignee:
            <br />
            <span class="font-semibold capitalize">${data.assignee}</span>
          </div>
          <div class="font-light">
            Priority: <br />
             ${(() => {
               let priorityBadge;
               const prio = data.priority.toLowerCase();
               switch (prio) {
                 case "high":
                   priorityBadge = "bg-red-500";
                   break;
                 case "medium":
                   priorityBadge = "bg-yellow-500";
                   break;
                 case "low":
                   priorityBadge = "bg-green-500";
                   break;
               }
               return `<span class="uppercase badge text-white ${priorityBadge}">${prio}</span>`;
             })()}

          </div>
        </div>
        <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn btn-primary">Close</button>
          </form>
        </div>
      </div>
  `;
  issueModal.showModal();
};
// single issue load in modal popup

// const singleIssue = document.querySelectorAll(".single-issue-card");
// console.log(singleIssue);
// singleIssue.forEach((issueCard) => {
//   issueCard.addEventListener("click", () => {
//     console.log("clicked", issueCard);
//   });
// });

document.addEventListener("click", (e) => {
  const issueCard = e.target.closest(".single-issue-card");

  if (issueCard) {
    //     console.log("clicked", issueCard);
    const dataId = issueCard.getAttribute("data-issue");
    //     console.log(dataId);
    singleCard(dataId);
  }
});

// search -

const searchData = async (searchText) => {
  if (!searchText) {
    //     console.log("trgger");
    tabs.forEach((t) => {
      t.classList.remove("btn-primary");
      t.classList.add("btn-outline");
    });
    const allTab = document.querySelector('#issue-tab button[data-tab="all"]');
    if (allTab) {
      allTab.classList.add("btn-primary");
      allTab.classList.remove("btn-outline");
    }

    allDataShow();
    return;
  }
  loader.classList.remove("hidden");
  issueListContainer.innerHTML = "";
  try {
    const response = await fetch(
      `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${encodeURIComponent(searchText)}`,
    );
    const result = await response.json();
    //     console.log(result);

    showIssueData(result);
    loader.classList.add("hidden");
    filterIssue("all");
    // active all tab
    tabs.forEach((t) => {
      t.classList.remove("btn-primary");
      t.classList.add("btn-outline");
    });
    const allTab = document.querySelector('#issue-tab button[data-tab="all"]');
    if (allTab) {
      allTab.classList.add("btn-primary");
      allTab.classList.remove("btn-outline");
    }
  } catch (error) {
    console.error("Search failed:", error);
  }
};

// bind the search form

const searchForm = document.getElementById("search-form");
searchForm.addEventListener("keyup", (e) => {
  e.preventDefault();
  const searchValue = document
    .getElementById("searching-text")
    .value.trim()
    .toLowerCase();
  //   console.log(searchValue);
  searchData(searchValue);
});
