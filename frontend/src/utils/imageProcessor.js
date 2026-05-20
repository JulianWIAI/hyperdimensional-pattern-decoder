/**
 * imageProcessor.js  —  v1.3
 * Client-side Computer Vision helpers using the Canvas 2D API.
 *
 * v1.0 methods:
 *   analyzeDominantColor()       → Dimension 5 colour detection
 *   analyzeEdgeDensity()         → Dimension 6-8 Sobel approximation
 *   analyzeGeometry()            → Dimension 9 shape classification
 *   analyzeSymmetry()            → SUSY symmetry score
 *   findMarkerPositions()        → Crosshair and ring positions for canvas overlay
 *
 * v1.1 additions:
 *   findGravitationalCentroids() → Centre-of-mass of dark pixel clusters
 *   findCircleClusters()         → Smooth/round region centres
 *
 * v1.3 changes:
 *   _isPatchSky()                → New: detects blue/white sky patches
 *   findCircleClusters()         → Sky-aware: skips sky patches in the top 38 %
 *   findMarkerPositions()        → Sky-aware: suppresses round markers in sky zone
 *
 * Sky exclusion rationale:
 *   Homogeneous sky (solid blue or white clouds) has near-zero patch variance,
 *   which is the same signature as a circular / smooth element.  Without exclusion,
 *   almost all "Stabilization Atom" markers cluster in the sky, leaving the
 *   architectural content of the image unmarked.  The fix checks the average RGB
 *   of each candidate patch and skips it when it looks like sky.
 */

export class ImageProcessor {
  /**
   * @param {HTMLImageElement | HTMLCanvasElement} source
   */
  constructor(source) {
    this.canvas = document.createElement('canvas');
    this.canvas.width  = source.naturalWidth  || source.width;
    this.canvas.height = source.naturalHeight || source.height;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.drawImage(source, 0, 0);
    this.imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    this.w = this.canvas.width;
    this.h = this.canvas.height;
  }

  // ─── Private helpers ───────────────────────────────────────────────────────

  /**
   * Grayscale luminance (0-255) at pixel (x, y).
   * Uses simple average; fast and sufficient for variance estimation.
   */
  _gray(x, y) {
    const i = (y * this.w + x) * 4;
    const d = this.imageData.data;
    return (d[i] + d[i + 1] + d[i + 2]) / 3;
  }

  /**
   * Returns true when the patch centred at (cx, cy) looks like sky or clouds.
   *
   * Detection criteria (either is sufficient):
   *   • Blue-dominant sky : B > R × 1.10  AND  B > G × 1.02  AND  average lum > 80
   *   • White cloud/haze  : average lum > 200  AND  all channels within 20 of each other
   *
   * @param {number} cx         Patch centre X (canvas pixels)
   * @param {number} cy         Patch centre Y (canvas pixels)
   * @param {number} patchSize  Square patch side length
   * @returns {boolean}
   */
  _isPatchSky(cx, cy, patchSize) {
    let r = 0, g = 0, b = 0, count = 0;
    const half = patchSize >> 1;
    const d    = this.imageData.data;

    // Sample every other pixel for speed
    for (let py = cy - half; py < cy + half; py += 2) {
      for (let px = cx - half; px < cx + half; px += 2) {
        if (px >= 0 && px < this.w && py >= 0 && py < this.h) {
          const i = (py * this.w + px) * 4;
          r += d[i]; g += d[i + 1]; b += d[i + 2];
          count++;
        }
      }
    }
    if (count === 0) return false;

    r /= count; g /= count; b /= count;
    const lum = (r + g + b) / 3;

    // Blue-dominant sky
    if (b > r * 1.10 && b > g * 1.02 && lum > 80) return true;
    // White clouds or overcast haze
    if (lum > 200 && Math.abs(r - g) < 20 && Math.abs(g - b) < 20) return true;

    return false;
  }

  // ─── v1.0 Methods ─────────────────────────────────────────────────────────

  /**
   * Samples every 16th pixel and returns the dominant colour channel.
   * @returns {{ color: 'Orange'|'Green'|'Blue', value: number }}
   */
  analyzeDominantColor() {
    const d = this.imageData.data;
    let r = 0, g = 0, b = 0, count = 0;

    for (let i = 0; i < d.length; i += 64) {
      r += d[i]; g += d[i + 1]; b += d[i + 2];
      count++;
    }
    r /= count; g /= count; b /= count;

    if (r >= g * 1.15 && r >= b * 1.10) return { color: 'Orange', value: r / 255 };
    if (g >= r * 1.10 && g >= b * 1.10) return { color: 'Green',  value: g / 255 };
    return { color: 'Blue', value: b / 255 };
  }

  /**
   * Approximate Sobel edge detection sampled every 3rd pixel.
   * @returns {{ density: number, takt: string, coherenceScore: number }}
   */
  analyzeEdgeDensity() {
    const threshold = 25;
    let edgeCount = 0, total = 0;

    for (let y = 1; y < this.h - 1; y += 3) {
      for (let x = 1; x < this.w - 1; x += 3) {
        const gx =
          -this._gray(x - 1, y - 1) + this._gray(x + 1, y - 1) +
          -2 * this._gray(x - 1, y)  + 2 * this._gray(x + 1, y) +
          -this._gray(x - 1, y + 1) + this._gray(x + 1, y + 1);
        const gy =
          -this._gray(x - 1, y - 1) - 2 * this._gray(x, y - 1) - this._gray(x + 1, y - 1) +
           this._gray(x - 1, y + 1) + 2 * this._gray(x, y + 1) + this._gray(x + 1, y + 1);

        if (Math.sqrt(gx * gx + gy * gy) > threshold) edgeCount++;
        total++;
      }
    }
    const density = edgeCount / total;
    return {
      density,
      takt: density > 0.35 ? '2-2-2' : density > 0.15 ? '3-3-3' : '5-5-5',
      coherenceScore: Math.min(density > 0.35 ? density * 1.8 : 0.25 + density * 2.5, 1.0),
    };
  }

  /**
   * Approximates angularity via local 8×8 patch variance.
   * High variance → angular/jagged; low → curved/round.
   * @returns {{ dominantShape: string, edgeCurvatureIndex: number }}
   */
  analyzeGeometry() {
    const patchSize = 8;
    let angularPatches = 0, total = 0;

    for (let y = 0; y < this.h - patchSize; y += patchSize) {
      for (let x = 0; x < this.w - patchSize; x += patchSize) {
        const values = [];
        for (let py = 0; py < patchSize; py++)
          for (let px = 0; px < patchSize; px++)
            values.push(this._gray(x + px, y + py));

        const mean     = values.reduce((a, b) => a + b, 0) / values.length;
        const variance = values.reduce((acc, v) => acc + (v - mean) ** 2, 0) / values.length;
        if (variance > 400) angularPatches++;
        total++;
      }
    }
    const edgeCurvatureIndex = Math.min(angularPatches / total, 1.0);
    return {
      dominantShape: edgeCurvatureIndex > 0.5 ? 'Triangle / Jagged' : 'Circle / Spiral',
      edgeCurvatureIndex,
    };
  }

  /**
   * Left/right half pixel comparison for bilateral symmetry.
   * @returns {{ symmetryScore: number, isSymmetric: boolean, isSUSY: boolean }}
   */
  analyzeSymmetry() {
    let diffSum = 0;
    const halfW      = Math.floor(this.w / 2);
    const sampleStep = Math.max(1, Math.floor((this.h * halfW) / 5000));
    let count = 0;

    for (let i = 0; i < this.h * halfW; i += sampleStep) {
      const y = Math.floor(i / halfW);
      const x = i % halfW;
      diffSum += Math.abs(this._gray(x, y) - this._gray(this.w - 1 - x, y));
      count++;
    }
    const score = Math.max(0, Math.min(1, 1 - diffSum / (count * 128)));
    return {
      symmetryScore: score,
      isSymmetric:   score > 0.65,
      isSUSY:        score > 0.40 && score <= 0.65,
    };
  }

  /**
   * Finds candidate positions for the v1.0 canvas overlay markers.
   * High edge contrast  → 'sharp' (red crosshairs / angular markers).
   * Near-zero edge      → 'round' (cyan rings / smooth markers).
   *
   * v1.3: round markers in the sky exclusion zone (top 38 % where patch looks
   * like sky) are suppressed so atoms do not cluster in featureless sky areas.
   *
   * @param {number} maxMarkers  Max total markers returned (split ~50/50 sharp/round)
   * @returns {Array<{ xRatio: number, yRatio: number, type: 'sharp'|'round' }>}
   */
  findMarkerPositions(maxMarkers = 20) {
    const GRID  = 10;
    const cellW = this.w / GRID;
    const cellH = this.h / GRID;

    // Sky boundary: top 38 % of image height — round markers here are suppressed.
    const SKY_BOUNDARY_Y = this.h * 0.38;

    const markers = [];

    for (let gy = 1; gy < GRID - 1; gy++) {
      for (let gx = 1; gx < GRID - 1; gx++) {
        const cx = Math.floor(gx * cellW + cellW / 2);
        const cy = Math.floor(gy * cellH + cellH / 2);

        const gxMag =
          -this._gray(cx - 1, cy - 1) + this._gray(cx + 1, cy - 1) +
          -2 * this._gray(cx - 1, cy)  + 2 * this._gray(cx + 1, cy) +
          -this._gray(cx - 1, cy + 1) + this._gray(cx + 1, cy + 1);
        const gyMag =
          -this._gray(cx - 1, cy - 1) - 2 * this._gray(cx, cy - 1) - this._gray(cx + 1, cy - 1) +
           this._gray(cx - 1, cy + 1) + 2 * this._gray(cx, cy + 1) + this._gray(cx + 1, cy + 1);

        const mag = Math.sqrt(gxMag ** 2 + gyMag ** 2);

        if (mag > 60) {
          // Angular marker — allowed anywhere (edges exist in sky only at cloud borders)
          markers.push({ xRatio: cx / this.w, yRatio: cy / this.h, type: 'sharp' });
        } else if (mag < 10) {
          // Smooth marker — skip if it falls in a sky-like patch in the upper region
          const inSkyZone = cy < SKY_BOUNDARY_Y;
          if (!inSkyZone || !this._isPatchSky(cx, cy, Math.floor(Math.min(cellW, cellH) / 2))) {
            markers.push({ xRatio: cx / this.w, yRatio: cy / this.h, type: 'round' });
          }
        }
      }
    }

    const sharp = markers.filter(m => m.type === 'sharp').slice(0, Math.ceil(maxMarkers / 2));
    const round = markers.filter(m => m.type === 'round').slice(0, Math.floor(maxMarkers / 2));
    return [...sharp, ...round];
  }

  // ─── v1.1 Methods ─────────────────────────────────────────────────────────

  /**
   * Finds centres-of-mass for dark pixel clusters (Gravitational Field zones).
   * Used by ImageVisualizer to position Gravitational Aura glows on the canvas.
   *
   * Strategy: scan an 8×8 grid; register cells where > 40 % of pixels fall below
   * the dark threshold.  Returns up to 5 zones ordered by intensity (darkest first).
   *
   * @param {number} darkThreshold  Luminance cutoff for "black" pixels (default 40)
   * @returns {Array<{ xRatio: number, yRatio: number, intensity: number }>}
   */
  findGravitationalCentroids(darkThreshold = 40) {
    const GRID  = 8;
    const cellW = this.w / GRID;
    const cellH = this.h / GRID;
    const zones = [];

    for (let gy = 0; gy < GRID; gy++) {
      for (let gx = 0; gx < GRID; gx++) {
        let darkCount = 0, totalPx = 0;

        for (let py = Math.floor(gy * cellH); py < Math.floor((gy + 1) * cellH); py += 2) {
          for (let px = Math.floor(gx * cellW); px < Math.floor((gx + 1) * cellW); px += 2) {
            if (px < this.w && py < this.h) {
              if (this._gray(px, py) < darkThreshold) darkCount++;
              totalPx++;
            }
          }
        }

        const darkRatio = totalPx > 0 ? darkCount / totalPx : 0;
        if (darkRatio > 0.38) {
          zones.push({
            xRatio:    (gx + 0.5) / GRID,
            yRatio:    (gy + 0.5) / GRID,
            intensity: darkRatio,
          });
        }
      }
    }

    return zones.sort((a, b) => b.intensity - a.intensity).slice(0, 5);
  }

  /**
   * Finds centres of smooth, low-variance regions (Stabilization Atoms).
   * Used by ImageVisualizer to draw vector connection lines between atoms and
   * their nearest angular complement.
   *
   * v1.3: patches in the top 38 % of the image that pass the sky heuristic
   * (_isPatchSky) are skipped entirely.  Sky areas have near-zero variance by
   * definition, so without this filter every Stabilization Atom clusters there.
   *
   * @param {number} maxClusters  Max clusters returned (default 8)
   * @returns {Array<{ xRatio: number, yRatio: number }>}
   */
  findCircleClusters(maxClusters = 8) {
    const PATCH            = 16;
    const SMOOTH_THRESHOLD = 180;

    // Patches whose centre Y is above this boundary are candidate sky zones.
    // _isPatchSky() is called to confirm before skipping.
    const SKY_BOUNDARY_Y = this.h * 0.38;

    const clusters = [];

    for (let y = PATCH; y < this.h - PATCH; y += PATCH) {
      for (let x = PATCH; x < this.w - PATCH; x += PATCH) {

        // Sky exclusion: skip smooth patches in the upper portion of the image
        // that look like blue sky or white clouds.  Angular patches (buildings,
        // bridges) are never sky so they reach the variance check below normally.
        if (y < SKY_BOUNDARY_Y && this._isPatchSky(x, y, PATCH)) continue;

        // Compute patch luminance variance
        const values = [];
        const half   = PATCH >> 1;
        for (let py = y - half; py < y + half; py++) {
          for (let px = x - half; px < x + half; px++) {
            if (px >= 0 && px < this.w && py >= 0 && py < this.h)
              values.push(this._gray(px, py));
          }
        }
        if (values.length === 0) continue;

        const mean     = values.reduce((a, b) => a + b, 0) / values.length;
        const variance = values.reduce((acc, v) => acc + (v - mean) ** 2, 0) / values.length;

        if (variance < SMOOTH_THRESHOLD) {
          clusters.push({ xRatio: x / this.w, yRatio: y / this.h });
        }
      }
    }

    // Return a spatially-spread sample — slice preserves the top-to-bottom scan order
    // which naturally distributes across the image after sky rows are removed.
    return clusters.slice(0, maxClusters);
  }
}
