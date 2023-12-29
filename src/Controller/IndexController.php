<?php
declare(strict_types=1);

namespace App\Controller;

use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class IndexController extends AbstractController
{
    /**
     * @Route("/index", name="app_index")
     */
    public function index(): Response
    {
        return $this->render('index.html.twig');
    }

    /**
     * @Route("/confirm/{token}", name="user_confirm", methods={"GET"})
     */
    public function confirmAccount(UserRepository $userRepository, $token,EntityManagerInterface $entityManager)
    {
        $user = $userRepository->findOneBy(['confirmationToken' => $token]);
        if ($user) {
            $user->setIsActive(true);
            $user->setConfirmationToken(null);
            $entityManager->flush();

            return $this->json(['response' => 'success', 'message' => 'Verified successfully']);
        }
        return $this->json(['response' => 'error', 'message' => 'An error occurred while creating the user']);
    }
}
