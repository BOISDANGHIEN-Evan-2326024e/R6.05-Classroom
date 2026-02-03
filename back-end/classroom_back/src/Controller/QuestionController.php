<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Question;
use App\Output\QuestionOutput;

#[Route('/api/question')]
class QuestionController extends AbstractController
{
    #[Route('/{id}', methods: ['GET'])]
    public function show(Question $question): JsonResponse
    {
        return $this->json(new QuestionOutput($question));
    }
}