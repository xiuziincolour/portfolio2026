
import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import WorkGrid from './components/WorkGrid';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CaseStudy from './components/CaseStudy';
import JargonCaseStudy from './components/JargonCaseStudy';
import Projects from './components/Projects';
import AboutMe from './components/AboutMe';
import './App.css';

type ViewState = 'home' | 'case-study' | 'jargon-case-study' | 'projects' | 'about-me';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState<ViewState>('home');

  // Simple loading animation simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenProject = (id: string) => {
    if (id === 'w1') {
      setCurrentView('case-study');
      window.scrollTo(0, 0);
    } else if (id === 'w2') {
      setCurrentView('jargon-case-study');
      window.scrollTo(0, 0);
    }
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    // Optional: scroll back to work section
    setTimeout(() => {
      const workSection = document.getElementById('work');
      if (workSection) {
        workSection.scrollIntoView();
      }
    }, 100);
  };

  const handleOpenProjects = () => {
    setCurrentView('projects');
    window.scrollTo(0, 0);
  };

  const handleOpenAboutMe = () => {
    setCurrentView('about-me');
    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
      <div className="app-loading-container">
        <div className="flex flex-col items-center gap-4">
          <div className="app-loading-spinner"></div>
          <img 
            src="/img/xiuzi_logo.png" 
            alt="Xiuzi Logo" 
            className="h-16 w-auto animate-pulse"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      
      {/* 
        Conditional Rendering: 
        If currentView is 'case-study', we render the detailed page ON TOP of everything 
        (or instead of main content). 
        To keep it clean, we'll replace the main content.
      */}

      {currentView === 'home' && (
        <>
          <Header onNavigateToProjects={handleOpenProjects} />
          <main>
            <Hero />
            {/* Pass the handler to WorkGrid */}
            <WorkGrid onOpenProject={handleOpenProject} />
            <About onOpenAboutMe={handleOpenAboutMe} />
            <Contact />
          </main>
        </>
      )}

      {currentView === 'case-study' && (
        <CaseStudy onBack={handleBackToHome} />
      )}

      {currentView === 'jargon-case-study' && (
        <JargonCaseStudy onBack={handleBackToHome} />
      )}

      {currentView === 'projects' && (
        <Projects onBack={handleBackToHome} onOpenProject={handleOpenProject} />
      )}

      {currentView === 'about-me' && (
        <AboutMe onBack={handleBackToHome} />
      )}

      <Footer />
      
    </div>
  );
};

export default App;
