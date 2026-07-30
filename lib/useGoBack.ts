import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Returns to whichever page the visitor came from. Falls back to a route when
 * the page was opened directly (shared link, new tab) and there is no history.
 */
export function useGoBack(fallback = '/', fallbackState?: unknown) {
  const navigate = useNavigate();

  return useCallback(() => {
    const idx = (window.history.state as { idx?: number } | null)?.idx ?? 0;
    if (idx > 0) {
      navigate(-1);
      return;
    }
    navigate(fallback, fallbackState ? { state: fallbackState } : undefined);
  }, [navigate, fallback, fallbackState]);
}
