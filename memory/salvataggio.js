function Giocatore(nome, minuti, secondi, carte_rimanenti) {
    this.nome = nome;
    this.minuti = minuti;
    this.secondi = secondi;
    this.carte_rimanenti = carte_rimanenti;
    
};

let giocatori =[];
const lista_risultati_sotto=document.querySelector("#classifica_sotto");
const lista_risultati_sopra=document.querySelector("#classifica_sopra");

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
        this.get().forEach(giocatore => { giocatori.push(new Giocatore(giocatore.nome, giocatore.minuti, giocatore.secondi, giocatore.carte_rimanenti)); });
        stampaRisultati();
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

function stampaRisultati(){
    lista_risultati_sopra.innerHTML="";
    lista_risultati_sotto.innerHTML="";
    giocatori.forEach(giocatore =>{
        console.log(giocatore);

    })

    console.log("sort");
    giocatori.sort(function(a,b){
        console.log("a carte " +a.carte_rimanenti + " " +a.secondi);
            console.log("b carte " + b.carte_rimanenti + " " + b.secondi);
        if(a.carte_rimanenti<b.carte_rimanenti){
            console.log("primo if");
            return -1;
        }else{
            if(a.carte_rimanenti==b.carte_rimanenti && a.minuti==b.minuti && a.secondi<b.secondi){
                console.log("secondo if");
                return -1;
            }else{
                if(a.carte_rimanenti==b.carte_rimanenti && a.minuti<b.minuti){
                    console.log("terzo if");
                    return -1;
                }else{
                    console.log("else");
                    return 1;
                }
            }
        }
        
    });

    giocatori.forEach(giocatore =>{
        
        const list_item=document.createElement("li");

        const nome= document.createElement("span");
        nome.textContent=giocatore.nome + " ";
        const tempo=document.createElement("span");
        if(parseInt(giocatore.minuti)<10){
            if(parseInt(giocatore.secondi)<10){
                tempo.textContent="0" + giocatore.minuti + ":0" + giocatore.secondi + " ";
            }else{
                tempo.textContent="0" + giocatore.minuti + ":" + giocatore.secondi + " ";
            }
        }else{
            if(parseInt(giocatore.secondi)<10){
                tempo.textContent=giocatore.minuti + ":0" + giocatore.secondi + " ";
            }else{
                tempo.textContent=giocatore.minuti + ":" + giocatore.secondi + " ";
            }
        }
        
        const carte=document.createElement("span");
        carte.textContent=giocatore.carte_rimanenti;

        list_item.appendChild(nome);
        list_item.appendChild(tempo);
        list_item.appendChild(carte);

        lista_risultati_sopra.appendChild(list_item);
        lista_risultati_sotto.appendChild(list_item.cloneNode(true));

    })
}