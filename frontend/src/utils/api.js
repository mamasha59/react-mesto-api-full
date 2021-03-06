class Api {
    constructor(config) {
this._baseUrl = config.baseUrl;
this._headers = config.headers;

    }

    _fetch(url, method, body) {
        return fetch(this._baseUrl + url, {
            method: method,
            headers:
            this._headers,
            body: body
        }).then(res => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    getInitialCards() {
      return this._fetch('/cards', 'GET').then((result) => result.reverse())
    }
  

  addUserCard(values) {
      return this._fetch('/cards', 'POST', JSON.stringify({
          name: values.name,
          link: values.link
      }))
  }

  takeCardLike(cardId) {
      return this._fetch(`/cards/${cardId}/likes`, 'PUT')
  }

  removeCardLke(cardId) {
      return this._fetch(`/cards/${cardId}/likes`, 'DELETE')
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
        return this.takeCardLike(cardId)
    } else {
        return this.removeCardLke(cardId)
    }
}

  delCard(cardId) {
      return this._fetch(`/cards/${cardId}`, 'DELETE')
  }

  getUserData() {
      return this._fetch('/users/me', 'GET')
  }

  patchUserData(values) {
      return this._fetch('/users/me', 'PATCH', JSON.stringify(
        {
          name: values.name,
          about: values.about
      }))
  }

  patchUserAvatar(newAvatar) {
      return this._fetch('/users/me/avatar', 'PATCH', JSON.stringify({
          avatar: newAvatar
      }))
  }

}


const api = new Api({
baseUrl: "https://api.future.bright.nomoredomains.club",
headers: {
  "Content-Type": "application/json",
  'Authorization': `Bearer ${localStorage.getItem('jwt')}`
}
});

export default api;