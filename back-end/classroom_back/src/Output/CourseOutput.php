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
        $this->titre = $course->getName();
        $this->duree = $course->getDuration();
        $this->professeur = $course->getProfessor() ? $course->getProfessor()->getEmail() : 'Anonyme';
        
        // On compte dynamiquement le nombre de ressources liées au cours
        // Assure-toi que la méthode getResources() existe dans ton entité Course
        $this->nombreRessources = $course->getResources() ? count($course->getResources()) : 0; 
    }
}