<?php

#[Route('/api/question')]
class QuestionController extends AbstractController
{
    #[Route('/{id}', methods: ['GET'])]
    public function show(Question $question): JsonResponse
    {
        return $this->json(new QuestionOutput($question));
    }
}