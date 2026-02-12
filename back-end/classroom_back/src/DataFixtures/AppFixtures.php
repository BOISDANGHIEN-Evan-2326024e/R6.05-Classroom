<?php

namespace App\DataFixtures;

use App\Entity\Answer;
use App\Entity\Course;
use App\Entity\Question;
use App\Entity\Quiz;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public function load(ObjectManager $manager): void
    {
        $professor = new User();
        $professor->setEmail('professeur@example.com');
        $professor->setRoles(['ROLE_PROFESSOR']);
        $professor->setPassword($this->passwordHasher->hashPassword($professor, 'password123'));
        $manager->persist($professor);

        for ($i = 1; $i <= 3; $i++) {
            $course = new Course();
            $course->setName("Cours $i");
            $course->setDuration(60 * $i);
            $course->setDescription("Description du cours $i");
            $course->setProfessor($professor);
            $manager->persist($course);

            for ($j = 1; $j <= 2; $j++) {
                $quiz = new Quiz();
                $quiz->setName("QCM $j pour le cours $i");
                $quiz->setDiffilculty(rand(1, 5));
                $quiz->setCourseAssociated($course);
                $manager->persist($quiz);

                for ($k = 1; $k <= 3; $k++) {
                    $question = new Question();
                    $question->setNumero($k);
                    $question->setLibelle("Question $k pour le QCM $j du cours $i");
                    $question->setValeur(10);
                    $question->setQuizRelated($quiz);
                    $manager->persist($question);

                    for ($l = 1; $l <= 4; $l++) {
                        $answer = new Answer();
                        $answer->setLabel("Réponse $l pour la question $k");
                        $answer->setReelAnswer($l === 1);
                        $answer->setQuestionRelated($question);
                        $manager->persist($answer);
                    }
                }
            }
        }

        $manager->flush();
    }
}
