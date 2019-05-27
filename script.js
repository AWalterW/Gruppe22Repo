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
 


  function sortTasks() { 

   // removeChildElements(todoArea); 
   // removeChildElements(doingArea); 
   // removeChildElements(completedArea);

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

    targetArea.appendChild(cardDiv);  
    
} 


function removeChildElements(area) {
 let i = area.childNodes.length; 
    while (i > 1) { 
        console.log(area);
        area.removeChild(area.lastChild);
    
    }
}

sortTasks();
