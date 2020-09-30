export class UserInfo {
  constructor(userInfoElement) {
    this.userInfoElement = userInfoElement;
  }

  getUserInfo() {
    const info = {};

    info.name = this.name;
    info.about = this.about;

    return info;
  }

  setUserInfo(userData) {
    this.name = userData.name;
    this.about = userData.about;
    this['_id'] = userData['_id'];
    this.avatar = userData.avatar;
  }

  updateUserInfo() {
    this.userInfoElement.querySelector('.user-info__name').textContent = this.name;
    this.userInfoElement.querySelector('.user-info__job').textContent = this.about;
    this.userInfoElement.querySelector('.user-info__photo')
      .setAttribute('style', `background-image: url(${this.avatar})`)
  }
}