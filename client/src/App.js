import './App.css';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import CandidateDetail from './pages/CandidateDetail';
import Home from './pages/Home';
import CandidateCreate from './pages/CandidateCreate';
import Candidates from './pages/Candidates';
import toast, { Toaster } from 'react-hot-toast';
import Layout from './Layout';

function App() {
  return (
    <div className="App">
      <Toaster />
      <Router>
        <Layout>
        <Routes>
          <Route  index='true' path='/'element={<Home/>}></Route>
          <Route  index='true' path='/home'element={<Home/>}></Route>
          <Route path='/createCandidate' element={<CandidateCreate/>}></Route>
          <Route path='/detail/:id' element={<CandidateDetail/>}></Route>
          <Route path='/candidates' element={<Candidates/>}></Route>
        </Routes>

        </Layout>
      </Router>
    </div>
  );
}

export default App;
