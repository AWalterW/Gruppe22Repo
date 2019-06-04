

/*
 creating a "close" button and place it on each list
let myList = document.getElementsByTagName("LI");
let i;
for (i = 0; i < myList-length; i++) {
    let span = document.createElement("span");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myList[i].appendChild(span);
}

 when cliccking on the "close button" hide / remove the list 
let close = document.getElementsByClassName("close");
let i;
for (i = 0; i < close.length; i++){
    close[i].onclick = function(){
        let div = this.parentalElement;
        div.style.display = "none"; 
    }
}

 placing the "check" symbol when clicking on the list 
let list = document.querySelector("ul");
list.addEventListener("click", function(ev){
    if (ev.target.getElementsByTagName === "LI"){
        ev.target.classlist.toggle("checked");
    }
}, false);

 craeting "new list" when clicking on the add button 
function newElement() {
    let li = document.createElement("li");
    let inputValue = document.getElementById("todDoInput").value;
    let t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputvalue === '') {
        alert("You have to write something to do!")
    } else {
        document.getElementById("myList").appendChild(li);
    }
    document.getElementById("todDoInput").value = "";

    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    for(i = 0; i < close.length; i++) {
        close[i].onclick = function(){
            let div = this.parentalElement;
            div.style.display = "none";
        }
    }
}*/


var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// denne delen av koden fungerer ikke så dropp denne, siden vi har DnD så trenger ikke denne.
// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}