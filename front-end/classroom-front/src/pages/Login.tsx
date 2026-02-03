import { useState } from 'react'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'

interface LoginProps {
  setCurrentPage: (page: 'home' | 'dashboard' | 'login') => void;
}

export default function Login({ setCurrentPage }: LoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [userRole, setUserRole] = useState<'student' | 'teacher' | null>(null)

  const handleSubmit = async () => {
  if (!email || !password) {
    alert('Veuillez remplir tous les champs');
    return;
  }
  
  setIsLoading(true);

  try {
    const response = await fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,      // Doit matcher 'username_path' du yaml
        password: password // Doit matcher 'password_path' du yaml
      }),
    });

    if (response.ok) {
      const userData = await response.json();
      console.log('Utilisateur connecté :', userData);
      
      // Optionnel : stocker l'ID dans le localStorage si besoin
      localStorage.setItem('user_id', userData.id);
      
      setCurrentPage('dashboard');
    } else {
      alert('Identifiants incorrects. Vérifiez votre email ou mot de passe.');
    }
  } catch (error) {
    console.error('Erreur réseau :', error);
    alert('Le serveur Symfony ne répond pas.');
  } finally {
    setIsLoading(false);
  }
};

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* Section gauche - Présentation */}
        <div className="text-white hidden md:block">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-2xl">📚</span>
            </div>
            <h1 className="text-4xl font-bold">ClassRoom neuille</h1>
          </div>
          
          <p className="text-lg leading-relaxed mb-12 text-purple-100">
            Votre plateforme d'apprentissage en ligne. Découvrez des milliers de cours et développez vos compétences à votre rythme.
          </p>

          <div className="bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-2xl p-8 backdrop-blur-sm border border-white/20 mb-12">
            <div className="aspect-video bg-white/10 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl mb-3">👩‍💻</div>
                <p className="text-white/80">Apprenez en ligne</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-2xl font-bold">500+</div>
              <div className="text-sm text-purple-100">Cours</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-2xl font-bold">10k+</div>
              <div className="text-sm text-purple-100">Étudiants</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-2xl font-bold">Expert</div>
              <div className="text-sm text-purple-100">Teachers</div>
            </div>
          </div>
        </div>

        {/* Section droite - Formulaire */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
          {userRole === null ? (
            <>
              {/* Choix du rôle */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Qui êtes-vous ?</h2>
                <p className="text-gray-600 mb-8">Choisissez votre rôle pour continuer</p>

                <div className="space-y-3">
                  <button
                    onClick={() => setUserRole('student')}
                    className="w-full bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-white font-bold py-3 rounded-lg transition duration-300 flex items-center justify-center gap-3 shadow-md hover:shadow-lg"
                  >
                    <span className="text-2xl">👨‍🎓</span>
                    Je suis un Étudiant
                  </button>

                  <button
                    onClick={() => {
                      // Redirection vers localhost:8000/login pour les professeurs
                      window.location.href = 'http://localhost:8000/login'
                    }}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold py-3 rounded-lg transition duration-300 flex items-center justify-center gap-3 shadow-md hover:shadow-lg"
                  >
                    <span className="text-2xl">👨‍🏫</span>
                    Je suis un Professeur
                  </button>
                </div>

                <p className="text-center text-gray-600 mt-6">
                  <button
                    onClick={() => setCurrentPage('home')}
                    className="text-purple-600 hover:text-purple-700 font-semibold hover:underline"
                  >
                    Retour à l'accueil
                  </button>
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Formulaire de connexion Étudiant */}
              <div className="mb-8">
                <button
                  onClick={() => setUserRole(null)}
                  className="text-gray-600 hover:text-gray-800 font-medium mb-4 flex items-center gap-2"
                >
                  ← Changer de rôle
                </button>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Bon retour ! 👋</h2>
                <p className="text-gray-600">Connectez-vous pour continuer votre apprentissage</p>
              </div>

              <div className="space-y-6">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adresse email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="vous@example.com"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                    />
                  </div>
                </div>

                {/* Mot de passe */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                    />
                    <span className="text-sm text-gray-700">Se souvenir de moi</span>
                  </label>
                  <a href="#" className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                    Mot de passe oublié ?
                  </a>
                </div>

                {/* Bouton connexion */}
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-3 rounded-lg transition duration-200 disabled:opacity-50"
                >
                  {isLoading ? 'Connexion en cours...' : 'Se connecter'}
                </button>
              </div>
              {/* Signup link */}
              <p className="mt-8 text-center text-gray-600">
                Vous n'avez pas de compte ?{' '}
                <a href="#" className="text-purple-600 hover:text-purple-700 font-semibold">
                  S'inscrire
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}