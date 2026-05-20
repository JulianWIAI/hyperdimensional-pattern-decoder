/**
 * mockData.js  —  v1.2
 * Pre-fabricated analysis results for demo / offline mode.
 *
 * v1.1: quantum_field_metrics + field_warnings
 * v1.2: color_combo_value, local_asymmetry, radar_axes (6-axis), detected_objects
 *
 * radar_axes order: [Cognitive Load, Aggression, Calm, Entropy, Structural Stability, Quantum Value]
 */

const now = () => new Date().toISOString();

// ─── Per-sector mock payloads ─────────────────────────────────────────────────

const MOCK_PAYLOADS = {

  // ── INDIVIDUUM ─────────────────────────────────────────────────────────────
  INDIVIDUUM: {
    meta: {
      timestamp: now(),
      sector_mode: 'INDIVIDUUM',
      sector_label: 'Individuum (Look / Apparel)',
      engine_version: '1.2.0',
    },
    dimensions_analysis: {
      dim_5_color: { dominant_frequency: 'Orange', vector_value: 0.71, semantic_state: 'High-Energy Focus' },
      dim_6_8_rhythm: {
        pattern_type: 'Dense stripe / high-frequency texture',
        frequency_takt: '2-2-2',
        coherence_score: 0.82,
        semantic_state: 'High Entropy / Cognitive Load',
      },
      dim_9_geometry: {
        dominant_shape: 'Triangle / Jagged',
        edge_curvature_index: 0.78,
        energy_distribution: 'Singularity Focus at Edge Points',
      },
      dim_10_frequency: { impulse_rate_hz: 14.2, intensity_multiplier: 1.71 },
      symmetry: {
        is_symmetric: false,
        is_susy: true,
        symmetry_score: 0.52,
        semantic_state: 'SUSY Pairing — Perfect Duality, Resistant to Interference',
      },
      quantum_field_metrics: {
        detected_particles: { circle_count: 12, square_count: 31, micro_cluster_count: 124 },
        stability_status: 'Stable',
        gravitational_density: 0.31,
        electromagnetic_break_detected: true,
        oscillating_field_active: false,
        luxury_particle_detected: true,
        active_hyperdimensional_compression: true,
        quantum_value_multiplier: 2.05,
      },
      color_combo_value: {
        label: 'HIGH-VALUE',
        description: 'Absolute structural integrity — maximum value retention and status encoding',
        components: ['Black', 'Silver', 'White'],
      },
      local_asymmetry: {
        detected: true,
        left_curvature: 0.81,
        right_curvature: 0.58,
        asymmetry_delta: 0.23,
        description: 'Dominant angular vector left (0.81) vs compressed field right (0.58) — generates directed rightward flow',
      },
      radar_axes: [0.82, 0.78, 0.22, 0.71, 0.77, 0.82],
      central_focus: {
        central_curvature_index: 0.41,
        effective_curvature_index: 0.53,
        central_focus_override: false,
        override_note: '',
      },
    },
    decoder_output: {
      status: 'DECODE SUCCESSFUL',
      interpretation:
        'The subject channels Orange frequency (Dim-5), which forces an unconscious attention lock ' +
        'from all observers in proximity — the subject cannot be ignored. Dense stripe texture (Dim 6-8) ' +
        'overloads the observer\'s visual cortex, preventing clean threat-assessment. Angular dominance ' +
        '(Dim-9) projects defensive energy. Dim-10 at 14.2 Hz amplifies ×1.71. SUSY pairing confirmed. ' +
        '| QF-ANALYSIS: [WARNING] Electromagnetic Break detected. Luxury Particle triad confirmed — QV ×2.05. ' +
        '| V1.2-ANALYSIS: Color Combo: Black + Silver + White → [HIGH-VALUE]. ' +
        'Local Symmetry Break (Δ=0.23): Dominant angular vector left — directed rightward flow.',
      prognosis:
        'Subject emits an active interference field. Geometry fractures spatial inertia while the dominant ' +
        'frequency commands attention locks from all vectors. ' +
        '[Coherence: 0.82 | Impulse: 14.2 Hz | ×1.71 | QV: ×2.05 | Gravity: 0.31]',
      field_warnings: ['ELECTROMAGNETIC_BREAK', 'LUXURY_PARTICLE_DETECTED', 'HYPERDIMENSIONAL_COMPRESSION', 'COLOR_COMBO_HIGH_VALUE'],
    },
    detected_objects: [
      {
        id: 'obj_1',
        label: 'Subject Alpha (Primary Emitter)',
        bounding_box: [0.18, 0.08, 0.82, 0.92],
        analysis: {
          dim_5_color: { dominant_frequency: 'Orange', vector_value: 0.74, semantic_state: 'High-Energy Focus' },
          dim_9_geometry: { dominant_shape: 'Triangle / Jagged', edge_curvature_index: 0.80, energy_distribution: 'Singularity Focus at Edge Points' },
          coherence_score: 0.84,
          radar_axes: [0.84, 0.80, 0.20, 0.73, 0.74, 0.88],
          interpretation: 'Subject Alpha (Primary Emitter): Orange frequency zone. Angular geometry (curvature 0.80) — high coherence field 0.84. Primary attention-lock emitter — unconscious observer targeting confirmed.',
        },
      },
      {
        id: 'obj_2',
        label: 'Background Matrix (Spatial Anchor)',
        bounding_box: [0.0, 0.0, 1.0, 1.0],
        analysis: {
          dim_5_color: { dominant_frequency: 'Blue', vector_value: 0.44, semantic_state: 'Cognitive Openness' },
          dim_9_geometry: { dominant_shape: 'Circle / Spiral', edge_curvature_index: 0.34, energy_distribution: 'Endless Loop / Energy Containment' },
          coherence_score: 0.31,
          radar_axes: [0.31, 0.34, 0.69, 0.24, 0.78, 0.38],
          interpretation: 'Background Matrix (Spatial Anchor): Blue frequency zone. Round geometry (curvature 0.34) — moderate coherence field 0.31. Passive spatial context field — amplifies subject by contrast.',
        },
      },
    ],
  },

  // ── URBAN_AREA ────────────────────────────────────────────────────────────
  URBAN_AREA: {
    meta: {
      timestamp: now(),
      sector_mode: 'URBAN_AREA',
      sector_label: 'Urban Area (Cities)',
      engine_version: '1.2.0',
    },
    dimensions_analysis: {
      dim_5_color: { dominant_frequency: 'Blue', vector_value: 0.58, semantic_state: 'Cognitive Openness' },
      dim_6_8_rhythm: {
        pattern_type: 'Progressive density gradient — ascending vector field',
        frequency_takt: '1-2-3-4',
        coherence_score: 0.53,
        semantic_state: 'Progressive Vector / Directional Momentum Build-Up',
      },
      dim_9_geometry: {
        dominant_shape: 'Circle / Spiral',
        edge_curvature_index: 0.38,
        energy_distribution: 'Endless Loop / Energy Containment',
      },
      dim_10_frequency: { impulse_rate_hz: 4.1, intensity_multiplier: 1.21 },
      symmetry: {
        is_symmetric: true,
        is_susy: false,
        symmetry_score: 0.78,
        semantic_state: 'Stability Matrix — Predictability and Emotional Stasis',
      },
      quantum_field_metrics: {
        detected_particles: { circle_count: 34, square_count: 28, micro_cluster_count: 67 },
        stability_status: 'Stable',
        gravitational_density: 0.08,
        electromagnetic_break_detected: false,
        oscillating_field_active: true,
        luxury_particle_detected: false,
        active_hyperdimensional_compression: false,
        quantum_value_multiplier: 1.38,
      },
      color_combo_value: {
        label: 'INTELLECTUAL-VALUE',
        description: 'High strategic density, cognitive openness, negotiation interface',
        components: ['Black', 'White', 'Blue'],
      },
      local_asymmetry: {
        detected: false,
        left_curvature: 0.37,
        right_curvature: 0.39,
        asymmetry_delta: 0.02,
        description: '',
      },
      radar_axes: [0.53, 0.38, 0.59, 0.21, 0.75, 0.35],
    },
    decoder_output: {
      status: 'DECODE SUCCESSFUL',
      interpretation:
        'The urban field channels Blue frequency (Dim-5), establishing open negotiation zones in civic space. ' +
        'Progressive density gradient (Dim 6-8) builds directional momentum — ascending vector field confirmed. ' +
        'Circular geometry generates attractor loops. Dim-10 at 4.1 Hz applies ×1.21. Stability Matrix active. ' +
        '| QF-ANALYSIS: 2-3-2-3 Oscillating Field detected — rhythmic spatial charge building. ' +
        '| V1.2-ANALYSIS: Color Combo: Black + White + Blue → [INTELLECTUAL-VALUE]. ' +
        'PROGRESSIVE TAKT 1-2-3-4 — momentum accumulates toward terminal release.',
      prognosis:
        'Urban field projects coherent dominance. Architecture enforces territorial control through ' +
        'calculated spatial authority. ' +
        '[Coherence: 0.53 | Impulse: 4.1 Hz | ×1.21 | QV: ×1.38 | Gravity: 0.08]',
      field_warnings: ['OSCILLATING_FIELD_ACTIVE', 'COLOR_COMBO_INTELLECTUAL_VALUE'],
    },
    detected_objects: [
      {
        id: 'obj_1',
        label: 'Transit Node (Flow Accumulator)',
        bounding_box: [0.05, 0.08, 0.52, 0.88],
        analysis: {
          dim_5_color: { dominant_frequency: 'Blue', vector_value: 0.61, semantic_state: 'Cognitive Openness' },
          dim_9_geometry: { dominant_shape: 'Circle / Spiral', edge_curvature_index: 0.33, energy_distribution: 'Endless Loop / Energy Containment' },
          coherence_score: 0.44,
          radar_axes: [0.44, 0.33, 0.64, 0.19, 0.79, 0.42],
          interpretation: 'Transit Node (Flow Accumulator): Blue frequency zone. Round geometry (curvature 0.33) — moderate coherence 0.44. Pedestrian attractor loop active — dwell time accumulation in progress.',
        },
      },
      {
        id: 'obj_2',
        label: 'Structural Anchor (Territorial Matrix)',
        bounding_box: [0.52, 0.05, 0.97, 0.92],
        analysis: {
          dim_5_color: { dominant_frequency: 'Blue', vector_value: 0.54, semantic_state: 'Cognitive Openness' },
          dim_9_geometry: { dominant_shape: 'Triangle / Jagged', edge_curvature_index: 0.63, energy_distribution: 'Singularity Focus at Edge Points' },
          coherence_score: 0.59,
          radar_axes: [0.59, 0.63, 0.47, 0.30, 0.71, 0.52],
          interpretation: 'Structural Anchor (Territorial Matrix): Blue frequency zone. Angular geometry (curvature 0.63) — high coherence 0.59. Territorial boundary enforcer — spatial hierarchy projection confirmed.',
        },
      },
      {
        id: 'obj_3',
        label: 'Crowd Vector (Kinetic Surge Zone)',
        bounding_box: [0.08, 0.62, 0.92, 0.97],
        analysis: {
          dim_5_color: { dominant_frequency: 'Orange', vector_value: 0.62, semantic_state: 'High-Energy Focus' },
          dim_9_geometry: { dominant_shape: 'Triangle / Jagged', edge_curvature_index: 0.57, energy_distribution: 'Singularity Focus at Edge Points' },
          coherence_score: 0.71,
          radar_axes: [0.71, 0.57, 0.32, 0.52, 0.55, 0.58],
          interpretation: 'Crowd Vector (Kinetic Surge Zone): Orange frequency zone. Angular geometry (curvature 0.57) — high coherence 0.71. Kinetic energy accumulation — pedestrian surge imminent.',
        },
      },
    ],
  },

  // ── STOCKS ────────────────────────────────────────────────────────────────
  STOCKS: {
    meta: {
      timestamp: now(),
      sector_mode: 'STOCKS',
      sector_label: 'Stocks (Financial Markets)',
      engine_version: '1.2.0',
    },
    dimensions_analysis: {
      dim_5_color: { dominant_frequency: 'Orange', vector_value: 0.66, semantic_state: 'High-Energy Focus' },
      dim_6_8_rhythm: {
        pattern_type: 'Maximum stimulation field — beyond saturation threshold',
        frequency_takt: '1-1-1-1',
        coherence_score: 0.97,
        semantic_state: 'Dense Sensory Overload / System Saturation',
      },
      dim_9_geometry: {
        dominant_shape: 'Triangle / Jagged',
        edge_curvature_index: 0.88,
        energy_distribution: 'Singularity Focus at Edge Points',
      },
      dim_10_frequency: { impulse_rate_hz: 13.2, intensity_multiplier: 1.66 },
      symmetry: {
        is_symmetric: false,
        is_susy: false,
        symmetry_score: 0.29,
        semantic_state: 'Asymmetric Field — Dynamic Instability, Unresolved Potential',
      },
      quantum_field_metrics: {
        detected_particles: { circle_count: 8, square_count: 44, micro_cluster_count: 211 },
        stability_status: 'Unstable / Structurally Weakened',
        gravitational_density: 0.28,
        electromagnetic_break_detected: true,
        oscillating_field_active: true,
        luxury_particle_detected: false,
        active_hyperdimensional_compression: true,
        quantum_value_multiplier: 0.86,
      },
      color_combo_value: {
        label: 'LOW-VALUE',
        description: 'Energetic decay, stagnation, value erosion — entropy sink active',
        components: ['Brown', 'Gray', 'Matte-Yellow'],
      },
      local_asymmetry: {
        detected: true,
        left_curvature: 0.44,
        right_curvature: 0.91,
        asymmetry_delta: 0.47,
        description: 'Compressed field left (0.44) vs dominant angular vector right (0.91) — generates directed leftward flow',
      },
      radar_axes: [0.97, 0.88, 0.14, 0.91, 0.18, 0.14],
    },
    decoder_output: {
      status: 'DECODE SUCCESSFUL',
      interpretation:
        'The market signal channels Orange frequency — breakout momentum, FOMO trigger activated. ' +
        'EXTREME TAKT 1-1-1-1 detected — Dense Sensory Overload: observer processing capacity saturated. ' +
        'Sharp angular geometry signals reversal vectors. Dim-10 at 13.2 Hz ×1.66. Asymmetric field: unstable. ' +
        '| QF-ANALYSIS: [CRITICAL] Unstable / Structurally Weakened. [WARNING] Electromagnetic Break. ' +
        '| V1.2-ANALYSIS: Color Combo: Brown + Gray + Matte-Yellow → [LOW-VALUE / ENTROPY-SINK]. ' +
        'Local Symmetry Break (Δ=0.47): directed leftward collapse vector — reversal imminent.',
      prognosis:
        'Market field in high-entropy state. Dense signal interference masks institutional positioning. ' +
        'Volatility cascade likely within 2-3 candle cycles. ' +
        '[Coherence: 0.97 | Impulse: 13.2 Hz | ×1.66 | QV: ×0.86 | Gravity: 0.28]',
      field_warnings: [
        'STRUCTURAL_INSTABILITY', 'ELECTROMAGNETIC_BREAK', 'OSCILLATING_FIELD_ACTIVE',
        'HYPERDIMENSIONAL_COMPRESSION', 'GRAVITATIONAL_DENSITY_CRITICAL', 'ENTROPY_SINK_ACTIVE',
      ],
    },
    detected_objects: [
      {
        id: 'obj_1',
        label: 'Volatility Peak (EM-Break Epicenter)',
        bounding_box: [0.08, 0.02, 0.92, 0.55],
        analysis: {
          dim_5_color: { dominant_frequency: 'Orange', vector_value: 0.69, semantic_state: 'High-Energy Focus' },
          dim_9_geometry: { dominant_shape: 'Triangle / Jagged', edge_curvature_index: 0.91, energy_distribution: 'Singularity Focus at Edge Points' },
          coherence_score: 0.94,
          radar_axes: [0.94, 0.91, 0.12, 0.95, 0.21, 0.16],
          interpretation: 'Volatility Peak (EM-Break Epicenter): Orange frequency zone. Angular geometry (curvature 0.91) — extreme coherence 0.94. Maximum volatility signature — institutional stop-hunt sequence active.',
        },
      },
      {
        id: 'obj_2',
        label: 'Support Zone (Accumulation Node)',
        bounding_box: [0.0, 0.58, 1.0, 1.0],
        analysis: {
          dim_5_color: { dominant_frequency: 'Green', vector_value: 0.48, semantic_state: 'Cognitive Stasis' },
          dim_9_geometry: { dominant_shape: 'Circle / Spiral', edge_curvature_index: 0.29, energy_distribution: 'Endless Loop / Energy Containment' },
          coherence_score: 0.38,
          radar_axes: [0.38, 0.29, 0.66, 0.24, 0.62, 0.31],
          interpretation: 'Support Zone (Accumulation Node): Green frequency zone. Round geometry (curvature 0.29) — moderate coherence 0.38. Institutional accumulation in progress — retail sentiment suppressed.',
        },
      },
    ],
  },

  // ── CARDS ─────────────────────────────────────────────────────────────────
  CARDS: {
    meta: {
      timestamp: now(),
      sector_mode: 'CARDS',
      sector_label: 'Cards (Trading Cards)',
      engine_version: '1.2.0',
    },
    dimensions_analysis: {
      dim_5_color: { dominant_frequency: 'Orange', vector_value: 0.79, semantic_state: 'High-Energy Focus' },
      dim_6_8_rhythm: {
        pattern_type: 'Moderate structured pattern',
        frequency_takt: '3-3-3',
        coherence_score: 0.67,
        semantic_state: 'Balanced Entropy / Transitional',
      },
      dim_9_geometry: {
        dominant_shape: 'Circle / Spiral',
        edge_curvature_index: 0.44,
        energy_distribution: 'Endless Loop / Energy Containment',
      },
      dim_10_frequency: { impulse_rate_hz: 9.8, intensity_multiplier: 1.49 },
      symmetry: {
        is_symmetric: true,
        is_susy: false,
        symmetry_score: 0.69,
        semantic_state: 'Stability Matrix — Predictability and Emotional Stasis',
      },
      quantum_field_metrics: {
        detected_particles: { circle_count: 19, square_count: 22, micro_cluster_count: 88 },
        stability_status: 'Stable',
        gravitational_density: 0.22,
        electromagnetic_break_detected: true,
        oscillating_field_active: false,
        luxury_particle_detected: true,
        active_hyperdimensional_compression: false,
        quantum_value_multiplier: 2.41,
      },
      color_combo_value: {
        label: 'DYNAMIC-VALUE',
        description: 'Explosive expansion, unconscious dominance, immediate breakthrough vector',
        components: ['Black', 'White', 'Orange'],
      },
      local_asymmetry: {
        detected: false,
        left_curvature: 0.43,
        right_curvature: 0.45,
        asymmetry_delta: 0.02,
        description: '',
      },
      radar_axes: [0.67, 0.44, 0.45, 0.49, 0.75, 0.96],
      central_focus: {
        central_curvature_index: 0.28,
        effective_curvature_index: 0.40,
        central_focus_override: true,
        override_note: 'Central zone (0.28) overrides full-frame (0.71): subject classified as round/harmonic despite peripheral angular structure.',
      },
    },
    decoder_output: {
      status: 'DECODE SUCCESSFUL',
      interpretation:
        "The card's visual signal channels Orange frequency — maximum desirability encoding. " +
        'Moderate pattern encodes perceived complexity → elevated value. ' +
        'Central zone override active: subject geometry round/harmonic despite border angular noise. ' +
        '| QF-ANALYSIS: [WARNING] Electromagnetic Break — holo/foil shatters rarity-tier symmetry. ' +
        'Luxury Particle triad confirmed — QV ×2.41 — secondary market premium verified. ' +
        '| V1.2-ANALYSIS: Color Combo: Black + White + Orange → [DYNAMIC-VALUE]. Explosive acquisition impulse vector active.',
      prognosis:
        'Card emits maximum desirability field. High-entropy visual encoding triggers acquisition impulse ' +
        'while geometric structure broadcasts raw power identity. ' +
        '[Coherence: 0.67 | Impulse: 9.8 Hz | ×1.49 | QV: ×2.41 | Gravity: 0.22]',
      field_warnings: ['ELECTROMAGNETIC_BREAK', 'LUXURY_PARTICLE_DETECTED', 'COLOR_COMBO_DYNAMIC_VALUE'],
    },
    detected_objects: [
      {
        id: 'obj_1',
        label: 'Artwork Core (Power Zone)',
        bounding_box: [0.12, 0.10, 0.88, 0.62],
        analysis: {
          dim_5_color: { dominant_frequency: 'Orange', vector_value: 0.82, semantic_state: 'High-Energy Focus' },
          dim_9_geometry: { dominant_shape: 'Circle / Spiral', edge_curvature_index: 0.31, energy_distribution: 'Endless Loop / Energy Containment' },
          coherence_score: 0.63,
          radar_axes: [0.63, 0.31, 0.42, 0.48, 0.81, 0.97],
          interpretation: 'Artwork Core (Power Zone): Orange frequency zone. Round subject geometry (curvature 0.31) — balanced coherence 0.63. Primary desirability emitter — acquisition impulse trigger at maximum.',
        },
      },
      {
        id: 'obj_2',
        label: 'Card Frame (Boundary Matrix)',
        bounding_box: [0.0, 0.0, 1.0, 1.0],
        analysis: {
          dim_5_color: { dominant_frequency: 'Blue', vector_value: 0.38, semantic_state: 'Cognitive Openness' },
          dim_9_geometry: { dominant_shape: 'Triangle / Jagged', edge_curvature_index: 0.84, energy_distribution: 'Singularity Focus at Edge Points' },
          coherence_score: 0.44,
          radar_axes: [0.44, 0.84, 0.38, 0.39, 0.71, 0.72],
          interpretation: 'Card Frame (Boundary Matrix): Angular border structure (curvature 0.84) — authority encoding. Rarity boundary enforcer — collector exclusivity signal active.',
        },
      },
      {
        id: 'obj_3',
        label: 'Foil Element (EM Emitter)',
        bounding_box: [0.28, 0.58, 0.72, 0.88],
        analysis: {
          dim_5_color: { dominant_frequency: 'Orange', vector_value: 0.76, semantic_state: 'High-Energy Focus' },
          dim_9_geometry: { dominant_shape: 'Triangle / Jagged', edge_curvature_index: 0.61, energy_distribution: 'Singularity Focus at Edge Points' },
          coherence_score: 0.72,
          radar_axes: [0.72, 0.61, 0.24, 0.64, 0.58, 0.94],
          interpretation: 'Foil Element (EM Emitter): High-charge visual zone — electromagnetic break epicenter. Holo/foil effect shatters rarity symmetry, elevating card classification to ultra-rare.',
        },
      },
    ],
  },

  // ── TOYS ──────────────────────────────────────────────────────────────────
  TOYS: {
    meta: {
      timestamp: now(),
      sector_mode: 'TOYS',
      sector_label: 'Toys (Play Design)',
      engine_version: '1.2.0',
    },
    dimensions_analysis: {
      dim_5_color: { dominant_frequency: 'Green', vector_value: 0.54, semantic_state: 'Cognitive Stasis' },
      dim_6_8_rhythm: {
        pattern_type: 'Wide-arc oscillating resonance — alternating pressure zones',
        frequency_takt: '4-2-4-2',
        coherence_score: 0.44,
        semantic_state: 'Oscillating Resonance / Cyclical Energy Transfer',
      },
      dim_9_geometry: {
        dominant_shape: 'Circle / Spiral',
        edge_curvature_index: 0.31,
        energy_distribution: 'Endless Loop / Energy Containment',
      },
      dim_10_frequency: { impulse_rate_hz: 3.2, intensity_multiplier: 1.16 },
      symmetry: {
        is_symmetric: true,
        is_susy: false,
        symmetry_score: 0.81,
        semantic_state: 'Stability Matrix — Predictability and Emotional Stasis',
      },
      quantum_field_metrics: {
        detected_particles: { circle_count: 41, square_count: 14, micro_cluster_count: 32 },
        stability_status: 'Stable',
        gravitational_density: 0.04,
        electromagnetic_break_detected: false,
        oscillating_field_active: false,
        luxury_particle_detected: false,
        active_hyperdimensional_compression: false,
        quantum_value_multiplier: 1.28,
      },
      color_combo_value: {
        label: 'NEUTRAL',
        description: 'Standard field composite — no exceptional value state detected',
        components: [],
      },
      local_asymmetry: {
        detected: false,
        left_curvature: 0.30,
        right_curvature: 0.32,
        asymmetry_delta: 0.02,
        description: '',
      },
      radar_axes: [0.44, 0.31, 0.78, 0.16, 0.82, 0.31],
    },
    decoder_output: {
      status: 'DECODE SUCCESSFUL',
      interpretation:
        'The play object channels Green frequency — calm play state triggered. Oscillating 4-2-4-2 resonance ' +
        'detected in visual rhythm — cyclical energy transfer between broad and narrow pressure zones. ' +
        'Round geometry activates nurture/exploration encoding. Dim-10 at 3.2 Hz applies ×1.16. Stability Matrix active. ' +
        '| QF-ANALYSIS: Quantum field nominal — no critical events detected. ' +
        '| V1.2-ANALYSIS: OSCILLATING TAKT 4-2-4-2 — wide-arc resonance cycling for sustained engagement.',
      prognosis:
        'Design projects focused engagement authority. Sparse stimulation encoding extends session duration ' +
        'and triggers deep imaginative states in the target subject. ' +
        '[Coherence: 0.44 | Impulse: 3.2 Hz | ×1.16 | QV: ×1.28 | Gravity: 0.04]',
      field_warnings: [],
    },
    detected_objects: [
      {
        id: 'obj_1',
        label: 'Primary Form (Core Attractor)',
        bounding_box: [0.18, 0.08, 0.82, 0.88],
        analysis: {
          dim_5_color: { dominant_frequency: 'Green', vector_value: 0.57, semantic_state: 'Cognitive Stasis' },
          dim_9_geometry: { dominant_shape: 'Circle / Spiral', edge_curvature_index: 0.26, energy_distribution: 'Endless Loop / Energy Containment' },
          coherence_score: 0.38,
          radar_axes: [0.38, 0.26, 0.82, 0.14, 0.85, 0.34],
          interpretation: 'Primary Form (Core Attractor): Green frequency zone. Round geometry (curvature 0.26) — low coherence 0.38. Nurture/exploration encoding active — cooperative play behaviour triggered.',
        },
      },
      {
        id: 'obj_2',
        label: 'Color Zone (Frequency Emitter)',
        bounding_box: [0.04, 0.04, 0.96, 0.38],
        analysis: {
          dim_5_color: { dominant_frequency: 'Green', vector_value: 0.51, semantic_state: 'Cognitive Stasis' },
          dim_9_geometry: { dominant_shape: 'Circle / Spiral', edge_curvature_index: 0.35, energy_distribution: 'Endless Loop / Energy Containment' },
          coherence_score: 0.42,
          radar_axes: [0.42, 0.35, 0.74, 0.22, 0.78, 0.44],
          interpretation: 'Color Zone (Frequency Emitter): Green frequency zone. Round geometry (curvature 0.35) — moderate coherence 0.42. Visual engagement extension zone — session duration amplifier active.',
        },
      },
    ],
  },
};

/**
 * Returns a mock AnalysisResult for the given sector mode.
 * Timestamps are regenerated on each call so the UI always shows "live" data.
 *
 * @param {string} sectorMode
 * @returns {object} AnalysisResult
 */
export function getMockData(sectorMode) {
  const payload = MOCK_PAYLOADS[sectorMode] ?? MOCK_PAYLOADS.INDIVIDUUM;
  return {
    ...payload,
    meta: { ...payload.meta, timestamp: now() },
  };
}
