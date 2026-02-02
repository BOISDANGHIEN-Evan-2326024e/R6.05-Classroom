<?php

namespace App\Output;

use App\Entity\User;

class UserOutput
{
    public int $id;
    public string $email;
    public array $roles;
    public string $prenom; // Placeholder pour le front
    public string $nom;    // Placeholder pour le front
    public array $matieres;
    public int $totalQuizAttempts;

    public function __construct(User $user)
    {
        $this->id = $user->getId();
        $this->email = $user->getEmail();
        $this->roles = $user->getRoles();
        
        $this->prenom = "Jean"; 
        $this->nom = "Dupont";

        // Extraction des noms des cours 
        $this->matieres = array_map(function($course) {
            return $course->getTitre(); 
        }, $user->getCourses()->toArray());

        $this->totalQuizAttempts = $user->getQuizAttempts()->count();
    }
}