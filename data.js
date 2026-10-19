// COTM 3101: Theory of Structures - Complete Course Knowledgebase & Mastery Engine
// Addis Ababa University (AAU) / EiABC Curriculum

const COURSE_MODULES = [
  // =========================================================================
  // MODULE 1: STABILITY, DETERMINACY & LOADS ON STRUCTURES
  // =========================================================================
  {
    id: "mod1",
    shortTitle: "1. Stability & Determinacy",
    fullTitle: "Chapter 1: Stability, Determinacy & Structural Loads",
    icon: "⚖️",
    theory: [
      {
        heading: "1.1 The Golden First Principle: Stability vs. Determinacy",
        body: `
          <p>Before computing a single number, a structural engineer must answer two separate questions:</p>
          <div class="concept-callout">
            <strong>1. Stability (Geometric Configuration):</strong> Can the structure withstand any conceivable applied force system without transforming into a moving rigid-body mechanism? Stability is purely about <em>geometry and arrangement</em>, not cross-section size.<br/><br/>
            <strong>2. Static Determinacy:</strong> Can all external reaction forces and internal member stresses (N, V, M) be solved using <em>only</em> static equilibrium equations (ΣFx = 0, ΣFy = 0, ΣM = 0)?
          </div>
          <p>If unknown forces exceed independent equilibrium equations, the structure is <strong>Statically Indeterminate</strong> to degree <em>D</em>.</p>
        `,
        formula: `Degree of Indeterminacy (D) = (Total Unknown Forces) - (Available Equilibrium Equations)`
      },
      {
        heading: "1.2 The 3 Deadly Geometric Instability Traps",
        body: `
          <p>A fatal student error is assuming that having 3 reactions (rₐ = 3) guarantees stability in 2D. <strong>It does not!</strong></p>
          <ul>
            <li><strong>Trap 1: Parallel Reactions:</strong> If all 3 reactions are vertical rollers, ΣFx = 0 is impossible. A 1 kN horizontal breeze causes infinite rigid-body translation!</li>
            <li><strong>Trap 2: Concurrent Reactions:</strong> If lines of action of all 3 reaction forces intersect at a single common point <em>O</em>, ΣM_O = 0 cannot resist any moment about <em>O</em>. The structure spins like a wheel!</li>
            <li><strong>Trap 3: Unbraced Truss Panels:</strong> A bridge truss with 2j = m + 3 will instantaneously collapse in shear if even one rectangular panel lacks a diagonal bar!</li>
          </ul>
        `,
        diagram: `GEOMETRIC INSTABILITY TRAPS (rₐ = 3, yet collapases!):

1. Parallel Reactions:           2. Concurrent Lines:          3. Unbraced Truss Panel:
   [====================]                 . (Intersection O)       o------o------o------o
      |        |        |                /|\\                      /|      |      |\\     |\\
     (o)      (o)      (o)              / | \\                    o-o------o------o-o----o-o
   No horizontal restraint!       Zero rotational resistance!      Middle bay has NO diagonal!`
      },
      {
        heading: "1.3 Plane Trusses: Internal & Overall Determinacy",
        body: `
          <p>In a plane truss, each pin joint provides exactly 2 equilibrium equations: ΣFx = 0 and ΣFy = 0.</p>
          <ul>
            <li>For <em>j</em> joints, total available joint equations = <strong>2j</strong>.</li>
            <li>Total unknowns = <strong>m</strong> member forces + <strong>r</strong> support reactions.</li>
            <li><strong>Internal Condition (with r_m = 3):</strong> Compare <strong>2j</strong> with <strong>m + 3</strong>:
              <ul>
                <li>2j &gt; m + 3 ➔ Internally Unstable (Lacks sufficient members)</li>
                <li>2j = m + 3 ➔ Internally Determinate (Provided panels are triangulated)</li>
                <li>2j &lt; m + 3 ➔ Internally Indeterminate (Degree D_i = m + 3 - 2j)</li>
              </ul>
            </li>
            <li><strong>Overall Combined Formula:</strong> <code>D = (m + r) - 2j</code></li>
          </ul>
        `
      },
      {
        heading: "1.4 Continuous Rigid Frames: Member Formula vs. Closed-Loop Shortcut",
        body: `
          <p>Every member in a rigid frame transmits 3 internal forces (Axial N, Shear V, Bending Moment M), and every rigid joint provides 3 equilibrium equations (ΣFx = 0, ΣFy = 0, ΣM = 0).</p>
          <ul>
            <li><strong>Joint/Member Formula:</strong> <code>D = (3m + r) - (3j + s)</code>, where <em>s</em> is the number of internal releases (e.g., s = 1 for an internal hinge between two members).</li>
            <li><strong>The Master Closed-Loop Shortcut:</strong> <code>D_i = 3n - I_c</code>, where <em>n</em> is the number of closed loops/cells, and <em>I_c</em> is internal releases. Each completely closed loop adds exactly 3 internal redundants!</li>
          </ul>
        `
      }
    ],
    examples: [
      {
        title: "Lecture Example: Plane Truss Indeterminacy (PDF 1, Page 5)",
        problem: "Classify an 8-joint bridge truss (j = 8) on a pin and roller (r = 3) with m = 13 triangulated members vs. m = 14 members (one panel X-braced).",
        diagram: `Case A (m = 13):  /\\--/\\--/\\  (Every panel is a rigid triangle)
Case B (m = 14):  /\\--/X\\-/\\  (Center panel has double diagonal X-bracing)`,
        steps: [
          "Step 1: Compute equilibrium equations: 2j = 2 × 8 = 16 equations.",
          "Step 2: For Case A: m + r = 13 + 3 = 16 unknowns. Unknowns = Equations (16 = 16). Every bay is triangulated ➔ Stable & Statically Determinate (D = 0).",
          "Step 3: For Case B: m + r = 14 + 3 = 17 unknowns. Indeterminacy D = 17 - 16 = 1. One redundant diagonal bar must be cut to form a determinate primary structure ➔ Stable & 1st Degree Indeterminate (D = 1)."
        ]
      },
      {
        title: "Lecture Example: Multi-Bay Rigid Frame Indeterminacy (PDF 1, Page 6)",
        problem: "Determine the internal and overall degree of indeterminacy for a 2-bay, 2-story building frame having j = 9 rigid joints, m = 10 members, s = 0 internal hinges, and 3 fixed column bases (r = 9).",
        diagram: `   o-------o-------o  Level 2 (3 joints, 2 beams)
   |  (1)  |  (2)  |  (3 columns)
   o-------o-------o  Level 1 (3 joints, 2 beams)
   |       |       |  (3 base columns)
  [#]     [#]     [#] Ground Supports (3 Fixed = 9 reactions)`,
        steps: [
          "Step 1: Count total unknowns: 3m + r = 3(10) + 9 = 39 unknowns.",
          "Step 2: Count available equations: 3j + s = 3(9) + 0 = 27 equations.",
          "Step 3: Overall degree of indeterminacy: D = (3m + r) - (3j + s) = 39 - 27 = 12th Degree Indeterminate!",
          "Step 4 (Alternative Closed-Loop Check): When fixed to the ground, the ground acts as an infinitely rigid base closing 2 lower bays. Total closed loops n = 2 (upper) + 2 (lower with ground) = 4 loops. D = 3n - s = 3(4) - 0 = 12!"
        ]
      }
    ],
    shortcuts: [
      "🔥 The 3-Reaction Roller Myth: 3 rollers NEVER make a stable structure! At least one support must resist horizontal translation (a pin or fixed base).",
      "⚡ Closed-Loop Visual Trick: Count the closed 'windows' in a frame. Each window = 3 degrees of internal indeterminacy (cut one member to open the loop).",
      "🎯 Pin in a Rigid Frame: If 'k' members meet at a hinge, the number of special equations is s = k - 1 (e.g., 2 members meeting at a pin gives s = 1; 3 members meeting gives s = 2)."
    ],
    arena: [
      {
        title: "Challenge 1.1: The Horizontal Wind Trap",
        diagram: `   [====================]  (Uniform vertical load w + horizontal wind H)
      |       |       |
     (o)     (o)     (o)   (3 vertical roller supports)`,
        prompt: "A junior engineer claims this beam is statically determinate because r = 3 and equations = 3, so D = 3 - 3 = 0. What is the true structural verdict?",
        options: [
          { text: "A) It is determinate and completely safe.", correct: false, explain: "Look at the reaction lines: all 3 are vertical!" },
          { text: "B) Geometrically unstable: All reactions are parallel, leaving ΣFx = 0 unsatisfied under any horizontal load component.", correct: true, explain: "Spot on! Having r = 3 is necessary, NOT sufficient. Parallel reaction lines cause rigid-body lateral instability." },
          { text: "C) Indeterminate to the 1st degree.", correct: false, explain: "Rollers cannot generate horizontal reactions, so the degree is not the issue—geometric stability fails!" }
        ]
      },
      {
        title: "Challenge 1.2: Continuous Beam with Internal Hinge (Lecture Review Fig. 3)",
        diagram: `A [Fixed] ===== B ===== (o) C [Internal Hinge] ===== D (Roller) ===== E (Roller)`,
        prompt: "Find the overall degree of indeterminacy D for this continuous beam (Fixed at A, Roller at D, Roller at E, Internal Hinge at C).",
        options: [
          { text: "A) D = 1 (Indeterminate to 1st degree)", correct: true, explain: "Exact! Reactions r = 3 (Fixed A) + 1 (Roller D) + 1 (Roller E) = 5. Equations = 3 + s = 3 + 1 = 4. D = 5 - 4 = 1!" },
          { text: "B) D = 0 (Statically Determinate)", correct: false, explain: "Fixed at A has 3 reaction components (vertical, horizontal, moment). 5 reactions vs 4 equations gives D = 1." },
          { text: "C) D = 2", correct: false, explain: "Don't forget to subtract the internal hinge equation s = 1 (M_C = 0)." }
        ]
      }
    ],
    cheatsheet: `
      • <strong>External Indeterminacy:</strong> D_e = r_a - 3<br/>
      • <strong>Plane Truss Combined Formula:</strong> D = (m + r) - 2j<br/>
      • <strong>Rigid Frame Combined Formula:</strong> D = (3m + r) - (3j + s)<br/>
      • <strong>Closed-Loop Internal Formula:</strong> D_i = 3n - I_c<br/>
      • <strong>Internal Hinge Release:</strong> s = k - 1 (for <em>k</em> members meeting at the joint)
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
    theory: [
      {
        heading: "2.1 The Mathematical Analogy: Why Conjugate Beam Works",
        body: `
          <p>Beam deflection is governed by the curvature differential equation: <code>d²v/dx² = M/EI</code> (where <em>v</em> is deflection and <em>θ = dv/dx</em> is slope).</p>
          <p>Beam statics is governed by the load-moment differential equation: <code>d²M*/dx² = w*</code> (where <em>M*</em> is moment and <em>V* = dM*/dx</em> is shear force).</p>
          <div class="concept-callout">
            Because both physical phenomena satisfy the <strong>identical second-order differential equation</strong>, we can construct an imaginary <em>Conjugate Beam</em> of the same length, load it with the real beam's <strong>M/EI diagram</strong>, and use simple statics:
            <br/><br/>
            • <strong>Conjugate Beam Theorem 1:</strong> The <strong>Slope θ</strong> at any point of the real beam equals the <strong>Shear Force V*</strong> in the conjugate beam.<br/>
            • <strong>Conjugate Beam Theorem 2:</strong> The <strong>Deflection v</strong> at any point of the real beam equals the <strong>Bending Moment M*</strong> in the conjugate beam.
          </div>
        `,
        formula: `Real Slope θ(x) ≡ Conjugate Shear V*(x)   |   Real Deflection v(x) ≡ Conjugate Moment M*(x)`
      },
      {
        heading: "2.2 Support Transformation Rules & Elastic Sign Convention",
        body: `
          <p>Boundary conditions must match physically: where real slope/deflection exist, conjugate shear/moment must exist!</p>
          <div class="eng-table-wrapper">
            <table class="eng-table">
              <thead>
                <tr>
                  <th>Real Beam Boundary</th>
                  <th>Real Conditions</th>
                  <th>Conjugate Beam Boundary</th>
                  <th>Conjugate Conditions</th>
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
          <p style="margin-top:12px;"><strong>Sign Rule:</strong> Positive (+M/EI) sagging moments act as <strong>UPWARD</strong> elastic loads. Negative (-M/EI) hogging moments act as <strong>DOWNWARD</strong> elastic loads.</p>
        `,
        diagram: `SUPPORT TRANSFORMATION VISUAL GUIDE:

Real Cantilever:     A [Fixed] ================== B (Free tip)
Conjugate Cantilever: A (Free) ================== B [Fixed]

Real Overhang:       A (Pin) ==== B (Roller) ==== C (Free tip)
Conjugate Beam:      A (Pin) ==== B (Hinge)  ==== C [Fixed]`
      }
    ],
    examples: [
      {
        title: "Lecture Example 1: Cantilever with Tip Load P (PDF 2, Page 5)",
        problem: "Derive the maximum rotation θ_B and deflection v_B at the free tip of a cantilever beam AB of length L and flexural rigidity EI subjected to concentrated downward load P.",
        diagram: `Real Beam:      A [Fixed] ================== B (Load P ↓)
Real BMD:       -PL at A (hogging) tapering linearly to 0 at B
Conjugate Beam: A (Free) ================== B [Fixed]
Elastic Load:   Downward triangle of peak PL/EI at A, 0 at B`,
        steps: [
          "Step 1: Construct the conjugate beam: Fixed end A becomes Free; Free tip B becomes Fixed.",
          "Step 2: Total downward elastic load = Area of M/EI triangle: W* = ½(L)(PL/EI) = PL² / (2EI).",
          "Step 3: Distance from heavy end A to centroid is L/3; distance from fixed support B to centroid is 2L/3.",
          "Step 4: Conjugate Shear at B = Slope θ_B: V_B* = W* = PL² / (2EI) (Clockwise rotation).",
          "Step 5: Conjugate Moment at B = Deflection v_B: M_B* = W* × (2L/3) = [PL² / (2EI)] × (2L/3) = PL³ / (3EI) (Downward deflection)!"
        ]
      },
      {
        title: "Lecture Example 4: Simply Supported Beam with UDL w (PDF 2, Page 6)",
        problem: "Find the end slope θ_A and midspan deflection v_C for a simple beam AB under uniform load w over span L.",
        diagram: `Real Beam:      A (Pin) ================== B (Roller)  [UDL w over L]
Real BMD:       Parabola with peak +wL²/8EI at midspan C
Conjugate Beam: A (Pin) ================== B (Roller) [Upward parabolic load]`,
        steps: [
          "Step 1: Area of symmetric parabola = (2/3) × base × height = (2/3)(L)(wL² / 8EI) = wL³ / (12EI).",
          "Step 2: By symmetry, each conjugate support carries half: R_A* = R_B* = ½ [wL³ / (12EI)] = wL³ / (24EI) downward.",
          "Step 3: Slope at support A = Conjugate Shear V_A* = wL³ / (24EI) (Clockwise).",
          "Step 4: Midspan deflection v_C = Conjugate Moment M_C* at x = L/2: Cut at C, take moments of left half:",
          "M_C* = R_A*(L/2) - (Area of half parabola) × (Centroid arm to C) = [wL³/(24EI)](L/2) - [(2/3)(L/2)(wL²/8EI)] × [3/8 × (L/2)] = 5wL⁴ / (384EI) Downward!"
        ]
      }
    ],
    shortcuts: [
      "⚡ Centroid of Triangle: Distance from the pointed (zero) tip to centroid is ALWAYS 2/3 of span! Distance from heavy end is 1/3 of span.",
      "⚡ Parabola Area Shortcut: Area of full symmetric parabola = (2/3)·b·h. Area of 2nd-degree spandrel (vertex at support) = (1/3)·b·h.",
      "🔥 The Overhang Secret: An overhang in a real beam always turns into a FIXED support in the conjugate beam! You solve the main span first, then evaluate the cantilever overhang directly."
    ],
    arena: [
      {
        title: "Challenge 2.1: Support Transformation Mastery",
        diagram: `Real Beam: A [Fixed] ======== B (Interior Roller) ======== C (Free Overhang)`,
        prompt: "Transform supports A, B, and C into their Conjugate Beam counterparts:",
        options: [
          { text: "A) A = Free End, B = Internal Hinge, C = Fixed Support", correct: true, explain: "Spot on! Fixed becomes Free, interior support becomes internal hinge, and free tip becomes fixed support." },
          { text: "B) A = Fixed, B = Roller, C = Free", correct: false, explain: "Supports must transform so kinematic conditions match static conditions!" },
          { text: "C) A = Free, B = Roller, C = Pin", correct: false, explain: "An interior roller prevents deflection (v = 0) while slope is continuous, which is the exact definition of an internal hinge (M* = 0, V* continuous)!" }
        ]
      }
    ],
    cheatsheet: `
      • <strong>Cantilever Tip Load P:</strong> θ = PL²/(2EI),  v = PL³/(3EI)<br/>
      • <strong>Cantilever UDL w:</strong> θ = wL³/(6EI),  v = wL⁴/(8EI)<br/>
      • <strong>Simple Beam Center Load P:</strong> θ = PL²/(16EI),  v = PL³/(48EI)<br/>
      • <strong>Simple Beam UDL w:</strong> θ = wL³/(24EI),  v = 5wL⁴/(384EI)<br/>
      • <strong>Simple Beam End Moment M_o:</strong> θ_near = M_o L / (3EI),  θ_far = M_o L / (6EI)
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
    theory: [
      {
        heading: "3.1 Principle of Virtual Work for Deformable Bodies",
        body: `
          <p>Bernoulli's principle of virtual displacements states that for an elastic body in equilibrium under a fictitious virtual load system (State II), subjected to the real deformations caused by actual loads, temperature changes, or support movements (State I):</p>
          <div class="concept-callout">
            <strong>External Virtual Work (W_e) = Internal Virtual Work (W_i)</strong><br/>
            • To find a linear deflection Δ: Apply a fictitious <strong>Unit Force (P = 1.0)</strong> at the point and in the direction of Δ ➔ <code>1.0 · Δ = W_i</code><br/>
            • To find an angular rotation θ: Apply a fictitious <strong>Unit Couple (M = 1.0)</strong> at the point and in the direction of θ ➔ <code>1.0 · θ = W_i</code>
          </div>
        `,
        formula: `1.0 · Δ = Σ [n · ΔL] + ∫ [m · M / (EI)] dx`
      },
      {
        heading: "3.2 Trusses: Axial Strains, Temperature & Fabrication Errors",
        body: `
          <p>For pin-jointed trusses, the internal virtual work is summed over all members:</p>
          <ul>
            <li><strong>From Real Applied Loads:</strong> <code>ΔL = N·L / (E·A)</code> ➔ <code>1·Δ = Σ [n · N · L / (E · A)]</code></li>
            <li><strong>From Temperature Change (ΔT):</strong> <code>ΔL = α · (ΔT) · L</code> ➔ <code>1·Δ = Σ [n · α · (ΔT) · L]</code></li>
            <li><strong>From Fabrication Error:</strong> <code>ΔL = ΔL_fab</code> (positive if manufactured too long, negative if too short) ➔ <code>1·Δ = Σ [n · ΔL_fab]</code></li>
          </ul>
        `
      },
      {
        heading: "3.3 Graphical Multiplication Method (Vereshchagin's Rule)",
        body: `
          <p>Calculating the integral <code>∫ [m · M / EI] dx</code> by hand calculus is tedious. Since the virtual moment diagram <em>m(x)</em> from a unit load is <strong>always piecewise linear</strong>, Vereshchagin proved that:</p>
          <div class="concept-callout">
            <strong>Vereshchagin's Rule:</strong><br/>
            <code>∫₀ᴸ m · M dx = Area(M) × m_centroid</code><br/>
            Multiply the total area of the real bending moment diagram <strong>Area(M)</strong> by the ordinate value of the linear virtual moment diagram <strong>m_c</strong> measured directly under the centroid of Area(M)!
          </div>
        `,
        diagram: `VERESHCHAGIN GRAPHICAL MULTIPLICATION TABLE:

1. Rectangle:         Area = h · L           Centroid: a = L/2,   b = L/2
2. Triangle:          Area = ½ · h · L       Centroid: a = L/3,   b = 2L/3
3. Standard Parabola: Area = ⅔ · h · L       Centroid: a = L/2,   b = L/2
4. 2nd° Spandrel:     Area = ⅓ · h · L       Centroid: a = L/4,   b = 3L/4`
      },
      {
        heading: "3.4 Support Movements in Statically Determinate Structures",
        body: `
          <p><strong>Fundamental Insight:</strong> In a statically determinate structure, settlement or translation of a support induces <strong>zero internal stress (M = 0, N = 0)</strong>! The structure simply shifts as a rigid body.</p>
          <p>Therefore, internal virtual work is strictly zero: <code>W_i = 0</code>!</p>
          <p>Equating external virtual work to zero gives: <code>1.0 · Δ_target + Σ (R_virtual · Δ_settlement) = 0</code></p>
        `
      }
    ],
    examples: [
      {
        title: "Lecture Example: Complete 13-Member Truss Deflection Table (PDF 3, Page 9)",
        problem: "Calculate the vertical deflection of joint B for an 8-joint bridge truss subjected to a 10 kN downward load at joint D. Chord members have A = 6 cm², web members A = 4 cm², E = 210 GPa.",
        diagram: `        H (2.4m)         G               F
        o---------------o---------------o
       /|\\              |              /|\\
      / | \\             |             / | \\
     o--o--o------------o------------o--o--o
     A  B               C               D  E
     |2.4m|---1.6m---|---1.6m---|2.4m|  (10 kN ↓ at D)`,
        steps: [
          "Step 1: Compute real forces N in all 13 members under 10 kN at joint D using method of joints/sections.",
          "Step 2: Remove real load; apply unit vertical load (P = 1.0) downward at joint B; compute virtual forces n in all 13 members.",
          "Step 3: Form the product column (n · N · L / A) for each member:",
          "• Member EF: L=3.394m, A=6cm², N=-9.90kN, n=-0.424 ➔ Product = +2.374",
          "• Member HC: L=2.884m, A=4cm², N=+3.61kN, n=-0.361 ➔ Product = -0.940",
          "• Summing all 13 members gives: Σ (n · N · L / A) = 7.002 kN·m/cm² = 70.02 kN·m/m².",
          "Step 4: Divide by E = 210 × 10⁶ kN/m²: δ_B = 70.02 / (210 × 10⁶) m = 0.333 mm Downward!"
        ]
      }
    ],
    shortcuts: [
      "🔥 Zero-Force Member Elimination: If a member has n = 0 (no force under virtual load), its product n·N·L/EA is ZERO! Don't waste time computing its real force N!",
      "⚡ Sign Rule for Virtual Work: If n and N have the SAME sign (both tension + or both compression -), their product is POSITIVE (contributes in the direction of the unit load).",
      "🎯 Frame Axial Neglect: In beams and rigid frames, axial deformation energy is typically < 1% of bending deformation. Always neglect axial strains unless explicitly told otherwise."
    ],
    arena: [
      {
        title: "Challenge 3.1: Graphical Multiplication Speed Run",
        diagram: `Real M-Diagram: Parabola of height h = wL²/(8EI) over span L (Area = ⅔ · h · L)
Virtual m-Diagram (Unit Couple at Support A): Triangle from 1.0 at A to 0 at B (Midspan ordinate m_c = 0.5)`,
        prompt: "Use Vereshchagin's rule to find the end rotation θ_A without integrating:",
        options: [
          { text: "A) θ_A = [ ⅔ · L · wL²/(8EI) ] × (0.5) = wL³ / (24EI)", correct: true, explain: "Mastery! Area = wL³/(12EI). Multiply by midspan ordinate 0.5 gives exactly wL³/(24EI) in 5 seconds flat!" },
          { text: "B) θ_A = wL³ / (12EI)", correct: false, explain: "You forgot to multiply by the centroid ordinate m_c = 0.5!" },
          { text: "C) θ_A = 5wL⁴ / (384EI)", correct: false, explain: "5wL⁴/(384EI) is the midspan deflection v, not the end rotation θ!" }
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
  // MODULE 4: CONSISTENT DEFORMATION (FLEXIBILITY / FORCE METHOD)
  // =========================================================================
  {
    id: "mod4",
    shortTitle: "4. Consistent Deformation",
    fullTitle: "Chapter 4: Analysis of Indeterminate Structures by Consistent Deformation",
    icon: "🧩",
    theory: [
      {
        heading: "4.1 The Core Philosophy of the Force/Flexibility Method",
        body: `
          <p>Statically indeterminate structures cannot be solved by equilibrium alone because there are more unknown forces than available equations. The <strong>Method of Consistent Deformation</strong> resolves this in 4 systematic steps:</p>
          <div class="concept-callout">
            <strong>1. Release Redundants:</strong> Remove redundant supports or cut members to convert the indeterminate structure into a stable, statically determinate <em>Primary (Base) Structure</em>.<br/>
            <strong>2. Free Deformation (State 0):</strong> Apply the real external loads to the primary structure. Calculate the resulting deflection at the released coordinate: <code>Δ_10</code>.<br/>
            <strong>3. Unit Redundant (State 1):</strong> Remove real loads and apply a unit redundant force (X₁ = 1.0) at the release. Calculate the flexibility coefficient: <code>δ_11</code> (deflection per unit redundant force).<br/>
            <strong>4. Compatibility Equation:</strong> Enforce that the actual boundary does not move (or moves by a known settlement Δ_support):
            <br/><code>Δ₁₀ + X₁ · δ₁₁ = 0   ➔   X₁ = - Δ₁₀ / δ₁₁</code>
          </div>
        `,
        formula: `Compatibility: [δ] {X} + {Δ_o} = {Δ_settlement}`
      },
      {
        heading: "4.2 Multiple Redundants & Maxwell-Betti Reciprocal Theorem",
        body: `
          <p>For a structure indeterminate to degree <em>n</em>, release <em>n</em> redundants. Compatibility forms a system of <em>n</em> simultaneous linear equations:</p>
          <div class="formula-banner">
            Δ₁₀ + X₁·δ₁₁ + X₂·δ₁₂ + ... + X_n·δ₁_n = 0<br/>
            Δ₂₀ + X₁·δ₂₁ + X₂·δ₂₂ + ... + X_n·δ₂_n = 0
          </div>
          <p><strong>Maxwell's Reciprocal Deflection Theorem:</strong> The deflection at coordinate <em>i</em> due to a unit load at <em>j</em> is identical to the deflection at <em>j</em> due to a unit load at <em>i</em>: <code>δ_ij = δ_ji</code>! This guarantees that the flexibility matrix is always <strong>symmetric</strong>, cutting your integration work in half!</p>
        `
      }
    ],
    examples: [
      {
        title: "Lecture Example 1: Propped Cantilever under UDL w (PDF 4, Page 3)",
        problem: "Determine the reaction at roller B and draw the BMD for a propped cantilever beam AB of span L with fixed support at A and roller at B, carrying uniform load w.",
        diagram: `Real Beam:       A [Fixed] ==================== B (Roller) [Uniform load w]
Primary Structure: A [Fixed] ==================== B (Free tip) [Release Roller B]
State 0: Real load w pushes B down: Δ_B0 = -wL⁴ / (8EI)
State 1: Unit upward force at B pushes B up: δ_BB = +L³ / (3EI)`,
        steps: [
          "Step 1: Release redundant roller B. The primary structure is a determinate cantilever.",
          "Step 2: Under real load w, downward tip deflection is Δ_B0 = -wL⁴ / (8EI).",
          "Step 3: Under unit upward load X_B = 1 at B, upward tip deflection is δ_BB = L³ / (3EI).",
          "Step 4: Compatibility condition: Δ_B0 + X_B · δ_BB = 0",
          "➔ X_B = -Δ_B0 / δ_BB = [-(-wL⁴/8EI)] / [L³/3EI] = (3/8) wL Upward!",
          "Step 5: Solve remaining reactions by statics:",
          "• Vertical reaction at A: R_A = wL - R_B = wL - (3/8)wL = (5/8) wL Upward.",
          "• Fixed end moment at A: M_A = wL²/2 - R_B·L = wL²/2 - (3/8)wL² = wL² / 8 (Hogging)!"
        ]
      }
    ],
    shortcuts: [
      "🔥 The Propped Cantilever Shortcut: For ANY propped cantilever under UDL w, the roller ALWAYS takes exactly 3/8 wL, and the fixed wall takes 5/8 wL and wL²/8 moment!",
      "⚡ Strategic Base Structure Choice: Choosing a primary structure that maximizes symmetry or zero-moment regions drastically reduces your virtual work integrals.",
      "🎯 Support Settlement Inclusion: If the roller support settles downward by amount Δ_s, simply put -Δ_s on the right-hand side of compatibility: Δ_B0 + R_B · δ_BB = -Δ_s."
    ],
    arena: [
      {
        title: "Challenge 4.1: Propped Cantilever Center Point Load",
        diagram: `A [Fixed] ============= (P at midspan L/2) ============= B (Roller)`,
        prompt: "Using consistent deformation (Δ_B0 = -5PL³/(48EI), δ_BB = L³/(3EI)), find reaction R_B:",
        options: [
          { text: "A) R_B = 5P / 16 (Upward)", correct: true, explain: "Boom! R_B = (5PL³/48EI) / (L³/3EI) = (5/48) × 3 P = 5P/16. Then wall reaction is R_A = 11P/16 and M_A = 3PL/16!" },
          { text: "B) R_B = P / 2", correct: false, explain: "P/2 would be a symmetric simply supported beam. Fixed end A attracts more stiffness, leaving only 5P/16 for roller B." },
          { text: "C) R_B = 3P / 8", correct: false, explain: "3/8 is for uniform load wL, not a concentrated center load P!" }
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
  // MODULE 5: THREE-MOMENT EQUATION (CLAPEYRON'S THEOREM)
  // =========================================================================
  {
    id: "mod5",
    shortTitle: "5. Three-Moment Equation",
    fullTitle: "Chapter 5: Continuous Beams — Clapeyron's Three-Moment Equation",
    icon: "📐",
    theory: [
      {
        heading: "5.1 Physical Basis: Tangent Slope Continuity",
        body: `
          <p>Clapeyron's Three-Moment Equation relates the internal bending moments at three consecutive supports (Left <em>L</em>, Center <em>C</em>, Right <em>R</em>) of a continuous beam. It enforces that the beam's elastic curve has a <strong>smooth, continuous slope (θ_left = θ_right)</strong> across the interior support.</p>
          <div class="concept-callout">
            <strong>Standard Three-Moment Equation (Constant EI & Unyielding Supports):</strong><br/>
            <code>M_L · L_L + 2 M_C (L_L + L_R) + M_R · L_R = - (6 A_L x_L / L_L) - (6 A_R x_R / L_R)</code>
          </div>
        `,
        formula: `M_L · L_L + 2 M_C (L_L + L_R) + M_R · L_R = - [6 A_L x_L / L_L] - [6 A_R x_R / L_R]`
      },
      {
        heading: "5.2 Universal Load Terms (6Ax/L)",
        body: `
          <p>The right-hand side represents the free bending moment diagram area terms:</p>
          <ul>
            <li><strong>Uniformly Distributed Load (w) on span L:</strong> <code>6Ax / L = w · L³ / 4</code></li>
            <li><strong>Concentrated Load (P) at distance <em>a</em> from outer support:</strong> <code>6Ax / L = P · a · (L² - a²) / L</code></li>
            <li><strong>Center Point Load (P at midspan L/2):</strong> <code>6Ax / L = (3/8) · P · L²</code></li>
          </ul>
        `
      },
      {
        heading: "5.3 The Imaginary Zero-Span Trick for Fixed Ends",
        body: `
          <p><strong>The Dilemma:</strong> A fixed support has an unknown moment (M_wall ≠ 0), but it has no span to its left to apply the 3-moment equation.</p>
          <p><strong>The Master Trick:</strong> Add an <strong>imaginary span of length L₀ = 0 and infinite rigidity (EI₀ = ∞)</strong> to the left of the fixed end! The ratio <code>L₀ / EI₀ = 0</code>, and the load term is 0. This instantly yields an extra equation to solve the fixed end moment directly!</p>
        `
      }
    ],
    examples: [
      {
        title: "Lecture Example 3: Two-Span Continuous Beam (PDF 5, Page 5)",
        problem: "Find support moment M_B and all reactions for continuous beam ABC. Span AB = 4.0m with 40 kN point load at midspan (a = 2m); Span BC = 6.0m with uniform load 10 kN/m. Supports A and C are simple pins/rollers.",
        diagram: `         40 kN (midspan)              10 kN/m (uniform)
             ↓                        ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
   A (Pin) ======== B (Roller) ============================== C (Roller)
     |--- 2m ---|--- 2m ---|                  |--------- 6.0m ---------|`,
        steps: [
          "Step 1: Identify boundary conditions: Exterior simple supports carry zero moment: M_A = 0, M_C = 0.",
          "Step 2: Compute load term for Span AB (Point load 40 kN at a = 2m, L = 4m):",
          "• 6 A_L x_L / L_L = P · a · (L² - a²) / L = 40 × 2 × (4² - 2²) / 4 = 80 × 12 / 4 = 240 kN·m².",
          "Step 3: Compute load term for Span BC (UDL 10 kN/m on L = 6m):",
          "• 6 A_R x_R / L_R = w · L³ / 4 = 10 × 6³ / 4 = 10 × 216 / 4 = 540 kN·m².",
          "Step 4: Substitute into Three-Moment Equation for ABC:",
          "• 0(4) + 2 M_B (4 + 6) + 0(6) = - [240 + 540]",
          "• 20 M_B = -780  ➔  M_B = -39.0 kN·m (Hogging over support B)!",
          "Step 5: Compute reactions by isolating each span:",
          "• Span AB: ΣM_B = 0 ➔ R_A × 4 - 40 × 2 + (-39) = 0 ➔ R_A = (80 - 39)/4 = 10.25 kN.",
          "• Span BC: ΣM_B = 0 ➔ R_C × 6 - (10 × 6) × 3 + (-39) = 0 ➔ R_C = (180 - 39)/6 = 23.50 kN.",
          "• Support B reaction: R_B = Total Load - R_A - R_C = (40 + 60) - 10.25 - 23.50 = 66.25 kN Upward!"
        ]
      }
    ],
    shortcuts: [
      "🔥 The Negative Sign on RHS: Gravity loads push DOWN, causing positive sagging free moments, which always create NEGATIVE hogging support moments over interior piers! Never drop the minus sign on the RHS!",
      "⚡ Equal Spans & UDL Shortcut: For two equal spans L under uniform load w: 2 M_B (L + L) = - 2 (wL³/4) ➔ 4L M_B = - wL³/2 ➔ M_B = - wL² / 8!",
      "🎯 Fixed-End FEM Derivation: You can derive any standard fixed-end moment formula in 2 lines using the Three-Moment imaginary zero span!"
    ],
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
    theory: [
      {
        heading: "6.1 Core Principle & The AAU COTM 3101 Sign Convention",
        body: `
          <p>The Slope-Deflection method is a <strong>Displacement (Stiffness) Method</strong>. Member end moments are expressed directly in terms of joint rotations (θ) and relative lateral joint translations / chord sway (Δ).</p>
          <div class="concept-callout">
            <strong>CRITICAL EXAM ALERT — AAU COTM 3101 Statical Sign Convention:</strong><br/>
            Unlike some US textbooks that make clockwise moments positive everywhere, your AAU lecture notes establish:
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
          </ul>
        `
      },
      {
        heading: "6.3 Fixed-End Moments Table (AAU Sign Convention)",
        body: `
          <div class="eng-table-wrapper">
            <table class="eng-table">
              <thead>
                <tr>
                  <th>Load Case</th>
                  <th>Left End (M^F_AB)</th>
                  <th>Right End (M^F_BA)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>UDL w over entire span L</td><td>+ wL² / 12 (CCW)</td><td>- wL² / 12 (CW)</td></tr>
                <tr><td>Concentrated Center Load P</td><td>+ PL / 8 (CCW)</td><td>- PL / 8 (CW)</td></tr>
                <tr><td>Point Load P at distance <em>a</em> from A, <em>b</em> from B</td><td>+ P a b² / L²</td><td>- P a² b / L²</td></tr>
                <tr><td>Couple M₀ at center L/2</td><td>- M₀ / 4</td><td>- M₀ / 4</td></tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        heading: "6.4 Sway vs. Non-Sway Frames & The Story Shear Equation",
        body: `
          <p>Frames without lateral bracing can sway horizontally (Δ ≠ 0). Each independent sway degree of freedom introduces an extra unknown: Δ.</p>
          <p>To solve for Δ, construct a <strong>Column Shear Equilibrium Equation</strong> by cutting the columns of the story horizontally and applying ΣFx = 0 across the entire story!</p>
        `
      }
    ],
    examples: [
      {
        title: "Lecture Example: Two-Span Continuous Beam (PDF 6, Page 9)",
        problem: "Solve the end moments for beam ABC with Fixed support at A, Roller at B, and Roller at C under uniform loads using Slope-Deflection equations.",
        diagram: `A [Fixed] ================= B (Roller) ================= C (Roller)
θ_A = 0 (Fixed wall)      θ_B = unknown        θ_C = unknown`,
        steps: [
          "Step 1: Identify degrees of freedom: θ_A = 0 (fixed). Unknowns are joint rotations θ_B and θ_C. No sway (Δ = 0).",
          "Step 2: Write fixed end moments for spans AB and BC from the standard table.",
          "Step 3: Write Slope-Deflection equations for M_AB, M_BA, M_BC, and M_CB in terms of θ_B and θ_C.",
          "Step 4: Formulate joint equilibrium equations:",
          "• Joint B: ΣM_B = 0 ➔ M_BA + M_BC = 0",
          "• Exterior Roller C: M_CB = 0",
          "Step 5: Solve the 2 × 2 system for θ_B and θ_C, then back-substitute to find all final member end moments!"
        ]
      }
    ],
    shortcuts: [
      "🔥 The AAU Minus Sign Decoded: If you write '+ 2EK', you will get opposite signs on every single exam problem! Memorize: M_AB = M^F_AB - 2EK(2θ_A + θ_B - 3Δ/L).",
      "⚡ Far-End Hinge Shortcut: When far end B is a simple hinge (M_BA = 0), eliminate θ_B beforehand: M_AB = M^F_AB - (M^F_BA / 2) - 3EK(θ_A - Δ/L).",
      "🎯 Number of Equations = Kinematic Indeterminacy: Count unconstrained joint rotations + independent sway modes. That is EXACTLY how many simultaneous equations you must solve."
    ],
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
      }
    ],
    examples: [
      {
        title: "Lecture Example: Two-Span Continuous Beam ABC (PDF 7, Pages 4–6)",
        problem: "Determine support moments for beam ABC. Span AB = 3.6m (Fixed at A, Roller at B, I = 3.6). Span BC = 4.0m (Roller at B, Simple Hinge at C, I = 3.6). Concentrated load on BC gives FEM_BA = +30 kNm, FEM_BC = -22.5 kNm.",
        diagram: `A [Fixed] ===== (3.6m, I=3.6) ===== B (Roller) ===== (4.0m, I=3.6) ===== C (Hinged End)`,
        steps: [
          "Step 1: Compute stiffnesses. Span AB has far end fixed: K_BA = I / L = 3.6 / 3.6 = 1.0.",
          "Step 2: Span BC has far end hinged! Use modified stiffness shortcut: K_BC = ¾ (I / L) = ¾ (3.6 / 4.0) = 0.675 (≈ 0.68).",
          "Step 3: Compute Distribution Factors at joint B:",
          "• Total stiffness: Σ K_B = K_BA + K_BC = 1.0 + 0.675 = 1.675.",
          "• DF_BA = 1.0 / 1.675 = 0.60.",
          "• DF_BC = 0.675 / 1.675 = 0.40.",
          "Step 4: Initial FEMs: Fixed end A has DF = 0; Hinged C has M_C = 0 permanently.",
          "• Unbalanced moment at B: Σ M_B = (+30.0) + (-22.5) = +7.5 kN·m.",
          "• Balancing moments: Bal_BA = -7.5 × 0.60 = -4.50 kN·m; Bal_BC = -7.5 × 0.40 = -3.00 kN·m.",
          "Step 5: Carry-over to fixed support A: CO_AB = 0.5 × (-4.50) = -2.25 kN·m. No carry over to C (modified stiffness)!",
          "Step 6: Sum columns: Final M_BA = +25.50 kN·m, M_BC = -25.50 kN·m (Balanced!), M_AB = -32.25 kN·m!"
        ]
      }
    ],
    shortcuts: [
      "🔥 The 3/4 Factor Power: Whenever you see an exterior hinge/roller, IMMEDIATELY multiply its I/L by 0.75 and set its Carry-Over Factor to ZERO! Saves 80% of calculation time.",
      "⚡ Clamped Wall DF = 0: A fixed support has infinite stiffness (K = ∞). Therefore, its Distribution Factor DF is ALWAYS 0. It receives carry-overs, but never distributes!",
      "🎯 Sum Check at Every Joint: At every rigid joint (like B), the sum of final moments M_BA + M_BC MUST equal 0. If it doesn't, you made an arithmetic error in balancing!"
    ],
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

if (typeof module !== 'undefined') module.exports = COURSE_MODULES;
