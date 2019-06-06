window.onload = function() {
  document.getElementById("loginform").onsubmit = function() {
    check(this.form);
    return false;
  };
};

if (localStorage.getItem("members") === null) {
  members = defaultMembers;
} else {
  if (localStorage.getItem("members").length < 1) {
    members = defaultMembers;
  } else {
    members = JSON.parse(localStorage.getItem("members"));
  }
}

function check(form) {
  let loginUsername = form.emailLogin.value;
  let loginPassword = form.passwordLogin.value;
  let stayLoggedin = document.querySelector("#rememberCheck").checked;

  for (member in members) {
    if (
      members[member].email.toLowerCase() === loginUsername.toLowerCase() &&
      members[member].password === loginPassword
    ) {
      loginSuccess(member, stayLoggedin);
      break;
    } else if (
      members[member].email.toLowerCase() === loginUsername.toLowerCase() &&
      members[member].password !== loginPassword
    ) {
      alert("Feil brukernavn og/eller passord!");
      break;
    }
  }
}

function loginSuccess(member, remember) {
  if (remember) {
    let date = new Date();
    date.setTime(date.getTime() + 15 * 24 * 60 * 60 * 1000);
    let expires = "expires=" + date.toUTCString();
    document.cookie = `user=${member};${expires};path=/`;
    window.open("./index.html", "_self");
  } else {
    document.cookie = `user=${member};`;
    window.open("./index.html", "_self");
  }
}