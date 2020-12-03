/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, lastRoll, target;

function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    //reset round score
    hideDice();

    for(i=0; i<2; i++){
        document.getElementById('current-'+i).textContent = '0';
        document.querySelector('.player-'+i+'-panel').classList.toggle('active');
    }
}

function hideDice(){
    var die = document.getElementsByClassName('dice');
    for(i=0; i<2; i++){
        die[i].style.display = 'none';
    }
    roundScore = 0;
    lastRoll = 0;
}

function init() {
    scores = [0,0];
    activePlayer = 0;
    gamePlaying = true;
    target = document.querySelector('.set-score').value; 
    
    hideDice();

    for(i=0; i<2; i++){
        document.getElementById('score-'+i).textContent = '0';
        document.getElementById('current-'+i).textContent = '0';
        document.querySelector('.player-' + i + '-panel').classList.remove('winner');
        document.querySelector('#name-' + i).textContent = 'Player ' + (i+1);
    }

    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
    }

init();

document.querySelector('.btn-roll').addEventListener('click', function(){
    if (gamePlaying) {

        for (i=0; i<2; i++){
            //1. random number
            var dice = Math.floor(Math.random() * 6) + 1;
            console.log(dice)
            //2. Display the result
            var diceDOM = document.getElementsByClassName('dice');
            diceDOM[i].style.display = 'block';
            diceDOM[i].src = 'dice-' + dice + '.png';
        
            //3. Update the round score if the rolled number was not a 1
            if (dice === 6 && lastRoll === 6){
                scores[activePlayer] = 0;
                document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
                lastRoll=0;
                nextPlayer();
            } else if (dice !== 1) {
                //add score
                roundScore += dice;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
                //Update lastRoll
                lastRoll = dice;
            } else {
                nextPlayer();
            }
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gamePlaying){
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        //update the UI
        document.querySelector('#score-' + activePlayer).textContent=scores[activePlayer];
    
        //Check if player won the game
        if (scores[activePlayer] >= target){
            gamePlaying=false;
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            hideDice();
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        } else {
            nextPlayer();
        }
    }

});

document.querySelector('.btn-new').addEventListener('click', init);