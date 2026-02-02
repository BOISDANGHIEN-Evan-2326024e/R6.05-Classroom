// Types pour le Dashboard

export interface Matiere {
  id: string;
  nom: string;
  couleur: string;
}

export interface SousCategorie {
  id: string;
  nom: string;
  matiereId: string;
}

export interface Cours {
  id: string;
  titre: string;
  matiere: string;
  sousCategorie: string;
  dateCreation: Date;
  nombreVideos: number;
  progression: number; // 0-100
}

export interface Video {
  id: string;
  titre: string;
  matiere: string;
  courseId: string;
  dateAjout: Date;
  duree: number; // en minutes
  nombreVues?: number;
}

export interface QCM {
  id: string;
  titre: string;
  matiere: string;
  sousCategorie: string;
  courseId: string;
  nombreQuestions: number;
  dateCreation: Date;
  deadline: Date;
  statut: 'a_faire' | 'en_cours' | 'termine';
  noteObtenue?: number;
  noteSur?: number;
  dateTermine?: Date;
}

export interface Note {
  id: string;
  qcmId: string;
  qcmTitre: string;
  matiere: string;
  sousCategorie: string;
  note: number;
  sur: number;
  pourcentage: number;
  date: Date;
  duree: number; // en minutes
  nombreQuestions: number;
  reponses: Answer[];
}

export interface Answer {
  questionId: string;
  question: string;
  reponse: string;
  correct: boolean;
  bonneReponse: string;
}

export interface StatistiquesGlobales {
  moyenneGenerale: number;
  tauxReussite: number;
  totalQCMTermines: number;
  totalQCMAfaire: number;
  derniereMatiere: string;
  derniereDate: Date;
  progressionMois: number[]; // Array de moyennes par jour sur 30 jours
}

export interface User {
  id: string;
  prenom: string;
  nom: string;
  email: string;
  profId: string;
  matieres: string[];
  dateInscription: Date;
}