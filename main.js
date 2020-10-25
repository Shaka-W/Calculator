const calculatorDisplay = document.querySelector('.calculator-display');
const numbers = document.querySelectorAll('.btn-number');
const operatorBtn = document.querySelectorAll('.btn-operator');
const equalBtn = document.querySelector('.btn-equal');
const clearBtn = document.querySelector('.btn-delete');
const decimalBtn = document.querySelector('.btn-dec');

let calculatorInput = [];
let operatorValue = [];
let inputs = [];
let joinNum;

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if ((num1 / num2) % 1 !== 0) {
        return (num1 / num2).toFixed(3);
    } else {
        return (num1 / num2);
    }
}

function operate(operator, num1, num2) {
    if (operator === '+') {
       return add(num1, num2);
    } else if (operator === '-') {
       return subtract(num1, num2);
    } else if (operator === '*') {
       return multiply(num1, num2);
    } else if (operator === '/') {
       return divide(num1, num2);
    }
}

function calcInput(e) {
    calculatorInput.push(e.target.textContent);
}

function calcDisplay() {
    calculatorDisplay.innerHTML = calculatorInput.join('');
}


numbers.forEach(number => {
    number.addEventListener('click', e => {
        calcInput(e);
        calcDisplay();
    }); 
});

decimalBtn.addEventListener('click', displayDecimal);
decimalBtn.addEventListener('click', checkIfDecimal);

function displayDecimal(e) {
    calcInput(e);
    calcDisplay();
}

function checkIfDecimal(e) {
    if (calculatorDisplay.innerHTML.includes('.')) {
        decimalBtn.removeEventListener('click', displayDecimal);
    }

    if (!calculatorDisplay.innerHTML.includes('.')) {
        displayDecimal(e);
    }
}


operatorBtn.forEach(operator => {
    operator.addEventListener('click', () => {
       operatorValue.push(operator.innerHTML);

       joinNum = calculatorInput.join('');
       inputs.push(joinNum);

       calculatorInput = [];
        
    if (operatorValue.length === 2 && inputs.length === 2) {
        let result = operate(operatorValue[0], Number(inputs[0]), Number(inputs[1]));
        calculatorDisplay.innerHTML = result;
        inputs = [];
        inputs.push(String(result));
        operatorValue.shift();
        calculatorInput = [];
    }
    });
})

clearBtn.addEventListener('click', () => {
    calculatorInput = [];
    inputs = [];
    operatorValue.shift();
    calcDisplay();
});

equalBtn.addEventListener('click', () => {
    joinNum = calculatorInput.join('');

    let runningTotal = 0;

    if (inputs.length === 0 && joinNum === '' || inputs.length === 0 && joinNum.length === 1) {
        return;
    } else if (operatorValue[0] === '/' && Number(joinNum) === 0) {
        calculatorDisplay.innerHTML = 'Error';
    } 
    else {
        runningTotal = (operate(operatorValue[0], Number(inputs[0]), Number(joinNum)));
        calculatorDisplay.innerHTML  = runningTotal;
    }
});
