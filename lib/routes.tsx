import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useGoBack } from './useGoBack';
import CaseStudy from '../components/CaseStudy';
import JargonCaseStudy from '../components/JargonCaseStudy';
import JargonMerchPage from '../components/JargonMerchPage';
import GraphicsEmagPage from '../components/GraphicsEmagPage';
import GraphicMenuPage from '../components/GraphicMenuPage';
import GraphicCansPage from '../components/GraphicCansPage';

/** Work IDs that have a dedicated detail page */
export const PROJECT_IDS = ['w1', 'w2', 'w3', 'w4', 'w6', 'w7'] as const;

/** URL slugs keyed by work id */
export const PROJECT_SLUGS: Record<(typeof PROJECT_IDS)[number], string> = {
  w1: 'linko',
  w2: 'jargon',
  w3: 'jargon-merch',
  w4: 'cans',
  w6: 'toastico-menu',
  w7: 'drive-the-dream',
};

export function hasProjectPage(id: string): boolean {
  return PROJECT_IDS.includes(id as (typeof PROJECT_IDS)[number]);
}

export function getProjectPath(id: string): string {
  const slug = PROJECT_SLUGS[id as (typeof PROJECT_IDS)[number]];
  return `/project/${slug ?? id}`;
}

const PROJECT_COMPONENTS: Record<string, React.ComponentType<{ onBack: () => void }>> = {
  linko: CaseStudy,
  jargon: JargonCaseStudy,
  'jargon-merch': JargonMerchPage,
  cans: GraphicCansPage,
  'toastico-menu': GraphicMenuPage,
  'drive-the-dream': GraphicsEmagPage,
};

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const goBack = useGoBack('/', { scrollTo: 'work' });

  // Redirect legacy /project/w1 URLs to named slugs
  if (id && id in PROJECT_SLUGS) {
    return <Navigate to={`/project/${PROJECT_SLUGS[id as (typeof PROJECT_IDS)[number]]}`} replace />;
  }

  if (!id || !PROJECT_COMPONENTS[id]) {
    return <Navigate to="/" replace />;
  }

  const Component = PROJECT_COMPONENTS[id];
  return <Component onBack={goBack} />;
}
