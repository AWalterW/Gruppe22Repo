function check(form) {
   
    let keccakL = form.emailLogin.value;
    let keccakP = form.passwordLogin.value;

    if(keccakL === members[0].email && keccakP === members[0].password) {
        // currentUser = 0;
        window.open('index.html', currentUser = 0); 
        startApp();
    }
    else if(keccakL === members[1].email && keccakP === members[1].password) {
        // currentUser = 1;
        var windowOpen = window.open('index.html');
        windowOpen.document(currentUser = 1);
        startApp();
    } 
    else {
        alert("Feil brukernavn eller passord, vennligst prøv på nytt eller opprett en ny bruker.");
    }
}

//Forsøk på å lagre til local storage
/*
function saveLoginLocal() {
    localStorage.setItem("loginToken", JSON.pars(loginToken));
  }
  */