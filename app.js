(() => {
  const CFG = window.WEB_LABS_CONFIG;
  const apiBase = () => (CFG.apiBase || '').replace(/\/$/, '');

  const i18n = {
    he: {
      'cta.talk': 'דבר',
      'cta.chat': 'צ׳אט',
      'cta.phone': 'טלפון',
      'hero.slogan': 'המערכת שלך מתחילה כאן',
      'chat.eyebrow': 'צ׳אט',
      'chat.placeholder': 'כתבו בצ׳אט…',
      'chat.send': 'שלח',
      'chat.welcome': 'שלום, אני מאיה מ־Web Labs. איך אפשר לעזור?',
      'talk.connecting': 'מתחבר…',
      'talk.live': 'בשיחה — לחצו שוב לניתוק',
      'talk.demo': 'הדגמה — מיקרופון פעיל. לחצו שוב לניתוק',
      'talk.ended': 'השיחה הסתיימה',
      'talk.unavailable': 'שיחת קול לא זמינה כרגע. נסו צ׳אט או התקשרו אלינו.',
      'chat.error': 'לא הצלחתי לקבל מענה כרגע. נסו שוב.',
      'phone.eyebrow': 'טלפון',
      'phone.tab.out': 'התקשרו אליי',
      'phone.tab.in': 'אני אתקשר',
      'phone.name': 'שם',
      'phone.number': 'מספר טלפון',
      'phone.notes': 'הערות (אופציונלי)',
      'phone.notesPh': 'במה נוכל לעזור?',
      'phone.requestOut': 'בקשו שהסוכן יתקשר',
      'phone.outboundDisabled': 'בקשת שיחה יוצאת עדיין לא זמינה מהאתר. התקשרו אלינו או השתמשו בצ׳אט.',
      'phone.inboundLead': 'התקשרו למספר המשרד — שירי / מאיה יענו.',
      'phone.officeLine': 'קו משרד',
      'phone.mainLine': 'קו ראשי',
      'phone.queued': 'הבקשה נשלחה. הסוכן יתקשר בקרוב.',
      'phone.demoQueued': 'הבקשה נשמרה במצב הדגמה.',
      'phone.badPhone': 'נא להזין מספר טלפון תקין.',
      'phone.error': 'לא הצלחנו לשלוח את הבקשה. נסו שוב מאוחר יותר.',
      'about.eyebrow': 'עלינו',
      'about.title': 'Architecture. Intelligence. Trust.',
      'about.lead': 'Web Labs מתמחה בארכיטקטורת פתרונות חדשנית ומתקדמת.\nדברו איתנו!',
      'footer.copy': 'Architecture. Intelligence. Trust.',
      'status.ready': 'מוכן',
      'status.live': 'פעיל',
      'status.demo': 'הדגמה',
      'status.error': 'שגיאה',
      'status.offline': 'לא מחובר',
    },
    en: {
      'cta.talk': 'Talk',
      'cta.chat': 'Chat',
      'cta.phone': 'Phone',
      'hero.slogan': 'Your system starts here',
      'chat.eyebrow': 'Chat',
      'chat.placeholder': 'Write in chat…',
      'chat.send': 'Send',
      'chat.welcome': 'Hi — I’m Maya from Web Labs. How can I help?',
      'talk.connecting': 'Connecting…',
      'talk.live': 'On call — tap again to hang up',
      'talk.demo': 'Demo — mic on. Tap again to hang up',
      'talk.ended': 'Call ended',
      'talk.unavailable': 'Voice call is unavailable right now. Try chat or call us.',
      'chat.error': 'Could not get a reply right now. Please try again.',
      'phone.eyebrow': 'Phone',
      'phone.tab.out': 'Call me',
      'phone.tab.in': 'I’ll call',
      'phone.name': 'Name',
      'phone.number': 'Phone number',
      'phone.notes': 'Notes (optional)',
      'phone.notesPh': 'What can we help with?',
      'phone.requestOut': 'Have the agent call me',
      'phone.outboundDisabled': 'Outbound call-me is not available from the site yet. Call us or use chat.',
      'phone.inboundLead': 'Call the office line — Shiri / Maya will answer.',
      'phone.officeLine': 'Office line',
      'phone.mainLine': 'Main line',
      'phone.queued': 'Request sent. The agent will call shortly.',
      'phone.demoQueued': 'Saved in demo mode.',
      'phone.badPhone': 'Please enter a valid phone number.',
      'phone.error': 'Could not send the request. Please try again later.',
      'about.eyebrow': 'About',
      'about.title': 'Architecture. Intelligence. Trust.',
      'about.lead': 'Web Labs specializes in innovative, advanced solution architecture.\nTalk to us!',
      'footer.copy': 'Architecture. Intelligence. Trust.',
      'status.ready': 'Ready',
      'status.live': 'Live',
      'status.demo': 'Demo',
      'status.error': 'Error',
      'status.offline': 'Offline',
    },
  };

  let lang = 'he';

  function t(key) {
    return (i18n[lang] && i18n[lang][key]) || i18n.he[key] || key;
  }

  function applyI18n() {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder')));
    });
    document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
      el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria')));
    });
    document.documentElement.lang = lang === 'he' ? 'he' : 'en';
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
    document.getElementById('langToggle').textContent = lang === 'he' ? 'EN' : 'עב';
  }

  async function api(path, options = {}) {
    const url = `${apiBase()}${path}`;
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const err = new Error(data.error || data.message || `HTTP ${res.status}`);
      err.status = res.status;
      err.data = data;
      throw err;
    }
    return data;
  }

  const heroChat = document.getElementById('panel-chat');
  const heroPhone = document.getElementById('panel-phone');
  const heroTalkBtn = document.getElementById('heroTalkBtn');
  const talkHint = document.getElementById('talkHint');
  const chatLog = document.getElementById('chatLog');
  const chatStatus = document.getElementById('chatStatus');
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');

  const menuToggle = document.getElementById('menuToggle');
  const modeStrip = document.getElementById('modeStrip');
  let currentMode = 'chat';

  function featureEnabled(name) {
    return CFG.features?.[name] !== false;
  }

  function setMenuOpen(open) {
    document.body.classList.toggle('menu-open', open);
    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    modeStrip.setAttribute('aria-hidden', open ? 'false' : 'true');
    if (open) modeStrip.removeAttribute('inert');
    else modeStrip.setAttribute('inert', '');
    document.getElementById('topTools').setAttribute('aria-hidden', open ? 'false' : 'true');
  }

  function applyFeatureVisibility() {
    document.querySelectorAll('.mode-strip__btn[data-mode]').forEach((btn) => {
      const mode = btn.getAttribute('data-mode');
      if (mode === 'talk') {
        btn.hidden = !featureEnabled('talk');
        btn.toggleAttribute('inert', !featureEnabled('talk'));
      }
    });
    if (!featureEnabled('talk')) {
      heroTalkBtn.hidden = true;
      heroTalkBtn.classList.add('is-hidden');
      talkHint.hidden = true;
      talkHint.textContent = '';
    }
    if (!featureEnabled('outbound')) {
      const outBtn = document.querySelector('.tabs__btn[data-tab="outbound"]');
      const inBtn = document.querySelector('.tabs__btn[data-tab="inbound"]');
      if (outBtn && inBtn) {
        outBtn.hidden = true;
        outBtn.classList.remove('is-active');
        outBtn.setAttribute('aria-selected', 'false');
        inBtn.classList.add('is-active');
        inBtn.setAttribute('aria-selected', 'true');
        outboundForm.classList.remove('is-active');
        inboundPane.classList.add('is-active');
      }
    }
  }

  function setMode(mode) {
    if (mode === 'talk' && !featureEnabled('talk')) {
      mode = 'chat';
    }
    currentMode = mode;

    document.querySelectorAll('.mode-strip__btn[data-mode]').forEach((btn) => {
      const on = btn.getAttribute('data-mode') === mode;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-selected', on ? 'true' : 'false');
    });

    const chatOpen = mode === 'chat';
    const phoneOpen = mode === 'phone';
    const showMic = mode === 'talk' && featureEnabled('talk');
    const aboutOpen = mode === 'about';

    heroChat.classList.toggle('is-open', chatOpen);
    heroChat.hidden = !chatOpen;
    heroPhone.classList.toggle('is-open', phoneOpen);
    heroPhone.hidden = !phoneOpen;

    heroTalkBtn.hidden = !showMic;
    heroTalkBtn.classList.toggle('is-hidden', !showMic);
    talkHint.hidden = !showMic || !talkHint.textContent;

    setMenuOpen(false);

    if (aboutOpen) {
      document.getElementById('about').scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (chatOpen) {
      heroChat.classList.add('is-focus');
      setTimeout(() => chatInput.focus(), 200);
    } else if (phoneOpen) {
      heroPhone.classList.add('is-focus');
    }
  }

  const chatState = {
    sessionId: null,
    channelId: null,
    token: null,
    mode: 'idle',
    history: [],
    node: 'greet',
  };

  function addBubble(text, who) {
    const el = document.createElement('div');
    el.className = `bubble bubble--${who}`;
    el.textContent = text;
    chatLog.appendChild(el);
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  function setChatStatus(key, cls) {
    chatStatus.textContent = t(key);
    chatStatus.className = `status-pill${cls ? ` ${cls}` : ''}`;
  }

  async function ensureChatSession() {
    if (chatState.sessionId) return;
    const created = await api('/api/sessions', {
      method: 'POST',
      body: JSON.stringify({
        agent_id: CFG.defaultAgentId,
        flow_name: CFG.defaultFlow,
        context: { source: 'web-labs-site', channel: 'chat' },
      }),
    });
    const sessionId = created.session?.session_id || created.session_id;
    const joined = await api('/api/sessions/join', {
      method: 'POST',
      body: JSON.stringify({
        join_method: 'session_id',
        join_key: sessionId,
        channel_type: 'chat',
        role: 'end_user',
      }),
    });
    chatState.sessionId = joined.session_id || sessionId;
    chatState.channelId = joined.channel_id;
    chatState.token = joined.token;
    chatState.mode = 'live';
    setChatStatus('status.live', 'is-live');
  }

  async function sendChat(text) {
    addBubble(text, 'user');

    const thinking = document.createElement('div');
    thinking.className = 'bubble bubble--agent bubble--thinking';
    thinking.textContent = lang === 'he' ? 'כותבת…' : 'Typing…';
    chatLog.appendChild(thinking);
    chatLog.scrollTop = chatLog.scrollHeight;
    chatInput.disabled = true;

    try {
      try {
        await ensureChatSession();
      } catch {
        /* chat/turn can still work without a prior session */
      }
      const data = await api('/api/chat/turn', {
        method: 'POST',
        body: JSON.stringify({
          message: text,
          lang,
          agent_id: CFG.defaultAgentId,
          flow_name: CFG.defaultFlow,
          session_id: chatState.sessionId || undefined,
          history: chatState.history || [],
        }),
      });
      thinking.remove();
      const reply = String(data.text || '').trim();
      if (reply) {
        addBubble(reply, 'agent');
        chatState.history = [
          ...(chatState.history || []),
          { user: text, assistant: reply },
        ].slice(-12);
        if (data.next_node) chatState.node = data.next_node;
        if (data.session_id) chatState.sessionId = data.session_id;
        setChatStatus('status.live', 'is-live');
        chatState.mode = 'live';
        return;
      }
      addBubble(t('chat.error'), 'agent');
      setChatStatus('status.error', 'is-error');
    } catch {
      thinking.remove();
      addBubble(t('chat.error'), 'agent');
      setChatStatus('status.error', 'is-error');
      chatState.mode = 'idle';
    } finally {
      chatInput.disabled = false;
      chatInput.focus();
    }
  }

  /* ---------- WebRTC talk (SIP.js → Asterisk WSS) ---------- */
  const remoteAudio = document.getElementById('remoteAudio');
  let talkActive = false;

  const rtc = {
    simpleUser: null,
    sessionId: null,
    mode: null,
  };

  function setTalkHint(key) {
    if (!key) {
      talkHint.textContent = '';
      talkHint.hidden = true;
      return;
    }
    talkHint.textContent = t(key);
    talkHint.hidden = heroTalkBtn.hidden;
  }

  async function cleanupRtc() {
    const user = rtc.simpleUser;
    rtc.simpleUser = null;
    rtc.sessionId = null;
    talkActive = false;
    heroTalkBtn.classList.remove('is-live');
    if (!user) return;
    try {
      await user.hangup().catch(() => {});
    } catch {
      /* ignore */
    }
    try {
      await user.unregister().catch(() => {});
    } catch {
      /* ignore */
    }
    try {
      await user.disconnect().catch(() => {});
    } catch {
      /* ignore */
    }
  }

  async function loadSipSimpleUser() {
    const urls = [
      'https://cdn.jsdelivr.net/npm/sip.js@0.21.2/lib/platform/web/simple-user/simple-user.js/+esm',
      'https://cdn.jsdelivr.net/npm/sip.js@0.21.2/lib/platform/web/index.js/+esm',
    ];
    let lastErr;
    for (const url of urls) {
      try {
        const mod = await import(url);
        const SimpleUser = mod.SimpleUser || mod.default?.SimpleUser || mod.default;
        if (typeof SimpleUser === 'function') return SimpleUser;
      } catch (err) {
        lastErr = err;
      }
    }
    throw lastErr || new Error('sipjs_unavailable');
  }

  async function startLiveWebRtc() {
    const userId = encodeURIComponent(CFG.webrtcUserId || CFG.defaultAgentId);
    const statusRes = await fetch(`${apiBase()}/api/public/web-call/${userId}/status`);
    if (statusRes.status === 404 || statusRes.status === 503 || !statusRes.ok) {
      const err = new Error('webrtc unavailable');
      err.status = statusRes.status;
      throw err;
    }
    const sessionRes = await fetch(`${apiBase()}/api/public/web-call/${userId}/session`, {
      method: 'POST',
    });
    if (!sessionRes.ok) {
      const err = new Error('session failed');
      err.status = sessionRes.status;
      throw err;
    }
    const session = await sessionRes.json();
    if (session.mode !== 'sipjs' || !session.wsUrl || !session.sipPassword) {
      const err = new Error('unexpected session mode');
      err.status = 503;
      throw err;
    }

    const SimpleUser = await loadSipSimpleUser();
    if (!SimpleUser) throw new Error('sipjs_unavailable');

    const domain = session.sipDomain || new URL(apiBase()).hostname;
    const sipUser = session.sipUser || 'weblabs_guest';
    const aor = session.sipUri || `sip:${sipUser}@${domain}`;
    const dial = session.dial || 'weblabs';
    const target = dial.includes('@') ? dial : `sip:${dial}@${domain}`;

    const simpleUser = new SimpleUser(session.wsUrl, {
      aor,
      media: {
        constraints: { audio: true, video: false },
        remote: { audio: remoteAudio },
      },
      userAgentOptions: {
        authorizationUsername: sipUser,
        authorizationPassword: session.sipPassword,
        sessionDescriptionHandlerFactoryOptions: {
          peerConnectionConfiguration: {
            iceServers: session.iceServers || [{ urls: 'stun:stun.l.google.com:19302' }],
          },
        },
      },
    });

    rtc.simpleUser = simpleUser;
    rtc.sessionId = session.sessionId;
    rtc.mode = 'sipjs';

    simpleUser.delegate = {
      onCallHangup: () => {
        hangupTalk();
      },
      onServerDisconnect: () => {
        hangupTalk();
      },
    };

    await simpleUser.connect();
    await simpleUser.register();
    await simpleUser.call(target);
  }

  async function startTalk() {
    if (!featureEnabled('talk')) {
      setMode('chat');
      return;
    }
    heroTalkBtn.disabled = true;
    setTalkHint('talk.connecting');
    try {
      await startLiveWebRtc();
      setTalkHint('talk.live');
      talkActive = true;
      heroTalkBtn.classList.add('is-live');
    } catch (err) {
      console.warn('[talk] failed', err);
      await cleanupRtc();
      setTalkHint(
        err?.status === 404 || err?.status === 503 ? 'talk.unavailable' : 'status.error'
      );
    }
    heroTalkBtn.disabled = false;
  }

  function hangupTalk() {
    cleanupRtc();
    setTalkHint('talk.ended');
  }

  /* ---------- Phone ---------- */
  const phoneStatus = document.getElementById('phoneStatus');
  const outboundForm = document.getElementById('outboundForm');
  const outboundNote = document.getElementById('outboundNote');
  const inboundPane = document.getElementById('inboundPane');

  function setPhoneStatus(key, cls) {
    phoneStatus.textContent = t(key);
    phoneStatus.className = `status-pill${cls ? ` ${cls}` : ''}`;
  }

  function normalizePhone(raw) {
    const digits = String(raw || '').replace(/\D/g, '');
    if (digits.length < 9) return null;
    if (digits.startsWith('972')) return digits;
    if (digits.startsWith('0')) return `972${digits.slice(1)}`;
    return digits;
  }

  async function requestOutbound(ev) {
    ev.preventDefault();
    if (!featureEnabled('outbound')) {
      outboundNote.textContent = t('phone.outboundDisabled');
      outboundNote.className = 'form-note is-err';
      setPhoneStatus('status.error', 'is-error');
      return;
    }
    const fd = new FormData(outboundForm);
    const name = String(fd.get('name') || '').trim();
    const phone = normalizePhone(fd.get('phone'));
    const notes = String(fd.get('notes') || '').trim();
    outboundNote.className = 'form-note';

    if (!phone) {
      outboundNote.textContent = t('phone.badPhone');
      outboundNote.classList.add('is-err');
      return;
    }

    try {
      await api('/api/outbound-calls', {
        method: 'POST',
        body: JSON.stringify({
          to_number: phone,
          agent_id: CFG.defaultAgentId,
          flow_name: CFG.defaultFlow || 'lead',
          callee_name: name,
          prior_knowledge: {
            source: 'web-labs-site',
            notes,
            lang,
          },
        }),
      });
      outboundNote.textContent = t('phone.queued');
      outboundNote.classList.add('is-ok');
      setPhoneStatus('status.live', 'is-live');
      outboundForm.reset();
    } catch {
      outboundNote.textContent = t('phone.error');
      outboundNote.classList.add('is-err');
      setPhoneStatus('status.error', 'is-error');
    }
  }

  function setupTabs() {
    const buttons = document.querySelectorAll('.tabs__btn');
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        buttons.forEach((b) => {
          const on = b === btn;
          b.classList.toggle('is-active', on);
          b.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        outboundForm.classList.toggle('is-active', tab === 'outbound');
        inboundPane.classList.toggle('is-active', tab === 'inbound');
      });
    });
  }

  /* ---------- Wire UI ---------- */
  document.getElementById('langToggle').addEventListener('click', () => {
    lang = lang === 'he' ? 'en' : 'he';
    applyI18n();
    if (!chatLog.children.length) addBubble(t('chat.welcome'), 'agent');
    else if (chatLog.children.length === 1) {
      chatLog.innerHTML = '';
      addBubble(t('chat.welcome'), 'agent');
    }
    if (talkActive) {
      setTalkHint('talk.live');
    }
    setChatStatus(
      chatState.mode === 'live' ? 'status.live' : 'status.ready',
      chatState.mode === 'live' ? 'is-live' : ''
    );
  });

  menuToggle.addEventListener('click', () => {
    setMenuOpen(!document.body.classList.contains('menu-open'));
  });

  modeStrip.addEventListener('click', (ev) => {
    if (ev.target === modeStrip) setMenuOpen(false);
  });

  document.querySelectorAll('.mode-strip__btn[data-mode]').forEach((btn) => {
    btn.addEventListener('click', () => setMode(btn.getAttribute('data-mode')));
  });

  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape' && document.body.classList.contains('menu-open')) {
      setMenuOpen(false);
    }
  });

  heroTalkBtn.addEventListener('click', () => {
    if (!featureEnabled('talk')) {
      setMode('chat');
      return;
    }
    if (currentMode !== 'talk') setMode('talk');
    if (talkActive) hangupTalk();
    else startTalk();
  });

  chatForm.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;
    chatInput.value = '';
    await sendChat(text);
  });

  outboundForm.addEventListener('submit', requestOutbound);

  async function probeApiHealth() {
    try {
      const res = await fetch(`${apiBase()}/health`, { method: 'GET' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setChatStatus('status.ready', '');
      setPhoneStatus('status.ready', '');
    } catch {
      setChatStatus('status.offline', 'is-error');
      setPhoneStatus('status.offline', 'is-error');
    }
  }

  setupTabs();
  applyFeatureVisibility();
  applyI18n();
  setMode('chat');
  addBubble(t('chat.welcome'), 'agent');
  probeApiHealth();

  document.getElementById('inboundDial').href = `tel:+${CFG.inboundDidE164}`;
  document.querySelector('#inboundDial .dial-card__number').textContent = CFG.inboundDid;
  document.querySelector('.dial-card--alt').href = `tel:+${CFG.companyPhoneE164}`;
  document.querySelector('.dial-card--alt .dial-card__number').textContent = CFG.companyPhone;
})();
