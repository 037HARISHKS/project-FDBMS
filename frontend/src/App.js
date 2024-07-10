
import './App.css';
import {BrowserRouter,Routes,Route } from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import FacultyLoginForm from './pages/FacultyLogin';
import AdminLoginForm from './pages/AdminLogin';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import AdminPage from './pages/AdminPage';
import AdminRegister from './pages/AdminRegister';
import FacultyRegister from './pages/FacultyRegister';
import DisplayCertificates from './pages/DisplayCertificate';
import Certificates from './pages/Certificate';
import CertificateUploadForm from './pages/AddCertificate';
import FundedProjectsDisplay from './pages/FundedProjectDisplay';
import FundedProjects from './pages/FundedProject';
import DisplaySubjects from './pages/DisplaySubject';
import AddFPP from './pages/AddFpp';
import DisplayPublications from './pages/DisplayPublications';
import Publications from './pages/Publications';
import AddPublication from './pages/AddPublication';
import DisplayPatents from './pages/DisplayPatent';
import Patents from './pages/Patent';
import PatentForm from './pages/AddPatent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      
          <Header/>
          
          <Routes>
          <Route path="/" element={<LandingPage/>} />
            <Route path="/facultyLogin" element={<FacultyLoginForm/>} />
            <Route path="/adminLogin" element={<AdminLoginForm/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/adminpage" element={<AdminPage/>} />
            <Route path="/adminRegister" element={<AdminRegister/>} />
            <Route path="/facultyRegister" element={<FacultyRegister/>} />
            <Route path="/displayCertificate" element={<DisplayCertificates/>} />
            <Route path="/Certificates" element={<Certificates/>} />
            <Route path="/certificate-upload" element={<CertificateUploadForm/>} />
            <Route path='/fpp' element={<FundedProjectsDisplay/>} />
            <Route path='/FundedProject' element={<FundedProjects/>} />
            <Route path='/subject' element={<DisplaySubjects/>} />
            <Route path='/addFppForm' element={<AddFPP/>}/>
            <Route path='/publication' element={<DisplayPublications/>}/>
            <Route path='/Publications' element={<Publications/>} />
            <Route path='/addPublicationForm' element={<AddPublication/>} />
            <Route path='/patent' element={<DisplayPatents/>} />
            <Route path='/modifyPatent' element={<Patents/>} />
            <Route path='/patentform' element={<PatentForm/>} />
          </Routes>
          <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
