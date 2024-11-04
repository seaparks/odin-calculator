let currentOperator = null;
let firstOperand    = '';
let secondOperand     = '';

// used to reset the screen or mark that certain actions are disallowed
let inBetweenState  = false;

// used to start fresh if someone pressed = and doesn't want to use the result
let justCalculated  = false;

const displayDiv = document.getElementById('display');

const numberButtons   = document.querySelectorAll('.operand');
const operatorButtons = document.querySelectorAll('.operator');
const functionButtons = document.querySelectorAll('.function');
const decimalButton   = document.getElementById('decimal');
const equalsButton    = document.getElementById('equals');

numberButtons.forEach((button) =>
    button.addEventListener('click', () => handleOperand(button.value))
);

operatorButtons.forEach((button) => 
    button.addEventListener('click', () => handleOperator(button.value))
);

functionButtons.forEach((button) =>
    button.addEventListener('click', () => handleFunction(button.value))
);

decimalButton.addEventListener('click', handleDecimal);
equalsButton.addEventListener('click', handleEquals);


function handleOperand(operand){
    if(displayDiv.textContent === '0' || inBetweenState) {
        resetScreen();
    }
    
    if(justCalculated){
        handleClear();
        displayDiv.textContent = operand;
    } else {
        displayDiv.textContent += operand;
    }
}

function handleOperator(operator){
    if (currentOperator !== null) handleEquals();
    firstOperand    = displayDiv.textContent;
    currentOperator = operator;
    inBetweenState  = true;
    justCalculated  = false;
}

function handleEquals(){
    if(currentOperator === null || inBetweenState) return;
    if(currentOperator === 'divide' && displayDiv.textContent === '0'){
        displayDiv.textContent = 'ERR';
        setTimeout(handleClear,1500);
        return;
    }
    secondOperand = displayDiv.textContent;
    displayDiv.textContent = Math.round(operate(currentOperator,firstOperand,secondOperand) * 1000)/1000;
    currentOperator = null;
    justCalculated  = true;
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
    }

}

function handlePercent(){
    displayDiv.textContent = (Math.round( (displayDiv.textContent/100)*100)/100).toString();
}

function handleSign(){
    displayDiv.textContent = (-1 * Number(displayDiv.textContent)).toString();
}

function handleDecimal(){
    if(!displayDiv.textContent.includes('.')){
        displayDiv.textContent += '.';
    }
}

function handleClear(){
    firstOperand = '';
    secondOperand = '';
    currentOperator = null;
    displayDiv.textContent = '0';
    inBetweenState = false;
    justCalculated = false;
}

function resetScreen(){
    displayDiv.textContent = '';
    inBetweenState = false;
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
            return divide(a,b);
        default:
            return null;
    }
}