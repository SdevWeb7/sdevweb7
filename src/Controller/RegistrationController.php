<?php

namespace App\Controller;

use App\Entity\User;
use App\Message\ValidationEmail;
use App\Security\EmailVerifier;
use App\Security\FormAuthenticator;
use App\Security\LoginFormAuthenticator;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\UserAuthenticatorInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Contracts\Translation\TranslatorInterface;

class RegistrationController extends AbstractController
{
   #[Route('/register', name: 'api_register', methods: ['POST'])]
   public function register(Request $request, UserPasswordHasherInterface $userPasswordHasher, UserAuthenticatorInterface $userAuthenticator, LoginFormAuthenticator $authenticator, EntityManagerInterface $entityManager, SerializerInterface $serializer, ValidatorInterface $validator, MessageBusInterface $bus): Response
   {
      $user = $serializer->deserialize($request->getContent(), User::class, 'json');
      $errors = [];
      $violations = $validator->validate($user);

      $user->setPassword(
         $userPasswordHasher->hashPassword(
            $user,
            $user->getPassword()
         )
      );


      if (count($violations) > 0) {
         foreach ($violations as $violation) {
            $errors[$violation->getPropertyPath()] = $violation->getMessage();
         }
         return $this->json([$errors]);
      }

      $entityManager->persist($user);
      $entityManager->flush();

      $bus->dispatch(new ValidationEmail($user->getId()));

      $userAuthenticator->authenticateUser(
         $user,
         $authenticator,
         $request
      );

      $this->addFlash('success', "Merci pour votre inscription n'oubliez pas de confirmer votre adresse email");
      return $this->json([]);
   }


   #[Route('/verify/email', name: 'app_verify_email')]
   public function verifyUserEmail(Request $request, TranslatorInterface $translator, EmailVerifier $emailVerifier): Response
   {
      try {
         $emailVerifier->handleEmailConfirmation($request, $this->getUser());
      } catch (VerifyEmailExceptionInterface $exception) {
         $this->addFlash('error', $translator->trans($exception->getReason(), [], 'VerifyEmailBundle'));

         return $this->redirectToRoute('app_home');
      }

      $this->getUser()->setIsVerified(true);

      $this->addFlash('success', "Merci d'avoir confirmé votre adresse email");

      return $this->redirectToRoute('app_home');
   }
}