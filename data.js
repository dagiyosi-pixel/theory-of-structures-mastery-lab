// COTM 3101: Theory of Structures - Master Academic Knowledge Base & Learning Engine
// Addis Ababa University (AAU) / EiABC Curriculum

const COURSE_MODULES = [
  {
    "id": "mod0",
    "shortTitle": "0. Statics & Solid Mechanics Foundations",
    "fullTitle": "Module 0: Core Foundations — Statics & Strength of Materials Prerequisites",
    "icon": "📐",
    "prerequisites": "Engineering Mechanics (Statics), Coplanar Force Systems, Strength of Materials Fundamentals, Basic Calculus.",
    "intuition": "Statically indeterminate structural analysis cannot be mastered without an instinctive, infallible foundation in determinate statics and elasticity. You cannot release a redundant force if you cannot isolate a free-body diagram, nor can you evaluate virtual work without constructing flawless bending moment functions. Module 0 guarantees your foundation has zero gaps, directly working through the 6 core review problems from the Addis Ababa University (AAU / EiABC) COTM 3101 course notes.",
    "theory": [
      {
        "heading": "0.1 2D Equilibrium & Free-Body Diagrams (FBDs)",
        "body": "\n        <p>A planar rigid body in 2D space possesses 3 independent degrees of freedom: translation in X, translation in Y, and rotation in Z. For the body to remain in static equilibrium under any arbitrary coplanar load system, the resultant force and resultant moment about any point must vanish identically:</p>\n        <div class=\"concept-callout\">\n          <strong>The Three Fundamental Coplanar Equilibrium Equations:</strong><br/>\n          $$\\sum F_x = 0 \\quad \\text{(No horizontal translation)}$$<br/>\n          $$\\sum F_y = 0 \\quad \\text{(No vertical translation)}$$<br/>\n          $$\\sum M_z = 0 \\quad \\text{(No rotation about any point)}$$\n        </div>\n        <p><strong>The Four Classic Support Idealizations:</strong></p>\n        <ul>\n          <li><strong>Roller Support (1 Reaction Component):</strong> Restrains motion strictly perpendicular to the supporting surface ($R_y$). Permits translation parallel to the surface and free rotation.</li>\n          <li><strong>Pin / Hinge Support (2 Reaction Components):</strong> Restrains translation in both X and Y directions ($R_x, R_y$). Permits free rotation without restraint ($M = 0$).</li>\n          <li><strong>Fixed / Clamped Support (3 Reaction Components):</strong> Completely prevents translation and rotation ($R_x, R_y, M$). Transmits horizontal shear, vertical reaction, and resisting fixity moment.</li>\n          <li><strong>Sliding Guide / Sleeve (2 Reaction Components):</strong> Restrains rotation ($M$) and transverse translation ($R_y$), but permits frictionless axial sliding along the guide axis ($R_x = 0$).</li>\n        </ul>\n        <div class=\"concept-callout\" style=\"border-left-color:var(--accent);\">\n          <strong>Multi-Body Systems & Internal Releases:</strong><br/>\n          • <strong>Internal Hinge:</strong> A physical pin inserted between structural segments. It transmits shear force $V$ and axial force $N$, but cannot transmit bending moment: $M_{\\text{hinge}} = 0$. This provides <strong>1 condition equation ($s = 1$)</strong>. When separating the structure at the hinge into two FBDs, internal forces appear as equal and opposite Newton's third law pairs.<br/>\n          • <strong>Two-Force Member:</strong> Any member subjected to loads only at its two end pin connections (with no transverse lateral loads or intermediate couples). The resultant force must act strictly along the straight line passing through the two pin centers (pure axial tension or compression).\n        </div>\n      ",
        "formula": "\\sum F_x = 0, \\quad \\sum F_y = 0, \\quad \\sum M_z = 0"
      },
      {
        "heading": "0.2 Internal Resultants & Standard Beam Sign Conventions",
        "body": "\n        <p>When external loads act on a structure, internal resisting forces develop continuously through the material fibers. Passing an imaginary cut through the beam exposes three internal stress resultants required to maintain equilibrium:</p>\n        <ul>\n          <li><strong>Axial (Normal) Force $N(x)$:</strong> Resultant force acting along the centroidal axis perpendicular to the cross section.</li>\n          <li><strong>Shear Force $V(x)$:</strong> Resultant force acting parallel to the cross-sectional plane.</li>\n          <li><strong>Bending Moment $M(x)$:</strong> Resultant couple causing flexural curvature about the neutral axis.</li>\n        </ul>\n        <div class=\"concept-callout\">\n          <strong>COTM 3101 Standard Beam Sign Conventions (Memorize Permanently!):</strong><br/>\n          • <strong>Axial Force $N$:</strong> <em>Tension is POSITIVE (+)</em> (pulling away from cut face); <em>Compression is NEGATIVE (-)</em> (pushing into cut face).<br/>\n          • <strong>Shear Force $V$:</strong> <em>Clockwise shearing couple is POSITIVE (+)</em>. Upward on left-hand cut face, downward on right-hand cut face.<br/>\n          • <strong>Bending Moment $M$:</strong> <em>SAGGING moment is POSITIVE (+)</em> (creates tension in bottom fibers and compression in top fibers — \"smiling beam\"). Counter-clockwise on right cut face, clockwise on left cut face. <em>HOGGING moment is NEGATIVE (-)</em> (creates tension in top fibers — \"frowning beam\").\n        </div>\n      ",
        "formula": "N(x) \\text{ [Tension +]}, \\quad V(x) \\text{ [CW +]}, \\quad M(x) \\text{ [Sagging +]}"
      },
      {
        "heading": "0.3 Differential Equilibrium Relations & SFD/BMD Graphical Rules",
        "body": "\n        <p>Consider an infinitesimal beam element of length $dx$ subjected to a distributed load $w(x)$ acting downwards:</p>\n        <div class=\"concept-callout\">\n          <strong>Fundamental Differential Calculus Relations:</strong><br/>\n          $$\\frac{dV}{dx} = -w(x) \\quad \\iff \\quad \\Delta V = -\\int w(x) dx$$<br/>\n          $$\\frac{dM}{dx} = V(x) \\quad \\iff \\quad \\Delta M = \\int V(x) dx$$<br/>\n          $$\\frac{d^2M}{dx^2} = -w(x)$$\n        </div>\n        <p><strong>Master Rules for Instant SFD & BMD Construction:</strong></p>\n        <ol>\n          <li><strong>Slope of SFD</strong> equals the negative of the distributed load: $\\text{Slope} = -w(x)$. If $w=0$, shear is horizontal constant. If $w=\\text{const}$, shear is a straight downward-sloping line.</li>\n          <li><strong>Slope of BMD</strong> equals the shear force value: $\\text{Slope} = V(x)$. Where shear is zero ($V = 0$), the bending moment has a horizontal tangent (local maximum or minimum).</li>\n          <li><strong>Change in Shear ($\\Delta V$)</strong> between two points equals the negative area under the distributed load diagram.</li>\n          <li><strong>Change in Moment ($\\Delta M$)</strong> between two points equals the net area under the Shear Force Diagram.</li>\n          <li><strong>Concentrated Point Load ($P$):</strong> Causes an instantaneous vertical jump in the SFD equal to $P$ in the direction of the force. Causes a sharp kink (change of slope) in the BMD.</li>\n          <li><strong>Concentrated Couple ($M_0$):</strong> Causes no change in the SFD, but produces an instantaneous vertical step jump in the BMD equal to $M_0$.</li>\n        </ol>\n      ",
        "formula": "\\frac{dV}{dx} = -w(x), \\quad \\frac{dM}{dx} = V(x), \\quad \\Delta M = \\int_{x_1}^{x_2} V(x) dx"
      },
      {
        "heading": "0.4 Plane Truss Statics, Zero-Force Members & Tension-Only Cables",
        "body": "\n        <p>A plane truss is an ideal assembly of slender bars connected exclusively at frictionless pin joints. Since loads are applied only at joints, every member acts as a pure two-force member carrying constant axial force $N$.</p>\n        <div class=\"concept-callout\">\n          <strong>Elastic Axial Deformation (Hooke's Law):</strong><br/>\n          $$\\Delta L = \\frac{N L}{E A}$$\n          where $N$ is internal axial force (N), $L$ is length (m), $E$ is Young's Modulus (N/m²), and $A$ is cross-sectional area (m²). If temperature changes by $\\Delta T$: $\\Delta L_T = \\alpha (\\Delta T) L$.\n        </div>\n        <p><strong>The Three Golden Inspection Rules for Zero-Force Members:</strong></p>\n        <div class=\"concept-callout\" style=\"border-left-color:var(--warning);\">\n          <strong>Rule 1 (Two Non-Collinear Members at Unloaded Joint):</strong> If only two non-collinear members meet at a joint with NO external load or support reaction, <strong>BOTH members carry zero force</strong> ($F_1 = F_2 = 0$).<br/><br/>\n          <strong>Rule 2 (Three Members at Unloaded Joint with Two Collinear):</strong> If three members meet at an unloaded joint and two form a straight line, the <strong>third (non-collinear) member is zero-force</strong> ($F_3 = 0$), and the two collinear members carry equal forces ($F_1 = F_2$).<br/><br/>\n          <strong>Rule 3 (Two Members with Load Collinear to One):</strong> If two members meet at a joint and an external load acts in line with one member, the <strong>other (non-collinear) member is zero-force</strong>.\n        </div>\n        <p><strong>Slender Tension-Only Counter-Diagonal Cables (Course Review Fig. 2):</strong></p>\n        <p>In structural trusses with slender diagonal tie rods or cables across a panel, cables buckle under negligible compressive stress. In any loading condition, <em>only the diagonal that goes into tension ($T \\ge 0$) carries load</em>; the opposing diagonal goes completely slack ($N = 0$).</p>\n      ",
        "formula": "\\Delta L = \\frac{N L}{E A}, \\quad \\sum F_x = 0, \\quad \\sum F_y = 0"
      },
      {
        "heading": "0.5 Cross-Sectional Geometry, Centroids & Elastic Flexure",
        "body": "\n        <p>Bending moment produces longitudinal normal stresses $\\sigma$ across the beam depth. By Euler-Bernoulli beam theory (plane sections remain plane), strain varies linearly from the Neutral Axis (NA), where strain is zero.</p>\n        <div class=\"concept-callout\">\n          <strong>1. Centroid of Composite Cross-Section:</strong><br/>\n          $$\\bar{y} = \\frac{\\sum A_i y_i}{\\sum A_i}$$<br/>\n          <strong>2. Second Moment of Area (Moment of Inertia) for Rectangle ($b \\times h$):</strong><br/>\n          $$I_{NA} = \\frac{b h^3}{12}$$<br/>\n          <strong>3. Parallel Axis Theorem (Steiner's Theorem):</strong><br/>\n          $$I_x = I_{NA} + A d^2 \\quad \\text{($d$ = distance between centroidal axis and target axis)}$$<br/>\n          <strong>4. Elastic Flexure Formula (Navier's Equation):</strong><br/>\n          $$\\sigma = -\\frac{M y}{I}$$\n          where $y$ is the vertical distance measured from the neutral axis ($y > 0$ above NA, $y < 0$ below NA). Maximum bending stress occurs at the extreme fiber ($y = \\pm c$):<br/>\n          $$\\sigma_{\\max} = \\frac{M}{S}, \\quad \\text{where Section Modulus } S = \\frac{I}{c} = \\frac{b h^2}{6} \\text{ (for rectangle)}$$\n        </div>\n      ",
        "formula": "\\sigma = -\\frac{M y}{I}, \\quad I_{NA} = \\frac{b h^3}{12}, \\quad I_x = I_{NA} + A d^2"
      },
      {
        "heading": "0.6 Beam Deflections by Direct Double Integration",
        "body": "\n        <p>The curvature $\\kappa = 1/\\rho$ of a flexural member is proportional to bending moment: $\\kappa = \\frac{d^2v}{dx^2} = \\frac{M(x)}{EI}$.</p>\n        <div class=\"concept-callout\">\n          <strong>Governing Second-Order Differential Equation:</strong><br/>\n          $$EI \\frac{d^2v}{dx^2} = M(x)$$\n          <strong>First Integration (Rotation / Slope $\\theta(x)$):</strong><br/>\n          $$EI \\frac{dv}{dx} = EI \\theta(x) = \\int M(x) dx + C_1$$\n          <strong>Second Integration (Transverse Deflection $v(x)$):</strong><br/>\n          $$EI v(x) = \\int \\left[ \\int M(x) dx \\right] dx + C_1 x + C_2$$\n        </div>\n        <p><strong>Essential Boundary Conditions to Solve Integration Constants $C_1, C_2$:</strong></p>\n        <ul>\n          <li><strong>Pin / Roller Support at $x = 0$:</strong> Zero deflection $\\implies v(0) = 0$.</li>\n          <li><strong>Fixed Support at $x = 0$:</strong> Zero deflection AND zero slope $\\implies v(0) = 0$ and $\\theta(0) = v'(0) = 0$.</li>\n          <li><strong>Symmetric Midspan under Symmetric Load at $x = L/2$:</strong> Zero slope $\\implies \\theta(L/2) = 0$.</li>\n          <li><strong>Continuity Across Load Intervals ($x = x_k$):</strong> Deflection and slope must match from left and right: $v_L(x_k) = v_R(x_k)$ and $\\theta_L(x_k) = \\theta_R(x_k)$.</li>\n        </ul>\n      ",
        "formula": "EI \\frac{d^2v}{dx^2} = M(x) \\implies EI v(x) = \\iint M(x) dx dx + C_1 x + C_2"
      },
      {
        "heading": "0.7 Mohr's Moment-Area Theorems (Theorems 1 & 2)",
        "body": "\n        <p>Mohr's Moment-Area theorems provide a fast, elegant geometric technique to calculate slopes and deflections directly from the area and centroid of the $M/EI$ diagram without solving differential equations.</p>\n        <div class=\"concept-callout\">\n          <strong>First Moment-Area Theorem (Change in Slope):</strong><br/>\n          $$\\theta_{B/A} = \\theta_B - \\theta_A = \\int_A^B \\frac{M}{EI} dx = \\text{Area of the } \\frac{M}{EI} \\text{ diagram between } A \\text{ and } B$$<br/>\n          <strong>Second Moment-Area Theorem (Tangential Deviation):</strong><br/>\n          $$t_{B/A} = \\int_A^B x \\frac{M}{EI} dx = \\left(\\text{Area of } \\frac{M}{EI}\\right)_{A-B} \\cdot \\bar{x}_B$$\n        </div>\n        <div class=\"concept-callout\" style=\"border-left-color:var(--danger);\">\n          <strong>CRITICAL NOTATION & CONVENTION (AAU Exam Rule):</strong><br/>\n          • $t_{B/A}$ is defined as the <strong>vertical distance from the tangent drawn at point $A$ to the elastic curve at point $B$</strong>.<br/>\n          • The centroid distance $\\bar{x}_B$ <strong>MUST BE MEASURED FROM POINT $B$</strong> (the point where the deviation is being evaluated)!<br/>\n          • <strong>$t_{B/A} \\ne t_{A/B}$!</strong> In general, $t_{A/B} = \\text{Area} \\cdot \\bar{x}_A$ measures from point $A$ to the tangent drawn at $B$. Reversing this index is the #1 student exam error!\n        </div>\n      ",
        "formula": "\\theta_{B/A} = \\int_A^B \\frac{M}{EI} dx, \\quad t_{B/A} = \\bar{x}_B \\cdot \\left(\\text{Area}_{M/EI}\\right)_{A-B}"
      },
      {
        "heading": "0.8 Comprehensive Solutions: Course Review Exercises (Figs. 1 to 6)",
        "body": "\n        <p>The introductory chapter of COTM 3101 assigns 6 comprehensive review exercises covering all prerequisite statics and solid mechanics principles. Here are the rigorous, step-by-step master solutions:</p>\n        \n        <div class=\"concept-callout\">\n          <strong>Review Exercise 1 (Fig. 1: Pin-Connected Frame with Two-Force Member BD):</strong><br/>\n          • <em>Geometry:</em> Vertical column ABC (height $AB = 1.5$m, $BC = 1.5$m, total height 3.0m). Horizontal beam CDE ($CD = 2.0$m, $DE = 2.0$m, total length 4.0m). Member BD connects pin B(0, 1.5) to pin D(2.0, 3.0).<br/>\n          • <em>Loads:</em> Horizontal force 6 kN at C pointing right; vertical load 4 kN at E pointing down.<br/>\n          • <em>Key Insight:</em> Member BD has pins at both ends and NO intermediate transverse loads $\\implies$ <strong>Two-Force Member</strong>! Force acts along the line BD.<br/>\n          • $L_{BD} = \\sqrt{2.0^2 + 1.5^2} = 2.5$m. $\\cos\\theta = 2.0/2.5 = 0.8$, $\\sin\\theta = 1.5/2.5 = 0.6$.<br/>\n          • <em>Isolate Beam CDE:</em> Take $\\sum M_C = 0 \\implies (F_{BD} \\sin\\theta)(2.0) - (4)(4.0) = 0 \\implies F_{BD}(0.6)(2.0) = 16 \\implies \\mathbf{F_{BD} = 13.333\\text{ kN (Tension)}}$.<br/>\n          • <em>Reactions at C:</em> $\\sum F_y = 0 \\implies C_y + 13.333(0.6) - 4 = 0 \\implies C_y = -4$ kN (downward on CDE $\\implies$ upward on ABC). $\\sum F_x = 0 \\implies C_x + 13.333(0.8) = 0 \\implies C_x = -10.667$ kN.<br/>\n          • <em>Isolate Column ABC:</em> Take $\\sum F_x = 0, \\sum F_y = 0, \\sum M_A = 0$ to find base pin reactions: $\\mathbf{A_x = 4.67\\text{ kN}}, \\mathbf{A_y = 4.0\\text{ kN}}$.\n        </div>\n\n        <div class=\"concept-callout\">\n          <strong>Review Exercise 2 (Fig. 2: Plane Truss with Tension-Only Counter-Diagonals):</strong><br/>\n          • <em>Geometry & Loads:</em> Symmetrical Pratt truss with counter diagonals DI and EJ in the central panel. Slender cables carry ONLY tension ($T \\ge 0$).<br/>\n          • <em>Tension-Only Cable Rule:</em> Compute the vertical shear across the panel $V_{panel}$. The diagonal inclined to oppose the panel shear carries tension; the opposing diagonal would require compression to satisfy equilibrium, so it goes slack ($F = 0$).<br/>\n          • Using Method of Sections through panel BK, JI, EF: resolve equilibrium of the cut segment directly to find the axial forces in members BK, JI, and EF.\n        </div>\n\n        <div class=\"concept-callout\">\n          <strong>Review Exercise 3 (Fig. 3: Beam with Internal Hinge, Overhang & Distributed Load):</strong><br/>\n          • <em>Geometry:</em> Overhang span AB = 2.0m with point load 15 kN at A. Pin support at B. Internal hinge at C ($x = 4.0$m). Spans CD = 1.0m, DE = 1.0m, EF = 1.0m with UDL $w = 10$ kN/m on segment DE and point load at E.<br/>\n          • <em>Decomposition:</em> Split the beam at internal hinge C ($M_C = 0$).<br/>\n          • Sub-beam AC is statically determinate when the hinge reaction $V_C$ is determined from the right sub-beam CF.<br/>\n          • Solve reactions: $R_B, R_D, R_F$. Construct complete Shear Force Diagram (SFD) and Bending Moment Diagram (BMD). Peak sagging occurs where $V(x) = 0$.\n        </div>\n\n        <div class=\"concept-callout\">\n          <strong>Review Exercise 4 (Fig. 4: Direct Integration Method for Elastic Curve):</strong><br/>\n          • <em>Loads:</em> Beam with UDL $w = 20$ kN/m over main span $L = 5.0$m and point load $P = 40$ kN on overhang of 1.6m.<br/>\n          • Set up $M(x)$ equations. Integrate twice: $EI \\theta(x) = \\int M dx + C_1$, $EI v(x) = \\iint M dx dx + C_1 x + C_2$.<br/>\n          • Apply boundary conditions: $v(0) = 0$ and $v(5.0) = 0$ to solve $C_1, C_2$.<br/>\n          • Evaluate exact slope at B: $\\theta_B = v'(5.0)$ and tip deflection at C: $v_C = v(6.6)$.\n        </div>\n\n        <div class=\"concept-callout\">\n          <strong>Review Exercise 5 (Fig. 5: Moment-Area Method for Overhanging Beam):</strong><br/>\n          • <em>Loads:</em> Beam ABCD with spans 3.0m, 3.0m, 2.2m, point loads 60 kN and 45 kN, and applied couple $M = 30$ kN·m.<br/>\n          • Construct $M/EI$ diagram. Calculate geometric areas $A_i$ and centroid positions $\\bar{x}_i$.<br/>\n          • Compute tangential deviation $t_{B/A} = \\sum A_i \\bar{x}_{B,i}$.<br/>\n          • Determine reference tangent slope: $\\theta_A = -t_{B/A} / L_{AB}$.<br/>\n          • Evaluate deflection at A ($v_A$) and slope at D ($\\theta_D$) by geometric superposition!\n        </div>\n\n        <div class=\"concept-callout\">\n          <strong>Review Exercise 6 (Fig. 6: Compound Beam with Internal Hinge & Mixed Loads):</strong><br/>\n          • Determine reactions at all supports by separating at internal hinge.<br/>\n          • Draw complete Shear Force Diagram (SFD) showing exact step jumps at concentrated loads.<br/>\n          • Draw Bending Moment Diagram (BMD) locating zero-moment points of contraflexure (inflection points).\n        </div>\n      ",
        "formula": "F_{BD} = 13.33\\text{ kN}, \\quad \\theta_{B/A} = \\text{Area}_{M/EI}, \\quad t_{B/A} = \\bar{x}_B \\cdot \\text{Area}_{M/EI}"
      }
    ],
    "guidedExamples": [
      {
        "title": "Guided Example 0.1: Complete Statics of Multi-Body Beam with Internal Hinge (Review Fig. 3)",
        "problem": "A beam has an overhang of 2.0 m on the left with a 15 kN downward point load at A, a roller support at B, an internal hinge at C (2.0 m to the right of B), and a supported span CF of 3.0 m with a UDL w = 10 kN/m and supports at D and F. Determine all reactions and the shear/moment equations.",
        "svgConfig": {
          "width": 620,
          "height": 180,
          "length": 7,
          "supports": [
            {
              "x": 2,
              "type": "pin",
              "label": "B"
            },
            {
              "x": 5,
              "type": "roller",
              "label": "D"
            },
            {
              "x": 7,
              "type": "roller",
              "label": "F"
            }
          ],
          "loads": [
            {
              "x": 0,
              "type": "point",
              "val": "15 kN ↓"
            },
            {
              "x": 4,
              "type": "hinge",
              "label": "Hinge C"
            },
            {
              "x": 5.5,
              "type": "udl",
              "val": "10 kN/m"
            }
          ]
        },
        "hints": [
          "First step: separate the beam at internal hinge C where bending moment is identically zero (M_C = 0).",
          "Left segment AC has only ONE support at B; taking moments about B determines the internal shear interaction V_C directly!",
          "Apply Newton's third law: the force V_C acting on segment AC acts equal and opposite on segment CF."
        ],
        "steps": [
          {
            "stepName": "Step 1: Decouple the Structure at Internal Hinge C",
            "content": "An internal hinge transmits shear force V and axial force N, but zero bending moment: <code>M_C = 0</code>. Split the compound beam into two independent free-body diagrams: sub-beam AC and sub-beam CF. The hinge transmits an unknown vertical shear force V_C (acting downward on AC, upward on CF)."
          },
          {
            "stepName": "Step 2: Solve Equilibrium of Left Sub-Beam AC",
            "content": "Take moments about pin support B: <code>ΣM_B = 0 ➔ -(15 kN)(2.0 m) + V_C(2.0 m) = 0 ➔ V_C = 15 kN</code>. Then vertical equilibrium gives R_B: <code>ΣF_y = 0 ➔ R_B - 15 - V_C = 0 ➔ R_B = 30 kN (upward)</code>."
          },
          {
            "stepName": "Step 3: Solve Equilibrium of Right Sub-Beam CF",
            "content": "Apply the upward interaction force V_C = 15 kN at the left end C of sub-beam CF. Together with the applied UDL w = 10 kN/m, solve support reactions R_D and R_F using the two remaining equilibrium equations: <code>ΣM_D = 0</code> and <code>ΣF_y = 0</code>."
          },
          {
            "stepName": "Step 4: Construct SFD and Locate Maximum Bending Moment",
            "content": "Plot shear force starting from A. The shear passes through zero in span CD, giving the location of peak sagging moment. Maximum hogging occurs over support B: <code>M_B = -(15)(2.0) = -30 kN·m</code>."
          }
        ]
      },
      {
        "title": "Guided Example 0.2: Deflection & Slope by Direct Double Integration (Review Fig. 4)",
        "problem": "A simply supported beam with an overhanging tip carries a uniform distributed load w = 20 kN/m on the 5.0 m main span AB and a concentrated load P = 40 kN at the tip C of the 1.6 m overhang. Derive the elastic curve equation v(x) and determine the slope at B and deflection at C.",
        "svgConfig": {
          "width": 620,
          "height": 180,
          "length": 6.6,
          "supports": [
            {
              "x": 0,
              "type": "pin",
              "label": "A"
            },
            {
              "x": 5,
              "type": "roller",
              "label": "B"
            }
          ],
          "loads": [
            {
              "x": 2.5,
              "type": "udl",
              "val": "20 kN/m"
            },
            {
              "x": 6.6,
              "type": "point",
              "val": "40 kN ↓"
            }
          ]
        },
        "hints": [
          "First find support reactions R_A and R_B by taking ΣM_A = 0 for the entire beam.",
          "Formulate M(x) for the main span 0 ≤ x ≤ 5.0 m: M(x) = R_A x - w x² / 2.",
          "Integrate twice to find v(x), and apply the boundary conditions v(0) = 0 and v(5.0) = 0 to evaluate integration constants C_1 and C_2."
        ],
        "steps": [
          {
            "stepName": "Step 1: Determine Support Reactions R_A and R_B",
            "content": "Taking moments about pin A: <code>ΣM_A = 0 ➔ R_B(5.0) - (20 × 5.0)(2.5) - 40(6.6) = 0 ➔ R_B = 102.8 kN</code>. Total downward load = 140 kN, therefore <code>R_A = 140 - 102.8 = 37.2 kN</code>."
          },
          {
            "stepName": "Step 2: Formulate Bending Moment Function M(x) for Span AB (0 ≤ x ≤ 5.0 m)",
            "content": "Pass an imaginary cut at distance x from pin A: <code>M(x) = R_A x - (w x² / 2) = 37.2 x - 10 x²</code>."
          },
          {
            "stepName": "Step 3: Perform First and Second Integrations",
            "content": "1st Integration: <code>EI θ(x) = 18.6 x² - (10/3) x³ + C_1</code>.<br/>2nd Integration: <code>EI v(x) = 6.2 x³ - (5/6) x⁴ + C_1 x + C_2</code>."
          },
          {
            "stepName": "Step 4: Apply Boundary Conditions to Solve Constants",
            "content": "At pin A (x = 0): <code>v(0) = 0 ➔ C_2 = 0</code>.<br/>At roller B (x = 5.0 m): <code>v(5.0) = 0 ➔ 6.2(5)³ - (5/6)(5)⁴ + 5 C_1 = 0 ➔ C_1 = -51.13 kN·m²</code>."
          },
          {
            "stepName": "Step 5: Evaluate Slope at B and Tip Deflection at C",
            "content": "Slope at B: <code>θ_B = (1/EI) [18.6(5)² - (10/3)(5)³ - 51.13] = -3.80 / EI rad</code>.<br/>Deflection at overhang tip C: kinematics of the rigid extension gives <code>v_C = θ_B (1.6) + cantilever deflection = -6.08 / EI - 27.31 / EI = -33.39 / EI m</code>."
          }
        ]
      }
    ],
    "shortcuts": [
      "<strong>Instant Maximum Moments:</strong> Simply supported UDL <code>M_max = wL²/8</code>; Simply supported center point load <code>M_max = PL/4</code>; Cantilever under UDL <code>M_fixed = -wL²/2</code>; Cantilever tip load <code>M_fixed = -PL</code>.",
      "<strong>Centroid & Area Quick Filter:</strong> Right triangle centroid is always at <code>1/3 L</code> from the vertical leg (<code>2/3 L</code> from apex). Second-degree parabolic spandrel has <code>Area = (1/3) b h</code> with centroid at <code>1/4 b</code> from vertical edge.",
      "<strong>The Zero-Shear Max-Moment Rule:</strong> Never guess where the peak bending moment occurs. Set <code>V(x*) = 0</code>, solve for x*, and evaluate <code>M(x*)</code> directly."
    ],
    "methodSelection": "\n    <div class=\"concept-callout\">\n      <strong>Statics & Deflection Method Selection Matrix:</strong><br/>\n      • <strong>Method of Joints:</strong> Best when all member forces are required, or when starting from exterior pin joints with ≤ 2 unknown bars.<br/>\n      • <strong>Method of Sections:</strong> Best when forces in only 1 to 3 specific members are needed (cut directly through target members; bypass the rest of the truss!).<br/>\n      • <strong>Direct Double Integration:</strong> Best when the continuous deflection function v(x) is required over the entire span.<br/>\n      • <strong>Moment-Area Method:</strong> Best when slope or deflection is needed at a <em>single specific point</em> on a beam with simple, stepped, or overhanging geometry.<br/>\n      • <strong>Conjugate Beam Method:</strong> Best when dealing with internal hinges, varying EI, or when slopes and deflections are sought simultaneously.\n    </div>\n  ",
    "commonTraps": [
      "Inverting Tangential Deviation Indices: t_B/A is the deviation OF POINT B from the tangent drawn AT POINT A. The centroid moment arm x_B MUST be measured from point B! Reversing this is the #1 student exam error.",
      "Assuming Internal Hinge Transmits Zero Force: An internal hinge has M = 0, but it transmits non-zero shear V and normal force N! Always include V_hinge and N_hinge when drawing free-body diagrams of separated segments.",
      "Confusing Bending Moment Sign Convention with Statics Moment Sum: A static moment equation ΣM = 0 uses an arbitrary rotational sign (e.g., CCW positive). But internal bending moment M(x) MUST use the beam convention: SAGGING is positive (tension at bottom fiber), regardless of which side you cut from!",
      "Misidentifying Tension-Only Counter-Diagonals: Slender cables cannot carry compression. If equilibrium of a cut panel indicates that a cable would be in compression, that cable is SLACK (N = 0) and the opposing diagonal carries all panel shear in tension."
    ],
    "mnemonics": "\n    <strong>CRUCIAL FOUNDATION MNEMONICS:</strong><br/>\n    • <strong>SMILING BEAM = POSITIVE (+):</strong> Sagging moment makes the beam smile (bottom stretched in tension, top in compression). Frowning beam = Hogging = Negative (-).<br/>\n    • <strong>R-O-L-L-E-R = ONE (1):</strong> A roller rolls along the plane, offering only ONE perpendicular resistance.<br/>\n    • <strong>M-A-R-K FROM TARGET:</strong> In Moment-Area Theorem 2 (t_{B/A}), measure the centroid distance <strong>FROM the target letter B</strong>, NOT from the tangent point A!\n  ",
    "arena": [
      {
        "title": "Arena Challenge 0.1: Internal Hinge Stress Resultants",
        "diagram": "[ Beam Segment 1 ] ───(○ Internal Hinge)─── [ Beam Segment 2 ]",
        "prompt": "Which of the following correctly describes the internal stress resultants that can exist at a frictionless internal hinge in a 2D beam?",
        "options": [
          {
            "text": "A) Axial Force and Shear Force can exist, but Bending Moment is strictly zero.",
            "correct": true,
            "explain": "Correct! A frictionless internal hinge allows free relative rotation between connected members, so it cannot resist or transmit bending moment (M = 0). However, it prevents relative translation in both transverse and longitudinal directions, transmitting internal shear force V and axial force N."
          },
          {
            "text": "B) Only Shear Force can exist; Axial Force and Bending Moment are both zero.",
            "correct": false,
            "explain": "Incorrect. An internal pin prevents axial translation as well as transverse translation, so non-zero axial force N can definitely be transmitted."
          },
          {
            "text": "C) All three resultants (Axial Force, Shear Force, and Bending Moment) are zero.",
            "correct": false,
            "explain": "Incorrect. If shear and axial forces were zero, the two beam segments would be completely detached and unsupported!"
          },
          {
            "text": "D) Bending Moment can exist, but Shear Force is zero.",
            "correct": false,
            "explain": "Incorrect. A hinge allows free rotation, so moment is identically zero."
          }
        ]
      },
      {
        "title": "Arena Challenge 0.2: Zero-Force Member Golden Rule",
        "diagram": "Joint A: Members AB and AC collinear; Member AD connects at 45° with no external load.",
        "prompt": "Three members meet at an unloaded pin joint in a plane truss. Two of the members (AB and AC) form a straight collinear line. What can be concluded about the axial force in the third member (AD)?",
        "options": [
          {
            "text": "A) Member AD carries zero axial force (F_AD = 0).",
            "correct": true,
            "explain": "Correct! By Golden Rule 2 for Zero-Force Members: resolving equilibrium perpendicular to the collinear line AB-AC reveals that member AD has no force to balance its transverse component. Therefore, its force must be zero (F_AD = 0), and the two collinear members carry equal forces (F_AB = F_AC)."
          },
          {
            "text": "B) Member AD carries the vector sum of AB and AC.",
            "correct": false,
            "explain": "Incorrect. The joint has no external load; any force in AD would create an unbalanced transverse component."
          },
          {
            "text": "C) Member AD is in tension, while AB and AC are in compression.",
            "correct": false,
            "explain": "Incorrect. AD cannot carry tension without an opposing transverse force."
          },
          {
            "text": "D) Determinacy cannot be established without solving the entire truss.",
            "correct": false,
            "explain": "Incorrect. Joint equilibrium alone proves F_AD = 0 immediately."
          }
        ]
      },
      {
        "title": "Arena Challenge 0.3: Tangential Deviation Definition",
        "diagram": "Elastic Curve: Tangent drawn at A ───────> Vertical offset measured at B = t_{B/A}",
        "prompt": "In Mohr's Second Moment-Area Theorem, the tangential deviation t_{B/A} represents:",
        "options": [
          {
            "text": "A) The vertical distance from the tangent drawn at point A to the elastic curve at point B.",
            "correct": true,
            "explain": "Correct! By standard convention, t_{B/A} is the vertical deviation of point B on the deflected elastic curve from the tangent line drawn to the curve at point A. The centroid arm in the integration must be measured from point B."
          },
          {
            "text": "B) The vertical distance from the tangent drawn at point B to the elastic curve at point A.",
            "correct": false,
            "explain": "Incorrect. That is t_{A/B}, which is generally not equal to t_{B/A}."
          },
          {
            "text": "C) The change in slope between points A and B.",
            "correct": false,
            "explain": "Incorrect. Change in slope is Mohr's First Theorem: θ_{B/A} = θ_B - θ_A."
          },
          {
            "text": "D) The midspan deflection between A and B.",
            "correct": false,
            "explain": "Incorrect. Tangential deviation is a geometric offset from a tangent line, not a direct midspan deflection."
          }
        ]
      },
      {
        "title": "Arena Challenge 0.4: Beam Flexure Stress Distribution",
        "diagram": "Rectangular beam b × h: NA at mid-depth h/2. Sagging moment +M.",
        "prompt": "According to Euler-Bernoulli beam theory, what is the maximum bending stress in a solid rectangular beam of width b and depth h subjected to a bending moment M?",
        "options": [
          {
            "text": "A) σ_max = 6M / (b h²)",
            "correct": true,
            "explain": "Correct! Using Navier's formula: σ_max = M c / I, where c = h/2 and I = b h³ / 12. Thus σ_max = M (h/2) / (b h³ / 12) = 6M / (b h²) = M / S, where S = b h² / 6."
          },
          {
            "text": "B) σ_max = 12M / (b h³)",
            "correct": false,
            "explain": "Incorrect. 12M / (b h³) has units of stress / length."
          },
          {
            "text": "C) σ_max = M / (b h)",
            "correct": false,
            "explain": "Incorrect. M / (b h) is not dimensionally correct for bending stress."
          },
          {
            "text": "D) σ_max = 3M / (2 b h²)",
            "correct": false,
            "explain": "Incorrect. 3V / (2 b h) is the maximum transverse shear stress for a rectangular section, not bending stress."
          }
        ]
      },
      {
        "title": "Arena Challenge 0.5: Pratt Truss Counter-Diagonal Behavior",
        "diagram": "Panel with cross diagonals DI and EJ (slender counter-bracing cables).",
        "prompt": "In a Pratt truss panel with two slender counter-diagonal cables DI and EJ capable of supporting only tension, what happens when external shear acts across the panel?",
        "options": [
          {
            "text": "A) The diagonal inclined to oppose the panel shear carries all the shear in tension, while the other diagonal goes slack (F = 0).",
            "correct": true,
            "explain": "Correct! Slender cables buckle under infinitesimal compression. When shear acts across the panel, the diagonal that would be compressed buckles and goes slack (carries zero force). The opposing diagonal carries the entire shear in pure tension."
          },
          {
            "text": "B) Both diagonals share the shear equally, one in tension and one in compression.",
            "correct": false,
            "explain": "Incorrect. Cables cannot carry compression; they buckle immediately."
          },
          {
            "text": "C) Both diagonals carry tension simultaneously.",
            "correct": false,
            "explain": "Incorrect. Under a single shear direction, kinematics would require one to shorten and one to elongate."
          },
          {
            "text": "D) The truss becomes unstable and collapses immediately.",
            "correct": false,
            "explain": "Incorrect. The active tension diagonal provides full triangulated stability."
          }
        ]
      },
      {
        "title": "Arena Challenge 0.6: Simply Supported Beam Sign Convention",
        "diagram": "Beam supported at both ends under downward UDL w.",
        "prompt": "A simply supported beam carries a uniformly distributed downward load w over its entire span L. What is the bending moment at midspan, and what fiber is in tension?",
        "options": [
          {
            "text": "A) +wL²/8 (Sagging moment; bottom fiber in tension)",
            "correct": true,
            "explain": "Correct! Under uniform downward loading, the beam sags into a concave upward curve with maximum moment M = +wL²/8 at midspan. Tension occurs in the bottom fibers (sagging is positive)."
          },
          {
            "text": "B) -wL²/8 (Hogging moment; top fiber in tension)",
            "correct": false,
            "explain": "Incorrect. Hogging occurs over interior supports of continuous beams or cantilevers, not at the midspan of a simply supported beam."
          },
          {
            "text": "C) +wL²/4 (Sagging moment; bottom fiber in tension)",
            "correct": false,
            "explain": "Incorrect. PL/4 is for a concentrated center point load, not a distributed load."
          },
          {
            "text": "D) -wL²/12 (Hogging moment; top fiber in tension)",
            "correct": false,
            "explain": "Incorrect. wL²/12 is the fixed-end moment for a clamped beam, not a simply supported beam."
          }
        ]
      }
    ],
    "cheatsheet": "\n    <strong>MODULE 0 FORMULA & CONVENTION QUICK SHEET</strong><br/>\n    • <strong>2D Equilibrium:</strong> $\\sum F_x = 0, \\; \\sum F_y = 0, \\; \\sum M_z = 0$<br/>\n    • <strong>Differential Relations:</strong> $w = -dV/dx, \\; V = dM/dx, \\; \\Delta M = \\int V dx$<br/>\n    • <strong>Axial Deformation:</strong> $\\Delta L = NL / EA$<br/>\n    • <strong>Inertia & Parallel Axis:</strong> $I_{NA} = bh^3/12, \\; I = I_{NA} + Ad^2$<br/>\n    • <strong>Elastic Flexure:</strong> $\\sigma = -My/I, \\; S = bh^2/6$<br/>\n    • <strong>Double Integration:</strong> $EI v'' = M(x), \\; EI v' = \\int M dx + C_1, \\; EI v = \\iint M dx dx + C_1 x + C_2$<br/>\n    • <strong>Moment-Area:</strong> $\\theta_{B/A} = \\text{Area}_{M/EI}, \\; t_{B/A} = \\bar{x}_B \\cdot \\text{Area}_{M/EI}$ (arm $\\bar{x}_B$ measured from $B$)\n  "
  },

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
    "id": "f-0-1",
    "moduleId": "mod0",
    "moduleTitle": "Statics & Solid Mechanics Foundations",
    "name": "2D Coplanar Rigid-Body Equilibrium",
    "formula": "\\sum F_x = 0, \\quad \\sum F_y = 0, \\quad \\sum M_z = 0",
    "symbols": [
      {
        "symbol": "\\sum F_x",
        "meaning": "Algebraic sum of all horizontal force components",
        "unit": "kN"
      },
      {
        "symbol": "\\sum F_y",
        "meaning": "Algebraic sum of all vertical force components",
        "unit": "kN"
      },
      {
        "symbol": "\\sum M_z",
        "meaning": "Algebraic sum of moments about any point in the plane",
        "unit": "kN·m"
      }
    ],
    "applicability": "Any 2D coplanar rigid body or structural sub-assembly in static equilibrium.",
    "assumptions": "Negligible accelerations (Newton's 1st law); rigid body geometry.",
    "signConvention": "Rightward forces (+), Upward forces (+), Counter-Clockwise moments (+).",
    "derivation": "From Newton's second law: a body at rest requires zero linear acceleration in X and Y and zero angular acceleration about Z.",
    "memoryCue": "'Three equations for three degrees of freedom in 2D' (Fx, Fy, Mz).",
    "traps": "Do NOT sum moments about a point through which the only unknown force passes if you want to solve for that force!",
    "related": [
      "D_e = r_a - r_m",
      "Method of Joints"
    ]
  },
  {
    "id": "f-0-2",
    "moduleId": "mod0",
    "moduleTitle": "Statics & Solid Mechanics Foundations",
    "name": "Beam Differential Equilibrium Relations",
    "formula": "\\frac{dV}{dx} = -w(x), \\quad \\frac{dM}{dx} = V(x), \\quad \\frac{d^2M}{dx^2} = -w(x)",
    "symbols": [
      {
        "symbol": "V(x)",
        "meaning": "Internal shear force at coordinate x",
        "unit": "kN"
      },
      {
        "symbol": "M(x)",
        "meaning": "Internal bending moment at coordinate x",
        "unit": "kN·m"
      },
      {
        "symbol": "w(x)",
        "meaning": "Transverse downward distributed load intensity",
        "unit": "kN/m"
      }
    ],
    "applicability": "Prismatic or non-prismatic beams subjected to transverse distributed loads.",
    "assumptions": "Continuous load intensity; Euler-Bernoulli small deflection theory.",
    "signConvention": "Clockwise shear (+); Sagging moment (+); Downward load (+w).",
    "derivation": "Consider an infinitesimal slice dx: vertical equilibrium gives dV/dx = -w; moment equilibrium dM - V dx + (1/2)w dx² = 0 gives dM/dx = V.",
    "memoryCue": "'Load is negative slope of shear; Shear is slope of moment' (w = -V', V = M').",
    "traps": "Peak moment occurs strictly where shear crosses zero (V = 0), NOT necessarily at the physical midpoint!",
    "related": [
      "Area under SFD = ΔM",
      "EI v'' = M(x)"
    ]
  },
  {
    "id": "f-0-3",
    "moduleId": "mod0",
    "moduleTitle": "Statics & Solid Mechanics Foundations",
    "name": "Elastic Axial Deformation (Hooke's Law)",
    "formula": "\\Delta L = \\frac{N L}{E A}",
    "symbols": [
      {
        "symbol": "\\Delta L",
        "meaning": "Total axial elongation or shortening",
        "unit": "m"
      },
      {
        "symbol": "N",
        "meaning": "Internal axial normal force (Tension +, Compression -)",
        "unit": "kN"
      },
      {
        "symbol": "L",
        "meaning": "Initial member length",
        "unit": "m"
      },
      {
        "symbol": "E",
        "meaning": "Young's modulus of elasticity",
        "unit": "kN/m²"
      },
      {
        "symbol": "A",
        "meaning": "Cross-sectional area",
        "unit": "m²"
      }
    ],
    "applicability": "Straight, uniform axial bars subjected to concentric end loads.",
    "assumptions": "Linearly elastic isotropic material; stress remains below proportional limit.",
    "signConvention": "Positive for elongation (Tension); Negative for contraction (Compression).",
    "derivation": "Stress σ = N/A; Strain ε = ΔL/L. By Hooke's Law: σ = E ε ⇒ N/A = E (ΔL/L) ⇒ ΔL = NL/EA.",
    "memoryCue": "'No Legs Every Autumn' (N L / E A).",
    "traps": "Do not forget to convert mm to meters or GPa to kN/m² when calculating in engineering units!",
    "related": [
      "1·Δ = ∑ n (NL/EA)",
      "Thermal strain ΔL = α ΔT L"
    ]
  },
  {
    "id": "f-0-4",
    "moduleId": "mod0",
    "moduleTitle": "Statics & Solid Mechanics Foundations",
    "name": "Centroid of Composite Cross-Section",
    "formula": "\\bar{y} = \\frac{\\sum A_i y_i}{\\sum A_i}",
    "symbols": [
      {
        "symbol": "\\bar{y}",
        "meaning": "Vertical distance to neutral axis from reference baseline",
        "unit": "m"
      },
      {
        "symbol": "A_i",
        "meaning": "Area of sub-component i",
        "unit": "m²"
      },
      {
        "symbol": "y_i",
        "meaning": "Centroid distance of sub-component i from baseline",
        "unit": "m"
      }
    ],
    "applicability": "Any composite cross-section (T-beams, I-beams, channel sections).",
    "assumptions": "Homogeneous material across all parts of the cross section.",
    "signConvention": "Consistent positive axis measured from chosen datum (usually bottom fiber).",
    "derivation": "First moment of area about datum: Total Area × Centroid = Sum of (Area_i × Centroid_i).",
    "memoryCue": "'Sum of Ay over Sum of A'.",
    "traps": "Never measure y_i from different datums for different sub-areas; fix ONE reference line!",
    "related": [
      "Parallel Axis Theorem",
      "I = bh³/12"
    ]
  },
  {
    "id": "f-0-5",
    "moduleId": "mod0",
    "moduleTitle": "Statics & Solid Mechanics Foundations",
    "name": "Parallel Axis Theorem (Steiner's Theorem)",
    "formula": "I_x = I_{NA} + A d^2",
    "symbols": [
      {
        "symbol": "I_x",
        "meaning": "Moment of inertia about arbitrary parallel axis x",
        "unit": "m⁴"
      },
      {
        "symbol": "I_{NA}",
        "meaning": "Second moment of area about the cross-section centroidal neutral axis",
        "unit": "m⁴"
      },
      {
        "symbol": "A",
        "meaning": "Cross-sectional area",
        "unit": "m²"
      },
      {
        "symbol": "d",
        "meaning": "Perpendicular distance between centroidal axis and parallel axis",
        "unit": "m"
      }
    ],
    "applicability": "Calculation of moment of inertia for built-up and composite structural shapes.",
    "assumptions": "The reference axis in I_NA MUST pass through the component's own centroid.",
    "signConvention": "d is squared, so distance direction (+ or -) does not alter the result.",
    "derivation": "I_x = ∫ (y + d)² dA = ∫ y² dA + 2d ∫ y dA + d² ∫ dA. Since ∫ y dA = 0 about centroid, I_x = I_NA + A d².",
    "memoryCue": "'Inertia plus Area times Distance squared' (I + Ad²).",
    "traps": "You can ONLY transfer to or from the CENTROIDAL axis. To transfer between two non-centroidal axes, you must pass through the centroid first!",
    "related": [
      "σ = -My/I",
      "I_rect = bh³/12"
    ]
  },
  {
    "id": "f-0-6",
    "moduleId": "mod0",
    "moduleTitle": "Statics & Solid Mechanics Foundations",
    "name": "Elastic Flexure Formula (Navier's Equation)",
    "formula": "\\sigma = -\\frac{M y}{I}, \\quad \\sigma_{\\max} = \\frac{M}{S}",
    "symbols": [
      {
        "symbol": "\\sigma",
        "meaning": "Normal flexural bending stress at fiber y",
        "unit": "kN/m²"
      },
      {
        "symbol": "M",
        "meaning": "Internal bending moment at cross section",
        "unit": "kN·m"
      },
      {
        "symbol": "y",
        "meaning": "Perpendicular distance from neutral axis",
        "unit": "m"
      },
      {
        "symbol": "I",
        "meaning": "Second moment of area about neutral axis",
        "unit": "m⁴"
      },
      {
        "symbol": "S",
        "meaning": "Elastic section modulus (I / c)",
        "unit": "m³"
      }
    ],
    "applicability": "Straight beams subjected to pure or transverse bending within elastic limit.",
    "assumptions": "Euler-Bernoulli hypothesis: Plane sections remain plane and normal to the neutral surface.",
    "signConvention": "Sagging moment (+M) creates compression in top fiber (y > 0 ⇒ σ < 0) and tension in bottom fiber (y < 0 ⇒ σ > 0).",
    "derivation": "Linear strain profile ε = -y/ρ; Hooke's Law σ = E ε = -E y / ρ; Moment equilibrium M = -∫ σ y dA = (E/ρ) ∫ y² dA = (E/ρ) I ⇒ σ = -My/I.",
    "memoryCue": "'My over I' (σ = M y / I).",
    "traps": "Remember y is measured from the CENTROID (neutral axis), NOT from the bottom or top surface!",
    "related": [
      "S = bh²/6",
      "EI v'' = M(x)"
    ]
  },
  {
    "id": "f-0-7",
    "moduleId": "mod0",
    "moduleTitle": "Statics & Solid Mechanics Foundations",
    "name": "Euler-Bernoulli Elastic Curve Differential Equation",
    "formula": "EI \\frac{d^2v}{dx^2} = M(x)",
    "symbols": [
      {
        "symbol": "v(x)",
        "meaning": "Transverse deflection of beam centerline",
        "unit": "m"
      },
      {
        "symbol": "\\theta(x)",
        "meaning": "Rotation / slope of beam (dv/dx)",
        "unit": "rad"
      },
      {
        "symbol": "M(x)",
        "meaning": "Internal bending moment function",
        "unit": "kN·m"
      },
      {
        "symbol": "EI",
        "meaning": "Flexural rigidity of beam cross section",
        "unit": "kN·m²"
      }
    ],
    "applicability": "Elastic deflection analysis of beams with small slopes (|dv/dx| ≪ 1).",
    "assumptions": "Negligible shear deformations; linear elasticity; small rotations.",
    "signConvention": "v(x) positive upwards; M(x) positive sagging (creates upward curvature d²v/dx² > 0).",
    "derivation": "Geometric curvature κ ≈ d²v/dx²; from flexure theory 1/ρ = M/EI. Equating gives EI d²v/dx² = M(x).",
    "memoryCue": "'EI times second derivative of deflection equals Moment' (EI v'' = M).",
    "traps": "Do not forget the two integration constants C_1 and C_2! They must be resolved using physical support boundary conditions.",
    "related": [
      "Mohr's Theorems",
      "Conjugate Beam"
    ]
  },
  {
    "id": "f-0-8",
    "moduleId": "mod0",
    "moduleTitle": "Statics & Solid Mechanics Foundations",
    "name": "Mohr's First Moment-Area Theorem (Slope Change)",
    "formula": "\\theta_{B/A} = \\theta_B - \\theta_A = \\int_A^B \\frac{M}{EI} dx = \\text{Area of } \\left(\\frac{M}{EI}\\right)_{A-B}",
    "symbols": [
      {
        "symbol": "\\theta_{B/A}",
        "meaning": "Change in slope of elastic curve between points A and B",
        "unit": "rad"
      },
      {
        "symbol": "\\theta_A, \\theta_B",
        "meaning": "Slopes of elastic curve at points A and B",
        "unit": "rad"
      },
      {
        "symbol": "M/EI",
        "meaning": "Curvature diagram along the beam length",
        "unit": "1/m"
      }
    ],
    "applicability": "Beams of uniform or stepped cross sections subjected to bending.",
    "assumptions": "Continuous elastic curve; small deflection theory.",
    "signConvention": "Positive (sagging) M/EI area produces counter-clockwise change in slope from A to B.",
    "derivation": "From dθ = (M/EI) dx, integrating both sides from A to B gives θ_B - θ_A = ∫_A^B (M/EI) dx.",
    "memoryCue": "'Slope change equals Area of M/EI diagram'.",
    "traps": "This theorem gives the CHANGE in slope between two points (θ_B - θ_A), NOT the absolute slope θ_B unless θ_A is known (e.g. at a fixed support where θ_A = 0)!",
    "related": [
      "Mohr's Second Theorem",
      "Conjugate Beam V* = θ"
    ]
  },
  {
    "id": "f-0-9",
    "moduleId": "mod0",
    "moduleTitle": "Statics & Solid Mechanics Foundations",
    "name": "Mohr's Second Moment-Area Theorem (Tangential Deviation)",
    "formula": "t_{B/A} = \\int_A^B x \\frac{M}{EI} dx = \\left(\\text{Area}_{M/EI}\\right)_{A-B} \\cdot \\bar{x}_B",
    "symbols": [
      {
        "symbol": "t_{B/A}",
        "meaning": "Vertical tangential deviation of point B from tangent drawn at point A",
        "unit": "m"
      },
      {
        "symbol": "\\bar{x}_B",
        "meaning": "Centroid distance of M/EI area measured strictly from target point B",
        "unit": "m"
      },
      {
        "symbol": "\\text{Area}_{M/EI}",
        "meaning": "Area of curvature diagram between A and B",
        "unit": "rad"
      }
    ],
    "applicability": "Calculating beam deflections and establishing reference tangent baselines.",
    "assumptions": "Continuous elastic curve; small slopes.",
    "signConvention": "Positive t_B/A indicates point B lies ABOVE the tangent line drawn at A.",
    "derivation": "Infinitesimal deviation dt = x dθ = x (M/EI) dx. Integrating between A and B gives t_B/A = ∫ x (M/EI) dx = Area × x̄_B.",
    "memoryCue": "'Deviation of B from tangent at A: Area times centroid arm measured FROM B' (t_B/A = A · x̄_B).",
    "traps": "t_B/A ≠ t_A/B! Centroid distance x̄ MUST be measured from point B (the point whose deviation is evaluated), NOT from point A!",
    "related": [
      "t_A/B = Area · x̄_A",
      "Conjugate Beam M* = v"
    ]
  },
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
