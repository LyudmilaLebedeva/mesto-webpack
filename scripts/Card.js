class Card {
  constructor(cardData, imagePopup, api, currentUserId) {
    this.name = cardData.name;
    this.link = cardData.link;
    this.owner = cardData.owner;
    this.id = cardData['_id'];
    this.likes = cardData.likes;
    this.imagePopup = imagePopup;
    this.api = api;
    this.currentUserId = currentUserId;
  }

  isLiked() {
    return this.likes.some(like => {
      return like['_id'] === this.currentUserId;
    })
  }

  renderLikes() {
    if (this.isLiked()) {
      this.likeIcon.classList.add('place-card__like-icon_liked');
    } else {
      this.likeIcon.classList.remove('place-card__like-icon_liked');
    }

    this.likeNumberBox.textContent = `${this.likes.length}`;
  }

  likeRequest() {
    if (this.isLiked()) {
      /**
       * 9-ый спринт, 2-ая итерация.
       * Надо исправить ❤️:
       * Не забывайте добавлять .catch в конец цепочки промисов для обработки возможных ошибок.
       */
      return this.api.deleteLike(this.id)
        .catch((err) => console.log(err));
    }
    /**
     * 9-ый спринт, 2-ая итерация.
     * Надо исправить ❤️:
     * .catch
     */
    return this.api.putLike(this.id)
      .catch((err) => console.log(err));
  }

  likeHandler() {
    this.likeRequest()
      .then(result => {
        this.likes = result.likes;
        this.renderLikes();
      })
      .catch((err) => console.log(err));
  }

  setEventListeners() {
    this.cardElement.querySelector('.place-card__like-icon').addEventListener('click', this.likeHandler.bind(this));
    this.cardElement.querySelector('.place-card__image').addEventListener('click', this.showInPopup.bind(this));
    if (this.owner._id !== this.currentUserId) {
      this.cardElement.querySelector(".place-card__delete-icon").remove();
    } else {
      this.cardElement.querySelector('.place-card__delete-icon').addEventListener('click', this.deleteHandler.bind(this));
    }
  }

  deleteEventListeners() {
    this.cardElement.querySelector('.place-card__like-icon').removeEventListener('click', this.likeHandler);
    this.cardElement.querySelector('.place-card__delete-icon').removeEventListener('click', this.deleteHandler);
    this.cardElement.querySelector('.place-card__image').removeEventListener('click', this.showInPopup);
  }

  create() {
    const template = document.createElement("div");

    template.insertAdjacentHTML('beforeend', `
      <div class="place-card">
      <div class="place-card__image">
        <button class="place-card__delete-icon"></button>
      </div>
      <div class="place-card__description">
        <h3 class="place-card__name"></h3>
        <div class="place-card__like-icon">
          <button class="place-card__like-icon"> </button>
          <span class="place-card__like-number"> ${this.likes.length} </span>
        </div>
      </div>
      </div>`);

    this.cardElement = template.firstElementChild;
    this.likeIcon = this.cardElement.querySelector('.place-card__like-icon');
    this.likeNumberBox = this.cardElement.querySelector('.place-card__like-number');

    this.cardElement.querySelector(".place-card__name").textContent = this.name;
    this.cardElement.querySelector(".place-card__image").style.backgroundImage = `url(${this.link})`;

    this.renderLikes();

    this.setEventListeners();

    return this.cardElement;
  }

  deleteHandler() {
    if (window.confirm("Вы действительно хотите удалить эту карточку?")) {
      this.remove();
    }
  }

  remove() {
    const thisCard = this;
    this.api.deleteCard(this.id)
      .then(result => {
        thisCard.deleteEventListeners();
        thisCard.cardElement.remove();
      })
      .catch((err) => console.log(err));;
  }

  showInPopup(evt) {
    if (evt.target.classList.contains('place-card__image')) {
      this.imagePopup.setImage(this.link);
      this.imagePopup.open();
    }
  }
}