if (!localStorage.getItem("language")) {
    localStorage.setItem("language", "de")
}

function getLanguage() {
    return localStorage.getItem("language")
}

function setLanguage(lang) {
    localStorage.setItem("language", lang)
    updatelang()
}

function updatelang() {
    document.documentElement.lang = localStorage.getItem("language")
    if (localStorage.getItem("language") == "de") {
        if (document.getElementsByClassName("Kundenverwaltungssystem")[0].innerHTML != "Kundenverwaltungssystem") {
            window.location.reload()
        }
        return 0
    }
    fetch("lang/" + localStorage.getItem("language") + ".json")
        .then(response => {
            if (!response.ok) {
                throw new Error('Netzwerkantwort war nicht ok')
            }
            return response.json()
        })
        .then(data => {
            
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    var test = document.getElementsByClassName(key)
                    for (let i = 0; i < test.length; i++) {
                        test[i].innerHTML = data[key]
                    }
                }
            }
        })
        .catch(error => {
            console.error('Es gab ein Problem mit der Fetch-Operation:', error)
        })
    document.getElementById("englishorspanish").value = localStorage.getItem("language")
    document.documentElement.lang = localStorage.getItem("language")

}

document.getElementById('englishorspanish').addEventListener('change', function() {
    setLanguage(this.value)
});

updatelang()
