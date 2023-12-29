<?php

namespace App\Controller;

use App\Entity\Notes;
use App\Form\NotesType;
use App\Repository\NotesRepository;
use App\Service\NotesService;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/notes")
 */
class NoteController extends AbstractController
{
    /**
     * @Route("/list", name="app_note_index", methods={"GET"})
     */
    public function index(SerializerInterface $serializer,NotesRepository $notesRepository): Response
    {
        $user = $this->getUser();
        if(! $user->getIsActive()){
            return $this->json(['response' => 'error','data' => [], 'message' => "Your is not activated yet"]);
        }
        $allNotes = [];
        foreach ($notesRepository->findBy(['user' => $user]) as $note){
            $notes = [
                'id' => $note->getId(),
                'title' => $note->getTitle(),
                'category' => $note->getCategory()->getName(),
                'content' => $note->getContent(),
                'status' => $note->getStatus()
            ];
            $allNotes[] = $notes;

        }

        return $this->json(['response'=> 'success', 'data' => $allNotes,"message" => "Details fetched successfully"]);
    }

    /**
     * @Route("/create", name="app_note_new", methods={"GET", "POST"})
     */
    public function new(Request $request, NotesService $noteService): Response
    {
        $user = $this->getUser();
        if(! $user->getIsActive()){
            return $this->json(['response' => 'error', 'message' => "User is not activated yet"]);
        }
        $note = new Notes();
        return $this->extracted($note, $request, $noteService, $user);
    }


    /**
     * @Route("/{id}/edit", name="app_note_edit", methods={"GET", "POST"})
     */
    public function edit(Request $request, Notes $note, NotesService $noteService): Response
    {
        $user = $this->getUser();
        if(! $user->getIsActive()){
            return $this->json(['response' => 'error', 'message' => "User is not activated yet"]);
        }
        return $this->extracted($note, $request, $noteService, $user);
    }

    /**
     * @Route("/{id}", name="app_note_delete", methods={"POST"})
     */
    public function delete(Request $request, Notes $note, NotesRepository $notesRepository): Response
    {
        if ($this->isCsrfTokenValid('delete'.$note->getId(), $request->request->get('_token'))) {
            $notesRepository->remove($note, true);
        }

        return $this->redirectToRoute('app_note_index', [], Response::HTTP_SEE_OTHER);
    }

    /**
     * @param Notes $note
     * @param Request $request
     * @param NotesService $noteService
     * @param $user
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function extracted(Notes $note, Request $request, NotesService $noteService, $user): \Symfony\Component\HttpFoundation\JsonResponse
    {
        $form = $this->createForm(NotesType::class, $note);
        $jsonContent = $request->getContent();
        $jsonData = json_decode($jsonContent, true);
        $form->submit($jsonData);

        if ($form->isSubmitted() && $form->isValid()) {
            $noteService->createNotes($jsonData, $note, $user);
            return $this->json(['response' => 'success', 'message' => 'Notes saved successfully']);
        }

        return $this->json(['response' => 'error', 'message' => "An error occured while creating notes"]);
    }

    /**
     * @Route("/filter", name="api_notes_filter", methods={"GET"})
     */
    public function filterNotes(Request $request,NotesRepository $notesRepository,SerializerInterface $serializer): Response
    {
        $user = $this->getUser();
        if(! $user->getIsActive()){
            return $this->json(['response' => 'error', 'message' => "User is not activated yet"]);
        }
        $title = $request->query->get('title');
        $content = $request->query->get('content');
        $status = $request->query->get('status');
        $category = $request->query->get('categories');

        // Use the repository to filter notes based on the provided parameters
        $filteredNotes = $notesRepository->findByFilters($title, $content, $status, $category,$user);
        $allNotes = [];
        foreach ($filteredNotes as $note){
            $notes = [
                'id' => $note->getId(),
                'title' => $note->getTitle(),
                'category' => $note->getCategory()->getName(),
                'content' => $note->getContent(),
                'status' => $note->getStatus()
            ];
            $allNotes[] = $notes;
        }
        return $this->json(['response'=> 'success', 'data' => $allNotes,"message" => "Data filtered successfully"]);
    }
}
