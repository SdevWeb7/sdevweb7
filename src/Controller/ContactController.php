<?php

namespace App\Controller;

use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;
use Symfony\Component\Routing\Annotation\Route;

class ContactController extends AbstractController
{
    #[Route('/api_contact', name: 'api_contact')]
    public function index(Request $request, MailerInterface $mailer): JsonResponse
    {
       try {
          $contact = json_decode($request->getContent());
          $email = (new TemplatedEmail())
             ->from(new Address($contact->email, $contact->email))
             ->to('sd@sdevweb.com')
             ->subject('Formulaire de contact')
             ->html("<p>$contact->message</p>");

          $mailer->send($email);
       } catch (\Exception $e) {
          return $this->json(['error' => $e->getMessage()]);
       }

       $this->addFlash('success', "Un email contenant votre message vient de m'être envoyé!");
       return $this->json([]);
    }
}
