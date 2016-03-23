/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

var playersGuess;
var winningNumber = generateRandomNumber();
var guessArr = [];
var guessCounts = 0;
var timesLeft = 5;
/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateRandomNumber(){
    return Math.floor(Math.random()*(100 - 1 +1)) + 1;
}


// input area hit Return key can also submit the answer
function hitReturnToSubmit(){
    $("#input").on(function(event){
        if (event.keyCode == 13){
            $("#submit").click();
        }
    })
}

// Fetch the Players Guess 
function playersGuessSubmission(){    
    playersGuess = parseInt($("#input").val());
    if (isNaN(playersGuess) ){
        alert("you must enter a number!");
    }   else {
        checkGuess();
    }

    $("input").val("");
    
}

// Check if the Player's Guess is the winning number 

function checkGuess(){
    if (playersGuess === winningNumber){
        window.location.replace("winnersPage.html");
    } else {
        guessMessage();
    }

    if (guessArr.indexOf(playersGuess) === -1){
        guessCounts++;
        guessArr.push(playersGuess);
        timesLeft--;
        guessMessage();
    } else {
        $("#msg").text("you just guessed the same number...");
    }
    
    if (timesLeft > 1){
        $("#timesLeft").text(timesLeft + " guesses left");
    } else if (timesLeft === 1){
        $("#timesLeft").text(timesLeft + " guess left");
    } else{
        $("#submit").attr("disabled", "disabled");
        $("input").attr("disabled", "disabled");
        window.location.replace("losersPage.html"); 
    }
            
    $("#guessedArr").text("Numbers you've entered: " + guessArr);
}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(){
    if (playersGuess < winningNumber){
        return "lower";
    } else {
        return "higher";  
    } 
}

function guessMessage(){
    var distance = Math.abs(playersGuess - winningNumber);
    var digit;
    if (distance <= 5){
        digit = 5;
    } else if (distance >5 && distance <=10){
        digit = 10;
    } else if (distance > 10 && distance <=15){
        digit = 15;
    } else {
        digit = 20;
    }
    
    if (digit < 20){
        $("#msg").text("Your guess is " + lowerOrHigher() + " and within " + digit + " digits away from the Winning Number!");
    } else {
        $("#msg").text("Your guess is " + lowerOrHigher() + " and more than 20 digits away from the Winning Number!");        
    }
}


// Create a provide hint button that provides additional clues to the "Player"
function generateHintArr(num){
    var hintArr = [];
    var notWinningNum = generateRandomNumber();
    hintArr.push(winningNumber);
    while (hintArr.length < num){
        if (hintArr.indexOf(notWinningNum) === -1){
                hintArr.push(notWinningNum);
        } else {
                notWinningNum = generateRandomNumber();
        }
    }
    return hintArr.sort(function(a,b){
        return a-b;
    })
}

function generateHintMsg(num){
    $("#msg").text("the Winning Number is one of these " + num + ": " + generateHintArr(num));
}

function provideHint(){
    generateHintMsg(timesLeft*2);
    $("#hint").removeAttr("onclick");   
}

// Allow the "Player" to Play Again

function playAgain(){
    window.location.replace("Index.html");
}


/* **** Event Listeners/Handlers ****  */

// input area
$(document).ready(function(){
    $("input").data("holder", $("input").attr("placeholder"));
    $("input").focusin(function(){
        $(this).attr("placeholder", "");
    });
    $("input").focusout(function(){
        $(this).attr("placeholder", $(this).data("holder"));
    });
    
    $("input").on("keyup", function(event){
        if (event.keyCode === 13) {
            playersGuessSubmission();
        }
    })
});
