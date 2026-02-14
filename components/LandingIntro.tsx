import React, { useRef, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './LandingIntro.css';

gsap.registerPlugin(ScrollTrigger);

const HEADLINE = "I have a love-hate relationship with chaos.";

const BROKEN_KERNING: number[] = [];
const BROKEN_BASELINE: number[] = [];
const BROKEN_X: number[] = [];
const BROKEN_Y: number[] = [];
const BROKEN_ROTATE: number[] = [];
(function seedBroken() {
  const seed = (s: number) => () => (s = (s * 9301 + 49297) % 233280) / 233280;
  const r = seed(1);
  for (let i = 0; i < HEADLINE.length; i++) {
    BROKEN_KERNING.push((r() - 0.5) * 0.32);
    BROKEN_BASELINE.push((r() - 0.5) * 22);
    BROKEN_X.push((r() - 0.5) * 160);
    BROKEN_Y.push((r() - 0.5) * 100);
    BROKEN_ROTATE.push((r() - 0.5) * 24);
  }
})();

const LandingIntro: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const chars = useMemo(() => HEADLINE.split(''), []);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    const cta = ctaRef.current;
    if (!section || !grid || !cta) return;

    const charEls = section.querySelectorAll<HTMLElement>('.landing-intro-char');
    if (charEls.length !== chars.length) return;

    const scrollTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=150%',
      pin: true,
      pinSpacing: true,
      onUpdate: (self) => {
        const p = self.progress;

        // Letters: chaos → aligned (0 → 1)
        charEls.forEach((el, i) => {
          const t = 1 - p;
          el.style.letterSpacing = `${BROKEN_KERNING[i] * t}em`;
          el.style.transform = `translate(${BROKEN_X[i] * t}px, ${BROKEN_Y[i] * t}px) rotate(${BROKEN_ROTATE[i] * t}deg)`;
        });

        // Grid: fade in with scroll
        const gridOpacity = p < 0.35 ? (p / 0.35) * 0.12 : p < 0.7 ? 0.12 + ((p - 0.35) / 0.35) * 0.06 : 0.18;
        grid.style.opacity = String(gridOpacity);

        // CTA: visible at start, fade out by mid scroll; hide after pin releases
        const ctaOpacity = p < 0.2 ? 1 : p < 0.5 ? 1 - (p - 0.2) / 0.3 : 0;
        cta.style.opacity = String(ctaOpacity);
      },
      onLeave: () => {
        cta.style.visibility = 'hidden';
      },
      onEnterBack: () => {
        cta.style.visibility = 'visible';
      },
    });

    // CTA visible when section is in view (e.g. before pin starts)
    cta.style.visibility = 'visible';

    return () => {
      scrollTrigger.kill();
    };
  }, [chars.length]);

  return (
    <section ref={sectionRef} className="landing-intro">
      <div ref={gridRef} className="landing-intro-grid-lines" aria-hidden />

      <div className="landing-intro-container">
        <div className="landing-intro-text">
          <h2 className="landing-intro-headline" aria-label={HEADLINE}>
            {chars.map((char, i) => (
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
            ))}
          </h2>
          <motion.div
            className="landing-intro-body"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p>
              I love diving into chaos, and I hate leaving it messy. With 6+ years of experience, I've become a professional &lsquo;noise-canceling&rsquo; filter for digital products. I translate messy ideas into confident, scalable systems—because life is too short for clunky interfaces and bad kerning.
            </p>
          </motion.div>
        </div>
      </div>

      <div ref={ctaRef} className="landing-intro-cta">
        <span className="landing-intro-cta-text">SCROLL TO ALIGN</span>
        <span className="landing-intro-cta-arrow" aria-hidden>↓</span>
      </div>
    </section>
  );
};

export default LandingIntro;
