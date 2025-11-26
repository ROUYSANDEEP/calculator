const displayInput = document.querySelector('.input');
const displayResult = document.querySelector('.result');
const buttons = document.querySelector('.buttons');

let currentInput = '';
let operator = '';
let firstOperand = '';

buttons.addEventListener('click', (e) => {
    const button = e.target;
    const buttonText = button.textContent;

    if (button.tagName !== 'BUTTON') return;

    if (isNumber(buttonText)) {
        handleNumber(buttonText);
    } else if (isOperator(buttonText)) {
        handleOperator(buttonText);
    } else if (buttonText === '=') {
        handleEquals();
    } else if (buttonText === 'C') {
        handleClear();
    } else if (buttonText === '←') { // backspace
        handleBackspace();
    } else if (buttonText === '%') {
        handlePercentage();
    } else if (buttonText === '.') {
        handleDecimal();
    }

    updateDisplay();
});

function isNumber(str) {
    return !isNaN(parseFloat(str)) && isFinite(str);
}

function isOperator(str) {
    return ['+', '-', '*', '/'].includes(str);
}

function handleNumber(number) {
    currentInput += number;
}

function handleOperator(op) {
    if (currentInput === '' && firstOperand === '') return;
    if (firstOperand === '') {
        firstOperand = currentInput;
        currentInput = '';
        operator = op;
    } else if (currentInput !== '') {
        calculate();
        operator = op;
    } else {
        operator = op;
    }

}

function handleEquals() {
    if (firstOperand === '' || currentInput === '') return;
    calculate();
    operator = '';
}

function handleClear() {
    currentInput = '';
    firstOperand = '';
    operator = '';
    displayResult.textContent = '0';
}

function handleBackspace() {
    currentInput = currentInput.slice(0, -1);
}

function handlePercentage() {
    if (currentInput === '') return;
    currentInput = (parseFloat(currentInput) / 100).toString();
}

function handleDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
}

function calculate() {
    const num1 = parseFloat(firstOperand);
    const num2 = parseFloat(currentInput);
    let result;

    switch (operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            if (num2 === 0) {
                result = 'Error';
            } else {
                result = num1 / num2;
            }
            break;
        default:
            return;
    }

    displayResult.textContent = result;
    firstOperand = result;
    currentInput = '';
}

function updateDisplay() {
    displayInput.textContent = `${firstOperand} ${operator} ${currentInput}`;
    if (currentInput !== '') {
        displayResult.textContent = currentInput;
    }
}
