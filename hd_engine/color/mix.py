"""
hd_engine/color/mix.py
ColorMixInterpreter — matches a detected color palette to a predefined semantic
combination and returns a ColorMix instance.

Each _MixDefinition encodes:
  colors       — frozenset of color labels that must be present
  min_present  — minimum number of those colors that must appear in the top-4 palette
  label        — short poetic name for the combination
  semantic     — full psychological / energetic description (English)
  family       — broad category: Warm | Cool | Earth | Contrast | Neutral | Spiritual | Luxury

Matching runs in priority order (most specific first: 4-color > 3-color > 2-color).
The first matching definition wins.  A generic fallback fires when nothing matches.
"""

from dataclasses import dataclass

from .models import ColorMix


@dataclass(frozen=True)
class _MixDefinition:
    colors: frozenset
    min_present: int
    label: str
    semantic: str
    family: str


# ─── Mix catalogue — 4-color definitions ─────────────────────────────────────

_MIX_CATALOGUE: tuple[_MixDefinition, ...] = (

    # ── 4-color mixes ────────────────────────────────────────────────────────

    _MixDefinition(
        colors=frozenset({"Red", "Orange", "Yellow", "Green"}),
        min_present=4,
        label="Living Fire",
        family="Warm",
        semantic=(
            "Passion fueled by growth — a palette that encodes warmth, love, and biological renewal "
            "in a single field. Red commands visceral attention and ignites the life force; "
            "Orange bridges emotion and creative energy in a socially warm band; Yellow opens the "
            "mind to optimism and luminant clarity; Green grounds the entire palette in nature, "
            "biology, and the intelligence of living systems. "
            "This combination invites the observer to think of beloved people in natural settings — "
            "love in bloom, summer afternoons, the aliveness of genuine connection. The warmth is "
            "not abstract: it is rooted in something growing, breathing, and real."
        ),
    ),
    _MixDefinition(
        colors=frozenset({"Red", "Orange", "Yellow", "Brown"}),
        min_present=4,
        label="Harvest Flame",
        family="Earth",
        semantic=(
            "Earthy warmth and ancestral abundance — the full spectrum of autumnal heat. "
            "Red ignites passion and urgency; Orange radiates sociable creative warmth; "
            "Yellow illuminates with cognitive clarity and luminant optimism; Brown grounds "
            "everything in soil, bark, and organic material. "
            "Together they evoke harvest seasons, the smell of wood fires, the comfort of home, "
            "and warmth that has been earned through seasons of effort. This palette activates "
            "a deep longing for rootedness, belonging, and the nourishment of things that endure. "
            "It is the color of memory, family tables, and the satisfaction of abundance."
        ),
    ),
    _MixDefinition(
        colors=frozenset({"Red", "Orange", "Brown", "Green"}),
        min_present=4,
        label="Forest Ember",
        family="Earth",
        semantic=(
            "Primal intensity grounded in earth and nature — the palette of decay and rebirth. "
            "Red brings urgency and life force; Orange sustains creative heat; Brown anchors "
            "in organic stability and terrestrial matter; Green signals biological renewal and "
            "the intelligence of living ecosystems. "
            "This mix encodes the cyclical intelligence of natural environments — destruction "
            "that feeds new growth, passion rooted in soil, the fire that clears the forest "
            "floor so new life can emerge. It is raw, ancestral, and ultimately generative."
        ),
    ),
    _MixDefinition(
        colors=frozenset({"Blue", "Cyan", "Violet", "Pink"}),
        min_present=4,
        label="Cosmic Dusk",
        family="Spiritual",
        semantic=(
            "Introspective depth meeting soft creative power — the palette of twilight consciousness. "
            "Blue opens the mind to vast inner space and cognitive depth; Cyan marks the precise "
            "boundaries of analytical clarity; Violet elevates into the spiritual, the rare, and "
            "the prestigious; Pink softens authority into tenderness and emotional warmth. "
            "This mix signals a field of deep emotional intelligence and artistic sensitivity — "
            "the quiet power of the interior world, where rigor meets vulnerability and authority "
            "becomes approachable. It is the palette of the most sophisticated forms of feeling."
        ),
    ),
    _MixDefinition(
        colors=frozenset({"Green", "Blue", "Cyan", "White"}),
        min_present=4,
        label="Arctic Waters",
        family="Cool",
        semantic=(
            "Pure expansion and biological clarity — the palette of open systems in clean environments. "
            "Green carries life-force and renewal; Blue opens cognitive space to depth and reflection; "
            "Cyan marks precise analytical boundaries at transitions; White declares empty potential "
            "and the luminant void of pure beginning. "
            "This mix signals cleanliness, precision, and a field optimised for thought and "
            "regeneration — scientific, calm, and healing. It is the visual frequency of "
            "laboratories, freshwater environments, and minds working at the edge of their clarity."
        ),
    ),
    _MixDefinition(
        colors=frozenset({"Black", "White", "Blue", "Violet"}),
        min_present=4,
        label="Midnight Realm",
        family="Luxury",
        semantic=(
            "Maximum depth meets intellectual authority — the architecture of the subconscious mind. "
            "Black provides the gravitational anchor and absorbs all light; White creates the "
            "luminant contrast that makes depth visible; Blue opens the cognitive field to "
            "vastness and strategic distance; Violet adds spiritual elevation and prestige. "
            "This palette encodes hidden power, sophisticated authority, and the kind of "
            "intelligence that does not need to announce itself. It is the color of the night "
            "sky, of rare minerals, and of knowledge that took decades to accumulate."
        ),
    ),
    _MixDefinition(
        colors=frozenset({"Red", "Blue", "Violet", "Black"}),
        min_present=4,
        label="Dark Tension",
        family="Contrast",
        semantic=(
            "Primal power in shadow — suppressed intensity with maximum dramatic charge. "
            "Red generates raw urgency and the life force of desire; Blue introduces "
            "intellectual distance and strategic calm; Violet deepens into spiritual authority "
            "and transformative potential; Black amplifies everything through gravitational weight. "
            "This palette encodes unresolved conflict, hidden ambition, and the kind of energy "
            "that precedes major transformation. It is the frequency of decisive moments, "
            "of power that has not yet been released."
        ),
    ),
    _MixDefinition(
        colors=frozenset({"Yellow", "Orange", "White", "Green"}),
        min_present=4,
        label="Spring Bloom",
        family="Warm",
        semantic=(
            "Luminant optimism meeting biological freshness — a field of expansive, energising renewal. "
            "Yellow illuminates with cognitive clarity and the warmth of full sunlight; Orange "
            "radiates social energy and creative stimulation; White declares open potential and "
            "the purity of beginning; Green grounds in natural growth and biological intelligence. "
            "This palette encodes new beginnings, morning light on fresh leaves, and the optimism "
            "of systems that are actively regenerating. It is the visual frequency of spring "
            "itself — full of promise and the energy of what is just starting."
        ),
    ),

    # ── 3-color mixes ────────────────────────────────────────────────────────

    _MixDefinition(
        colors=frozenset({"Red", "Orange", "Yellow"}),
        min_present=3,
        label="Solar Impulse",
        family="Warm",
        semantic=(
            "Pure warm-spectrum energy — the highest concentration of stimulating frequencies. "
            "Red fires urgency and passion; Orange sustains creative heat and social warmth; "
            "Yellow radiates cognitive clarity and maximum luminance. Together they form the "
            "palette of the sun at peak intensity — optimistic, dominant, and impossible to ignore. "
            "This combination is the visual frequency of attention itself: everything that commands "
            "the observer to look, engage, and respond without hesitation."
        ),
    ),
    _MixDefinition(
        colors=frozenset({"Red", "Orange", "Brown"}),
        min_present=3,
        label="Autumn Ember",
        family="Earth",
        semantic=(
            "Grounded warmth and nostalgic richness — the palette of the hearth and harvest. "
            "Red brings the spark of life force and urgent passion; Orange sustains the social "
            "glow of creative warmth; Brown anchors everything in organic earth, material stability, "
            "and the quiet dignity of things that have aged well. "
            "This mix evokes late afternoon light through autumn leaves, the smell of soil after "
            "rain, and the comfort of spaces that hold memory. It is warmth with weight — "
            "the kind that has been earned through seasons of experience."
        ),
    ),
    _MixDefinition(
        colors=frozenset({"Orange", "Yellow", "Green"}),
        min_present=3,
        label="Tropical Growth",
        family="Warm",
        semantic=(
            "Vital, expansive, and full of biological intelligence — the palette of thriving systems. "
            "Orange radiates creative warmth and social energy; Yellow opens the cognitive field "
            "with luminant clarity; Green signals the underlying intelligence of living organisms "
            "and the promise of continuous renewal. "
            "Together they encode abundance, exotic richness, and environments where life propagates "
            "freely and joyfully. It is the frequency of places where heat and biology meet — "
            "jungles, markets, creative studios full of growing ideas."
        ),
    ),
    _MixDefinition(
        colors=frozenset({"Green", "Blue", "Cyan"}),
        min_present=3,
        label="Ocean Breath",
        family="Cool",
        semantic=(
            "Biological intelligence meets spatial openness — calm, analytical, and regenerative. "
            "Green carries the intelligence of living systems and biological renewal; Blue opens "
            "the cognitive field to depth and strategic reflection; Cyan navigates the precise "
            "boundary between them — the interface where life meets clarity. "
            "This palette encodes healing, scientific precision, and the peace found in "
            "natural bodies of water. It is the visual frequency of places that restore: "
            "the coastline, the forest clearing, the laboratory after a breakthrough."
        ),
    ),
    _MixDefinition(
        colors=frozenset({"Blue", "Violet", "Pink"}),
        min_present=3,
        label="Creative Twilight",
        family="Spiritual",
        semantic=(
            "Intuitive depth blending with soft expressive power — the palette of artistic sensitivity. "
            "Blue holds the cognitive architecture and intellectual depth; Violet elevates toward "
            "the spiritual, the prestigious, and the transformative; Pink opens the emotional "
            "field to vulnerability, warmth, and genuine tenderness. "
            "This combination encodes creative intelligence at its most sophisticated: rigorous "
            "yet tender, authoritative yet approachable. It is the palette of artists, healers, "
            "and people who feel deeply and think carefully."
        ),
    ),
    _MixDefinition(
        colors=frozenset({"Black", "White", "Blue"}),
        min_present=3,
        label="Architectural Clarity",
        family="Neutral",
        semantic=(
            "Professional authority through structural contrast — the palette of clean, trusted systems. "
            "Black provides gravitational weight and the depth of earned authority; White declares "
            "open clarity and the neutrality of unbiased information; Blue connects both through "
            "cognitive trustworthiness and strategic depth. "
            "This combination is the visual language of institutions, precision engineering, and "
            "confident expertise. It communicates: we have done the work, we understand the "
            "system, and we are reliable."
        ),
    ),
    _MixDefinition(
        colors=frozenset({"Brown", "Green", "Yellow"}),
        min_present=3,
        label="Forest Floor",
        family="Earth",
        semantic=(
            "Deep organic rootedness and natural wisdom — the palette of ancient, thriving ecosystems. "
            "Brown anchors in soil and material earth, the slow wisdom of organic matter over time; "
            "Green carries biological intelligence and the perpetual renewal of living systems; "
            "Yellow illuminates from above with light, cognitive clarity, and warm visibility. "
            "Together they encode the fundamental texture of the natural world — nourishment, "
            "patience, and the organic cycles that sustain everything. It is the frequency of "
            "places that have been alive for longer than any human memory."
        ),
    ),
    _MixDefinition(
        colors=frozenset({"Red", "Green", "Blue"}),
        min_present=3,
        label="RGB Trinity",
        family="Contrast",
        semantic=(
            "Balanced spectral presence across all primary axes — the palette of technological "
            "precision and display-native composition. Red drives urgency and life force; "
            "Green signals biological intelligence and renewal; Blue opens the cognitive field "
            "to depth and strategic thinking. "
            "Together they form a field of complete spectral coverage — technically precise, "
            "informationally rich, and visually dominant through comprehensive force. "
            "It is the palette of screens, of information, of the digital world rendered visible."
        ),
    ),
    _MixDefinition(
        colors=frozenset({"Yellow", "Violet", "Black"}),
        min_present=3,
        label="Royal Night",
        family="Luxury",
        semantic=(
            "Luminance against prestige depth — the palette of commanding authority. "
            "Yellow fires cognitive attention from the luminant peak and declares optimistic "
            "visibility; Violet encodes the rare, the spiritual, and the aspirational; "
            "Black amplifies both through gravitational contrast and the weight of depth. "
            "This combination has signaled royalty, ceremony, and the highest tier of social "
            "value across cultures and centuries. It communicates: rare, deliberate, and "
            "worth the attention of those who understand what they are seeing."
        ),
    ),
    _MixDefinition(
        colors=frozenset({"Orange", "Brown", "Black"}),
        min_present=3,
        label="Industrial Earth",
        family="Earth",
        semantic=(
            "Heavy, warm, and materially grounded — the palette of craft, raw materials, and "
            "physical endurance. Orange carries creative heat and the energy of making; Brown "
            "grounds in organic matter and the substance of things built by hand; Black adds "
            "gravitational weight and the depth of experienced darkness. "
            "This combination encodes workmanship, endurance, and the dignity of things built "
            "to last. It is the frequency of foundries, workshops, and the material world "
            "engaged directly without abstraction."
        ),
    ),
    _MixDefinition(
        colors=frozenset({"Pink", "Violet", "White"}),
        min_present=3,
        label="Ethereal Bloom",
        family="Spiritual",
        semantic=(
            "Transcendent softness and spiritual beauty — the palette of the sacred and the gentle. "
            "Pink opens the field to emotional warmth, tenderness, and the vulnerability that "
            "becomes strength; Violet elevates toward the spiritual, the rare, and the transformative; "
            "White declares pure potential, luminant clarity, and the open field of beginning. "
            "This combination encodes spaces of healing, ceremony, and the quiet power of softness "
            "as a form of strength. It is the frequency of the sacred feminine, of genuine care, "
            "and of beauty that asks nothing in return."
        ),
    ),
    _MixDefinition(
        colors=frozenset({"Cyan", "Blue", "White"}),
        min_present=3,
        label="Digital Ice",
        family="Cool",
        semantic=(
            "Technological purity and clinical precision — the palette of clean, future-facing systems. "
            "Cyan marks precise interfaces and analytical boundaries at the edge of known information; "
            "Blue provides cognitive depth, structural trust, and strategic distance; White opens "
            "the field to pure potential and the sterile clarity of spaces designed for performance. "
            "This combination encodes environments optimised for data, precision, and the cold "
            "intelligence of advanced systems operating without noise or distortion."
        ),
    ),
    _MixDefinition(
        colors=frozenset({"Red", "Pink", "Violet"}),
        min_present=3,
        label="Heartwave",
        family="Warm",
        semantic=(
            "The full emotional spectrum of love — from urgent passion to tender care. "
            "Red anchors in the primal urgency of desire, life force, and the body's most "
            "immediate responses; Pink opens into warmth, care, and the vulnerability of "
            "genuine connection; Violet elevates into spiritual depth and the rarity of "
            "true intimacy that transforms both people involved. "
            "This palette encodes the complete field of human love — from the electric "
            "to the tender, from the physical to the transcendent. It lets the observer "
            "feel the full range: the fire, the softness, and the depth."
        ),
    ),
    _MixDefinition(
        colors=frozenset({"Black", "Yellow", "Orange"}),
        min_present=3,
        label="Power Palette",
        family="Luxury",
        semantic=(
            "Authority fused with warmth — the palette of leaders who command without coldness. "
            "Black provides gravitational weight, depth, and the silence of earned authority; "
            "Yellow fires cognitive clarity, optimistic visibility, and luminant attention; "
            "Orange sustains the social warmth that makes power human and approachable. "
            "This combination encodes dynamic leadership, creative authority, and the energy "
            "of high-value systems that generate heat as well as structure. It communicates: "
            "powerful and warm, decisive and welcoming."
        ),
    ),
    _MixDefinition(
        colors=frozenset({"Brown", "Orange", "Pink"}),
        min_present=3,
        label="Human Warmth",
        family="Earth",
        semantic=(
            "The palette of human skin, intimacy, and organic warmth — a field saturated with "
            "biological connection. Brown grounds in material earth and the ancestral heritage "
            "of lived experience; Orange radiates social warmth and the creative energy of "
            "engaged presence; Pink opens the emotional field to tenderness, vulnerability, "
            "and the warmth of being truly seen. "
            "This combination encodes the spectrum of human physical presence — approachable, "
            "warm, and deeply relatable. It is the frequency of touch, of proximity, "
            "of the warmth that humans generate simply by being near each other."
        ),
    ),

    # ── 2-color mixes (fallback) ─────────────────────────────────────────────

    _MixDefinition(
        colors=frozenset({"Red", "Green"}),
        min_present=2,
        label="Vital Opposition",
        family="Contrast",
        semantic=(
            "Maximum complementary contrast — the palette of primal life force meeting biological "
            "intelligence. Red commands urgency, passion, and survival instinct at the highest "
            "frequency; Green carries growth, renewal, and the calm intelligence of living systems. "
            "Their opposition generates a field of maximum visual tension that signals vitality "
            "at its most fundamental: the tension between activation and regeneration, between "
            "the will to act and the wisdom to grow."
        ),
    ),
    _MixDefinition(
        colors=frozenset({"Red", "Blue"}),
        min_present=2,
        label="Power Tension",
        family="Contrast",
        semantic=(
            "Raw emotional energy against intellectual calm — the palette of leadership drama. "
            "Red generates primal urgency, passion, and the immediate impact of the body's "
            "most direct responses; Blue introduces cognitive depth, strategic thinking, and "
            "the emotional regulation of the reflective mind. "
            "Their combination encodes fields of high interpersonal tension: the push-pull "
            "between intuition and analysis, between action and reflection, between the "
            "heart and the head."
        ),
    ),
    _MixDefinition(
        colors=frozenset({"Orange", "Blue"}),
        min_present=2,
        label="Creative Polarity",
        family="Contrast",
        semantic=(
            "Dynamic balance between warmth and coolness — the palette that fuels innovation. "
            "Orange carries social energy, creative heat, and optimistic momentum; Blue provides "
            "cognitive structure, depth, and the strategic distance needed to direct that energy "
            "purposefully. "
            "Together they generate productive creative tension — energising without chaos, "
            "structured without coldness. It is the visual frequency of creative teams "
            "working at the edge of what they know."
        ),
    ),
    _MixDefinition(
        colors=frozenset({"Yellow", "Violet"}),
        min_present=2,
        label="Solar Depth",
        family="Contrast",
        semantic=(
            "Luminance against prestige — optimism meeting mystery across the full spectral range. "
            "Yellow fires cognitive clarity, positive attention, and the open-field visibility "
            "of full sunlight; Violet introduces spiritual depth, rare authority, and the "
            "contemplative weight of the uncommon. "
            "Their combination spans the full brightness range of the visible spectrum, encoding "
            "fields of high intellectual aspiration and luminant wisdom — the mind that is both "
            "brilliantly clear and profoundly deep."
        ),
    ),
    _MixDefinition(
        colors=frozenset({"Black", "White"}),
        min_present=2,
        label="Zero Field",
        family="Neutral",
        semantic=(
            "Pure polarity — maximum clarity through the meeting of absolute opposites. "
            "Black absorbs all frequency and declares gravitational dominance; White reflects "
            "everything and declares open potential. Their combination generates the architectural "
            "neutrality of spaces defined by contrast alone — minimal, authoritative, and timeless. "
            "It is a field stripped to its essential signal: nothing extraneous, nothing hidden, "
            "everything visible through the force of opposition."
        ),
    ),
    _MixDefinition(
        colors=frozenset({"Red", "Black"}),
        min_present=2,
        label="Dominance Field",
        family="Contrast",
        semantic=(
            "Power at maximum depth — the palette of intensity amplified by darkness. "
            "Red generates the primal life force and urgency of desire at full saturation; "
            "Black provides the gravitational weight that makes Red feel dangerous rather "
            "than merely energetic — desire with consequence, passion with stakes. "
            "This combination encodes danger, luxury, and forbidden power. High drama. "
            "Uncompromising. The frequency of decisive moments where something irreversible "
            "is about to happen."
        ),
    ),
    _MixDefinition(
        colors=frozenset({"Green", "Brown"}),
        min_present=2,
        label="Earth Skin",
        family="Earth",
        semantic=(
            "Organic connection between biological life and terrestrial matter — the palette of "
            "natural environments in their most fundamental expression. Green carries the "
            "intelligence and renewal of living systems; Brown grounds everything in soil, "
            "bark, and the slow wisdom of organic material accumulated over time. "
            "Together they encode the deep biological comfort of being in a natural environment — "
            "the sensation of the forest floor, of earth that has been supporting life for "
            "longer than human memory extends."
        ),
    ),
    _MixDefinition(
        colors=frozenset({"Blue", "White"}),
        min_present=2,
        label="Open Sky",
        family="Cool",
        semantic=(
            "Expansive clarity — the palette of freedom, pure potential, and cognitive openness. "
            "Blue opens the mind to depth, reflection, and the spatial expansion of thinking "
            "without limits; White declares pure luminant potential without history, distortion, "
            "or accumulated weight. "
            "Together they encode the visual experience of sky: limitless, clean, and "
            "fundamentally optimistic about what lies ahead. It is the frequency of places "
            "where the mind goes when it needs space to think clearly."
        ),
    ),
)


class ColorMixInterpreter:
    """
    Matches a list of detected dominant color labels to the closest predefined
    mix definition and returns a ColorMix instance.
    """

    def interpret(self, color_labels: list[str]) -> ColorMix | None:
        """
        Find the best matching mix for the given palette.

        Args:
            color_labels: dominant color labels ordered from most to least present

        Returns:
            ColorMix if a match is found; None for monochromatic palettes.
        """
        if len(color_labels) < 2:
            return None

        label_set = set(color_labels)

        # Iterate catalogue in priority order (most specific first)
        for definition in _MIX_CATALOGUE:
            matched = label_set & definition.colors
            if len(matched) >= definition.min_present:
                return ColorMix(
                    label=definition.label,
                    dominant_family=definition.family,
                    semantic=definition.semantic,
                )

        # Generic fallback when no specific mix matches
        return self._generic_fallback(color_labels)

    # ── Private helpers ───────────────────────────────────────────────────────

    @staticmethod
    def _generic_fallback(color_labels: list[str]) -> ColorMix:
        """
        Derives a generic mix description from the warm/cool/neutral balance
        of the detected colors when no catalogue entry matches.
        """
        warm  = {"Red", "Orange", "Yellow", "Brown", "Pink"}
        cool  = {"Blue", "Cyan", "Violet", "Green"}
        achro = {"Black", "White"}

        warm_count  = sum(1 for c in color_labels if c in warm)
        cool_count  = sum(1 for c in color_labels if c in cool)
        achro_count = sum(1 for c in color_labels if c in achro)

        if warm_count > cool_count and warm_count > achro_count:
            return ColorMix(
                label="Warm Composite",
                dominant_family="Warm",
                semantic=(
                    "A predominantly warm-spectrum palette encoding emotional activation, social energy, "
                    "and physical presence. The combination of warm frequencies generates a field of "
                    "stimulating approachability and human warmth — present, engaged, and radiating "
                    "the kind of energy that invites contact and connection."
                ),
            )

        if cool_count > warm_count and cool_count > achro_count:
            return ColorMix(
                label="Cool Composite",
                dominant_family="Cool",
                semantic=(
                    "A predominantly cool-spectrum palette encoding cognitive clarity, analytical distance, "
                    "and calm authority. The combination of cool frequencies generates a field of "
                    "structural intelligence and reflective spaciousness — precise, considered, and "
                    "optimised for thought rather than immediate action."
                ),
            )

        if achro_count >= 2:
            return ColorMix(
                label="Achromatic Field",
                dominant_family="Neutral",
                semantic=(
                    "A palette anchored in achromatic frequencies — the language of structural purity "
                    "and tonal contrast. Black and White define the field's extremes while any "
                    "chromatic accents serve as high-contrast signal points within a fundamentally "
                    "neutral architecture. Clarity through the elimination of spectral noise."
                ),
            )

        return ColorMix(
            label="Spectral Composite",
            dominant_family="Contrast",
            semantic=(
                "A multi-frequency composite palette spanning both warm and cool spectral regions. "
                "The competing frequencies create a field of dynamic visual tension and broad "
                "emotional range — commanding through sheer spectral diversity and the productive "
                "tension of opposites held in the same visual field."
            ),
        )
