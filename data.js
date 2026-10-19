// COTM 3101: Theory of Structures - Master Academic Knowledge Base & Learning Engine
// Addis Ababa University (AAU) / EiABC Curriculum

const COURSE_MODULES = [
  // =========================================================================
  // MODULE 1: STABILITY & DETERMINACY OF STRUCTURES
  // =========================================================================
  {
    id: "mod1",
    shortTitle: "1. Stability & Determinacy",
    fullTitle: "Chapter 1: Stability, Determinacy & Structural Loads",
    icon: "⚖️",
    prerequisites: "Engineering Mechanics (Statics), Coplanar Force Systems, Rigid Body Equilibrium (ΣFx=0, ΣFy=0, ΣM=0).",
    intuition: "Before calculating member sizes or stresses, an engineer must verify whether the structural geometry forms a rigid system capable of holding load, or a collapsible mechanism. Stability is about geometry; determinacy is about whether statics alone can solve it.",
    theory: [
      {
        heading: "1.1 Fundamental First Principles: Stability vs. Determinacy",
        body: `
          <p>Any 2D planar body has 3 independent degrees of freedom (translation in X, translation in Y, and rotation in Z). To prevent all rigid-body motion, external supports must provide at least <strong>r_m = 3</strong> independent restraints.</p>
          <div class="concept-callout">
            <strong>1. Stability (Geometric Configuration):</strong> Can the structure support any arbitrary system of applied loads without transforming into a mechanism? Stability depends purely on the <em>number and geometrical arrangement</em> of supports and members, NOT on cross-sectional strength.<br/><br/>
            <strong>2. Static Determinacy:</strong> Can all external support reactions and internal member forces be determined using <em>only</em> independent static equilibrium equations? If unknown forces exceed available equilibrium equations, the structure is <strong>Statically Indeterminate</strong>.
          </div>
        `,
        formula: `Degree of Indeterminacy (D) = (Total Unknown Forces) - (Available Equilibrium Equations)`
      },
      {
        heading: "1.2 External Stability & Determinacy (2D Coplanar)",
        body: `
          <p>In 2D structures, the minimum number of reaction components required for external stability is <strong>r_m = 3</strong>:</p>
          <ul>
            <li><strong>rₐ &lt; 3:</strong> Externally Unstable (Insufficient restraints).</li>
            <li><strong>rₐ = 3:</strong> Externally Determinate (Provided reactions are neither all parallel nor all concurrent!).</li>
            <li><strong>rₐ &gt; 3:</strong> Externally Indeterminate to degree <code>D_e = r_a - 3</code>.</li>
          </ul>
          <div class="concept-callout" style="border-left-color:var(--danger)">
            <strong>CRITICAL EXAM TRAP — Geometric Instability Traps:</strong><br/>
            Even if <em>rₐ = 3</em> (or more), the structure is <strong>completely unstable</strong> if:
            <ol style="margin-top:6px; padding-left:20px;">
              <li><strong>All reactions are parallel:</strong> For example, a beam supported by 3 vertical rollers has rₐ = 3, but ΣFx = 0 is unsatisfied. Any horizontal load causes instantaneous translation!</li>
              <li><strong>All reaction lines are concurrent:</strong> If lines of action of all 3 reactions pass through a single point <em>O</em>, the structure cannot resist any moment about <em>O</em> and rotates like a wheel!</li>
            </ol>
          </div>
        `,
        svgType: 'beamTrap'
      },
      {
        heading: "1.3 Plane Trusses: Internal & Overall Determinacy",
        body: `
          <p>A plane truss is formed by straight members connected by frictionless pin joints. Each joint provides 2 independent equilibrium equations (ΣFx = 0, ΣFy = 0).</p>
          <ul>
            <li>Total available joint equations = <strong>2j</strong>.</li>
            <li>Total unknowns = <strong>m</strong> internal member forces + <strong>r</strong> external reactions.</li>
            <li><strong>Overall Degree of Indeterminacy:</strong> <code>D = (m + r) - 2j</code></li>
            <li><strong>Internal Indeterminacy (assuming r_m = 3):</strong> Compare <code>2j</code> vs <code>m + 3</code>:
              <ul>
                <li>2j &gt; m + 3 ➔ Internally Unstable (Lacks sufficient members).</li>
                <li>2j = m + 3 ➔ Internally Determinate (Provided panels are fully triangulated).</li>
                <li>2j &lt; m + 3 ➔ Internally Indeterminate (Degree D_i = m + 3 - 2j).</li>
              </ul>
            </li>
          </ul>
          <p><strong>Triangulation Rule:</strong> Even if 2j = m + 3, if any rectangular panel lacks a diagonal bar, that unbraced panel forms an internal shear mechanism that collapses under load!</p>
        `
      },
      {
        heading: "1.4 Continuous Rigid Frames: Member Formula vs. Closed-Loop Shortcut",
        body: `
          <p>Every member in a continuous rigid frame carries 3 internal forces (Axial N, Shear V, Bending Moment M), and every rigid joint provides 3 equations of static equilibrium (ΣFx = 0, ΣFy = 0, ΣM = 0).</p>
          <ul>
            <li><strong>General Joint/Member Formula:</strong> <code>D = (3m + r) - (3j + s)</code></li>
            <li><strong>Where:</strong>
              <ul>
                <li><em>m</em> = number of members</li>
                <li><em>r</em> = total external support reaction components</li>
                <li><em>j</em> = number of rigid joints</li>
                <li><em>s</em> = number of special condition equations provided by internal releases (e.g. internal hinges).</li>
              </ul>
            </li>
            <li><strong>Internal Hinge Release Rule:</strong> If <em>k</em> members meet at a frictionless internal pin inside a frame, the number of release conditions is: <code>s = k - 1</code>. (For 2 members meeting at a hinge, s = 2 - 1 = 1; for 3 members, s = 3 - 1 = 2).</li>
            <li><strong>Master Closed-Loop Shortcut:</strong> <code>D_i = 3n - I_c</code>, where <em>n</em> is the number of completely enclosed loops/cells and <em>I_c</em> is the number of internal releases. Each closed loop introduces 3 internal redundants!</li>
          </ul>
        `
      },
      {
        heading: "1.5 Structural Loads (Ethiopian Building Code Standard - EBCS)",
        body: `
          <p>Design loads are specified in national building codes according to structure function and environmental conditions:</p>
          <ul>
            <li><strong>Dead Loads (Permanent):</strong> Gravitational weight of all structural elements (slabs, beams, columns) and permanently attached finishes/fixtures. Computed using material unit weights (e.g., Reinforced Concrete ≈ 25 kN/m³).</li>
            <li><strong>Live Loads (Imposed / Transient):</strong> Occupancy loads (people, furniture, movable equipment). Treated as equivalent uniformly distributed loads (UDL) on floor plans.</li>
            <li><strong>Wind Loads:</strong> Lateral aerodynamic pressure caused by air velocity obstruction, friction, and suction. Increases non-linearly with building height.</li>
            <li><strong>Earthquake Loads (Seismic Inertia):</strong> Horizontal ground acceleration during seismic events generates dynamic inertia forces proportional to building mass ($F = m \cdot a$). Must be analyzed along at least two orthogonal building directions.</li>
          </ul>
        `
      }
    ],
    guidedExamples: [
      {
        title: "Lecture Example 1.1: Plane Truss Indeterminacy & Mechanism Trap (PDF 1, Page 5)",
        problem: "Evaluate three 8-joint bridge trusses (j = 8) supported by a pin and a roller (r = 3): Case A has m = 13 triangulated members; Case B has m = 14 members (center panel X-braced); Case C has m = 13 members (one panel X-braced, but another panel is an unbraced open rectangle).",
        svgConfig: {
          width: 640,
          height: 180,
          scale: 65,
          nodes: {
            A: [0, 0], B: [1.6, 0], C: [3.2, 0], D: [4.8, 0],
            E: [0.8, 1.2], F: [2.4, 1.2], G: [4.0, 1.2]
          },
          members: [
            ['A', 'B'], ['B', 'C'], ['C', 'D'],
            ['E', 'F'], ['F', 'G'],
            ['A', 'E'], ['B', 'E'], ['B', 'F'], ['C', 'F'], ['C', 'G'], ['D', 'G'],
            ['E', 'B'], ['F', 'C']
          ],
          supports: [{ node: 'A', type: 'pin' }, { node: 'D', type: 'roller' }],
          loads: [{ node: 'F', val: '40 kN ↓' }]
        },
        steps: [
          {
            stepName: "Step 1: Equilibrium Equations Count",
            content: "Each of the j = 8 pin joints provides 2 equations: Total Equations = 2j = 2 × 8 = 16 independent equations."
          },
          {
            stepName: "Step 2: Case A Analysis (Fully Triangulated, m = 13)",
            content: "Total unknowns: m + r = 13 + 3 = 16. Compare: (m + r) - 2j = 16 - 16 = 0. All panels form triangles. Verdict: <strong>Statically Determinate & Stable</strong>."
          },
          {
            stepName: "Step 3: Case B Analysis (X-Braced Center Panel, m = 14)",
            content: "Total unknowns: m + r = 14 + 3 = 17. Compare: (m + r) - 2j = 17 - 16 = 1. One redundant member exists. Verdict: <strong>Indeterminate to the 1st Degree (D = 1) & Stable</strong>."
          },
          {
            stepName: "Step 4: Case C Analysis (Mechanism Trap, m = 13)",
            content: "Numerically: m + r = 13 + 3 = 16 = 2j. BUT one panel lacks a diagonal bar! That open rectangle cannot resist transverse shear and will instantaneously collapse like a parallelogram. Verdict: <strong>Internally Unstable Mechanism</strong> despite numerical balance!"
          }
        ],
        hints: [
          "Hint 1: Check whether every internal panel is formed by rigid triangles.",
          "Hint 2: An unbraced 4-bar quadrilateral is an unstable mechanism in 2D."
        ]
      },
      {
        title: "Lecture Example 1.2: Multi-Bay Multi-Story Rigid Frame (PDF 1, Page 6)",
        problem: "Determine the degree of indeterminacy for a 2-bay, 2-story building frame with j = 9 rigid joints, m = 10 members, s = 0 internal hinges, and 3 fixed ground supports (r = 9).",
        svgConfig: {
          width: 580,
          height: 220
        },
        steps: [
          {
            stepName: "Step 1: Joint/Member Method",
            content: "Unknowns = 3m + r = 3(10) + 9 = 30 + 9 = 39 unknowns.<br/>Available Equations = 3j + s = 3(9) + 0 = 27 equations.<br/>Overall Degree D = 39 - 27 = <strong>12th Degree Indeterminate</strong>."
          },
          {
            stepName: "Step 2: Closed-Loop Shortcut Verification",
            content: "Ground acts as an infinitely rigid base closing the lower 2 bays. Total enclosed cells n = 2 (upper story) + 2 (lower story) = 4 closed loops.<br/>Degree D = 3n - I_c = 3(4) - 0 = <strong>12</strong>. Matches in 5 seconds!"
          }
        ],
        hints: [
          "Hint 1: Each closed loop requires 3 cuts to become an open tree (determinate base structure).",
          "Hint 2: 3 cuts per loop × 4 loops = 12 redundants."
        ]
      }
    ],
    shortcuts: [
      "⚡ The Closed-Loop Visual Rule: Count the closed 'window panes' in a rigid frame. Each pane = 3 redundants (Axial, Shear, Moment). Degree D = 3 × (Number of Panes).",
      "🔥 The 3-Roller Fallacy: Never accept a structure supported only by vertical rollers! Even with 10 rollers, zero horizontal restraint means immediate lateral collapse under wind.",
      "🎯 Pin in Rigid Frame: If 'k' members meet at a hinge, special equations s = k - 1. A hinge connecting 2 members gives s = 1. A hinge connecting 3 members gives s = 2."
    ],
    methodSelection: "Use external/internal determinacy checks as the mandatory Step 0 for EVERY structural problem. If D = 0, solve with statics (Method of Joints / Sections). If D > 0, choose an indeterminate method based on kinematic vs static degrees.",
    commonTraps: [
      "Assuming 2j = m + 3 guarantees truss stability. (Trap: An unbraced square panel makes it collapse).",
      "Counting an internal hinge as 1 equation when 3 members meet at it (it provides 3 - 1 = 2 equations).",
      "Forgetting that fixed base supports at ground close loops with the earth."
    ],
    mnemonics: "Truss: 'Members + Reactions minus Twice the Joints' (M + R - 2J). Frame: '3 Members + Reactions minus 3 Joints + Special' (3M + R - 3J - S).",
    arena: [
      {
        title: "Challenge 1.1: The Geometric Instability Trap",
        diagram: `   [====================]  (Beam under inclined load P)
      |       |       |
     (o)     (o)     (o)   <-- Three vertical rollers (r = 3)`,
        prompt: "A junior builder claims this beam is statically determinate because r = 3 and equilibrium equations = 3 (D = 3 - 3 = 0). What is the true engineering verdict?",
        options: [
          { text: "A) It is determinate and completely safe.", correct: false, explain: "Look at the direction of the reaction lines: all 3 are parallel!" },
          { text: "B) Geometrically Unstable: All reaction forces are parallel (vertical), leaving ΣFx = 0 unsatisfied under any lateral force component.", correct: true, explain: "Spot on! Having r = 3 is a necessary condition, NOT a sufficient condition. Parallel or concurrent reactions cause instantaneous rigid-body collapse." },
          { text: "C) Indeterminate to the 1st degree.", correct: false, explain: "Rollers cannot generate horizontal reactions, so statics fails due to geometric instability, not indeterminacy." }
        ]
      },
      {
        title: "Challenge 1.2: Continuous Beam with Internal Hinge (Lecture Fig. 3)",
        diagram: `A [Fixed] ===== B ===== (o) C [Internal Hinge] ===== D (Roller) ===== E (Roller)`,
        prompt: "Find the overall degree of indeterminacy D for this continuous beam (Fixed at A, Roller at D, Roller at E, and an Internal Hinge at C).",
        options: [
          { text: "A) D = 1 (Indeterminate to 1st degree)", correct: true, explain: "Exact! Reactions r = 3 (Fixed A) + 1 (Roller D) + 1 (Roller E) = 5. Equations = 3 + s = 3 + 1 = 4. D = 5 - 4 = 1!" },
          { text: "B) D = 0 (Determinate)", correct: false, explain: "Fixed at A has 3 reactions (vertical, horizontal, moment). 5 reactions vs 4 equations gives D = 1." },
          { text: "C) D = 2", correct: false, explain: "Don't forget to subtract the internal hinge condition s = 1 (M_C = 0)!" }
        ]
      }
    ],
    cheatsheet: `
      • <strong>External Indeterminacy:</strong> D_e = r_a - 3<br/>
      • <strong>Plane Truss Formula:</strong> D = (m + r) - 2j<br/>
      • <strong>Rigid Frame Formula:</strong> D = (3m + r) - (3j + s)<br/>
      • <strong>Closed-Loop Internal Formula:</strong> D_i = 3n - I_c<br/>
      • <strong>Internal Hinge Release:</strong> s = k - 1 (for <em>k</em> members meeting at hinge)
    `
  },

  // =========================================================================
  // MODULE 2: CONJUGATE BEAM METHOD
  // =========================================================================
  {
    id: "mod2",
    shortTitle: "2. Conjugate Beam",
    fullTitle: "Chapter 2: Deflection of Determinate Beams — Conjugate Beam Method",
    icon: "🌉",
    prerequisites: "Shear and Bending Moment Diagrams (SFD/BMD), Beam Differential Equation (d²v/dx² = M/EI).",
    intuition: "Moment-Area method gives relative tangential deviations, requiring awkward geometric sketching. The Conjugate Beam method uses an exact mathematical duality so you can calculate real slopes and deflections directly using basic shear and moment statics!",
    theory: [
      {
        heading: "2.1 The Mathematical Analogy: Beam Statics vs. Beam Kinematics",
        body: `
          <p>Beam deflection is governed by the curvature differential equation:</p>
          <div class="formula-banner">d²v/dx² = M/EI   ➔   dv/dx = θ(x) = ∫ (M/EI) dx   ➔   v(x) = ∬ (M/EI) dx²</div>
          <p>Beam statics is governed by the distributed load differential equation:</p>
          <div class="formula-banner">d²M*/dx² = w*   ➔   dM*/dx = V*(x) = ∫ w* dx   ➔   M*(x) = ∬ w* dx²</div>
          <div class="concept-callout">
            Because both physical phenomena satisfy the <strong>identical second-order differential equation</strong>, we can construct an imaginary <em>Conjugate Beam</em> of the same length, load it with the real beam's <strong>M/EI diagram</strong>, and use simple statics:
            <br/><br/>
            • <strong>Conjugate Beam Theorem 1:</strong> The <strong>Slope θ</strong> at any point in the real beam equals the <strong>Shear Force V*</strong> in the conjugate beam.<br/>
            • <strong>Conjugate Beam Theorem 2:</strong> The <strong>Deflection v</strong> at any point in the real beam equals the <strong>Bending Moment M*</strong> in the conjugate beam.
          </div>
        `,
        formula: `Real Slope θ(x) ≡ Conjugate Shear V*(x)   |   Real Deflection v(x) ≡ Conjugate Moment M*(x)`
      },
      {
        heading: "2.2 Support Transformation Rules & Elastic Sign Convention",
        body: `
          <p>The boundary conditions of the conjugate beam must be set such that wherever slope or deflection exist in the real beam, shear or moment can exist in the conjugate beam:</p>
          <div class="eng-table-wrapper">
            <table class="eng-table">
              <thead>
                <tr>
                  <th>Real Beam Boundary</th>
                  <th>Real Kinematics</th>
                  <th>Conjugate Beam Boundary</th>
                  <th>Conjugate Statics</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Simple Exterior Pin/Roller</td><td>θ ≠ 0, v = 0</td><td>Simple Pin/Roller</td><td>V* ≠ 0, M* = 0</td></tr>
                <tr><td>Fixed Support</td><td>θ = 0, v = 0</td><td>Free End</td><td>V* = 0, M* = 0</td></tr>
                <tr><td>Free End (Cantilever tip)</td><td>θ ≠ 0, v ≠ 0</td><td>Fixed Support</td><td>V* ≠ 0, M* ≠ 0</td></tr>
                <tr><td>Interior Roller/Support</td><td>θ continuous, v = 0</td><td>Internal Hinge</td><td>V* continuous, M* = 0</td></tr>
                <tr><td>Internal Hinge</td><td>θ discontinuous, v ≠ 0</td><td>Interior Support</td><td>V* jumps, M* ≠ 0</td></tr>
              </tbody>
            </table>
          </div>
          <p style="margin-top:14px;"><strong>Sign Rule:</strong> Positive (+M/EI) sagging moments act as <strong>UPWARD</strong> elastic loads. Negative (-M/EI) hogging moments act as <strong>DOWNWARD</strong> elastic loads.</p>
        `
      }
    ],
    guidedExamples: [
      {
        title: "Lecture Example 2.1: Cantilever with Tip Point Load P (PDF 2, Page 5)",
        problem: "Derive the maximum rotation θ_B and tip deflection v_B for a cantilever beam AB of length L with fixed end at A and concentrated downward load P at free tip B.",
        svgConfig: {
          width: 620,
          height: 180,
          length: 6,
          supports: [{ x: 0, type: 'fixed', label: 'A (Fixed)' }],
          loads: [{ x: 6, type: 'point', val: 'P ↓' }],
          showDeflection: true,
          sagAmount: 26
        },
        steps: [
          {
            stepName: "Step 1: Real Beam Bending Moment Diagram",
            content: "The real moment at distance x from A is M(x) = -P(L - x). At fixed end A, M_A = -PL (hogging); at tip B, M_B = 0. The BMD is a negative triangle of base L and height PL."
          },
          {
            stepName: "Step 2: Construct Conjugate Beam",
            content: "Fixed end A becomes a <strong>Free End</strong>. Free end B becomes a <strong>Fixed Support</strong>.<br/>Load on conjugate beam = Downward triangular elastic load of peak PL/EI at A, tapering linearly to 0 at B."
          },
          {
            stepName: "Step 3: Solve Conjugate Shear at B = Real Slope θ_B",
            content: "Total downward elastic load W* = Area of triangle = ½ × base(L) × height(PL/EI) = <strong>PL² / (2EI)</strong>.<br/>By ΣFy = 0 on the conjugate beam: V_B* = W* = <strong>PL² / (2EI)</strong> (Clockwise rotation)."
          },
          {
            stepName: "Step 4: Solve Conjugate Moment at B = Real Deflection v_B",
            content: "Centroid of the triangular load is at distance 2L/3 from fixed support B.<br/>Take moments about B: M_B* = W* × (2L/3) = [PL² / (2EI)] × (2L/3) = <strong>PL³ / (3EI)</strong> (Downward deflection)!"
          }
        ],
        hints: [
          "Hint 1: Real fixed end A has zero slope and deflection, so conjugate end A must have zero shear and moment (Free End).",
          "Hint 2: Centroid of a right triangle is 1/3 from the tall base, so it is 2/3 from the pointed tip."
        ]
      },
      {
        title: "Lecture Example 2.2: Simply Supported Beam with UDL w (PDF 2, Page 6)",
        problem: "Determine the end rotation θ_A and midspan deflection v_C for a simply supported beam AB of length L carrying a uniformly distributed load w.",
        svgConfig: {
          width: 620,
          height: 180,
          length: 8,
          supports: [{ x: 0, type: 'pin', label: 'A' }, { x: 8, type: 'roller', label: 'B' }],
          loads: [{ start: 0, end: 8, type: 'udl', val: 'w (kN/m)' }],
          showDeflection: true,
          sagAmount: 24
        },
        steps: [
          {
            stepName: "Step 1: Real Beam BMD & Conjugate Load",
            content: "Real BMD is a symmetric parabola with maximum sagging moment +wL²/8 at midspan.<br/>Conjugate beam has same pin at A and roller at B, loaded with an <strong>UPWARD</strong> parabola of peak height wL²/(8EI)."
          },
          {
            stepName: "Step 2: Conjugate Reaction at A = Slope θ_A",
            content: "Total upward elastic load = Area of parabola = (2/3) × base(L) × height(wL²/8EI) = wL³ / (12EI).<br/>By symmetry, downward reaction at A is R_A* = ½ [wL³ / (12EI)] = <strong>wL³ / (24EI)</strong>. Thus, θ_A = wL³ / (24EI)."
          },
          {
            stepName: "Step 3: Conjugate Moment at Midspan C = Deflection v_C",
            content: "Cut at C (x = L/2), consider left segment:<br/>M_C* = R_A*(L/2) - (Area of half parabola) × (Centroid arm to C)<br/>M_C* = [wL³/(24EI)](L/2) - [(2/3)(L/2)(wL²/8EI)] × [3/8 × (L/2)] = <strong>5wL⁴ / (384EI)</strong> Downward!"
          }
        ],
        hints: [
          "Hint 1: Symmetric parabola area formula is (2/3) × base × height.",
          "Hint 2: The centroid of a half-parabola from the apex is 3/8 of the half-span."
        ]
      }
    ],
    shortcuts: [
      "⚡ The Overhang Secret: An exterior overhang in a real beam always turns into a FIXED support in the conjugate beam! Solve the main span reactions first, then solve the overhang directly.",
      "🔥 The 2/3 Triangle Arm: The centroid of a right triangle is ALWAYS 2/3 of the span away from the pointed apex, and 1/3 from the heavy wall.",
      "🎯 Instant Sign Check: Downward gravity loads cause downward deflections. In conjugate beam, downward loads generate negative conjugate moments, confirming downward real deflection."
    ],
    methodSelection: "Conjugate beam is the most reliable method for finding slopes and deflections in beams with variable cross-sections or internal hinges, because statics replaces calculus.",
    commonTraps: [
      "Leaving the supports untransformed (forgetting that fixed becomes free and interior roller becomes internal hinge).",
      "Using the wrong centroid distance for parabolic spandrels (spandrel from vertex is 3/4 L, standard parabola is 5/8 L)."
    ],
    mnemonics: "'Shear is Slope, Moment is Movement (Deflection)' — S-S & M-M.",
    arena: [
      {
        title: "Challenge 2.1: Support Transformation Mastery",
        diagram: `Real Beam: A [Fixed] ====== B (Interior Roller) ====== C (Free Overhang)`,
        prompt: "Transform supports A, B, and C into their Conjugate Beam equivalents:",
        options: [
          { text: "A) A = Free End, B = Internal Hinge, C = Fixed Support", correct: true, explain: "Flawless! At A, θ=0 and v=0 ➔ V*=0, M*=0 (Free). At B, v=0 but θ is continuous ➔ M*=0, V* continuous (Internal Hinge). At C, slope and deflection exist ➔ V* and M* exist (Fixed Support)." },
          { text: "B) A = Fixed, B = Roller, C = Free", correct: false, explain: "You cannot leave boundary conditions untransformed; statics must match kinematics!" },
          { text: "C) A = Free, B = Roller, C = Pin", correct: false, explain: "An interior roller must become an internal hinge because moment is zero at an internal hinge." }
        ]
      }
    ],
    cheatsheet: `
      • <strong>Conjugate Shear:</strong> V*(x) = θ(x) (Slope)<br/>
      • <strong>Conjugate Moment:</strong> M*(x) = v(x) (Deflection)<br/>
      • <strong>Cantilever Tip Load P:</strong> θ = PL²/(2EI),  v = PL³/(3EI)<br/>
      • <strong>Simple Beam UDL w:</strong> θ_end = wL³/(24EI),  v_mid = 5wL⁴/(384EI)<br/>
      • <strong>Simple Beam Center Load P:</strong> θ_end = PL²/(16EI),  v_mid = PL³/(48EI)
    `
  },

  // =========================================================================
  // MODULE 3: VIRTUAL WORK (UNIT LOAD METHOD)
  // =========================================================================
  {
    id: "mod3",
    shortTitle: "3. Virtual Work",
    fullTitle: "Chapter 3: Virtual Work (Unit Load Method) for Trusses, Beams & Frames",
    icon: "🎯",
    prerequisites: "Work-Energy Principles, Method of Sections for Trusses, Integration of Bending Moments.",
    intuition: "The Unit Load Method allows you to find deflection at any point in any direction by applying a fictitious unit force (1.0) and equating external virtual work (1 · Δ) to the internal virtual strain energy.",
    theory: [
      {
        heading: "3.1 Principle of Virtual Work for Deformable Bodies",
        body: `
          <p>Consider an elastic deformable structure in equilibrium under a fictitious virtual load system (State II). If the structure is subjected to the real deformations caused by actual external loads, temperature changes, or support settlements (State I), then:</p>
          <div class="concept-callout">
            <strong>External Virtual Work (W_e) = Internal Virtual Work (W_i)</strong><br/>
            • To find linear deflection Δ: Apply a fictitious <strong>Unit Force (P = 1.0)</strong> at the target point in the desired direction ➔ <code>1.0 · Δ = W_i</code><br/>
            • To find angular rotation θ: Apply a fictitious <strong>Unit Couple (M = 1.0)</strong> at the target point in the desired direction ➔ <code>1.0 · θ = W_i</code>
          </div>
        `,
        formula: `1.0 · Δ = Σ [n · ΔL] + ∫ [m · M / (EI)] dx`
      },
      {
        heading: "3.2 Trusses: Axial Strains, Temperature & Fabrication Errors",
        body: `
          <p>For pin-jointed trusses, internal virtual work is summed over all <em>m</em> members:</p>
          <ul>
            <li><strong>From Real Applied Loads:</strong> <code>ΔL = N·L / (E·A)</code> ➔ <code>1·Δ = Σ [n · N · L / (E · A)]</code></li>
            <li><strong>From Temperature Change (ΔT):</strong> <code>ΔL = α · (ΔT) · L</code> ➔ <code>1·Δ = Σ [n · α · (ΔT) · L]</code></li>
            <li><strong>From Fabrication Errors:</strong> <code>ΔL = ΔL_fab</code> ➔ <code>1·Δ = Σ [n · ΔL_fab]</code></li>
          </ul>
          <p>Where <em>n</em> = internal member axial force due to the fictitious unit load (1.0), and <em>N</em> = internal member axial force due to real loads.</p>
        `
      },
      {
        heading: "3.3 Graphical Multiplication Method (Vereshchagin's Rule)",
        body: `
          <p>Evaluating <code>∫ [m · M / EI] dx</code> by formal integration is slow. Since the virtual moment diagram <em>m(x)</em> caused by a unit load is <strong>always piecewise linear</strong>, Vereshchagin proved:</p>
          <div class="concept-callout">
            <strong>Vereshchagin's Graphical Multiplication Rule:</strong><br/>
            <code>∫₀ᴸ m · M dx = Area(M) × m_c</code><br/>
            Multiply the total area of the real bending moment diagram <strong>Area(M)</strong> by the ordinate value of the linear virtual moment diagram <strong>m_c</strong> measured directly below the centroid of Area(M)!
          </div>
          <div class="eng-table-wrapper">
            <table class="eng-table">
              <thead>
                <tr><th>Shape of M Diagram</th><th>Area Formula</th><th>Centroid Position from Left</th></tr>
              </thead>
              <tbody>
                <tr><td>Rectangle (h × L)</td><td>h · L</td><td>L / 2</td></tr>
                <tr><td>Triangle (vertex at left)</td><td>½ · h · L</td><td>L / 3</td></tr>
                <tr><td>Triangle (vertex at right)</td><td>½ · h · L</td><td>2L / 3</td></tr>
                <tr><td>Symmetric 2nd° Parabola</td><td>⅔ · h · L</td><td>L / 2</td></tr>
                <tr><td>2nd° Spandrel (vertex at left)</td><td>⅓ · h · L</td><td>L / 4</td></tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        heading: "3.4 Support Movements in Statically Determinate Structures",
        body: `
          <p><strong>Fundamental Insight:</strong> When a support settles in a statically determinate structure, the structure rotates as a rigid body with <strong>zero internal stress (M = 0, N = 0)</strong>!</p>
          <p>Therefore, internal virtual work is strictly zero: <code>W_i = 0</code>!</p>
          <div class="formula-banner">W_e = 1.0 · Δ_target + Σ (R_virtual · Δ_settlement) = 0   ➔   1.0 · Δ_target = - Σ (R_virtual · Δ_settlement)</div>
        `
      }
    ],
    guidedExamples: [
      {
        title: "Lecture Example 3.1: Complete 13-Member Truss Deflection (PDF 3, Page 9)",
        problem: "Calculate vertical deflection of joint B for an 8-joint bridge truss subjected to 10 kN downward load at joint D. Chord members A = 6 cm², web members A = 4 cm², E = 210 GPa.",
        svgConfig: {
          width: 640,
          height: 190,
          scale: 60,
          nodes: {
            A: [0, 0], B: [1.6, 0], C: [3.2, 0], D: [4.8, 0], E: [6.4, 0],
            H: [1.6, 1.8], G: [3.2, 1.8], F: [4.8, 1.8]
          },
          members: [
            ['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'E'],
            ['H', 'G'], ['G', 'F'],
            ['A', 'H'], ['B', 'H'], ['C', 'H'], ['C', 'G'], ['C', 'F'], ['D', 'F'], ['E', 'F']
          ],
          supports: [{ node: 'A', type: 'pin' }, { node: 'E', type: 'roller' }],
          loads: [{ node: 'D', val: '10 kN ↓' }]
        },
        steps: [
          {
            stepName: "Step 1: Real Force Analysis (N State)",
            content: "Apply 10 kN at joint D. Calculate support reactions: R_A = 2.5 kN, R_E = 7.5 kN. Solve all 13 member forces N using method of joints."
          },
          {
            stepName: "Step 2: Virtual Force Analysis (n State)",
            content: "Remove real 10 kN load. Apply fictitious unit load P = 1.0 downward at joint B. Calculate virtual reactions: r_A = 0.75, r_E = 0.25. Solve all virtual member forces n."
          },
          {
            stepName: "Step 3: Tabular Summation Σ [n·N·L / A]",
            content: "Summing products over all 13 members: Σ (n · N · L / A) = <strong>7.002 kN·m/cm²</strong> = 70.02 kN·m/m²."
          },
          {
            stepName: "Step 4: Final Deflection Computation",
            content: "δ_B = [Σ nNL/A] / E = 70.02 / (210 × 10⁶ kN/m²) = <strong>0.333 mm Downward</strong>."
          }
        ],
        hints: [
          "Hint 1: Any member with n = 0 contributes ZERO to deflection; skip its N force calculation!",
          "Hint 2: Watch unit conversions: 1 cm² = 10⁻⁴ m²."
        ]
      }
    ],
    shortcuts: [
      "⚡ Zero-Force Elimination: If a member carries n = 0 under the unit load, its term nNL/EA is zero! Don't spend time calculating its real force N.",
      "🔥 Same-Sign Rule: When n and N have the same sign (both tension + or both compression -), their product is positive, meaning the member deforms in the direction of the unit load.",
      "🎯 Vereshchagin Midspan Parabola: For a symmetric parabola under UDL, the midspan ordinate of a triangular virtual moment diagram is ALWAYS 0.5 × peak."
    ],
    methodSelection: "Virtual Work is the universal Swiss Army knife of structural analysis. Use it for trusses, thermal expansions, fabrication errors, and to generate flexibility coefficients for Consistent Deformation.",
    commonTraps: [
      "Mixing kN and N, or meters and millimeters. Always convert to base SI units (kN, m) before dividing by EA or EI.",
      "Evaluating m_c under the wrong centroid location."
    ],
    mnemonics: "'Virtual unit load outside, real deformations inside' — 1 · Δ = Σ n · ΔL.",
    arena: [
      {
        title: "Challenge 3.1: Vereshchagin Graphical Multiplication Speed Run",
        diagram: `Real M-Diagram: Parabola of height h = wL²/(8EI) over span L (Area = ⅔ · h · L)
Virtual m-Diagram (Unit Couple at Support A): Triangle from 1.0 at A to 0 at B (Midspan ordinate m_c = 0.5)`,
        prompt: "Use Vereshchagin's rule to find the end rotation θ_A without integrating:",
        options: [
          { text: "A) θ_A = [ ⅔ · L · wL²/(8EI) ] × (0.5) = wL³ / (24EI)", correct: true, explain: "Mastery! Area = wL³/(12EI). Multiply by midspan ordinate 0.5 gives exactly wL³/(24EI) in seconds!" },
          { text: "B) θ_A = wL³ / (12EI)", correct: false, explain: "You forgot to multiply by the centroid ordinate m_c = 0.5!" },
          { text: "C) θ_A = 5wL⁴ / (384EI)", correct: false, explain: "5wL⁴/(384EI) is the midspan deflection, not end rotation!" }
        ]
      }
    ],
    cheatsheet: `
      • <strong>Truss Axial Strain:</strong> 1·Δ = Σ [n · N · L / (EA)]<br/>
      • <strong>Temperature Effect:</strong> 1·Δ = Σ [n · α · ΔT · L]<br/>
      • <strong>Fabrication Error:</strong> 1·Δ = Σ [n · ΔL_fab]<br/>
      • <strong>Beam/Frame Flexure:</strong> 1·Δ = ∫ [m · M / (EI)] dx = Σ [Area(M) × m_c / EI]<br/>
      • <strong>Support Movement (Determinate):</strong> 1·Δ = - Σ (R_virtual · Δ_settlement)
    `
  },

  // =========================================================================
  // MODULE 4: CONSISTENT DEFORMATION (FORCE METHOD)
  // =========================================================================
  {
    id: "mod4",
    shortTitle: "4. Consistent Deformation",
    fullTitle: "Chapter 4: Analysis of Indeterminate Structures by Consistent Deformation",
    icon: "🧩",
    prerequisites: "Virtual Work (Unit Load Method), Deflection of Determinate Beams/Trusses.",
    intuition: "When statics lacks enough equations, release redundant supports to create a stable determinate base structure. Calculate free deflections under real loads, then find the redundant forces required to push the displaced joints back into geometric compatibility!",
    theory: [
      {
        heading: "4.1 The 4-Step Force/Flexibility Procedure",
        body: `
          <div class="concept-callout">
            <strong>1. Release Redundants:</strong> Remove redundant supports or cut members to form a stable, statically determinate <em>Primary (Base) Structure</em>.<br/>
            <strong>2. Free Deformation (State 0):</strong> Apply real loads to the primary structure. Calculate deflection at the released coordinate: <code>Δ_10</code>.<br/>
            <strong>3. Flexibility Coefficient (State 1):</strong> Apply a unit redundant force (X₁ = 1.0) at the release. Calculate deflection: <code>δ_11</code> (deflection per unit redundant force).<br/>
            <strong>4. Compatibility Equation:</strong> Enforce boundary conditions:
            <br/><code>Δ_10 + X₁ · δ_11 = 0   ➔   X₁ = - Δ_10 / δ_11</code>
          </div>
        `,
        formula: `Compatibility: [δ] {X} + {Δ_o} = {Δ_settlement}`
      },
      {
        heading: "4.2 Maxwell-Betti Reciprocal Deflection Theorem",
        body: `
          <p>For multi-redundant structures with <em>n</em> releases, compatibility forms a matrix system:</p>
          <div class="formula-banner">
            Δ₁₀ + X₁·δ₁₁ + X₂·δ₁₂ + ... + X_n·δ₁_n = 0<br/>
            Δ₂₀ + X₁·δ₂₁ + X₂·δ₂₂ + ... + X_n·δ₂_n = 0
          </div>
          <p><strong>Maxwell's Reciprocal Theorem:</strong> The deflection at coordinate <em>i</em> due to a unit load at <em>j</em> equals the deflection at <em>j</em> due to a unit load at <em>i</em>: <code>δ_ij = δ_ji</code>! This guarantees that the flexibility matrix is always <strong>symmetric</strong>, cutting your calculation work in half!</p>
        `
      }
    ],
    guidedExamples: [
      {
        title: "Lecture Example 4.1: Propped Cantilever under UDL w (PDF 4, Page 3)",
        problem: "Determine the reaction at roller B and draw the BMD for a propped cantilever beam AB of span L with fixed support at A and roller at B, carrying uniform load w.",
        svgConfig: {
          width: 620,
          height: 180,
          length: 6,
          supports: [{ x: 0, type: 'fixed', label: 'A (Fixed)' }, { x: 6, type: 'roller', label: 'B (Roller)' }],
          loads: [{ start: 0, end: 6, type: 'udl', val: 'w (kN/m)' }]
        },
        steps: [
          {
            stepName: "Step 1: Release Redundant Roller B",
            content: "Primary base structure is a cantilever fixed at A and free at B."
          },
          {
            stepName: "Step 2: State 0 (Real Load Deflection Δ_B0)",
            content: "Under uniform load w, downward tip deflection of the cantilever is: Δ_B0 = -wL⁴ / (8EI)."
          },
          {
            stepName: "Step 3: State 1 (Unit Redundant Flexibility δ_BB)",
            content: "Apply unit upward load X_B = 1 at B. Upward tip deflection is: δ_BB = +L³ / (3EI)."
          },
          {
            stepName: "Step 4: Compatibility & Statics Solution",
            content: "Δ_B0 + X_B · δ_BB = 0 ➔ X_B = -(-wL⁴/8EI) / (L³/3EI) = <strong>(3/8) wL Upward</strong>!<br/>Wall reactions: R_A = wL - (3/8)wL = <strong>(5/8) wL</strong>, and M_A = wL²/2 - (3/8)wL² = <strong>wL² / 8</strong> (Hogging)."
          }
        ],
        hints: [
          "Hint 1: Cantilever deflection under UDL is wL⁴/(8EI); under tip load it is PL³/(3EI).",
          "Hint 2: Invert the fraction: (1/8) / (1/3) = 3/8."
        ]
      }
    ],
    shortcuts: [
      "🔥 Propped Cantilever Universal Rules: For ANY propped cantilever under UDL w, the roller ALWAYS carries exactly 3/8 wL, and the fixed wall carries 5/8 wL and wL²/8 hogging moment!",
      "⚡ Propped Cantilever Center Point Load P: Roller carries 5P/16, fixed wall carries 11P/16 and 3PL/16 moment.",
      "🎯 Settlement in Compatibility: If a support settles downward by Δ_s, place -Δ_s on the RHS of compatibility: Δ_B0 + R_B · δ_BB = -Δ_s."
    ],
    methodSelection: "Choose Consistent Deformation when the degree of static indeterminacy is low (D = 1 or D = 2). For D ≥ 3, Slope-Deflection or Moment Distribution is much faster.",
    commonTraps: [
      "Selecting an unstable primary base structure (e.g. releasing supports such that the remaining system can rotate).",
      "Dropping negative signs in compatibility when deflections oppose the assumed redundant direction."
    ],
    mnemonics: "'Free deflection plus redundant times flexibility equals zero' — Δ₀ + R·δ = 0.",
    arena: [
      {
        title: "Challenge 4.1: Propped Cantilever Center Point Load",
        diagram: `A [Fixed] ============= (P at midspan L/2) ============= B (Roller)`,
        prompt: "Using consistent deformation (Δ_B0 = -5PL³/(48EI), δ_BB = L³/(3EI)), find reaction R_B:",
        options: [
          { text: "A) R_B = 5P / 16 (Upward)", correct: true, explain: "Boom! R_B = (5PL³/48EI) / (L³/3EI) = (5/48) × 3 P = 5P/16. Then wall reaction is R_A = 11P/16 and M_A = 3PL/16!" },
          { text: "B) R_B = P / 2", correct: false, explain: "P/2 is for a symmetric simply supported beam. Fixed end A attracts more stiffness, leaving only 5P/16 for roller B." },
          { text: "C) R_B = 3P / 8", correct: false, explain: "3/8 is for uniform load wL, not concentrated point load P!" }
        ]
      }
    ],
    cheatsheet: `
      • <strong>Single Redundant:</strong> R = - Δ₁₀ / δ₁₁<br/>
      • <strong>Propped Cantilever (UDL w):</strong> R_roller = 3wL/8,  R_wall = 5wL/8,  M_wall = wL²/8<br/>
      • <strong>Propped Cantilever (Mid Point P):</strong> R_roller = 5P/16,  R_wall = 11P/16,  M_wall = 3PL/16<br/>
      • <strong>Symmetry Theorem:</strong> δ_ij = δ_ji (Maxwell-Betti Reciprocal Theorem)
    `
  },

  // =========================================================================
  // MODULE 5: THREE-MOMENT EQUATION (CLAPEYRON'S EQUATION)
  // =========================================================================
  {
    id: "mod5",
    shortTitle: "5. Three-Moment Equation",
    fullTitle: "Chapter 5: Continuous Beams — Clapeyron's Three-Moment Equation",
    icon: "📐",
    prerequisites: "Bending Moment Diagrams, Slope continuity across intermediate supports.",
    intuition: "Instead of cutting supports and solving deflections, Clapeyron's equation relates support moments at three consecutive supports directly by enforcing that the tangent slope is continuous over the middle support.",
    theory: [
      {
        heading: "5.1 Physical Basis: Tangent Slope Continuity Across Piers",
        body: `
          <p>Consider three consecutive supports: Left (<em>l</em>), Center (<em>c</em>), and Right (<em>r</em>) of a continuous beam. Because the beam does not break or hinge over support <em>c</em>, the elastic curve slope computed from the left span must equal the slope computed from the right span:</p>
          <div class="concept-callout">
            <strong>Standard Three-Moment Equation (Constant EI & Unyielding Supports):</strong><br/>
            <code>M_L · L_L + 2 M_C (L_L + L_R) + M_R · L_R = - (6 A_L x_L / L_L) - (6 A_R x_R / L_R)</code>
          </div>
          <p><strong>General Equation (with Support Settlement & Varying EI):</strong></p>
          <div class="formula-banner">
            M_l(L/EI)_l + 2M_c(L_l/EI_l + L_r/EI_r) + M_r(L/EI)_r = -6(Ax/EIL)_l - 6(Ax/EIL)_r + 6[(Δ_l - Δ_c)/L_l + (Δ_r - Δ_c)/L_r]
          </div>
        `,
        formula: `M_L · L_L + 2 M_C (L_L + L_R) + M_R · L_R = - [6 A_L x_L / L_L] - [6 A_R x_R / L_R]`
      },
      {
        heading: "5.2 Universal Load Terms (6Ax/L)",
        body: `
          <p>The right-hand side represents the free bending moment diagram area terms:</p>
          <ul>
            <li><strong>Uniform Load (w) on span L:</strong> <code>6Ax / L = w · L³ / 4</code></li>
            <li><strong>Concentrated Point Load (P) at distance <em>a</em> from outer support:</strong> <code>6Ax / L = P · a · (L² - a²) / L</code></li>
            <li><strong>Concentrated Center Load (P at midspan L/2):</strong> <code>6Ax / L = (3/8) · P · L²</code></li>
          </ul>
        `
      },
      {
        heading: "5.3 The Imaginary Zero-Span Trick for Fixed Ends",
        body: `
          <p><strong>The Dilemma:</strong> A fixed support has an unknown moment (M_wall ≠ 0), but it has no span to its left to apply the 3-moment equation.</p>
          <p><strong>The Master Trick:</strong> Add an <strong>imaginary span of length L₀ = 0 and infinite flexural rigidity (EI₀ = ∞)</strong> to the left of the fixed end! The ratio <code>L₀ / EI₀ = 0</code>, and the load term is 0. This instantly yields an extra equation to solve the fixed end moment directly!</p>
        `
      }
    ],
    guidedExamples: [
      {
        title: "Lecture Example 5.1: Two-Span Continuous Beam (PDF 5, Page 5)",
        problem: "Find support moment M_B and all reactions for continuous beam ABC. Span AB = 4.0m with 40 kN point load at midspan (a = 2m); Span BC = 6.0m with uniform load 10 kN/m. Supports A and C are simple pins/rollers.",
        svgConfig: {
          width: 640,
          height: 180,
          length: 10,
          supports: [{ x: 0, type: 'pin', label: 'A' }, { x: 4, type: 'roller', label: 'B' }, { x: 10, type: 'roller', label: 'C' }],
          loads: [{ x: 2, type: 'point', val: '40 kN ↓' }, { start: 4, end: 10, type: 'udl', val: '10 kN/m' }]
        },
        steps: [
          {
            stepName: "Step 1: Boundary Conditions",
            content: "Exterior simple supports carry zero moment: M_A = 0, M_C = 0."
          },
          {
            stepName: "Step 2: Load Term for Span AB (Point Load)",
            content: "6 A_L x_L / L_L = P · a · (L² - a²) / L = 40 × 2 × (4² - 2²) / 4 = 80 × 12 / 4 = <strong>240 kN·m²</strong>."
          },
          {
            stepName: "Step 3: Load Term for Span BC (UDL)",
            content: "6 A_R x_R / L_R = w · L³ / 4 = 10 × 6³ / 4 = 10 × 216 / 4 = <strong>540 kN·m²</strong>."
          },
          {
            stepName: "Step 4: Substitute into Three-Moment Equation",
            content: "0(4) + 2 M_B (4 + 6) + 0(6) = - [240 + 540]<br/>20 M_B = -780  ➔  <strong>M_B = -39.0 kN·m</strong> (Hogging moment over support B)."
          },
          {
            stepName: "Step 5: Solve Reactions by Statics",
            content: "Span AB: ΣM_B = 0 ➔ R_A(4) - 40(2) + (-39) = 0 ➔ R_A = 10.25 kN.<br/>Span BC: ΣM_B = 0 ➔ R_C(6) - (10×6)(3) + (-39) = 0 ➔ R_C = 23.50 kN.<br/>Support B: R_B = Total Load - R_A - R_C = 100 - 10.25 - 23.50 = <strong>66.25 kN Upward</strong>!"
          }
        ],
        hints: [
          "Hint 1: Simple exterior ends have M = 0.",
          "Hint 2: Point load term uses distance from the OUTER support (a = 2m from A)."
        ]
      }
    ],
    shortcuts: [
      "🔥 Two Equal Spans with UDL Shortcut: For two equal spans L under uniform load w: 2 M_B (L + L) = - 2(wL³/4) ➔ 4L M_B = - wL³/2 ➔ M_B = - wL² / 8!",
      "⚡ Negative RHS Rule: Gravity loads push down, creating positive free bending moments, which produce NEGATIVE hogging support moments over interior piers! Never drop the minus sign on the RHS.",
      "🎯 Fixed-End Clamping: To solve a beam with fixed end at A, write the equation for 0-A-B with L_0 = 0: 2 M_A (L_1) + M_B (L_1) = - 6A_1 x_1 / L_1."
    ],
    methodSelection: "The Three-Moment Equation is by far the fastest hand-calculation method for continuous beams with multiple spans under gravity loads. It avoids matrices entirely.",
    commonTraps: [
      "Measuring load distance 'a' from the middle support instead of the outer support in the point load term.",
      "Forgetting to multiply the middle term by 2 (it is 2 M_C (L_L + L_R), not 1 M_C!)."
    ],
    mnemonics: "'Left span, Double the Middle spans, Right span equals Minus Load Terms'.",
    arena: [
      {
        title: "Challenge 5.1: Two Equal Spans with UDL",
        diagram: `A (Pin) ======== (Span L, UDL w) ======== B (Roller) ======== (Span L, UDL w) ======== C (Roller)`,
        prompt: "What is the hogging support moment M_B over the center support?",
        options: [
          { text: "A) M_B = - wL² / 8", correct: true, explain: "Flawless! 2 M_B (L + L) = - 2(wL³/4) ➔ 4L M_B = - wL³/2 ➔ M_B = -wL²/8!" },
          { text: "B) M_B = - wL² / 12", correct: false, explain: "-wL²/12 is the fixed end moment of a single clamped span, not an interior roller with simple ends!" },
          { text: "C) M_B = - wL² / 16", correct: false, explain: "Check the arithmetic: 2(wL³/4) / (4L) = (wL²/2) / 4 = wL²/8." }
        ]
      }
    ],
    cheatsheet: `
      • <strong>Three-Moment Equation:</strong> M_L L_L + 2 M_C (L_L + L_R) + M_R L_R = - [6A_L x_L / L_L + 6A_R x_R / L_R]<br/>
      • <strong>UDL Load Term:</strong> 6Ax / L = w L³ / 4<br/>
      • <strong>Point Load Term:</strong> 6Ax / L = P a (L² - a²) / L<br/>
      • <strong>Center Point Load Term:</strong> 6Ax / L = 3 P L² / 8<br/>
      • <strong>Fixed End:</strong> Attach imaginary span L₀ = 0, EI₀ = ∞
    `
  },

  // =========================================================================
  // MODULE 6: SLOPE-DEFLECTION METHOD
  // =========================================================================
  {
    id: "mod6",
    shortTitle: "6. Slope-Deflection",
    fullTitle: "Chapter 6: Slope-Deflection Method for Indeterminate Beams & Frames",
    icon: "📈",
    prerequisites: "Kinematic Indeterminacy, Fixed-End Moments, Joint Equilibrium Equations.",
    intuition: "Slope-Deflection is the classical stiffness method: moments at member ends are expressed directly in terms of joint rotations (θ) and story sway (Δ). Setting up joint equilibrium (ΣM = 0) and story shear equations solves the entire structure.",
    theory: [
      {
        heading: "6.1 Core Principle & The AAU COTM 3101 Statical Sign Convention",
        body: `
          <p>The Slope-Deflection method is a <strong>Displacement (Stiffness) Method</strong>. Member end moments are expressed directly in terms of joint rotations (θ) and relative lateral joint translations / chord sway (Δ).</p>
          <div class="concept-callout" style="border-left-color:var(--danger)">
            <strong>CRITICAL EXAM ALERT — AAU COTM 3101 Statical Sign Convention:</strong><br/>
            Unlike US textbooks that make clockwise moments positive everywhere, your AAU lecture notes establish:
            <br/><br/>
            • <strong>Joint & Member Rotation θ:</strong> POSITIVE when <strong>CLOCKWISE</strong>.<br/>
            • <strong>Member End Moment M_AB:</strong> POSITIVE when it acts <strong>COUNTER-CLOCKWISE on the member</strong> (which means Clockwise on the joint!).<br/>
            • <strong>Because of this exact convention, the AAU Slope-Deflection equation has a MINUS sign:</strong>
          </div>
        `,
        formula: `M_AB = M^F_AB - 2EK ( 2θ_A + θ_B - 3Δ/L )`
      },
      {
        heading: "6.2 Anatomy of the Slope-Deflection Equation",
        body: `
          <p>In the formula <code>M_AB = M^F_AB - 2EK ( 2θ_A + θ_B - 3Δ/L )</code>:</p>
          <ul>
            <li><strong>M^F_AB:</strong> Fixed-End Moment at end A with all joints clamped.</li>
            <li><strong>K = I / L:</strong> Relative member flexural stiffness.</li>
            <li><strong>θ_A:</strong> Rotation of the near end A (radians).</li>
            <li><strong>θ_B:</strong> Rotation of the far end B (radians).</li>
            <li><strong>ψ = Δ / L:</strong> Chord rotation due to side sway or support settlement.</li>
            <li><strong>Hinged End Modification:</strong> When far end B is a simple hinge (M_BA = 0):<br/>
              <code>M_AB = (M^F_AB - M^F_BA / 2) - 3EK (θ_A - Δ/L)</code>
            </li>
          </ul>
        `
      },
      {
        heading: "6.3 Fixed-End Moments Table (AAU Sign Convention)",
        body: `
          <div class="eng-table-wrapper">
            <table class="eng-table">
              <thead>
                <tr><th>Load Case</th><th>Left End (M^F_AB)</th><th>Right End (M^F_BA)</th></tr>
              </thead>
              <tbody>
                <tr><td>UDL w over entire span L</td><td>+ wL² / 12 (CCW)</td><td>- wL² / 12 (CW)</td></tr>
                <tr><td>Concentrated Center Load P</td><td>+ PL / 8 (CCW)</td><td>- PL / 8 (CW)</td></tr>
                <tr><td>Point Load P at dist <em>a</em> from A, <em>b</em> from B</td><td>+ P a b² / L²</td><td>- P a² b / L²</td></tr>
                <tr><td>Couple M₀ at center L/2</td><td>- M₀ / 4</td><td>- M₀ / 4</td></tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        heading: "6.4 Sway vs. Non-Sway Frames & Column Shear Equations",
        body: `
          <p>Frames without lateral bracing sway horizontally (Δ ≠ 0). Each independent sway mode introduces an unknown Δ.</p>
          <p>To solve for Δ, construct a <strong>Column Story Shear Equation</strong> by cutting the columns horizontally and applying ΣFx = 0 across the entire story!</p>
          <p>For inclined legs of angle α: <code>Δ_column = Δ · sec α</code> and <code>Δ_beam = - Δ · tan α</code>.</p>
        `
      }
    ],
    guidedExamples: [
      {
        title: "Lecture Example 6.1: Non-Sway Portal Frame (PDF 6, Page 12)",
        problem: "Find member end moments for a portal frame ABCD with fixed supports at A and D, subjected to a horizontal load at joint B. Height = 4m, Span = 6m, EI constant.",
        svgConfig: {
          width: 580,
          height: 220
        },
        steps: [
          {
            stepName: "Step 1: Kinematic Degrees of Freedom",
            content: "Fixed bases A and D have θ_A = 0 and θ_D = 0. Braced against sway ➔ Δ = 0. Unknowns: Joint rotations θ_B and θ_C."
          },
          {
            stepName: "Step 2: Fixed-End Moments",
            content: "Compute clamped end moments for all loaded spans using the AAU sign convention (CCW = positive, CW = negative)."
          },
          {
            stepName: "Step 3: Slope-Deflection Equations",
            content: "Express M_AB, M_BA, M_BC, M_CB, M_CD, M_DC in terms of θ_B and θ_C using: M = M^F - 2EK(2θ_near + θ_far)."
          },
          {
            stepName: "Step 4: Joint Equilibrium Equations",
            content: "Joint B: ΣM_B = 0 ➔ M_BA + M_BC = 0.<br/>Joint C: ΣM_C = 0 ➔ M_CB + M_CD = 0.<br/>Solve the 2×2 linear system for θ_B and θ_C, then back-substitute to find all final end moments!"
          }
        ],
        hints: [
          "Hint 1: Near end rotation gets multiplied by 2; far end rotation gets multiplied by 1.",
          "Hint 2: In AAU convention, clockwise rotation is positive θ, but clockwise moment is NEGATIVE."
        ]
      }
    ],
    shortcuts: [
      "🔥 The AAU Minus Sign Decoded: If you write '+ 2EK', you will get opposite signs on every single exam problem! Memorize: M_AB = M^F_AB - 2EK(2θ_A + θ_B - 3Δ/L).",
      "⚡ Far-End Hinge Shortcut: When far end B is a simple hinge (M_BA = 0), eliminate θ_B beforehand: M_AB = M^F_AB - (M^F_BA / 2) - 3EK(θ_A - Δ/L).",
      "🎯 Number of Equations = Kinematic Indeterminacy: Count unconstrained joint rotations + independent sway modes. That is EXACTLY how many simultaneous equations you must solve."
    ],
    methodSelection: "Slope-Deflection is the method of choice for frames with few joints and rigid connections, and forms the theoretical foundation of modern Matrix Stiffness methods and FEA.",
    commonTraps: [
      "Using standard textbook '+ 2EK' instead of the AAU lecture note '- 2EK'.",
      "Omitting the story shear equation when solving frames that can sway laterally."
    ],
    mnemonics: "'Minus 2EK into (Double Near + Far minus 3 Sway)' — M = M^F - 2EK(2θ_near + θ_far - 3ψ).",
    arena: [
      {
        title: "Challenge 6.1: Why the Minus Sign in Your Lecture Notes?",
        diagram: `AAU Governing Formula: M_AB = M^F_AB - 2EK ( 2θ_A + θ_B - 3Δ/L )`,
        prompt: "Why is there a MINUS sign in front of 2EK in your COTM 3101 course notes?",
        options: [
          { text: "A) Because joint rotation θ is positive CLOCKWISE, while member end moment M is defined positive COUNTER-CLOCKWISE on the member!", correct: true, explain: "Brilliant! When end A rotates clockwise (+θ_A), the beam resists with a clockwise moment on the member—which is NEGATIVE under the CCW convention (-4EKθ_A)!" },
          { text: "B) It is a typographical error in the PDF.", correct: false, explain: "It is mathematically rigorous and consistent across all AAU lecture notes!" },
          { text: "C) Because Young's Modulus E is negative.", correct: false, explain: "E is a positive material constant." }
        ]
      }
    ],
    cheatsheet: `
      • <strong>Slope-Deflection Formula:</strong> M_AB = M^F_AB - 2EK [2θ_A + θ_B - 3(Δ/L)]<br/>
      • <strong>Near End Rotation:</strong> Multiplier is 2 (i.e. 4EKθ_A)<br/>
      • <strong>Far End Rotation:</strong> Multiplier is 1 (i.e. 2EKθ_B)<br/>
      • <strong>Chord Rotation / Sway:</strong> Multiplier is 3 (i.e. 6EKΔ/L)<br/>
      • <strong>Joint Equilibrium:</strong> Σ M_joint = 0 for all interior joints
    `
  },

  // =========================================================================
  // MODULE 7: MOMENT DISTRIBUTION METHOD (HARDY CROSS)
  // =========================================================================
  {
    id: "mod7",
    shortTitle: "7. Moment Distribution",
    fullTitle: "Chapter 7: Moment Distribution Method (Hardy Cross Method)",
    icon: "🔄",
    prerequisites: "Slope-Deflection Equations, Stiffness factors, Distribution Factors.",
    intuition: "Instead of solving simultaneous algebraic equations, Hardy Cross solves slope-deflection equations iteratively by physically locking joints, computing unbalanced moments, and distributing them in proportion to member stiffnesses until equilibrium is reached.",
    theory: [
      {
        heading: "7.1 Physical Concept: The Successive Locking & Unlocking Process",
        body: `
          <p>Invented by Prof. Hardy Cross in 1930, Moment Distribution solves the simultaneous Slope-Deflection equations <strong>by rapid physical iteration</strong> without solving matrices:</p>
          <div class="concept-callout">
            <strong>1. Lock all joints:</strong> Clamp all joints against rotation. Calculate initial <strong>Fixed-End Moments (FEM)</strong>.<br/>
            <strong>2. Compute Member Stiffness (K):</strong> <code>K = I / L</code> (or <code>K = 4EI / L</code>).<br/>
            <strong>3. Distribution Factor (DF):</strong> The fraction of unbalanced joint moment absorbed by each member framing into joint <em>J</em>:
            <br/><code>DF_i = K_i / Σ K</code> (Note: Clamped wall has DF = 0; exterior hinge has DF = 1.0).<br/>
            <strong>4. Balance Joint:</strong> Release the clamp at the joint. An unbalanced moment exists: <code>M_unbal = Σ FEM</code>. Apply an equal and opposite balancing moment distributed as: <code>- (M_unbal) × DF_i</code>.<br/>
            <strong>5. Carry Over:</strong> Clamping the joint again causes an induced moment at the opposite far end: <code>Carry-Over Moment = 0.5 × (Balancing Moment)</code> (provided far end is fixed!).
          </div>
        `,
        formula: `DF_i = K_i / Σ K   |   Balancing Moment = - (Σ M_joint) × DF_i   |   COF = + 0.5`
      },
      {
        heading: "7.2 The Modified 3/4 Stiffness Secret for Hinged Ends",
        body: `
          <p><strong>The Nightmare:</strong> If a beam has an exterior pin/roller, normal carry-over creates endless back-and-forth oscillations between the interior joint and the pin.</p>
          <div class="concept-callout">
            <strong>The Master 3/4 K Shortcut (PDF 7, Page 5):</strong><br/>
            Modify the stiffness of any span whose far end is a simple hinge beforehand:<br/>
            <code>K_modified = (3/4) · (I / L)</code><br/>
            Release the hinged end once at the start, carry over to the interior joint, and <strong>NEVER carry over to the hinged end again</strong>! Your table converges in <strong>ONE single cycle</strong>!
          </div>
        `
      },
      {
        heading: "7.3 Two-Stage Analysis for Sidesway Frames",
        body: `
          <p>For frames with sidesway, Hardy Cross uses a two-stage superposition procedure:</p>
          <ul>
            <li><strong>Stage 1 (Non-Sway Analysis):</strong> Add an artificial lateral support at roof level. Perform moment distribution under real loads. Calculate the artificial restraint reaction <em>R</em>.</li>
            <li><strong>Stage 2 (Sway Analysis):</strong> Remove real loads. Apply an arbitrary lateral displacement Δ. Compute initial sway FEMs ($M^F = -6EI\Delta/L^2$). Perform moment distribution. Calculate lateral force <em>F</em> required to produce this sway.</li>
            <li><strong>Superposition:</strong> The true sway factor is <code>k = R / F</code>. Final end moments are: <code>M_final = M_non-sway + k · M_sway</code>.</li>
          </ul>
        `
      }
    ],
    guidedExamples: [
      {
        title: "Lecture Example 7.1: Two-Span Continuous Beam ABC (PDF 7, Pages 4–6)",
        problem: "Determine support moments for beam ABC. Span AB = 3.6m (Fixed at A, Roller at B, I = 3.6). Span BC = 4.0m (Roller at B, Simple Hinge at C, I = 3.6). Loads produce FEM_BA = +30 kNm, FEM_BC = -22.5 kNm.",
        svgConfig: {
          width: 620,
          height: 180,
          length: 7.6,
          supports: [{ x: 0, type: 'fixed', label: 'A' }, { x: 3.6, type: 'roller', label: 'B' }, { x: 7.6, type: 'roller', label: 'C (Hinged)' }],
          loads: [{ x: 1.8, type: 'point', val: 'Load on AB' }, { x: 5.6, type: 'point', val: 'Load on BC' }]
        },
        steps: [
          {
            stepName: "Step 1: Member Stiffness & Modified 3/4 Factor",
            content: "Span AB (far end fixed): K_BA = I / L = 3.6 / 3.6 = <strong>1.0</strong>.<br/>Span BC (far end hinged!): Use modified stiffness K_BC = ¾ (I / L) = ¾ (3.6 / 4.0) = <strong>0.675</strong>."
          },
          {
            stepName: "Step 2: Distribution Factors at Joint B",
            content: "Total joint stiffness Σ K_B = 1.0 + 0.675 = 1.675.<br/>DF_BA = 1.0 / 1.675 = <strong>0.60</strong>.<br/>DF_BC = 0.675 / 1.675 = <strong>0.40</strong>.<br/>(Check: 0.60 + 0.40 = 1.00)."
          },
          {
            stepName: "Step 3: Balance Joint B & Single Carry-Over",
            content: "Unbalanced moment at B = (+30.0) + (-22.5) = +7.5 kN·m.<br/>Balancing moments: Bal_BA = -7.5 × 0.60 = <strong>-4.50 kN·m</strong>; Bal_BC = -7.5 × 0.40 = <strong>-3.00 kN·m</strong>.<br/>Carry-over to fixed support A: CO_AB = 0.5 × (-4.50) = <strong>-2.25 kN·m</strong>.<br/>No carry-over to C because modified 3/4 K was used!"
          },
          {
            stepName: "Step 4: Final Equilibrium Moments",
            content: "Summing columns:<br/>M_BA = +30.0 - 4.50 = <strong>+25.50 kN·m</strong>.<br/>M_BC = -22.5 - 3.00 = <strong>-25.50 kN·m</strong> (Balanced! ΣM_B = 0).<br/>M_AB = -30.0 - 2.25 = <strong>-32.25 kN·m</strong>."
          }
        ],
        hints: [
          "Hint 1: Multiply BC stiffness by 0.75 because C is a simple hinged end.",
          "Hint 2: Once you use modified 3/4 K on span BC, carry-over to C is strictly ZERO."
        ]
      }
    ],
    shortcuts: [
      "🔥 The 3/4 Factor Power: Whenever you see an exterior hinge/roller, IMMEDIATELY multiply its I/L by 0.75 and set its Carry-Over Factor to ZERO! Saves 80% of calculation time.",
      "⚡ Clamped Wall DF = 0: A fixed support has infinite stiffness (K = ∞). Therefore, its Distribution Factor DF is ALWAYS 0. It receives carry-overs, but never distributes!",
      "🎯 Sum Check at Every Joint: At every rigid joint (like B), the sum of final moments M_BA + M_BC MUST equal 0. If it doesn't, you made an arithmetic error in balancing!"
    ],
    methodSelection: "Moment Distribution is the premier hand method for continuous beams and non-sway multi-story frames. It eliminates simultaneous equations entirely through progressive numerical convergence.",
    commonTraps: [
      "Carrying over to an exterior hinge after using the modified 3/4 K factor (it must be 0).",
      "Forgetting to flip the sign when applying the balancing moment (-Unbalanced × DF)."
    ],
    mnemonics: "'Balance opposite, Carry over half' — Bal = -ΔM · DF, CO = 0.5 · Bal.",
    arena: [
      {
        title: "Challenge 7.1: The 3/4 Stiffness Calculation",
        diagram: `Joint B connects to Span BA (3.6m, I=3.6, A is Fixed) and Span BC (4.0m, I=3.6, C is Hinged)`,
        prompt: "Compute the modified stiffness K_BC and Distribution Factor DF_BC at Joint B:",
        options: [
          { text: "A) K_BC = 0.675, DF_BC = 0.40 (and DF_BA = 0.60)", correct: true, explain: "Grandmaster level! K_BC = 0.75 × (3.6/4.0) = 0.675. Total K = 1.0 + 0.675 = 1.675. DF_BC = 0.675/1.675 = 0.40!" },
          { text: "B) K_BC = 0.90, DF_BC = 0.474", correct: false, explain: "0.90 is the unmodified stiffness (used only if C is fixed or if you want to iterate 10 times to C)!" },
          { text: "C) K_BC = 0.45, DF_BC = 0.31", correct: false, explain: "0.5 is the carry-over factor, whereas the modified stiffness factor is 3/4 = 0.75!" }
        ]
      }
    ],
    cheatsheet: `
      • <strong>Member Stiffness (Far End Fixed):</strong> K = I / L<br/>
      • <strong>Modified Stiffness (Far End Hinged):</strong> K_mod = ¾ (I / L)<br/>
      • <strong>Distribution Factor:</strong> DF_i = K_i / Σ K<br/>
      • <strong>Fixed End DF:</strong> DF_fixed = 0<br/>
      • <strong>Hinged End DF:</strong> DF_hinge = 1.0<br/>
      • <strong>Carry-Over Factor:</strong> COF = + 0.5 (to fixed far ends)
    `
  }
];

// =========================================================================
// THE COMPREHENSIVE FORMULA ATLAS (WITH ANATOMY, SI UNITS & MNEMONICS)
// =========================================================================
const FORMULA_ATLAS = [
  {
    id: "f-1-1",
    moduleId: "mod1",
    moduleTitle: "Stability & Determinacy",
    name: "External Degree of Indeterminacy",
    formula: "D_e = r_a - r_m",
    symbols: [
      { symbol: "D_e", meaning: "Degree of external indeterminacy", unit: "dimensionless" },
      { symbol: "r_a", meaning: "Number of available support reaction components", unit: "integer" },
      { symbol: "r_m", meaning: "Minimum reactions required for 2D equilibrium (usually 3)", unit: "integer" }
    ],
    applicability: "Any 2D coplanar structural framework (beams, trusses, frames).",
    assumptions: "Supports must be properly arranged; neither all parallel nor all concurrent.",
    signConvention: "D_e > 0: Externally Indeterminate; D_e = 0: Externally Determinate; D_e < 0: Unstable.",
    derivation: "In 2D space, 3 independent equilibrium equations exist (ΣFx=0, ΣFy=0, ΣM=0). Surplus reactions beyond 3 cannot be solved by statics alone.",
    memoryCue: "'Available Reactions minus 3' (R - 3).",
    traps: "Do NOT assume D_e = 0 guarantees stability! 3 parallel rollers have r_a = 3, but roll away under horizontal wind.",
    related: ["D = (m + r) - 2j", "D = (3m + r) - (3j + s)"]
  },
  {
    id: "f-1-2",
    moduleId: "mod1",
    moduleTitle: "Stability & Determinacy",
    name: "Plane Truss Combined Determinacy Formula",
    formula: "D = (m + r) - 2j",
    symbols: [
      { symbol: "D", meaning: "Overall degree of static indeterminacy", unit: "dimensionless" },
      { symbol: "m", meaning: "Number of truss member bars", unit: "integer" },
      { symbol: "r", meaning: "Total external support reactions", unit: "integer" },
      { symbol: "j", meaning: "Total number of pin joints", unit: "integer" }
    ],
    applicability: "2D pin-jointed trusses loaded strictly at joints.",
    assumptions: "Frictionless pins, straight axial members, negligible self-weight bending.",
    signConvention: "D > 0: Indeterminate; D = 0: Determinate; D < 0: Unstable mechanism.",
    derivation: "Every pin joint provides 2 equilibrium equations: ΣFx = 0 and ΣFy = 0 (Total = 2j). Unknowns = m bar forces + r reactions.",
    memoryCue: "'Members + Reactions minus Twice the Joints' (M + R - 2J).",
    traps: "Geometric instability trap: A rectangular panel without a diagonal collapses in shear even if D = 0!",
    related: ["D_i = (m + 3) - 2j"]
  },
  {
    id: "f-1-3",
    moduleId: "mod1",
    moduleTitle: "Stability & Determinacy",
    name: "Rigid Frame Combined Determinacy Formula",
    formula: "D = (3m + r) - (3j + s)",
    symbols: [
      { symbol: "D", meaning: "Overall degree of static indeterminacy", unit: "dimensionless" },
      { symbol: "m", meaning: "Number of frame members", unit: "integer" },
      { symbol: "r", meaning: "Total external support reactions", unit: "integer" },
      { symbol: "j", meaning: "Total number of rigid joints", unit: "integer" },
      { symbol: "s", meaning: "Special condition equations from internal releases", unit: "integer" }
    ],
    applicability: "2D continuous rigid frames with beams, columns, and internal hinges.",
    assumptions: "Rigid joints transmit axial force, shear force, and bending moment.",
    signConvention: "D > 0: Indeterminate; D = 0: Determinate; D < 0: Mechanism.",
    derivation: "Each member stores 3 internal forces (N, V, M) ➔ 3m unknowns. Each rigid joint gives 3 equations (ΣFx=0, ΣFy=0, ΣM=0) ➔ 3j equations, plus s releases.",
    memoryCue: "'3 Members + Reactions minus 3 Joints + Special' (3M + R - 3J - S).",
    traps: "When 'k' members meet at an internal hinge, s = k - 1 (not 1!).",
    related: ["D_i = 3n - I_c"]
  },
  {
    id: "f-1-4",
    moduleId: "mod1",
    moduleTitle: "Stability & Determinacy",
    name: "Frame Closed-Loop Internal Shortcut",
    formula: "D_i = 3n - I_c",
    symbols: [
      { symbol: "D_i", meaning: "Internal degree of indeterminacy", unit: "dimensionless" },
      { symbol: "n", meaning: "Number of completely closed enclosed loops/cells", unit: "integer" },
      { symbol: "I_c", meaning: "Number of internal release conditions", unit: "integer" }
    ],
    applicability: "Rigid frames with closed cells or loops closed with the ground.",
    assumptions: "Cutting one member in a closed loop completely opens it, releasing 3 internal forces.",
    signConvention: "Each closed cell adds +3 redundants.",
    derivation: "Cutting a beam in a closed loop releases 3 internal forces (N, V, M), turning the loop into a determinate open tree.",
    memoryCue: "'3 times the Window Panes' (3n).",
    traps: "Remember to count loops closed with the ground at fixed bases!",
    related: ["D = (3m + r) - (3j + s)"]
  },
  {
    id: "f-2-1",
    moduleId: "mod2",
    moduleTitle: "Conjugate Beam",
    name: "Conjugate Beam Duality Theorems",
    formula: "θ(x) = V*(x)   |   v(x) = M*(x)",
    symbols: [
      { symbol: "θ(x)", meaning: "Slope of real beam at coordinate x", unit: "rad" },
      { symbol: "v(x)", meaning: "Deflection of real beam at coordinate x", unit: "m" },
      { symbol: "V*(x)", meaning: "Shear force in conjugate beam loaded with M/EI", unit: "rad" },
      { symbol: "M*(x)", meaning: "Bending moment in conjugate beam loaded with M/EI", unit: "m" }
    ],
    applicability: "Statically determinate beams with uniform or non-uniform EI.",
    assumptions: "Linear elastic material, small deflections, Euler-Bernoulli beam theory.",
    signConvention: "Positive sagging M/EI acts UPWARD on conjugate beam; negative hogging M/EI acts DOWNWARD.",
    derivation: "Double integration of d²v/dx² = M/EI matches double integration of d²M*/dx² = w*.",
    memoryCue: "'Shear is Slope, Moment is Movement' (S-S & M-M).",
    traps: "Forgetting that real fixed ends become free ends, and real free tips become fixed ends!",
    related: ["d²v/dx² = M/EI"]
  },
  {
    id: "f-2-2",
    moduleId: "mod2",
    moduleTitle: "Conjugate Beam",
    name: "Cantilever Tip Load Deflection & Slope",
    formula: "θ_tip = PL² / (2EI)   |   v_tip = PL³ / (3EI)",
    symbols: [
      { symbol: "P", meaning: "Concentrated load at cantilever tip", unit: "kN" },
      { symbol: "L", meaning: "Cantilever span length", unit: "m" },
      { symbol: "EI", meaning: "Flexural rigidity of beam cross-section", unit: "kN·m²" }
    ],
    applicability: "Prismatic cantilever beam subjected to tip point load P.",
    assumptions: "Constant flexural rigidity EI.",
    signConvention: "Downward load creates clockwise slope and downward deflection at tip.",
    derivation: "Conjugate beam is free at A, fixed at B, loaded with downward triangle (Area = PL²/2EI, centroid arm = 2L/3).",
    memoryCue: "'Over 2 for Slope, Over 3 for Deflection' (PL²/2EI, PL³/3EI).",
    traps: "Centroid of M/EI triangle is 2L/3 from fixed conjugate support B, NOT L/3!",
    related: ["v_mid = PL³/(48EI)"]
  },
  {
    id: "f-2-3",
    moduleId: "mod2",
    moduleTitle: "Conjugate Beam",
    name: "Simple Beam UDL Deflection & End Slope",
    formula: "θ_end = wL³ / (24EI)   |   v_mid = 5wL⁴ / (384EI)",
    symbols: [
      { symbol: "w", meaning: "Uniformly distributed load", unit: "kN/m" },
      { symbol: "L", meaning: "Span length", unit: "m" },
      { symbol: "EI", meaning: "Flexural rigidity", unit: "kN·m²" }
    ],
    applicability: "Simply supported beam under full-span uniform load.",
    assumptions: "Constant flexural rigidity EI throughout span.",
    signConvention: "Positive downward load produces downward midspan deflection.",
    derivation: "Conjugate beam loaded with symmetric upward parabola (Area = wL³/12EI). Support reaction = wL³/24EI.",
    memoryCue: "'5 over 384' — the most famous fraction in civil engineering!",
    traps: "Don't confuse midspan deflection (5wL⁴/384EI) with cantilever UDL deflection (wL⁴/8EI).",
    related: ["θ_end = PL²/(16EI)"]
  },
  {
    id: "f-3-1",
    moduleId: "mod3",
    moduleTitle: "Virtual Work",
    name: "Master Virtual Work Equation (Trusses)",
    formula: "1.0 · Δ = Σ [n · N · L / (EA)] + Σ [n · α · ΔT · L] + Σ [n · ΔL_fab]",
    symbols: [
      { symbol: "Δ", meaning: "Real deflection at target joint in direction of unit load", unit: "m" },
      { symbol: "n", meaning: "Internal axial force due to fictitious unit load (1.0)", unit: "dimensionless" },
      { symbol: "N", meaning: "Internal axial force due to real applied loads", unit: "kN" },
      { symbol: "L", meaning: "Length of member", unit: "m" },
      { symbol: "EA", meaning: "Axial stiffness (Young's modulus × cross-sectional area)", unit: "kN" },
      { symbol: "α", meaning: "Coefficient of thermal expansion", unit: "1/°C" },
      { symbol: "ΔT", meaning: "Temperature change (positive for rise, negative for drop)", unit: "°C" }
    ],
    applicability: "Pin-jointed trusses subject to loads, temperature changes, and fabrication errors.",
    assumptions: "Linear elastic material, small displacements.",
    signConvention: "Tension is POSITIVE (+), Compression is NEGATIVE (-).",
    derivation: "Equating external virtual work (1 · Δ) to internal virtual work (Σ n · δL).",
    memoryCue: "'Little n times Big N times L over EA'.",
    traps: "If a member carries n = 0, its product is ZERO; do not waste time calculating N!",
    related: ["1.0 · Δ = ∫ (m M / EI) dx"]
  },
  {
    id: "f-3-2",
    moduleId: "mod3",
    moduleTitle: "Virtual Work",
    name: "Vereshchagin's Graphical Multiplication Rule",
    formula: "∫₀ᴸ m · (M / EI) dx = (Area_M / EI) · m_c",
    symbols: [
      { symbol: "Area_M", meaning: "Area of the real bending moment diagram", unit: "kN·m²" },
      { symbol: "m_c", meaning: "Ordinate of the linear virtual moment diagram at Area_M centroid", unit: "kN·m/kN" },
      { symbol: "EI", meaning: "Flexural rigidity", unit: "kN·m²" }
    ],
    applicability: "Beams and frames where at least ONE diagram (m) is piecewise linear.",
    assumptions: "Virtual moment diagram m(x) must be straight/linear over the integration span.",
    signConvention: "Positive if both M and m are on the same side of the member.",
    derivation: "Since m(x) = c1 + c2·x, ∫ m(x) M(x) dx = c1 ∫ M dx + c2 ∫ x M dx = Area_M · m(x_centroid).",
    memoryCue: "'Area of real times Height of virtual at centroid'.",
    traps: "Evaluating m_c at the wrong location! Always project downward from the CENTROID of the real M diagram.",
    related: ["1.0 · θ = ∫ (m_θ M / EI) dx"]
  },
  {
    id: "f-3-3",
    moduleId: "mod3",
    moduleTitle: "Virtual Work",
    name: "Support Settlement in Determinate Structures",
    formula: "1.0 · Δ_target = - Σ (R_virtual · Δ_settlement)",
    symbols: [
      { symbol: "Δ_target", meaning: "Resulting displacement at target coordinate", unit: "m" },
      { symbol: "R_virtual", meaning: "Support reaction due to unit virtual load", unit: "kN/kN" },
      { symbol: "Δ_settlement", meaning: "Prescribed support displacement/settlement", unit: "m" }
    ],
    applicability: "Statically determinate structures undergoing support settlement.",
    assumptions: "No internal stresses develop in determinate structures due to support movement (W_i = 0).",
    signConvention: "R_virtual and Δ_settlement positive in the same direction.",
    derivation: "Because internal stresses are zero (M=0, N=0), internal virtual work W_i = 0. Therefore W_e = 1 · Δ + Σ R·Δ_s = 0.",
    memoryCue: "'No internal stress in determinate movement' (W_i = 0).",
    traps: "This does NOT apply to indeterminate structures! Indeterminate structures develop large internal bending moments under settlement.",
    related: ["Consistent Deformation"]
  },
  {
    id: "f-4-1",
    moduleId: "mod4",
    moduleTitle: "Consistent Deformation",
    name: "Single Redundant Compatibility Equation",
    formula: "Δ₁₀ + X₁ · δ₁₁ = 0   ➔   X₁ = - Δ₁₀ / δ₁₁",
    symbols: [
      { symbol: "X₁", meaning: "Redundant force or reaction component", unit: "kN or kN·m" },
      { symbol: "Δ₁₀", meaning: "Free deflection of primary base structure under real loads", unit: "m or rad" },
      { symbol: "δ₁₁", meaning: "Flexibility coefficient (deflection per unit redundant force)", unit: "m/kN or rad/kN·m" }
    ],
    applicability: "Statically indeterminate structures to the 1st degree (D = 1).",
    assumptions: "Primary structure must be statically determinate and geometrically stable.",
    signConvention: "Displacements in the assumed direction of X₁ are positive.",
    derivation: "Superposition of displacements: Real load causes Δ₁₀; redundant X₁ causes X₁·δ₁₁. Actual support is rigid (net displacement = 0).",
    memoryCue: "'Redundant equals Minus Free Deflection over Flexibility' (-Δ₀ / δ).",
    traps: "Selecting an unstable primary structure (e.g., removing supports that cause rigid-body spinning).",
    related: ["[δ]{X} + {Δ_o} = {Δ_s}"]
  },
  {
    id: "f-4-2",
    moduleId: "mod4",
    moduleTitle: "Consistent Deformation",
    name: "Maxwell-Betti Reciprocal Deflection Theorem",
    formula: "δ_ij = δ_ji",
    symbols: [
      { symbol: "δ_ij", meaning: "Deflection at coordinate i due to unit load at coordinate j", unit: "m/kN" },
      { symbol: "δ_ji", meaning: "Deflection at coordinate j due to unit load at coordinate i", unit: "m/kN" }
    ],
    applicability: "Any linear elastic structure satisfying Betti's Law.",
    assumptions: "Linear elasticity, Hooke's law, small deflections.",
    signConvention: "Consistent positive directions at coordinates i and j.",
    derivation: "Equating total work done when applying Load 1 then Load 2 versus applying Load 2 then Load 1.",
    memoryCue: "'Flexibility matrix is always SYMMETRIC' (δ₁₂ = δ₂₁).",
    traps: "Does not apply if material yields plastically or undergoes large non-linear displacements.",
    related: ["Flexibility Matrix [δ]"]
  },
  {
    id: "f-5-1",
    moduleId: "mod5",
    moduleTitle: "Three-Moment Equation",
    name: "Clapeyron's Three-Moment Equation",
    formula: "M_L · L_L + 2 M_C (L_L + L_R) + M_R · L_R = - [6A_L x_L / L_L + 6A_R x_R / L_R]",
    symbols: [
      { symbol: "M_L, M_C, M_R", meaning: "Bending moments at Left, Center, and Right supports", unit: "kN·m" },
      { symbol: "L_L, L_R", meaning: "Spans of left and right beam segments", unit: "m" },
      { symbol: "A_L, A_R", meaning: "Areas of free simply-supported moment diagrams on left/right spans", unit: "kN·m²" },
      { symbol: "x_L, x_R", meaning: "Centroid distances of free moment areas measured from OUTER supports", unit: "m" }
    ],
    applicability: "Continuous beams with unyielding supports and constant EI.",
    assumptions: "Slope is continuous across intermediate support C (θ_left = θ_right).",
    signConvention: "Downward loads produce positive free moment areas A; support moments M are negative (hogging).",
    derivation: "Equating slope of left span at middle support C to slope of right span at C using moment-area or conjugate beam.",
    memoryCue: "'Left + 2 Middle + Right = Minus Load Terms'.",
    traps: "Measuring x_L or x_R from the middle support! It MUST be measured from the OUTER supports L and R.",
    related: ["Imaginary Zero Span"]
  },
  {
    id: "f-5-2",
    moduleId: "mod5",
    moduleTitle: "Three-Moment Equation",
    name: "Standard Load Terms (6Ax/L)",
    formula: "UDL: 6Ax/L = wL³ / 4   |   Point Load: 6Ax/L = P a (L² - a²) / L",
    symbols: [
      { symbol: "w", meaning: "Uniform load over span L", unit: "kN/m" },
      { symbol: "P", meaning: "Concentrated point load", unit: "kN" },
      { symbol: "a", meaning: "Distance of point load P from the OUTER support", unit: "m" },
      { symbol: "L", meaning: "Span length", unit: "m" }
    ],
    applicability: "Continuous beam load term calculations on right-hand side of Clapeyron's equation.",
    assumptions: "Simple span free bending moment distributions.",
    signConvention: "Downward gravity loads give positive load terms on LHS, which become NEGATIVE due to minus sign on RHS.",
    derivation: "For UDL: A = (2/3) L (wL²/8) = wL³/12; x = L/2 ➔ 6Ax/L = 6(wL³/12)(L/2)/L = wL³/4.",
    memoryCue: "'w L cubed over 4' for UDL; 'P a (L squared minus a squared) over L' for point load.",
    traps: "Using a from the middle support instead of the outer support.",
    related: ["Center load: 3PL²/8"]
  },
  {
    id: "f-5-3",
    moduleId: "mod5",
    moduleTitle: "Three-Moment Equation",
    name: "Imaginary Zero-Span Clamped Wall Trick",
    formula: "L₀ = 0   |   EI₀ = ∞   ➔   L₀ / EI₀ = 0",
    symbols: [
      { symbol: "L₀", meaning: "Length of imaginary span to left of fixed wall", unit: "m" },
      { symbol: "EI₀", meaning: "Flexural rigidity of imaginary span", unit: "kN·m²" }
    ],
    applicability: "Continuous beams with clamped / fixed end supports.",
    assumptions: "A fixed wall has zero slope (θ = 0), perfectly simulated by a zero-length rigid span.",
    signConvention: "All terms associated with the imaginary span vanish (L₀=0, Load Term=0).",
    derivation: "Applying Three-Moment equation across 0 - A - B yields 2 M_A L_1 + M_B L_1 = - 6A_1 x_1 / L_1.",
    memoryCue: "'Add zero span on the wall' (L_0 = 0).",
    traps: "Do not put loads on the imaginary span! Its load term is strictly 0.",
    related: ["Fixed-End Moments"]
  },
  {
    id: "f-6-1",
    moduleId: "mod6",
    moduleTitle: "Slope-Deflection",
    name: "Slope-Deflection Governing Equation (AAU Convention)",
    formula: "M_AB = M^F_AB - 2EK ( 2θ_A + θ_B - 3Δ/L )",
    symbols: [
      { symbol: "M_AB", meaning: "Member end moment at near end A", unit: "kN·m" },
      { symbol: "M^F_AB", meaning: "Fixed-end moment at near end A", unit: "kN·m" },
      { symbol: "K", meaning: "Relative member stiffness (I / L)", unit: "m³" },
      { symbol: "θ_A", meaning: "Rotation of near joint A", unit: "rad" },
      { symbol: "θ_B", meaning: "Rotation of far joint B", unit: "rad" },
      { symbol: "Δ/L", meaning: "Chord rotation / sidesway angle (ψ)", unit: "rad" }
    ],
    applicability: "Continuous beams and rigid frames (sway and non-sway).",
    assumptions: "Prismatic members, linear elastic, axial deformations neglected.",
    signConvention: "CRITICAL AAU CONVENTION: Joint rotation θ is POSITIVE Clockwise. Member end moment M is POSITIVE Counter-Clockwise on member.",
    derivation: "Because clockwise rotation (+θ) induces a clockwise resisting moment on the member (which is negative in CCW convention), a MINUS sign precedes 2EK.",
    memoryCue: "'Minus 2EK into (Double Near + Far minus 3 Sway)'.",
    traps: "Using the US textbook '+ 2EK' will invert all your signs and fail your exam! Use '- 2EK'.",
    related: ["Hinged End Modification: M_AB = (M^F_AB - M^F_BA/2) - 3EK(θ_A - Δ/L)"]
  },
  {
    id: "f-6-2",
    moduleId: "mod6",
    moduleTitle: "Slope-Deflection",
    name: "Fixed-End Moments (AAU Sign Convention)",
    formula: "UDL: M^F_AB = + wL² / 12,  M^F_BA = - wL² / 12",
    symbols: [
      { symbol: "w", meaning: "Uniformly distributed load", unit: "kN/m" },
      { symbol: "L", meaning: "Span length", unit: "m" }
    ],
    applicability: "Clamped-clamped spans under uniform load.",
    assumptions: "Both ends fully restrained against rotation and translation.",
    signConvention: "Left end rotates CCW on member (+), right end rotates CW on member (-).",
    derivation: "Direct integration or Three-Moment imaginary span solution for clamped beam.",
    memoryCue: "'Plus on Left, Minus on Right' (+wL²/12, -wL²/12).",
    traps: "Forgetting that in AAU convention, left end is positive (+) and right end is negative (-).",
    related: ["Center Point Load: +PL/8, -PL/8"]
  },
  {
    id: "f-7-1",
    moduleId: "mod7",
    moduleTitle: "Moment Distribution",
    name: "Joint Distribution Factor (DF)",
    formula: "DF_i = K_i / Σ K   |   DF_fixed = 0   |   DF_hinge = 1.0",
    symbols: [
      { symbol: "DF_i", meaning: "Distribution factor for member i framing into joint", unit: "dimensionless" },
      { symbol: "K_i", meaning: "Flexural stiffness of member i (I / L or ¾ I / L)", unit: "m³" },
      { symbol: "Σ K", meaning: "Total flexural stiffness of all members framing into the joint", unit: "m³" }
    ],
    applicability: "Rigid joints connecting two or more structural members in beams or frames.",
    assumptions: "Joint is monolithic (all framing members rotate by identical angle θ).",
    signConvention: "Sum of distribution factors at any joint MUST equal 1.0 (Σ DF = 1.0).",
    derivation: "Applying moment M at joint: M = Σ (4EK_i θ) = 4Eθ Σ K_i ➔ M_i = M · (K_i / Σ K_i).",
    memoryCue: "'Stiffness over Sum of Stiffnesses'.",
    traps: "A fixed clamped wall has infinite stiffness (K = ∞), so its DF is ALWAYS 0. It never distributes!",
    related: ["K = I / L", "K_mod = ¾ I / L"]
  },
  {
    id: "f-7-2",
    moduleId: "mod7",
    moduleTitle: "Moment Distribution",
    name: "Modified 3/4 Stiffness for Hinged Far Ends",
    formula: "K_modified = (3/4) · (I / L)   |   COF to hinge = 0",
    symbols: [
      { symbol: "K_modified", meaning: "Reduced member stiffness for hinged far end", unit: "m³" },
      { symbol: "I / L", meaning: "Standard member stiffness", unit: "m³" }
    ],
    applicability: "Any span whose far end is a simple pin or roller (M = 0).",
    assumptions: "Far end is allowed to rotate freely, inducing zero resisting carry-over moment.",
    signConvention: "Stiffness reduced by 25%; carry-over factor to the hinge is strictly ZERO.",
    derivation: "Moment required to rotate near end when far end is hinged is 3EI/L θ, compared to 4EI/L θ when far end is fixed. Ratio = 3/4.",
    memoryCue: "'Three quarters K, zero carry-over'.",
    traps: "Carrying over moments to a hinged support after using 3/4 K! Carry-over to the hinge must be ZERO.",
    related: ["Carry-Over Factor COF = +0.5"]
  }
];

// =========================================================================
// DIAGNOSTIC EXAM SIMULATOR QUESTION BANK (10 CURATED CHALLENGES)
// =========================================================================
const EXAM_SIMULATOR_QUESTIONS = [
  {
    id: "exam-1",
    module: "mod1",
    title: "Question 1: External Geometric Stability",
    prompt: "A beam resting on three parallel vertical rollers has r_a = 3. Is it stable and why?",
    options: [
      { text: "A) Stable and determinate because r_a = 3 satisfies the 3 equilibrium equations in 2D.", correct: false, explain: "Incorrect. While r_a = 3 numerically, parallel reactions cannot resist horizontal forces." },
      { text: "B) Geometrically unstable because parallel reactions cannot satisfy ΣFx = 0 under inclined loads.", correct: true, explain: "Correct! r_a = 3 is a necessary but not sufficient condition. Parallel reactions lead to rigid body translation." },
      { text: "C) Internally indeterminate because rollers have no moments.", correct: false, explain: "Rollers are external supports, affecting external stability, not internal determinacy." }
    ]
  },
  {
    id: "exam-2",
    module: "mod1",
    title: "Question 2: Truss Triangulation Check",
    prompt: "A plane truss has j = 8 joints, m = 13 members, and r = 3 reactions. Numerically 2j = m + r = 16. However, one interior panel is a square with no diagonal. What is the status?",
    options: [
      { text: "A) Statically determinate and stable throughout.", correct: false, explain: "Incorrect. The unbraced panel forms an internal mechanism." },
      { text: "B) Internally unstable because the unbraced panel collapses in shear.", correct: true, explain: "Correct! 2j = m + r is a necessary condition, but triangular panel geometry is mandatory for truss rigidity." },
      { text: "C) Indeterminate to the 1st degree.", correct: false, explain: "It lacks a diagonal bar, making it an unstable mechanism, not indeterminate." }
    ]
  },
  {
    id: "exam-3",
    module: "mod2",
    title: "Question 3: Conjugate Beam Support Transformation",
    prompt: "In a real beam with a fixed support at A, an interior roller at B, and a free tip at C, how do the supports transform in the conjugate beam?",
    options: [
      { text: "A) A = Free End, B = Internal Hinge, C = Fixed Support", correct: true, explain: "Correct! Real θ=0,v=0 -> V*=0,M*=0 (Free). Real v=0,θ continuous -> M*=0,V* continuous (Internal Hinge). Real tip θ≠0,v≠0 -> V*≠0,M*≠0 (Fixed)." },
      { text: "B) A = Fixed Support, B = Interior Roller, C = Free End", correct: false, explain: "Incorrect. Boundary conditions must swap so static and kinematic conditions match." },
      { text: "C) A = Free End, B = Interior Roller, C = Pin", correct: false, explain: "Interior rollers in the real beam must transform into internal hinges." }
    ]
  },
  {
    id: "exam-4",
    module: "mod3",
    title: "Question 4: Vereshchagin's Multiplication Rule",
    prompt: "Under Vereshchagin's rule, evaluating ∫ (m M / EI) dx is performed by:",
    options: [
      { text: "A) Multiplying the total Area of the real M diagram by the ordinate m_c of the virtual diagram directly below the centroid of M.", correct: true, explain: "Exact! Because m(x) is linear, ∫ m M dx = Area(M) × m_centroid." },
      { text: "B) Multiplying the centroid of the m diagram by the maximum peak value of M.", correct: false, explain: "Incorrect. You must multiply the Area of M by the ordinate of m at M's centroid." },
      { text: "C) Integrating both diagrams using numerical Simpson's rule.", correct: false, explain: "Vereshchagin's rule avoids calculus entirely through geometric area multiplication." }
    ]
  },
  {
    id: "exam-5",
    module: "mod3",
    title: "Question 5: Determinate Support Settlement",
    prompt: "When a support settles in a statically determinate beam, what internal virtual work W_i is generated?",
    options: [
      { text: "A) W_i = 0, because no internal stresses (M=0, N=0) develop during rigid body movement.", correct: true, explain: "Correct! Determinate structures undergo pure rigid-body motion with zero internal strain energy under settlement." },
      { text: "B) W_i = ∫ (M²/EI) dx.", correct: false, explain: "Internal bending moment M is zero under settlement in determinate structures." },
      { text: "C) W_i is equal to the support settlement multiplied by Young's modulus E.", correct: false, explain: "No stress is developed." }
    ]
  },
  {
    id: "exam-6",
    module: "mod4",
    title: "Question 6: Propped Cantilever Compatibility",
    prompt: "For a propped cantilever of span L under uniform load w (fixed at A, roller at B), what is the roller reaction R_B?",
    options: [
      { text: "A) R_B = 3wL / 8 (Upward)", correct: true, explain: "Correct! R_B = -Δ_B0 / δ_BB = (wL⁴/8EI) / (L³/3EI) = 3wL/8." },
      { text: "B) R_B = wL / 2 (Upward)", correct: false, explain: "wL/2 applies to simply supported beams. Fixed end A attracts more load (5wL/8)." },
      { text: "C) R_B = 5wL / 8 (Upward)", correct: false, explain: "5wL/8 is the reaction at the fixed wall A, not the roller B." }
    ]
  },
  {
    id: "exam-7",
    module: "mod5",
    title: "Question 7: Three-Moment Equation Load Term",
    prompt: "In Clapeyron's Three-Moment Equation, what is the right-hand side load term (6Ax/L) for a span L carrying uniform load w?",
    options: [
      { text: "A) 6Ax/L = wL³ / 4", correct: true, explain: "Correct! Area = (2/3)L(wL²/8) = wL³/12. Centroid x = L/2. 6Ax/L = 6(wL³/12)(L/2)/L = wL³/4." },
      { text: "B) 6Ax/L = wL³ / 8", correct: false, explain: "Check the arithmetic: 6 × (1/12) × (1/2) = 6/24 = 1/4, not 1/8." },
      { text: "C) 6Ax/L = 3wL⁴ / 384", correct: false, explain: "That is related to midspan deflection, not the Three-Moment load term." }
    ]
  },
  {
    id: "exam-8",
    module: "mod5",
    title: "Question 8: Fixed-End Simulation in Three-Moment",
    prompt: "To apply the Three-Moment Equation to a fixed support at A, how is the clamped boundary simulated?",
    options: [
      { text: "A) By attaching an imaginary span of length L₀ = 0 and infinite stiffness EI₀ = ∞ to the left of A.", correct: true, explain: "Flawless! L₀/EI₀ = 0 and load term = 0, giving an exact extra equation to solve M_A directly." },
      { text: "B) By replacing the fixed support with an internal hinge.", correct: false, explain: "An internal hinge releases moment to zero, which destroys the fixed condition." },
      { text: "C) By doubling the length of the adjacent span.", correct: false, explain: "Span length cannot be doubled arbitrarily." }
    ]
  },
  {
    id: "exam-9",
    module: "mod6",
    title: "Question 9: AAU Slope-Deflection Minus Sign",
    prompt: "Why does the AAU COTM 3101 Slope-Deflection equation contain a MINUS sign: M_AB = M^F_AB - 2EK(2θ_A + θ_B - 3Δ/L)?",
    options: [
      { text: "A) Because joint rotation θ is positive CLOCKWISE, while member end moment M is defined positive COUNTER-CLOCKWISE on the member.", correct: true, explain: "Exact! Clockwise rotation (+θ) induces a clockwise resisting moment on the member—which is negative under the counter-clockwise convention (-4EKθ)." },
      { text: "B) Because Young's modulus E is taken as negative for compressive fibers.", correct: false, explain: "E is always positive." },
      { text: "C) It is an error in the original textbook that became tradition.", correct: false, explain: "It is mathematically rigorous and consistent with the defined coordinate system." }
    ]
  },
  {
    id: "exam-10",
    module: "mod7",
    title: "Question 10: Modified 3/4 Stiffness in Moment Distribution",
    prompt: "When an exterior span BC has a simple hinged end at C, why do we use K_modified = 3/4 (I/L)?",
    options: [
      { text: "A) Because it accounts for M_C = 0 beforehand, allowing single-step convergence with ZERO carry-over to C.", correct: true, explain: "Brilliant! The hinged end never needs balancing or carry-overs again, saving 80% of manual calculation time." },
      { text: "B) Because concrete cracks by 25% under service loads.", correct: false, explain: "This is a theoretical elastic stiffness property (3EI/L vs 4EI/L), not crack reduction." },
      { text: "C) Because the carry-over factor to a hinge is 3/4.", correct: false, explain: "The carry-over factor to a hinge with modified stiffness is strictly ZERO." }
    ]
  }
];

if (typeof module !== 'undefined') {
  module.exports = { COURSE_MODULES, FORMULA_ATLAS, EXAM_SIMULATOR_QUESTIONS };
}
