/* Elastic APM RUM initializer for the Next.js frontend.
   This module is dynamically imported on client-side when
   `NEXT_PUBLIC_ELASTIC_APM_SERVER_URL` is present.
*/
/* istanbul ignore file */
import { init as initApm } from '@elastic/apm-rum';

if (typeof window !== 'undefined') {
  try {
    initApm({
      serviceName: process.env.NEXT_PUBLIC_ELASTIC_APM_SERVICE_NAME || 'postiz-frontend',
      serverUrl: process.env.ELASTIC_APM_SERVER_URL,
      environment: process.env.NEXT_PUBLIC_NODE_ENV || process.env.NODE_ENV || 'production',
      pageLoadTransactionName: 'route-change',
      breakdownMetrics: true,
      distributedTracingOrigins: [process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000', 'http://localhost:4200'],
    });
    // eslint-disable-next-line no-console
    console.info('Elastic APM RUM initialized');
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('Failed to initialize Elastic APM RUM', e);
  }
}
