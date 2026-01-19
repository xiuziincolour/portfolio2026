
import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import WorkGrid from './components/WorkGrid';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CaseStudy from './components/CaseStudy';
import './App.css';

type ViewState = 'home' | 'case-study';

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
    // Only opening the first project for now as per request
    if (id === 'w1') {
      setCurrentView('case-study');
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

  if (loading) {
    return (
      <div className="fixed inset-0 bg-brand-bg flex items-center justify-center z-[100]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-brand-blue border-t-transparent rounded-full animate-spin"></div>
          <img 
            src="/img/xiuzi_logo.png" 
            alt="Xiuzi Logo" 
            className="h-8 w-auto animate-pulse"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text selection:bg-brand-blue selection:text-white relative">
      
      {/* 
        Conditional Rendering: 
        If currentView is 'case-study', we render the detailed page ON TOP of everything 
        (or instead of main content). 
        To keep it clean, we'll replace the main content.
      */}

      {currentView === 'home' && (
        <>
          <Header />
          <main>
            <Hero />
            {/* Pass the handler to WorkGrid */}
            <WorkGrid onOpenProject={handleOpenProject} />
            <About />
            <Contact />
          </main>
          <Footer />
        </>
      )}

      {currentView === 'case-study' && (
        <CaseStudy onBack={handleBackToHome} />
      )}
      
    </div>
  );
};

export default App;
