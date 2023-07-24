import { apiConfig } from "./utils";
import { BASE_URL } from "./auth";

class Api {
    constructor(apiConfig) {
        this._url = BASE_URL;
        this._headers = apiConfig.headers;
    }

    _checkResponse(res) {
        if (res.ok) {
          return res.json();
        }
  
        return Promise.reject(`Ошибка: ${res.status}`);
    }


    getProfileData() {
        return fetch(this._url + '/users/me', {
            headers: this._headers
        })
          .then(this._checkResponse);  
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
          headers: this._headers
        })
        .then(this._checkResponse); 
    }

    editProfData(data) {
      return fetch(this._url + '/users/me', {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          about: data.about
        })
      })
      .then(this._checkResponse); 
    }

    addNewCard (values) {
      return fetch(`${this._url}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: values.title,
          link: values.link,
          likes: values.likes,
          owner: values.owner
        })
      })
      .then(this._checkResponse);
    }

    deleteCard (data) {
      return fetch(`${this._url}/cards/${data}`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(this._checkResponse);
    }

    likeCard (data) {
      return fetch(`${this._url}/cards/likes/${data}`, {
        method: 'PUT',
        headers: this._headers
      })
      .then(this._checkResponse);
    }

    deleteLike (data) {
      return fetch(`${this._url}/cards/likes/${data}`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(this._checkResponse);
    }

    editAvatar (data) {
      return fetch(`${this._url}/users/me/avatar`, {
        method:'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: data.avatar
        })
    })
    .then(this._checkResponse);
    }

}

const api = new Api(apiConfig);

export default api;