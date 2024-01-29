<?php

namespace App\Controller;

use App\Entity\Todo;
use App\Repository\TodoRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class TodolistController extends AbstractController {

   #[Route( '/add_todo', name: 'api_add_todo', methods: ['POST'])]
   public function add (Request $request, SerializerInterface $serializer, EntityManagerInterface $manager) : JsonResponse {

      $user = $this->getUser();

      if (!$user) {
         return $this->json(['error' => 'utilisateur introuvable'], 500);
      }

      $todo = $serializer->deserialize($request->getContent(), Todo::class, 'json');

      $user->addTodo($todo);
      $manager->persist($todo);
      $manager->persist($user);
      $manager->flush();

      return $this -> json([]);
   }

   #[Route( '/delete_todo', name: 'api_delete_todo', methods: ['POST'])]
   public function delete (Request $request, TodoRepository $todoRepository, EntityManagerInterface $manager) : JsonResponse {
      $user = $this->getUser();

      if (!$user) {
         return $this->json(['error' => 'utilisateur introuvable'], 500);
      }

      $todo = $todoRepository->findOneBy(['value' => $request->getContent()]);

      $user->removeTodo($todo);
      $manager->remove($todo);
      $manager->persist($user);
      $manager->flush();

      return $this -> json([]);
   }

   #[Route( '/toggle_todo', name: 'api_toggle_todo', methods: ['POST'])]
   public function toggle (Request $request, TodoRepository $todoRepository, EntityManagerInterface $manager) : JsonResponse {
      $user = $this->getUser();

      if (!$user) {
         return $this->json(['error' => 'utilisateur introuvable'], 500);
      }

      $todo = $todoRepository->findOneBy(['value' => $request->getContent()]);

      $todo->setIsChecked(!$todo->isIsChecked());
      $manager->persist($todo);
      $manager->flush();

      return $this -> json([]);
   }

   #[Route( '/reorder_todos', name: 'api_reorder_todo', methods: ['POST'])]
   public function reorder (Request $request, EntityManagerInterface $manager, SerializerInterface $serializer) : JsonResponse {
      $user = $this->getUser();

      if (!$user) {
         return $this->json(['error' => 'utilisateur introuvable'], 500);
      }

      $todos = json_decode($request->getContent());

      foreach ($user->getTodos() as $todo) {
         $user->removeTodo($todo);
         $manager->remove($todo);
      }
      foreach ($todos as $tempTodo) {
         $todo = new Todo();
         $todo->setValue($tempTodo->value);
         $todo->setIsChecked($tempTodo->isChecked);
         $user->addTodo($todo);
         $manager->persist($todo);
      }

      $manager->persist($user);
      $manager->flush();

      return $this -> json([]);
   }
}