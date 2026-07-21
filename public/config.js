/**
 * Web Labs site ↔ voip-v3 telephony-api (production)
 *
 * Locally (astro dev) we proxy via /telephony to avoid CORS.
 * Override at runtime if needed:
 *   window.WEB_LABS_CONFIG = { apiBase: 'https://...' }
 */
(function () {
  const host = typeof location !== 'undefined' ? location.hostname : '';
  const isLocalDev =
    host === 'localhost' ||
    host === '127.0.0.1' ||
    host.startsWith('10.') ||
    host.endsWith('.local');

  window.WEB_LABS_CONFIG = Object.assign(
    {
      apiBase: isLocalDev ? '/telephony' : 'https://162-35-181-76.sslip.io:8443',
      companyPhone: '077-2200005',
      companyPhoneE164: '972772200005',
      inboundDid: '03-374-1324',
      inboundDidE164: '97233741324',
      email: 'info@web-labs.com',
      defaultAgentId: 'shiri',
      defaultFlow: 'lead',
      webrtcUserId: 'shiri',
      demoMode: false,
      features: {
        chat: true,
        talk: true,
        outbound: false,
      },
      heroSloganDelayMs: 600,
      heroMicDelayMs: 1600,
      heroEncourageEveryMs: 8000,
    },
    window.WEB_LABS_CONFIG || {}
  );
})();
