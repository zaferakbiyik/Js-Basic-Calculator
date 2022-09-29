const display = document.querySelector('.calculator-input');
const keys = document.querySelector('.calculator-keys');

let displayValue = '0';
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

updateDisplay();

function updateDisplay(){
    display.value = displayValue;
}

keys.addEventListener('click', function (e){
    const element = e.target;
    if (!element.matches('button')) return;
    if(element.classList.contains('operator')) {
        //console.log('operator', element.value);
        handleOperator(element.value);
        updateDisplay();
        return;
    }

    if(element.classList.contains('decimal')) {
       // console.log('decimal', element.value);
        inputDecimal(element.value);
        updateDisplay();
        return;
    }
    if(element.classList.contains('clear')) {
        clear();
        updateDisplay();
        //console.log('clear', element.value);
        return;
    }


   //console.log('number', element.value);
    inputNumber(element.value);
    updateDisplay();
});


/*
// if we wanna to make clear code...

keys.addEventListener('click', function (e){
    const element = e.target;
    const value = element.value;
    if (!element.matches('button')) return;
    switch (value){
        case'+':
        case'-':
        case'*':
        case'/':
        case'=':
            handleOperator(value)
            break;
        case '.':
            inputDecimal()
            break;
        case 'clear':
            clear;
            break;
        default:
            inputNumber(element.value);
    }
    updateDisplay();
});

*/

function handleOperator(nextoperator){
 const value = parseFloat(displayValue);
 if(operator && waitingForSecondValue){
     operator = nextoperator;
     return;
 }
 if(firstValue == null){
     firstValue = value;
 } else if(operator){
     const result = calculate(firstValue, value, operator);

     displayValue =parseFloat(result.toFixed(7));
     firstValue = result;
 }

 waitingForSecondValue = true;
 operator = nextoperator;
 //console.log(displayValue, firstValue, operator, waitingForSecondValue);

}
function calculate(first, second, operator){
    if(operator === '+'){
        return first + second;
    } else if(operator === '-'){
        return first - second;
    } else if(operator === '*'){
        return first * second;
    } else if(operator === '/'){
        return first / second;
    }

}


function inputNumber(num){
    if(waitingForSecondValue){
        displayValue = num;
        waitingForSecondValue = false;
    } else {
        displayValue = displayValue ==='0'? num: displayValue + num;
    }
    //console.log(displayValue, firstValue, operator, waitingForSecondValue);
}

function inputDecimal(){
    if(!displayValue.includes('.')){
        displayValue += '.';
    }
}

function clear(){
    displayValue = '0';
    firstValue = null;
    waitingForSecondValue = false;
}