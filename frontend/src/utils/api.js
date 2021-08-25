import { options } from "./utils";

class Api {
  constructor(config) {
    this._baseUrl = config.url;
    this._headers = config.headers;
  }

  _handlePromise(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(new Error(`Ошибка ${res.status}`));
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      credentials: 'include',
    }).then((res) => this._handlePromise(res));
  }

  editUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: data.userName,
        about: data.userJob,
      }),
    }).then((res) => this._handlePromise(res));
  }

  changeUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => this._handlePromise(res));
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      credentials: 'include',
    }).then((res) => this._handlePromise(res));
  }

  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._handlePromise(res));
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: 'include',
    }).then((res) => this._handlePromise(res));
  }

  putLikeOnCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
      credentials: 'include',
    }).then((res) => this._handlePromise(res));
  }

  removeLikeFromCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
      credentials: 'include',
    }).then((res) => this._handlePromise(res));
  }
}

// Создание экземпляра класса Api
const api = new Api(options);

export default api;
