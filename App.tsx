import React, { useEffect, useState, lazy, Suspense } from 'react';
import Header from './components/Header';
import WorkGrid from './components/WorkGrid';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CaseStudy from './components/CaseStudy';
import JargonCaseStudy from './components/JargonCaseStudy';
import Projects from './components/Projects';
import AboutMe from './components/AboutMe';
import './App.css';

const VideoPage = lazy(() => import('./components/VideoPage'));

type ViewState = 'home' | 'case-study' | 'jargon-case-study' | 'projects' | 'about-me' | 'videos';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState<ViewState>('home');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
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

  const handleOpenVideos = () => {
    setCurrentView('videos');
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
          <Header onNavigateToProjects={handleOpenProjects} onNavigateToVideos={handleOpenVideos} onNavigateToAboutMe={handleOpenAboutMe} />
          <main>
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

      {currentView === 'videos' && (
        <Suspense fallback={<div className="app-loading-container"><div className="app-loading-spinner" /></div>}>
          <VideoPage onBack={handleBackToHome} />
        </Suspense>
      )}

      <Footer variant={currentView === 'videos' ? 'dark' : 'default'} />
      
    </div>
  );
};

export default App;
