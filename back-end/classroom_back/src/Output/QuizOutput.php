<?php

namespace App\Output;

use App\Entity\Quiz;

class QuizOutput {
    public int $id;
    public string $nom;
    public int $difficulte;
    public string $nomCours;
    public array $questions;

    public function __construct(Quiz $quiz) {
        $this->id = $quiz->getId();
        $this->nom = $quiz->getName() ?? 'Sans nom';
        $this->difficulte = $quiz->getDiffilculty() ?? 1;
        $this->nomCours = $quiz->getCourseAssociated() ? $quiz->getCourseAssociated()->getName() : 'Général';
        
        $this->questions = array_map(function($q) {
            return [
                'id' => $q->getId(),
                'numero' => $q->getNumero(),
                'libelle' => $q->getLibelle(),
                'points' => $q->getValeur(),
                'reponses' => array_map(function($a) {
                    return [
                        'id' => $a->getId(),
                        'label' => $a->getLabel()
                        // On n'envoie PAS 'isReelAnswer' ici pour éviter la triche !
                    ];
                }, $q->getAnswers()->toArray())
            ];
        }, $quiz->getQuestions()->toArray());
    }
}