  //Debug logging in  and 2app.js.Pretty much same code for 'x' and 'o'game.
    // Mouse function(s) to create hover effect for human.
const mousetable = Array.from(document.getElementsByClassName('box'));

// MouseOver & mouseOut for all spots
mousetable.forEach(box => {
    box.addEventListener('mouseover', myfunction1);
    box.addEventListener('mouseout', myfunction2); 
});

// Set the background image on mouseover
function myfunction1() {
    if (!this.classList.contains('boxComputer')) { 
        this.style.backgroundColor = '#FFA000'; //  boxHuman-color in CSS file
        this.style.backgroundImage = "url('img/o.svg')"; // boxHuman-image in CSS file

    }
}

// Get a table to play on [array]
const table = Array.from(document.querySelectorAll('.box'));
let currenP = 'x'; // AI starts
let moves = [];
let userInfo = document.getElementById("AI_info")
// Winning combinations
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


// Check if we got a winner
function checkWinner() {
    for (const combination of winningCombinations) {
        const classes = combination.map(index => table[index].className);
        if (classes.every(cls => cls.includes('boxHuman'))) {
            return 'Human wins!';
        } else if (classes.every(cls => cls.includes('boxComputer'))) {
            return 'AI beats Human.Restart ? ';
        }
    }
    return null; // No winner yet
}



// Minimax algorithm
function minimax(depth, isMaximizing) {
    const winner = checkWinner();
    if (winner) {
        return winner === 'Human wins!' ? -10 : 10;
    }
    if (moves.length === 9) {
        return 0; // Draw
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < table.length; i++) {
            if (!table[i].classList.contains('boxHuman') && !table[i].classList.contains('boxComputer')) {
                table[i].classList.add('boxComputer');
                moves.push(i);
                let score = minimax(depth + 1, false);
                table[i].classList.remove('boxComputer');
                moves.pop();
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < table.length; i++) {
            if (!table[i].classList.contains('boxHuman') && !table[i].classList.contains('boxComputer')) {
                table[i].classList.add('boxHuman');
                moves.push(i);
                let score = minimax(depth + 1, true);
                table[i].classList.remove('boxHuman');
                moves.pop();
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}
// Function to handle clicks
function myfunction(e) {
    // Need index of clicked box.
    const boxArr = Array.from(document.getElementsByClassName('box'));
    const index = boxArr.indexOf(e.target);

    // Click for adding player 'o' svg-image.
    if (currenP === 'o') {   
        table[index].classList.add('boxHuman');
        moves.push(index);
        
        // Check for a winner after the player's move
        const winner = checkWinner();
        if (winner) {
            setTimeout(() => {
                alert(winner + " Restart?");
                restart();
            }, 100);
            return; 
        }
               
        // Switch Current Player to AI
        currenP = 'x'; 
        makeAIMove(); 
    }
}

// Function for AI's move
function makeAIMove() {
 userInfo.innerText = "AI thinking...";
//Timout to prevent AI classsList to display on table on reload()..but appear after a sligtly delay.
   setTimeout(() => {
    console.log("AI move started,Timed out...");
    let bestScore = -Infinity;
    let bestMove;
    for (let i = 0; i < table.length; i++) {
        if (!table[i].classList.contains('boxHuman') && !table[i].classList.contains('boxComputer')) {
            table[i].classList.add('boxComputer');
            moves.push(i);
            let score = minimax(0, false);
            table[i].classList.remove('boxComputer');
            moves.pop();
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }

    // AI makes its move
    if (bestMove !== undefined) {
      console.log("AI is making a move at index:", bestMove);
        table[bestMove].classList.add('boxComputer');
        moves.push(bestMove);
       
    }

    currenP = 'o'; // 

    // After AI move, check for winn or draw
    checkGameState();
     }, 2500); // testing  1500 m/s  secound 
     // }, 500); 
}

// Function to check for a winner or draw
function checkGameState() {
    const winner = checkWinner();
    if (winner) {
        setTimeout(() => {
            alert(winner +  ".... Restart ?");
            restart(); 
        }, 200);
        return; 
    }
   /*
     // Check for a draw
        if (moves.length === 9) {
            setTimeout(() => {
                 userInfo.innerText = " "; 
                alert('Draw! Restart?');
                restart();
            }, 100);
        }
*/
}
table.forEach(box => {
    box.addEventListener('click', myfunction);
});

// Reset variables etc to deafult by go to main page.then this page reset by reload next time choosed. 
function restart() {
    window.location.href = 'index.html'; // and return to main paige
}

// When user choosed AI to start.
window.onload = function() {
    console.log("DOM fully loaded and parsed");
    makeAIMove();
};
