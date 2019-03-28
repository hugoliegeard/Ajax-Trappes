// -- Déclarer un tableau numérique
const Prenoms = ["Hugo", "David", "Farid", "Justine", "Khalid"];

// -- Aperçu dans la console
console.log(Prenoms);

// -- Si je veux connaitre le nombre d'éléments (Prénoms) de mon Tableau ?
let nombreElementsDansMonTableau = Prenoms.length;
console.log(nombreElementsDansMonTableau);

// -- Pour récupérer une valeur dans le tableau numérique j'utilise son indice. (index)
console.log( Prenoms[1] ); // David
console.log( Prenoms[3] ); // Justine

let i = 2;
console.log( Prenoms[i] ); // Farid

// -- Pour i = 0 (Au départ i vaut 0) ; tant que i < (est strictement inférieur) à nombreElementsDansMonTableau (Prenoms.length) ; alors i++. (j'incrémente i de 1)
for( let i = 0 ; i < nombreElementsDansMonTableau ; i++ ) {

    // -- Tous ce qui est situé à l'intérieur des accolades, sera dans la boucle.
    console.log( 'Ici, i = ' + i );
    console.log( Prenoms[i] );
    console.log( '---' );

} // Fin de la boucle For

// -- Voyons maintenant, comment procéder avec des objets

const Contact = {
    // INDICE    :    VALEUR
    prenom  :   "Hugo",
    nom     :   "LIEGEARD",
    tel     :   "0783 97 15 15"
};

// -- Aperçu dans la console
console.log( Contact );

// -- Pour récupérer les valeurs d'un objet, j'utilise le "." suivi de l'INDICE.
console.log( "Prénom : " + Contact.prenom );
console.log( "Nom : " + Contact.nom );
console.log( "Tel : " + Contact['tel'] ); // Autre possibilité

const Contacts = [
    "Zita",
    "Hugo",
    {
        // INDICE    :    VALEUR
        prenom  :   "Ivan",
        nom     :   "BRAGA",
        age     :   18
    },
    {
        // INDICE    :    VALEUR
        prenom  :   "Bruno (Jean-Luc)",
        nom     :   "COUGNY",
        age     :   47
    }
];

// -- Aperçu dans la console
console.clear();
console.log( Contacts );

// -- Comment accéder aux valeurs de mon objet, dans le tableau numérique.

// -- 1. D'abord, je récupère mon objet
console.log( Contacts[2] );

// -- 2. Pour accéder aux valeurs de mon objet
console.log( "Prénom : " + Contacts[2].prenom );
console.log( "Nom : " + Contacts[2].nom );
console.log( "Age : " + Contacts[2].age );

// -- En résumé, j'accède à la valeur de l'indice "prenom" de l'objet situé à l'index 2 de mon tableau numérique "Contacts".

// -- Comment parcourir un tableau avec des objets.
// -- Partons du tableau suivant :

const Etudiants = [
    { prenom: "Hugo", nom: "LIEGEARD", competence: "Fullstack" },
    { prenom: "David", nom: "GUERRA", competence: "Front" },
    { prenom: "Rachid", nom: "KAMAN", competence: "Back" },
    { prenom: "Zita", nom: "NGUYEN", competence: "Fullstack" },
    { prenom: "Thomas", nom: "CHEYLAS", competence: "Front" },
    { prenom: "Asam", nom: "AHMAD", competence: "Front" },
];

// -- Regardons dans la console
console.log( Etudiants );

// -- Si je veux connaître le nombre d'étudiants :
const nombreEtudiants = Etudiants.length;
console.log("Nombre d'étudiants = " + nombreEtudiants);

/* ------------------------------------------------------
|       ~ ~ ~ ~    💀  EXERCICE 😜     ~ ~ ~ ~          |
|                                                        |  
|                                                        |  
|  Affichez dans la page HTML à l'aide de jQuery la      | 
|  liste (ul>li) des Etudiants et leur compétence.       | 
|                                                        | 
|_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _  */

// jQuery(document).ready(function() { ... });
// $(document).ready(function() { ... });

$(function() {

    // Ici, jQuery est prêt à travailler !
    console.log( 'jQuery is ready to rock !' );

    // Création d'une balise <ul></ul>
    const ul = $('<ul>');

    for( let i = 0 ; i < nombreEtudiants ; i++ ) {

        // -- Je récupère l'étudiant en cours dans ma boucle.
        let Etudiant = Etudiants[i];

        // Aperçu dans la console.
        console.log( Etudiant );

        $(`
            <li>
                <strong> ${Etudiant.prenom} ${Etudiant.nom} </strong>
                : ${Etudiant.competence}
            </li>
        `).appendTo( ul );

    } // Fin boucle For

    ul.appendTo( $('body') );

});