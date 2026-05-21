"""
hd_engine/color/detector.py
MultiColorDetector — extracts the top-N dominant colors and their percentage shares
from the saturation-weighted HSV vote dict produced by HyperdimensionalAnalyzer.

Normalization strategy
----------------------
Chromatic colors (Red, Orange, Yellow, Brown, Green, Cyan, Blue, Violet, Pink) are
represented as saturation-weighted pixel votes — vivid pixels outweigh desaturated
ones.  Black and White are simple pixel-count fractions in [0, 1].

To produce a unified percentage scale we:
  1. Compute what share of the image is NOT black/white (= chromatic_share).
  2. Distribute that share among chromatic colors proportional to their vote weights.
  3. Add the raw black_frac and white_frac directly.
  4. Renormalise the whole dict to sum to 100 %.

This ensures that a predominantly red image shows ~90 % Red, not a distorted split
caused by mixing incompatible vote scales.
"""

from .models import DominantColor
from .text import get_color_semantic, get_color_hex

# Colors below this percentage share are considered noise and excluded.
_MIN_PERCENTAGE: float = 2.0

# Mapping from the vote-dict key to a human-readable color label.
_CHROMATIC_KEYS: dict[str, str] = {
    "red":    "Red",
    "orange": "Orange",
    "yellow": "Yellow",
    "brown":  "Brown",
    "green":  "Green",
    "cyan":   "Cyan",
    "blue":   "Blue",
    "violet": "Violet",
    "pink":   "Pink",
}


class MultiColorDetector:
    """
    Derives the top-N dominant colors and their percentage shares
    from a saturation-weighted HSV vote dict.
    """

    def detect(self, votes: dict, n: int = 4) -> list[DominantColor]:
        """
        Compute the N most dominant colors in the image.

        Args:
            votes:  dict returned by HyperdimensionalAnalyzer._hsv_sat_votes()
            n:      maximum colors to return (default 4)

        Returns:
            List of DominantColor sorted by descending percentage, length ≤ n.
        """
        black_frac: float = float(votes.get("black_frac", 0.0))
        white_frac: float = float(votes.get("white_frac", 0.0))

        # Chromatic raw votes (saturation-weighted, arbitrary scale)
        chromatic_raw: dict[str, float] = {
            label: float(votes.get(key, 0.0))
            for key, label in _CHROMATIC_KEYS.items()
        }
        chromatic_total: float = sum(chromatic_raw.values())

        # The chromatic colors fill the portion of the image not occupied by
        # pure black or pure white pixels.  Guard against over-clamping when
        # black_frac + white_frac slightly exceeds 1 due to float rounding.
        chromatic_share: float = max(0.0, 1.0 - black_frac - white_frac)

        # Distribute chromatic_share among chromatic colors by vote proportion
        normalized: dict[str, float] = {}
        if chromatic_total > 1e-6:
            for label, raw in chromatic_raw.items():
                normalized[label] = (raw / chromatic_total) * chromatic_share
        else:
            for label in chromatic_raw:
                normalized[label] = 0.0

        normalized["Black"] = black_frac
        normalized["White"] = white_frac

        # Convert to percentages (renormalize so they sum to exactly 100 %)
        grand_total: float = sum(normalized.values()) or 1.0
        palette: list[tuple[str, float]] = sorted(
            (
                (label, round(share / grand_total * 100.0, 1))
                for label, share in normalized.items()
                if share / grand_total * 100.0 >= _MIN_PERCENTAGE
            ),
            key=lambda x: x[1],
            reverse=True,
        )

        return [
            DominantColor(
                label=label,
                percentage=pct,
                hex_color=get_color_hex(label),
                semantic=get_color_semantic(label),
            )
            for label, pct in palette[:n]
        ]
