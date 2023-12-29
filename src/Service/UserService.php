<?php

namespace App\Service;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Validator\Constraints\Uuid;

class UserService
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private UserPasswordEncoderInterface $passwordEncoder,
        private UrlGeneratorInterface $router,
        private ParameterBagInterface  $parameterBag,
        private EmailService $emailService
    )
    {
    }

    public function createNewUser($formData){
        $user = new User();
        $user->setUsername($formData['email']);
        $user->setEmail($formData['email']);
        $this->passwordEncoderAndGenerateConfirmationToken($user,$formData['password']);
        $user->setIsActive(0);
        $this->entityManager->persist($user);
        $this->entityManager->flush();

        $this->emailService->sendEmail($user);
        return $user;
    }

    public function getUserByEmail(string $email) {
        return $this->entityManager->getRepository(User::class)->count(['email' => $email]);
    }

    public function passwordEncoderAndGenerateConfirmationToken($user,$password){
        $encodedPassword = $this->passwordEncoder->encodePassword($user, $password);

        // Set the user's new password and confirmation token
        $user->setPassword($encodedPassword);
        $confirmationToken = $this->generateConfirmationToken();
        $user->setConfirmationToken($confirmationToken);
    }

    public function generateConfirmationToken():string
    {
        return rtrim(strtr(base64_encode(random_bytes(32)), '+/', '-_'), '=');
    }
}
