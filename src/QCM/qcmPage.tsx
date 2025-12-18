import  { useState, useEffect } from 'react';
import { Clock, User, Award, Download, RefreshCw, LogOut, Users, Activity } from 'lucide-react';

const QcmPage = () => {
  const [view, setView] = useState('login');
  const [students, setStudents] = useState([]);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(60);

  const questions = [
    { q: "Que signifie PHP ?", options: ["Personal Home Page", "PHP: Hypertext Preprocessor", "Private HTML Pages", "Programming Hypertext Protocol"], correct: 1 },
    { q: "Quelle balise utilise-t-on pour démarrer du code PHP ?", options: ["<php>", "<?php", "<script>", "<%php%>"], correct: 1 },
    { q: "Comment affiche-t-on du texte en PHP ?", options: ["console.log()", "echo", "print_r()", "display()"], correct: 1 },
    { q: "Quel symbole utilise-t-on pour déclarer une variable en PHP ?", options: ["@", "#", "$", "&"], correct: 2 },
    { q: "Comment créer un commentaire sur une seule ligne en PHP ?", options: ["/* commentaire */", "<!-- commentaire -->", "// commentaire", "# commentaire"], correct: 2 },
    { q: "Quelle fonction permet de connaître le type d'une variable ?", options: ["typeof()", "gettype()", "var_type()", "type()"], correct: 1 },
    { q: "Comment concatène-t-on deux chaînes en PHP ?", options: ["Avec +", "Avec .", "Avec &", "Avec ,"], correct: 1 },
    { q: "Quelle superglobale contient les données d'un formulaire POST ?", options: ["$_GET", "$_POST", "$_REQUEST", "$_FORM"], correct: 1 },
    { q: "Comment démarre-t-on une session en PHP ?", options: ["start_session()", "session_start()", "begin_session()", "init_session()"], correct: 1 },
    { q: "Quelle fonction permet de compter les éléments d'un tableau ?", options: ["length()", "size()", "count()", "sizeof()"], correct: 2 },
    { q: "Comment inclure un fichier PHP dans un autre ?", options: ["import 'fichier.php'", "include 'fichier.php'", "require 'fichier.php'", "Les deux b et c"], correct: 3 },
    { q: "Quel opérateur teste l'égalité stricte (valeur et type) ?", options: ["=", "==", "===", "===="], correct: 2 },
    { q: "Comment créer un tableau associatif en PHP ?", options: ["array()", "[]", "{}", "Les deux a et b"], correct: 3 },
    { q: "Quelle fonction convertit une chaîne en minuscules ?", options: ["toLower()", "strtolower()", "lowercase()", "lower()"], correct: 1 },
    { q: "Comment vérifie-t-on si une variable est vide ?", options: ["isEmpty()", "empty()", "is_empty()", "null()"], correct: 1 },
    { q: "Quelle fonction renvoie la longueur d'une chaîne ?", options: ["length()", "strlen()", "size()", "count()"], correct: 1 },
    { q: "Comment redirige-t-on vers une autre page en PHP ?", options: ["redirect()", "header('Location: page.php')", "goto()", "navigate()"], correct: 1 },
    { q: "Quelle est la portée d'une variable déclarée dans une fonction ?", options: ["Globale", "Locale", "Statique", "Publique"], correct: 1 },
    { q: "Comment déclare-t-on une constante en PHP ?", options: ["const NOM = valeur", "define('NOM', valeur)", "constant NOM = valeur", "Les deux a et b"], correct: 3 },
    { q: "Quelle fonction arrête l'exécution d'un script ?", options: ["stop()", "exit()", "halt()", "end()"], correct: 1 },
    { q: "Comment obtient-on la date actuelle en PHP ?", options: ["date()", "getDate()", "now()", "current_date()"], correct: 0 },
    { q: "Quel est le résultat de 5 + '10' en PHP ?", options: ["15", "510", "Erreur", "null"], correct: 0 },
    { q: "Comment supprime-t-on une variable de session ?", options: ["delete($_SESSION['var'])", "unset($_SESSION['var'])", "remove($_SESSION['var'])", "clear($_SESSION['var'])"], correct: 1 },
    { q: "Quelle fonction permet de rechercher dans un tableau ?", options: ["find()", "search()", "in_array()", "array_find()"], correct: 2 },
    { q: "Comment crée-t-on une classe en PHP ?", options: ["class NomClasse {}", "new class NomClasse", "define class NomClasse", "create class NomClasse"], correct: 0 },
    { q: "Quelle visibilité empêche l'accès en dehors de la classe ?", options: ["public", "protected", "private", "internal"], correct: 2 },
    { q: "Comment appelle-t-on une méthode statique ?", options: ["Classe->methode()", "Classe::methode()", "Classe.methode()", "Classe:methode()"], correct: 1 },
    { q: "Quelle fonction ouvre un fichier en PHP ?", options: ["open()", "fopen()", "file_open()", "readfile()"], correct: 1 },
    { q: "Comment lit-on une ligne d'un fichier ?", options: ["readline()", "fgets()", "read_line()", "getline()"], correct: 1 },
    { q: "Quelle fonction vérifie si un fichier existe ?", options: ["exists()", "file_exists()", "is_file()", "check_file()"], correct: 1 },
    { q: "Comment encode-t-on des données en JSON ?", options: ["json_encode()", "to_json()", "encode_json()", "jsonify()"], correct: 0 },
    { q: "Quelle fonction décode du JSON ?", options: ["json_decode()", "from_json()", "parse_json()", "decode_json()"], correct: 0 },
    { q: "Comment se connecte-t-on à MySQL avec PDO ?", options: ["new PDO()", "mysql_connect()", "pdo_connect()", "connect_db()"], correct: 0 },
    { q: "Quel est l'opérateur de concaténation d'affectation ?", options: ["+", ".=", "+=", "=."], correct: 1 },
    { q: "Comment vérifie-t-on le type d'une variable avec is_* ?", options: ["is_type()", "is_int(), is_string()...", "check_type()", "typeof()"], correct: 1 },
    { q: "Quelle fonction trie un tableau ?", options: ["order()", "sort()", "arrange()", "organize()"], correct: 1 },
    { q: "Comment inverse-t-on un tableau ?", options: ["reverse()", "array_reverse()", "invert()", "flip()"], correct: 1 },
    { q: "Quelle fonction fusionne deux tableaux ?", options: ["merge()", "array_merge()", "combine()", "join()"], correct: 1 },
    { q: "Comment obtient-on les clés d'un tableau associatif ?", options: ["keys()", "array_keys()", "get_keys()", "table_keys()"], correct: 1 },
    { q: "Quelle est la différence entre include et require ?", options: ["Aucune", "require génère une erreur fatale si échec", "include est plus rapide", "require est obsolète"], correct: 1 }
  ];

  useEffect(() => {
    let timer;
    if (view === 'qcm' && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (view === 'qcm' && timeLeft === 0) {
      handleNextQuestion();
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timeLeft, view]);

  useEffect(() => {
    if (view === 'qcm' && currentStudent) {
      setStudents(prev => {
        const existing = prev.find(s => s.matricule === currentStudent.matricule);
        if (existing) {
          return prev.map(s => 
            s.matricule === currentStudent.matricule 
              ? { ...s, progression: currentQuestion + 1, enCours: true }
              : s
          );
        } else {
          return [...prev, { ...currentStudent, progression: currentQuestion + 1, enCours: true }];
        }
      });
    }
  }, [currentQuestion, view, currentStudent]);

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(60);
    } else {
      calculateResults();
    }
  };

  const handleAnswer = (index) => {
    setAnswers({ ...answers, [currentQuestion]: index });
  };

  const calculateResults = () => {
    let score = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correct) score++;
    });
    
    const percentage = (score / questions.length) * 100;
    let niveau = '';
    if (percentage < 50) niveau = 'Insuffisant';
    else if (percentage < 60) niveau = 'Passable';
    else if (percentage < 70) niveau = 'Assez Bien';
    else if (percentage < 80) niveau = 'Bien';
    else if (percentage < 90) niveau = 'Très Bien';
    else niveau = 'Excellent';

    const updatedStudent = { 
      ...currentStudent, 
      score, 
      niveau,
      progression: questions.length,
      enCours: false
    };
    
    setStudents(prev => prev.map(s => 
      s.matricule === currentStudent.matricule ? updatedStudent : s
    ));
    
    setCurrentStudent(updatedStudent);
    setView('results');
  };

  const handleExportPDF = () => {
    const finished = students.filter(s => !s.enCours && s.score !== null);
    if (finished.length === 0) {
      alert('Aucun résultat à exporter');
      return;
    }

    let content = '═══════════════════════════════════════════════════════════════\n';
    content += '          RÉSULTATS QCM PHP - ÉVALUATION UNIVERSITAIRE          \n';
    content += '═══════════════════════════════════════════════════════════════\n\n';
    content += `Date: ${new Date().toLocaleString('fr-FR')}\n`;
    content += `Nombre: ${finished.length}\n`;
    content += `Moyenne: ${(finished.reduce((acc, s) => acc + s.score, 0) / finished.length).toFixed(2)}/40\n\n`;
    
    finished.forEach((s, idx) => {
      content += `${idx + 1}. ${s.nom.toUpperCase()} ${s.prenom}\n`;
      content += `   Matricule: ${s.matricule}\n`;
      content += `   Classe: ${s.classe} | Promotion: ${s.promotion}\n`;
      content += `   Département: ${s.departement}\n`;
      content += `   Email: ${s.email}\n`;
      content += `   Score: ${s.score}/40 (${((s.score/40)*100).toFixed(1)}%)\n`;
      content += `   Niveau: ${s.niveau}\n`;
      content += '───────────────────────────────────────────────────────────────\n\n';
    });
    
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `QCM_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const studentsInProgress = students.filter(s => s.enCours);
  const studentsFinished = students.filter(s => !s.enCours && s.score !== null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-indigo-900 text-center flex items-center justify-center gap-3 flex-wrap">
            <Award className="w-8 h-8" />
            Évaluation QCM - PHP Fondamentaux
          </h1>
        </div>

        {view === 'login' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <User className="w-6 h-6" />
              Inscription Étudiant
            </h2>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input type="text" id="nom" placeholder="Nom *" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
                <input type="text" id="prenom" placeholder="Prénom *" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <input type="text" id="classe" placeholder="Classe *" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
                <input type="text" id="promotion" placeholder="Promotion *" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
              </div>
              <input type="text" id="departement" placeholder="Département *" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
              <input type="text" id="matricule" placeholder="Matricule *" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
              <input type="email" id="email" placeholder="Email (optionnel)" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
              <button 
                onClick={() => {
                  const nom = document.getElementById('nom').value.trim();
                  const prenom = document.getElementById('prenom').value.trim();
                  const classe = document.getElementById('classe').value.trim();
                  const promotion = document.getElementById('promotion').value.trim();
                  const departement = document.getElementById('departement').value.trim();
                  const matricule = document.getElementById('matricule').value.trim();
                  const email = document.getElementById('email').value.trim();

                  if (!nom || !prenom || !classe || !promotion || !departement || !matricule) {
                    alert('Veuillez remplir tous les champs obligatoires');
                    return;
                  }

                  setCurrentStudent({
                    nom, prenom, classe, promotion, departement, matricule,
                    email: email || 'Non renseigné',
                    date: new Date().toLocaleString('fr-FR'),
                    score: null, niveau: null, progression: 0, enCours: false
                  });
                  setView('qcm');
                  setTimeLeft(60);
                  setCurrentQuestion(0);
                  setAnswers({});
                }}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
                Commencer l'évaluation
              </button>
            </div>
            <div className="mt-6 text-center">
              <button 
                onClick={() => setView('adminLogin')}
                className="text-indigo-600 hover:underline text-sm font-medium">
                Accès Administrateur
              </button>
            </div>
          </div>
        )}

        {view === 'adminLogin' && (
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Users className="w-6 h-6" />
              Connexion Administrateur
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Login</label>
                <input 
                  type="text" 
                  id="adminLogin" 
                  placeholder="Entrez votre login"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
                <input 
                  type="password" 
                  id="adminPassword" 
                  placeholder="Entrez votre mot de passe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" 
                />
              </div>
              <button 
                onClick={() => {
                  const login = document.getElementById('adminLogin').value.trim();
                  const password = document.getElementById('adminPassword').value.trim();
                  
                  if (login === 'DocteurAnonymous' && password === 'Docteur@123') {
                    setView('admin');
                  } else {
                    alert('Login ou mot de passe incorrect');
                  }
                }}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
                Se connecter
              </button>
              <button 
                onClick={() => setView('login')}
                className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition">
                Retour
              </button>
            </div>
          </div>
        )}

        {view === 'qcm' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
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
              <h3 className="text-xl font-semibold text-gray-800 mb-6">{questions[currentQuestion].q}</h3>
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <button key={index} onClick={() => handleAnswer(index)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition ${
                      answers[currentQuestion] === index ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'
                    }`}>
                    <span className="font-semibold mr-2">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={handleNextQuestion} disabled={answers[currentQuestion] === undefined}
              className={`w-full py-3 rounded-lg font-semibold transition ${
                answers[currentQuestion] !== undefined ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}>
              {currentQuestion < questions.length - 1 ? 'Question Suivante' : 'Terminer'}
            </button>
          </div>
        )}

        {view === 'results' && currentStudent && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <Award className="w-20 h-20 mx-auto text-indigo-600 mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Évaluation Terminée</h2>
              <p className="text-gray-600">{currentStudent.prenom} {currentStudent.nom}</p>
            </div>

            <div className="bg-indigo-50 rounded-lg p-6 mb-6">
              <div className="text-center">
                <div className="text-5xl font-bold text-indigo-600 mb-2">{currentStudent.score} / {questions.length}</div>
                <div className="text-2xl font-semibold text-indigo-800">{currentStudent.niveau}</div>
                <div className="text-gray-600 mt-2">{((currentStudent.score / questions.length) * 100).toFixed(1)}%</div>
              </div>
            </div>

            <div className="space-y-2 text-gray-700 mb-6">
              <p><strong>Classe:</strong> {currentStudent.classe}</p>
              <p><strong>Promotion:</strong> {currentStudent.promotion}</p>
              <p><strong>Département:</strong> {currentStudent.departement}</p>
              <p><strong>Matricule:</strong> {currentStudent.matricule}</p>
            </div>

            <button onClick={() => { setView('login'); setCurrentQuestion(0); setAnswers({}); setCurrentStudent(null); }}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
              Retour
            </button>
          </div>
        )}

        {view === 'admin' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Users className="w-6 h-6" />
                Interface Administrateur
              </h2>
              <div className="flex gap-2 flex-wrap">
                <button onClick={handleExportPDF} disabled={studentsFinished.length === 0}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                    studentsFinished.length === 0 ? 'bg-gray-300 text-gray-500' : 'bg-green-600 text-white hover:bg-green-700'
                  }`}>
                  <Download className="w-4 h-4" />
                  Exporter
                </button>
                <button onClick={() => {
                  if (confirm('Supprimer toutes les données ?')) {
                    setStudents([]);
                    alert('Réinitialisé');
                  }
                }}
                  className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                  <RefreshCw className="w-4 h-4" />
                  Réinitialiser
                </button>
                <button onClick={() => setView('login')} className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
                  <LogOut className="w-4 h-4" />
                  Quitter
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <div className="text-sm text-blue-600 font-medium">Total</div>
                <div className="text-3xl font-bold text-blue-900">{students.length}</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <div className="text-sm text-green-600 font-medium">Terminés</div>
                <div className="text-3xl font-bold text-green-900">{studentsFinished.length}</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                <div className="text-sm text-orange-600 font-medium">En cours</div>
                <div className="text-3xl font-bold text-orange-900">{studentsInProgress.length}</div>
              </div>
            </div>

            {students.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500 text-lg">Aucun étudiant</p>
              </div>
            ) : (
              <div className="space-y-6">
                {studentsInProgress.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-orange-700 mb-3 flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      En cours ({studentsInProgress.length})
                    </h3>
                    <div className="space-y-3">
                      {studentsInProgress.map((s, i) => (
                        <div key={i} className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-3 flex-wrap gap-2">
                            <div>
                              <div className="font-bold text-gray-800 text-lg">{s.nom} {s.prenom}</div>
                              <div className="text-sm text-gray-600">{s.classe} • {s.matricule}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-orange-700">{s.progression || 0}/{questions.length}</div>
                              <div className="text-xs text-gray-600">questions</div>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                            <div className="bg-orange-500 h-3 rounded-full transition-all" style={{ width: `${((s.progression || 0) / questions.length) * 100}%` }} />
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Progression</span>
                            <span className="font-semibold text-orange-700">{(((s.progression || 0) / questions.length) * 100).toFixed(0)}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {studentsFinished.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-green-700 mb-3 flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      Résultats ({studentsFinished.length})
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
                          {studentsFinished.map((s, i) => (
                            <tr key={i} className="border-b hover:bg-gray-50">
                              <td className="px-4 py-3">
                                <div className="font-semibold">{s.nom} {s.prenom}</div>
                                <div className="text-xs text-gray-500">{s.email}</div>
                              </td>
                              <td className="px-4 py-3">{s.classe}</td>
                              <td className="px-4 py-3">{s.matricule}</td>
                              <td className="px-4 py-3 text-center">
                                <div className="font-bold text-lg">{s.score}/40</div>
                                <div className="text-xs text-gray-500">{((s.score/40)*100).toFixed(1)}%</div>
                              </td>
                              <td className="px-4 py-3 text-center">
                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                  s.niveau === 'Excellent' ? 'bg-green-100 text-green-800' :
                                  s.niveau === 'Très Bien' ? 'bg-blue-100 text-blue-800' :
                                  s.niveau === 'Bien' ? 'bg-indigo-100 text-indigo-800' :
                                  s.niveau === 'Assez Bien' ? 'bg-yellow-100 text-yellow-800' :
                                  s.niveau === 'Passable' ? 'bg-orange-100 text-orange-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {s.niveau}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QcmPage;