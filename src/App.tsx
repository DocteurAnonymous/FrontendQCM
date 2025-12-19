import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/header'
import InscriptionEtudiant from './components/InscriptionEtudiant'
import Questionnaires from './components/questionnaires'
import Resultat from './components/resultat'
import Authentification from './components/authentification'
import Administration from './components/administration'

function App() {

  return (
    <div>
      <Header/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<InscriptionEtudiant/>} />
          <Route path='/qcm' element={<Questionnaires/>} />
          <Route path='/resultat' element={<Resultat/>} />
          <Route path='/authentification' element={<Authentification/>} />
          <Route path='/administration' element={<Administration/>} />
        </Routes>
      </BrowserRouter>
      
      
    </div>
  )
}

export default App
