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

var turn;

var game = {
  functions : {
    init: function(){

      $('#name-submit').on("click", function() {
        var name = $('#name-input').val().trim();    
        if (name1 === ""){
          name1 = name;
          database.ref().set({
            chat: "",
            players: {
              one : {
                name:name1,
                choice: '',                
                wins:0,
                losses:0
              }
            },
          });
        } else if (name2 === "") {
          name2 = name;
          $('#name-input').hide();
          $('#name-submit').hide();
          database.ref('players').update({
              two : {
                name:name2,
                choice: '',
                wins:0,
                losses:0
            },
          });
          database.ref().update({
            turn : 1,
          })
    
        }
        $('#name-input').val("");
      });
    },
    play : function(){
      var rock = $('.rock')
      rock.html('<i class="fas fa-hand-rock"></i>')
      var paper = $('.paper')
      paper.html('<i class="fas fa-hand-paper"></i>')
      var scissors = $('.scissors')
      scissors.html('<i class="fas fa-hand-scissors"></i>')
      var choice1;
      var choice2;
      if (turn = 1){
        $('.option').on('click', function(){
          choice1 = $(this).attr('data-id');
          database.ref('players').child('one').update({
            choice: choice1
          })
          database.ref().update({
            turn : 2
          })
        });
      }
      if(turn = 2){
        choice2 = $(this).attr('data-id');
          database.ref('players').child('two').update({
            choice: choice2
          })
          database.ref().update({
            turn : 1
        })
      }

      

    },
    run : function(){
      database.ref().on("value",function(snapshot){
        if (snapshot.child('players').exists()){
          console.log(snapshot.val().players.one.name)
          name1 = snapshot.val().players.one.name;
          wins1 = snapshot.val().players.one.wins;
          losses1 = snapshot.val().players.one.losses;
          $('.name-one').text(name1);
          $('.win-loss-1').text("Wins: " + wins1 + " || Losses: " + losses1);
        }
        if (snapshot.child('players').child('two').exists()){
          console.log(snapshot.val().players.two.name)          
          name2 = snapshot.val().players.two.name;
          wins2 = snapshot.val().players.two.wins;
          losses2 = snapshot.val().players.two.losses;
          $('.name-two').text(name2);
          $('.win-loss-2').text("Wins: " + wins2 + " || Losses: " + losses2);
          game.functions.play();
          $('.player-inputs').hide();
          turn = snapshot.val().turn;
          console.log("turn: " + turn);
          
        }
        
      }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
      });
    },
    chat : function(){
      $('#chat-submit').on("click",function(){
        var comment = $('.chat-input').val().trim();
        console.log(comment)
        if(comment !== ""){
          database.ref('chat').push({
            message : comment,
          });
        }
      });
      database.ref('chat').on("child_added",function(childSnapshot){
        console.log(childSnapshot.val().message + "TEST")
        var message = childSnapshot.val().message;
        var row = $('<div></div>').text(message);
        $('.chat-box').append(row)
      });
    
      $('#clear-all').on("click",function(){
        database.ref().set({});
        location.reload();
      });
    }
  }
}

$(document).ready(function(){
  game.functions.run();
  game.functions.init();
  game.functions.chat();
  console.log(database.ref('turn').turn);
  // database.ref().update({
  //   chat: "",
  // })

  
  
  






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

