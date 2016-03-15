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

// Fetch the Players Guess

function playersGuessSubmission(){    
    playersGuess = parseInt($("#input").val());
    $("input").val("");
    checkGuess();
    playersGuess = 0;

    if (timesLeft > 0){
        $("#timesLeft").text(timesLeft + " times left");
    }else{
        $("#timesLeft").text("sorry, try again!");
        $("#submit").attr("disabled", "disabled");
    }
    
}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(){
    var distance = Math.abs(playersGuess - winningNumber);
    var digit;
    if (distance <= 5){
        digit = 5;
    }else if (distance >5 && distance <=10){
        digit = 10;
    }else if (distance > 10 && distance <=15){
        digit = 15;
    }else{
        digit = 20;
    }
    
    if(playersGuess > winningNumber){
        if(digit < 20){
            $("#msg").text("Your guess is higher and within " + digit + " digits away from the Winning Number!")
        }else{
            $("#msg").text("Your guess is higher and more than " + digit + " digits away from the Winning Number!")
        }
    }else{
        if(digit < 20){
            $("#msg").text("Your guess is lower and within " + digit + " digits away from the Winning Number!")
        }else{
            $("#msg").text("Your guess is lower and less than " + digit + " digits away from the Winning Number!")
        }   
    }
}


// Check if the Player's Guess is the winning number 

function checkGuess(){
    if (playersGuess === winningNumber){
        $("#msg").text("Awesome Guess! You Won!");
        }else{
        lowerOrHigher();
        }

    if (guessArr.indexOf(playersGuess) === -1){
        guessCounts++;
        timesLeft--;
        }else{
        $("#msg").text("you just guessed the same number...");
        }
            
    guessArr.push(playersGuess);
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
    
}

// Allow the "Player" to Play Again

function playAgain(){
    playersGuess = 0;
    winningNumber = generateWinningNumber();
    guessArr = [];
    guessCounts = 0;
    timesLeft = 5;
    $("#msg").text("");
    $("#timesLeft").text("5 times left");
    $("#submit").removeAttr("disabled");
}


/* **** Event Listeners/Handlers ****  */

