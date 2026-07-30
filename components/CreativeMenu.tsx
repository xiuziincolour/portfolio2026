import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CreativeMenu.css';

gsap.registerPlugin(ScrollTrigger);

type MenuItem = {
  label: string;
  href?: string;
  images: string[];
};

/** 480px JPEG thumbnails — the originals are multi-megabyte and stutter on hover */
const thumbs = (prefix: string) =>
  [1, 2, 3, 4, 5].map((n) => `/img/creative-menu/${prefix}-${n}.jpg`);

const MENU_ITEMS: MenuItem[] = [
  { label: 'Design', href: '/projects', images: thumbs('design') },
  { label: 'Social Media', images: thumbs('social') },
  { label: 'Motion Graphics', href: '/film', images: thumbs('motion') },
  { label: 'UI/UX Design', href: '/projects', images: thumbs('uiux') },
  { label: 'Film Production', href: '/film', images: thumbs('film') },
];

/** How far neighbouring rows slide away from the hovered one */
const ROW_SHIFT = 28;

const CreativeMenu: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [warm, setWarm] = useState(false);

  // Decode the thumbnails before the first hover so nothing pops in
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setWarm(true);
          observer.disconnect();
        }
      },
      { rootMargin: '800px 0px' }
    );
    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // The whole list drifts vertically as the section passes through the viewport
  useEffect(() => {
    const section = sectionRef.current;
    const list = listRef.current;
    if (!section || !list) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        list,
        { y: 60 },
        {
          y: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="creative-menu" aria-label="Creative disciplines">
      <ul
        ref={listRef}
        className="creative-menu-list"
        onMouseLeave={() => setActiveIndex(null)}
      >
        {MENU_ITEMS.map((item, index) => {
          const isActive = activeIndex === index;
          const shift =
            activeIndex == null || isActive
              ? 0
              : index < activeIndex
                ? -ROW_SHIFT
                : ROW_SHIFT;
          const Tag = item.href ? 'a' : 'span';

          const marquee = (side: 'left' | 'right') => (
            <div className={`creative-menu-marquee creative-menu-marquee--${side}`} aria-hidden="true">
              <div className="creative-menu-track">
                {warm &&
                  [...item.images, ...item.images].map((src, i) => (
                    <span className="creative-menu-thumb" key={`${side}-${src}-${i}`}>
                      <img src={src} alt="" width={160} height={120} decoding="async" />
                    </span>
                  ))}
              </div>
            </div>
          );

          return (
            <li
              key={item.label}
              className={`creative-menu-row ${isActive ? 'is-active' : ''}`}
              style={{ transform: `translate3d(0, ${shift}px, 0)` }}
              onMouseEnter={() => setActiveIndex(index)}
            >
              {/* Marquees flank the word so images never sit on the letters */}
              {marquee('left')}

              <Tag
                className="creative-menu-label"
                onFocus={() => setActiveIndex(index)}
                onBlur={() => setActiveIndex((current) => (current === index ? null : current))}
                {...(item.href
                  ? {
                      href: item.href,
                      ...(item.href === '/film'
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {}),
                    }
                  : {})}
              >
                {item.label}
              </Tag>

              {marquee('right')}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default CreativeMenu;
