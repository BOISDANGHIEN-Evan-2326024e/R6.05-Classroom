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

        if (!$user) {
            return $this->json(['error' => 'User not found'], Response::HTTP_NOT_FOUND);
        }

        // On utilise le DTO qu'on a créé tout à l'heure
        $output = new UserOutput($user);

        return $this->json($output);
    }
}