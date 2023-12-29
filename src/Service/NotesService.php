<?php

namespace App\Service;

use App\Repository\CategoryRepository;
use Doctrine\ORM\EntityManagerInterface;

class NotesService
{
    private $categoryRepository;
    private $entityManger;
    public function __construct(
        CategoryRepository $categoryRepository,
        EntityManagerInterface $entityManger
    )
    {
        $this->categoryRepository = $categoryRepository;
        $this->entityManger = $entityManger;
    }

    public function getAllCategories(): array
    {
        return $this->categoryRepository->findAll();
    }

    public function createNotes($data,$note,$user){
        $note->setTitle($data['title']);
        $note->setContent($data['content']);
        $note->setStatus($data['status']);
        $this->setCategoryAndUser($data['category'],$user,$note);

        $this->entityManger->persist($note);
        $this->entityManger->flush();
        return $note;
    }

    public function setCategoryAndUser($category,$user,$note){
        $category = $this->categoryRepository->findOneBy(['id' => $category]);
        $note->setUser($user);
        $note->setCategory($category);
    }
}