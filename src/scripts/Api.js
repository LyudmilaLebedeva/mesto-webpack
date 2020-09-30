export class Api {
  constructor(options) {
    this.options = options;
  }

  /**
   * Отлично!
   * Создан вспомогательный метод, в котором содержится основная логика формирования запроса.
   */
  _fetchMask(link, method = 'GET', body) {
    return fetch(this.options.baseUrl + link, {
      method: method,
      headers: this.options.headers,
      body: JSON.stringify(body)
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  getInitialCards() {
    return this._fetchMask('/cards')
  }

  addCard(cardBaseData) {
    return this._fetchMask('/cards', 'POST', cardBaseData);
  }

  deleteCard(cardId) {
    return this._fetchMask(`/cards/${cardId}`, 'DELETE');
  }

  getUserInfo() {
    return this._fetchMask(`/users/me`)
  }

  patchUserInfo(userData, userInfo) {
    return this._fetchMask(`/users/me`, 'PATCH', userData);
  }

  putLike(cardId) {
    return this._fetchMask(`/cards/like/${cardId}`, 'PUT');
  }

  deleteLike(cardId) {
    return this._fetchMask(`/cards/like/${cardId}`, 'DELETE');
  }
}