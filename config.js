/**
 * Web Labs site ↔ voip-v3 telephony-api (production)
 *
 * Public surface on :8443: /health, /api/sessions*, /api/chat/turn,
 * /api/public/web-call/*, /asterisk-wss/ (SIP.js → Asterisk).
 *
 * Override at runtime if needed:
 *   window.WEB_LABS_CONFIG = { apiBase: 'https://...' }
 */
window.WEB_LABS_CONFIG = Object.assign(
  {
    apiBase: 'https://162-35-181-76.sslip.io:8443',
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
  },
  window.WEB_LABS_CONFIG || {}
);
