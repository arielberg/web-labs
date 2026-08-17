(() => {
  const CFG = window.WEB_LABS_CONFIG;
  const apiBase = () => (CFG.apiBase || '').replace(/\/$/, '');

  const i18n = {
    he: {
      'cta.talk': 'דבר',
      'cta.chat': 'צ׳אט',
      'cta.phone': 'טלפון',
      'nav.home': 'בית',
      'nav.services': 'שירותים',
      'nav.partners': 'לספקי טכנולוגיה',
      'nav.experience': 'ניסיון',
      'nav.articles': 'מאמרים',
      'nav.about': 'עלינו',
      'nav.contact': 'יצירת קשר',
      'nav.news': 'חדשות',
      'nav.menu': 'תפריט ניווט',
      'nav.aria': 'ניווט ראשי',
      'nav.comms': 'יצירת קשר',
      'nav.footer': 'קישורים נוספים',
      'a11y.skip': 'דילוג לתוכן',
      'hero.title': 'ארכיטקטורה וביצוע לפרויקטים מורכבים',
      'hero.sub': 'Salesforce, אינטגרציות וסוכני AI המחוברים למערכות ארגוניות — משלב התכנון ועד מערכת עובדת.',
      'hero.audience': 'עבור בתי תוכנה, חברות אינטגרציה וארגונים פרטיים הזקוקים ליכולת טכנולוגית בכירה.',
      'hero.ctaPrimary': 'נדבר על הפרויקט',
      'hero.ctaSecondary': 'צריכים ארכיטקט לפרויקט פעיל?',
      'svc.title': 'שירותים',
      'svc.partners.title': 'שותפות טכנולוגית לספקים',
      'svc.partners.lead': 'חיזוק צוותי פיתוח ואינטגרציה בפרויקטים הדורשים ארכיטקטורה, Salesforce, אבטחה או חיבור מערכות מורכב.',
      'svc.partners.i1': 'תכנון פתרון והערכת מאמץ',
      'svc.partners.i2': 'ליווי צוותי פיתוח',
      'svc.partners.i3': 'ביקורת ארכיטקטורה',
      'svc.partners.i4': 'פתרון נקודות תקועות',
      'svc.partners.i5': 'השתלבות בפרויקט כקבלן משנה',
      'svc.sf.title': 'Salesforce ואינטגרציות',
      'svc.sf.lead': 'תכנון ויישום של פתרונות Salesforce המחוברים למערכות ולתהליכים הארגוניים.',
      'svc.sf.i1': 'APIs ואינטגרציות',
      'svc.sf.i2': 'Identity, SSO ו-MFA',
      'svc.sf.i3': 'הרשאות ואבטחה',
      'svc.sf.i4': 'תכנון נתונים ותהליכים',
      'svc.sf.i5': 'ביצועים, DevOps וייצוב מערכות',
      'svc.ai.title': 'AI המחובר לארגון',
      'svc.ai.lead': 'מעבר מאב־טיפוס של AI למערכת מאובטחת, מבוקרת ושימושית המחוברת לסביבה הארגונית.',
      'svc.ai.i1': 'סוכנים המחוברים ל-CRM ולמערכות מידע',
      'svc.ai.i2': 'חיפוש וידע ארגוני',
      'svc.ai.i3': 'אוטומציה של שירות ותפעול',
      'svc.ai.i4': 'הרשאות, Audit ו-Governance',
      'svc.ai.i5': 'סוכני קול כחלק מתהליך עסקי',
      'when.title': 'מתי Web Labs יכולה לעזור?',
      'when.i1': 'התקבל פרויקט מורכב וחסרה יכולת ארכיטקטורה בכירה.',
      'when.i2': 'אינטגרציה בין מערכות נתקעה או נעשתה קשה לתחזוקה.',
      'when.i3': 'רוצים להוסיף AI למערכת קיימת בלי להחליף את התשתית.',
      'when.i4': 'אב־טיפוס של AI צריך להפוך לפתרון מאובטח ויציב.',
      'when.i5': 'נדרשת בדיקה מקצועית לפני פיתוח, הצעת מחיר או עלייה לייצור.',
      'sprint.title': 'ספרינט ארכיטקטורה',
      'sprint.lead': 'תהליך ממוקד להגדרת הפתרון, המערכות, האינטגרציות, ההרשאות ותוכנית הביצוע.',
      'sprint.i1': 'מסמך ארכיטקטורה',
      'sprint.i2': 'גבולות הפרויקט',
      'sprint.i3': 'סיכונים והחלטות מרכזיות',
      'sprint.i4': 'הערכת שלבים ומאמץ',
      'sprint.i5': 'תוכנית יישום מעשית',
      'sprint.cta': 'בדיקת התאמה לספרינט',
      'exp.title': 'ניסיון שמחבר בין ארכיטקטורה לביצוע',
      'exp.lead': 'ניסיון מעשי בתכנון ופיתוח של מערכות Enterprise, Salesforce, AWS, APIs, אבטחה, Identity וסוכני AI. העבודה משלבת ראייה מערכתית עם יכולת לרדת לפרטי היישום, הקוד וההטמעה.',
      'demo.title': 'רוצים לראות סוכן בפעולה?',
      'demo.lead': 'הצ׳אט וסוכן הטלפון באתר פועלים על תשתית הסוכנים של Web Labs. אפשר לדבר איתם, להשאיר פרטים או לבקש שיחה.',
      'articles.teaserTitle': 'ידע מעשי על מערכות ו-AI ארגוני',
      'articles.more': 'הכל',
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
      'phone.officeLine': 'משרד',
      'phone.mainLine': 'מכירות',
      'phone.queued': 'הבקשה נשלחה. הסוכן יתקשר בקרוב.',
      'phone.demoQueued': 'הבקשה נשמרה במצב הדגמה.',
      'phone.badPhone': 'נא להזין מספר טלפון תקין.',
      'phone.error': 'לא הצלחנו לשלוח את הבקשה. נסו שוב מאוחר יותר.',
      'about.eyebrow': 'עלינו',
      'about.title': 'עלינו',
      'about.p1': 'Web Labs היא סטודיו לארכיטקטורה וביצוע של מערכות ארגוניות.',
      'about.p2': 'אנחנו מסייעים לחברות טכנולוגיה ולארגונים פרטיים לתכנן ולבנות פתרונות מורכבים בתחומי Salesforce, אינטגרציות וסוכני AI.',
      'about.p3': 'הפעילות מובלת על ידי אריאל ברג, ארכיטקט טכנולוגי עם ניסיון בפיתוח מערכות Enterprise, Salesforce, AWS, אבטחה, Identity ואינטגרציות. העבודה משלבת ראייה מערכתית עם יכולת ביצוע מעשית — מהגדרת הפתרון ועד מערכת עובדת.',
      'about.p4': 'ניתן לעבוד איתנו בפרויקט מלא, בספרינט ארכיטקטורה ממוקד או כחיזוק מקצועי לצוות קיים.',
      'partners.eyebrow': 'לספקי טכנולוגיה',
      'partners.title': 'יכולת טכנולוגית בכירה לפרויקט שלכם',
      'partners.lead': 'Web Labs משתלבת לצד בתי תוכנה, חברות אינטגרציה ושותפי Salesforce כאשר פרויקט דורש ארכיטקטורה, פתרון בעיות מורכבות או חיבור בין מערכות, אבטחה ו-AI.',
      'partners.fitTitle': 'מתי שיתוף הפעולה מתאים?',
      'partners.fit.i1': 'נדרש ארכיטקט לפרויקט שכבר נמכר.',
      'partners.fit.i2': 'הצוות זקוק לחיזוק נקודתי בתחום Salesforce או אינטגרציות.',
      'partners.fit.i3': 'נדרשת הערכת פתרון לפני הגשת הצעה.',
      'partners.fit.i4': 'פרויקט קיים נתקל בבעיה טכנולוגית או ארכיטקטונית.',
      'partners.fit.i5': 'רוצים להוסיף יכולות AI בלי להקים התמחות חדשה בתוך החברה.',
      'partners.modelTitle': 'מודלים אפשריים לעבודה',
      'partners.model.i1': 'ספרינט תכנון ממוקד',
      'partners.model.i2': 'חבילת שעות לפרויקט מוגדר',
      'partners.model.i3': 'ליווי קבוע בהיקף חלקי',
      'partners.model.i4': 'ביקורת ארכיטקטורה',
      'partners.model.i5': 'קבלנות משנה תחת הספק הראשי',
      'partners.cta': 'נדבר על הפרויקט הפעיל',
      'contact.title': 'יש פרויקט שדורש חשיבה טכנולוגית בכירה?',
      'contact.lead': 'כתבו בקצרה מה המערכת, מה האתגר ובאיזה שלב נמצא הפרויקט. נחזור לשיחת התאמה ממוקדת.',
      'contact.name': 'שם',
      'contact.company': 'חברה',
      'contact.reach': 'טלפון או דוא״ל',
      'contact.type': 'סוג הפנייה',
      'contact.typePlaceholder': 'בחרו סוג פנייה',
      'contact.typeDirect': 'פרויקט ישיר',
      'contact.typePartner': 'שיתוף פעולה עם ספק טכנולוגי',
      'contact.typeSprint': 'ספרינט ארכיטקטורה',
      'contact.typeOther': 'אחר',
      'contact.challenge': 'תיאור קצר של האתגר',
      'contact.submit': 'שליחת הפנייה',
      'contact.required': 'נא למלא את השדות הנדרשים.',
      'contact.badReach': 'נא להזין טלפון או דוא״ל תקין.',
      'contact.sending': 'שולח…',
      'contact.sent': 'הפנייה נשלחה. נחזור אליכם בהקדם.',
      'contact.sendError': 'לא הצלחנו לשלוח את הפנייה. נסו שוב או כתבו אלינו ישירות.',
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
      'nav.home': 'Home',
      'nav.services': 'Services',
      'nav.partners': 'For technology vendors',
      'nav.experience': 'Experience',
      'nav.articles': 'Articles',
      'nav.about': 'About',
      'nav.contact': 'Contact',
      'nav.news': 'News',
      'nav.menu': 'Navigation menu',
      'nav.aria': 'Main navigation',
      'nav.comms': 'Contact',
      'nav.footer': 'Additional links',
      'a11y.skip': 'Skip to content',
      'hero.title': 'Architecture and delivery for complex projects',
      'hero.sub': 'Salesforce, integrations, and AI agents connected to enterprise systems — from planning through a working system.',
      'hero.audience': 'For software houses, integration firms, and private organizations that need senior technical capability.',
      'hero.ctaPrimary': 'Let’s talk about the project',
      'hero.ctaSecondary': 'Need an architect for an active project?',
      'svc.title': 'Services',
      'svc.partners.title': 'Technology partnership for vendors',
      'svc.partners.lead': 'Strengthening development and integration teams on projects that require architecture, Salesforce, security, or complex system connectivity.',
      'svc.partners.i1': 'Solution design and effort estimate',
      'svc.partners.i2': 'Development team support',
      'svc.partners.i3': 'Architecture review',
      'svc.partners.i4': 'Unblocking stuck points',
      'svc.partners.i5': 'Joining a project as a subcontractor',
      'svc.sf.title': 'Salesforce and integrations',
      'svc.sf.lead': 'Design and implementation of Salesforce solutions connected to organizational systems and processes.',
      'svc.sf.i1': 'APIs and integrations',
      'svc.sf.i2': 'Identity, SSO, and MFA',
      'svc.sf.i3': 'Permissions and security',
      'svc.sf.i4': 'Data and process design',
      'svc.sf.i5': 'Performance, DevOps, and system stabilization',
      'svc.ai.title': 'AI connected to the organization',
      'svc.ai.lead': 'From an AI prototype to a secure, governed, and useful system connected to the enterprise environment.',
      'svc.ai.i1': 'Agents connected to CRM and information systems',
      'svc.ai.i2': 'Search and organizational knowledge',
      'svc.ai.i3': 'Service and operations automation',
      'svc.ai.i4': 'Permissions, audit, and governance',
      'svc.ai.i5': 'Voice agents as part of a business process',
      'when.title': 'When can Web Labs help?',
      'when.i1': 'A complex project arrived and senior architecture capability is missing.',
      'when.i2': 'An integration between systems is stuck or has become hard to maintain.',
      'when.i3': 'You want to add AI to an existing system without replacing the infrastructure.',
      'when.i4': 'An AI prototype needs to become a secure, stable solution.',
      'when.i5': 'A professional review is needed before development, a proposal, or go-live.',
      'sprint.title': 'Architecture sprint',
      'sprint.lead': 'A focused process to define the solution, systems, integrations, permissions, and delivery plan.',
      'sprint.i1': 'Architecture document',
      'sprint.i2': 'Project boundaries',
      'sprint.i3': 'Risks and key decisions',
      'sprint.i4': 'Phased effort estimate',
      'sprint.i5': 'Practical implementation plan',
      'sprint.cta': 'Check fit for a sprint',
      'exp.title': 'Experience that connects architecture to delivery',
      'exp.lead': 'Hands-on experience designing and building Enterprise systems, Salesforce, AWS, APIs, security, Identity, and AI agents. The work combines a systems view with the ability to go down to implementation, code, and adoption details.',
      'demo.title': 'Want to see an agent in action?',
      'demo.lead': 'The chat and phone agent on this site run on Web Labs’ agent infrastructure. You can talk with them, leave details, or request a call.',
      'articles.teaserTitle': 'Practical knowledge on systems and enterprise AI',
      'articles.more': 'All',
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
      'phone.officeLine': 'Office',
      'phone.mainLine': 'Sales',
      'phone.queued': 'Request sent. The agent will call shortly.',
      'phone.demoQueued': 'Saved in demo mode.',
      'phone.badPhone': 'Please enter a valid phone number.',
      'phone.error': 'Could not send the request. Please try again later.',
      'about.eyebrow': 'About',
      'about.title': 'About',
      'about.p1': 'Web Labs is a studio for architecture and delivery of enterprise systems.',
      'about.p2': 'We help technology companies and private organizations design and build complex solutions in Salesforce, integrations, and AI agents.',
      'about.p3': 'The practice is led by Ariel Berg, a technology architect with experience building Enterprise systems, Salesforce, AWS, security, Identity, and integrations. The work combines a systems view with practical delivery — from defining the solution to a working system.',
      'about.p4': 'You can work with us on a full project, in a focused architecture sprint, or as senior reinforcement for an existing team.',
      'partners.eyebrow': 'For technology vendors',
      'partners.title': 'Senior technical capability for your project',
      'partners.lead': 'Web Labs joins software houses, integration firms, and Salesforce partners when a project needs architecture, complex problem-solving, or connecting systems, security, and AI.',
      'partners.fitTitle': 'When is the collaboration a fit?',
      'partners.fit.i1': 'An architect is needed for a project that has already been sold.',
      'partners.fit.i2': 'The team needs targeted reinforcement in Salesforce or integrations.',
      'partners.fit.i3': 'A solution assessment is needed before submitting a proposal.',
      'partners.fit.i4': 'An existing project has hit a technical or architectural problem.',
      'partners.fit.i5': 'You want to add AI capabilities without building a new specialty inside the company.',
      'partners.modelTitle': 'Possible working models',
      'partners.model.i1': 'Focused planning sprint',
      'partners.model.i2': 'Hour pack for a defined project',
      'partners.model.i3': 'Ongoing part-time support',
      'partners.model.i4': 'Architecture review',
      'partners.model.i5': 'Subcontracting under the prime vendor',
      'partners.cta': 'Let’s talk about the active project',
      'contact.title': 'Have a project that needs senior technical thinking?',
      'contact.lead': 'Briefly describe the system, the challenge, and what stage the project is in. We’ll follow up with a focused fit conversation.',
      'contact.name': 'Name',
      'contact.company': 'Company',
      'contact.reach': 'Phone or email',
      'contact.type': 'Inquiry type',
      'contact.typePlaceholder': 'Select an inquiry type',
      'contact.typeDirect': 'Direct project',
      'contact.typePartner': 'Collaboration with a technology vendor',
      'contact.typeSprint': 'Architecture sprint',
      'contact.typeOther': 'Other',
      'contact.challenge': 'Short description of the challenge',
      'contact.submit': 'Send inquiry',
      'contact.required': 'Please fill in the required fields.',
      'contact.badReach': 'Please enter a valid phone number or email.',
      'contact.sending': 'Sending…',
      'contact.sent': 'Inquiry sent. We’ll get back to you shortly.',
      'contact.sendError': 'Could not send the inquiry. Please try again or email us directly.',
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
    document.getElementById('langToggle') && (document.getElementById('langToggle').textContent = lang === 'he' ? 'EN' : 'עב');
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

  const navToggle = document.getElementById('navToggle');
  const siteNav = document.getElementById('siteNav');
  let currentMode = 'talk';

  function featureEnabled(name) {
    return CFG.features?.[name] !== false;
  }

  function setNavOpen(open) {
    if (!navToggle) return;
    document.body.classList.toggle('nav-open', open);
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (siteNav) {
      siteNav.setAttribute('aria-hidden', open ? 'false' : 'true');
    }
  }

  function applyFeatureVisibility() {
    if (!featureEnabled('talk') && heroTalkBtn) {
      heroTalkBtn.hidden = true;
      heroTalkBtn.classList.add('is-hidden');
      if (talkHint) {
        talkHint.hidden = true;
        talkHint.textContent = '';
      }
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
        outboundForm?.classList.remove('is-active');
        inboundPane?.classList.add('is-active');
      }
    }
  }

  function setMode(mode, options = {}) {
    const { scroll = true, allowRedirect = true } = options;
    if (mode === 'talk' && !featureEnabled('talk')) {
      mode = 'chat';
    }
    const leavingChat = currentMode === 'chat' && mode !== 'chat';
    currentMode = mode;

    document.querySelectorAll('.header-tab[data-mode], .header-cta[data-mode]').forEach((btn) => {
      const on = btn.getAttribute('data-mode') === mode;
      btn.classList.toggle('is-active', on);
    });

    const chatOpen = mode === 'chat';
    const phoneOpen = mode === 'phone';
    const showMic = mode === 'talk' && featureEnabled('talk');
    const aboutOpen = mode === 'about';

    if (heroChat) {
      heroChat.classList.toggle('is-open', chatOpen);
      heroChat.hidden = !chatOpen;
    }
    if (heroPhone) {
      heroPhone.classList.toggle('is-open', phoneOpen);
      heroPhone.hidden = !phoneOpen;
    }

    if (heroTalkBtn) {
      heroTalkBtn.hidden = !showMic;
      heroTalkBtn.classList.toggle('is-hidden', !showMic);
      if (showMic && (heroTalkBtn.classList.contains('is-revealed') || performance.now() >= 3200)) {
        heroTalkBtn.classList.add('is-revealed');
      }
    }
    if (talkHint) talkHint.hidden = !showMic || !talkHint.textContent;

    setNavOpen(false);

    if (aboutOpen) {
      if (!allowRedirect) return;
      if (!document.querySelector('.about-page')) {
        window.location.href = '/about/';
      }
      return;
    }

    // Content pages have contact buttons but no panels — redirect home.
    if ((chatOpen || phoneOpen || showMic) && !heroTalkBtn && !heroChat) {
      if (allowRedirect) window.location.href = `/?mode=${mode}`;
      return;
    }

    if (scroll) {
      const demo = document.getElementById('agent-demo');
      if (demo && (chatOpen || phoneOpen || showMic)) {
        demo.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    if (chatOpen && heroChat) {
      heroChat.classList.add('is-focus');
      setTimeout(() => chatInput?.focus(), 200);
    } else if (phoneOpen && heroPhone) {
      heroPhone.classList.add('is-focus');
    }

    if (leavingChat) flushChatTranscript();
  }

  const chatState = {
    sessionId: null,
    channelId: null,
    token: null,
    mode: 'idle',
    history: [],
    node: 'greet',
  };

  const chatNotify = {
    sentCount: 0,
    inflight: false,
    idleTimer: null,
  };

  function chatIdleMs() {
    const value = Number(CFG.chatIdleMs);
    return Number.isFinite(value) && value > 0 ? value : 120000;
  }

  function scheduleChatFlush() {
    clearTimeout(chatNotify.idleTimer);
    if (!(chatState.history || []).length) return;
    chatNotify.idleTimer = setTimeout(() => {
      flushChatTranscript();
    }, chatIdleMs());
  }

  function flushChatTranscript() {
    const history = chatState.history || [];
    if (!history.length || history.length <= chatNotify.sentCount || chatNotify.inflight) {
      return;
    }
    chatNotify.inflight = true;
    clearTimeout(chatNotify.idleTimer);
    const payload = JSON.stringify({
      session_id: chatState.sessionId || undefined,
      history,
      lang,
      agent_id: CFG.defaultAgentId,
    });
    fetch(`${apiBase()}/api/chat/complete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      keepalive: true,
    })
      .then((res) => {
        if (res.ok) chatNotify.sentCount = history.length;
      })
      .catch(() => {})
      .finally(() => {
        chatNotify.inflight = false;
      });
  }

  function addBubble(text, who) {
    const el = document.createElement('div');
    el.className = `bubble bubble--${who}`;
    el.textContent = text;
    chatLog.appendChild(el);
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  function setChatStatus(key, cls) {
    if (!chatStatus) return;
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
        scheduleChatFlush();
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

  /* ---------- WebRTC talk (ElevenLabs WebRTC or SIP.js fallback) ---------- */
  const remoteAudio = document.getElementById('remoteAudio');
  let talkActive = false;

  const rtc = {
    simpleUser: null,
    conversation: null,
    sessionId: null,
    mode: null,
    localStream: null,
  };

  function talkMode() {
    return String(CFG.talkMode || 'elevenlabs').trim().toLowerCase();
  }

  function talkConfigUrl() {
    return (CFG.talkConfigUrl || 'https://mcp.w3b.works/api/talk/config').replace(/\/$/, '');
  }

  function resolveTalkTokenUrl(config) {
    const raw = config?.tokenUrl;
    if (raw) {
      if (/^https?:\/\//i.test(raw)) return raw.replace(/\/$/, '');
      const base = new URL(talkConfigUrl());
      return `${base.origin}${raw.startsWith('/') ? raw : `/${raw}`}`;
    }
    return talkConfigUrl().replace(/\/config$/, '/token');
  }

  async function fetchTalkToken(config) {
    const res = await fetch(resolveTalkTokenUrl(config));
    if (!res.ok) {
      let body = {};
      try {
        body = await res.json();
      } catch {
        body = {};
      }
      const err = new Error(body.message || body.error || 'talk token failed');
      err.status = res.status;
      err.code = body.error;
      throw err;
    }
    return res.json();
  }

  function setTalkHint(key) {
    if (!talkHint) return;
    if (!key) {
      talkHint.textContent = '';
      talkHint.hidden = true;
      return;
    }
    talkHint.textContent = t(key);
    talkHint.hidden = !heroTalkBtn || heroTalkBtn.hidden;
  }

  function stopLocalStream() {
    const stream = rtc.localStream;
    rtc.localStream = null;
    if (!stream) return;
    stream.getTracks().forEach((tr) => {
      try {
        tr.stop();
      } catch {
        /* ignore */
      }
    });
  }

  async function cleanupRtc() {
    const user = rtc.simpleUser;
    const conversation = rtc.conversation;
    rtc.simpleUser = null;
    rtc.conversation = null;
    rtc.sessionId = null;
    talkActive = false;
    heroTalkBtn.classList.remove('is-live');
    stopLocalStream();
    if (conversation) {
      try {
        await conversation.endSession().catch(() => {});
      } catch {
        /* ignore */
      }
    }
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

  async function loadElevenLabsClient() {
    const version = '0.16.0';
    const urls = [
      `https://cdn.jsdelivr.net/npm/@elevenlabs/client@${version}/dist/lib.modern.js`,
      `https://esm.sh/@elevenlabs/client@${version}`,
    ];
    let lastErr;
    for (const url of urls) {
      try {
        const mod = await import(url);
        const Conversation = mod.Conversation || mod.default?.Conversation;
        if (typeof Conversation?.startSession === 'function') return Conversation;
      } catch (err) {
        lastErr = err;
      }
    }
    throw lastErr || new Error('elevenlabs_client_unavailable');
  }

  async function fetchTalkConfig() {
    const res = await fetch(talkConfigUrl());
    if (res.status === 503 || res.status === 404) {
      const err = new Error('talk config unavailable');
      err.status = res.status;
      throw err;
    }
    if (!res.ok) {
      const err = new Error('talk config failed');
      err.status = res.status;
      throw err;
    }
    return res.json();
  }

  function markTalkLive() {
    setTalkHint('talk.live');
    talkActive = true;
    heroTalkBtn.classList.add('is-live');
  }

  async function startElevenLabsTalk() {
    const config = await fetchTalkConfig();
    const agentId = config.agentId || CFG.elevenLabsAgentId;
    const useToken = config.auth === 'token' || Boolean(config.tokenUrl);

    const Conversation = await loadElevenLabsClient();
    const sessionOptions = {
      connectionType: config.connectionType || 'webrtc',
      dynamicVariables: {
        caller_id: 'web',
        source: 'web-labs',
      },
      onConnect: () => {
        markTalkLive();
      },
      onDisconnect: () => {
        hangupTalk();
      },
      onError: (message) => {
        console.warn('[talk] elevenlabs error', message);
      },
    };

    if (useToken) {
      const tokenBody = await fetchTalkToken(config);
      const conversationToken = tokenBody.conversationToken || tokenBody.token;
      if (!conversationToken) {
        const err = new Error('talk_token_missing');
        err.status = 502;
        throw err;
      }
      sessionOptions.conversationToken = conversationToken;
    } else {
      if (!agentId) {
        const err = new Error('agent_id_missing');
        err.status = 503;
        throw err;
      }
      sessionOptions.agentId = agentId;
    }

    const conversation = await Conversation.startSession(sessionOptions);

    rtc.conversation = conversation;
    rtc.mode = 'elevenlabs';
    rtc.sessionId = typeof conversation.getId === 'function' ? conversation.getId() : null;
    if (conversation.isOpen?.()) markTalkLive();
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

  function getPeerConnection(simpleUser) {
    return (
      simpleUser?.session?.sessionDescriptionHandler?.peerConnection ||
      simpleUser?.sessionManager?.managedSessions?.[0]?.session?.sessionDescriptionHandler
        ?.peerConnection ||
      null
    );
  }

  async function attachLiveMic(simpleUser, stream) {
    const track = stream?.getAudioTracks?.()?.[0];
    if (!track) return false;
    track.enabled = true;
    const pc = getPeerConnection(simpleUser);
    if (!pc || typeof pc.getSenders !== 'function') return false;
    const sender = pc.getSenders().find((s) => !s.track || s.track.kind === 'audio');
    if (sender && typeof sender.replaceTrack === 'function') {
      await sender.replaceTrack(track);
      return true;
    }
    pc.getSenders().forEach((s) => {
      if (s.track && s.track.kind === 'audio') s.track.enabled = true;
    });
    return Boolean(sender);
  }

  async function startLiveWebRtc() {
    if (talkMode() === 'elevenlabs') {
      await startElevenLabsTalk();
      return;
    }

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

    // Keep mic open for the whole call. Stopping tracks after "warm-up" left
    // SIP.js sending silence Opus frames → agent never hears the caller.
    let localStream;
    try {
      localStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
        video: false,
      });
    } catch {
      const err = new Error('microphone_denied');
      err.status = 503;
      throw err;
    }
    rtc.localStream = localStream;

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
          constraints: { audio: true, video: false },
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
      onCallAnswered: () => {
        attachLiveMic(simpleUser, localStream).catch(() => {});
        try {
          remoteAudio.muted = false;
          remoteAudio.volume = 1;
          const p = remoteAudio.play();
          if (p && typeof p.catch === 'function') p.catch(() => {});
        } catch {
          /* ignore */
        }
        setTalkHint('talk.live');
        talkActive = true;
        heroTalkBtn.classList.add('is-live');
      },
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
    await attachLiveMic(simpleUser, localStream).catch(() => {});
    // Retry shortly — PC/senders may appear after invite negotiation.
    setTimeout(() => {
      attachLiveMic(simpleUser, localStream).catch(() => {});
    }, 400);
    setTimeout(() => {
      attachLiveMic(simpleUser, localStream).catch(() => {});
    }, 1200);
    try {
      remoteAudio.muted = false;
      await remoteAudio.play().catch(() => {});
    } catch {
      /* ignore */
    }
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
      if (!talkActive && rtc.mode === 'elevenlabs') markTalkLive();
      if (!talkActive && rtc.mode === 'sipjs') setTalkHint('talk.connecting');
    } catch (err) {
      console.warn('[talk] failed', err);
      await cleanupRtc();
      const unavailable =
        err?.status === 404 ||
        err?.status === 503 ||
        err?.message === 'microphone_denied' ||
        err?.message === 'agent_id_missing' ||
        err?.message === 'elevenlabs_client_unavailable';
      setTalkHint(unavailable ? 'talk.unavailable' : 'status.error');
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
    if (!phoneStatus) return;
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
    if (!outboundForm || !inboundPane) return;
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
  window.addEventListener('pagehide', () => {
    flushChatTranscript();
  });

  document.getElementById('langToggle')?.addEventListener('click', () => {
    lang = lang === 'he' ? 'en' : 'he';
    applyI18n();
    if (chatLog) {
      if (!chatLog.children.length) addBubble(t('chat.welcome'), 'agent');
      else if (chatLog.children.length === 1) {
        chatLog.innerHTML = '';
        addBubble(t('chat.welcome'), 'agent');
      }
    }
    if (talkActive) {
      setTalkHint('talk.live');
    }
    setChatStatus(
      chatState.mode === 'live' ? 'status.live' : 'status.ready',
      chatState.mode === 'live' ? 'is-live' : ''
    );
  });

  navToggle?.addEventListener('click', () => {
    setNavOpen(!document.body.classList.contains('nav-open'));
  });

  document.querySelectorAll('.header-tab[data-mode], .header-cta[data-mode]').forEach((btn) => {
    btn.addEventListener('click', () => setMode(btn.getAttribute('data-mode')));
  });

  siteNav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setNavOpen(false));
  });

  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape' && document.body.classList.contains('nav-open')) {
      setNavOpen(false);
    }
  });

  window.matchMedia('(min-width: 1241px)').addEventListener('change', (ev) => {
    if (ev.matches) setNavOpen(false);
  });

  heroTalkBtn?.addEventListener('click', () => {
    if (!featureEnabled('talk')) {
      setMode('chat');
      return;
    }
    if (currentMode !== 'talk') setMode('talk');
    if (talkActive) hangupTalk();
    else startTalk();
  });

  chatForm?.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;
    chatInput.value = '';
    await sendChat(text);
  });

  outboundForm?.addEventListener('submit', requestOutbound);

  const contactForm = document.getElementById('contactForm');
  const contactNote = document.getElementById('contactNote');
  const contactType = document.getElementById('contactType');
  const inquiryKeys = {
    direct: 'contact.typeDirect',
    partner: 'contact.typePartner',
    sprint: 'contact.typeSprint',
    other: 'contact.typeOther',
  };

  function isEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function setInquiryType(type) {
    if (!contactType || !type || !inquiryKeys[type]) return;
    contactType.value = type;
  }

  function applyInquiryFromLocation() {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get('type') || params.get('inquiry');
    const fromForm = contactForm?.getAttribute('data-default-type');
    setInquiryType(fromUrl || fromForm);
  }

  function contactApiUrl() {
    const configured = String(CFG.contactApiUrl || '').trim();
    if (configured) return configured.replace(/\/$/, '');
    return `${apiBase()}/api/contact`;
  }

  async function submitContact(ev) {
    ev.preventDefault();
    if (!contactForm || !contactNote) return;

    const fd = new FormData(contactForm);
    const name = String(fd.get('name') || '').trim();
    const company = String(fd.get('company') || '').trim();
    const reach = String(fd.get('reach') || '').trim();
    const type = String(fd.get('type') || '').trim();
    const challenge = String(fd.get('challenge') || '').trim();
    const website = String(fd.get('website') || '').trim();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    contactNote.className = 'form-note';

    if (!name || !reach || !type || !challenge) {
      contactNote.textContent = t('contact.required');
      contactNote.classList.add('is-err');
      return;
    }

    if (!isEmail(reach) && !normalizePhone(reach)) {
      contactNote.textContent = t('contact.badReach');
      contactNote.classList.add('is-err');
      return;
    }

    if (submitBtn) submitBtn.disabled = true;
    contactNote.textContent = t('contact.sending');

    const typeLabel = t(inquiryKeys[type] || 'contact.typeOther');
    const message = [
      `${t('contact.name')}: ${name}`,
      `${t('contact.company')}: ${company || '—'}`,
      `${t('contact.reach')}: ${reach}`,
      `${t('contact.type')}: ${typeLabel}`,
      '',
      `${t('contact.challenge')}:`,
      challenge,
    ].join('\n');

    try {
      if (website) {
        contactForm.reset();
        applyInquiryFromLocation();
        contactNote.textContent = t('contact.sent');
        contactNote.classList.add('is-ok');
        return;
      }

      const payload = { name, message };
      if (isEmail(reach)) payload.email = reach;

      const res = await fetch(contactApiUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !(data.ok || data.success)) {
        throw new Error('send_failed');
      }
      contactForm.reset();
      applyInquiryFromLocation();
      contactNote.textContent = t('contact.sent');
      contactNote.classList.add('is-ok');
    } catch {
      contactNote.textContent = t('contact.sendError');
      contactNote.classList.add('is-err');
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  }

  contactForm?.addEventListener('submit', submitContact);

  document.querySelectorAll('[data-inquiry]').forEach((el) => {
    el.addEventListener('click', () => {
      setInquiryType(el.getAttribute('data-inquiry'));
    });
  });

  applyInquiryFromLocation();

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

  const modeParam = new URLSearchParams(window.location.search).get('mode');
  const initialMode =
    modeParam && ['talk', 'chat', 'phone'].includes(modeParam)
      ? modeParam
      : featureEnabled('talk')
        ? 'talk'
        : 'chat';
  // Never redirect away from content pages during init; only sync UI state.
  setMode(initialMode, { scroll: false, allowRedirect: false });

  if (chatLog) {
    addBubble(t('chat.welcome'), 'agent');
    probeApiHealth();
  }

  const heroSlogan = document.querySelector('.hero__slogan');
  let micEncourage = 1;
  let heroRevealTimers = [];
  const sloganDelayMs = Number(CFG.heroSloganDelayMs) || 600;
  const micDelayMs = Number(CFG.heroMicDelayMs) || 1600;
  const encourageEveryMs = Number(CFG.heroEncourageEveryMs) || 8000;

  function clearHeroRevealTimers() {
    heroRevealTimers.forEach((id) => clearTimeout(id));
    heroRevealTimers = [];
  }

  function revealMicButton() {
    if (!featureEnabled('talk') || heroTalkBtn.hidden) return;
    heroTalkBtn.classList.add('is-revealed');
  }

  function revealSlogan() {
    heroSlogan?.classList.add('is-revealed');
  }

  function scheduleHeroReveals() {
    if (!heroTalkBtn) return;
    clearHeroRevealTimers();
    heroTalkBtn.classList.remove('is-revealed', 'is-encourage-pulse');
    heroSlogan?.classList.remove('is-revealed');
    micEncourage = 1;
    heroTalkBtn.style.setProperty('--mic-encourage', '1');

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const demoStage = document.getElementById('agent-demo');
    if (reduceMotion || demoStage) {
      revealSlogan();
      revealMicButton();
      return;
    }

    // Slogan first (after logo is visible), then the talk button
    heroRevealTimers.push(setTimeout(revealSlogan, sloganDelayMs));
    heroRevealTimers.push(setTimeout(revealMicButton, micDelayMs));
  }

  scheduleHeroReveals();

  setInterval(() => {
    if (
      !heroTalkBtn ||
      !heroTalkBtn.classList.contains('is-revealed') ||
      heroTalkBtn.hidden ||
      talkActive ||
      document.body.classList.contains('nav-open')
    ) {
      return;
    }
    micEncourage = Math.min(1.4, Math.round((micEncourage + 0.07) * 100) / 100);
    heroTalkBtn.style.setProperty('--mic-encourage', String(micEncourage));
    heroTalkBtn.classList.remove('is-encourage-pulse');
    void heroTalkBtn.offsetWidth;
    heroTalkBtn.classList.add('is-encourage-pulse');
  }, encourageEveryMs);

  const inboundDial = document.getElementById('inboundDial');
  if (inboundDial) {
    inboundDial.href = `tel:+${CFG.inboundDidE164}`;
    const inboundNumber = inboundDial.querySelector('.dial-card__number');
    if (inboundNumber) inboundNumber.textContent = CFG.inboundDid;
  }
  const altDial = document.querySelector('.dial-card--alt');
  if (altDial) {
    altDial.href = `tel:+${CFG.companyPhoneE164}`;
    const altNumber = altDial.querySelector('.dial-card__number');
    if (altNumber) altNumber.textContent = CFG.companyPhone;
  }
})();
