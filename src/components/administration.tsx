import { Activity, Award, Download, LogOut, RefreshCw, Users } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AllEtudiant } from "../services/etudiantService";
import html2pdf from "html2pdf.js";


const Administration : React.FC = () => {

    const navigate = useNavigate();

    const [error, setError] = useState<string | null>(null);
    const [etudiants, setEtudiants] = useState<any[]>([]);
    const [enCours, setEnCours] = useState<any[]>([]);
    const [termines, setTermines] = useState<any[]>([]);

    const exportPDF = () => {
        const element = document.getElementById("pdf-content");
        if (!element) return;

        const options = {
            margin: 0.5,
            filename: `resultats-qcm-${new Date().toISOString().slice(0,10)}.pdf`,
            image: {
                type: "jpeg" as const,
                quality: 0.98,
            },
            html2canvas: {
                scale: 2,
            },
            jsPDF: {
                unit: 'in',
                format: 'a4',
                orientation: 'portrait' as const,
            }
        }


        html2pdf().set(options).from(element).save();
    }

    const fetchEtudiant = async () => {
        const result = await AllEtudiant();
        if (!result.success) {
            setError("Impossible de récupérer la liste des etudiants");
            return;
        }

        const liste = result.data.listeEtudiant;
        setEtudiants(liste);
        setEnCours(liste.filter((e: any) => e.resultat === null));
        setTermines(liste.filter((e: any) => e.resultat !== null));
    };


    useEffect(() => {    
        fetchEtudiant();

        const interval = setInterval(() => {
            fetchEtudiant();
        }, 3000); // toutes les 3 secondes

        return () => clearInterval(interval); // nettoyage

    }, []);

    return (
        <div className="flex justify-center mt-2">
            <div className="w-full max-w-7xl">
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                            <Users className="w-6 h-6" />
                            Interface Administrateur
                        </h2>
                        <div className="flex gap-2 flex-wrap">
                            <button
                            className= 'flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700'
                            onClick={exportPDF}
                            >
                            <Download className="w-4 h-4" />
                            Exporter
                            </button>
                            <button 
                            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                            <RefreshCw className="w-4 h-4" />
                            Réinitialiser
                            </button>
                            <button onClick={() => navigate('/')} className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
                            <LogOut className="w-4 h-4" />
                            Quitter
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                            <div className="text-sm text-blue-600 font-medium">Total</div>
                            <div className="text-3xl font-bold text-blue-900">{etudiants.length}</div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                            <div className="text-sm text-green-600 font-medium">Terminés</div>
                            <div className="text-3xl font-bold text-green-900">{termines.length}</div>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                            <div className="text-sm text-orange-600 font-medium">En cours</div>
                            <div className="text-3xl font-bold text-orange-900">({enCours.length})</div>
                        </div>
                    </div>

                    {/* Etudiant en cours */}
                    <h3 className="text-lg font-bold text-orange-700 mb-3 flex items-center gap-2">
                        <Activity className="w-5 h-5" />
                        En cours ({enCours.length})
                    </h3>

                    <div className="space-y-3">
                    {enCours.map((etudiant) => (
                        <div
                        key={etudiant.id}
                        className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4"
                        >
                        <div className="flex justify-between items-start mb-3 flex-wrap gap-2">
                            <div>
                            <div className="font-bold text-gray-800 text-lg">
                                {etudiant.prenom} {etudiant.nom}
                            </div>
                            <div className="text-sm text-gray-600">
                                {etudiant.promotion} • {etudiant.matricule}
                            </div>
                            </div>
                            <div className="text-right">
                            <div className="text-sm font-semibold text-orange-700">
                                En attente
                            </div>
                            </div>
                        </div>
                        </div>
                    ))}
                    </div>


                  {/* Les tables  */}
                  <div id="pdf-content">
                    <h3 className="text-lg font-bold text-green-700 mb-3 flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      Résultats ({termines.length})
                    </h3>
                    <div className="overflow-x-auto rounded-lg border">
                      <table className="w-full">
                        <thead className="bg-indigo-100">
                          <tr>
                            <th className="px-4 py-3 text-left font-semibold">Étudiant</th>
                            <th className="px-4 py-3 text-left font-semibold">Classe</th>
                            <th className="px-4 py-3 text-left font-semibold">Matricule</th>
                            <th className="px-4 py-3 text-center font-semibold">Score</th>
                            <th className="px-4 py-3 text-center font-semibold">Niveau</th>
                          </tr>
                        </thead>
                        <tbody>
                        {termines.map((etudiant) => (
                            <tr key={etudiant.id} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-3">
                                <div className="font-semibold">
                                {etudiant.prenom} {etudiant.nom}
                                </div>
                                <div className="text-xs text-gray-500">
                                {etudiant.email || "—"}
                                </div>
                            </td>

                            <td className="px-4 py-3">{etudiant.classe}</td>
                            <td className="px-4 py-3">{etudiant.matricule}</td>

                            <td className="px-4 py-3 text-center">
                                <div className="font-bold text-lg">
                                {etudiant.resultat.note}
                                </div>
                                <div className="text-xs text-gray-500">
                                {etudiant.resultat.pourcentage.toFixed(1)}%
                                </div>
                            </td>

                            <td className="px-4 py-3 text-center">
                                <span className="font-semibold">
                                {etudiant.resultat.appreciation}
                                </span>
                            </td>
                            </tr>
                        ))}
                        </tbody>

                      </table>
                    </div>
                  </div>
                    
                </div>
            </div>
        </div>

    );
}

export default Administration;