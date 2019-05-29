let tasks; 

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
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getFromLocal() {
     tasks = JSON.parse(localStorage.getItem("tasks")); 
}


// initializing webapp 
function startApp() {
    
    // check if item tasks is saved in localstorage
    if(localStorage.getItem("tasks") === null) {
        tasks = defaultTasks; 
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

    addDropListener(todoArea); 
    addDropListener(doingArea); 
    addDropListener(completedArea);


    // sorts and renders tasks to the site
    sortTasks(); 

}
