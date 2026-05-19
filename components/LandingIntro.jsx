import React, { useRef, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './LandingIntro.css';

gsap.registerPlugin(ScrollTrigger);

const HEADLINE = "Hey! I'm Xiuzi, a Product and UI/UX Designer";
/** Line break after this phrase (includes trailing space before “UI/UX”) */
const HEADLINE_BREAK_INDEX = "Hey! I'm Xiuzi, a Product and ".length;

const ALIGN_DURATION = 1.1;
const CTA_FADE_DURATION = 0.9;
const TOUCH_THRESHOLD = 12;

const BROKEN_KERNING = [];
const BROKEN_BASELINE = [];
const BROKEN_X = [];
const BROKEN_Y = [];
const BROKEN_ROTATE = [];

(function seedBroken() {
  const seed = (s) => () => (s = (s * 9301 + 49297) % 233280) / 233280;
  const r = seed(1);
  for (let i = 0; i < HEADLINE.length; i++) {
    BROKEN_KERNING.push((r() - 0.5) * 0.32);
    BROKEN_BASELINE.push((r() - 0.5) * 22);
    BROKEN_X.push((r() - 0.5) * 160);
    BROKEN_Y.push((r() - 0.5) * 100);
    BROKEN_ROTATE.push((r() - 0.5) * 24);
  }
})();

function LandingIntro() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const textRef = useRef(null);
  const ctaRef = useRef(null);
  const [portalRoot, setPortalRoot] = useState(null);

  const chars = useMemo(() => HEADLINE.split(''), []);

  useEffect(() => {
    setPortalRoot(document.body);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    const text = textRef.current;
    const cta = ctaRef.current;
    if (!section || !grid || !text || !cta) return undefined;

    const charEls = text.querySelectorAll('.landing-intro-char');
    if (charEls.length !== chars.length) return undefined;

    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1440;
    const isMobile = viewportWidth < 768;
    const offsetMultiplier = isMobile ? 0.5 : 1;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let scrollTriggerInstance = null;
    let isAligned = false;
    let animating = false;
    let touchStartY = 0;

    const isInHeroZone = () => {
      const spacer = document.querySelector('.landing-intro-spacer');
      const zoneEnd = section.offsetHeight + (spacer?.offsetHeight ?? 0);
      return window.scrollY <= zoneEnd;
    };

    const setBrokenState = () => {
      charEls.forEach((el, i) => {
        gsap.set(el, {
          letterSpacing: `${BROKEN_KERNING[i]}em`,
          x: BROKEN_X[i] * offsetMultiplier,
          y: BROKEN_Y[i] * offsetMultiplier,
          rotate: BROKEN_ROTATE[i],
          opacity: 1,
        });
      });
      gsap.set(grid, { opacity: 0 });
      gsap.set(cta, { opacity: 1, clearProps: 'transform' });
      cta.style.visibility = 'visible';
    };

    const setAlignedState = () => {
      gsap.set(charEls, { letterSpacing: 0, x: 0, y: 0, rotate: 0, opacity: 1 });
      gsap.set(grid, { opacity: 0.18 });
      gsap.set(cta, { opacity: 0, clearProps: 'transform' });
      cta.style.visibility = 'hidden';
    };

    const fadeOutCta = () => {
      gsap.killTweensOf(cta);
      gsap.to(cta, {
        opacity: 0,
        duration: CTA_FADE_DURATION,
        ease: 'power1.inOut',
        overwrite: true,
      });
    };

    const fadeInCta = () => {
      gsap.killTweensOf(cta);
      cta.style.visibility = 'visible';
      gsap.to(cta, {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        overwrite: true,
        clearProps: 'transform',
      });
    };

    setBrokenState();

    let removeListeners = () => {};

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          isAligned = true;
          animating = false;
          cta.style.visibility = 'hidden';

          if (!scrollTriggerInstance) return;

          const scrollY = window.scrollY;
          scrollTriggerInstance.kill(false);
          requestAnimationFrame(() => {
            window.scrollTo(0, scrollY);
            ScrollTrigger.refresh();
          });
        },
        onReverseComplete: () => {
          isAligned = false;
          animating = false;
          setBrokenState();
        },
      });

      tl.to(
        charEls,
        {
          letterSpacing: 0,
          x: 0,
          y: 0,
          rotate: 0,
          duration: ALIGN_DURATION,
        },
        0
      )
        .to(grid, { opacity: 0.18, duration: ALIGN_DURATION }, 0);

      scrollTriggerInstance = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=1',
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        onLeave: () => {
          cta.style.visibility = 'hidden';
        },
        onEnterBack: () => {
          if (isAligned) return;
          animating = false;
          tl.pause(0);
          setBrokenState();
        },
      });

      const canAlign = () => !animating && !isAligned && isInHeroZone();

      const canUnalign = () => animating || !isAligned || !isInHeroZone();

      const playAlign = () => {
        if (!canAlign()) return;
        animating = true;
        fadeOutCta();
        tl.play();
      };

      const playUnalign = () => {
        if (canUnalign()) return;
        animating = true;
        fadeInCta();
        tl.reverse();
      };

      const handleWheel = (e) => {
        if (!isInHeroZone() || animating) return;
        if (Math.abs(e.deltaY) < 1) return;

        if (e.deltaY > 0) {
          if (!canAlign()) return;
          e.preventDefault();
          playAlign();
        } else if (e.deltaY < 0) {
          if (canUnalign()) return;
          e.preventDefault();
          playUnalign();
        }
      };

      const handleTouchStart = (e) => {
        touchStartY = e.touches[0].clientY;
      };

      const handleTouchMove = (e) => {
        if (!isInHeroZone() || animating) return;
        const dy = touchStartY - e.touches[0].clientY;
        if (Math.abs(dy) < TOUCH_THRESHOLD) return;

        if (dy > 0) {
          if (!canAlign()) return;
          e.preventDefault();
          playAlign();
        } else if (dy < 0) {
          if (canUnalign()) return;
          e.preventDefault();
          playUnalign();
        }
      };

      const handleKeyDown = (e) => {
        if (!isInHeroZone() || animating) return;

        if (['ArrowDown', 'PageDown', ' ', 'Enter'].includes(e.key)) {
          if (!canAlign()) return;
          e.preventDefault();
          playAlign();
        } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
          if (canUnalign()) return;
          e.preventDefault();
          playUnalign();
        }
      };

      window.addEventListener('wheel', handleWheel, { passive: false });
      window.addEventListener('touchstart', handleTouchStart, { passive: true });
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('keydown', handleKeyDown);

      removeListeners = () => {
        window.removeEventListener('wheel', handleWheel);
        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('keydown', handleKeyDown);
      };

      const workSection = document.getElementById('work');
      if (workSection) {
        gsap.set(text, { autoAlpha: 1 });
        gsap.to(text, {
          autoAlpha: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: workSection,
            start: 'top 68%',
            end: 'top 44%',
            scrub: 0.55,
          },
        });
      }

      if (prefersReducedMotion) {
        tl.progress(1);
        isAligned = true;
        setAlignedState();
        if (scrollTriggerInstance) {
          scrollTriggerInstance.kill(false);
          ScrollTrigger.refresh();
        }
      }
    });

    return () => {
      removeListeners();
      ctx.revert();
    };
  }, [chars.length, portalRoot]);

  const textLayer = (
    <motion.div
      ref={textRef}
      className="landing-intro-text-layer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div className="landing-intro-text">
        <h2 className="landing-intro-headline" aria-hidden="true">
          {chars.slice(0, HEADLINE_BREAK_INDEX).map((char, idx) => (
            <span
              key={idx}
              className="landing-intro-char"
              style={{
                letterSpacing: `${BROKEN_KERNING[idx]}em`,
                transform: `translate(${BROKEN_X[idx]}px, ${BROKEN_Y[idx]}px) rotate(${BROKEN_ROTATE[idx]}deg)`,
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
          <br />
          {chars.slice(HEADLINE_BREAK_INDEX).map((char, idx) => {
            const i = HEADLINE_BREAK_INDEX + idx;
            return (
              <span
                key={i}
                className="landing-intro-char"
                style={{
                  letterSpacing: `${BROKEN_KERNING[i]}em`,
                  transform: `translate(${BROKEN_X[i]}px, ${BROKEN_Y[i]}px) rotate(${BROKEN_ROTATE[i]}deg)`,
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            );
          })}
        </h2>
        <span className="sr-only">{HEADLINE}</span>
        <motion.div
          className="landing-intro-body"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p>
            with a strong background in Film and Motion. Driven by purposeful design, user psychology, and exploring Vancouver&apos;s craft beer scene.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );

  const ctaLayer = (
    <div ref={ctaRef} className="landing-intro-cta">
      <span className="landing-intro-cta-text">SCROLL TO ALIGN</span>
      <span className="landing-intro-cta-arrow" aria-hidden>↓</span>
    </div>
  );

  return (
    <>
      <section ref={sectionRef} className="landing-intro">
        <div ref={gridRef} className="landing-intro-grid-lines" aria-hidden />
      </section>

      <div className="landing-intro-spacer" aria-hidden />

      {portalRoot
        ? createPortal(
            <>
              {textLayer}
              {ctaLayer}
            </>,
            portalRoot
          )
        : null}
    </>
  );
}

export default LandingIntro;
