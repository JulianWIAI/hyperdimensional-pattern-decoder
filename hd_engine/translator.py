"""
hd_engine/translator.py  —  v1.1
Semantic rule engine — maps raw dimensional vectors to steganographic text.

v1.0 base: per-sector vocabulary for colour, rhythm, geometry, symmetry.
v1.1 additions:
  • Quantum-field vocabulary block per sector (gravity, EM-break, luxury, compression)
  • _build_quantum_notes() — generates ordered field-warning and insight lines
  • _build_field_warnings() — extracts machine-readable warning tags
  • build_result() now wires QuantumFieldMetrics into DimensionsAnalysis
"""

from datetime import datetime, timezone

from hd_engine.models import (
    AnalysisResult,
    CentralFocusAnalysis,
    ColorComboValue,
    DecoderOutput,
    DimensionsAnalysis,
    Dim5Color,
    Dim68Rhythm,
    Dim9Geometry,
    Dim10Frequency,
    LocalAsymmetry,
    QuantumFieldMetrics,
    SymmetryAnalysis,
)

# ─────────────────────────────────────────────────────────────────────────────
# v1.0  Sector vocabulary blocks (unchanged)
# ─────────────────────────────────────────────────────────────────────────────

SECTOR_VOCABULARY: dict[str, dict[str, str]] = {
    "URBAN_AREA": {
        "label": "Urban Area (Cities)",
        "subject": "the urban field",
        "color_green": (
            "generates cognitive inertia in pedestrian flows — "
            "suppresses urgency, slows transit behaviour"
        ),
        "color_orange": (
            "injects unconscious urgency into crowd movement — "
            "accelerates footfall, triggers alert navigation"
        ),
        "color_blue": (
            "establishes open negotiation zones in civic space — "
            "increases dwell time and collaborative behaviour"
        ),
        "pattern_dense": (
            "creates high-frequency visual interference across the social matrix, "
            "overloading wayfinding cognition"
        ),
        "pattern_sparse": (
            "broadcasts dominant spatial authority — "
            "the environment enforces navigational hierarchy through negative space"
        ),
        "shape_angular": (
            "accelerates pedestrian throughput and enforces territorial boundary encoding"
        ),
        "shape_round": (
            "generates attractor loops — increases dwell time and masks directional control"
        ),
        "prognosis_high": (
            "Urban field emits a high-entropy pressure wave. "
            "Subject spaces generate unconscious behavioural urgency in transit populations."
        ),
        "prognosis_low": (
            "Urban field projects coherent dominance. "
            "The architecture enforces territorial control through calculated spatial authority."
        ),
        # v1.1 quantum vocabulary
        "qf_gravity_high": (
            "Black-zone Gravitational Fields at critical density — "
            "spatial curvature traps pedestrian trajectories in closed attractor loops"
        ),
        "qf_em_break": (
            "[WARNING] Electromagnetic Break detected — "
            "high-charge signal ruptures navigational symmetry, "
            "triggering unpredictable crowd bifurcation"
        ),
        "qf_luxury": (
            "Luxury Particle triad (Black/Silver/White) confirmed — "
            "spatial prestige encoding multiplies perceived territorial authority"
        ),
        "qf_unstable": (
            "[CRITICAL] Stabilization Atoms present without structural complement — "
            "urban field structurally weakened, attractor loops risk collapse"
        ),
        "qf_compression": (
            "Hyperdimensional Compression active — "
            "rectangular zones accumulate micro-form density, "
            "compressing navigational information into high-density nodes"
        ),
        "qf_oscillating": (
            "2-3-2-3 Oscillating Field detected — "
            "rhythmic spatial charge builds toward imminent high-energy pedestrian surge"
        ),
    },

    "INDIVIDUUM": {
        "label": "Individuum (Look / Apparel)",
        "subject": "the subject",
        "color_green": (
            "suppresses reactivity in observers, projects invisible authority — "
            "the subject becomes the dominant stable node in the environment"
        ),
        "color_orange": (
            "forces an unconscious attention lock from all observers in proximity — "
            "the subject cannot be ignored"
        ),
        "color_blue": (
            "signals approachability and open cognitive bandwidth — "
            "observers unconsciously enter negotiation mode"
        ),
        "pattern_dense": (
            "overloads the observer's visual cortex, creating a noise-field "
            "that prevents clean threat-assessment of the subject"
        ),
        "pattern_sparse": (
            "broadcasts calculated control and methodical power — "
            "every element in the field has been deliberately placed"
        ),
        "shape_angular": (
            "projects defensive and dynamic energy — "
            "triggers elevated alert and respect responses in observers"
        ),
        "shape_round": (
            "dampens ambient aggression and redirects observer attention inward — "
            "the subject controls the room by removing threat perception"
        ),
        "prognosis_high": (
            "Subject emits an active interference field. "
            "The geometry fractures spatial inertia while the dominant frequency "
            "commands attention locks from all vectors."
        ),
        "prognosis_low": (
            "Subject projects coherent authority. "
            "The sparse pattern broadcasts dominance, enforcing subliminal deference in observers."
        ),
        # v1.1 quantum vocabulary
        "qf_gravity_high": (
            "Black-zone Gravitational Field bends the observer's perceptual space — "
            "all nearby visual elements are drawn toward the subject's field centre"
        ),
        "qf_em_break": (
            "[WARNING] Electromagnetic Break detected — "
            "high-charge element ruptures the observer's cognitive symmetry, "
            "forcing involuntary attention re-routing to the subject"
        ),
        "qf_luxury": (
            "Luxury Particle triad (Black/Silver/White) confirmed — "
            "quantum value multiplier active: perceived status elevated beyond observable field"
        ),
        "qf_unstable": (
            "[CRITICAL] Stabilization Atom without complement detected — "
            "subject's visual field is structurally weakened, "
            "observer threat-assessment becomes unpredictable"
        ),
        "qf_compression": (
            "Hyperdimensional Compression active — "
            "rectangular design elements accumulate micro-detail, "
            "encoding maximum information density into minimum visual space"
        ),
        "qf_oscillating": (
            "2-3-2-3 Oscillating Field detected in textural rhythm — "
            "field mathematically charges surrounding space, "
            "triggering imminent high-energy colour-field shift in observer perception"
        ),
    },

    "STOCKS": {
        "label": "Stocks (Financial Markets)",
        "subject": "the market signal",
        "color_green": (
            "indicates consolidation phase — "
            "institutional accumulation in progress, retail sentiment suppressed"
        ),
        "color_orange": (
            "signals active breakout momentum — "
            "retail FOMO trigger activated, volume spike imminent"
        ),
        "color_blue": (
            "represents open liquidity zone — "
            "institutions building positions across multiple price levels"
        ),
        "pattern_dense": (
            "high-volatility signature detected — "
            "algorithmic noise masking directional intent from retail participants"
        ),
        "pattern_sparse": (
            "low-volatility coiling pattern identified — "
            "stored kinetic energy approaching directional release threshold"
        ),
        "shape_angular": (
            "sharp reversal vectors present — "
            "momentum shift probability elevated, stop-hunt sequence possible"
        ),
        "shape_round": (
            "parabolic continuation pattern active — "
            "energy cycling through accumulation loop before next impulse leg"
        ),
        "prognosis_high": (
            "Market field in high-entropy state. "
            "Dense signal interference masks institutional positioning. "
            "Volatility cascade likely within 2-3 candle cycles."
        ),
        "prognosis_low": (
            "Market field in coherent structure. "
            "Sparse pattern indicates institutional control. "
            "Directional momentum building toward high-probability release event."
        ),
        # v1.1 quantum vocabulary
        "qf_gravity_high": (
            "Black-zone Gravitational Field dominant — "
            "price action compressed into high-density attractor zone, "
            "breakout energy accumulating below surface"
        ),
        "qf_em_break": (
            "[WARNING] Electromagnetic Break detected — "
            "symmetry collapse imminent, immediate market volatility bespoken, "
            "radical trend reversal within 1-3 sessions"
        ),
        "qf_luxury": (
            "Luxury Particle triad (Black/Silver/White) confirmed — "
            "institutional-grade signal quality: quantum value multiplier elevates "
            "signal reliability above noise threshold"
        ),
        "qf_unstable": (
            "[CRITICAL] Stabilization Atom without complement — "
            "market structure is unstable, support/resistance zones lack confirmation, "
            "false breakout probability elevated"
        ),
        "qf_compression": (
            "Hyperdimensional Compression active — "
            "chart pattern accumulates micro-structure detail, "
            "signalling institutional order-block formation at current price level"
        ),
        "qf_oscillating": (
            "2-3-2-3 Oscillating Field in volume/price rhythm — "
            "field charges toward explosive directional release, "
            "monitor for high-momentum candle within next 2 cycles"
        ),
    },

    "CARDS": {
        "label": "Cards (Trading Cards)",
        "subject": "the card's visual signal",
        "color_green": (
            "encodes perceived rarity suppression — "
            "creates collector stasis, reduces impulse-purchase velocity"
        ),
        "color_orange": (
            "maximum desirability encoding active — "
            "triggers acquisition impulse and competitive collector behaviour"
        ),
        "color_blue": (
            "encodes meta-game strategic value — "
            "signals utility-driven demand over aesthetic demand"
        ),
        "pattern_dense": (
            "high-information density artwork — "
            "perceived complexity correlates directly with elevated perceived card value"
        ),
        "pattern_sparse": (
            "clean power statement design — "
            "negative space signals rarity authority and collector exclusivity"
        ),
        "shape_angular": (
            "dynamic energy encoding — "
            "high combat/power-role visual language, triggers competitive play identity"
        ),
        "shape_round": (
            "support/defence role encoding — "
            "loop energy visual language, triggers utility-identification in player"
        ),
        "prognosis_high": (
            "Card emits maximum desirability field. "
            "High-entropy visual encoding triggers acquisition impulse "
            "while geometric structure broadcasts raw power identity."
        ),
        "prognosis_low": (
            "Card projects rarity authority. "
            "Clean pattern broadcast creates perceived exclusivity, "
            "enforcing collector deference and secondary market premium."
        ),
        # v1.1 quantum vocabulary
        "qf_gravity_high": (
            "Black-zone Gravitational Field curves collector perception — "
            "dark background compresses visual elements, amplifying perceived depth and rarity"
        ),
        "qf_em_break": (
            "[WARNING] Electromagnetic Break detected — "
            "high-charge visual element (gold foil / holo effect encoded) "
            "shatters rarity-tier symmetry, elevating card to ultra-rare classification"
        ),
        "qf_luxury": (
            "Luxury Particle triad (Black/Silver/White) confirmed — "
            "High-Value quantum state active: card's steganographic base value multiplied, "
            "secondary market premium encoding verified"
        ),
        "qf_unstable": (
            "[CRITICAL] Stabilization Atom without complement — "
            "design field structurally weakened: circular elements lack anchoring geometry, "
            "perceived power-level inconsistency may reduce collector confidence"
        ),
        "qf_compression": (
            "Hyperdimensional Compression active — "
            "rectangular card frame accumulates micro-detail layers, "
            "encoding maximum lore/power information into standard card dimensions"
        ),
        "qf_oscillating": (
            "2-3-2-3 Oscillating Field in artwork rhythm — "
            "visual field mathematically charged, triggering an imminent "
            "colour-shift impulse that forces sustained collector attention"
        ),
    },

    "TOYS": {
        "label": "Toys (Play Design)",
        "subject": "the play object",
        "color_green": (
            "triggers calm play state — "
            "reduces aggressive play patterns, extends session duration"
        ),
        "color_orange": (
            "maximum engagement trigger — "
            "elevates play energy, creativity, and social interaction"
        ),
        "color_blue": (
            "activates imaginative and constructive play mode — "
            "increases narrative complexity in play behaviour"
        ),
        "pattern_dense": (
            "high stimulation design — "
            "accelerates attention cycling, prevents sustained focus but maximises novelty"
        ),
        "pattern_sparse": (
            "focused play design — "
            "extends engagement duration per session and deepens problem-solving behaviour"
        ),
        "shape_angular": (
            "action/conflict play encoding — "
            "triggers competitive and goal-directed behaviour patterns"
        ),
        "shape_round": (
            "nurture/exploration play encoding — "
            "triggers cooperative and empathetic behaviour patterns"
        ),
        "prognosis_high": (
            "Design emits maximum engagement field. "
            "High-frequency stimulation prevents disengagement "
            "while geometric encoding triggers active high-energy play states."
        ),
        "prognosis_low": (
            "Design projects focused engagement authority. "
            "Sparse stimulation encoding extends session duration "
            "and triggers deep imaginative states in the target subject."
        ),
        # v1.1 quantum vocabulary
        "qf_gravity_high": (
            "Black-zone Gravitational Field present — "
            "dark zones create perceptual depth, amplifying the toy's sense of mystery "
            "and exploratory potential in the child's cognitive space"
        ),
        "qf_em_break": (
            "[WARNING] Electromagnetic Break detected — "
            "high-contrast element ruptures play-session symmetry, "
            "triggering a sharp attention reset and re-engagement spike"
        ),
        "qf_luxury": (
            "Luxury Particle triad (Black/Silver/White) confirmed — "
            "premium material-quality encoding active: "
            "quantum value multiplier signals collectible or high-end play tier"
        ),
        "qf_unstable": (
            "[CRITICAL] Stabilization Atom without complement — "
            "design field structurally weakened: "
            "circular soft elements lack anchoring geometry, "
            "risking play-session disengagement through lack of challenge structure"
        ),
        "qf_compression": (
            "Hyperdimensional Compression active — "
            "rectangular design frame accumulates micro-detail features, "
            "maximising play-narrative information density"
        ),
        "qf_oscillating": (
            "2-3-2-3 Oscillating Field in visual rhythm — "
            "play-object mathematically charges the environment, "
            "building toward a high-energy play-state transition"
        ),
    },
}


# ─────────────────────────────────────────────────────────────────────────────
# v1.0  Internal text builders (unchanged)
# ─────────────────────────────────────────────────────────────────────────────

def _build_interpretation(
    dim5: Dim5Color,
    dim68: Dim68Rhythm,
    dim9: Dim9Geometry,
    dim10: Dim10Frequency,
    symmetry: SymmetryAnalysis,
    vocab: dict,
) -> str:
    """Assembles the v1.0 steganographic interpretation sentence."""
    # Yellow and Brown share the warm-tone vocabulary entry (color_orange) because
    # their steganographic *category* is warm-urgency — the semantic_state string
    # already carries the hue-specific nuance (Yellow Frequency, Earth-Band).
    color_key = {
        "Orange": "color_orange",
        "Yellow": "color_orange",
        "Brown":  "color_orange",
        "Pink":   "color_orange",
        "Green":  "color_green",
        "Cyan":   "color_blue",
        "Blue":   "color_blue",
        "Violet": "color_blue",
    }.get(dim5.color_label, "color_blue")

    pattern_effect = (
        vocab["pattern_dense"] if "2-2-2" in dim68.frequency_takt else vocab["pattern_sparse"]
    )
    shape_key = (
        "shape_angular"
        if any(t in dim9.dominant_shape for t in ("Triangle", "Jagged"))
        else "shape_round"
    )

    freq_note = (
        f"Dim-10 impulse rate {dim10.impulse_rate_hz} Hz amplifies all vectors "
        f"by ×{dim10.intensity_multiplier:.2f}."
    )

    if symmetry.is_susy:
        sym_note = (
            " SUSY pairing confirmed: opposing dimensional vectors cancel mutual interference — "
            "system exhibits extreme structural resilience."
        )
    elif symmetry.is_symmetric:
        sym_note = (
            " Stability Matrix active: bilateral symmetry enforces emotional stasis "
            "and environmental predictability."
        )
    else:
        sym_note = (
            " Asymmetric field detected: unresolved dynamic potential energy — "
            "directional output vector remains unstable."
        )

    # Use the specific color_label (e.g. "Yellow", "Brown") in the output sentence;
    # fall back to dominant_frequency for legacy data without the field.
    display_freq = getattr(dim5, "color_label", dim5.dominant_frequency)
    return (
        f"{vocab['subject'].capitalize()} channels {display_freq} "
        f"frequency (Dim-5), which {vocab[color_key]}. "
        f"The rhythm matrix (Dim 6-8) presents a {dim68.pattern_type}, "
        f"which {pattern_effect}. "
        f"Geometric analysis (Dim-9) reveals {dim9.dominant_shape} dominance — "
        f"{vocab[shape_key]}. "
        f"{freq_note}"
        f"{sym_note}"
    )


def _build_prognosis(
    dim68: Dim68Rhythm,
    dim10: Dim10Frequency,
    qfm: QuantumFieldMetrics,
    vocab: dict,
) -> str:
    """Selects the sector-specific prognosis and appends v1.1 QV metrics."""
    is_high_energy = "2-2-2" in dim68.frequency_takt or dim10.impulse_rate_hz > 8.0
    base = vocab["prognosis_high"] if is_high_energy else vocab["prognosis_low"]

    metrics = (
        f" [Coherence: {dim68.coherence_score:.2f} | "
        f"Impulse: {dim10.impulse_rate_hz} Hz | "
        f"×{dim10.intensity_multiplier:.2f} | "
        f"QV: ×{qfm.quantum_value_multiplier:.2f} | "
        f"Gravity: {qfm.gravitational_density:.2f}]"
    )
    return base + metrics


# ─────────────────────────────────────────────────────────────────────────────
# v1.1  Quantum field text builders (NEW)
# ─────────────────────────────────────────────────────────────────────────────

def _build_quantum_notes(qfm: QuantumFieldMetrics, vocab: dict) -> str:
    """
    Generates the v1.1 quantum-field insight paragraph.
    Lines are ordered by severity: warnings first, then opportunities, then status.
    """
    lines: list[str] = []

    # ── Warnings (highest priority) ────────────────────────────────────────────
    if "Unstable" in qfm.stability_status:
        lines.append(vocab["qf_unstable"])

    if qfm.electromagnetic_break_detected:
        lines.append(vocab["qf_em_break"])

    # ── Active field conditions ────────────────────────────────────────────────
    if qfm.oscillating_field_active:
        lines.append(vocab["qf_oscillating"])

    if qfm.gravitational_density > 0.15:
        lines.append(vocab["qf_gravity_high"])

    if qfm.active_hyperdimensional_compression:
        lines.append(vocab["qf_compression"])

    # ── Positive amplifiers ────────────────────────────────────────────────────
    if qfm.luxury_particle_detected:
        lines.append(vocab["qf_luxury"])

    # ── Particle census footnote ───────────────────────────────────────────────
    p = qfm.detected_particles
    lines.append(
        f"Particle census — Stabilization Atoms: {p.circle_count} | "
        f"Hyperdimensional Cubes: {p.square_count} | "
        f"Micro-form clusters: {p.micro_cluster_count}."
    )

    return " // ".join(lines) if lines else "Quantum field nominal — no critical events detected."


def _build_field_warnings(qfm: QuantumFieldMetrics) -> list[str]:
    """
    Extracts machine-readable warning tags for the DecoderOutput.field_warnings list.
    Frontend components use these to trigger visual alert states.
    """
    warnings: list[str] = []
    if "Unstable" in qfm.stability_status:
        warnings.append("STRUCTURAL_INSTABILITY")
    if qfm.electromagnetic_break_detected:
        warnings.append("ELECTROMAGNETIC_BREAK")
    if qfm.oscillating_field_active:
        warnings.append("OSCILLATING_FIELD_ACTIVE")
    if qfm.active_hyperdimensional_compression:
        warnings.append("HYPERDIMENSIONAL_COMPRESSION")
    if qfm.luxury_particle_detected:
        warnings.append("LUXURY_PARTICLE_DETECTED")
    if qfm.gravitational_density > 0.25:
        warnings.append("GRAVITATIONAL_DENSITY_CRITICAL")
    return warnings


# ─────────────────────────────────────────────────────────────────────────────
# v1.2  Per-sector object labels (for detect_objects())
# ─────────────────────────────────────────────────────────────────────────────

SECTOR_OBJECT_LABELS: dict[str, list[str]] = {
    "URBAN_AREA": [
        "Transit Node (Flow Accumulator)",
        "Structural Anchor (Territorial Matrix)",
        "Crowd Vector (Kinetic Surge Zone)",
    ],
    "INDIVIDUUM": [
        "Subject Alpha (Primary Emitter)",
        "Secondary Field (Peripheral Zone)",
        "Background Matrix (Spatial Anchor)",
    ],
    "STOCKS": [
        "Volatility Peak (EM-Break Epicenter)",
        "Support Zone (Accumulation Node)",
        "Resistance Level (Rejection Vector)",
    ],
    "CARDS": [
        "Artwork Core (Power Zone)",
        "Card Frame (Boundary Matrix)",
        "Foil Element (EM Emitter)",
    ],
    "TOYS": [
        "Primary Form (Core Attractor)",
        "Color Zone (Frequency Emitter)",
        "Interaction Field (Secondary Node)",
    ],
}


# ─────────────────────────────────────────────────────────────────────────────
# v1.2  Supplemental text builders (Color Combo, Local Asymmetry, Complex Rhythm)
# ─────────────────────────────────────────────────────────────────────────────

def _build_color_combo_note(combo: ColorComboValue) -> str:
    if combo.label == "NEUTRAL" or not combo.components:
        return ""
    tag_map = {
        "HIGH-VALUE":          "[HIGH-VALUE]",
        "DYNAMIC-VALUE":       "[DYNAMIC-VALUE]",
        "INTELLECTUAL-VALUE":  "[INTELLECTUAL-VALUE]",
        "LOW-VALUE":           "[LOW-VALUE / ENTROPY-SINK]",
    }
    tag = tag_map.get(combo.label, "")
    parts = " + ".join(combo.components)
    return f"Color Combo: {parts} → {tag} — {combo.description}."


def _build_local_asymmetry_note(asym: LocalAsymmetry) -> str:
    if not asym.detected:
        return ""
    return f"Local Symmetry Break detected (Δ={asym.asymmetry_delta:.2f}): {asym.description}."


def _build_extended_rhythm_note(dim68: Dim68Rhythm) -> str:
    """
    Returns a human-readable note for complex or special takt signatures.
    Returns empty string for standard tiers (2-2-2, 3-3-3, 4-4-4, 5-5-5).
    """
    notes = {
        "1-1-1-1": (
            "SINGULARITY IMPULSE TAKT 1-1-1-1 — Dense sensory overload: "
            "observer processing capacity saturated, cognitive threshold breached."
        ),
        "1-2-3-4": (
            "PROGRESSIVE ACCELERATION TAKT 1-2-3-4 — Ascending vector field: "
            "density builds directionally, momentum accumulates toward terminal release."
        ),
        "4-2-4-2": (
            "OSCILLATING RESONANCE TAKT 4-2-4-2 — Wide-arc resonance: "
            "cyclical energy transfer between broad and narrow pressure zones."
        ),
        "1-1-2-3": (
            "FIBONACCI HARMONIC TAKT 1-1-2-3 — Natural fractal scaling: "
            "density progression follows the Fibonacci sequence, encoding unconscious "
            "aesthetic resonance and elevated luxury perception."
        ),
        "0-0-0-0": (
            "ABSOLUTE STASIS TAKT 0-0-0-0 — Rhythmic null state: "
            "complete absence of density modulation, energetic ground zero — "
            "maximum compression preceding next impulse."
        ),
    }
    return notes.get(dim68.frequency_takt, "")


# ─────────────────────────────────────────────────────────────────────────────
# v1.28  QV nuance adjuster & nuanced semantic note builder
# ─────────────────────────────────────────────────────────────────────────────

def _adjust_qv_for_nuance(
    qfm: QuantumFieldMetrics,
    dim5: Dim5Color,
    dim9: Dim9Geometry,
    dim68: Dim68Rhythm,
    color_combo: "ColorComboValue | None",
    edge_density: float = 0.0,
    sector_mode: str = "",
) -> float:
    """
    v1.29 — HSV-semantic-driven QV correction.

    Priority order:
      1. Holographic foil (EM-break + luxury + angular geometry) → floor 2.85
      2. CARDS sector: per-semantic dynamic QV —
           Earth-Band / Stasis Field        → clamp [0.25, 0.45]
           High-Luminance Resonance         → coherence-weighted mid range [0.70, 1.80]
           Gold Frequency / Warm-Spectrum   → slightly above neutral [0.90, 1.65]
           Attack Vector + high edges       → fire-energy push ≥ 2.85
      3. Generic muted/earthy (any sector, no luxury) → clamp [0.25, 0.45]
      4. No match → return raw QV unchanged
    """
    qv       = qfm.quantum_value_multiplier
    semantic = dim5.semantic_state.lower()
    curv     = dim9.edge_curvature_index

    # ── 1. Holographic foil ────────────────────────────────────────────────────
    if qfm.electromagnetic_break_detected and qfm.luxury_particle_detected and curv > 0.52:
        return round(max(qv, 2.85), 3)

    # ── 2. CARDS sector — semantic-driven dynamic QV ───────────────────────────
    if sector_mode == "CARDS":
        # Earth-band / stasis field: muted earthy tones suppress steganographic value
        if "earth-band" in semantic or "stasis field" in semantic:
            return round(max(0.25, min(qv, 0.45)), 3)

        # High-luminance yellow: coherence-weighted, never exceeds 1.80
        if "high-luminance resonance" in semantic:
            base = 0.85 + dim68.coherence_score * 0.60 + (1.0 - curv) * 0.30
            return round(min(max(base, 0.70), 1.80), 3)

        # Gold frequency / warm-spectrum composite
        if "gold frequency" in semantic or "warm-spectrum" in semantic:
            base = 1.00 + dim68.coherence_score * 0.50
            return round(min(base, 1.65), 3)

        # High-energy orange / fire attack vector — edge-density gated
        if "attack vector" in semantic or "high-energy focus" in semantic:
            if edge_density > 0.28:
                return round(max(qv, 2.85), 3)
            if edge_density > 0.18:
                return round(max(qv, 1.90), 3)

    # ── 3. Generic muted / earthy suppression (any sector) ────────────────────
    is_muted = (
        (color_combo is not None and color_combo.label == "LOW-VALUE")
        or any(kw in semantic for kw in (
            "muted", "earthy", "thermal baseline", "warm thermal",
            "subdued", "earth-band", "stasis field",
        ))
    )
    if is_muted and not qfm.luxury_particle_detected:
        return round(max(0.25, min(qv, 0.45)), 3)

    return round(qv, 3)


def _build_nuance_note(dim5: Dim5Color, adjusted_qv: float, base_qv: float) -> str:
    """
    Generates a short nuanced terminal note keyed to the HSV semantic state.
    Returns empty string when no noteworthy nuance is present.
    """
    semantic = dim5.semantic_state.lower()
    lines: list[str] = []

    if "high-luminance resonance" in semantic:
        lines.append("Yellow Frequency / High-Luminance Resonance — stable energy field, maximum visibility without aggression peak")
    elif "gold frequency" in semantic or "warm-spectrum" in semantic:
        lines.append("Gold Frequency active — Wealth-Attractor encoded, status multiplier elevated")
    elif "earth-band" in semantic or "stasis field" in semantic:
        lines.append("Earth-Band / Stasis Field active — entropy sink: transmission radius minimised, value bracket [×0.25–×0.45] enforced")
    elif "pink-band" in semantic or "pink" in semantic:
        lines.append("Pink-Band / Magenta Interference — quantum aesthetic distortion field: low-threat attractor, high captive rate")
    elif "cyan resonance" in semantic:
        lines.append("Cyan boundary field active — negotiation layer open, interface frequency maximised")
    elif "indigo" in semantic or "prestige" in semantic:
        lines.append("Indigo depth field — subliminal authority layer engaged, deep dominance stratum active")
    elif "orange-pink" in semantic:
        lines.append("Orange-Pink Composite — Dual-Channel Attention Command: thermal urgency fused with aesthetic capture")
    elif "muted" in semantic or "thermal baseline" in semantic:
        lines.append("Muted earth state — thermal baseline suppressed, entropy sink active")

    if adjusted_qv != base_qv:
        direction = "elevated" if adjusted_qv > base_qv else "suppressed"
        lines.append(
            f"QV-Nuance adjustment: ×{base_qv:.2f} → ×{adjusted_qv:.2f} "
            f"({direction} by visual field signature)"
        )

    return " // ".join(lines)


# ─────────────────────────────────────────────────────────────────────────────
# v1.2  Central-zone geometry selector — Bug 3 fix
# ─────────────────────────────────────────────────────────────────────────────

_CENTRAL_WEIGHT_SECTORS: frozenset[str] = frozenset({"CARDS", "INDIVIDUUM"})


def _select_effective_geometry(
    dim9: Dim9Geometry,
    central_dim9: Dim9Geometry,
    sector_mode: str,
) -> tuple[Dim9Geometry, CentralFocusAnalysis | None]:
    """
    For CARDS and INDIVIDUUM: blend central-zone (weight ×2) with full-frame (weight ×1).
    When the central zone is clearly rounder than the full frame (central < 0.45 vs full > 0.60),
    the subject's true shape overrides the border/text-edge noise.

    Returns:
        (effective_dim9, CentralFocusAnalysis | None) — None for other sectors.
    """
    if sector_mode not in _CENTRAL_WEIGHT_SECTORS:
        return dim9, None

    full_idx    = dim9.edge_curvature_index
    central_idx = central_dim9.edge_curvature_index
    effective_idx = round((central_idx * 2 + full_idx * 1) / 3, 3)
    effective_idx = min(effective_idx, 1.0)

    # Override trigger: central is harmonious but full-frame is angular (card frame effect)
    override = central_idx < 0.45 and full_idx > 0.60

    if override:
        effective = Dim9Geometry(
            dominant_shape=central_dim9.dominant_shape,
            edge_curvature_index=effective_idx,
            energy_distribution=central_dim9.energy_distribution,
        )
        note = (
            f"Central zone ({central_idx:.2f}) overrides full-frame ({full_idx:.2f}): "
            f"subject classified as round/harmonic despite peripheral angular structure."
        )
    else:
        shape = "Triangle / Jagged" if effective_idx > 0.55 else "Circle / Spiral"
        dist  = "Singularity Focus at Edge Points" if effective_idx > 0.55 else "Endless Loop / Energy Containment"
        effective = Dim9Geometry(
            dominant_shape=shape,
            edge_curvature_index=effective_idx,
            energy_distribution=dist,
        )
        note = ""

    return effective, CentralFocusAnalysis(
        central_curvature_index=central_idx,
        effective_curvature_index=effective_idx,
        central_focus_override=override,
        override_note=note,
    )


# ─────────────────────────────────────────────────────────────────────────────
# v1.35  8-Axis Interaction Note
# ─────────────────────────────────────────────────────────────────────────────

def _build_axis_interaction_note(radar_axes: list[float], dim68: Dim68Rhythm) -> str:
    """
    Detects notable cross-axis combinations in the 8-axis Energy Distribution Matrix
    and returns a concise interaction description.

    Axis index reference:
      0 Cognitive Load  1 Aggressive Focus  2 Structural Stability  3 Information Entropy
      4 Calm/Absorption 5 Quantum Value     6 Gravitational Pull    7 Symmetry-Break Vector

    Returns empty string when no noteworthy interaction is detected (avoids noise for
    standard, unexceptional field states).
    """
    if len(radar_axes) < 8:
        return ""

    cog, aggr, stab, ent, calm, qv, grav, sym_break = radar_axes
    takt  = dim68.frequency_takt
    lines: list[str] = []

    # Absolute stasis + high entropy → system completely throttled
    if takt == "0-0-0-0" and ent > 0.55:
        lines.append(
            "[AXIS LOCK] Stasis×Entropy coupling — rhythmic null-state amplified by "
            "high information disorder: system output suppressed to minimum"
        )

    # Progressive acceleration + high QV + high gravitational pull → peak attention trigger
    if takt == "1-2-3-4" and qv > 0.65 and grav > 0.20:
        lines.append(
            "[AXIS PEAK] Progressive Acceleration × Quantum Value × Gravitational Pull — "
            "triple-vector convergence: maximum observer attention command active"
        )

    # Fibonacci harmonic + high calm + low aggression → unconscious luxury field
    if takt == "1-1-2-3" and calm > 0.55 and aggr < 0.40:
        lines.append(
            "[AXIS HARMONY] Fibonacci Harmonic × Calm Absorption — "
            "natural aesthetic resonance field: unconscious luxury attractor engaged"
        )

    # High symmetry-break + high aggression → directed flow tension
    if sym_break > 0.18 and aggr > 0.55:
        lines.append(
            f"[AXIS TENSION] Symmetry-Break Vector ({sym_break:.2f}) × Aggressive Focus ({aggr:.2f}) — "
            "directed flow tension: spatial energy locked in angular divergence"
        )

    # High aggression + low structural stability → collapse risk
    if aggr > 0.65 and stab < 0.40:
        lines.append(
            "[AXIS RISK] Aggressive Focus × Low Structural Stability — "
            "angular energy without anchor: collapse vector probability elevated"
        )

    # Oscillating resonance + high calm + low aggression → hypnotic hold
    if takt == "4-2-4-2" and calm > 0.50 and aggr < 0.35:
        lines.append(
            "[AXIS LOCK] Oscillating Resonance × Calm Absorption — "
            "hypnotic hold field: sustained observer attention without aggression peak"
        )

    # Singularity impulse + very high cognitive load → cognitive overload confirmed
    if takt == "1-1-1-1" and cog > 0.70:
        lines.append(
            "[AXIS OVERLOAD] Singularity Impulse × Cognitive Load — "
            "sensory overload threshold breached: observer processing capacity exceeded"
        )

    return " | ".join(lines)


# ─────────────────────────────────────────────────────────────────────────────
# Public API
# ─────────────────────────────────────────────────────────────────────────────

def build_result(analysis_data: dict, sector_mode: str, analyzer=None) -> AnalysisResult:
    """
    Main translation entry point.

    Args:
        analysis_data: raw dict returned by HyperdimensionalAnalyzer.run_full_analysis()
        sector_mode:   one of URBAN_AREA | INDIVIDUUM | STOCKS | CARDS | TOYS

    Returns:
        Fully populated AnalysisResult (v1.1) ready for JSON serialisation.
    """
    # v1.3: use the analyzer's resolved sector (may differ from the caller's
    # sector_mode when auto-correction fired, e.g. INDIVIDUUM → CARDS).
    effective_sector: str = analysis_data.get("resolved_sector_mode") or sector_mode
    vocab = SECTOR_VOCABULARY.get(effective_sector, SECTOR_VOCABULARY["INDIVIDUUM"])

    dim5: Dim5Color              = analysis_data["dim5"]
    dim68: Dim68Rhythm           = analysis_data["dim68"]
    dim9: Dim9Geometry           = analysis_data["dim9"]
    dim10: Dim10Frequency        = analysis_data["dim10"]
    symmetry: SymmetryAnalysis   = analysis_data["symmetry"]
    qfm: QuantumFieldMetrics     = analysis_data["quantum_field"]
    central_dim9: Dim9Geometry   = analysis_data.get("central_dim9", dim9)
    color_combo: ColorComboValue = analysis_data.get("color_combo")
    local_asym: LocalAsymmetry   = analysis_data.get("local_asymmetry")
    radar_axes: list[float]      = analysis_data.get("radar_axes", [])
    edge_density: float          = analysis_data.get("edge_density", 0.0)
    sky_masked: bool             = analysis_data.get("sky_masked", False)

    # Bug-3 fix: central-zone weighting for CARDS / INDIVIDUUM (uses resolved sector)
    effective_dim9, central_focus = _select_effective_geometry(dim9, central_dim9, effective_sector)

    # v1.29 — HSV-semantic QV correction (must run before text builders that reference QV).
    # Save base_qv BEFORE model_copy so the prognosis append check remains accurate
    # (after model_copy, qfm.quantum_value_multiplier == adjusted_qv, making a direct
    # comparison always False and silencing the [QV-ADJ] suffix — this fixes that bug).
    base_qv: float  = qfm.quantum_value_multiplier
    adjusted_qv     = _adjust_qv_for_nuance(
        qfm, dim5, effective_dim9, dim68, color_combo,
        edge_density=edge_density,
        sector_mode=effective_sector,
    )
    nuance_note = _build_nuance_note(dim5, adjusted_qv, base_qv)

    # Patch qfm and radar_axes[5] so every consumer sees the corrected QV.
    # radar_axes[5] is the Quantum Value axis — position unchanged in v1.35 8-axis layout.
    if adjusted_qv != base_qv:
        qfm = qfm.model_copy(update={"quantum_value_multiplier": adjusted_qv})
        if radar_axes:
            radar_axes = list(radar_axes)
            radar_axes[5] = round(min(max((adjusted_qv - 0.5) / 2.5, 0.0), 1.0), 3)

    # Compose interpretation: v1.0 base + v1.1 quantum notes + v1.2 combo/asymmetry
    #   + v1.28 nuance + v1.35 8-axis interaction note
    base_interpretation = _build_interpretation(dim5, dim68, effective_dim9, dim10, symmetry, vocab)
    quantum_notes       = _build_quantum_notes(qfm, vocab)
    combo_note          = _build_color_combo_note(color_combo) if color_combo else ""
    asym_note           = _build_local_asymmetry_note(local_asym) if local_asym else ""
    rhythm_note         = _build_extended_rhythm_note(dim68)
    axis_note           = _build_axis_interaction_note(radar_axes, dim68)

    extra_notes = " ".join(n for n in [combo_note, asym_note, rhythm_note, nuance_note, axis_note] if n)
    full_interpretation = (
        f"{base_interpretation} | QF-ANALYSIS: {quantum_notes}"
        + (f" | V1.35-NUANCE: {extra_notes}" if extra_notes else "")
    )

    prognosis      = _build_prognosis(dim68, dim10, qfm, vocab)
    # Append adjusted QV note when the nuance corrector changed the raw value
    if adjusted_qv != base_qv:
        prognosis += f" [QV-ADJ: ×{adjusted_qv:.2f}]"
    field_warnings = _build_field_warnings(qfm)

    # v1.2 — colour combo field warnings
    if color_combo and color_combo.label == "LOW-VALUE":
        field_warnings.append("ENTROPY_SINK_ACTIVE")
    if color_combo and color_combo.label in ("HIGH-VALUE", "DYNAMIC-VALUE", "INTELLECTUAL-VALUE"):
        field_warnings.append(f"COLOR_COMBO_{color_combo.label.replace('-', '_')}")

    # v1.3 — sector auto-correction flag
    if effective_sector != sector_mode:
        field_warnings.append(f"SECTOR_AUTOCORRECTED_{sector_mode}_TO_{effective_sector}")

    # v1.3 — sky masking flag (URBAN_AREA)
    if sky_masked:
        field_warnings.append("SKY_MASK_APPLIED")

    # v1.2 — per-object detection (only if analyzer instance is provided)
    detected_objects = []
    if analyzer is not None:
        # Use effective_sector for correct object labels
        obj_labels = SECTOR_OBJECT_LABELS.get(effective_sector, SECTOR_OBJECT_LABELS["INDIVIDUUM"])
        detected_objects = analyzer.detect_objects(effective_sector, obj_labels)

    return AnalysisResult(
        meta={
            "timestamp":             datetime.now(timezone.utc).isoformat(),
            "sector_mode":           sector_mode,            # original user selection
            "resolved_sector_mode":  effective_sector,       # possibly auto-corrected
            "sector_label":          vocab["label"],
            "engine_version":        "1.3.0",
            "sky_mask_applied":      sky_masked,
        },
        dimensions_analysis=DimensionsAnalysis(
            dim_5_color=dim5,
            dim_6_8_rhythm=dim68,
            dim_9_geometry=effective_dim9,
            dim_10_frequency=dim10,
            symmetry=symmetry,
            quantum_field_metrics=qfm,
            central_focus=central_focus,
            color_combo_value=color_combo,
            local_asymmetry=local_asym,
            radar_axes=radar_axes,
        ),
        decoder_output=DecoderOutput(
            status="DECODE SUCCESSFUL",
            interpretation=full_interpretation,
            prognosis=prognosis,
            field_warnings=field_warnings,
        ),
        detected_objects=detected_objects,
    )
