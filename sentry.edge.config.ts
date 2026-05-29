import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://09fb043843a3ce66af54f0cd20b85dda@o4511471472869376.ingest.us.sentry.io/4511471475884032',
  tracesSampleRate: 1,
  sendDefaultPii: true,
});
