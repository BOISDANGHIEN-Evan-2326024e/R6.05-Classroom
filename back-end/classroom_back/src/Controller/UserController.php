<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class UserController extends AbstractController
{
    public function __construct(private UserRepository $UserRepository)
    {
    }

    #[Route('/api/user/{id}', name: 'api_user_show', methods: ['GET'])]
    public function getUserByID(int $id): JsonResponse
    {
        $user = $this->UserRepository->find($id);

        if (!$user) {
            return $this->json(['error' => 'User not found'], Response::HTTP_NOT_FOUND);
        }

        $output = new UserOutput($user);

        return $this->json($output);
    }
    


}
