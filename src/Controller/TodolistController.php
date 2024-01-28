<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class TodolistController extends AbstractController {
   #[Route( '/add_todo', name: 'api_add_todo' )]
   public function index () : Response {
      return $this -> json([]);
   }
}