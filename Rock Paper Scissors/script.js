let gameResult = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    loses: 0,
    ties: 0
}; 
let autoplay = false;
let AutoResult;


function picker(playerMove){
    const PopUp = document.querySelector('.popUp');
    const Panel = document.querySelector('.panel');
    let computerMove = randomize();
    let result = '';
    emojiMove = (move) => {
        if (move === 'rock')
            return '🪨'
        else if (move === 'scissors')
            return '✂️'
        else if (move === 'paper')
            return '📄'
    };

    if(computerMove === playerMove) {
        result='Tie';
        gameResult.ties++
    }
    else if (computerMove === 'rock' && playerMove === 'scissors'
        || computerMove === 'paper' && playerMove === 'rock'
        || computerMove === 'scissors' && playerMove === 'paper'){
        result='Loss';
        gameResult.loses++
    }
    else{
        result = 'Win';
        gameResult.wins++;
    }

    if (!autoplay){
        document.querySelector('.versus').innerHTML = `${emojiMove(playerMove)} VS ${emojiMove(computerMove)}`;

        localStorage.setItem('score', JSON.stringify(gameResult));

        document.querySelector('.result').innerHTML = `You picked ${playerMove}, Computer picked ${computerMove} <br> ${result} <br>
            Wins: ${gameResult.wins}; Loses: ${gameResult.loses}; Ties: ${gameResult.ties}`; 

        if (PopUp.classList.contains('isClosed'))
            PopUp.classList.remove('isClosed');

        PopUp.classList.add('openPopUp');
        PopUp.classList.remove('closedPopUp');

        Panel.classList.add('openPanel');
        Panel.classList.remove('closedPanel');
    }
    else{
        localStorage.setItem('score', JSON.stringify(gameResult));
        document.querySelector('.scoreStat').innerHTML = `${emojiMove(playerMove)} VS ${emojiMove(computerMove)} <br> W: ${gameResult.wins}; L: ${gameResult.loses}; T: ${gameResult.ties}`;
    }
}

function closePopUp(){
    const PopUp = document.querySelector('.popUp');
    const Panel = document.querySelector('.panel');

    PopUp.classList.add('closedPopUp');
    PopUp.classList.remove('openPopUp');

    Panel.classList.remove('openPanel');
    Panel.classList.add('closedPanel');
    setTimeout(() => {
        Panel.classList.remove('closedPanel');
        PopUp.classList.remove('closedPopUp');
        
        PopUp.classList.add('isClosed');
    }, 350);
}

function randomize(){
    let rand = Math.random();

    if (rand >= 0 && rand < 1/3) return 'rock';
    else if (rand >= 1/3 && rand < 2/3) return 'paper';
    else return 'scissors';
}

function Reset(){
    const scoreBut = document.querySelector('.scoreStat');

    gameResult.loses = 0;
    gameResult.wins = 0;
    gameResult.ties = 0;

    localStorage.removeItem('score');

    if (!autoplay){
        scoreBut.innerHTML = "The Score Has Been Reset";

        if (scoreBut.classList.contains('ignored') && !scoreBut.classList.contains('unignored')){
            scoreBut.classList.add('unignored');
            setTimeout(() => scoreBut.classList.remove('unignored'), 1250);
        }
    }
}

document.querySelector('.autoPlay').addEventListener('click', () => {
    const Stat = document.querySelector('.scoreStat');

    if (Stat.classList.contains('ignored')){
        document.querySelectorAll('.pick').forEach((value) => {value.classList.add('blocked')});
        Stat.classList.remove('ignored');
        Stat.classList.add('auto-play-on');
        autoplay = true;
        AutoResult = setInterval(() => {
            picker(randomize()); 
        }, 500)
        picker(randomize()); 
    }
    else{
        clearInterval(AutoResult);
        document.querySelectorAll('.pick').forEach((value) => {value.classList.remove('blocked')});
        AutoResult = null;
        Stat.classList.remove('auto-play-on');
        autoplay = false;

        Stat.classList.add('auto-play-off');
        setTimeout(() => {
            Stat.classList.add('ignored');
            Stat.innerHTML = 'Hello World';
            Stat.classList.remove('auto-play-off');
        }, 200)
    }
})