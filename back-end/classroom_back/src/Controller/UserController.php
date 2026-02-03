<?php

namespace App\Controller;

use App\Repository\UserRepository;

use App\Output\UserOutput; 
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AbstractController
{
    // Injection du repository via le constructeur
    public function __construct(private UserRepository $userRepository)
    {
    }

    #[Route('/api/user/{id}', name: 'api_user_show', methods: ['GET'])]
    public function getUserByID(int $id): JsonResponse 
    {
        $user = $this->userRepository->find($id);
        if (!$user) return $this->json(['error' => 'User not found'], 404);
        return $this->json(new UserOutput($user));
    }

    // Route pour l'utilisateur actuellement connecté
    #[Route('/api/me', name: 'api_user_me', methods: ['GET'])]
    public function getMe(): JsonResponse
    {
        $user = $this->getUser(); // Récupère l'élève via le cookie de session

        if (!$user) {
            return $this->json(['error' => 'Non authentifié'], Response::HTTP_UNAUTHORIZED);
        }

        return $this->json(new UserOutput($user));
    }
}