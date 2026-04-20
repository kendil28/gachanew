/* ===== GACHA PULL ENGINE ===== */
(function() {

var DB = {
  common: [
    {name:'Rattata',icon:'🐭',type:'Colorless',skill:'Tackle',dmg:10,hp:30},
    {name:'Pidgey',icon:'🕊️',type:'Colorless',skill:'Gust',dmg:10,hp:40},
    {name:'Caterpie',icon:'🐛',type:'Grass',skill:'String Shot',dmg:10,hp:30},
    {name:'Zubat',icon:'🦇',type:'Psychic',skill:'Leech Life',dmg:10,hp:40},
    {name:'Geodude',icon:'🪨',type:'Fighting',skill:'Rock Throw',dmg:10,hp:50},
    {name:'Magikarp',icon:'🐟',type:'Water',skill:'Splash',dmg:0,hp:30},
    {name:'Oddish',icon:'🌱',type:'Grass',skill:'Absorb',dmg:20,hp:40},
    {name:'Diglett',icon:'🕳️',type:'Fighting',skill:'Dig',dmg:20,hp:40}
  ],
  rare: [
    {name:'Pikachu',icon:'⚡',type:'Lightning',skill:'Thunder Jolt',dmg:30,hp:60},
    {name:'Charmander',icon:'🔥',type:'Fire',skill:'Ember',dmg:30,hp:60},
    {name:'Squirtle',icon:'🐢',type:'Water',skill:'Water Gun',dmg:30,hp:60},
    {name:'Bulbasaur',icon:'🌿',type:'Grass',skill:'Vine Whip',dmg:30,hp:60},
    {name:'Eevee',icon:'🦊',type:'Colorless',skill:'Quick Attack',dmg:20,hp:50},
    {name:'Jigglypuff',icon:'🎤',type:'Colorless',skill:'Sing',dmg:0,hp:60}
  ],
  superRare: [
    {name:'Gengar',icon:'👻',type:'Psychic',skill:'Shadow Ball',dmg:60,hp:90},
    {name:'Dragonair',icon:'🐉',type:'Dragon',skill:'Dragon Rage',dmg:50,hp:80},
    {name:'Arcanine',icon:'🐕',type:'Fire',skill:'Flame Wheel',dmg:60,hp:100},
    {name:'Alakazam',icon:'🧠',type:'Psychic',skill:'Psychic',dmg:70,hp:80}
  ],
  ultraRare: [
    {name:'Gyarados',icon:'🌊',type:'Water',skill:'Hydro Pump',dmg:90,hp:130},
    {name:'Dragonite',icon:'🌠',type:'Dragon',skill:'Hyper Beam',dmg:100,hp:140},
    {name:'Charizard',icon:'🌋',type:'Fire',skill:'Fire Spin',dmg:80,hp:120}
  ],
  legendary: [
    {name:'Mewtwo',icon:'🔮',type:'Psychic',skill:'Psystrike',dmg:120,hp:160},
    {name:'Lugia',icon:'🌪️',type:'Colorless',skill:'Aeroblast',dmg:110,hp:150},
    {name:'Ho-Oh',icon:'🌈',type:'Fire',skill:'Sacred Fire',dmg:110,hp:150}
  ]
};

var RC = {
  common:    {label:'COMMON',     color:'#8a8a9a', chance:0.40, grad:'rgba(138,138,154,'},
  rare:      {label:'RARE',       color:'#3b9eff', chance:0.30, grad:'rgba(59,158,255,'},
  superRare: {label:'SUPER RARE', color:'#a855f7', chance:0.18, grad:'rgba(168,85,247,'},
  ultraRare: {label:'ULTRA RARE', color:'#ff3366', chance:0.09, grad:'rgba(255,51,102,'},
  legendary: {label:'LEGENDARY',  color:'#ffd700', chance:0.03, grad:'rgba(255,215,0,'}
};
var RO = ['common','rare','superRare','ultraRare','legendary'];

function roll() {
  var r = Math.random(), c = 0;
  for (var i = 0; i < RO.length; i++) {
    c += RC[RO[i]].chance;
    if (r <= c) return RO[i];
  }
  return 'common';
}

function getCard(rar) {
  var p = DB[rar];
  var c = p[Math.floor(Math.random() * p.length)];
  return {name:c.name, icon:c.icon, type:c.type, skill:c.skill, dmg:c.dmg, hp:c.hp, rarity:rar};
}

var typeGrad = {
  Fire:'linear-gradient(135deg,#ff4500,#ff8c00)',
  Water:'linear-gradient(135deg,#0077be,#00bfff)',
  Grass:'linear-gradient(135deg,#228b22,#66cdaa)',
  Lightning:'linear-gradient(135deg,#ffd700,#ffed4a)',
  Psychic:'linear-gradient(135deg,#9932cc,#da70d6)',
  Fighting:'linear-gradient(135deg,#8b4513,#cd853f)',
  Dragon:'linear-gradient(135deg,#1e3a5f,#4682b4)',
  Colorless:'linear-gradient(135deg,#4a4a5a,#7a7a8a)'
};

function makeCardHTML(d) {
  var rc = RC[d.rarity];
  var tg = typeGrad[d.type] || typeGrad.Colorless;
  var glowStyle = d.rarity === 'legendary' ? 'box-shadow:0 0 20px rgba(255,215,0,.4),inset 0 0 20px rgba(255,215,0,.06);' :
                  d.rarity === 'ultraRare' ? 'box-shadow:0 0 15px rgba(255,51,102,.25);' : '';
  return '<div class="gp-card r-' + d.rarity + '" style="border-color:' + rc.color + ';' + glowStyle + '">' +
    '<div class="gp-card-header"><span class="gp-name">' + d.name + '</span><span class="gp-hp" style="color:#ff6b6b">' + d.hp + ' HP</span></div>' +
    '<div class="gp-art"><div class="gp-art-bg" style="background:' + tg + '"></div><span class="gp-icon">' + d.icon + '</span></div>' +
    '<div class="gp-info">' +
      '<div class="gp-type">' + d.type + '</div>' +
      '<div class="gp-skill"><span>' + d.skill + '</span><span style="color:#ffd700;font-weight:700">' + (d.dmg > 0 ? d.dmg : '—') + '</span></div>' +
      '<div class="gp-rarity" style="color:' + rc.color + '">' + rc.label + '</div>' +
    '</div>' +
  '</div>';
}

function showSummary(cards) {
  var ct = {};
  RO.forEach(function(r){ ct[r] = 0; });
  cards.forEach(function(c){ ct[c.rarity]++; });
  var html = '<div class="gp-summary">';
  RO.forEach(function(r){
    if (ct[r] > 0) html += '<div class="gp-sum-item"><span class="gp-sum-num" style="color:' + RC[r].color + '">' + ct[r] + '</span><span class="gp-sum-label">' + RC[r].label + '</span></div>';
  });
  html += '</div>';
  return html;
}

function doGacha(pulls) {
  var cards = [];
  for (var i = 0; i < pulls; i++) cards.push(getCard(roll()));

  // Sort: legendary first
  var sorted = cards.slice().sort(function(a,b){ return RO.indexOf(b.rarity) - RO.indexOf(a.rarity); });

  var grid = document.getElementById('gp-grid');
  var summary = document.getElementById('gp-summary');
  if (!grid) return;

  grid.innerHTML = '';
  sorted.forEach(function(c, i) {
    var div = document.createElement('div');
    div.className = 'gp-slot';
    div.style.animationDelay = (i * 0.06) + 's';
    div.innerHTML = makeCardHTML(c);
    grid.appendChild(div);
  });

  if (summary) summary.innerHTML = showSummary(cards);

  // Flash for legendary
  var hasLeg = cards.some(function(c){ return c.rarity === 'legendary'; });
  var hasUR  = cards.some(function(c){ return c.rarity === 'ultraRare'; });
  var flash = document.getElementById('gp-flash');
  if (flash) {
    if (hasLeg) { flash.style.background = 'radial-gradient(circle,rgba(255,215,0,.35),transparent 70%)'; flash.classList.add('active'); }
    else if (hasUR) { flash.style.background = 'radial-gradient(circle,rgba(255,51,102,.25),transparent 70%)'; flash.classList.add('active'); }
    setTimeout(function(){ flash.classList.remove('active'); }, 800);
  }
}

// Auto-run on load
window.addEventListener('DOMContentLoaded', function() {
  var pulls = parseInt(new URLSearchParams(location.search).get('pulls')) || 1;
  var title = document.getElementById('gp-title');
  if (title) title.textContent = 'GACHA × ' + pulls;
  doGacha(pulls);
});

})();
