<?php

namespace App\Controller;

use App\Entity\Course;
use App\Entity\Quiz;
use App\Repository\CourseRepository;
use App\Repository\QuizRepository;
use App\Repository\RessourceRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class QuizController extends AbstractController
{
    private CourseRepository $courseRepository;
    private RessourceRepository $ressourceRepository;
    private QuizRepository $quizRepository;

    public function __construct(CourseRepository $courseRepository, RessourceRepository $ressourceRepository, QuizRepository $quizRepository)
    {
        $this->courseRepository = $courseRepository;
        $this->ressourceRepository = $ressourceRepository;
        $this->quizRepository = $quizRepository;
    }

    #[Route('/quiz/create', name: 'quiz_create')]
    public function create(CourseRepository $courseRepository): Response
    {
        // On récupère uniquement les cours du professeur connecté
        $user = $this->getUser();
        $courses = $courseRepository->findBy(['professor' => $user]);

        return $this->render('quiz/create.html.twig', [
            'courses' => $courses,
        ]);
    }

    // Cette route sert à l'AJAX pour charger les documents dynamiquement
    #[Route('/api/course/{id}/resources', name: 'api_course_resources', methods: ['GET'])]
    public function getCourseResources(Course $course): JsonResponse
    {
        // Vérification de sécurité : le prof a-t-il le droit de voir ce cours ?
        if ($course->getProfessor() !== $this->getUser()) {
            return new JsonResponse(['error' => 'Unauthorized'], 403);
        }

        $resources = [];
        foreach ($course->getRessourceAssociated() as $resource) {
            $resources[] = [
                'id' => $resource->getId(),
                'name' => $resource->getName(),
                'type' => $resource->getType()->value ?? 'document' // Si tu as un Enum
            ];
        }

        return new JsonResponse($resources);
    }

    #[Route('/quiz/generate', name: 'quiz_generate_action', methods: ['POST'])]
    public function generateAction(Request $request): Response
    {
//         Ici, tu traiteras la logique de génération (Appel API OpenAI ou autre)
//         Récupération des données :
         $courseId = $request->request->get('course');
         $resourceId = $request->request->get('resource');
         $difficulty = $request->request->get('difficulty');
         $name = $request->request->get('quizName');


         $course = $this->courseRepository->find($courseId);
            $resource = $this->ressourceRepository->find($resourceId);

         $newQuiz = new Quiz();
            $newQuiz->setName($name);
            $newQuiz->setDiffilculty((int)$difficulty);
            $newQuiz->setCourseAssociated($course);
            $newQuiz->setRessourceAssociated($resource);

            $this->quizRepository->save($newQuiz, true);
            //Récupéré la ressource avec le path

            $documentPath = $resource->getFilePath();
            $document =
            //Appel API OpenAI pour générer le QCM
            //...




        // Pour l'instant, on redirige vers le dashboard avec un message
        $this->addFlash('success', 'La génération du QCM a commencé !');
        return $this->redirectToRoute('teacher_dashboard');
    }
}
