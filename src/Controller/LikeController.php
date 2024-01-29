<?php

namespace App\Controller;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class LikeController extends AbstractController
{
    #[Route('/api_like', name: 'app_like', methods: 'POST')]
    public function index(Request $request, EntityManagerInterface $manager): JsonResponse
    {
       $user = $this->getUser();

       if (!$user) {
          return $this->json(['error' => 'Utilisateur introuvable']);
       }


       $user->toggleLike($request->getContent());
       $manager->persist($user);
       $manager->flush();


        return $this->json([]);
    }
}
