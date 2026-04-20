/* ===== GACHA PULL ENGINE v3 ===== */
(function() {

var CARDS = [
  { img:'pokemon-cards/_-Cek9cr07LvG455A07v4j33ALumZ-wNPbekp55EdRY.jpeg',  name:'Charizard EX',   rarity:'legendary', type:'Fire',      hp:340, atk:330, series:'Scarlet & Violet' },
  { img:'pokemon-cards/m13qNSEFwa0fwsXI6xC-69CqnH1V11Y0VCqFEwn6p2w.jpeg', name:'Rayquaza EX',    rarity:'legendary', type:'Dragon',    hp:320, atk:300, series:'Scarlet & Violet' },
  { img:'pokemon-cards/ZA8TA0g5foXDKfBjuSl0_-L7j9_VE_3zsGNw2S-oDA0.jpeg', name:'Mew EX',         rarity:'legendary', type:'Psychic',   hp:280, atk:260, series:'Fusion Strike' },
  { img:'pokemon-cards/73l51yZHpPLOIK2kg8gsba2FRbX5ubrJYivG1ZY6OUA.jpeg',  name:'Pikachu VMAX',   rarity:'epic',      type:'Lightning', hp:310, atk:290, series:'Vivid Voltage' },
  { img:'pokemon-cards/Hc7QMiT980rB_6MEvb9rJ6gRoOwgGGGcYfeT9dvqLxE.jpeg', name:'Lugia VSTAR',    rarity:'epic',      type:'Colorless', hp:280, atk:270, series:'Silver Tempest' },
  { img:'pokemon-cards/npPSLO51S39hPtX5rzoZHXKX2_0xrWbWeKhVv9SeiHI.jpeg', name:'Umbreon VMAX',   rarity:'epic',      type:'Darkness',  hp:310, atk:240, series:'Evolving Skies' },
  { img:'pokemon-cards/U2US8ECIxX-OQdC-LqQ9LjU3kmJQsBq1LAfZJruZUog.jpeg', name:'Sylveon VMAX',   rarity:'epic',      type:'Fairy',     hp:310, atk:230, series:'Evolving Skies' },
  { img:'pokemon-cards/bZni2XH1SLoFVa7ukQs-6c3hXmwGyafUR5QgNo8Wt3w.jpeg', name:'Mewtwo V',       rarity:'rare',      type:'Psychic',   hp:220, atk:200, series:'Brilliant Stars' },
  { img:'pokemon-cards/gLERjG8bFekOCdkkNuc6_21v9eC38rdc5kKFg0-x3DE.jpeg', name:'Gengar V',       rarity:'rare',      type:'Psychic',   hp:210, atk:190, series:'Fusion Strike' },
  { img:'pokemon-cards/LVWlk2uXaNGS4nioPF7Ofe3L5NENFz3HqCyhMKsOQkQ.jpeg', name:'Eevee V',        rarity:'rare',      type:'Colorless', hp:200, atk:160, series:'Evolving Skies' },
  { img:'pokemon-cards/Qaj3__4-GUuZ8QJmdSEC9gVki-ei_x72iLJAICZRtj0.jpeg', name:'Snorlax V',      rarity:'rare',      type:'Colorless', hp:230, atk:180, series:'Sword & Shield' },
  { img:'pokemon-cards/sm3H9lQ21tcMGix-eCMmk3m7nAt5WV7G6xamc8HqqvI.jpeg', name:'Dragonite V',    rarity:'rare',      type:'Dragon',    hp:220, atk:200, series:'Fusion Strike' },
  { img:'pokemon-cards/ZU7OBcSwBOxbGU9vXkHLGTUOOpXQVrkOet4IhOVGcEo.jpeg', name:'Alakazam V',     rarity:'rare',      type:'Psychic',   hp:210, atk:190, series:'Brilliant Stars' },
  { img:'pokemon-cards/DBmUtJ_x_jMEixXyo65Ob-HNHFKumWwQaNlwDXZ6n54.jpeg', name:'Bulbasaur',      rarity:'common',    type:'Grass',     hp:70,  atk:50,  series:'Base Set' },
  { img:'pokemon-cards/if192uydcn9LCIe1lnq4r4y1esXyp6qi2z3LGYwMh5s.jpeg', name:'Squirtle',       rarity:'common',    type:'Water',     hp:60,  atk:40,  series:'Base Set' },
  { img:'pokemon-cards/mJUwvTc4AUZwZaP4PzL6AyeiIAbYzNRKvkwDKEwsZEA.jpeg', name:'Charmander',     rarity:'common',    type:'Fire',      hp:60,  atk:50,  series:'Base Set' },
  { img:'pokemon-cards/VIe3dY5o7nJ2xpiTXd2OXwq3PyBSUzaKcRIKS3R2SrI.jpeg', name:'Jigglypuff',     rarity:'common',    type:'Colorless', hp:60,  atk:30,  series:'Base Set' },
  { img:'pokemon-cards/sGTuFk59UhQ8eNu2bfU736SK36_sslP9ermDf3Jo00A.jpeg', name:'Psyduck',        rarity:'common',    type:'Water',     hp:60,  atk:40,  series:'Base Set' },
  { img:'pokemon-cards/ZWrDt4H6MWSjlCJoyziRq6gsJ7JaYW74vVmJ1YoRGgA.jpeg', name:'Magikarp',       rarity:'common',    type:'Water',     hp:30,  atk:10,  series:'Base Set' },
];

var RARITY_LABEL  = { legendary:'⭐ LEGENDARY', epic:'💎 EPIC', rare:'🔵 RARE', common:'⚪ COMMON' };
var RARITY_COLOR  = { legendary:'#ffd700', epic:'#c084fc', rare:'#60a5fa', common:'#9ca3af' };
var RARITY_CHANCE = { legendary:0.03, epic:0.12, rare:0.30, common:0.55 };
var RARITY_ORDER  = ['legendary','epic','rare','common'];

// ===== ROLL =====
function rollCard() {
  var r = Math.random(), cum = 0;
  for (var i = 0; i < RARITY_ORDER.length; i++) {
    cum += RARITY_CHANCE[RARITY_ORDER[i]];
    if (r <= cum) {
      var rar = RARITY_ORDER[i];
      var pool = CARDS.filter(function(c){ return c.rarity === rar; });
      return pool[Math.floor(Math.random() * pool.length)];
    }
  }
  return CARDS[CARDS.length - 1];
}

// ===== MAKE CARD HTML =====
function makeCardHTML(card, idx, isFirst, autoReveal) {
  var label     = RARITY_LABEL[card.rarity] || card.rarity.toUpperCase();
  var firstClass = isFirst ? ' is-first' : '';
  // autoReveal: langsung tampil depan (x10/x100)
  var flippedClass = autoReveal ? ' flipped' : '';
  var flippedAttr  = autoReveal ? 'true' : 'false';
  var cardData     = JSON.stringify(card).replace(/"/g, '&quot;');

  return '<div class="gp-slot' + firstClass + '" style="animation-delay:' + (idx * 0.06) + 's">' +
    '<div class="gp-card-wrap ' + card.rarity + flippedClass + '" ' +
      'onclick="flipCard(this, ' + cardData + ')" ' +
      'data-flipped="' + flippedAttr + '">' +
      '<div class="gp-card-face gp-card-back">' +
        '<div class="gp-card-back-logo">GACHA</div>' +
      '</div>' +
      '<div class="gp-card-face gp-card-front">' +
        '<img src="' + card.img + '" alt="' + card.name + '" loading="lazy" />' +
        '<div class="gp-rarity-bar" style="color:' + (card.rarity === 'legendary' ? '#000' : '#fff') + '">' + label + '</div>' +
      '</div>' +
    '</div>' +
  '</div>';
}

// ===== FLIP CARD (x1 only — klik untuk reveal, klik lagi untuk detail) =====
window.flipCard = function(el, card) {
  var flipped = el.getAttribute('data-flipped') === 'true';
  if (!flipped) {
    el.classList.add('flipped');
    el.setAttribute('data-flipped', 'true');
    triggerFlipEffects(card, el);
  } else {
    showDetail(card);
  }
};

function triggerFlipEffects(card, el) {
  var flash = document.getElementById('gp-flash');
  if (card.rarity === 'legendary') {
    if (flash) { flash.style.background = 'radial-gradient(circle,rgba(255,215,0,.4),transparent 70%)'; flash.classList.add('active'); }
    spawnExplosion(180, 'gold');
    spawnElectricSparks(el);
  } else if (card.rarity === 'epic') {
    if (flash) { flash.style.background = 'radial-gradient(circle,rgba(192,132,252,.3),transparent 70%)'; flash.classList.add('active'); }
    spawnExplosion(100, 'purple');
    spawnElectricSparks(el);
  } else if (card.rarity === 'rare') {
    spawnExplosion(50, 'blue');
    spawnElectricSparks(el);
  } else {
    spawnExplosion(20, 'blue');
  }
  if (flash) setTimeout(function(){ flash.classList.remove('active'); }, 800);
}

// ===== ELECTRIC SPARKS (DOM particles) =====
function spawnElectricSparks(el) {
  if (!el) return;
  var rect = el.getBoundingClientRect();
  var cx = rect.left + rect.width / 2;
  var cy = rect.top + rect.height / 2;
  var colors = ['#fff', '#3b9eff', '#ffd700', '#c084fc'];
  for (var i = 0; i < 12; i++) {
    var spark = document.createElement('div');
    spark.className = 'electric-spark';
    var angle = Math.random() * Math.PI * 2;
    var dist  = 40 + Math.random() * 60;
    var sx = Math.cos(angle) * dist;
    var sy = Math.sin(angle) * dist;
    spark.style.cssText = 'left:' + cx + 'px;top:' + cy + 'px;' +
      'background:' + colors[Math.floor(Math.random() * colors.length)] + ';' +
      '--sx:' + sx + 'px;--sy:' + sy + 'px;' +
      'width:' + (3 + Math.random() * 4) + 'px;height:' + (3 + Math.random() * 4) + 'px;' +
      'position:fixed;border-radius:50%;pointer-events:none;z-index:300;' +
      'animation:sparkPop .5s ease-out forwards;';
    document.body.appendChild(spark);
    setTimeout(function(s){ s.remove(); }, 600);
  }
}

// ===== CARD DETAIL =====
window.showDetail = function(card) {
  var overlay = document.getElementById('cardDetailOverlay');
  document.getElementById('detail-img').src = card.img;
  document.getElementById('detail-name').textContent = card.name;
  var rarEl = document.getElementById('detail-rarity');
  rarEl.textContent = RARITY_LABEL[card.rarity] || card.rarity;
  rarEl.style.background = RARITY_COLOR[card.rarity] + '33';
  rarEl.style.color = RARITY_COLOR[card.rarity];
  rarEl.style.border = '1px solid ' + RARITY_COLOR[card.rarity] + '66';
  document.getElementById('detail-stats').innerHTML =
    '<div class="card-stat"><strong>' + card.hp  + '</strong>HP</div>' +
    '<div class="card-stat"><strong>' + card.atk + '</strong>ATK</div>' +
    '<div class="card-stat"><strong>' + card.type + '</strong>Type</div>' +
    '<div class="card-stat"><strong style="font-size:.72rem">' + card.series + '</strong>Series</div>';
  overlay.classList.add('show');
};
window.closeDetail = function(e) {
  if (e.target === document.getElementById('cardDetailOverlay'))
    document.getElementById('cardDetailOverlay').classList.remove('show');
};
window.closeDetailBtn = function() {
  document.getElementById('cardDetailOverlay').classList.remove('show');
};

// ===== SUMMARY =====
function showSummary(cards) {
  var ct = { legendary:0, epic:0, rare:0, common:0 };
  cards.forEach(function(c){ if (ct[c.rarity] !== undefined) ct[c.rarity]++; });
  var html = '<div class="gp-summary">';
  RARITY_ORDER.forEach(function(r) {
    if (ct[r] > 0)
      html += '<div class="gp-sum-item ' + r + '">' +
        '<span class="gp-sum-num">' + ct[r] + '</span>' +
        '<span class="gp-sum-label">' + r + '</span>' +
      '</div>';
  });
  return html + '</div>';
}

// ===== MAIN GACHA =====
function doGacha(pulls) {
  var cards = [];
  for (var i = 0; i < pulls; i++) cards.push(rollCard());

  var sorted = cards.slice().sort(function(a, b) {
    return RARITY_ORDER.indexOf(a.rarity) - RARITY_ORDER.indexOf(b.rarity);
  });

  var grid = document.getElementById('gp-grid');
  var summaryEl = document.getElementById('gp-summary');
  if (!grid) return;

  var autoReveal = pulls > 1; // x10 & x100 langsung tampil semua

  var html = '';
  sorted.forEach(function(card, i) {
    html += makeCardHTML(card, i, i === 0, autoReveal);
  });
  grid.innerHTML = html;

  if (autoReveal) {
    // x10/x100: trigger efek untuk kartu terbaik (index 0) setelah animasi masuk
    setTimeout(function() {
      var firstWrap = grid.querySelector('.gp-slot.is-first .gp-card-wrap');
      if (firstWrap) triggerFlipEffects(sorted[0], firstWrap);
    }, sorted.length * 60 + 400);
  } else {
    // x1: auto-flip setelah 600ms
    setTimeout(function() {
      var firstWrap = grid.querySelector('.gp-slot.is-first .gp-card-wrap');
      if (firstWrap) {
        firstWrap.classList.add('flipped');
        firstWrap.setAttribute('data-flipped', 'true');
        triggerFlipEffects(sorted[0], firstWrap);
      }
    }, 600);
  }

  if (summaryEl) summaryEl.innerHTML = showSummary(cards);
}

// ===== PARTICLE EXPLOSION =====
var _canvas, _ctx, _particles = [];

function initCanvas() {
  _canvas = document.createElement('canvas');
  _canvas.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:100;';
  document.body.appendChild(_canvas);
  _ctx = _canvas.getContext('2d');
  function resize() { _canvas.width = innerWidth; _canvas.height = innerHeight; }
  window.addEventListener('resize', resize); resize();
  animateParticles();
}

function spawnExplosion(count, type) {
  if (!_canvas) return;
  var cx = innerWidth / 2, cy = innerHeight / 2;
  var palettes = {
    gold:   ['#ffd700','#ffb300','#ff8c00','#fff8c0','#ff6b35'],
    purple: ['#c084fc','#a855f7','#7c3aed','#e9d5ff','#f0abfc'],
    blue:   ['#60a5fa','#3b82f6','#93c5fd','#bfdbfe','#fff'],
  };
  var palette = palettes[type] || palettes.blue;
  for (var i = 0; i < count; i++) {
    var angle = Math.random() * Math.PI * 2;
    var speed = 4 + Math.random() * 10;
    _particles.push({
      x:cx, y:cy,
      vx:Math.cos(angle)*speed, vy:Math.sin(angle)*speed - 3,
      size:3 + Math.random()*7,
      color:palette[Math.floor(Math.random()*palette.length)],
      life:1, decay:0.014 + Math.random()*0.018,
      shape:Math.random()>.5?'circle':'star',
    });
  }
}

function drawStar(x,y,r,alpha,color) {
  _ctx.save(); _ctx.globalAlpha=alpha; _ctx.fillStyle=color; _ctx.beginPath();
  for (var i=0;i<5;i++) {
    var a=(i*4*Math.PI)/5-Math.PI/2, b=(i*4*Math.PI)/5+(2*Math.PI)/5-Math.PI/2;
    if(i===0) _ctx.moveTo(x+r*Math.cos(a),y+r*Math.sin(a));
    else _ctx.lineTo(x+r*Math.cos(a),y+r*Math.sin(a));
    _ctx.lineTo(x+(r/2)*Math.cos(b),y+(r/2)*Math.sin(b));
  }
  _ctx.closePath(); _ctx.fill(); _ctx.restore();
}

function animateParticles() {
  _ctx.clearRect(0,0,_canvas.width,_canvas.height);
  _particles = _particles.filter(function(p){ return p.life>0.01; });
  _particles.forEach(function(p) {
    p.x+=p.vx; p.y+=p.vy; p.vy+=0.1; p.life-=p.decay;
    if(p.shape==='star') drawStar(p.x,p.y,p.size,p.life,p.color);
    else {
      _ctx.save(); _ctx.globalAlpha=p.life; _ctx.fillStyle=p.color;
      _ctx.beginPath(); _ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
      _ctx.fill(); _ctx.restore();
    }
  });
  requestAnimationFrame(animateParticles);
}

// ===== INIT =====
window.addEventListener('DOMContentLoaded', function() {
  var pulls = parseInt(new URLSearchParams(location.search).get('pulls')) || 1;
  var title = document.getElementById('gp-title');
  if (title) title.textContent = 'GACHA × ' + pulls;
  initCanvas();
  doGacha(pulls);
});

})();
