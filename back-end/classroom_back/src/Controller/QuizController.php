<?php

#[Route('/api/quiz')]
class QuizController extends AbstractController
{
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