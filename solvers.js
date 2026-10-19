// COTM 3101: Theory of Structures - Interactive Structural Solvers
// Provides real-time calculation engines for structural engineering analysis.

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
        notes.push("CRITICAL TRAP: All reaction forces are parallel! The structure is geometrically unstable horizontally (cannot resist lateral loads).");
      }
      if (concurrent) {
        stable = false;
        notes.push("CRITICAL TRAP: All reaction lines intersect at a single point! The structure is geometrically unstable against rotation about this point.");
      }

      const eqCount = 3 + s;
      const d = r - eqCount;

      let status = "";
      if (r < 3) {
        stable = false;
        status = "Externally Unstable (r < 3)";
        notes.push("Fewer than 3 reaction components in 2D space.");
      } else if (!stable) {
        status = "Geometrically Unstable Mechanism";
      } else if (d === 0) {
        status = "Statically Determinate & Stable";
        notes.push("Reactions exactly equal equilibrium equations (r = 3 + s). All internal forces can be solved with statics.");
      } else if (d > 0) {
        status = `Statically Indeterminate to Degree ${d}`;
        notes.push(`Requires ${d} compatibility condition(s) (Force/Flexibility Method or Displacement Method).`);
      } else {
        stable = false;
        status = "Unstable Mechanism (Equations exceed reactions)";
        notes.push("Excess internal releases make this beam an unstable kinematic mechanism.");
      }

      return {
        type: 'Beam',
        formula: `D = r - (3 + s) = ${r} - (3 + ${s}) = ${d}`,
        degree: d,
        status: status,
        isStable: stable,
        notes: notes
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
        notes.push("CRITICAL TRAP: An open rectangular panel lacks diagonal bracing! Even if m + r = 2j, that panel collapses in shear (Internally Unstable).");
      }

      let status = "";
      if (!stable) {
        status = "Unstable Mechanism";
      } else if (d_total === 0) {
        status = "Statically Determinate & Stable";
        notes.push("All joint equilibrium equations (2j) are satisfied by the available members and reactions.");
      } else if (d_total > 0) {
        status = `Statically Indeterminate (Overall D = ${d_total})`;
        notes.push(`External Indeterminacy D_e = ${d_ext >= 0 ? d_ext : 0}, Internal Indeterminacy D_i = ${d_int}.`);
      } else {
        status = "Internally Unstable (Lacks sufficient members)";
        stable = false;
      }

      return {
        type: 'Plane Truss',
        formula: `Overall: D = (m + r) - 2j = (${m} + ${r}) - 2(${j}) = ${d_total}\nExternal: D_e = r - 3 = ${r} - 3 = ${d_ext}\nInternal: D_i = (m + 3) - 2j = (${m} + 3) - 2(${j}) = ${d_int}`,
        degree: d_total,
        status: status,
        isStable: stable,
        notes: notes
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
        notes.push(`Classical Closed-Loop Check: D_i = 3(loops) - s = 3(${loops}) - ${s} = ${d_loops}`);
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
  // 2. TWO-SPAN THREE-MOMENT EQUATION ENGINE (Clapeyron's Equation)
  // =========================================================================
  solveThreeMoment: function(params) {
    const L1 = parseFloat(params.L1) || 4.0;
    const L2 = parseFloat(params.L2) || 6.0;
    const I1 = parseFloat(params.I1) || 1.0;
    const I2 = parseFloat(params.I2) || 1.0;

    const span1Type = params.span1LoadType; // 'udl' or 'point'
    const span2Type = params.span2LoadType; // 'udl' or 'point'

    // Load values
    const w1 = parseFloat(params.w1) || 0;
    const P1 = parseFloat(params.P1) || 0;
    const a1 = parseFloat(params.a1) || (L1 / 2); // dist from A to load
    const b1 = L1 - a1;

    const w2 = parseFloat(params.w2) || 0;
    const P2 = parseFloat(params.P2) || 0;
    const a2 = parseFloat(params.a2) || (L2 / 2); // dist from C to load (outer support)
    const b2 = L2 - a2;

    // Load terms: (6*A*x / L)
    // For Span 1 (about joint B, centroid x measured from A):
    let term1 = 0;
    if (span1Type === 'udl') {
      term1 = (w1 * Math.pow(L1, 3)) / 4;
    } else if (span1Type === 'point') {
      term1 = (P1 * a1 * (Math.pow(L1, 2) - Math.pow(a1, 2))) / L1;
    }

    // For Span 2 (about joint B, centroid x measured from C):
    let term2 = 0;
    if (span2Type === 'udl') {
      term2 = (w2 * Math.pow(L2, 3)) / 4;
    } else if (span2Type === 'point') {
      term2 = (P2 * a2 * (Math.pow(L2, 2) - Math.pow(a2, 2))) / L2;
    }

    // Modified by relative flexural stiffness (I1, I2):
    const coeff_MB = 2 * ((L1 / I1) + (L2 / I2));
    const RHS = -((term1 / I1) + (term2 / I2));

    // Simple ends: M_A = 0, M_C = 0
    const M_B = RHS / coeff_MB;

    // Static reactions by cutting at support B:
    // Span 1: Sum moments about B: R_A * L1 - TotalLoad1*Centroid + M_B = 0
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

    // Total vertical equilibrium:
    let totalLoad = 0;
    if (span1Type === 'udl') totalLoad += w1 * L1; else totalLoad += P1;
    if (span2Type === 'udl') totalLoad += w2 * L2; else totalLoad += P2;

    const R_B = totalLoad - R_A - R_C;

    // Midspan / max positive moments:
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
      maxSag2: maxSag2.toFixed(2)
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

    const endA = params.endA || 'fixed'; // 'fixed' or 'hinged'
    const endC = params.endC || 'hinged'; // 'fixed' or 'hinged'

    // Stiffness K:
    let K_BA = I1 / L1;
    if (endA === 'hinged') K_BA = 0.75 * (I1 / L1);

    let K_BC = I2 / L2;
    if (endC === 'hinged') K_BC = 0.75 * (I2 / L2);

    const sumK_B = K_BA + K_BC;
    const DF_BA = K_BA / sumK_B;
    const DF_BC = K_BC / sumK_B;

    const DF_AB = endA === 'fixed' ? 0.0 : 1.0;
    const DF_CB = endC === 'fixed' ? 0.0 : 1.0;

    // Fixed End Moments (User inputs or standard point/UDL load)
    let FEM_AB = parseFloat(params.FEM_AB) || -30.0;
    let FEM_BA = parseFloat(params.FEM_BA) || +30.0;
    let FEM_BC = parseFloat(params.FEM_BC) || -22.5;
    let FEM_CB = parseFloat(params.FEM_CB) || +22.5;

    // If end C is hinged and using modified 3/4 K, adjust FEM_BC to propped cantilever FEM
    if (endC === 'hinged' && params.useModifiedStiffness) {
      // Release joint C immediately: balance C and carry over to B
      const releaseC = -FEM_CB;
      FEM_BC = FEM_BC + 0.5 * releaseC;
      FEM_CB = 0.0;
    }

    // Step-by-step table generation
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

    // Iteration Cycle 1
    // Joint B unbalanced moment:
    const unbal_B1 = cur_BA + cur_BC;
    const bal_BA1 = -unbal_B1 * DF_BA;
    const bal_BC1 = -unbal_B1 * DF_BC;

    let bal_AB1 = 0;
    let bal_CB1 = 0;
    if (endA === 'hinged') bal_AB1 = -cur_AB * DF_AB;
    if (endC === 'hinged' && !params.useModifiedStiffness) bal_CB1 = -cur_CB * DF_CB;

    rows.push({
      step: 'Cycle 1: Balance (Distribution)',
      AB: bal_AB1.toFixed(2),
      BA: bal_BA1.toFixed(2),
      BC: bal_BC1.toFixed(2),
      CB: bal_CB1.toFixed(2)
    });

    cur_AB += bal_AB1;
    cur_BA += bal_BA1;
    cur_BC += bal_BC1;
    cur_CB += bal_CB1;

    // Carry-Over:
    const co_AB1 = (endA === 'fixed') ? 0.5 * bal_BA1 : 0;
    const co_BA1 = (endA === 'hinged') ? 0.5 * bal_AB1 : 0;
    const co_CB1 = (endC === 'fixed') ? 0.5 * bal_BC1 : 0;
    const co_BC1 = (endC === 'hinged' && !params.useModifiedStiffness) ? 0.5 * bal_CB1 : 0;

    rows.push({
      step: 'Cycle 1: Carry-Over (COF = 0.5)',
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
      step: 'Cycle 2: Balance (Distribution)',
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

    // Final Sum Row
    rows.push({
      step: 'FINAL END MOMENTS (ΣM)',
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
  }
};

// Export for browser or node
if (typeof module !== 'undefined') module.exports = StructureSolvers;
