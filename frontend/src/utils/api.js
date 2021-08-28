export default class Api {
    constructor({address, token, groupID}) {
        this._address = address;
        this._token = token;
        this._groupID = groupID;
        this._getResponseJson = this._getResponseJson.bind(this);
    }

    _getResponseData (response) {
        if(response.ok) {
            return Promise.resolve("done");
        }
        return Promise.reject(new Error(`Ошибка: ${response.status}`));
    }

    _getResponseJson (response) {
        if(response.ok) {
            return response.json();
        }
        return Promise.reject(new Error(`Ошибка: ${response.status}`));
    }

    changeLikeCardStatus(_id, isLiked) {
        return fetch (`${this._address}/cards/likes/${_id}`, {
            method: isLiked ? 'DELETE' : 'PUT',
            headers: {
                authorization: this._token
            }
        })
            .then(response => {
                return this._getResponseJson(response);
            });
    }

    editAvatar(avatar) {
        return fetch(`${this._address}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar
            })
        })
            .then(response => {
                return this._getResponseJson(response);
            });
    }

    editProfile(name, description) {
        return fetch(`${this._address}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: description
            })
        })
            .then(response => {
                return this._getResponseJson(response);
            });
    }

    getOwnerInfo() {
        return fetch(`${this._address}/users/me`,{
            headers: {
                authorization: this._token
            }
        })
            .then(response => {
               return this._getResponseJson(response);
            });
    }

    getInitialCards() {
        return fetch(`${this._address}/cards`, {
            headers: {
                authorization: this._token
            }
        })
            .then(response => {
                return this._getResponseJson(response);
            });
    }

    addNewCard(placeName, placeLink) {
        return fetch(`${this._address}/cards`,
            {
                method: "POST",
                headers: {
                    authorization: this._token,
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    name: placeName,
                    link: placeLink
                })
            })
            .then(response => {
                return this._getResponseJson(response);
            })
    }

    deleteCard(_id) {
        return fetch(`${this._address}/cards/${_id}`, {
            method: "DElETE",
            headers: {
                authorization: this._token
            }
        })
            .then(response => {
                return this._getResponseData(response);
            })
    }
}

export const api = new Api({
    address: "https://api.future.bright.nomoredomains.club",
    headers: {
        authorization: 'a7c83460-3094-477b-9fb5-f7c43e4b79fa',
        'Content-Type': 'application/json'
    }
});