<?php

namespace App\Controller;

use App\Entity\User;
use App\FormType\CheckEmailType;
use App\Form\UserType;
use App\Repository\UserRepository;
use App\Service\UserService;
use Doctrine\ORM\EntityManagerInterface;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\View\View;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/user")
 */
class UserController extends AbstractController
{
    public function __construct(
        private UserService $userService
    )
    {
    }

    /**
     * @Route("/", name="user_index", methods={"GET"})
     */
    public function index(UserRepository $userRepository): Response
    {
        return $this->render('index.html.twig');
    }

    /**
     * @Route("/create", name="user_create", methods={"POST"})
     */
    public function create(Request $request): Response
    {
            $user = new User();
            $form = $this->createForm(\App\FormType\UserType::class, $user);
            $jsonContent = $request->getContent();
            $jsonData = json_decode($jsonContent, true);
            $form->submit($jsonData);

            if ($form->isSubmitted() && $form->isValid()) {
                if($this->userService->getUserByEmail($jsonData['email'])){
                    return $this->json(['response' => 'error', 'message' => 'Email already exist']);
                }
                $this->userService->createNewUser($jsonData);
                return $this->json(['response' => 'success', 'message' => 'Please check you mailbox for activation link..']);
            }

        return $this->json(['response' => 'error', 'message' => 'An error occurred while creating the user']);

    }

    /**
     * @Route("/checkEmail", name="user_check_email", methods={"POST"})
     */
    public function checkEmail(Request $request): JsonResponse
    {
        $form = $this->createForm(CheckEmailType::class);

        $jsonContent = $request->getContent();
        $jsonData = json_decode($jsonContent, true);
        $form->submit($jsonData);

        if ($form->isSubmitted() && $form->isValid()) {
            return $this->json([
                "isUnique" => (boolean) $this->userService->getUserByEmail($form->getData()['email'])
            ]);
        }
        return $this->json(['error']);
    }
}
