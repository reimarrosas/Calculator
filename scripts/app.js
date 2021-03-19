/* eslint-disable no-param-reassign */
const previousText = document.querySelector('.prev');
const currentText = document.querySelector('.curr');

// Method for screen operations
const screen = {
  appendToCurrentText(curr, text) {
    curr.textContent += text;
  },

  appendToPreviousText(prev, text) {
    prev.textContent = text;
  },

  clearCurrentText(curr) {
    curr.textContent = '';
  },

  clearAllText(prev, curr) {
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
      case '%':
        return this.div(currentValue, 100);
      case '±':
        return this.mul(currentValue, -1);
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

    screen.appendToCurrentText(currentText, textToBeAdded);
  });
});

// Operator event listeners
const operators = document.querySelectorAll('.op');

operators.forEach((el) => {
  el.addEventListener('click', () => {
    if (currentText.textContent) {
      if (!previousText.textContent || previousText.textContent === 'Math Error!') {
        const textToBeAdded = `${currentText.textContent} ${el.textContent}`;
        screen.appendToPreviousText(previousText, textToBeAdded);
      } else {
        const operationResult = operations.calculate(previousText, currentText);
        const textToBeAdded = Number.isFinite(operationResult) ? `${operationResult} ${el.textContent}` : 'Math Error!';
        screen.appendToPreviousText(previousText, textToBeAdded);
      }
    }
    screen.clearCurrentText(currentText);
  });
});

// Equal event listener
const equal = document.querySelector('.equal');

equal.addEventListener('click', () => {
  if (previousText.textContent && currentText.textContent) {
    const operationResult = operations.calculate(previousText, currentText);
    screen.appendToCurrentText(currentText, operationResult);
    screen.clearCurrentText(currentText);
  }
});
