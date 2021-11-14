const selected = document.querySelector("#selectedMusic")
const optionsContainer = document.querySelector(".options-container")

selected.addEventListener("click", () => {
    optionsContainer.classList.toggle("active")
    AllMusic();
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

            playBtn.addEventListener('click', () => {
                music.play()
            })

            pauseBtn.addEventListener('click', () => {
                music.pause()
            })

            previousBtn.addEventListener('click', () => {
                if (i == 0) {} else {
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
                if (i == musicsList.length - 1) {} else {
                    i += 1;
                    console.log(i)
                    musicId = musicsList[i].getAttribute('id');
                    selected.innerHTML = musicsList[i].querySelector("label").innerHTML;
                    GetMusic(musicId).then(data => {
                        music.setAttribute('src', data.music);
                    })
                }
            })
            const slider = document.getElementById("slider");
            let number = document.getElementById('volume-number');

            slider.oninput = function() {
                number.innerHTML = slider.value;
                music.volume = slider.value / 100;
            }
        })
    })
}