<?php

namespace App\Controller;

use App\Enum\CourseType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Course;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\String\Slugger\SluggerInterface;

class CourseController extends AbstractController
{
    #[Route('/course/create', name: 'course_create')]
    public function create(
        Request $request,
        EntityManagerInterface $entityManager,
        SluggerInterface $slugger
    ): Response
    {
        if ($request->isMethod('GET')) {
            return $this->render('course/create.html.twig');
        }

        if ($request->isMethod('POST')) {
            // Vérifier le token CSRF
            $submittedToken = $request->request->get('_token');
            if (!$this->isCsrfTokenValid('course_create', $submittedToken)) {
                $this->addFlash('error', 'Token CSRF invalide');
                return $this->redirectToRoute('course_create');
            }

            $name = $request->request->get('name');
            $duration = $request->request->get('duration');

            // Validation
            if (empty($name) || empty($duration)) {
                $this->addFlash('error', 'Veuillez remplir tous les champs obligatoires');
                return $this->redirectToRoute('course_create');
            }

            if (!is_numeric($duration) || $duration < 1) {
                $this->addFlash('error', 'La durée doit être un nombre positif');
                return $this->redirectToRoute('course_create');
            }

            // Créer le cours
            $course = new Course();
            $course->setName($name);
            $course->setDuration((int)$duration);

            // Associer le professeur connecté
            $course->setProfessor($this->getUser());

            // Gérer les fichiers uploadés
            $uploadedFiles = $request->files->get('files');
            $filesPaths = [];

            if ($uploadedFiles) {
                $uploadDir = $this->getParameter('kernel.project_dir') . '/public/uploads/courses';
                if (!is_dir($uploadDir)) {
                    mkdir($uploadDir, 0777, true);
                }

                foreach ($uploadedFiles as $file) {
                    if ($file) {
                        // Vérifier la taille du fichier (50 Mo max)
                        if ($file->getSize() > 50 * 1024 * 1024) {
                            $this->addFlash('error', 'Un fichier dépasse la taille maximale de 50 Mo');
                            continue;
                        }

                        // Vérifier le type de fichier
                        $allowedMimeTypes = [
                            'application/pdf',
                            'video/mp4',
                            'video/avi',
                            'video/quicktime'
                        ];

                        $allowedExtensions = ['pdf', 'mp4', 'avi', 'mov'];
                        $extension = strtolower($file->guessExtension() ?? pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION));

                        if (!in_array($file->getMimeType(), $allowedMimeTypes) && !in_array($extension, $allowedExtensions)) {
                            $this->addFlash('error', 'Format de fichier non autorisé : ' . $file->getClientOriginalName());
                            continue;
                        }

                        $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
                        $safeFilename = $slugger->slug($originalFilename);
                        $newFilename = $safeFilename . '-' . uniqid() . '.' . $extension;

                        try {
                            $file->move($uploadDir, $newFilename);
                            $filesPaths[] = $newFilename;
                        } catch (FileException $e) {
                            $this->addFlash('error', 'Erreur lors de l\'upload du fichier : ' . $file->getClientOriginalName());
                        }
                    }
                }
            }

            if (!empty($filesPaths)) {
                //Create une ressource qu'on relie ensuite au course
            }

            // Sauvegarder en base de données
            $entityManager->persist($course);
            $entityManager->flush();

            $this->addFlash('success', 'Le cours a été créé avec succès !');
            return $this->redirectToRoute('app_dashboard');
        }

        return $this->redirectToRoute('course_create');
    }

    #[Route('/course/{id}', name: 'course_view')]
    public function view(Course $course): Response
    {
        return $this->render('course/view.html.twig', [
            'course' => $course,
        ]);
    }
}
