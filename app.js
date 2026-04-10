// ================================================
//   BIRTHDAY WEBSITE - JAVASCRIPT
// ================================================

// ---- CONFIGURATION ----
const CONFIG = {
  birthdayDate: new Date('2025-04-11'), // Her birthday — change year to actual
  herName: 'Beautiful Soul',            // 🌸 Replace with her actual name!
  yourName: 'Your Name'                 // Replace with your name
};

// ---- DOM READY ----
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initNavbar();
  initAgeTimer();
  initLetterTabs();
  initGameTabs();
  initMemory();
  initBalloons();
  initWishSky();
  launchConfetti(); // Small welcome confetti
  setTimeout(() => document.getElementById('confettiCanvas').style.opacity = 0, 4000);
});

// ================================================
//  PARTICLES
// ================================================
function initParticles() {
  const container = document.getElementById('particles-container');
  const symbols = ['💖', '✨', '🌸', '⭐', '💕', '🎀', '💫', '🌟', '🎊', '💗'];
  for (let i = 0; i < 25; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${8 + Math.random() * 15}s`;
    particle.style.animationDelay = `${-Math.random() * 15}s`;
    particle.style.fontSize = `${0.8 + Math.random() * 1.2}rem`;
    particle.style.opacity = 0.4 + Math.random() * 0.4;
    container.appendChild(particle);
  }
}

// ================================================
//  NAVBAR
// ================================================
function initNavbar() {
  const toggle = document.getElementById('navToggle');
  const navbar = document.getElementById('navbar');
  toggle.addEventListener('click', () => navbar.classList.toggle('open'));
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => navbar.classList.remove('open'));
  });
  window.addEventListener('scroll', () => {
    navbar.style.background = window.scrollY > 50
      ? 'rgba(5, 0, 15, 0.95)'
      : 'rgba(10, 0, 20, 0.7)';
  });
}

// ================================================
//  AGE TIMER
// ================================================
function initAgeTimer() {
  const display = document.getElementById('ageTimer');
  const firstTalk = new Date('2026-02-23'); // 23/02/2026 — the day you first talked 💖
  const now = new Date();
  const diffMs = now - firstTalk;
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  display.textContent = `${days} days, ${hours} hrs 💬`;
}

// ================================================
//  LETTER TABS
// ================================================
function initLetterTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.letter-content').forEach(c => c.style.display = 'none');
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab).style.display = 'block';
    });
  });
}

// ================================================
//  GAMES TABS
// ================================================
function initGameTabs() {
  document.querySelectorAll('.game-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.game-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.game-panel').forEach(p => p.style.display = 'none');
      tab.classList.add('active');
      const panel = document.getElementById('game-' + tab.dataset.game);
      panel.style.display = 'block';
      if (tab.dataset.game === 'memory') initMemory();
      if (tab.dataset.game === 'wish') initWishSky();
      if (tab.dataset.game === 'stars') resetStarCatcher();
    });
  });
}

// ================================================
//  QUIZ GAME
// ================================================
const QUIZ_QUESTIONS = [
  {
    q: "Birthday pe sabse zaroori cheez kya hoti hai? 🎂",
    opts: [
      "Tohfe aur gifts 🎁",
      "Dil se aayi muskaan 😊",
      "Badi si party 🎉",
      "Kuch nahi 🙅‍♀️"           // <-- her famous words 😄
    ],
    a: 3
  },
  {
    q: "Birthday ko best describe kaun karta hai? ✨",
    opts: [
      "Bas ek aur din hai 😶",
      "Apni zindagi ka jashn manana 🌟",
      "Jaroorat nahi 🙅‍♀️",
      "Office se bas chhutti milti hai 😴"
    ],
    a: 2
  },
  {
    q: "Sabse rare birthday wish kaisi hoti hai? 💌",
    opts: [
      "WhatsApp pe ek text 📱",
      "Phone call kar dena ☎️",
      "Jaroorat nahi 🙅‍♀️",
      "Birthday card bhej dena 🎀"
    ],
    a: 2
  },
  {
    q: "Tujhe kitne stars deserve hote hain? ⭐",
    opts: [
      "Thik hai 🙄",
      "Kuch zyada... teen ya chaar ⭐⭐⭐",
      "Bahut saare! ⭐⭐⭐⭐",
      "Infinite! Poore universe kitne ✨∞✨"
    ],
    a: 0
  },
  {
    q: "Birthday pe best time kaise spend karein? 🎉",
    opts: [
      "Akele ghar mein kitaab padh 📚",
      "Apno ke saath celebrate karo 💖",
      "Din bhar shopping karo 🛍️",
      "Kahi ni jana, nahiiiiiiiiiiiiii 🏠😭"
    ],
    a: 3
  }
];

let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;

function startQuiz() {
  quizIndex = 0;
  quizScore = 0;
  document.getElementById('startQuizBtn').style.display = 'none';
  document.getElementById('quizResult').style.display = 'none';
  document.getElementById('quizTotal').textContent = QUIZ_QUESTIONS.length;
  renderQuestion();
}

function renderQuestion() {
  const q = QUIZ_QUESTIONS[quizIndex];
  document.getElementById('quizProgressBar').style.width = `${(quizIndex / QUIZ_QUESTIONS.length) * 100}%`;
  document.getElementById('quizScore').textContent = quizScore;
  document.getElementById('quizQuestion').textContent = `Q${quizIndex + 1}. ${q.q}`;

  const optContainer = document.getElementById('quizOptions');
  optContainer.innerHTML = '';
  quizAnswered = false;

  q.opts.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.textContent = opt;
    btn.addEventListener('click', () => {
      if (quizAnswered) return;
      quizAnswered = true;
      const opts = document.querySelectorAll('.quiz-option');
      opts[q.a].classList.add('correct');
      if (i !== q.a) { btn.classList.add('wrong'); }
      else { quizScore++; document.getElementById('quizScore').textContent = quizScore; }
      setTimeout(() => {
        quizIndex++;
        if (quizIndex < QUIZ_QUESTIONS.length) renderQuestion();
        else showQuizResult();
      }, 1200);
    });
    optContainer.appendChild(btn);
  });
}

function showQuizResult() {
  document.getElementById('quizProgressBar').style.width = '100%';
  document.getElementById('quizContent').querySelector('.quiz-question').textContent = '';
  document.getElementById('quizOptions').innerHTML = '';
  const result = document.getElementById('quizResult');
  result.style.display = 'block';
  result.innerHTML = `
    <div style="font-size:3rem">🎉</div>
    <div>${quizScore}/${QUIZ_QUESTIONS.length}</div>
    <div style="font-size:1.1rem; color: rgba(240,230,255,0.9); font-family: var(--font-body); margin-top:1rem; line-height:2;">
      "Hann, bhot khush ho rhi ho" 😏<br/>
      "Pitati lagegi" 👊😂
    </div>
    <button class="btn btn-primary" onclick="startQuiz()" style="margin-top:1.5rem; font-size:0.85rem">Play Again 🔄</button>
  `;
}

// ================================================
//  MEMORY GAME
// ================================================
const MEMORY_EMOJIS = ['🌸', '💖', '⭐', '🎂', '🎀', '💫', '🌙', '🎊'];
let memCards = [];
let memFlipped = [];
let memMatched = 0;
let memMoves = 0;
let memLocked = false;

function initMemory() {
  const grid = document.getElementById('memoryGrid');
  grid.innerHTML = '';
  memCards = [];
  memFlipped = [];
  memMatched = 0;
  memMoves = 0;
  memLocked = false;
  document.getElementById('memMoves').textContent = 0;
  document.getElementById('memPairs').textContent = 0;

  const deck = [...MEMORY_EMOJIS, ...MEMORY_EMOJIS].sort(() => Math.random() - 0.5);
  deck.forEach((emoji, i) => {
    const card = document.createElement('div');
    card.className = 'mem-card';
    card.dataset.emoji = emoji;
    card.dataset.index = i;
    card.textContent = '?';
    card.style.color = 'rgba(255,255,255,0.2)';
    card.addEventListener('click', () => flipMemCard(card));
    grid.appendChild(card);
    memCards.push(card);
  });
}

function flipMemCard(card) {
  if (memLocked || card.classList.contains('flipped') || card.classList.contains('matched')) return;
  card.textContent = card.dataset.emoji;
  card.style.color = 'inherit';
  card.classList.add('flipped');
  memFlipped.push(card);

  if (memFlipped.length === 2) {
    memLocked = true;
    memMoves++;
    document.getElementById('memMoves').textContent = memMoves;
    const [a, b] = memFlipped;
    if (a.dataset.emoji === b.dataset.emoji) {
      a.classList.add('matched');
      b.classList.add('matched');
      memMatched++;
      document.getElementById('memPairs').textContent = memMatched;
      memFlipped = [];
      memLocked = false;
      if (memMatched === 8) {
        setTimeout(() => {
          launchConfetti();
          alert(`🎊 You matched all pairs in ${memMoves} moves!\n\nYou're as amazing as always! 💖`);
        }, 300);
      }
    } else {
      setTimeout(() => {
        a.classList.remove('flipped');
        b.classList.remove('flipped');
        a.textContent = '?';
        b.textContent = '?';
        a.style.color = 'rgba(255,255,255,0.2)';
        b.style.color = 'rgba(255,255,255,0.2)';
        memFlipped = [];
        memLocked = false;
      }, 900);
    }
  }
}

// ================================================
//  WISH SKY
// ================================================
const WISH_MESSAGES = [
  "Your wish has been sent to the stars! ✨",
  "The universe heard you! 🌙",
  "May your wish come true! 💫",
  "Shooting star caught your dream! ⭐",
  "Magic is happening just for you! 🌟",
  "The stars are conspiring in your favor! 💖"
];

let wishCount = 0;

function initWishSky() {
  document.getElementById('wishMessage').style.opacity = 0;
}

function makeWish() {
  const msg = document.getElementById('wishMessage');
  wishCount++;
  msg.textContent = WISH_MESSAGES[wishCount % WISH_MESSAGES.length];
  msg.style.opacity = 1;
  // Mini confetti
  for (let i = 0; i < 30; i++) {
    createConfettiPiece();
  }
  setTimeout(() => { msg.style.opacity = 0; }, 2000);
}

// ================================================
//  STAR CATCHER GAME
// ================================================
const SC_MESSAGES = [
  "Wah, pakad liya! 🤩",
  "Tu toh champion hai! 🏆",
  "Itni fast kaise hai tu? ⚡",
  "Ek aur! Haan haan! 😍",
  "Teri aankhein bahut tez hain 👀",
  "Dil se pakda iss star ko 💖",
  "Yeh star sirf tere liye tha ⭐",
  "Jitni bhi stars ho, tu deserve karti hai sab 🌟",
  "Kamaal! Seedha haath! 🙌",
  "Birthday girl on fire! 🔥",
  "Ek aur wish pakdi! 💋",
  "Zindagi mein aisi hi stars pakadna ✨"
];

let scScore = 0;
let scTimeLeft = 30;
let scTimerInterval = null;
let scStarInterval = null;
let scRunning = false;

function startStarCatcher() {
  const arena = document.getElementById('scArena');
  document.getElementById('scIdle').style.display = 'none';
  document.getElementById('scResult').style.display = 'none';
  document.getElementById('scMsgPopup').textContent = '';
  scScore = 0;
  scTimeLeft = 30;
  scRunning = true;
  document.getElementById('scScore').textContent = 0;
  document.getElementById('scTimer').textContent = 30;

  // Remove old stars
  arena.querySelectorAll('.sc-star').forEach(s => s.remove());

  // Countdown
  scTimerInterval = setInterval(() => {
    scTimeLeft--;
    document.getElementById('scTimer').textContent = scTimeLeft;
    if (scTimeLeft <= 5) document.getElementById('scTimer').style.color = '#ff4d8d';
    if (scTimeLeft <= 0) endStarCatcher();
  }, 1000);

  // Spawn stars
  scStarInterval = setInterval(spawnStar, 700);
  spawnStar(); // immediate first
}

function spawnStar() {
  if (!scRunning) return;
  const arena = document.getElementById('scArena');
  const starEmojis = ['⭐', '🌟', '✨', '💫', '💥', '💖', '🌸'];
  const star = document.createElement('div');
  star.className = 'sc-star';
  star.textContent = starEmojis[Math.floor(Math.random() * starEmojis.length)];
  star.style.left = `${5 + Math.random() * 85}%`;
  star.style.top = '-50px';
  star.style.animationDuration = `${2.5 + Math.random() * 2}s`;
  star.addEventListener('click', (e) => catchStar(star, e));
  arena.appendChild(star);

  // Auto-remove after fall
  setTimeout(() => { if (star.parentNode) star.remove(); },
    parseFloat(star.style.animationDuration) * 1000 + 200);
}

function catchStar(star, e) {
  if (!scRunning || star.dataset.caught) return;
  star.dataset.caught = '1';
  star.classList.add('sc-caught');

  scScore++;
  document.getElementById('scScore').textContent = scScore;

  // Show message popup
  const popup = document.getElementById('scMsgPopup');
  popup.textContent = SC_MESSAGES[Math.floor(Math.random() * SC_MESSAGES.length)];
  popup.classList.remove('sc-msg-anim');
  void popup.offsetWidth; // reflow
  popup.classList.add('sc-msg-anim');

  // Mini confetti burst
  for (let i = 0; i < 8; i++) createConfettiPiece();

  setTimeout(() => { if (star.parentNode) star.remove(); }, 300);
}

function endStarCatcher() {
  scRunning = false;
  clearInterval(scTimerInterval);
  clearInterval(scStarInterval);
  scTimerInterval = null;
  scStarInterval = null;

  // Remove remaining stars
  document.getElementById('scArena').querySelectorAll('.sc-star').forEach(s => s.remove());

  // Result
  let emoji, text;
  if (scScore >= 20) {
    emoji = '🏆🤩';
    text = `${scScore} stars! Tu toh bilkul aasman ki tarah hai — sab kuch pakad leti hai! 🌟`;
  } else if (scScore >= 12) {
    emoji = '😍⭐';
    text = `${scScore} stars! Ekdum amazing! Teri speed bhi tere jaisi hai — zabardast! ⚡`;
  } else if (scScore >= 6) {
    emoji = '😊💖';
    text = `${scScore} stars pakde! Bura nahi — par tu is se bhi zyada deserve karti hai! 😘`;
  } else {
    emoji = '🤗🌸';
    text = `${scScore} stars... Arre koi baat nahi! Tujhe toh waise hi sab stars milte hain! 💖`;
  }

  document.getElementById('scResultEmoji').textContent = emoji;
  document.getElementById('scResultText').textContent = text;
  document.getElementById('scResult').style.display = 'block';
  document.getElementById('scTimer').style.color = '';
  launchConfetti();
}

function resetStarCatcher() {
  scRunning = false;
  clearInterval(scTimerInterval);
  clearInterval(scStarInterval);
  document.getElementById('scArena').querySelectorAll('.sc-star').forEach(s => s.remove());
  document.getElementById('scResult').style.display = 'none';
  document.getElementById('scIdle').style.display = 'flex';
  document.getElementById('scScore').textContent = 0;
  document.getElementById('scTimer').textContent = 30;
  document.getElementById('scTimer').style.color = '';
  document.getElementById('scMsgPopup').textContent = '';
}

// ================================================
//  SECRET UNLOCK
// ================================================
function unlockSecret() {
  document.getElementById('secretLock').style.display = 'none';
  document.getElementById('secretContent').style.display = 'block';
  launchConfetti();
  // Scroll to content
  document.getElementById('secretContent').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ================================================
//  REACTION
// ================================================
const REACTION_RESPONSES = {
  '😊': "That smile you just made? Priceless. 💖",
  '🥺': "I feel it too, deep in my heart... 💕",
  '😍': "You have no idea how happy that makes me! 🌟",
  '🤗': "Come here, you deserve all the hugs! 🤗💖",
  '💖': "That's all I ever needed to hear... 💫✨"
};

function react(emoji) {
  const resp = document.getElementById('reactionResponse');
  resp.textContent = REACTION_RESPONSES[emoji] || '💖';
  resp.style.animation = 'none';
  setTimeout(() => resp.style.animation = '', 10);
  launchConfetti();
}

// ================================================
//  BALLOONS
// ================================================
const BALLOON_EMOJIS = ['🎈', '🎀', '🎊', '🎉', '💝', '🌸', '⭐', '✨', '💖', '🌟', '🎂', '🍀'];
const BALLOON_MESSAGES = [
  "Happy Birthday! 🎉",
  "You're amazing! ✨",
  "Shine bright! ⭐",
  "You're loved! 💖",
  "Keep smiling! 😊",
  "Dream big! 💫",
  "Celebrate you! 🎊",
  "So precious! 🌸",
  "Pure magic! 🌟",
  "Forever young! 🎈",
  "Best wishes! 🎀",
  "You glow! ✨"
];
let balloonCount = 0;

function initBalloons() {
  const container = document.getElementById('balloonContainer');
  container.innerHTML = '';
  balloonCount = 0;
  document.getElementById('balloonCount').textContent = 0;
  BALLOON_EMOJIS.forEach((emoji, i) => {
    const b = document.createElement('div');
    b.className = 'balloon';
    b.textContent = emoji;
    b.style.setProperty('--dur', `${Math.random() * 2}s`);
    b.dataset.msg = BALLOON_MESSAGES[i];
    b.addEventListener('click', (e) => popBalloon(b, e));
    container.appendChild(b);
  });
}

function popBalloon(balloon, e) {
  if (balloon.classList.contains('balloon-pop')) return;
  balloon.classList.add('balloon-pop');
  balloonCount++;
  document.getElementById('balloonCount').textContent = balloonCount;

  // Show message
  const msg = document.createElement('div');
  msg.className = 'balloon-message';
  msg.textContent = balloon.dataset.msg;
  msg.style.left = `${e.clientX}px`;
  msg.style.top = `${e.clientY}px`;
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 1500);

  // Remove balloon after animation
  setTimeout(() => balloon.remove(), 400);

  // Check if all popped
  setTimeout(() => {
    const remaining = document.querySelectorAll('.balloon:not(.balloon-pop)').length;
    if (remaining === 0) {
      setTimeout(() => {
        launchConfetti();
        setTimeout(() => {
          const container = document.getElementById('balloonContainer');
          const msg2 = document.createElement('div');
          msg2.style.cssText = 'text-align:center;font-family:var(--font-script);font-size:2rem;color:var(--gold);padding:2rem;';
          msg2.innerHTML = '🎊 You popped them all! You\'re on fire today! 💖';
          container.appendChild(msg2);
          setTimeout(() => initBalloons(), 3000);
        }, 500);
      }, 200);
    }
  }, 500);
}

// ================================================
//  WISH GAME
// ================================================
function initWishSky() {
  const sky = document.getElementById('wishSky');
  sky.addEventListener('click', makeWish);
}

// ================================================
//  CONFETTI
// ================================================
let confettiRunning = false;
let confettiPieces = [];
let confettiCanvas, confettiCtx;
let animId;

function launchConfetti() {
  // Play the yay sound!
  const yaySound = new Audio('Yayyy! Sound Effect.mp3');
  yaySound.play().catch(e => console.log('Yay sound needs interaction first:', e));

  confettiCanvas = document.getElementById('confettiCanvas');
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
  confettiCanvas.style.opacity = 1;
  confettiCtx = confettiCanvas.getContext('2d');
  confettiPieces = [];

  const colors = ['#ff4d8d', '#c9184a', '#7b2d8b', '#c77dff', '#ffd60a', '#ff6b35', '#ff94c2', '#e0aaff'];

  for (let i = 0; i < 180; i++) {
    confettiPieces.push({
      x: Math.random() * confettiCanvas.width,
      y: -20 - Math.random() * 200,
      size: 5 + Math.random() * 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: 2 + Math.random() * 4,
      speedX: (Math.random() - 0.5) * 3,
      angle: Math.random() * 360,
      spin: (Math.random() - 0.5) * 6,
      shape: Math.random() > 0.5 ? 'rect' : 'circle'
    });
  }

  if (!confettiRunning) {
    confettiRunning = true;
    animateConfetti();
  }

  setTimeout(stopConfetti, 5000);
}

function createConfettiPiece() {
  if (!confettiCanvas) {
    confettiCanvas = document.getElementById('confettiCanvas');
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    confettiCtx = confettiCanvas.getContext('2d');
  }
  const colors = ['#ff4d8d', '#c9184a', '#7b2d8b', '#c77dff', '#ffd60a'];
  confettiPieces.push({
    x: Math.random() * confettiCanvas.width,
    y: confettiCanvas.height / 2,
    size: 4 + Math.random() * 8,
    color: colors[Math.floor(Math.random() * colors.length)],
    speedY: -5 - Math.random() * 8,
    speedX: (Math.random() - 0.5) * 8,
    angle: 0,
    spin: (Math.random() - 0.5) * 8,
    shape: 'circle',
    life: 1
  });
  if (!confettiRunning) { confettiRunning = true; animateConfetti(); }
}

function animateConfetti() {
  if (!confettiCanvas || !confettiCtx) return;
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

  confettiPieces = confettiPieces.filter(p => {
    p.x += p.speedX;
    p.y += p.speedY;
    p.angle += p.spin;
    if (p.life !== undefined) { p.speedY += 0.3; p.life -= 0.02; }

    confettiCtx.save();
    confettiCtx.translate(p.x, p.y);
    confettiCtx.rotate(p.angle * Math.PI / 180);
    confettiCtx.globalAlpha = p.life !== undefined ? Math.max(0, p.life) : 1;
    confettiCtx.fillStyle = p.color;

    if (p.shape === 'circle') {
      confettiCtx.beginPath();
      confettiCtx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
      confettiCtx.fill();
    } else {
      confettiCtx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
    }
    confettiCtx.restore();

    if (p.life !== undefined) return p.life > 0;
    return p.y < confettiCanvas.height + 50;
  });

  if (confettiPieces.length > 0) {
    animId = requestAnimationFrame(animateConfetti);
  } else {
    confettiRunning = false;
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  }
}

function stopConfetti() {
  confettiPieces = confettiPieces.filter(() => false);
  confettiRunning = false;
  if (confettiCtx) confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
}

// ================================================
//  MUSIC
// ================================================
let bgMusic = new Audio('Happy Birthday Song!!!.mp3');
bgMusic.loop = true;
let musicPlaying = false;

function toggleMusic() {
  const btn = document.getElementById('musicToggle');
  if (!musicPlaying) {
    bgMusic.play().catch(e => console.log("Can't play music yet, needs interaction"));
    btn.classList.add('playing');
    musicPlaying = true;
  } else {
    bgMusic.pause();
    btn.classList.remove('playing');
    musicPlaying = false;
  }
}

// Ensure the music starts as soon as she interacts with the page
document.addEventListener('click', () => {
  if (!musicPlaying) {
    toggleMusic();
  }
}, { once: true });

// ================================================
//  WINDOW RESIZE
// ================================================
window.addEventListener('resize', () => {
  if (confettiCanvas) {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }
});

// ================================================
//  INTERSECTION OBSERVER (SCROLL ANIMATIONS)
// ================================================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.wish-card, .polaroid, .confession-card').forEach(el => {
  el.style.animationPlayState = 'paused';
  observer.observe(el);
});

// ================================================
//  WORD PUZZLE
// ================================================
document.addEventListener('DOMContentLoaded', () => {
  initPuzzleInputs();
});

function initPuzzleInputs() {
  const inputs = document.querySelectorAll('.pz-input');
  inputs.forEach((input, idx) => {
    // Auto-uppercase
    input.addEventListener('input', () => {
      input.value = input.value.toUpperCase();
      if (input.value.length === 1) {
        input.classList.add('filled');
        // Move focus to next input
        if (idx + 1 < inputs.length) inputs[idx + 1].focus();
      } else {
        input.classList.remove('filled');
      }
    });
    // Backspace: go to previous
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && input.value === '' && idx > 0) {
        inputs[idx - 1].focus();
        inputs[idx - 1].classList.remove('filled');
      }
    });
  });
}

function submitPuzzle() {
  const inputs = document.querySelectorAll('.pz-input');
  let allFilled = true;
  let allCorrect = true;

  inputs.forEach(input => {
    if (!input.value) { allFilled = false; }
    if (input.value.toUpperCase() !== input.dataset.ans) { allCorrect = false; }
  });

  if (!allFilled) {
    // Shake unfilled ones
    inputs.forEach(input => {
      if (!input.value) {
        input.classList.remove('shake');
        void input.offsetWidth;
        input.classList.add('shake');
        setTimeout(() => input.classList.remove('shake'), 500);
      }
    });
    return;
  }

  if (!allCorrect) {
    // Shake wrong ones + hint
    inputs.forEach(input => {
      if (input.value.toUpperCase() !== input.dataset.ans) {
        input.classList.remove('shake');
        void input.offsetWidth;
        input.classList.add('shake');
        setTimeout(() => { input.classList.remove('shake'); input.value = ''; input.classList.remove('filled'); }, 500);
      }
    });
    document.getElementById('puzzleHint').style.color = 'rgba(255,100,100,0.8)';
    document.getElementById('puzzleHint').textContent = '❌ Hmm... sabhi boxes mein same letter chahiye! Hint: It\'s always "U" 😉';
    return;
  }

  // All correct — show reveal!
  document.getElementById('puzzleLines').style.display = 'none';
  document.getElementById('puzzleHint').style.display = 'none';
  document.getElementById('puzzleSubmitBtn').style.display = 'none';
  document.getElementById('puzzleReveal').style.display = 'block';
  launchConfetti();
}

function resetPuzzle() {
  const inputs = document.querySelectorAll('.pz-input');
  inputs.forEach(input => { input.value = ''; input.classList.remove('filled', 'shake'); });
  document.getElementById('puzzleLines').style.display = 'flex';
  document.getElementById('puzzleHint').style.display = 'block';
  document.getElementById('puzzleHint').style.color = '';
  document.getElementById('puzzleHint').textContent = '💡 Hint: It\'s the letter that comes after "T" and before "V"... 😉';
  document.getElementById('puzzleSubmitBtn').style.display = 'block';
  document.getElementById('puzzleReveal').style.display = 'none';
  inputs[0].focus();
}
