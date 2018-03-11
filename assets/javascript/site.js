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
          
var game = {
  variables : {
    name1 : "",
    wins1 : 0,
    losses1 : 0,
    name2 : "",
    wins2 : 0,
    losses2 : 0,
    choice1 : "",
    choice2 : "",
  },
  functions : {
    init: function(){
      $('#name-submit').on("click", function() {
        var name = $('#name-input').val().trim();    
        if (game.variables.name1 === ""){
          game.variables.name1 = name;
          $('#name-input').hide();
          $('#name-submit').hide();
          database.ref().set({
            chat: "",
            players: {
              one : {
                name:game.variables.name1,
                choice: '',                
                wins:0,
                losses:0
              }
            },
          });
          $('.rock1').html('<i class="fas fa-hand-rock"></i>');
          $('.paper1').html('<i class="fas fa-hand-paper"></i>');
          $('.scissors1').html('<i class="fas fa-hand-scissors"></i>');
          
        } else if (game.variables.name2 === "") {
          game.variables.name2 = name;
          $('#name-input').hide();
          $('#name-submit').hide();
          database.ref('players').update({
              two : {
                name:game.variables.name2,
                choice: '',
                wins:0,
                losses:0
            },
          });
          database.ref().update({
            turn : 1,
          })
          $('.rock2').html('<i class="fas fa-hand-rock"></i>');
          $('.paper2').html('<i class="fas fa-hand-paper"></i>');
          $('.scissors2').html('<i class="fas fa-hand-scissors"></i>');
        }
        $('#name-input').val("");
      });
    },
    run : function(){
      database.ref().on("value",function(snapshot){
        if (snapshot.child('players').exists()){
          console.log(snapshot.val().players.one.name)
          game.variables.name1 = snapshot.val().players.one.name;
          game.variables.wins1 = snapshot.val().players.one.wins;
          game.variables.losses1 = snapshot.val().players.one.losses;
          $('.name-one').text(game.variables.name1);
          $('.win-loss-1').text("Wins: " + game.variables.wins1 + " || Losses: " + game.variables.losses1);
        }
        if (snapshot.child('players').child('two').exists()){
          console.log(snapshot.val().players.two.name)          
          game.variables.name2 = snapshot.val().players.two.name;
          game.variables.wins2 = snapshot.val().players.two.wins;
          game.variables.losses2 = snapshot.val().players.two.losses;
          $('.name-two').text(game.variables.name2);
          $('.win-loss-2').text("Wins: " + game.variables.wins2 + " || Losses: " + game.variables.losses2);
          $('.player-inputs').hide();
          }

          if (snapshot.child('players').child('one').exists() && snapshot.child('players').child('two').exists()){
            var turn = snapshot.val().turn; 
            $('.whos-turn').text('Player ' + turn.toString() + "'s turn!");
            
          console.log("turn: " + turn);

          if(turn === 1){
            $('.option1').on('click', function(){
              game.variables.choice1 = $(this).attr('data-id');
              console.log(game.variables.choice1)     
              database.ref('players').child('one').update({
                choice: game.variables.choice1
              })
              database.ref().update({
                turn : 2
              })
              $('.option1').off("click");  
            })
          }

          if(turn === 2){
            $('.option2').on('click', function(){
              game.variables.choice2 = $(this).attr('data-id');
              console.log(game.variables.choice2)
              database.ref('players').child('two').update({
                choice: game.variables.choice2
              })
              database.ref().update({
                turn : 1
              })    
              $('.option2').off("click");              
            })
          }
          game.variables.choice1 = snapshot.val().players.one.choice
          game.variables.choice2 = snapshot.val().players.two.choice

          if(snapshot.val().players.one.choice !== "" && snapshot.val().players.two.choice !== ""){
            game.functions.compare();
          }
        }  
    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
      });
    },
    compare : function(){
      if (game.variables.choice1 === 'rock'){
        if (game.variables.choice2 === 'paper'){
          game.variables.choice1 = "";
          game.variables.choice2 = "";
          database.ref('players').child('one').update({
            choice : "",
            losses : game.variables.losses1 + 1
          })
          database.ref('players').child('two').update({
            choice: "",
            wins : game.variables.wins2 + 1
          })
          $('.announcement').text('Player 2 Wins');
          
        } else if (game.variables.choice2 === 'scissors') {
          game.variables.choice1 = "";
          game.variables.choice2 = "";
          database.ref('players').child('one').update({
            choice : "",            
            wins : game.variables.wins1 + 1
          })
          database.ref('players').child('two').update({
            choice : "",            
            losses : game.variables.losses2 + 1
          })
          $('.announcement').text('Player 1 Wins');
          
        } else {
          game.variables.choice1 = "";
          game.variables.choice2 = "";
          database.ref('players').child('one').update({
            choice : "",            
          })
          database.ref('players').child('two').update({
            choice : "",            
          })
          $('.announcement').html('<h1>Tie!</h1>')          
        
        }

      } else if (game.variables.choice1 === 'paper'){
        if (game.variables.choice2 === 'scissors'){
          game.variables.choice1 = "";
          game.variables.choice2 = "";
          database.ref('players').child('one').update({
            choice : "",            
            losses : game.variables.losses1 + 1
          })
          database.ref('players').child('two').update({
            choice : "",            
            wins : game.variables.wins2 + 1
          })
          $('.announcement').text('Player 2 Wins');        
        } else if (game.variables.choice2 === 'rock') {
          game.variables.choice1 = "";
          game.variables.choice2 = "";
          database.ref('players').child('one').update({
            choice : "",            
            wins : game.variables.wins1 + 1
          })
          database.ref('players').child('two').update({
            choice : "",            
            losses : game.variables.losses2 + 1
          })
          $('.announcement').text('Player 1 Wins');
          
          
        } else {
          game.variables.choice1 = "";
          game.variables.choice2 = "";
          database.ref('players').child('one').update({
            choice : "",            
          })
          database.ref('players').child('two').update({
            choice : "",            
          })
          game.variables.choice1 = "";
          game.variables.choice2 = "";
          $('.announcement').html('<h1>Tie!</h1>')
          
        }
        
      } else if (game.variables.choice1 === 'scissors'){
        if (game.variables.choice2 === 'rock'){
          game.variables.choice1 = "";
          game.variables.choice2 = "";
          database.ref('players').child('one').update({
            choice : "",            
            losses : game.variables.losses1 + 1
          })
          database.ref('players').child('two').update({
            choice : "",            
            wins : game.variables.wins2 + 1
          })
          $('.announcement').text('Player 2 Wins');          
        } else if (game.variables.choice2 === 'paper') {
          game.variables.choice1 = "";
          game.variables.choice2 = "";
          database.ref('players').child('one').update({
            choice : "",            
            wins : game.variables.wins1 + 1
          })
          database.ref('players').child('two').update({
            choice : "",            
            losses : game.variables.losses2 + 1
          })
          $('.announcement').text('Player 1 Wins');
          

        } else {
          game.variables.choice1 = "";
          game.variables.choice2 = "";
          database.ref('players').child('one').update({
            choice : "",            
          })
          database.ref('players').child('two').update({
            choice : "",            
          })
          game.variables.choice1 = "";
          game.variables.choice2 = "";
          $('.announcement').html('<h1>Tie!</h1>')
          
        }
        
      }
    },
    disconnect : function(){
      database.ref().on("value",function(snapshot){
        database.ref().onDisconnect().set({
        
        });
        
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
  game.functions.disconnect();
})