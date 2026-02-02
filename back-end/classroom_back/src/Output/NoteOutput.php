<?php

namespace App\Output;

use App\Entity\QuizAttempt;

class NoteOutput {
    public int $id;
    public string $quizTitre;
    public string $matiere;
    public ?int $note;
    public string $date;
    public bool $estFini;

    public function __construct(QuizAttempt $attempt) {
        $this->id = $attempt->getId();
        $this->quizTitre = $attempt->getQuizAssociated() ? $attempt->getQuizAssociated()->getName() : 'Quiz supprimé';
        $this->matiere = $attempt->getQuizAssociated()?->getCourseAssociated() ? $attempt->getQuizAssociated()->getCourseAssociated()->getName() : 'Général';
        $this->note = $attempt->getFinalGrade();
        $this->date = $attempt->getDateTermine() ? $attempt->getDateTermine()->format('d/m/Y') : 'En cours';
        $this->estFini = $attempt->isFinished() ?? false;
    }
}