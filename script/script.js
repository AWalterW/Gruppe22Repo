const todoArea = document.getElementById("todo");
const doingArea = document.getElementById("doing");
const completedArea = document.getElementById("completed");

// calculate fluid fullscreen size

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);

window.addEventListener("resize", () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});

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
      cardDiv.draggable = true;

      //adding delete button to taskCard
      let deleteBtn = document.createElement("i");
      deleteBtn.className = "fas fa-trash-alt close";
      deleteBtn.dataset.taskId = task.id;
      cardDiv.appendChild(deleteBtn);

      //adding edit button to taskCard
      let editBtn = document.createElement("i");
      editBtn.className = "fas fa-edit edit";
      cardDiv.appendChild(editBtn);

      // Eventlistener for click inside taskcards ADD FOR RADIOBUTTONS!
      cardDiv.addEventListener("click", e => {
        if (e.target.classList.contains("close")) {
          const taskId = e.target.dataset.taskId;
          console.log(taskId);
          deleteTask(taskId);
        }
      });

      let cardTitle = document.createElement("h4");
      cardTitle.innerText = task.title;
      cardDiv.appendChild(cardTitle);

      cardDiv.addEventListener("dragstart", e => {
        e.dataTransfer.setData("text", task.id);
      });

      let carddescription = document.createElement("p");
      carddescription.innerText = task.description;
      cardDiv.appendChild(carddescription);

      // check if task has checklist and render it
      if (task.checkList) {
        let listArea = document.createElement("div");
        listArea.className = "listArea";
        cardDiv.appendChild(listArea);

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
// adding dueDate to taskCard

      if(task.dueDate){
        let deadlineTag = document.createElement("p");
        deadlineTag.className = "deadlineP";
        deadlineTag.innerHTML = `<span style=font-weight:normal;>Gjøres innen:</span> ${task.dueDate}`;
        cardDiv.appendChild(deadlineTag);
      }

      targetArea.appendChild(cardDiv);
    }
  }
}

// Removes card from dom to be rendered again
function removeChildElements(area) {
  let i = area.childNodes.length;
  while (i > 2) {
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
  document.getElementById("datefield").setAttribute("min", today);
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
