<?php

namespace App\Entity;

use App\Repository\AnswerAttemptRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AnswerAttemptRepository::class)]
class AnswerAttempt
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'answers')]
    private ?Question $question_associated = null;

    #[ORM\ManyToOne(inversedBy: 'answers')]
    private ?QuizAttempt $quiz_attempt_related = null;

    #[ORM\ManyToOne(inversedBy: 'answerAttempts')]
    private ?Answer $answer_selected = null;


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getQuestionAssociated(): ?Question
    {
        return $this->question_associated;
    }

    public function setQuestionAssociated(?Question $question_associated): static
    {
        $this->question_associated = $question_associated;

        return $this;
    }

    public function getQuizAttemptRelated(): ?QuizAttempt
    {
        return $this->quiz_attempt_related;
    }

    public function setQuizAttemptRelated(?QuizAttempt $quiz_attempt_related): static
    {
        $this->quiz_attempt_related = $quiz_attempt_related;

        return $this;
    }

    public function getAnswerSelected(): ?Answer
    {
        return $this->answer_selected;
    }

    public function setAnswerSelected(?Answer $answer_selected): static
    {
        $this->answer_selected = $answer_selected;

        return $this;
    }

}
