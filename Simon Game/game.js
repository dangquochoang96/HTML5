const buttonColours = ["red", "blue", "green", "yellow"];  //1.3 At the top of the game.js file, create a new array called buttonColours and set it to hold the sequence "red", "blue", "green", "yellow" .
const gamePattern = [];  //1.5 At the top of the game.js file, create a new empty array called gamePattern.
let userClickedPattern = [];  //3.3 At the top of the game.js file, create a new empty array with the name userClickedPattern.
let started = false;  //7.1b You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
let level = 0;  //6.2 Create a new variable called level and start at level 0.

$(document).keypress(function(){  //6.1 Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
  if(!started){
    //6.3 The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level); 
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentLevel){  //7.1a Create a new function called checkAnswer(), it should take one input with the name currentLevel
//7.3 Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");
    if(userClickedPattern.length === gamePattern.length){  //7.4 If the user got the most recent answer right in step 7.3, then check that they have finished their sequence with another if statement.
    //7.5 Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function(){
        nextSequence();
      }, 1000);
    } 
  } else{
    console.log("wrong");
    playSound("wrong");  //8.1 In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
    //8.2 In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");  //8.3 Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
    startOver();  //9.2 Call startOver() if the user gets the sequence wrong.
  }
}

function nextSequence() {  //1.1 Inside game.js create a new function called nextSequence()
  userClickedPattern = [];  //7.6 Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  level++;  //6.4 Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
  $("#level-title").text("Level " + level);  //6.5 Inside nextSequence(), update the h1 with this change in the value of level.
  const randomNumber = Math.floor(Math.random() * 4);  //1.2 Inside the new function generate a new random number between 0 and 3, and store it in a variable called randomNumber
  const randomChosenColour = buttonColours[randomNumber];  //1.4 Create a new variable called randomChosenColour and use the randomNumber from step 1.2 to select a random colour from the buttonColours array.
  gamePattern.push(randomChosenColour);  //1.6 Add the new randomChosenColour generated in step 1.4 to the end of the gamePattern.
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);  //2.1 Use jQuery to select the button with the same id as the randomChosenColour and animate a flash to the button selected in step 1
  playSound(randomChosenColour);  //4.4 Refactor the code in playSound() so that it will work for both playing sound in nextSequence() and when the user clicks a button.
};

$(".btn").click(function(){  //3.1 Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
  const userChosenColour = $(this).attr("id");  //3.2 Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
  userClickedPattern.push(userChosenColour);  //3.4 Add the contents of the variable userChosenColour created in step 3.2 to the end of this new userClickedPattern
  playSound(userChosenColour);  //4.1 In the same way we played sound in nextSequence() , when a user clicks on a button, the corresponding sound should be played. 
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);  //7.2 Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
});

function playSound(name){  //4.2 Create a new function called playSound() that takes a single input parameter called name.
  //4.3 Take the code we used to play sound in the nextSequence() function (2.2 use Javascript to play the sound for the button colour selected in step 2.1) and move it to playSound().
    const audio = new Audio("sounds/" + name + ".mp3"); 
    audio.play();
};

function animatePress(currentColour){  //5.1 Create a new function called animatePress(), it should take a single input parameter called currentColour.
  $("#" + currentColour).addClass("pressed");  //5.3 Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
  //5.4 figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 100); 
}
function startOver(){  //9.1Create a new function called startOver().
  //9.3 Inside this function, you'll need to reset the values of level, gamePattern and started variables.
  level = 0;
  gamePattern = [];
  started = false;
}