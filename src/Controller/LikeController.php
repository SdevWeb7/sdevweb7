<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class LikeController extends AbstractController
{
    #[Route('/like', name: 'app_like')]
    public function index(): JsonResponse
    {
       $user = $this->getUser();

       if (!$user) {
          return $this->json(['error' => 'Utilisateur introuvable']);
       }


        return $this->json([]);
    }
}
