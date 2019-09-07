var buttonCoulours = ["red","blue","green","yellow"];
var gamePattern = [];
var level = 0;
var whichClick = 0;

//Randomly chooses a color and appends it to the gamePattern.
//Updates header to show the level and animates the gamePattern.
function nextSequence() {

    var randomNumber = Math.round(Math.random() * 3);
    var randomChosenColor = buttonCoulours[randomNumber];

    gamePattern.push(randomChosenColor);
    
    level++;
    
    $("h1").text("Level " + level);
    
    
    //Light & Sound
    $("." + randomChosenColor).animate({
        opacity: 0.5
    }, 100, function () {
    $("." + randomChosenColor).animate({
            opacity: 1
        });
    });
    whichSound(randomChosenColor);
    clickCheck();
}

//Finds out which sound to play.
function whichSound(color){
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

//runs the game?
function game(){
    gamePattern = [];
    level = 0;
    $(document).keydown(function() {
        nextSequence();
        $(document).off("keydown");
    });
    $(document).click(function(){
        nextSequence();
        $(document).off("click");
    });
    
}
//How does the game work?
//  simple: first you press a key to start. 
//    (done) The game then shows the first button. (it also plays a sound)
//     Then you click it -or miss and loose. (done)THe game makes a sound and animations when u click a button.
//     IF you get the sequence right, it procceds to the next stage, ELSE you loose and the memory is wiped.
//     Then it shows a new one.


function clickCheck(){
        $("div .btn").click(function() {
            //stop the listener jsut so i don't have the hassle of 'this' not being reset
            $("div .btn").off("click");

            var userChosenColor = this.id;
            if(userChosenColor == gamePattern[whichClick] ){
                
                //Light & Sound
                $("." + userChosenColor).toggleClass("pressed");
                setTimeout(function () {
                    $("." + userChosenColor).toggleClass("pressed");
                }, 100);
                whichSound(userChosenColor);
                setTimeout(whoYouGonnaCall,200);
            }
            else{

                //Light & Sound for the WRONG animation(just in case u get anything wrong)
                $("." + userChosenColor).toggleClass("pressed");
                setTimeout(function () {
                    $("." + userChosenColor).toggleClass("pressed");
                }, 100);

                $("body").toggleClass("game-over");
                setTimeout(function (){
                    $("body").toggleClass("game-over");
                },250);

                var wrong = new Audio("sounds/wrong.mp3");
                wrong.play();

                $("h1").text("WRONG! Press any key to try again...");
                game();
                // allow for keyboard to restart the game, also clear the gamePattern and level vars

            }
        });
    
}

function whoYouGonnaCall(){
    // GHOSTBUSTERS!
    //This functions figures out how many clicks need to be logged and when to call nextSequence.
    if((whichClick + 1)== gamePattern.length){
        whichClick = 0;
        setTimeout(nextSequence,1000);
    }
    else{
        whichClick++;
        clickCheck();
    }
}

game();
