export class FormValidator {
  constructor(form) {
    this.form = form;
    this.errorMessages = {
      lengthError: "Должно быть от 2 до 30 символов",
      urlError: "Здесь должна быть ссылка",
      /**
       * 9-ый спринт, 2-ая итерация.
       * Можно лучше ❤️:
       * requered -> required
       */
      requiredError: "Это обязательное поле",
    }

    this.setEventListners();
  }

  setSubmitButtonState() {
    const submitButton = this.form.querySelector('.button');

    if (this.form.checkValidity()) {
      submitButton.removeAttribute('disabled');
    } else {
      submitButton.setAttribute('disabled', 'disabled');
    }
  }

  checkInputValidity(input) {
    const text = input.value.trim();
    /*REVIEW. Можно лучше. Чтобы и метод checkInputValidity не зависил от существующей размётки и мог быть переиспользован в других проектах,
    лучше в его параметры передавать не только элемент поля ввода, но и DOM-элемент, показывающий сообщения об ошибках, т.е messageBox
    можно передать в  checkInputValidity как параметр наряду с input. */
    /**
     * Можно лучше ❤️:
     * 9-ый спринт, 2-ая итерация
     * Избегайте использования таких свойств, как .parentNode - разметка может в любой момент измениться.
     * Используйте .closest()
     * https://developer.mozilla.org/ru/docs/Web/API/Element/closest
     */
    const messageBox = this.form.querySelector(`#${input.id}-error`);

    if (input.validity.typeMismatch) {
      messageBox.textContent = this.errorMessages.urlError;
      return false;
    }

    if (input.type !== 'url') {
      if (input.validity.tooShort || text.length > 30) {
        input.setCustomValidity(this.errorMessages.lengthError);
        messageBox.textContent = this.errorMessages.lengthError;
        return false;
      }
    }

    if (input.validity.valueMissing) {
      messageBox.textContent = this.errorMessages.requiredError;
      return false;
    }

    input.setCustomValidity("");
    messageBox.textContent = "";

    return true;
  }

  setEventListners() {
    const inputs = [... this.form.elements];
    const thisForm = this;

    inputs.forEach(function (input) {
      if (input.type !== 'submit') {
        input.addEventListener('input', function () {
          thisForm.checkInputValidity(input);
          thisForm.setSubmitButtonState();
        });
      }
    });
  }
}