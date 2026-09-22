let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset-button");
let newgame = document.querySelector("#new-button");
let msgContainer = document.querySelector("#message-container");
let msg = document.querySelector("#msg");
let player1=document.querySelector("#p1");
let play1=1;
let player2=document.querySelector("#p2");
let play2=1;
let count=0;

//Conditions of winning game
let winningPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

//Event to click the button and add text in the buttons(X/O)
let player = true;
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (player === true) {
      box.innerText = "X";
      player = false;
    } else {
      box.innerText = "O";
      player = true;
    }
    count=count+1;
    box.disabled = true;
    winnerCheck();
    
  });
});

//Function to draw the game
const showDraw = () => {
    msg.innerText = "Game Draw!";
    msgContainer.style.display = "flex";
};

//Function to reset the game fully and also used for new game to play
const resetGame=()=>{
    player=true;
    EnabledButtons();
    msgContainer.style.display="none";
};

//Function for Disabling buttons after winning the game
const DisabledButtons=()=>{
    for (let box of boxes){
        box.disabled =true;
    }
};

//Function to enable the buttons when reset button is clicked
const EnabledButtons=()=>{
    for (let box of boxes){
        box.disabled =false;
        box.innerText="";

    }
};

//Function to show the winner
const showWinner = (winner) => {
  msg.innerText = "Congratulations " + winner + " is the winner";
  msgContainer.style.display = "flex";
};

//Function to check the winner and do all the main things(Main Function)
const winnerCheck = () => {

    for (let pattern of winningPatterns) {

        let pos1Value = boxes[pattern[0]].innerText;
        let pos2Value = boxes[pattern[1]].innerText;
        let pos3Value = boxes[pattern[2]].innerText;

        if (pos1Value != "" && pos2Value != "" && pos3Value != "") {

            if (pos1Value === pos2Value && pos2Value === pos3Value) {

                showWinner(pos1Value);
                DisabledButtons();

                if (pos1Value === "X") {
                    player1.innerText = play1;
                    play1 = play1 + 1;
                }
                else if (pos1Value === "O") {
                    player2.innerText = play2;
                    play2 = play2 + 1;
                }

                return;
            }
        }
    }

    // If nobody won and all 9 boxes are filled
    if (count == 9) {
        console.log("Game Draw");
        showDraw();
        DisabledButtons();
    }
};


//use event to initilize the new game function and than the game will be start from the beginning
newgame.addEventListener("click", resetGame); 

//use event to initilize the reset function and than the game will be start from the beginning
reset.addEventListener("click", resetGame)