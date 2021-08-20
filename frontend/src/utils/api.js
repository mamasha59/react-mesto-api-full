class Api{
	constructor(selector) {
		this._url = selector.url;
		this._headers = selector.headers;
	}
	_checkOk(res) {
		if(res.ok) {
			return res.json();
		} 
			return Promise.reject(new Error(`${res.status}`));
		}
	
	getCards() { //----получение карточек с сервера
		return fetch(this._url + 'cards', {
			method: 'GET',
			headers: this._headers
		})
		.then(res => {
			return this._checkOk(res)
		})
	}
	getInitialData() {
        return Promise.all([this.getUserInfo(), this.getCards()]);
    }
	postCards(data) { //---- добавление карточек в dom
		return fetch(this._url + 'cards', {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
				name: data.name,
				link: data.link,
			})
		})
		.then(res => {
			return this._checkOk(res)
		})
	}
	getUserInfo() { //----получение информации о пользователе
		return fetch(this._url + 'users/me', {
			method: 'GET',
			headers: this._headers
		})
		.then(res => {
			return this._checkOk(res)
		})
	}
	setUserInfo(data) {//---- установка инфы о пользователе
		return fetch(this._url + 'users/me', {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
                name: data.name,
                about: data.about
			})
		})
		.then(res => {
			return this._checkOk(res)
		})
	}
	updateAvatar(avatar) {//----- размещение аватара пользователя updateAvatar
		return fetch(this._url + 'users/me/avatar', {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				avatar: avatar.avatar
			})
		})
		.then(res => {
			return this._checkOk(res)
		})
	}
	deleteCard(cardId) {//---- удаление карточки  пользователя
		return fetch(this._url + `cards/${cardId}`, {
			method: 'DELETE',
			headers: this._headers
		})
		.then(res => {
			return this._checkOk(res)
		})
	}

	changeLikeCardStatus(cardId, isLiked) {//----- удаление лайка с карточки changeLikeCardStatus
		return fetch(this._url + `cards/likes/${cardId}`, {
			method: isLiked ? 'PUT' : 'DELETE',
			headers: this._headers
		})
		.then(res => {
			return this._checkOk(res)
		})
	}
}
const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-24/',
    headers: {
        authorization: 'a7c83460-3094-477b-9fb5-f7c43e4b79fa',
        'Content-Type': 'application/json'
    }
});
export default api;
