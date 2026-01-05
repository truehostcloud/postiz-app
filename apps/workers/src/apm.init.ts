/* Elastic APM initializer for workers
   This file should be imported as early as possible (see main.ts).
*/
/* eslint-disable @typescript-eslint/no-var-requires */
/* istanbul ignore file */
const apm = require('elastic-apm-node').start({
  serviceName: process.env.ELASTIC_APM_SERVICE_NAME || 'postiz-workers',
  serverUrl: process.env.ELASTIC_APM_SERVER_URL,
  environment: process.env.NODE_ENV || 'production',
  captureExceptions: true,
  captureSpanStackTraces: true,
  captureBody: 'errors',
  centralConfig: true,
  metricsInterval: '30s',
});

module.exports = apm;
