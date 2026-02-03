<?php

namespace App\Output;

use App\Entity\User;

class UserOutput
{
    public int $id;
    public string $email;
    public string $prenom;
    public string $nom;
    public string $dateInscription;
    public array $matieres;

    public function __construct(User $user)
    {
        $this->id = $user->getId();
        $this->email = $user->getEmail();
        // Placeholder car champs inexistants
        $this->prenom = "Jean"; 
        $this->nom = "Dupont"; 
        $this->dateInscription = "2023-09-01"; 

        // Récupère les matiere
        $matieres = [];
        foreach ($user->getCourses() as $course) {
            $matieres[] = $course->getName(); 
        }
        $this->matieres = array_unique($matieres);
    }
}