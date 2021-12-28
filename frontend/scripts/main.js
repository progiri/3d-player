const selected = document.querySelector("#selectedMusic")
const optionsContainer = document.querySelector(".options-container")

selected.addEventListener("click", () => {
    optionsContainer.classList.toggle("active")
    AllMusic();
})


var modals = document.querySelectorAll('.modal');

// When the user clicks anywhere outside of the modal,   it
window.onclick = function(event) {
    modals.forEach(modal => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    })
}

const musicAddInput = document.getElementById('musicAdd');
const musicFile = document.getElementById('musicFile');

musicAddInput.addEventListener("click", () => {
    musicFile.click()
})

const musicAddBtn = document.getElementById('musicAddBtn')
const addMusicModal = document.getElementById('musicAddForm')

musicAddBtn.addEventListener("click", () => {
    const musicName = document.getElementById('musicName').value;

    AddMusic(musicName, musicFile.files[0])
    addMusicModal.style.display = "none";
    selected.click()

})


Profile().then((data) => {
    if (data['username']) {
        let headerLinks = document.querySelectorAll('.header_links')
        headerLinks.forEach(el => el.style.display = 'none')
        let headerUsername = document.getElementById('headerUsername')
        headerUsername.innerHTML = `<a class="header__link">${data['username']}</a>
                                <a class="header__link" onclick="return Logout()">Logout</a>`
        let footer = document.querySelector("footer");
        footer.setAttribute('class', 'footer footer_active')
    } else {
        console.log(false)
    }

})


function optionsRemove() {
    const optionsList = document.querySelectorAll(".option")

    optionsList.forEach(o => o.remove())
}

function optionSelector() {
    const optionsList = document.querySelectorAll(".option");
    const musicsList = Array.prototype.slice.call(optionsList);


    musicsList.forEach(function(option, i) {
        option.addEventListener("click", () => {
            selected.innerHTML = option.querySelector("label").innerHTML;
            optionsContainer.classList.remove("active")
            let btnsContainer = document.querySelector(".btns-container");
            btnsContainer.setAttribute('class', 'btns-container footer_active')
            let volumeContainer = document.querySelector('.volume-container');
            volumeContainer.setAttribute('class', 'volume-container footer_active')

            playBtn = document.getElementById('play')
            pauseBtn = document.getElementById('pause')
            previousBtn = document.getElementById('previous')
            nextBtn = document.getElementById('next')

            musicId = option.getAttribute('id')
            const music = document.getElementById('audio')

            GetMusic(musicId).then(data => {
                music.setAttribute('src', data.music);
            })

            playBtn.setAttribute('class', 'action-btns active-btn')

            playBtn.addEventListener('click', () => {
                pauseBtn.setAttribute('class', 'action-btns')
                playBtn.setAttribute('class', 'action-btns active-btn')
                music.play()
            })

            pauseBtn.addEventListener('click', () => {
                playBtn.setAttribute('class', 'action-btns')
                pauseBtn.setAttribute('class', 'action-btns active-btn')
                music.pause()
            })

            previousBtn.addEventListener('click', () => {
                playBtn.setAttribute('class', 'action-btns active-btn')
                pauseBtn.setAttribute('class', 'action-btns')
                if (i != 0) {
                    i -= 1;
                    console.log(i)
                    musicId = musicsList[i].getAttribute('id');
                    selected.innerHTML = musicsList[i].querySelector("label").innerHTML;
                    GetMusic(musicId).then(data => {
                        music.setAttribute('src', data.music);
                    })
                }
            })

            nextBtn.addEventListener('click', () => {
                playBtn.setAttribute('class', 'action-btns active-btn')
                pauseBtn.setAttribute('class', 'action-btns')
                if (i != musicsList.length - 1) {
                    i += 1;
                    console.log(i)
                    musicId = musicsList[i].getAttribute('id');
                    selected.innerHTML = musicsList[i].querySelector("label").innerHTML;
                    GetMusic(musicId).then(data => {
                        music.setAttribute('src', data.music);
                    })
                }
            })

            let slider = document.getElementById("slider");
            let number = document.getElementById('volume-number');

            slider.value = 50;
            number.innerHTML = slider.value;

            slider.oninput = function() {
                number.innerHTML = slider.value;
                music.volume = slider.value / 100;
            }
        })
    })
}