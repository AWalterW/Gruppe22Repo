let members = [
  {
    id: 0,
    email: "OlaNordmann@eksempel.no",
    password: "abc123",
    name: "Ola Nordmann",
    lastOpenProject: 1,
    isChild: false,
    points: 7
  },
  {
    id: 1,
    email: "KariNordmann@eksempel.no",
    password: "passord",
    name: "Kari Nordmann",
    lastOpenProject: 1,
    isChild: true,
    points: 0
  },
  {
    id: 2,
    email: "admin@whitehouse.gov",
    password: "abc123",
    name: "George W. Bush",
    isChild: false,
    points: 0
  }
];

function childPageView() {
  if (members[currentUser].isChild) {
    document.getElementById("addNewTaskBtn").style.display = "none";
  }
}

// alert progressapps about user getting a point
function userpointAdded(user) {
  console.log(members[user].name);
  addProgressbarPoint();
}
