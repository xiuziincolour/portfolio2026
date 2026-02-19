import React, { useCallback, useEffect, useState, useRef, lazy, Suspense } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import Header from './components/Header';
import LandingIntro from './components/LandingIntro';
import WorkGrid from './components/WorkGrid';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Projects from './components/Projects';
import AboutMe from './components/AboutMe';
import { ProjectDetailPage } from './lib/routes';
import './App.css';

const VideoPage = lazy(() => import('./components/VideoPage'));

const THEME_BG = { light: '#F5F5F5', dark: '#0b0b0c' } as const;
const INTRO_PLAYED_KEY = 'xiuzi-intro-played';

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
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    const stored = window.localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ? 'dark' : 'light';
  });
  const [themeOverlay, setThemeOverlay] = useState<{ from: string; to: string } | null>(null);
  const [overlayColor, setOverlayColor] = useState<string>(THEME_BG.light);
  const location = useLocation();
  const navigate = useNavigate();

  // 路由变化时滚动：从 project 返回首页则滚到 #work，否则滚到顶部
  useEffect(() => {
    if (location.pathname === '/' && (location.state as { scrollTo?: string } | null)?.scrollTo === 'work') {
      const id = setTimeout(() => {
        document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return () => clearTimeout(id);
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.state]);

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

  useEffect(() => {
    if (!showIntroOverlay) return;
    if (introUseGif || introVideoError) {
      const t = setTimeout(handleIntroEnd, 4000);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [showIntroOverlay, introUseGif, introVideoError, handleIntroEnd]);

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

      {location.pathname === '/' && showIntroOverlay && (
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
              <source src="https://pub-b1a10ff6b2664d4c86d2cb6c5ad45fc8.r2.dev/xiuzi-logo-animation.mov" type="video/quicktime" />
            </video>
          )}
        </div>
      )}

      <div className="app-content">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header
                  theme={theme}
                  onToggleTheme={runThemeTransition}
                />
                <main>
                  <LandingIntro />
                  <WorkGrid theme={theme} />
                  <About />
                  <Contact />
                </main>
                <Footer variant="default" />
              </>
            }
          />
          <Route path="/project/:id" element={<ProjectDetailPage />} />
          <Route
            path="/projects"
            element={
              <>
                <Projects />
                <Footer variant="default" />
              </>
            }
          />
          <Route
            path="/about"
            element={
              <>
                <AboutMe onBack={() => navigate('/')} />
                <Footer variant="default" />
              </>
            }
          />
          <Route
            path="/film"
            element={
              <Suspense fallback={<div className="app-loading-container"><div className="app-loading-spinner" /></div>}>
                <VideoPage onBack={() => navigate('/')} />
                <Footer variant="dark" />
              </Suspense>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
