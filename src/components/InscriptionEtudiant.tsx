import React, { useState } from 'react';
import type { Etudiant } from '../Interfaces/Etudiant';
import { addEtudiant } from '../services/etudiantService';
import { useNavigate } from 'react-router-dom'; // pour la redirection
import { User } from 'lucide-react';

const InscriptionEtudiant: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<Etudiant>({
    nom: '',
    prenom: '',
    departement: '',
    classe: '',
    promotion: '',
    matricule: '',
    email: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [userCode, setUserCode] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation front-end
  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.nom.trim()) newErrors.nom = 'Le nom est obligatoire';
    if (!form.prenom.trim()) newErrors.prenom = 'Le prénom est obligatoire';
    if (!form.departement.trim()) newErrors.departement = 'Le département est obligatoire';
    if (!form.classe.trim()) newErrors.classe = 'La classe est obligatoire';
    if (!form.promotion.trim()) newErrors.promotion = 'La promotion est obligatoire';
    if (!form.matricule.trim()) newErrors.matricule = 'Le matricule est obligatoire';
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email))
      newErrors.email = 'Le format de l\'email est invalide';
    return newErrors;
  };

  const isFormValid = Object.keys(validate()).length === 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setApiError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    const result = await addEtudiant(form);
    setIsSubmitting(false);

    if (!result.success) {
      if (result.errors.server) {
          setApiError(result.errors.server); // affiche le message de l'exception
      } else {
          // erreurs champs
          const apiErrors: Record<string, string> = {};
          Object.keys(result.errors).forEach((key) => {
              apiErrors[key] = result.errors[key][0] || 'Erreur';
          });
          setErrors(apiErrors);
      }
  } else {
      // succès → redirection vers la page QCM
      // stocker le code de l'étudiant      
      const code = result.data.data.code;
      sessionStorage.setItem('etudiantCode', code);
      setUserCode(code);
      navigate('/qcm');
    }
  };

  return (
    <form className="flex justify-center p-1" onSubmit={handleSubmit}>
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-3xl">
        <h2 className="text-2xl mb-6 text-center flex items-center justify-center gap-2">
            <User className="w-6 h-6" /> {/* Icône */}
            Inscription Etudiant
        </h2>


        {/* Affichage erreur globale API */}
        {apiError && (
          <div className="bg-red-100 text-red-700 border border-red-400 p-2 rounded mb-4">
            Erreur du serveur
          </div>
        )}

        {/* Nom & Prénom */}
        <div className="flex flex-wrap -mx-2">
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label htmlFor="nom" className="block mb-1 font-medium text-gray-700">
              Nom <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nom"
              id="nom"
              className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.nom ? 'border-red-500' : 'border-gray-300'
              }`}
              value={form.nom}
              onChange={handleChange}
            />
            {errors.nom && <span className="text-red-500 text-sm">{errors.nom}</span>}
          </div>

          <div className="w-full md:w-1/2 px-2 mb-4">
            <label htmlFor="prenom" className="block mb-1 font-medium text-gray-700">
              Prénom <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="prenom"
              id="prenom"
              className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.prenom ? 'border-red-500' : 'border-gray-300'
              }`}
              value={form.prenom}
              onChange={handleChange}
            />
            {errors.prenom && <span className="text-red-500 text-sm">{errors.prenom}</span>}
          </div>
        </div>

        {/* Département */}
        <div className="w-full px-2 mb-4">
          <label htmlFor="departement" className="block mb-1 font-medium text-gray-700">
            Département <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="departement"
            id="departement"
            className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.departement ? 'border-red-500' : 'border-gray-300'
            }`}
            value={form.departement}
            onChange={handleChange}
          />
          {errors.departement && <span className="text-red-500 text-sm">{errors.departement}</span>}
        </div>

        {/* Classe & Promotion */}
        <div className="flex flex-wrap -mx-2">
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label htmlFor="classe" className="block mb-1 font-medium text-gray-700">
              Classe <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="classe"
              id="classe"
              className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.classe ? 'border-red-500' : 'border-gray-300'
              }`}
              value={form.classe}
              onChange={handleChange}
            />
            {errors.classe && <span className="text-red-500 text-sm">{errors.classe}</span>}
          </div>

          <div className="w-full md:w-1/2 px-2 mb-4">
            <label htmlFor="promotion" className="block mb-1 font-medium text-gray-700">
              Promotion <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="promotion"
              id="promotion"
              className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.promotion ? 'border-red-500' : 'border-gray-300'
              }`}
              value={form.promotion}
              onChange={handleChange}
            />
            {errors.promotion && <span className="text-red-500 text-sm">{errors.promotion}</span>}
          </div>
        </div>

        {/* Matricule & Email */}
        <div className="flex flex-wrap -mx-2">
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label htmlFor="matricule" className="block mb-1 font-medium text-gray-700">
              Matricule <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="matricule"
              id="matricule"
              className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.matricule ? 'border-red-500' : 'border-gray-300'
              }`}
              value={form.matricule}
              onChange={handleChange}
            />
            {errors.matricule && <span className="text-red-500 text-sm">{errors.matricule}</span>}
          </div>

          <div className="w-full md:w-1/2 px-2 mb-4">
            <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="optionnel"
              className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
          </div>
        </div>

        {/* Bouton soumettre */}
        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className={`w-full py-3 rounded-lg font-semibold text-white ${
            !isFormValid || isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
          } transition`}
        >
          {isSubmitting ? 'Enregistrement...' : 'Commencer l\'évaluation'}
        </button>

        {/* Accès administrateur */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/authentification")}
            className="text-indigo-600 hover:underline text-sm font-medium"
            type="button"
          >
            Accès Administrateur
          </button>
        </div>
      </div>
    </form>
  );
};

export default InscriptionEtudiant;
