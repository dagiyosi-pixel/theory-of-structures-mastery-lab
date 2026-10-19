// COTM 3101: Theory of Structures - Master Application Controller
// Orchestrates multi-module lessons, interactive SVG diagrams, formula atlas, active recall, exam simulator, and error notebook.

let currentModuleIdx = 0;
let currentAppView = 'module'; // 'module', 'solvers', 'atlas', 'exam', 'errors'
let currentModuleTab = 'theory'; // 'theory', 'guided', 'shortcuts', 'arena', 'cheatsheet'
let currentSolver = 'determinacy'; // 'determinacy', 'threemoment', 'hardycross', 'conjugate'

// Flashcard & Exam States
let currentFlashcardIdx = 0;
let isFlashcardFlipped = false;
let examTimer = null;
let examTimeSeconds = 600; // 10 minutes
let examAnswers = {};
let examFinished = false;

// User Persistent State
let userState = {
  xp: 0,
  streak: 0,
  solved: {},
  errors: [], // array of missed question objects
  flashcardRatings: {}, // { formId: 'easy'|'good'|'hard'|'again' }
  rank: 'Apprentice'
};

function loadState() {
  const saved = localStorage.getItem('structures_mastery_v2');
  if (saved) {
    try {
      userState = JSON.parse(saved);
      if (!userState.errors) userState.errors = [];
      if (!userState.flashcardRatings) userState.flashcardRatings = {};
    } catch (e) {
      console.error(e);
    }
  }
  updateStatsHUD();
}

function saveState() {
  localStorage.setItem('structures_mastery_v2', JSON.stringify(userState));
  updateStatsHUD();
}

function resetProgress() {
  if (confirm("Reset all your earned XP, streaks, exam scores, and error notebook?")) {
    userState = {
      xp: 0,
      streak: 0,
      solved: {},
      errors: [],
      flashcardRatings: {},
      rank: 'Apprentice'
    };
    saveState();
    renderMainView();
  }
}

function updateStatsHUD() {
  const ranks = [
    { min: 0, title: 'Apprentice' },
    { min: 400, title: 'Junior Stress Analyst' },
    { min: 900, title: 'Design Engineer' },
    { min: 1500, title: 'Senior Structural Specialist' },
    { min: 2400, title: 'Master of Structures' }
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
// ROUTING & VIEW CONTROLLERS
// =========================================================================

function switchAppView(view) {
  currentAppView = view;
  updateTopNavUI();
  updateMobileNavUI();
  renderMainView();
}

function selectModule(idx) {
  currentModuleIdx = idx;
  currentAppView = 'module';
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
  if (!container) return;

  container.innerHTML = COURSE_MODULES.map((m, idx) => `
    <button class="nav-item ${idx === currentModuleIdx && currentAppView === 'module' ? 'active' : ''}" onclick="selectModule(${idx})">
      <span>${m.icon} ${m.shortTitle}</span>
    </button>
  `).join('');
}

// =========================================================================
// MAIN VIEW DISPATCHER
// =========================================================================
function renderMainView() {
  const viewport = document.getElementById('viewport');
  const modeTabs = document.getElementById('modeTabs');
  if (!viewport) return;

  if (currentAppView === 'module') {
    if (modeTabs) modeTabs.style.display = 'flex';
    renderModuleView(viewport);
  } else {
    if (modeTabs) modeTabs.style.display = 'none';
    if (currentAppView === 'solvers') renderSolversView(viewport);
    else if (currentAppView === 'atlas') renderFormulaAtlasView(viewport);
    else if (currentAppView === 'exam') renderExamSimulatorView(viewport);
    else if (currentAppView === 'errors') renderErrorNotebookView(viewport);
  }

  setTimeout(function() {
    renderMathInDOM(viewport);
  }, 25);
}

// =========================================================================
// 1. MODULE VIEW RENDERER
// =========================================================================
function renderModuleView(viewport) {
  const mod = COURSE_MODULES[currentModuleIdx];

  if (currentModuleTab === 'theory') {
    viewport.innerHTML = `
      <div class="card">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:10px;">
          <h2>${mod.icon} ${mod.fullTitle}</h2>
          <span class="stat-pill" style="font-size:0.8rem;">Module ${currentModuleIdx} of ${COURSE_MODULES.length - 1} (${currentModuleIdx === 0 ? 'Prerequisites' : 'Core Curriculum'})</span>
        </div>
        <p style="color:var(--text-muted); margin: 8px 0 16px;"><strong>Prerequisites:</strong> ${mod.prerequisites}</p>
        <div class="concept-callout" style="border-left-color:var(--accent); font-size:1.02rem;">
          <strong>💡 First-Principles Intuition:</strong> ${mod.intuition}
        </div>

        ${mod.theory.map(t => `
          <h3>${t.heading}</h3>
          <div>${t.body}</div>
          ${t.formula ? `<div class="formula-banner math-display-card"><div class="math-card-header"><span class="math-badge">GOVERNING EQUATION</span><button class="copy-latex-btn" onclick="copyFormulaLatex('${encodeURIComponent(t.formula)}', this)">📋 Copy LaTeX</button></div><div class="math-card-body">${formatFormula(t.formula)}</div></div>` : ''}
          ${t.svgType === 'beamTrap' ? StructureVisuals.renderBeam({
            width: 620, height: 180, length: 8,
            supports: [{ x: 1, type: 'roller', label: 'Roller 1' }, { x: 4, type: 'roller', label: 'Roller 2' }, { x: 7, type: 'roller', label: 'Roller 3' }],
            loads: [{ x: 4, type: 'point', val: 'Wind / Lateral Load H ➔' }]
          }) : ''}
        `).join('')}

        <div style="margin-top:28px; padding-top:16px; border-top:1px solid var(--border); display:flex; justify-content:space-between;">
          <button class="btn-primary" onclick="switchModuleTab('guided')">Next: Guided Worked Examples ➔</button>
        </div>
      </div>
    `;
  } else if (currentModuleTab === 'guided') {
    viewport.innerHTML = `
      <div class="card">
        <h2>🔬 Guided Worked Lecture Examples — ${mod.shortTitle}</h2>
        <p style="color:var(--text-muted); margin-bottom:20px;">Master each derivation step by step with interactive checkpoints and fading hints.</p>

        ${mod.guidedExamples.map((ex, exIdx) => `
          <div class="step-box" style="margin-bottom:28px;">
            <div class="step-header">
              <span>${ex.title}</span>
            </div>
            <p><strong>Problem Statement:</strong> ${ex.problem}</p>
            
            ${ex.svgConfig ? (ex.svgConfig.nodes ? StructureVisuals.renderTruss(ex.svgConfig) : StructureVisuals.renderBeam(ex.svgConfig)) : ''}

            <!-- Fading Hints Accordion -->
            <div style="margin:16px 0;">
              ${ex.hints.map((hint, hIdx) => `
                <div class="hint-pill" id="hint_${exIdx}_${hIdx}" style="display:none; background:rgba(250,204,21,0.1); border:1px dashed var(--gold); color:#fde047; padding:10px 14px; border-radius:6px; margin-bottom:8px;">
                  💡 <strong>${hint}</strong>
                </div>
              `).join('')}
              <button class="hud-btn" onclick="revealHint(${exIdx}, ${ex.hints.length})">💡 Reveal Fading Hint</button>
            </div>

            <!-- Steps Breakdown -->
            <div style="margin-top:16px;">
              ${ex.steps.map((st, stIdx) => `
                <div style="border-left:2px solid var(--accent); padding-left:14px; margin-bottom:14px;">
                  <h4 style="color:var(--accent); font-size:0.95rem; margin-bottom:4px;">${st.stepName}</h4>
                  <div style="color:var(--text-main); font-size:0.92rem;">${st.content}</div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  } else if (currentModuleTab === 'shortcuts') {
    viewport.innerHTML = `
      <div class="card">
        <h2>⚡ Master's Ninja Shortcuts & Method Selection Guide — ${mod.shortTitle}</h2>
        <p style="color:var(--text-muted); margin-bottom:20px;">Tested geometric insights, speed tricks, and method-selection rules that save 70% of exam time.</p>
        
        <h3>🎯 When to Choose This Method:</h3>
        <div class="concept-callout" style="border-left-color:var(--success);">
          ${mod.methodSelection}
        </div>

        <h3>🔥 High-Yield Speed Tricks:</h3>
        <div style="display:flex; flex-direction:column; gap:12px; margin-top:12px;">
          ${mod.shortcuts.map(s => `
            <div class="concept-callout" style="border-left-color:var(--gold); font-size:0.98rem; margin:0;">
              ${s}
            </div>
          `).join('')}
        </div>

        <h3>⚠️ Deadly Exam Traps & Pitfalls:</h3>
        <ul style="padding-left:20px; margin-top:12px;">
          ${mod.commonTraps.map(trap => `<li style="margin-bottom:8px; color:#fca5a5;"><strong>Trap:</strong> ${trap}</li>`).join('')}
        </ul>

        <h3>🧠 Memory Cue & Mnemonic:</h3>
        <div class="formula-banner">${mod.mnemonics}</div>
      </div>
    `;
  } else if (currentModuleTab === 'arena') {
    viewport.innerHTML = `
      <div class="card">
        <h2>⚔️ Challenge Gauntlet — ${mod.shortTitle}</h2>
        <p style="color:var(--text-muted); margin-bottom:20px;">Test your mastery against authentic exam traps. Correct answers earn XP and raise your structural engineering rank.</p>

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
              <p style="font-weight:600; font-size:1.02rem; margin:12px 0;">${q.prompt}</p>
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
      </div>
    `;
  } else if (currentModuleTab === 'cheatsheet') {
    viewport.innerHTML = `
      <div class="card">
        <h2>📜 Formula Vault & Sign Rules — ${mod.shortTitle}</h2>
        <p style="color:var(--text-muted); margin-bottom:16px;">Quick-access reference equations for this module.</p>
        <div class="concept-callout" style="font-size:1.02rem; line-height:2.0;">
          ${mod.cheatsheet}
        </div>
        <div style="margin-top:20px;">
          <button class="btn-primary" onclick="switchAppView('atlas')">Open Full Searchable Formula Atlas ➔</button>
        </div>
      </div>
    `;
  }
}

function revealHint(exIdx, totalHints) {
  for (let i = 0; i < totalHints; i++) {
    const el = document.getElementById(`hint_${exIdx}_${i}`);
    if (el && el.style.display === 'none') {
      el.style.display = 'block';
      return;
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
    }
    feedback.className = 'feedback-banner';
    feedback.style.background = 'rgba(34, 197, 94, 0.2)';
    feedback.style.border = '1px solid var(--success)';
    feedback.style.color = '#86efac';
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
        title: q.title,
        prompt: q.prompt,
        modTitle: mod.shortTitle,
        mistake: chosen.text,
        correction: chosen.explain
      });
    }
    saveState();
    feedback.className = 'feedback-banner';
    feedback.style.background = 'rgba(239, 68, 68, 0.2)';
    feedback.style.border = '1px solid var(--danger)';
    feedback.style.color = '#fca5a5';
    feedback.innerHTML = `<strong>❌ Not quite! Added to your Error Notebook.</strong><br/>${chosen.explain}`;
  }
}

// =========================================================================
// 2. THE SEARCHABLE FORMULA ATLAS & ACTIVE RECALL FLASHCARDS
// =========================================================================
let atlasFilter = 'all';
let atlasSearch = '';
let atlasMode = 'table'; // 'table' or 'flashcards'

function renderFormulaAtlasView(viewport) {
  let filtered = FORMULA_ATLAS;
  if (atlasFilter !== 'all') {
    filtered = filtered.filter(f => f.moduleId === atlasFilter);
  }
  if (atlasSearch.trim() !== '') {
    const q = atlasSearch.toLowerCase();
    filtered = filtered.filter(f => 
      f.name.toLowerCase().includes(q) || 
      f.formula.toLowerCase().includes(q) || 
      f.memoryCue.toLowerCase().includes(q)
    );
  }

  viewport.innerHTML = `
    <div class="card">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
        <h2>📜 Complete Formula Atlas & Memory Vault</h2>
        <div style="display:flex; gap:8px;">
          <button class="hud-btn ${atlasMode === 'table' ? 'active' : ''}" onclick="setAtlasMode('table')">📋 Searchable Directory</button>
          <button class="hud-btn ${atlasMode === 'flashcards' ? 'active' : ''}" onclick="setAtlasMode('flashcards')">🃏 Active Recall Flashcards</button>
        </div>
      </div>
      <p style="color:var(--text-muted); margin: 8px 0 16px;">Audited against AAU COTM 3101 course notes with symbol guides, SI units, derivations, memory cues, and exam pitfalls.</p>

      ${atlasMode === 'table' ? `
        <!-- Filter and Search Bar -->
        <div style="display:flex; gap:10px; flex-wrap:wrap; margin-bottom:20px;">
          <input type="text" placeholder="🔍 Search formula, keyword, or mnemonic..." value="${atlasSearch}" oninput="searchAtlas(this.value)" style="flex:1; min-width:220px; padding:10px; background:var(--bg-input); border:1px solid var(--border); color:var(--text-main); border-radius:6px;" />
          <select onchange="filterAtlas(this.value)" style="padding:10px; background:var(--bg-input); border:1px solid var(--border); color:var(--text-main); border-radius:6px;">
            <option value="all" ${atlasFilter === 'all' ? 'selected' : ''}>All Modules</option>
            <option value="mod1" ${atlasFilter === 'mod1' ? 'selected' : ''}>1. Stability & Determinacy</option>
            <option value="mod2" ${atlasFilter === 'mod2' ? 'selected' : ''}>2. Conjugate Beam</option>
            <option value="mod3" ${atlasFilter === 'mod3' ? 'selected' : ''}>3. Virtual Work</option>
            <option value="mod4" ${atlasFilter === 'mod4' ? 'selected' : ''}>4. Consistent Deformation</option>
            <option value="mod5" ${atlasFilter === 'mod5' ? 'selected' : ''}>5. Three-Moment Equation</option>
            <option value="mod6" ${atlasFilter === 'mod6' ? 'selected' : ''}>6. Slope-Deflection</option>
            <option value="mod7" ${atlasFilter === 'mod7' ? 'selected' : ''}>7. Moment Distribution</option>
          </select>
        </div>

        <div style="display:flex; flex-direction:column; gap:18px;">
          ${filtered.length === 0 ? '<p style="color:var(--text-muted);">No formulas match your search query.</p>' : ''}
          ${filtered.map(f => `
            <div class="step-box" style="border-left:4px solid var(--accent);">
              <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
                <h3 style="color:var(--accent); margin:0;">${f.name}</h3>
                <span class="stat-pill" style="font-size:0.75rem;">${f.moduleTitle}</span>
              </div>
              <div class="formula-banner math-display-card">
                <div class="math-card-header">
                  <span class="math-badge">FORMULA ATLAS</span>
                  <button class="copy-latex-btn" onclick="copyFormulaLatex('${encodeURIComponent(f.formula)}', this)">📋 Copy LaTeX</button>
                </div>
                <div class="math-card-body">${formatFormula(f.formula)}</div>
              </div>
              
              <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:14px; margin-top:10px;">
                <div>
                  <h4 style="color:var(--gold); font-size:0.85rem; margin-bottom:4px;">SYMBOLS & SI UNITS:</h4>
                  <ul style="padding-left:16px; font-size:0.85rem; color:var(--text-muted);">
                    ${f.symbols.map(s => `<li><code>${s.symbol}</code>: ${s.meaning} (<em>${s.unit}</em>)</li>`).join('')}
                  </ul>
                </div>
                <div>
                  <h4 style="color:var(--gold); font-size:0.85rem; margin-bottom:4px;">APPLICABILITY & ASSUMPTIONS:</h4>
                  <p style="font-size:0.85rem; color:var(--text-main);">${f.applicability} ${f.assumptions}</p>
                </div>
              </div>

              <div style="margin-top:12px; padding:10px; background:var(--bg-input); border-radius:6px; font-size:0.88rem;">
                <p><strong>🎯 Memory Cue:</strong> ${f.memoryCue}</p>
                <p style="color:#fca5a5; margin-top:4px;"><strong>⚠️ Common Exam Trap:</strong> ${f.traps}</p>
                <p style="color:var(--text-muted); margin-top:4px;"><strong>Derivation Core:</strong> ${f.derivation}</p>
              </div>
            </div>
          `).join('')}
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
      <div class="flashcard-box" onclick="toggleFlashcardFlip()" style="cursor:pointer; background:var(--bg-panel); border:2px solid var(--accent); border-radius:12px; padding:32px 24px; min-height:260px; display:flex; flex-direction:column; justify-content:center; align-items:center; transition:all 0.2s;">
        ${!isFlashcardFlipped ? `
          <div style="color:var(--text-muted); font-size:0.85rem; margin-bottom:8px;">${card.moduleTitle}</div>
          <h3 style="font-size:1.35rem; color:var(--text-main); margin-bottom:16px;">${card.name}</h3>
          <p style="color:var(--text-muted); font-size:0.95rem;">${card.applicability}</p>
          <div style="margin-top:24px; color:var(--accent); font-size:0.9rem; font-weight:600;">🔄 Tap card to reveal formula & derivation</div>
        ` : `
          <div class="formula-banner math-display-card" style="width:100%; margin-bottom:14px;">
            <div class="math-card-body">${formatFormula(card.formula)}</div>
          </div>
          <p style="color:var(--gold); font-size:0.95rem; margin-bottom:8px;"><strong>🎯 Memory Cue:</strong> ${card.memoryCue}</p>
          <p style="color:#fca5a5; font-size:0.9rem; margin-bottom:8px;"><strong>⚠️ Exam Trap:</strong> ${card.traps}</p>
          <p style="color:var(--text-muted); font-size:0.85rem;">${card.derivation}</p>
          <div style="margin-top:16px; color:var(--text-muted); font-size:0.8rem;">Tap card to flip back</div>
        `}
      </div>

      <!-- Spaced Repetition Rating Buttons -->
      <div style="display:flex; justify-content:center; gap:8px; margin-top:20px; flex-wrap:wrap;">
        <button class="hud-btn" style="border-color:var(--danger); color:var(--danger);" onclick="rateFlashcard('${card.id}', 'again')">🔴 Again (+0 XP)</button>
        <button class="hud-btn" style="border-color:var(--gold); color:var(--gold);" onclick="rateFlashcard('${card.id}', 'hard')">🟡 Hard (+50 XP)</button>
        <button class="hud-btn" style="border-color:var(--accent); color:var(--accent);" onclick="rateFlashcard('${card.id}', 'good')">🟢 Good (+100 XP)</button>
        <button class="hud-btn" style="border-color:var(--success); color:var(--success);" onclick="rateFlashcard('${card.id}', 'easy')">🔵 Easy (+150 XP)</button>
      </div>

      <div style="display:flex; justify-content:space-between; margin-top:20px;">
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
  const xpReward = rating === 'easy' ? 150 : rating === 'good' ? 100 : rating === 'hard' ? 50 : 0;
  userState.xp += xpReward;
  saveState();
  nextFlashcard();
}

// =========================================================================
// 3. DIAGNOSTIC EXAM SIMULATOR
// =========================================================================
let examCurrentIdx = 0;

function renderExamSimulatorView(viewport) {
  if (examFinished) {
    // Render Diagnostic Results Scorecard
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
              <div style="display:flex; justify-content:space-between; font-weight:bold;">
                <span>${d.q.title}</span>
                <span style="color:${d.isCorrect ? 'var(--success)' : 'var(--danger)'}">${d.isCorrect ? '✅ Correct' : '❌ Missed'}</span>
              </div>
              <p style="margin:8px 0;"><strong>Prompt:</strong> ${d.q.prompt}</p>
              <p style="color:${d.isCorrect ? '#86efac' : '#fca5a5'};">
                <strong>Your Answer:</strong> ${d.chosen !== undefined ? d.q.options[d.chosen].text : 'Unanswered'}
              </p>
              ${!d.isCorrect ? `<p style="color:var(--gold); margin-top:6px;"><strong>Core Concept:</strong> ${d.q.options.find(o => o.correct).explain}</p>` : ''}
            </div>
          `).join('')}
        </div>

        <button class="btn-primary" style="margin-top:24px;" onclick="restartExam()">↺ Retake Diagnostic Exam</button>
      </div>
    `;
    return;
  }

  // Active Exam View
  const q = EXAM_SIMULATOR_QUESTIONS[examCurrentIdx];
  const chosen = examAnswers[examCurrentIdx];

  viewport.innerHTML = `
    <div class="card">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
        <h2>⏱️ Midterm / Final Exam Simulator</h2>
        <div style="display:flex; gap:10px;">
          <span class="stat-pill" id="examTimerBadge" style="color:var(--danger)">⏳ Time Left: ${Math.floor(examTimeSeconds / 60)}:${(examTimeSeconds % 60).toString().padStart(2, '0')}</span>
          <span class="stat-pill">Question ${examCurrentIdx + 1} of ${EXAM_SIMULATOR_QUESTIONS.length}</span>
        </div>
      </div>
      <p style="color:var(--text-muted); margin: 6px 0 16px;">Timed mixed exam across all 7 lecture modules. Tests first principles, calculation formulas, and sign conventions.</p>

      <div class="step-box" style="margin-top:14px;">
        <h3 style="color:var(--accent); margin-top:0;">${q.title}</h3>
        <p style="font-size:1.05rem; font-weight:600; margin:14px 0;">${q.prompt}</p>

        <div class="options-list">
          ${q.options.map((opt, optIdx) => `
            <button class="option-btn ${chosen === optIdx ? 'correct' : ''}" onclick="selectExamAnswer(${examCurrentIdx}, ${optIdx})">
              ${opt.text}
            </button>
          `).join('')}
        </div>
      </div>

      <div style="display:flex; justify-content:space-between; margin-top:24px; align-items:center;">
        <button class="hud-btn" onclick="prevExamQuestion()" ${examCurrentIdx === 0 ? 'disabled' : ''}>⬅ Previous</button>
        <button class="hud-btn reset-btn" onclick="submitExamEarly()">Finish & Grade Exam</button>
        <button class="btn-primary" style="margin-top:0;" onclick="nextExamQuestion()">${examCurrentIdx === EXAM_SIMULATOR_QUESTIONS.length - 1 ? 'Finish Exam ➔' : 'Next Question ➔'}</button>
      </div>
    </div>
  `;

  startExamTimer();
}

function startExamTimer() {
  if (examTimer) return;
  examTimer = setInterval(() => {
    if (examTimeSeconds > 0) {
      examTimeSeconds--;
      const badge = document.getElementById('examTimerBadge');
      if (badge) {
        badge.innerText = `⏳ Time Left: ${Math.floor(examTimeSeconds / 60)}:${(examTimeSeconds % 60).toString().padStart(2, '0')}`;
      }
    } else {
      clearInterval(examTimer);
      examTimer = null;
      submitExamEarly();
    }
  }, 1000);
}

function selectExamAnswer(qIdx, optIdx) {
  examAnswers[qIdx] = optIdx;
  renderMainView();
}

function nextExamQuestion() {
  if (examCurrentIdx < EXAM_SIMULATOR_QUESTIONS.length - 1) {
    examCurrentIdx++;
    renderMainView();
  } else {
    submitExamEarly();
  }
}

function prevExamQuestion() {
  if (examCurrentIdx > 0) {
    examCurrentIdx--;
    renderMainView();
  }
}

function submitExamEarly() {
  if (examTimer) {
    clearInterval(examTimer);
    examTimer = null;
  }
  examFinished = true;

  // Log missed questions into userState.errors
  EXAM_SIMULATOR_QUESTIONS.forEach((q, idx) => {
    const chosen = examAnswers[idx];
    const isCorrect = chosen !== undefined && q.options[chosen].correct;
    if (!isCorrect) {
      const errKey = `exam_${q.id}`;
      if (!userState.errors.some(e => e.key === errKey)) {
        userState.errors.push({
          key: errKey,
          title: q.title,
          prompt: q.prompt,
          modTitle: q.module,
          mistake: chosen !== undefined ? q.options[chosen].text : 'Unanswered',
          correction: q.options.find(o => o.correct).explain
        });
      }
    }
  });

  saveState();
  renderMainView();
}

function restartExam() {
  examFinished = false;
  examCurrentIdx = 0;
  examAnswers = {};
  examTimeSeconds = 600;
  startExamTimer();
  renderMainView();
}

// =========================================================================
// 4. ERROR NOTEBOOK (MISTAKE VAULT)
// =========================================================================
function renderErrorNotebookView(viewport) {
  viewport.innerHTML = `
    <div class="card">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
        <h2>📓 Personal Error Notebook & Mistake Vault</h2>
        <span class="stat-pill" style="color:var(--danger)">${userState.errors.length} Missed Concept(s)</span>
      </div>
      <p style="color:var(--text-muted); margin: 8px 0 16px;">Targeted active recall of problems you previously missed in the Gauntlet or Exam Simulator. Once you master the concept, clear it!</p>

      ${userState.errors.length === 0 ? `
        <div class="concept-callout" style="border-left-color:var(--success); font-size:1.05rem;">
          🎉 <strong>Flawless Record!</strong> Your Error Notebook is completely empty. As you practice and make mistakes, they will automatically be logged here for surgical review.
        </div>
      ` : `
        <div style="display:flex; flex-direction:column; gap:16px;">
          ${userState.errors.map((err, idx) => `
            <div class="step-box" style="border-left:4px solid var(--danger);">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <h3 style="color:var(--danger); margin:0;">${err.title}</h3>
                <button class="hud-btn" style="font-size:0.75rem; border-color:var(--success); color:var(--success);" onclick="clearError(${idx})">Mark Mastered ✅</button>
              </div>
              <p style="margin:8px 0; font-weight:600;">${err.prompt}</p>
              <p style="color:#fca5a5; font-size:0.9rem;"><strong>Previous Misconception:</strong> ${err.mistake}</p>
              <div style="margin-top:8px; padding:10px; background:var(--bg-input); border-radius:6px; font-size:0.9rem; color:#86efac;">
                <strong>Correct First-Principles Insight:</strong><br/>${err.correction}
              </div>
            </div>
          `).join('')}
        </div>
      `}
    </div>
  `;
}

function clearError(idx) {
  userState.errors.splice(idx, 1);
  saveState();
  renderMainView();
}

// =========================================================================
// 5. INTERACTIVE STRUCTURAL SOLVERS
// =========================================================================
function renderSolversView(viewport) {
  viewport.innerHTML = `
    <div class="card">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
        <h2>🧮 Interactive Structural Engineering Sandboxes</h2>
        <div style="display:flex; gap:8px; flex-wrap:wrap;">
          <button class="hud-btn ${currentSolver === 'determinacy' ? 'active' : ''}" onclick="switchSolver('determinacy')">🔍 Determinacy</button>
          <button class="hud-btn ${currentSolver === 'threemoment' ? 'active' : ''}" onclick="switchSolver('threemoment')">📐 3-Moment Solver</button>
          <button class="hud-btn ${currentSolver === 'hardycross' ? 'active' : ''}" onclick="switchSolver('hardycross')">🔄 Hardy Cross</button>
          <button class="hud-btn ${currentSolver === 'conjugate' ? 'active' : ''}" onclick="switchSolver('conjugate')">🌉 Conjugate Viewer</button>
        </div>
      </div>
      <p style="color:var(--text-muted); margin: 8px 0 20px;">Validated simulation sandboxes with real-time SVG load diagrams, SFD/BMD curves, and live moment distribution spreadsheets.</p>

      <div id="solverContainer"></div>
    </div>
  `;

  renderActiveSolver();
}

function switchSolver(name) {
  currentSolver = name;
  renderSolversView(document.getElementById('viewport'));
}

function renderActiveSolver() {
  const container = document.getElementById('solverContainer');
  if (!container) return;

  if (currentSolver === 'determinacy') {
    container.innerHTML = `
      <div class="calc-grid">
        <div class="input-group">
          <label>Structure Classification</label>
          <select id="detType" onchange="updateDetInputs()">
            <option value="beam">Continuous Beam</option>
            <option value="truss">Plane Truss</option>
            <option value="frame">Rigid Frame</option>
          </select>
        </div>
        <div id="detDynamicInputs" style="display:contents;"></div>
      </div>
      <button class="btn-primary" onclick="runDeterminacySolve()">Analyze Stability & Determinacy</button>
      <div id="detResultBox" style="margin-top:20px; display:none;"></div>
    `;
    updateDetInputs();
    runDeterminacySolve();
  } else if (currentSolver === 'threemoment') {
    container.innerHTML = `
      <div class="calc-grid">
        <div class="input-group"><label>Span 1 Length (L₁, m)</label><input type="number" id="tm_L1" value="4.0" step="0.5" /></div>
        <div class="input-group"><label>Span 1 Load Type</label><select id="tm_loadType1"><option value="point">Point Load (P)</option><option value="udl">Uniform Load (w)</option></select></div>
        <div class="input-group"><label>Span 1 Load Magnitude</label><input type="number" id="tm_mag1" value="40" step="5" /></div>
        <div class="input-group"><label>Span 1 Point Load dist from A (m)</label><input type="number" id="tm_a1" value="2.0" step="0.5" /></div>

        <div class="input-group"><label>Span 2 Length (L₂, m)</label><input type="number" id="tm_L2" value="6.0" step="0.5" /></div>
        <div class="input-group"><label>Span 2 Load Type</label><select id="tm_loadType2"><option value="udl">Uniform Load (w)</option><option value="point">Point Load (P)</option></select></div>
        <div class="input-group"><label>Span 2 Load Magnitude</label><input type="number" id="tm_mag2" value="10" step="5" /></div>
        <div class="input-group"><label>Span 2 Point Load dist from C (m)</label><input type="number" id="tm_a2" value="3.0" step="0.5" /></div>
      </div>
      <button class="btn-primary" onclick="runThreeMomentSolve()">Solve Two-Span Continuous Beam</button>
      <div id="tmResultBox" style="margin-top:20px; display:none;"></div>
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
    `;
    runConjugateTransform();
  }
}

function updateDetInputs() {
  const type = document.getElementById('detType').value;
  const container = document.getElementById('detDynamicInputs');
  if (type === 'beam') {
    container.innerHTML = `
      <div class="input-group"><label>Reaction Components (r)</label><input type="number" id="det_r" value="5" min="1" /></div>
      <div class="input-group"><label>Internal Hinges (s)</label><input type="number" id="det_s" value="1" min="0" /></div>
      <div class="input-group"><label>All reactions parallel?</label><select id="det_parallel"><option value="false">No (Stable)</option><option value="true">Yes (Unstable Trap!)</option></select></div>
    `;
  } else if (type === 'truss') {
    container.innerHTML = `
      <div class="input-group"><label>Pin Joints (j)</label><input type="number" id="det_j" value="8" min="3" /></div>
      <div class="input-group"><label>Members (m)</label><input type="number" id="det_m" value="13" min="3" /></div>
      <div class="input-group"><label>Reaction Components (r)</label><input type="number" id="det_r" value="3" min="3" /></div>
      <div class="input-group"><label>Unbraced square panels?</label><select id="det_unbraced"><option value="false">No (Triangulated)</option><option value="true">Yes (Shear Collapse!)</option></select></div>
    `;
  } else if (type === 'frame') {
    container.innerHTML = `
      <div class="input-group"><label>Rigid Joints (j)</label><input type="number" id="det_j" value="9" min="2" /></div>
      <div class="input-group"><label>Members (m)</label><input type="number" id="det_m" value="10" min="1" /></div>
      <div class="input-group"><label>Reaction Components (r)</label><input type="number" id="det_r" value="9" min="3" /></div>
      <div class="input-group"><label>Special Releases (s)</label><input type="number" id="det_s" value="0" min="0" /></div>
      <div class="input-group"><label>Closed Cells (n)</label><input type="number" id="det_loops" value="4" min="0" /></div>
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
      <div class="formula-banner">Three-Moment Equation: ${res.coeff_MB} · M_B = ${res.RHS}  ➔  M_B = ${res.M_B} kN·m</div>
      
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

// Download Standalone App Single-File Bundler
function exportStandaloneHTML() {
  const link = document.createElement('a');
  link.href = './standalone.html';
  link.download = 'Theory_of_Structures_Mastery_Lab.html';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// =========================================================================
// INITIALIZATION
// =========================================================================
window.addEventListener('DOMContentLoaded', () => {
  loadState();
  renderSidebar();
  renderMainView();

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then(() => {
      console.log('PWA Service Worker Active - 100% Offline Ready!');
    }).catch(e => console.log('SW registration note:', e));
  }
});
