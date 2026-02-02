<?php

namespace App\Entity;

use App\Repository\AnswerRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AnswerRepository::class)]
class Answer
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 3000, nullable: true)]
    private ?string $label = null;

    #[ORM\Column(nullable: true)]
    private ?bool $reel_answer = null;

    #[ORM\ManyToOne(inversedBy: 'answers')]
    private ?Question $question_related = null;

    /**
     * @var Collection<int, AnswerAttempt>
     */
    #[ORM\OneToMany(targetEntity: AnswerAttempt::class, mappedBy: 'answer_selected')]
    private Collection $answerAttempts;

    public function __construct()
    {
        $this->answerAttempts = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLabel(): ?string
    {
        return $this->label;
    }

    public function setLabel(?string $label): static
    {
        $this->label = $label;

        return $this;
    }

    public function isReelAnswer(): ?bool
    {
        return $this->reel_answer;
    }

    public function setReelAnswer(?bool $reel_answer): static
    {
        $this->reel_answer = $reel_answer;

        return $this;
    }

    public function getQuestionRelated(): ?Question
    {
        return $this->question_related;
    }

    public function setQuestionRelated(?Question $question_related): static
    {
        $this->question_related = $question_related;

        return $this;
    }

    /**
     * @return Collection<int, AnswerAttempt>
     */
    public function getAnswerAttempts(): Collection
    {
        return $this->answerAttempts;
    }

    public function addAnswerAttempt(AnswerAttempt $answerAttempt): static
    {
        if (!$this->answerAttempts->contains($answerAttempt)) {
            $this->answerAttempts->add($answerAttempt);
            $answerAttempt->setAnswerSelected($this);
        }

        return $this;
    }

    public function removeAnswerAttempt(AnswerAttempt $answerAttempt): static
    {
        if ($this->answerAttempts->removeElement($answerAttempt)) {
            // set the owning side to null (unless already changed)
            if ($answerAttempt->getAnswerSelected() === $this) {
                $answerAttempt->setAnswerSelected(null);
            }
        }

        return $this;
    }
}
