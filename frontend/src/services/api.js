/**
 * api.js — HTTP client for the FastAPI backend.
 *
 * All fetch calls are centralised here so the rest of the app
 * never touches URLs or FormData directly.
 */

const BASE_URL = '/api';

/**
 * Posts an image file and a sector mode to the backend analysis endpoint.
 *
 * @param {File}   file        - The image File object from the upload zone.
 * @param {string} sectorMode  - One of: URBAN_AREA | INDIVIDUUM | STOCKS | CARDS | TOYS
 * @returns {Promise<AnalysisResult>} Parsed JSON response
 * @throws  {Error} On HTTP errors or network failure
 */
export async function analyzeImage(file, sectorMode) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('sector_mode', sectorMode);

  const response = await fetch(`${BASE_URL}/analyze`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `HTTP ${response.status}: Analysis failed`);
  }

  return response.json();
}

/**
 * Checks whether the FastAPI backend is reachable.
 * Resolves to true if online, false if offline.
 *
 * @returns {Promise<boolean>}
 */
export async function checkBackendHealth() {
  try {
    const res = await fetch(`${BASE_URL}/health`, { signal: AbortSignal.timeout(2000) });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Fetches the list of available sector modes from the backend.
 *
 * @returns {Promise<Array<{id: string, label: string}>>}
 */
export async function fetchSectors() {
  const res = await fetch(`${BASE_URL}/sectors`);
  if (!res.ok) throw new Error('Failed to load sector list');
  const data = await res.json();
  return data.sectors;
}
