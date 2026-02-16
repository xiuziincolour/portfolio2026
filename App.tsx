import React, { useCallback, useEffect, useState, useRef, lazy, Suspense } from 'react';
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
const INTRO_PLAYED_KEY = 'xiuzi-intro-played';

type ViewState = 'home' | 'case-study' | 'jargon-case-study' | 'jargon-merch' | 'graphics-emag' | 'graphic-menu' | 'projects' | 'about-me' | 'videos';

const App: React.FC = () => {
  const [showIntroOverlay, setShowIntroOverlay] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !sessionStorage.getItem(INTRO_PLAYED_KEY);
  });
  const [introUseGif, setIntroUseGif] = useState(() => {
    if (typeof window === 'undefined') return true;
    const v = document.createElement('video');
    return !v.canPlayType('video/mp4') && !v.canPlayType('video/quicktime');
  });
  const [introVideoError, setIntroVideoError] = useState(false);
  const introVideoRef = useRef<HTMLVideoElement>(null);
  const introEndHandledRef = useRef(false);
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    const stored = window.localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ? 'dark' : 'light';
  });
  const [themeOverlay, setThemeOverlay] = useState<{ from: string; to: string } | null>(null);
  const [overlayColor, setOverlayColor] = useState(THEME_BG.light);

  const handleIntroEnd = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_PLAYED_KEY, '1');
    } catch {
      // ignore
    }
    setShowIntroOverlay(false);
  }, []);

  const finishIntroAndClose = useCallback(() => {
    if (introEndHandledRef.current) return;
    introEndHandledRef.current = true;
    const video = introVideoRef.current;
    if (video) {
      video.pause();
      if (Number.isFinite(video.duration)) video.currentTime = video.duration;
    }
    requestAnimationFrame(() => {
      const v = introVideoRef.current;
      if (v) {
        v.pause();
        if (Number.isFinite(v.duration)) v.currentTime = v.duration;
      }
      setTimeout(handleIntroEnd, 300);
    });
  }, [handleIntroEnd]);

  const handleIntroVideoEnded = useCallback(() => {
    const video = introVideoRef.current;
    if (!video || !Number.isFinite(video.duration)) return;
    video.pause();
    video.currentTime = video.duration;
    finishIntroAndClose();
  }, [finishIntroAndClose]);

  const handleIntroTimeUpdate = useCallback(() => {
    const video = introVideoRef.current;
    if (!video || !Number.isFinite(video.duration)) return;
    if (video.currentTime >= video.duration - 0.08) {
      video.pause();
      video.currentTime = video.duration;
      finishIntroAndClose();
    }
  }, [finishIntroAndClose]);

  useEffect(() => {
    if (!showIntroOverlay || introUseGif || introVideoError) return;
    const video = introVideoRef.current;
    if (video) {
      video.play().catch(() => setIntroVideoError(true));
    }
  }, [showIntroOverlay, introUseGif, introVideoError]);

  // GIF 或视频出错：4 秒后关闭 overlay
  useEffect(() => {
    if (!showIntroOverlay) return;
    if (introUseGif || introVideoError) {
      const t = setTimeout(handleIntroEnd, 4000);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [showIntroOverlay, introUseGif, introVideoError, handleIntroEnd]);

  // 视频路径安全超时：若视频一直不 ended（如无 mp4 仅 mov 在 Chrome 不播放），约 6 秒后强制关闭
  useEffect(() => {
    if (!showIntroOverlay || introUseGif || introVideoError) return;
    const t = setTimeout(() => {
      if (introEndHandledRef.current) return;
      setIntroVideoError(true);
      handleIntroEnd();
    }, 6000);
    return () => clearTimeout(t);
  }, [showIntroOverlay, introUseGif, introVideoError, handleIntroEnd]);

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

      {currentView === 'home' && showIntroOverlay && (
        <div className="app-loading-container" aria-hidden>
          {(introUseGif || introVideoError) ? (
            <img
              src="/img/xiuzi-logo-animation.gif"
              alt="Xiuzi Logo Animation"
              className="app-loading-animation"
            />
          ) : (
            <video
              ref={introVideoRef}
              className="app-loading-animation"
              autoPlay
              muted
              playsInline
              preload="auto"
              aria-label="Xiuzi Logo Animation"
              onTimeUpdate={handleIntroTimeUpdate}
              onEnded={handleIntroVideoEnded}
              onError={() => setIntroVideoError(true)}
            >
              <source src="/img/xiuzi-logo-animation.mp4" type="video/mp4" />
              <source src="/img/xiuzi-logo-animation.mov" type="video/quicktime" />
            </video>
          )}
        </div>
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
            <WorkGrid theme={theme} onOpenProject={handleOpenProject} onNavigateToProjects={handleOpenProjects} />
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
