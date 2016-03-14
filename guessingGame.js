/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

var playersGuess;
    winningNumber = generateWinningNumber();
    guessArr = [];
    guessCounts = 0;
    timesLeft = 5;
/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
    return Math.floor(Math.random()*(100 - 1)) + 1;
}

// Fetch the Players Guess

function playersGuessSubmission(){
	// add code here
    
    playersGuess = parseInt($("#input").val());
    $("input").val("");
    checkGuess();
    playersGuess = 0;
    
    timesLeft --;
    if (timesLeft > 0){
        $("#timesLeft").text(timesLeft + " times left");
    }else{
        $("#timesLeft").text("sorry, try again!");
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
        }else{
        $("#msg").text("you just guessed the same number...");
        }
            
    guessArr.push(playersGuess);
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
    var hintArr = [];
    if (timesLeft === 5){
        while (hintArr.length <9){
            hintArr.push(Math.floor(Math.random()*(100 - 1)) + 1);
            hintArr.push(winningNumber);
        }
        $("#msg").text("the Winning Number is one of these 10: " + hintArr);
    }else if(timesLeft === 4){
        while (hintArr.length <7){
            hintArr.push(Math.floor(Math.random()*(100 - 1)) + 1);
            hintArr.push(winningNumber);
        }
        $("#msg").text("the Winning Number is one of these 8: " + hintArr);
    }else if(timesLeft === 3){
        while (hintArr.length <5){
            hintArr.push(Math.floor(Math.random()*(100 - 1)) + 1);
            hintArr.push(winningNumber);
        }
        $("#msg").text("the Winning Number is one of these 6: " + hintArr);
    }else if(timesLeft === 2){
        while (hintArr.length <3){
            hintArr.push(Math.floor(Math.random()*(100 - 1)) + 1);
            hintArr.push(winningNumber);
        }
        $("#msg").text("the Winning Number is one of these 4: " + hintArr);
    }else if(timesLeft === 1){
        while (hintArr.length <1){
            hintArr.push(Math.floor(Math.random()*(100 - 1)) + 1);
            hintArr.push(winningNumber);
        }
        $("#msg").text("the Winning Number is one of these 2: " + hintArr);
    }
    
}

// Allow the "Player" to Play Again

function playAgain(){
	// add code here
}


/* **** Event Listeners/Handlers ****  */

