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
            switch (response.status){
                case 401:
                    formWarningLogin = document.getElementById('formWarningLogin');
                    formWarningLogin.innerHTML = 'Wrong login or password';
                    formWarningLogin.style.color = 'red';
                    return 401;
            }
            return response.json();
        })
        .then(function(data) {
            switch(data){
                case 401:
                    break;
                default:
                    document.cookie = "access_token=" + data.access
                    location.reload()
            }
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
            json = response.json();
            json.then(function(result){
                console.log(result)
            })
            resStatus = response.status
            return {'json': json, 'status': resStatus} 
            // switch (response.status){
            //     case 400:
            //         formWarningSignUp = document.getElementById('formWarningSignUp')
            //         formWarningSignUp.innerHTML == json[0]
            //         formWarningSignUp.style.color = 'red'
            //         return 400
            //     default:
            //         return 201
            // }
        })
        .then(function(data) {
            switch(data['status']){
                case 400:
                    formWarningSignUp = document.getElementById('formWarningSignUp')
                    formWarningSignUp.style.color = 'red'
                    data['json'].then(function(result){
                        console.log(result[0])
                        formWarningSignUp.innerHTML = result[0]
                    })
                    break;
                case 200:
                    formWarningSignUp = document.getElementById('formWarningSignUp')
                    formWarningSignUp.style.color = 'red'
                    data['json'].then(function(result){
                        console.log(result.error['username'])
                        formWarningSignUp.innerHTML = result.error['username']
                    })
                    break;

                case 201:
                    document.cookie = "access_token=" + data.access
                    // location.reload()
            }
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

    const playlist_id = getCookie('playlist_id')
    console.log(playlist_id)

    return fetch(`http://127.0.0.1:8000/api/v1/playlists/${playlist_id}/`, {
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
            document.cookie = "playlist_id=" + data.playlist
            return data
        })
}


function AddMusic(name, file) {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + getCookie('access_token'));

    data = {
        "name": name,
        "music": file
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("music", file);

    const playlist_id = getCookie('playlist_id')

    return fetch(`http://127.0.0.1:8000/api/v1/playlists/${playlist_id}/music/`, {
            credentials: 'include',
            mode: 'cors',
            headers: myHeaders,
            method: 'POST',
            body: formData
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            return data
        })
        .catch(function(error) {
            console.log(error)
        })
}