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

// User Persistent State
let userState = {
  xp: 0,
  streak: 0,
  solved: {},
  errors: [], // array of missed question objects
  flashcardRatings: {}, // { formId: 'easy'|'good'|'hard'|'again' }
  watchedVideos: {}, // { [vidId]: true }
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

function updateStatsHUD() {
  const rankData = getRankData(userState.xp);
  userState.rank = rankData.title;

  let totalChallenges = 0;
  COURSE_MODULES.forEach(m => totalChallenges += m.arena.length);
  const solvedCount = Object.keys(userState.solved).length;
  const masteryPct = totalChallenges > 0 ? Math.round((solvedCount / totalChallenges) * 100) : 0;

  const rankEl = document.getElementById('rankBadge');
  const xpEl = document.getElementById('xpBadge');
  const streakEl = document.getElementById('streakBadge');
  const masteryEl = document.getElementById('masteryBadge');

  if (rankEl) rankEl.innerHTML = `${rankData.icon} ${userState.rank}`;
  if (xpEl) xpEl.innerHTML = `⚡ ${userState.xp} XP`;
  if (streakEl) streakEl.innerHTML = `🔥 Streak: ${userState.streak}`;
  if (masteryEl) masteryEl.innerHTML = `📊 ${masteryPct}% Mastered`;
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
  if (!container) return;

  container.innerHTML = COURSE_MODULES.map((m, idx) => {
    const solvedInMod = m.arena.filter((q, qIdx) => userState.solved[`${m.id}_q${qIdx}`]).length;
    const isMastered = solvedInMod === m.arena.length && m.arena.length > 0;
    const badgeText = isMastered ? '✅ Done' : `${solvedInMod}/${m.arena.length}`;

    return `
      <button class="nav-item ${idx === currentModuleIdx && currentAppView === 'module' ? 'active' : ''}" onclick="selectModule(${idx})">
        <span style="display:flex; align-items:center; gap:8px;">
          <span>${m.icon}</span>
          <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:170px;">${m.shortTitle}</span>
        </span>
        <span class="nav-item-badge ${isMastered ? 'badge-mastered' : ''}">${badgeText}</span>
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
  } else {
    if (modeTabs) modeTabs.style.display = 'none';
    if (currentAppView === 'solvers') renderSolversView(viewport);
    else if (currentAppView === 'atlas') renderFormulaAtlasView(viewport);
    else if (currentAppView === 'exam') renderExamSimulatorView(viewport);
    else if (currentAppView === 'errors') renderErrorNotebookView(viewport);
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
  const rankData = getRankData(userState.xp);
  const nextXP = rankData.next;
  const currentLevelMin = rankData.min;
  const xpInLevel = Math.max(0, userState.xp - currentLevelMin);
  const levelSpan = Math.max(1, nextXP - currentLevelMin);
  const levelPct = Math.min(100, Math.round((xpInLevel / levelSpan) * 100));

  let totalChallenges = 0;
  COURSE_MODULES.forEach(m => totalChallenges += m.arena.length);
  const solvedCount = Object.keys(userState.solved).length;
  const totalMasteryPct = totalChallenges > 0 ? Math.round((solvedCount / totalChallenges) * 100) : 0;

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
        <button class="btn-primary" onclick="selectModule(${currentModuleIdx})">
          ▶ Resume Learning (${COURSE_MODULES[currentModuleIdx].shortTitle})
        </button>
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
function renderModuleView(viewport) {
  const mod = COURSE_MODULES[currentModuleIdx];

  if (currentModuleTab === 'theory') {
    viewport.innerHTML = `
      <div class="card">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:10px; margin-bottom:8px;">
          <h2>${mod.icon} ${mod.fullTitle}</h2>
          <span class="stat-pill" style="font-size:0.8rem;">Module ${currentModuleIdx} of ${COURSE_MODULES.length - 1} (${currentModuleIdx === 0 ? 'Prerequisites' : 'Core Curriculum'})</span>
        </div>
        <p style="color:var(--text-muted); margin: 4px 0 14px; font-size:0.9rem;"><strong>Prerequisites:</strong> ${mod.prerequisites}</p>
        <div class="concept-callout" style="border-left-color:var(--accent); font-size:0.98rem; margin:12px 0 18px;">
          <strong>💡 First-Principles Intuition:</strong> ${mod.intuition}
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin: 10px 0 16px; padding: 8px 12px; background: rgba(56, 189, 248, 0.08); border: 1px solid rgba(56, 189, 248, 0.2); border-radius: 8px;">
          <span style="font-size:0.86rem; color:var(--text-muted);">
            🎥 <strong>Video Masterclasses:</strong> ${mod.videos ? mod.videos.length : 0} curated AAU video lectures available for this chapter
          </span>
          <button class="hud-btn" style="padding:4px 10px; font-size:0.8rem; color:var(--accent); border-color:var(--accent);" onclick="switchModuleTab('videos')">
            ▶ Watch Chapter Videos
          </button>
        </div>

        <div style="display:flex; flex-direction:column; gap:12px;">
          ${mod.theory.map((t, tIdx) => `
            <div class="collapsible-card ${tIdx === 0 ? 'open' : ''}" id="theory_card_${tIdx}">
              <div class="collapsible-header" onclick="toggleCollapsible('theory_card_${tIdx}')">
                <span>${t.heading}</span>
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
              </div>
            </div>
          `).join('')}
        </div>

        <div style="margin-top:24px; padding-top:16px; border-top:1px solid var(--border); display:flex; justify-content:space-between; flex-wrap:wrap; gap:10px;">
          <button class="hud-btn" onclick="switchAppView('dashboard')">⬅ Back to Cockpit</button>
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <button class="hud-btn" onclick="switchModuleTab('videos')">🎥 Video Lectures</button>
            <button class="btn-primary" onclick="switchModuleTab('guided')">Next: Guided Worked Examples ➔</button>
          </div>
        </div>
      </div>
    `;
  } else if (currentModuleTab === 'guided') {
    viewport.innerHTML = `
      <div class="card">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:10px; margin-bottom:8px;">
          <h2>🔬 Guided Worked Lecture Examples — ${mod.shortTitle}</h2>
          <button class="hud-btn" style="color:var(--accent); border-color:var(--accent); font-size:0.8rem; padding:4px 10px;" onclick="switchModuleTab('videos')">
            🎥 Watch Video Walkthroughs (${mod.videos ? mod.videos.length : 0})
          </button>
        </div>
        <p style="color:var(--text-muted); margin-bottom:18px; font-size:0.92rem;">Master each derivation step by step with interactive checkpoints and fading hints.</p>

        ${mod.guidedExamples.map((ex, exIdx) => `
          <div class="step-box" style="margin-bottom:24px;">
            <div class="step-header">
              <span>${ex.title}</span>
            </div>
            <p style="font-size:0.95rem; line-height:1.5;"><strong>Problem Statement:</strong> ${ex.problem}</p>
            
            ${ex.svgConfig ? (ex.svgConfig.nodes ? StructureVisuals.renderTruss(ex.svgConfig) : StructureVisuals.renderBeam(ex.svgConfig)) : ''}

            <!-- Fading Hints Accordion -->
            <div style="margin:14px 0;">
              ${ex.hints.map((hint, hIdx) => `
                <div class="hint-pill" id="hint_${exIdx}_${hIdx}" style="display:none; background:rgba(250,204,21,0.1); border:1px dashed var(--gold); color:#fde047; padding:10px 14px; border-radius:6px; margin-bottom:8px; font-size:0.9rem;">
                  💡 <strong>${hint}</strong>
                </div>
              `).join('')}
              <button class="hud-btn" onclick="revealHint(${exIdx}, ${ex.hints.length})">💡 Reveal Fading Hint</button>
            </div>

            <!-- Steps Breakdown -->
            <div style="margin-top:14px;">
              ${ex.steps.map((st) => `
                <div style="border-left:2px solid var(--accent); padding-left:14px; margin-bottom:14px;">
                  <h4 style="color:var(--accent); font-size:0.92rem; margin-bottom:4px;">${st.stepName}</h4>
                  <div style="color:var(--text-main); font-size:0.9rem;">${st.content}</div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}

        <div style="margin-top:20px; display:flex; justify-content:space-between; flex-wrap:wrap; gap:10px;">
          <button class="hud-btn" onclick="switchModuleTab('theory')">⬅ Theory</button>
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <button class="hud-btn" onclick="switchModuleTab('videos')">🎥 Video Lectures</button>
            <button class="btn-primary" onclick="switchModuleTab('shortcuts')">Next: Speed Tricks ➔</button>
          </div>
        </div>
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

        <h3>🔥 High-Yield Speed Tricks:</h3>
        <div style="display:flex; flex-direction:column; gap:10px; margin-top:10px;">
          ${mod.shortcuts.map(s => `
            <div class="concept-callout" style="border-left-color:var(--gold); font-size:0.94rem; margin:0;">
              ${s}
            </div>
          `).join('')}
        </div>

        <h3>⚠️ Deadly Exam Traps & Pitfalls:</h3>
        <ul style="padding-left:20px; margin-top:10px;">
          ${mod.commonTraps.map(trap => `<li style="margin-bottom:8px; color:#fca5a5; font-size:0.92rem;"><strong>Trap:</strong> ${trap}</li>`).join('')}
        </ul>

        <h3>🧠 Memory Cue & Mnemonic:</h3>
        <div class="formula-banner math-display-card">
          <div class="math-card-body" style="font-size:1.05rem;">${mod.mnemonics}</div>
        </div>

        <div style="margin-top:20px; display:flex; justify-content:space-between; flex-wrap:wrap; gap:10px;">
          <button class="hud-btn" onclick="switchModuleTab('guided')">⬅ Worked Examples</button>
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
        <p style="color:var(--text-muted); margin-bottom:18px; font-size:0.92rem;">High-yield equations, sign conventions, and summary tables for immediate recall before exams.</p>
        
        <div class="concept-callout" style="border-left-color:var(--accent); font-size:0.98rem; line-height:1.8;">
          ${mod.cheatsheet}
        </div>

        <div style="margin-top:24px; display:flex; justify-content:space-between; flex-wrap:wrap; gap:10px;">
          <button class="hud-btn" onclick="switchModuleTab('arena')">⬅ Challenge Gauntlet</button>
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <button class="hud-btn" onclick="switchAppView('atlas'); filterAtlas('${mod.id}')">Explore in Full Atlas ➔</button>
            <button class="btn-primary" onclick="switchModuleTab('videos')">Next: Video Masterclasses 🎥 ➔</button>
          </div>
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
          Carefully selected AAU & international structural analysis video lectures. Watch inside the app or launch directly on YouTube. Complete videos to earn <strong>+50 XP</strong> each!
        </p>

        <div class="concept-callout" style="border-left-color:var(--primary); font-size:0.88rem; margin-bottom:20px;">
          <strong>📶 Offline Note:</strong> Video streaming requires an active internet connection. All written theory, step-by-step worked examples, speed tricks, and interactive structural solvers in the other tabs remain <strong>100% offline accessible</strong> anytime.
        </div>

        ${videos.length === 0 ? `
          <p style="color:var(--text-muted); text-align:center; padding:30px;">No video lectures assigned for this module yet.</p>
        ` : `
          <div class="video-masterclass-grid">
            ${videos.map((v, vIdx) => {
              const vidId = extractYouTubeId(v.url) || '';
              const thumbUrl = vidId ? `https://img.youtube.com/vi/${vidId}/hqdefault.jpg` : '';
              const isWatched = !!(userState.watchedVideos && userState.watchedVideos[vidId]);

              return `
                <div class="video-card ${isWatched ? 'watched' : ''}">
                  <div class="video-thumb-container" onclick="openVideoModal('${vidId}', '${v.title.replace(/'/g, "\\'")}', '${v.url}')">
                    <img class="video-thumb-img" src="${thumbUrl}" alt="${v.title}" loading="lazy" onerror="this.src='https://placehold.co/480x270/0f172a/38bdf8?text=Theory+of+Structures+Lecture'">
                    <div class="video-play-overlay">
                      <button class="play-badge-btn" title="Play Video">▶</button>
                    </div>
                    <span class="video-hd-badge">Lecture #${vIdx + 1}</span>
                    ${isWatched ? '<span class="video-watched-badge">✓ Watched</span>' : ''}
                  </div>
                  <div class="video-card-content">
                    <h3 class="video-card-title" title="${v.title}">${v.title}</h3>
                    <div class="video-card-actions">
                      <button class="btn-primary" onclick="openVideoModal('${vidId}', '${v.title.replace(/'/g, "\\'")}', '${v.url}')" style="flex:1; justify-content:center; padding:7px 12px; font-size:0.82rem;">
                        ▶ Watch in App
                      </button>
                      <a href="${v.url}" target="_blank" rel="noopener noreferrer" class="hud-btn" style="text-decoration:none; padding:7px 10px; font-size:0.82rem;" title="Watch directly on YouTube">
                        ↗ YouTube
                      </a>
                      <button class="hud-btn ${isWatched ? 'active' : ''}" onclick="toggleVideoWatched('${vidId}', '${v.title.replace(/'/g, "\\'")}')" style="padding:7px 10px; font-size:0.82rem;" title="${isWatched ? 'Mark as unwatched' : 'Mark as watched (+50 XP)'}">
                        ${isWatched ? '✓ Done' : '+50 XP'}
                      </button>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `}

        <div style="margin-top:24px; display:flex; justify-content:space-between; flex-wrap:wrap; gap:10px;">
          <button class="hud-btn" onclick="switchModuleTab('cheatsheet')">⬅ Formula Vault</button>
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <button class="hud-btn" onclick="switchAppView('dashboard')">🏠 Mission Control</button>
            <button class="btn-primary" onclick="selectModule(${(currentModuleIdx + 1) % COURSE_MODULES.length})">
              Next Module: ${COURSE_MODULES[(currentModuleIdx + 1) % COURSE_MODULES.length].shortTitle} ➔
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

// =========================================================================
// VIDEO MASTERCLASS HUB CONTROLLERS
// =========================================================================
let currentModalVideo = { vidId: null, title: '', url: '' };

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

  if (!modal || !iframe) return;

  if (titleEl) titleEl.textContent = title;
  if (extBtn) extBtn.href = url;
  iframe.src = `https://www.youtube-nocookie.com/embed/${vidId}?autoplay=1`;

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
    alert(`🎉 Video Masterclass Completed!\n\n"${title}"\n+50 XP earned! Keep up the momentum!`);
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
  viewport.innerHTML = `
    <div class="card">
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
      console.log('PWA Service Worker Active (v7) - 100% Offline Ready!');
    }).catch(e => console.log('SW registration note:', e));
  }
});
