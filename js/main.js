// Wacht tot de DOM geladen is voordat functies worden uitgevoerd
    addEventsToInput(); // Voeg keyup-event toe aan inputvelden voor het maken van nieuwe taken
    changeTitleToInput(); // Voeg click-event toe aan koppen om de titel te bewerken

// Functie om keyup-event toe te voegen aan inputvelden voor het maken van nieuwe taken
function addEventsToInput() {
    var taskInputs = document.getElementsByClassName("toDo__input");
    for (var i = 0; i < taskInputs.length; i++) {
        taskInputs[i].addEventListener("keyup", function (event) {
            newTask(event); // Roep newTask-functie aan wanneer Enter wordt ingedrukt
        });
    }
}

// Functie om click-event toe te voegen aan koppen om de titel te bewerken
function changeTitleToInput() {
    var headers = document.getElementsByClassName("toDo__header");
    for (var i = 0; i < headers.length; i++) {
        headers[i].addEventListener("click", function () {
            var oldTitle = this.children[0].innerText; // Bewaar de oude titel
            this.children[0].remove(); // Verwijder de oude titel
            var newInput = document.createElement("input"); // Maak een nieuw inputveld
            newInput.classList = "toDo__headerInput"; // Voeg klasse toe aan het inputveld
            newInput.value = oldTitle; // Zet de waarde van het inputveld als de oude titel
            this.appendChild(newInput); // Voeg het inputveld toe aan de header
            newInput.focus(); // Zorg ervoor dat het nieuwe inputveld de focus krijgt

            // Voeg event listener toe voor keyup-event op het inputveld
            newInput.onkeyup = function (event) {
                if (event.key === "Enter") { // Als Enter wordt ingedrukt
                    var newTitle = event.target.value; // Haal de nieuwe titel op
                    var newHeading = document.createElement("h2"); // Maak een nieuw heading element aan
                    event.target.parentElement.appendChild(newHeading); // Voeg het nieuwe heading element toe aan de header
                    newHeading.innerText = newTitle; // Zet de tekst van het nieuwe heading element als de nieuwe titel
                    newHeading.classList = "toDo__heading"; // Voeg klasse toe aan het nieuwe heading element
                    this.remove(); // Verwijder het inputveld
                }
            }
        });
    }
}

// Functie om een nieuwe taak toe te voegen
function newTask(event) {
    if (event.key === "Enter") { // Als Enter wordt ingedrukt
        var tasksList = event.target.parentElement.parentElement.children[1].children[0]; // Zoek de lijst met taken
        var newTask = document.createElement("li"); // Maak een nieuw list-item element aan
        newTask.innerText = event.target.value; // Zet de tekst van het nieuwe list-item als de ingevoerde waarde
        newTask.classList = "toDo__task"; // Voeg klasse toe aan het nieuwe list-item
        newTask.dataset.running = "false"; // Zet een dataset attribuut om bij te houden of de taak al dan niet uitgevoerd wordt
        tasksList.appendChild(newTask); // Voeg het nieuwe list-item toe aan de lijst met taken
        event.target.value = ""; // Wis de ingevoerde waarde uit het inputveld

        // Voeg een event listener toe voor click-event op het nieuwe list-item
        newTask.addEventListener("click", function (event) {
            setOrClearTimer(event); // Roep setOrClearTimer-functie aan wanneer het list-item wordt geklikt
        });
    }
}

var allTasks = document.getElementsByClassName("toDo__task");
for(var i = 0; i < allTasks.length; i++){
    allTasks[i].onclick = function(event){
        setOrClearTimer(event);
    }
}
// Functie om een taak als 'gedaan' te markeren en deze te verplaatsen naar een aparte lijst
function toDone(event) {
    timer = setTimeout(function () {
        var doneTask = document.createElement("li"); // Maak een nieuw list-item element aan
        doneTask.classList = "toDo__task toDo__task--done"; // Voeg klasse toe aan het nieuwe list-item om aan te geven dat het 'gedaan' is
        doneTask.innerText = event.target.innerText; // Zet de tekst van het nieuwe list-item als de tekst van het geselecteerde list-item
        document.getElementById("js--done").appendChild(doneTask); // Voeg het nieuwe list-item toe aan de lijst met 'gedane' taken
        event.target.remove(); // Verwijder het geselecteerde list-item uit de oorspronkelijke lijst
    }, 3000); // Stel een time-out in van 3 seconden voordat de taak als 'gedaan' wordt gemarkeerd
}

// Functie om een timer in te stellen of te annuleren wanneer een taak wordt aangeklikt
function setOrClearTimer(event) {
    if (event.target.dataset.running === "false") { // Als de timer niet loopt
        event.target.classList.toggle("toDo__task--done"); // Markeer de taak als 'gedaan' door de klasse toe te voegen
        event.target.dataset.running = "true"; // Zet de dataset attribuut om naar 'true' om aan te geven dat de timer loopt
        toDone(event); // Roep toDone-functie aan om de taak als 'gedaan' te markeren
    } else if (event.target.dataset.running === "true") { // Als de timer loopt
        event.target.classList.toggle("toDo__task--done"); // Toggle de klasse om de markering als 'gedaan' ongedaan te maken
        clearTimeout(timer); // Annuleer de timer
        event.target.dataset.running = "false"; // Zet de dataset attribuut terug naar 'false'
    }
}

// Voeg een click-event toe aan de FAB (Floating Action Button) om een nieuwe kaart toe te voegen
var fab = document.getElementById("js--fab");
fab.addEventListener("click", function () {
    makeNewCard(); // Roep makeNewCard-functie aan wanneer er op de FAB wordt geklikt
});

// Functie om een nieuwe kaart toe te voegen
function makeNewCard() {
    /* Maak de kaart */
    var newTodo = document.createElement("article"); // Maak een nieuw article element aan
    newTodo.classList = "toDo"; // Voeg klasse toe aan het nieuwe article element

    /* Maak de header */
    var newHeader = document.createElement("header"); // Maak een nieuw header element aan
    newHeader.classList = "toDo__header"; // Voeg klasse toe aan het nieuwe header element

    /* Maak de titel */
    var newHeading = document.createElement("h2"); // Maak een nieuw h2 element aan
    newHeading.classList = "toDo__heading"; // Voeg klasse toe aan het nieuwe h2 element
    newHeading.innerText = "Default"; // Zet de standaard tekst voor de titel

    /* Maak de sectie */
    var newSection = document.createElement("section"); // Maak een nieuw section element aan
    newSection.classList = "toDo__body"; // Voeg klasse toe aan het nieuwe section element

    /* Maak de UL */
    var newList = document.createElement("ul"); // Maak een nieuw unordered list element aan
    newList.classList = "toDo__tasks"; // Voeg klasse toe aan het nieuwe unordered list element

    /* Maak de footer */
    var newFooter = document.createElement("footer"); // Maak een nieuw footer element aan
    newFooter.classList = "toDo__footer"; // Voeg klasse toe aan het nieuwe footer element

    var newInput = document.createElement("input"); // Maak een nieuw input element aan
    newInput.classList = "toDo__input"; // Voeg klasse toe aan het nieuwe input element
    newInput.type = "text"; // Stel het type van het input element in op 'text'
    newInput.placeholder = "Enter a task..."; // Voeg een placeholder tekst toe aan het input element
    newInput.id = "js--input"; // Voeg een id toe aan het input element

    newFooter.appendChild(newInput); // Voeg het input element toe aan de footer
    newSection.appendChild(newList); // Voeg de unordered list toe aan de sectie
    newHeader.appendChild(newHeading); // Voeg de titel toe aan de header
    newTodo.appendChild(newHeader); // Voeg de header toe aan de kaart
    newTodo.appendChild(newSection); // Voeg de sectie toe aan de kaart
    newTodo.appendChild(newFooter); // Voeg de footer toe aan de kaart

    document.body.appendChild(newTodo); // Voeg de kaart toe aan de pagina
    addEventsToInput(); // Voeg event listeners toe aan de inputvelden voor de nieuwe kaart
    changeTitleToInput(); // Voeg event listener toe aan de titel van de nieuwe kaart om deze te bewerken
}
