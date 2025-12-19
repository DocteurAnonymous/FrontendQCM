import { Users } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Authentification : React.FC = () => {

    const navigate = useNavigate();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');


    const [errors, setErrors] = useState<string | null>(null);

    return (
        <div className="flex justify-center mt-2">
            <div className="w-full max-w-3xl">
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <h2 className="text-2xl mb-6 text-center flex items-center justify-center gap-2">
                        <Users className="w-6 h-6" /> {/* Icône */}
                        Administration
                    </h2>
                    {errors && (
                        <div className="bg-red-100 text-red-700 border border-red-400 p-2 rounded mb-4">
                            {errors}
                        </div>
                    )}
                    <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Login</label>
                        <input 
                        type="text" 
                        id="adminLogin" 
                        placeholder="Entrez votre login"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
                        <input 
                        type="password" 
                        id="adminPassword" 
                        placeholder="Entrez votre mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" 
                        />
                    </div>
                    <button 
                        onClick={() => {

                        if (login === 'DocteurAnonymous' && password === 'Docteur@123') {
                            navigate('/administration');
                        } else {
                            setErrors('Login ou mot de passe incorrect');
                        }
                        }}
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
                        Se connecter
                    </button>
                    <button 
                        onClick={() => navigate("/")}
                        className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition">
                        Retour
                    </button>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Authentification;