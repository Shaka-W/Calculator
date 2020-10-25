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

numbers.forEach(number => {
    number.addEventListener('click', e => {
        calculatorInput.push(e.target.textContent);
        calculatorDisplay.innerHTML = calculatorInput.join('');
    }); 
});

decimalBtn.addEventListener('click', displayDecimal);
decimalBtn.addEventListener('click', checkIfDecimal);

function displayDecimal(e) {
    calculatorInput.push(e.target.textContent);
    calculatorDisplay.innerHTML = calculatorInput.join('');
}

function checkIfDecimal(e) {
    if (calculatorDisplay.innerHTML.includes('.')) {
        decimalBtn.removeEventListener('click', displayDecimal);
    }

    if (!calculatorDisplay.innerHTML.includes('.')) {
        calculatorInput.push(e.target.textContent);
        calculatorDisplay.innerHTML = calculatorInput.join('');
    }
}

clearBtn.addEventListener('click', () => {
    calculatorInput = [];
    inputs = [];
    operatorValue.shift();
    calculatorDisplay.innerHTML = calculatorInput;
});

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
