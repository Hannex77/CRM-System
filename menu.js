links = document.getElementById("links")
button = document.getElementById("button")
var menu_open = false

button.addEventListener("click", function () {
    if (menu_open) {
        links.style.maxHeight = "0"
        menu_open = false
    } else {
        links.style.maxHeight = "150px"
        menu_open = true
    }
})
