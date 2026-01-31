import { Project, GraphicItem, MotionItem, VideoItem, WorkItem, MotionGraphicItem } from './types';

const R2_DOMAIN = 'https://pub-b1a10ff6b2664d4c86d2cb6c5ad45fc8.r2.dev';

export const PORTFOLIO_VIDEOS = {
  workreel: `${R2_DOMAIN}/xiuzi-workreel.mp4`,
  xiuziWorkreel: `${R2_DOMAIN}/xiuzi-workreel.mp4`,
  Annseyinterview: `${R2_DOMAIN}/Annsey-Interview.mp4`,
  tencentDoki: `${R2_DOMAIN}/Aaron%20Yan-Tencent%20x%20doki.MP4`,
  mrmissMV: `${R2_DOMAIN}/Mrmiss-MV.mp4`,
  paxWhite: `${R2_DOMAIN}/PAx%20White-murphys-MV.mp4`,
  aplusMovingGraphic: `${R2_DOMAIN}/aplus-Moving%20Graphic%20Cover.mp4`,
  dirtymoonMovingGraphic: `${R2_DOMAIN}/dirtymoon-Moving%20Graphic%20Cover.mp4`,
  elenoreMovingGraphic: `${R2_DOMAIN}/Elenore-Moving%20Graphic%20Cover.mp4`,
  skytrain: `${R2_DOMAIN}/Skytrain.mp4`,
  xiuziAboutMyself: `${R2_DOMAIN}/Xiuzi-About%20Myself.mp4`,
};

export const NAV_LINKS = [
  { name: 'Projects', href: '#work' },
  { name: 'Videos', href: '#work' },
  { name: 'About', href: '#about' },
];

// The unified grid content based on your request: 3 UI/UX, 1 Motion, 1 Video + 1 Extra to fill grid
export const UNIFIED_WORKS: WorkItem[] = [
  {
    id: 'w1',
    title: 'Linko',
    subtitle: 'Redefining the Live Music Social Experience',
    category: 'UI/UX',
    type: 'image',
    image: '/img/linko/linko_header.jpg',
  },
  {
    id: 'w2',
    title: 'Jargon',
    subtitle: 'Redefining the User Experience Design',
    category: 'UI/UX',
    type: 'image',
    image: '/img/jargon/Jargon-cover.png',
  },
  {
    id: 'w3',
    title: 'Jargon Merch',
    subtitle: 'Merchandise Design',
    category: 'UI/UX',
    type: 'image',
    image: '/img/Jargon-merch/Jargon-tshirt-1.png',
  },
  {
    id: 'w4',
    title: 'Cans',
    subtitle: 'Graphic Design',
    category: 'Motion',
    type: 'image',
    image: '/img/graphic-cans/Xiuzi_Cans-cover.png',
  },
  {
    id: 'w5',
    title: 'Rock Poster',
    subtitle: 'Graphic Design',
    category: 'UI/UX',
    type: 'image',
    image: '/img/posters/rockposter.png',
  },
  {
    id: 'w6',
    title: 'Public Library',
    subtitle: 'Product Design',
    category: 'Product', // The 6th item to fill the grid
    type: 'image',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2670&auto=format&fit=crop', // Phone mockup vibe
  }
];

// Keeping these for potential modal details if needed, but main view uses UNIFIED_WORKS
export const PROJECTS: Project[] = []; 
export const GRAPHICS: GraphicItem[] = [];
export const MOTION_ITEMS: MotionItem[] = [];

// Motion Graphics for Video Page
export const MOTION_GRAPHICS: MotionGraphicItem[] = [
  {
    id: 'mg1',
    title: 'Aplus — Moving Graphic Cover',
    subtitle: 'Motion Graphic',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2069&auto=format&fit=crop',
    videoUrl: PORTFOLIO_VIDEOS.aplusMovingGraphic,
    bodytext: 'Motion graphic cover for Aplus, combining type and motion for a striking visual.',
  },
  {
    id: 'mg2',
    title: 'Dirty Moon — Moving Graphic Cover',
    subtitle: 'Motion Graphic',
    thumbnail: 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop',
    videoUrl: PORTFOLIO_VIDEOS.dirtymoonMovingGraphic,
    bodytext: 'Motion graphic cover for Dirty Moon, blending narrative and kinetic design.',
  },
  {
    id: 'mg3',
    title: 'Elenore — Moving Graphic Cover',
    subtitle: 'Motion Graphic',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2047&auto=format&fit=crop',
    videoUrl: PORTFOLIO_VIDEOS.elenoreMovingGraphic,
    bodytext: 'Motion graphic cover for Elenore, combining type and motion for a striking visual.',
  },
  {
    id: 'mg4',
    title: 'Skytrain',
    subtitle: 'Motion Graphic',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2069&auto=format&fit=crop',
    videoUrl: PORTFOLIO_VIDEOS.skytrain,
    bodytext: 'Motion graphic piece for Skytrain.',
  },
  {
    id: 'mg5',
    title: 'Xiuzi — About Myself',
    subtitle: 'Motion Graphic',
    thumbnail: 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop',
    videoUrl: PORTFOLIO_VIDEOS.xiuziAboutMyself,
    bodytext: 'A personal intro motion piece — About Myself.',
  },
];

// Videography for Video Page (all videos from Cloudflare R2)
export const VIDEOS: VideoItem[] = [
  {
    id: 'v1',
    title: 'Annsey Interview',
    subtitle: 'Director/Editor',
    thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2053&auto=format&fit=crop',
    duration: '5:30',
    videoUrl: PORTFOLIO_VIDEOS.Annseyinterview,
    bodytext: 'A documentary-style interview capturing the essence of Annsey\'s creative journey and artistic vision.',
  },
  {
    id: 'v2',
    title: 'Mr. Miss',
    subtitle: 'Director/Editor',
    thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop',
    duration: '3:45',
    videoUrl: PORTFOLIO_VIDEOS.mrmissMV,
    bodytext: 'Music video for Mr. Miss\'s song "迷航", exploring themes of journey and discovery through visual storytelling.',
  },
  {
    id: 'v3',
    title: 'Aaron Yan — Tencent x Doki',
    subtitle: 'Editor',
    thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop',
    duration: '2:45',
    videoUrl: PORTFOLIO_VIDEOS.tencentDoki,
    bodytext: 'A commercial spot showcasing innovative product features with dynamic cinematography.',
  },
  {
    id: 'v4',
    title: 'PAx White — Murphy\'s MV',
    subtitle: 'Editor',
    thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop',
    duration: '3:00',
    videoUrl: PORTFOLIO_VIDEOS.paxWhite,
    bodytext: 'Music video for PAx White — Murphy\'s, blending narrative and visual rhythm.',
  },
];
