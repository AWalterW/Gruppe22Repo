let tasks = [];
let currentProject;
let currentUser = 0;
let isColorBlind = false;

let defaultTasks = [
  {
    id: 0,
    status: "todo",
    title: "First task",
    description: "Lorem ipsum dolor sit amet",
    worker: 0,
    checkList: [
      {
        listTask: "Noe du må gjøre",
        isDone: false
      },
      {
        listTask: "Noe du må gjøre",
        isDone: false
      },
      {
        listTask: "Noe du må gjøre",
        isDone: true
      }
    ],
    deleted: false,
    completed: false,
    project: 0
  },
  {
    id: 1,
    status: "doing",
    title: "Second task",
    description: "Lorem ipsum dolor sit amet",
    worker: 1,
    deleted: false,
    completed: false,
    project: 0
  },
  {
    id: 2,
    status: "todo",
    title: "Third task",
    description: "Lorem ipsum dolor sit amet",
    deleted: false,
    completed: false,
    project: 0
  },
  {
    id: 3,
    status: "completed",
    title: "Fourth task",
    description: "Lorem ipsum dolor sit amet",
    deleted: false,
    project: 1
  }
];

function saveToLocal() {
  localStorage.removeItem("tasks");
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getFromLocal() {
  tasks = JSON.parse(localStorage.getItem("tasks"));
}

function taskUpdated() {
  saveToLocal();
  sortTasks();
}

// initializing webapp
function startApp() {
  // check if item tasks is saved in localstorage
  if (localStorage.getItem("tasks") === null) {
    tasks = defaultTasks;
    saveToLocal();
  } else {
    if (localStorage.getItem("tasks").length < 1) {
      tasks = defaultTasks;
      console.log("localstorage defined but empty");
      saveToLocal();
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }
  }

  if (currentProject === undefined) {
    if (members[currentUser].lastOpenProject) {
      currentProject = members[currentUser].lastOpenProject;
    } else {
      currentProject = 0;
    }
  }

  renderPageVars();
  childPageView();
  addProgressbarPoint();
  fixDueDate();

  addDropListener(todoArea);
  addDropListener(doingArea);
  addDropListener(completedArea);

  // sorts and renders tasks to the site
  sortTasks();
}

// add new task to task array

function addTask(form) {
  const newTask = {};
  const newTaskList = [];

  const taskTitle = document.getElementById("addTitle").value;
  const taskDescription = document.getElementById("addDescription").value;
  const taskDueDate = document.getElementById("datefield").value;
  const taskWorker = document.getElementById("addTaskWorker").value;

  if (taskTitle.length > 0) {
    newTask.title = taskTitle;
    if (taskDescription.length > 0) {
      newTask.description = taskDescription;
      newTask.deleted = false;
      newTask.completed = false;
      newTask.worker = taskWorker;
      newTask.project = currentProject;
      if (taskDueDate.length > 0) {
        newTask.dueDate = taskDueDate;
        submitTask(newTask);
        closeModal("addTaskModal", "addTaskForm");
      } else {
        submitTask(newTask);
        closeModal("addTaskModal", "addTaskForm");
      }
    } else {
      alert("Du må ha en beskrivelse");
    }
  } else {
    alert("Du må ha en tittel");
  }
}

function submitTask(newTask) {
  const task = newTask;
  task.status = "todo";
  task.id = tasks.length;
  tasks.push(task);
  taskUpdated();
}

// edit task

function editTask(taskId) {
  openModal("editTaskModal");

  const oldTask = tasks[taskId];
  let changedTask;

  document.getElementById("editTaskId").innerText = taskId;
  document.getElementById("editTitle").value = oldTask.title;
  document.getElementById("editDescription").value = oldTask.description;

  renderMembers("editTaskWorker", oldTask.worker);
  if (oldTask.dueDate) {
    document.getElementById("editdatefield").value = oldTask.dueDate;
  } else {
    document.getElementById("editdatefield").value = undefined;
  }

  if (oldTask.worker) {
    document.getElementById("addTaskWorker").value = oldTask.worker;
  } else {
    document.getElementById("addTaskWorker").value = undefined;
  }

  /* */
}

function submitTaskChange() {
  const taskId = parseInt(document.getElementById("editTaskId").innerText);
  const taskTitle = document.getElementById("editTitle").value;
  const taskDescription = document.getElementById("editDescription").value;
  const taskDueDate = document.getElementById("editdatefield").value;
  const taskWorker = document.getElementById("editTaskWorker").value;

  if (taskTitle.length > 0) {
    tasks[taskId].title = taskTitle;
    if (taskDescription.length > 0) {
      tasks[taskId].description = taskDescription;
      tasks[taskId].worker = taskWorker;

      tasks[taskId].dueDate = taskDueDate;
      closeAllModals();
    } else {
      alert("Du må ha en beskrivelse");
    }
  } else {
    alert("Du må ha en tittel");
  }

  taskUpdated();
}

function deleteTask(taskId) {
  tasks[taskId].deleted = true;
  taskUpdated();
}

function checkboxChange(taskId, subtaskId) {
  tasks[taskId].checkList[subtaskId].isDone = !tasks[taskId].checkList[
    subtaskId
  ].isDone;
  taskUpdated();
}

// Add reward

function addReward(form) {
  const reward1 = document.getElementById("addReward1").value;
  const reward2 = document.getElementById("addReward2").value;

  document.getElementById("arrow1").innerHTML = " " + reward1;
  document.getElementById("arrow2").innerHTML = " " + reward2;

  projects[currentProject].reward1 = reward1;
  projects[currentProject].reward2 = reward2;
}
