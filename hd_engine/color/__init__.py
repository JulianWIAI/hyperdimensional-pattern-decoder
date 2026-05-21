"""
hd_engine/color/__init__.py
Public surface of the multi-color analysis package.
"""

from .detector import MultiColorDetector
from .mix import ColorMixInterpreter
from .models import DominantColor, ColorMix, MultiColorPalette

__all__ = [
    "MultiColorDetector",
    "ColorMixInterpreter",
    "DominantColor",
    "ColorMix",
    "MultiColorPalette",
]
