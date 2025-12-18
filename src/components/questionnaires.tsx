import { useEffect, useState } from "react";
import { listeQuestionnaire } from "../services/questionnaireService";
import type { QuestionnaireType } from "../Interfaces/Questionnaire";
import { Award, Clock } from "lucide-react";

const Questionnaires = () => {
    //Récupérer la liste des questionnaires depuis l'api
    const [questions, setQuestions] = useState<QuestionnaireType[]> ([]);
    //Afficher les erreurs
    const [errors, setErrors] = useState<string[]> ([]);
    //Chargement des données
    const [loading, setLoading] = useState<boolean> (true);
    // Question en cours 
    const [currentQuestion, setCurrentQuestion] = useState(0);
    // Temps sur chaque question
    const [timeLeft, setTimeLeft] = useState(10);
    // Réponses de l'utilisateur
    const [answers, setAnswers] = useState<{[key: number]: number}>({});

    useEffect(() => {
        const fetchQuestionnaires = async () => {
            const result = await listeQuestionnaire();
            if(!result.success) {
                setErrors(result.errors || ["Erreur de serveur veuillez réessayer"]);
                setLoading(false);
                return;
            }
            setQuestions(result.data);
            setLoading(false);
        };
        fetchQuestionnaires();
    },[]);

    // Timer pour chaque question
    useEffect(() => {
        let timer;
        if (timeLeft > 0) {
            timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        } else if (timeLeft === 0) {
            handleNextQuestion();
        }
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [timeLeft]);

    const handleNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setTimeLeft(10); // Réinitialiser le timer
        } else {
            // Calculer les résultats quand toutes les questions sont répondues
            calculateResults();
        }
    };

    const handleAnswer = (index: number) => {
        setAnswers({ ...answers, [currentQuestion]: index });
    };

    const calculateResults = () => {
        if (questions.length === 0) return;
        
        let score = 0;
        questions.forEach((q, i) => {
            if (answers[i] === q.correct ) score++;
        });
        
        const percentage = (score / questions.length) * 100;
        let niveau = '';
        if (percentage < 50) niveau = 'Insuffisant';
        else if (percentage < 60) niveau = 'Passable';
        else if (percentage < 70) niveau = 'Assez Bien';
        else if (percentage < 80) niveau = 'Bien';
        else if (percentage < 90) niveau = 'Très Bien';
        else niveau = 'Excellent';

        // Afficher les résultats
        alert(`Évaluation Terminée !\nScore: ${score}/${questions.length}\nNiveau: ${niveau}\nPourcentage: ${percentage.toFixed(1)}%`);
        
        // Réinitialiser pour recommencer
        setCurrentQuestion(0);
        setAnswers({});
        setTimeLeft(60);
    };

    // Vérifier si les questions sont chargées
    if (loading) {
        return (
            <div className="m-2">
                <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6 mx-auto">
                    <div className="text-center text-gray-500">
                        Chargement des questions...
                    </div>
                </div>
            </div>
        );
    }

    // Vérifier s'il y a des erreurs
    if (errors.length > 0) {
        return (
            <div className="m-2">
                <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6 mx-auto">
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                        {errors.map((err, index) => (
                            <p key={index}>{err}</p>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Vérifier s'il y a des questions
    if (questions.length === 0) {
        return (
            <div className="m-2">
                <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6 mx-auto">
                    <div className="text-center text-gray-500">
                        Aucune question disponible
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-center mt-2 mb-3">
            <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8">
                <div className="mb-6 flex justify-between items-center flex-wrap gap-4">
                    <div className="text-lg font-semibold text-gray-700">
                        Question {currentQuestion + 1} / {questions.length}
                    </div>
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${timeLeft <= 10 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                        <Clock className="w-5 h-5" />
                        <span className="font-bold text-xl">{timeLeft}s</span>
                    </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
                    <div className="bg-indigo-600 h-3 rounded-full transition-all" style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }} />
                </div>

                <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">
                        {questions[currentQuestion].question}
                    </h3>
                    <div className="space-y-3">
                        {['option1', 'option2', 'option3', 'option4'].map((optionKey, index) => {
                            const option = questions[currentQuestion][optionKey as keyof typeof questions[0]] as string;
                            
                            return (
                                <button 
                                    key={index} 
                                    onClick={() => handleAnswer(index)}
                                    className={`w-full text-left p-4 rounded-lg border-2 transition ${
                                        answers[currentQuestion] === index 
                                            ? 'border-indigo-600 bg-indigo-50' 
                                            : 'border-gray-300 hover:border-indigo-400'
                                    }`}
                                >
                                    <span className="font-semibold mr-2">
                                        {String.fromCharCode(65 + index)}.
                                    </span>
                                    {option}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <button 
                    onClick={handleNextQuestion} 
                    disabled={answers[currentQuestion] === undefined}
                    className={`w-full py-3 rounded-lg font-semibold transition ${
                        answers[currentQuestion] !== undefined 
                            ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                >
                    {currentQuestion < questions.length - 1 ? 'Question Suivante' : 'Terminer'}
                </button>
            </div>
        </div>
    );
}

export default Questionnaires;