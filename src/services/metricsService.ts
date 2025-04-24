
// Browser-compatible metrics service
// Instead of using prom-client which requires Node.js process object,
// we'll implement a simpler metrics collection approach

class MetricsService {
  private static instance: MetricsService;
  
  // Store metrics in memory
  private metrics: {
    pageViews: { [route: string]: number };
    apiRequestDurations: { endpoint: string; method: string; status: string; duration: number }[];
    activeUserSessions: number;
    requestErrors: { route: string; errorType: string }[];
    movieBookings: { movieId: string; theaterId: string }[];
    appLoadTime: number[];
    componentRenderTimes: { component: string; duration: number }[];
  };

  private constructor() {
    this.metrics = {
      pageViews: {},
      apiRequestDurations: [],
      activeUserSessions: 0,
      requestErrors: [],
      movieBookings: [],
      appLoadTime: [],
      componentRenderTimes: [],
    };
  }

  public static getInstance(): MetricsService {
    if (!MetricsService.instance) {
      MetricsService.instance = new MetricsService();
    }
    return MetricsService.instance;
  }

  // Record a page view for a specific route
  public recordPageView(route: string): void {
    if (!this.metrics.pageViews[route]) {
      this.metrics.pageViews[route] = 0;
    }
    this.metrics.pageViews[route]++;
    console.log(`Page view recorded for ${route}`);
  }

  // Record API request duration
  public recordApiRequestDuration(endpoint: string, method: string, status: string, duration: number): void {
    this.metrics.apiRequestDurations.push({ endpoint, method, status, duration });
    console.log(`API request recorded: ${method} ${endpoint} ${status} ${duration.toFixed(3)}s`);
  }

  // Update active user sessions count
  public setActiveUserSessions(count: number): void {
    this.metrics.activeUserSessions = count;
  }

  // Increment active user sessions
  public incrementActiveUserSessions(): void {
    this.metrics.activeUserSessions++;
    console.log(`Active sessions: ${this.metrics.activeUserSessions}`);
  }

  // Decrement active user sessions
  public decrementActiveUserSessions(): void {
    this.metrics.activeUserSessions--;
    if (this.metrics.activeUserSessions < 0) {
      this.metrics.activeUserSessions = 0;
    }
    console.log(`Active sessions: ${this.metrics.activeUserSessions}`);
  }

  // Record a request error
  public recordRequestError(route: string, errorType: string): void {
    this.metrics.requestErrors.push({ route, errorType });
    console.log(`Error recorded: ${route} ${errorType}`);
  }

  // Record a movie booking
  public recordMovieBooking(movieId: string, theaterId: string): void {
    this.metrics.movieBookings.push({ movieId, theaterId });
    console.log(`Booking recorded: Movie ${movieId} at Theater ${theaterId}`);
  }

  // Record app load time
  public recordAppLoadTime(duration: number): void {
    this.metrics.appLoadTime.push(duration);
    console.log(`App load time: ${duration.toFixed(3)}s`);
  }

  // Record component render time
  public recordComponentRenderTime(component: string, duration: number): void {
    this.metrics.componentRenderTimes.push({ component, duration });
    console.log(`Component render time: ${component} ${duration.toFixed(3)}s`);
  }

  // Format metrics in Prometheus format for compatibility
  private formatMetric(name: string, help: string, type: string, values: { labels?: Record<string, string>; value: number }[]): string {
    const lines = [
      `# HELP ${name} ${help}`,
      `# TYPE ${name} ${type}`
    ];

    values.forEach(({ labels, value }) => {
      if (labels && Object.keys(labels).length > 0) {
        const labelStr = Object.entries(labels)
          .map(([k, v]) => `${k}="${v}"`)
          .join(',');
        lines.push(`${name}{${labelStr}} ${value}`);
      } else {
        lines.push(`${name} ${value}`);
      }
    });

    return lines.join('\n') + '\n';
  }

  // Get metrics in Prometheus text format
  public async getMetrics(): Promise<string> {
    let result = '';

    // Page views
    const pageViewValues = Object.entries(this.metrics.pageViews).map(([route, count]) => ({
      labels: { route },
      value: count
    }));
    result += this.formatMetric(
      'cinebooker_page_views_total',
      'Total number of page views',
      'counter',
      pageViewValues
    );

    // Active sessions
    result += this.formatMetric(
      'cinebooker_active_user_sessions',
      'Number of active user sessions',
      'gauge',
      [{ value: this.metrics.activeUserSessions }]
    );

    // Request errors
    const errorsByType: Record<string, number> = {};
    this.metrics.requestErrors.forEach(({ errorType }) => {
      if (!errorsByType[errorType]) errorsByType[errorType] = 0;
      errorsByType[errorType]++;
    });
    
    const errorValues = Object.entries(errorsByType).map(([errorType, count]) => ({
      labels: { error_type: errorType },
      value: count
    }));
    
    result += this.formatMetric(
      'cinebooker_request_errors_total',
      'Total number of request errors',
      'counter',
      errorValues
    );

    // Movie bookings
    result += this.formatMetric(
      'cinebooker_movie_bookings_total',
      'Total number of movie bookings',
      'counter',
      [{ value: this.metrics.movieBookings.length }]
    );

    // App load time - use average
    const avgLoadTime = this.metrics.appLoadTime.length > 0
      ? this.metrics.appLoadTime.reduce((sum, time) => sum + time, 0) / this.metrics.appLoadTime.length
      : 0;
      
    result += this.formatMetric(
      'cinebooker_app_load_time_seconds',
      'Application load time in seconds',
      'gauge',
      [{ value: avgLoadTime }]
    );

    // Component render time
    const componentTimes: Record<string, { sum: number, count: number }> = {};
    this.metrics.componentRenderTimes.forEach(({ component, duration }) => {
      if (!componentTimes[component]) componentTimes[component] = { sum: 0, count: 0 };
      componentTimes[component].sum += duration;
      componentTimes[component].count++;
    });
    
    const componentAvgTimes = Object.entries(componentTimes).map(([component, { sum, count }]) => ({
      labels: { component },
      value: sum / count
    }));
    
    result += this.formatMetric(
      'cinebooker_component_render_time_seconds',
      'Component render time in seconds',
      'gauge',
      componentAvgTimes
    );

    return result;
  }
}

export default MetricsService.getInstance();
