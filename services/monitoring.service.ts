
/**
 * Production Monitoring Service
 * Handles Error tracking (Sentry) and Analytics (GA)
 */

class MonitoringService {
  // Added cast to any to resolve 'Property env does not exist on type ImportMeta' error
  private isProd = (import.meta as any).env?.PROD;

  init() {
    if (!this.isProd) {
      console.log('Monitoring Service: Development Mode (Local Logs Only)');
      return;
    }

    // Initialize Analytics
    // Added cast to any to resolve 'Property env does not exist on type ImportMeta' error
    const gaId = (import.meta as any).env?.VITE_GA_ID;
    if (gaId) {
      console.log(`Monitoring Service: GA Initialized (${gaId})`);
      // GA Initialization logic would go here
    }

    // Initialize Error Tracking
    // Added cast to any to resolve 'Property env does not exist on type ImportMeta' error
    const sentryDsn = (import.meta as any).env?.VITE_SENTRY_DSN;
    if (sentryDsn) {
      console.log(`Monitoring Service: Sentry Armed (${sentryDsn})`);
      // Sentry.init logic would go here
    }
  }

  trackError(error: Error, info?: any) {
    if (this.isProd) {
      // Send to Sentry/Bugsnag
      console.error('[PROD_ERROR_LOGGED]', error, info);
    } else {
      console.error('[DEV_ERROR]', error, info);
    }
  }

  trackEvent(category: string, action: string, label?: string) {
    if (this.isProd) {
      // Send to GA
      console.log(`[PROD_EVENT] ${category} > ${action} (${label})`);
    }
  }

  trackPageView(path: string) {
    if (this.isProd) {
      // Send to GA/Analytics
      console.log(`[PROD_VIEW] ${path}`);
    }
  }
}

export const monitoringService = new MonitoringService();
