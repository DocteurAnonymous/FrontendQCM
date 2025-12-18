import { API_ROUTES } from "../api/apiConfig";
import type { Etudiant } from "../Interfaces/Etudiant";
import axios from 'axios';

//Ajouter un etudiant
export const addEtudiant = async (etudiant: Etudiant) => {
    try {
        const response = await axios.post(API_ROUTES.etudiants.create, etudiant)
        return response.data;
    } catch (error : any) {
        if (error.response) {
            //Erreur venant de l'api
            return { success :false, errors: error.response.data.errors || error.response.data }
        }
        return { success: false, errors: [error.message] }
    }
}