let tasks = []; 

let defaultTasks = [
    {
        id: 0, 
        status: "todo", 
        title: "First task", 
        description: "Lorem ipsum dolor sit amet", 
        category: "school", 
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
        ]
    }, 
    {
        id: 1, 
        status: "doing",  
        title: "Second task", 
        description: "Lorem ipsum dolor sit amet"
    }, 
    {
        id: 2, 
        status: "todo",  
        title: "Third task", 
        description: "Lorem ipsum dolor sit amet"
    }, 
    {
        id: 3, 
        status: "completed", 
        title: "Fourth task", 
        description: "Lorem ipsum dolor sit amet"
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
    if(localStorage.getItem("tasks") === null) {
       
        saveToLocal();
    
    } else {    
        if(localStorage.getItem("tasks").length < 1) {
            tasks = defaultTasks; 
            console.log("localstorage defined but empty"); 
            saveToLocal();
        } else {
        tasks = JSON.parse(localStorage.getItem("tasks")); 
        }
    }

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

    const formData = document.getElementById(form).children; 
    const taskTitle = formData[1].value;  
    const taskDescription = formData[4].value; 
    const taskDueDate = formData[7].value; 

    if(taskTitle.length > 0) {
        newTask.title = taskTitle; 
        if(taskDescription.length > 0) {
            newTask.description = taskDescription;
            if(taskDueDate.length > 0) {
                newTask.dueDate = taskDueDate; 
                submitTask(newTask); 
                closeModal('addTaskModal', 'addTaskForm');
            } else {
                submitTask(newTask); 
                closeModal('addTaskModal', 'addTaskForm');
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
