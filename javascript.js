let currentOperator = null;
let firstOperand    = '';
let secondOperand   = '';
let displayValue    = '0';


const displayDiv = document.getElementById('display');

const numberButtons   = document.querySelectorAll('.operand');
const operatorButtons = document.querySelectorAll('.operator');
const functionButtons = document.querySelectorAll('.function');

numberButtons.forEach((button) =>
    button.addEventListener('click', () => handleOperand(button.value))
);

operatorButtons.forEach((button) => 
    button.addEventListener('click', () => handleOperator(button.value))
);

functionButtons.forEach((button) =>
    button.addEventListener('click', () => handleFunction(button.value))
);

updateDisplay(displayValue);

function updateDisplay(string){
    displayDiv.textContent = string;
}



function handleOperand(operand){
    if(!currentOperator){
        if (displayValue == 0){
            // first click
            displayValue = operand;    
        } else {
            displayValue += operand;
        }
        updateDisplay(displayValue);
    } else {
        displayValue = operand;
        updateDisplay(displayValue);
    }
}

function handleOperator(operator){
    currentOperator = operator;
    firstOperand    = displayValue;
}

function handleFunction(fun){
    switch(fun){
        case 'clear':
            handleClear();
            break;
        case 'sign':
            handleSign();
            break;
        case 'percent':
            handlePercent();
            break;
        case 'equals':
            handleEquals();
            break;
    }

}

function handleEquals(){
    secondOperand = displayValue;
    result = operate(currentOperator,firstOperand,secondOperand);
    firstOperand = result;
    displayValue = result;
    currentOperator = null;
    updateDisplay(result);
}

function handlePercent(){
    displayValue = (displayValue/100).toString();
    updateDisplay(displayValue);
}

function handleSign(){
    if (displayValue){
        displayValue = (-1 * Number(displayValue)).toString();
        updateDisplay(displayValue);
    }    
}

function handleClear(){
    firstOperand = '';
    secondOperand = '';
    currentOperator = '';
    displayValue = '0';
    updateDisplay(displayValue);
}



function add(a,b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    return a/b;
}

function operate(operator,a,b){
    a = Number(a);
    b = Number(b);
    
    switch(operator){
        case 'add':
            return add(a,b);
        case 'subtract':
            return subtract(a,b);
        case 'multiply':
            return multiply(a,b);
        case 'divide':
            if (b === 0) return null;
            return divide(a,b);
        default:
            return null;
    }
}