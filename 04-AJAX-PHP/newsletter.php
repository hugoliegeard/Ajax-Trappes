<?php

# Connexion à la BDD
$db = new PDO('mysql:host=localhost;dbname=newsletter', 'root', '', [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
]);

/*
    Pour communiquer avec votre page HTML / JS ; 
    PHP doit retourner une réponse au format JSON par exemple.
*/

# On déclare que notre fichier va renvoyer du JSON.
# Pas obligatoire...
header('Content-Type: application/json');

# Détecter la méthode POST
if ( !empty( $_POST ) ) {

    # Récupération des données POST
    $prenom = $_POST['prenom'];
    $nom    = $_POST['nom'];
    $email  = $_POST['email'];

    # Vérification des données soumises par l'utilisateur
    $errors = [];

        # Vérification du mail
        if( !empty( $email ) ) {
            
            # Si mon email n'est pas vide, alors je vérifie qu'il est au bon format, qu'il est valide.
            if( !filter_var( $email, FILTER_VALIDATE_EMAIL ) ) {

                # Si l'email saisie par l'utilisateur n'est pas au bon format, alors je doit retourner une erreur.
                $errors['isEmailInvalid'] = true;

            } else {

                # Mon email est valide, je vérifie dans la BDD s'il n'est pas déjà présent.

                # Je compte dans ma base le nombre d'emails correspondant à l'email saisie par l'utilisateur dans le formulaire.
                $query = $db->prepare('
                    SELECT COUNT(id) 
                        FROM contact 
                            WHERE EMAIL_CONTACT = :email
                ');

                # Si ma requète retourne 0, il n'y a pas d'email dans la base. Sinon, il y a eu une correspondance.
                $query->bindValue(':email', $email, PDO::PARAM_STR);
                $query->execute();

                $isEmailInDb = $query->fetchColumn();
                if($isEmailInDb) { # Si l'email existe dans la base.

                    # Dans cette condition, $isEmailInDb retourne 1. Soit true. Autrement dit, cet email existe déjà dans la BDD.

                    $errors['isEmailInDb'] = true;

                } else {

                    # Sinon, l'adresse email de mon utilisateur n'est pas déjà présente dans la BDD. Je peux procéder à l'insertion.

                    $query = $db->prepare('
                        INSERT INTO contact (PRENOM_CONTACT, NOM_CONTACT, EMAIL_CONTACT) 
                            VALUES (:prenom, :nom, :email)
                    ');

                    $query->bindValue(':prenom', $prenom, PDO::PARAM_STR);
                    $query->bindValue(':nom', $nom, PDO::PARAM_STR);
                    $query->bindValue(':email', $email, PDO::PARAM_STR);
                    $query->execute();

                }

            }

        } else {

            # Sinon, l'email est vide, je doit retourner une erreur.
            $errors['isEmailEmpty'] = true;

        } // Fin !empty($email)

    # Une fois le traitement terminé, on va faire un retour a l'application.

    if( empty( $errors ) ) {

        # Tous s'est bien passé, je retourne une réponse positive à newsletter.js
        echo json_encode(['success' => true]);
        
    } else {
        
        # Sinon, il y a eu des erreurs, je retourne mon tableau d'erreurs.
        echo json_encode([
            'success' => false,
            'errors' => $errors
        ]);
        
    }

} else { // Fin !empty( $_POST )

    # Ici, aucune données n'a été soumise via POST.
    # $_POST est vide...

    echo json_encode([
        'nodata' => 'Aucune donnée détectée'
    ]);

}
