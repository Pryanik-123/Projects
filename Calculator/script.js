const result = document.querySelector('.result');
const prompt = document.querySelector('.calculation');
const history = document.querySelector('.aside');
let chars = [];

function AddSymbol(symbol){
    chars.push(symbol);
    resultCheck();
    prompt.innerHTML += chars[chars.length-1].toString('');
    CalculationCheck();
}

function RemoveSymbol(){
    chars.splice(chars.length-1, 1);
    resultCheck();
    prompt.innerHTML = chars.join('');
    CalculationCheck();
    if (chars.length === 0){
        blockingButtons(false);
    }
}

function ResetPrompt(string1, string2, isResulted){
    prompt.innerHTML = string1;
    result.innerHTML = string2;
    prompt.className = "calculation top";
    result.className = "result bottom";
    blockingButtons(false);
    if (!isResulted)
        chars.splice(0, chars.length);
}

function Count(){
    let html;
    if (String(`${prompt.innerText}=${result.innerHTML}`).length <= 19)
        html = `<p class="asidePrompt fadeIn"> ${prompt.innerText}=${result.innerHTML} </p>`
    else html = '<p class="asidePrompt fadeIn"> Not Enough Space :p </p>';
    
    prompt.className = "calculation bottom";
    result.className = "result top";
    history.innerHTML += html;
    chars = result.innerText.split("");
}

function CalculationCheck(){
    let isFloat;
    let multiply = 100;

    if (chars.length > 23 && chars.length <= 47){
        document.documentElement.style.setProperty('--fs-calc', '0.75rem');
    }
    else if (chars.length > 47 && chars.length <= 100){
        document.documentElement.style.setProperty('--fs-calc', '0.35rem');
        blockingButtons(false);
    }
    else if (chars.length > 100){
        document.documentElement.style.setProperty('--fs-calc', '1.5rem');
        prompt.innerHTML = "Mucho Texto";
        blockingButtons(true);
    }
    else document.documentElement.style.setProperty('--fs-calc', '1.5rem');

    for (let i = 0; i < chars.length; i++){
        if (chars[i] === '0' && chars[i-1] === '/' && !isFinite(eval(chars.join("")))){
            result.innerHTML = 'Cannot Divide By 0';
            return;
        }

        if (['/','+',"*","-","."].includes(chars[i]) || result.innerText === 'Infinity'){
            blockingButtons(true);
        }
        else{
            blockingButtons(false);
        }

        if (chars[i] === '.'){
            isFloat = true;
            for (let i2 = i+1; i2 < chars.length; i2++){
                if (!['/','+',"*","-"].includes(chars[i2]) && isFloat){
                    multiply *= 10;
                }
                else isFloat = false;
            }
        }
    }

    if (chars.length === 0) 
        result.innerHTML = '';
    else try{
        result.innerHTML = Math.round(eval(prompt.innerText) * multiply) / multiply;
    } catch {}
}

function resultCheck(){
    if (result.className === "result top"){
        ResetPrompt(`${result.innerText}`, `${result.innerText}`, true);
    }
}

function blockingButtons(isBlocked){
    const buts = document.querySelectorAll('.problem');

    if (isBlocked){
        buts.forEach((value) => {
            value.classList.add('block');
            value.classList.remove('unblock');
        })
        if (chars[chars.length-1] === '.'){
            document.querySelector('.point').classList.add('block');
            document.querySelector('.point').classList.remove('unblock');
        }
    }
    else{
        buts.forEach((value) => {
            value.classList.remove('block');
            value.classList.add('unblock');
        })
        if (document.querySelector('.point').classList.contains('block')){
            document.querySelector('.point').classList.add('unblock');
            document.querySelector('.point').classList.remove('block');
        }
    }
}

function HistoryReset(){
    history.innerHTML = '';
}