/**
 * Shared Navigation â€” Vertical sidebar (desktop) + Horizontal swipeable (mobile)
 */
(function() {

  var style = document.createElement('style');
  style.textContent = `
    /* ===== VERTICAL SIDEBAR (desktop) ===== */
    .shared-sidebar {
      position: fixed;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 9000;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      background: #f9d923;
      border-radius: 36px;
      padding: 9px 6px;
      box-shadow: 0 8px 32px rgba(0,0,0,.5);
      width: 68px;
      max-height: 423px;
      overflow-y: auto;
      overflow-x: visible;
      scrollbar-width: none;
    }
    .shared-sidebar::-webkit-scrollbar { display: none; }

    /* Larger sidebar for leaderboard page */
    body.page-leaderboard .shared-sidebar {
      width: 68px !important;
      padding: 9px 6px !important;
      max-height: 423px !important;
    }
    body.page-leaderboard .shared-sidebar .sn-item {
      width: 51px !important;
      height: 51px !important;
    }
    body.page-leaderboard .shared-sidebar .sn-item img {
      width: 42px !important;
      height: 42px !important;
    }
    body.page-leaderboard .shared-sidebar .sn-item.legendary img {
      width: 50px !important;
      height: 50px !important;
    }
    /* Desktop only â€” di mobile content-area full width */
    @media (min-width: 769px) {
      body.page-leaderboard .content-area {
        margin-left: 92px !important;
      }
    }

    .shared-sidebar .sn-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      position: relative;
      width: 51px; height: 51px;
      border-radius: 50%;
      transition: transform .15s;
      flex-shrink: 0;
    }
    .shared-sidebar .sn-item:hover { transform: scale(1.15); }
    .shared-sidebar .sn-item.active img {
      filter: drop-shadow(0 0 8px rgba(255,200,0,.9)) drop-shadow(0 3px 8px rgba(0,0,0,.5));
      transform: scale(1.1);
    }
    .shared-sidebar .sn-item img {
      width: 42px; height: 42px; object-fit: contain;
      filter: drop-shadow(0 3px 8px rgba(0,0,0,.5));
      transition: transform .2s, filter .2s;
    }
    .shared-sidebar .sn-item.legendary img { width: 50px; height: 50px; }
    .shared-sidebar .sn-divider {
      width: 38px; height: 1px;
      background: rgba(0,0,0,0.15);
      flex-shrink: 0; margin: 2px 0;
    }

    /* Explosion */
    .shared-sidebar .sn-expl {
      position: absolute; inset: 0; border-radius: 50%;
      z-index: 0; pointer-events: none;
    }
    .shared-sidebar .sn-expl::before {
      content: ''; position: absolute; inset: -8px; border-radius: 50%;
      background: radial-gradient(circle,rgba(255,240,80,1) 0%,rgba(255,140,0,.8) 40%,rgba(255,50,0,.4) 65%,transparent 80%);
      opacity: 0; transform: scale(.2);
    }
    .shared-sidebar .sn-expl::after {
      content: ''; position: absolute; inset: -14px; border-radius: 50%;
      border: 4px solid rgba(255,210,0,.95);
      box-shadow: 0 0 12px rgba(255,180,0,.8);
      opacity: 0; transform: scale(.15);
    }
    .shared-sidebar .sn-item:hover .sn-expl::before { animation: snExplCore .55s ease-out forwards; }
    .shared-sidebar .sn-item:hover .sn-expl::after  { animation: snExplRing .65s ease-out forwards; }

    @keyframes snExplCore {
      0%  { opacity:0; transform:scale(.2); } 20%{ opacity:1; transform:scale(1); }
      55% { opacity:.8; transform:scale(1.8); } 100%{ opacity:0; transform:scale(2.8); }
    }
    @keyframes snExplRing {
      0%  { opacity:0; transform:scale(.15); border-width:6px; }
      18% { opacity:1; transform:scale(.9);  border-width:4px; }
      60% { opacity:.6; transform:scale(2);  border-width:2px; }
      100%{ opacity:0; transform:scale(3.2); border-width:1px; }
    }

    /* Tooltip (desktop only) */
    .sn-tooltip {
      position: fixed;
      left: 92px;
      background: rgba(0,0,0,.85);
      color: #ffd700;
      font-family: 'Super Starfish', 'Poppins', sans-serif;
      font-size: 18px;
      padding: 6px 14px;
      border-radius: 8px;
      white-space: nowrap;
      pointer-events: none;
      z-index: 9999;
      -webkit-text-stroke: 0.5px #fff;
      opacity: 0;
      transition: opacity .15s;
      transform: translateY(-50%);
    }
    .sn-tooltip.show { opacity: 1; }

    /* ===== HORIZONTAL NAVBAR (mobile) ===== */
    .shared-bottom-nav {
      display: none;
      position: fixed;
      bottom: 12px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 9000;
      width: calc(100% - 24px);
      max-width: 500px;
      background: #f9d923;
      border-radius: 999px;
      box-shadow: 0 6px 24px rgba(0,0,0,.5);
      padding: 1px 8px;
      overflow: visible;
    }

    /* Swipeable track */
    .sbn-track {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 0;
      overflow-x: auto;
      overflow-y: visible;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      padding: 0 4px;
      padding-top: 40px;
      margin-top: -40px;
    }
    .sbn-track::-webkit-scrollbar { display: none; }

    .sbn-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      width: 64px;
      padding: 2px 0;
      cursor: pointer;
      scroll-snap-align: start;
      position: relative;
      transition: transform .15s;
    }
    .sbn-item:active { transform: scale(0.9); }
    .sbn-item.active img {
      filter: drop-shadow(0 0 6px rgba(255,100,0,.9));
      transform: scale(1.15);
    }
    .sbn-item img {
      width: 44px; height: 44px; object-fit: contain;
      filter: drop-shadow(0 2px 6px rgba(0,0,0,.4));
      transition: transform .2s, filter .2s;
    }
    .sbn-item.legendary img { width: 60px; height: 60px; }

    /* Hover: icon bounce */
    .sbn-item:hover img {
      animation: sbnBounce 0.4s cubic-bezier(.34,1.8,.64,1) forwards;
      filter: drop-shadow(0 0 8px rgba(255,220,0,.9)) drop-shadow(0 2px 6px rgba(0,0,0,.5));
    }
    @keyframes sbnBounce {
      0%   { transform: scale(1) translateY(0); }
      50%  { transform: scale(1.32) translateY(-8px); }
      100% { transform: scale(1.22) translateY(0); }
    }

    /* Explosion effect */
    .sbn-expl {
      position: absolute; inset: 0; border-radius: 50%;
      z-index: 0; pointer-events: none;
    }
    .sbn-expl::before {
      content: ''; position: absolute; inset: -8px; border-radius: 50%;
      background: radial-gradient(circle,rgba(255,240,80,1) 0%,rgba(255,140,0,.8) 40%,rgba(255,50,0,.4) 65%,transparent 80%);
      opacity: 0; transform: scale(.2);
    }
    .sbn-expl::after {
      content: ''; position: absolute; inset: -14px; border-radius: 50%;
      border: 4px solid rgba(255,210,0,.95);
      box-shadow: 0 0 12px rgba(255,180,0,.8);
      opacity: 0; transform: scale(.15);
    }
    .sbn-item:hover .sbn-expl::before { animation: sbnExplCore .55s ease-out forwards; }
    .sbn-item:hover .sbn-expl::after  { animation: sbnExplRing .65s ease-out forwards; }
    @keyframes sbnExplCore {
      0%  { opacity:0; transform:scale(.2); } 20%{ opacity:1; transform:scale(1); }
      55% { opacity:.8; transform:scale(1.8); } 100%{ opacity:0; transform:scale(2.8); }
    }
    @keyframes sbnExplRing {
      0%  { opacity:0; transform:scale(.15); border-width:6px; }
      18% { opacity:1; transform:scale(.9);  border-width:4px; }
      60% { opacity:.6; transform:scale(2);  border-width:2px; }
      100%{ opacity:0; transform:scale(3.2); border-width:1px; }
    }

    /* Tooltip di atas icon â€” muncul saat hover/tap */
    .sbn-item span {
      position: absolute;
      bottom: calc(100% + 8px);
      left: 50%;
      transform: translateX(-50%) scale(0.8);
      background: rgba(0,0,0,.88);
      color: #ffd700;
      font-family: 'Super Starfish', 'Poppins', sans-serif;
      font-size: 16px;
      padding: 6px 14px;
      border-radius: 10px;
      white-space: nowrap;
      pointer-events: none;
      -webkit-text-stroke: 0.8px #fff;
      opacity: 0;
      transition: opacity .15s, transform .15s;
      z-index: 100;
      box-shadow: 0 4px 12px rgba(0,0,0,.4);
    }
    .sbn-item:hover span,
    .sbn-item.tapped span {
      opacity: 1;
      transform: translateX(-50%) scale(1);
    }

    /* Scroll indicator dots */
    .sbn-dots {
      display: flex;
      justify-content: center;
      gap: 4px;
      padding: 3px 0 0;
    }
    .sbn-dot {
      width: 5px; height: 5px; border-radius: 50%;
      background: rgba(0,0,0,0.2); transition: background .2s;
    }
    .sbn-dot.active { background: #ef4036; width: 14px; border-radius: 3px; }

    /* ===== RESPONSIVE ===== */
    @media (max-width: 768px) {
      .shared-sidebar { display: none !important; }
      .sn-tooltip { display: none !important; }
      .shared-bottom-nav { display: block; }
    }
  `;
  document.head.appendChild(style);

  // Detect current page
  var path = window.location.pathname.split('/').pop() || 'index.html';
  var search = window.location.search;
  var page = new URLSearchParams(search).get('page') || '';

  // Add class to body for leaderboard page
  if (page === 'leaderboard') {
    document.body.classList.add('page-leaderboard');
  }

  function isActive(itemPage) {
    if (itemPage === 'gacha')       return path === 'gacha.html';
    if (itemPage === 'leaderboard') return page === 'leaderboard';
    if (itemPage === 'legendary')   return page === 'legendary';
    if (itemPage === 'koleksi')     return page === 'koleksi';
    if (itemPage === 'deposit')     return page === 'deposit';
    if (itemPage === 'withdraw')    return page === 'withdraw';
    if (itemPage === 'profile')     return page === 'profile';
    if (itemPage === 'kirimkartu')  return page === 'kirimkartu';
    if (itemPage === 'jualkartu')   return page === 'jualkartu';
    return false;
  }

  var items = [
    { label: 'HOME',             icon: 'assets/images/icons/icon/home.png',           action: "window.location='index.html'",                       page: 'home' },
    { label: 'GACHA',            icon: 'assets/images/icons/icon/gacha.png',          action: "window.location='gacha.html'",                       page: 'gacha' },
    { label: 'LEADERBOARD',      icon: 'assets/images/icons/icon/leaderboard.png',    action: "window.location='memberarea.html?page=leaderboard'", page: 'leaderboard' },
    { label: 'LEGENDARY',        icon: 'assets/images/icons/icon/legendaryboard.png', action: "window.location='memberarea.html?page=legendary'",   page: 'legendary', legendary: true },
    { label: 'SEMUA KARTU',      icon: 'assets/images/icons/icon/semuakartu.png',     action: "window.location='memberarea.html?page=koleksi'",     page: 'koleksi' },
    { label: 'DEPOSIT',          icon: 'assets/images/icons/icon/deposit.png',        action: "window.location='memberarea.html?page=deposit'",     page: 'deposit' },
    { label: 'WITHDRAW',         icon: 'assets/images/icons/icon/withdraw.png',       action: "window.location='memberarea.html?page=withdraw'",    page: 'withdraw' },
    { label: 'PENGATURAN',       icon: 'assets/images/icons/icon/settingakun.png',    action: "window.location='memberarea.html?page=profile'",     page: 'profile' },
    { label: 'KIRIM KARTU',      icon: 'assets/images/icons/icon/kirimkartu.png',     action: "window.location='memberarea.html?page=kirimkartu'",  page: 'kirimkartu' },
    { label: 'KOLEKSI',          icon: 'assets/images/icons/icon/koleksisaya.png',    action: "window.location='memberarea.html?page=koleksi'",     page: 'koleksi' },
    { label: 'JUAL KARTU',       icon: 'assets/images/icons/icon/jualkartu.png',      action: "window.location='memberarea.html?page=jualkartu'",   page: 'jualkartu' },
  ];

  // Items for sidebar (with dividers)
  var sidebarItems = [
    { label: 'HOME',             icon: 'assets/images/icons/icon/home.png',           action: "window.location='index.html'",                       page: 'home' },
    { label: 'GACHA',            icon: 'assets/images/icons/icon/gacha.png',          action: "window.location='gacha.html'",                       page: 'gacha' },
    { divider: true },
    { label: 'LEADERBOARD',      icon: 'assets/images/icons/icon/leaderboard.png',    action: "window.location='memberarea.html?page=leaderboard'", page: 'leaderboard' },
    { label: 'LEGENDARY BOARD',  icon: 'assets/images/icons/icon/legendaryboard.png', action: "window.location='memberarea.html?page=legendary'",   page: 'legendary', legendary: true },
    { label: 'SEMUA KARTU',      icon: 'assets/images/icons/icon/semuakartu.png',     action: "window.location='memberarea.html?page=koleksi'",     page: 'koleksi' },
    { divider: true },
    { label: 'KIRIM KARTU FISIK',icon: 'assets/images/icons/icon/kirimkartu.png',     action: "window.location='memberarea.html?page=kirimkartu'",  page: 'kirimkartu' },
    { label: 'KOLEKSI SAYA',     icon: 'assets/images/icons/icon/koleksisaya.png',    action: "window.location='memberarea.html?page=koleksi'",     page: 'koleksi' },
    { label: 'JUAL KARTU',       icon: 'assets/images/icons/icon/jualkartu.png',      action: "window.location='memberarea.html?page=jualkartu'",   page: 'jualkartu' },
    { divider: true },
    { label: 'DEPOSIT',          icon: 'assets/images/icons/icon/deposit.png',        action: "window.location='memberarea.html?page=deposit'",     page: 'deposit' },
    { label: 'WITHDRAW',         icon: 'assets/images/icons/icon/withdraw.png',       action: "window.location='memberarea.html?page=withdraw'",    page: 'withdraw' },
    { label: 'PENGATURAN AKUN',  icon: 'assets/images/icons/icon/settingakun.png',    action: "window.location='memberarea.html?page=profile'",     page: 'profile' },
  ];

  // ===== BUILD VERTICAL SIDEBAR =====
  var nav = document.createElement('nav');
  nav.className = 'shared-sidebar';

  sidebarItems.forEach(function(item) {
    if (item.divider) {
      var d = document.createElement('div');
      d.className = 'sn-divider';
      nav.appendChild(d);
      return;
    }
    var el = document.createElement('div');
    el.className = 'sn-item' + (item.legendary ? ' legendary' : '') + (isActive(item.page) ? ' active' : '');
    el.setAttribute('data-label', item.label);
    el.setAttribute('onclick', item.action);
    el.innerHTML = '<div class="sn-expl"></div><img src="' + item.icon + '" alt="' + item.label + '"/>';
    nav.appendChild(el);
  });
  document.body.appendChild(nav);

  // Tooltip (desktop)
  var tooltip = document.createElement('div');
  tooltip.className = 'sn-tooltip';
  document.body.appendChild(tooltip);
  nav.querySelectorAll('.sn-item').forEach(function(item) {
    item.addEventListener('mouseenter', function() {
      var rect = item.getBoundingClientRect();
      tooltip.textContent = item.getAttribute('data-label');
      tooltip.style.top = (rect.top + rect.height / 2) + 'px';
      tooltip.classList.add('show');
    });
    item.addEventListener('mouseleave', function() { tooltip.classList.remove('show'); });
  });

  // ===== BUILD HORIZONTAL BOTTOM NAV (mobile) =====
  var bnav = document.createElement('div');
  bnav.className = 'shared-bottom-nav';

  var track = document.createElement('div');
  track.className = 'sbn-track';

  items.forEach(function(item) {
    var el = document.createElement('div');
    el.className = 'sbn-item' + (item.legendary ? ' legendary' : '') + (isActive(item.page) ? ' active' : '');
    el.setAttribute('onclick', item.action);
    el.innerHTML = '<div class="sbn-expl"></div><img src="' + item.icon + '" alt="' + item.label + '"/><span>' + item.label + '</span>';
    track.appendChild(el);
  });

  bnav.appendChild(track);
  document.body.appendChild(bnav);

  // Touch: show tooltip briefly on first tap, navigate on second tap (or after delay)
  track.querySelectorAll('.sbn-item').forEach(function(el) {
    var tapTimer = null;
    el.addEventListener('touchstart', function(e) {
      // Show tooltip
      el.classList.add('tapped');
      clearTimeout(tapTimer);
      tapTimer = setTimeout(function() {
        el.classList.remove('tapped');
      }, 1200);
    }, { passive: true });
  });

  // Swipe scroll indicator dots
  var totalItems = items.length;
  var visibleCount = 5; // approx visible at once
  var pageCount = Math.ceil(totalItems / visibleCount);

  if (pageCount > 1) {
    var dotsWrap = document.createElement('div');
    dotsWrap.className = 'sbn-dots';
    for (var i = 0; i < pageCount; i++) {
      var dot = document.createElement('div');
      dot.className = 'sbn-dot' + (i === 0 ? ' active' : '');
      dotsWrap.appendChild(dot);
    }
    bnav.appendChild(dotsWrap);

    track.addEventListener('scroll', function() {
      var scrollRatio = track.scrollLeft / (track.scrollWidth - track.clientWidth);
      var activeDot = Math.round(scrollRatio * (pageCount - 1));
      dotsWrap.querySelectorAll('.sbn-dot').forEach(function(d, i) {
        d.classList.toggle('active', i === activeDot);
      });
    });
  }

})();
