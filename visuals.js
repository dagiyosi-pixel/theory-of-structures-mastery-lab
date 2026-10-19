// COTM 3101: Theory of Structures - Interactive SVG Engineering Visualization Engine
// Provides high-contrast, responsive SVG diagrams for beams, trusses, frames, and diagrams.

const StructureVisuals = {
  // Helper to generate SVG container
  createSvg: function(width, height, content, viewBox) {
    const vb = viewBox || `0 0 ${width} ${height}`;
    return `<svg class="eng-svg" viewBox="${vb}" width="100%" height="${height}" xmlns="http://www.w3.org/2000/svg">${content}</svg>`;
  },

  // =========================================================================
  // 1. BEAM WITH SUPPORTS, LOADS, ELASTIC CURVE & DIAGRAMS
  // =========================================================================
  renderBeam: function(config) {
    const w = config.width || 680;
    const h = config.height || 220;
    const padX = 60;
    const padY = 110;
    const beamY = padY;
    const beamLen = w - 2 * padX;
    const L = config.length || 10; // real meters

    function toScreenX(xMeters) {
      return padX + (xMeters / L) * beamLen;
    }

    let svg = `
      <defs>
        <pattern id="hatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="8" stroke="#334155" stroke-width="1.5" />
        </pattern>
        <marker id="arrowDown" viewBox="0 0 10 10" refX="5" refY="10" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 0 L 5 10 z" fill="#facc15" />
        </marker>
        <marker id="arrowUp" viewBox="0 0 10 10" refX="5" refY="0" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 10 L 10 10 L 5 0 z" fill="#22c55e" />
        </marker>
      </defs>
    `;

    // 1. Grid/Background details
    svg += `<rect x="0" y="0" width="${w}" height="${h}" fill="#070c18" rx="8" />`;

    // 2. Beam Member
    svg += `<line x1="${padX}" y1="${beamY}" x2="${padX + beamLen}" y2="${beamY}" stroke="#38bdf8" stroke-width="6" stroke-linecap="round" />`;

    // 3. Supports
    if (config.supports) {
      config.supports.forEach(sup => {
        const sx = toScreenX(sup.x);
        const sy = beamY;
        if (sup.type === 'pin') {
          // Triangle pin
          svg += `
            <polygon points="${sx},${sy} ${sx - 12},${sy + 20} ${sx + 12},${sy + 20}" fill="#1e293b" stroke="#38bdf8" stroke-width="2" />
            <line x1="${sx - 16}" y1="${sy + 20}" x2="${sx + 16}" y2="${sy + 20}" stroke="#94a3b8" stroke-width="2" />
            <rect x="${sx - 16}" y="${sy + 20}" width="32" height="6" fill="url(#hatch)" />
            <text x="${sx}" y="${sy + 36}" fill="#94a3b8" font-size="11" font-family="monospace" text-anchor="middle">${sup.label || 'Pin'}</text>
          `;
        } else if (sup.type === 'roller') {
          // Roller support with 2 circles
          svg += `
            <polygon points="${sx},${sy} ${sx - 10},${sy + 14} ${sx + 10},${sy + 14}" fill="#1e293b" stroke="#38bdf8" stroke-width="2" />
            <circle cx="${sx - 5}" cy="${sy + 18}" r="3.5" fill="#38bdf8" />
            <circle cx="${sx + 5}" cy="${sy + 18}" r="3.5" fill="#38bdf8" />
            <line x1="${sx - 14}" y1="${sy + 22}" x2="${sx + 14}" y2="${sy + 22}" stroke="#94a3b8" stroke-width="2" />
            <rect x="${sx - 14}" y="${sy + 22}" width="28" height="6" fill="url(#hatch)" />
            <text x="${sx}" y="${sy + 38}" fill="#94a3b8" font-size="11" font-family="monospace" text-anchor="middle">${sup.label || 'Roller'}</text>
          `;
        } else if (sup.type === 'fixed') {
          // Clamped Wall
          const isLeft = sup.x === 0;
          const wx = isLeft ? sx - 10 : sx;
          const hatchX = isLeft ? sx - 16 : sx;
          svg += `
            <line x1="${sx}" y1="${sy - 28}" x2="${sx}" y2="${sy + 28}" stroke="#38bdf8" stroke-width="4" />
            <rect x="${hatchX}" y="${sy - 28}" width="16" height="56" fill="url(#hatch)" stroke="#334155" />
            <text x="${sx + (isLeft ? -22 : 22)}" y="${sy + 4}" fill="#94a3b8" font-size="11" font-family="monospace" text-anchor="middle">${sup.label || 'Fixed'}</text>
          `;
        } else if (sup.type === 'hinge') {
          // Internal Hinge (white circle in beam)
          svg += `
            <circle cx="${sx}" cy="${sy}" r="5" fill="#ffffff" stroke="#020617" stroke-width="2" />
            <text x="${sx}" y="${sy - 12}" fill="#e2e8f0" font-size="11" font-family="monospace" text-anchor="middle">${sup.label || 'Hinge (s=1)'}</text>
          `;
        }
      });
    }

    // 4. Loads
    if (config.loads) {
      config.loads.forEach(ld => {
        if (ld.type === 'point') {
          const px = toScreenX(ld.x);
          const py = beamY;
          svg += `
            <line x1="${px}" y1="${py - 45}" x2="${px}" y2="${py - 4}" stroke="#facc15" stroke-width="3" marker-end="url(#arrowDown)" />
            <text x="${px}" y="${py - 52}" fill="#facc15" font-size="12" font-family="monospace" font-weight="bold" text-anchor="middle">${ld.val}</text>
          `;
        } else if (ld.type === 'udl') {
          const x1 = toScreenX(ld.start);
          const x2 = toScreenX(ld.end);
          const arrowSpacing = 24;
          const count = Math.max(2, Math.floor((x2 - x1) / arrowSpacing));
          svg += `
            <rect x="${x1}" y="${beamY - 32}" width="${x2 - x1}" height="28" fill="rgba(250, 204, 21, 0.12)" stroke="#facc15" stroke-dasharray="3,3" />
            <line x1="${x1}" y1="${beamY - 32}" x2="${x2}" y2="${beamY - 32}" stroke="#facc15" stroke-width="2" />
          `;
          for (let i = 0; i <= count; i++) {
            const ax = x1 + (i / count) * (x2 - x1);
            svg += `<line x1="${ax}" y1="${beamY - 32}" x2="${ax}" y2="${beamY - 4}" stroke="#facc15" stroke-width="1.8" marker-end="url(#arrowDown)" />`;
          }
          svg += `<text x="${(x1 + x2) / 2}" y="${beamY - 38}" fill="#facc15" font-size="12" font-family="monospace" font-weight="bold" text-anchor="middle">${ld.val}</text>`;
        } else if (ld.type === 'moment') {
          const mx = toScreenX(ld.x);
          const r = 20;
          const isCw = ld.cw !== false;
          // Curved arrow for moment
          const path = isCw 
            ? `M ${mx - r} ${beamY} A ${r} ${r} 0 1 1 ${mx + r} ${beamY}` 
            : `M ${mx + r} ${beamY} A ${r} ${r} 0 1 0 ${mx - r} ${beamY}`;
          svg += `
            <path d="${path}" fill="none" stroke="#f43f5e" stroke-width="2.5" marker-end="url(#arrowDown)" />
            <text x="${mx}" y="${beamY - 26}" fill="#f43f5e" font-size="12" font-family="monospace" font-weight="bold" text-anchor="middle">${ld.val}</text>
          `;
        }
      });
    }

    // 5. Dimension Line
    svg += `
      <line x1="${padX}" y1="${h - 22}" x2="${padX + beamLen}" y2="${h - 22}" stroke="#475569" stroke-width="1" />
      <line x1="${padX}" y1="${h - 28}" x2="${padX}" y2="${h - 16}" stroke="#475569" stroke-width="1" />
      <line x1="${padX + beamLen}" y1="${h - 28}" x2="${padX + beamLen}" y2="${h - 16}" stroke="#475569" stroke-width="1" />
      <text x="${padX + beamLen / 2}" y="${h - 8}" fill="#94a3b8" font-size="11" font-family="monospace" text-anchor="middle">Span L = ${L} m</text>
    `;

    // 6. Optional: Elastic Deflected Curve
    if (config.showDeflection) {
      // Cubic bezier curve approximating gravity sag
      const midX = padX + beamLen / 2;
      const sagY = beamY + (config.sagAmount || 22);
      svg += `
        <path d="M ${padX} ${beamY} Q ${midX} ${sagY} ${padX + beamLen} ${beamY}" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-dasharray="6,4" />
        <text x="${midX}" y="${sagY + 16}" fill="#38bdf8" font-size="11" font-family="monospace" text-anchor="middle">Deflected Shape v(x)</text>
      `;
    }

    return this.createSvg(w, h, svg);
  },

  // =========================================================================
  // 2. DUAL COMPARISON: REAL BEAM VS CONJUGATE BEAM
  // =========================================================================
  renderConjugateComparison: function(realName, realSvgConf, conjName, conjSvgConf) {
    return `
      <div class="dual-diagram-grid">
        <div class="diagram-pane">
          <div class="diagram-pane-title">🔹 REAL BEAM: ${realName}</div>
          ${this.renderBeam(realSvgConf)}
        </div>
        <div class="diagram-pane">
          <div class="diagram-pane-title" style="color:var(--gold)">🔸 CONJUGATE BEAM: ${conjName}</div>
          ${this.renderBeam(conjSvgConf)}
        </div>
      </div>
    `;
  },

  // =========================================================================
  // 3. TRUSS VISUALIZER (WITH COMPRESSION / TENSION / ZERO-FORCE COLORING)
  // =========================================================================
  renderTruss: function(config) {
    const w = config.width || 640;
    const h = config.height || 230;
    const padX = 70;
    const padY = 50;
    const scale = config.scale || 75;

    let svg = `
      <defs>
        <pattern id="trussHatch" width="6" height="6" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="6" stroke="#334155" stroke-width="1.5" />
        </pattern>
        <marker id="trussArrow" viewBox="0 0 10 10" refX="5" refY="10" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 0 L 5 10 z" fill="#facc15" />
        </marker>
      </defs>
      <rect x="0" y="0" width="${w}" height="${h}" fill="#070c18" rx="8" />
    `;

    // Coordinates mapper
    const nodes = config.nodes || {};
    function getCoords(key) {
      const n = nodes[key];
      return {
        x: padX + n[0] * scale,
        y: h - padY - n[1] * scale
      };
    }

    // Draw members
    if (config.members) {
      config.members.forEach(m => {
        const p1 = getCoords(m[0]);
        const p2 = getCoords(m[1]);
        let color = '#38bdf8'; // standard member
        let dash = 'none';
        if (m[2] === 'T') color = '#22c55e'; // Tension
        if (m[2] === 'C') color = '#ef4444'; // Compression
        if (m[2] === 'Z') { color = '#facc15'; dash = '4,4'; } // Zero force
        svg += `<line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" stroke="${color}" stroke-width="3" stroke-dasharray="${dash}" />`;
      });
    }

    // Draw joints
    Object.keys(nodes).forEach(k => {
      const p = getCoords(k);
      svg += `
        <circle cx="${p.x}" cy="${p.y}" r="6" fill="#0f172a" stroke="#f8fafc" stroke-width="2" />
        <text x="${p.x}" y="${p.y - 10}" fill="#94a3b8" font-size="12" font-family="monospace" font-weight="bold" text-anchor="middle">${k}</text>
      `;
    });

    // Draw support reactions
    if (config.supports) {
      config.supports.forEach(sup => {
        const p = getCoords(sup.node);
        if (sup.type === 'pin') {
          svg += `<polygon points="${p.x},${p.y} ${p.x - 10},${p.y + 16} ${p.x + 10},${p.y + 16}" fill="#1e293b" stroke="#38bdf8" stroke-width="2" />`;
          svg += `<rect x="${p.x - 12}" y="${p.y + 16}" width="24" height="6" fill="url(#trussHatch)" />`;
        } else if (sup.type === 'roller') {
          svg += `<polygon points="${p.x},${p.y} ${p.x - 8},${p.y + 12} ${p.x + 8},${p.y + 12}" fill="#1e293b" stroke="#38bdf8" stroke-width="2" />`;
          svg += `<circle cx="${p.x - 4}" cy="${p.y + 16}" r="3" fill="#38bdf8" /><circle cx="${p.x + 4}" cy="${p.y + 16}" r="3" fill="#38bdf8" />`;
          svg += `<line x1="${p.x - 12}" y1="${p.y + 20}" x2="${p.x + 12}" y2="${p.y + 20}" stroke="#94a3b8" stroke-width="1.5" />`;
        }
      });
    }

    // Draw loads
    if (config.loads) {
      config.loads.forEach(ld => {
        const p = getCoords(ld.node);
        svg += `
          <line x1="${p.x}" y1="${p.y - 36}" x2="${p.x}" y2="${p.y - 6}" stroke="#facc15" stroke-width="3" marker-end="url(#trussArrow)" />
          <text x="${p.x}" y="${p.y - 42}" fill="#facc15" font-size="12" font-family="monospace" font-weight="bold" text-anchor="middle">${ld.val}</text>
        `;
      });
    }

    return this.createSvg(w, h, svg);
  },

  // =========================================================================
  // 4. MOMENT & SHEAR DIAGRAMS VISUALIZER (BMD & SFD)
  // =========================================================================
  renderDiagramCurve: function(type, points, width, height, title) {
    const w = width || 640;
    const h = height || 160;
    const padX = 60;
    const baselineY = h / 2;
    const spanW = w - 2 * padX;

    let svg = `<rect x="0" y="0" width="${w}" height="${h}" fill="#070c18" rx="8" />`;
    svg += `<line x1="${padX}" y1="${baselineY}" x2="${padX + spanW}" y2="${baselineY}" stroke="#475569" stroke-width="1.5" stroke-dasharray="3,3" />`;
    svg += `<text x="14" y="24" fill="#38bdf8" font-size="11" font-family="monospace" font-weight="bold">${title || (type === 'bmd' ? 'BENDING MOMENT DIAGRAM (kN·m)' : 'SHEAR FORCE DIAGRAM (kN)')}</text>`;

    if (points && points.length > 1) {
      let pathD = `M ${padX + points[0].x * spanW} ${baselineY - points[0].y}`;
      for (let i = 1; i < points.length; i++) {
        const px = padX + points[i].x * spanW;
        const py = baselineY - points[i].y;
        if (points[i].control) {
          const cx = padX + points[i].control.x * spanW;
          const cy = baselineY - points[i].control.y;
          pathD += ` Q ${cx} ${cy} ${px} ${py}`;
        } else {
          pathD += ` L ${px} ${py}`;
        }
      }

      const color = type === 'bmd' ? '#f43f5e' : '#22c55e';
      const fillArea = `${pathD} L ${padX + spanW} ${baselineY} L ${padX} ${baselineY} Z`;
      svg += `<path d="${fillArea}" fill="${type === 'bmd' ? 'rgba(244, 63, 94, 0.12)' : 'rgba(34, 197, 94, 0.12)'}" />`;
      svg += `<path d="${pathD}" fill="none" stroke="${color}" stroke-width="2.5" />`;

      // Value callouts
      points.forEach(pt => {
        if (pt.label) {
          const lx = padX + pt.x * spanW;
          const ly = baselineY - pt.y + (pt.y >= 0 ? -8 : 16);
          svg += `<text x="${lx}" y="${ly}" fill="${color}" font-size="11" font-family="monospace" font-weight="bold" text-anchor="middle">${pt.label}</text>`;
        }
      });
    }

    return this.createSvg(w, h, svg);
  }
};

if (typeof module !== 'undefined') module.exports = StructureVisuals;
