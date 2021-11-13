const selected = document.querySelector("#selectedMusic")
const optionsContainer = document.querySelector(".options-container")

selected.addEventListener("click", () => {
    optionsContainer.classList.toggle("active")
    allPlaylists();
})

function optionsRemove() {
    const optionsList = document.querySelectorAll(".option")

    optionsList.forEach(o => o.remove())
}

function optionSelector() {
    const optionsList = document.querySelectorAll(".option")

    optionsList.forEach(o => {
        o.addEventListener("click", () => {
            selected.innerHTML = o.querySelector("label").innerHTML;
            optionsContainer.classList.remove("active")
        })
    })
}


const slider = document.getElementById("slider");
let number = document.getElementById('volume-number');

slider.oninput = function() {
    number.innerHTML = slider.value
}