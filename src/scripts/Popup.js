export class Popup {
  constructor(popup) {
    this.popup = popup;
    this.closeBtn = this.popup.querySelector('.popup__close');
    this.setEventListeners();
  }

  open() {
    this.popup.classList.add('popup_is-opened');
  }

  close() {
    this.popup.classList.remove('popup_is-opened');
  }

  setEventListeners() {
    this.closeBtn.addEventListener('click', this.close.bind(this));
  }
}