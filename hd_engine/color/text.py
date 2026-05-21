"""
hd_engine/color/text.py
Universal (sector-independent) semantic texts and hex colors for each detected color.

Used by MultiColorDetector to annotate each DominantColor entry.
Each entry is (semantic_text, hex_css_color).
"""

# Maps color label -> (semantic_description, css_hex_color)
_COLOR_DATA: dict[str, tuple[str, str]] = {
    "Red": (
        "Maximum attention signal — primal urgency, passion, and biological activation. "
        "Commands immediate focus and elevates physiological arousal. The frequency of "
        "life force, visceral emotion, and the will to act.",
        "#ff2d55",
    ),
    "Orange": (
        "Thermal frequency — creative warmth, social energy, and optimistic stimulation. "
        "The color of active engagement, appetite, and momentum. Bridges passion "
        "and intellect in a single radiant band of approachable heat.",
        "#ff6b1a",
    ),
    "Yellow": (
        "Luminance peak — cognitive clarity, optimism, and maximum signal visibility. "
        "Activates mental alertness and communicates open positivity. The frequency "
        "of sunlight, conscious awareness, and the courage to be seen.",
        "#ffdd00",
    ),
    "Brown": (
        "Earth-band frequency — organic stability, material comfort, and ancestral grounding. "
        "Evokes soil, bark, and the sensory world of natural textures. The frequency "
        "of rootedness, enduring presence, and things that have stood the test of time.",
        "#c47c3a",
    ),
    "Green": (
        "Biological resonance — growth, renewal, and the intelligence of living systems. "
        "Signals safety, abundance, and regenerative potential. The fundamental "
        "frequency of nature, biological life, and the promise of what grows next.",
        "#00cc66",
    ),
    "Cyan": (
        "Interface field — analytical clarity at transitions, technological precision, "
        "and calm forward momentum. Signals clean systems thinking, the intelligence "
        "of boundaries, and fluid adaptation to changing conditions.",
        "#00d4ff",
    ),
    "Blue": (
        "Cognitive depth — introspection, trust, and spatial expansion. "
        "The frequency of open thought, reliable structure, and emotional regulation. "
        "Induces calm, facilitates long-range planning, and signals trustworthiness.",
        "#3b82f6",
    ),
    "Violet": (
        "Prestige signal — subliminal authority, spiritual depth, and transformative potential. "
        "Bridges the material and the transcendent. Commands respect through rarity, "
        "depth of field, and the weight of the uncommon.",
        "#a855f7",
    ),
    "Pink": (
        "Soft attractor — emotional warmth, approachability, and low-threat aesthetic appeal. "
        "Signals vulnerability transformed into strength, tenderness, and social invitation. "
        "The frequency of affection, care, and the beauty of the near.",
        "#ff69b4",
    ),
    "Black": (
        "Zero-point field — gravitational dominance, maximum depth encoding, "
        "and absolute contrast anchor. Absorbs all other frequencies and amplifies "
        "surrounding colors. The color of authority through silence and depth through absence.",
        "#1a1a2e",
    ),
    "White": (
        "Maximum luminance — open neutral field, spatial authority through void, "
        "and pure potential. Reflects all frequencies equally; signals clarity, "
        "beginning, and the absence of distortion. The color of open possibility.",
        "#f0f0f0",
    ),
}


def get_color_semantic(label: str) -> str:
    """Return the universal semantic description for the given color label."""
    entry = _COLOR_DATA.get(label)
    return entry[0] if entry else "Unclassified spectral field — no semantic mapping available."


def get_color_hex(label: str) -> str:
    """Return a representative CSS hex color string for the given label."""
    entry = _COLOR_DATA.get(label)
    return entry[1] if entry else "#888888"
