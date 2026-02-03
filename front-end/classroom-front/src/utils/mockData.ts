// Mock data - À remplacer par des appels API plus tard
import {
  User,
  StatistiquesGlobales,
  Cours,
  QCM,
  Note,
  Video,
} from '../types/index.ts';

// Données utilisateur
export const mockUser: User = {
  id: '1',
  prenom: 'Jean',
  nom: 'Dupont',
  email: 'jean.dupont@example.com',
  profId: 'prof_1',
  matieres: ['Mathématiques', 'Physique', 'Chimie'],
  dateInscription: new Date('2024-01-15'),
};

// Statistiques globales
export const mockStats: StatistiquesGlobales = {
  moyenneGenerale: 16.5,
  tauxReussite: 85,
  totalQCMTermines: 24,
  totalQCMAfaire: 3,
  derniereMatiere: 'Mathématiques',
  derniereDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  progressionMois: [
    12, 13, 14, 13.5, 15, 16, 14.5, 16.5, 17, 16, 17.5, 18, 17, 16.5, 16.8,
    17.2, 17.5, 18, 17.8, 18.5, 19, 18.5, 18.8, 19.2, 19.5, 19.8, 20, 19.5,
    19.2, 20,
  ],
};

// Cours
export const mockCours: Cours[] = [
  {
    id: '1',
    titre: 'Algèbre Linéaire',
    matiere: 'Mathématiques',
    sousCategorie: 'Algèbre',
    dateCreation: new Date('2024-01-10'),
    nombreVideos: 8,
    progression: 75,
  },
  {
    id: '2',
    titre: 'Géométrie Euclidienne',
    matiere: 'Mathématiques',
    sousCategorie: 'Géométrie',
    dateCreation: new Date('2024-02-05'),
    nombreVideos: 12,
    progression: 60,
  },
  {
    id: '3',
    titre: 'Mécanique Classique',
    matiere: 'Physique',
    sousCategorie: 'Cinématique',
    dateCreation: new Date('2024-02-20'),
    nombreVideos: 15,
    progression: 90,
  },
  {
    id: '4',
    titre: 'Chimie Organique',
    matiere: 'Chimie',
    sousCategorie: 'Réactions',
    dateCreation: new Date('2024-03-01'),
    nombreVideos: 10,
    progression: 45,
  },
  {
    id: '5',
    titre: 'Calcul Différentiel',
    matiere: 'Mathématiques',
    sousCategorie: 'Calcul',
    dateCreation: new Date('2024-03-10'),
    nombreVideos: 14,
    progression: 80,
  },
  {
    id: '6',
    titre: 'Thermodynamique',
    matiere: 'Physique',
    sousCategorie: 'Thermique',
    dateCreation: new Date('2024-03-15'),
    nombreVideos: 11,
    progression: 55,
  },
];

// QCM à faire
const now = new Date();
const demain = new Date(now.getTime() + 24 * 60 * 60 * 1000);
const dans3jours = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
const dans7jours = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

export const mockQCMAfaire: QCM[] = [
  {
    id: '1',
    titre: 'QCM Algèbre - Les matrices',
    matiere: 'Mathématiques',
    sousCategorie: 'Algèbre',
    courseId: '1',
    nombreQuestions: 20,
    dateCreation: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    deadline: demain,
    statut: 'a_faire',
  },
  {
    id: '2',
    titre: 'QCM Chimie - Liaisons chimiques',
    matiere: 'Chimie',
    sousCategorie: 'Réactions',
    courseId: '4',
    nombreQuestions: 15,
    dateCreation: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    deadline: dans3jours,
    statut: 'a_faire',
  },
  {
    id: '3',
    titre: 'QCM Physique - Forces et vecteurs',
    matiere: 'Physique',
    sousCategorie: 'Cinématique',
    courseId: '3',
    nombreQuestions: 25,
    dateCreation: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    deadline: dans7jours,
    statut: 'a_faire',
  },
];

// Vidéos récentes
export const mockVideos: Video[] = [
  {
    id: '1',
    titre: 'Introduction aux matrices',
    matiere: 'Mathématiques',
    courseId: '1',
    dateAjout: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    duree: 15,
    nombreVues: 42,
  },
  {
    id: '2',
    titre: 'Déterminant et inversion',
    matiere: 'Mathématiques',
    courseId: '1',
    dateAjout: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    duree: 20,
    nombreVues: 38,
  },
  {
    id: '3',
    titre: 'Les liaisons covalentes',
    matiere: 'Chimie',
    courseId: '4',
    dateAjout: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    duree: 18,
    nombreVues: 35,
  },
  {
    id: '4',
    titre: 'Mouvements uniformément accélérés',
    matiere: 'Physique',
    courseId: '3',
    dateAjout: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    duree: 22,
    nombreVues: 50,
  },
  {
    id: '5',
    titre: 'Dérivées partielles',
    matiere: 'Mathématiques',
    courseId: '5',
    dateAjout: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    duree: 25,
    nombreVues: 45,
  },
];

// Historique des notes
export const mockNotes: Note[] = [
  {
    id: '1',
    qcmId: 'qcm_1',
    qcmTitre: 'QCM Algèbre - Matrices',
    matiere: 'Mathématiques',
    sousCategorie: 'Algèbre',
    note: 18,
    sur: 20,
    pourcentage: 90,
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    duree: 35,
    nombreQuestions: 20,
    reponses: [
      { questionId: '1', question: 'Qu\'est-ce qu\'une matrice identité ?', reponse: 'Une matrice avec des 1 sur la diagonale', correct: true, bonneReponse: 'Une matrice avec des 1 sur la diagonale' },
      { questionId: '2', question: 'Quel est le déterminant d\'une matrice 2x2 [[a,b],[c,d]] ?', reponse: 'ad-bc', correct: true, bonneReponse: 'ad-bc' },
    ],
  },
  {
    id: '2',
    qcmId: 'qcm_2',
    qcmTitre: 'QCM Physique - Cinématique',
    matiere: 'Physique',
    sousCategorie: 'Cinématique',
    note: 16,
    sur: 20,
    pourcentage: 80,
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    duree: 42,
    nombreQuestions: 20,
    reponses: [],
  },
  {
    id: '3',
    qcmId: 'qcm_3',
    qcmTitre: 'QCM Chimie - Liaisons',
    matiere: 'Chimie',
    sousCategorie: 'Réactions',
    note: 15,
    sur: 20,
    pourcentage: 75,
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    duree: 38,
    nombreQuestions: 20,
    reponses: [],
  },
  {
    id: '4',
    qcmId: 'qcm_4',
    qcmTitre: 'QCM Mathématiques - Géométrie',
    matiere: 'Mathématiques',
    sousCategorie: 'Géométrie',
    note: 17,
    sur: 20,
    pourcentage: 85,
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    duree: 40,
    nombreQuestions: 20,
    reponses: [],
  },
  {
    id: '5',
    qcmId: 'qcm_5',
    qcmTitre: 'QCM Physique - Thermodynamique',
    matiere: 'Physique',
    sousCategorie: 'Thermique',
    note: 14,
    sur: 20,
    pourcentage: 70,
    date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
    duree: 45,
    nombreQuestions: 20,
    reponses: [],
  },
];

// Fonction pour calculer l'urgence d'un QCM
export const getQCMUrgence = (deadline: Date): 'critique' | 'urgent' | 'normal' => {
  const now = new Date();
  const diffHours = (deadline.getTime() - now.getTime()) / (1000 * 60 * 60);

  if (diffHours < 24) return 'critique';
  if (diffHours < 72) return 'urgent';
  return 'normal';
};

// Fonction pour obtenir la couleur de l'urgence
export const getQCMColor = (deadline: Date): string => {
  const urgence = getQCMUrgence(deadline);
  if (urgence === 'critique') return 'from-red-500 to-red-600';
  if (urgence === 'urgent') return 'from-orange-500 to-orange-600';
  return 'from-blue-500 to-blue-600';
};

// Fonction pour formater les heures restantes
export const getTimeLeft = (deadline: Date): string => {
  const now = new Date();
  const diffMs = deadline.getTime() - now.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) return `${diffDays}j restant${diffDays > 1 ? 's' : ''}`;
  if (diffHours > 0) return `${diffHours}h restante${diffHours > 1 ? 's' : ''}`;
  return 'En retard !';
};