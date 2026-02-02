<?php

namespace App\Entity;

use App\Repository\QuestionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: QuestionRepository::class)]
class Question
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(nullable: true)]
    private ?int $numero = null;

    #[ORM\Column(length: 1500, nullable: true)]
    private ?string $libelle = null;

    #[ORM\Column(nullable: true)]
    private ?int $valeur = null;

    #[ORM\ManyToOne(inversedBy: 'questions')]
    private ?Quiz $quiz_related = null;

    /**
     * @var Collection<int, AnswerAttempt>
     */
    #[ORM\OneToMany(targetEntity: AnswerAttempt::class, mappedBy: 'question_associated')]
    private Collection $answersAttempt;

    /**
     * @var Collection<int, Answer>
     */
    #[ORM\OneToMany(targetEntity: Answer::class, mappedBy: 'question_related')]
    private Collection $answers;

    public function __construct()
    {
        $this->answersAttempt = new ArrayCollection();
        $this->answers = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNumero(): ?int
    {
        return $this->numero;
    }

    public function setNumero(?int $numero): static
    {
        $this->numero = $numero;

        return $this;
    }

    public function getLibelle(): ?string
    {
        return $this->libelle;
    }

    public function setLibelle(?string $libelle): static
    {
        $this->libelle = $libelle;

        return $this;
    }

    public function getValeur(): ?int
    {
        return $this->valeur;
    }

    public function setValeur(?int $valeur): static
    {
        $this->valeur = $valeur;

        return $this;
    }

    public function getQuizRelated(): ?Quiz
    {
        return $this->quiz_related;
    }

    public function setQuizRelated(?Quiz $quiz_related): static
    {
        $this->quiz_related = $quiz_related;

        return $this;
    }

    /**
     * @return Collection<int, AnswerAttempt>
     */
    public function getAnswersAttempt(): Collection
    {
        return $this->answersAttempt;
    }

    public function addAnswerAttempt(AnswerAttempt $answer): static
    {
        if (!$this->answersAttempt->contains($answer)) {
            $this->answersAttempt->add($answer);
            $answer->setQuestionAssociated($this);
        }

        return $this;
    }

    public function removeAnswerAttempt(AnswerAttempt $answer): static
    {
        if ($this->answersAttempt->removeElement($answer)) {
            // set the owning side to null (unless already changed)
            if ($answer->getQuestionAssociated() === $this) {
                $answer->setQuestionAssociated(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Answer>
     */
    public function getAnswers(): Collection
    {
        return $this->answers;
    }

    public function addAnswer(Answer $answer): static
    {
        if (!$this->answers->contains($answer)) {
            $this->answers->add($answer);
            $answer->setQuestionRelated($this);
        }

        return $this;
    }

    public function removeAnswer(Answer $answer): static
    {
        if ($this->answers->removeElement($answer)) {
            // set the owning side to null (unless already changed)
            if ($answer->getQuestionRelated() === $this) {
                $answer->setQuestionRelated(null);
            }
        }

        return $this;
    }
}
