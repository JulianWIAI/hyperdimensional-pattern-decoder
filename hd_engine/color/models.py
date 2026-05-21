"""
hd_engine/color/models.py
Pydantic data models for the multi-color palette analysis feature.

DominantColor    — a single detected color with its percentage share and semantic text
ColorMix         — the combined semantic description for a detected color combination
MultiColorPalette — the complete result: top-4 colors + optional mix interpretation
"""

from typing import List, Optional
from pydantic import BaseModel, Field


class DominantColor(BaseModel):
    """One entry in the multi-color dominant palette."""

    label: str = Field(
        ...,
        description=(
            "Color name: Red | Orange | Yellow | Brown | Green | "
            "Cyan | Blue | Violet | Pink | Black | White"
        ),
    )
    percentage: float = Field(
        ...,
        ge=0.0,
        le=100.0,
        description="Share of the visual field in percent (saturation-weighted for chromatic colors)",
    )
    hex_color: str = Field(
        ...,
        description="Representative CSS hex color for UI rendering",
    )
    semantic: str = Field(
        ...,
        description="Universal psychological and energetic meaning of this color",
    )


class ColorMix(BaseModel):
    """Semantic interpretation of a specific color combination."""

    label: str = Field(
        ...,
        description="Short poetic name for the mix (e.g. 'Harvest Flame')",
    )
    semantic: str = Field(
        ...,
        description="Full psychological and energetic description of the color combination",
    )
    dominant_family: str = Field(
        ...,
        description=(
            "Broad category of the mix: "
            "Warm | Cool | Earth | Contrast | Neutral | Spiritual | Luxury"
        ),
    )


class MultiColorPalette(BaseModel):
    """Complete multi-color analysis: dominant colors and their combined semantic."""

    colors: List[DominantColor] = Field(
        ...,
        description="Up to 4 most dominant colors, sorted by descending percentage",
    )
    mix: Optional[ColorMix] = Field(
        default=None,
        description=(
            "Combined semantic for the detected palette. "
            "None when fewer than 2 significant colors are present (monochromatic field)."
        ),
    )
