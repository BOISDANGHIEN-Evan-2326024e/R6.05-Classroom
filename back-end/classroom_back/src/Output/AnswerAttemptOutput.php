<?php

namespace App\Output;

use App\Entity\AnswerAttempt;

class AnswerAttemptOutput
{
    public int $id;
    public int $questionId;
    public ?int $answerSelectedId;

    public function __construct(AnswerAttempt $attempt)
    {
        $this->id = $attempt->getId();
        $this->questionId = $attempt->getQuestionAssociated()->getId();
        $this->answerSelectedId = $attempt->getAnswerSelected()?->getId();
    }
}