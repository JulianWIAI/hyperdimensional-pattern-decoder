"""
hd_engine/models.py  —  v1.2
Pydantic data models — defines the complete JSON schema for the analysis pipeline.

v1.1 additions: ParticleCount, QuantumFieldMetrics, field_warnings, CentralFocusAnalysis
v1.2 additions (Quantum Grid & Object-Resonance Update):
  - ColorComboValue   : Combinatorial color state (HIGH-VALUE, DYNAMIC-VALUE, etc.)
  - LocalAsymmetry    : Geometric left/right asymmetry detection (directed flow)
  - ObjectAnalysis    : Per-object mini dimensional analysis with 6-axis radar
  - DetectedObject    : Detected region with bounding box + ObjectAnalysis
  - DimensionsAnalysis carries color_combo_value, local_asymmetry, radar_axes (6 values)
  - AnalysisResult carries detected_objects list
"""

from typing import Any, Dict, Optional
from pydantic import BaseModel, Field


# ─────────────────────────────────────────────────────────────────────────────
# v1.0  Dimensional sub-models  (unchanged)
# ─────────────────────────────────────────────────────────────────────────────

class Dim5Color(BaseModel):
    """Dimension 5 — Color / Base Potential."""

    dominant_frequency: str = Field(
        ...,
        description=(
            "Broad color family used for vocabulary lookup and sector scoring: "
            "Orange | Green | Blue"
        ),
    )
    color_label: str = Field(
        ...,
        description=(
            "Specific detected hue: Yellow | Orange | Brown | Pink | "
            "Green | Cyan | Blue | Violet"
        ),
    )
    vector_value: float = Field(..., ge=0.0, le=1.0, description="Normalised 0-1 intensity")
    semantic_state: str = Field(..., description="Human-readable dimensional state")


class Dim68Rhythm(BaseModel):
    """Dimensions 6-8 — Rhythm / Texture Pattern Density."""

    pattern_type: str = Field(..., description="Qualitative description of texture pattern")
    frequency_takt: str = Field(
        ..., description="Takt signature: 2-2-2 (dense) | 3-3-3 (medium) | 5-5-5 (sparse)"
    )
    coherence_score: float = Field(..., ge=0.0, le=1.0)
    semantic_state: str


class Dim9Geometry(BaseModel):
    """Dimension 9 — Geometry / Energy Distribution."""

    dominant_shape: str = Field(..., description="Triangle/Jagged or Circle/Spiral")
    edge_curvature_index: float = Field(
        ..., ge=0.0, le=1.0, description="0=perfectly round, 1=maximally angular"
    )
    energy_distribution: str


class Dim10Frequency(BaseModel):
    """Dimension 10 — Frequency / Impulse Rate."""

    impulse_rate_hz: float = Field(..., ge=0.0, description="Mapped impulse frequency in Hz")
    intensity_multiplier: float = Field(
        ..., ge=1.0, description="Scalar amplification applied to Dim-5 and Dim-9 vectors"
    )


class SymmetryAnalysis(BaseModel):
    """Bilateral symmetry and SUSY pairing results."""

    is_symmetric: bool = Field(..., description="True when symmetry score > 0.65")
    is_susy: bool = Field(..., description="True when SUSY pairing detected (0.40-0.65)")
    symmetry_score: float = Field(..., ge=0.0, le=1.0)
    semantic_state: str


# ─────────────────────────────────────────────────────────────────────────────
# v1.1  Quantum Field sub-models  (NEW)
# ─────────────────────────────────────────────────────────────────────────────

class ParticleCount(BaseModel):
    """
    Topological elementary-particle census extracted from the visual field.
    Maps directly to the Formeninteraktion rule-set:
      circle_count   → Stabilization Atoms
      square_count   → Hyperdimensional Cubes
      micro_cluster_count → Micro-form density detected near rectangular zones
    """

    circle_count: int = Field(..., ge=0, description="Detected circular / smooth regions (Stabilization Atoms)")
    square_count: int = Field(..., ge=0, description="Detected rectangular / rectilinear regions (Hyperdimensional Cubes)")
    micro_cluster_count: int = Field(..., ge=0, description="Micro-form density found in the proximity of rectangular zones")


class QuantumFieldMetrics(BaseModel):
    """
    v1.1 — Quantum Field Analysis payload.

    Encodes all new physico-mathematical findings:
      • Topological particle interactions (circles ↔ complements, squares ↔ micro-forms)
      • Visual field theory (Black gravity, Yellow EM-break, oscillating 2-3-2-3 takt)
      • Luxury Particle detection (Black + Silver + White = High-Value multiplier)
    """

    # ── Particle topology ─────────────────────────────────────────────────────
    detected_particles: ParticleCount

    # ── System stability ──────────────────────────────────────────────────────
    stability_status: str = Field(
        ...,
        description="'Stable' | 'Unstable / Structurally Weakened' — "
                    "a Stabilization Atom without a complementary element is structurally weakened",
    )

    # ── Gravitational / colour fields ─────────────────────────────────────────
    gravitational_density: float = Field(
        ..., ge=0.0, le=1.0,
        description="Fraction of dark/black pixels — measures Gravitational Field strength",
    )
    electromagnetic_break_detected: bool = Field(
        ...,
        description="True when Yellow/jagged EM-field signature exceeds threshold "
                    "— signals imminent symmetry collapse or trend reversal",
    )
    oscillating_field_active: bool = Field(
        ...,
        description="True when alternating 2-3-2-3 density rhythm is detected "
                    "— mathematically charges the field, triggering a high-energy colour shift",
    )

    # ── Luxury Particles (High-Value quantum combo) ───────────────────────────
    luxury_particle_detected: bool = Field(
        ...,
        description="True when Black + Silver + White are simultaneously present "
                    "— multiplies the steganographic base value",
    )
    active_hyperdimensional_compression: bool = Field(
        ...,
        description="True when a rectangular zone is surrounded by dense micro-forms "
                    "— indicates Active Hyperdimensional Compression / High Information Density",
    )

    # ── Composite quantum value ───────────────────────────────────────────────
    quantum_value_multiplier: float = Field(
        ..., ge=0.5,
        description="Composite QV multiplier: base 1.0 boosted by luxury particle, "
                    "SUSY pairing, and structural stability; penalised by instability",
    )


# ─────────────────────────────────────────────────────────────────────────────
# v1.2  New sub-models (Quantum Grid & Object-Resonance Update)
# ─────────────────────────────────────────────────────────────────────────────

class ColorComboValue(BaseModel):
    """
    Combinatorial color state — specific multi-tone combinations that carry
    distinct steganographic value signatures beyond single-channel dominance.
    """

    label: str = Field(
        ...,
        description=(
            "HIGH-VALUE | DYNAMIC-VALUE | INTELLECTUAL-VALUE | "
            "LOW-VALUE | NEUTRAL"
        ),
    )
    description: str = Field(..., description="Semantic meaning of this combo state")
    components: list[str] = Field(
        default_factory=list,
        description="Color components detected (e.g. ['Black', 'Silver', 'White'])",
    )


class LocalAsymmetry(BaseModel):
    """
    Left/right geometric asymmetry within a single visual field.
    When detected, declares a 'Directed Flow Vector' — spatial tension
    between the dominant side and the compressed side.
    """

    detected: bool
    left_curvature: float = Field(..., ge=0.0, le=1.0, description="FFT curvature index — left half")
    right_curvature: float = Field(..., ge=0.0, le=1.0, description="FFT curvature index — right half")
    asymmetry_delta: float = Field(..., ge=0.0, le=1.0, description="Absolute difference between halves")
    description: str = Field(default="", description="Human-readable directed-flow description")


class ObjectAnalysis(BaseModel):
    """
    Lightweight per-object dimensional analysis.
    Covers Dim 5 and Dim 9 computed on the object's bounding-box crop,
    plus a pre-computed 6-axis radar vector and a steganographic interpretation.
    """

    dim_5_color: Dim5Color
    dim_9_geometry: Dim9Geometry
    coherence_score: float = Field(..., ge=0.0, le=1.0, description="Texture coherence of the region")
    radar_axes: list[float] = Field(
        ...,
        description=(
            "8-axis radar values ["
            "Cognitive Load, Aggressive Focus, Structural Stability, Information Entropy, "
            "Calm/Absorption, Quantum Value, Gravitational Pull, Symmetry-Break Vector"
            "]"
        ),
    )
    interpretation: str = Field(..., description="Per-object steganographic text")


class DetectedObject(BaseModel):
    """
    A visually significant region detected within the image.
    Carries a sector-specific label, normalised bounding box, and full ObjectAnalysis.
    """

    id: str = Field(..., description="Unique object identifier (obj_1, obj_2, …)")
    label: str = Field(..., description="Sector-specific semantic label for this region")
    bounding_box: list[float] = Field(
        ...,
        description="[x1, y1, x2, y2] as image-dimension ratios in [0, 1]",
    )
    analysis: ObjectAnalysis


# ─────────────────────────────────────────────────────────────────────────────
# v1.2  Central Focus sub-model  (Bug 3 fix — unchanged)
# ─────────────────────────────────────────────────────────────────────────────

class CentralFocusAnalysis(BaseModel):
    """
    Central-zone geometry override for CARDS and INDIVIDUUM sectors.
    Prevents card-frame / border edges from misclassifying a round subject as angular.
    Only present when sector_mode is CARDS or INDIVIDUUM.
    """

    central_curvature_index: float = Field(
        ..., ge=0.0, le=1.0,
        description="FFT edge-curvature index computed on the central 1/3 zone only",
    )
    effective_curvature_index: float = Field(
        ..., ge=0.0, le=1.0,
        description="Weighted blend (center×2 + full×1) / 3",
    )
    central_focus_override: bool = Field(
        ...,
        description="True when the central zone result overrides the full-frame classification",
    )
    override_note: str = Field(
        default="",
        description="Human-readable explanation of the override decision",
    )


# ─────────────────────────────────────────────────────────────────────────────
# Container models
# ─────────────────────────────────────────────────────────────────────────────

class DimensionsAnalysis(BaseModel):
    """Complete dimensional analysis payload — v1.0 + v1.1 quantum field + v1.2 extended analysis."""

    dim_5_color: Dim5Color
    dim_6_8_rhythm: Dim68Rhythm
    dim_9_geometry: Dim9Geometry
    dim_10_frequency: Dim10Frequency
    symmetry: SymmetryAnalysis
    quantum_field_metrics: QuantumFieldMetrics                      # v1.1
    central_focus: Optional[CentralFocusAnalysis] = Field(          # v1.2 (Bug-3 fix)
        default=None,
        description="Present only for CARDS and INDIVIDUUM sectors",
    )
    color_combo_value: Optional[ColorComboValue] = Field(           # v1.2
        default=None,
        description="Combinatorial multi-tone value state",
    )
    local_asymmetry: Optional[LocalAsymmetry] = Field(              # v1.2
        default=None,
        description="Left/right geometric asymmetry analysis",
    )
    radar_axes: list[float] = Field(                                # v1.35
        default_factory=list,
        description=(
            "8-axis radar values ["
            "Cognitive Load, Aggressive Focus, Structural Stability, Information Entropy, "
            "Calm/Absorption, Quantum Value, Gravitational Pull, Symmetry-Break Vector"
            "]"
        ),
    )


class DecoderOutput(BaseModel):
    """Final steganographic interpretation, prognosis, and active field warnings."""

    status: str = Field(default="DECODE SUCCESSFUL")
    interpretation: str
    prognosis: str
    field_warnings: list[str] = Field(
        default_factory=list,
        description="v1.1 — Active quantum-field alerts (EM break, instability, compression)",
    )


class AnalysisResult(BaseModel):
    """Root response model — matches the project JSON contract exactly."""

    meta: Dict[str, Any] = Field(
        ..., description="Request metadata: timestamp, sector_mode, sector_label, engine_version"
    )
    dimensions_analysis: DimensionsAnalysis
    decoder_output: DecoderOutput
    detected_objects: list[DetectedObject] = Field(     # v1.2
        default_factory=list,
        description="Array of significant visual regions with per-object sub-analysis",
    )
