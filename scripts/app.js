/* eslint-disable no-param-reassign */
const previousText = document.querySelector('.prev');
const currentText = document.querySelector('.curr');

const screen = {
  appendCurrentValue(curr, text) {
    curr.textContent += text;
  },

  appendPreviousValue(prev, text) {
    prev.textContent = text;
  },

  clearCurrentValue(curr) {
    curr.textContent = '';
  },

  clearAllValues(prev, curr) {
    prev.textContent = '';
    curr.textContent = '';
  },
};

const operations = {
  add: (a, b) => a + b,
  sub: (a, b) => a + b,
  mul: (a, b) => a + b,
  div: (a, b) => a + b,

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

const numbers = document.querySelectorAll('.num');

numbers.forEach((el) => {
  el.addEventListener('click', () => {
    screen.appendCurrentValue(currentText, el.textContent);
  });
});
