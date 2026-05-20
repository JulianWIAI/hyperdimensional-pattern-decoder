"""
hd_engine/routes.py
FastAPI router — validates requests and delegates to the analysis pipeline.
All business logic lives in analyzer.py and translator.py, never here.
"""

from fastapi import APIRouter, File, Form, HTTPException, UploadFile

from hd_engine.analyzer import HyperdimensionalAnalyzer
from hd_engine.models import AnalysisResult
from hd_engine.translator import SECTOR_VOCABULARY, build_result

router = APIRouter()

# Accepted MIME types for uploaded images
VALID_CONTENT_TYPES = {"image/jpeg", "image/png", "image/webp", "image/gif", "image/bmp"}

# 10 MB hard limit — Pillow can handle larger files but we want predictable latency
MAX_FILE_SIZE = 10 * 1024 * 1024


@router.post("/analyze", response_model=AnalysisResult, summary="Run full dimensional analysis")
async def analyze_image(
    file: UploadFile = File(..., description="Image file to decode"),
    sector_mode: str = Form(default="INDIVIDUUM", description="Analysis sector context"),
) -> AnalysisResult:
    """
    Accepts a multipart image upload and an optional sector_mode form field.
    Runs the five-dimensional CV pipeline and returns a structured AnalysisResult.
    """
    # Validate content type
    if file.content_type not in VALID_CONTENT_TYPES:
        raise HTTPException(
            status_code=415,
            detail=f"Unsupported media type '{file.content_type}'. "
                   f"Accepted: JPEG, PNG, WebP, GIF, BMP.",
        )

    # Normalise: strip whitespace + force uppercase so "Cards", "cards" all resolve correctly.
    # This must happen BEFORE the validation check or mixed-case values from the frontend
    # would silently 400 and leave the caller falling back to mock data.
    sector_mode = sector_mode.strip().upper()

    # Validate sector mode
    valid_modes = set(SECTOR_VOCABULARY.keys())
    if sector_mode not in valid_modes:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid sector_mode '{sector_mode}'. Valid options: {valid_modes}",
        )

    image_bytes = await file.read()

    # Enforce upload size limit
    if len(image_bytes) > MAX_FILE_SIZE:
        raise HTTPException(status_code=413, detail="Image exceeds 10 MB limit.")

    try:
        analyzer = HyperdimensionalAnalyzer(image_bytes)
        raw = analyzer.run_full_analysis(sector_mode=sector_mode)
        return build_result(raw, sector_mode, analyzer=analyzer)
    except Exception as exc:
        # Surface the underlying error in development; sanitise in production
        raise HTTPException(status_code=500, detail=f"Analysis pipeline error: {exc}") from exc


@router.get("/health", summary="System health check")
async def health() -> dict:
    """Returns API online status. Used by the frontend to detect backend availability."""
    return {"status": "online", "system": "Hyperdimensional Pattern Decoder", "version": "1.2.0"}


@router.get("/sectors", summary="List available sector modes")
async def list_sectors() -> dict:
    """Returns all valid sector modes and their human-readable labels."""
    return {
        "sectors": [
            {"id": mode_id, "label": vocab["label"]}
            for mode_id, vocab in SECTOR_VOCABULARY.items()
        ]
    }
