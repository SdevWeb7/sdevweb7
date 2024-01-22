<?php

namespace App\MessageHandler;

use App\Message\ValidationEmail;
use App\Message\ValidEmail;
use App\Repository\UserRepository;
use App\Security\EmailVerifier;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Messenger\Attribute\AsMessageHandler;
use Symfony\Component\Mime\Address;

#[AsMessageHandler]
readonly class ValidationEmailHandler {

   public function __construct (private EmailVerifier $emailVerifier, private UserRepository $repository) {}

   public function __invoke (ValidationEmail $validEmail) : void {
      $user = $this->repository->findOneBy(['id' => $validEmail->getUserID()]);

      $this->emailVerifier->sendEmailConfirmation('app_verify_email', $user, (new TemplatedEmail())
         ->from(new Address('sd@sdevweb.com', 'SDevWeb'))
         ->to($user->getEmail())
         ->subject('Confirmation adresse e-mail')
         ->htmlTemplate('registration/confirmation_email.html.twig')
      );
   }
}