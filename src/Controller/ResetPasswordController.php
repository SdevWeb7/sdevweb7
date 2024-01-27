<?php

namespace App\Controller;

use App\Entity\User;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\Translation\TranslatorInterface;
use SymfonyCasts\Bundle\ResetPassword\Controller\ResetPasswordControllerTrait;
use SymfonyCasts\Bundle\ResetPassword\Exception\ResetPasswordExceptionInterface;
use SymfonyCasts\Bundle\ResetPassword\ResetPasswordHelperInterface;

#[Route('/reset-password')]
class ResetPasswordController extends AbstractController
{
    use ResetPasswordControllerTrait;

    public function __construct(private readonly ResetPasswordHelperInterface $resetPasswordHelper, private readonly EntityManagerInterface $entityManager) {}

    #[Route('', name: 'app_forgot_password_request', methods: ["POST"])]
    public function request(Request $request, MailerInterface $mailer): JsonResponse
    {
      $user = $this->entityManager->getRepository(User::class)->findOneBy(['email' => $request->getContent()]);

      if (!$user) {
         return $this->json(['error' => 'Utilisateur introuvable']);
      }

      try {
         $resetToken = $this->resetPasswordHelper->generateResetToken($user);
      } catch (ResetPasswordExceptionInterface $e) {
         return $this->json(['error' => 'Problème de token']);
      }

      $email = (new TemplatedEmail())
         ->from(new Address('sd@sdevweb.com', 'SDevWeb'))
         ->to($user->getEmail())
         ->subject('Réinitialisation du mot de passe')
         ->htmlTemplate('reset_password/email.html.twig')
         ->context([
            'url' => $this->getParameter('urlResetEmail'),
            'resetToken' => $resetToken
         ]);
      $mailer->send($email);
      $this->setTokenObjectInSession($resetToken);

      $this->addFlash('success', "Un mail vous a été envoyé, n'oubliez pas de regarder dans les spams. Ce lien expirera dans une heure");
      return $this->json([]);
   }

    #[Route('/reset/{token}', name: 'app_reset_password')]
    public function reset(Request $request, UserPasswordHasherInterface $passwordHasher, TranslatorInterface $translator, string $token = null): Response
    {
        try {
            $user = $this->resetPasswordHelper->validateTokenAndFetchUser($token);
        } catch (ResetPasswordExceptionInterface $e) {
            return $this->json(['error' => sprintf('%s - %s',
               $translator->trans(ResetPasswordExceptionInterface::MESSAGE_PROBLEM_VALIDATE, [], 'ResetPasswordBundle'),
               $translator->trans($e->getReason(), [], 'ResetPasswordBundle')
            )]);
        }

         $this->resetPasswordHelper->removeResetRequest($token);
         $encodedPassword = $passwordHasher->hashPassword(
             $user,
             $request->getContent()
         );

         $user->setPassword($encodedPassword);
         $this->entityManager->flush();

         $this->addFlash('success', 'Mot de passe réinitialisé');
        return $this->json([]);
    }

}
