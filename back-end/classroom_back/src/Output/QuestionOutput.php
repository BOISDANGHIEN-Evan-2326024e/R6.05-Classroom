<?php

namespace App\Output;

use App\Entity\Question;

class QuestionOutput
{
    public int $id;
    public ?int $numero;
    public ?string $libelle;
    public ?int $valeur;
    public array $answers;

    public function __construct(Question $question)
    {
        $this->id = $question->getId();
        $this->numero = $question->getNumero();
        $this->libelle = $question->getLibelle();
        $this->valeur = $question->getValeur();
        $this->answers = array_map(fn($a) => [
            'id' => $a->getId(),
            'label' => $a->getLabel()
        ], $question->getAnswers()->toArray());
    }
}