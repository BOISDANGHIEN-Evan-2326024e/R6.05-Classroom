'use client';

import React, { useState, useEffect } from 'react';
import {
  ChevronRight,
  BookOpen,
  Users,
  BarChart3,
  Zap,
  Brain,
  Play,
  LogOut,
  User,
} from 'lucide-react';

interface HomepageProps {
  setCurrentPage: (page: 'home' | 'dashboard' | 'login') => void;
}

export default function Homepage({ setCurrentPage }: HomepageProps) {
  const [scrollY, setScrollY] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [userRole, setUserRole] = useState<'eleve' | 'prof' | null>(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleConnect = (role: 'eleve' | 'prof') => {
    setIsConnected(true);
    setUserRole(role);
    setUserName(role === 'eleve' ? 'Étudiant' : 'Professeur');
    // 🎯 Redirection vers Dashboard
    setCurrentPage('dashboard');
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setUserRole(null);
    setUserName('');
    // 🎯 Retour à l'accueil
    setCurrentPage('home');
  };

  return (
    <div className="bg-slate-50 overflow-x-hidden">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-100 bg-white shadow-sm border-b border-slate-200 py-4 animate-slideDown">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform duration-300">
            <span className="text-2xl">📚</span>
            <span className="font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              ClassRoom Neuille
            </span>
          </div>

          {/* Nav Links / Auth */}
          {!isConnected ? (
            <div className="hidden md:flex gap-8 animate-slideInRight">
              <a href="#features" className="text-slate-700 font-medium text-sm hover:text-purple-600 transition-colors duration-300 relative group">
                Fonctionnalités
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-500 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#roles" className="text-slate-700 font-medium text-sm hover:text-purple-600 transition-colors duration-300 relative group">
                Rôles
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-500 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#about" className="text-slate-700 font-medium text-sm hover:text-purple-600 transition-colors duration-300 relative group">
                À propos
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-500 group-hover:w-full transition-all duration-300"></span>
              </a>
              <button
                onClick={() => setCurrentPage('login')}
                className="bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 text-sm"
              >
                Se connecter
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4 animate-slideInRight">
              <div className="flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-lg text-purple-600 font-semibold text-sm hover:bg-purple-200 transition-colors duration-300">
                <User size={18} />
                <span>{userName}</span>
              </div>
              <button
                onClick={handleDisconnect}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg font-semibold text-sm hover:bg-red-600 hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Déconnexion</span>
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-20">
        {/* Background Gradient - Now darker for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-500 to-pink-600 -z-20"></div>

        {/* Animated Orbs */}
        <div className="absolute w-96 h-96 bg-pink-400/50 rounded-full filter blur-3xl top-0 right-0 opacity-60 animate-float"></div>
        <div className="absolute w-80 h-80 bg-purple-400/50 rounded-full filter blur-3xl bottom-0 left-0 opacity-60 animate-float-reverse"></div>

        {/* Hero Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8 items-center relative z-10">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl FrontPage font-bold leading-tight animate-slideInUp text-violet-600">
              L'apprentissage
              <span className="block bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">
                redéfini
              </span>
            </h1>

            <p className="text-xl text-violet-500/90 animate-slideInUp animation-delay-200">
              Une plateforme complète pour apprendre, créer et progresser. Cours en ligne, quizz 
              intelligents générés par IA, et suivi de vos performances en temps réel.
            </p>
            {/* Stats */}
            <div className="flex gap-8 pt-4 animate-slideInUp animation-delay-400">
              <div className="hover:translate-y-2 transition-transform duration-300">
                <div className="text-4xl font-bold">500+</div>
                <div className="text-sm opacity-85">Cours</div>
              </div>
              <div className="hover:translate-y-2 transition-transform duration-300">
                <div className="text-4xl font-bold">10k+</div>
                <div className="text-sm opacity-85">Utilisateurs</div>
              </div>
              <div className="hover:translate-y-2 transition-transform duration-300">
                <div className="text-4xl font-bold">98%</div>
                <div className="text-sm opacity-85">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative h-96 hidden md:flex items-center justify-center">
            {/* Floating Cards */}
            <div className="absolute top-10 left-0 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl text-white font-semibold animate-float w-40">
              <Play size={24} className="mb-2 animate-spin-slow" />
              <p>Cours en ligne</p>
            </div>

            <div className="absolute top-32 right-10 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl text-white font-semibold animate-float animation-delay-200 w-40">
              <Zap size={24} className="mb-2 animate-spin-slow" />
              <p>IA Générative</p>
            </div>

            <div className="absolute bottom-10 left-20 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl text-white font-semibold animate-float animation-delay-400 w-40">
              <BarChart3 size={24} className="mb-2 animate-spin-slow" />
              <p>Analyse</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16 animate-slideInUp">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Pourquoi ClassRoom ?
            </h2>
            <p className="text-xl text-slate-600">
              Tout ce dont vous avez besoin pour apprendre efficacement
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Play, title: 'Cours Vidéo Premium', desc: 'Accédez à des milliers de cours en ligne structurés et progressifs, créés par des experts du domaine.' },
              { icon: Brain, title: 'Quizz Générés par IA', desc: 'Des questionnaires intelligents basés sur vos documents et vidéos, adaptés à votre niveau d\'apprentissage.' },
              { icon: BarChart3, title: 'Suivi des Notes', desc: 'Consultez vos performances en temps réel avec un dashboard intuitif et des statistiques détaillées.' },
              { icon: Users, title: 'Collaboration', desc: 'Travaillez en groupe, partagez vos ressources et progressez ensemble avec vos camarades.' },
              { icon: Zap, title: 'Interface Intuitive', desc: 'Une plateforme moderne et facile à utiliser, accessible sur tous vos appareils.' },
              { icon: BookOpen, title: 'Bibliothèque Complète', desc: 'Accès à une vaste collection de ressources pédagogiques organisées par sujet et niveau.' },
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={i}
                  className="group bg-white p-8 rounded-2xl border border-slate-200 hover:border-purple-300 hover:-translate-y-3 transition-all duration-500 shadow-sm hover:shadow-xl animate-slideInUp"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="bg-purple-100 w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-500 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    <Icon className="text-purple-600 group-hover:text-white group-hover:animate-bounce-subtle" size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Roles Section */}
      {!isConnected ? (
        <section id="roles" className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-16 animate-slideInUp">
              <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                Deux univers, une plateforme
              </h2>
              <p className="text-xl text-slate-600">
                Des fonctionnalités adaptées à votre rôle
              </p>
            </div>

            {/* Role Cards */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Student Card */}
              <div className="group bg-white border-2 border-slate-200 rounded-2xl p-8 hover:border-cyan-400 hover:-translate-y-4 transition-all duration-500 animate-slideInUp">
                <div className="h-1 bg-gradient-to-r from-cyan-400 to-cyan-600 absolute top-0 left-0 right-0 rounded-full group-hover:h-1.5 transition-all duration-300"></div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="text-4xl animate-bounce">👨‍🎓</div>
                  <h3 className="text-2xl font-bold text-slate-900">Espace Élève</h3>
                </div>

                <ul className="space-y-3 mb-8">
                  {[
                    'Suivez des cours interactifs',
                    'Passez des quizz intelligents',
                    'Consultez vos notes en temps réel',
                    'Recevez des recommandations personnalisées',
                    'Collaborez avec d\'autres élèves',
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3 group/item hover:translate-x-2 transition-transform duration-300">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-cyan-100 text-cyan-600 font-bold text-xs flex-shrink-0 mt-1 group-hover/item:scale-125 group-hover/item:rotate-360 transition-all duration-300">
                        ✓
                      </span>
                      <p className="text-slate-700">{benefit}</p>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleConnect('eleve')}
                  className="w-full bg-gradient-to-r from-cyan-400 to-cyan-600 text-white font-bold py-3 rounded-lg hover:scale-105 active:scale-95 transition-transform duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl group/btn"
                >
                  Accéder en tant qu'Élève
                  <ChevronRight size={20} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                </button>
              </div>

              {/* Teacher Card */}
              <div className="group bg-white border-2 border-slate-200 rounded-2xl p-8 hover:border-purple-400 hover:-translate-y-4 transition-all duration-500 animate-slideInUp animation-delay-100">
                <div className="h-1 bg-gradient-to-r from-purple-600 to-pink-500 absolute top-0 left-0 right-0 rounded-full group-hover:h-1.5 transition-all duration-300"></div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="text-4xl animate-bounce">👨‍🏫</div>
                  <h3 className="text-2xl font-bold text-slate-900">Espace Professeur</h3>
                </div>

                <ul className="space-y-3 mb-8">
                  {[
                    'Créez et gérez vos cours',
                    'Générez des quizz avec l\'IA',
                    'Suivez la progression de vos élèves',
                    'Analysez les performances',
                    'Gérez plusieurs classes facilement',
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3 group/item hover:translate-x-2 transition-transform duration-300">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-600 font-bold text-xs flex-shrink-0 mt-1 group-hover/item:scale-125 group-hover/item:rotate-360 transition-all duration-300">
                        ✓
                      </span>
                      <p className="text-slate-700">{benefit}</p>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleConnect('prof')}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-3 rounded-lg hover:scale-105 active:scale-95 transition-transform duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl group/btn"
                >
                  Accéder en tant que Professeur
                  <ChevronRight size={20} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section id="roles" className="py-24 bg-white min-h-screen flex items-center justify-center">
          <div className="max-w-2xl mx-auto text-center animate-slideInUp">
            <h2 className="text-5xl font-bold mb-4 text-slate-900">
              Bienvenue sur ClassRoom Neuille ! 👋
            </h2>
            <p className="text-2xl text-slate-700 mb-2">
              Vous êtes maintenant connecté en tant que <strong className="text-purple-600">{userName}</strong>
            </p>
            <p className="text-xl text-slate-600 mb-8">
              Accédez à votre espace personnel pour commencer votre apprentissage
            </p>
            <button
              onClick={() => setCurrentPage('dashboard')}
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-4 px-8 rounded-lg hover:-translate-y-2 active:translate-y-0 transition-transform duration-300 text-lg flex items-center justify-center gap-2 mx-auto shadow-xl hover:shadow-2xl"
            >
              Accéder à mon espace
              <ChevronRight size={24} />
            </button>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 -z-20"></div>
        <div className="absolute w-96 h-96 bg-white/10 rounded-full filter blur-3xl -top-20 -right-20 opacity-60 animate-float"></div>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white relative z-10 animate-slideInUp">
          <h2 className="text-5xl font-bold mb-4">Prêt à commencer ?</h2>
          <p className="text-xl mb-8 opacity-95">
            Rejoignez des milliers d'utilisateurs qui transforment leur façon d'apprendre
          </p>
          <button
            onClick={() => setCurrentPage('login')}
            className="bg-white text-purple-600 font-bold py-4 px-8 rounded-lg hover:-translate-y-2 active:translate-y-0 transition-all duration-300 text-lg flex items-center justify-center gap-2 mx-auto shadow-xl hover:shadow-2xl"
          >
            Créer un compte gratuit
            <ChevronRight size={24} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 animate-slideInUp">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="text-white font-bold mb-2">ClassRoom Neuille</h4>
            <p>Transformez votre apprentissage</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-2">Liens</h4>
            <a href="#features" className="block hover:text-purple-400 hover:translate-x-1 transition-all duration-300">Fonctionnalités</a>
            <a href="#roles" className="block hover:text-purple-400 hover:translate-x-1 transition-all duration-300">Rôles</a>
          </div>
          <div>
            <h4 className="text-white font-bold mb-2">Support</h4>
            <a href="#contact" className="block hover:text-purple-400 hover:translate-x-1 transition-all duration-300">Contact</a>
            <a href="#faq" className="block hover:text-purple-400 hover:translate-x-1 transition-all duration-300">FAQ</a>
          </div>
        </div>
        <div className="border-t border-slate-700 pt-8 text-center text-sm">
          <p>&copy; 2024 ClassRoom Neuille. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}