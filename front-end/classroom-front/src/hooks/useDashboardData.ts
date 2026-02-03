// src/hooks/useDashboardData.ts
import { useState, useEffect } from 'react';
import { Matiere, SousCategorie, Cours, Video, QCM, Note, Answer, StatistiquesGlobales, User} from './../types';
export function useDashboardData(userId?: number) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [cours, setCours] = useState([]);
  const [qcmAFaire, setQcmAFaire] = useState([]);
  const [notes, setNotes] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        const options = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include' as RequestCredentials, // <--- CA C'EST VITAL
        };

        const userUrl = userId ? `http://localhost:8000/api/user/${userId}` : `http://localhost:8000/api/user`;

        /*
        const [userRes, statsRes, coursRes, qcmRes, notesRes, videosRes] = await Promise.all([
            fetch(userUrl, options),
            fetch('http://localhost:8000/api/stats', options),
            fetch('http://localhost:8000/api/cours', options),
            fetch('http://localhost:8000/api/qcm', options),
            fetch('http://localhost:8000/api/notes', options),
            fetch('http://localhost:8000/api/videos', options)
        ]); */


        const [userRes, coursRes, qcmRes] = await Promise.all([
            fetch(userUrl, options),
            fetch('http://localhost:8000/api/cours', options),
            fetch('http://localhost:8000/api/qcm', options),
        ]);

        if (!userRes.ok) throw new Error("Erreur lors du chargement des données");

        const userData = await userRes.json();
        //const statsData = await statsRes.json();
        const coursData = await coursRes.json();
        const qcmData = await qcmRes.json();
        //const notesData = await notesRes.json();
        //const videosData = await videosRes.json();

        // CONVERSION DES DONNEES
        
        // 1. User
        setUser({
            ...userData,
            dateInscription: new Date(userData.dateInscription)
        });

        // 2. Stats
        //setStats(statsData);

        // 3. QCM (Important pour le calcul du temps restant)
        setQcmAFaire(qcmData.map((q: any) => ({
            ...q,
            // Ton back ne renvoie pas dateCreation, on met une date par défaut ou on gère sans
            dateCreation: new Date(), 
            deadline: new Date(q.deadline) 
        })));

        // 4. Notes
        /*setNotes(notesData.map((n: any) => ({
            ...n,
            date: new Date(n.date)
        }))); */

        // 5. Cours
        setCours(coursData); // Pas de date dans ton JSON cours actuel

        /*
        // 6. Vidéos
        setVideos(videosData); // Pas de date dans ton JSON video actuel
*/
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  return { user, stats, cours, qcmAFaire, notes, videos, isLoading, error };
}