import React, { useEffect, useState, lazy, Suspense } from 'react';
import Header from './components/Header';
import LandingIntro from './components/LandingIntro';
import WorkGrid from './components/WorkGrid';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CaseStudy from './components/CaseStudy';
import JargonCaseStudy from './components/JargonCaseStudy';
import JargonMerchPage from './components/JargonMerchPage.tsx';
import GraphicsEmagPage from './components/GraphicsEmagPage';
import GraphicMenuPage from './components/GraphicMenuPage';
import Projects from './components/Projects';
import AboutMe from './components/AboutMe';
import './App.css';

const VideoPage = lazy(() => import('./components/VideoPage'));

const THEME_BG = { light: '#F5F5F5', dark: '#0b0b0c' } as const;

type ViewState = 'home' | 'case-study' | 'jargon-case-study' | 'jargon-merch' | 'graphics-emag' | 'graphic-menu' | 'projects' | 'about-me' | 'videos';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    const stored = window.localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ? 'dark' : 'light';
  });
  const [themeOverlay, setThemeOverlay] = useState<{ from: string; to: string } | null>(null);
  const [overlayColor, setOverlayColor] = useState(THEME_BG.light);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      window.localStorage.setItem('theme', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  // When overlay is shown, animate its background from old to new theme (two frames so "from" paints first)
  useEffect(() => {
    if (!themeOverlay) return;
    setOverlayColor(themeOverlay.from);
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setOverlayColor(themeOverlay.to);
      });
    });
    return () => cancelAnimationFrame(id);
  }, [themeOverlay]);

  const runThemeTransition = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setThemeOverlay({ from: THEME_BG[theme], to: THEME_BG[nextTheme] });
    setTheme(nextTheme);
  };

  const handleThemeOverlayTransitionEnd = () => {
    setThemeOverlay(null);
  };

  const handleOpenProject = (id: string) => {
    if (id === 'w1') {
      setCurrentView('case-study');
      window.scrollTo(0, 0);
    } else if (id === 'w2') {
      setCurrentView('jargon-case-study');
      window.scrollTo(0, 0);
    } else if (id === 'w3') {
      setCurrentView('jargon-merch');
      window.scrollTo(0, 0);
    } else if (id === 'w7') {
      setCurrentView('graphics-emag');
      window.scrollTo(0, 0);
    } else if (id === 'w6') {
      setCurrentView('graphic-menu');
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
      {themeOverlay != null && (
        <div
          className="theme-overlay"
          style={{ backgroundColor: overlayColor }}
          onTransitionEnd={handleThemeOverlayTransitionEnd}
          aria-hidden
        />
      )}

      <div className="app-content">
      {currentView === 'home' && (
        <>
          <Header
            theme={theme}
            onToggleTheme={runThemeTransition}
            onNavigateToProjects={handleOpenProjects}
            onNavigateToVideos={handleOpenVideos}
            onNavigateToAboutMe={handleOpenAboutMe}
          />
          <main>
            <LandingIntro />
            <WorkGrid theme={theme} onOpenProject={handleOpenProject} />
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

      {currentView === 'jargon-merch' && (
        <JargonMerchPage onBack={handleBackToHome} />
      )}

      {currentView === 'graphics-emag' && (
        <GraphicsEmagPage onBack={handleBackToHome} />
      )}

      {currentView === 'graphic-menu' && (
        <GraphicMenuPage onBack={handleBackToHome} />
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
    </div>
  );
};

export default App;
