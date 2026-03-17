import React, { useRef, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './LandingIntro.css';

gsap.registerPlugin(ScrollTrigger);

const HEADLINE = "Hey! I'm Xiuzi, a Product and UI/UX Designer";

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
  const ctaRef = useRef(null);

  const chars = useMemo(() => HEADLINE.split(''), []);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    const cta = ctaRef.current;
    if (!section || !grid || !cta) return;

    const charEls = section.querySelectorAll('.landing-intro-char');
    if (charEls.length !== chars.length) return;

    // 初始随机散落状态交给 GSAP 处理，避免频繁手动改 style
    charEls.forEach((el, i) => {
      gsap.set(el, {
        letterSpacing: `${BROKEN_KERNING[i]}em`,
        x: BROKEN_X[i],
        y: BROKEN_Y[i],
        rotate: BROKEN_ROTATE[i],
        opacity: 1,
      });
    });

    const PIN_ANIMATION = 150;
    const PIN_BUFFER = 80;
    const PIN_TOTAL = PIN_ANIMATION + PIN_BUFFER;
    const animProgressEnd = PIN_ANIMATION / PIN_TOTAL;

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: `+=${PIN_TOTAL}%`,
        scrub: true,
        pin: true,
        pinSpacing: true,
        onLeave: () => {
          cta.style.visibility = 'hidden';
        },
        onEnterBack: () => {
          cta.style.visibility = 'visible';
        },
      },
    });

    // 字符：从混乱到对齐
    tl.to(
      charEls,
      {
        letterSpacing: 0,
        x: 0,
        y: 0,
        rotate: 0,
        duration: animProgressEnd,
      },
      0
    )
      // 背景网格逐渐显现
      .to(
        grid,
        {
          opacity: 0.18,
          duration: animProgressEnd,
        },
        0
      )
      // CTA 渐隐
      .to(
        cta,
        {
          opacity: 0,
          duration: animProgressEnd * 0.8,
        },
        animProgressEnd * 0.2
      )
      // 剩余 80% 滚动只是保持 pin，不再改变视觉
      .to({}, { duration: 1 - animProgressEnd });

    cta.style.visibility = 'visible';

    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, [chars.length]);

  return (
    <section ref={sectionRef} className="landing-intro">
      <div ref={gridRef} className="landing-intro-grid-lines" aria-hidden />

      <div className="landing-intro-container">
        <div className="landing-intro-text">
          <h2 className="landing-intro-headline" aria-hidden="true">
            {chars.map((char, idx) => (
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
          </h2>
          <span className="sr-only">{HEADLINE}</span>
          <motion.div
            className="landing-intro-body"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p>
              with a strong background in Film and Motion. Driven by purposeful design, user psychology, and exploring Vancouver&apos;s craft beer scene.
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
}

export default LandingIntro;

