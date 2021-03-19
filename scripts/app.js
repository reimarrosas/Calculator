/* eslint-disable no-param-reassign */
const previousText = document.querySelector('.prev');
const currentText = document.querySelector('.curr');

// Method for screen operations
const screen = {
  appendToDisplay(display, text) {
    display.textContent += text;
  },

  setDisplay(display, text) {
    display.textContent = text;
  },

  clearSingleDisplay(display) {
    display.textContent = '';
  },

  clearAllDisplay(prev, curr) {
    prev.textContent = '';
    curr.textContent = '';
  },
};

// Methods for number operations
const operations = {
  add: (a, b) => a + b,
  sub: (a, b) => a - b,
  mul: (a, b) => a * b,
  div: (a, b) => a / b,

  round: (num) => Math.round(num * 1000) / 1000,

  outputValidation: (num, text) => (Number.isFinite(num) ? text : 'Math Error!'),

  calculate(prev, curr) {
    const previousTokenArr = prev.textContent.split(' ');

    // previousValue is always at the format of ([Number] [operator]) so
    // if we split by the space, we will get two elements which are the
    // previousValue and the operator respectively
    const operator = previousTokenArr[1];
    const previousValue = this.round(Number(previousTokenArr[0]));
    const currentValue = this.round(Number(curr.textContent));

    switch (operator) {
      case '+':
        return this.add(previousValue, currentValue);
      case '−':
        return this.sub(previousValue, currentValue);
      case '×':
        return this.mul(previousValue, currentValue);
      case '÷':
        return this.div(previousValue, currentValue);
      default:
        return 'Error! Wrong Operator.';
    }
  },
};

// Number event listeners
const numbers = document.querySelectorAll('.num');

numbers.forEach((el) => {
  el.addEventListener('click', () => {
    let textToBeAdded;
    if (el.classList.contains('dot')) {
      if (currentText.textContent.indexOf('.') === -1) {
        textToBeAdded = el.textContent;
      } else {
        textToBeAdded = '';
      }
    } else {
      textToBeAdded = el.textContent;
    }

    screen.appendToDisplay(currentText, textToBeAdded);
  });
});

// Operator event listeners
const operators = document.querySelectorAll('.op');

operators.forEach((el) => {
  el.addEventListener('click', () => {
    if (currentText.textContent) {
      if (!previousText.textContent || !/[0-9]+ [+−×÷]/g.test(previousText.textContent)) {
        const textToBeAdded = `${currentText.textContent} ${el.textContent}`;
        screen.setDisplay(previousText, textToBeAdded);
      } else {
        const operationResult = operations.calculate(previousText, currentText);
        const textToBeAdded = operations.outputValidation(operationResult, `${operationResult} ${el.textContent}`);
        screen.setDisplay(previousText, textToBeAdded);
      }
    }
    screen.clearSingleDisplay(currentText);
  });
});

// Equal event listener
const equal = document.querySelector('.equal');

equal.addEventListener('click', () => {
  if (previousText.textContent && currentText.textContent) {
    const operationResult = operations.calculate(previousText, currentText);
    const textToBeAdded = operations.outputValidation(operationResult, operationResult);
    screen.setDisplay(previousText, textToBeAdded);
    screen.clearSingleDisplay(currentText);
  }
});

// AC event listener
const clear = document.querySelector('.clear');

clear.addEventListener('click', () => {
  screen.clearAllDisplay(previousText, currentText);
});

// PlusMinus event listener
const plusMinus = document.querySelector('.posneg');

plusMinus.addEventListener('click', () => {
  const currentValue = Number(currentText.textContent);
  const operationResult = operations.mul(currentValue, -1);
  screen.clearSingleDisplay(currentText);
  screen.setDisplay(currentText, operationResult);
});

// Percent event listener
const percent = document.querySelector('.percent');

percent.addEventListener('click', () => {
  const currentValue = Number(currentText.textContent);
  const operationResult = operations.div(currentValue, 100);
  screen.clearSingleDisplay(currentText);
  screen.setDisplay(currentText, operationResult);
});
