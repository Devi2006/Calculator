document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".div2 > div");
    const display = document.getElementById("display");
  
    let currentInput = '0';
    let previousInput = '';
    let operator = null;
  
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const value = button.innerText;
  
        if (!isNaN(value) || value === '.') {
          appendNumber(value);
        } else if (value === 'C') {
          clearDisplay();
        } else if (value === '+/-') {
          negate();
        } else if (value === '%') {
          percentage();
        } else if (value === '=') {
          calculate();
        } else {
          setOperator(value);
        }
      });
    });
  
    function updateDisplay() {
      display.innerText = currentInput;
    }
  
    function clearDisplay() {
      currentInput = '0';
      previousInput = '';
      operator = null;
      updateDisplay();
    }
  
    function appendNumber(number) {
      if (currentInput === '0' && number !== '.') {
        currentInput = number;
      } else {
        currentInput += number;
      }
      updateDisplay();
    }
  
    function negate() {
      currentInput = (parseFloat(currentInput) * -1).toString();
      updateDisplay();
    }
  
    function percentage() {
      currentInput = (parseFloat(currentInput) / 100).toString();
      updateDisplay();
    }
  
    function setOperator(op) {
      if (operator !== null) {
        calculate();
      }
      previousInput = currentInput;
      operator = op;
      currentInput = '0';
    }
  
    function calculate() {
      let result;
      const prev = parseFloat(previousInput);
      const curr = parseFloat(currentInput);
  
      if (isNaN(prev) || isNaN(curr)) {
        currentInput = 'Error';
        updateDisplay();
        return;
      }
  
      switch (operator) {
        case '+':
          result = prev + curr;
          break;
        case '-':
          result = prev - curr;
          break;
        case 'x':
          result = prev * curr;
          break;
        case '÷':
          result = prev / curr;
          break;
        default:
          return;
      }
  
      currentInput = result.toString();
      operator = null;
      previousInput = '';
      updateDisplay();
    }
  });
  