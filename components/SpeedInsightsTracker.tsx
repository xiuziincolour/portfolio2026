import { SpeedInsights } from '@vercel/speed-insights/react';
import { useLocation } from 'react-router-dom';

const SpeedInsightsTracker: React.FC = () => {
  const { pathname } = useLocation();
  return <SpeedInsights route={pathname} />;
};

export default SpeedInsightsTracker;
