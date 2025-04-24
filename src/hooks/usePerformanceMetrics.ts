
import { useEffect, useRef } from 'react';
import metricsService from '@/services/metricsService';

export function usePerformanceMetrics(componentName: string) {
  const renderStartTime = useRef(performance.now());
  
  useEffect(() => {
    const renderTime = (performance.now() - renderStartTime.current) / 1000;
    metricsService.recordComponentRenderTime(componentName, renderTime);
    
    return () => {
      // Can add cleanup metrics here if needed
    };
  }, [componentName]);
}
