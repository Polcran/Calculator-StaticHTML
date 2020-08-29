(() => {
  const BLOCK_CLASS = 'calculator';
  const SELECTOR_CLASS = {
    DISPLAY: `.${BLOCK_CLASS}__display`
  };
  const displayElement = document.querySelector(SELECTOR_CLASS.DISPLAY);
  const calculatorButtons = [
    ...document.querySelectorAll(`.${BLOCK_CLASS} > button`)
  ];
  const CALCULATOR = {
    currentValue: '0',
    operator: '',
    accumulator: '0',
    isEqualPressed: false
  }

  const RUN = {
    'number': handleDisplayValue,
    'operator': handleOperatorAction,
    'equal': calculate,
    'clear': resetValues
  }

  displayElement.value = CALCULATOR.currentValue;

  const setButtonActions = () => {
    calculatorButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        const typeAction = event.target.dataset.type || '';

        RUN[typeAction](event);
      })
    })
  }

  function handleDisplayValue(event) {
    if (CALCULATOR.isEqualPressed) {
      resetValues();
    }

    CALCULATOR.currentValue =  CALCULATOR.currentValue === '0'
        ? event.target.value : CALCULATOR.currentValue + event.target.value;

    displayElement.value = CALCULATOR.currentValue;
  }

  function handleOperatorAction(event) {
    if (CALCULATOR.isEqualPressed) {
      CALCULATOR.isEqualPressed = false;
      setLastOperatorSelected(event);
      displayElement.value = CALCULATOR.accumulator;
      return;
    }

    calculate(event);
    setLastOperatorSelected(event);
  }

  function calculate(event) {
    if (CALCULATOR.currentValue === '0' ||
        (CALCULATOR.isEqualPressed && CALCULATOR.operator.length === 0)) {
      return;
    }
    const {accumulator, currentValue, operator} = CALCULATOR;
    const operations = {
      'add': parseFloat(accumulator) + parseFloat(currentValue),
      'substract': parseFloat(accumulator) - parseFloat(currentValue),
      'multiply': parseFloat(accumulator) * parseFloat(currentValue),
      'divide': parseFloat(accumulator) / parseFloat(currentValue),
    }

    CALCULATOR.accumulator = accumulator === '0' && operator.length === 0 ?
        currentValue : operations[operator].toString();
    displayElement.value = CALCULATOR.accumulator;

    if(event.target.dataset.type === 'equal') {
      CALCULATOR.isEqualPressed = true;
    }
  }

  function resetValues () {
    displayElement.value = '0';
    CALCULATOR.currentValue = '0';
    CALCULATOR.accumulator = '0';
    CALCULATOR.operator = '';
    CALCULATOR.isEqualPressed = false;
  }

  function setLastOperatorSelected(event) {
    CALCULATOR.currentValue = '0';
    CALCULATOR.operator = event.target.value;
  }

  setButtonActions();
})();

