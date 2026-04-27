/**
 * header.js — Auth & Topup untuk shared header
 * Semua fungsi global, tidak ada delegate pattern
 */

// ===== CONFIG =====
var _shIsInPages = (window.location.pathname.indexOf('/pages/') !== -1);
var _shBase = _shIsInPages ? '../' : '';

var _shTopupConfig = {
  koin:    { title:'🪙 Top Up Koin',    icon:'assets/images/icons/icon/koin.png',    color:'#f59e0b',
    packages:[{label:'1.000',amount:1000,price:'Rp 1.000',bonus:''},{label:'5.000',amount:5000,price:'Rp 4.500',bonus:'+500 Bonus'},{label:'10.000',amount:10000,price:'Rp 8.500',bonus:'+1.500 Bonus',popular:true},{label:'50.000',amount:50000,price:'Rp 40.000',bonus:'+10.000 Bonus'},{label:'100.000',amount:100000,price:'Rp 75.000',bonus:'+25.000 Bonus'},{label:'500.000',amount:500000,price:'Rp 350.000',bonus:'+150.000 Bonus',best:true}]},
  diamond: { title:'💎 Top Up Diamond', icon:'assets/images/icons/icon/diamond.png', color:'#3b82f6',
    packages:[{label:'60',amount:60,price:'Rp 15.000',bonus:''},{label:'300',amount:300,price:'Rp 70.000',bonus:'+30 Bonus'},{label:'980',amount:980,price:'Rp 200.000',bonus:'+80 Bonus',popular:true},{label:'1.980',amount:1980,price:'Rp 380.000',bonus:'+200 Bonus'},{label:'3.280',amount:3280,price:'Rp 600.000',bonus:'+400 Bonus'},{label:'6.480',amount:6480,price:'Rp 1.100.000',bonus:'+1.000 Bonus',best:true}]},
  flash:   { title:'⚡ Top Up Flash',   icon:'assets/images/icons/icon/flash.png',   color:'#8b5cf6',
    packages:[{label:'10',amount:10,price:'Rp 5.000',bonus:''},{label:'50',amount:50,price:'Rp 22.000',bonus:'+5 Bonus'},{label:'100',amount:100,price:'Rp 40.000',bonus:'+15 Bonus',popular:true},{label:'300',amount:300,price:'Rp 110.000',bonus:'+50 Bonus'},{label:'500',amount:500,price:'Rp 175.000',bonus:'+100 Bonus'},{label:'1.000',amount:1000,price:'Rp 320.000',bonus:'+250 Bonus',best:true}]},
};
var _shCurrentCurrency = null;

function _shFmt(n) {
  if (n >= 1000000) return (n/1000000).toFixed(2)+'M';
  if (n >= 1000)    return (n/1000).toFixed(1)+'K';
  return String(n);
}

// ===== AUTH =====
window.shOpenAuth = function(type) {
  sessionStorage.setItem('auth_intent', type);
  window.location = _shBase + 'index.html';
};

window.shHandleLogout = function() {
  localStorage.removeItem('loggedIn');
  localStorage.removeItem('username');
  var a = document.getElementById('sh-auth-buttons');
  var p = document.getElementById('sh-profile-section');
  var b = document.getElementById('sh-btn-logout');
  if (a) a.style.display = 'flex';
  if (p) p.style.display = 'none';
  if (b) b.style.display = 'none';
  window.location = _shBase + 'index.html';
};

// ===== TOPUP =====
window.shOpenTopup = function(type) {
  _shCurrentCurrency = type;
  var cfg = _shTopupConfig[type];
  if (!cfg) return;

  // Build modal jika belum ada
  if (!document.getElementById('shTopupOverlay')) {
    var div = document.createElement('div');
    div.id = 'shTopupOverlay';
    div.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);z-index:2147483647;display:flex;align-items:center;justify-content:center;padding:16px;box-sizing:border-box;';
    div.innerHTML =
      '<div style="background:linear-gradient(160deg,#1a1a2e,#0f3460);border:1.5px solid rgba(255,255,255,0.15);border-radius:20px;width:100%;max-width:440px;max-height:85vh;overflow-y:auto;padding:20px;position:relative;">'
      + '<button onclick="shCloseTopup()" style="position:absolute;top:12px;right:12px;background:rgba(255,255,255,0.15);border:none;color:#fff;width:28px;height:28px;border-radius:50%;font-size:16px;cursor:pointer;line-height:1;">✕</button>'
      + '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">'
      + '<img id="shTopupIcon" src="" style="width:32px;height:32px;object-fit:contain;"/>'
      + '<div><div id="shTopupTitle" style="font-size:16px;font-weight:700;color:#fff;"></div>'
      + '<div style="font-size:11px;color:rgba(255,255,255,0.5);">Saldo: <span id="shTopupBalance" style="color:#ffd700;font-weight:700;"></span></div></div></div>'
      + '<div id="shTopupPackages" style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:16px;"></div>'
      + '<div style="background:rgba(255,255,255,0.05);border-radius:10px;padding:12px;">'
      + '<div style="font-size:11px;color:rgba(255,255,255,0.5);margin-bottom:8px;">Atau masukkan jumlah:</div>'
      + '<div style="display:flex;gap:8px;">'
      + '<input id="shTopupCustomInput" type="number" placeholder="0" style="flex:1;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:8px;color:#fff;font-size:14px;padding:9px 12px;outline:none;"/>'
      + '<button onclick="shBuyCustom()" style="background:linear-gradient(135deg,#ffd700,#ff9800);border:none;border-radius:8px;color:#000;font-weight:700;font-size:13px;padding:9px 16px;cursor:pointer;">Beli</button>'
      + '</div></div>'
      + '</div>';
    div.addEventListener('click', function(e){ if(e.target===div) shCloseTopup(); });
    document.documentElement.appendChild(div);
  }

  // Isi data
  var balances = {
    koin:    parseFloat(sessionStorage.getItem('bal-koin')    || 20150000),
    diamond: parseFloat(sessionStorage.getItem('bal-diamond') || 20150000),
    flash:   parseFloat(sessionStorage.getItem('bal-flash')   || 20150000),
  };
  var iconPath = _shBase + cfg.icon;
  document.getElementById('shTopupIcon').src = iconPath;
  document.getElementById('shTopupTitle').textContent = cfg.title;
  document.getElementById('shTopupBalance').textContent = _shFmt(balances[type]);

  var pkgHtml = '';
  cfg.packages.forEach(function(p, i) {
    var badge = p.best
      ? '<span style="position:absolute;top:0;left:50%;transform:translateX(-50%);font-size:7px;font-weight:700;padding:2px 6px;border-radius:0 0 6px 6px;background:linear-gradient(90deg,#ffd700,#ff9800);color:#000;white-space:nowrap;">TERBAIK</span>'
      : p.popular
      ? '<span style="position:absolute;top:0;left:50%;transform:translateX(-50%);font-size:7px;font-weight:700;padding:2px 6px;border-radius:0 0 6px 6px;background:#3b82f6;color:#fff;white-space:nowrap;">POPULER</span>' : '';
    pkgHtml += '<div onclick="shBuyPackage('+i+')" style="position:relative;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.12);border-radius:10px;padding:10px 4px 8px;text-align:center;cursor:pointer;">'
      + badge
      + '<div style="font-size:13px;font-weight:900;color:#fff;margin:8px 0 3px;">' + p.label + '</div>'
      + '<img src="' + iconPath + '" style="width:18px;height:18px;object-fit:contain;display:block;margin:0 auto 3px;"/>'
      + (p.bonus ? '<div style="font-size:8px;font-weight:700;color:#4ade80;margin-bottom:2px;">' + p.bonus + '</div>' : '')
      + '<div style="font-size:9px;color:rgba(255,255,255,0.5);">' + p.price + '</div>'
      + '</div>';
  });
  document.getElementById('shTopupPackages').innerHTML = pkgHtml;
  document.getElementById('shTopupCustomInput').value = '';

  // Tampilkan
  document.getElementById('shTopupOverlay').style.display = 'flex';
};

window.shCloseTopup = function() {
  var o = document.getElementById('shTopupOverlay');
  if (o) o.style.display = 'none';
};

window.shBuyPackage = function(idx) {
  var cfg = _shTopupConfig[_shCurrentCurrency];
  if (!cfg) return;
  var pkg = cfg.packages[idx];
  sessionStorage.setItem('topup_currency', _shCurrentCurrency);
  sessionStorage.setItem('topup_label', pkg.label);
  sessionStorage.setItem('topup_bonus', pkg.bonus || '');
  sessionStorage.setItem('topup_price', pkg.price);
  shCloseTopup();
  window.location = _shBase + 'memberarea.html?page=deposit&topup=1';
};

window.shBuyCustom = function() {
  var val = parseInt(document.getElementById('shTopupCustomInput').value);
  if (!val || val < 1) return;
  sessionStorage.setItem('topup_currency', _shCurrentCurrency);
  sessionStorage.setItem('topup_label', val.toLocaleString('id'));
  sessionStorage.setItem('topup_bonus', '');
  sessionStorage.setItem('topup_price', '');
  shCloseTopup();
  window.location = _shBase + 'memberarea.html?page=deposit&topup=1';
};

// ===== INIT SETELAH DOM READY =====
function _shInit() {
  var balances = {
    koin:    parseFloat(sessionStorage.getItem('bal-koin')    || 20150000),
    diamond: parseFloat(sessionStorage.getItem('bal-diamond') || 20150000),
    flash:   parseFloat(sessionStorage.getItem('bal-flash')   || 20150000),
  };

  // Refresh balance display
  var k = document.getElementById('sh-bal-koin');
  var d = document.getElementById('sh-bal-diamond');
  var f = document.getElementById('sh-bal-flash');
  if (k) k.textContent = _shFmt(balances.koin);
  if (d) d.textContent = _shFmt(balances.diamond);
  if (f) f.textContent = _shFmt(balances.flash);

  // Auth state
  var savedUser = localStorage.getItem('username');
  if (localStorage.getItem('loggedIn') && savedUser) {
    var authBtns   = document.getElementById('sh-auth-buttons');
    var profileSec = document.getElementById('sh-profile-section');
    var btnLogout  = document.getElementById('sh-btn-logout');
    var usernameEl = document.getElementById('sh-username-display');
    if (authBtns)   authBtns.style.display   = 'none';
    if (profileSec) profileSec.style.display = 'flex';
    if (btnLogout)  btnLogout.style.display  = 'inline-flex';
    if (usernameEl) usernameEl.textContent   = savedUser;
  }

  // Auto-buka auth modal jika ada intent
  var intent = sessionStorage.getItem('auth_intent');
  if (intent) {
    sessionStorage.removeItem('auth_intent');
    if (typeof openAuth === 'function') setTimeout(function(){ openAuth(intent); }, 150);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', _shInit);
} else {
  _shInit();
}
