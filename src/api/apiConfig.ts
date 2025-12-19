const api_base_url = 'http://127.0.0.1:8000/api';

export const API_ROUTES = {
    etudiants: {
        // un nouveau etudiant
        create : `${api_base_url}/etudiant`,
        // recuperer un etudiant
        readone : `${api_base_url}/etudiant/{code}`,
        // recuperer la liste des etudiants avec leur note
        read : `${api_base_url}/etudiant`
    },
    questionnaires: {
        //Liste des questions
        liste : `${api_base_url}/questionnaires`
    },
    resultats: {
        // ajouter un resultat après le qcm
        create : `${api_base_url}/resultat/{code}`
    }
}

export default api_base_url;