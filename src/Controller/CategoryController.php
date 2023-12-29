<?php

namespace App\Controller;

use App\Entity\Category;
use App\Form\CategoryType;
use App\Repository\CategoryRepository;
use App\Repository\NotesRepository;
use JMS\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use JMS\Serializer\SerializationContext;

/**
 * @Route("/api/category")
 */
class CategoryController extends AbstractController
{
    /**
     * @Route("/list", name="app_category_list", methods={"GET"})
     */
    public function index(SerializerInterface $serializer,CategoryRepository $categoryRepository): Response
    {
        $user = $this->getUser();
        if(! $user->getIsActive()){
            return $this->json(['response' => 'error', 'message' => "User is not activated yet"]);
        }
        return $this->json(['response'=> 'success', 'data' => $categoryRepository->findAll()]);
    }
}
