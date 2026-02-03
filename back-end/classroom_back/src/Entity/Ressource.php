<?php

namespace App\Entity;

use App\Enum\CourseType;
use App\Repository\RessourceRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: RessourceRepository::class)]
class Ressource
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $name = null;

    #[ORM\Column(length: 1000, nullable: true)]
    private ?string $path = null;

    #[ORM\Column(length: 255, enumType: CourseType::class)]
    private ?CourseType $type = null;

    #[ORM\ManyToOne(inversedBy: 'ressource_associated')]
    private ?Course $lesson_associated = null;

    /**
     * @var Collection<int, Quiz>
     */
    #[ORM\OneToMany(targetEntity: Quiz::class, mappedBy: 'ressource_associated')]
    private Collection $quizzes;

    public function __construct()
    {
        $this->quizzes = new ArrayCollection();
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

    public function getPath(): ?string
    {
        return $this->path;
    }

    public function setPath(?string $path): static
    {
        $this->path = $path;

        return $this;
    }

    public function getType(): ?CourseType
    {
        return $this->type;
    }

    public function setType(CourseType $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function getLessonAssociated(): ?Course
    {
        return $this->lesson_associated;
    }

    public function setLessonAssociated(?Course $lesson_associated): static
    {
        $this->lesson_associated = $lesson_associated;

        return $this;
    }

    /**
     * @return Collection<int, Quiz>
     */
    public function getQuizzes(): Collection
    {
        return $this->quizzes;
    }

    public function addQuiz(Quiz $quiz): static
    {
        if (!$this->quizzes->contains($quiz)) {
            $this->quizzes->add($quiz);
            $quiz->setRessourceAssociated($this);
        }

        return $this;
    }

    public function removeQuiz(Quiz $quiz): static
    {
        if ($this->quizzes->removeElement($quiz)) {
            // set the owning side to null (unless already changed)
            if ($quiz->getRessourceAssociated() === $this) {
                $quiz->setRessourceAssociated(null);
            }
        }

        return $this;
    }
}
