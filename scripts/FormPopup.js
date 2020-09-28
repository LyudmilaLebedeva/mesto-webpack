class FormPopup extends Popup {
  constructor(popup) {
    super(popup);
    this.form = this.popup.querySelector('form');
    this.getInputs();
  }

  getInputs() {
    const formElements = [... this.form.elements];
    const thisForm = this;
    this.inputs = []

    formElements.forEach(function (formElement) {
      if (formElement.type !== 'submit') {
        thisForm.inputs.push(formElement);
      }
    });
  }

  getValues() {
    const values = {};

    this.inputs.forEach(function (inputElement) {
      values[inputElement.name] = inputElement.value;
    })

    return values;
  }

  setValues(values) {
    this.inputs.forEach(function (inputElement) {
      inputElement.value = values[inputElement.name];
    })
  }

  clear() {
    this.inputs.forEach(function (inputElement) {
      inputElement.value = '';
    });
  }

  mainFunction() {
    return this.getInputs();
  }

  submitHandler(event) {
    event.preventDefault();

    this.mainFunction();

    this.close();
    this.clear();
  }

  setSubmitHandler() {
    const thisPopup = this;
    this.form.addEventListener('submit', this.submitHandler.bind(thisPopup));
  }

  clearErrors() {
    const msgBoxes = [... this.form.querySelectorAll('.popup__message')]

    msgBoxes.forEach(function (box) {
      box.textContent = '';
    });
  }
}