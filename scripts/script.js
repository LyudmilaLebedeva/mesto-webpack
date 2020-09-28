/* Переменные */
const openNewPlaceFormBtn = document.querySelector('.user-info__button');
const openEditProfileFormBtn = document.querySelector('.button_edit');

/* Функции */
const newCard = function (cardData, imagePopup, api, currentUserId) {
  const card = new Card(cardData, imagePopup, api, currentUserId);
  return card.create();
}

/* Экзкмпляры классов */

const api = new Api({
  baseUrl: 'https://praktikum.tk/cohort11',
  headers: {
    authorization: 'bd373ba9-793d-413e-84a8-aeaf7f17d45d',
    'Content-Type': 'application/json'
  }
});

const imagePopup = new ImagePopup(document.querySelector('#imagePopup'));
const userInfo = new UserInfo(document.querySelector('.user-info'));
const placesList = new CardList(document.querySelector('.places-list'), newCard, imagePopup);
const editProfileForm = new EditProfileForm(document.querySelector('#editProfilePopup'), userInfo, api);

const newPlaceForm = new NewPlaceForm(
  document.querySelector('#newPlacePopup'),
  newCard,
  imagePopup,
  placesList,
  api,
  userInfo['_id']
);

const newPlaceFormValidator = new FormValidator(newPlaceForm.form);
const editProfileFormValidator = new FormValidator(editProfileForm.form);

api.getUserInfo()
  .then((result) => {
    userInfo.setUserInfo(result);
    userInfo.updateUserInfo();
    newPlaceForm.currentUserId = userInfo['_id']
  })
  .catch((err) => console.log(err));;

api.getInitialCards()
  .then((result) => {
    placesList.cards = result;
    placesList.render(api, userInfo['_id']);
  })
  .catch((err) => console.log(err));;

// Слушатели событий

openNewPlaceFormBtn.addEventListener('click', function () {
  newPlaceForm.clear();
  newPlaceForm.clearErrors();
  newPlaceFormValidator.setSubmitButtonState();
  newPlaceForm.open();
});

openEditProfileFormBtn.addEventListener('click', function () {
  editProfileForm.setValues(userInfo.getUserInfo());
  editProfileForm.clearErrors();
  editProfileFormValidator.setSubmitButtonState();
  editProfileForm.open();
});



/**
 * Привет! В целом у вас получилась хорошая работа, функционал, описанный в задании работает без очевидных багов,
 * но есть также некоторые замечания по организации кода.
 *
 * Что понравилось:
 *  - Выполнены дополнительные задания (добавление/удаление карточки, отображение/снятие/установка лайков).
 *  - Корректная работа с асинхронным кодом (.then, .catch).
 *
 * Что надо исправить для того, чтобы работа была принята:
 *  - ❤️ Ограничьте ответственность класса Api получением и возвращением данных, подробнее см. комментарий в коде.
 *  - ❤️ Согласно проектному заданию, ссылка на аватар также должна быть получена из результата запроса getUserInfo.
 *  - ❤️ При удалении карточки спрашивайте пользователя, уверен ли он в этом (используйте для этого confirm)
 *    https://developer.mozilla.org/ru/docs/Web/API/Window/confirm
 *  - ❤️ Все комментарии в коде, отмеченные как "Надо исправить".
 */

/**
 * 9-ый спринт, 2-ая итерация.
 * Отлично, основная часть комментариев проработана и исправлена осталось совсем немного.
 *
 * Что надо исправить для того, чтобы работа была принята:
 *  - ❤️ Добавляйте .catch в конец цепочки промисов (Card.js, EditProfileForm.js)
 *  - ❤️ Удалите ненужный файл NewPlaseForm.js
 *  - ❤️ Все комментарии в коде, отмеченные как "Надо исправить"
 *
 * ❤️ Также обратите внимание на комментарии в коде, отмеченные как "Можно лучше".
 */