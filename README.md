# 🏗️ COTM 3101: Theory of Structures — Complete Mastery Lab

> **Interactive Engineering Workbench & Educational Platform**  
> Aligned with the Addis Ababa University (AAU) / EiABC B.Sc. Curriculum in Construction Technology & Management.

![Theory of Structures](https://img.shields.io/badge/Structural%20Engineering-COTM%203101-0284c7?style=for-the-badge)
![Offline Ready](https://img.shields.io/badge/PWA-100%25%20Offline%20Ready-22c55e?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-facc15?style=for-the-badge)

---

## 🚀 Live Demo & Mobile Access

- **Live GitHub Pages:** [https://dagiyosi-pixel.github.io/theory-of-structures-mastery-lab/](https://dagiyosi-pixel.github.io/theory-of-structures-mastery-lab/)
- **100% Offline Single-File App:** Open `standalone.html` in any browser on PC, tablet, or mobile with zero installation and zero internet required!

---

## 📚 Complete 7-Module Coverage

1. **Chapter 1: Stability, Determinacy & Loads on Structures**
   - External, internal, and overall determinacy formulas ($D = m + r - 2j$ and $D = (3m + r) - (3j + s)$)
   - Closed-loop formula: $D_i = 3n - I_c$
   - 3 Deadly geometric instability traps (parallel reactions, concurrent reactions, unbraced truss panels)
   - Ethiopian Building Code (EBCS) load classifications (Dead, Live, Wind, Earthquake inertia forces)

2. **Chapter 2: Conjugate Beam Method (Deflection of Determinate Beams)**
   - The beam statics-kinematics mathematical duality ($d^2v/dx^2 = M/EI \iff d^2M^*/dx^2 = w^*$)
   - Conjugate shear = real slope ($\theta = V^*$), Conjugate moment = real deflection ($v = M^*$)
   - Complete boundary transformation rules (Fixed $\leftrightarrow$ Free, Interior Roller $\leftrightarrow$ Internal Hinge)
   - Standard cases for cantilevers, simply supported beams, overhangs, and point/distributed loads

3. **Chapter 3: Virtual Work (Unit Load Method)**
   - Deformable body virtual work: $1.0 \cdot \Delta = W_i$
   - Truss deflections from real loads ($\sum \frac{nNL}{EA}$), temperature ($\sum n\alpha\Delta TL$), and fabrication errors ($\sum n\Delta L_{fab}$)
   - **Vereshchagin's Graphical Multiplication Rule:** $\int \frac{mM}{EI}dx = \text{Area}(M) \times m_{\text{centroid}}$
   - Rigid-body support movements theorem in determinate structures ($W_i = 0$)

4. **Chapter 4: Consistent Deformation (Force / Flexibility Method)**
   - Selection of stable, determinate primary base structures
   - Compatibility equations: $[\delta]\{X\} + \{\Delta_0\} = \{\Delta_{\text{settlement}}\}$
   - Propped cantilever standard rules: $R_{\text{roller}} = \frac{3}{8}wL$, $R_{\text{wall}} = \frac{5}{8}wL$, $M_{\text{wall}} = \frac{wL^2}{8}$
   - Maxwell-Betti Reciprocal Theorem ($\delta_{ij} = \delta_{ji}$)

5. **Chapter 5: Three-Moment Equation (Clapeyron's Equation)**
   - Tangent slope continuity across interior supports: $M_L L_L + 2M_C(L_L + L_R) + M_R L_R = - \sum \frac{6Ax}{L}$
   - Load terms: Uniform load $\frac{wL^3}{4}$, concentrated point load $\frac{Pa(L^2 - a^2)}{L}$
   - Imaginary zero span trick for fixed supports ($L_0 = 0, EI_0 = \infty$)
   - Complete 2-span beam worked examples with shear and moment reactions

6. **Chapter 6: Slope-Deflection Method**
   - Displacement / Stiffness method formulation
   - **AAU COTM 3101 Statical Sign Convention:** Joint rotation $\theta$ is positive CLOCKWISE, member end moment $M$ is positive COUNTER-CLOCKWISE on member
   - Governing equation: $M_{AB} = M^F_{AB} - 2EK(2\theta_A + \theta_B - 3\Delta/L)$
   - Fixed-end moment formulas, joint equilibrium ($\sum M = 0$), and column story shear equations for sidesway frames

7. **Chapter 7: Moment Distribution Method (Hardy Cross Method)**
   - Physical iterative distribution: Stiffness $K = I/L$, distribution factors $DF = K/\sum K$, carry-over factor $COF = +0.5$
   - **The Master $\frac{3}{4}K$ Modified Stiffness Trick:** Instant single-step convergence for hinged ends without endless carry-overs
   - Complete multi-span beam and portal frame distribution tables

---

## 🧮 Built-in Structural Engineering Calculators

1. **Live Determinacy & Stability Analyzer:** Computes external, internal, and overall determinacy; automatically flags parallel reactions or unbraced panels.
2. **2-Span Clapeyron Live Solver:** Sets up Three-Moment equations, solves $M_B$, reactions $R_A, R_B, R_C$, and span sagging moments for arbitrary UDL and point loads.
3. **Hardy Cross Moment Distribution Engine:** Interactive multi-cycle balance and carry-over spreadsheet with real-time joint equilibrium verification.

---

## 📱 How to Use on Mobile (100% Offline PWA)

1. Open `standalone.html` in Safari (iOS) or Chrome (Android).
2. Tap the browser share button $\to$ **"Add to Home Screen"**.
3. The app installs as a native, full-screen offline application with local storage persistence for your XP, streak, and rank progress!

---

## 📄 License

MIT License. Developed for Ethiopian Institute of Architecture, Building Construction and City Development (EiABC) / Addis Ababa University students and structural engineering learners worldwide.
