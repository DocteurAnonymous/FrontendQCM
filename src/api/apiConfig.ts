const api_base_url = 'http://127.0.0.1:8000/api';

export const API_ROUTES = {
    etudiants: {
        // un nouveau utilisateur
        create : `${api_base_url}/etudiant`
    },
    questionnaires: {
        //Liste des questions
        liste : `${api_base_url}/questionnaires`
    }
}

export default api_base_url;