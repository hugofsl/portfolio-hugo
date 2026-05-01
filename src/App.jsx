import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

import ProjectImprimil from './pages/ProjectImprimil';
import ProjectAsana from './pages/ProjectAsana';
import ProjectDRE from './pages/ProjectDRE';
import ProjectPersonalCleaner from './pages/ProjectPersonalCleaner';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="projects" element={<Projects />} />
            <Route path="contact" element={<Contact />} />
            
            <Route path="projects/sistema-comercial" element={<ProjectImprimil />} />
            <Route path="projects/automacao-asana" element={<ProjectAsana />} />
            <Route path="projects/dashboard-dre" element={<ProjectDRE />} />
            <Route path="projects/personal-cleaner" element={<ProjectPersonalCleaner />} />
            
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;