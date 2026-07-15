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
    logos: {
      1: { mp4: 'logo-1.mp4', poster: 'logo-1.png', label: '1' },
      4: { mp4: 'logo-4.mp4', poster: 'logo-4.png', label: '4' },
      5: { mp4: 'logo-5.mp4', poster: 'logo-5.png', label: '5' },
      6: { mp4: 'logo-6.mp4', poster: 'logo-6.png', label: '6' },
      7: { mp4: 'logo-7.mp4', poster: 'logo-7.png', label: '7' },
      8: { mp4: 'logo-8.mp4', poster: 'logo-8.png', label: '8' },
      9: { mp4: 'logo.mp4', poster: 'logo.png', label: '9' },
    },
    defaultLogo: '9',
    logoDurationSec: 2,
    logoLoop: false,
    heroSloganDelayMs: 2000,
    heroMicDelayMs: 3200,
    heroEncourageEveryMs: 8000,
  },
  window.WEB_LABS_CONFIG || {}
);
