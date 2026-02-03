<?php

namespace App\Controller;

use App\Repository\CourseRepository;
use App\Repository\QuizRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class TeacherController extends AbstractController
{
    #[Route('/teacher/dashboard', name: 'teacher_dashboard')]
    public function dashboard(CourseRepository $courseRepository, QuizRepository $quizRepository): Response
    {
        $user = $this->getUser();

        if (!$user) {
            return $this->redirectToRoute('app_login');
        }

        // Récupérer les cours et QCM associés au professeur connecté
        $courses = $courseRepository->findBy(['professor' => $user]);
        $quizzes = $quizRepository->findBy(['course_associated' => $courses]);

        return $this->render('teacher/dashboard.html.twig', [
            'courses' => $courses,
            'quizzes' => $quizzes,
        ]);
    }

    #[Route('/api/teacher/DataDashboard', name: 'api_teacher_dashboard', methods: ['GET'])]
    public function DataDashboard(CourseRepository $courseRepo, QuizRepository $quizRepo): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) return $this->json(['error' => 'Accès refusé'], 403);

        $courses = $courseRepo->findBy(['professor' => $user]);
        $quizzes = $quizRepo->findBy(['course_associated' => $courses]);

        // On transforme les entités en Outputs
        $coursesOutput = array_map(fn($c) => new CourseOutput($c), $courses);
        $quizzesOutput = array_map(fn($q) => new QuizOutput($q), $quizzes);

        return $this->json([
            'stats' => [
                'totalCourses' => count($courses),
                'totalQuizzes' => count($quizzes),
            ],
            'courses' => $coursesOutput,
            'quizzes' => $quizzesOutput
        ]);
    }
}
