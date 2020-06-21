/* - Regione per timer - */

// https://jsfiddle.net/Daniel_Hug/pvk6p/
// https://stackoverflow.com/questions/8779845/javascript-setinterval-not-working


/* - Variabili globali */

let seconds = 0;
let minutes = 0;

let gameTimer = document.getElementById("gameTimer");

let name = document.getElementById("nameInput");

let timer = null;

let stopTimerButton = document.getElementById("stopTimerButton");
stopTimerButton.disabled=true;

let startTimerButton=document.getElementById("startTimerButton");



/* Funzioni */

function addSecond() {
    seconds++;
    if (seconds == 60) {
        seconds = 0;
        minutes++;
    }
    // parte da 00:01
    if (seconds < 10) {
        gameTimer.textContent = "0" + minutes + ":" + "0" + seconds;
    } else {
        gameTimer.textContent = "0" + minutes + ":" + seconds;
    }
    // richiama setTimer per impostare la nuova chiamata ad addSeconds

}

function startGameTimer() {
    // check se il nome è presente
    if(name.value.length==0){
        alert("Inserire il nome prima di iniziare a giocare!");
    }else{
        // se è presente, disabilitare il text input
        name.disabled=true;
        // rendere attive le carte
        cardsInizialization();

        visualizzaCarte();
        // avvio timer
        window.setTimeout("avviaTimer()", 2000);

        
        
    }
}

function avviaTimer(){
    // avvio timer

    timer = window.setInterval(addSecond, 1000);

    // disabilitare il tasto start
    startTimerButton.disabled = true;
    stopTimerButton.disabled=false;
}

function stopGameTimer() {
    clearInterval(timer);
    //disabilita tasto stop e card
    stopTimerButton.disabled=true;
    cardsDisabling();
    // salvataggio in localStorage
    let card_rimaste=cardRimanenti();
    giocatori.push(new Giocatore(name.value, gameTimer.textContent, card_rimaste));
    LS.save();
    // flush del timer
    alert(`Complimenti ${name.value}, hai finito in ${gameTimer.textContent} secondi e hai lasciato ${card_rimaste} carte! 
I tuoi dati sono stati salvati correttamente! 
Inserisci un nuovo nome, premi su stard e comincia una nuova partita!`);
    stopTimerButton.disabled=true;
    startTimerButton.disabled = false;
    gameTimer.textContent="00:00";
    name.value="";
    name.disabled=false;
    reset();
}

/* - Fine regione per timer -*/