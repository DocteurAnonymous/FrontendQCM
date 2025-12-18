import axios from "axios";
import { API_ROUTES } from "../api/apiConfig";


//Recupérer la liste des etudiants
export const listeQuestionnaire = async () => {
    try {
        const response = await axios.get(API_ROUTES.questionnaires.liste)
        return response.data;
    } catch (error : any) {
         if (error.response) {
            //Erreur venant de l'api
            return { success :false, errors: error.response.data.errors || error.response.data }
        }
        return { success: false, errors: [error.message] }
    }
}