class CardList {
  constructor(container, newCardFunc, imagePopup) {
    this.container = container;
    this.newCardFunc = newCardFunc;
    this.imagePopup = imagePopup;
    this.cards = [];
  }

  addCard(element) {
    this.container.appendChild(element);
  }

  render(api, currentUserId) {
    this.cards.forEach((cardData) => {
      const card = this.newCardFunc.call(this, cardData, this.imagePopup, api, currentUserId);
      this.addCard(card);
    })
  }
}