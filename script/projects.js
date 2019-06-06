let projects = [
  {
    id: 0,
    name: "Ingen prosjekter",
    members: []
  },
  {
    id: 1,
    name: "Skolearbeid",
    members: [1, 2]
  },
  {
    id: 2,
    name: "Frivillige",
    members: [1, 2, 3]
  },
  {
    id: 3,
    name: "Hjemmearbeid",
    members: [1, 3]
  }
];

// change project eventlistener
function changeProjectListener() {
  const dropdown = document.getElementById("projectDropdown");

  dropdown.addEventListener("click", e => {
    if (e.target.dataset.projectId) {
      changeCurrentProject(e.target.dataset.projectId);
    } else if (e.target.id === "newProjectBtn") {
      console.log("New Project");
    }
  });
}

function changeCurrentProject(id) {
  currentProject = parseInt(id);
  members[currentUser].lastOpenProject = id;
  closeAllModals();
  startApp();
}

changeProjectListener();
