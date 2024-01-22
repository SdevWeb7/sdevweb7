<?php

namespace App\EventListener;

use Symfony\Component\EventDispatcher\Attribute\AsEventListener;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Security\Http\Event\LogoutEvent;

#[AsEventListener]
readonly class MyCustomLogoutListener
{

   public function __construct(private RequestStack $requestStack)
   {
   }

   public function __invoke(LogoutEvent $event) : void
   {
      $this->requestStack->getSession()->getFlashBag()->add('success', 'Déconnexion réussie!');
   }
}