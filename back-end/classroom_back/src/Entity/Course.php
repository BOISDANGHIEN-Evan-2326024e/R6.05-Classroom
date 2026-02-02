<?php

namespace App\Entity;

use App\Enum\CourseType;
use App\Repository\CourseRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CourseRepository::class)]
class Course
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(nullable: true)]
    private ?int $duration = null;

    #[ORM\ManyToOne(inversedBy: 'courses')]
    private ?User $professor = null;

    /**
     * @var Collection<int, Ressource>
     */
    #[ORM\OneToMany(targetEntity: Ressource::class, mappedBy: 'lesson_associated')]
    private Collection $ressource_associated;

    /**
     * @var Collection<int, Quiz>
     */
    #[ORM\OneToMany(targetEntity: Quiz::class, mappedBy: 'course_associated')]
    private Collection $quizzes;

    public function __construct()
    {
        $this->ressource_associated = new ArrayCollection();
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

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getDuration(): ?int
    {
        return $this->duration;
    }

    public function setDuration(?int $duration): static
    {
        $this->duration = $duration;

        return $this;
    }

    public function getProfessor(): ?User
    {
        return $this->professor;
    }

    public function setProfessor(?User $professor): static
    {
        $this->professor = $professor;

        return $this;
    }

    /**
     * @return Collection<int, Ressource>
     */
    public function getRessourceAssociated(): Collection
    {
        return $this->ressource_associated;
    }

    public function addRessourceAssociated(Ressource $ressourceAssociated): static
    {
        if (!$this->ressource_associated->contains($ressourceAssociated)) {
            $this->ressource_associated->add($ressourceAssociated);
            $ressourceAssociated->setLessonAssociated($this);
        }

        return $this;
    }

    public function removeRessourceAssociated(Ressource $ressourceAssociated): static
    {
        if ($this->ressource_associated->removeElement($ressourceAssociated)) {
            // set the owning side to null (unless already changed)
            if ($ressourceAssociated->getLessonAssociated() === $this) {
                $ressourceAssociated->setLessonAssociated(null);
            }
        }

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
            $quiz->setCourseAssociated($this);
        }

        return $this;
    }

    public function removeQuiz(Quiz $quiz): static
    {
        if ($this->quizzes->removeElement($quiz)) {
            // set the owning side to null (unless already changed)
            if ($quiz->getCourseAssociated() === $this) {
                $quiz->setCourseAssociated(null);
            }
        }

        return $this;
    }
}
