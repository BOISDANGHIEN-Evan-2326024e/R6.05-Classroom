<?php

namespace App\Entity;

use App\Repository\QuizRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: QuizRepository::class)]
class Quiz
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $name = null;

    #[ORM\Column(nullable: true)]
    private ?int $diffilculty = null;

    #[ORM\ManyToOne(inversedBy: 'quizzes')]
    private ?Course $course_associated = null;

    /**
     * @var Collection<int, Question>
     */
    #[ORM\OneToMany(targetEntity: Question::class, mappedBy: 'quiz_related')]
    private Collection $questions;

    /**
     * @var Collection<int, QuizAttempt>
     */
    #[ORM\OneToMany(targetEntity: QuizAttempt::class, mappedBy: 'quiz_associated')]
    private Collection $quizAttempts;

    public function __construct()
    {
        $this->questions = new ArrayCollection();
        $this->quizAttempts = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getDiffilculty(): ?int
    {
        return $this->diffilculty;
    }

    public function setDiffilculty(?int $diffilculty): static
    {
        $this->diffilculty = $diffilculty;

        return $this;
    }

    public function getCourseAssociated(): ?Course
    {
        return $this->course_associated;
    }

    public function setCourseAssociated(?Course $course_associated): static
    {
        $this->course_associated = $course_associated;

        return $this;
    }

    /**
     * @return Collection<int, Question>
     */
    public function getQuestions(): Collection
    {
        return $this->questions;
    }

    public function addQuestion(Question $question): static
    {
        if (!$this->questions->contains($question)) {
            $this->questions->add($question);
            $question->setQuizRelated($this);
        }

        return $this;
    }

    public function removeQuestion(Question $question): static
    {
        if ($this->questions->removeElement($question)) {
            // set the owning side to null (unless already changed)
            if ($question->getQuizRelated() === $this) {
                $question->setQuizRelated(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, QuizAttempt>
     */
    public function getQuizAttempts(): Collection
    {
        return $this->quizAttempts;
    }

    public function addQuizAttempt(QuizAttempt $quizAttempt): static
    {
        if (!$this->quizAttempts->contains($quizAttempt)) {
            $this->quizAttempts->add($quizAttempt);
            $quizAttempt->setQuizAssociated($this);
        }

        return $this;
    }

    public function removeQuizAttempt(QuizAttempt $quizAttempt): static
    {
        if ($this->quizAttempts->removeElement($quizAttempt)) {
            // set the owning side to null (unless already changed)
            if ($quizAttempt->getQuizAssociated() === $this) {
                $quizAttempt->setQuizAssociated(null);
            }
        }

        return $this;
    }
}
