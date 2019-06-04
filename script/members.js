let members = [
  {
    id: 0,
    email: "noen@eksempel.no",
    password: "abc123",
    name: "Ola Nordmann",
    lastOpenProject: 1,
    isChild: false,
    points: 7
  },
  {
    id: 1,
    email: "noenandre@eksempel.no",
    password: "passord",
    name: "Kari Nordmann",
    lastOpenProject: 1,
    isChild: true,
    points: 8
  },
  {
    id: 2,
    email: "admin@whitehouse.gov",
    password: "abc123",
    name: "George W. Bush",
    isChild: false,
    points: 7
  }
];

function childPageView() {
  if (members[currentUser].isChild) {
    document.getElementById("kanbanTools").style.display = "none";
    document.getElementById("addRewardBtn").style.display = "none";
  }
}

// alert progressapps about user getting a point
function userpointAdded(user) {
  console.log(members[user].name);
  addProgressbarPoint();
}
