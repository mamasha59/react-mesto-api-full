import { options } from "../utils/utils";

class AuthApi {
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

  register(data) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        password: data.password,
        email: data.email,
      }),
    }).then((res) => this._handlePromise(res));
  }

  login(data) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        password: data.password,
        email: data.email,
      }),
    }).then((res) => this._handlePromise(res));
  }

  logout() {
    return fetch(`${this._baseUrl}/signout`, {
      method: "POST",
      headers: this._headers,
      credentials: 'include',
    }).then((res) => this._handlePromise(res));
  }
}

// Создание экземпляра класса AuthApi
const auth = new AuthApi(options);

export default auth;
