let tasks = [];
let projects = [];
let members = [];

let currentProject;
let currentUser;
let isColorBlind = false;

let defaultTasks = [
  /*
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
  */
];

//Saving and getting to/from local storage

function saveToLocal() {
  localStorage.removeItem("tasks");
  localStorage.removeItem("projects");
  localStorage.removeItem("members");
  localStorage.setItem("members", JSON.stringify(members));
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("projects", JSON.stringify(projects));
}

function getFromLocal() {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  projects = JSON.parse(localStorage.getItem("projects"));
}

function taskUpdated() {
  saveToLocal();
  sortTasks();
  renderPageVars();
}

// initializing webapp
function startApp() {
  let usercookie = getCookie("user");
  if (usercookie > 0) {
    currentUser = parseInt(usercookie);

    // check if item tasks is saved in localstorage
    if (localStorage.getItem("tasks") === null) {
      tasks = defaultTasks;
    } else {
      if (localStorage.getItem("tasks").length < 1) {
        tasks = defaultTasks;
      } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
      }
    }

    // check if item members is saved in localstorage
    if (localStorage.getItem("members") === null) {
      members = defaultMembers;
    } else {
      if (localStorage.getItem("members").length < 1) {
        members = defaultMembers;
      } else {
        members = JSON.parse(localStorage.getItem("members"));
      }
    }

    // check if item projects is saved in localstorage
    if (localStorage.getItem("projects") === null) {
      projects = defaultProjects;
    } else {
      if (localStorage.getItem("projects").length < 1) {
        projects = defaultProjects;
      } else {
        projects = JSON.parse(localStorage.getItem("projects"));
      }
    }

    saveToLocal();

    if (currentProject === undefined) {
      if (members[currentUser].lastOpenProject) {
        currentProject = members[currentUser].lastOpenProject;
      } else {
        currentProject = 0;
      }
    }

    renderPageVars();
    childPageView();
    addProgressbarPoint(currentProject);
    fixDueDate();

    addDropListener(todoArea);
    addDropListener(doingArea);
    addDropListener(completedArea);

    // sorts and renders tasks to the site
    sortTasks();
  } else {
    window.open("./login.html", "_self");
  }
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

}

// edit function for taskCard

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

// Add rewards

function addReward(form) {
  const reward1 = document.getElementById("addReward1").value;
  const reward2 = document.getElementById("addReward2").value;

  projects[currentProject].reward1 = reward1;
  projects[currentProject].reward2 = reward2;
  taskUpdated();
}
function renderRewards() {
  const reward1 = projects[currentProject].reward1;
  const reward2 = projects[currentProject].reward2;
  if (reward1 && reward1.length > 0) {
    document.getElementById("rewardText1").innerHTML =
      "&nbsp;&nbsp;&nbsp;&nbsp;" + reward1;
    document.getElementById("arrow1").style.visibility = "visible";
    document.getElementById("rewardBox1").style.visibility = "visible";
  } else {
    document.getElementById("arrow1").style.visibility = "hidden";
    document.getElementById("rewardBox1").style.visibility = "hidden";
  }

  if (reward2 && reward2.length > 0) {
    document.getElementById("rewardText2").innerHTML =
      "&nbsp;&nbsp;&nbsp;&nbsp;" + reward2;
    document.getElementById("arrow2").style.visibility = "visible";
    document.getElementById("rewardBox2").style.visibility = "visible";
  } else {
    document.getElementById("arrow2").style.visibility = "hidden";
    document.getElementById("rewardBox2").style.visibility = "hidden";
  }
}

//Cookies

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
