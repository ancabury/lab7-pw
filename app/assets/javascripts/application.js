//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

var move = 0; //see if X player or O player
var canPlay = 0; //game over
var winner = 0; //we don't have a winner yet
var starter = 1; //user

window.onload = function() { //decide who starts
  var rand = Math.random();
  console.log(rand);
  if (rand < 0.5) { //computer starts
    starter = 0; //computer
    generateMove('X');
  }
}

function generateMove(str){
  var set = false;
  while (!set){
    var i = 0;
    var position = Math.floor((Math.random() * 9) + 0);
    $("td").each(function(){
      if (i == position)
        if ($(this).text() == ''){
          $(this).text(str);
          move++;
          set = true;
        }
      i++;
    });
  }
}

$(document).ready(function() {
  $('td').click(function(){
    if ($(this).text() == "" && winner == 0){
      if(move % 2 == 0){
        $(this).text('X');
        generateMove('0')
      }
      else{
        $(this).text('0');
        generateMove('X')
      }
      move++;
    }
    canPlay = 0;
    checkState();
    });

  function checkState(){
    checkWinner();
    isFull();
    // console.log(canPlay + " "+ winner);
    if (canPlay == 0 || winner == 1){
      console.log("Full or Winner");
      //show modal with winner/looser/tie
      canPlay = 1;
    }
  }

  function isFull(){
    $('td').each(function(){
      if($(this).text() == "")
        canPlay = 1;
    })
  }

  function checkWinner(){
      //check lines
      $('tr').each(function(){
        var cells = $(this).children().text();
        if(winner == 0 && cells[0] == cells[1] && cells[1] == cells[2] && typeof cells[0] !== "undefined"){
          console.log(cells[0] + " WINS !");
          $('#show_result').text(cells[0] + " WINS !");
          winner = 1;
        }
      });
      //check column & diagonals
      checkColumn();
      checkDiagonal();
    }

    function checkColumn(){
      var col = $('tr>td:nth-child(1)').text();
      if(winner == 0 && col[0] == col[1] && col[1] == col[2] && typeof col[0] !== "undefined"){
        console.log(col[0] + " WINS !");
        $('#show_result').text(col[0] + " WINS !");
        winner = 1;
      }
      var col = $('tr>td:nth-child(2)').text();
      if(winner == 0 && col[0] == col[1] && col[1] == col[2] && typeof col[0] !== "undefined"){
        console.log(col[0] + " WINS !");
        $('#show_result').text(col[0] + " WINS !");
        winner = 1;
      }
      var col = $('tr>td:nth-child(3)').text();
      if(winner == 0 && col[0] == col[1] && col[1] == col[2] && typeof col[0] !== "undefined"){
        console.log(col[0] + " WINS !");
        $('#show_result').text(col[0] + " WINS !");
        winner = 1;
      }
    }

    function checkDiagonal(){
      var cells = $('tr').children();
      var cell1 = cells[0].innerHTML;
      var cell2 = cells[2].innerHTML;
      var cell3 = cells[4].innerHTML;
      var cell4 = cells[6].innerHTML;
      var cell5 = cells[8].innerHTML;
      // console.log(cell1+"/"+cell3+"/"+cell5);
      if (winner == 0 && cell1 == cell3 && cell1 == cell5 && cell1 != ""){
        console.log(cell1 + " WINS !");
        $('#show_result').text(cell1 + " WINS !");
        winner = 1;
      }
      if (winner == 0 && cell2 == cell3 && cell2 == cell4 && cell2 != ""){
        console.log(cell2 + " WINS !");
        $('#show_result').text(cell2 + " WINS !");
        winner = 1;
      }
    }
});
