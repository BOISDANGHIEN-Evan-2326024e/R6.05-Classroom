<?php

namespace App\Controller;

use App\Entity\Answer;
use App\Entity\Course;
use App\Entity\Question;
use App\Entity\Quiz;
use App\Output\QuizOutput;
use App\Repository\AnswerRepository;
use App\Repository\CourseRepository;
use App\Repository\QuestionRepository;
use App\Repository\QuizRepository;
use App\Repository\RessourceRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;

#[Route('/api/qcm')]
class QuizController extends AbstractController
{
    private CourseRepository $courseRepository;
    private RessourceRepository $ressourceRepository;
    private QuizRepository $quizRepository;
    private QuestionRepository $questionRepository;

    private AnswerRepository $answerRepository;


    public function __construct(CourseRepository $courseRepository, RessourceRepository $ressourceRepository, QuizRepository $quizRepository, QuestionRepository $questionRepository, AnswerRepository $answerRepository)
    {
        $this->courseRepository = $courseRepository;
        $this->ressourceRepository = $ressourceRepository;
        $this->quizRepository = $quizRepository;
        $this->questionRepository = $questionRepository;
        $this->answerRepository = $answerRepository;
    }

    #[Route('/quiz/create', name: 'quiz_create')]
    public function create(): Response
    {
        $user = $this->getUser();
        $courses = $this->courseRepository->findBy(['professor' => $user]);

        return $this->render('quiz/create.html.twig', [
            'courses' => $courses,
        ]);
    }


    #[Route('/quiz/generate', name: 'quiz_generate_action', methods: ['POST'])]
    public function generateAction(
        Request $request,
        HttpClientInterface $httpClient, // On garde juste celui-là car il n'est pas dans le constructeur
        #[Autowire('%env(GEMINI_API_KEY)%')] string $geminiApiKey
    ): Response
    {
        // Augmentation temporaire de la mémoire pour gérer l'encodage des vidéos
        ini_set('memory_limit', '512M');

//        $data = json_decode($request->getContent(), true);
//        $courseId = $data['course'] ?? null;
//        $resourceId = $data['resource'] ?? null;
//        $difficulty = $data['difficulty'] ?? null;
//        $name = $data['quizName'] ?? null;


        $courseId = $request->request->get('course');
        $resourceId = $request->request->get('resource');
        $difficulty = $request->request->get('difficulty');
        $name = $request->request->get('quizName');

        // Utilisation des propriétés de classe ($this->)
        $course = $this->courseRepository->find($courseId);
        $resource = $this->ressourceRepository->find($resourceId);

        if (!$course || !$resource) {
            $this->addFlash('error', 'Cours ou ressource introuvable.');
            return $this->redirectToRoute('teacher_dashboard');
        }

        $projectDir = $this->getParameter('kernel.project_dir');
        $absolutePath = $projectDir . '/public' . $resource->getPath();

        if (!file_exists($absolutePath)) {
            $this->addFlash('error', 'Le fichier physique est introuvable sur le serveur.');
            return $this->redirectToRoute('teacher_dashboard');
        }

        $fileContent = file_get_contents($absolutePath);
        $base64Data = base64_encode($fileContent);
        $mimeType = mime_content_type($absolutePath);

        $prompt = "Tu es un expert pédagogique. Analyse le document fourni ci-joint.
                   Génère un QCM de difficulté $difficulty (sur une échelle de 1 à 3) basé sur ce contenu.
                   Le QCM doit comporter 5 questions.

                   IMPORTANT : Tu dois répondre UNIQUEMENT au format JSON strict, sans Markdown (pas de ```json).
                   Structure attendue :
                   [
                       {
                           \"question\": \"Intitulé de la question\",
                           \"options\": [\"Reponse A\", \"Reponse B\", \"Reponse C\", \"Reponse D\"],
                           \"correctAnswer\": 0 (index de la bonne réponse dans le tableau options),
                           \"explanation\": \"Explication courte\"
                       }
                   ]";

        try {
            $url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' . $geminiApiKey;
            $response = $httpClient->request('POST', $url, [
                'headers' => ['Content-Type' => 'application/json'],
                'json' => [
                    'contents' => [
                        [
                            'parts' => [
                                ['text' => $prompt],
                                [
                                    'inline_data' => [
                                        'mime_type' => $mimeType,
                                        'data' => $base64Data
                                    ]
                                ]
                            ]
                        ]
                    ]
                ],
                'timeout' => 120, // Augmenté à 120s pour la vidéo
            ]);

            $apiData = $response->toArray();

            if (isset($apiData['candidates'][0]['content']['parts'][0]['text'])) {
                $generatedText = $apiData['candidates'][0]['content']['parts'][0]['text'];

                $jsonString = str_replace(['```json', '```'], '', $generatedText);
                $jsonString = trim($jsonString); // Retire les espaces avant/après

                $quizData = json_decode($jsonString, true);

                if (json_last_error() === JSON_ERROR_NONE) {

                    $newQuiz = new Quiz();
                    $newQuiz->setName($name);
                    $newQuiz->setDiffilculty((int)$difficulty);
                    $newQuiz->setCourseAssociated($course);
                    $newQuiz->setRessourceAssociated($resource);

                    $this->quizRepository->save($newQuiz, false);

                    foreach ($quizData as $index => $qData) {

                        $question = new Question();
                        $question->setQuizRelated($newQuiz);
                        $question->setNumero($index + 1);
                        $question->setLibelle($qData['question']);
                        $question->setValeur(1);


                        $this->questionRepository->persist($question);

                        foreach ($qData['options'] as $optIndex => $optionText) {
                            $answer = new Answer();
                            $answer->setQuestionRelated($question);
                            $answer->setLabel($optionText);


                            if ($optIndex === $qData['correctAnswer']) {
                                $answer->setReelAnswer(true);
                            } else {
                                $answer->setReelAnswer(false);
                            }

                            $this->answerRepository->persist($answer);
                        }
                    }

                    $this->quizRepository->flush();

                    $this->addFlash('success', 'QCM généré et sauvegardé avec succès !');
                    // Redirection vers la liste des quiz ou le détail du quiz créé
                    return $this->redirectToRoute('teacher_dashboard'); // ou une route 'quiz_show', ['id' => $newQuiz->getId()]

                } else {
                    $this->addFlash('error', 'Erreur lors de la lecture des données de l\'IA.');
                    return $this->redirectToRoute('teacher_dashboard');
                }
            } else {
                $this->addFlash('error', 'L\'IA n\'a pas renvoyé de contenu valide.');
            }

        } catch (\Exception $e) {
            $this->addFlash('error', 'Erreur API : ' . $e->getMessage());
        }

       return $this->redirectToRoute('teacher_dashboard');
    }

    #[Route('/quiz/{id}/view', name: 'quiz_view', methods: ['GET'])]
    public function view(Quiz $quiz): Response
    {

        if ($quiz->getCourseAssociated() && $quiz->getCourseAssociated()->getProfessor() !== $this->getUser()) {
            throw $this->createAccessDeniedException('Ce quiz ne vous appartient pas.');
        }

        return $this->render('quiz/view.html.twig', [
            'quiz' => $quiz,
        ]);
    }

    #[Route('', methods: ['GET'])]
    public function index(QuizRepository $repo): JsonResponse
    {
        $quizzes = $repo->findAll();
        return $this->json(array_map(fn($q) => new QuizOutput($q), $quizzes));
    }

    #[Route('/{id}', methods: ['GET'])]
    public function show(Quiz $quiz): JsonResponse
    {
        return $this->json(new QuizOutput($quiz));
    }
}
