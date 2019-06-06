let defaultMembers = [
  {
    id: 0,
    email: "admin@admin.io",
    passord: "DONOTUSE!",
    name: "admin"
  },
  {
    id: 1,
    email: "OlaNordmann@eksempel.no",
    password: "abc123",
    name: "Ola Nordmann",
    lastOpenProject: 1,
    isChild: false
  },
  {
    id: 2,
    email: "KariNordmann@eksempel.no",
    password: "passord",
    name: "Kari Nordmann",
    lastOpenProject: 1,
    isChild: true
  },
  {
    id: 3,
    email: "admin@whitehouse.gov",
    password: "abc123",
    name: "George W. Bush",
    isChild: false
  }
];

function childPageView() {
  if (members[currentUser].isChild) {
    if (currentProject === 1 || currentProject === 2) {
      document.getElementById("addNewTaskBtn").style.display = "none";
      document.getElementById("addRewardBtn").style.display = "none";
      document.getElementById("resetReward").style.display = "none";
    } else {
      document.getElementById("addNewTaskBtn").style.display = "block";
      document.getElementById("addRewardBtn").style.display = "block";
      document.getElementById("resetReward").style.display = "block";
    }
  }
}
