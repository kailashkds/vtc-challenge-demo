<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class ReactController extends AbstractController
{

    /**
     * @Route("/{reactRouting}", name="index", requirements={"reactRouting"=".+"}, defaults={"reactRouting": null})
     */
    public function index()
    {
        return $this->render('index.html.twig');
    }
}