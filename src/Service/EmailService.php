<?php

namespace App\Service;

use App\Entity\User;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\HttpFoundation\RequestStack;

class EmailService
{
    public function __construct(private MailerInterface $mailer, private UrlGeneratorInterface $router, private RequestStack $requestStack,private ParameterBagInterface  $parameterBag)
    {
    }

    public function sendEmail(User $user)
    {
        $request = $this->requestStack->getCurrentRequest();
        $confirmationUrl = $request->getSchemeAndHttpHost() . "/confirmation/" . $user->getConfirmationToken();
        $emailContent = "Click the following link to confirm your account: $confirmationUrl";
        $senderEmailAddress = $_ENV['SENDER_EMAIL_ADDRESS'];
        $email = (new Email())
            ->from($senderEmailAddress)
            ->to($user->getEmail())
            ->subject('Confirmation email!')
            ->text($emailContent);

        $this->mailer->send($email);
        $this->saveEmailContentInTextFile($user,$emailContent);
    }

    public function saveEmailContentInTextFile(User $user,$emailContent){
        $directoryPath = $this->parameterBag->get('kernel.project_dir') . '/var/email';

        if (!file_exists($directoryPath) && !mkdir($directoryPath, 0777, true)) {
            throw new \RuntimeException('Unable to create directory: ' . $directoryPath);
        }

        $filePath = $directoryPath . '/' . $user->getEmail() .'.txt';

        // Write content to the file
        if (file_put_contents($filePath, $emailContent) === false) {
            throw new \RuntimeException('Unable to write content to file: ' . $filePath);
        }
    }
}