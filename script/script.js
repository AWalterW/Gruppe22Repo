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
      let editBtn = document.createElement("i");
      editBtn.className = "fas fa-edit edit";
      taskEditBtns.appendChild(editBtn);

      let deleteBtn = document.createElement("i");
      deleteBtn.className = "fas fa-trash-alt close";
      deleteBtn.dataset.taskId = task.id;
      taskEditBtns.appendChild(deleteBtn);

      cardDiv.appendChild(taskEditBtns);
      //adding dscription to taskCard
      let taskDescription = document.createElement("div");
      taskDescription.className = "taskDescription";

      let taskDescriptionText = document.createElement("p");
      taskDescriptionText.innerText = task.description;
      taskDescription.appendChild(taskDescriptionText);

      // check if task has checklist and render it
      if (task.checkList == "noe") {
        let listArea = document.createElement("div");
        listArea.className = "listArea";
        taskDescription.appendChild(listArea);

        task.checkList.forEach(task => {
          let checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.onchange = `checkboxChange(${task.id})`;

          let checkboxText = document.createElement("p");
          checkboxText.innerText = task.listTask;

          if (task.isDone) {
            checkbox.checked = true;
            checkboxText.style.textDecoration = "line-through";
          }

          listArea.appendChild(checkbox);
          listArea.appendChild(checkboxText);

          let br = document.createElement("br");
          listArea.appendChild(br);
        });
      }
      cardDiv.appendChild(taskDescription);

      if (task.worker && task.worker.length > 0) {
        let taskWorker = document.createElement("p");

        taskWorker.className = "taskWorker";
        let taskWorkerIcon = document.createElement("i");
        taskWorkerIcon.className = "fas fa-user";
        taskWorker.appendChild(taskWorkerIcon);
        taskWorker.innerText = task.worker;
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

      // Eventlistener for click inside taskcards ADD FOR RADIOBUTTONS!
      cardDiv.addEventListener("click", e => {
        if (e.target.classList.contains("close")) {
          const taskId = e.target.dataset.taskId;
          deleteTask(taskId);
        }
      });

      cardDiv.addEventListener("drop", e => {
        const taskId = e.dataTransfer.getData("text");
        let target;  
        if (e.target.dataset.categori === "todo" || e.target.dataset.categori === "doing" || e.target.dataset.categori === "completed") {
          target = e.target.dataset.categori;
          changeTaskStatus(taskId, target);
        } 
        if (e.target.parentElement.parentElement.dataset.categori === "todo" || e.target.parentElement.parentElement.dataset.categori === "doing" || e.target.parentElement.parentElement.dataset.categori === "completed") {
          target = e.target.parentElement.parentElement.dataset.categori;
          changeTaskStatus(taskId, target);
        } 

        if (e.target.parentElement.dataset.categori === "todo" || e.target.parentElement.dataset.categori === "doing" || e.target.parentElement.dataset.categori === "completed") {
          target = e.target.parentElement.dataset.categori;
          changeTaskStatus(taskId, target);
        }
        // e.target.classList.remove("dragging");
      });

      cardDiv.addEventListener("dragstart", e => {
        e.dataTransfer.setData("text", task.id);
      });

      targetArea.appendChild(cardDiv);
    }
  }
}

// Removes card from dom to be rendered again
function removeChildElements(area) {
  let i = area.childNodes.length;
  while (i > 0) {
    area.removeChild(area.lastChild);
    i--;
  }
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
    // e.target.classList.remove("dragging");
  });
}

function changeTaskStatus(taskId, target) {
  if (tasks[taskId]) {
    let task = tasks[taskId];
    task.status = target;
    taskUpdated();
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
  // document.getElementById("datefield").setAttribute("min", today);
}

// Modals

function openModal(target) {
  const modal = document.getElementById(target);
  modal.style.display = "block";
}

function closeModal(target, form) {
  const modal = document.getElementById(target);

  document.getElementById("addTitle").value = "";
  document.getElementById("addDescription").value = "";
  document.getElementById("datefield").value = "";
  modal.style.display = "none";
}

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
