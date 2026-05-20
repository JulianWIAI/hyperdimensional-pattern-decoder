/**
 * UploadZone.jsx — Left control panel.
 *
 * Responsibilities:
 *   - Drag-and-drop / click-to-upload image zone.
 *   - Sector mode dropdown.
 *   - "Initiate Scan" button with animated state.
 *   - Demo mode toggle (runs mock data without a backend).
 *   - Reset button.
 */
import React, { useCallback, useRef, useState } from 'react';
import SectorDropdown from './SectorDropdown';

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/bmp'];

/**
 * @param {{
 *   onImageUpload: (file: File) => void,
 *   onSectorChange: (mode: string) => void,
 *   onScan: () => void,
 *   onReset: () => void,
 *   sectorMode: string,
 *   hasImage: boolean,
 *   isScanning: boolean,
 *   scanComplete: boolean,
 *   useMockData: boolean,
 *   onToggleMock: () => void,
 * }} props
 */
export default function UploadZone({
  onImageUpload,
  onSectorChange,
  onScan,
  onReset,
  sectorMode,
  hasImage,
  isScanning,
  scanComplete,
  useMockData,
  onToggleMock,
}) {
  const fileInputRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);

  // ─── File Handlers ─────────────────────────────────────────────────────────

  const handleFile = useCallback(
    (file) => {
      if (!file || !ACCEPTED_TYPES.includes(file.type)) return;
      onImageUpload(file);
    },
    [onImageUpload]
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files[0];
      handleFile(file);
    },
    [handleFile]
  );

  const handleFileInput = (e) => handleFile(e.target.files[0]);

  // ─── Scan button label state ───────────────────────────────────────────────

  const scanLabel = isScanning
    ? 'SCANNING...'
    : scanComplete
    ? 'RE-SCAN'
    : 'INITIATE SCAN';

  const canScan = (hasImage || useMockData) && !isScanning;

  return (
    <div className="panel flex flex-col gap-4 p-4 h-full">
      {/* Panel header */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
        <span className="text-[10px] tracking-[0.25em] text-[#00ff88]/70 uppercase">
          Control Interface
        </span>
      </div>

      {/* ── Upload Zone ── */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Drop image here or click to upload"
        onClick={() => fileInputRef.current?.click()}
        onKeyDown={e => e.key === 'Enter' && fileInputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        className={`
          relative flex flex-col items-center justify-center gap-3
          border-2 border-dashed rounded-sm p-6
          cursor-pointer select-none transition-all duration-200
          ${isDragOver
            ? 'border-[#00ff88] bg-[#00ff88]/5 scale-[1.01]'
            : 'border-[#1a1a3e] hover:border-[#00ff88]/40 hover:bg-[#00ff88]/[0.02]'}
        `}
      >
        {/* Upload icon */}
        <svg
          className={`w-10 h-10 transition-colors ${isDragOver ? 'text-[#00ff88]' : 'text-[#2a2a4e]'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>

        <div className="text-center">
          <p className="text-xs text-[#e2e8f0]/60">
            {isDragOver ? 'Release to upload' : 'Drop image or click'}
          </p>
          <p className="text-[9px] text-[#4a5568] mt-1">PNG · JPG · WebP · GIF · BMP</p>
        </div>

        {hasImage && (
          <span className="absolute top-2 right-2 text-[9px] text-[#00ff88] bg-[#00ff88]/10 px-2 py-0.5 rounded">
            LOADED
          </span>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_TYPES.join(',')}
          className="hidden"
          onChange={handleFileInput}
        />
      </div>

      {/* ── Sector Dropdown ── */}
      <SectorDropdown value={sectorMode} onChange={onSectorChange} disabled={isScanning} />

      {/* ── Demo Mode Toggle ── */}
      <label className="flex items-center justify-between cursor-pointer group">
        <span className="text-[10px] tracking-widest text-[#4a5568] group-hover:text-[#e2e8f0]/60 transition-colors uppercase">
          Demo Mode
        </span>
        <div className="relative">
          <input
            type="checkbox"
            checked={useMockData}
            onChange={onToggleMock}
            className="sr-only"
          />
          {/* Toggle track */}
          <div
            className={`
              w-10 h-5 rounded-full transition-colors duration-200
              ${useMockData ? 'bg-[#00ff88]/30 border border-[#00ff88]/60' : 'bg-[#1a1a3e] border border-[#2a2a4e]'}
            `}
          />
          {/* Toggle thumb */}
          <div
            className={`
              absolute top-0.5 w-4 h-4 rounded-full transition-all duration-200
              ${useMockData ? 'left-5 bg-[#00ff88] shadow-[0_0_8px_#00ff88]' : 'left-0.5 bg-[#4a5568]'}
            `}
          />
        </div>
      </label>

      {useMockData && (
        <p className="text-[9px] text-[#00ff88]/50 -mt-2 leading-relaxed">
          Mock data active — no backend required. Upload an image to run live CV analysis.
        </p>
      )}

      {/* ── Scan Button ── */}
      <button
        onClick={onScan}
        disabled={!canScan}
        className={`
          relative w-full py-3 text-xs font-bold tracking-[0.3em] uppercase
          rounded-sm border transition-all duration-200
          ${canScan
            ? 'border-[#00ff88]/60 text-[#00ff88] bg-[#00ff88]/10 btn-scan hover:bg-[#00ff88]/20 hover:border-[#00ff88]'
            : 'border-[#1a1a3e] text-[#4a5568] bg-transparent cursor-not-allowed'}
        `}
      >
        {isScanning && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2">
            <span className="inline-block w-2 h-2 border border-[#00ff88] border-t-transparent rounded-full animate-spin" />
          </span>
        )}
        {scanLabel}
      </button>

      {/* ── Reset ── */}
      {(hasImage || scanComplete) && (
        <button
          onClick={onReset}
          disabled={isScanning}
          className="text-[9px] tracking-widest text-[#4a5568] hover:text-[#ff6b1a]/70 transition-colors disabled:opacity-40 uppercase"
        >
          ↺ Clear / Reset
        </button>
      )}

      {/* ── Status Readout ── */}
      <div className="mt-auto border-t border-[#1a1a3e] pt-3">
        <div className="flex flex-col gap-1">
          <StatusRow label="ENGINE"   value="KALUZA-KLEIN v1"    color="green" />
          <StatusRow label="SUSY"     value="DETECTOR READY"     color="cyan" />
          <StatusRow label="STATUS"   value={isScanning ? 'SCANNING' : scanComplete ? 'COMPLETE' : 'STANDBY'} color={isScanning ? 'orange' : scanComplete ? 'green' : 'cyan'} />
        </div>
      </div>
    </div>
  );
}

/** Small labelled status row for the bottom info block. */
function StatusRow({ label, value, color }) {
  const colorMap = {
    green: 'text-[#00ff88]',
    cyan: 'text-[#00d4ff]',
    orange: 'text-[#ff6b1a]',
  };
  return (
    <div className="flex justify-between items-center">
      <span className="text-[9px] text-[#4a5568] tracking-widest">{label}</span>
      <span className={`text-[9px] tracking-wide font-bold ${colorMap[color]}`}>{value}</span>
    </div>
  );
}
