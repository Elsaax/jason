"use strict";

/* Création de la classe Survivant avec:
    un nom
    un trait de caractère
    un chance de pouvoir esquiver
    un chance de mettre un coup quand le survivant meurt
    /!\ les survivants n'ont pas de pv, il se font instantanément tué par jason si il n'esquive pas
*/
class Survivant{
    constructor(name, caractere, dodge, luck){
        this.name = name;
        this.caractere = caractere;
        this.dodge = dodge;
        this.luck = luck;
    }
}

// fonction qui renvoie un nbr entier de 0 a max
//( si max= = 1 la fonction renvoie 0, si max = 4 la fonction renvoie soit 0, 1, 2 ou 3)
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

/* Choisi x valeur aléatoirement dans un tableau de chaine de caractère
renvoie une liste avec seulement x instances de la premiere liste
Chaque instance de la seconde liste est unique ( ne renvoie pas 2 fois la même valeur de la première liste)
*/
function choixListUnique(list, a){
    let listFinal = []; // création d'une list vide qui sera renvoyer en fin de fonction
    for( let i = 0; i < a; i++){ // le for occure le nbr de foix que l'on veut de prénoms
        let randonInt = getRandomInt(list.length) // récupère un nom aléatoirement dans la première list
        listFinal.push( list[randonInt]) // ajoute celui ci a la list final
        list.splice(randonInt, 1) // et supprime celui-ci de la premiere
    }
    return listFinal;
}

/* renvoie un nombre aléatoire d'une liste
*/
function choixList(list){
    let randomNbr = getRandomInt(list.length);
    return list[randomNbr];
}

// création de Jason ( sac à pv )
let jason = 100;
// création d'une liste de prénom
let listPrenom = [
    "Alice", "Bob", "Charlie", "David", "Emma", "Frank",
    "Grace", "Henry", "Ivy", "Jack", "Katherine", "Leo",
    "Mia", "Noah", "Olivia", "Peter", "Quinn", "Rachel",
    "Samuel", "Taylor", "Ursula", "Victor", "Wendy", "Xander",
    "Yasmine", "Zane", "Ava", "Benjamin", "Chloe", "Daniel",
    "Ella", "Finn", "Gabriella", "Hudson", "Isabella", "Jacob",
    "Lily", "Mason", "Natalie", "Owen", "Penelope", "Quentin",
    "Rebecca", "Sebastian", "Sophia", "Thomas", "Uma", "Vincent",
    "Willow", "Xavier", "Yara", "Zachary", "Abigail", "Brody",
    "Catherine", "Dylan", "Eleanor", "Freddie", "Giselle", "Hayden",
    "Isaac", "Jasmine", "Kai", "Lila", "Max", "Nora", "Oliver",
    "Piper", "Quincy", "Riley", "Stella", "Theodore", "Ulysses",
    "Violet", "Wyatt", "Xena", "Yuki", "Zara"
  ];
// création d'une liste de caractère
let listCaractere = [
    "Aventureux(se)", "Brillant(e)", "Attentionné(e)", "Déterminé(e)", "Énergique", "Amical(e)",
    "Généreux(se)", "Honnête", "Intelligent(e)", "Joyeux(se)", "Bienveillant(e)", "Fidèle",
    "Modeste", "Attentionné(e)", "Optimiste", "Patient(e)", "Excentrique", "Résilient(e)",
    "Sincère", "Attentionné(e)", "Compréhensif(ve)", "Polyvalent(e)", "Spirituel(le)", "Zélé(e)",
    "Ambitieux(se)", "Audacieux(se)", "Courageux(se)", "Diligent(e)", "Empathique", "Direct(e)",
    "Sociable", "Modeste", "Innovant(e)", "Jovial(e)", "Cultivé(e)", "Détendu(e)",
    "Méticuleux(se)", "Sans jugement", "Ouvert(e) d'esprit", "Passionné(e)", "Vif(ve)", "Débrouillard(e)",
    "Auto-discipliné(e)", "Tolérant(e)", "Simple", "Vivace", "Sage", "Plein(e) de ressources",
    "Tendre", "Humble", "Décontracté(e)", "Non-conformiste", "Réfléchi(e)", "Sage",
    "Original(e)", "Rayonnant(e)", "Jeune d'esprit", "Zeste"
];

// création d'une liste de chance d'esquiver
let listDodge = [0.4, 0.5, 0.6, 0.7, 0.8];
// création de la liste de chance de mettre un coup en mourant
let listLuck = [0.3, 0.4, 0.5, 0.6, 0.7];
// variable : combien de survivants sont pourchasser par Jason
let nbrSurvivant = 1;
// liste des suvrvivants
let listSuvrivant = [];
let listSuvrivantMort = [];

//création des survivants
// on recupere les noms et caractères unique de chaque survivant
let listPrenomSurvivant = choixListUnique(listPrenom, nbrSurvivant);
let listCaractereSurvivant = choixListUnique(listCaractere, nbrSurvivant);
//console.log(listCaractereSurvivant);
//console.log(listPrenomSurvivant);
for (let i = 0; i < nbrSurvivant; i ++){
    let survivant = new Survivant(listPrenomSurvivant[i], listCaractereSurvivant[i], choixList(listDodge), choixList(listLuck));
    console.log(survivant);
    listSuvrivant.push(survivant);
}
console.log(listSuvrivant); // vérifie la liste des survivants


while (jason > 0 && listSuvrivant.length != 0 ){ // tant que jason est en vie et que au moins un survivant est en vie
    for (let i = 0; i < listSuvrivant.length; i++){ 
        if (jason <=0 ){ // verifie que jason est en vie avant tout
            i = listSuvrivant.length; // sort du for
        } else if (listSuvrivant[i].dodge > Math.random()){ // sinon si le survivant esquive
            jason -= 10; // attaque jason
            console.log(listSuvrivant[i].name + " a esquivé et inflige 10 dégats à Jason."); // message d'alert
            console.log("Il reste " + jason + " pv à Jason.");
        } else { // si le survivant n'esquive pas 
            if ( listSuvrivant[i].luck > Math.random()){ // si le survivant est chanceux
                jason -= 15; // inflige 15 dégats a jason
                console.log(listSuvrivant[i].name + " n'a pas esquivé mais inflige 15 dégats a Jason."); // message d'alert
                console.log("Il reste " + jason + " pv à Jason.");
                listSuvrivantMort.push(listSuvrivant[i]); // ajout a la list des survivants mort
                listSuvrivant.splice(i, 1); // suppression a la liste des survivant en vie
            } else { // si le survivants n'est pas chanceux
                console.log(listSuvrivant[i].name + " n'a pas esquivé et est mort sur le coup."); // message d'alert
                listSuvrivantMort.push(listSuvrivant[i]);
                listSuvrivant.splice(i, 1);
                console.log("Il reste " + jason + " pv à Jason.");   
            }
        }
    }
}

if (jason <= 0){ // a la fin de la boucle while si jason est mort
    console.log ("Jason a été tué par les survivants.");
    console.log("Liste des survivants:");
    for (let i = 0; i < listSuvrivant.length; i++){ // liste des survivants print un par un
        console.log(listSuvrivant[i].name);
    }
    console.log("Liste des morts:");
    for (let i = 0; i < listSuvrivantMort.length; i++){ // liste des morts print un par un
        console.log(listSuvrivantMort[i].name);
    }
} else { // si jason est toujours en vie (a tué tout les survivants)
    console.log("Jason a tué tout les survivants. Il lui reste " + jason + " points de vie.")
}
