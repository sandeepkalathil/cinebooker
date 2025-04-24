
import metricsService from './metricsService';

/**
 * Middleware function to measure API request duration and record metrics
 */
export const apiMetricsMiddleware = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    const endpoint = req.path;
    const method = req.method;
    
    // Original send function
    const originalSend = res.send;
    
    // Override send function to capture response time
    res.send = function(...args: unknown[]) {
      const duration = (Date.now() - start) / 1000;
      const status = res.statusCode.toString();
      
      // Record API request duration
      metricsService.recordApiRequestDuration(endpoint, method, status, duration);
      
      // If there's an error, record it
      if (res.statusCode >= 400) {
        metricsService.recordRequestError(endpoint, `HTTP_${status}`);
      }
      
      // Call original send function
      return originalSend.apply(res, args);
    };
    
    next();
  };
};

// Define the types for Express request, response, and next function
type Request = {
  path: string;
  method: string;
  [key: string]: unknown;
};

type Response = {
  statusCode: number;
  send: (...args: unknown[]) => unknown;
  [key: string]: unknown;
};

type NextFunction = () => void;
