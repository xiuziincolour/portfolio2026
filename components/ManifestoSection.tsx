import React, { useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ManifestoSection.css';

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_MANIFESTO =
  'From concept to shipped product. Interfaces that are fast to build, easy to use, and grounded in real user behavior, driven by clean systems, tight collaboration with developers, and a bias toward shipping.';

type ManifestoSectionProps = {
  text?: string;
};

const ManifestoSection: React.FC<ManifestoSectionProps> = ({ text = DEFAULT_MANIFESTO }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const words = useMemo(() => text.split(' '), [text]);
  const charCount = useMemo(() => words.reduce((total, word) => total + word.length, 0), [words]);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    if (!section || !text) return undefined;

    const charEls = text.querySelectorAll<HTMLElement>('.manifesto-char');
    if (charEls.length !== charCount) return undefined;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const readColors = () => {
      const styles = getComputedStyle(document.documentElement);
      return {
        from: styles.getPropertyValue('--brand-gray').trim() || '#888888',
        to: styles.getPropertyValue('--brand-blue').trim() || '#002FA7',
      };
    };

    let { from, to } = readColors();
    charEls.forEach((el) => {
      el.style.color = from;
    });

    if (prefersReducedMotion) {
      charEls.forEach((el) => {
        el.style.color = to;
      });
      return undefined;
    }

    const paint = (progress: number) => {
      const count = charEls.length;
      // Spread the reveal so ~1.0 progress lands on the final character
      const span = 2.4;
      charEls.forEach((el, i) => {
        const start = (i / count) * (1 - span / count);
        const end = start + span / count;
        const local = Math.min(1, Math.max(0, (progress - start) / Math.max(0.0001, end - start)));
        const t = local * local * (3 - 2 * local);
        el.style.color = t >= 1 ? to : t <= 0 ? from : mixColor(from, to, t);
      });
    };

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=85%',
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      scrub: true,
      onUpdate: (self) => {
        paint(self.progress);
      },
      onLeave: () => paint(1),
      onEnterBack: () => paint(1),
    });

    paint(0);

    // Keep colors in sync with the light/dark theme toggle
    const themeObserver = new MutationObserver(() => {
      ({ from, to } = readColors());
      paint(trigger.progress);
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => {
      themeObserver.disconnect();
      trigger.kill();
    };
  }, [charCount]);

  return (
    <section ref={sectionRef} className="manifesto-section" aria-label="Design approach">
      <div className="manifesto-container">
        <p ref={textRef} className="manifesto-text">
          {words.map((word, wordIndex) => (
            <React.Fragment key={`${word}-${wordIndex}`}>
              <span className="manifesto-word">
                {word.split('').map((char, charIndex) => (
                  <span key={`${char}-${charIndex}`} className="manifesto-char">
                    {char}
                  </span>
                ))}
              </span>
              {wordIndex < words.length - 1 ? ' ' : null}
            </React.Fragment>
          ))}
        </p>
      </div>
    </section>
  );
};

function mixColor(a: string, b: string, t: number): string {
  const pa = parseColor(a);
  const pb = parseColor(b);
  if (!pa || !pb) return t > 0.5 ? b : a;
  const r = Math.round(pa.r + (pb.r - pa.r) * t);
  const g = Math.round(pa.g + (pb.g - pa.g) * t);
  const bl = Math.round(pa.b + (pb.b - pa.b) * t);
  return `rgb(${r}, ${g}, ${bl})`;
}

function parseColor(input: string): { r: number; g: number; b: number } | null {
  const value = input.trim();
  if (value.startsWith('#')) {
    const raw = value.slice(1);
    const full = raw.length === 3 ? raw.split('').map((c) => c + c).join('') : raw;
    if (full.length !== 6) return null;
    return {
      r: parseInt(full.slice(0, 2), 16),
      g: parseInt(full.slice(2, 4), 16),
      b: parseInt(full.slice(4, 6), 16),
    };
  }
  const match = value.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (!match) return null;
  return { r: Number(match[1]), g: Number(match[2]), b: Number(match[3]) };
}

export default ManifestoSection;
