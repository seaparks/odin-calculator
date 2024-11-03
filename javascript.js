let currentoperator = '';
let currentNumber   = '';
let previousNumber  = '';

const displayDiv = document.getElementById('display');

const numberButtons   = document.querySelectorAll('.operand');
const operatorButtons = document.querySelectorAll('.operator');
const functionButtons = document.querySelectorAll('.function');

numberButtons.forEach((button) =>
    button.addEventListener('click', () => handleNumber(button.value))
);

operatorButtons.forEach((button) => 
    button.addEventListener('click', () => handleOperator(button.value))
);

functionButtons.forEach((button) =>
    button.addEventListener('click', () => handleFunction(button.value))
);

function updateDisplay(string){
    displayDiv.textContent = string;
}



function handleNumber(number){


}

function handleOperator(operator){


}

function handleFunction(fun){
    switch(fun){
        case 'clear':
            currentOperator ='';
            previousNumber = '';
            currentNumber  = '';
            updateDisplay("0");
            break;
        case 'sign':
            if (currentNumber){
                currentNumber = (-1 * Number(currentNumber)).toString();
                updateDisplay(currentNumber);
            }    
            break;
        case 'percent':
            console.log(`logged ${fun}`);
            break;
        case 'equals':
            if (currentOperator && previousNumber && currentNumber){
                const result = operate(currentOperator, previousNumber, currentNumber);
                updateDisplay(result);
                currentOperator = '';
                previousNumber  = result;
                currentNumber   = '';

            }
    }

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