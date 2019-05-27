const todoArea = document.getElementById("todo"); 
const doingArea = document.getElementById("doing"); 
const completedArea = document.getElementById("completed");

// calculate fluid fullscreen size

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`); 

window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });
 

  //sorts all tasks and render them in the correct category
  function sortTasks() { 

    removeChildElements(todoArea); 
    removeChildElements(doingArea); 
    removeChildElements(completedArea);

    tasks.forEach((task) => {
        switch(task.status) {
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
    let cardDiv = document.createElement('div'); 
    cardDiv.className = "taskCard";               
    cardDiv.dataset.taskId = task.id; 
    cardDiv.draggable = true;

    let cardTitle = document.createElement('h4'); 
    cardTitle.innerText = task.title; 
    cardDiv.appendChild(cardTitle); 

    let carddescription = document.createElement('p'); 
    carddescription.innerText = task.description; 
    cardDiv.appendChild(carddescription);

   // check if task has checklist and render it
    if(task.checkList) { 

        let listArea = document.createElement("div");  
        listArea.className = "listArea";
        cardDiv.appendChild(listArea);

        task.checkList.forEach((task) => {
           let checkbox = document.createElement("input"); 
           checkbox.type = "checkbox";  

           let checkboxText = document.createElement("p"); 
           checkboxText.innerText = task.listTask; 

            if(task.isDone) {
                checkbox.checked = true; 
                checkboxText.style.textDecoration = "line-through";
            }


           listArea.appendChild(checkbox); 
           listArea.appendChild(checkboxText); 

            let br = document.createElement("br"); 
            listArea.appendChild(br);
        });
    }

    targetArea.appendChild(cardDiv);  
    
} 

// Removes card from dom to be rendered again NOT DONE!
function removeChildElements(area) {
 let i = area.childNodes.length; 
    while (i > 2) { 
        area.removeChild(area.lastChild); 
        i--
    
    }
}

sortTasks();

function addTask() {
    let newTask = {
            id: 4, 
            status: "doing", 
            title: "Fifth task", 
            description: "Lorem ipsum dolor sit amet"
        } 

    tasks.push(newTask); 
    sortTasks();
}