# Hyperdimensional Pattern Decoder · v1.4

**Cross-Field Steganographic Signal Analysis & Topological Environment Semantics via 10D Quantum Mapping**

> *"Every visual field encodes a signal. This engine reads it."*

[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=flat&logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-009688?style=flat&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5+-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3+-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![OpenCV](https://img.shields.io/badge/OpenCV-4.9+-5C3EE8?style=flat&logo=opencv&logoColor=white)](https://opencv.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## Table of Contents

1. [Theoretical Framework](#1-theoretical-framework)
2. [System Architecture](#2-system-architecture)
3. [8-Axis Energy Distribution Matrix](#3-8-axis-energy-distribution-matrix)
4. [Dimensional Analysis Map](#4-dimensional-analysis-map)
5. [Rhythm & Takt Classification System](#5-rhythm--takt-classification-system)
6. [Multi-Color Palette Analysis](#6-multi-color-palette-analysis)
7. [Sector Modes](#7-sector-modes)
8. [Interactive Overlay Features](#8-interactive-overlay-features)
9. [Installation & Quick Start](#9-installation--quick-start)
10. [API Reference](#10-api-reference)
11. [Frontend Overview](#11-frontend-overview)
12. [Screenshots](#12-screenshots)
13. [Project Structure](#13-project-structure)
14. [Changelog](#14-changelog)

---

## 1. Theoretical Framework

The Hyperdimensional Pattern Decoder operates on the premise that **visual information is not merely aesthetic — it is a steganographic carrier signal** encoding structural, energetic, and semantic data across multiple dimensional planes simultaneously.

The engine's analytical model is grounded in three intersecting theoretical traditions:

### 1.1 Kaluza-Klein Extra-Dimension Framework

In Kaluza-Klein unified field theory, observable 4D spacetime is a projection of a higher-dimensional manifold. By analogy, this system treats every image as a **10-dimensional projection**: the visible pixel array is Dimension 4, while Dimensions 5 through 10 encode latent field properties — colour potential, rhythm density, geometric topology, and impulse frequency — that are not directly perceptible but are mathematically extractable.

### 1.2 Quantum Field Topology

Each image is modelled as a **topological field** containing:

- **Stabilization Atoms** — circular/smooth regions that introduce coherence and structural equilibrium
- **Hyperdimensional Cubes** — rectilinear regions that encode information density and compression fields
- **Luxury Particles** — the simultaneous presence of Black, Silver, and White tones, which multiplicatively amplify the steganographic value signal
- **Electromagnetic Break Events** — Yellow/angular field combinations that signal imminent symmetry collapse

The **Gravitational Field** (dark-pixel density), **EM-Break** (Yellow saturation), and **Oscillating Field** (2-3-2-3 rhythm alternation) form a three-body interaction system that governs the overall **Quantum Value Multiplier** output.

### 1.3 Supersymmetric Pairing (SUSY)

When bilateral symmetry falls within the 0.40–0.65 range, the system detects a **SUSY pairing state** — a partial symmetry that indicates two complementary energetic components in dynamic equilibrium. This is distinct from full symmetry (>0.65) and full asymmetry (<0.40), and carries its own semantic encoding in the output vocabulary.

---

## 2. System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     BROWSER  (React / Vite)                     │
│                                                                 │
│  UploadZone ──► SectorDropdown                                  │
│       │                                                         │
│       ▼                                                         │
│  DecoderOutput ◄──────────────────────────────────────────┐    │
│  ├─ TelemetryPanel  (live field readouts + color palette)  │    │
│  ├─ EnergyRadarChart  (8-axis interactive spider chart)    │    │
│  ├─ FrequencyOscilloscope  (Dim-10 impulse waveform)       │    │
│  └─ ImageVisualizer  (overlay: markers, rhythm, boxes)     │    │
│                                                            │    │
└────────────────────────────────────────────────────────────┼────┘
                          HTTP / multipart-form              │
                                                             │
┌────────────────────────────────────────────────────────────▼────┐
│                   FastAPI  (hd_engine)                          │
│                                                                 │
│  routes.py  ──►  HyperdimensionalAnalyzer  ──►  build_result   │
│                  │                              │               │
│                  │  analyzer.py                 │ translator.py │
│                  ├─ analyze_dimension_5()        ├─ _build_interpretation()    │
│                  ├─ analyze_dimensions_6_8()     ├─ _build_quantum_notes()     │
│                  ├─ analyze_dimension_9()        ├─ _build_multi_color_note()  │
│                  ├─ analyze_dimension_10()       ├─ _build_prognosis()         │
│                  ├─ analyze_symmetry()           └─ SECTOR_VOCABULARY          │
│                  ├─ analyze_quantum_field()                                    │
│                  ├─ analyze_multi_color()   ◄── hd_engine/color/              │
│                  ├─ detect_objects()                                           │
│                  └─ compute_radar_axes()                                       │
│                                                                 │
│  hd_engine/color/                                               │
│  ├─ detector.py   (MultiColorDetector — top-4 palette)          │
│  ├─ mix.py        (ColorMixInterpreter — 28 mix definitions)    │
│  ├─ text.py       (universal per-color semantic texts)          │
│  └─ models.py     (DominantColor, ColorMix, MultiColorPalette)  │
│                                                                 │
│  models.py  ──  Pydantic schema (AnalysisResult JSON contract)  │
└─────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Module | Role |
|---|---|
| `hd_engine/analyzer.py` | All computer-vision logic (NumPy/Pillow). Stateless per-request. |
| `hd_engine/translator.py` | Semantic rule engine. Maps numeric vectors → steganographic text. |
| `hd_engine/models.py` | Pydantic data contract. Defines every JSON field and its constraints. |
| `hd_engine/routes.py` | FastAPI router. Validates, delegates, surfaces errors. Zero business logic. |
| `hd_engine/color/` | Multi-color palette package: detection, mix interpretation, semantic texts. |
| `frontend/src/components/` | React UI. Consumes the JSON contract; renders all charts and readouts. |

---

## 3. 8-Axis Energy Distribution Matrix

The **Energy Distribution Matrix** (v1.35) is the primary multi-dimensional field readout. It encodes the state of the visual field across eight independent axes, visualised as an interactive radar (spider) chart.

| Axis | Index | Field Name | Derivation |
|------|-------|-----------|------------|
| **CL** | 0 | Cognitive Load | Dim 6-8 texture coherence score |
| **AF** | 1 | Aggressive Focus | Dim 9 edge curvature index |
| **ST** | 2 | Structural Stability | Symmetry class × QFM stability modifier |
| **IE** | 3 | Information Entropy | Dim 10 impulse rate (Hz), capped at 20 Hz → 1.0 |
| **CA** | 4 | Calm / Absorption | Dim 5 colour vector (Green dominant = direct; others inverted) |
| **QV** | 5 | Quantum Value | Composite QV multiplier, normalised to [0, 1] |
| **GP** | 6 | Gravitational Pull | Dark-pixel fraction (QFM gravitational density) |
| **SB** | 7 | Symmetry-Break Vector | Local asymmetry delta (0 when no asymmetry detected) |

### Stability Calculation

```
stability = base_score × stability_modifier

  base_score = 0.85  (SUSY detected)
             | 0.75  (fully symmetric)
             | 0.45  (asymmetric)

  stability_modifier = 0.65  (QFM status contains "Unstable")
                     | 1.00  (otherwise)
```

### Segment-Zoom Interaction

Clicking any axis label in the legend **normalises all eight values** so the selected axis lands at `1.0`. The polygon shifts to reveal inter-axis proportions that would otherwise be hidden when one axis dominates. Click the same axis again to reset to absolute values.

### Cross-Axis Interaction Engine

The semantic engine inspects cross-axis combinations and appends structured notes to the decoder output:

- **High Cognitive Load + High Entropy** → cognitive saturation, information overload signal
- **High Aggression + Low Stability** → collapse vector probability elevated
- **High Gravitational Pull + Low Quantum Value** → gravitational field suppressing value signal
- **High Calm + Low Entropy** → absorption field at maximum efficiency
- **SUSY field + High Quantum Value** → supersymmetric amplification cascade
- **High Symmetry-Break + High Aggression** → directed asymmetric force vector detected
- **Fibonacci Harmonic takt** → constructive harmonic interference pattern

---

## 4. Dimensional Analysis Map

The pipeline analyses five dimensional planes in sequence. Each produces a structured sub-model that feeds into the final semantic synthesis.

### Dimension 5 — Colour / Base Potential

Extracts dominant hue via saturation-weighted HSV voting. Vivid pixels outweigh desaturated ones proportionally to their chromatic intensity. The single dominant colour feeds the sector vocabulary; the full pixel distribution feeds the Multi-Color Palette (see §6).

| Colour Class | HSV Conditions | Semantic Role |
|---|---|---|
| Red | H∈[170,180]∪[0,4], S≥150, V≥80 | Maximum attention signal, life force |
| Yellow | H∈[20,35], S≥140, V≥130 | High-Luminance Resonance, maximum signal visibility |
| Orange | H∈[5,19], S≥150, V≥150 | Warm impulse signal, elevated visibility |
| Brown | Warm hue H∈[0,22], NOT yellow/orange/red | Earth-Band, energetic stagnation |
| Pink | H∈[155,170] | Magenta Interference, low-threat attractor |
| Green | H∈[36,90] | Absorption / Calm dominant |
| Cyan | H∈[90,105] | Open negotiation, dwell-time signal |
| Blue | H∈[105,133] | Cognitive authority, spatial dominance |
| Violet | H∈[133,155] | Depth signal, multi-layer encoding |

> **v1.4 fix:** The red detection threshold was corrected. Dark-side shadow pixels on red objects (V < 150) previously fell into the Brown bin. The Value gate was lowered to V ≥ 80 so shadow areas of red objects are correctly captured. The Brown classifier also now requires `brown ≥ red` to prevent brown from overriding a strong red signal.

### Dimensions 6-8 — Rhythm / Texture Pattern Density

Measures edge-gradient density across four equal horizontal strips. The ratio of densities across strips determines the **Takt signature** (see §5). The takt is visible on the image as a rhythm-line overlay — see §8.

Output fields: `pattern_type`, `frequency_takt`, `coherence_score`, `semantic_state`.

### Dimension 9 — Geometry / Energy Distribution

FFT-based edge curvature analysis. High-frequency angular components → `edge_curvature_index → 1.0` (Triangle/Jagged). Smooth curves → index → 0.0 (Circle/Spiral).

For `CARDS` and `INDIVIDUUM` sectors, a **Central Focus Override** computes the curvature of the inner 1/3 crop only, preventing card-frame borders from misclassifying a round subject.

### Dimension 10 — Frequency / Impulse Rate

Maps overall visual complexity to an impulse frequency in Hz and an intensity multiplier that scales Dim-5 and Dim-9 vector outputs.

### Symmetry Analysis

Bilateral left/right mirror comparison. Three states:

| State | Score Range | Effect |
|---|---|---|
| Symmetric | >0.65 | Structural Stability base: 0.75 |
| SUSY Paired | 0.40–0.65 | Structural Stability base: 0.85 |
| Asymmetric | <0.40 | Structural Stability base: 0.45 |

### Quantum Field Metrics (v1.1+)

| Field | Condition | Trigger |
|---|---|---|
| Gravitational Density | Dark-pixel fraction | Suppresses QV when dominant |
| EM-Break | Yellow + angular, above threshold | Signals symmetry collapse |
| Oscillating Field | Alternating 2-3-2-3 takt | High-energy colour-shift trigger |
| Luxury Particle | Black + Silver + White simultaneous | QV multiplier boost |
| Hyperdimensional Compression | Rectangular zone + surrounding micro-forms | High information-density flag |

### Local Asymmetry (v1.2+)

Left-half vs right-half curvature comparison. When the asymmetry delta exceeds the threshold, a **Directed Flow Vector** is declared — spatial tension between the dominant and compressed halves. Feeds directly into the Symmetry-Break Vector axis (index 7).

---

## 5. Rhythm & Takt Classification System

The takt system classifies the spatial rhythm of the image by measuring edge-gradient density (`D`) across four equal horizontal strips.

| Takt Signature | Name | Condition | Semantic Meaning |
|---|---|---|---|
| `0-0-0-0` | **Absolute Stasis** | Edge density < 0.025 | Zero rhythmic activity; field in total suspension |
| `1-1-1-1` | **Singularity Impulse** | All strips near-equal, very high density | Maximum field coherence, singular energy spike |
| `1-1-2-3` | **Fibonacci Harmonic** | Strip ratios D:D:2D:3D (±45/50%) | Constructive harmonic interference; golden-ratio structural resonance |
| `2-2-2` | **Balanced Dense** | Uniformly high density | Controlled high-frequency field |
| `3-3-3` | **Balanced Medium** | Uniformly medium density | Stable mid-frequency rhythm |
| `4-4-4` | **Balanced Sparse** | Uniformly low density | Open field, minimal visual noise |
| `5-5-5` | **Minimal Trace** | Near-zero uniform density | Ghost field, residual signal only |
| `1-2-3-4` | **Progressive Acceleration** | Monotonically increasing density | Escalating energy gradient |
| `4-2-4-2` | **Oscillating Resonance** | Alternating high-low density | 2-3-2-3 oscillation pattern, EM-field charging |

Takt detection operates on the full image or, for `CARDS` sectors, on a pre-cropped organic-center focus zone to exclude decorative borders.

### How to See the Takt in the UI

The takt is visible in three places:

1. **TAKT toggle button** — in the image panel header after a scan, a button labelled e.g. `TAKT 3-3-3-3` appears. Click it to draw vertical dividing lines across the image, splitting it into equal sections matching the beat count. Beat numbers appear at the bottom of each section. Click again to hide.
2. **Vector Readout** — the `D6-8` row in the right-hand telemetry panel shows the takt string alongside the coherence bar.
3. **DIM 6-8 bar** — the five dimension bars at the bottom of the image panel show the rhythm coherence score as a progress bar.

---

## 6. Multi-Color Palette Analysis

> *New in v1.4*

Instead of reporting only the single dominant colour, the engine now extracts the **top 4 most dominant colours** in the image and calculates their percentage share of the visual field. In addition, a **colour mix interpreter** matches the detected palette against a catalogue of 28 predefined combinations and returns a psychological/energetic description of what the colour combination encodes.

### How It Works

**Normalization strategy:**

1. Chromatic colours (Red, Orange, Yellow, Brown, Green, Cyan, Blue, Violet, Pink) are extracted as saturation-weighted pixel votes — vivid pixels outweigh desaturated ones.
2. Black and White are measured as pixel-count fractions independently.
3. Chromatic votes are scaled to fill the portion of the image not occupied by black/white pixels, then combined into a unified percentage scale.
4. The top 4 colours above the 2 % noise threshold are returned, sorted by descending share.

**Per-colour semantic text:**

Each detected colour carries a universal psychological description independent of sector mode.

| Colour | Semantic Summary |
|---|---|
| Red | Maximum attention signal — primal urgency, passion, biological activation |
| Orange | Thermal frequency — creative warmth, social energy, optimistic stimulation |
| Yellow | Luminance peak — cognitive clarity, optimism, maximum signal visibility |
| Brown | Earth-band frequency — organic stability, material comfort, ancestral grounding |
| Green | Biological resonance — growth, renewal, intelligence of living systems |
| Cyan | Interface field — analytical clarity, technological precision, calm momentum |
| Blue | Cognitive depth — introspection, trust, spatial expansion |
| Violet | Prestige signal — subliminal authority, spiritual depth, transformative potential |
| Pink | Soft attractor — emotional warmth, approachability, low-threat aesthetic appeal |
| Black | Zero-point field — gravitational dominance, maximum depth encoding |
| White | Maximum luminance — open neutral field, spatial authority through void |

### Mix Interpretation Catalogue

The interpreter matches the top-4 palette against 28 predefined combinations, checking most-specific definitions (4-colour) first, then 3-colour, then 2-colour. The first match wins.

**4-colour mixes:**

| Mix Name | Colors | Family | Core Meaning |
|---|---|---|---|
| Living Fire | Red · Orange · Yellow · Green | Warm | Passion fueled by growth; love in natural settings |
| Harvest Flame | Red · Orange · Yellow · Brown | Earth | Earthy warmth and ancestral abundance; harvest, home |
| Forest Ember | Red · Orange · Brown · Green | Earth | Primal intensity grounded in nature; decay and rebirth |
| Cosmic Dusk | Blue · Cyan · Violet · Pink | Spiritual | Introspective depth meeting soft creative power |
| Arctic Waters | Green · Blue · Cyan · White | Cool | Pure expansion and biological clarity |
| Midnight Realm | Black · White · Blue · Violet | Luxury | Maximum depth meets intellectual authority |
| Dark Tension | Red · Blue · Violet · Black | Contrast | Primal power in shadow; suppressed intensity |
| Spring Bloom | Yellow · Orange · White · Green | Warm | Luminant optimism meeting biological freshness |

**3-colour mixes (selection):**

| Mix Name | Colors | Family | Core Meaning |
|---|---|---|---|
| Solar Impulse | Red · Orange · Yellow | Warm | Pure warm-spectrum energy, maximum attention command |
| Autumn Ember | Red · Orange · Brown | Earth | Grounded warmth; the hearth and harvest |
| Ocean Breath | Green · Blue · Cyan | Cool | Biological intelligence meets spatial openness |
| Creative Twilight | Blue · Violet · Pink | Spiritual | Intuitive depth blending with soft expression |
| Forest Floor | Brown · Green · Yellow | Earth | Deep organic rootedness and natural wisdom |
| Heartwave | Red · Pink · Violet | Warm | Full emotional spectrum of love |
| Royal Night | Yellow · Violet · Black | Luxury | Luminance against prestige depth |
| Digital Ice | Cyan · Blue · White | Cool | Technological purity and clinical precision |
| Ethereal Bloom | Pink · Violet · White | Spiritual | Transcendent softness and spiritual beauty |
| Human Warmth | Brown · Orange · Pink | Earth | Human skin palette; intimacy and organic warmth |

**2-colour mixes (fallback):**

| Mix Name | Colors | Family | Core Meaning |
|---|---|---|---|
| Vital Opposition | Red · Green | Contrast | Maximum complementary contrast; life force vs. biology |
| Power Tension | Red · Blue | Contrast | Raw emotion against intellectual calm |
| Creative Polarity | Orange · Blue | Contrast | Dynamic balance; the palette that fuels innovation |
| Solar Depth | Yellow · Violet | Contrast | Luminance against prestige; optimism meeting mystery |
| Zero Field | Black · White | Neutral | Pure polarity; maximum clarity through contrast |
| Dominance Field | Red · Black | Contrast | Power at maximum depth; intensity amplified by darkness |
| Earth Skin | Green · Brown | Earth | Organic connection; biological life in terrestrial matter |
| Open Sky | Blue · White | Cool | Expansive clarity; freedom and cognitive openness |

When no catalogue entry matches, a generic fallback determines whether the palette is predominantly Warm, Cool, Achromatic, or a mixed Spectral Composite.

### Where to See It in the UI

- **Telemetry Panel (right column):** A `Color Palette` widget shows a proportional swatch bar, per-colour percentage bars, and the detected mix name with its first sentence of semantic description.
- **Decoder Output (bottom terminal):** A `PALETTE >` line lists all detected colours with percentages, followed by a styled `MIX:` block with the full mix label, family, and complete semantic text.
- **Interpretation text:** The `PALETTE:` section appended to the full interpretation string includes a one-sentence summary per colour and the first two sentences of the mix semantic.

---

## 7. Sector Modes

The semantic vocabulary is fully parameterised by **sector mode**. The same dimensional vectors produce different steganographic interpretations depending on the analytical context selected.

| Sector ID | Label | Primary Application |
|---|---|---|
| `URBAN_AREA` | Urban Area (Cities) | Pedestrian-flow dynamics, spatial authority mapping, civic behavioural encoding |
| `INDIVIDUUM` | Individual / Person | Psychographic signal extraction, personality-field resonance, dominance indicators |
| `STOCKS` | Financial Instrument | Market sentiment encoding, trend-reversal signals, volatility field analysis |
| `CARDS` | Trading Card / Collectible | Rarity-signal extraction, chromatic value classification, collector-field resonance |
| `TOYS` | Toy / Collectible | Attention-capture mechanics, play-pattern encoding, demand-signal topology |

Sector mode is passed as a `sector_mode` form field in the POST request and normalised to uppercase server-side.

---

## 8. Interactive Overlay Features

> *New in v1.4*

The image panel canvas supports several interactive overlay layers that can be activated after a scan completes.

### Clickable Markers

Two types of markers are drawn on the scanned image:

| Marker | Colour | Meaning |
|---|---|---|
| ◎ Ring | Cyan | **Stabilization Atom** — smooth, low-variance region. Contributes to Circle/Spiral geometry classification. |
| ⊕ Crosshair | Red | **Angular Complement** — high edge-contrast zone. Contributes to Triangle/Jagged geometry classification. |

**How to use:** Click any marker to open an info tooltip showing:
- Marker type and role
- Position (X% / Y% of image)
- Edge gradient magnitude (∇)
- Contribution to geometry classification

Click the same marker again or click empty space to dismiss the tooltip.

> **v1.4 fix:** Blue rings were previously clustering in the top portion of the image because `findCircleClusters()` returned the first N results of a top-to-bottom scan. The selection now uses a spatial grid (3×3 zones) so rings are distributed evenly across the full image.

### Rhythm Lines (TAKT Toggle)

After a scan, a **TAKT** button appears in the image panel header showing the detected takt signature (e.g. `TAKT 3-3-3-3`).

- **Click once** — vertical cyan lines are drawn dividing the image according to the beat count. A `3-3-3-3` takt draws 3 dividing lines creating 4 equal sections. Beat numbers appear at the bottom of each section. A `TAKT 3-3-3-3` label is shown at the top of the image.
- **Click again** — the rhythm overlay is hidden.

### Bounding Box Object Focus

Detected objects are outlined with dashed cyan bounding boxes. Click a box to enter **focus mode** — the selected object's box turns gold and the Telemetry Panel switches to show that object's individual dimensional analysis (Dim 5, Dim 9, coherence score, 8-axis radar).

---

## 9. Installation & Quick Start

### Prerequisites

- Python 3.11+
- Node.js 18+
- `pip` / `venv`

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/hyperdimensional_pattern_decoder.git
cd hyperdimensional_pattern_decoder

# Create and activate a virtual environment
python -m venv .venv

# macOS / Linux
source .venv/bin/activate

# Windows PowerShell
.venv\Scripts\Activate.ps1

# Install Python dependencies
pip install fastapi uvicorn python-multipart pillow numpy pydantic
```

### Start the Server

```bash
# Serves both the API and the pre-built React frontend
uvicorn main:app --reload
```

Open `http://localhost:8000` in your browser. API docs available at `http://localhost:8000/docs`.

### Frontend Development (optional)

If you want to edit the frontend with hot-reload:

```bash
cd frontend
npm install
npm run dev        # dev server at http://localhost:5173

# After making changes, rebuild for production:
npm run build
```

---

## 10. API Reference

### `POST /api/analyze`

Run the full 10D dimensional analysis pipeline on an uploaded image.

**Request** — `multipart/form-data`

| Field | Type | Required | Description |
|---|---|---|---|
| `file` | image file | ✓ | JPEG, PNG, WebP, GIF, or BMP. Max 10 MB. |
| `sector_mode` | string | — | Analysis context. Default: `INDIVIDUUM`. |

**Response** — `application/json`

```jsonc
{
  "meta": {
    "timestamp": "2025-01-01T00:00:00Z",
    "sector_mode": "TOYS",
    "sector_label": "Toys (Play Design)",
    "engine_version": "1.3.0"
  },
  "dimensions_analysis": {
    "dim_5_color": {
      "dominant_frequency": "Orange",
      "color_label": "Red",
      "vector_value": 0.82,
      "semantic_state": "Red Frequency / Maximum Impact Signal — ..."
    },
    "dim_6_8_rhythm": {
      "pattern_type": "Moderate structured field",
      "frequency_takt": "3-3-3",
      "coherence_score": 0.61,
      "semantic_state": "..."
    },
    "dim_9_geometry": {
      "dominant_shape": "Circle / Spiral",
      "edge_curvature_index": 0.34,
      "energy_distribution": "..."
    },
    "dim_10_frequency": { "impulse_rate_hz": 9.2, "intensity_multiplier": 1.46 },
    "symmetry": { "is_symmetric": true, "is_susy": false, "symmetry_score": 0.78, "semantic_state": "..." },
    "quantum_field_metrics": {
      "detected_particles": { "circle_count": 4, "square_count": 1, "micro_cluster_count": 3 },
      "stability_status": "Stable",
      "gravitational_density": 0.08,
      "electromagnetic_break_detected": false,
      "oscillating_field_active": false,
      "luxury_particle_detected": false,
      "active_hyperdimensional_compression": false,
      "quantum_value_multiplier": 1.11
    },
    "radar_axes": [0.61, 0.34, 0.79, 0.46, 0.57, 0.20, 0.08, 0.00],
    "multi_color_palette": {
      "colors": [
        {
          "label": "Red",
          "percentage": 45.2,
          "hex_color": "#ff2d55",
          "semantic": "Maximum attention signal — primal urgency, passion, and biological activation. ..."
        },
        {
          "label": "Brown",
          "percentage": 28.1,
          "hex_color": "#c47c3a",
          "semantic": "Earth-band frequency — organic stability, material comfort, and ancestral grounding. ..."
        },
        {
          "label": "White",
          "percentage": 15.3,
          "hex_color": "#f0f0f0",
          "semantic": "Maximum luminance — open neutral field, spatial authority through void. ..."
        },
        {
          "label": "Black",
          "percentage": 11.4,
          "hex_color": "#1a1a2e",
          "semantic": "Zero-point field — gravitational dominance, maximum depth encoding. ..."
        }
      ],
      "mix": {
        "label": "Harvest Flame",
        "dominant_family": "Earth",
        "semantic": "Earthy warmth and ancestral abundance — the full spectrum of autumnal heat. ..."
      }
    }
  },
  "decoder_output": {
    "status": "DECODE SUCCESSFUL",
    "interpretation": "... | PALETTE: COLOR PALETTE: Red (45.2%) — ... PALETTE MIX (Earth): Harvest Flame — ...",
    "prognosis": "...",
    "field_warnings": []
  },
  "detected_objects": [
    {
      "id": "obj_1",
      "label": "Primary Tone Zone",
      "bounding_box": [0.12, 0.08, 0.88, 0.92],
      "analysis": {
        "dim_5_color": { "..." },
        "dim_9_geometry": { "..." },
        "coherence_score": 0.68,
        "radar_axes": [0.68, 0.79, 0.72, 0.55, 0.40, 0.38, 0.14, 0.00],
        "interpretation": "..."
      }
    }
  ]
}
```

The `radar_axes` array always has exactly 8 elements, ordered:
`[Cognitive Load, Aggressive Focus, Structural Stability, Information Entropy, Calm/Absorption, Quantum Value, Gravitational Pull, Symmetry-Break Vector]`

### `GET /api/health`

Returns system status. Used by the frontend to detect backend availability.

### `GET /api/sectors`

Returns all valid sector mode IDs and their display labels.

---

## 11. Frontend Overview

### Chart Components

| Component | Description |
|---|---|
| `EnergyRadarChart` | 8-axis interactive radar chart with segment-zoom (click any axis to normalise against it) |
| `FrequencyOscilloscope` | Dim-10 impulse waveform rendered as an animated oscilloscope trace |
| `TelemetryPanel` | Live field readout: 8 radar values, QFM flags, takt signature, multi-color palette widget |
| `ImageVisualizer` | Canvas overlay: clickable markers (rings + crosshairs), rhythm lines, bounding boxes |
| `DecoderOutput` | Terminal panel: full semantic text, prognosis, field-warning chips, palette mix block |

### Technology Stack

| Layer | Technology |
|---|---|
| Build tool | Vite 5 + React 18 |
| Styling | Tailwind CSS 3 (JIT) |
| Charts | Chart.js 4 + react-chartjs-2 |
| Font | JetBrains Mono (Google Fonts) |
| HTTP client | Native `fetch` |
| Colour space | All analysis in OpenCV HSV (H: 0–180, S/V: 0–255) |

---

## 12. Screenshots

> *Interface renders in full-dark cyberpunk terminal aesthetic.*

| Upload & Sector Selection | Dimensional Readout | Radar Matrix (zoomed) |
|---|---|---|
| ![Upload Zone](docs/screenshots/upload_zone.png) | ![Decoder Output](docs/screenshots/decoder_output.png) | ![Radar Zoom](docs/screenshots/radar_zoom.png) |

---

## 13. Project Structure

```
hyperdimensional_pattern_decoder/
│
├── main.py                         # FastAPI application entry point (startup only)
│
├── hd_engine/
│   ├── __init__.py
│   ├── analyzer.py                 # Computer-vision pipeline (NumPy / Pillow)
│   ├── translator.py               # Semantic rule engine + sector vocabulary
│   ├── models.py                   # Pydantic data contract (full JSON schema)
│   ├── routes.py                   # FastAPI router (validation + delegation)
│   │
│   └── color/                      # Multi-color palette package (v1.4)
│       ├── __init__.py
│       ├── models.py               # DominantColor, ColorMix, MultiColorPalette
│       ├── text.py                 # Universal per-color semantic texts + hex values
│       ├── detector.py             # MultiColorDetector — top-4 palette extraction
│       └── mix.py                  # ColorMixInterpreter — 28 mix definitions
│
├── frontend/
│   ├── public/
│   │   ├── favicon.svg
│   │   └── favicon.png
│   ├── src/
│   │   ├── main.jsx                # React app root
│   │   ├── App.jsx                 # Top-level layout
│   │   ├── index.css               # Global styles + Tailwind directives
│   │   ├── services/
│   │   │   └── api.js              # Typed API client
│   │   ├── utils/
│   │   │   ├── imageProcessor.js   # Client-side CV helpers (markers, clusters)
│   │   │   └── mockData.js
│   │   └── components/
│   │       ├── UploadZone.jsx
│   │       ├── SectorDropdown.jsx
│   │       ├── DecoderOutput.jsx   # Terminal output + palette mix block
│   │       ├── TelemetryPanel.jsx  # Readouts + MultiColorPaletteWidget
│   │       ├── ImageVisualizer.jsx # Canvas overlay: markers, rhythm, boxes
│   │       └── charts/
│   │           ├── EnergyRadarChart.jsx
│   │           └── FrequencyOscilloscope.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 14. Changelog

### v1.4 — Multi-Color Palette & Interactive Overlay Update

**New features:**
- **Multi-color palette analysis** — top-4 dominant colours with percentage shares and per-colour universal semantic texts
- **28 colour mix definitions** — `ColorMixInterpreter` matches the detected palette against predefined combinations (Living Fire, Harvest Flame, Heartwave, Cosmic Dusk, etc.) and returns the psychological meaning of the combination
- **Clickable markers** — rings (Stabilization Atoms) and crosshairs (Angular Complements) on the image canvas are now clickable; a tooltip shows the marker type, position, gradient magnitude, and role in the geometry classification
- **Rhythm line overlay (TAKT toggle)** — a button in the image panel header toggles vertical dividing lines that visually demonstrate the detected takt rhythm on the image

**Bug fixes:**
- **Red detection corrected** — the Value gate for `red_vivid` pixels was lowered from V ≥ 150 to V ≥ 80 so dark-side shadow areas of red objects (apples, toys) are no longer misclassified as Brown. The Brown classifier now also requires `brown ≥ red` as an additional guard.
- **Blue rings now distributed across the full image** — `findCircleClusters()` previously returned the first N clusters from a top-to-bottom scan, causing rings to cluster at the top. The selection now uses a spatial 3×3 zone grid to distribute rings evenly.

### v1.35 — Hyper-Rhythm & 8-Axis Field Extension

- 8-axis radar chart (added Gravitational Pull and Symmetry-Break Vector axes)
- Cross-axis semantic interaction engine
- HSV-semantic QV correction for nuance scoring
- Sky masking for URBAN_AREA sector

### v1.2 — Quantum Grid & Object-Resonance Update

- Per-object bounding-box detection with individual dimensional sub-analysis
- ColorComboValue (HIGH-VALUE, DYNAMIC-VALUE, INTELLECTUAL-VALUE, LOW-VALUE states)
- Local asymmetry detection and Directed Flow Vector
- Central Focus Override for CARDS/INDIVIDUUM sectors

### v1.1 — Quantum Field Analysis

- Stabilization Atom and Hyperdimensional Cube particle detection
- Gravitational Field, EM-Break, Oscillating Field, Luxury Particle
- Composite Quantum Value multiplier

### v1.0 — Initial Release

- 5-dimensional analysis pipeline (Dim 5–10)
- Sector vocabulary system (5 sectors)
- Canvas overlay with markers and gravitational aura
- 8-axis energy radar chart

---

*Hyperdimensional Pattern Decoder — v1.4 "Multi-Color Palette & Interactive Overlay Update"*
*Built with FastAPI · React · NumPy · Pillow · Tailwind CSS · Chart.js*
