class NewPlaceForm extends FormPopup {
  constructor(popup, newCardFunc, imagePopup, cardList, api, currentUserId) {
    super(popup);

    this.newCardFunc = newCardFunc;
    this.imagePopup = imagePopup;
    this.cardList = cardList;
    this.api = api;
    this.currentUserId = currentUserId;

    this.setSubmitHandler();
  }

  mainFunction() {
    const cardData = this.getValues();
    this.api.addCard(cardData, this.cardList)
      .then(result => {
        /**
         * 9-ый спринт, 2-ая итерация.
         * Надо исправить ❤️:
         * placesList -> this, так как newCardFunc является методом экземпляра класса NewPlaceForm
         */
        const card = this.newCardFunc(result, this.imagePopup, this.api, this.currentUserId);
        this.cardList.addCard(card);
      })
      .catch((err) => console.log(err));
  }
}