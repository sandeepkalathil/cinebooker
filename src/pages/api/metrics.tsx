import React, { useEffect, useState } from 'react';
import metricsService from '@/services/metricsService';

const MetricsEndpoint: React.FC = () => {
  const [metrics, setMetrics] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const metricsData = await metricsService.getMetrics();
        setMetrics(metricsData);
      } catch (error) {
        console.error('Error fetching metrics:', error);
        setMetrics('Error fetching metrics');
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  // This component renders plain text metrics in Prometheus format
  // It's meant to be accessed programmatically, not viewed in a browser
  return (
    <pre style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
      {loading ? 'Loading metrics...' : metrics}
    </pre>
  );
};

export default MetricsEndpoint;