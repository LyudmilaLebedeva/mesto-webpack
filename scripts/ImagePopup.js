class ImagePopup extends Popup {
  constructor(popup) {
    super(popup);
    this.imageElement = this.popup.querySelector('.popup__img_type_img');
  }

  setImage(url) {
    this.imageElement.src = url;
  }
}