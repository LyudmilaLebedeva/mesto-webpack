import {FormPopup} from './FormPopup.js';

export class EditProfileForm extends FormPopup {
  constructor(popup, userInfo, api) {
    super(popup);
    this.userInfo = userInfo;
    this.api = api;

    this.setSubmitHandler();
  }

  mainFunction() {
    const userData = this.getValues();

    this.api.patchUserInfo(userData)
      .then((result) => {
        this.userInfo.setUserInfo(result);
        this.userInfo.updateUserInfo();
      })
      .catch((err) => console.log(err));;;
    /**
     * 9-ый спринт, 2-ая итерация.
     * Надо исправить ❤️:
     * Не забывайте добавлять .catch в конец цепочки промисов для обработки возможных ошибок.
     */
  }
}