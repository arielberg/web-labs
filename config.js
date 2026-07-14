/**
 * Web Labs site ↔ voip-v3 telephony-api
 *
 * Chat / outbound use this base. Override at runtime if needed:
 *   window.WEB_LABS_CONFIG = { apiBase: 'https://...' }
 */
window.WEB_LABS_CONFIG = Object.assign(
  {
    apiBase: 'http://127.0.0.1:8092',
    companyPhone: '077-2200005',
    companyPhoneE164: '972772200005',
    inboundDid: '03-374-1324',
    inboundDidE164: '97233741324',
    email: 'info@web-labs.com',
    defaultAgentId: 'shiri',
    defaultFlow: 'lead',
    webrtcUserId: 'shiri',
    // Chat talks to V3 sessions API; demo only if the API is down
    demoMode: true,
  },
  window.WEB_LABS_CONFIG || {}
);
