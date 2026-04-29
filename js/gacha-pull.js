/* ===== GACHA PULL ENGINE v3 ===== */

var CARDS = [
  { img:'pokemon-cards/_-Cek9cr07LvG455A07v4j33ALumZ-wNPbekp55EdRY.jpeg',  name:'Charizard EX',   rarity:'legendary', type:'Fire',      hp:340, atk:330, series:'Scarlet & Violet',
    sub:'Scarlet & Violet', badge:'LEGENDARY EX', set:'Obsidian Flames', rarity_label:'Special Illustration Rare', number:'234/197', illus:'PLANETA CG Works',
    weak:'W ×2', resist:'—', retreat:'★★★',
    attacks:[
      {cost:['R','R','R'], name:'Inferno Overdrive', dmg:'330', desc:'Discard 3 Energy from this Pokémon.'},
      {cost:['R'], name:'Crimson Storm', dmg:'60', desc:''}
    ]
  },
  { img:'pokemon-cards/m13qNSEFwa0fwsXI6xC-69CqnH1V11Y0VCqFEwn6p2w.jpeg', name:'Rayquaza EX',    rarity:'legendary', type:'Dragon',    hp:320, atk:300, series:'Scarlet & Violet',
    sub:'Scarlet & Violet', badge:'LEGENDARY EX', set:'Dragon Majesty', rarity_label:'Ultra Rare', number:'61/70', illus:'Mitsuhiro Arita',
    weak:'—', resist:'—', retreat:'★★★',
    attacks:[
      {cost:['L','L','C'], name:'Dragon Pulse', dmg:'300', desc:'Discard the top 3 cards of your deck.'},
      {cost:['C'], name:'Sky High', dmg:'30', desc:''}
    ]
  },
  { img:'pokemon-cards/ZA8TA0g5foXDKfBjuSl0_-L7j9_VE_3zsGNw2S-oDA0.jpeg', name:'Mew EX',         rarity:'legendary', type:'Psychic',   hp:280, atk:260, series:'Fusion Strike',
    sub:'Fusion Strike', badge:'LEGENDARY EX', set:'Fusion Strike', rarity_label:'Ultra Rare', number:'267/264', illus:'Akira Komayama',
    weak:'D ×2', resist:'—', retreat:'★',
    attacks:[
      {cost:['P','P'], name:'Genome Hacking', dmg:'—', desc:"Copy 1 of your opponent's Pokémon's attacks."},
      {cost:['C','C'], name:'Power Share', dmg:'120', desc:''}
    ]
  },
  { img:'pokemon-cards/73l51yZHpPLOIK2kg8gsba2FRbX5ubrJYivG1ZY6OUA.jpeg',  name:'Pikachu VMAX',   rarity:'epic',      type:'Lightning', hp:310, atk:290, series:'Vivid Voltage',
    sub:'Vivid Voltage', badge:'EPIC VMAX', set:'Vivid Voltage', rarity_label:'Rare Holo VMAX', number:'188/185', illus:'5ban Graphics',
    weak:'F ×2', resist:'—', retreat:'★★★',
    attacks:[
      {cost:['L','L','L'], name:'G-Max Volt Tackle', dmg:'290', desc:'This Pokémon also does 30 damage to itself.'},
      {cost:['L'], name:'Thunder Shock', dmg:'30', desc:'Your opponent\'s Active Pokémon is now Paralyzed.'}
    ]
  },
  { img:'pokemon-cards/Hc7QMiT980rB_6MEvb9rJ6gRoOwgGGGcYfeT9dvqLxE.jpeg', name:'Lugia VSTAR',    rarity:'epic',      type:'Colorless', hp:280, atk:270, series:'Silver Tempest',
    sub:'Silver Tempest', badge:'EPIC VSTAR', set:'Silver Tempest', rarity_label:'Rare Holo VSTAR', number:'139/195', illus:'5ban Graphics',
    weak:'L ×2', resist:'—', retreat:'★★★',
    attacks:[
      {cost:['C','C','C','C'], name:'Tempest Dive', dmg:'280', desc:'Discard 2 Energy from this Pokémon.'},
      {cost:['C','C'], name:'Aero Ball', dmg:'—', desc:'Does 20 damage for each Energy attached to both Active Pokémon.'}
    ]
  },
  { img:'pokemon-cards/npPSLO51S39hPtX5rzoZHXKX2_0xrWbWeKhVv9SeiHI.jpeg', name:'Umbreon VMAX',   rarity:'epic',      type:'Darkness',  hp:310, atk:240, series:'Evolving Skies',
    sub:'Evolving Skies', badge:'EPIC VMAX', set:'Evolving Skies', rarity_label:'Rare Holo VMAX', number:'215/203', illus:'5ban Graphics',
    weak:'G ×2', resist:'—', retreat:'★★★',
    attacks:[
      {cost:['D','D','D'], name:'Max Darkness', dmg:'240', desc:''},
      {cost:['D'], name:'Dark Signal', dmg:'—', desc:'Switch 1 of your opponent\'s Benched Pokémon with their Active Pokémon.'}
    ]
  },
  { img:'pokemon-cards/U2US8ECIxX-OQdC-LqQ9LjU3kmJQsBq1LAfZJruZUog.jpeg', name:'Sylveon VMAX',   rarity:'epic',      type:'Fairy',     hp:310, atk:230, series:'Evolving Skies',
    sub:'Evolving Skies', badge:'EPIC VMAX', set:'Evolving Skies', rarity_label:'Rare Holo VMAX', number:'212/203', illus:'5ban Graphics',
    weak:'M ×2', resist:'D -30', retreat:'★★★',
    attacks:[
      {cost:['P','P','P'], name:'Max Harmony', dmg:'230', desc:'This attack does 30 more damage for each different type of Pokémon on your Bench.'},
      {cost:['C'], name:'Magical Ribbon', dmg:'—', desc:'Search your deck for up to 3 cards and put them into your hand.'}
    ]
  },
  { img:'pokemon-cards/bZni2XH1SLoFVa7ukQs-6c3hXmwGyafUR5QgNo8Wt3w.jpeg', name:'Mewtwo V',       rarity:'rare',      type:'Psychic',   hp:220, atk:200, series:'Brilliant Stars',
    sub:'Brilliant Stars', badge:'RARE V', set:'Brilliant Stars', rarity_label:'Ultra Rare', number:'172/172', illus:'Eske Yoshinob',
    weak:'D ×2', resist:'—', retreat:'★★',
    attacks:[
      {cost:['P','P'], name:'Psyshot', dmg:'200', desc:''},
      {cost:['C'], name:'Psy Purge', dmg:'—', desc:'Discard up to 3 Psychic Energy from your Pokémon. This attack does 60 damage for each card discarded.'}
    ]
  },
  { img:'pokemon-cards/gLERjG8bFekOCdkkNuc6_21v9eC38rdc5kKFg0-x3DE.jpeg', name:'Gengar V',       rarity:'rare',      type:'Psychic',   hp:210, atk:190, series:'Fusion Strike',
    sub:'Fusion Strike', badge:'RARE V', set:'Fusion Strike', rarity_label:'Ultra Rare', number:'269/264', illus:'Ryota Murayama',
    weak:'D ×2', resist:'—', retreat:'★★',
    attacks:[
      {cost:['P','P'], name:'Shadow Requiem', dmg:'190', desc:'Your opponent\'s Active Pokémon is now Confused.'},
      {cost:['C'], name:'Poltergeist', dmg:'—', desc:'Look at your opponent\'s hand. This attack does 50 damage for each Trainer card you find there.'}
    ]
  },
  { img:'pokemon-cards/LVWlk2uXaNGS4nioPF7Ofe3L5NENFz3HqCyhMKsOQkQ.jpeg', name:'Eevee V',        rarity:'rare',      type:'Colorless', hp:200, atk:160, series:'Evolving Skies',
    sub:'Evolving Skies', badge:'RARE V', set:'Evolving Skies', rarity_label:'Ultra Rare', number:'204/203', illus:'Shibuzoh.',
    weak:'F ×2', resist:'—', retreat:'★',
    attacks:[
      {cost:['C','C'], name:'Continuous Steps', dmg:'—', desc:'Flip coins until you get tails. This attack does 60 damage for each heads.'},
      {cost:['C'], name:'Gnaw', dmg:'30', desc:''}
    ]
  },
  { img:'pokemon-cards/Qaj3__4-GUuZ8QJmdSEC9gVki-ei_x72iLJAICZRtj0.jpeg', name:'Snorlax V',      rarity:'rare',      type:'Colorless', hp:230, atk:180, series:'Sword & Shield',
    sub:'Sword & Shield', badge:'RARE V', set:'Sword & Shield', rarity_label:'Ultra Rare', number:'141/202', illus:'5ban Graphics',
    weak:'F ×2', resist:'—', retreat:'★★★★',
    attacks:[
      {cost:['C','C','C'], name:'Falling Swipe', dmg:'180', desc:''},
      {cost:['C'], name:'Nap', dmg:'—', desc:'Heal 60 damage from this Pokémon.'}
    ]
  },
  { img:'pokemon-cards/sm3H9lQ21tcMGix-eCMmk3m7nAt5WV7G6xamc8HqqvI.jpeg', name:'Dragonite V',    rarity:'rare',      type:'Dragon',    hp:220, atk:200, series:'Fusion Strike',
    sub:'Fusion Strike', badge:'RARE V', set:'Fusion Strike', rarity_label:'Ultra Rare', number:'191/264', illus:'5ban Graphics',
    weak:'—', resist:'—', retreat:'★★★',
    attacks:[
      {cost:['L','W','C'], name:'Hurricane Charge', dmg:'200', desc:''},
      {cost:['C','C'], name:'Dragon Claw', dmg:'80', desc:''}
    ]
  },
  { img:'pokemon-cards/ZU7OBcSwBOxbGU9vXkHLGTUOOpXQVrkOet4IhOVGcEo.jpeg', name:'Alakazam V',     rarity:'rare',      type:'Psychic',   hp:210, atk:190, series:'Brilliant Stars',
    sub:'Brilliant Stars', badge:'RARE V', set:'Brilliant Stars', rarity_label:'Ultra Rare', number:'171/172', illus:'Eske Yoshinob',
    weak:'D ×2', resist:'—', retreat:'★',
    attacks:[
      {cost:['P','P'], name:'Zen Headbutt', dmg:'190', desc:''},
      {cost:['C'], name:'Spoon Bend', dmg:'—', desc:'Move up to 3 damage counters from 1 of your opponent\'s Pokémon to another.'}
    ]
  },
  { img:'pokemon-cards/DBmUtJ_x_jMEixXyo65Ob-HNHFKumWwQaNlwDXZ6n54.jpeg', name:'Bulbasaur',      rarity:'common',    type:'Grass',     hp:70,  atk:50,  series:'Base Set',
    sub:'Base Set', badge:'COMMON', set:'Base Set', rarity_label:'Common', number:'44/102', illus:'Mitsuhiro Arita',
    weak:'R ×2', resist:'—', retreat:'★',
    attacks:[
      {cost:['G'], name:'Vine Whip', dmg:'20', desc:''},
      {cost:['G','G'], name:'Razor Leaf', dmg:'40', desc:''}
    ]
  },
  { img:'pokemon-cards/if192uydcn9LCIe1lnq4r4y1esXyp6qi2z3LGYwMh5s.jpeg', name:'Squirtle',       rarity:'common',    type:'Water',     hp:60,  atk:40,  series:'Base Set',
    sub:'Base Set', badge:'COMMON', set:'Base Set', rarity_label:'Common', number:'63/102', illus:'Ken Sugimori',
    weak:'L ×2', resist:'—', retreat:'★',
    attacks:[
      {cost:['W'], name:'Bubble', dmg:'10', desc:'Flip a coin. If heads, the Defending Pokémon is now Paralyzed.'},
      {cost:['W','W'], name:'Withdraw', dmg:'—', desc:'Flip a coin. If heads, prevent all damage done to Squirtle during your opponent\'s next turn.'}
    ]
  },
  { img:'pokemon-cards/mJUwvTc4AUZwZaP4PzL6AyeiIAbYzNRKvkwDKEwsZEA.jpeg', name:'Charmander',     rarity:'common',    type:'Fire',      hp:60,  atk:50,  series:'Base Set',
    sub:'Base Set', badge:'COMMON', set:'Base Set', rarity_label:'Common', number:'46/102', illus:'Mitsuhiro Arita',
    weak:'W ×2', resist:'—', retreat:'★',
    attacks:[
      {cost:['R'], name:'Ember', dmg:'30', desc:'Discard 1 Fire Energy from Charmander.'},
      {cost:['C'], name:'Scratch', dmg:'10', desc:''}
    ]
  },
  { img:'pokemon-cards/VIe3dY5o7nJ2xpiTXd2OXwq3PyBSUzaKcRIKS3R2SrI.jpeg', name:'Jigglypuff',     rarity:'common',    type:'Colorless', hp:60,  atk:30,  series:'Base Set',
    sub:'Base Set', badge:'COMMON', set:'Base Set', rarity_label:'Common', number:'54/102', illus:'Mitsuhiro Arita',
    weak:'F ×2', resist:'P -30', retreat:'★',
    attacks:[
      {cost:['C'], name:'Sing', dmg:'—', desc:'The Defending Pokémon is now Asleep.'},
      {cost:['C','C'], name:'Pound', dmg:'20', desc:''}
    ]
  },
  { img:'pokemon-cards/sGTuFk59UhQ8eNu2bfU736SK36_sslP9ermDf3Jo00A.jpeg', name:'Psyduck',        rarity:'common',    type:'Water',     hp:60,  atk:40,  series:'Base Set',
    sub:'Base Set', badge:'COMMON', set:'Base Set', rarity_label:'Common', number:'53/102', illus:'Mitsuhiro Arita',
    weak:'L ×2', resist:'—', retreat:'★',
    attacks:[
      {cost:['W'], name:'Headache', dmg:'—', desc:"The Defending Pokémon can't use any Pokémon Powers until the end of your opponent's next turn."},
      {cost:['W','W'], name:'Confusion', dmg:'30', desc:'Flip a coin. If heads, the Defending Pokémon is now Confused.'}
    ]
  },
  { img:'pokemon-cards/ZWrDt4H6MWSjlCJoyziRq6gsJ7JaYW74vVmJ1YoRGgA.jpeg', name:'Magikarp',       rarity:'common',    type:'Water',     hp:30,  atk:10,  series:'Base Set',
    sub:'Base Set', badge:'COMMON', set:'Base Set', rarity_label:'Common', number:'35/102', illus:'Mitsuhiro Arita',
    weak:'L ×2', resist:'—', retreat:'★',
    attacks:[
      {cost:['C'], name:'Flail', dmg:'—', desc:'Does 10 damage times the number of damage counters on Magikarp.'},
      {cost:['W'], name:'Tackle', dmg:'10', desc:''}
    ]
  },
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
function buildEnergyDot(type) {
  return '<span class="cd-energy ' + type + '">' + type + '</span>';
}

window.showDetail = function(card) {
  // Build attacks HTML
  var attacksHtml = '';
  if (card.attacks && card.attacks.length) {
    card.attacks.forEach(function(a) {
      var energyHtml = (a.cost || []).map(function(c){ return buildEnergyDot(c); }).join('');
      attacksHtml +=
        '<div class="cd-attack">' +
          '<div class="cd-attack-row">' +
            energyHtml +
            '<span class="cd-attack-name">' + a.name + '</span>' +
            (a.dmg ? '<span class="cd-attack-dmg">' + a.dmg + '</span>' : '') +
          '</div>' +
          (a.desc ? '<div class="cd-attack-desc">' + a.desc + '</div>' : '') +
        '</div>';
    });
  }

  var rarityColor = RARITY_COLOR[card.rarity] || '#fff';
  var rarityLabel = RARITY_LABEL[card.rarity] || card.rarity;

  var html =
    '<div class="cd-top">' +
      '<img class="cd-img" src="' + card.img + '" alt="' + card.name + '">' +
      '<div class="cd-info">' +
        '<span class="cd-sub">' + (card.sub || card.series || '') + '</span>' +
        '<span class="cd-badge" style="color:' + rarityColor + ';background:' + rarityColor + '22;border:1px solid ' + rarityColor + '55;">' + rarityLabel + '</span>' +
        '<div class="cd-name">' + card.name + '</div>' +
        (card.hp ? '<div class="cd-hp">' + card.hp + '<span>HP</span></div>' : '') +
      '</div>' +
    '</div>' +
    '<div class="cd-divider"></div>' +
    attacksHtml +
    (attacksHtml ? '<div class="cd-divider"></div>' : '') +
    '<div class="cd-wwr">' +
      '<span class="cd-wwr-label">Weakness</span><span class="cd-wwr-val">' + (card.weak || '—') + '</span>' +
      '<span class="cd-wwr-sep"></span>' +
      '<span class="cd-wwr-label">Resistance</span><span class="cd-wwr-val">' + (card.resist || '—') + '</span>' +
      '<span class="cd-wwr-sep"></span>' +
      '<span class="cd-wwr-label">Retreat</span><span class="cd-wwr-val">' + (card.retreat || '—') + '</span>' +
    '</div>' +
    '<div class="cd-footer">' +
      '<div class="cd-footer-row"><span class="cd-footer-key">Set</span><span class="cd-footer-val">' + (card.set || card.series || '—') + '</span></div>' +
      '<div class="cd-footer-row"><span class="cd-footer-key">Rarity</span><span class="cd-footer-val rarity-val">' + (card.rarity_label || rarityLabel) + (card.number ? ' · ' + card.number : '') + '</span></div>' +
      (card.illus && card.illus !== '—' ? '<div class="cd-footer-row"><span class="cd-footer-key">Illustrator</span><span class="cd-footer-val">' + card.illus + '</span></div>' : '') +
    '</div>';

  // Panggil parent (gachakonten.html) yang punya modal di luar iframe
  try {
    if (window.parent && typeof window.parent.showCardDetail === 'function') {
      window.parent.showCardDetail(html);
      return;
    }
  } catch(e) {}

  // Fallback: render di dokumen sendiri jika tidak ada parent
  var overlay = document.getElementById('cardDetailOverlay') || document.getElementById('gcdOverlay');
  var content = document.getElementById('cardDetailContent') || document.getElementById('gcdContent');
  if (overlay && content) {
    content.innerHTML = html;
    overlay.classList.add('show');
  }
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
  console.log('doGacha called with pulls:', pulls);
  var cards = [];
  for (var i = 0; i < pulls; i++) cards.push(rollCard());
  console.log('Generated cards:', cards.length);

  var sorted = cards.slice().sort(function(a, b) {
    return RARITY_ORDER.indexOf(a.rarity) - RARITY_ORDER.indexOf(b.rarity);
  });
  console.log('Sorted cards:', sorted);

  var grid = document.getElementById('gp-grid');
  var summaryEl = document.getElementById('gp-summary');
  console.log('Grid element:', grid);
  console.log('Summary element:', summaryEl);
  if (!grid) {
    console.error('Grid element not found!');
    return;
  }

  var autoReveal = pulls > 1; // x10 & x100 langsung tampil semua
  console.log('Auto reveal:', autoReveal);

  var html = '';
  sorted.forEach(function(card, i) {
    var cardHtml = makeCardHTML(card, i, i === 0, autoReveal);
    html += cardHtml;
    console.log('Card HTML generated for index', i, ':', cardHtml.substring(0, 100) + '...');
  });
  console.log('Final HTML length:', html.length);
  grid.innerHTML = html;
  // x1: tambah class single-card untuk centering vertikal
  if (pulls === 1) {
    grid.classList.add('single-card');
  } else {
    grid.classList.remove('single-card');
  }
  console.log('Grid innerHTML set');

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
  console.log('Gacha pull script loaded');
  var pulls = parseInt(new URLSearchParams(location.search).get('pulls')) || 1;
  console.log('Pulls:', pulls);
  var title = document.getElementById('gp-title');
  if (title) {
    title.textContent = 'GACHA × ' + pulls;
    console.log('Title updated');
  }
  initCanvas();
  doGacha(pulls);
  console.log('Gacha initialized');
});

// Also try immediate execution in case DOMContentLoaded already fired
if (document.readyState === 'loading') {
  // DOM is still loading, wait for event
} else {
  // DOM is already loaded, execute immediately
  console.log('DOM already loaded, executing immediately');
  var pulls = parseInt(new URLSearchParams(location.search).get('pulls')) || 1;
  console.log('Pulls:', pulls);
  var title = document.getElementById('gp-title');
  if (title) {
    title.textContent = 'GACHA × ' + pulls;
    console.log('Title updated immediately');
  }
  initCanvas();
  doGacha(pulls);
  console.log('Gacha initialized immediately');
}

