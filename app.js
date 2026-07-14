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
      'phone.eyebrow': 'טלפון',
      'phone.tab.out': 'התקשרו אליי',
      'phone.tab.in': 'אני אתקשר',
      'phone.name': 'שם',
      'phone.number': 'מספר טלפון',
      'phone.notes': 'הערות (אופציונלי)',
      'phone.notesPh': 'במה נוכל לעזור?',
      'phone.requestOut': 'בקשו שהסוכן יתקשר',
      'phone.inboundLead': 'התקשרו למספר המשרד — שירי / מאיה יענו.',
      'phone.officeLine': 'קו משרד',
      'phone.mainLine': 'קו ראשי',
      'phone.queued': 'הבקשה נשלחה. הסוכן יתקשר בקרוב.',
      'phone.demoQueued': 'הבקשה נשמרה במצב הדגמה.',
      'phone.badPhone': 'נא להזין מספר טלפון תקין.',
      'about.eyebrow': 'עלינו',
      'about.title': 'Architecture. Intelligence. Trust.',
      'about.lead': 'Web Labs מתמחה בארכיטקטורת פתרונות חדשנית ומתקדמת.\nדברו איתנו!',
      'footer.copy': 'Architecture. Intelligence. Trust.',
      'status.ready': 'מוכן',
      'status.live': 'פעיל',
      'status.demo': 'הדגמה',
      'status.error': 'שגיאה',
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
      'phone.eyebrow': 'Phone',
      'phone.tab.out': 'Call me',
      'phone.tab.in': 'I’ll call',
      'phone.name': 'Name',
      'phone.number': 'Phone number',
      'phone.notes': 'Notes (optional)',
      'phone.notesPh': 'What can we help with?',
      'phone.requestOut': 'Have the agent call me',
      'phone.inboundLead': 'Call the office line — Shiri / Maya will answer.',
      'phone.officeLine': 'Office line',
      'phone.mainLine': 'Main line',
      'phone.queued': 'Request sent. The agent will call shortly.',
      'phone.demoQueued': 'Saved in demo mode.',
      'phone.badPhone': 'Please enter a valid phone number.',
      'about.eyebrow': 'About',
      'about.title': 'Architecture. Intelligence. Trust.',
      'about.lead': 'Web Labs specializes in innovative, advanced solution architecture.\nTalk to us!',
      'footer.copy': 'Architecture. Intelligence. Trust.',
      'status.ready': 'Ready',
      'status.live': 'Live',
      'status.demo': 'Demo',
      'status.error': 'Error',
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
  let currentMode = 'talk';

  function setMenuOpen(open) {
    document.body.classList.toggle('menu-open', open);
    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    modeStrip.setAttribute('aria-hidden', open ? 'false' : 'true');
    if (open) modeStrip.removeAttribute('inert');
    else modeStrip.setAttribute('inert', '');
    document.getElementById('topTools').setAttribute('aria-hidden', open ? 'false' : 'true');
  }

  function setMode(mode) {
    currentMode = mode;

    document.querySelectorAll('.mode-strip__btn[data-mode]').forEach((btn) => {
      const on = btn.getAttribute('data-mode') === mode;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-selected', on ? 'true' : 'false');
    });

    const chatOpen = mode === 'chat';
    const phoneOpen = mode === 'phone';
    const showMic = mode === 'talk';
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

  const demoReplies = {
    he: [
      'Web Labs מתמחה בארכיטקטורת מערכות, AI, אבטחה ו־Salesforce.',
      'אפשר לדבר איתנו בקול (WebRTC) או לבקש שיחה טלפונית — מה נוח לכם?',
      'המנכ״ל הוא אריאל ברג. הסלוגן שלנו: Architecture. Intelligence. Trust.',
      'סוכני הקול שלנו עונים לשיחות, מתאמים פגישות ומעבירים לנציג במידת הצורך.',
    ],
    en: [
      'Web Labs specializes in enterprise architecture, AI, security, and Salesforce.',
      'You can talk by voice (WebRTC) or request a phone call — what works best?',
      'Our CEO is Ariel Berg. Our slogan: Architecture. Intelligence. Trust.',
      'Our voice agents answer calls, schedule meetings, and transfer to a human when needed.',
    ],
  };

  let demoIdx = 0;

  async function ensureChatSession() {
    if (chatState.sessionId) return;
    try {
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
    } catch {
      chatState.mode = 'demo';
      setChatStatus('status.demo', 'is-live');
    }
  }

  async function sendChat(text) {
    addBubble(text, 'user');
    await ensureChatSession();

    const thinking = document.createElement('div');
    thinking.className = 'bubble bubble--agent bubble--thinking';
    thinking.textContent = lang === 'he' ? 'כותבת…' : 'Typing…';
    chatLog.appendChild(thinking);
    chatLog.scrollTop = chatLog.scrollHeight;
    chatInput.disabled = true;

    try {
      if (chatState.mode !== 'live') {
        await ensureChatSession();
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
        setChatStatus('status.live', 'is-live');
        chatState.mode = 'live';
        return;
      }
    } catch {
      thinking.remove();
      /* fall through */
    } finally {
      chatInput.disabled = false;
      chatInput.focus();
    }

    if (chatState.mode === 'live' && chatState.token) {
      try {
        await api(`/api/sessions/${encodeURIComponent(chatState.sessionId)}/events`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${chatState.token}` },
          body: JSON.stringify({
            type: 'chat_message',
            channel_id: chatState.channelId,
            payload: { text, lang },
          }),
        });
      } catch {
        chatState.mode = 'demo';
        setChatStatus('status.demo', 'is-live');
      }
    }

    if (!CFG.demoMode) {
      addBubble(
        lang === 'he' ? 'לא הצלחתי לקבל מענה כרגע. נסו שוב.' : 'Could not get a reply right now. Please try again.',
        'agent'
      );
      return;
    }

    const replies = demoReplies[lang] || demoReplies.he;
    const reply = replies[demoIdx % replies.length];
    demoIdx += 1;
    setTimeout(() => addBubble(reply, 'agent'), 450);
  }

  /* ---------- WebRTC talk ---------- */
  const remoteAudio = document.getElementById('remoteAudio');
  let talkActive = false;

  const rtc = {
    pc: null,
    ws: null,
    localStream: null,
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

  function cleanupRtc() {
    if (rtc.ws) {
      try {
        if (rtc.ws.readyState === 1) rtc.ws.send(JSON.stringify({ type: 'hangup' }));
        rtc.ws.close();
      } catch {
        /* ignore */
      }
    }
    if (rtc.pc) {
      try {
        rtc.pc.close();
      } catch {
        /* ignore */
      }
    }
    if (rtc.localStream) {
      rtc.localStream.getTracks().forEach((tr) => tr.stop());
    }
    rtc.pc = null;
    rtc.ws = null;
    rtc.localStream = null;
    rtc.sessionId = null;
    talkActive = false;
    heroTalkBtn.classList.remove('is-live');
  }

  function wsUrlFor(session) {
    if (session.wsUrl?.startsWith('ws')) return session.wsUrl;
    const proto = location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = apiBase() ? new URL(apiBase()).host : location.host;
    return `${proto}//${host}${session.wsUrl}`;
  }

  async function startLiveWebRtc() {
    const userId = encodeURIComponent(CFG.webrtcUserId || CFG.defaultAgentId);
    const statusRes = await fetch(`${apiBase()}/api/public/web-call/${userId}/status`);
    if (!statusRes.ok) throw new Error('webrtc unavailable');
    const sessionRes = await fetch(`${apiBase()}/api/public/web-call/${userId}/session`, {
      method: 'POST',
    });
    if (!sessionRes.ok) throw new Error('session failed');
    const session = await sessionRes.json();
    rtc.sessionId = session.sessionId;
    rtc.mode = 'live';

    rtc.pc = new RTCPeerConnection({ iceServers: session.iceServers || [{ urls: 'stun:stun.l.google.com:19302' }] });
    rtc.localStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    rtc.localStream.getTracks().forEach((track) => rtc.pc.addTrack(track, rtc.localStream));

    rtc.pc.ontrack = (ev) => {
      remoteAudio.srcObject = ev.streams[0];
    };

    rtc.ws = new WebSocket(wsUrlFor(session));
    rtc.pc.onicecandidate = (e) => {
      if (e.candidate && rtc.ws?.readyState === 1) {
        rtc.ws.send(JSON.stringify({ type: 'ice', candidate: e.candidate }));
      }
    };

    await new Promise((resolve, reject) => {
      rtc.ws.onopen = resolve;
      rtc.ws.onerror = reject;
    });

    rtc.ws.onmessage = async (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.type === 'answer' && msg.sdp) {
        await rtc.pc.setRemoteDescription({ type: 'answer', sdp: msg.sdp });
      } else if (msg.type === 'ice' && msg.candidate) {
        try {
          await rtc.pc.addIceCandidate(msg.candidate);
        } catch {
          /* ignore */
        }
      } else if (msg.type === 'hangup') {
        hangupTalk();
      }
    };

    const offer = await rtc.pc.createOffer();
    await rtc.pc.setLocalDescription(offer);
    rtc.ws.send(JSON.stringify({ type: 'offer', sdp: offer.sdp }));
  }

  async function startDemoTalk() {
    rtc.mode = 'demo';
    rtc.localStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    setTalkHint('talk.demo');
  }

  async function startTalk() {
    heroTalkBtn.disabled = true;
    setTalkHint('talk.connecting');
    try {
      await startLiveWebRtc();
      setTalkHint('talk.live');
    } catch {
      if (!CFG.demoMode) {
        setTalkHint('status.error');
        heroTalkBtn.disabled = false;
        return;
      }
      try {
        await startDemoTalk();
      } catch {
        setTalkHint('status.error');
        heroTalkBtn.disabled = false;
        return;
      }
    }
    talkActive = true;
    heroTalkBtn.classList.add('is-live');
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
          flow_name: 'office',
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
      if (!CFG.demoMode) {
        outboundNote.textContent = t('status.error');
        outboundNote.classList.add('is-err');
        setPhoneStatus('status.error', 'is-error');
        return;
      }
      outboundNote.textContent = t('phone.demoQueued');
      outboundNote.classList.add('is-ok');
      setPhoneStatus('status.demo', 'is-live');
      outboundForm.reset();
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
      setTalkHint(rtc.mode === 'demo' ? 'talk.demo' : 'talk.live');
    }
    setChatStatus(chatState.mode === 'demo' ? 'status.demo' : chatState.mode === 'live' ? 'status.live' : 'status.ready', chatState.mode !== 'idle' ? 'is-live' : '');
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

  setupTabs();
  applyI18n();
  setMode('talk');
  addBubble(t('chat.welcome'), 'agent');

  document.getElementById('inboundDial').href = `tel:+${CFG.inboundDidE164}`;
  document.querySelector('#inboundDial .dial-card__number').textContent = CFG.inboundDid;
  document.querySelector('.dial-card--alt').href = `tel:+${CFG.companyPhoneE164}`;
  document.querySelector('.dial-card--alt .dial-card__number').textContent = CFG.companyPhone;
})();
