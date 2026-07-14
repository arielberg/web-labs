/**
 * Web Labs site ↔ voip-v3 telephony-api (production)
 *
 * Public surface on :8443 (nginx allowlist): /health, /api/sessions*, /api/chat/turn
 * Talk (WebRTC) and outbound "call me" are not public yet — UI shows clear errors / inbound only.
 *
 * Override at runtime if needed:
 *   window.WEB_LABS_CONFIG = { apiBase: 'https://...' }
 *
 * Prod also needs CORS_ORIGINS to include this site's origin.
 */
window.WEB_LABS_CONFIG = Object.assign(
  {
    apiBase: 'https://151-145-92-212.sslip.io:8443',
    companyPhone: '077-2200005',
    companyPhoneE164: '972772200005',
    inboundDid: '03-374-1324',
    inboundDidE164: '97233741324',
    email: 'info@web-labs.com',
    defaultAgentId: 'shiri',
    defaultFlow: 'lead',
    webrtcUserId: 'shiri',
    demoMode: false,
    /** Public API today: chat (+ sessions). Talk/outbound wait for backend allowlist. */
    features: {
      chat: true,
      talk: false,
      outbound: false,
    },
  },
  window.WEB_LABS_CONFIG || {}
);
