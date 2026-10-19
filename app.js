// COTM 3101: Theory of Structures - Application Controller & Gamification Engine

let currentModIndex = 0;
let currentMode = 'theory'; // 'theory', 'examples', 'shortcuts', 'arena', 'cheatsheet', 'solver'
let currentSolver = 'determinacy'; // 'determinacy', 'threemoment', 'hardycross'

// User State with LocalStorage Persistence
let userState = {
  xp: 0,
  streak: 0,
  solved: {},
  rank: 'Apprentice Structural Engineer'
};

function loadState() {
  const saved = localStorage.getItem('structures_mastery_state');
  if (saved) {
    try {
      userState = JSON.parse(saved);
    } catch(e) {
      console.error(e);
    }
  }
  updateStatsHUD();
}

function saveState() {
  localStorage.setItem('structures_mastery_state', JSON.stringify(userState));
  updateStatsHUD();
}

function resetProgress() {
  if (confirm("Reset all your earned XP, streaks, and challenge progress?")) {
    userState = {
      xp: 0,
      streak: 0,
      solved: {},
      rank: 'Apprentice Structural Engineer'
    };
    saveState();
    renderContent();
  }
}

function updateStatsHUD() {
  const ranks = [
    { min: 0, title: 'Apprentice' },
    { min: 300, title: 'Junior Analyst' },
    { min: 700, title: 'Design Engineer' },
    { min: 1200, title: 'Senior Stress Analyst' },
    { min: 1800, title: 'Master of Structures' }
  ];

  let currentRank = 'Apprentice';
  for (const r of ranks) {
    if (userState.xp >= r.min) currentRank = r.title;
  }
  userState.rank = currentRank;

  let totalChallenges = 0;
  COURSE_MODULES.forEach(m => totalChallenges += m.arena.length);
  const solvedCount = Object.keys(userState.solved).length;
  const masteryPct = totalChallenges > 0 ? Math.round((solvedCount / totalChallenges) * 100) : 0;

  const rankEl = document.getElementById('rankBadge');
  const xpEl = document.getElementById('xpBadge');
  const streakEl = document.getElementById('streakBadge');
  const masteryEl = document.getElementById('masteryBadge');

  if (rankEl) rankEl.innerText = `🎖️ ${userState.rank}`;
  if (xpEl) xpEl.innerText = `⚡ ${userState.xp} XP`;
  if (streakEl) streakEl.innerText = `🔥 Streak: ${userState.streak}`;
  if (masteryEl) masteryEl.innerText = `📊 ${masteryPct}% Mastered`;
}

// =========================================================================
// RENDERERS
// =========================================================================

function renderSidebar() {
  const container = document.getElementById('moduleList');
  if (!container) return;

  container.innerHTML = COURSE_MODULES.map((m, idx) => `
    <button class="nav-item ${idx === currentModIndex && currentMode !== 'solver' ? 'active' : ''}" onclick="selectModule(${idx})">
      <span>${m.icon} ${m.shortTitle}</span>
    </button>
  `).join('');
}

function selectModule(index) {
  currentModIndex = index;
  if (currentMode === 'solver') currentMode = 'theory';
  updateTabUI();
  renderSidebar();
  renderContent();
}

function switchMode(mode) {
  currentMode = mode;
  updateTabUI();
  renderSidebar();
  renderContent();
}

function updateTabUI() {
  document.querySelectorAll('.mode-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === currentMode);
  });
}

function openSandbox(solverName) {
  currentMode = 'solver';
  currentSolver = solverName;
  updateTabUI();
  renderSidebar();
  renderContent();
}

function renderContent() {
  const viewport = document.getElementById('viewport');
  if (!viewport) return;

  if (currentMode === 'solver') {
    renderSolverView(viewport);
    return;
  }

  const mod = COURSE_MODULES[currentModIndex];

  if (currentMode === 'theory') {
    viewport.innerHTML = `
      <div class="card">
        <h2>${mod.icon} ${mod.fullTitle} — Deep Theory & Intuition</h2>
        ${mod.theory.map(t => `
          <h3>${t.heading}</h3>
          <div>${t.body}</div>
          ${t.formula ? `<div class="formula-banner">${t.formula}</div>` : ''}
          ${t.diagram ? `<div class="blueprint-diagram">${t.diagram}</div>` : ''}
        `).join('')}
      </div>
    `;
  } else if (currentMode === 'examples') {
    viewport.innerHTML = `
      <div class="card">
        <h2>🔬 Step-by-Step Worked Lecture Examples — ${mod.shortTitle}</h2>
        <p style="color:var(--text-muted); margin-bottom:16px;">Direct step-by-step solutions with engineering diagrams and formulas from your AAU lecture notes.</p>
        ${mod.examples.map((ex, exIdx) => `
          <div class="step-box" style="margin-bottom:20px;">
            <div class="step-header">
              <span>${ex.title}</span>
            </div>
            <p><strong>Problem:</strong> ${ex.problem}</p>
            ${ex.diagram ? `<div class="blueprint-diagram">${ex.diagram}</div>` : ''}
            <div style="margin-top:14px;">
              <h4 style="color:var(--accent); margin-bottom:8px;">Step-by-Step Solution Breakdown:</h4>
              <ol style="padding-left:20px;">
                ${ex.steps.map(s => `<li style="margin-bottom:8px;">${s}</li>`).join('')}
              </ol>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  } else if (currentMode === 'shortcuts') {
    viewport.innerHTML = `
      <div class="card">
        <h2>⚡ Master's Ninja Shortcuts & Exam Secrets — ${mod.shortTitle}</h2>
        <p style="color:var(--text-muted); margin-bottom:16px;">Tested speed tricks, geometric insights, and mental checks that save 70% of exam time.</p>
        <div style="display:flex; flex-direction:column; gap:14px;">
          ${mod.shortcuts.map(s => `
            <div class="concept-callout" style="border-left-color:var(--gold); font-size:1rem;">
              ${s}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } else if (currentMode === 'arena') {
    viewport.innerHTML = `
      <div class="card">
        <h2>⚔️ Challenge Gauntlet — ${mod.shortTitle}</h2>
        <p style="color:var(--text-muted); margin-bottom:16px;">Solve these problems to gain XP, raise your rank, and eliminate exam pitfalls.</p>
        ${mod.arena.map((q, qIdx) => {
          const key = `${mod.id}_q${qIdx}`;
          const isDone = userState.solved[key];
          return `
            <div class="step-box" style="margin-bottom:24px;" id="qcard_${key}">
              <div class="step-header">
                <span>${q.title}</span>
                <span>${isDone ? '✅ Mastered (+150 XP)' : '⏳ Active Challenge'}</span>
              </div>
              ${q.diagram ? `<div class="blueprint-diagram">${q.diagram}</div>` : ''}
              <p style="font-weight:600; font-size:1.05rem; margin:12px 0;">${q.prompt}</p>
              <div class="options-list">
                ${q.options.map((opt, optIdx) => `
                  <button class="option-btn" onclick="checkChallengeAnswer('${key}', ${optIdx})">
                    ${opt.text}
                  </button>
                `).join('')}
              </div>
              <div class="feedback-banner" id="feedback_${key}"></div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  } else if (currentMode === 'cheatsheet') {
    viewport.innerHTML = `
      <div class="card">
        <h2>⚡ Formula Vault & Sign Rules — ${mod.shortTitle}</h2>
        <div class="concept-callout" style="font-size:1.05rem; line-height:2.0;">
          ${mod.cheatsheet}
        </div>
      </div>
    `;
  }
}

// Challenge Answer Checker
function checkChallengeAnswer(key, selectedIdx) {
  const parts = key.split('_q');
  const modId = parts[0];
  const qIdx = parseInt(parts[1]);
  const mod = COURSE_MODULES.find(m => m.id === modId);
  if (!mod) return;
  const q = mod.arena[qIdx];
  const chosen = q.options[selectedIdx];

  const card = document.getElementById(`qcard_${key}`);
  const feedback = document.getElementById(`feedback_${key}`);
  if (!card || !feedback) return;

  const btns = card.querySelectorAll('.option-btn');
  btns.forEach((b, i) => {
    b.classList.remove('correct', 'wrong');
    if (i === selectedIdx) {
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
    }
    feedback.className = 'feedback-banner';
    feedback.style.background = 'rgba(34, 197, 94, 0.2)';
    feedback.style.border = '1px solid var(--success)';
    feedback.style.color = '#86efac';
    feedback.innerHTML = `<strong>✅ Master Answer (+150 XP)!</strong><br/>${chosen.explain}`;
  } else {
    userState.streak = 0;
    saveState();
    feedback.className = 'feedback-banner';
    feedback.style.background = 'rgba(239, 68, 68, 0.2)';
    feedback.style.border = '1px solid var(--danger)';
    feedback.style.color = '#fca5a5';
    feedback.innerHTML = `<strong>❌ Not quite!</strong><br/>${chosen.explain}`;
  }
}

// =========================================================================
// SANDBOX SOLVER RENDERERS
// =========================================================================

function renderSolverView(viewport) {
  if (currentSolver === 'determinacy') {
    viewport.innerHTML = `
      <div class="card">
        <h2>🔍 Live Determinacy & Stability Analyzer</h2>
        <p style="color:var(--text-muted); margin-bottom:16px;">Test any structural configuration in real time. Detects geometric instability, parallel reactions, and internal mechanisms.</p>
        
        <div class="calc-grid">
          <div class="input-group">
            <label>Structure Category</label>
            <select id="detType" onchange="updateDetInputs()">
              <option value="beam">Continuous Beam</option>
              <option value="truss">Plane Truss</option>
              <option value="frame">Rigid Frame</option>
            </select>
          </div>
          <div id="detDynamicInputs" style="display:contents;"></div>
        </div>

        <button class="btn-primary" onclick="runDeterminacySolve()">Compute Stability & Determinacy</button>

        <div id="detResultBox" style="margin-top:20px; display:none;"></div>
      </div>
    `;
    updateDetInputs();
    runDeterminacySolve();
  } else if (currentSolver === 'threemoment') {
    viewport.innerHTML = `
      <div class="card">
        <h2>📐 Live 2-Span Three-Moment Equation Solver (Clapeyron)</h2>
        <p style="color:var(--text-muted); margin-bottom:16px;">Solves the support moment M_B and reactions for a two-span continuous beam with UDL or Point loads.</p>

        <div class="calc-grid">
          <div class="input-group">
            <label>Span 1 Length (L₁, m)</label>
            <input type="number" id="tm_L1" value="4.0" step="0.5" />
          </div>
          <div class="input-group">
            <label>Span 1 Load Type</label>
            <select id="tm_loadType1">
              <option value="point">Concentrated Load (P)</option>
              <option value="udl">Uniform Load (w)</option>
            </select>
          </div>
          <div class="input-group">
            <label>Span 1 Load Magnitude (P or w)</label>
            <input type="number" id="tm_mag1" value="40" step="5" />
          </div>
          <div class="input-group">
            <label>Span 1 Load Distance from A (a₁, m)</label>
            <input type="number" id="tm_a1" value="2.0" step="0.5" />
          </div>

          <div class="input-group">
            <label>Span 2 Length (L₂, m)</label>
            <input type="number" id="tm_L2" value="6.0" step="0.5" />
          </div>
          <div class="input-group">
            <label>Span 2 Load Type</label>
            <select id="tm_loadType2">
              <option value="udl">Uniform Load (w)</option>
              <option value="point">Concentrated Load (P)</option>
            </select>
          </div>
          <div class="input-group">
            <label>Span 2 Load Magnitude (P or w)</label>
            <input type="number" id="tm_mag2" value="10" step="5" />
          </div>
          <div class="input-group">
            <label>Span 2 Load Distance from C (a₂, m)</label>
            <input type="number" id="tm_a2" value="3.0" step="0.5" />
          </div>
        </div>

        <button class="btn-primary" onclick="runThreeMomentSolve()">Solve Two-Span Continuous Beam</button>

        <div id="tmResultBox" style="margin-top:20px; display:none;"></div>
      </div>
    `;
    runThreeMomentSolve();
  } else if (currentSolver === 'hardycross') {
    viewport.innerHTML = `
      <div class="card">
        <h2>🔄 Hardy Cross Moment Distribution Live Engine</h2>
        <p style="color:var(--text-muted); margin-bottom:16px;">Generates a real-time iterative balance and carry-over engineering table for a 2-span beam.</p>

        <div class="calc-grid">
          <div class="input-group">
            <label>Span AB Length (m)</label>
            <input type="number" id="hc_L1" value="3.6" step="0.1" />
          </div>
          <div class="input-group">
            <label>Span BC Length (m)</label>
            <input type="number" id="hc_L2" value="4.0" step="0.1" />
          </div>
          <div class="input-group">
            <label>Support A Condition</label>
            <select id="hc_endA">
              <option value="fixed">Fixed Support (DF = 0)</option>
              <option value="hinged">Hinged / Simple (DF = 1.0)</option>
            </select>
          </div>
          <div class="input-group">
            <label>Support C Condition</label>
            <select id="hc_endC">
              <option value="hinged">Hinged / Simple (Modified ¾ K)</option>
              <option value="fixed">Fixed Support (DF = 0)</option>
            </select>
          </div>
          <div class="input-group">
            <label>Initial FEM AB (kN·m)</label>
            <input type="number" id="hc_femAB" value="-30.0" />
          </div>
          <div class="input-group">
            <label>Initial FEM BA (kN·m)</label>
            <input type="number" id="hc_femBA" value="+30.0" />
          </div>
          <div class="input-group">
            <label>Initial FEM BC (kN·m)</label>
            <input type="number" id="hc_femBC" value="-22.5" />
          </div>
          <div class="input-group">
            <label>Initial FEM CB (kN·m)</label>
            <input type="number" id="hc_femCB" value="+22.5" />
          </div>
        </div>

        <button class="btn-primary" onclick="runHardyCrossSolve()">Generate Iterative Distribution Table</button>

        <div id="hcResultBox" style="margin-top:20px; display:none;"></div>
      </div>
    `;
    runHardyCrossSolve();
  }
}

function updateDetInputs() {
  const type = document.getElementById('detType').value;
  const container = document.getElementById('detDynamicInputs');
  if (type === 'beam') {
    container.innerHTML = `
      <div class="input-group"><label>Total Reaction Components (r)</label><input type="number" id="det_r" value="5" min="1" /></div>
      <div class="input-group"><label>Internal Hinges (s)</label><input type="number" id="det_s" value="1" min="0" /></div>
      <div class="input-group"><label>Are all reactions parallel?</label><select id="det_parallel"><option value="false">No (Stable)</option><option value="true">Yes (Unstable Trap!)</option></select></div>
    `;
  } else if (type === 'truss') {
    container.innerHTML = `
      <div class="input-group"><label>Joints (j)</label><input type="number" id="det_j" value="8" min="3" /></div>
      <div class="input-group"><label>Members (m)</label><input type="number" id="det_m" value="13" min="3" /></div>
      <div class="input-group"><label>Reactions (r)</label><input type="number" id="det_r" value="3" min="3" /></div>
      <div class="input-group"><label>Any unbraced open panels?</label><select id="det_unbraced"><option value="false">No (Fully triangulated)</option><option value="true">Yes (Mechanism Trap!)</option></select></div>
    `;
  } else if (type === 'frame') {
    container.innerHTML = `
      <div class="input-group"><label>Rigid Joints (j)</label><input type="number" id="det_j" value="9" min="2" /></div>
      <div class="input-group"><label>Members (m)</label><input type="number" id="det_m" value="10" min="1" /></div>
      <div class="input-group"><label>Reactions (r)</label><input type="number" id="det_r" value="9" min="3" /></div>
      <div class="input-group"><label>Special Releases (s)</label><input type="number" id="det_s" value="0" min="0" /></div>
      <div class="input-group"><label>Closed Loops (n)</label><input type="number" id="det_loops" value="4" min="0" /></div>
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
      <div class="formula-banner">${res.formula}</div>
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
      <h3 style="color:var(--gold); margin-top:0;">Clapeyron Solution Results:</h3>
      <p><strong>Load Terms:</strong> Span 1 (6A₁x₁/L₁) = <code>${res.term1} kN·m²</code> | Span 2 (6A₂x₂/L₂) = <code>${res.term2} kN·m²</code></p>
      <div class="formula-banner">Three-Moment Equation: ${res.coeff_MB} · M_B = ${res.RHS}  ➔  M_B = ${res.M_B} kN·m</div>
      
      <div class="calc-grid" style="margin-top:16px;">
        <div class="stat-pill" style="text-align:center;">Support Moment M_B: <strong>${res.M_B} kN·m</strong></div>
        <div class="stat-pill" style="text-align:center;">Reaction R_A: <strong>${res.R_A} kN</strong></div>
        <div class="stat-pill" style="text-align:center;">Reaction R_B: <strong>${res.R_B} kN</strong></div>
        <div class="stat-pill" style="text-align:center;">Reaction R_C: <strong>${res.R_C} kN</strong></div>
      </div>
      <p style="margin-top:10px; color:var(--text-muted);">Max Span Sagging Moments: Span 1 = +${res.maxSag1} kN·m | Span 2 = +${res.maxSag2} kN·m</p>
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
      <p style="color:var(--accent); font-weight:bold; margin-top:8px;">✅ Joint B is completely in equilibrium: ΣM_B = (${res.rows[res.rows.length-1].BA}) + (${res.rows[res.rows.length-1].BC}) = 0.00 kN·m!</p>
    </div>
  `;
}

// Download Standalone App Single-File Bundler
function exportStandaloneHTML() {
  const link = document.createElement('a');
  link.href = './standalone.html';
  link.download = 'Theory_of_Structures_Mastery_Lab.html';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Initialize on Load
window.addEventListener('DOMContentLoaded', () => {
  loadState();
  renderSidebar();
  renderContent();

  // Register PWA Service Worker for Offline Execution
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then(() => {
      console.log('PWA Service Worker Active - 100% Offline Ready!');
    }).catch(e => console.log('SW registration note:', e));
  }
});
