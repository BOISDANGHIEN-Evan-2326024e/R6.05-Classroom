<?php

namespace App\Entity;

use App\Repository\QuizAttemptRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: QuizAttemptRepository::class)]
class QuizAttempt
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'quizAttempts')]
    private ?Quiz $quiz_associated = null;

    #[ORM\ManyToOne(inversedBy: 'quizAttempts')]
    private ?User $student = null;

    #[ORM\Column(nullable: true)]
    private ?bool $finished = null;

    #[ORM\Column(nullable: true)]
    private ?int $final_grade = null;

    /**
     * @var Collection<int, AnswerAttempt>
     */
    #[ORM\OneToMany(targetEntity: AnswerAttempt::class, mappedBy: 'quiz_attempt_related')]
    private Collection $answers;

    #[ORM\Column(nullable: true)]
    private ?\DateTime $date_termine = null;

    public function __construct()
    {
        $this->answers = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getQuizAssociated(): ?Quiz
    {
        return $this->quiz_associated;
    }

    public function setQuizAssociated(?Quiz $quiz_associated): static
    {
        $this->quiz_associated = $quiz_associated;

        return $this;
    }

    public function getStudent(): ?User
    {
        return $this->student;
    }

    public function setStudent(?User $student): static
    {
        $this->student = $student;

        return $this;
    }

    public function isFinished(): ?bool
    {
        return $this->finished;
    }

    public function setFinished(?bool $finished): static
    {
        $this->finished = $finished;

        return $this;
    }

    public function getFinalGrade(): ?int
    {
        return $this->final_grade;
    }

    public function setFinalGrade(?int $final_grade): static
    {
        $this->final_grade = $final_grade;

        return $this;
    }

    /**
     * @return Collection<int, AnswerAttempt>
     */
    public function getAnswersAttempt(): Collection
    {
        return $this->answers;
    }

    public function addAnswerAttempt(AnswerAttempt $answer): static
    {
        if (!$this->answers->contains($answer)) {
            $this->answers->add($answer);
            $answer->setQuizAttemptRelated($this);
        }

        return $this;
    }

    public function removeAnswerAttempt(AnswerAttempt $answer): static
    {
        if ($this->answers->removeElement($answer)) {
            // set the owning side to null (unless already changed)
            if ($answer->getQuizAttemptRelated() === $this) {
                $answer->setQuizAttemptRelated(null);
            }
        }

        return $this;
    }

    public function getDateTermine(): ?\DateTime
    {
        return $this->date_termine;
    }

    public function setDateTermine(?\DateTime $date_termine): static
    {
        $this->date_termine = $date_termine;

        return $this;
    }
}
