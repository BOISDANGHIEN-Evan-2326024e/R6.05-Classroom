<?php

namespace App\Output;

use App\Entity\Course;

class CourseOutput
{
    public int $id;
    public string $titre;
    public int $duree;
    public string $professeur;
    public int $nombreRessources;

    public function __construct(Course $course)
    {
        $this->id = $course->getId();
        $this->titre = $course->getName(); // entité utilise getName
        $this->duree = $course->getDuration();
        $this->professeur = $course->getProfessor() ? $course->getProfessor()->getEmail() : 'Anonyme';
        // Compte le nombre de fichiers/ressources
        $this->nombreRessources = 0; 
    }
}