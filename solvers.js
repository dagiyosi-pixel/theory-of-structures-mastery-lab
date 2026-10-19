// COTM 3101: Theory of Structures - Interactive Structural Solvers & Visualizers
// Integrates real-time static calculations with dynamic SVG diagrams.

const StructureSolvers = {
  // =========================================================================
  // 1. DETERMINACY & STABILITY ENGINE
  // =========================================================================
  analyzeDeterminacy: function(type, inputs) {
    if (type === 'beam') {
      const r = parseInt(inputs.reactions) || 0;
      const s = parseInt(inputs.internalHinges) || 0;
      const parallel = inputs.parallelReactions || false;
      const concurrent = inputs.concurrentReactions || false;

      let stable = true;
      let notes = [];

      if (parallel) {
        stable = false;
        notes.push("CRITICAL TRAP: All reaction forces are parallel (e.g., all vertical rollers)! The beam cannot resist lateral loads (ΣFx = 0 unsatisfied).");
      }
      if (concurrent) {
        stable = false;
        notes.push("CRITICAL TRAP: All reaction lines intersect at a single point! The structure has zero rotational resistance about this point.");
      }

      const eqCount = 3 + s;
      const d = r - eqCount;

      let status = "";
      if (r < 3) {
        stable = false;
        status = "Externally Unstable (r < 3)";
        notes.push("Fewer than 3 external restraints in 2D space.");
      } else if (!stable) {
        status = "Geometrically Unstable Mechanism";
      } else if (d === 0) {
        status = "Statically Determinate & Stable";
        notes.push("Available reactions exactly match equations (r = 3 + s). All reactions and internal forces can be solved by statics.");
      } else if (d > 0) {
        status = `Statically Indeterminate to Degree ${d}`;
        notes.push(`Requires ${d} additional compatibility equations (Force Method, Three-Moment, or Displacement Method).`);
      } else {
        stable = false;
        status = "Unstable Kinematic Mechanism";
        notes.push("Internal releases exceed reactions, creating an internal folding mechanism.");
      }

      // Generate visual SVG representation
      let supports = [];
      if (r >= 3 && !parallel) {
        supports = [{ x: 0, type: 'pin', label: 'Pin (r=2)' }, { x: 8, type: 'roller', label: 'Roller (r=1)' }];
      } else if (parallel) {
        supports = [{ x: 1, type: 'roller', label: 'Roller 1' }, { x: 4, type: 'roller', label: 'Roller 2' }, { x: 7, type: 'roller', label: 'Roller 3' }];
      }
      if (s > 0) {
        supports.push({ x: 4, type: 'hinge', label: `Hinge (s=${s})` });
      }

      const svgHtml = StructureVisuals.renderBeam({
        width: 620,
        height: 180,
        length: 8,
        supports: supports,
        loads: [{ x: 4, type: 'point', val: 'Arbitrary Load P' }]
      });

      return {
        type: 'Continuous Beam',
        formula: `D = r - (3 + s) = ${r} - (3 + ${s}) = ${d}`,
        degree: d,
        status: status,
        isStable: stable,
        notes: notes,
        svg: svgHtml
      };
    }

    if (type === 'truss') {
      const j = parseInt(inputs.joints) || 0;
      const m = parseInt(inputs.members) || 0;
      const r = parseInt(inputs.reactions) || 0;
      const hasUnbracedPanel = inputs.unbracedPanel || false;

      const r_m = 3;
      const d_ext = r - r_m;
      const d_int = (m + r_m) - (2 * j);
      const d_total = (m + r) - (2 * j);

      let stable = true;
      let notes = [];

      if (r < 3) {
        stable = false;
        notes.push("External reactions r < 3 → Externally unstable.");
      }
      if (hasUnbracedPanel) {
        stable = false;
        notes.push("CRITICAL TRAP: An unbraced rectangular panel lacks diagonal bars! Even if m + r = 2j, that panel collapses in shear (Internally Unstable Mechanism).");
      }

      let status = "";
      if (!stable) {
        status = "Unstable Mechanism";
      } else if (d_total === 0) {
        status = "Statically Determinate & Stable";
        notes.push("All 2j joint equations are satisfied by the available members and reactions.");
      } else if (d_total > 0) {
        status = `Statically Indeterminate (Overall D = ${d_total})`;
        notes.push(`External Indeterminacy D_e = ${d_ext >= 0 ? d_ext : 0}, Internal Indeterminacy D_i = ${d_int}.`);
      } else {
        status = "Internally Unstable (Lacks sufficient members)";
        stable = false;
      }

      const svgHtml = StructureVisuals.renderTruss({
        width: 620,
        height: 180,
        scale: 65,
        nodes: { A: [0, 0], B: [1.6, 0], C: [3.2, 0], D: [4.8, 0], E: [0.8, 1.2], F: [2.4, 1.2], G: [4.0, 1.2] },
        members: [
          ['A', 'B'], ['B', 'C'], ['C', 'D'],
          ['E', 'F'], ['F', 'G'],
          ['A', 'E'], ['B', 'E'], ['B', 'F'], ['C', 'F'], ['C', 'G'], ['D', 'G'],
          ['E', 'B'], ['F', 'C']
        ],
        supports: [{ node: 'A', type: 'pin' }, { node: 'D', type: 'roller' }],
        loads: [{ node: 'F', val: 'P' }]
      });

      return {
        type: 'Plane Truss',
        formula: `Overall: D = (m + r) - 2j = (${m} + ${r}) - 2(${j}) = ${d_total}\nExternal: D_e = r - 3 = ${r} - 3 = ${d_ext}\nInternal: D_i = (m + 3) - 2j = (${m} + 3) - 2(${j}) = ${d_int}`,
        degree: d_total,
        status: status,
        isStable: stable,
        notes: notes,
        svg: svgHtml
      };
    }

    if (type === 'frame') {
      const j = parseInt(inputs.joints) || 0;
      const m = parseInt(inputs.members) || 0;
      const r = parseInt(inputs.reactions) || 0;
      const s = parseInt(inputs.specialConditions) || 0;
      const loops = parseInt(inputs.closedLoops) || 0;

      const totalUnknowns = 3 * m + r;
      const totalEqs = 3 * j + s;
      const d_total = totalUnknowns - totalEqs;
      const d_loops = 3 * loops - s;

      let stable = r >= 3;
      let notes = [];
      let status = "";

      if (d_total === 0 && stable) {
        status = "Statically Determinate & Stable";
      } else if (d_total > 0 && stable) {
        status = `Statically Indeterminate to Degree ${d_total}`;
        notes.push(`Closed-Loop Formula Check: D_i = 3(closed loops) - s = 3(${loops}) - ${s} = ${d_loops}`);
      } else {
        status = "Unstable Frame Mechanism";
        stable = false;
      }

      return {
        type: 'Rigid Frame',
        formula: `D = (3m + r) - (3j + s) = [3(${m}) + ${r}] - [3(${j}) + ${s}] = ${totalUnknowns} - ${totalEqs} = ${d_total}`,
        degree: d_total,
        status: status,
        isStable: stable,
        notes: notes
      };
    }
  },

  // =========================================================================
  // 2. TWO-SPAN THREE-MOMENT EQUATION ENGINE WITH SFD/BMD CURVES
  // =========================================================================
  solveThreeMoment: function(params) {
    const L1 = parseFloat(params.L1) || 4.0;
    const L2 = parseFloat(params.L2) || 6.0;
    const I1 = parseFloat(params.I1) || 1.0;
    const I2 = parseFloat(params.I2) || 1.0;

    const span1Type = params.span1LoadType; // 'udl' or 'point'
    const span2Type = params.span2LoadType; // 'udl' or 'point'

    const w1 = parseFloat(params.w1) || 0;
    const P1 = parseFloat(params.P1) || 0;
    const a1 = parseFloat(params.a1) || (L1 / 2);
    const b1 = L1 - a1;

    const w2 = parseFloat(params.w2) || 0;
    const P2 = parseFloat(params.P2) || 0;
    const a2 = parseFloat(params.a2) || (L2 / 2); // distance from C
    const b2 = L2 - a2;

    // Load terms: (6*A*x / L)
    let term1 = 0;
    if (span1Type === 'udl') {
      term1 = (w1 * Math.pow(L1, 3)) / 4;
    } else if (span1Type === 'point') {
      term1 = (P1 * a1 * (Math.pow(L1, 2) - Math.pow(a1, 2))) / L1;
    }

    let term2 = 0;
    if (span2Type === 'udl') {
      term2 = (w2 * Math.pow(L2, 3)) / 4;
    } else if (span2Type === 'point') {
      term2 = (P2 * a2 * (Math.pow(L2, 2) - Math.pow(a2, 2))) / L2;
    }

    const coeff_MB = 2 * ((L1 / I1) + (L2 / I2));
    const RHS = -((term1 / I1) + (term2 / I2));
    const M_B = RHS / coeff_MB;

    // Reactions by isolating spans
    let R_A = 0;
    if (span1Type === 'udl') {
      R_A = (w1 * L1 / 2) + (M_B / L1);
    } else if (span1Type === 'point') {
      R_A = (P1 * b1 / L1) + (M_B / L1);
    }

    let R_C = 0;
    if (span2Type === 'udl') {
      R_C = (w2 * L2 / 2) + (M_B / L2);
    } else if (span2Type === 'point') {
      R_C = (P2 * b2 / L2) + (M_B / L2);
    }

    let totalLoad = 0;
    if (span1Type === 'udl') totalLoad += w1 * L1; else totalLoad += P1;
    if (span2Type === 'udl') totalLoad += w2 * L2; else totalLoad += P2;

    const R_B = totalLoad - R_A - R_C;

    // Max Sagging Moments
    let maxSag1 = 0;
    if (span1Type === 'udl') {
      maxSag1 = (w1 * Math.pow(L1, 2) / 8) + (M_B / 2);
    } else {
      maxSag1 = (P1 * a1 * b1 / L1) + (M_B * a1 / L1);
    }

    let maxSag2 = 0;
    if (span2Type === 'udl') {
      maxSag2 = (w2 * Math.pow(L2, 2) / 8) + (M_B / 2);
    } else {
      maxSag2 = (P2 * a2 * b2 / L2) + (M_B * (L2 - a2) / L2);
    }

    // Dynamic Beam SVG
    const totalL = L1 + L2;
    const beamSvg = StructureVisuals.renderBeam({
      width: 640,
      height: 190,
      length: totalL,
      supports: [
        { x: 0, type: 'pin', label: `A (R=${R_A.toFixed(1)}kN)` },
        { x: L1, type: 'roller', label: `B (R=${R_B.toFixed(1)}kN)` },
        { x: totalL, type: 'roller', label: `C (R=${R_C.toFixed(1)}kN)` }
      ],
      loads: [
        span1Type === 'udl' ? { start: 0, end: L1, type: 'udl', val: `${w1} kN/m` } : { x: a1, type: 'point', val: `${P1} kN` },
        span2Type === 'udl' ? { start: L1, end: totalL, type: 'udl', val: `${w2} kN/m` } : { x: L1 + (L2 - a2), type: 'point', val: `${P2} kN` }
      ],
      showDeflection: true,
      sagAmount: 22
    });

    // Dynamic BMD Curve
    const fracB = L1 / totalL;
    const bmdPoints = [
      { x: 0, y: 0, label: '0' },
      { x: fracB / 2, y: maxSag1 * 0.8, control: { x: fracB / 2, y: maxSag1 * 1.1 }, label: `+${maxSag1.toFixed(1)}` },
      { x: fracB, y: M_B * 0.8, label: `${M_B.toFixed(1)}` },
      { x: fracB + (1 - fracB) / 2, y: maxSag2 * 0.8, control: { x: fracB + (1 - fracB) / 2, y: maxSag2 * 1.1 }, label: `+${maxSag2.toFixed(1)}` },
      { x: 1, y: 0, label: '0' }
    ];
    const bmdSvg = StructureVisuals.renderDiagramCurve('bmd', bmdPoints, 640, 160, `BENDING MOMENT DIAGRAM — Support Moment M_B = ${M_B.toFixed(2)} kN·m`);

    return {
      L1: L1,
      L2: L2,
      term1: term1.toFixed(2),
      term2: term2.toFixed(2),
      coeff_MB: coeff_MB.toFixed(2),
      RHS: RHS.toFixed(2),
      M_B: M_B.toFixed(2),
      R_A: R_A.toFixed(2),
      R_B: R_B.toFixed(2),
      R_C: R_C.toFixed(2),
      maxSag1: maxSag1.toFixed(2),
      maxSag2: maxSag2.toFixed(2),
      beamSvg: beamSvg,
      bmdSvg: bmdSvg
    };
  },

  // =========================================================================
  // 3. HARDY CROSS LIVE ITERATIVE MOMENT DISTRIBUTION ENGINE
  // =========================================================================
  solveHardyCross2Span: function(params) {
    const L1 = parseFloat(params.L1) || 3.6;
    const L2 = parseFloat(params.L2) || 4.0;
    const I1 = parseFloat(params.I1) || 3.6;
    const I2 = parseFloat(params.I2) || 3.6;

    const endA = params.endA || 'fixed';
    const endC = params.endC || 'hinged';

    let K_BA = I1 / L1;
    if (endA === 'hinged') K_BA = 0.75 * (I1 / L1);

    let K_BC = I2 / L2;
    if (endC === 'hinged') K_BC = 0.75 * (I2 / L2);

    const sumK_B = K_BA + K_BC;
    const DF_BA = K_BA / sumK_B;
    const DF_BC = K_BC / sumK_B;

    const DF_AB = endA === 'fixed' ? 0.0 : 1.0;
    const DF_CB = endC === 'fixed' ? 0.0 : 1.0;

    let FEM_AB = parseFloat(params.FEM_AB) || -30.0;
    let FEM_BA = parseFloat(params.FEM_BA) || +30.0;
    let FEM_BC = parseFloat(params.FEM_BC) || -22.5;
    let FEM_CB = parseFloat(params.FEM_CB) || +22.5;

    if (endC === 'hinged' && params.useModifiedStiffness) {
      const releaseC = -FEM_CB;
      FEM_BC = FEM_BC + 0.5 * releaseC;
      FEM_CB = 0.0;
    }

    const rows = [];
    rows.push({
      step: 'Distribution Factors (DF)',
      AB: DF_AB.toFixed(3),
      BA: DF_BA.toFixed(3),
      BC: DF_BC.toFixed(3),
      CB: DF_CB.toFixed(3)
    });

    rows.push({
      step: 'Initial Fixed End Moments (FEM)',
      AB: FEM_AB.toFixed(2),
      BA: FEM_BA.toFixed(2),
      BC: FEM_BC.toFixed(2),
      CB: FEM_CB.toFixed(2)
    });

    let cur_AB = FEM_AB;
    let cur_BA = FEM_BA;
    let cur_BC = FEM_BC;
    let cur_CB = FEM_CB;

    // Cycle 1: Balance
    const unbal_B1 = cur_BA + cur_BC;
    const bal_BA1 = -unbal_B1 * DF_BA;
    const bal_BC1 = -unbal_B1 * DF_BC;

    let bal_AB1 = 0;
    let bal_CB1 = 0;
    if (endA === 'hinged') bal_AB1 = -cur_AB * DF_AB;
    if (endC === 'hinged' && !params.useModifiedStiffness) bal_CB1 = -cur_CB * DF_CB;

    rows.push({
      step: 'Cycle 1: Balance Joint B',
      AB: bal_AB1.toFixed(2),
      BA: bal_BA1.toFixed(2),
      BC: bal_BC1.toFixed(2),
      CB: bal_CB1.toFixed(2)
    });

    cur_AB += bal_AB1;
    cur_BA += bal_BA1;
    cur_BC += bal_BC1;
    cur_CB += bal_CB1;

    // Cycle 1: Carry-Over
    const co_AB1 = (endA === 'fixed') ? 0.5 * bal_BA1 : 0;
    const co_BA1 = (endA === 'hinged') ? 0.5 * bal_AB1 : 0;
    const co_CB1 = (endC === 'fixed') ? 0.5 * bal_BC1 : 0;
    const co_BC1 = (endC === 'hinged' && !params.useModifiedStiffness) ? 0.5 * bal_CB1 : 0;

    rows.push({
      step: 'Cycle 1: Carry-Over (COF = +0.5)',
      AB: co_AB1.toFixed(2),
      BA: co_BA1.toFixed(2),
      BC: co_BC1.toFixed(2),
      CB: co_CB1.toFixed(2)
    });

    cur_AB += co_AB1;
    cur_BA += co_BA1;
    cur_BC += co_BC1;
    cur_CB += co_CB1;

    // Cycle 2: Balance
    const unbal_B2 = co_BA1 + co_BC1;
    const bal_BA2 = -unbal_B2 * DF_BA;
    const bal_BC2 = -unbal_B2 * DF_BC;

    rows.push({
      step: 'Cycle 2: Balance Joint B',
      AB: '0.00',
      BA: bal_BA2.toFixed(2),
      BC: bal_BC2.toFixed(2),
      CB: '0.00'
    });

    cur_BA += bal_BA2;
    cur_BC += bal_BC2;

    const co_AB2 = (endA === 'fixed') ? 0.5 * bal_BA2 : 0;
    rows.push({
      step: 'Cycle 2: Carry-Over',
      AB: co_AB2.toFixed(2),
      BA: '0.00',
      BC: '0.00',
      CB: (endC === 'fixed') ? (0.5 * bal_BC2).toFixed(2) : '0.00'
    });
    cur_AB += co_AB2;

    rows.push({
      step: 'FINAL EQUILIBRIUM MOMENTS (ΣM)',
      AB: cur_AB.toFixed(2),
      BA: cur_BA.toFixed(2),
      BC: cur_BC.toFixed(2),
      CB: cur_CB.toFixed(2),
      isFinal: true
    });

    return {
      K_BA: K_BA.toFixed(3),
      K_BC: K_BC.toFixed(3),
      DF_BA: DF_BA.toFixed(3),
      DF_BC: DF_BC.toFixed(3),
      rows: rows
    };
  },

  // =========================================================================
  // 4. CONJUGATE BEAM INTERACTIVE TRANSFORMER
  // =========================================================================
  getConjugateTransform: function(caseKey) {
    const cases = {
      cantilever: {
        title: "Cantilever Beam (Fixed at A, Free Tip at B)",
        realSvg: {
          width: 580,
          height: 160,
          length: 6,
          supports: [{ x: 0, type: 'fixed', label: 'Fixed (θ=0, v=0)' }],
          loads: [{ x: 6, type: 'point', val: 'P ↓' }],
          showDeflection: true,
          sagAmount: 24
        },
        conjSvg: {
          width: 580,
          height: 160,
          length: 6,
          supports: [{ x: 6, type: 'fixed', label: 'Fixed (V*≠0, M*≠0)' }],
          loads: [{ start: 0, end: 6, type: 'udl', val: 'M/EI Triangle ↓' }]
        },
        explanation: "At fixed end A, θ=0 and v=0, which transforms to V*=0 and M*=0 (Free End). At free tip B, θ≠0 and v≠0, which requires V*≠0 and M*≠0 (Fixed Support)."
      },
      propped: {
        title: "Propped Cantilever (Fixed at A, Roller at B)",
        realSvg: {
          width: 580,
          height: 160,
          length: 6,
          supports: [{ x: 0, type: 'fixed', label: 'Fixed (θ=0, v=0)' }, { x: 6, type: 'roller', label: 'Roller (v=0)' }],
          loads: [{ start: 0, end: 6, type: 'udl', val: 'w (kN/m)' }],
          showDeflection: true,
          sagAmount: 18
        },
        conjSvg: {
          width: 580,
          height: 160,
          length: 6,
          supports: [{ x: 6, type: 'pin', label: 'Pin (M*=0)' }],
          loads: [{ start: 0, end: 6, type: 'udl', val: 'M/EI Diagram' }]
        },
        explanation: "Fixed end A becomes a Free End. Simple exterior roller B remains a Simple Support (v=0 ➔ M*=0)."
      },
      overhang: {
        title: "Overhanging Beam (Pin at A, Roller at B, Free Tip at C)",
        realSvg: {
          width: 580,
          height: 160,
          length: 8,
          supports: [{ x: 0, type: 'pin', label: 'Pin A' }, { x: 6, type: 'roller', label: 'Roller B' }],
          loads: [{ x: 8, type: 'point', val: '21 kN ↓' }]
        },
        conjSvg: {
          width: 580,
          height: 160,
          length: 8,
          supports: [{ x: 0, type: 'pin', label: 'Pin A' }, { x: 6, type: 'hinge', label: 'Internal Hinge B' }, { x: 8, type: 'fixed', label: 'Fixed Support C' }],
          loads: [{ start: 0, end: 8, type: 'udl', val: 'M/EI Diagram' }]
        },
        explanation: "Exterior pin A remains a pin. Interior support B transforms into an INTERNAL HINGE (v=0 ➔ M*=0). Overhang tip C transforms into a FIXED SUPPORT (θ≠0, v≠0 ➔ V*≠0, M*≠0)!"
      }
    };

    return cases[caseKey] || cases['cantilever'];
  }
};

if (typeof module !== 'undefined') module.exports = StructureSolvers;
