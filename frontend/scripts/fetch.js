function Login() {
    const url = 'http://127.0.0.1:8000/api/v1/accounts/token/'

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    data = {
        'username': document.getElementById('loginUsername').value,
        'password': document.getElementById('loginPassword').value
    }

    return fetch(url, {
            credentials: 'include',
            mode: 'cors',
            headers: myHeaders,
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(function(response) {
            console.log(response)
            return response.json()
        })
        .then(function(data) {
            document.cookie = "access_token=" + data.access
            location.reload()
        })
}


function SignUp() {
    url = 'http://127.0.0.1:8000/api/v1/accounts/register/'

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    data = {
        'username': document.getElementById('signupUsername').value,
        'password': document.getElementById('signupPassword1').value,
        'password2': document.getElementById('signupPassword2').value
    }

    return fetch(url, {
            credentials: 'include',
            mode: 'cors',
            headers: myHeaders,
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            document.cookie = "access_token=" + data.access
            location.reload()
        })
}


function Logout() {
    document.cookie = "access_token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    location.reload()
}


function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function AllMusic() {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', 'Bearer ' + getCookie('access_token'));

    return fetch('http://127.0.0.1:8000/api/v1/playlists/1/', {
            credentials: 'include',
            mode: 'cors',
            headers: myHeaders
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            let selectedMusic = document.getElementById('musicsContainer')

            optionsRemove()

            for (music of data.musics) {
                console.log(music)
                let html = document.createElement('div')
                html.setAttribute('class', 'option')
                html.setAttribute('id', music.id)
                html.innerHTML = `<input type="radio" class="radio-btn" id="${music.name + music.id}" name="music">
                                  <label for="${music.name + music.id}">${music.name}</label>`
                selectedMusic.appendChild(html)
            }

            optionSelector()

            return data
        })
}


function GetMusic(id) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', 'Bearer ' + getCookie('access_token'));

    return fetch(`http://127.0.0.1:8000/api/v1/playlists/music/${id}/`, {
            credentials: 'include',
            mode: 'cors',
            headers: myHeaders
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            console.log(data)
            return data
        })
}


function Profile() {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', 'Bearer ' + getCookie('access_token'));

    return fetch('http://127.0.0.1:8000/api/v1/accounts/profile/', {
            credentials: 'include',
            mode: 'cors',
            headers: myHeaders
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            return data
        })
}