/**
 * App.jsx — Root application component.
 *
 * Owns all shared state and orchestrates the three-column layout:
 *   Left   → UploadZone   (control panel)
 *   Centre → ImageVisualizer (scan visualiser)
 *   Right  → TelemetryPanel (charts)
 *   Bottom → DecoderOutput  (terminal output)
 *
 * Backend connectivity is checked on mount.
 * If the backend is unreachable, the app automatically offers Demo Mode
 * using pre-fabricated mock data so the UI is always showcaseable.
 */
import React, { useCallback, useEffect, useState } from 'react';
import UploadZone from './components/UploadZone';
import ImageVisualizer from './components/ImageVisualizer';
import TelemetryPanel from './components/TelemetryPanel';
import DecoderOutput from './components/DecoderOutput';
import { analyzeImage, checkBackendHealth } from './services/api';
import { getMockData } from './utils/mockData';

// ─── Initial State ─────────────────────────────────────────────────────────────

const INITIAL_STATE = {
  image: null,              // File object
  imageUrl: null,           // Object URL for <img>
  sectorMode: 'INDIVIDUUM',
  isScanning: false,
  scanComplete: false,
  result: null,             // AnalysisResult from backend or mock
  error: null,              // Error message string
  useMockData: false,       // Demo mode toggle
  backendOnline: null,      // null = unknown, true/false after health check
  selectedObjectId: null,   // v1.2 — id of the focused detected object
};

// ─── Laser scan duration must match the CSS animation length (2.2s) ───────────
const SCAN_ANIMATION_MS = 2400;

// ─── Root Component ────────────────────────────────────────────────────────────

export default function App() {
  const [state, setState] = useState(INITIAL_STATE);

  // ── Backend health check on mount ───────────────────────────────────────────
  useEffect(() => {
    checkBackendHealth().then(online => {
      setState(prev => ({
        ...prev,
        backendOnline: online,
        // Automatically enable mock mode if no backend is detected
        useMockData: !online,
      }));
    });
  }, []);

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleImageUpload = useCallback((file) => {
    // Revoke any previous object URL to avoid memory leaks
    setState(prev => {
      if (prev.imageUrl) URL.revokeObjectURL(prev.imageUrl);
      return {
        ...prev,
        image: file,
        imageUrl: URL.createObjectURL(file),
        scanComplete: false,
        result: null,
        error: null,
      };
    });
  }, []);

  const handleSectorChange = useCallback((mode) => {
    setState(prev => ({ ...prev, sectorMode: mode, result: null, scanComplete: false }));
  }, []);

  const handleToggleMock = useCallback(() => {
    setState(prev => ({ ...prev, useMockData: !prev.useMockData }));
  }, []);

  const handleScan = useCallback(async () => {
    setState(prev => ({ ...prev, isScanning: true, error: null, selectedObjectId: null }));

    // Wait for the laser scan animation to complete before showing results
    await new Promise(resolve => setTimeout(resolve, SCAN_ANIMATION_MS));

    try {
      let result;

      if (state.useMockData || !state.image) {
        // Demo mode — use pre-fabricated data
        result = getMockData(state.sectorMode);
      } else {
        try {
          // Live mode — call the FastAPI backend
          result = await analyzeImage(state.image, state.sectorMode);
        } catch {
          // Backend unavailable — fall back to mock with a console warning
          console.warn('[HPD] Backend unavailable, falling back to mock data.');
          result = getMockData(state.sectorMode);
        }
      }

      setState(prev => ({
        ...prev,
        isScanning: false,
        scanComplete: true,
        result,
      }));
    } catch (err) {
      setState(prev => ({
        ...prev,
        isScanning: false,
        error: `Analysis pipeline error: ${err.message}`,
      }));
    }
  }, [state.image, state.sectorMode, state.useMockData]);

  const handleObjectSelect = useCallback((id) => {
    setState(prev => ({ ...prev, selectedObjectId: id }));
  }, []);

  const handleReset = useCallback(() => {
    setState(prev => {
      if (prev.imageUrl) URL.revokeObjectURL(prev.imageUrl);
      return INITIAL_STATE;
    });
  }, []);

  // ── Derived: resolved selected object from result ─────────────────────────
  const selectedObject = state.result?.detected_objects?.find(
    o => o.id === state.selectedObjectId
  ) ?? null;

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#050508] text-[#e2e8f0] font-mono flex flex-col overflow-hidden">

      {/* ── Global Header ── */}
      <header className="shrink-0 border-b border-[#1a1a3e] px-6 py-3">
        <div className="max-w-[1800px] mx-auto flex items-center justify-between">
          {/* Logo / title */}
          <div className="flex items-center gap-3">
            <LogoIcon />
            <div>
              <h1 className="text-sm font-bold tracking-[0.35em] text-[#00ff88] text-glow-green uppercase">
                Hyperdimensional Pattern Decoder
              </h1>
              <p className="text-[9px] text-[#4a5568] tracking-[0.2em]">
                Kaluza-Klein · String Theory · Extra-Dimensional Signal Analysis
              </p>
            </div>
          </div>

          {/* System status indicators */}
          <div className="flex items-center gap-5 text-[9px] tracking-widest">
            <StatusPill
              label="ENGINE"
              value="KALUZA-KLEIN"
              color="green"
            />
            <StatusPill
              label="BACKEND"
              value={
                state.backendOnline === null
                  ? 'CHECKING'
                  : state.backendOnline
                  ? 'ONLINE'
                  : 'OFFLINE'
              }
              color={
                state.backendOnline === null
                  ? 'muted'
                  : state.backendOnline
                  ? 'green'
                  : 'orange'
              }
            />
            <StatusPill label="SUSY DETECTOR" value="READY" color="cyan" />
            <span className="text-[#ff6b1a]/60">
              {new Date().toISOString().replace('T', ' ').slice(0, 19)} UTC
            </span>
          </div>
        </div>
      </header>

      {/* ── Main Three-Column Grid ── */}
      <main className="flex-1 min-h-0 max-w-[1800px] w-full mx-auto p-3 grid grid-cols-[300px_1fr_340px] gap-3">

        {/* Left — Control */}
        <UploadZone
          onImageUpload={handleImageUpload}
          onSectorChange={handleSectorChange}
          onScan={handleScan}
          onReset={handleReset}
          sectorMode={state.sectorMode}
          hasImage={!!state.imageUrl}
          isScanning={state.isScanning}
          scanComplete={state.scanComplete}
          useMockData={state.useMockData}
          onToggleMock={handleToggleMock}
        />

        {/* Centre — Visualiser */}
        <ImageVisualizer
          imageUrl={state.imageUrl}
          isScanning={state.isScanning}
          scanComplete={state.scanComplete}
          result={state.result}
          selectedObjectId={state.selectedObjectId}
          onObjectSelect={handleObjectSelect}
          sectorMode={state.sectorMode}
        />

        {/* Right — Telemetry */}
        <TelemetryPanel
          result={state.result}
          isScanning={state.isScanning}
          selectedObject={selectedObject}
          onClearObject={() => handleObjectSelect(null)}
        />
      </main>

      {/* ── Bottom — Decoder Terminal ── */}
      <div className="shrink-0 max-w-[1800px] w-full mx-auto px-3 pb-3">
        <DecoderOutput
          result={state.result}
          isScanning={state.isScanning}
          error={state.error}
        />
      </div>
    </div>
  );
}

// ─── Header Sub-components ─────────────────────────────────────────────────────

function StatusPill({ label, value, color }) {
  const colorMap = {
    green:  { dot: 'bg-[#00ff88]', text: 'text-[#00ff88]' },
    cyan:   { dot: 'bg-[#00d4ff]', text: 'text-[#00d4ff]' },
    orange: { dot: 'bg-[#ff6b1a]', text: 'text-[#ff6b1a]' },
    muted:  { dot: 'bg-[#4a5568]', text: 'text-[#4a5568]' },
  };
  const { dot, text } = colorMap[color] ?? colorMap.muted;

  return (
    <div className="flex items-center gap-1.5">
      <div className={`w-1.5 h-1.5 rounded-full ${dot} ${color !== 'muted' ? 'animate-pulse' : ''}`} />
      <span className="text-[#4a5568]">{label}</span>
      <span className={`font-bold ${text}`}>{value}</span>
    </div>
  );
}

function LogoIcon() {
  return (
    <svg className="w-8 h-8 text-[#00ff88]" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2">
      {/* Outer hexagon */}
      <polygon points="20,2 36,11 36,29 20,38 4,29 4,11" />
      {/* Inner ring */}
      <circle cx="20" cy="20" r="8" />
      {/* Cross hairs */}
      <line x1="20" y1="2" x2="20" y2="12" />
      <line x1="20" y1="28" x2="20" y2="38" />
      <line x1="4" y1="20" x2="12" y2="20" />
      <line x1="28" y1="20" x2="36" y2="20" />
      {/* Centre dot */}
      <circle cx="20" cy="20" r="2" fill="currentColor" />
    </svg>
  );
}
