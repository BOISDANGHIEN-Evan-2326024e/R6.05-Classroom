'use client';

import { useState } from 'react';
import {
  Home,
  BookOpen,
  BarChart3,
  AlertCircle,
  LogOut,
  ChevronRight,
  TrendingUp,
  Target,
  User as UserIcon,
  Settings,
  Clock,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import {
  getQCMColor,
  getTimeLeft,
  getQCMUrgence,
} from '../utils/mockData';
import { useNavigate } from 'react-router-dom';

import { useDashboardData } from './../hooks/useDashboardData';

export default function Dashboard() { 
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // États locaux nécessaires pour la navigation interne (ajoutés car manquants dans ton snippet)
  const [currentSection, setCurrentSection] = useState('accueil');
  const [selectedNote, setSelectedNote] = useState(null);

  // RÉCUPÉRATION DES DONNÉES DEPUIS SYMFONY
  // On renomme les variables extraites pour pouvoir appliquer des valeurs par défaut ensuite
  const { 
    user: fetchedUser, 
    stats: fetchedStats, 
    cours: fetchedCours, 
    qcmAFaire: fetchedQcmAFaire, 
    notes: fetchedNotes, 
    videos: fetchedVideos, 
    isLoading, 
    error 
  } = useDashboardData();

  // --- LOGIQUE DE SÉCURISATION DES DONNÉES (FALLBACKS) ---
  // Si le fetch échoue ou renvoie null, on utilise ces valeurs "vides" pour afficher la page quand même.
  
  const user = fetchedUser || { 
    prenom: 'Invité', 
    nom: '', 
    email: 'Non connecté',
    matieres: [],
    dateInscription: new Date() // Date par défaut pour éviter le crash du .toLocaleDateString
  };

  const stats = fetchedStats || {
    moyenneGenerale: '-',
    tauxReussite: 0,
    totalQCMTermines: 0,
    totalQCMAfaire: 0,
    progressionMois: [] // Tableau vide pour éviter le crash du graph
  };

  // Pour les listes, on s'assure que ce sont des tableaux, sinon tableau vide
  const cours = Array.isArray(fetchedCours) ? fetchedCours : [];
  const qcmAFaire = Array.isArray(fetchedQcmAFaire) ? fetchedQcmAFaire : [];
  const notes = Array.isArray(fetchedNotes) ? fetchedNotes : [];
  const videos = Array.isArray(fetchedVideos) ? fetchedVideos : [];

  const handleDisconnect = () => {
    navigate('/');
  };

  // 1. ÉCRAN DE CHARGEMENT (Tu peux le garder ou l'enlever si tu veux afficher le squelette tout de suite)
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-600 font-medium">Connexion à la classe...</p>
        </div>
      </div>
    );
  }

  // 2. ÉCRAN D'ERREUR SUPPRIMÉ/MODIFIÉ
  // Au lieu de bloquer tout l'écran, on peut juste afficher une notification toast ou rien du tout.
  // J'ai commenté le bloc bloquant ci-dessous :

  /* if (error || !user || !stats) {
    return ( ... ÉCRAN D'ERREUR ... );
  }
  */

  // Préparation des données du graph avec sécurité (optional chaining ?.)
  const rawGraphData = stats.progressionMois || [];
  const graphData = rawGraphData.map((value, index) => ({
    day: `J${index + 1}`,
    moyenne: value,
  }));

  return (
    <div className="flex h-screen bg-slate-50">
      
      {/* Affichage discret d'un message d'erreur si les données sont incomplètes (Optionnel) */}
      {error && (
        <div className="fixed bottom-4 right-4 z-50 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-lg flex items-center gap-2">
           <AlertCircle size={20} />
           <p className="text-sm">Certaines données n'ont pas pu être chargées.</p>
        </div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen bg-white shadow-lg transition-all duration-300 ease-out ${
          sidebarOpen ? 'w-64' : 'w-16'
        } hover:w-64 group`}
        onMouseLeave={() => setSidebarOpen(false)}
        onMouseEnter={() => setSidebarOpen(true)}
      >
        <div className="flex items-center justify-between h-20 px-4 border-b border-slate-200">
          <div className={`flex items-center gap-3 ${!sidebarOpen && 'group-hover:flex'}`}>
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold">
              📚
            </div>
            {sidebarOpen && <span className="font-bold text-sm">ClassRoom</span>}
          </div>
        </div>

        <nav className="mt-8 space-y-2 px-3">
          {[
            { icon: Home, label: 'Accueil', id: 'accueil' },
            { icon: BookOpen, label: 'Mes cours', id: 'cours' },
            { icon: AlertCircle, label: 'QCM à faire', id: 'qcm' },
            { icon: BarChart3, label: 'Notes', id: 'notes' },
            { icon: Settings, label: 'Profil', id: 'profil' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentSection(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 ${
                  currentSection === item.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon size={20} />
                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-0 right-0 px-3">
          <button
            onClick={handleDisconnect}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200"
          >
            <LogOut size={20} />
            {sidebarOpen && <span className="text-sm font-medium">Déconnexion</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-16 flex-1 overflow-auto">
        <header className="bg-white shadow-sm sticky top-0 z-40">
          <div className="h-20 px-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {currentSection === 'accueil' && 'Tableau de bord'}
                {currentSection === 'cours' && 'Mes cours'}
                {currentSection === 'qcm' && 'QCM à faire'}
                {currentSection === 'notes' && 'Mes notes'}
                {currentSection === 'profil' && 'Mon profil'}
              </h1>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3 px-4 py-2 bg-purple-100 rounded-lg">
                <UserIcon size={18} className="text-purple-600" />
                <span className="text-sm font-semibold text-purple-600">
                  {user.prenom} {user.nom}
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* ===== ACCUEIL ===== */}
          {currentSection === 'accueil' && (
            <div className="space-y-8 animate-slideInUp">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">
                    Bienvenue, {user.prenom} ! 👋
                  </h2>
                  <p className="text-slate-600">
                    Voici un résumé de votre progression académique
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: 'Moyenne générale',
                    value: typeof stats.moyenneGenerale === 'number' ? `${stats.moyenneGenerale}/20` : stats.moyenneGenerale,
                    icon: TrendingUp,
                    color: 'from-blue-500 to-blue-600',
                  },
                  {
                    title: 'Taux de réussite',
                    value: `${stats.tauxReussite}%`,
                    icon: Target,
                    color: 'from-green-500 to-green-600',
                  },
                  {
                    title: 'QCM terminés',
                    value: stats.totalQCMTermines,
                    icon: BarChart3,
                    color: 'from-purple-500 to-purple-600',
                  },
                  {
                    title: 'QCM à faire',
                    value: stats.totalQCMAfaire,
                    icon: AlertCircle,
                    color: 'from-orange-500 to-orange-600',
                  },
                ].map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={i}
                      className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-slate-200"
                    >
                      <div className={`bg-gradient-to-r ${stat.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                        <Icon className="text-white" size={24} />
                      </div>
                      <p className="text-sm text-slate-600 mb-1">{stat.title}</p>
                      <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                    </div>
                  );
                })}
              </div>

              {/* Si le graphData est vide, on peut cacher le graphique ou afficher un message vide */}
              {graphData.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Progression (30 derniers jours)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={graphData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="day" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" domain={[0, 20]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="moyenne"
                      stroke="#a855f7"
                      strokeWidth={3}
                      dot={{ fill: '#a855f7', r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              )}

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center gap-2 mb-6">
                  <AlertCircle className="text-red-500" size={24} />
                  <h3 className="text-lg font-bold text-slate-900">⚡ QCM à faire (urgent)</h3>
                </div>

                <div className="space-y-3">
                  {/* Message si aucun QCM n'est chargé */}
                  {qcmAFaire.length === 0 && <p className="text-slate-500 italic">Aucun QCM urgent ou impossible de charger les données.</p>}
                  
                  {qcmAFaire.map((qcm: any) => {
                    const timeLeft = getTimeLeft(qcm.deadline);
                    const colors = getQCMColor(qcm.deadline);

                    return (
                      <div
                        key={qcm.id}
                        className={`bg-gradient-to-r ${colors} rounded-xl p-4 text-white shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-bold text-sm mb-1">{qcm.titre}</h4>
                            <p className="text-xs opacity-90">{qcm.nombreQuestions} questions</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-sm">{timeLeft}</p>
                            <p className="text-xs opacity-90">{qcm.matiere}</p>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-xs">Commencer maintenant</span>
                          <ChevronRight size={16} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-6">📹 Dernières vidéos du professeur</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {videos.length === 0 && <p className="text-slate-500 italic col-span-3">Aucune vidéo disponible.</p>}
                  {videos.map((video: any) => (
                    <div
                      key={video.id}
                      className="bg-gradient-to-br from-slate-100 to-slate-50 rounded-xl p-4 hover:shadow-lg transition-all duration-300 cursor-pointer group border border-slate-200"
                    >
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg h-32 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-300">
                        <div className="text-white text-4xl">▶️</div>
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 mb-2 line-clamp-2">{video.titre}</h4>
                      <p className="text-xs text-slate-600 mb-3">{video.matiere}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-slate-600">
                          <Clock size={14} />
                          {video.duree}min
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-600">
                          👁️ {video.nombreVues}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ===== MES COURS ===== */}
          {currentSection === 'cours' && (
            <div className="animate-slideInUp">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-bold text-slate-900">Cours</th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-slate-900">Matière</th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-slate-900">Catégorie</th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-slate-900">Vidéos</th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-slate-900">Progression</th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-slate-900">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {cours.map((c: any) => (
                        <tr key={c.id} className="hover:bg-slate-50 transition-colors duration-200">
                          <td className="px-6 py-4 text-sm font-medium text-slate-900">{c.titre}</td>
                          <td className="px-6 py-4 text-sm text-slate-600">{c.matiere}</td>
                          <td className="px-6 py-4 text-sm text-slate-600">{c.sousCategorie}</td>
                          <td className="px-6 py-4 text-sm text-slate-600">{c.nombreVideos}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                                  style={{ width: `${c.progression}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-semibold text-slate-900">{c.progression}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <button className="text-purple-600 hover:text-purple-700 font-semibold text-sm hover:underline">
                              Continuer →
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ===== QCM À FAIRE ===== */}
          {currentSection === 'qcm' && (
            <div className="space-y-6 animate-slideInUp">
              {qcmAFaire.map((qcm: any) => {
                const urgence = getQCMUrgence(qcm.deadline);
                const timeLeft = getTimeLeft(qcm.deadline);
                const colors = getQCMColor(qcm.deadline);

                return (
                  <div
                    key={qcm.id}
                    className={`bg-gradient-to-r ${colors} rounded-2xl p-8 text-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold">{qcm.titre}</h3>
                      <span className={`px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg font-semibold text-sm ${urgence === 'critique' ? 'animate-pulse' : ''}`}>
                        {timeLeft}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-6 mb-6">
                      <div>
                        <p className="text-sm opacity-90">Matière</p>
                        <p className="text-lg font-bold">{qcm.matiere}</p>
                      </div>
                      <div>
                        <p className="text-sm opacity-90">Questions</p>
                        <p className="text-lg font-bold">{qcm.nombreQuestions}</p>
                      </div>
                      <div>
                        <p className="text-sm opacity-90">Catégorie</p>
                        <p className="text-lg font-bold">{qcm.sousCategorie}</p>
                      </div>
                    </div>
                    <button className="bg-white text-slate-900 font-bold px-8 py-3 rounded-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105 flex items-center gap-2">
                      Commencer le QCM
                      <ChevronRight size={20} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* ===== MES NOTES ===== */}
          {currentSection === 'notes' && (
            <div className="space-y-6 animate-slideInUp">
              {selectedNote ? (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                  <button
                    onClick={() => setSelectedNote(null)}
                    className="text-purple-600 hover:text-purple-700 font-semibold mb-6 flex items-center gap-2"
                  >
                    ← Retour aux notes
                  </button>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-8 border border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">{selectedNote.qcmTitre}</h2>
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-slate-600">Note obtenue</p>
                        <p className="text-3xl font-bold text-purple-600">{selectedNote.note}/20</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Pourcentage</p>
                        <p className="text-3xl font-bold text-green-600">{selectedNote.pourcentage}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Durée</p>
                        <p className="text-3xl font-bold text-blue-600">{selectedNote.duree}min</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Date</p>
                        <p className="text-3xl font-bold text-slate-900">
                            {/* Sécurité si date n'est pas un objet Date valide */}
                            {selectedNote.date instanceof Date ? selectedNote.date.toLocaleDateString('fr-FR') : 'Date inconnue'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-slate-200">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-bold text-slate-900">QCM</th>
                          <th className="px-6 py-4 text-left text-sm font-bold text-slate-900">Matière</th>
                          <th className="px-6 py-4 text-left text-sm font-bold text-slate-900">Catégorie</th>
                          <th className="px-6 py-4 text-left text-sm font-bold text-slate-900">Note</th>
                          <th className="px-6 py-4 text-left text-sm font-bold text-slate-900">%</th>
                          <th className="px-6 py-4 text-left text-sm font-bold text-slate-900">Date</th>
                          <th className="px-6 py-4 text-left text-sm font-bold text-slate-900">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {notes.map((note: any) => (
                          <tr key={note.id} className="hover:bg-slate-50 transition-colors duration-200">
                            <td className="px-6 py-4 text-sm font-medium text-slate-900">{note.qcmTitre}</td>
                            <td className="px-6 py-4 text-sm text-slate-600">{note.matiere}</td>
                            <td className="px-6 py-4 text-sm text-slate-600">{note.sousCategorie}</td>
                            <td className="px-6 py-4">
                              <span className="inline-block bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-3 py-1 rounded-lg font-bold text-sm">
                                {note.note}/20
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <div className={`w-16 h-2 bg-slate-200 rounded-full overflow-hidden`}>
                                  <div
                                    className={`h-full ${
                                      note.pourcentage >= 80
                                        ? 'bg-green-500'
                                        : note.pourcentage >= 60
                                        ? 'bg-yellow-500'
                                        : 'bg-red-500'
                                    }`}
                                    style={{ width: `${note.pourcentage}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm font-semibold text-slate-900">{note.pourcentage}%</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-600">
                              {note.date instanceof Date ? note.date.toLocaleDateString('fr-FR') : ''}
                            </td>
                            <td className="px-6 py-4">
                              <button
                                onClick={() => setSelectedNote(note)}
                                className="text-purple-600 hover:text-purple-700 font-semibold text-sm hover:underline"
                              >
                                Détails →
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ===== PROFIL ===== */}
          {currentSection === 'profil' && (
            <div className="max-w-2xl animate-slideInUp">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-200">
                  <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl flex items-center justify-center text-5xl">
                    👤
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">
                      {user.prenom} {user.nom}
                    </h2>
                    <p className="text-slate-600 mb-4">{user.email}</p>
                    <p className="text-sm text-slate-600">
                      Inscrit depuis le {user.dateInscription instanceof Date ? user.dateInscription.toLocaleDateString('fr-FR') : 'Date inconnue'}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Matières suivies</h3>
                    <div className="flex flex-wrap gap-3">
                      {user.matieres && user.matieres.map((matiere: string, i: number) => (
                        <span
                          key={i}
                          className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-lg font-semibold text-sm"
                        >
                          {matiere}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Statistiques globales</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <p className="text-sm text-slate-600 mb-1">Moyenne générale</p>
                        <p className="text-2xl font-bold text-purple-600">{stats.moyenneGenerale}/20</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <p className="text-sm text-slate-600 mb-1">Taux de réussite</p>
                        <p className="text-2xl font-bold text-green-600">{stats.tauxReussite}%</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <p className="text-sm text-slate-600 mb-1">QCM terminés</p>
                        <p className="text-2xl font-bold text-blue-600">{stats.totalQCMTermines}</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <p className="text-sm text-slate-600 mb-1">QCM en attente</p>
                        <p className="text-2xl font-bold text-orange-600">{stats.totalQCMAfaire}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}