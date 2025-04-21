const result = document.querySelector('.result');
const aside = document.querySelector('.sidebar');
const coinFlip = document.querySelector('.coin');
let coinCount = [];

function Play(randomizer){
    const head = document.querySelector('.headsCoin');
    const tail = document.querySelector('.tailsCoin');

    coinFlip.classList.add('pause');
    result.classList.remove('fadeIn');
    result.classList.add('fadeOut');

    if (randomizer >= 1/2){
        TimeOut('Tails', 
            document.querySelector('.Tails'), 
            document.querySelector('.Heads'),
            tail, head,
            '<img class="sideCoin" src="images/Tails.png" alt="">');
    }
    else{
        TimeOut('Heads', 
            document.querySelector('.Heads'), 
            document.querySelector('.Tails'),
            head, tail,
            '<img class="sideCoin" src="images/Heads.png" alt="">');
    }
}   

function TimeOut(CoinSideResult, SetSide1, SetSide2, ClassList1, ClassList2, image){
    let animationStatus;
    let Intervalid;
    let isFlipped = false;
    let setTime;

    if (CoinSideResult === 'Tails' && ClassList2.classList.contains('closed') || 
    CoinSideResult === 'Heads' && ClassList2.classList.contains('closed')){
        if (coinFlip.classList.contains('SideSwap'))
            animationStatus = 'OptionSameSwap'
        else animationStatus = "OptionSame";
        coinFlip.classList.add(animationStatus);
        setTime = 187.5;
    }
    else{
        if (coinFlip.classList.contains('SideSwap'))
            animationStatus = 'OptionOppositeSwap'
        else animationStatus = "OptionOpposite";
        coinFlip.classList.add(animationStatus);
        setTime = 250;
    }

    Intervalid = setInterval(() =>{
        if (!isFlipped){
            if (!ClassList1.classList.contains('closed')){
                ClassList1.classList.add('closed');
                ClassList2.classList.remove('closed');
            }
            else{
                ClassList1.classList.remove('closed');
                ClassList2.classList.add('closed');
            }
            isFlipped = true;
        }
        else isFlipped = false;
    }, setTime)

    setTimeout(() => {
        result.innerHTML = CoinSideResult;
        result.classList.add('fadeIn');
        result.classList.remove('fadeOut');

        StreakCounter(SetSide1, SetSide2)

        if (!ClassList2.classList.contains('closed')){
            ClassList2.classList.add('closed');
            ClassList1.classList.remove('closed');
        }
        aside.innerHTML += image;
        clearInterval(Intervalid);

        if (animationStatus === 'OptionOpposite')
            coinFlip.classList.add('SideSwap')
        else if (animationStatus === 'OptionOppositeSwap')
            coinFlip.classList.remove('SideSwap');

        coinFlip.classList.remove(animationStatus);
        coinFlip.classList.remove('pause');
    }, 1600)
}

function StreakCounter(Coin, OppositeCoin){
    coinCount.push(result.innerText);
    Coin.innerHTML = '0';
    for (let i = 0; i < coinCount.length; i++){
        if (coinCount[i] === coinCount[i-1]){
            Coin.innerHTML = `${eval(Coin.innerText)+1}`;
        }
        else if (coinCount[i] !== coinCount[i-1] && i !== 0){
            coinCount.length = 0;
            coinCount.push(result.innerHTML);
            OppositeCoin.innerHTML = '0';
            Coin.innerHTML = '0';
        }
    }
}