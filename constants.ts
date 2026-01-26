
import { Project, GraphicItem, MotionItem, VideoItem, WorkItem } from './types';

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
    title: 'MicroCode',
    subtitle: 'Product Design',
    category: 'Video', // Using this slot for the "Video" requirement, represented by hardware photo
    type: 'image',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop', // Circuit board/tech vibe
  },
  {
    id: 'w4',
    title: 'Kinetic Type',
    subtitle: 'Motion Graphic',
    category: 'Motion',
    type: 'solid-color',
    bgColor: '#00A699', // Teal/Green like "Seattle Design Festival"
    customContent: 'text-graphic' // Special flag to render angled text
  },
  {
    id: 'w5',
    title: 'Spectra',
    subtitle: 'Senior Capstone Project',
    category: 'UI/UX',
    type: 'image',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2671&auto=format&fit=crop', // Laptop mockup vibe
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
export const VIDEOS: VideoItem[] = [];
