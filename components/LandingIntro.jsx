import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './LandingIntro.css';

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_CARD_LINES = [
  "Hey! I'm Xiuzi, a Product and UI/UX Designer.",
  'I turn ideas into shipped products through design, code, and marketing, with AI as my copilot. 🤖🖖🏼',
];

const fade = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
});

function LandingIntro({
  scrollHref = '#work',
  scriptRight = '/img/adesigner.png',
  scriptRightAlt = 'A Product and UI/UX Designer',
  cardLines = DEFAULT_CARD_LINES,
}) {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const scrollCue = scrollRef.current;
    if (!section || !stage) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const fadeTargets = [stage, scrollCue].filter(Boolean);

    const ctx = gsap.context(() => {
      // Hold the hero in place; the next section scrolls up over it
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        // Release exactly when the next section has covered the hero
        end: () => `+=${section.offsetHeight}`,
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
      });

      gsap.to(fadeTargets, {
        autoAlpha: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${section.offsetHeight * 0.7}`,
          scrub: 0.4,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="landing-intro">
      <div ref={stageRef} className="landing-intro-stage">
        <motion.img
          className="landing-intro-photo"
          src="/img/landing.png"
          alt="Xiuzi Guo"
          {...fade(0.05)}
        />

        <motion.img
          className="landing-intro-script landing-intro-script--left"
          src="/img/imxiuzi-2.png"
          alt="Hello I'm Xiuzi"
          aria-hidden="true"
          {...fade(0.3)}
        />

        <motion.img
          className="landing-intro-script landing-intro-script--right"
          src={scriptRight}
          alt={scriptRightAlt}
          aria-hidden="true"
          {...fade(0.42)}
        />

        <motion.div className="landing-intro-card" {...fade(0.25)}>
          {cardLines.map((line) => (
            <p key={line} className="landing-intro-card-line">
              {line}
            </p>
          ))}
        </motion.div>
      </div>

      {/* Wrapper carries the scroll-driven fade so it can't clash with the entrance animation */}
      <div ref={scrollRef} className="landing-intro-scroll-wrap">
        <motion.a href={scrollHref} className="landing-intro-scroll" {...fade(0.55)}>
          Scroll for more work
          <span className="landing-intro-scroll-icon" aria-hidden="true">
            <ArrowDown size={14} />
          </span>
        </motion.a>
      </div>
    </section>
  );
}

export default LandingIntro;
