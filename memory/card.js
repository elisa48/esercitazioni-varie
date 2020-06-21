const cards = document.querySelectorAll(".flip-card");


var carta1 = undefined,

    carta2 = undefined;

function visualizzaCarte(){
    for (card of cards) {
        card.classList.add("visualizza");
    }
    window.setTimeout("nascondiCarte()", 2000);
}

function nascondiCarte(){
    for (card of cards) {
        card.classList.remove("visualizza");
    }
}


function cardsInizialization() {
    let carteDaPosizionare = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
    console.log("cardsInizialization");
    for (card of cards) {
        let numero = parseInt(Math.random() * carteDaPosizionare.length);
        card.querySelector(".numeroCarta").textContent = carteDaPosizionare[numero];
        carteDaPosizionare.splice(numero, 1);
        card.addEventListener("click", turnCard);
    }
}

function cardsDisabling(){
    
    for(card of cards)
        card.removeEventListener("click",turnCard);
}

function turnCard(event) {
    if (carta1 === undefined) {
        carta1 = event.currentTarget;
        carta1.classList.add("selezionate");
        console.log("turnCard 1 " + carta1);
    } else if (carta2 === undefined && carta1 !== event.currentTarget) {
        stopTimerButton.disabled=true;
        carta2 = event.currentTarget;
        carta2.classList.add("selezionate");
        console.log("turnCard 2 "+ carta2);
        window.setTimeout("checkCarta()", 1000);
        
    }
    
}



function checkCarta() {
    if (carta1 !== undefined && carta2 !== undefined) {
        let figlio1 = carta1.querySelector(".numeroCarta").textContent;
        let figlio2 = carta2.querySelector(".numeroCarta").textContent;

        if (figlio1 === figlio2) {
            coppiaCorretta(carta1, carta2);
        } else {
            coppiaScorretta(carta1, carta2);
        }

        console.log("checkCarta 1 "+ carta1);
        console.log("checkCarta 2 "+ carta2);
    }
    
}

function togliCoppiaCorretta() {
    carta1.classList.add("scompari");
    carta2.classList.add("scompari");
    setUndefined();
    if(!possoContinuare()){
        stopGameTimer();
    }else{
        stopTimerButton.disabled=false;
    }
    
}

function togliCoppiaScorretta() {
    carta1.classList.remove("mostra-errore");
    carta2.classList.remove("mostra-errore");
    setUndefined();
    stopTimerButton.disabled=false;
}

function coppiaScorretta(carta1, carta2) {
    carta1.classList.remove("selezionate");
    carta2.classList.remove("selezionate");
    carta1.classList.add("mostra-errore");
    carta2.classList.add("mostra-errore");
    window.setTimeout("togliCoppiaScorretta()", 500);
    
    console.log("Oh mi dispiace!");
}


function coppiaCorretta(carta1, carta2) {
    carta1.classList.add("mostra-successo");
    carta2.classList.add("mostra-successo");
    window.setTimeout("togliCoppiaCorretta()", 500);
    // lascia stare perfetto così
    console.log("Yatta!");
}


function setUndefined() {
    carta1 = undefined;
    carta2 = undefined;
}

function possoContinuare(){
    let continuo=false;

    for (card of cards){
        if(!card.classList.contains("scompari")){
            continuo=true;
            console.log("continuo if "+continuo);
        }
            
    }
    console.log("continuo");

    return continuo;
}



function reset(){
    for(card of cards){
       
        card.classList.remove("scompari","selezionate","mostra-successo");
        
    }
    stopTimerButton.disabled=true;
}