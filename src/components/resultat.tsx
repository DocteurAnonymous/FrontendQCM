import { Award } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getOneEtudiant } from "../services/etudiantService";
import type { Etudiant } from "../Interfaces/Etudiant";
import { addResultat } from "../services/resultatService";
import type { Resultat } from "../Interfaces/Resultat";

const Resultat = () => {

    const [etudiant, setEtudiant] = useState<Etudiant | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { state } = useLocation();

    useEffect(() => {
        const codeuser = sessionStorage.getItem('etudiantCode');
        if (!codeuser) {
            setError("Aucun code d'étudiant trouvé en session");
            return;
        }

        const fetchEtudiant = async () => {
            const result = await getOneEtudiant(codeuser);
            if (!result.success) {
                setError("Impossible de récupérer les informations de l'étudiant");
                return;
            }
            setEtudiant(result.data); // stocke les infos de l'étudiant
        };

        fetchEtudiant();
    }, []);

    // Enregistrer directement la note de l'étudiant
    useEffect(() => {
        const envoyerResultat = async () => {
            if (!state) return;

            const { score, pourcentage, niveau } = state;
            const note = score;
            const appreciation = niveau;

            const codeuser = sessionStorage.getItem('etudiantCode');
            if (!codeuser) {
                setError("Aucun code d'étudiant trouvé en session");
                return;
            }

            const resultat: Resultat = {
                note,
                appreciation,
                pourcentage,
            };

            const response = await addResultat(resultat, codeuser);
            if (!response.success) {
                console.error("Erreur lors de l'envoi du résultat :", response.errors);
            } else {
                console.log("Résultat envoyé avec succès :", response.data);
            }
        };

        envoyerResultat();
    }, [state]);

    // if (error) return <p className="text-red-500">{error}</p>;
    // if (!etudiant) return <p>Chargement...</p>;

    if (!state) {
    return (
        <div className="flex justify-center mt-2">
            <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8 text-center">
                
                <p className="text-red-600 font-semibold">
                Aucun résultat trouvé. Veuillez passer l’évaluation.
                </p>

                <button
                onClick={() => navigate("/")}
                className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded mx-auto block"
                >
                Retour à l’inscription
                </button>

            </div>
        </div>

        );
    }

    const { score, total, pourcentage, niveau } = state;
    
    return (
        <div className="flex justify-center mt-2">
            <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8">
                <div className="text-center mb-8">
                <Award className="w-20 h-20 mx-auto text-indigo-600 mb-4" />
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Évaluation Terminée</h2>
                <p className="text-gray-600">{etudiant?.prenom} {etudiant?.nom}</p>
                </div>

                <div className="bg-indigo-50 rounded-lg p-6 mb-6">
                <div className="text-center">
                    <div className="text-5xl font-bold text-indigo-600 mb-2"> {score} / {total} </div>
                    <div className="text-2xl font-semibold text-indigo-800"> {niveau} </div>
                    <div className="text-gray-600 mt-2"> {pourcentage.toFixed(1)} % </div>
                </div>
                </div>

                <div className="space-y-2 text-gray-700 mb-6">
                <p><strong>Nom complet:</strong> {etudiant?.prenom} {etudiant?.nom} </p>
                <p><strong>Classe:</strong> {etudiant?.classe} </p>
                <p><strong>Promotion:</strong> {etudiant?.promotion} </p>
                <p><strong>Département:</strong> {etudiant?.departement} </p>
                <p><strong>Matricule:</strong> {etudiant?.matricule} </p>
                </div>

                <button
                    onClick={() => navigate("/")}
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
                    Retour
                </button>
            </div>
        </div>
    );
}

export default Resultat;