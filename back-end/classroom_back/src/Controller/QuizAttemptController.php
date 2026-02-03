<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\QuizAttempt;
//use App\Output\QuizAttemptOutput;

#[Route('/api/quiz-attempt')]
class QuizAttemptController extends AbstractController
{
    #[Route('/{id}', methods: ['GET'])]
    public function show(QuizAttempt $attempt): JsonResponse
    {
        // On utilise le NoteOutput qu'on a fait avant
        return $this->json(new NoteOutput($attempt));
    }

    #[Route('/user/{id}', methods: ['GET'])]
    public function listByUser(User $user, QuizAttemptRepository $repo): JsonResponse
    {
        $attempts = $repo->findBy(['student' => $user]);
        return $this->json(array_map(fn($a) => new NoteOutput($a), $attempts));
    }
}