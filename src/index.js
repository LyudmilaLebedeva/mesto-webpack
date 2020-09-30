import "./style.css";
import {Api} from './scripts/Api.js';
import {Card} from './scripts/Card.js';
import {CardList} from './scripts/CardList.js';
import {EditProfileForm} from './scripts/EditProfileForm.js';
import {FormValidator} from './scripts/FormValidator.js';
import {ImagePopup} from './scripts/ImagePopup.js';
import {NewPlaceForm} from './scripts/NewPlaceForm.js';
import {UserInfo} from './scripts/UserInfo.js';

/* Переменные */
const openNewPlaceFormBtn = document.querySelector('.user-info__button');
const openEditProfileFormBtn = document.querySelector('.button_edit');
const API_URL = process.env.NODE_ENV === 'production' ? 'https://nomoreparties.co' : 'http://nomoreparties.co';

/* Функции */
const newCard = function (cardData, imagePopup, api, currentUserId) {
  const card = new Card(cardData, imagePopup, api, currentUserId);
  return card.create();
}

/* Экзкмпляры классов */

const api = new Api({
  baseUrl: `${API_URL}/cohort11`,
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