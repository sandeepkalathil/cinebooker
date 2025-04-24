
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import metricsService from '@/services/metricsService';

export function usePageViewMetrics() {
  const location = useLocation();
  
  useEffect(() => {
    // Record page view
    metricsService.recordPageView(location.pathname);
  }, [location]);
}
