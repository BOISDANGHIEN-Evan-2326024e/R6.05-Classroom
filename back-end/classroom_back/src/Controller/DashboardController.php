<?php

namespace App\Controller;

use App\Output\UserOutput;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class DashboardController extends AbstractController
{
    #[Route('/api/user', name: 'api_me', methods: ['GET'])]
    public function me(): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) return $this->json(['error' => 'Non connecté'], 401);
        return $this->json(new UserOutput($user));
    }

    #[Route('/api/stats', name: 'api_stats', methods: ['GET'])]
    public function stats(): JsonResponse
    {
        // En attendant d'avoir de vraies stats, on renvoie le format attendu par ton Front
        return $this->json([
            'moyenneGenerale' => 15,
            'tauxReussite' => 85,
            'totalQCMTermines' => 10,
            'totalQCMAfaire' => 2,
            'progressionMois' => [12, 14, 13, 15, 16, 15, 17]
        ]);
    }
}