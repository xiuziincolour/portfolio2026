import React from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import CaseStudy from '../components/CaseStudy';
import JargonCaseStudy from '../components/JargonCaseStudy';
import JargonMerchPage from '../components/JargonMerchPage';
import GraphicsEmagPage from '../components/GraphicsEmagPage';
import GraphicMenuPage from '../components/GraphicMenuPage';
import GraphicCansPage from '../components/GraphicCansPage';

/** Project IDs that have a dedicated detail page */
export const PROJECT_IDS = ['w1', 'w2', 'w3', 'w4', 'w6', 'w7'] as const;

export function hasProjectPage(id: string): boolean {
  return PROJECT_IDS.includes(id as (typeof PROJECT_IDS)[number]);
}

export function getProjectPath(id: string): string {
  return `/project/${id}`;
}

const PROJECT_COMPONENTS: Record<string, React.ComponentType<{ onBack: () => void }>> = {
  w1: CaseStudy,
  w2: JargonCaseStudy,
  w3: JargonMerchPage,
  w4: GraphicCansPage,
  w6: GraphicMenuPage,
  w7: GraphicsEmagPage,
};

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  if (!id || !PROJECT_COMPONENTS[id]) {
    return <Navigate to="/" replace />;
  }
  const Component = PROJECT_COMPONENTS[id];
  return <Component onBack={() => navigate('/', { state: { scrollTo: 'work' } })} />;
}
