var content = document.getElementById("newordercontent")
var button = document.getElementById("neworder")
var coll_open = false

button.addEventListener("click", function () {
  if (coll_open) {
    button.classList.remove("open")
    content.style.maxHeight = "0"
    coll_open = false
  } else {
    button.classList.add("open")
    content.style.maxHeight = content.scrollHeight + "px"
    coll_open = true
  }
})