# Xiuzi Guo Portfolio Punch-up! Proposal: "The Kerning & Grid Obsession"

## 1. Project Overview: The Work

**The Punch-up:** I will reconstruct the Hero Section of my landing page, upgrading it from a static headline display into an interactive narrative installation.

**Core Functionality:** I am implementing a dynamic typographic system that transitions from "Visual Chaos" to "Extreme Order" triggered by user scrolling (Scroll-triggered).

**Technical Implementation:** I will utilize the GSAP ScrollTrigger plugin to gain granular control over the transformation, displacement, and kerning of every individual character within the headline.

## 2. Strategic Impact: Enhancing the Body of Work

This is more than just a visual effect; it is the physical embodiment of my professional philosophy: **"Translating chaos into confident systems."**

- **Personal Uniqueness:** Unlike generic fade-in animations, this "auto-correcting" interaction directly visualizes my brand copy. It proves I am not just a designer, but a "noise-canceling filter" capable of resolving clunky interfaces and messy ideas.
- **Hybrid Capability:** It demonstrates a seamless integration of Motion Design (timing, easing functions, and rhythm) and Front-end.
- **Brand Consistency:** This obsessive attention to kerning and baseline alignment immediately builds professional trust with recruiters, showcasing my "detail-oriented" nature in a tangible, memorable way.

## 3. Conceptual Design

### Mock-ups & Prototypes

https://www.figma.com/design/T8s03xSQ2EmDUI8pN8fUT8/Punch-up?node-id=0-1&t=F0L12yuwTaP0SgiL-1

- **Phase 1 (Chaos):** Upon entry, the slogan is intentionally "broken"—characters overlap, baselines are jagged, and kerning is visually uncomfortable.
- **Phase 2 (The Filter):** As the user scrolls, a professional blueprint grid emerges in the background. Letters begin to snap toward their "perfect" coordinates like magnetic particles.
- **Phase 3 (Order):** The final scroll position reveals a perfectly balanced, scalable typographic system, symbolizing the completion of the "noise-canceling" process.

## 4. Execution Plan

### Resources & Stack

- **Development:** Next.js + GSAP (ScrollTrigger & Flip Plugin).
- **Design:** Figma (used for precise coordinate mapping of the final alignment).
- **Assets:** Variable Fonts will be utilized to subtly adjust font weights during the animation, adding extra depth and visual impact to the transition.

### Fears, Uncertainties, & Doubts (FUD)

- **Performance:** Treating every letter as an independent DOM node for high-frequency animation can cause frame drops on low-end mobile devices. I plan to optimize this using `will-change: transform` for hardware acceleration.
- **Responsiveness:** The "chaos radius" for character displacement must be calculated dynamically based on viewport size to prevent letters from flying off the screen boundaries on smaller devices.
