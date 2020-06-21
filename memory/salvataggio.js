function Giocatore(nome, tempo, carte_rimanenti) {
    this.nome = nome;
    this.tempo = tempo;
    this.carte_rimanenti = carte_rimanenti;
    
};

let giocatori =[];

const LS = {
    // Chiave per il localstorage
    lsKey: 'giocatori',

    get: function() {
        // Prelevo il ls eseguo il parsing per convertirlo da stringa a codice
        return JSON.parse(window.localStorage.getItem(this.lsKey));
    },

    save: function() {
        // Salvo il contenuto da "giocatori" al ls (prima lo converto in stringa)
        window.localStorage.setItem(this.lsKey, JSON.stringify(giocatori));
    },
  
    // Metodo da usare per inizializzare il ls
    init: function() {
        // Controllo se il ls esiste gia'
        if (window.localStorage[this.lsKey] == undefined) {
            // Se non esiste salvo il ls (che equivarra' a un array vuoto)
            this.save();
        }

        // Prelevo il ls e lo pusho uno a uno dentro "giocatori"
        this.get().forEach(giocatore => { giocatori.push(new Giocatore(giocatore.nome, giocatore.tempo, giocatore.carte_rimanenti)); });
        
    },
};

LS.init();

function cardRimanenti(){
    let card_rimanenti=0;

    for (card of cards){
        if(!card.classList.contains("scompari")){
            card_rimanenti +=1;
            console.log("card rimanenti " + card_rimanenti);
        }
            
    }
    return card_rimanenti;
}