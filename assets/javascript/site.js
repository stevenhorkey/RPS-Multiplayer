// Initialize Firebase
// Initialize Firebase
var config = {
  apiKey: "AIzaSyD-DT8UQJg6UI5fn12E0oydonNL9G6Ot04",
  authDomain: "rps-multiplayer-4daac.firebaseapp.com",
  databaseURL: "https://rps-multiplayer-4daac.firebaseio.com",
  projectId: "rps-multiplayer-4daac",
  storageBucket: "rps-multiplayer-4daac.appspot.com",
  messagingSenderId: "516661451569"
};
firebase.initializeApp(config);

var database = firebase.database();

var name1 = "";
var wins1 = 0;
var losses1 = 0;

var name2 = "";
var wins2 = 0;
var losses2 = 0;


$(document).ready(function(){

  $('#name-submit').on("click", function() {
    var name = $('#name-input').val().trim();    
    if (name1 === ""){
      name1 = name;
      console.log(name1);
    } else {
      name2 = name;
      console.log(name2)
    }
    $('#name-input').val("");
    database.ref().set({
      player1: {
        name:name1,
        wins:0,
        losses:0
      },
      player2: {
        name:name2,
        wins:0,
        losses:0
      }
    });
  });

  database.ref().on("value",function(snapshot){

    
  })
})

/* 
Take in first user input and make them player one and give them a loss count, name, and win in firebase and display.
Take in first user input and make them player two and give them a loss count, name, and win in firebase and display.
Get rid of the enter name box and button.
Let them choose rock paper or scissors and what ever they choose is only displayed to them, not to the other user. 
Once both players have choosen a answer, compare them, and Diplay who wins. 
After 3 seconds, empty that winner display and adjust win count accordingly.


CHAT:
update the text box with what ever input is submitted from the text section and update firebase and display the result from firebase.
*/