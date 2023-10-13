CREATE SCHEMA medical;

use medical;

CREATE TABLE medecin (
    medecin_id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    mot_de_passe VARCHAR(255) NOT NULL
);

CREATE TABLE rendezvous (
    rendezvous_id INT AUTO_INCREMENT PRIMARY KEY,
    medecin_id INT,
    patient VARCHAR(255) NOT NULL,
    date_et_heure DATETIME NOT NULL,
    motif VARCHAR(255),
    duree INT,
    FOREIGN KEY (medecin_id) REFERENCES medecin(medecin_id)
);

