let robotLayout = ["red", "red", "red", "blu", "blu", "blu"];
const robotOrder = ["red1", "red2", "red3", "blu1", "blu2", "blu3"];

const RED1 = "red1";
const RED2 = "red2";
const RED3 = "red3";

const BLU1 = "blu1";
const BLU2 = "blu2";
const BLU3 = "blu3";

const ROBOT_STORAGE = "robot";

const UNSELECTED_COLOR = "#9a9280";
const RED_COLOR = "#aa0000";
const RED_BORDER_COLOR = "#aa0000";
const BLUE_COLOR = "#476291";
const BLUE_BORDER_COLOR = "#476291";

window.addEventListener("load", () => {
    let robot = document.querySelectorAll(".red, .blu");
    for (let i = 0; i<robot.length; i++) {
        robot[i].addEventListener("click", (ev) => {
            if (ev.button!=0) return;
            robotLayout[i] = robotOrder[(robotOrder.indexOf(robotLayout[i])+1)%robotOrder.length];
            switch(robotLayout[i]) {
                case "red":
                    robot[i].style.background = RED_COLOR;
                    robot[i].style.borderColor = RED_BORDER_COLOR;
                    break;
                case "blu":
                    robot[i].style.background = BLUE_COLOR;
                    robot[i].style.borderColor = BLUE_BORDER_COLOR;
                    break;
                default:
                    robot[i].style.background = UNSELECTED_COLOR;
                    robot[i].style.borderColor = UNSELECTED_COLOR;
                    break;
            }
        });
    }
});

function verifyInfo(inputs) {
  console.log(inputs.match)
  if (inputs.match < 1) {
      outputError("Invalid match number.");
      return false;
  }
  else if (inputs.team < 1) {
      outputError("Invalid team number.")
      return false;
  }
  else if (!inputs.scouter.trim() || inputs.scouter=="placeholder") {
      outputError("Enter your name (The name of the person scouting).");
      return false;
  }
  else if (!inputs.robotState == false) {
      outputError("Please select which robot you are scouting.");
      return false;
  }
  return true;
}

window.onload = function() {
    var select = document.getElementById('name');
    select.onchange = function() {
        select.style.color = this.value == 'placeholder' ? '#777' : '#fff';
    };
    select.onchange();
};

function outputError(message) {
  console.error(message);
  let errorOutput = document.getElementById("errorOutput");
  if (errorOutput==null) {
    const submitForm = document.getElementById("submitForm");
    if (submitForm==null) return; //nowhere to visibly output error to
    errorOutput = document.createElement("p");
    errorOutput.style.color = "#be0000";
    errorOutput.id = "errorOutput";
    submitForm.prepend(errorOutput);
  }
  errorOutput.innerHTML = message;
}

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}