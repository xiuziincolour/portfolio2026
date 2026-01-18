
export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  role: string[];
  timeline: string;
  process: {
    research: string;
    wireframe: string;
    ui: string;
    outcome: string;
  };
}

export interface WorkItem {
  id: string;
  title: string;
  subtitle: string; // The "secondary title"
  category: 'UI/UX' | 'Motion' | 'Video' | 'Product';
  type: 'image' | 'solid-color'; // To determine rendering style
  bgColor?: string; // For solid color blocks (e.g., Airbnb Red, Seattle Green)
  textColor?: string; // Text color for the graphic blocks
  image?: string;
  customContent?: React.ReactNode; // For text-based graphics like "Seattle Design Festival"
}

export interface GraphicItem {
  id: string;
  title: string;
  type: string;
  image: string;
  aspectRatio: 'square' | 'portrait' | 'landscape';
}

export interface MotionItem {
  id: string;
  title: string;
  videoUrl?: string; // Using images for demo, but logic supports video
  placeholder: string;
}

export interface VideoItem {
  id: string;
  title: string;
  subtitle: string;
  thumbnail: string;
  duration: string;
}
