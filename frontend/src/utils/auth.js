export const BASE_URL = "https://api.future.bright.nomoredomains.club";

const checkResponse = (response) => response.ok ? response.json() : Promise.reject(`${response.status}`);

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
    })
        .then(checkResponse)
}

export const authorize = (email, password) => {
    return fetch (`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
  })
      .then(checkResponse)
}

export const getContent = (token) => {
    return fetch (`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
        }
    })
        .then(checkResponse)
}