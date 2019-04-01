/* -------------------------------------------------
                TRAITEMENT JQUERY
-------------------------------------------------- */

$(function() {

    // jQuery est maintenant chargé !
    console.log('jQuery is ready');

    // -- J'écoute la soumission du formulaire
    $('#newsletter').submit(function(event) {

        // Ma fonction anonyme sera déclenchée lors de la soumission du formulaire.

        // -- Bloquer la redirection du formulaire
        event.preventDefault();

        // -- Réinitialiser les erreurs
        $('#newsletter .is-invalid').removeClass('is-invalid');
        $('#newsletter .invalid-feedback').remove();
        $('#newsletter .alert-danger').remove();

        // -- Initialisation des variables
        const email     = $('#newsletter input[name="email"]');
        const prenom    = $('#newsletter input[name="prenom"]');
        const nom       = $('#newsletter input[name="nom"]');

        // -- Vérification dans la console
        console.log( email.val() ); // Affiche la valeur du champ email.
        console.log( prenom.val() ); // Pareil pour prénom
        console.log( nom.val() ); // Et nom.

        // -- Vérification de l'email
        if( email.val().length === 0 ) {

            // L'utilisateur n'a rien saisie dans le champ. On ajoute la classe "is-invalid" au champ.
            email.addClass('is-invalid');
            $(`<div class="invalid-feedback">
                    Vérifiez votre email.    
                </div>`).appendTo( email.parent() );

        }

        // Vérification du prénom
        if( prenom.val().length === 0 ) {

            prenom.addClass('is-invalid');
            $(`<div class="invalid-feedback">
                    Vérifiez votre prénom.    
                </div>`).appendTo( prenom.parent() );

        }

        // Vérification du nom
        if( nom.val().length === 0 ) {

            nom.addClass('is-invalid');
            $(`<div class="invalid-feedback">
                    Vérifiez votre nom.    
                </div>`).appendTo( nom.parent() );

        }

        // -- Fin de la vérification des champs -- //

        if( $('#newsletter').find('.is-invalid').length === 0 ) {

            // -- Si je n'ai pas de classe 'is-invalid' parmi les enfants de ma newsletter, alors il n'y a pas d'erreur et je peux procéder à la suite de mon traitement.

            // console.log( $('#newsletter').serialize() );
            // console.log( $(this) ); // équivaut à $('#newsletter')

            $.ajax({
                type    : $(this).attr('method'), // Le type de ma requète dépend de ma methode de mon formulaire.
               
                url     : $(this).attr('action'), // Le fichier qui s'occupera du traitement de la requète AJAX.
                
                data    : $(this).serialize(), // On formate les données pour PHP. cf. serialize() jquery.
                
                dataType: 'JSON', // Les données seront retournées au format JSON par notre serveur.
                
                timeout : 5000 // Le nombre de temps ou $.ajax attendra une réponse du serveur.
            })
            .done( function(resultat) {

                console.clear();
                console.log( resultat.success );

                if(resultat.success) {

                    // Si j'ai un retour positif de mon fichier PHP, j'affiche un message de succès !

                    $('#newsletter').replaceWith(`
                        <div class="alert alert-success">
                            Merci, votre email à bien été ajouté. <br>
                            <u>A très vite dans notre prochaine newsletter !</u>
                        </div>
                    `);

                } else {

                    // Sinon, il y a eu un problème, nous allons vérifier d'où viens le soucis.
                    
                        // A. Email déjà présent dans la base ?
                        if( resultat.errors.isEmailInDb ) {
                            
                            $('#newsletter').prepend(`
                                <div class="alert alert-danger">
                                    Attention, votre adresse email est
                                    <u>déjà présente dans nos listes.</u>
                                </div>
                            `);

                            email.addClass('is-invalid');
                            $(`<div class="invalid-feedback">
                                    Cet email existe déjà.    
                                </div>`).appendTo( email.parent() );

                            $('#newsletter').get(0).reset();

                        } // fin if( resultat.errors.isEmailInDb )

                        // B. Email est invalid ?
                        if( resultat.errors.isEmailInvalid ) { }

                        // C. Email est vide ?
                        if( resultat.errors.isEmailEmpty ) { }
                }

            } );

        } else {

            // -- Sinon, il y a des erreurs dans le formulaire. Je peux afficher un message d'erreur.

            $('#newsletter').prepend(`
                <div class="alert alert-danger">
                    Attention, nous n'avons pas été en mesure 
                    de traiter votre demande. <br>
                    <u>Vérifiez vos informations.</u>
                </div>
            `);

        } // else | find('.is-invalid')

    }); // $('#newsletter').submit()

}); // $(function())