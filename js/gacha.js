// ===== CARD POOL =====
const CARDS = [
  { img: 'pokemon-cards/_-Cek9cr07LvG455A07v4j33ALumZ-wNPbekp55EdRY.jpeg',  rarity: 'legendary', name: 'Charizard EX' },
  { img: 'pokemon-cards/73l51yZHpPLOIK2kg8gsba2FRbX5ubrJYivG1ZY6OUA.jpeg',  rarity: 'epic',      name: 'Pikachu VMAX' },
  { img: 'pokemon-cards/bZni2XH1SLoFVa7ukQs-6c3hXmwGyafUR5QgNo8Wt3w.jpeg', rarity: 'rare',      name: 'Mewtwo V' },
  { img: 'pokemon-cards/DBmUtJ_x_jMEixXyo65Ob-HNHFKumWwQaNlwDXZ6n54.jpeg', rarity: 'common',    name: 'Bulbasaur' },
  { img: 'pokemon-cards/gLERjG8bFekOCdkkNuc6_21v9eC38rdc5kKFg0-x3DE.jpeg', rarity: 'rare',      name: 'Gengar V' },
  { img: 'pokemon-cards/Hc7QMiT980rB_6MEvb9rJ6gRoOwgGGGcYfeT9dvqLxE.jpeg', rarity: 'epic',      name: 'Lugia VSTAR' },
  { img: 'pokemon-cards/if192uydcn9LCIe1lnq4r4y1esXyp6qi2z3LGYwMh5s.jpeg', rarity: 'common',    name: 'Squirtle' },
  { img: 'pokemon-cards/LVWlk2uXaNGS4nioPF7Ofe3L5NENFz3HqCyhMKsOQkQ.jpeg', rarity: 'rare',      name: 'Eevee V' },
  { img: 'pokemon-cards/m13qNSEFwa0fwsXI6xC-69CqnH1V11Y0VCqFEwn6p2w.jpeg', rarity: 'legendary', name: 'Rayquaza EX' },
  { img: 'pokemon-cards/mJUwvTc4AUZwZaP4PzL6AyeiIAbYzNRKvkwDKEwsZEA.jpeg', rarity: 'common',    name: 'Charmander' },
  { img: 'pokemon-cards/npPSLO51S39hPtX5rzoZHXKX2_0xrWbWeKhVv9SeiHI.jpeg', rarity: 'epic',      name: 'Umbreon VMAX' },
  { img: 'pokemon-cards/Qaj3__4-GUuZ8QJmdSEC9gVki-ei_x72iLJAICZRtj0.jpeg', rarity: 'rare',      name: 'Snorlax V' },
  { img: 'pokemon-cards/sGTuFk59UhQ8eNu2bfU736SK36_sslP9ermDf3Jo00A.jpeg', rarity: 'common',    name: 'Psyduck' },
  { img: 'pokemon-cards/sm3H9lQ21tcMGix-eCMmk3m7nAt5WV7G6xamc8HqqvI.jpeg', rarity: 'rare',      name: 'Dragonite V' },
  { img: 'pokemon-cards/U2US8ECIxX-OQdC-LqQ9LjU3kmJQsBq1LAfZJruZUog.jpeg', rarity: 'epic',      name: 'Sylveon VMAX' },
  { img: 'pokemon-cards/VIe3dY5o7nJ2xpiTXd2OXwq3PyBSUzaKcRIKS3R2SrI.jpeg', rarity: 'common',    name: 'Jigglypuff' },
  { img: 'pokemon-cards/ZA8TA0g5foXDKfBjuSl0_-L7j9_VE_3zsGNw2S-oDA0.jpeg', rarity: 'legendary', name: 'Mew EX' },
  { img: 'pokemon-cards/ZU7OBcSwBOxbGU9vXkHLGTUOOpXQVrkOet4IhOVGcEo.jpeg', rarity: 'rare',      name: 'Alakazam V' },
  { img: 'pokemon-cards/ZWrDt4H6MWSjlCJoyziRq6gsJ7JaYW74vVmJ1YoRGgA.jpeg', rarity: 'common',    name: 'Magikarp' },
];

const RARITY_LABEL = { legendary:'⭐ LEGENDARY', epic:'💎 EPIC', rare:'🔵 RARE', common:'⚪ COMMON' };
const RARITY_COLOR = { legendary:'#ffd700', epic:'#c084fc', rare:'#60a5fa', common:'#d1d5db' };

let pity = 30;
let pullResults = [];
let currentIdx  = 0;
let isBusy      = false;

// ===== ROLL =====
function rollCard() {
  const r = Math.random() * 100;
  let rarity = r < 1 ? 'legendary' : r < 6 ? 'epic' : r < 26 ? 'rare' : 'common';
  pity++;
  if (pity >= 90) { rarity = 'legendary'; pity = 0; }
  const pool = CARDS.filter(c => c.rarity === rarity);
  return pool[Math.floor(Math.random() * pool.length)];
}

function updatePity() {
  document.getElementById('pity-fill').style.width = (pity / 90 * 100) + '%';
  document.getElementById('pity-txt').textContent  = pity + '/90';
}

// ===== START PULL =====
function startPull(count) {
  if (isBusy) return;
  isBusy = true;
  pullResults = [];
  for (let i = 0; i < count; i++) pullResults.push(rollCard());
  updatePity();
  currentIdx = 0;

  // Switch to summon screen
  document.getElementById('screen-lobby').classList.add('hidden');
  const ss = document.getElementById('screen-summon');
  ss.classList.remove('hidden');

  // Reset summon screen state
  document.getElementById('summon-orb-stage').classList.remove('hidden');
  document.getElementById('single-reveal').classList.add('hidden');
  document.getElementById('all-result').classList.add('hidden');
  document.getElementById('flash-overlay').className = 'flash-overlay';

  // Orb click → start reveal
  const stage = document.getElementById('summon-orb-stage');
  stage.onclick = () => beginReveal();
}

// ===== BEGIN REVEAL (orb explode) =====
function beginReveal() {
  const stage = document.getElementById('summon-orb-stage');
  stage.onclick = null;

  // Orb shake then explode
  const orb = document.getElementById('s-orb');
  orb.style.animation = 'none';
  orb.style.transform = 'scale(1.2)';

  setTimeout(() => {
    // Flash
    const flash = document.getElementById('flash-overlay');
    flash.className = 'flash-overlay do-flash';

    setTimeout(() => {
      stage.classList.add('hidden');
      showSingleCard();
    }, 300);
  }, 200);
}

// ===== SHOW SINGLE CARD =====
function showSingleCard() {
  if (currentIdx >= pullResults.length) {
    showAllResult();
    return;
  }

  const card = pullResults[currentIdx];
  const reveal = document.getElementById('single-reveal');
  const srCard = document.getElementById('sr-card');
  const front  = document.getElementById('sr-card-front');
  const rarEl  = document.getElementById('sr-rarity');
  const nextBtn= document.getElementById('sr-next-btn');

  // Reset
  reveal.classList.remove('hidden');
  srCard.className = 'sr-card';
  srCard.style.transform = 'rotateY(180deg)';
  front.innerHTML = '';
  rarEl.className = 'sr-rarity';
  nextBtn.className = 'sr-next-btn';

  // Set front image
  const img = document.createElement('img');
  img.src = card.img;
  img.alt = card.name;
  front.appendChild(img);

  // Rarity label
  rarEl.textContent = RARITY_LABEL[card.rarity];
  rarEl.classList.add(card.rarity);

  // Flip card after short delay
  setTimeout(() => {
    srCard.classList.add('flipped', card.rarity);

    // Flash for rare+
    const flash = document.getElementById('flash-overlay');
    if (card.rarity === 'legendary') {
      flash.className = 'flash-overlay legendary-flash';
      spawnBurst(200, 'gold');
    } else if (card.rarity === 'epic') {
      flash.className = 'flash-overlay epic-flash';
      spawnBurst(120, 'purple');
    } else if (card.rarity === 'rare') {
      spawnBurst(60, 'blue');
    }

    // Show rarity + next button
    setTimeout(() => {
      rarEl.classList.add('show');
      nextBtn.classList.add('show');
    }, 400);
  }, 300);

  // Next button
  nextBtn.onclick = () => {
    currentIdx++;
    if (currentIdx >= pullResults.length) {
      showAllResult();
    } else {
      // Quick transition
      srCard.style.transition = 'none';
      srCard.style.transform  = 'rotateY(180deg)';
      rarEl.className  = 'sr-rarity';
      nextBtn.className = 'sr-next-btn';
      setTimeout(() => {
        srCard.style.transition = '';
        showSingleCard();
      }, 50);
    }
  };
}

// ===== ALL RESULT =====
function showAllResult() {
  document.getElementById('single-reveal').classList.add('hidden');
  const allResult = document.getElementById('all-result');
  const grid      = document.getElementById('all-result-grid');
  const title     = document.getElementById('all-result-title');
  grid.innerHTML  = '';

  // Best rarity title
  const order = ['legendary','epic','rare','common'];
  const best  = pullResults.reduce((a,b) => order.indexOf(a.rarity) < order.indexOf(b.rarity) ? a : b);
  if (best.rarity === 'legendary')     title.textContent = '🌟 LEGENDARY PULL! 🌟';
  else if (best.rarity === 'epic')     title.textContent = '💎 EPIC PULL!';
  else                                 title.textContent = 'HASIL SUMMON!';

  allResult.classList.remove('hidden');

  pullResults.forEach((card, i) => {
    const el = document.createElement('div');
    el.className = `res-card ${card.rarity}`;
    el.innerHTML = `<img src="${card.img}" alt="${card.name}"/><div class="res-badge">${RARITY_LABEL[card.rarity]}</div>`;
    grid.appendChild(el);
    setTimeout(() => el.classList.add('show'), 80 + i * 100);
  });

  isBusy = false;
}

// ===== CLOSE =====
function closeResult() {
  document.getElementById('screen-summon').classList.add('hidden');
  document.getElementById('screen-lobby').classList.remove('hidden');
  document.getElementById('all-result').classList.add('hidden');
  document.getElementById('single-reveal').classList.add('hidden');
  document.getElementById('summon-orb-stage').classList.remove('hidden');
  document.getElementById('flash-overlay').className = 'flash-overlay';
  isBusy = false;
}

// ===== PARTICLES =====
const canvas = document.getElementById('particles');
const ctx    = canvas.getContext('2d');
let particles = [];

function resize() { canvas.width = innerWidth; canvas.height = innerHeight; }
window.addEventListener('resize', resize); resize();

function spawnBurst(count, type) {
  const cx = innerWidth / 2, cy = innerHeight / 2;
  const colors = {
    gold:   ['#ffd700','#ffb300','#ff8c00','#fff8c0'],
    purple: ['#c084fc','#a855f7','#7c3aed','#e9d5ff'],
    blue:   ['#60a5fa','#3b82f6','#93c5fd'],
  };
  const palette = colors[type] || colors.gold;
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 3 + Math.random() * 8;
    particles.push({
      x: cx, y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 2,
      size: 3 + Math.random() * 6,
      color: palette[Math.floor(Math.random() * palette.length)],
      life: 1, decay: 0.015 + Math.random() * 0.02,
      shape: Math.random() > 0.5 ? 'circle' : 'star',
    });
  }
}

function spawnAmbient() {
  if (particles.length < 40 && Math.random() < 0.3) {
    particles.push({
      x: Math.random() * canvas.width,
      y: canvas.height + 10,
      vx: (Math.random() - 0.5) * 1.5,
      vy: -(1 + Math.random() * 2),
      size: 2 + Math.random() * 4,
      color: `hsl(${40 + Math.random()*30},80%,60%)`,
      life: 1, decay: 0.006,
      shape: 'circle',
    });
  }
}

function drawStar(x, y, r, alpha, color) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const a = (i * 4 * Math.PI) / 5 - Math.PI / 2;
    const b = (i * 4 * Math.PI) / 5 + (2 * Math.PI) / 5 - Math.PI / 2;
    i === 0 ? ctx.moveTo(x + r * Math.cos(a), y + r * Math.sin(a))
            : ctx.lineTo(x + r * Math.cos(a), y + r * Math.sin(a));
    ctx.lineTo(x + (r/2) * Math.cos(b), y + (r/2) * Math.sin(b));
  }
  ctx.closePath(); ctx.fill(); ctx.restore();
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  spawnAmbient();
  particles = particles.filter(p => p.life > 0.01);
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy; p.vy += 0.08;
    p.life -= p.decay;
    if (p.shape === 'star') {
      drawStar(p.x, p.y, p.size, p.life, p.color);
    } else {
      ctx.save();
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill(); ctx.restore();
    }
  });
  requestAnimationFrame(animateParticles);
}

animateParticles();
