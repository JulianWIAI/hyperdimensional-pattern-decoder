/**
 * EnergyRadarChart.jsx — v1.35
 * 8-axis Energy Distribution Matrix (Radar / Spider chart).
 *
 * v1.0/v1.1: 4 axes (Cognitive Load, Aggression, Calm, Entropy)
 * v1.2:      6 axes — adds Structural Stability and Quantum Value.
 * v1.35:     8 axes — adds Gravitational Pull and Symmetry-Break Vector.
 *            Segment-zoom mode: clicking an axis button in the legend normalises
 *            all values relative to that axis so it lands at 1.0.  The polygon
 *            shifts dynamically, revealing inter-axis proportions.  Click again
 *            to reset.
 */
import React, { useMemo, useState } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

// ─── Axis definitions ─────────────────────────────────────────────────────────
// label: short name shown on the chart ring / legend buttons
// full:  tooltip title and zoom indicator
// color: accent colour shown when the axis is focused
const AXES = [
  { label: 'Cog. Load',    full: 'Cognitive Load',       color: '#00d4ff' },
  { label: 'Aggr. Focus',  full: 'Aggressive Focus',     color: '#ff2d55' },
  { label: 'Stability',    full: 'Structural Stability',  color: '#00ff88' },
  { label: 'Entropy',      full: 'Information Entropy',   color: '#ff6b1a' },
  { label: 'Calm',         full: 'Calm / Absorption',     color: '#a855f7' },
  { label: 'Quantum Val.', full: 'Quantum Value',         color: '#ffd700' },
  { label: 'Grav. Pull',   full: 'Gravitational Pull',    color: '#7c3aed' },
  { label: 'Sym. Break',   full: 'Symmetry-Break Vector', color: '#f59e0b' },
];

// Default placeholder values (8 axes) shown before the first scan completes
const DEFAULT_VALUES = [0.30, 0.30, 0.60, 0.30, 0.50, 0.30, 0.10, 0.00];

// ─── Fallback radar builder ────────────────────────────────────────────────────

/**
 * Derives 8 radar axis values from the global analysis result.
 * Used when no precomputed `radarValues` prop is supplied, or when the backend
 * returns an older 6-axis payload (backwards-compat fallback).
 */
function buildRadarValues(result) {
  if (!result) return DEFAULT_VALUES;

  // Prefer precomputed axes from backend (v1.35 returns 8 values)
  const precomputed = result.dimensions_analysis?.radar_axes;
  if (Array.isArray(precomputed) && precomputed.length >= 8) {
    return precomputed.slice(0, 8);
  }

  // Fallback: derive from raw dimensional fields
  const d   = result.dimensions_analysis;
  const qfm = d?.quantum_field_metrics;

  const cogLoad   = d?.dim_6_8_rhythm?.coherence_score ?? 0.30;
  const aggrFocus = d?.dim_9_geometry?.edge_curvature_index ?? 0.30;

  const stabBase  = d?.symmetry?.is_susy   ? 0.85
                  : d?.symmetry?.is_symmetric ? 0.75 : 0.45;
  const stability = stabBase * (qfm?.stability_status?.includes('Unstable') ? 0.65 : 1.0);

  const entropy   = Math.min((d?.dim_10_frequency?.impulse_rate_hz ?? 0) / 20, 1);

  const calm      = d?.dim_5_color?.dominant_frequency === 'Green'
    ? (d?.dim_5_color?.vector_value ?? 0.50)
    : Math.max(0, 1 - (d?.dim_5_color?.vector_value ?? 0) * 0.7);

  const qvNorm    = qfm
    ? Math.min(Math.max((qfm.quantum_value_multiplier - 0.5) / 2.5, 0), 1)
    : 0.30;

  const gravPull  = qfm?.gravitational_density ?? 0.10;

  const symBreak  = d?.local_asymmetry?.detected
    ? (d?.local_asymmetry?.asymmetry_delta ?? 0.0)
    : 0.0;

  return [cogLoad, aggrFocus, stability, entropy, calm, qvNorm, gravPull, symBreak];
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * @param {{
 *   result:        object | null,
 *   radarValues?:  number[] | null,   8 precomputed values from a selected object
 *   objectLabel?:  string | null,
 * }} props
 */
export default function EnergyRadarChart({ result, radarValues = null, objectLabel = null }) {
  // Index of the currently zoomed axis (null = no zoom)
  const [focusedAxis, setFocusedAxis] = useState(null);

  // Raw values: object-specific take priority; fall back to global result
  const values = useMemo(() => {
    if (Array.isArray(radarValues) && radarValues.length >= 8) return radarValues.slice(0, 8);
    return buildRadarValues(result);
  }, [result, radarValues]);

  const isObjectMode = Boolean(Array.isArray(radarValues) && radarValues.length >= 8);

  // Segment zoom: normalise all values so the focused axis maps to 1.0.
  // This shifts the polygon shape to reveal inter-axis proportions visually.
  const displayValues = useMemo(() => {
    if (focusedAxis === null) return values;
    const pivot = values[focusedAxis] ?? 0;
    if (pivot < 0.01) return values;   // avoid division by near-zero
    return values.map(v => Math.min(v / pivot, 1.0));
  }, [values, focusedAxis]);

  const accentColor = isObjectMode ? '#ffd700' : '#00d4ff';

  // ── Chart.js dataset ────────────────────────────────────────────────────────
  const data = {
    labels: AXES.map(a => a.label),
    datasets: [
      {
        label:            isObjectMode ? (objectLabel ?? 'Object') : 'Energy Matrix',
        data:             displayValues,
        backgroundColor:  `${accentColor}1a`,
        borderColor:      accentColor,
        borderWidth:      focusedAxis !== null ? 2.0 : 1.5,
        // Focused axis point is white to stand out; others use the normal accent
        pointBackgroundColor: displayValues.map((_, i) =>
          i === focusedAxis ? '#ffffff' : accentColor
        ),
        pointBorderColor: displayValues.map((_, i) =>
          i === focusedAxis ? accentColor : accentColor
        ),
        pointRadius:      displayValues.map((_, i) => i === focusedAxis ? 6 : 3.5),
        pointHoverRadius: 7,
      },
    ],
  };

  // ── Chart.js options ────────────────────────────────────────────────────────
  const options = {
    responsive:          true,
    maintainAspectRatio: false,
    animation:           { duration: 550, easing: 'easeInOutQuart' },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0d0d1a',
        borderColor:     `${accentColor}40`,
        borderWidth:     1,
        titleColor:      accentColor,
        bodyColor:       '#e2e8f0',
        callbacks: {
          // Show full axis name in tooltip title instead of the short label
          title: ctx => AXES[ctx[0]?.dataIndex]?.full ?? '',
          label: ctx => {
            const rawPct  = ((values[ctx.dataIndex] ?? 0) * 100).toFixed(0);
            const zoomPct = ((displayValues[ctx.dataIndex] ?? 0) * 100).toFixed(0);
            return focusedAxis !== null
              ? ` ${rawPct}%  [zoom: ${zoomPct}%]`
              : ` ${rawPct}%`;
          },
        },
      },
    },
    scales: {
      r: {
        min:         0,
        max:         1,
        beginAtZero: true,
        grid:        { color: 'rgba(0,212,255,0.06)' },
        angleLines:  { color: 'rgba(0,212,255,0.09)' },
        pointLabels: {
          // Focused axis label glows in the accent colour; others stay dim
          color: ctx =>
            ctx.index === focusedAxis ? accentColor : (isObjectMode ? '#ffd70055' : '#3a4a5a'),
          font: { size: 7.5, family: 'JetBrains Mono' },
        },
        ticks: {
          color:         '#2a2a4e',
          backdropColor: 'transparent',
          font:          { size: 6 },
          stepSize:      0.25,
          callback:      v => (v === 0.5 ? '0.5' : ''),
        },
      },
    },
  };

  // Toggle zoom on the clicked axis — click same axis again to reset
  const handleAxisClick = i => {
    setFocusedAxis(prev => (prev === i ? null : i));
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-1.5 h-full">

      {/* Header row */}
      <div className="flex items-center justify-between">
        <span className={`text-[9px] tracking-widest uppercase ${isObjectMode ? 'text-[#ffd700]/60' : 'text-[#00d4ff]/60'}`}>
          {isObjectMode ? 'Object · Energy Matrix' : 'Energy Distribution · Matrix'}
          {focusedAxis !== null && (
            <span className="ml-1.5 text-[#ffffff]/40">
              [ZOOM: {AXES[focusedAxis]?.label}]
            </span>
          )}
        </span>
        {result && !isObjectMode && (
          <span className="text-[9px] text-[#ff6b1a]">
            SYM: {(result.dimensions_analysis.symmetry.symmetry_score * 100).toFixed(0)}%
          </span>
        )}
      </div>

      {/* Radar chart */}
      <div className="flex-1 relative min-h-0">
        <Radar data={data} options={options} />
      </div>

      {/* 8-axis legend — 4-column grid.
          Each button toggles segment-zoom for that axis.
          The focused axis button gets a cyan glow ring. */}
      <div className="grid grid-cols-4 gap-x-1 gap-y-0.5">
        {AXES.map((axis, i) => {
          const isZoomed = focusedAxis === i;
          const rawPct   = ((values[i] ?? 0) * 100).toFixed(0);
          return (
            <button
              key={axis.label}
              onClick={() => handleAxisClick(i)}
              title={`${axis.full}: ${rawPct}% — click to zoom`}
              className={`
                flex items-center justify-between px-1 py-0.5 rounded-sm
                transition-all duration-200 cursor-pointer text-left
                ${isZoomed
                  ? 'bg-[#00d4ff]/08 ring-1 ring-[#00d4ff]/30'
                  : 'hover:bg-[#ffffff]/03'}
              `}
            >
              <span className={`text-[6px] truncate leading-tight
                ${isZoomed
                  ? (isObjectMode ? 'text-[#ffd700]' : 'text-[#00d4ff]')
                  : 'text-[#4a5568]'}`}>
                {axis.label}
              </span>
              <span className={`text-[6px] ml-0.5 shrink-0 tabular-nums
                ${isZoomed
                  ? (isObjectMode ? 'text-[#ffd700]' : 'text-[#00d4ff]')
                  : (isObjectMode ? 'text-[#ffd700]/60' : 'text-[#00d4ff]/60')}`}>
                {rawPct}%
              </span>
            </button>
          );
        })}
      </div>

    </div>
  );
}
