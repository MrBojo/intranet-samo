/* ============================================================
   GLOBAL CARGO SOLUTIONS — INTRANET DEMO SCRIPT
   Verzia pre Samuela (manažér oddelenia)
   - Prihlásenie na Samuelov účet
   - Doručená pošta s e-mailom od Damiána
   - Kliknutie na phishing link zobrazí demo hlášku
   - Bez ankety
   ============================================================ */

// ===== REFERENCIE NA ELEMENTY =====
const loginScreen     = document.getElementById('login-screen');
const dashboardScreen = document.getElementById('dashboard-screen');
const emailInput      = document.getElementById('email');
const passwordInput   = document.getElementById('password');
const loginBtn        = document.getElementById('login-btn');
const loginError      = document.getElementById('login-error');
const logoutBtn       = document.getElementById('logout-btn');
const mailBtn         = document.getElementById('mail-btn');
const mailMsg         = document.getElementById('mail-msg');

// Inbox elementy
const inboxAlert      = document.getElementById('inbox-alert');
const openInboxBtn    = document.getElementById('open-inbox-btn');
const emailDamian     = document.getElementById('email-damian');
const emailDetail     = document.getElementById('email-detail');
const backToInbox     = document.getElementById('back-to-inbox');
const inboxList       = document.querySelector('.inbox-list');
const phishingLink    = document.getElementById('phishing-link');

// ===== TESTOVACIE PRIHLASOVACIE ÚDAJE (len pre demo) =====
const DEMO_EMAIL    = 'samuel@globalcargosolutions.ltd';
const DEMO_PASSWORD = 'Demo1234';


// ========== 1. PRIHLÁSENIE ==========
loginBtn.addEventListener('click', function () {
  loginError.textContent = '';
  const email = emailInput.value.trim();
  const pass  = passwordInput.value;

  if (email === DEMO_EMAIL && pass === DEMO_PASSWORD) {
    loginScreen.classList.add('hidden');
    dashboardScreen.classList.remove('hidden');
  } else {
    loginError.textContent = 'Nesprávny e-mail alebo heslo. Skúste to znova.';
  }
});

// Enter kláves
passwordInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') loginBtn.click();
});
emailInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') loginBtn.click();
});


// ========== 2. PREPÍNANIE ZÁLOŽIEK ==========
const tabs        = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(function (tab) {
  tab.addEventListener('click', function () {
    tabs.forEach(function (t) { t.classList.remove('active'); });
    tabContents.forEach(function (tc) { tc.classList.remove('active'); });

    tab.classList.add('active');
    const targetId = 'tab-' + tab.getAttribute('data-tab');
    document.getElementById(targetId).classList.add('active');

    // Keď prepneme na inbox, skryjeme detail a ukážeme zoznam
    if (tab.getAttribute('data-tab') === 'inbox') {
      emailDetail.classList.add('hidden');
      inboxList.style.display = '';
    }
  });
});


// ========== 3. DASHBOARD NOTIFIKÁCIA → prepne na inbox ==========
// Tlačidlo "Zobraziť" na dashboarde otvorí inbox a rovno detail e-mailu
openInboxBtn.addEventListener('click', function () {
  // Prepneme na záložku Doručená pošta
  tabs.forEach(function (t) { t.classList.remove('active'); });
  tabContents.forEach(function (tc) { tc.classList.remove('active'); });

  // Nájdeme inbox tab a aktivujeme ho
  const inboxTab = document.querySelector('[data-tab="inbox"]');
  inboxTab.classList.add('active');
  document.getElementById('tab-inbox').classList.add('active');

  // Rovno zobrazíme detail e-mailu
  inboxList.style.display = 'none';
  emailDetail.classList.remove('hidden');
});


// ========== 4. INBOX — kliknutie na e-mail od Damiána ==========
emailDamian.addEventListener('click', function () {
  // Skryjeme zoznam e-mailov, ukážeme detail
  inboxList.style.display = 'none';
  emailDetail.classList.remove('hidden');

  // Označíme ako prečítaný
  emailDamian.classList.remove('unread');
});

// Tlačidlo späť
backToInbox.addEventListener('click', function () {
  emailDetail.classList.add('hidden');
  inboxList.style.display = '';
});


// ========== 5. PHISHING LINK (demo) ==========
// Namiesto skutočného presmerovania zobrazíme demo alert
phishingLink.addEventListener('click', function (e) {
  e.preventDefault(); // Zabránime navigácii

  // Zobrazíme demo overlay — simulácia "nefunkčnej" stránky
  var overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#fff;z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:inherit;';
  overlay.innerHTML = `
    <div style="text-align:center;max-width:500px;padding:20px;">
      <h2 style="color:#1a2a3a;margin-bottom:12px;">&#9888; Stránka nie je dostupná</h2>
      <p style="color:#6b7a8d;margin-bottom:8px;">Požadovaný dokument sa nepodarilo načítať.</p>
      <p style="color:#8a97a6;font-size:.85rem;margin-bottom:24px;">ERR_CONNECTION_TIMED_OUT — globalcagrosolutions.ltd</p>
      <p style="background:#fff3e0;border:1px solid #f0d060;padding:14px 18px;border-radius:8px;color:#856404;font-size:.88rem;margin-bottom:20px;">
        <strong>DEMO POZNÁMKA:</strong> V reálnom scenári by táto stránka potichu zachytila údaje z prehliadača obete. Toto je len bezpečná simulácia.
      </p>
      <button onclick="this.parentElement.parentElement.remove();" style="padding:10px 28px;background:#2e6bbf;color:#fff;border:none;border-radius:6px;font-size:.95rem;cursor:pointer;font-family:inherit;font-weight:600;">Zavrieť a vrátiť sa</button>
    </div>
  `;
  document.body.appendChild(overlay);
});


// ========== 6. ODOSLANIE MAILU (demo) ==========
mailBtn.addEventListener('click', function () {
  mailMsg.textContent = '✓ E-mail bol odoslaný (demo režim — žiadny reálny e-mail nebol odoslaný).';
});


// ========== 7. ODHLÁSENIE ==========
logoutBtn.addEventListener('click', function () {
  dashboardScreen.classList.add('hidden');
  loginScreen.classList.remove('hidden');

  // Reset
  emailInput.value    = '';
  passwordInput.value = '';
  loginError.textContent = '';
  mailMsg.textContent = '';

  // Reset inbox stavu
  emailDetail.classList.add('hidden');
  inboxList.style.display = '';
  emailDamian.classList.add('unread');

  // Reset aktívnej záložky na Dashboard
  tabs.forEach(function (t) { t.classList.remove('active'); });
  tabContents.forEach(function (tc) { tc.classList.remove('active'); });
  tabs[0].classList.add('active');
  tabContents[0].classList.add('active');
});
