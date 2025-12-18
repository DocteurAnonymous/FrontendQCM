import { Award } from "lucide-react";

const Resultat = () => {
    
    return (
        <div className="flex justify-center mt-2">
            <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8">
                <div className="text-center mb-8">
                <Award className="w-20 h-20 mx-auto text-indigo-600 mb-4" />
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Évaluation Terminée</h2>
                {/* <p className="text-gray-600">{currentStudent.prenom} {currentStudent.nom}</p> */}
                </div>

                <div className="bg-indigo-50 rounded-lg p-6 mb-6">
                <div className="text-center">
                    <div className="text-5xl font-bold text-indigo-600 mb-2"> 10 / 20</div>
                    <div className="text-2xl font-semibold text-indigo-800"> Pitoyable</div>
                    <div className="text-gray-600 mt-2">5%</div>
                </div>
                </div>

                <div className="space-y-2 text-gray-700 mb-6">
                <p><strong>Nom complet:</strong> Ismael Sano </p>
                <p><strong>Classe:</strong> L3 </p>
                <p><strong>Promotion:</strong> 16 </p>
                <p><strong>Département:</strong> Miage </p>
                <p><strong>Matricule:</strong> 2204 </p>
                </div>

                <button
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
                Retour
                </button>
            </div>
        </div>
    );
}

export default Resultat;