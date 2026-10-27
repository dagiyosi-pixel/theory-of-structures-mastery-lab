
// =========================================================================
// PROCEDURAL AUDIO SYNTHESIS ENGINE (100% Offline Web Audio API)
// =========================================================================

const SoundEngine = {
  ctx: null,
  isMuted: typeof localStorage !== 'undefined' ? (localStorage.getItem('structures_sound_muted') === 'true') : false,

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  },

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('structures_sound_muted', this.isMuted);
    }
    this.updateUI();
    if (!this.isMuted) {
      this.playCorrect();
    }
  },

  updateUI() {
    if (typeof document === 'undefined') return;
    const btn = document.getElementById('soundToggleBtn');
    if (btn) {
      btn.innerHTML = this.isMuted ? '🔇 <span class="hide-mobile">Muted</span>' : '🔊 <span class="hide-mobile">Audio</span>';
      btn.title = this.isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects';
    }
  },

  playCardAdvance() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(640, now + 0.04);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) {}
  },

  playCorrect() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(523.25, now);
      gain1.gain.setValueAtTime(0.12, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.18);

      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(659.25, now + 0.08);
      gain2.gain.setValueAtTime(0.15, now + 0.08);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now + 0.08);
      osc2.stop(now + 0.32);
    } catch (e) {}
  },

  playWrong() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(90, now + 0.15);
      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.16);
    } catch (e) {}
  },

  playLevelUp() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);
        gain.gain.setValueAtTime(0.12, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.25);
      });
    } catch (e) {}
  }
};


// =========================================================================
// RAPID RECALL EXAM SPRINT ("CRAM SPRINT" - ACTIVE RECALL ENGINE)
// =========================================================================

const SPRINT_QUESTIONS = [
  {
    prompt: "In the EiABC Slope-Deflection equation, why is there a MINUS sign before $2EK\\left(2\\theta_i + \\theta_j - \\frac{3\\Delta}{L}\\right)$?",
    options: [
      { text: "Because clockwise joint rotation is defined as (+), but end moment on member is (+) counter-clockwise.", correct: true },
      { text: "Because members always hog under positive gravity loads.", correct: false },
      { text: "Because axial deformations are neglected in small-deflection theory.", correct: false },
      { text: "It is an arbitrary notation choice with no equilibrium significance.", correct: false }
    ],
    explanation: "EiABC defines clockwise (+) for rotations $(\\theta)$ and chord sway $(\\psi = \\frac{\\Delta}{L})$, but counter-clockwise (+) on the member for end moments. The minus sign preserves rotational balance: $M_{ij} = M^F_{ij} - 2EK\\left(2\\theta_i + \\theta_j - \\frac{3\\Delta}{L}\\right)$."
  },
  {
    prompt: "A middle support in a continuous beam sinks downwards by settlement $\\Delta$. What happens to the hogging moment over that support?",
    options: [
      { text: "It is relieved (becomes less negative / reduced in magnitude).", correct: true },
      { text: "It increases significantly in magnitude.", correct: false },
      { text: "It remains completely unchanged.", correct: false },
      { text: "It doubles in value regardless of flexural rigidity $EI$.", correct: false }
    ],
    explanation: "Downward support settlement $\\Delta$ induces concave (sagging) curvature over the sinking support, which relieves (reduces) the negative hogging moment over that support and sheds positive moment into adjacent spans."
  },
  {
    prompt: "When applying Hardy Cross Moment Distribution to a beam span whose far end is PINNED, what is the modified rotational stiffness $K'$?",
    options: [
      { text: "$K' = \\frac{3}{4}\\left(\\frac{I}{L}\\right) = \\frac{3}{4}K$ with $\\text{COF} = 0$", correct: true },
      { text: "$K' = \\frac{4}{3}\\left(\\frac{I}{L}\\right)$ with $\\text{COF} = 0.5$", correct: false },
      { text: "$K' = \\frac{I}{L}$ with $\\text{COF} = 0.5$", correct: false },
      { text: "$K' = \\frac{1}{2}\\left(\\frac{I}{L}\\right)$ with $\\text{COF} = 0$", correct: false }
    ],
    explanation: "A pinned or roller far end cannot develop bending moment ($M = 0$). Hence, rotational stiffness is reduced by 25% ($K' = 0.75K$), and no moment carries over across it ($\\text{COF} = 0$)."
  },
  {
    prompt: "In the Conjugate Beam Method, what boundary condition does an internal hinge in the real beam transform into?",
    options: [
      { text: "An internal roller or pin support.", correct: true },
      { text: "A free unsupported cantilever tip.", correct: false },
      { text: "A rigid built-in fixed support.", correct: false },
      { text: "An internal hinge remains an internal hinge.", correct: false }
    ],
    explanation: "An internal hinge allows discontinuous slope (shear step $\\Delta V^*$ in the conjugate beam) while deflection is continuous (continuous moment $M^*$). This corresponds to an internal roller or pin support in the conjugate beam!"
  },
  {
    prompt: "What is the degree of static indeterminacy ($\\text{DSI}$) for a 2D pin-jointed truss with $m = 11$ bars, $r = 3$ reactions, and $j = 6$ joints?",
    options: [
      { text: "$\\text{DSI} = (m + r) - 2j = (11 + 3) - 2(6) = 2$ (Indeterminate to 2nd degree)", correct: true },
      { text: "$\\text{DSI} = m - 2j = 11 - 12 = -1$ (Unstable mechanism)", correct: false },
      { text: "$\\text{DSI} = (m + r) - 3j = 14 - 18 = -4$ (Mechanism)", correct: false },
      { text: "$\\text{DSI} = 0$ (Statically Determinate)", correct: false }
    ],
    explanation: "For plane trusses, $\\text{DSI} = (m + r) - 2j$. Substituting: $(11 + 3) - 2(6) = 14 - 12 = 2$."
  },
  {
    prompt: "In the Virtual Work principle for beam deflections: $1.0 \\cdot \\Delta = \\int_0^L \\frac{M \\cdot m}{EI}\\,dx$. What does '$m$' represent?",
    options: [
      { text: "Internal bending moment caused solely by a fictitious unit dummy load applied at the target degree of freedom.", correct: true },
      { text: "The actual dead load bending moment.", correct: false },
      { text: "The cross-sectional mass of the member.", correct: false },
      { text: "The ultimate plastic moment capacity $M_p$ of the section.", correct: false }
    ],
    explanation: "$m(x)$ is the virtual internal bending moment distribution created across the beam when a unit dummy load ($1\\text{ kN}$ or $1\\text{ kN}\\cdot\\text{m}$) is applied at the target point and direction of deflection."
  },
  {
    prompt: "For a continuous beam on unyielding supports, which formulation yields fewer simultaneous equations when $\\text{DKI} < \\text{DSI}$?",
    options: [
      { text: "Displacement Methods (Slope-Deflection or Moment Distribution).", correct: true },
      { text: "Force Method (Method of Consistent Deformations).", correct: false },
      { text: "Three-Moment Equation (Clapeyron's Equation).", correct: false },
      { text: "Castigliano's First Theorem.", correct: false }
    ],
    explanation: "When Kinematic Indeterminacy ($\\text{DKI}$) is less than Static Indeterminacy ($\\text{DSI}$), displacement methods solve for fewer unknowns (joint rotations) than force methods (redundant forces)."
  },
  {
    prompt: "In Slope-Deflection, if a member of span $L$ experiences a lateral joint translation $\\Delta$ perpendicular to its axis, what is chord rotation $\\psi$?",
    options: [
      { text: "$\\psi = \\frac{\\Delta}{L}$ (positive clockwise in EiABC convention)", correct: true },
      { text: "$\\psi = \\Delta \\cdot L$", correct: false },
      { text: "$\\psi = \\frac{3EI}{L^2} \\cdot \\Delta$", correct: false },
      { text: "$\\psi = 0$ for all frames", correct: false }
    ],
    explanation: "Chord rotation $\\psi = \\frac{\\Delta}{L}$ is the rigid-body rotation angle of the member's chord between its two joints."
  },
  {
    prompt: "What is the Fixed-End Moment ($\\text{FEM}_{AB}$) at the left support for a fixed-fixed beam of length $L$ under full UDL $w$?",
    options: [
      { text: "$\\text{FEM}_{AB} = -\\frac{wL^2}{12}$ (hogging / counter-clockwise on beam)", correct: true },
      { text: "$\\text{FEM}_{AB} = +\\frac{wL^2}{8}$", correct: false },
      { text: "$\\text{FEM}_{AB} = -\\frac{wL^2}{24}$", correct: false },
      { text: "$\\text{FEM}_{AB} = -\\frac{wL}{2}$", correct: false }
    ],
    explanation: "For a uniform load $w$ across span $L$, $\\text{FEM}_{AB} = -\\frac{wL^2}{12}$ at left and $\\text{FEM}_{BA} = +\\frac{wL^2}{12}$ at right in standard notation."
  },
  {
    prompt: "If a 2D planar structure has $r = 3$ reaction lines of action that all intersect at a single concurrent point, the structure is:",
    options: [
      { text: "Geometrically unstable (cannot resist moments about that concurrency point).", correct: true },
      { text: "Statically determinate and completely stable.", correct: false },
      { text: "Indeterminate to the 1st degree.", correct: false },
      { text: "Fully rigid in all directions.", correct: false }
    ],
    explanation: "Because all reaction lines pass through the exact same point, $\\sum M_{\\text{pt}} = 0$ provides zero restoring resistance against applied external moments, creating an unstable rotational mechanism."
  }
];

let sprintIdx = 0;
let sprintScore = 0;
let sprintCombo = 0;
let sprintTimerInterval = null;
let sprintSeconds = 35;
let sprintIsPaused = false;
let sprintAnswered = false;
let sprintHistory = [];

function startRapidSprint() {
  sprintIdx = 0;
  sprintScore = 0;
  sprintCombo = 0;
  sprintAnswered = false;
  sprintIsPaused = false;
  sprintHistory = [];
  currentAppView = 'sprint';
  updateTopNavUI();
  updateMobileNavUI();
  renderSidebar();
  renderMainView();
  startSprintTimer();
}

function startSprintTimer() {
  if (sprintTimerInterval) clearInterval(sprintTimerInterval);
  sprintSeconds = 35;
  sprintIsPaused = false;
  updateSprintTimerDisplay();
  sprintTimerInterval = setInterval(() => {
    if (sprintSeconds > 0 && !sprintAnswered && !sprintIsPaused) {
      sprintSeconds--;
      updateSprintTimerDisplay();
      if (sprintSeconds === 0) {
        handleSprintAnswer(-1); // Time out
      }
    }
  }, 1000);
}

function toggleSprintPause() {
  sprintIsPaused = !sprintIsPaused;
  const btn = document.getElementById('sprintPauseBtn');
  if (btn) {
    btn.innerHTML = sprintIsPaused ? '▶️ Resume' : '⏸️ Pause';
    btn.classList.toggle('active', sprintIsPaused);
  }
  const timer = document.getElementById('sprintTimerVal');
  if (timer && sprintIsPaused) {
    timer.style.opacity = '0.5';
  } else if (timer) {
    timer.style.opacity = '1';
  }
}

function updateSprintTimerDisplay() {
  const el = document.getElementById('sprintTimerVal');
  if (el) {
    el.innerText = `⏱️ ${sprintSeconds}s`;
    el.style.color = sprintSeconds <= 8 ? 'var(--danger)' : 'var(--accent)';
  }
}

function handleSprintAnswer(optIdx) {
  if (sprintAnswered) return;
  sprintAnswered = true;
  clearInterval(sprintTimerInterval);

  const q = SPRINT_QUESTIONS[sprintIdx];
  const isCorrect = optIdx >= 0 && q.options[optIdx] && q.options[optIdx].correct;
  sprintHistory[sprintIdx] = isCorrect ? 'correct' : 'wrong';

  if (isCorrect) {
    sprintScore++;
    sprintCombo++;
    const bonus = sprintCombo >= 3 ? 30 : (sprintCombo === 2 ? 20 : 15);
    userState.xp += bonus;
    saveState();
    SoundEngine.playCorrect();
    showXPToast(bonus, `Correct! ${sprintCombo >= 2 ? '🔥 ' + sprintCombo + 'x Combo!' : ''}`);
  } else {
    sprintCombo = 0;
    SoundEngine.playWrong();
  }

  // Update button classes and badges
  const btns = document.querySelectorAll('.sprint-opt-btn');
  btns.forEach((btn, idx) => {
    const badge = btn.querySelector('.sprint-opt-badge');
    if (q.options[idx].correct) {
      btn.classList.add('correct');
      if (badge) badge.innerText = '✓';
    } else if (idx === optIdx) {
      btn.classList.add('wrong');
      if (badge) badge.innerText = '✕';
    }
  });

  const fb = document.getElementById('sprintFeedback');
  if (fb) {
    fb.style.display = 'block';
    fb.innerHTML = `
      <div style="display:flex; align-items:flex-start; gap:12px;">
        <span style="font-size:1.6rem; line-height:1;">${isCorrect ? '✅' : '❌'}</span>
        <div style="flex:1;">
          <strong style="color:${isCorrect ? '#34d399' : '#f87171'}; font-size:1rem; display:block; margin-bottom:4px;">
            ${isCorrect ? 'Spot On! Correct Answer' : 'Conceptual Misalignment / Time Out'}
          </strong>
          <div style="color:#f1f5f9; line-height:1.55; font-size:0.92rem;">
            ${q.explanation}
          </div>
        </div>
      </div>
    `;
    fb.style.borderColor = isCorrect ? 'var(--success)' : 'var(--danger)';
    fb.style.background = isCorrect ? 'rgba(16, 185, 129, 0.16)' : 'rgba(244, 63, 94, 0.16)';
    renderMathInDOM(fb);
  }

  const nextBtn = document.getElementById('sprintNextBtn');
  if (nextBtn) {
    nextBtn.style.display = 'inline-flex';
    nextBtn.focus();
  }
}

function advanceSprintQuestion() {
  sprintAnswered = false;
  sprintIsPaused = false;
  if (sprintIdx < SPRINT_QUESTIONS.length - 1) {
    sprintIdx++;
    renderMainView();
    startSprintTimer();
  } else {
    // Sprint Finished
    clearInterval(sprintTimerInterval);
    sprintIdx = SPRINT_QUESTIONS.length;
    userState.xp += 100;
    saveState();
    SoundEngine.playLevelUp();
    renderMainView();
  }
}

function renderSprintView(viewport) {
  const isFinished = sprintIdx >= SPRINT_QUESTIONS.length;

  if (isFinished) {
    const pct = Math.round((sprintScore / SPRINT_QUESTIONS.length) * 100);
    const tier = pct >= 90 ? '🏆 AAU Distinction Ready' : (pct >= 70 ? '⚡ Strong Passing Grip' : '⚠️ Conceptual Gaps Detected');

    viewport.innerHTML = `
      <div class="card" style="text-align:center; padding:36px 16px;">
        <div style="font-size:3.5rem; margin-bottom:12px;">${pct >= 80 ? '⚡' : '📐'}</div>
        <h2 style="font-size:1.4rem; color:#fff; margin-bottom:6px;">Rapid Exam Sprint Completed!</h2>
        <span class="stat-pill" style="font-size:0.88rem; color:var(--gold); margin-bottom:16px; display:inline-block;">
          ${tier}
        </span>
        <p style="color:var(--text-muted); font-size:0.92rem; max-width:440px; margin:0 auto 20px;">
          You answered <strong>${sprintScore} of ${SPRINT_QUESTIONS.length}</strong> questions correctly (${pct}% Exam Readiness).
        </p>

        <div class="victory-stats-row" style="margin-bottom:24px;">
          <div class="victory-stat-pill">
            <span>Sprint Accuracy</span>
            <strong style="color:var(--accent);">${pct}%</strong>
          </div>
          <div class="victory-stat-pill">
            <span>XP Claimed</span>
            <strong style="color:var(--gold);">+100 XP</strong>
          </div>
        </div>

        <div style="display:flex; justify-content:center; gap:12px; flex-wrap:wrap;">
          <button class="btn-primary" onclick="startRapidSprint()">🔄 Sprint Again</button>
          <button class="hud-btn" onclick="switchAppView('dashboard')">🏠 Mission Control</button>
        </div>
      </div>
    `;
    return;
  }

  const q = SPRINT_QUESTIONS[sprintIdx];
  const optionLetters = ['A', 'B', 'C', 'D'];

  viewport.innerHTML = `
    <div class="card gizmo-container" style="max-width:760px; margin:0 auto;">
      <div class="gizmo-header" style="margin-bottom:16px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
          <div>
            <h2 style="margin:0; font-size:1.15rem; color:#fff; display:flex; align-items:center; gap:8px;">
              <span>⚡</span> Rapid Recall Exam Sprint
            </h2>
            <span style="font-size:0.78rem; color:var(--text-muted);">
              Question ${sprintIdx + 1} of ${SPRINT_QUESTIONS.length} &bull; Score: ${sprintScore}/${sprintIdx}
            </span>
          </div>

          <div style="display:flex; align-items:center; gap:10px;">
            ${sprintCombo >= 2 ? `<span style="font-size:0.8rem; font-weight:800; color:var(--gold);" class="combo-badge">🔥 ${sprintCombo}x COMBO!</span>` : ''}
            <span id="sprintTimerVal" style="font-family:var(--font-mono); font-weight:800; font-size:1.1rem; color:var(--accent);">⏱️ 35s</span>
            <button class="hud-btn" id="sprintPauseBtn" style="padding:4px 8px; font-size:0.75rem;" onclick="toggleSprintPause()" title="Pause countdown timer">⏸️ Pause</button>
            <button class="hud-btn" style="padding:4px 8px; font-size:0.75rem;" onclick="clearInterval(sprintTimerInterval); switchAppView('dashboard');">✕ Exit</button>
          </div>
        </div>

        <!-- Segmented Track with Pass/Fail color coding -->
        <div class="gizmo-segmented-bar" style="margin-top:12px;">
          ${SPRINT_QUESTIONS.map((_, i) => {
            let cls = '';
            if (i === sprintIdx) cls = 'active';
            else if (sprintHistory[i] === 'correct') cls = 'completed-correct';
            else if (sprintHistory[i] === 'wrong') cls = 'completed-wrong';
            return `<div class="gizmo-segment ${cls}"></div>`;
          }).join('')}
        </div>
      </div>

      <div class="gizmo-card-body">
        <div class="sprint-question-box" style="margin-bottom:18px;">
          <div style="display:inline-block; font-size:0.72rem; font-weight:700; text-transform:uppercase; color:var(--accent); background:rgba(56, 189, 248, 0.12); padding:3px 8px; border-radius:4px; margin-bottom:8px; border:1px solid rgba(56, 189, 248, 0.25);">
            EiABC Exam Rapid Drill • Problem ${sprintIdx + 1}
          </div>
          <h3 style="font-size:1.15rem; color:#fff; line-height:1.55; margin:0;">
            ${q.prompt}
          </h3>
        </div>

        <div style="display:flex; flex-direction:column; gap:10px;">
          ${q.options.map((opt, oIdx) => `
            <button class="sprint-opt-btn" onclick="handleSprintAnswer(${oIdx})" aria-label="Option ${optionLetters[oIdx]}: ${opt.text.replace(/[$]/g, '')}">
              <span class="sprint-opt-badge">${optionLetters[oIdx]}</span>
              <span class="sprint-opt-text">${opt.text}</span>
            </button>
          `).join('')}
        </div>

        <div id="sprintFeedback" style="display:none; margin-top:16px; padding:14px; border-radius:8px; font-size:0.9rem; border:1px solid transparent; box-shadow:0 4px 12px rgba(0,0,0,0.3);"></div>
      </div>

      <div class="gizmo-bottom-bar" style="justify-content:space-between; align-items:center; margin-top:16px; padding-top:12px; border-top:1px solid rgba(255,255,255,0.06);">
        <span style="font-size:0.76rem; color:var(--text-muted); display:flex; align-items:center; gap:6px;">
          💡 Tip: Tap option or press 1-4
        </span>
        <button id="sprintNextBtn" class="btn-primary" style="display:none; padding:8px 20px; font-weight:700;" onclick="advanceSprintQuestion()">
          ${sprintIdx === SPRINT_QUESTIONS.length - 1 ? 'Finish Sprint 🏆' : 'Next Question ➔'}
        </button>
      </div>
    </div>
  `;

  setTimeout(() => {
    renderMathInDOM(viewport);
  }, 10);
}


// =========================================================================
// DAILY MASTERY MISSION ENGINE
// =========================================================================

function getDailyMissionState() {
  const today = new Date().toDateString();
  if (!userState.dailyDate || userState.dailyDate !== today) {
    userState.dailyDate = today;
    userState.dailyCardsDone = 0;
    userState.dailyExDone = 0;
    userState.dailyBankDone = 0;
    userState.dailyRewardClaimed = false;
    saveState();
  }
  return {
    cards: userState.dailyCardsDone || 0,
    examples: userState.dailyExDone || 0,
    bank: userState.dailyBankDone || 0,
    claimed: !!userState.dailyRewardClaimed
  };
}

function checkDailyMissionComplete() {
  const state = getDailyMissionState();
  if (state.cards >= 2 && state.examples >= 1 && state.bank >= 1 && !state.claimed) {
    userState.dailyRewardClaimed = true;
    userState.xp += 200;
    userState.streak += 1;
    saveState();
    SoundEngine.playLevelUp();
    triggerConfetti();
    showXPToast(200, 'Daily Mission Complete! 🔥 (+200 Bonus XP)');
  }
}


function escapeHtml(str) {
  if (typeof str !== 'string') return str === null || str === undefined ? '' : String(str);
  return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
}

// COTM 3101: Theory of Structures - Master Academic Controller & Futuristic Cockpit Engine
// Addis Ababa University (AAU) / EiABC Curriculum • 100% Offline Single-Page Architecture

let currentModuleIdx = 0;
let currentAppView = 'dashboard'; // 'dashboard', 'module', 'solvers', 'atlas', 'exam', 'errors'
let currentModuleTab = 'theory'; // 'theory', 'guided', 'shortcuts', 'arena', 'cheatsheet'
let currentSolver = 'beam'; // 'beam', 'determinacy', 'threemoment', 'hardycross', 'conjugate'

// Flashcard & Exam States
let currentFlashcardIdx = 0;
let isFlashcardFlipped = false;
let atlasSearch = '';
let atlasFilter = 'all';
let atlasMode = 'browse'; // 'browse' or 'flashcards'
let examTimer = null;
let examTimeSeconds = 600; // 10 minutes
let examAnswers = {};
let examFinished = false;

// Method Decider & Combat Trainer States
let currentTrainerTab = 'triage'; // 'triage', 'givens', 'scenarios', 'protocol'
let trainerTriageStructure = 'cont_beam';
let trainerTriageObjective = 'moments';
let trainerTriageModifiers = { settlement: true };
let trainerGivensSearch = '';
let trainerGivensFilter = 'all';
let currentTrainerScenarioIdx = 0;

// User Persistent State
let userState = {
  xp: 0,
  streak: 0,
  solved: {},
  errors: [], // array of missed question objects
  flashcardRatings: {}, // { formId: 'easy'|'good'|'hard'|'again' }
  watchedVideos: {}, // { [vidId]: true }
  theoryProgress: {}, // { [modId_tIdx]: true }
  guidedProgress: {}, // { [modId_gIdx]: true }
  shortcutsProgress: {}, // { [modId_sIdx]: true }
  rank: 'Apprentice',
  lastModuleId: 'mod0'
};

function loadState() {
  const saved = localStorage.getItem('structures_mastery_v2');
  if (saved) {
    try {
      userState = Object.assign(userState, JSON.parse(saved));
      if (!userState.errors) userState.errors = [];
      if (!userState.flashcardRatings) userState.flashcardRatings = {};
      if (!userState.watchedVideos) userState.watchedVideos = {};
      if (!userState.trainerSolved) userState.trainerSolved = {};
      if (!userState.bankSolved) userState.bankSolved = {};
      if (!userState.theoryProgress) userState.theoryProgress = {};
      if (!userState.guidedProgress) userState.guidedProgress = {};
      if (!userState.shortcutsProgress) userState.shortcutsProgress = {};
      if (!userState.spacedRepetition) userState.spacedRepetition = {};
      if (!userState.mistakeLog) userState.mistakeLog = [];
      if (!userState.diagnosticScores) userState.diagnosticScores = null;

    } catch (e) {
      console.error(e);
    }
  }
  updateStatsHUD();
}

function saveState() {
  localStorage.setItem('structures_mastery_v2', JSON.stringify(userState));
  updateStatsHUD();
  if (typeof renderSidebar === 'function') renderSidebar();
}

function resetProgress() {
  if (confirm("Reset all your earned XP, streaks, exam scores, question bank solutions, and error notebook?")) {
    userState = {
      xp: 0,
      streak: 0,
      solved: {},
      bankSolved: {},
      theoryProgress: {},
      guidedProgress: {},
      shortcutsProgress: {},
      trainerSolved: {},
      spacedRepetition: {},
      mistakeLog: [],
      diagnosticScores: null,
      errors: [],
      flashcardRatings: {},
      watchedVideos: {},
      rank: 'Apprentice',
      lastModuleId: 'mod0'
    };
    saveState();
    renderMainView();
  }
}

function getRankData(xp) {
  const ranks = [
    { min: 0, title: 'Apprentice', next: 400, icon: '🛠️' },
    { min: 400, title: 'Junior Stress Analyst', next: 900, icon: '📐' },
    { min: 900, title: 'Design Engineer', next: 1600, icon: '🏗️' },
    { min: 1600, title: 'Senior Structural Specialist', next: 2600, icon: '⚡' },
    { min: 2600, title: 'Chief Structural Professor (AAU)', next: 4000, icon: '🏛️' }
  ];

  let current = ranks[0];
  for (const r of ranks) {
    if (xp >= r.min) current = r;
  }
  return current;
}


// =========================================================================
// COMPREHENSIVE CURRICULUM PROGRESS ENGINE
// =========================================================================

function calculateOverallProgress() {
  let totalArena = 0, solvedArena = 0;
  let totalTheory = 0, readTheory = 0;
  let totalGuided = 0, completedGuided = 0;
  let totalVideos = 0, watchedVideos = 0;

  if (typeof COURSE_MODULES !== 'undefined') {
    COURSE_MODULES.forEach(m => {
      totalArena += (m.arena || []).length;
      (m.arena || []).forEach((q, qIdx) => {
        if (userState.solved && userState.solved[`${m.id}_q${qIdx}`]) solvedArena++;
      });

      totalTheory += (m.theory || []).length;
      (m.theory || []).forEach((t, tIdx) => {
        if (userState.theoryProgress && userState.theoryProgress[`${m.id}_t${tIdx}`]) readTheory++;
      });

      totalGuided += (m.guidedExamples || []).length;
      (m.guidedExamples || []).forEach((g, gIdx) => {
        if (userState.guidedProgress && userState.guidedProgress[`${m.id}_g${gIdx}`]) completedGuided++;
      });

      totalVideos += (m.videos || []).length;
      (m.videos || []).forEach(v => {
        const vidId = v.vidId || (v.url && v.url.includes('v=') ? v.url.split('v=')[1] : '');
        if (userState.watchedVideos && userState.watchedVideos[vidId]) watchedVideos++;
      });
    });
  }

  const totalBank = (typeof QUESTION_BANK !== 'undefined') ? QUESTION_BANK.length : 105;
  const solvedBank = (userState.bankSolved) ? Object.keys(userState.bankSolved).length : 0;

  const totalItems = totalArena + totalBank + totalTheory + totalGuided + totalVideos;
  const completedItems = solvedArena + solvedBank + readTheory + completedGuided + watchedVideos;
  const masteryPct = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  return {
    masteryPct,
    totalItems,
    completedItems,
    solvedArena,
    totalArena,
    solvedBank,
    totalBank,
    readTheory,
    totalTheory,
    completedGuided,
    totalGuided,
    watchedVideos,
    totalVideos
  };
}

function getModuleProgressData(modId) {
  if (typeof COURSE_MODULES === 'undefined') return { pct: 0, completed: 0, total: 0 };
  const m = COURSE_MODULES.find(mod => mod.id === modId);
  if (!m) return { pct: 0, completed: 0, total: 0 };

  const theoryTotal = (m.theory || []).length;
  let theoryDone = 0;
  for (let i = 0; i < theoryTotal; i++) {
    if (userState.theoryProgress && userState.theoryProgress[`${modId}_t${i}`]) theoryDone++;
  }

  const guidedTotal = (m.guidedExamples || []).length;
  let guidedDone = 0;
  for (let i = 0; i < guidedTotal; i++) {
    if (userState.guidedProgress && userState.guidedProgress[`${modId}_g${i}`]) guidedDone++;
  }

  const arenaTotal = (m.arena || []).length;
  let arenaDone = 0;
  for (let i = 0; i < arenaTotal; i++) {
    if (userState.solved && userState.solved[`${modId}_q${i}`]) arenaDone++;
  }

  const videosTotal = (m.videos || []).length;
  let videosDone = 0;
  (m.videos || []).forEach(v => {
    const vidId = v.vidId || (v.url && v.url.includes('v=') ? v.url.split('v=')[1] : '');
    if (userState.watchedVideos && userState.watchedVideos[vidId]) videosDone++;
  });

  const total = theoryTotal + guidedTotal + arenaTotal + videosTotal;
  const completed = theoryDone + guidedDone + arenaDone + videosDone;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return { pct, completed, total, theoryDone, theoryTotal, guidedDone, guidedTotal, arenaDone, arenaTotal, videosDone, videosTotal };
}

// Floating XP Toast Notification
function showXPToast(amount, message) {
  if (typeof document === 'undefined') return;
  let container = document.getElementById('xpToastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'xpToastContainer';
    container.className = 'xp-toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'xp-toast';
  toast.innerHTML = `<span class="xp-toast-val">+⚡ ${amount} XP</span> <span class="xp-toast-msg">${escapeHtml(message || '')}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => toast.remove(), 400);
  }, 2200);
}

function updateStatsHUD() {
  const rankData = getRankData(userState.xp);
  userState.rank = rankData.title;

  const prog = calculateOverallProgress();

  const rankEl = document.getElementById('rankBadge');
  const xpEl = document.getElementById('xpBadge');
  const streakEl = document.getElementById('streakBadge');
  const masteryEl = document.getElementById('masteryBadge');

  if (rankEl) rankEl.innerHTML = `${rankData.icon} ${userState.rank}`;
  if (xpEl) xpEl.innerHTML = `⚡ ${userState.xp} XP`;
  if (streakEl) streakEl.innerHTML = `🔥 Streak: ${userState.streak}`;
  if (masteryEl) masteryEl.innerHTML = `📊 ${prog.masteryPct}% Mastered (${prog.completedItems}/${prog.totalItems})`;
}


// =========================================================================
// ROUTING & NAVIGATION CONTROLLERS
// =========================================================================

function switchAppView(view) {
  currentAppView = view;
  updateTopNavUI();
  updateMobileNavUI();
  renderSidebar();
  renderMainView();
}

function selectModule(idx) {
  if (currentModuleIdx !== idx) {
    currentTheoryCardIdx = 0;
    currentGuidedExIdx = 0;
    currentGuidedStepIdx = 0;
  }
  currentModuleIdx = idx;
  currentAppView = 'module';
  userState.lastModuleId = COURSE_MODULES[idx].id;
  saveState();
  updateTopNavUI();
  updateMobileNavUI();
  renderSidebar();
  renderMainView();
}

function switchModuleTab(tab) {
  currentModuleTab = tab;
  updateModuleTabUI();
  renderMainView();
}

function openModuleVideos(modIdx) {
  selectModule(modIdx !== undefined ? modIdx : currentModuleIdx);
  switchModuleTab('videos');
}

function openSandbox(solverName) {
  currentAppView = 'solvers';
  currentSolver = solverName;
  updateTopNavUI();
  updateMobileNavUI();
  renderSidebar();
  renderMainView();
}

function updateTopNavUI() {
  document.querySelectorAll('.top-nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === currentAppView);
  });
}

function updateMobileNavUI() {
  document.querySelectorAll('.mob-nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === currentAppView);
  });
}

function updateModuleTabUI() {
  document.querySelectorAll('.mode-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === currentModuleTab);
  });
}

// =========================================================================
// SIDEBAR RENDERER
// =========================================================================
function renderSidebar() {
  const container = document.getElementById('moduleList');
  const cockpitBtn = document.getElementById('sidebarCockpitBtn');
  if (cockpitBtn) {
    cockpitBtn.classList.toggle('active', currentAppView === 'dashboard');
  }
  const trainerBtn = document.getElementById('sidebarTrainerBtn');
  if (trainerBtn) {
    trainerBtn.classList.toggle('active', currentAppView === 'trainer');
  }
  if (!container) return;

  container.innerHTML = COURSE_MODULES.map((m, idx) => {
    const p = getModuleProgressData(m.id);
    const isMastered = p.pct === 100;
    const badgeText = isMastered ? '✅ 100%' : (p.pct > 0 ? `${p.pct}%` : `${p.completed}/${p.total}`);

    return `
      <button class="nav-item ${idx === currentModuleIdx && currentAppView === 'module' ? 'active' : ''}" onclick="selectModule(${idx})">
        <div style="display:flex; flex-direction:column; gap:4px; width:100%; overflow:hidden;">
          <div style="display:flex; justify-content:space-between; align-items:center; width:100%;">
            <span style="display:flex; align-items:center; gap:8px; overflow:hidden;">
              <span>${m.icon}</span>
              <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:140px; font-weight:600;">${m.shortTitle}</span>
            </span>
            <span class="nav-item-badge ${isMastered ? 'badge-mastered' : ''}">${badgeText}</span>
          </div>
          <div class="sidebar-progress-track">
            <div class="sidebar-progress-fill" style="width: ${p.pct}%;"></div>
          </div>
        </div>
      </button>
    `;
  }).join('');
}

// =========================================================================
// MAIN VIEW DISPATCHER
// =========================================================================
function renderMainView() {
  const viewport = document.getElementById('viewport');
  const modeTabs = document.getElementById('modeTabs');
  if (!viewport) return;

  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (currentAppView === 'dashboard') {
    if (modeTabs) modeTabs.style.display = 'none';
    renderDashboardView(viewport);
  } else if (currentAppView === 'module') {
    if (modeTabs) modeTabs.style.display = 'flex';
    renderModuleView(viewport);
  } else if (currentAppView === 'bank') {
    if (modeTabs) modeTabs.style.display = 'none';
    renderQuestionBankView(viewport);
  } else if (currentAppView === 'solver') {
    if (modeTabs) modeTabs.style.display = 'none';
    renderProblemWorkspaceView(viewport);
  } else if (currentAppView === 'trees') {
    if (modeTabs) modeTabs.style.display = 'none';
    renderDecisionTreesView(viewport);
  } else if (currentAppView === 'diagnostic') {
    if (modeTabs) modeTabs.style.display = 'none';
    renderDiagnosticView(viewport);
  } else if (currentAppView === 'sources') {
    if (modeTabs) modeTabs.style.display = 'none';
    renderSourcesView(viewport);
  } else if (currentAppView === 'sprint') {
    if (modeTabs) modeTabs.style.display = 'none';
    renderSprintView(viewport);
  } else {
    if (modeTabs) modeTabs.style.display = 'none';
    if (currentAppView === 'solvers') renderSolversView(viewport);
    else if (currentAppView === 'atlas') renderFormulaAtlasView(viewport);
    else if (currentAppView === 'exam') renderExamSimulatorView(viewport);
    else if (currentAppView === 'errors') renderErrorNotebookView(viewport);
    else if (currentAppView === 'trainer') renderTrainerCombatView(viewport);
  }

  updateTopNavUI();
  updateMobileNavUI();
  renderSidebar();

  setTimeout(function() {
    renderMathInDOM(viewport);
  }, 25);
}

// =========================================================================
// 0. MISSION CONTROL / COCKPIT DASHBOARD VIEW
// =========================================================================
function renderDashboardView(viewport) {
  const mission = getDailyMissionState();
  const rankData = getRankData(userState.xp);
  const nextXP = rankData.next;
  const currentLevelMin = rankData.min;
  const xpInLevel = Math.max(0, userState.xp - currentLevelMin);
  const levelSpan = Math.max(1, nextXP - currentLevelMin);
  const levelPct = Math.min(100, Math.round((xpInLevel / levelSpan) * 100));

  const prog = calculateOverallProgress();
  const totalMasteryPct = prog.masteryPct;
  const totalChallenges = prog.totalArena;
  const solvedCount = prog.solvedArena;

  // Compute Smart Recommendation
  let recTitle = "";
  let recDesc = "";
  let recAction = "";
  let recBtn = "";

  if (userState.errors.length > 0) {
    recTitle = "⚠️ Critical Weak Concepts Detected";
    recDesc = `You have ${userState.errors.length} missed question(s) logged in your Error Notebook. Repairing these conceptual gaps protects your streak!`;
    recAction = "switchAppView('errors')";
    recBtn = "Drill Error Notebook ➔";
  } else {
    let nextIncompleteModIdx = 0;
    for (let i = 0; i < COURSE_MODULES.length; i++) {
      const m = COURSE_MODULES[i];
      const sCount = m.arena.filter((q, qIdx) => userState.solved[`${m.id}_q${qIdx}`]).length;
      if (sCount < m.arena.length) {
        nextIncompleteModIdx = i;
        break;
      }
    }
    const targetMod = COURSE_MODULES[nextIncompleteModIdx];
    const sCount = targetMod.arena.filter((q, qIdx) => userState.solved[`${targetMod.id}_q${qIdx}`]).length;

    if (solvedCount >= totalChallenges && totalChallenges > 0) {
      recTitle = "🏆 Full Curriculum Mastered!";
      recDesc = "You have conquered all 8 chapters. Test your endurance in the timed 10-Minute Comprehensive University Exam Simulator.";
      recAction = "switchAppView('exam')";
      recBtn = "Launch Exam Sim ➔";
    } else {
      recTitle = `🎯 Next Target: ${targetMod.shortTitle}`;
      recDesc = `You have completed ${sCount} of ${targetMod.arena.length} challenges in this chapter. Continue learning to rank up!`;
      recAction = `selectModule(${nextIncompleteModIdx})`;
      recBtn = "Continue Chapter ➔";
    }
  }

  // Daily Challenge Question
  const todayDay = new Date().getDate();
  const allQuestions = [];
  COURSE_MODULES.forEach((m, mIdx) => {
    m.arena.forEach((q, qIdx) => {
      allQuestions.push({ q, mIdx, qIdx, modTitle: m.shortTitle, key: `${m.id}_q${qIdx}` });
    });
  });
  const dailyItem = allQuestions[todayDay % allQuestions.length] || allQuestions[0];
  const isDailyDone = userState.solved[dailyItem.key];

  // Random Formula of the Day
  const dailyFormula = FORMULA_ATLAS[todayDay % FORMULA_ATLAS.length] || FORMULA_ATLAS[0];

  viewport.innerHTML = `
    <!-- COCKPIT HERO CARD -->
    <div class="cockpit-hero">
      <div class="hero-top-row">
        <div class="hero-title-group">
          <h2>🚀 Mission Control Cockpit</h2>
          <p>Theory of Structures Mastery Lab • Addis Ababa University (EiABC) COTM 3101</p>
        </div>
        <div style="display:flex; gap:8px; flex-wrap:wrap;">
          <button class="btn-primary" onclick="selectModule(${currentModuleIdx})">
            ▶ Resume Learning
          </button>
          <button class="btn-primary" style="background:linear-gradient(135deg, #f59e0b, #d97706); border-color:#f59e0b;" onclick="startRapidSprint()">
            ⚡ 60s Exam Sprint
          </button>
        </div>
      </div>

      <!-- Rank & Level Progress -->
      <div class="rank-progress-container">
        <div class="rank-progress-header">
          <span>Rank: <strong style="color:var(--gold);">${rankData.icon} ${userState.rank}</strong></span>
          <span style="color:var(--text-muted);">${userState.xp} / ${nextXP} XP (${levelPct}%)</span>
        </div>
        <div class="progress-bar-track">
          <div class="progress-bar-fill" style="width: ${levelPct}%;"></div>
        </div>
      </div>
    </div>

    <!-- AI STUDY ADVISOR CARD -->
    <div class="advisor-card">
      <div class="advisor-content">
        <h4>${recTitle}</h4>
        <p>${recDesc}</p>
      </div>
      <button class="btn-primary" style="margin-top:0;" onclick="${recAction}">
        ${recBtn}
      </button>
    </div>

    <!-- TODAY'S DAILY MASTERY TARGET -->
    <div style="background:rgba(15, 23, 42, 0.85); border:1px solid var(--border-light); border-radius:10px; padding:14px 16px; margin-bottom:16px;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:10px;">
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="font-size:1.1rem;">🎯</span>
          <h4 style="margin:0; font-size:0.98rem; color:#fff;">Today's Daily Mastery Target</h4>
        </div>
        <span class="stat-pill" style="color:${(mission.cards >= 2 && mission.examples >= 1 && mission.bank >= 1) ? 'var(--success)' : 'var(--gold)'};">
          ${(mission.cards >= 2 && mission.examples >= 1 && mission.bank >= 1) ? '✓ Mission Complete (+200 XP)' : `${(mission.cards >= 2 ? 1 : 0) + (mission.examples >= 1 ? 1 : 0) + (mission.bank >= 1 ? 1 : 0)} / 3 Objectives`}
        </span>
      </div>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:10px;">
        <div style="background:rgba(9, 14, 29, 0.8); border:1px solid ${mission.cards >= 2 ? 'var(--success)' : 'var(--border)'}; border-radius:6px; padding:8px 12px; display:flex; justify-content:space-between; align-items:center;">
          <span style="font-size:0.82rem; color:${mission.cards >= 2 ? '#a7f3d0' : 'var(--text-main)'};">
            ${mission.cards >= 2 ? '✅' : '⏳'} 1. Read 2 Concept Cards
          </span>
          <span style="font-size:0.75rem; color:var(--text-muted);">${Math.min(mission.cards, 2)}/2</span>
        </div>

        <div style="background:rgba(9, 14, 29, 0.8); border:1px solid ${mission.examples >= 1 ? 'var(--success)' : 'var(--border)'}; border-radius:6px; padding:8px 12px; display:flex; justify-content:space-between; align-items:center;">
          <span style="font-size:0.82rem; color:${mission.examples >= 1 ? '#a7f3d0' : 'var(--text-main)'};">
            ${mission.examples >= 1 ? '✅' : '⏳'} 2. Finish 1 Worked Example
          </span>
          <span style="font-size:0.75rem; color:var(--text-muted);">${Math.min(mission.examples, 1)}/1</span>
        </div>

        <div style="background:rgba(9, 14, 29, 0.8); border:1px solid ${mission.bank >= 1 ? 'var(--success)' : 'var(--border)'}; border-radius:6px; padding:8px 12px; display:flex; justify-content:space-between; align-items:center;">
          <span style="font-size:0.82rem; color:${mission.bank >= 1 ? '#a7f3d0' : 'var(--text-main)'};">
            ${mission.bank >= 1 ? '✅' : '⏳'} 3. Solve 1 Bank Problem
          </span>
          <span style="font-size:0.75rem; color:var(--text-muted);">${Math.min(mission.bank, 1)}/1</span>
        </div>
      </div>
    </div>

    
    <!-- METHOD DECIDER & COMBAT TRAINER FEATURE BANNER -->
    <div class="trainer-cta-banner" onclick="switchAppView('trainer')">
      <div class="trainer-cta-content">
        <div class="trainer-cta-badge">🥋 NEW: EXAM COMBAT SUITE</div>
        <h3>Method Decider & 1000x Accuracy Combat Trainer</h3>
        <p>Scan exam givens into boundary conditions, run 5-second statical triage (Ds vs Dk), deploy the exact formula arsenal, and master tricky AAU exam traps.</p>
      </div>
      <button class="btn-primary" style="white-space:nowrap;">Enter Combat Arena ➔</button>
    </div>

    <!-- 105 EXAM QUESTION BANK & SKILL MAP COCKPIT BANNER -->
    <div class="trainer-cta-banner" style="background:linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.95)); border-color:var(--border-light); margin-bottom:16px;">
      <div class="trainer-cta-content">
        <div class="trainer-cta-badge" style="background:rgba(56, 189, 248, 0.15); color:var(--accent);">📚 105 VERIFIED EXAM PROBLEMS & DECISION TREES</div>
        <h3 style="color:#fff;">EiABC Theory of Structures Exam Mastery Hub</h3>
        <p>105 meticulously structured problems across Foundations (35), Deflections (35), and Indeterminate Analysis (35). Features 6 Interactive Decision Trees, 12-Question Diagnostic Skill Map, and Step-by-Step Problem Solver.</p>
      </div>
      <div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center;">
        <button class="btn-primary" onclick="switchAppView('bank')" style="white-space:nowrap;">Open 105 Bank ➔</button>
        <button class="hud-btn" onclick="switchAppView('trees')" style="white-space:nowrap;">🌲 Decision Trees</button>
        <button class="hud-btn" onclick="switchAppView('diagnostic')" style="white-space:nowrap;">🎯 Skill Map</button>
        <button class="hud-btn" onclick="switchAppView('sources')" style="white-space:nowrap;">🏛️ Sources</button>
      </div>
    </div>

    <!-- 4-METRIC COCKPIT OVERVIEW -->
    <div class="cockpit-metrics-grid">
      <div class="metric-card">
        <div class="metric-icon-box" style="color:var(--accent);">⚡</div>
        <div class="metric-info">
          <h5>Total XP</h5>
          <div class="metric-val">${userState.xp}</div>
        </div>
      </div>
      <div class="metric-card">
        <div class="metric-icon-box" style="color:#fb7185;">🔥</div>
        <div class="metric-info">
          <h5>Active Streak</h5>
          <div class="metric-val">${userState.streak} Days</div>
        </div>
      </div>
      <div class="metric-card">
        <div class="metric-icon-box" style="color:var(--success);">📊</div>
        <div class="metric-info">
          <h5>Curriculum Mastery</h5>
          <div class="metric-val">${totalMasteryPct}%</div>
          <span style="font-size:0.72rem; color:var(--text-muted);">${prog.completedItems} / ${prog.totalItems} Objectives</span>
        </div>
      </div>
      <div class="metric-card" onclick="switchAppView('errors')" style="cursor:pointer;">
        <div class="metric-icon-box" style="color:${userState.errors.length > 0 ? 'var(--danger)' : 'var(--text-muted)'};">📓</div>
        <div class="metric-info">
          <h5>Mistake Vault</h5>
          <div class="metric-val">${userState.errors.length} to Review</div>
        </div>
      </div>
    </div>

    <!-- DAILY STRUCTURAL CHALLENGE -->
    <div class="step-box" style="border-left:4px solid var(--gold); margin-bottom:20px;">
      <div class="step-header">
        <span>⚡ Today's Daily Structural Challenge (+200 XP Bonus)</span>
        <span class="stat-pill" style="color:var(--gold);">${isDailyDone ? '✅ Mastered Today' : '⏳ Ready'}</span>
      </div>
      <p style="color:var(--text-muted); font-size:0.86rem; margin-bottom:8px;">Chapter: <strong>${dailyItem.modTitle}</strong></p>
      <p style="font-weight:600; font-size:1.02rem; margin-bottom:12px;">${dailyItem.q.prompt}</p>
      
      <div class="options-list">
        ${dailyItem.q.options.map((opt, optIdx) => `
          <button class="option-btn" onclick="checkDailyChallengeAnswer(${dailyItem.mIdx}, ${dailyItem.qIdx}, ${optIdx})">
            ${opt.text}
          </button>
        `).join('')}
      </div>
      <div class="feedback-banner" id="dailyFeedback"></div>
    </div>

    <!-- 8-MODULE CURRICULUM ROADMAP -->
    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin: 24px 0 12px;">
      <h3 style="margin:0; font-size:1.15rem; color:#fff;">📚 8-Module Curriculum Roadmap</h3>
      <span style="font-size:0.82rem; color:var(--text-muted);">${solvedCount} / ${totalChallenges} Challenges Mastered</span>
    </div>

    <div class="curriculum-grid">
      ${COURSE_MODULES.map((m, idx) => {
        const solved = m.arena.filter((q, qIdx) => userState.solved[`${m.id}_q${qIdx}`]).length;
        const total = m.arena.length;
        const pct = total > 0 ? Math.round((solved / total) * 100) : 0;
        const isDone = pct === 100;
        const vCount = m.videos ? m.videos.length : 0;

        return `
          <div class="mod-card" onclick="selectModule(${idx})">
            <div class="mod-card-top">
              <span class="mod-card-icon">${m.icon}</span>
              <span class="stat-pill" style="font-size:0.7rem; color:${isDone ? 'var(--success)' : pct > 0 ? 'var(--gold)' : 'var(--text-dim)'}">
                ${isDone ? '✅ 100%' : pct > 0 ? `🟡 ${pct}%` : '⚪ Ready'}
              </span>
            </div>
            <div>
              <div class="mod-card-title">${m.shortTitle}</div>
              <div class="progress-bar-track" style="margin:8px 0 4px; height:5px;">
                <div class="progress-bar-fill" style="width:${pct}%;"></div>
              </div>
            </div>
            <div class="mod-card-footer">
              <span>${solved} / ${total} Solved</span>
              <div style="display:flex; gap:6px;">
                <button class="hud-btn" style="padding:2px 7px; font-size:0.72rem; color:var(--accent); border-color:var(--accent);" onclick="openModuleVideos(${idx}); event.stopPropagation();" title="Watch Video Masterclasses">
                  🎥 ${vCount}
                </button>
                <button class="primary-btn" style="padding:2px 8px; font-size:0.72rem;" onclick="selectModule(${idx}); event.stopPropagation();">
                  Study ➔
                </button>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>

    <!-- VIDEO MASTERCLASSES CURRICULUM HUB -->
    <div class="dashboard-video-hub">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:10px; margin-bottom:12px;">
        <div>
          <h3 style="margin:0; font-size:1.12rem; color:#fff; display:flex; align-items:center; gap:8px;">
            <span style="color:#ef4444;">🎥</span> Video Masterclasses Curriculum Hub
          </h3>
          <p style="color:var(--text-muted); font-size:0.86rem; margin:4px 0 0;">
            19 curated AAU & international structural analysis video lectures across all 8 modules.
          </p>
        </div>
        <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
          <span class="stat-pill" style="font-size:0.78rem; color:var(--success);">
            ✓ ${Object.keys(userState.watchedVideos || {}).length} / 19 Watched
          </span>
          <button class="btn-primary" style="padding:6px 12px; font-size:0.8rem;" onclick="openModuleVideos(currentModuleIdx)">
            Open Chapter Videos ➔
          </button>
        </div>
      </div>

      <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(220px, 1fr)); gap:10px; margin-top:14px;">
        ${COURSE_MODULES.map((m, mIdx) => {
          const vCount = m.videos ? m.videos.length : 0;
          const watchedInMod = (m.videos || []).filter(v => {
            const vidId = extractYouTubeId(v.url);
            return userState.watchedVideos && userState.watchedVideos[vidId];
          }).length;
          const allWatched = watchedInMod === vCount && vCount > 0;

          return `
            <div class="dashboard-video-chip" onclick="openModuleVideos(${mIdx})" style="border-color:${allWatched ? 'var(--success)' : 'var(--border)'};">
              <div style="min-width:0;">
                <strong style="color:#fff; font-size:0.84rem; display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                  ${m.icon} ${m.shortTitle}
                </strong>
                <span style="font-size:0.75rem; color:var(--text-muted);">
                  ${watchedInMod} / ${vCount} Watched ${allWatched ? '✅' : ''}
                </span>
              </div>
              <span style="color:var(--accent); font-size:0.82rem; flex-shrink:0;">▶</span>
            </div>
          `;
        }).join('')}
      </div>
    </div>

    <!-- FORMULA OF THE DAY (SPATIAL ACTIVE RECALL) -->
    <div class="step-box" style="border-left:4px solid var(--accent); margin-bottom:20px;">
      <div class="step-header">
        <span>📜 High-Yield Formula of the Day</span>
        <button class="hud-btn" onclick="switchAppView('atlas')">Open Full Formula Vault ➔</button>
      </div>
      <h4 style="color:#fff; margin:6px 0;">${dailyFormula.name} (${dailyFormula.moduleTitle})</h4>
      <div class="formula-banner math-display-card">
        <div class="math-card-body">${formatFormula(dailyFormula.formula)}</div>
      </div>
      <div style="font-size:0.88rem; color:var(--text-muted); margin-top:8px;">
        <p><strong>🎯 Memory Cue:</strong> ${dailyFormula.memoryCue}</p>
        <p style="color:#fca5a5; margin-top:4px;"><strong>⚠️ Exam Trap:</strong> ${dailyFormula.traps}</p>
      </div>
    </div>
  `;
}

function checkDailyChallengeAnswer(mIdx, qIdx, optIdx) {
  const mod = COURSE_MODULES[mIdx];
  const q = mod.arena[qIdx];
  const chosen = q.options[optIdx];
  const key = `${mod.id}_q${qIdx}`;
  const feedback = document.getElementById('dailyFeedback');
  if (!feedback) return;

  feedback.style.display = 'block';
  if (chosen.correct) {
    if (!userState.solved[key]) {
      userState.solved[key] = true;
      userState.xp += 200;
      userState.streak += 1;
      saveState();
    }
    feedback.className = 'feedback-banner';
    feedback.style.background = 'rgba(16, 185, 129, 0.2)';
    feedback.style.border = '1px solid var(--success)';
    feedback.style.color = '#a7f3d0';
    feedback.innerHTML = `<strong>✅ Master Answer (+200 XP Bonus Claimed!)</strong><br/>${chosen.explain}`;
  } else {
    feedback.className = 'feedback-banner';
    feedback.style.background = 'rgba(244, 63, 94, 0.2)';
    feedback.style.border = '1px solid var(--danger)';
    feedback.style.color = '#fecdd3';
    feedback.innerHTML = `<strong>❌ Not Quite.</strong><br/>${chosen.explain}`;
  }

  setTimeout(function() {
    renderMathInDOM(feedback);
  }, 10);
}

// =========================================================================
// 1. MODULE VIEW RENDERER (WITH COLLAPSIBLE TOPICS & COMPACT SECTIONS)
// =========================================================================


// =========================================================================
// GIZMO-STYLE PROGRESSIVE LEARNING CONTROLLER
// =========================================================================

let moduleStudyMode = 'deck'; // 'deck' (Gizmo card flow, default) or 'scroll' (all at once)
let currentTheoryCardIdx = 0;
let currentGuidedExIdx = 0;
let currentGuidedStepIdx = 0;

function setModuleStudyMode(mode) {
  moduleStudyMode = mode;
  renderMainView();
}

function nextTheoryCard() {
  const mod = COURSE_MODULES[currentModuleIdx];
  if (!mod || !mod.theory) return;

  const cardKey = `${mod.id}_t${currentTheoryCardIdx}`;
  if (!userState.theoryProgress) userState.theoryProgress = {};
  if (!userState.theoryProgress[cardKey]) {
    userState.theoryProgress[cardKey] = true;
    userState.xp += 25;
    userState.streak = (userState.streak || 0) + 1;
    saveState();
    showXPToast(25, 'Concept Mastered! ⚡'); SoundEngine.playCorrect(); if (typeof userState !== "undefined") { userState.dailyCardsDone = (userState.dailyCardsDone || 0) + 1; checkDailyMissionComplete(); }
  }

  if (currentTheoryCardIdx < mod.theory.length - 1) {
    currentTheoryCardIdx++;
  } else {
    currentTheoryCardIdx = mod.theory.length; // Victory screen
  }
  renderMainView();
}

function prevTheoryCard() { SoundEngine.playCardAdvance();
  if (currentTheoryCardIdx > 0) {
    currentTheoryCardIdx--;
    renderMainView();
  }
}

function jumpToTheoryCard(idx) {
  currentTheoryCardIdx = idx;
  renderMainView();
}

function toggleMicroCheck(idx) {
  const ansEl = document.getElementById(`micro_check_answer_${idx}`);
  if (!ansEl) return;
  const isHidden = ansEl.style.display === 'none' || ansEl.style.display === '';
  ansEl.style.display = isHidden ? 'block' : 'none';
  if (isHidden) {
    userState.xp += 10;
    saveState();
    showXPToast(10, 'Insight Unlocked! 💡');
  }
}

function getMicroCheckData(modId, idx, heading) {
  const h = (heading || '').toLowerCase();
  if (h.includes('determinacy') || h.includes('stability')) {
    return {
      prompt: "Quick Check: A 2D plane frame has 3 members and 3 rigid joints connected to ground. How many equations of static equilibrium govern the entire system?",
      answer: "3 equations for overall external equilibrium (∑ Fx = 0, ∑ Fy = 0, ∑ M = 0) plus 3 equations of joint equilibrium per unconstrained node."
    };
  }
  if (h.includes('slope-deflection') || h.includes('slope deflection')) {
    return {
      prompt: "Sign Rule Check: Why does the EiABC Slope-Deflection formula feature a MINUS sign before 2EK(2θ_i + θ_j - 3Δ/L)?",
      answer: "EiABC follows the clockwise-positive convention for joint rotations and member chords, but counter-clockwise on the beam element for end moments. The minus sign enforces this rotational equilibrium."
    };
  }
  if (h.includes('hardy') || h.includes('moment distribution') || h.includes('stiffness')) {
    return {
      prompt: "Stiffness Rule: If member BC has a pinned far end at C, what modified stiffness K' and carry-over factor (COF) must be used?",
      answer: "Modified stiffness K' = (3/4)(I/L) = 0.75 K, and Carry-Over Factor COF = 0 (pinned ends cannot carry over or resist moment)."
    };
  }
  if (h.includes('conjugate')) {
    return {
      prompt: "Conjugate Rule: What does a fixed support in a real beam transform into in its conjugate beam?",
      answer: "In the real beam, a fixed support has slope = 0 and deflection = 0. Therefore in the conjugate beam, shear = 0 and moment = 0, which corresponds to a completely FREE end!"
    };
  }
  if (h.includes('three-moment') || h.includes('clapeyron')) {
    return {
      prompt: "Settlement Check: If an intermediate support sinks downward, does it increase or relieve the hogging bending moment over that support?",
      answer: "Downward settlement relieves (reduces) the hogging negative moment over that support, adding a positive relief term into Clapeyron's equation."
    };
  }
  if (h.includes('virtual work')) {
    return {
      prompt: "Virtual Work Check: In the unit load equation 1·Δ = ∫ (M·m / EI) dx, where must the fictitious unit load 1 be placed?",
      answer: "The fictitious unit load 1 must be placed at the EXACT point and in the EXACT direction of the desired deflection Δ."
    };
  }
  return {
    prompt: "Key Protocol Check: What is the most critical first step before writing any structural equations?",
    answer: "Identify all boundary constraints, assign a consistent coordinate axis, and state your sign convention (e.g., ∑ M_A = 0 CCW +) explicitly."
  };
}

function selectGuidedExample(exIdx) {
  currentGuidedExIdx = exIdx;
  currentGuidedStepIdx = 0;
  renderMainView();
}

function nextGuidedStep() {
  const mod = COURSE_MODULES[currentModuleIdx];
  if (!mod || !mod.guidedExamples) return;
  const ex = mod.guidedExamples[currentGuidedExIdx];
  if (!ex || !ex.steps) return;

  if (currentGuidedStepIdx < ex.steps.length - 1) {
    currentGuidedStepIdx++;
    userState.xp += 20;
    saveState();
    showXPToast(20, 'Step Completed! 📐'); SoundEngine.playCardAdvance();
  } else {
    // Complete entire example
    const exKey = `${mod.id}_g${currentGuidedExIdx}`;
    if (!userState.guidedProgress) userState.guidedProgress = {};
    if (!userState.guidedProgress[exKey]) {
      userState.guidedProgress[exKey] = true;
      userState.xp += 100;
      userState.streak = (userState.streak || 0) + 1;
      saveState();
      showXPToast(100, 'Worked Example Mastered! 🎉'); SoundEngine.playCorrect(); if (typeof userState !== "undefined") { userState.dailyExDone = (userState.dailyExDone || 0) + 1; checkDailyMissionComplete(); }
    }
    if (currentGuidedExIdx < mod.guidedExamples.length - 1) {
      currentGuidedExIdx++;
      currentGuidedStepIdx = 0;
    }
  }
  renderMainView();
}

function prevGuidedStep() {
  if (currentGuidedStepIdx > 0) {
    currentGuidedStepIdx--;
    renderMainView();
  }
}

// =========================================================================
// MODULE VIEW RENDERER (PROGRESSIVE GIZMO DECK + SCROLL MODES)
// =========================================================================
function renderModuleView(viewport) {
  const mod = COURSE_MODULES[currentModuleIdx];
  const modProgress = getModuleProgressData(mod.id);

  if (currentModuleTab === 'theory') {
    const isVictory = currentTheoryCardIdx >= mod.theory.length;

    viewport.innerHTML = `
      <div class="card gizmo-container">
        <!-- TOP HEADER WITH MODE TOGGLE & GIZMO SEGMENTED PROGRESS -->
        <div class="gizmo-header">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-size:1.4rem;">${mod.icon}</span>
              <div>
                <h2 style="margin:0; font-size:1.15rem; color:#fff;">${mod.fullTitle}</h2>
                <span style="font-size:0.78rem; color:var(--text-muted);">
                  ${moduleStudyMode === 'deck' ? `Bite-Sized Gizmo Deck &bull; Card ${Math.min(currentTheoryCardIdx + 1, mod.theory.length)} of ${mod.theory.length}` : 'Full Course Reference Scroll'}
                  &bull; <strong style="color:var(--accent);">${modProgress.pct}% Chapter Progress</strong>
                </span>
              </div>
            </div>
            
            <!-- MODE TOGGLE -->
            <div class="gizmo-mode-toggle">
              <button class="gizmo-mode-btn ${moduleStudyMode === 'deck' ? 'active' : ''}" onclick="setModuleStudyMode('deck')">
                ⚡ Gizmo Cards
              </button>
              <button class="gizmo-mode-btn ${moduleStudyMode === 'scroll' ? 'active' : ''}" onclick="setModuleStudyMode('scroll')">
                📜 Full Scroll
              </button>
            </div>
          </div>

          <!-- GIZMO SEGMENTED PROGRESS BAR -->
          ${moduleStudyMode === 'deck' ? `
            <div class="gizmo-segmented-bar">
              ${mod.theory.map((t, idx) => {
                const isDone = userState.theoryProgress && userState.theoryProgress[`${mod.id}_t${idx}`];
                const isActive = idx === currentTheoryCardIdx;
                return `
                  <div class="gizmo-segment ${isActive ? 'active' : (isDone ? 'completed' : '')}" 
                       onclick="jumpToTheoryCard(${idx})" 
                       title="Card ${idx + 1}: ${escapeHtml(t.heading)}">
                  </div>
                `;
              }).join('')}
            </div>
          ` : ''}
        </div>

        ${moduleStudyMode === 'deck' ? (
          isVictory ? `
            <!-- VICTORY SCREEN -->
            <div class="gizmo-victory-card">
              <div style="font-size:3.2rem; margin-bottom:12px;">🏆</div>
              <h2 style="color:#fff; font-size:1.35rem; margin-bottom:6px;">Theory Mastered!</h2>
              <p style="color:var(--text-muted); font-size:0.9rem; max-width:480px; margin:0 auto 18px;">
                You conquered all <strong>${mod.theory.length} core concepts</strong> for <em>${mod.shortTitle}</em>.
              </p>
              <div class="victory-stats-row">
                <div class="victory-stat-pill">
                  <span>Completed</span>
                  <strong>${mod.theory.length} / ${mod.theory.length} Cards</strong>
                </div>
                <div class="victory-stat-pill">
                  <span>XP Earned</span>
                  <strong style="color:var(--gold);">+${mod.theory.length * 25} XP</strong>
                </div>
              </div>
              <div style="display:flex; justify-content:center; gap:10px; margin-top:22px; flex-wrap:wrap;">
                <button class="hud-btn" onclick="jumpToTheoryCard(0)">🔄 Review Deck</button>
                <button class="btn-primary" onclick="switchModuleTab('guided')">Launch Worked Examples ➔</button>
              </div>
            </div>
          ` : (function() {
            const t = mod.theory[currentTheoryCardIdx];
            const isDone = !!(userState.theoryProgress && userState.theoryProgress[`${mod.id}_t${currentTheoryCardIdx}`]);
            const checkData = getMicroCheckData(mod.id, currentTheoryCardIdx, t.heading);

            return `
              <div class="gizmo-card-body">
                <div class="gizmo-card-meta">
                  <span class="gizmo-card-tag">Concept ${currentTheoryCardIdx + 1} of ${mod.theory.length}</span>
                  <span class="gizmo-status-tag ${isDone ? 'done' : ''}">
                    ${isDone ? '✅ Mastered (+25 XP Claimed)' : '⏳ Active Concept'}
                  </span>
                </div>

                <h3 class="gizmo-card-title">${t.heading}</h3>

                ${currentTheoryCardIdx === 0 ? `
                  <div class="concept-callout" style="border-left-color:var(--accent); font-size:0.92rem; margin:8px 0 14px;">
                    <strong>💡 First-Principles Intuition:</strong> ${mod.intuition}
                  </div>
                ` : ''}

                ${t.formula ? `
                  <div class="formula-banner math-display-card" style="margin: 12px 0 16px;">
                    <div class="math-card-header">
                      <span class="math-badge">GOVERNING FORMULA</span>
                      <button class="copy-latex-btn" onclick="copyFormulaLatex('${encodeURIComponent(t.formula)}', this)">📋 Copy LaTeX</button>
                    </div>
                    <div class="math-card-body">${formatFormula(t.formula)}</div>
                  </div>
                ` : ''}

                <div class="gizmo-prose-body">
                  ${t.body}
                </div>

                <!-- GIZMO INTERACTIVE COMPREHENSION CHECK -->
                <div class="gizmo-micro-check">
                  <div class="micro-check-header">
                    <span>💡 Quick Comprehension Pulse</span>
                    <span style="font-size:0.75rem; color:var(--gold);">Verify before advancing</span>
                  </div>
                  <p style="font-size:0.85rem; margin:6px 0 10px; color:#e2e8f0;">
                    ${checkData.prompt}
                  </p>
                  <div class="micro-check-actions">
                    <button class="hud-btn" style="font-size:0.8rem; padding:6px 12px;" onclick="toggleMicroCheck(${currentTheoryCardIdx})">
                      👁️ Reveal Key Insight & Explanation
                    </button>
                    <div id="micro_check_answer_${currentTheoryCardIdx}" style="display:none; margin-top:8px; padding:10px; background:rgba(56, 189, 248, 0.1); border-left:3px solid var(--accent); border-radius:4px; font-size:0.84rem; color:#cbd5e1;">
                      ${checkData.answer}
                    </div>
                  </div>
                </div>
              </div>

              <!-- STICKY BOTTOM GIZMO NAVIGATION BAR -->
              <div class="gizmo-bottom-bar">
                <button class="hud-btn" onclick="prevTheoryCard()" ${currentTheoryCardIdx === 0 ? 'disabled style="opacity:0.4; cursor:not-allowed;"' : ''}>
                  ⬅ Previous
                </button>
                <div class="gizmo-card-dots">
                  ${mod.theory.map((_, i) => `<span class="gizmo-dot ${i === currentTheoryCardIdx ? 'active' : ''}"></span>`).join('')}
                </div>
                <button class="btn-primary gizmo-continue-btn" onclick="nextTheoryCard()">
                  ${currentTheoryCardIdx === mod.theory.length - 1 ? 'Complete Theory & Celebrate 🎉' : 'Understood! Continue (+25 XP) ➔'}
                </button>
              </div>
            `;
          })()
        ) : `
          <!-- FULL REFERENCE SCROLL MODE -->
          <div style="display:flex; flex-direction:column; gap:12px;">
            ${mod.theory.map((t, tIdx) => {
              const isDone = userState.theoryProgress && userState.theoryProgress[`${mod.id}_t${tIdx}`];
              return `
                <div class="collapsible-card ${tIdx === 0 ? 'open' : ''}" id="theory_card_${tIdx}">
                  <div class="collapsible-header" onclick="toggleCollapsible('theory_card_${tIdx}')">
                    <span>${t.heading} ${isDone ? '✅' : ''}</span>
                    <span class="collapsible-toggle-icon">▼</span>
                  </div>
                  <div class="collapsible-body">
                    ${t.formula ? `
                      <div class="formula-banner math-display-card">
                        <div class="math-card-header">
                          <span class="math-badge">GOVERNING EQUATION</span>
                          <button class="copy-latex-btn" onclick="copyFormulaLatex('${encodeURIComponent(t.formula)}', this)">📋 Copy LaTeX</button>
                        </div>
                        <div class="math-card-body">${formatFormula(t.formula)}</div>
                      </div>
                    ` : ''}
                    <div>${t.body}</div>
                    <div style="margin-top:12px; border-top:1px solid rgba(255,255,255,0.06); padding-top:8px;">
                      <button class="hud-btn" style="font-size:0.78rem;" onclick="jumpToTheoryCard(${tIdx}); setModuleStudyMode('deck');">
                        🎯 Study in Gizmo Card Flow ➔
                      </button>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <div style="margin-top:24px; padding-top:16px; border-top:1px solid var(--border); display:flex; justify-content:space-between; flex-wrap:wrap; gap:10px;">
            <button class="hud-btn" onclick="switchAppView('dashboard')">⬅ Back to Cockpit</button>
            <div style="display:flex; gap:8px; flex-wrap:wrap;">
              <button class="hud-btn" onclick="switchModuleTab('videos')">🎥 Video Lectures</button>
              <button class="btn-primary" onclick="switchModuleTab('guided')">Next: Guided Worked Examples ➔</button>
            </div>
          </div>
        `}
      </div>
    `;
  } else if (currentModuleTab === 'guided') {
    const examples = mod.guidedExamples || [];
    const ex = examples[currentGuidedExIdx] || examples[0];

    viewport.innerHTML = `
      <div class="card gizmo-container">
        <!-- TOP HEADER & EXAMPLE SELECTOR -->
        <div class="gizmo-header">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:12px;">
            <div>
              <h2 style="margin:0; font-size:1.15rem; color:#fff;">🔬 Guided Worked Examples — ${mod.shortTitle}</h2>
              <span style="font-size:0.78rem; color:var(--text-muted);">Step-by-step master derivations with interactive checkpoints</span>
            </div>
            <div class="gizmo-mode-toggle">
              <button class="gizmo-mode-btn ${moduleStudyMode === 'deck' ? 'active' : ''}" onclick="setModuleStudyMode('deck')">
                ⚡ Progressive Steps
              </button>
              <button class="gizmo-mode-btn ${moduleStudyMode === 'scroll' ? 'active' : ''}" onclick="setModuleStudyMode('scroll')">
                📜 Full Scroll
              </button>
            </div>
          </div>

          <!-- EXAMPLE CAROUSEL TABS -->
          <div class="gizmo-ex-tabs">
            ${examples.map((item, idx) => {
              const isExDone = userState.guidedProgress && userState.guidedProgress[`${mod.id}_g${idx}`];
              const isActive = idx === currentGuidedExIdx;
              return `
                <button class="gizmo-ex-tab ${isActive ? 'active' : ''} ${isExDone ? 'done' : ''}" onclick="selectGuidedExample(${idx})">
                  ${isExDone ? '✅' : '🔬'} Example ${idx + 1}: ${escapeHtml(item.title.substring(0, 24))}...
                </button>
              `;
            }).join('')}
          </div>

          <!-- STEP PROGRESS BAR -->
          ${moduleStudyMode === 'deck' && ex && ex.steps ? `
            <div class="gizmo-segmented-bar">
              ${ex.steps.map((s, sIdx) => {
                const isPast = sIdx < currentGuidedStepIdx;
                const isCurr = sIdx === currentGuidedStepIdx;
                return `
                  <div class="gizmo-step-segment ${isCurr ? 'active' : (isPast ? 'completed' : '')}" 
                       onclick="currentGuidedStepIdx = ${sIdx}; renderMainView();"
                       title="Step ${sIdx + 1}: ${escapeHtml(s.stepName)}">
                  </div>
                `;
              }).join('')}
            </div>
          ` : ''}
        </div>

        ${!ex ? `<p style="color:var(--text-muted); padding:20px;">No guided examples available for this module yet.</p>` : (
          moduleStudyMode === 'deck' ? (function() {
            const currentStep = ex.steps[currentGuidedStepIdx] || ex.steps[0];
            const isExDone = userState.guidedProgress && userState.guidedProgress[`${mod.id}_g${currentGuidedExIdx}`];

            return `
              <div class="gizmo-card-body">
                <div class="gizmo-card-meta">
                  <span class="gizmo-card-tag">Example ${currentGuidedExIdx + 1} of ${examples.length} &bull; Step ${currentGuidedStepIdx + 1} of ${ex.steps.length}</span>
                  <span class="gizmo-status-tag ${isExDone ? 'done' : ''}">
                    ${isExDone ? '✅ Mastered (+100 XP Claimed)' : '⏳ In Progress'}
                  </span>
                </div>

                <h3 class="gizmo-card-title">${ex.title}</h3>
                <p style="font-size:0.9rem; line-height:1.5; color:var(--text-muted); margin-bottom:12px;">
                  <strong>Problem:</strong> ${ex.problem}
                </p>

                ${currentGuidedStepIdx === 0 && ex.svgConfig ? (
                  ex.svgConfig.nodes ? StructureVisuals.renderTruss(ex.svgConfig) : StructureVisuals.renderBeam(ex.svgConfig)
                ) : ''}

                <!-- Fading Hints -->
                ${ex.hints && ex.hints.length > 0 ? `
                  <div style="margin: 10px 0;">
                    ${ex.hints.map((hint, hIdx) => `
                      <div class="hint-pill" id="hint_${currentGuidedExIdx}_${hIdx}" style="display:none; background:rgba(250,204,21,0.1); border:1px dashed var(--gold); color:#fde047; padding:8px 12px; border-radius:6px; margin-bottom:6px; font-size:0.84rem;">
                        💡 <strong>${hint}</strong>
                      </div>
                    `).join('')}
                    <button class="hud-btn" style="font-size:0.78rem; padding:4px 10px;" onclick="revealHint(${currentGuidedExIdx}, ${ex.hints.length})">
                      💡 Reveal Fading Hint
                    </button>
                  </div>
                ` : ''}

                <!-- Active Step Card -->
                <div style="background:rgba(9, 14, 29, 0.85); border-left:4px solid var(--accent); border-radius:6px; padding:14px; margin:12px 0;">
                  <h4 style="color:var(--accent); font-size:0.96rem; margin:0 0 8px 0;">${currentStep.stepName}</h4>
                  <div style="color:var(--text-main); font-size:0.9rem; line-height:1.6;">${currentStep.content}</div>
                </div>
              </div>

              <!-- BOTTOM GIZMO NAVIGATION BAR -->
              <div class="gizmo-bottom-bar">
                <button class="hud-btn" onclick="prevGuidedStep()" ${currentGuidedStepIdx === 0 ? 'disabled style="opacity:0.4; cursor:not-allowed;"' : ''}>
                  ⬅ Previous Step
                </button>
                <div class="gizmo-card-dots">
                  ${ex.steps.map((_, i) => `<span class="gizmo-dot ${i === currentGuidedStepIdx ? 'active' : ''}"></span>`).join('')}
                </div>
                <button class="btn-primary gizmo-continue-btn" onclick="nextGuidedStep()">
                  ${currentGuidedStepIdx === ex.steps.length - 1 ? 'Master Worked Example (+100 XP) 🎉' : 'Next Step (+20 XP) ➔'}
                </button>
              </div>
            `;
          })() : `
            <!-- FULL SCROLL MODE -->
            <div style="display:flex; flex-direction:column; gap:20px;">
              ${examples.map((item, exIdx) => `
                <div class="step-box">
                  <div class="step-header">
                    <span>${item.title}</span>
                  </div>
                  <p style="font-size:0.95rem; line-height:1.5;"><strong>Problem Statement:</strong> ${item.problem}</p>
                  ${item.svgConfig ? (item.svgConfig.nodes ? StructureVisuals.renderTruss(item.svgConfig) : StructureVisuals.renderBeam(item.svgConfig)) : ''}
                  
                  <div style="margin-top:14px;">
                    ${item.steps.map(st => `
                      <div style="border-left:2px solid var(--accent); padding-left:14px; margin-bottom:14px;">
                        <h4 style="color:var(--accent); font-size:0.92rem; margin-bottom:4px;">${st.stepName}</h4>
                        <div style="color:var(--text-main); font-size:0.9rem;">${st.content}</div>
                      </div>
                    `).join('')}
                  </div>
                </div>
              `).join('')}
            </div>

            <div style="margin-top:20px; display:flex; justify-content:space-between; flex-wrap:wrap; gap:10px;">
              <button class="hud-btn" onclick="switchModuleTab('theory')">⬅ Theory</button>
              <div style="display:flex; gap:8px; flex-wrap:wrap;">
                <button class="hud-btn" onclick="switchModuleTab('videos')">🎥 Video Lectures</button>
                <button class="btn-primary" onclick="switchModuleTab('shortcuts')">Next: Speed Tricks ➔</button>
              </div>
            </div>
          `
        )}
      </div>
    `;
  } else if (currentModuleTab === 'shortcuts') {
    viewport.innerHTML = `
      <div class="card">
        <h2>⚡ Master's Ninja Shortcuts & Method Selection — ${mod.shortTitle}</h2>
        <p style="color:var(--text-muted); margin-bottom:18px; font-size:0.92rem;">Tested geometric insights, speed tricks, and method-selection rules that save 70% of exam time.</p>
        
        <h3>🎯 When to Choose This Method:</h3>
        <div class="concept-callout" style="border-left-color:var(--success);">
          ${mod.methodSelection}
        </div>

        <!-- 1000x ACCURACY MASTER PROBLEM-SOLVING PROTOCOL -->
        <div class="master-protocol-card">
          <div class="protocol-header">
            <div>
              <h3 style="margin:0; font-size:1.08rem; color:#fff; display:flex; align-items:center; gap:8px;">
                <span>🎯</span> The 1000x Accuracy Master Protocol (Foolproof Problem-Solving Framework)
              </h3>
              <p style="color:var(--text-muted); font-size:0.84rem; margin:3px 0 0;">
                Follow these 5 non-negotiable phases to eliminate careless arithmetic and sign errors in university exams:
              </p>
            </div>
            <span class="protocol-badge">EiABC Exam Standard</span>
          </div>

          <div class="protocol-steps-grid">
            <div class="protocol-step-box">
              <div class="protocol-step-num">PHASE 1</div>
              <h4>Structural Triage</h4>
              <p>Identify structure type (beam, truss, frame), count unknowns vs equilibrium equations (DSI, DKI), classify determinacy and stability.</p>
            </div>
            <div class="protocol-step-box">
              <div class="protocol-step-num">PHASE 2</div>
              <h4>Method Selection</h4>
              <p>Pick the fastest method for the requested unknowns. Consult the <strong>Method Decider</strong> to avoid tedious redundant equations.</p>
            </div>
            <div class="protocol-step-box">
              <div class="protocol-step-num">PHASE 3</div>
              <h4>Givens & Sign Anchoring</h4>
              <p>Extract all $L$, $EI$, $P$, $w$, $\Delta$ values. Write down coordinate system and explicit sign convention before touching any algebra.</p>
            </div>
            <div class="protocol-step-box">
              <div class="protocol-step-num">PHASE 4</div>
              <h4>Linear Execution Ladder</h4>
              <p>Work step-by-step: Fixed-End Moments $\implies$ Slope-Deflection equations $\implies$ Joint Equilibrium $\implies$ Boundary Conditions.</p>
            </div>
            <div class="protocol-step-box">
              <div class="protocol-step-num">PHASE 5</div>
              <h4>Independent Reality Check</h4>
              <p>Sanity-check reactions ($\sum F_y = 0$), confirm moment signs match physical deflected shape, verify units ($kN \cdot m$, $mm$).</p>
            </div>
          </div>
        </div>

        <h3 style="margin-top:24px;">🚀 Speed Shortcuts & Mnemonic Rules:</h3>
        <div style="display:flex; flex-direction:column; gap:14px; margin-top:12px;">
          ${(mod.shortcuts || []).map((s, sIdx) => `
            <div class="step-box" style="border-left:3px solid var(--accent);">
              <div class="step-header">
                <span>⚡ ${s.title}</span>
                <span style="font-size:0.75rem; color:var(--gold);">Tested Shortcut</span>
              </div>
              <p style="margin:8px 0; font-size:0.92rem;"><strong>Condition:</strong> ${s.trigger}</p>
              <div class="formula-banner math-display-card" style="margin:8px 0;">
                <div class="math-card-header"><span class="math-badge">SHORTCUT FORMULA</span></div>
                <div class="math-card-body">${formatFormula(s.formula)}</div>
              </div>
              <p style="font-size:0.88rem; color:var(--text-muted); margin-bottom:4px;">${s.explain}</p>
              ${s.caution ? `<p style="font-size:0.84rem; color:var(--danger); margin:0;">⚠️ <strong>Caution:</strong> ${s.caution}</p>` : ''}
            </div>
          `).join('')}
        </div>

        <div style="margin-top:20px; display:flex; justify-content:space-between; flex-wrap:wrap; gap:10px;">
          <button class="hud-btn" onclick="switchModuleTab('guided')">⬅ Guided Examples</button>
          <button class="btn-primary" onclick="switchModuleTab('arena')">Next: Challenge Gauntlet ➔</button>
        </div>
      </div>
    `;
  } else if (currentModuleTab === 'arena') {
    viewport.innerHTML = `
      <div class="card">
        <h2>⚔️ Challenge Gauntlet — ${mod.shortTitle}</h2>
        <p style="color:var(--text-muted); margin-bottom:18px; font-size:0.92rem;">Test your mastery against authentic exam traps. Correct answers earn +150 XP and raise your structural engineering rank.</p>

        ${mod.arena.map((q, qIdx) => {
          const key = `${mod.id}_q${qIdx}`;
          const isDone = userState.solved[key];
          return `
            <div class="step-box" style="margin-bottom:20px;" id="qcard_${key}">
              <div class="step-header">
                <span>${q.title}</span>
                <span class="stat-pill" style="color:${isDone ? 'var(--success)' : 'var(--gold)'};">${isDone ? '✅ Mastered (+150 XP)' : '⏳ Active Challenge'}</span>
              </div>
              ${q.diagram ? `<div class="blueprint-diagram">${q.diagram}</div>` : ''}
              <p style="font-weight:600; font-size:0.98rem; margin:10px 0;">${q.prompt}</p>
              <div class="options-list">
                ${q.options.map((opt, optIdx) => `
                  <button class="option-btn" onclick="checkArenaAnswer('${mod.id}', ${qIdx}, ${optIdx})">
                    ${opt.text}
                  </button>
                `).join('')}
              </div>
              <div class="feedback-banner" id="feedback_${key}"></div>
            </div>
          `;
        }).join('')}

        <div style="margin-top:20px; display:flex; justify-content:space-between; flex-wrap:wrap; gap:10px;">
          <button class="hud-btn" onclick="switchModuleTab('shortcuts')">⬅ Speed Tricks</button>
          <button class="btn-primary" onclick="switchModuleTab('cheatsheet')">Next: Formula Vault ➔</button>
        </div>
      </div>
    `;
  } else if (currentModuleTab === 'cheatsheet') {
    viewport.innerHTML = `
      <div class="card">
        <h2>📋 Chapter Formula Quick Sheet — ${mod.shortTitle}</h2>
        <p style="color:var(--text-muted); margin-bottom:16px; font-size:0.9rem;">
          Condensed mathematical handbook for this chapter. Tap any formula card to inspect.
        </p>

        <div class="concept-callout" style="border-left-color:var(--accent); font-size:0.92rem; line-height:1.7;">
          ${typeof mod.cheatsheet === 'string' ? mod.cheatsheet : (Array.isArray(mod.cheatsheet) ? mod.cheatsheet.map(item => `<div>${item}</div>`).join('') : '')}
        </div>

        <div style="margin-top:20px; display:flex; justify-content:space-between; flex-wrap:wrap; gap:10px;">
          <button class="hud-btn" onclick="switchModuleTab('arena')">⬅ Gauntlet</button>
          <button class="hud-btn" onclick="switchAppView('atlas')">Explore in Full Atlas ➔</button>
        </div>
      </div>
    `;
  } else if (currentModuleTab === 'videos') {
    const videos = mod.videos || [];
    viewport.innerHTML = `
      <div class="card">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:10px; margin-bottom:8px;">
          <h2>🎥 Video Masterclasses — ${mod.shortTitle}</h2>
          <span class="stat-pill" style="font-size:0.8rem;">${videos.length} Curated Lectures</span>
        </div>
        <p style="color:var(--text-muted); margin:4px 0 16px; font-size:0.9rem;">
          Carefully selected AAU & international structural analysis video lectures. Complete videos to earn <strong>+50 XP</strong> each!
        </p>

        ${videos.length === 0 ? `
          <p style="color:var(--text-muted); text-align:center; padding:30px;">No video lectures assigned for this module yet.</p>
        ` : `
          <div class="video-masterclass-grid">
            ${videos.map((v, vIdx) => {
              const vidId = extractYouTubeId(v.url) || '';
              const thumbUrl = vidId ? `https://img.youtube.com/vi/${vidId}/hqdefault.jpg` : '';
              const isWatched = !!(userState.watchedVideos && userState.watchedVideos[vidId]);
              const secureUrl = (v.url && v.url.startsWith('http')) ? v.url.replace(/^http:\/\//i, 'https://') : `https://www.youtube.com/watch?v=${vidId}`;

              return `
                <div class="video-card ${isWatched ? 'watched' : ''}">
                  <div class="video-thumb-container" onclick="openVideoModal('${vidId}', '${escapeHtml(v.title)}', '${secureUrl}')">
                    <img class="video-thumb" src="${thumbUrl}" alt="${escapeHtml(v.title)}" loading="lazy" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'320\' height=\'180\' viewBox=\'0 0 320 180\'><rect width=\'320\' height=\'180\' fill=\'%230f172a\'/><text x=\'50%\' y=\'50%\' fill=\'%2338bdf8\' font-family=\'sans-serif\' font-size=\'14\' text-anchor=\'middle\'>AAU Video Lecture</text></svg>'"/>
                    <div class="video-play-overlay">
                      <div class="play-icon-circle">▶</div>
                    </div>
                  </div>
                  <div class="video-meta">
                    <div class="video-title" onclick="openVideoModal('${vidId}', '${escapeHtml(v.title)}', '${secureUrl}')">${v.title}</div>
                    <div class="video-footer">
                      <span class="video-xp-badge">${isWatched ? '✓ Watched (+50 XP)' : '+50 XP'}</span>
                      <div style="display:flex; gap:6px;">
                        <button class="hud-btn" style="padding:4px 8px; font-size:0.75rem;" onclick="openVideoModal('${vidId}', '${escapeHtml(v.title)}', '${secureUrl}')">
                          ▶ Play
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `}
      </div>
    `;
  }
}

function extractYouTubeId(url) {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? match[1] : null;
}

function openVideoModal(vidId, title, url) {
  currentModalVideo = { vidId, title, url };
  const modal = document.getElementById('videoModal');
  const iframe = document.getElementById('videoIframe');
  const titleEl = document.getElementById('videoModalTitle');
  const extBtn = document.getElementById('videoModalExtBtn');
  const watchBtn = document.getElementById('videoModalWatchBtn');
  const fallbackLink = document.getElementById('videoEmbedFallbackLink');

  if (!modal || !iframe) return;

  const secureUrl = (url && url.startsWith('http')) ? url.replace(/^http:\/\//i, 'https://') : `https://www.youtube.com/watch?v=${vidId}`;

  if (titleEl) titleEl.textContent = title;
  if (extBtn) extBtn.href = secureUrl;
  if (fallbackLink) fallbackLink.href = secureUrl;

  iframe.src = `https://www.youtube.com/embed/${vidId}?autoplay=1&rel=0&playsinline=1`;

  const isWatched = !!(userState.watchedVideos && userState.watchedVideos[vidId]);
  if (watchBtn) {
    watchBtn.textContent = isWatched ? '✓ Watched (+50 XP Claimed)' : '✓ Mark Watched (+50 XP)';
    watchBtn.classList.toggle('btn-primary', !isWatched);
    watchBtn.classList.toggle('hud-btn', isWatched);
  }

  modal.style.display = 'flex';
}

function closeVideoModal() {
  const modal = document.getElementById('videoModal');
  const iframe = document.getElementById('videoIframe');
  if (iframe) iframe.src = '';
  if (modal) modal.style.display = 'none';
  currentModalVideo = { vidId: null, title: '', url: '' };
}

function handleVideoOverlayClick(e) {
  if (e.target.id === 'videoModal') {
    closeVideoModal();
  }
}

function toggleModalVideoWatched() {
  if (!currentModalVideo.vidId) return;
  toggleVideoWatched(currentModalVideo.vidId, currentModalVideo.title);
  const watchBtn = document.getElementById('videoModalWatchBtn');
  const isWatched = !!(userState.watchedVideos && userState.watchedVideos[currentModalVideo.vidId]);
  if (watchBtn) {
    watchBtn.textContent = isWatched ? '✓ Watched (+50 XP Claimed)' : '✓ Mark Watched (+50 XP)';
    watchBtn.classList.toggle('btn-primary', !isWatched);
    watchBtn.classList.toggle('hud-btn', isWatched);
  }
}

function toggleVideoWatched(vidId, title) {
  if (!userState.watchedVideos) userState.watchedVideos = {};
  const isWatched = !!userState.watchedVideos[vidId];
  if (!isWatched) {
    userState.watchedVideos[vidId] = true;
    userState.xp += 50;
    saveState();
    triggerConfetti();
    showXPToast(50, 'Video Masterclass Completed! 🎥');
  } else {
    delete userState.watchedVideos[vidId];
    userState.xp = Math.max(0, userState.xp - 50);
    saveState();
  }
  renderMainView();
}

function toggleCollapsible(id) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle('open');
}

function revealHint(exIdx, totalHints) {
  for (let i = 0; i < totalHints; i++) {
    const el = document.getElementById(`hint_${exIdx}_${i}`);
    if (el && el.style.display === 'none') {
      el.style.display = 'block';
      break;
    }
  }
}

// Arena Answer Evaluation
function checkArenaAnswer(modId, qIdx, optIdx) {
  const mod = COURSE_MODULES.find(m => m.id === modId);
  if (!mod) return;
  const q = mod.arena[qIdx];
  const chosen = q.options[optIdx];
  const key = `${modId}_q${qIdx}`;

  const card = document.getElementById(`qcard_${key}`);
  const feedback = document.getElementById(`feedback_${key}`);
  if (!card || !feedback) return;

  const btns = card.querySelectorAll('.option-btn');
  btns.forEach((b, i) => {
    b.classList.remove('correct', 'wrong');
    if (i === optIdx) {
      b.classList.add(chosen.correct ? 'correct' : 'wrong');
    }
  });

  feedback.style.display = 'block';
  if (chosen.correct) {
    if (!userState.solved[key]) {
      userState.solved[key] = true;
      userState.xp += 150;
      userState.streak += 1;
      saveState();
      showXPToast(150, 'Gauntlet Challenge Mastered! 🔥');
    }
    feedback.className = 'feedback-banner';
    feedback.style.background = 'rgba(16, 185, 129, 0.2)';
    feedback.style.border = '1px solid var(--success)';
    feedback.style.color = '#a7f3d0';
    feedback.innerHTML = `<strong>✅ Master Answer (+150 XP)!</strong><br/>${chosen.explain}`;

    // Remove from Error Notebook if previously missed
    userState.errors = userState.errors.filter(err => err.key !== key);
    saveState();
  } else {
    userState.streak = 0;
    // Log to Error Notebook
    if (!userState.errors.some(err => err.key === key)) {
      userState.errors.push({
        key: key,
        modId: modId,
        qIdx: qIdx,
        title: q.title,
        prompt: q.prompt,
        diagram: q.diagram,
        options: q.options,
        timestamp: new Date().toLocaleDateString()
      });
      saveState();
    }
    feedback.className = 'feedback-banner';
    feedback.style.background = 'rgba(244, 63, 94, 0.2)';
    feedback.style.border = '1px solid var(--danger)';
    feedback.style.color = '#fecdd3';
    feedback.innerHTML = `<strong>❌ Conceptual Trap!</strong><br/>${chosen.explain}<br/><span style="font-size:0.8rem; color:#fca5a5;">(Logged to Error Notebook for surgical review)</span>`;
  }

  setTimeout(function() {
    renderMathInDOM(feedback);
  }, 10);
}

// =========================================================================
// 2. FORMULA ATLAS & ACTIVE RECALL ENGINE
// =========================================================================

// Interactive Plug & Chug Quick Calculators for Governing Formulas
function getFormulaCalcHTML(fId) {
  if (fId === 'f-0-3') {
    return `
      <div id="calc_panel_${fId}" class="formula-calc-panel">
        <h4 style="color:var(--accent); font-size:0.82rem; margin-bottom:8px;">🔢 Interactive Plug & Chug Calculator (ΔL = NL / EA)</h4>
        <div class="formula-calc-grid">
          <div class="formula-calc-input"><label>N (Axial Force, kN)</label><input type="number" id="input_f03_N" value="120" /></div>
          <div class="formula-calc-input"><label>L (Length, m)</label><input type="number" id="input_f03_L" value="4.5" /></div>
          <div class="formula-calc-input"><label>E (Modulus, kN/m²)</label><input type="number" id="input_f03_E" value="200000000" /></div>
          <div class="formula-calc-input"><label>A (Area, m²)</label><input type="number" id="input_f03_A" value="0.003" step="0.0005" /></div>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
          <button class="primary-btn" style="padding:6px 14px; font-size:0.8rem;" onclick="calculateFormulaVal('${fId}')">⚡ Compute Elongation ΔL</button>
          <span id="calc_res_${fId}" style="font-family:var(--font-mono); font-size:0.85rem; color:var(--accent);">Result: ΔL = <strong>0.900 mm</strong></span>
        </div>
      </div>
    `;
  } else if (fId === 'f-0-6') {
    return `
      <div id="calc_panel_${fId}" class="formula-calc-panel">
        <h4 style="color:var(--accent); font-size:0.82rem; margin-bottom:8px;">🔢 Interactive Plug & Chug Calculator (σ = My / I)</h4>
        <div class="formula-calc-grid">
          <div class="formula-calc-input"><label>M (Bending Moment, kN·m)</label><input type="number" id="input_f06_M" value="85" /></div>
          <div class="formula-calc-input"><label>y (Distance to fiber, m)</label><input type="number" id="input_f06_y" value="0.25" step="0.01" /></div>
          <div class="formula-calc-input"><label>I (Moment of Inertia, m⁴)</label><input type="number" id="input_f06_I" value="0.0016" step="0.0001" /></div>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
          <button class="primary-btn" style="padding:6px 14px; font-size:0.8rem;" onclick="calculateFormulaVal('${fId}')">⚡ Compute Bending Stress σ</button>
          <span id="calc_res_${fId}" style="font-family:var(--font-mono); font-size:0.85rem; color:var(--accent);">Result: σ = <strong>13281.25 kN/m²</strong></span>
        </div>
      </div>
    `;
  } else if (fId === 'f-1-2') {
    return `
      <div id="calc_panel_${fId}" class="formula-calc-panel">
        <h4 style="color:var(--accent); font-size:0.82rem; margin-bottom:8px;">🔢 Interactive Plug & Chug Calculator (D = (m + r) - 2j)</h4>
        <div class="formula-calc-grid">
          <div class="formula-calc-input"><label>m (Truss Members)</label><input type="number" id="input_f12_m" value="13" /></div>
          <div class="formula-calc-input"><label>r (Support Reactions)</label><input type="number" id="input_f12_r" value="3" /></div>
          <div class="formula-calc-input"><label>j (Joints)</label><input type="number" id="input_f12_j" value="8" /></div>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
          <button class="primary-btn" style="padding:6px 14px; font-size:0.8rem;" onclick="calculateFormulaVal('${fId}')">⚡ Evaluate Determinacy D</button>
          <span id="calc_res_${fId}" style="font-family:var(--font-mono); font-size:0.85rem; color:var(--accent);">Result: D = <strong>0 (Determinate)</strong></span>
        </div>
      </div>
    `;
  } else if (fId === 'f-5-2') {
    return `
      <div id="calc_panel_${fId}" class="formula-calc-panel">
        <h4 style="color:var(--accent); font-size:0.82rem; margin-bottom:8px;">🔢 Interactive Plug & Chug Calculator (6Ax/L = wL³ / 4)</h4>
        <div class="formula-calc-grid">
          <div class="formula-calc-input"><label>w (Uniform Load, kN/m)</label><input type="number" id="input_f52_w" value="18" /></div>
          <div class="formula-calc-input"><label>L (Span Length, m)</label><input type="number" id="input_f52_L" value="6" /></div>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
          <button class="primary-btn" style="padding:6px 14px; font-size:0.8rem;" onclick="calculateFormulaVal('${fId}')">⚡ Compute Load Term (wL³/4)</button>
          <span id="calc_res_${fId}" style="font-family:var(--font-mono); font-size:0.85rem; color:var(--accent);">Result: 6Ax/L = <strong>972.00 kN·m²</strong></span>
        </div>
      </div>
    `;
  } else if (fId === 'f-6-1') {
    return `
      <div id="calc_panel_${fId}" class="formula-calc-panel">
        <h4 style="color:var(--accent); font-size:0.82rem; margin-bottom:8px;">🔢 Interactive Plug & Chug Calculator (M_AB = M_F - 2EK(2θ_A + θ_B - 3Δ/L))</h4>
        <div class="formula-calc-grid">
          <div class="formula-calc-input"><label>M_F (Fixed-End Moment, kN·m)</label><input type="number" id="input_f61_MF" value="30" /></div>
          <div class="formula-calc-input"><label>EK (Stiffness = EI/L)</label><input type="number" id="input_f61_EK" value="2500" /></div>
          <div class="formula-calc-input"><label>θ_A (Near Rotation, rad)</label><input type="number" id="input_f61_tA" value="0.002" step="0.0005" /></div>
          <div class="formula-calc-input"><label>θ_B (Far Rotation, rad)</label><input type="number" id="input_f61_tB" value="-0.001" step="0.0005" /></div>
          <div class="formula-calc-input"><label>Δ/L (Chord Rotation)</label><input type="number" id="input_f61_dL" value="0" step="0.001" /></div>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
          <button class="primary-btn" style="padding:6px 14px; font-size:0.8rem;" onclick="calculateFormulaVal('${fId}')">⚡ Compute Member End Moment M_AB</button>
          <span id="calc_res_${fId}" style="font-family:var(--font-mono); font-size:0.85rem; color:var(--accent);">Result: M_AB = <strong>15.00 kN·m</strong></span>
        </div>
      </div>
    `;
  }
  return '';
}


function renderFormulaAtlasView(viewport) {
  let filtered = FORMULA_ATLAS;

  if (atlasFilter !== 'all') {
    filtered = filtered.filter(f => f.moduleId === atlasFilter);
  }

  if (atlasSearch.trim()) {
    const q = atlasSearch.toLowerCase();
    filtered = filtered.filter(f =>
      f.name.toLowerCase().includes(q) ||
      f.formula.toLowerCase().includes(q) ||
      f.applicability.toLowerCase().includes(q) ||
      f.derivation.toLowerCase().includes(q)
    );
  }

  viewport.innerHTML = `
    <div class="card">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
        <div>
          <h2>📜 Formula Vault & Active Recall Engine</h2>
          <p style="color:var(--text-muted); margin: 4px 0 0; font-size:0.88rem;">28 verified governing structural formulas across all 8 modules (COTM 3101 AAU notes).</p>
        </div>
        <div style="display:flex; gap:8px; flex-wrap:wrap;">
          <button class="hud-btn" onclick="printStudyGuide()" title="Print Full Study Guide / Export Clean PDF">🖨️ Print Exam Guide</button>
          <button class="hud-btn ${atlasMode === 'browse' ? 'active' : ''}" onclick="setAtlasMode('browse')">🔍 Browse All (${filtered.length})</button>
          <button class="hud-btn ${atlasMode === 'flashcards' ? 'active' : ''}" onclick="setAtlasMode('flashcards')">🃏 Spaced Flashcards</button>
        </div>
      </div>

      ${atlasMode === 'browse' ? `
        <!-- Filter and Search Controls -->
        <div style="display:flex; gap:10px; margin: 18px 0; flex-wrap:wrap;">
          <input type="text" id="atlasSearchInput" placeholder="🔍 Search formulas (e.g. Clapeyron, Slope-Deflection, Vereshchagin, Hooke)..." value="${atlasSearch}" oninput="searchAtlas(this.value)" style="flex:1; min-width:140px; max-width:100%; padding:10px 14px; background:var(--bg-input); border:1px solid var(--border); border-radius:8px; color:#fff; font-size:0.92rem;" />
          <select onchange="filterAtlas(this.value)" style="padding:10px 14px; background:var(--bg-input); border:1px solid var(--border); border-radius:8px; color:#fff; font-size:0.92rem; max-width:100%;">
            <option value="all" ${atlasFilter === 'all' ? 'selected' : ''}>All Chapters (28 Formulas)</option>
            <option value="mod0" ${atlasFilter === 'mod0' ? 'selected' : ''}>Module 0: Core Foundations</option>
            <option value="mod1" ${atlasFilter === 'mod1' ? 'selected' : ''}>Module 1: Stability & Determinacy</option>
            <option value="mod2" ${atlasFilter === 'mod2' ? 'selected' : ''}>Module 2: Conjugate Beam</option>
            <option value="mod3" ${atlasFilter === 'mod3' ? 'selected' : ''}>Module 3: Virtual Work</option>
            <option value="mod4" ${atlasFilter === 'mod4' ? 'selected' : ''}>Module 4: Consistent Deformation</option>
            <option value="mod5" ${atlasFilter === 'mod5' ? 'selected' : ''}>Module 5: Three-Moment Equation</option>
            <option value="mod6" ${atlasFilter === 'mod6' ? 'selected' : ''}>Module 6: Slope-Deflection Method</option>
            <option value="mod7" ${atlasFilter === 'mod7' ? 'selected' : ''}>Module 7: Moment Distribution</option>
          </select>
        </div>

        <div style="display:flex; flex-direction:column; gap:16px;">
          ${filtered.length === 0 ? '<p style="color:var(--text-muted); padding:20px; text-align:center;">No formulas match your search query.</p>' : ''}
          ${filtered.map(f => {
            const modIdxMap = { mod0: 0, mod1: 1, mod2: 2, mod3: 3, mod4: 4, mod5: 5, mod6: 6, mod7: 7 };
            const mIdx = modIdxMap[f.moduleId] !== undefined ? modIdxMap[f.moduleId] : 0;
            return `
            <div class="step-box" style="border-left:4px solid var(--accent);">
              <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
                <h3 style="color:var(--accent); margin:0; font-size:1.05rem;">${f.name}</h3>
                <div style="display:flex; gap:6px; align-items:center; flex-wrap:wrap;">
                  <span class="stat-pill" style="font-size:0.75rem;">${f.moduleTitle}</span>
                  <button class="hud-btn" style="padding:2px 7px; font-size:0.72rem;" onclick="selectModule(${mIdx}); switchModuleTab('theory');" title="Open Chapter Notes">📖 Notes</button>
                  <button class="hud-btn" style="padding:2px 7px; font-size:0.72rem; color:var(--accent); border-color:var(--accent);" onclick="openModuleVideos(${mIdx})" title="Watch Video Masterclass">🎥 Video</button>
                </div>
              </div>
              <div class="formula-banner math-display-card">
                <div class="math-card-header">
                  <span class="math-badge">FORMULA ATLAS</span>
                  <div style="display:flex; gap:6px; align-items:center;">
                    ${['f-0-3', 'f-0-6', 'f-1-2', 'f-5-2', 'f-6-1'].includes(f.id) ? `
                      <button class="hud-btn" style="padding:2px 8px; font-size:0.75rem;" onclick="toggleFormulaCalculator('${f.id}')">🔢 Quick Calc</button>
                    ` : ''}
                    <button class="copy-latex-btn" onclick="copyFormulaLatex('${encodeURIComponent(f.formula)}', this)">📋 Copy LaTeX</button>
                  </div>
                </div>
                <div class="math-card-body">${formatFormula(f.formula)}</div>
              </div>

              ${getFormulaCalcHTML(f.id)}
              
              <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:12px; margin-top:8px;">
                <div>
                  <h4 style="color:var(--gold); font-size:0.82rem; margin-bottom:4px; text-transform:uppercase;">SYMBOLS & SI UNITS:</h4>
                  <ul style="padding-left:16px; font-size:0.84rem; color:var(--text-muted);">
                    ${f.symbols.map(s => `<li><code>${s.symbol}</code>: ${s.meaning} (<em>${s.unit}</em>)</li>`).join('')}
                  </ul>
                </div>
                <div>
                  <h4 style="color:var(--gold); font-size:0.82rem; margin-bottom:4px; text-transform:uppercase;">APPLICABILITY & ASSUMPTIONS:</h4>
                  <p style="font-size:0.84rem; color:var(--text-main);">${f.applicability} ${f.assumptions}</p>
                </div>
              </div>

              <div style="margin-top:10px; padding:10px 14px; background:var(--bg-input); border-radius:8px; font-size:0.86rem;">
                <p><strong>🎯 Memory Cue:</strong> ${f.memoryCue}</p>
                <p style="color:#fca5a5; margin-top:4px;"><strong>⚠️ Common Exam Trap:</strong> ${f.traps}</p>
                <p style="color:var(--text-muted); margin-top:4px;"><strong>Derivation Core:</strong> ${f.derivation}</p>
              </div>
            </div>
            `;
          }).join('')}
        </div>
      ` : `
        <!-- Active Recall Flashcard Deck -->
        ${renderFlashcardDeck()}
      `}
    </div>
  `;
}

function setAtlasMode(mode) {
  atlasMode = mode;
  isFlashcardFlipped = false;
  renderMainView();
}

function searchAtlas(query) {
  atlasSearch = query;
  renderMainView();
}

function filterAtlas(mod) {
  atlasFilter = mod;
  renderMainView();
}

function renderFlashcardDeck() {
  const cards = FORMULA_ATLAS;
  if (currentFlashcardIdx >= cards.length) currentFlashcardIdx = 0;
  const card = cards[currentFlashcardIdx];
  const userRating = userState.flashcardRatings[card.id] || 'unrated';

  return `
    <div style="text-align:center; max-width:640px; margin:0 auto;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <span class="stat-pill">Card ${currentFlashcardIdx + 1} of ${cards.length}</span>
        <span class="stat-pill" style="color:var(--gold)">Status: ${userRating.toUpperCase()}</span>
      </div>

      <!-- Flip Card Box -->
      <div class="flashcard-box" onclick="toggleFlashcardFlip()">
        ${!isFlashcardFlipped ? `
          <div style="color:var(--text-muted); font-size:0.85rem; margin-bottom:8px;">${card.moduleTitle}</div>
          <h3 style="font-size:1.35rem; color:var(--text-main); margin-bottom:14px;">${card.name}</h3>
          <p style="color:var(--text-muted); font-size:0.92rem;">${card.applicability}</p>
          <div style="margin-top:24px; color:var(--accent); font-size:0.88rem; font-weight:600;">🔄 Tap card to reveal formula & derivation</div>
        ` : `
          <div class="formula-banner math-display-card" style="width:100%; margin-bottom:14px;">
            <div class="math-card-body">${formatFormula(card.formula)}</div>
          </div>
          <p style="color:var(--gold); font-size:0.92rem; margin-bottom:6px;"><strong>🎯 Memory Cue:</strong> ${card.memoryCue}</p>
          <p style="color:#fca5a5; font-size:0.88rem; margin-bottom:6px;"><strong>⚠️ Exam Trap:</strong> ${card.traps}</p>
          <p style="color:var(--text-muted); font-size:0.84rem;">${card.derivation}</p>
          <div style="margin-top:14px; color:var(--text-dim); font-size:0.78rem;">Tap card to flip back</div>
        `}
      </div>

      <!-- Spaced Repetition Rating Buttons -->
      <div style="display:flex; justify-content:center; gap:8px; margin-top:18px; flex-wrap:wrap;">
        <button class="hud-btn" style="border-color:var(--danger); color:var(--danger);" onclick="rateFlashcard('${card.id}', 'again')">🔴 Again (+0 XP)</button>
        <button class="hud-btn" style="border-color:var(--gold); color:var(--gold);" onclick="rateFlashcard('${card.id}', 'hard')">🟡 Hard (+50 XP)</button>
        <button class="hud-btn" style="border-color:var(--accent); color:var(--accent);" onclick="rateFlashcard('${card.id}', 'good')">🟢 Good (+100 XP)</button>
        <button class="hud-btn" style="border-color:var(--success); color:var(--success);" onclick="rateFlashcard('${card.id}', 'easy')">🔵 Easy (+150 XP)</button>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-top:18px;">
        <button class="hud-btn" onclick="prevFlashcard()">⬅ Previous Card</button>
        <button class="btn-primary" style="margin-top:0;" onclick="nextFlashcard()">Next Card ➔</button>
      </div>
    </div>
  `;
}

function toggleFlashcardFlip() {
  isFlashcardFlipped = !isFlashcardFlipped;
  renderMainView();
}

function nextFlashcard() {
  isFlashcardFlipped = false;
  currentFlashcardIdx = (currentFlashcardIdx + 1) % FORMULA_ATLAS.length;
  renderMainView();
}

function prevFlashcard() {
  isFlashcardFlipped = false;
  currentFlashcardIdx = (currentFlashcardIdx - 1 + FORMULA_ATLAS.length) % FORMULA_ATLAS.length;
  renderMainView();
}

function rateFlashcard(cardId, rating) {
  userState.flashcardRatings[cardId] = rating;
  if (rating === 'easy') userState.xp += 150;
  else if (rating === 'good') userState.xp += 100;
  else if (rating === 'hard') userState.xp += 50;
  saveState();
  nextFlashcard();
}

// =========================================================================
// 3. STRUCTURAL ENGINEERING SANDBOXES & LIVE BEAM SIMULATOR
// =========================================================================

// Beam Simulator State
let beamSimParams = {
  L: 6.0,
  hasPoint: true,
  P: 40.0,
  a: 2.5,
  hasUDL: true,
  w: 12.0,
  showDeflection: true,
  showSFD: true,
  showBMD: true
};

function updateBeamSim() {
  const lEl = document.getElementById('beam_L');
  const pEl = document.getElementById('beam_P');
  const aEl = document.getElementById('beam_a');
  const wEl = document.getElementById('beam_w');
  const chkDef = document.getElementById('chk_def');
  const chkSFD = document.getElementById('chk_sfd');
  const chkBMD = document.getElementById('chk_bmd');

  if (lEl) beamSimParams.L = parseFloat(lEl.value) || 6.0;
  if (pEl) beamSimParams.P = parseFloat(pEl.value) || 0;
  if (aEl) {
    // Clamp a to L
    aEl.max = beamSimParams.L;
    beamSimParams.a = Math.min(beamSimParams.L, parseFloat(aEl.value) || 0);
  }
  if (wEl) beamSimParams.w = parseFloat(wEl.value) || 0;
  if (chkDef) beamSimParams.showDeflection = chkDef.checked;
  if (chkSFD) beamSimParams.showSFD = chkSFD.checked;
  if (chkBMD) beamSimParams.showBMD = chkBMD.checked;

  // Update slider value badges
  const lVal = document.getElementById('val_L');
  const pVal = document.getElementById('val_P');
  const aVal = document.getElementById('val_a');
  const wVal = document.getElementById('val_w');
  if (lVal) lVal.innerText = beamSimParams.L.toFixed(1) + ' m';
  if (pVal) pVal.innerText = beamSimParams.P.toFixed(1) + ' kN';
  if (aVal) aVal.innerText = beamSimParams.a.toFixed(1) + ' m';
  if (wVal) wVal.innerText = beamSimParams.w.toFixed(1) + ' kN/m';

  const res = StructureSolvers.simulateBeam(beamSimParams);

  // Update SVG container
  const svgBox = document.getElementById('beamSvgBox');
  if (svgBox) svgBox.innerHTML = res.svg;

  // Update metrics
  const raEl = document.getElementById('metric_RA');
  const rbEl = document.getElementById('metric_RB');
  const mEl = document.getElementById('metric_Mmax');
  const defEl = document.getElementById('metric_Def');
  if (raEl) raEl.innerText = res.R_A.toFixed(1) + ' kN';
  if (rbEl) rbEl.innerText = res.R_B.toFixed(1) + ' kN';
  if (mEl) mEl.innerText = res.M_max.toFixed(1) + ' kN·m (x=' + res.x_max.toFixed(2) + 'm)';
  if (defEl) defEl.innerText = (res.delta_max).toFixed(1) + ' / EI';
}

function renderSolversView(viewport) {
  viewport.innerHTML = `
    <div class="card">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
        <h2>🧮 Interactive Structural Engineering Sandboxes</h2>
        <span class="stat-pill" style="color:var(--accent);">Real-Time Calculations</span>
      </div>
      <p style="color:var(--text-muted); margin: 6px 0 16px; font-size:0.9rem;">Test structural models, verify reactions, watch deflections morph, and run iterative distributions in real time.</p>

      <!-- Sandbox Switcher Pills -->
      <div style="display:flex; gap:6px; overflow-x:auto; margin-bottom:18px; padding-bottom:6px;">
        <button class="mode-tab ${currentSolver === 'beam' ? 'active' : ''}" onclick="openSandbox('beam')">⚡ Live Beam Playground</button>
        <button class="mode-tab ${currentSolver === 'determinacy' ? 'active' : ''}" onclick="openSandbox('determinacy')">🔍 Stability & Determinacy</button>
        <button class="mode-tab ${currentSolver === 'threemoment' ? 'active' : ''}" onclick="openSandbox('threemoment')">📐 2-Span Clapeyron</button>
        <button class="mode-tab ${currentSolver === 'hardycross' ? 'active' : ''}" onclick="openSandbox('hardycross')">🔄 Hardy Cross Live Engine</button>
        <button class="mode-tab ${currentSolver === 'conjugate' ? 'active' : ''}" onclick="openSandbox('conjugate')">🌉 Conjugate Beam Transform</button>
      </div>

      <div id="sandboxActiveContainer"></div>
    </div>
  `;

  const container = document.getElementById('sandboxActiveContainer');
  if (!container) return;

  if (currentSolver === 'beam') {
    container.innerHTML = `
      <div class="sim-control-panel">
        <h3 style="color:#fff; margin-top:0; font-size:1rem; margin-bottom:12px;">⚡ Live Simply Supported Beam Playground</h3>
        
        <div class="sim-slider-row">
          <div class="sim-slider-group">
            <label>Span Length (L): <span id="val_L">${beamSimParams.L.toFixed(1)} m</span></label>
            <input type="range" id="beam_L" min="2" max="12" step="0.5" value="${beamSimParams.L}" oninput="updateBeamSim()" />
          </div>
          <div class="sim-slider-group">
            <label>Point Load Magnitude (P): <span id="val_P">${beamSimParams.P.toFixed(1)} kN</span></label>
            <input type="range" id="beam_P" min="0" max="100" step="5" value="${beamSimParams.P}" oninput="updateBeamSim()" />
          </div>
          <div class="sim-slider-group">
            <label>Point Load Position (a): <span id="val_a">${beamSimParams.a.toFixed(1)} m</span></label>
            <input type="range" id="beam_a" min="0" max="${beamSimParams.L}" step="0.2" value="${beamSimParams.a}" oninput="updateBeamSim()" />
          </div>
          <div class="sim-slider-group">
            <label>Uniform Distributed Load (w): <span id="val_w">${beamSimParams.w.toFixed(1)} kN/m</span></label>
            <input type="range" id="beam_w" min="0" max="40" step="2" value="${beamSimParams.w}" oninput="updateBeamSim()" />
          </div>
        </div>

        <div class="sim-toggle-row">
          <label class="sim-toggle-label">
            <input type="checkbox" id="chk_def" ${beamSimParams.showDeflection ? 'checked' : ''} onchange="updateBeamSim()" />
            <span>Show Elastic Deflection Curve (δ)</span>
          </label>
          <label class="sim-toggle-label">
            <input type="checkbox" id="chk_sfd" ${beamSimParams.showSFD ? 'checked' : ''} onchange="updateBeamSim()" />
            <span>Show Shear Force Diagram (SFD)</span>
          </label>
          <label class="sim-toggle-label">
            <input type="checkbox" id="chk_bmd" ${beamSimParams.showBMD ? 'checked' : ''} onchange="updateBeamSim()" />
            <span>Show Bending Moment Diagram (BMD)</span>
          </label>
        </div>
      </div>

      <!-- Live Diagram Canvas -->
      <div id="beamSvgBox" style="margin:14px 0;"></div>

      <!-- Live Metrics Pills -->
      <div class="sim-metrics-pills">
        <div class="metric-pill-box">
          <small>Reaction R_A</small>
          <strong id="metric_RA">--</strong>
        </div>
        <div class="metric-pill-box">
          <small>Reaction R_B</small>
          <strong id="metric_RB">--</strong>
        </div>
        <div class="metric-pill-box">
          <small>Max Moment M_max</small>
          <strong id="metric_Mmax">--</strong>
        </div>
        <div class="metric-pill-box">
          <small>Peak Deflection (·EI)</small>
          <strong id="metric_Def">--</strong>
        </div>
      </div>
      ${getSolverContextLinks('beam')}
    `;
    updateBeamSim();
  } else if (currentSolver === 'determinacy') {
    container.innerHTML = `
      <div class="calc-grid">
        <div class="input-group">
          <label>Structural Topology</label>
          <select id="detType" onchange="renderDetInputs()">
            <option value="beam">2D Beam Framework</option>
            <option value="truss">2D Plane Truss</option>
            <option value="frame">2D Rigid Jointed Frame</option>
          </select>
        </div>
      </div>
      <div id="detSpecificInputs" class="calc-grid"></div>
      <button class="btn-primary" onclick="runDeterminacySolve()">Compute Stability & Determinacy Status</button>
      <div id="detResultBox" style="margin-top:20px; display:none;"></div>
      ${getSolverContextLinks('determinacy')}
    `;
    renderDetInputs();
  } else if (currentSolver === 'threemoment') {
    container.innerHTML = `
      <div class="calc-grid">
        <div class="input-group"><label>Span 1 Length L₁ (m)</label><input type="number" id="tm_L1" value="4.0" step="0.5" /></div>
        <div class="input-group"><label>Span 2 Length L₂ (m)</label><input type="number" id="tm_L2" value="6.0" step="0.5" /></div>
        <div class="input-group"><label>Span 1 Loading</label><select id="tm_loadType1"><option value="udl">Uniform Load (w₁)</option><option value="point">Point Load (P₁)</option></select></div>
        <div class="input-group"><label>Span 2 Loading</label><select id="tm_loadType2"><option value="udl">Uniform Load (w₂)</option><option value="point">Point Load (P₂)</option></select></div>
        <div class="input-group"><label>Load Mag 1 (kN or kN/m)</label><input type="number" id="tm_mag1" value="15.0" /></div>
        <div class="input-group"><label>Load Mag 2 (kN or kN/m)</label><input type="number" id="tm_mag2" value="20.0" /></div>
        <div class="input-group"><label>P₁ Distance a₁ (m)</label><input type="number" id="tm_a1" value="2.0" /></div>
        <div class="input-group"><label>P₂ Distance a₂ (m)</label><input type="number" id="tm_a2" value="3.0" /></div>
      </div>
      <button class="btn-primary" onclick="runThreeMomentSolve()">Solve Two-Span Continuous Beam</button>
      <div id="tmResultBox" style="margin-top:20px; display:none;"></div>
      ${getSolverContextLinks('threemoment')}
    `;
    runThreeMomentSolve();
  } else if (currentSolver === 'hardycross') {
    container.innerHTML = `
      <div class="calc-grid">
        <div class="input-group"><label>Span AB Length (m)</label><input type="number" id="hc_L1" value="3.6" step="0.1" /></div>
        <div class="input-group"><label>Span BC Length (m)</label><input type="number" id="hc_L2" value="4.0" step="0.1" /></div>
        <div class="input-group"><label>Support A</label><select id="hc_endA"><option value="fixed">Fixed Support (DF=0)</option><option value="hinged">Hinged Support (DF=1.0)</option></select></div>
        <div class="input-group"><label>Support C</label><select id="hc_endC"><option value="hinged">Hinged Support (Modified ¾ K)</option><option value="fixed">Fixed Support (DF=0)</option></select></div>
        <div class="input-group"><label>Initial FEM AB (kN·m)</label><input type="number" id="hc_femAB" value="-30.0" /></div>
        <div class="input-group"><label>Initial FEM BA (kN·m)</label><input type="number" id="hc_femBA" value="+30.0" /></div>
        <div class="input-group"><label>Initial FEM BC (kN·m)</label><input type="number" id="hc_femBC" value="-22.5" /></div>
        <div class="input-group"><label>Initial FEM CB (kN·m)</label><input type="number" id="hc_femCB" value="+22.5" /></div>
      </div>
      <button class="btn-primary" onclick="runHardyCrossSolve()">Generate Iterative Distribution Table</button>
      <div id="hcResultBox" style="margin-top:20px; display:none;"></div>
      ${getSolverContextLinks('hardycross')}
    `;
    runHardyCrossSolve();
  } else if (currentSolver === 'conjugate') {
    container.innerHTML = `
      <div class="calc-grid">
        <div class="input-group" style="grid-column:1/-1;">
          <label>Select Real Beam Boundary Configuration</label>
          <select id="conjSelect" onchange="runConjugateTransform()" style="font-size:1rem; padding:12px;">
            <option value="cantilever">Cantilever Beam (Fixed at A, Free Tip at B)</option>
            <option value="propped">Propped Cantilever (Fixed at A, Roller at B)</option>
            <option value="overhang">Overhanging Beam (Pin A, Roller B, Free Tip C)</option>
          </select>
        </div>
      </div>
      <div id="conjResultBox" style="margin-top:16px;"></div>
      ${getSolverContextLinks('conjugate')}
    `;
    runConjugateTransform();
  }
}

function getSolverContextLinks(solverKey) {
  const solverMapping = {
    beam: { modIdx: 0, title: 'Module 0: Core Foundations & Statics', topic: 'Beam Reactions & Deflection Mechanics' },
    determinacy: { modIdx: 1, title: 'Module 1: Stability & Determinacy', topic: 'Geometric Traps, Trusses & Rigid Frames' },
    conjugate: { modIdx: 2, title: 'Module 2: Conjugate Beam Method', topic: 'Conjugate Duality & Slope/Deflection Transformations' },
    threemoment: { modIdx: 5, title: 'Module 5: Three-Moment Equation', topic: 'Clapeyron Multi-Span Continuous Beams' },
    hardycross: { modIdx: 7, title: 'Module 7: Moment Distribution', topic: 'Hardy Cross Iteration, Stiffness & Carry-Over' }
  };
  const item = solverMapping[solverKey];
  if (!item) return '';

  return `
    <div class="solver-context-links">
      <div style="font-size:0.86rem;">
        <span style="color:var(--text-muted);">Curriculum Anchor:</span>
        <strong style="color:#fff; margin-left:4px;">${item.title}</strong>
        <span style="color:var(--text-dim); display:block; font-size:0.78rem; margin-top:2px;">Topic: ${item.topic}</span>
      </div>
      <div style="display:flex; gap:8px; flex-wrap:wrap;">
        <button class="hud-btn" style="padding:6px 12px; font-size:0.8rem;" onclick="selectModule(${item.modIdx}); switchModuleTab('theory');">
          📖 Read Chapter Theory
        </button>
        <button class="btn-primary" style="padding:6px 12px; font-size:0.8rem;" onclick="openModuleVideos(${item.modIdx})">
          🎥 Watch Video Masterclass
        </button>
      </div>
    </div>
  `;
}

function renderDetInputs() {
  const type = document.getElementById('detType').value;
  const container = document.getElementById('detSpecificInputs');
  if (!container) return;

  if (type === 'beam') {
    container.innerHTML = `
      <div class="input-group"><label>Total Reactions (r)</label><input type="number" id="det_r" value="4" min="0" /></div>
      <div class="input-group"><label>Internal Hinges (s)</label><input type="number" id="det_s" value="1" min="0" /></div>
      <div class="input-group"><label>Parallel Reactions Trap?</label><select id="det_parallel"><option value="false">No (Normal non-parallel)</option><option value="true">YES (All rollers parallel)</option></select></div>
    `;
  } else if (type === 'truss') {
    container.innerHTML = `
      <div class="input-group"><label>Number of Pin Joints (j)</label><input type="number" id="det_j" value="6" min="3" /></div>
      <div class="input-group"><label>Number of Member Bars (m)</label><input type="number" id="det_m" value="9" min="1" /></div>
      <div class="input-group"><label>Support Reactions (r)</label><input type="number" id="det_r" value="3" min="0" /></div>
      <div class="input-group"><label>Unbraced Panel Trap?</label><select id="det_unbraced"><option value="false">No (Fully triangulated)</option><option value="true">YES (Non-triangulated box)</option></select></div>
    `;
  } else if (type === 'frame') {
    container.innerHTML = `
      <div class="input-group"><label>Number of Joints (j)</label><input type="number" id="det_j" value="6" min="2" /></div>
      <div class="input-group"><label>Number of Members (m)</label><input type="number" id="det_m" value="6" min="1" /></div>
      <div class="input-group"><label>Support Reactions (r)</label><input type="number" id="det_r" value="6" min="0" /></div>
      <div class="input-group"><label>Internal Hinge Equations (s)</label><input type="number" id="det_s" value="0" min="0" /></div>
      <div class="input-group"><label>Closed Cells (n)</label><input type="number" id="det_loops" value="1" min="0" /></div>
    `;
  }
}

function runDeterminacySolve() {
  const type = document.getElementById('detType').value;
  let inputs = {};
  if (type === 'beam') {
    inputs = {
      reactions: document.getElementById('det_r').value,
      internalHinges: document.getElementById('det_s').value,
      parallelReactions: document.getElementById('det_parallel').value === 'true'
    };
  } else if (type === 'truss') {
    inputs = {
      joints: document.getElementById('det_j').value,
      members: document.getElementById('det_m').value,
      reactions: document.getElementById('det_r').value,
      unbracedPanel: document.getElementById('det_unbraced').value === 'true'
    };
  } else if (type === 'frame') {
    inputs = {
      joints: document.getElementById('det_j').value,
      members: document.getElementById('det_m').value,
      reactions: document.getElementById('det_r').value,
      specialConditions: document.getElementById('det_s').value,
      closedLoops: document.getElementById('det_loops').value
    };
  }

  const res = StructureSolvers.analyzeDeterminacy(type, inputs);
  const box = document.getElementById('detResultBox');
  box.style.display = 'block';

  box.innerHTML = `
    <div class="step-box" style="border-color:${res.isStable ? 'var(--accent)' : 'var(--danger)'}">
      <h3 style="color:${res.isStable ? 'var(--accent)' : 'var(--danger)'}; margin-top:0;">Verdict: ${res.status}</h3>
      <div class="formula-banner">${formatFormula(res.formula)}</div>
      ${res.svg ? `<div style="margin:14px 0;">${res.svg}</div>` : ''}
      <ul style="padding-left:20px; margin-top:10px;">
        ${res.notes.map(n => `<li style="margin-bottom:6px;">${n}</li>`).join('')}
      </ul>
    </div>
  `;
}

function runThreeMomentSolve() {
  const params = {
    L1: document.getElementById('tm_L1').value,
    L2: document.getElementById('tm_L2').value,
    span1LoadType: document.getElementById('tm_loadType1').value,
    span2LoadType: document.getElementById('tm_loadType2').value,
    w1: document.getElementById('tm_mag1').value,
    P1: document.getElementById('tm_mag1').value,
    a1: document.getElementById('tm_a1').value,
    w2: document.getElementById('tm_mag2').value,
    P2: document.getElementById('tm_mag2').value,
    a2: document.getElementById('tm_a2').value
  };

  const res = StructureSolvers.solveThreeMoment(params);
  const box = document.getElementById('tmResultBox');
  box.style.display = 'block';

  box.innerHTML = `
    <div class="step-box">
      <h3 style="color:var(--gold); margin-top:0;">Clapeyron Solution Results & Bending Diagrams:</h3>
      ${res.beamSvg}
      <p style="margin-top:14px;"><strong>Load Terms:</strong> Span 1 (6A₁x₁/L₁) = <code>${res.term1} kN·m²</code> | Span 2 (6A₂x₂/L₂) = <code>${res.term2} kN·m²</code></p>
      <div class="formula-banner">Three-Moment Equation: ${res.coeff_MB} · M_B = ${res.RHS} ➔ M_B = ${res.M_B} kN·m</div>
      
      <div class="calc-grid" style="margin-top:16px;">
        <div class="stat-pill" style="text-align:center;">Support Moment M_B: <strong>${res.M_B} kN·m</strong></div>
        <div class="stat-pill" style="text-align:center;">Reaction R_A: <strong>${res.R_A} kN</strong></div>
        <div class="stat-pill" style="text-align:center;">Reaction R_B: <strong>${res.R_B} kN</strong></div>
        <div class="stat-pill" style="text-align:center;">Reaction R_C: <strong>${res.R_C} kN</strong></div>
      </div>

      <div style="margin-top:16px;">
        ${res.bmdSvg}
      </div>
    </div>
  `;
}

function runHardyCrossSolve() {
  const params = {
    L1: document.getElementById('hc_L1').value,
    L2: document.getElementById('hc_L2').value,
    endA: document.getElementById('hc_endA').value,
    endC: document.getElementById('hc_endC').value,
    FEM_AB: document.getElementById('hc_femAB').value,
    FEM_BA: document.getElementById('hc_femBA').value,
    FEM_BC: document.getElementById('hc_femBC').value,
    FEM_CB: document.getElementById('hc_femCB').value,
    useModifiedStiffness: true
  };

  const res = StructureSolvers.solveHardyCross2Span(params);
  const box = document.getElementById('hcResultBox');
  box.style.display = 'block';

  box.innerHTML = `
    <div class="step-box">
      <h3 style="color:var(--gold); margin-top:0;">Hardy Cross Distribution Summary:</h3>
      <p>Stiffness K_BA = <code>${res.K_BA}</code>, Modified K_BC = <code>${res.K_BC}</code> | DF_BA = <code>${res.DF_BA}</code>, DF_BC = <code>${res.DF_BC}</code></p>
      <div class="eng-table-wrapper">
        <table class="eng-table">
          <thead>
            <tr>
              <th>Operation / Step</th>
              <th>Joint A (M_AB)</th>
              <th>Joint B (M_BA)</th>
              <th>Joint B (M_BC)</th>
              <th>Joint C (M_CB)</th>
            </tr>
          </thead>
          <tbody>
            ${res.rows.map(r => `
              <tr class="${r.isFinal ? 'sum-row' : ''}">
                <td style="text-align:left; font-weight:${r.isFinal ? 'bold' : 'normal'}">${r.step}</td>
                <td>${r.AB}</td>
                <td>${r.BA}</td>
                <td>${r.BC}</td>
                <td>${r.CB}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      <p style="color:var(--accent); font-weight:bold; margin-top:8px;">✅ Joint B is balanced: ΣM_B = (${res.rows[res.rows.length-1].BA}) + (${res.rows[res.rows.length-1].BC}) = 0.00 kN·m!</p>
    </div>
  `;
}

function runConjugateTransform() {
  const key = document.getElementById('conjSelect').value;
  const res = StructureSolvers.getConjugateTransform(key);
  const box = document.getElementById('conjResultBox');

  box.innerHTML = `
    <div class="step-box">
      <h3 style="color:var(--gold); margin-top:0;">${res.title}</h3>
      <div style="margin:14px 0;">
        ${StructureVisuals.renderConjugateComparison(key, res.realSvg, 'Conjugate Beam', res.conjSvg)}
      </div>
      <div class="concept-callout" style="border-left-color:var(--accent);">
        <strong>💡 Mathematical Mapping Rationale:</strong><br/>
        ${res.explanation}
      </div>
    </div>
  `;
}

// =========================================================================
// 4. DIAGNOSTIC EXAM SIMULATOR
// =========================================================================
function renderExamSimulatorView(viewport) {
  if (examFinished) {
    let score = 0;
    const details = EXAM_SIMULATOR_QUESTIONS.map((q, idx) => {
      const chosen = examAnswers[idx];
      const isCorrect = chosen !== undefined && q.options[chosen].correct;
      if (isCorrect) score++;
      return { q, chosen, isCorrect };
    });

    const pct = Math.round((score / EXAM_SIMULATOR_QUESTIONS.length) * 100);

    viewport.innerHTML = `
      <div class="card">
        <h2>⏱️ Diagnostic Exam Results & Diagnostic Breakdown</h2>
        <div style="display:flex; gap:16px; align-items:center; margin:20px 0; flex-wrap:wrap;">
          <div class="stat-pill" style="font-size:1.2rem; padding:12px 20px; border-color:${pct >= 70 ? 'var(--success)' : 'var(--danger)'}">
            Score: ${score} / ${EXAM_SIMULATOR_QUESTIONS.length} (${pct}%)
          </div>
          <div class="stat-pill" style="font-size:1.1rem; color:var(--gold);">
            ${pct >= 85 ? '🌟 Master Structural Analyst' : pct >= 70 ? '✅ Ready for University Exam' : '⚠️ Requires Targeted Concept Revision'}
          </div>
        </div>

        <h3>Question by Question Diagnostic Breakdown:</h3>
        <div style="display:flex; flex-direction:column; gap:16px; margin-top:16px;">
          ${details.map((d, i) => `
            <div class="step-box" style="border-left:4px solid ${d.isCorrect ? 'var(--success)' : 'var(--danger)'}">
              <div class="step-header">
                <span>Q${i + 1}: ${d.q.title}</span>
                <span>${d.isCorrect ? '✅ Correct (+150 XP)' : '❌ Incorrect'}</span>
              </div>
              <p><strong>${d.q.prompt}</strong></p>
              <p style="color:var(--text-muted); font-size:0.9rem; margin-top:6px;">
                Your Answer: <em>${d.chosen !== undefined ? d.q.options[d.chosen].text : 'Unanswered'}</em>
              </p>
              <div class="concept-callout" style="border-left-color:${d.isCorrect ? 'var(--success)' : 'var(--danger)'}; font-size:0.9rem;">
                ${d.q.options.find(o => o.correct).explain}
              </div>
            </div>
          `).join('')}
        </div>

        <div style="margin-top:24px;">
          <button class="btn-primary" onclick="restartExam()">Retake Diagnostic Simulator ↺</button>
        </div>
      </div>
    `;
    return;
  }

  // Active Exam
  const min = Math.floor(examTimeSeconds / 60);
  const sec = examTimeSeconds % 60;
  const timeStr = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;

  viewport.innerHTML = `
    <div class="card">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:16px;">
        <h2>⏱️ AAU Final Examination Simulator</h2>
        <div class="stat-pill" style="font-size:1.1rem; border-color:${examTimeSeconds < 120 ? 'var(--danger)' : 'var(--gold)'}; color:${examTimeSeconds < 120 ? 'var(--danger)' : 'var(--gold)'}">
          ⏳ Time Remaining: ${timeStr}
        </div>
      </div>
      <p style="color:var(--text-muted); margin-bottom:20px;">Strict 10-minute timer. Tests your speed across all 7 lecture notes and foundations. Submit before time runs out!</p>

      <div style="display:flex; flex-direction:column; gap:20px;">
        ${EXAM_SIMULATOR_QUESTIONS.map((q, idx) => `
          <div class="step-box">
            <div class="step-header">
              <span>Question ${idx + 1} of ${EXAM_SIMULATOR_QUESTIONS.length} — ${q.title}</span>
            </div>
            ${q.diagram ? `<div class="blueprint-diagram">${q.diagram}</div>` : ''}
            <p style="font-weight:600; font-size:1rem; margin:10px 0;">${q.prompt}</p>
            <div class="options-list">
              ${q.options.map((opt, optIdx) => `
                <button class="option-btn ${examAnswers[idx] === optIdx ? 'correct' : ''}" onclick="selectExamAnswer(${idx}, ${optIdx})">
                  ${opt.text}
                </button>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>

      <div style="margin-top:28px; text-align:center;">
        <button class="btn-primary" style="font-size:1.1rem; padding:14px 32px;" onclick="finishExam()">Submit Final Exam Paper ➔</button>
      </div>
    </div>
  `;
}

function startExamTimer() {
  if (examTimer) clearInterval(examTimer);
  examTimer = setInterval(() => {
    if (examTimeSeconds > 0) {
      examTimeSeconds--;
      if (currentAppView === 'exam' && !examFinished) {
        const pill = document.querySelector('.card .stat-pill');
        if (pill) {
          const min = Math.floor(examTimeSeconds / 60);
          const sec = examTimeSeconds % 60;
          pill.innerText = `⏳ Time Remaining: ${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
        }
      }
    } else {
      finishExam();
    }
  }, 1000);
}

function selectExamAnswer(qIdx, optIdx) {
  examAnswers[qIdx] = optIdx;
  renderMainView();
}

function finishExam() {
  if (examTimer) clearInterval(examTimer);
  examFinished = true;

  let score = 0;
  EXAM_SIMULATOR_QUESTIONS.forEach((q, idx) => {
    const chosen = examAnswers[idx];
    if (chosen !== undefined && q.options[chosen].correct) {
      score++;
    } else {
      // Log missed exam question into Error Notebook
      const key = `exam_q${idx}`;
      if (!userState.errors.some(e => e.key === key)) {
        userState.errors.push({
          key: key,
          title: `Exam: ${q.title}`,
          prompt: q.prompt,
          diagram: q.diagram,
          options: q.options,
          timestamp: new Date().toLocaleDateString()
        });
      }
    }
  });

  userState.xp += score * 150;
  saveState();
  renderMainView();
}

function restartExam() {
  examFinished = false;
  examTimeSeconds = 600;
  examAnswers = {};
  startExamTimer();
  renderMainView();
}

// =========================================================================
// 5. PERSONAL ERROR NOTEBOOK WITH DIRECT DRILL & RETEST
// =========================================================================
function renderErrorNotebookView(viewport) {
  const srQueue = [];
  if (userState.spacedRepetition && typeof QUESTION_BANK !== 'undefined') {
    Object.keys(userState.spacedRepetition).forEach(qId => {
      const q = getQuestionById(qId);
      if (q) {
        srQueue.push({ q, data: userState.spacedRepetition[qId] });
      }
    });
  }

  // Mistake counts from userState.mistakeLog
  const mistakeCounts = {};
  if (Array.isArray(userState.mistakeLog)) {
    userState.mistakeLog.forEach(entry => {
      mistakeCounts[entry.mistakeCode] = (mistakeCounts[entry.mistakeCode] || 0) + 1;
    });
  }

  viewport.innerHTML = `
    <div class="card">
      <!-- 16-POINT MISTAKE TAXONOMY BREAKDOWN -->
      <div style="background:rgba(15, 23, 42, 0.7); border:1px solid var(--border); border-radius:10px; padding:16px; margin-bottom:20px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:12px;">
          <h3 style="font-size:1.05rem; color:#fff; font-weight:700; margin:0; display:flex; align-items:center; gap:8px;">
            <span>🔬 16-Point Structural Misconception Taxonomy</span>
          </h3>
          <span style="font-size:0.75rem; color:var(--text-muted);">${(userState.mistakeLog || []).length} Logged Engineering Misconceptions</span>
        </div>
        <p style="font-size:0.8rem; color:var(--text-muted); margin-bottom:12px;">
          University exam traps categorized from authentic EiABC student exams. Review the root causes and golden prevention rules:
        </p>
        <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:10px;">
          ${(typeof MISTAKE_TAXONOMY !== 'undefined' ? MISTAKE_TAXONOMY : []).map(m => {
            const count = mistakeCounts[m.code] || 0;
            return `
              <div style="background:rgba(9, 14, 29, 0.85); border:1px solid ${count > 0 ? 'var(--danger)' : 'var(--border)'}; border-radius:8px; padding:10px 12px; display:flex; flex-direction:column; gap:4px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="font-family:var(--font-mono); font-size:0.72rem; color:var(--accent); font-weight:700;">${m.code}</span>
                  ${count > 0 ? `<span style="font-size:0.7rem; color:var(--danger); font-weight:700; background:rgba(244, 63, 94, 0.15); padding:2px 6px; border-radius:4px;">${count}x Triggered</span>` : ''}
                </div>
                <strong style="font-size:0.8rem; color:#fff;">${escapeHtml(m.name)}</strong>
                <p style="font-size:0.75rem; color:var(--text-muted); line-height:1.35;">${escapeHtml(m.description)}</p>
                <div style="font-size:0.73rem; color:var(--gold); border-top:1px solid rgba(255,255,255,0.06); padding-top:4px; margin-top:2px;">
                  <strong>Rule:</strong> ${escapeHtml(m.preventionRule)}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- SPACED REPETITION REVIEW QUEUE -->
      ${srQueue.length > 0 ? `
        <div style="background:rgba(56, 189, 248, 0.08); border:1px solid var(--border-light); border-radius:10px; padding:16px; margin-bottom:20px;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:12px;">
            <h3 style="font-size:1.02rem; color:#fff; font-weight:700; margin:0;">
              🔁 Spaced Repetition Problem Queue (${srQueue.length} Active Cards)
            </h3>
            <span style="font-size:0.75rem; color:var(--accent);">SM-2 / Leitner Review Intervals</span>
          </div>
          <div style="display:flex; flex-direction:column; gap:10px;">
            ${srQueue.map(item => `
              <div style="background:rgba(9, 14, 29, 0.9); border:1px solid var(--border); border-radius:8px; padding:12px 14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
                <div>
                  <div style="display:flex; align-items:center; gap:6px;">
                    <span class="qb-id-badge">${item.q.id}</span>
                    <span style="font-size:0.75rem; color:var(--gold); font-weight:600;">Box ${item.data.box} &bull; Trap ${item.data.mistakeCode || 'General'}</span>
                  </div>
                  <strong style="color:#fff; font-size:0.85rem; display:block; margin-top:4px;">${escapeHtml(item.q.subtopic || item.q.topic)}</strong>
                </div>
                <div style="display:flex; gap:8px;">
                  <button class="btn-primary" style="padding:6px 12px; font-size:0.78rem;" onclick="openProblemWorkspace('${item.q.id}')">
                    Retry Problem in Solver ➔
                  </button>
                  <button class="hud-btn" style="padding:6px 10px; font-size:0.78rem;" onclick="graduateSpacedRepetition('${item.q.id}')">
                    Graduate to Box ${item.data.box + 1} ✓
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
        <h2>📓 Personal Error Notebook & Mistake Vault</h2>
        <span class="stat-pill" style="color:var(--danger)">${userState.errors.length} Missed Concept(s)</span>
      </div>
      <p style="color:var(--text-muted); margin: 6px 0 16px; font-size:0.9rem;">Targeted active recall of problems you previously missed in the Gauntlet or Exam Simulator. Retest them directly here until mastered!</p>

      ${userState.errors.length === 0 ? `
        <div class="concept-callout" style="border-left-color:var(--success); font-size:1.02rem;">
          🎉 <strong>Flawless Record!</strong> Your Error Notebook is completely empty. As you make mistakes during practice, they are logged here automatically for surgical review.
        </div>
        <div style="margin-top:16px;">
          <button class="btn-primary" onclick="switchAppView('dashboard')">Back to Cockpit ➔</button>
        </div>
      ` : `
        <div style="display:flex; flex-direction:column; gap:16px;">
          ${userState.errors.map((err, idx) => {
            const modIdxMap = { mod0: 0, mod1: 1, mod2: 2, mod3: 3, mod4: 4, mod5: 5, mod6: 6, mod7: 7 };
            const mIdx = err.modId ? (modIdxMap[err.modId] !== undefined ? modIdxMap[err.modId] : -1) : -1;

            return `
            <div class="step-box" style="border-left:4px solid var(--danger);" id="err_box_${idx}">
              <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
                <h3 style="color:var(--danger); margin:0; font-size:1.02rem;">${err.title}</h3>
                <div style="display:flex; gap:6px; flex-wrap:wrap;">
                  ${mIdx >= 0 ? `
                    <button class="hud-btn" style="padding:4px 8px; font-size:0.76rem;" onclick="selectModule(${mIdx}); switchModuleTab('theory');">📖 Review Notes</button>
                    <button class="hud-btn" style="padding:4px 8px; font-size:0.76rem; color:var(--accent); border-color:var(--accent);" onclick="openModuleVideos(${mIdx})">🎥 Video</button>
                  ` : ''}
                  <button class="hud-btn" style="border-color:var(--accent); color:var(--accent); padding:4px 8px; font-size:0.76rem;" onclick="toggleRetestError(${idx})">⚔️ Retest Now</button>
                  <button class="hud-btn" style="border-color:var(--success); color:var(--success); padding:4px 8px; font-size:0.76rem;" onclick="clearError(${idx})">Mark Mastered ✅</button>
                </div>
              </div>
              <p style="font-weight:600; margin:10px 0;">${err.prompt}</p>
              ${err.diagram ? `<div class="blueprint-diagram">${err.diagram}</div>` : ''}

              <!-- Retest Inline Panel -->
              <div id="retest_panel_${idx}" style="display:none; margin-top:12px; padding-top:12px; border-top:1px solid rgba(255,255,255,0.08);">
                <div class="options-list">
                  ${err.options ? err.options.map((opt, oIdx) => `
                    <button class="option-btn" onclick="checkErrorRetestAnswer(${idx}, ${oIdx})">
                      ${opt.text}
                    </button>
                  `).join('') : '<p style="color:var(--text-muted);">Self-review mode</p>'}
                </div>
                <div class="feedback-banner" id="err_feedback_${idx}"></div>
              </div>

              <div style="font-size:0.8rem; color:var(--text-dim); margin-top:8px;">Logged on: ${err.timestamp || 'Recent'}</div>
            </div>
          `;
          }).join('')}
        </div>
      `}
    </div>
  `;
}

function toggleRetestError(idx) {
  const panel = document.getElementById(`retest_panel_${idx}`);
  if (panel) {
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
  }
}

function checkErrorRetestAnswer(errIdx, optIdx) {
  const err = userState.errors[errIdx];
  if (!err || !err.options) return;
  const chosen = err.options[optIdx];
  const feedback = document.getElementById(`err_feedback_${errIdx}`);
  if (!feedback) return;

  feedback.style.display = 'block';
  if (chosen.correct) {
    userState.xp += 150;
    userState.streak += 1;
    feedback.className = 'feedback-banner';
    feedback.style.background = 'rgba(16, 185, 129, 0.2)';
    feedback.style.border = '1px solid var(--success)';
    feedback.style.color = '#a7f3d0';
    feedback.innerHTML = `<strong>✅ Concept Conquered (+150 XP)!</strong><br/>${chosen.explain}<br/><em>(Clearing from error notebook in 1.5s...)</em>`;

    setTimeout(() => {
      userState.errors.splice(errIdx, 1);
      saveState();
      renderMainView();
    }, 1500);
  } else {
    feedback.className = 'feedback-banner';
    feedback.style.background = 'rgba(244, 63, 94, 0.2)';
    feedback.style.border = '1px solid var(--danger)';
    feedback.style.color = '#fecdd3';
    feedback.innerHTML = `<strong>❌ Still Trapped:</strong><br/>${chosen.explain}`;
  }

  setTimeout(function() {
    renderMathInDOM(feedback);
  }, 10);
}

function clearError(idx) {
  userState.errors.splice(idx, 1);
  saveState();
  renderMainView();
}

// =========================================================================

// =========================================================================
// 🥋 METHOD DECIDER & TACTICAL COMBAT TRAINER ENGINE (COTM 3101)
// =========================================================================

function switchTrainerTab(tab) {
  currentTrainerTab = tab;
  renderTrainerCombatView(document.getElementById('viewport'));
}

function setTriageStructure(val) {
  trainerTriageStructure = val;
  renderTrainerCombatView(document.getElementById('viewport'));
}

function setTriageObjective(val) {
  trainerTriageObjective = val;
  renderTrainerCombatView(document.getElementById('viewport'));
}

function toggleTriageModifier(key) {
  trainerTriageModifiers[key] = !trainerTriageModifiers[key];
  renderTrainerCombatView(document.getElementById('viewport'));
}

function filterTrainerGivens(cat) {
  trainerGivensFilter = cat;
  renderTrainerCombatView(document.getElementById('viewport'));
}

function handleTrainerGivensSearch(query) {
  trainerGivensSearch = query;
  renderTrainerCombatView(document.getElementById('viewport'));
}

function selectTrainerScenario(idx) {
  currentTrainerScenarioIdx = idx;
  renderTrainerCombatView(document.getElementById('viewport'));
}

function getTriageRecommendation(structure, objective, modifiers) {
  modifiers = modifiers || {};
  let rec = {
    method: "Three-Moment Equation (Clapeyron)",
    badge: "⚡ #1 Fastest Path",
    advantageScore: "95% Speed Advantage",
    ds: "D_s = 2 (Reactions)",
    dk: "D_k = 3 (Rotations)",
    whyBest: "Direct row-by-row equation assembly coupling only 3 adjacent supports in a tridiagonal system. Zero kinematic rotations to calculate.",
    whyOthersFail: "Force Method requires a 13-member table and dense 3x3 flexibility matrix inversion. Slope-Deflection requires setting up 6 member equations plus joint balance equations.",
    deadlyTrap: "Middle support settlement sign: when center support sinks (Δ_c < 0), the bracket (Δ_l - Δ_c) becomes POSITIVE (+). Reversing this sign is the #1 exam failure mode!",
    goldenRule: "Banded tridiagonal matrix: each equation isolates 3 supports directly. Add imaginary span L0 = 0 (EI0 = ∞) for fixed ends.",
    formulas: [
      {
        name: "Clapeyron 3-Moment Equation",
        latex: "M_l \\left(\\frac{L}{EI}\\right)_l + 2M_c \\left[\\left(\\frac{L}{EI}\\right)_l + \\left(\\frac{L}{EI}\\right)_r\\right] + M_r \\left(\\frac{L}{EI}\\right)_r = -\\left(\\frac{6A_l x_l}{L_l EI_l} + \\frac{6A_r x_r}{L_r EI_r}\\right) + 6\\left[\\frac{\\Delta_l - \\Delta_c}{L_l} + \\frac{\\Delta_r - \\Delta_c}{L_r}\\right]"
      },
      {
        name: "UDL Load Term",
        latex: "\\frac{6Ax}{L} = \\frac{w L^3}{4}"
      },
      {
        name: "Point Load Term",
        latex: "\\frac{6Ax}{L} = \\frac{P a (L^2 - a^2)}{L}"
      }
    ]
  };

  if (structure === 'beam_det') {
    if (objective === 'deflection' || objective === 'slope') {
      if (modifiers.varying_ei || modifiers.settlement) {
        rec.method = "Virtual Work (Unit Load Method)";
        rec.badge = "🎯 Maximum Precision";
        rec.advantageScore = "Handles Varying EI Directly";
        rec.ds = "D_s = 0";
        rec.dk = "N/A (Determinate)";
        rec.whyBest = "Vereshchagin's graphical multiplication bypasses differential equations entirely. Split non-prismatic sections cleanly: ∫ m (M/EI) dx = ∑ (Am · mc) / EI.";
        rec.whyOthersFail = "Double integration requires 4 integration constants for stepped beams and leads to algebra errors.";
        rec.deadlyTrap = "Vereshchagin Centroid Trap: In ∫ m (M/EI) dx = (1/EI) Am · mc, the ordinate mc MUST be read on the linear m diagram under the centroid of M! Never the reverse.";
        rec.goldenRule = "Linear ordinate mc under curved centroid: Am · mc / EI.";
        rec.formulas = [
          { name: "Vereshchagin Multiplication", latex: "1 \\cdot \\Delta = \\int m \\frac{M}{EI} dx = \\sum \\frac{A_M \\cdot m_c}{EI}" }
        ];
      } else {
        rec.method = "Conjugate Beam Method";
        rec.badge = "🌉 Elegant Statics Duality";
        rec.advantageScore = "Direct Shear & Moment Analogy";
        rec.ds = "D_s = 0";
        rec.dk = "N/A";
        rec.whyBest = "Replaces calculus with simple statics: Conjugate Shear V* = Real Slope θ; Conjugate Moment M* = Real Deflection v. Load is M/EI diagram.";
        rec.whyOthersFail = "Moment-Area method requires tedious tangent deviation sketches and geometric subtractions.";
        rec.deadlyTrap = "Real hinge becomes conjugate roller; Real roller becomes conjugate hinge. Sagging M/EI is UPWARD (+); Hogging M/EI is DOWNWARD (-).";
        rec.goldenRule = "V* = θ, M* = v. Real support transforms into conjugate dual.";
        rec.formulas = [
          { name: "Conjugate Beam Duality", latex: "V^*(x) = \\theta(x), \\quad M^*(x) = v(x), \\quad w^*(x) = \\frac{M(x)}{EI}" }
        ];
      }
    }
  } else if (structure === 'beam_hinge') {
    rec.method = "Conjugate Beam Method";
    rec.badge = "🌉 Unbeatable for Hinged Beams";
    rec.advantageScore = "99% Faster than Integration";
    rec.ds = "D_s = 0 (Condition Equation s=1)";
    rec.dk = "Discontinuous Slope at Hinge";
    rec.whyBest = "Conjugate duality naturally handles slope kinks: the conjugate reaction R_C* at the conjugate roller gives the kink angle Δθ directly, and M_C* gives deflection v_C.";
    rec.whyOthersFail = "Slope-Deflection is redundant for determinate structures; double integration splits into multiple coordinate systems.";
    rec.deadlyTrap = "Assuming slope is continuous across real hinge. The kink angle is Δθ = θ_C^+ - θ_C^- = R_C*. Real internal hinge transforms into conjugate interior roller!";
    rec.goldenRule = "Real Hinge → Conjugate Roller! Reaction R* = Kink Angle Δθ.";
    rec.formulas = [
      { name: "Kink Angle Duality", latex: "\\Delta\\theta = R_C^*, \\quad v_C = M_C^*" }
    ];
  } else if (structure === 'truss_det') {
    rec.method = "Virtual Work (Unit Load Method)";
    rec.badge = "📐 Pure Deterministic Statics";
    rec.advantageScore = "Standard Tabular Tabulation";
    rec.ds = "D_s = 0 (m + r = 2j)";
    rec.dk = "N/A";
    rec.whyBest = "Tabular summation (n · N · L / EA) handles mechanical loads, thermal gradients, and fabrication errors simultaneously in 1 table.";
    rec.whyOthersFail = "Castigliano's theorem requires taking partial derivatives of every member force expression.";
    rec.deadlyTrap = "Real bar forces N from thermal or fabrication errors in DETERMINATE trusses are ZERO! They do not cause internal stress, only deflection.";
    rec.goldenRule = "1 · Δ = ∑ (n · N · L / EA) + ∑ n α (ΔT) L + ∑ n δL.";
    rec.formulas = [
      { name: "Truss Virtual Work", latex: "1 \\cdot \\Delta = \\sum n \\frac{N L}{E A} + \\sum n \\alpha (\\Delta T) L + \\sum n \\delta L" }
    ];
  } else if (structure === 'truss_indet') {
    rec.method = "Consistent Deformations (Force Method)";
    rec.badge = "⚡ Tabular Force Inversion";
    rec.advantageScore = "Isolates Pure Redundant";
    rec.ds = "D_s = (m + r) - 2j (Typically 1 or 2)";
    rec.dk = "D_k = 2j - r (High kinematic degrees)";
    rec.whyBest = "Since D_s << D_k (e.g. D_s=1 vs D_k=8), Force Method requires solving only a 1x1 equation: Δ_10 + X_1 δ_11 = 0.";
    rec.whyOthersFail = "Displacement/Stiffness method requires setting up an 8x8 matrix by hand on an exam.";
    rec.deadlyTrap = "When selecting an internal diagonal bar as redundant, virtual reactions are strictly ZERO! Remember to include the redundant bar itself in δ_11.";
    rec.goldenRule = "Zero-reaction law for internal redundants: X_1 = -Δ_10 / δ_11.";
    rec.formulas = [
      { name: "Truss Compatibility", latex: "\\Delta_{10} + X_1 \\delta_{11} = 0 \\implies X_1 = -\\frac{\\Delta_{10}}{\\delta_{11}}, \\quad \\delta_{11} = \\sum \\frac{n_1^2 L}{EA}" }
    ];
  } else if (structure === 'frame_nosway') {
    if (modifiers.pinned_end || modifiers.symmetry) {
      rec.method = "Hardy Cross (Moment Distribution) with 3/4 Stiffness";
      rec.badge = "🔄 Zero Equation Inversion";
      rec.advantageScore = "Solves in 3 Tabular Cycles";
      rec.ds = "D_s = 3";
      rec.dk = "D_k = 2 (θ_B, θ_C)";
      rec.whyBest = "With no sidesway and modified 3/4 stiffness at pinned ends, Hardy Cross converges in 3 simple distribution cycles without writing any simultaneous equations!";
      rec.whyOthersFail = "Force Method requires 3 redundant cuts and inverting a 3x3 flexibility matrix.";
      rec.deadlyTrap = "Forgetting to set Carry-Over Factor COF = 0 to a pinned support after using K = (3/4)(I/L)!";
      rec.goldenRule = "3/4 Rule: Modified stiffness K = (3/4)(I/L) locks COF = 0 forever.";
      rec.formulas = [
        { name: "Modified Stiffness", latex: "K_{mod} = \\frac{3}{4}\\frac{I}{L}, \\quad COF = 0, \\quad DF_i = \\frac{K_i}{\\sum K}" }
      ];
    } else {
      rec.method = "Slope-Deflection Method";
      rec.badge = "📐 Systematic Joint Equilibrium";
      rec.advantageScore = "Exact Closed-Form Solution";
      rec.ds = "D_s = 3";
      rec.dk = "D_k = 2 (θ_B, θ_C)";
      rec.whyBest = "With Δ = 0, Slope-Deflection gives exactly 2 joint equations (∑ M_B = 0, ∑ M_C = 0) with zero shear equation overhead.";
      rec.whyOthersFail = "Force Method requires cutting closed loops and computing Vereshchagin integrals for 3 redundants.";
      rec.deadlyTrap = "Statical sign convention: θ is (+) Clockwise, M is (+) Counter-Clockwise on member! MINUS sign in M_ij = M^F - 2EK(2θ_i + θ_j).";
      rec.goldenRule = "COTM 3101 Convention: Clockwise θ, Counter-Clockwise member moment.";
      rec.formulas = [
        { name: "Slope-Deflection (No Sway)", latex: "M_{ij} = M_{ij}^F - 2EK(2\\theta_i + \\theta_j)" }
      ];
    }
  } else if (structure === 'frame_sway') {
    rec.method = "Slope-Deflection Method with Column Shear Equation";
    rec.badge = "🌪️ Rigorous Sidesway Formulation";
    rec.advantageScore = "Direct Equilibrium Formulation";
    rec.ds = "D_s = 3";
    rec.dk = "D_k = 3 (θ_B, θ_C, Δ)";
    rec.whyBest = "Slope-Deflection handles sway systematically: 2 joint moment equations + 1 horizontal column shear equation (∑ H = 0).";
    rec.whyOthersFail = "Hardy Cross with sway requires two separate distribution stages (non-sway + unit sway) followed by superposition balancing.";
    rec.deadlyTrap = "Column chord rotation ψ = -Δ/h (clockwise is negative); Girder chord rotation ψ_girder = 0 for parallel equal columns.";
    rec.goldenRule = "Column shear: (M_AB + M_BA)/h1 + (M_CD + M_DC)/h2 + P_lat = 0.";
    rec.formulas = [
      { name: "Slope-Deflection with Sway", latex: "M_{AB} = M_{AB}^F - 2EK\\left(2\\theta_A + \\theta_B - \\frac{3\\Delta}{h}\\right)" },
      { name: "Column Shear Equation", latex: "\\sum H = 0 \\implies \\frac{M_{AB} + M_{BA}}{h} + \\frac{M_{CD} + M_{DC}}{h} + P_{lat} = 0" }
    ];
  } else if (structure === 'frame_unequal') {
    rec.method = "Slope-Deflection with Kinematic Instant Centers";
    rec.badge = "📐 Sloping / Unequal Leg Master";
    rec.advantageScore = "Coupled Sway Kinematics";
    rec.ds = "D_s = 3";
    rec.dk = "D_k = 3 (θ_B, θ_C, Δ)";
    rec.whyBest = "Unequal columns have different chord rotations: ψ1 = -Δ/h1 ≠ ψ2 = -Δ/h2. Slope-Deflection directly incorporates these distinct rotations.";
    rec.whyOthersFail = "Hardy Cross sway equations become prohibitively complex with unequal column heights.";
    rec.deadlyTrap = "Using the same chord rotation for both columns! Shorter column is stiffer and undergoes larger chord rotation.";
    rec.goldenRule = "ψ1 = -Δ/h1, ψ2 = -Δ/h2. Shorter column attracts more shear.";
    rec.formulas = [
      { name: "Unequal Sway Equations", latex: "\\psi_1 = -\\frac{\\Delta}{h_1}, \\quad \\psi_2 = -\\frac{\\Delta}{h_2}" }
    ];
  }

  return rec;
}

function checkTrainerScenarioAnswer(scenIdx, qIdx, optIdx) {
  const scenario = METHOD_TRAINER_SCENARIOS[scenIdx];
  if (!scenario) return;
  const q = scenario.questions[qIdx];
  if (!q) return;
  const chosen = q.options[optIdx];
  const feedbackEl = document.getElementById(`scenFeedback_${scenIdx}_${qIdx}`);
  if (!feedbackEl) return;

  feedbackEl.style.display = 'block';

  if (chosen.correct) {
    const key = `${scenario.id}_q${qIdx}`;
    if (!userState.trainerSolved) userState.trainerSolved = {};
    const wasAlreadySolved = !!userState.trainerSolved[key];

    if (!wasAlreadySolved) {
      userState.trainerSolved[key] = true;
      userState.xp += 100;
      userState.streak += 1;
      saveState();
      updateStatsHUD();
    }

    feedbackEl.className = 'feedback-banner';
    feedbackEl.style.background = 'rgba(16, 185, 129, 0.2)';
    feedbackEl.style.border = '1px solid var(--success)';
    feedbackEl.style.color = '#a7f3d0';
    feedbackEl.innerHTML = `
      <div style="font-weight:700; font-size:0.95rem; margin-bottom:4px; display:flex; align-items:center; gap:6px;">
        <span>✅</span> Master Tactical Decision! (+100 XP)
      </div>
      <div style="font-size:0.88rem; line-height:1.5;">${chosen.explain}</div>
    `;

    // Check if entire scenario is mastered
    const allSolved = scenario.questions.every((_, idx) => userState.trainerSolved[`${scenario.id}_q${idx}`]);
    if (allSolved && typeof triggerConfetti === 'function') {
      triggerConfetti();
    }
  } else {
    feedbackEl.className = 'feedback-banner';
    feedbackEl.style.background = 'rgba(244, 63, 94, 0.2)';
    feedbackEl.style.border = '1px solid var(--danger)';
    feedbackEl.style.color = '#fecdd3';
    feedbackEl.innerHTML = `
      <div style="font-weight:700; font-size:0.95rem; margin-bottom:4px; display:flex; align-items:center; gap:6px;">
        <span>❌</span> Fatal Exam Trap Detected!
      </div>
      <div style="font-size:0.88rem; line-height:1.5;">${chosen.explain}</div>
    `;
  }

  setTimeout(() => {
    renderMathInDOM(feedbackEl);
  }, 10);
}

function renderTrainerCombatView(viewport) {
  if (!viewport) return;

  viewport.innerHTML = `
    <div class="card trainer-main-card">
      <div class="trainer-header">
        <div>
          <h2 style="display:flex; align-items:center; gap:10px; margin:0 0 6px;">
            <span style="font-size:1.6rem;">🥋</span> Method Decider & Tactical Combat Trainer
          </h2>
          <p style="color:var(--text-muted); font-size:0.92rem; margin:0; line-height:1.5;">
            The 1000x Accuracy Engine for COTM 3101: Decode exam givens into boundary conditions, run 5-second statical triage (Ds vs Dk), deploy the exact formula arsenal, and conquer hard AAU exam problems.
          </p>
        </div>
        <div class="trainer-header-stats">
          <span class="stat-pill" style="color:var(--accent); border-color:var(--accent);">
            ⚡ 5 Combat Scenarios
          </span>
          <span class="stat-pill" style="color:var(--gold); border-color:var(--gold);">
            🔍 16 Exam Decoders
          </span>
        </div>
      </div>

      <!-- TRAINER SUB-NAVIGATION TABS -->
      <div class="trainer-tabs-bar">
        <button class="trainer-tab-btn ${currentTrainerTab === 'triage' ? 'active' : ''}" onclick="switchTrainerTab('triage')">
          ⚡ 1. Statical Triage Decider
        </button>
        <button class="trainer-tab-btn ${currentTrainerTab === 'givens' ? 'active' : ''}" onclick="switchTrainerTab('givens')">
          🔍 2. Givens Scanner & Decoder
        </button>
        <button class="trainer-tab-btn ${currentTrainerTab === 'scenarios' ? 'active' : ''}" onclick="switchTrainerTab('scenarios')">
          ⚔️ 3. Scenario Combat Arena
        </button>
        <button class="trainer-tab-btn ${currentTrainerTab === 'protocol' ? 'active' : ''}" onclick="switchTrainerTab('protocol')">
          🧠 4. 1000x Master Protocol
        </button>
      </div>

      <!-- TAB CONTENT CONTAINER -->
      <div id="trainerTabContent" class="trainer-tab-content">
        ${renderTrainerTabBody()}
      </div>
    </div>
  `;

  setTimeout(() => {
    renderMathInDOM(viewport);
  }, 20);
}

function renderTrainerTabBody() {
  if (currentTrainerTab === 'triage') {
    return renderTrainerTriageTab();
  } else if (currentTrainerTab === 'givens') {
    return renderTrainerGivensTab();
  } else if (currentTrainerTab === 'scenarios') {
    return renderTrainerScenariosTab();
  } else if (currentTrainerTab === 'protocol') {
    return renderTrainerProtocolTab();
  }
  return '';
}

function renderTrainerTriageTab() {
  const rec = getTriageRecommendation(trainerTriageStructure, trainerTriageObjective, trainerTriageModifiers);

  const structures = [
    { id: 'cont_beam', name: 'Continuous Multi-Span Beam' },
    { id: 'frame_nosway', name: 'Rigid Frame (No-Sway / Symmetrical)' },
    { id: 'frame_sway', name: 'Rigid Portal Frame (Side-Sway)' },
    { id: 'frame_unequal', name: 'Rigid Frame (Unequal Columns / Sloping)' },
    { id: 'truss_det', name: 'Plane Truss (Determinate)' },
    { id: 'truss_indet', name: 'Plane Truss (Indeterminate)' },
    { id: 'beam_det', name: 'Determinate Beam (Deflection/Slope)' },
    { id: 'beam_hinge', name: 'Compound Beam with Internal Hinge' }
  ];

  const objectives = [
    { id: 'moments', name: 'Support / End Moments (M)' },
    { id: 'deflection', name: 'Deflection / Displacement (Δ, v)' },
    { id: 'slope', name: 'Rotation / Slope (θ)' },
    { id: 'axial', name: 'Bar Axial Forces (N)' }
  ];

  const modifiersList = [
    { id: 'settlement', label: 'Support Settlement (Δ ≠ 0)' },
    { id: 'pinned_end', label: 'Far End Pinned / Roller (M = 0)' },
    { id: 'varying_ei', label: 'Varying Rigidity (EI₁ ≠ EI₂)' },
    { id: 'symmetry', label: 'Symmetrical Loading & Frame' },
    { id: 'temp_fab', label: 'Thermal ΔT or Lack of Fit δL' },
    { id: 'lateral_load', label: 'Horizontal Lateral Wind Load' }
  ];

  return `
    <div class="triage-grid">
      <!-- LEFT: INTERACTIVE DECISION MATRIX CONTROLS -->
      <div class="triage-control-card">
        <h4 style="margin:0 0 12px; color:#fff; display:flex; align-items:center; gap:8px;">
          <span>🎯</span> Step 1: Input Problem Anatomy
        </h4>

        <div style="margin-bottom:14px;">
          <label class="control-label">Structure Family:</label>
          <select class="triage-select" onchange="setTriageStructure(this.value)">
            ${structures.map(s => `
              <option value="${s.id}" ${s.id === trainerTriageStructure ? 'selected' : ''}>${s.name}</option>
            `).join('')}
          </select>
        </div>

        <div style="margin-bottom:14px;">
          <label class="control-label">Target Question (What must be found?):</label>
          <div class="triage-chip-group">
            ${objectives.map(o => `
              <button class="triage-chip ${o.id === trainerTriageObjective ? 'active' : ''}" onclick="setTriageObjective('${o.id}')">
                ${o.name}
              </button>
            `).join('')}
          </div>
        </div>

        <div>
          <label class="control-label">Special Givens & Complications:</label>
          <div class="triage-chip-group">
            ${modifiersList.map(m => `
              <button class="triage-chip ${trainerTriageModifiers[m.id] ? 'active modifier-active' : ''}" onclick="toggleTriageModifier('${m.id}')">
                ${trainerTriageModifiers[m.id] ? '✓ ' : '+ '}${m.label}
              </button>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- RIGHT: AI STATICAL TRIAGE RECOMMENDATION DOSSIER -->
      <div class="triage-result-card">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:10px; margin-bottom:12px;">
          <div>
            <span class="stat-pill" style="color:var(--accent); font-weight:700; margin-bottom:6px; display:inline-block;">${rec.badge}</span>
            <h3 style="margin:4px 0; color:#fff; font-size:1.3rem;">${rec.method}</h3>
          </div>
          <span class="stat-pill" style="color:var(--gold); border-color:var(--gold); font-size:0.85rem;">${rec.advantageScore}</span>
        </div>

        <div class="triage-stat-row">
          <div class="triage-stat-box">
            <span class="triage-stat-label">Statical Indeterminacy</span>
            <span class="triage-stat-value">${rec.ds}</span>
          </div>
          <div class="triage-stat-box">
            <span class="triage-stat-label">Kinematic Indeterminacy</span>
            <span class="triage-stat-value">${rec.dk}</span>
          </div>
        </div>

        <div class="concept-callout" style="border-left-color:var(--accent); margin:12px 0;">
          <h5 style="margin:0 0 4px; color:#fff;">💡 Why This Method Dominates:</h5>
          <p style="margin:0; font-size:0.88rem; color:var(--text-muted); line-height:1.5;">${rec.whyBest}</p>
        </div>

        <div class="concept-callout" style="border-left-color:var(--danger); margin:12px 0; background:rgba(239, 68, 68, 0.08);">
          <h5 style="margin:0 0 4px; color:#fca5a5;">⚠️ Fatal Exam Trap to Dodge:</h5>
          <p style="margin:0; font-size:0.88rem; color:#fecdd3; line-height:1.5;">${rec.deadlyTrap}</p>
        </div>

        <div class="concept-callout" style="border-left-color:var(--gold); margin:12px 0; background:rgba(245, 158, 11, 0.08);">
          <h5 style="margin:0 0 4px; color:#fde68a;">🚫 Why Alternative Methods Fail on Timed Exams:</h5>
          <p style="margin:0; font-size:0.88rem; color:var(--text-muted); line-height:1.5;">${rec.whyOthersFail}</p>
        </div>

        <div style="margin-top:14px;">
          <h5 style="margin:0 0 8px; color:#fff; display:flex; align-items:center; gap:6px;">
            <span>🧮</span> Formula Arsenal to Deploy:
          </h5>
          ${rec.formulas.map(f => `
            <div class="formula-banner math-display-card" style="margin-bottom:8px;">
              <div style="font-size:0.78rem; color:var(--accent); margin-bottom:4px; font-weight:600;">${f.name}</div>
              <div class="math-card-body">${formatFormula(f.latex)}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderTrainerGivensTab() {
  const allGivens = (typeof GIVENS_DECODER_DATABASE !== 'undefined') ? GIVENS_DECODER_DATABASE : [];
  
  let filtered = allGivens;
  if (trainerGivensFilter !== 'all') {
    filtered = filtered.filter(g => g.category === trainerGivensFilter);
  }

  if (trainerGivensSearch.trim()) {
    const q = trainerGivensSearch.toLowerCase();
    filtered = filtered.filter(g =>
      g.title.toLowerCase().includes(q) ||
      g.examPhrase.toLowerCase().includes(q) ||
      g.signLock.toLowerCase().includes(q) ||
      g.trapMnemonic.toLowerCase().includes(q)
    );
  }

  const categories = [
    { id: 'all', name: 'All Exam Givens' },
    { id: 'settlement', name: 'Settlement & Shifts' },
    { id: 'supports', name: 'Boundary Supports' },
    { id: 'hinges', name: 'Internal Hinges' },
    { id: 'trusses', name: 'Trusses & Errors' },
    { id: 'frames', name: 'Rigid Frames & Sway' },
    { id: 'beams', name: 'Beams & Overhangs' }
  ];

  return `
    <div>
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:14px;">
        <div>
          <h3 style="margin:0 0 4px; color:#fff;">🔍 Exam Givens Scanner & Mathematical Decoder</h3>
          <p style="margin:0; font-size:0.88rem; color:var(--text-muted);">
            Translate English exam phrasing into strict mathematical boundary conditions, sign locks, and formula adjustments.
          </p>
        </div>
        <div style="position:relative; min-width:260px; flex:1; max-width:380px;">
          <input 
            type="text" 
            class="triage-select" 
            placeholder="Search keywords: settle, hinge, chord, sway, temp..." 
            value="${trainerGivensSearch}"
            oninput="handleTrainerGivensSearch(this.value)"
            style="padding-left:32px;"
          />
          <span style="position:absolute; left:10px; top:50%; transform:translateY(-50%); color:var(--text-dim);">🔍</span>
        </div>
      </div>

      <!-- CATEGORY FILTER CHIPS -->
      <div class="givens-filter-bar">
        ${categories.map(c => `
          <button class="triage-chip ${trainerGivensFilter === c.id ? 'active' : ''}" onclick="filterTrainerGivens('${c.id}')">
            ${c.name}
          </button>
        `).join('')}
      </div>

      <!-- GIVENS GRID -->
      <div class="givens-grid">
        ${filtered.length === 0 ? `
          <div class="concept-callout" style="grid-column:1/-1;">
            No matching exam phrases found for "${trainerGivensSearch}". Try searching "settle", "pin", "hinge", or "sway".
          </div>
        ` : filtered.map(g => `
          <div class="givens-card">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px; margin-bottom:8px;">
              <h4 style="margin:0; color:#fff; font-size:1.02rem;">${g.title}</h4>
              <span class="stat-pill" style="font-size:0.72rem; color:var(--accent);">${g.categoryName}</span>
            </div>

            <div class="exam-phrase-quote">
              <span style="color:var(--gold); font-weight:700;">Exam Phrasing:</span> "${g.examPhrase}"
            </div>

            <div class="formula-banner math-display-card" style="margin:8px 0; padding:10px;">
              <div style="font-size:0.75rem; color:var(--accent); font-weight:600; margin-bottom:2px;">Mathematical Constraint:</div>
              <div class="math-card-body">${formatFormula(g.mathCondition)}</div>
            </div>

            <div class="concept-callout" style="border-left-color:var(--danger); background:rgba(239, 68, 68, 0.08); margin:8px 0; padding:8px 12px;">
              <strong style="color:#fca5a5; font-size:0.82rem;">🔒 Critical Sign Lock:</strong>
              <p style="margin:4px 0 0; font-size:0.82rem; color:#fecdd3; line-height:1.4;">${g.signLock}</p>
            </div>

            <div style="margin:8px 0;">
              <strong style="color:var(--text-main); font-size:0.82rem;">📐 Course Formula Adjustments:</strong>
              <ul style="margin:4px 0 0 16px; padding:0; font-size:0.82rem; color:var(--text-muted); line-height:1.45;">
                ${g.rules.map(r => `<li>${r}</li>`).join('')}
              </ul>
            </div>

            <div class="concept-callout" style="border-left-color:var(--gold); background:rgba(245, 158, 11, 0.08); margin-top:8px; padding:8px 12px;">
              <strong style="color:#fde68a; font-size:0.82rem;">💡 Memory Trick / Statical Law:</strong>
              <p style="margin:2px 0 0; font-size:0.82rem; color:var(--text-muted);">${g.trapMnemonic}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderTrainerScenariosTab() {
  const scenarios = (typeof METHOD_TRAINER_SCENARIOS !== 'undefined') ? METHOD_TRAINER_SCENARIOS : [];
  if (scenarios.length === 0) return '<div class="concept-callout">No scenarios found.</div>';

  const scen = scenarios[currentTrainerScenarioIdx] || scenarios[0];
  const userSolved = userState.trainerSolved || {};

  return `
    <div>
      <div style="margin-bottom:14px;">
        <h3 style="margin:0 0 4px; color:#fff;">⚔️ Scenario Combat Arena (University Exam Drills)</h3>
        <p style="margin:0; font-size:0.88rem; color:var(--text-muted);">
          Master tough exam scenarios from Addis Ababa University (EiABC). Decode givens, inspect the statical triage, deploy the formula, and earn +100 XP per master tactical choice.
        </p>
      </div>

      <!-- SCENARIO SELECTOR BUTTONS -->
      <div class="scenario-nav-bar">
        ${scenarios.map((s, idx) => {
          const solvedInScen = s.questions.filter((_, qIdx) => userSolved[`${s.id}_q${qIdx}`]).length;
          const isDone = solvedInScen === s.questions.length && s.questions.length > 0;
          return `
            <button class="scenario-nav-btn ${idx === currentTrainerScenarioIdx ? 'active' : ''}" onclick="selectTrainerScenario(${idx})">
              <span>${s.title.split(':')[0]}</span>
              <span class="scenario-status-badge ${isDone ? 'badge-done' : ''}">
                ${isDone ? '✅ Done' : `${solvedInScen}/${s.questions.length}`}
              </span>
            </button>
          `;
        }).join('')}
      </div>

      <!-- ACTIVE SCENARIO DOSSIER -->
      <div class="scenario-dossier-card">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:10px; margin-bottom:12px;">
          <div>
            <span class="stat-pill" style="color:var(--accent); font-weight:700; margin-bottom:6px; display:inline-block;">${scen.structureType}</span>
            <h3 style="margin:4px 0; color:#fff; font-size:1.25rem;">${scen.title}</h3>
          </div>
          <span class="stat-pill" style="color:var(--gold); border-color:var(--gold);">
            +100 XP per Master Choice
          </span>
        </div>

        <div class="step-box" style="border-left:4px solid var(--accent); margin-bottom:16px;">
          <h4 style="margin:0 0 6px; color:#fff; font-size:0.95rem;">📋 Problem Statement:</h4>
          <p style="margin:0; font-size:0.9rem; color:var(--text-main); line-height:1.55;">${scen.problemText}</p>
        </div>

        <!-- 4-STEP EXPANSION PROTOCOL ACCORDION -->
        <div style="display:flex; flex-direction:column; gap:12px; margin-bottom:20px;">
          <!-- STEP 1: GIVENS SCANNER -->
          <details class="combat-accordion" open>
            <summary class="combat-summary">🔍 Step 1: Scan Givens & Physical Implications</summary>
            <div class="combat-body">
              <div style="display:flex; flex-direction:column; gap:8px;">
                ${scen.givens.map(g => `
                  <div class="protocol-step-box" style="margin-bottom:0;">
                    <strong style="color:var(--gold); font-size:0.88rem;">Key Given: "${g.key}"</strong>
                    <p style="font-size:0.85rem; color:var(--text-muted); margin-top:2px;">↳ ${g.implication}</p>
                  </div>
                `).join('')}
              </div>
            </div>
          </details>

          <!-- STEP 2: STATICAL TRIAGE -->
          <details class="combat-accordion" open>
            <summary class="combat-summary">⚡ Step 2: Statical Triage Dossier (Ds vs Dk)</summary>
            <div class="combat-body">
              <div class="triage-stat-row" style="margin-bottom:10px;">
                <div class="triage-stat-box">
                  <span class="triage-stat-label">Statical Degree</span>
                  <span class="triage-stat-value">${scen.triage.Ds}</span>
                </div>
                <div class="triage-stat-box">
                  <span class="triage-stat-label">Kinematic Degree</span>
                  <span class="triage-stat-value">${scen.triage.Dk}</span>
                </div>
              </div>
              <div class="concept-callout" style="border-left-color:var(--accent); margin-bottom:8px;">
                <strong>Recommended Method:</strong> ${scen.triage.recommendedMethod}<br/>
                <span style="font-size:0.86rem; color:var(--text-muted);">${scen.triage.whyBest}</span>
              </div>
              <div class="concept-callout" style="border-left-color:var(--danger); background:rgba(239, 68, 68, 0.08);">
                <strong style="color:#fca5a5;">⚠️ Deadly Exam Trap:</strong>
                <span style="font-size:0.86rem; color:#fecdd3; display:block; margin-top:2px;">${scen.triage.deadlyTrap}</span>
              </div>
            </div>
          </details>

          <!-- STEP 3: FORMULA ARSENAL -->
          <details class="combat-accordion" open>
            <summary class="combat-summary">🧮 Step 3: Formula Arsenal to Deploy</summary>
            <div class="combat-body">
              <div style="display:flex; flex-direction:column; gap:8px;">
                ${scen.formulaArsenal.map(f => `
                  <div class="formula-banner math-display-card" style="margin:0; padding:10px;">
                    <div style="font-size:0.78rem; color:var(--accent); font-weight:600; margin-bottom:4px;">${f.name}</div>
                    <div class="math-card-body">${formatFormula(f.latex)}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          </details>
        </div>

        <!-- STEP 4: TACTICAL COMBAT QUESTIONS -->
        <h4 style="color:#fff; margin:0 0 12px; display:flex; align-items:center; gap:8px;">
          <span>⚔️</span> Step 4: Tactical Combat Challenge (Test Your Decisions)
        </h4>

        <div style="display:flex; flex-direction:column; gap:16px;">
          ${scen.questions.map((q, qIdx) => {
            const isSolved = userSolved[`${scen.id}_q${qIdx}`];
            return `
              <div class="scenario-challenge-box" id="scenQBox_${currentTrainerScenarioIdx}_${qIdx}">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px; margin-bottom:10px;">
                  <span style="font-weight:600; font-size:0.96rem; color:#fff;">${qIdx + 1}. ${q.prompt}</span>
                  <span class="stat-pill" style="font-size:0.75rem; color:${isSolved ? 'var(--success)' : 'var(--gold)'};">
                    ${isSolved ? '✅ Solved (+100 XP)' : '⚡ +100 XP'}
                  </span>
                </div>

                <div class="options-list">
                  ${q.options.map((opt, optIdx) => `
                    <button class="option-btn" onclick="checkTrainerScenarioAnswer(${currentTrainerScenarioIdx}, ${qIdx}, ${optIdx})">
                      ${opt.text}
                    </button>
                  `).join('')}
                </div>

                <div class="feedback-banner" id="scenFeedback_${currentTrainerScenarioIdx}_${qIdx}" style="display:none; margin-top:10px;"></div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderTrainerProtocolTab() {
  return `
    <div class="master-protocol-card" style="margin-top:0;">
      <div class="protocol-header">
        <div>
          <h3 style="margin:0 0 4px; color:#fff; display:flex; align-items:center; gap:8px;">
            <span>🧠</span> The 1000x Accuracy Master Protocol
          </h3>
          <p style="margin:0; font-size:0.88rem; color:var(--text-muted);">
            The deterministic 5-phase execution engine designed to eliminate calculation panic, avoid sign traps, and guarantee first-time accuracy on tough COTM 3101 exams.
          </p>
        </div>
        <span class="stat-pill" style="color:var(--gold); border-color:var(--gold);">
          Universal 5-Phase Checklist
        </span>
      </div>

      <div style="display:flex; flex-direction:column; gap:12px; margin-top:14px;">
        <div class="protocol-step-box">
          <h4><span>1️⃣</span> Phase 1: Givens & Boundary Condition Decoding</h4>
          <p>
            Do NOT start calculating immediately. Systematically scan problem statements into mathematical constraints:
            identify sinking supports (Δc < 0), far-end pins (M = 0), fixed clamps (θ = 0), fabrication errors (δL), and thermal gradients (αΔTL).
            Lock these boundary conditions at the top of your paper.
          </p>
          <div class="concept-callout" style="border-left-color:var(--accent); margin-top:6px; padding:6px 10px; font-size:0.82rem;">
            💡 <strong>Pro Rule:</strong> If middle support B sinks, write: ΔB = -δ, (ΔA - ΔB) = +δ.
          </div>
        </div>

        <div class="protocol-step-box">
          <h4><span>2️⃣</span> Phase 2: 5-Second Statical Triage (Ds vs Dk)</h4>
          <p>
            Evaluate statical vs kinematic indeterminacy:
            <br/>• For trusses: Compute Ds = (m + r) - 2j. If Ds = 1 or 2, deploy Force Method!
            <br/>• For continuous beams: Compute number of unknown support moments. If 2 or 3, deploy Three-Moment Equation (Clapeyron)!
            <br/>• For frames with sidesway: Slope-Deflection with column shear equations is 10x safer than Hardy Cross sway balancing.
          </p>
          <div class="concept-callout" style="border-left-color:var(--gold); margin-top:6px; padding:6px 10px; font-size:0.82rem;">
            💡 <strong>Pro Rule:</strong> Never pick a method requiring higher simultaneous equations than its dual.
          </div>
        </div>

        <div class="protocol-step-box">
          <h4><span>3️⃣</span> Phase 3: Sign Lock & Formula Customization</h4>
          <p>
            Lock your signs according to the strict COTM 3101 convention:
            <br/>• <strong>Slope-Deflection:</strong> Rotation θ is (+) Clockwise; Member end moment M is (+) Counter-Clockwise on member. Equation MUST have the MINUS sign: <em>M_ij = M^F - 2EK(2θ_i + θ_j - 3ψ)</em>.
            <br/>• <strong>Hardy Cross:</strong> Moments are (+) Clockwise. If far end is hinged, use modified stiffness K = (3/4)(I/L) and lock COF = 0.
            <br/>• <strong>Conjugate Beam:</strong> Sagging moment = upward (+) load; Hogging = downward (-) load. Real hinge ➔ conjugate roller; Real roller ➔ conjugate hinge.
          </p>
        </div>

        <div class="protocol-step-box">
          <h4><span>4️⃣</span> Phase 4: Deterministic Matrix Assembly & Solution</h4>
          <p>
            Assemble your system systematically. For Three-Moment equations, note the banded tridiagonal structure where each row only contains 3 non-zero entries.
            Use Gaussian back-substitution rather than Cramer's rule to eliminate roundoff errors.
            For trusses, fill the tabular columns: Member, L, A, N0, n1, (n1 N0 L / A), (n1² L / A).
          </p>
        </div>

        <div class="protocol-step-box">
          <h4><span>5️⃣</span> Phase 5: First-Principles Equilibrium & Boundary Check</h4>
          <p>
            NEVER hand in your exam without running the 30-second statical equilibrium check:
            <br/>1. <strong>Joint Moment Balance:</strong> At every rigid joint (e.g. Joint B), verify ∑ M_B = M_BA + M_BC = 0.
            <br/>2. <strong>Global Shear Balance:</strong> For sway frames, verify that column shears equilibrate external lateral load: ∑ H = H_left + H_right + P_lat = 0.
            <br/>3. <strong>Boundary Verification:</strong> Confirm moment at simple end supports with no overhang is identically 0.
          </p>
        </div>
      </div>
    </div>
  `;
}

// DOWNLOAD OFFLINE APP (STANDALONE HTML SINGLE-FILE BUNDLE)
// =========================================================================
function exportStandaloneHTML() {
  const link = document.createElement('a');
  link.href = './standalone.html';
  link.download = 'Theory_of_Structures_Mastery_Lab.html';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// =========================================================================

// =========================================================================
// PRODUCTIVITY SUITE: SPOTLIGHT SEARCH, SCRATCHPAD, FOCUS SPRINT & PRINT
// =========================================================================

// Focus Sprint State
let focusSeconds = 1500; // 25 minutes
let focusRunning = false;
let focusInterval = null;
let focusMode = 'focus'; // 'focus' or 'break'

function toggleFocusSprint() {
  const widget = document.getElementById('focusWidget');
  if (!widget) return;
  const isHidden = widget.style.display === 'none' || !widget.style.display;
  widget.style.display = isHidden ? 'flex' : 'none';
}

function toggleFocusModeType() {
  if (focusRunning) toggleFocusTimer();
  focusMode = focusMode === 'focus' ? 'break' : 'focus';
  focusSeconds = focusMode === 'focus' ? 1500 : 300;
  updateFocusDisplay();
}

function toggleFocusTimer() {
  const playBtn = document.getElementById('focusPlayBtn');
  if (focusRunning) {
    clearInterval(focusInterval);
    focusRunning = false;
    if (playBtn) playBtn.innerText = '▶';
  } else {
    focusRunning = true;
    if (playBtn) playBtn.innerText = '⏸';
    focusInterval = setInterval(() => {
      if (focusSeconds > 0) {
        focusSeconds--;
        updateFocusDisplay();
      } else {
        clearInterval(focusInterval);
        focusRunning = false;
        if (playBtn) playBtn.innerText = '▶';

        if (focusMode === 'focus') {
          userState.xp += 100;
          userState.streak += 1;
          saveState();
          alert("🎉 Engineering Focus Sprint Complete! (+100 XP awarded). Take a 5-minute breather!");
          focusMode = 'break';
          focusSeconds = 300;
        } else {
          alert("⚡ Break concluded! Ready to jump into the next structural problem?");
          focusMode = 'focus';
          focusSeconds = 1500;
        }
        updateFocusDisplay();
      }
    }, 1000);
  }
}

function resetFocusTimer() {
  if (focusRunning) toggleFocusTimer();
  focusSeconds = focusMode === 'focus' ? 1500 : 300;
  updateFocusDisplay();
}

function updateFocusDisplay() {
  const timeEl = document.getElementById('focusTimeDisplay');
  const badgeEl = document.getElementById('focusModeBadge');
  if (!timeEl) return;
  const min = Math.floor(focusSeconds / 60);
  const sec = focusSeconds % 60;
  timeEl.innerText = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  if (badgeEl) {
    badgeEl.innerText = focusMode === 'focus' ? '⚡ 25m Focus' : '☕ 5m Break';
    badgeEl.style.color = focusMode === 'focus' ? 'var(--accent)' : 'var(--gold)';
  }
}

// Global Spotlight Search (Ctrl+K)
function toggleSpotlightSearch() {
  const modal = document.getElementById('searchModal');
  const input = document.getElementById('globalSearchInput');
  if (!modal) return;
  const isHidden = modal.style.display === 'none' || !modal.style.display;
  modal.style.display = isHidden ? 'flex' : 'none';
  if (isHidden && input) {
    input.value = '';
    handleGlobalSearch('');
    setTimeout(() => input.focus(), 50);
  }
}

function handleSearchOverlayClick(e) {
  if (e.target.id === 'searchModal') {
    toggleSpotlightSearch();
  }
}

function handleSearchKeydown(e) {
  if (e.key === 'Escape') {
    toggleSpotlightSearch();
  }
}

function handleGlobalSearch(query) {
  const list = document.getElementById('searchResultsList');
  if (!list) return;

  const q = query.trim().toLowerCase();
  const results = [];

  // Search Modules
  COURSE_MODULES.forEach((m, idx) => {
    if (!q || m.shortTitle.toLowerCase().includes(q) || m.fullTitle.toLowerCase().includes(q)) {
      results.push({
        type: 'Chapter',
        title: m.shortTitle,
        desc: m.prerequisites,
        action: `selectModule(${idx}); toggleSpotlightSearch();`
      });
    }
  });

  // Search Formulas
  FORMULA_ATLAS.forEach((f) => {
    if (!q || f.name.toLowerCase().includes(q) || f.formula.toLowerCase().includes(q) || f.moduleTitle.toLowerCase().includes(q)) {
      results.push({
        type: 'Formula',
        title: f.name,
        desc: f.formula,
        action: `switchAppView('atlas'); searchAtlas('${f.name}'); toggleSpotlightSearch();`
      });
    }
  });

  // Search Solvers
  const solversList = [
    { name: 'Live Beam Playground', key: 'beam' },
    { name: 'Stability & Determinacy', key: 'determinacy' },
    { name: '2-Span Clapeyron Solver', key: 'threemoment' },
    { name: 'Hardy Cross Engine', key: 'hardycross' },
    { name: 'Conjugate Beam Transform', key: 'conjugate' }
  ];
  solversList.forEach(s => {
    if (!q || s.name.toLowerCase().includes(q)) {
      results.push({
        type: 'Solver',
        title: s.name,
        desc: 'Real-time structural engineering sandbox',
        action: `openSandbox('${s.key}'); toggleSpotlightSearch();`
      });
    }
  });

  // Search Video Masterclasses
  COURSE_MODULES.forEach((m, mIdx) => {
    (m.videos || []).forEach(v => {
      if (!q || v.title.toLowerCase().includes(q) || m.shortTitle.toLowerCase().includes(q)) {
        const vidId = extractYouTubeId(v.url) || '';
        results.push({
          type: 'Video 🎥',
          title: v.title,
          desc: `${m.shortTitle} • Masterclass Lecture`,
          action: `selectModule(${mIdx}); switchModuleTab('videos'); openVideoModal('${vidId}', '${v.title.replace(/'/g, "\\'")}', '${v.url}'); toggleSpotlightSearch();`
        });
      }
    });
  });

  list.innerHTML = results.slice(0, 10).map((r, i) => `
    <div class="search-result-item" onclick="${r.action}">
      <div>
        <strong style="color:#fff; font-size:0.92rem;">${r.title}</strong>
        <p style="color:var(--text-muted); font-size:0.78rem; font-family:var(--font-mono); margin-top:2px;">${r.desc}</p>
      </div>
      <span class="search-result-tag">${r.type}</span>
    </div>
  `).join('') || '<p style="color:var(--text-muted); text-align:center; padding:16px;">No structural topics found.</p>';
}

// Persistent Engineering Scratchpad
function toggleScratchpad() {
  const drawer = document.getElementById('scratchpadDrawer');
  if (!drawer) return;
  const isHidden = drawer.style.display === 'none' || !drawer.style.display;
  drawer.style.display = isHidden ? 'flex' : 'none';
  if (isHidden) {
    loadScratchpad();
  }
}

function loadScratchpad() {
  const textEl = document.getElementById('scratchpadText');
  if (textEl) {
    textEl.value = localStorage.getItem('structures_scratchpad') || '';
  }
}

function saveScratchpad() {
  const textEl = document.getElementById('scratchpadText');
  if (textEl) {
    localStorage.setItem('structures_scratchpad', textEl.value);
  }
}

function clearScratchpadText() {
  if (confirm('Clear scratchpad notes?')) {
    const textEl = document.getElementById('scratchpadText');
    if (textEl) {
      textEl.value = '';
      saveScratchpad();
    }
  }
}

function copyScratchpadText() {
  const textEl = document.getElementById('scratchpadText');
  if (textEl && navigator.clipboard) {
    navigator.clipboard.writeText(textEl.value).then(() => alert('Notes copied to clipboard! ✓'));
  }
}

function evalScratchpadCalc(expr) {
  const resEl = document.getElementById('scratchCalcResult');
  if (!resEl) return;
  const clean = expr.replace(/[^0-9+\-*/().^% ]/g, '');
  if (!clean.trim()) {
    resEl.innerText = '= 0.00';
    return;
  }
  try {
    const evaluated = Function('"use strict"; return (' + clean + ')')();
    if (typeof evaluated === 'number' && !isNaN(evaluated)) {
      resEl.innerText = '= ' + evaluated.toFixed(2);
      resEl.style.color = 'var(--success)';
    }
  } catch (e) {
    resEl.innerText = '= ...';
    resEl.style.color = 'var(--text-dim)';
  }
}

// Formula Interactive Quick Calculators
function toggleFormulaCalculator(formId) {
  const panel = document.getElementById('calc_panel_' + formId);
  if (panel) {
    panel.style.display = panel.style.display === 'none' || !panel.style.display ? 'block' : 'none';
  }
}

function calculateFormulaVal(formId) {
  const outEl = document.getElementById('calc_res_' + formId);
  if (!outEl) return;

  if (formId === 'f-0-3') {
    // Hooke: NL / EA
    const N = parseFloat(document.getElementById('input_f03_N').value) || 0;
    const L = parseFloat(document.getElementById('input_f03_L').value) || 0;
    const E = parseFloat(document.getElementById('input_f03_E').value) || 1;
    const A = parseFloat(document.getElementById('input_f03_A').value) || 1;
    const delta = (N * L) / (E * A);
    outEl.innerHTML = 'Result: ΔL = <strong>' + (delta * 1000).toFixed(3) + ' mm</strong> (' + delta.toExponential(3) + ' m)';
  } else if (formId === 'f-0-6') {
    // Flexure: My / I
    const M = parseFloat(document.getElementById('input_f06_M').value) || 0;
    const y = parseFloat(document.getElementById('input_f06_y').value) || 0;
    const I = parseFloat(document.getElementById('input_f06_I').value) || 1;
    const sigma = (M * y) / I;
    outEl.innerHTML = 'Result: σ = <strong>' + sigma.toFixed(2) + ' kN/m² (kPa)</strong>';
  } else if (formId === 'f-1-2') {
    // Truss: (m + r) - 2j
    const m = parseInt(document.getElementById('input_f12_m').value) || 0;
    const r = parseInt(document.getElementById('input_f12_r').value) || 0;
    const j = parseInt(document.getElementById('input_f12_j').value) || 0;
    const D = (m + r) - 2 * j;
    outEl.innerHTML = 'Result: D = <strong>' + D + '</strong> ' + (D === 0 ? '(Determinate)' : D > 0 ? '(Indeterminate to degree ' + D + ')' : '(Unstable Mechanism)');
  } else if (formId === 'f-5-2') {
    // 6Ax/L UDL: wL^3 / 4
    const w = parseFloat(document.getElementById('input_f52_w').value) || 0;
    const L = parseFloat(document.getElementById('input_f52_L').value) || 0;
    const term = (w * Math.pow(L, 3)) / 4;
    outEl.innerHTML = 'Result: 6Ax/L = <strong>' + term.toFixed(2) + ' kN·m²</strong>';
  } else if (formId === 'f-6-1') {
    // Slope-Deflection: M_AB = M_F - 2EK(2 theta_A + theta_B - 3 delta / L)
    const MF = parseFloat(document.getElementById('input_f61_MF').value) || 0;
    const EK = parseFloat(document.getElementById('input_f61_EK').value) || 1;
    const tA = parseFloat(document.getElementById('input_f61_tA').value) || 0;
    const tB = parseFloat(document.getElementById('input_f61_tB').value) || 0;
    const dL = parseFloat(document.getElementById('input_f61_dL').value) || 0;
    const M = MF - 2 * EK * (2 * tA + tB - 3 * dL);
    outEl.innerHTML = 'Result: M_AB = <strong>' + M.toFixed(2) + ' kN·m</strong>';
  }
}

// Print Exam Study Guide
function printStudyGuide() {
  window.print();
}

// Global Keyboard Shortcuts
window.addEventListener('keydown', (e) => {
  // Ignore inside inputs
  if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
    if (e.key === 'Escape') {
      const modal = document.getElementById('searchModal');
      if (modal && modal.style.display === 'flex') toggleSpotlightSearch();
    }
    return;
  }

  if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
    e.preventDefault();
    toggleSpotlightSearch();
  } else if (e.key === '/') {
    e.preventDefault();
    toggleSpotlightSearch();
  } else if (e.altKey && (e.key === 's' || e.key === 'S')) {
    e.preventDefault();
    toggleScratchpad();
  } else if (e.altKey && (e.key === 'f' || e.key === 'F')) {
    e.preventDefault();
    toggleFocusSprint();
  } else if (currentAppView === 'sprint') {
    if (['1', 'a', 'A'].includes(e.key)) {
      e.preventDefault();
      handleSprintAnswer(0);
    } else if (['2', 'b', 'B'].includes(e.key)) {
      e.preventDefault();
      handleSprintAnswer(1);
    } else if (['3', 'c', 'C'].includes(e.key)) {
      e.preventDefault();
      handleSprintAnswer(2);
    } else if (['4', 'd', 'D'].includes(e.key)) {
      e.preventDefault();
      handleSprintAnswer(3);
    } else if ((e.key === 'Enter' || e.key === ' ') && sprintAnswered) {
      e.preventDefault();
      advanceSprintQuestion();
    } else if (e.key === 'p' || e.key === 'P') {
      e.preventDefault();
      toggleSprintPause();
    }
  } else if (e.key >= '1' && e.key <= '6' && currentAppView === 'module') {
    const tabs = ['theory', 'guided', 'shortcuts', 'arena', 'cheatsheet', 'videos'];
    switchModuleTab(tabs[parseInt(e.key) - 1]);
  } else if (e.key === 'Escape') {
    const modal = document.getElementById('searchModal');
    if (modal && modal.style.display === 'flex') toggleSpotlightSearch();
    const vidModal = document.getElementById('videoModal');
    if (vidModal && vidModal.style.display === 'flex') closeVideoModal();
    const drawer = document.getElementById('scratchpadDrawer');
    if (drawer && drawer.style.display === 'flex') toggleScratchpad();
  }
});

// APP INITIALIZATION
// =========================================================================
window.addEventListener('DOMContentLoaded', () => {
  loadState();
  startExamTimer();
  renderSidebar();
  renderMainView();

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then((reg) => {
      reg.update();
      console.log('PWA Service Worker Active (v10) - 100% Offline Ready!');
    }).catch(e => console.log('SW registration note:', e));
  }
});


function graduateSpacedRepetition(qId) {
  if (userState.spacedRepetition && userState.spacedRepetition[qId]) {
    userState.spacedRepetition[qId].box = (userState.spacedRepetition[qId].box || 1) + 1;
    userState.xp += 75;
    if (userState.spacedRepetition[qId].box > 4) {
      delete userState.spacedRepetition[qId];
      alert('Congratulations! This problem has been fully mastered and graduated from the Spaced Repetition queue (+75 XP)!');
    } else {
      alert('Card graduated to Box ' + userState.spacedRepetition[qId].box + ' (+75 XP)! Review interval extended.');
    }
    saveState();
    renderMainView();
  }
}


// =========================================================================
// EXTENSIONS: QUESTION BANK, DECISION TREES, DIAGNOSTIC & SOURCES
// =========================================================================

// Extension functions for app.js: Question Bank, Decision Trees, Diagnostic Skill Map, Source Register

// Global state for views
let activeProblemId = 'qb-found-01';
let qbFilterSubject = 'all';
let qbFilterDifficulty = 'all';
let qbFilterTopic = 'all';
let qbFilterStatus = 'all';
let qbSearchQuery = '';

let activeTreeId = 'dt-deflection-method';
let activeTreeNodeId = 'root';
let treeHistory = ['root'];

let diagAnswers = {};
let diagCurrentIdx = 0;

// Initialize userState extensions
if (typeof userState !== 'undefined') {
  if (!userState.bankSolved) userState.bankSolved = {};
  if (!userState.spacedRepetition) userState.spacedRepetition = {};
  if (!userState.mistakeLog) userState.mistakeLog = [];
  if (!userState.diagnosticScores) userState.diagnosticScores = null;
}

// =========================================================================
// 1. QUESTION BANK HUB VIEW
// =========================================================================
function renderQuestionBankView(viewport) {
  if (typeof QUESTION_BANK === 'undefined') {
    viewport.innerHTML = `<div style="padding:20px; color:#fff;">Loading Question Bank...</div>`;
    return;
  }

  const counts = getVerifiedCount ? getVerifiedCount() : { total: QUESTION_BANK.length, foundations: 35, deflections: 35, indeterminate: 35, verified: 105 };
  const solvedCount = Object.keys(userState.bankSolved || {}).length;
  const pctSolved = Math.round((solvedCount / QUESTION_BANK.length) * 100);

  // Filter questions
  let filtered = QUESTION_BANK.slice();
  if (qbFilterSubject !== 'all') {
    filtered = filtered.filter(q => q.subject === qbFilterSubject);
  }
  if (qbFilterDifficulty !== 'all') {
    filtered = filtered.filter(q => q.difficulty === parseInt(qbFilterDifficulty, 10));
  }
  if (qbFilterTopic !== 'all') {
    filtered = filtered.filter(q => q.topic === qbFilterTopic);
  }
  if (qbFilterStatus === 'solved') {
    filtered = filtered.filter(q => userState.bankSolved && userState.bankSolved[q.id]);
  } else if (qbFilterStatus === 'unsolved') {
    filtered = filtered.filter(q => !(userState.bankSolved && userState.bankSolved[q.id]));
  }
  if (qbSearchQuery.trim()) {
    const q = qbSearchQuery.toLowerCase();
    filtered = filtered.filter(item => 
      item.id.toLowerCase().includes(q) ||
      item.topic.toLowerCase().includes(q) ||
      item.subtopic.toLowerCase().includes(q) ||
      item.problemText.toLowerCase().includes(q)
    );
  }

  // Extract all unique topics for current subject
  const topicsPool = (qbFilterSubject === 'all') 
    ? QUESTION_BANK 
    : QUESTION_BANK.filter(q => q.subject === qbFilterSubject);
  const uniqueTopics = Array.from(new Set(topicsPool.map(q => q.topic))).sort();

  viewport.innerHTML = `
    <div class="qb-hub-container">
      <!-- HEADER BANNER -->
      <div class="qb-banner">
        <div class="qb-banner-info">
          <h2>📚 105 Verified Exam Question Bank</h2>
          <p>Complete curriculum aligned with EiABC / AAU COTM 3101: Theory of Structures examination standards.</p>
        </div>
        <div class="qb-stat-counters">
          <div class="qb-counter-pill">Total: <strong>${counts.total}</strong></div>
          <div class="qb-counter-pill">Foundations: <strong>${counts.foundations}</strong></div>
          <div class="qb-counter-pill">Deflections: <strong>${counts.deflections}</strong></div>
          <div class="qb-counter-pill">Indeterminate: <strong>${counts.indeterminate}</strong></div>
          <div class="qb-counter-pill" style="border-color:var(--success);">Mastered: <strong style="color:var(--success);">${solvedCount} (${pctSolved}%)</strong></div>
        </div>
      </div>

      <!-- FILTER & SEARCH TOOLBAR -->
      <div class="qb-controls-bar">
        <div class="qb-search-row">
          <span style="color:var(--accent); font-size:1rem;">🔍</span>
          <input type="text" class="qb-search-input" placeholder="Search 105 problems by keyword, load type, reaction, method, or ID (e.g. 'Gerber', 'settlement', 'qb-defl-03')..." value="${escapeHtml(qbSearchQuery)}" oninput="handleQBSearch(this.value)" />
          ${qbSearchQuery ? `<button class="hud-btn" onclick="handleQBSearch('')" style="padding:6px 10px;">Clear</button>` : ''}
        </div>

        <div style="display:flex; flex-direction:column; gap:8px;">
          <!-- Subject Filter Pills -->
          <div class="qb-filter-group">
            <span class="qb-filter-label">Domain:</span>
            <button class="qb-filter-pill ${qbFilterSubject === 'all' ? 'active' : ''}" onclick="setQBFilterSubject('all')">All Domains (105)</button>
            <button class="qb-filter-pill ${qbFilterSubject === 'foundations' ? 'active' : ''}" onclick="setQBFilterSubject('foundations')">1. Foundations & Statics (35)</button>
            <button class="qb-filter-pill ${qbFilterSubject === 'deflections' ? 'active' : ''}" onclick="setQBFilterSubject('deflections')">2. Beam Slopes & Deflections (35)</button>
            <button class="qb-filter-pill ${qbFilterSubject === 'indeterminate' ? 'active' : ''}" onclick="setQBFilterSubject('indeterminate')">3. Indeterminate Analysis (35)</button>
          </div>

          <!-- Difficulty & Status Filter Pills -->
          <div class="qb-filter-group">
            <span class="qb-filter-label">Level:</span>
            <button class="qb-filter-pill ${qbFilterDifficulty === 'all' ? 'active' : ''}" onclick="setQBFilterDifficulty('all')">All</button>
            <button class="qb-filter-pill ${qbFilterDifficulty === '1' ? 'active' : ''}" onclick="setQBFilterDifficulty('1')">⭐ L1 Fundamental</button>
            <button class="qb-filter-pill ${qbFilterDifficulty === '2' ? 'active' : ''}" onclick="setQBFilterDifficulty('2')">⭐⭐ L2 Core</button>
            <button class="qb-filter-pill ${qbFilterDifficulty === '3' ? 'active' : ''}" onclick="setQBFilterDifficulty('3')">⭐⭐⭐ L3 Exam Standard</button>
            <button class="qb-filter-pill ${qbFilterDifficulty === '4' ? 'active' : ''}" onclick="setQBFilterDifficulty('4')">⭐⭐⭐⭐ L4 Advanced</button>
            <button class="qb-filter-pill ${qbFilterDifficulty === '5' ? 'active' : ''}" onclick="setQBFilterDifficulty('5')">⭐⭐⭐⭐⭐ L5 Mastery</button>

            <span class="qb-filter-label" style="margin-left:12px;">Status:</span>
            <button class="qb-filter-pill ${qbFilterStatus === 'all' ? 'active' : ''}" onclick="setQBFilterStatus('all')">All</button>
            <button class="qb-filter-pill ${qbFilterStatus === 'unsolved' ? 'active' : ''}" onclick="setQBFilterStatus('unsolved')">Unsolved</button>
            <button class="qb-filter-pill ${qbFilterStatus === 'solved' ? 'active' : ''}" onclick="setQBFilterStatus('solved')">Mastered</button>
          </div>

          <!-- Topic Dropdown -->
          <div class="qb-filter-group" style="margin-top:2px;">
            <span class="qb-filter-label">Topic Filter:</span>
            <select class="qb-search-input" style="max-width:380px; padding:6px 10px; font-size:0.8rem;" onchange="setQBFilterTopic(this.value)">
              <option value="all">All Topics (${topicsPool.length} problems)</option>
              ${uniqueTopics.map(t => {
                const count = topicsPool.filter(q => q.topic === t).length;
                return `<option value="${escapeHtml(t)}" ${qbFilterTopic === t ? 'selected' : ''}>${escapeHtml(t)} (${count})</option>`;
              }).join('')}
            </select>
            <span style="font-size:0.75rem; color:var(--text-muted); margin-left:auto;">Showing <strong>${filtered.length}</strong> of ${QUESTION_BANK.length} problems</span>
          </div>
        </div>
      </div>

      <!-- QUESTIONS GRID -->
      ${filtered.length === 0 ? `
        <div style="background:var(--bg-card); border:1px solid var(--border); border-radius:10px; padding:40px; text-align:center; color:var(--text-muted);">
          <div style="font-size:2rem; margin-bottom:8px;">🔍</div>
          <p>No questions matched your active filters.</p>
          <button class="btn-primary" style="margin-top:14px; padding:6px 14px;" onclick="resetQBFilters()">Reset All Filters</button>
        </div>
      ` : `
        <div class="qb-grid">
          ${filtered.map(q => renderQBCard(q)).join('')}
        </div>
      `}
    </div>
  `;
}

function renderQBCard(q) {
  const isSolved = userState.bankSolved && userState.bankSolved[q.id];
  const stars = "★".repeat(q.difficulty) + "☆".repeat(5 - q.difficulty);
  const tagClass = q.subject === 'foundations' ? 'qb-tag-foundations' : (q.subject === 'deflections' ? 'qb-tag-deflections' : 'qb-tag-indeterminate');
  const subjName = q.subject === 'foundations' ? 'Foundations' : (q.subject === 'deflections' ? 'Deflections' : 'Indeterminate');

  return `
    <div class="qb-card ${isSolved ? 'is-solved' : ''}" id="card_${q.id}">
      <div class="qb-card-header">
        <div style="display:flex; align-items:center; gap:6px;">
          <span class="qb-id-badge">${q.id}</span>
          <span class="qb-subject-tag ${tagClass}">${subjName}</span>
        </div>
        <div class="qb-difficulty-stars" title="Difficulty Level ${q.difficulty}/5">${stars}</div>
      </div>

      <div>
        <div class="qb-topic-title">${escapeHtml(q.subtopic || q.topic)}</div>
        <div class="qb-problem-snippet" style="margin-top:6px;">${escapeHtml(q.problemText)}</div>
      </div>

      <div class="qb-card-meta">
        <span>⏱️ ~${q.estimatedTimeMinutes} min</span>
        <span>${isSolved ? '✓ Mastered (+50 XP)' : 'Unsolved'}</span>
        <button class="qb-solve-btn" onclick="openProblemWorkspace('${q.id}')">
          ${isSolved ? 'Review Solution ➔' : 'Solve Problem ➔'}
        </button>
      </div>
    </div>
  `;
}

function handleQBSearch(val) {
  qbSearchQuery = val;
  renderMainView();
}

function setQBFilterSubject(s) {
  qbFilterSubject = s;
  qbFilterTopic = 'all';
  renderMainView();
}

function setQBFilterDifficulty(d) {
  qbFilterDifficulty = d;
  renderMainView();
}

function setQBFilterTopic(t) {
  qbFilterTopic = t;
  renderMainView();
}

function setQBFilterStatus(st) {
  qbFilterStatus = st;
  renderMainView();
}

function resetQBFilters() {
  qbFilterSubject = 'all';
  qbFilterDifficulty = 'all';
  qbFilterTopic = 'all';
  qbFilterStatus = 'all';
  qbSearchQuery = '';
  renderMainView();
}

// Open Interactive Problem Workspace
function openProblemWorkspace(qId) {
  activeProblemId = qId;
  currentAppView = 'solver';
  updateTopNavUI();
  updateMobileNavUI();
  renderSidebar();
  renderMainView();
}

console.log('App extensions part 1 (Question Bank Hub) loaded.');


// Part 2: Interactive Problem Workspace, Decision Trees, Diagnostic & Error Vault

let solverSelectedMethod = null;
let solverMethodFeedback = null;
let solverStepsRevealed = 1;
let solverActiveHint = 0;
let solverUserAnswer = "";
let solverAnswerResult = null;

// =========================================================================
// 2. INTERACTIVE PROBLEM WORKSPACE ("Solve-Any-Problem Protocol")
// =========================================================================
function renderProblemWorkspaceView(viewport) {
  const q = getQuestionById(activeProblemId);
  if (!q) {
    viewport.innerHTML = `<div style="padding:20px; color:#fff;">Question ${activeProblemId} not found. <button class="btn-primary" onclick="switchAppView('bank')">Back to Bank</button></div>`;
    return;
  }

  // Find index in bank for previous / next navigation
  const currentIdx = QUESTION_BANK.findIndex(item => item.id === q.id);
  const prevQ = currentIdx > 0 ? QUESTION_BANK[currentIdx - 1] : null;
  const nextQ = currentIdx < QUESTION_BANK.length - 1 ? QUESTION_BANK[currentIdx + 1] : null;
  const isSolved = userState.bankSolved && userState.bankSolved[q.id];

  // Prepare method choices for the Method Selector challenge
  const allMethodChoices = [
    { name: q.primaryMethod.name, isPrimary: true, justification: q.primaryMethod.justification }
  ];
  if (Array.isArray(q.alternativeMethods)) {
    q.alternativeMethods.forEach(alt => {
      allMethodChoices.push({ name: alt.name, isPrimary: false, justification: alt.applicability || "Valid alternative method, but primary method provides simpler calculations or direct boundary satisfaction." });
    });
  }
  // Add common distractor method
  if (allMethodChoices.length < 3) {
    if (q.subject === 'foundations') {
      allMethodChoices.push({ name: "Three-Moment Equation", isPrimary: false, justification: "Three-Moment Equation is designed for indeterminate continuous beams, not statically determinate single spans." });
    } else if (q.subject === 'deflections') {
      allMethodChoices.push({ name: "Slope-Deflection Method", isPrimary: false, justification: "Slope-Deflection is an indeterminate analysis tool; this problem is statically determinate and requires direct integration or geometric deflection methods." });
    } else {
      allMethodChoices.push({ name: "Direct Double Integration with 4 boundary constants", isPrimary: false, justification: "Far too laborious for indeterminate continuous systems; requires solving 4 simultaneous boundary constants." });
    }
  }

  const stars = "★".repeat(q.difficulty) + "☆".repeat(5 - q.difficulty);

  viewport.innerHTML = `
    <div class="solver-container">
      <!-- TOP NAVIGATION BAR -->
      <div class="solver-nav-header">
        <button class="solver-back-btn" onclick="switchAppView('bank')">
          ← Back to Question Bank (${QUESTION_BANK.length} Problems)
        </button>
        <div style="display:flex; gap:8px;">
          ${prevQ ? `<button class="solver-back-btn" onclick="openProblemWorkspace('${prevQ.id}')" title="Previous Question">◀ ${prevQ.id}</button>` : ''}
          <span style="font-family:var(--font-mono); font-size:0.82rem; color:var(--accent); display:flex; align-items:center;">Problem ${currentIdx + 1} of ${QUESTION_BANK.length}</span>
          ${nextQ ? `<button class="solver-back-btn" onclick="openProblemWorkspace('${nextQ.id}')" title="Next Question">${nextQ.id} ▶</button>` : ''}
        </div>
      </div>

      <!-- PROBLEM CARD -->
      <div class="solver-meta-card">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:10px;">
          <div>
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
              <span class="qb-id-badge">${q.id}</span>
              <span style="font-size:0.75rem; color:var(--text-muted);">${escapeHtml(q.topic)}</span>
              <span class="qb-difficulty-stars">${stars}</span>
            </div>
            <h2 style="font-size:1.15rem; color:#fff; font-weight:700;">${escapeHtml(q.subtopic || q.topic)}</h2>
          </div>
          <div style="text-align:right;">
            <span style="font-size:0.72rem; color:var(--text-dim); display:block;">Source: ${escapeHtml(q.sourceReference)}</span>
            <span style="font-size:0.72rem; color:var(--accent); font-weight:600;">✓ Verified Academic Problem</span>
          </div>
        </div>

        <!-- Problem Statement -->
        <div class="solver-problem-text">
          ${escapeHtml(q.problemText)}
        </div>

        <!-- Structural Description -->
        <div style="font-size:0.78rem; color:var(--text-muted); background:rgba(15, 23, 42, 0.5); padding:8px 12px; border-radius:6px; border:1px solid var(--border);">
          <strong>Structural Type:</strong> ${escapeHtml(q.structuralType)} &bull; 
          <strong>Geometry & Loading:</strong> ${escapeHtml(q.diagramDesc || 'See diagram description')}
        </div>

        <!-- Givens & Requested Unknowns Grid -->
        <div style="display:flex; flex-direction:column; gap:6px;">
          <span style="font-size:0.75rem; font-weight:600; color:var(--text-dim); text-transform:uppercase;">1. Problem Deconstruction (Givens & Unknowns):</span>
          <div class="solver-givens-grid">
            ${q.givens.map(g => `
              <div class="solver-given-pill">
                <span>${escapeHtml(g.key)}</span>
                <span>${g.val} ${escapeHtml(g.unit)}</span>
              </div>
            `).join('')}
            ${q.requestedUnknowns.map(u => `
              <div class="solver-given-pill" style="border-color:rgba(56, 189, 248, 0.4);">
                <span style="color:#fff;">Find: <strong>${escapeHtml(u.name)}</strong> (${escapeHtml(u.symbol)})</span>
                <span style="color:var(--gold);">[ ${escapeHtml(u.expectedUnit)} ]</span>
              </div>
            `).join('')}
          </div>
          <div style="font-size:0.75rem; color:var(--text-muted); margin-top:2px;">
            <strong>Assumptions & Conventions:</strong> ${escapeHtml(q.assumptionsAndConventions)}
          </div>
        </div>
      </div>

      <!-- STEP 1: METHOD SELECTOR CHALLENGE -->
      <div class="method-challenge-box">
        <div class="method-challenge-title">
          <span>🥋 Step 1: Method Selector Challenge</span>
          <span style="font-size:0.75rem; font-weight:400; color:var(--text-muted); margin-left:auto;">Choose the optimal method before revealing calculations</span>
        </div>
        <p style="font-size:0.82rem; color:var(--text-muted);">
          Exam pressure test: Which structural engineering method is most appropriate and efficient for this scenario?
        </p>

        <div class="method-options-list">
          ${allMethodChoices.map((m, mIdx) => {
            const isSelected = solverSelectedMethod === m.name;
            const cls = isSelected ? (m.isPrimary ? 'selected-correct' : 'selected-wrong') : '';
            return `
              <div class="method-option-card ${cls}" onclick="checkMethodSelection('${q.id}', '${escapeHtml(m.name)}')">
                <span style="color:var(--accent); font-weight:700;">${mIdx + 1}.</span>
                <div style="flex:1;">
                  <strong style="color:#fff; display:block;">${escapeHtml(m.name)}</strong>
                  ${isSelected ? `
                    <div style="margin-top:6px; font-size:0.78rem; color:${m.isPrimary ? 'var(--success)' : 'var(--danger)'};">
                      ${m.isPrimary ? '✓ CORRECT & OPTIMAL!' : 'ℹ️ Alternative / Inefficient: '} ${escapeHtml(m.justification)}
                    </div>
                  ` : ''}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- STEP 2: STEP-BY-STEP SOLUTION -->
      <div class="solver-steps-section">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <h3 style="font-size:0.95rem; color:#fff; font-weight:700;">🔬 Step 2: Step-by-Step Mathematical Derivations</h3>
          <div style="display:flex; gap:8px;">
            <button class="solver-hint-btn" onclick="revealAllSteps(${q.stepByStepSolution.length})">Reveal All Steps</button>
            <button class="solver-hint-btn" onclick="revealNextStep(${q.stepByStepSolution.length})">Next Step (+1) ➔</button>
          </div>
        </div>

        ${q.stepByStepSolution.slice(0, solverStepsRevealed).map((stepText, sIdx) => `
          <div class="solver-step-card">
            <div class="solver-step-header" onclick="toggleStep(${sIdx})">
              <span>Step ${sIdx + 1} of ${q.stepByStepSolution.length}</span>
              <span style="font-size:0.72rem; color:var(--accent);">✓ Verified Step</span>
            </div>
            <div class="solver-step-body" id="step_body_${sIdx}">
              ${formatStepFormulaText(escapeHtml(stepText))}
            </div>
          </div>
        `).join('')}

        ${solverStepsRevealed < q.stepByStepSolution.length ? `
          <div style="text-align:center; padding:10px;">
            <button class="btn-primary" style="padding:6px 16px; font-size:0.8rem;" onclick="revealNextStep(${q.stepByStepSolution.length})">
              Reveal Step ${solverStepsRevealed + 1} of ${q.stepByStepSolution.length} ➔
            </button>
          </div>
        ` : ''}
      </div>

      <!-- STEP 3: NUMERICAL ANSWER & VERIFICATION -->
      <div class="solver-answer-box">
        <h3 style="font-size:0.92rem; color:#fff; font-weight:700;">🎯 Step 3: Verified Final Answer & Self-Check</h3>
        <div class="solver-final-display">
          ${escapeHtml(q.finalAnswer.text)}
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
          <span style="font-size:0.78rem; color:var(--text-muted);">Self-Evaluation: Did your own hand calculations match this verified result?</span>
          <button class="btn-primary" style="padding:6px 14px; font-size:0.8rem; background:var(--success); border-color:var(--success); color:#fff;" onclick="markProblemSolved('${q.id}')">
            ${isSolved ? '✓ Marked as Mastered' : '✓ I Got It Right! (+50 XP)'}
          </button>
        </div>
      </div>

      <!-- STEP 4: 3-LEVEL PROGRESSIVE HINT LADDER -->
      <div class="solver-hints-box">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
          <h4 style="font-size:0.85rem; color:#fff; font-weight:700;">💡 Step 4: 3-Level Progressive Hint Ladder</h4>
          <div class="solver-hint-buttons">
            <button class="solver-hint-btn ${solverActiveHint === 1 ? 'active' : ''}" onclick="selectHint(1)">Hint 1: Strategy</button>
            <button class="solver-hint-btn ${solverActiveHint === 2 ? 'active' : ''}" onclick="selectHint(2)">Hint 2: Equation</button>
            <button class="solver-hint-btn ${solverActiveHint === 3 ? 'active' : ''}" onclick="selectHint(3)">Hint 3: Execution</button>
            ${solverActiveHint > 0 ? `<button class="solver-hint-btn" onclick="selectHint(0)">Hide Hints</button>` : ''}
          </div>
        </div>

        ${solverActiveHint > 0 ? `
          <div class="solver-hint-text">
            <strong>Hint Level ${solverActiveHint}:</strong> ${escapeHtml(q.hintLadder[solverActiveHint - 1])}
          </div>
        ` : `
          <p style="font-size:0.78rem; color:var(--text-dim); margin-top:4px;">Stuck on a step? Unlock hints progressively from conceptual strategy to specific execution without giving away the full answer immediately.</p>
        `}
      </div>

      <!-- STEP 5: INDEPENDENT ENGINEERING CHECKS -->
      <div style="background:var(--bg-card); border:1px solid var(--border); border-radius:10px; padding:14px 18px;">
        <h4 style="font-size:0.85rem; color:#fff; font-weight:700; margin-bottom:6px; display:flex; align-items:center; gap:6px;">
          <span>🔍 Step 5: Independent Engineering Checks</span>
        </h4>
        <p style="font-size:0.82rem; color:var(--text-main); line-height:1.5;">
          ${escapeHtml(q.independentChecks)}
        </p>
      </div>

      <!-- STEP 6: MISCONCEPTION DIAGNOSIS & ERROR LOGGING -->
      <div class="solver-error-logger">
        <h4 style="font-size:0.85rem; color:var(--danger); font-weight:700; display:flex; align-items:center; gap:6px;">
          <span>⚠️ Step 6: Common Misconceptions & Error Vault</span>
        </h4>
        <p style="font-size:0.82rem; color:var(--text-main); line-height:1.5;">
          <strong>Frequent Student Trap:</strong> ${escapeHtml(q.commonMisconceptions)}
        </p>
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-top:6px; padding-top:8px; border-top:1px solid rgba(244, 63, 94, 0.2);">
          <span style="font-size:0.76rem; color:var(--text-muted);">Made a mistake or got confused on this problem?</span>
          <button class="hud-btn" style="border-color:var(--danger); color:var(--danger); font-size:0.78rem;" onclick="logProblemMistake('${q.id}')">
            📓 Log to Error Vault for Spaced Repetition ➔
          </button>
        </div>
      </div>
    </div>
  `;
}

function checkMethodSelection(qId, methodName) {
  const q = getQuestionById(qId);
  if (!q) return;
  solverSelectedMethod = methodName;
  const isCorrect = (methodName === q.primaryMethod.name);
  if (isCorrect) {
    userState.xp += 25;
    saveState();
  }
  renderMainView();
}

function revealNextStep(maxSteps) {
  if (solverStepsRevealed < maxSteps) {
    solverStepsRevealed++;
    renderMainView();
  }
}

function revealAllSteps(maxSteps) {
  solverStepsRevealed = maxSteps;
  renderMainView();
}

function selectHint(hintNum) {
  solverActiveHint = hintNum;
  renderMainView();
}

function markProblemSolved(qId) {
  if (!userState.bankSolved) userState.bankSolved = {};
  if (!userState.bankSolved[qId]) {
    userState.bankSolved[qId] = { solvedAt: Date.now(), attempts: 1 };
    userState.xp += 50;
    userState.streak = (userState.streak || 0) + 1;
    saveState();
    showXPToast(50, 'Problem Mastered! 🎯'); SoundEngine.playCorrect(); if (typeof userState !== "undefined") { userState.dailyBankDone = (userState.dailyBankDone || 0) + 1; checkDailyMissionComplete(); }
  }
  renderMainView();
}

function logProblemMistake(qId) {
  const q = getQuestionById(qId);
  if (!q) return;

  const taxonomyOptions = MISTAKE_TAXONOMY.map(m => `${m.code}: ${m.name}`).join('\n');
  const userChoice = prompt(`Identify the root cause of your mistake:\n\n${taxonomyOptions}\n\nEnter Mistake Code (e.g. M01, M05, M12):`, "M01");
  if (!userChoice) return;

  const code = userChoice.trim().toUpperCase();
  const matched = MISTAKE_TAXONOMY.find(m => m.code === code) || MISTAKE_TAXONOMY[0];

  if (!userState.mistakeLog) userState.mistakeLog = [];
  userState.mistakeLog.push({
    questionId: qId,
    mistakeCode: matched.code,
    timestamp: Date.now()
  });

  // Add to Spaced Repetition queue
  if (!userState.spacedRepetition) userState.spacedRepetition = {};
  userState.spacedRepetition[qId] = {
    box: 1,
    nextDue: Date.now() + 24 * 3600 * 1000, // Due in 1 day
    mistakeCode: matched.code
  };

  saveState();
  alert(`Logged mistake [${matched.code}: ${matched.name}] to your Error Vault. Scheduled for Spaced Repetition Review in 24 hours!`);
}

// =========================================================================
// 3. INTERACTIVE DECISION TREES VIEW
// =========================================================================
function renderDecisionTreesView(viewport) {
  if (typeof DECISION_TREES === 'undefined') {
    viewport.innerHTML = `<div style="padding:20px; color:#fff;">Loading Decision Trees...</div>`;
    return;
  }

  const activeTree = DECISION_TREES.find(t => t.id === activeTreeId) || DECISION_TREES[0];
  const currentNode = activeTree.nodes[activeTreeNodeId] || activeTree.nodes.root;

  viewport.innerHTML = `
    <div class="trees-container">
      <!-- HEADER -->
      <div class="qb-banner">
        <div class="qb-banner-info">
          <h2>🌲 6 Interactive Method-Selection Decision Trees</h2>
          <p>Systematically diagnose structural scenarios, boundary constraints, and select the highest-scoring exam method.</p>
        </div>
      </div>

      <!-- TREE SELECTOR TABS -->
      <div class="tree-picker-grid">
        ${DECISION_TREES.map(t => `
          <div class="tree-picker-card ${t.id === activeTreeId ? 'active' : ''}" onclick="selectDecisionTree('${t.id}')">
            <span class="tree-picker-title">${escapeHtml(t.title)}</span>
            <span class="tree-picker-desc">${escapeHtml(t.description)}</span>
          </div>
        `).join('')}
      </div>

      <!-- ACTIVE TREE TRAVERSAL BOX -->
      <div class="tree-active-node-box">
        <!-- Breadcrumbs -->
        <div class="tree-breadcrumbs">
          <span>Root</span>
          ${treeHistory.slice(1).map((nodeKey, idx) => `
            <span>➔</span>
            <span>Step ${idx + 1}</span>
          `).join('')}
          ${treeHistory.length > 1 ? `
            <button class="hud-btn" style="margin-left:auto; padding:3px 8px; font-size:0.72rem;" onclick="stepBackDecisionTree()">↶ Previous Step</button>
            <button class="hud-btn" style="padding:3px 8px; font-size:0.72rem;" onclick="resetDecisionTree()">↺ Restart Tree</button>
          ` : ''}
        </div>

        <!-- Node Prompt -->
        <div class="tree-prompt">
          ${escapeHtml(currentNode.prompt)}
        </div>

        <!-- If leaf node (Recommendation) -->
        ${currentNode.isLeaf ? `
          <div class="tree-recommendation-box">
            <div style="font-size:1.1rem; font-weight:700; color:var(--success); display:flex; align-items:center; gap:8px;">
              <span>🏆 ${escapeHtml(currentNode.recommendedMethod)}</span>
            </div>
            <p style="font-size:0.88rem; color:#fff; line-height:1.5;">
              ${escapeHtml(currentNode.recommendation)}
            </p>
            <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap; margin-top:8px;">
              <button class="btn-primary" style="padding:8px 16px; font-size:0.82rem;" onclick="openQBFilteredByTree('${escapeHtml(currentNode.matchingTopics ? currentNode.matchingTopics[0] : '')}')">
                📚 Practice Problems Using This Method ➔
              </button>
              <button class="hud-btn" style="padding:8px 14px; font-size:0.82rem;" onclick="resetDecisionTree()">
                ↺ Run Another Scenario
              </button>
            </div>
          </div>
        ` : `
          <!-- Options to branch -->
          <div class="tree-options-list">
            ${currentNode.options.map((opt, optIdx) => `
              <button class="tree-option-btn" onclick="advanceDecisionTree('${opt.next}')">
                <span><strong>${String.fromCharCode(65 + optIdx)}.</strong> ${escapeHtml(opt.text)}</span>
                <span style="color:var(--accent);">➔</span>
              </button>
            `).join('')}
          </div>
        `}
      </div>
    </div>
  `;
}

function selectDecisionTree(treeId) {
  activeTreeId = treeId;
  activeTreeNodeId = 'root';
  treeHistory = ['root'];
  renderMainView();
}

function advanceDecisionTree(nextNodeId) {
  activeTreeNodeId = nextNodeId;
  treeHistory.push(nextNodeId);
  renderMainView();
}

function stepBackDecisionTree() {
  if (treeHistory.length > 1) {
    treeHistory.pop();
    activeTreeNodeId = treeHistory[treeHistory.length - 1];
    renderMainView();
  }
}

function resetDecisionTree() {
  activeTreeNodeId = 'root';
  treeHistory = ['root'];
  renderMainView();
}

function openQBFilteredByTree(topic) {
  qbFilterTopic = topic || 'all';
  switchAppView('bank');
}

// =========================================================================
// 4. DIAGNOSTIC ASSESSMENT & PERSONAL SKILL MAP
// =========================================================================
function renderDiagnosticView(viewport) {
  if (typeof DIAGNOSTIC_ASSESSMENT === 'undefined') {
    viewport.innerHTML = `<div style="padding:20px; color:#fff;">Loading Diagnostic Assessment...</div>`;
    return;
  }

  const scores = userState.diagnosticScores;

  viewport.innerHTML = `
    <div class="diag-container">
      <!-- HEADER BANNER -->
      <div class="qb-banner">
        <div class="qb-banner-info">
          <h2>🎯 Diagnostic Assessment & Personal Skill Map</h2>
          <p>12-question diagnostic test calibrated to measure the 5 core structural engineering abilities under university exam conditions.</p>
        </div>
      </div>

      <!-- PERSONAL SKILL MAP (If already taken) -->
      ${scores ? renderPersonalSkillMapCard(scores) : ''}

      <!-- DIAGNOSTIC TEST RUNNER -->
      <div class="diag-skill-map-card">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border); padding-bottom:12px;">
          <div>
            <h3 style="font-size:1.05rem; color:#fff; font-weight:700;">
              ${scores ? '🔄 Retake Diagnostic Assessment' : '📝 Initial Diagnostic Assessment'}
            </h3>
            <span style="font-size:0.75rem; color:var(--text-muted);">Question ${diagCurrentIdx + 1} of ${DIAGNOSTIC_ASSESSMENT.length}</span>
          </div>
          <span style="font-size:0.75rem; font-family:var(--font-mono); color:var(--accent);">
            ${Math.round(((diagCurrentIdx) / DIAGNOSTIC_ASSESSMENT.length) * 100)}% Complete
          </span>
        </div>

        ${renderDiagQuestionCard(DIAGNOSTIC_ASSESSMENT[diagCurrentIdx], diagCurrentIdx)}
      </div>
    </div>
  `;
}

function renderDiagQuestionCard(q, idx) {
  const selectedOptionIdx = diagAnswers[q.id];

  return `
    <div style="display:flex; flex-direction:column; gap:14px; margin-top:8px;">
      <div style="display:flex; gap:8px; align-items:center;">
        <span class="qb-subject-tag qb-tag-foundations">${escapeHtml(q.ability)}</span>
        <span style="font-size:0.75rem; color:var(--text-dim);">${escapeHtml(q.subject)}</span>
      </div>

      <div style="font-size:0.95rem; color:#fff; line-height:1.5;">
        ${escapeHtml(q.prompt)}
      </div>

      <div class="method-options-list">
        ${q.options.map((opt, oIdx) => {
          const isSelected = selectedOptionIdx === oIdx;
          return `
            <div class="method-option-card ${isSelected ? 'selected-correct' : ''}" onclick="selectDiagAnswer('${q.id}', ${oIdx})">
              <span style="color:var(--accent); font-weight:700;">${String.fromCharCode(65 + oIdx)}.</span>
              <span style="color:#fff;">${escapeHtml(opt.text)}</span>
            </div>
          `;
        }).join('')}
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:10px;">
        <button class="hud-btn" ${idx === 0 ? 'disabled style="opacity:0.5;"' : ''} onclick="prevDiagQuestion()">
          ◀ Previous
        </button>

        ${idx < DIAGNOSTIC_ASSESSMENT.length - 1 ? `
          <button class="btn-primary" style="padding:6px 16px;" onclick="nextDiagQuestion()">
            Next Question ➔
          </button>
        ` : `
          <button class="btn-primary" style="padding:6px 18px; background:var(--success); border-color:var(--success); color:#fff;" onclick="submitDiagnosticTest()">
            ✓ Complete & Calculate Skill Map (+100 XP)
          </button>
        `}
      </div>
    </div>
  `;
}

function selectDiagAnswer(qId, oIdx) {
  diagAnswers[qId] = oIdx;
  renderMainView();
}

function nextDiagQuestion() {
  if (diagCurrentIdx < DIAGNOSTIC_ASSESSMENT.length - 1) {
    diagCurrentIdx++;
    renderMainView();
  }
}

function prevDiagQuestion() {
  if (diagCurrentIdx > 0) {
    diagCurrentIdx--;
    renderMainView();
  }
}

function submitDiagnosticTest() {
  let correctCount = 0;
  const abilityScores = {
    "1. Problem Understanding": { correct: 0, total: 0 },
    "2. Method Selection": { correct: 0, total: 0 },
    "3. Step-by-Step Execution": { correct: 0, total: 0 },
    "4. Independent Checking": { correct: 0, total: 0 },
    "5. Exam Speed & Accuracy": { correct: 0, total: 0 }
  };

  DIAGNOSTIC_ASSESSMENT.forEach(q => {
    const selected = diagAnswers[q.id];
    const isCorrect = (selected !== undefined && q.options[selected] && q.options[selected].correct);
    if (isCorrect) correctCount++;

    const abKey = Object.keys(abilityScores).find(k => q.ability.toLowerCase().includes(k.split('.')[1].trim().toLowerCase())) || "1. Problem Understanding";
    abilityScores[abKey].total++;
    if (isCorrect) abilityScores[abKey].correct++;
  });

  const overallPct = Math.round((correctCount / DIAGNOSTIC_ASSESSMENT.length) * 100);

  userState.diagnosticScores = {
    overallPct,
    correctCount,
    total: DIAGNOSTIC_ASSESSMENT.length,
    abilityScores,
    completedAt: Date.now()
  };
  userState.xp += 100;
  saveState();

  alert(`Diagnostic Assessment Completed! Overall Score: ${overallPct}% (${correctCount}/${DIAGNOSTIC_ASSESSMENT.length}). Your Personal Skill Map has been updated!`);
  renderMainView();
}

function renderPersonalSkillMapCard(scores) {
  const abilities = [
    { key: "1. Problem Understanding", title: "1. Problem Understanding & Givens Deconstruction" },
    { key: "2. Method Selection", title: "2. Optimal Method Selection & Justification" },
    { key: "3. Step-by-Step Execution", title: "3. Step-by-Step Derivation & Sign Precision" },
    { key: "4. Independent Checking", title: "4. Independent Reasonableness & Statics Checking" },
    { key: "5. Exam Speed & Accuracy", title: "5. University Exam Speed & Multi-Span Stamina" }
  ];

  // Find lowest scoring ability
  let lowestAbility = abilities[0].title;
  let lowestPct = 100;
  abilities.forEach(a => {
    const data = scores.abilityScores[a.key] || { correct: 1, total: 2 };
    const pct = Math.round((data.correct / data.total) * 100);
    if (pct < lowestPct) {
      lowestPct = pct;
      lowestAbility = a.title;
    }
  });

  return `
    <div class="diag-skill-map-card">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
        <div>
          <h3 style="font-size:1.15rem; color:#fff; font-weight:700;">📊 Your Personal Structural Skill Map</h3>
          <span style="font-size:0.75rem; color:var(--text-muted);">Calibrated across 5 engineering dimensions based on your real performance</span>
        </div>
        <div style="text-align:right;">
          <span style="font-size:1.2rem; font-weight:700; color:var(--accent); font-family:var(--font-mono);">${scores.overallPct}%</span>
          <span style="font-size:0.72rem; color:var(--text-dim); display:block;">Overall Diagnostic Mastery</span>
        </div>
      </div>

      <!-- 5 Dimension Bars -->
      <div style="display:flex; flex-direction:column; gap:10px; margin-top:8px;">
        ${abilities.map(a => {
          const data = scores.abilityScores[a.key] || { correct: 1, total: 2 };
          const pct = Math.round((data.correct / Math.max(1, data.total)) * 100);
          const fillClass = pct >= 80 ? 'fill-mastery' : (pct >= 60 ? 'fill-proficient' : (pct >= 40 ? 'fill-developing' : 'fill-attention'));
          const statusText = pct >= 80 ? 'Master' : (pct >= 60 ? 'Proficient' : (pct >= 40 ? 'Developing' : 'Needs Practice'));
          return `
            <div class="skill-bar-row">
              <div class="skill-bar-header">
                <span style="color:#fff; font-weight:600;">${escapeHtml(a.title)}</span>
                <span style="font-family:var(--font-mono);">${data.correct}/${data.total} (${pct}%) — <strong style="color:var(--accent);">${statusText}</strong></span>
              </div>
              <div class="skill-bar-track">
                <div class="skill-bar-fill ${fillClass}" style="width: ${pct}%;"></div>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- WHAT SHOULD I STUDY NEXT RECOMMENDATION -->
      <div style="background:linear-gradient(135deg, rgba(56, 189, 248, 0.12), rgba(15, 23, 42, 0.8)); border:1px solid var(--border-light); border-radius:8px; padding:12px 16px; margin-top:6px;">
        <strong style="color:#fff; font-size:0.85rem; display:block; margin-bottom:4px;">
          💡 Smart Study Recommendation based on your Diagnostic Profile:
        </strong>
        <p style="font-size:0.8rem; color:var(--text-main); line-height:1.45;">
          Focus priority: <strong>${escapeHtml(lowestAbility)}</strong> (Score: ${lowestPct}%). Drill targeted exercises in the 105 Exam Question Bank to solidify this foundation before taking the midterm.
        </p>
        <button class="btn-primary" style="margin-top:8px; padding:6px 14px; font-size:0.78rem;" onclick="switchAppView('bank')">
          Explore Targeted Practice Problems ➔
        </button>
      </div>
    </div>
  `;
}

// =========================================================================
// 5. OFFICIAL SOURCE REGISTER VIEW
// =========================================================================
function renderSourcesView(viewport) {
  if (typeof SOURCE_REGISTER === 'undefined') {
    viewport.innerHTML = `<div style="padding:20px; color:#fff;">Loading Source Register...</div>`;
    return;
  }

  viewport.innerHTML = `
    <div class="sources-container">
      <div class="qb-banner">
        <div class="qb-banner-info">
          <h2>🏛️ Official Academic Source Register</h2>
          <p>Verified institutional course materials, national standards, and accredited textbooks governing the Theory of Structures curriculum.</p>
        </div>
      </div>

      <div style="display:flex; flex-direction:column; gap:12px;">
        ${SOURCE_REGISTER.map(src => `
          <div class="source-card">
            <div class="source-header">
              <span class="source-title">${escapeHtml(src.title)}</span>
              <span class="source-badge">${escapeHtml(src.sourceType)}</span>
            </div>
            
            <div class="source-meta-grid">
              <div><strong>Institution / Author:</strong> ${escapeHtml(src.institutionOrAuthor)}</div>
              <div><strong>Course / Year:</strong> ${escapeHtml(src.courseAndYear)}</div>
              <div><strong>Identifier / Citation:</strong> ${escapeHtml(src.urlOrIdentifier)}</div>
              <div><strong>Authenticity:</strong> ${escapeHtml(src.authenticityStatus)}</div>
            </div>

            <div style="font-size:0.8rem; color:var(--text-main); margin-top:4px;">
              <strong>Topics Covered:</strong> ${escapeHtml(src.topicsCovered)}
            </div>

            <div style="font-size:0.78rem; color:var(--accent); background:rgba(56, 189, 248, 0.08); padding:8px 10px; border-radius:6px; border-left:3px solid var(--accent); margin-top:4px;">
              <strong>Curriculum Impact:</strong> ${escapeHtml(src.curriculumImpact)}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

console.log('App extensions part 2 loaded.');
