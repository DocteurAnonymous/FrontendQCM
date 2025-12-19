import { API_ROUTES } from "../api/apiConfig";
import type { Etudiant } from "../Interfaces/Etudiant";
import axios from 'axios';

//Ajouter un etudiant
export const addEtudiant = async (etudiant: Etudiant) => {
    try {
        const response = await axios.post(API_ROUTES.etudiants.create, etudiant)
        return  { success: true, data: response.data };
    } catch (error : any) {
        if (error.response) {
            //Erreur venant de l'api
            return { success :false, errors: error.response.data.errors || error.response.data }
        }
        return { success: false, errors: [error.message || 'Erreur serveur'] }
    }
} 

//Recupérer un etudiant
export const getOneEtudiant = async (code: string) => {
    try {
        const url = API_ROUTES.etudiants.readone.replace('{code}',code);
        const response = await axios.get(url);
        return { success: true, data: response.data.data };
    } catch (error :any) {
        if(error.response) {
            return { success: false, errors: error.response.data.errors || error.response.data };
        }
        return { success: false, errors: [error.message || 'Erreur serveur'] };
    }
}

//Récupérer la liste des etudiants et leur note
export const AllEtudiant = async () => {
    try {
        const response = await axios.get(API_ROUTES.etudiants.read)
        return  { success: true, data: response.data };
    } catch (error : any) {
        if (error.response) {
            //Erreur venant de l'api
            return { success :false, errors: error.response.data.errors || error.response.data }
        }
        return { success: false, errors: [error.message || 'Erreur serveur'] }
    }
} 