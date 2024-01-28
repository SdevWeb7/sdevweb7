<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class TodolistController extends AbstractController {

   #[Route( '/add_todo', name: 'api_add_todo' )]
   public function add () : JsonResponse {
      return $this -> json([]);
   }

   #[Route( '/toggle_todo', name: 'api_toggle_todo' )]
   public function toggle () : JsonResponse {
      return $this -> json([]);
   }

   #[Route( '/delete_todo', name: 'api_delete_todo' )]
   public function delete () : JsonResponse {
      return $this -> json([]);
   }

   #[Route( '/reorder_todo', name: 'api_reorder_todo' )]
   public function reorder () : JsonResponse {
      return $this -> json([]);
   }
}