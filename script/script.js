const todoArea = document.getElementById("todo");
const doingArea = document.getElementById("doing");
const completedArea = document.getElementById("completed");

//sorts all tasks and render them in the correct category
function sortTasks() {
  removeChildElements(todoArea);
  removeChildElements(doingArea);
  removeChildElements(completedArea);

  tasks.forEach(task => {
    switch (task.status) {
      case "todo":
        renderTask(task, todoArea);
        break;
      case "doing":
        renderTask(task, doingArea);
        break;
      case "completed":
        renderTask(task, completedArea);
        break;
    }
  });
}

// Renders each task

function renderTask(task, targetArea) {
  if (task.deleted === false) {
    if (task.project === currentProject) {
      let cardDiv = document.createElement("div");
      cardDiv.className = "taskCard";
      cardDiv.dataset.taskId = task.id;
      cardDiv.dataset.categori = task.status;
      cardDiv.draggable = true;

      let taskTitle = document.createElement("h4");
      taskTitle.className = "taskTitle";
      taskTitle.innerText = task.title;
      cardDiv.appendChild(taskTitle);

      let taskEditBtns = document.createElement("span");
      taskEditBtns.className = "taskEditBtns";

      //adding edit button to taskCard
      if (!members[currentUser].isChild) {
        let editBtn = document.createElement("i");
        editBtn.className = "fas fa-edit edit";
        editBtn.dataset.taskId = task.id;
        taskEditBtns.appendChild(editBtn);

        let deleteBtn = document.createElement("i");
        deleteBtn.className = "fas fa-trash-alt close";
        deleteBtn.dataset.taskId = task.id;
        taskEditBtns.appendChild(deleteBtn);

        cardDiv.appendChild(taskEditBtns);
      } else if (currentProject > 2) {
        let editBtn = document.createElement("i");
        editBtn.className = "fas fa-edit edit";
        editBtn.dataset.taskId = task.id;
        taskEditBtns.appendChild(editBtn);

        let deleteBtn = document.createElement("i");
        deleteBtn.className = "fas fa-trash-alt close";
        deleteBtn.dataset.taskId = task.id;
        taskEditBtns.appendChild(deleteBtn);

        cardDiv.appendChild(taskEditBtns);
      }

      //adding dscription to taskCard
      let taskDescription = document.createElement("div");
      taskDescription.className = "taskDescription";

      let taskDescriptionText = document.createElement("p");
      taskDescriptionText.innerText = task.description;
      taskDescription.appendChild(taskDescriptionText);

      // check if task has checklist and render it
      if (task.checkList) {
        let listArea = document.createElement("ul");
        listArea.className = "taskChecklist";
        taskDescription.appendChild(listArea);

        for (let i = 0; i < task.checkList.length; i++) {
          let subtask = task.checkList[i];

          let checkListitem = document.createElement("li");

          let checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.dataset.taskId = task.id;
          checkbox.dataset.subTaskId = i;

          let checkboxText = document.createElement("p");
          checkboxText.innerText = subtask.listTask;

          if (subtask.isDone) {
            checkbox.checked = true;
            checkboxText.style.textDecoration = "line-through";
          }

          checkListitem.appendChild(checkbox);
          checkListitem.appendChild(checkboxText);

          listArea.appendChild(checkListitem);
        }
      }
      cardDiv.appendChild(taskDescription);

      if (task.worker >= 0) {
        let taskWorker = document.createElement("p");

        taskWorker.className = "taskWorker";
        let taskWorkerIcon = document.createElement("i");
        taskWorkerIcon.className = "fas fa-user";

        taskWorker.innerText = " " + members[parseInt(task.worker)].name;
        taskWorker.insertBefore(taskWorkerIcon, taskWorker.firstChild);
        cardDiv.appendChild(taskWorker);
      }

      if (task.dueDate && task.dueDate.length > 0) {
        let taskDueDate = document.createElement("p");
        taskDueDate.innerText = formatDate(task.dueDate) + " ";
        taskDueDate.className = "taskDate";
        let taskDateIcon = document.createElement("i");
        taskDateIcon.className = "fas fa-calendar-alt";
        taskDueDate.appendChild(taskDateIcon);

        cardDiv.appendChild(taskDueDate);
      }

      // Eventlistener for click inside taskcards
      cardDiv.addEventListener("click", e => {
        if (e.target.classList.contains("close")) {
          const taskId = e.target.dataset.taskId;
          deleteTask(taskId);
        }

        if (e.target.classList.contains("edit")) {
          const taskId = e.target.dataset.taskId;
          editTask(taskId);
        }

        if (e.target.tagName === "INPUT") {
          checkboxChange(e.target.dataset.taskId, e.target.dataset.subTaskId);
        }
      });

      // Enables drop on other card to change status
      cardDiv.addEventListener("drop", e => {
        const taskId = e.dataTransfer.getData("text");
        let target;
        if (
          e.target.dataset.categori === "todo" ||
          e.target.dataset.categori === "doing" ||
          e.target.dataset.categori === "completed"
        ) {
          target = e.target.dataset.categori;
          changeTaskStatus(taskId, target);
        }
        if (
          e.target.parentElement.parentElement.dataset.categori === "todo" ||
          e.target.parentElement.parentElement.dataset.categori === "doing" ||
          e.target.parentElement.parentElement.dataset.categori === "completed"
        ) {
          target = e.target.parentElement.parentElement.dataset.categori;
          changeTaskStatus(taskId, target);
        }

        if (
          e.target.parentElement.dataset.categori === "todo" ||
          e.target.parentElement.dataset.categori === "doing" ||
          e.target.parentElement.dataset.categori === "completed"
        ) {
          target = e.target.parentElement.dataset.categori;
          changeTaskStatus(taskId, target);
        }
      });

      cardDiv.addEventListener("dragstart", e => {
        e.dataTransfer.setData("text", task.id);
      });

      targetArea.appendChild(cardDiv);
    }
  }
}

// Removes cards from dom to be rendered again
function removeChildElements(area) {
  let i = area.childNodes.length;
  while (i > 0) {
    area.removeChild(area.lastChild);
    i--;
  }
}

//functions for rendering page elements

function renderPageVars() {
  document.getElementById("username").innerHTML =
    members[currentUser].name + '<i class="fas fa-angle-down"></i>';

  const projectsArea = document.getElementById("projects");
  const projectDropdown = document.getElementById("projectDropdown");
  removeChildElements(projectDropdown);
  projectsArea.innerText = projects[currentProject].name + " ";

  let projectArrow = document.createElement("i");
  projectArrow.className = "fas fa-angle-down";

  document.getElementById("projects").appendChild(projectArrow);

  projects.forEach(e => {
    if (e.members.includes(currentUser) && e.id !== currentProject) {
      let projectLi = document.createElement("a");
      projectLi.innerText = e.name;
      projectLi.dataset.projectId = e.id;

      document.getElementById("projectDropdown").appendChild(projectLi);
    }
  });

  let projectLiAddproject = document.createElement("a");
  projectLiAddproject.innerHTML = 'Nytt prosjekt <i class="fas fa-plus"></i>';
  projectLiAddproject.id = "newProjectBtn";
  document.getElementById("projectDropdown").appendChild(projectLiAddproject);

  if (projects[currentProject].log) {
    document.getElementById("rewardLog").innerText =
      projects[currentProject].log;
  }

  if (currentProject > 2) {
    document.getElementById("doingHeader").innerText = "Holder på";
    document.getElementById("completeHeader").innerText = "Ferdig";
  } else {
    document.getElementById("doingHeader").innerText = "Ferdig";
    document.getElementById("completeHeader").innerText = "Godkjent";
  }

  addProgressbarPoint();
  renderRewards();
}

function renderMembers(target, currentWorker) {
  //add task form members
  let addTaskWorkerList = document.getElementById(target);
  addTaskWorkerList.innerHTML = "";
  projects[currentProject].members.forEach(e => {
    const workerOption = document.createElement("option");
    workerOption.innerText = members[e].name;
    workerOption.value = e;

    if (e === parseInt(currentWorker)) {
      workerOption.selected = true;
    }
    addTaskWorkerList.appendChild(workerOption);
  });
}
// Rendering Grp members
function renderGroupMembers() {
  document.getElementById("groupMembers").innerHTML = "";
  document.getElementById("addGroupMember").innerHTML = "";

  projects[currentProject].members.forEach(m => {
    let groupMember = document.createElement("li");
    groupMember.innerText = members[m].name;

    document.getElementById("groupMembers").appendChild(groupMember);
  });
  let membersNotInGroup = [];

  members.forEach(e => {
    let isInGroup = false;
    for (let i = 0; i < projects[currentProject].members.length; i++) {
      if (e.id == projects[currentProject].members[i]) {
        isInGroup = true;
      }
    }
    if (!isInGroup) {
      membersNotInGroup.push(e.id);
    }
  });

  for (let i = 1; i < membersNotInGroup.length; i++) {
    let userSelectItem = document.createElement("option");
    userSelectItem.value = membersNotInGroup[i];
    userSelectItem.innerText = members[membersNotInGroup[i]].name;
    document.getElementById("addGroupMember").appendChild(userSelectItem);
  }

  if (membersNotInGroup.length < 2) {
    document.getElementById("addMemberSelect").style.display = "none";
  } else {
    document.getElementById("addMemberSelect").style.display = "inline";
  }
}

function addNewGroupMember() {
  let newMember = document.getElementById("addGroupMember").value;
  projects[currentProject].members.push(parseInt(newMember));
  renderGroupMembers();
  taskUpdated();
}

// Drag and Drop here!

function addDropListener(area) {
  area.addEventListener("dragover", e => {
    e.dataTransfer.dropEffect = "move";
    e.preventDefault();
  });

  area.addEventListener("drop", e => {
    const taskId = e.dataTransfer.getData("text");
    const target = e.target.id;

    if (target === "todo" || target === "doing" || target === "completed") {
      changeTaskStatus(taskId, target);
    }
  });
}

// Changing status on tasks and awarding points

function changeTaskStatus(taskId, target) {
  if (tasks[taskId]) {
    let task = tasks[taskId];
    let oldStatus = task.status;

    if (
      target === "completed" &&
      task.completed === false &&
      members[task.worker]
    ) {
      if (!members[currentUser].isChild) {
        projects[currentProject].points += 1;
        projectpointAdded(currentProject);
        task.completed = true;
        task.status = target;
        taskUpdated();
      } else if (currentProject > 2) {
        projects[currentProject].points += 1;
        projectpointAdded(currentProject);
        task.completed = true;
        task.status = target;
      } else {
        task.status = oldStatus;
        taskUpdated();
        alert("Kun voksne kan godkjenne oppgaver");
      }
    } else {
      task.status = target;
      taskUpdated();
    }
  }
}

// Set min duedate to today

function fixDueDate() {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }

  today = yyyy + "-" + mm + "-" + dd;
  document.getElementById("datefield").setAttribute("min", today);
}

// Modal functions

function openModal(target) {
  const modal = document.getElementById(target);
  modal.style.display = "block";

  document.getElementById("modalDiv").style.display = "block";

  document.getElementById("modalDiv").addEventListener("click", e => {
    closeAllModals();
  });
}

function closeModal(target, form) {
  const modal = document.getElementById(target);

  document.getElementById("addTitle").value = "";
  document.getElementById("addDescription").value = "";
  document.getElementById("datefield").value = "";
  document.getElementById("addReward1").value = "";
  document.getElementById("addReward2").value = "";
  modal.style.display = "none";

  document.getElementById("modalDiv").style.display = "none";
}

function closeAllModals() {
  closeModal("addRewardModal");
  closeModal("addTaskModal");
  closeModal("editTaskModal");
}

// returns duedate as formated string
function formatDate(date) {
  let dateArray = date.split("-");
  let month;
  switch (dateArray[1]) {
    case "01":
      month = "januar";
      break;
    case "02":
      month = "februar";
      break;
    case "03":
      month = "mars";
      break;
    case "04":
      month = "april";
      break;
    case "05":
      month = "mai";
      break;
    case "06":
      month = "juni";
      break;
    case "07":
      month = "juli";
      break;
    case "08":
      month = "august";
      break;
    case "09":
      month = "september";
      break;
    case "10":
      month = "oktober";
      break;
    case "11":
      month = "november";
      break;
    case "12":
      month = "desember";
      break;
  }

  return `${dateArray[2]}. ${month} ${dateArray[0]}`;
}

// Changing color on points added Progressbar

function addProgressbarPoint() {
  for (let i = 1; i < 11; i++) {
    document.getElementById("g" + i).className = "grid";
  }
  if (
    projects[currentProject].points >= 0 /* && members[currentUser].isChild*/
  ) {
    for (let i = 1; i < projects[currentProject].points + 1; i++) {
      document.getElementById("g" + i).className = "grid gainedGrid";
    }
  }
}

// function for closing all modals

function closeAllModals() {
  closeModal("addRewardModal");
  closeModal("addTaskModal");
  closeModal("editTaskModal");
  closeModal("addProjectModal");
  closeModal("groupModal");
}

// function for changing to colorblind mode

function colorBlind() {
  isColorBlind = !isColorBlind;
  if (isColorBlind) {
    document.documentElement.style.setProperty(
      "--todo-card-color",
      "rgb(204,121,167)"
    );
    document.documentElement.style.setProperty(
      "--doing-card-color",
      "rgb(240, 228, 66)"
    );
    document.documentElement.style.setProperty(
      "--completed-card-color",
      "rgb(255, 140, 0)"
    );
    document.documentElement.style.setProperty(
      "--todo-card-bg",
      "rgba(255, 157, 237, 0.493)"
    );
    document.documentElement.style.setProperty(
      "--doing-card-bg",
      "rgba(251, 251, 135, 0.5)"
    );
    document.documentElement.style.setProperty(
      "--completed-card-bg",
      "rgba(251, 190, 115, 0.486)"
    );
    document.documentElement.style.setProperty(
      "--gridGained-background-color",
      "	rgb(255,255,0)"
    );
  } else {
    document.documentElement.style = " ";
  }
}

// Header click listener

document.getElementById("header").addEventListener("click", e => {
  if (e.target.id === "logoutBtn") {
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.open("./login.html", "_self");
  } else if (e.target.id === "newProjectBtn") {
    closeAllModals();
    openModal("addProjectModal");
  } else if (e.target.id === "projectBtn") {
    closeAllModals();
    openModal("groupModal");
    renderGroupMembers();
  }
});

//Reset rewards

function resetReward() {
  let logMessage;

  if (projects[currentProject].points >= 5) {
    logMessage = "Forrige uke nådde du første belønning. Stå på!";
  }
  if (projects[currentProject].points == 10) {
    logMessage =
      "Forrige uke nådde du både første og andre belønning. Gratulerer!";
  }

  projects[currentProject].reward1 = "";
  projects[currentProject].reward2 = "";
  projects[currentProject].log = logMessage;
  projects[currentProject].points = 0;

  tasks.forEach(e => {
    if (e.project == currentProject && e.status == "completed") {
      e.deleted = true;
    }
  });

  taskUpdated();
}

function resetRewardVisibility() {
  document.getElementById("arrow1").style.visibility = "hidden";
  document.getElementById("rewardBox1").style.visibility = "hidden";
  document.getElementById("arrow2").style.visibility = "hidden";
  document.getElementById("rewardBox2").style.visibility = "hidden";
}
