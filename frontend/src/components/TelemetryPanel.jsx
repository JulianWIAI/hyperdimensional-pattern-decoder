/**
 * TelemetryPanel.jsx  —  v1.2
 * Right column telemetry dashboard.
 *
 * v1.1: FrequencyOscilloscope, EnergyRadarChart (4-axis), QuantumMetricsWidget, Vector Readout
 * v1.2: EnergyRadarChart expanded to 6 axes.
 *       selectedObject prop: switches all readouts to show per-object sub-analysis.
 *       Object label shown in header with a ← GLOBAL back button.
 */
import React from 'react';
import FrequencyOscilloscope from './charts/FrequencyOscilloscope';
import EnergyRadarChart from './charts/EnergyRadarChart';

/**
 * @param {{
 *   result: object | null,
 *   isScanning: boolean,
 *   selectedObject: object | null,
 *   onClearObject: () => void,
 * }} props
 */
export default function TelemetryPanel({ result, isScanning, selectedObject = null, onClearObject }) {
  const dim = result?.dimensions_analysis;
  const qfm = dim?.quantum_field_metrics ?? null;

  // Object-specific overrides
  const objA       = selectedObject?.analysis ?? null;
  const radarValues = objA?.radar_axes ?? null;

  // Effective dim values: object-specific when selected, global otherwise
  const activeDim5  = objA?.dim_5_color     ?? dim?.dim_5_color;
  const activeDim9  = objA?.dim_9_geometry  ?? dim?.dim_9_geometry;
  const activeCoh   = objA?.coherence_score ?? dim?.dim_6_8_rhythm?.coherence_score ?? null;

  return (
    <div className="panel flex flex-col gap-0 h-full overflow-hidden">

      {/* ── Panel header ── */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#1a1a3e] shrink-0">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full animate-pulse ${selectedObject ? 'bg-[#ffd700]' : 'bg-[#ff6b1a]'}`} />
          <span className={`text-[10px] tracking-[0.25em] uppercase ${selectedObject ? 'text-[#ffd700]/70' : 'text-[#ff6b1a]/70'}`}>
            {selectedObject
              ? <><span className="text-[#ffd700]">{selectedObject.id.toUpperCase()}</span> Focus</>
              : <>Telemetry <span className="text-[#4a5568]">v1.35</span></>
            }
          </span>
        </div>
        <div className="flex items-center gap-2">
          {selectedObject && (
            <button
              onClick={onClearObject}
              className="text-[9px] tracking-widest text-[#4a5568] hover:text-[#00d4ff] transition-colors uppercase"
            >
              ← Global
            </button>
          )}
          {isScanning && (
            <span className="text-[9px] text-[#ff6b1a] animate-pulse">ACQUIRING...</span>
          )}
        </div>
      </div>

      {/* ── Object label strip (v1.2) ── */}
      {selectedObject && (
        <div className="px-4 py-1.5 bg-[#ffd700]/05 border-b border-[#ffd700]/20 shrink-0">
          <p className="text-[8px] text-[#ffd700]/80 tracking-wide truncate">{selectedObject.label}</p>
          {objA?.interpretation && (
            <p className="text-[7px] text-[#4a5568] mt-0.5 leading-relaxed line-clamp-2">
              {objA.interpretation}
            </p>
          )}
        </div>
      )}

      {/* ── Oscilloscope (always global) ── */}
      <div className="px-4 pt-3 pb-2 shrink-0" style={{ height: '22%' }}>
        <FrequencyOscilloscope result={result} />
      </div>

      <div className="h-px bg-[#1a1a3e] mx-4 shrink-0" />

      {/* ── Radar chart — 8 axes (v1.35), switches to object mode when selected ── */}
      <div className="px-4 pt-3 pb-2 shrink-0" style={{ height: '28%' }}>
        <EnergyRadarChart
          result={result}
          radarValues={radarValues}
          objectLabel={selectedObject?.label ?? null}
        />
      </div>

      <div className="h-px bg-[#1a1a3e] mx-4 shrink-0" />

      {/* ── Quantum Metrics Widget (always global) ── */}
      {!selectedObject && (
        <>
          <div className="px-4 py-2 shrink-0">
            <QuantumMetricsWidget qfm={qfm} />
          </div>
          <div className="h-px bg-[#1a1a3e] mx-4 shrink-0" />
        </>
      )}

      {/* ── v1.2: Color Combo Value badge (when selected object or global has it) ── */}
      {!selectedObject && dim?.color_combo_value && dim.color_combo_value.label !== 'NEUTRAL' && (
        <>
          <div className="px-4 py-2 shrink-0">
            <ColorComboWidget combo={dim.color_combo_value} />
          </div>
          <div className="h-px bg-[#1a1a3e] mx-4 shrink-0" />
        </>
      )}

      {/* ── v1.3: Multi-color palette widget ── */}
      {!selectedObject && dim?.multi_color_palette && (
        <>
          <div className="px-4 py-2 shrink-0">
            <MultiColorPaletteWidget palette={dim.multi_color_palette} />
          </div>
          <div className="h-px bg-[#1a1a3e] mx-4 shrink-0" />
        </>
      )}

      {/* ── Vector Readout ── */}
      <div className="px-4 py-3 flex flex-col gap-1.5 overflow-y-auto">
        <span className="text-[9px] text-[#4a5568] tracking-widest uppercase mb-1">
          {selectedObject ? 'Object Readout' : 'Vector Readout'}
        </span>

        <ReadoutRow
          dim="5"
          label={activeDim5?.dominant_frequency ?? '---'}
          value={activeDim5?.vector_value ?? null}
          color={colorForFreq(activeDim5?.dominant_frequency)}
        />
        <ReadoutRow
          dim="6-8"
          label={selectedObject ? `COH ${(activeCoh ?? 0).toFixed(2)}` : (dim?.dim_6_8_rhythm?.frequency_takt ?? '---')}
          value={activeCoh}
          color="#ff6b1a"
        />
        <ReadoutRow
          dim="9"
          label={activeDim9?.edge_curvature_index?.toFixed(2) ?? '---'}
          value={activeDim9?.edge_curvature_index ?? null}
          color="#00d4ff"
        />
        {!selectedObject && (
          <>
            <ReadoutRow
              dim="10"
              label={dim ? `${dim.dim_10_frequency.impulse_rate_hz} Hz` : '---'}
              value={dim ? Math.min(dim.dim_10_frequency.impulse_rate_hz / 20, 1) : null}
              color="#a855f7"
            />
            <ReadoutRow
              dim="SYM"
              label={dim ? (dim.symmetry.is_susy ? 'SUSY' : dim.symmetry.is_symmetric ? 'SYM' : 'ASYM') : '---'}
              value={dim?.symmetry.symmetry_score ?? null}
              color={dim?.symmetry.is_susy ? '#00d4ff' : dim?.symmetry.is_symmetric ? '#00ff88' : '#ff2d55'}
            />
            <ReadoutRow
              dim="QV"
              label={qfm ? `×${qfm.quantum_value_multiplier.toFixed(2)}` : '---'}
              value={qfm ? Math.min(qfm.quantum_value_multiplier / 3, 1) : null}
              color={qfm?.luxury_particle_detected ? '#ffd700' : '#6366f1'}
            />
            <ReadoutRow
              dim="GRV"
              label={qfm ? `${(qfm.gravitational_density * 100).toFixed(0)}%` : '---'}
              value={qfm?.gravitational_density ?? null}
              color="#7c3aed"
            />
          </>
        )}
        {/* Object-mode: show selected object's 8-axis radar values (v1.35).
            Axis index map: [0]CogLoad [1]AggrFocus [2]StructStab [3]InfoEntropy
                            [4]Calm    [5]QV        [6]GravPull   [7]SymBreak   */}
        {selectedObject && radarValues && (
          <>
            <ReadoutRow dim="STB" label={`${((radarValues[2] ?? 0)*100).toFixed(0)}%`} value={radarValues[2] ?? 0} color="#00ff88" />
            <ReadoutRow dim="QV"  label={`${((radarValues[5] ?? 0)*100).toFixed(0)}%`} value={radarValues[5] ?? 0} color="#6366f1" />
            <ReadoutRow dim="GRV" label={`${((radarValues[6] ?? 0)*100).toFixed(0)}%`} value={radarValues[6] ?? 0} color="#7c3aed" />
            <ReadoutRow dim="SBV" label={`${((radarValues[7] ?? 0)*100).toFixed(0)}%`} value={radarValues[7] ?? 0} color="#f59e0b" />
          </>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// v1.2 — ColorComboWidget
// ─────────────────────────────────────────────────────────────────────────────

function ColorComboWidget({ combo }) {
  const colorMap = {
    'HIGH-VALUE':         { border: 'border-[#ffd700]/40', tag: 'text-[#ffd700]', bg: 'bg-[#ffd700]/05' },
    'DYNAMIC-VALUE':      { border: 'border-[#ff6b1a]/40', tag: 'text-[#ff6b1a]', bg: 'bg-[#ff6b1a]/05' },
    'INTELLECTUAL-VALUE': { border: 'border-[#00d4ff]/40', tag: 'text-[#00d4ff]', bg: 'bg-[#00d4ff]/05' },
    'LOW-VALUE':          { border: 'border-[#ff2d55]/30', tag: 'text-[#ff2d55]', bg: 'bg-[#ff2d55]/05' },
  };
  const s = colorMap[combo.label] ?? colorMap['NEUTRAL'] ?? colorMap['HIGH-VALUE'];

  return (
    <div className={`border rounded-sm px-3 py-2 ${s.border} ${s.bg}`}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[9px] text-[#4a5568] tracking-widest uppercase">Color Combo</span>
        <span className={`text-[9px] font-bold tracking-wider ${s.tag}`}>[{combo.label}]</span>
      </div>
      <div className="flex gap-1 mb-1">
        {combo.components.map(c => (
          <span key={c} className={`text-[8px] px-1.5 py-0.5 border rounded-sm ${s.border} ${s.tag}`}>{c}</span>
        ))}
      </div>
      <p className={`text-[8px] ${s.tag} opacity-70 leading-tight`}>{combo.description}</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// v1.3 — MultiColorPaletteWidget
// Shows the top-4 dominant colors as a swatch bar with percentages,
// plus the detected palette mix name and its dominant family badge.
// ─────────────────────────────────────────────────────────────────────────────

function MultiColorPaletteWidget({ palette }) {
  if (!palette?.colors?.length) return null;

  const familyColor = {
    Warm:      '#ff6b1a',
    Cool:      '#00d4ff',
    Earth:     '#c47c3a',
    Contrast:  '#ff2d55',
    Neutral:   '#6b7280',
    Spiritual: '#a855f7',
    Luxury:    '#ffd700',
  };

  const mix    = palette.mix;
  const accent = mix ? (familyColor[mix.dominant_family] ?? '#00d4ff') : '#00d4ff';

  return (
    <div className="border border-[#1a1a3e] rounded-sm px-3 py-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-[9px] text-[#4a5568] tracking-widest uppercase">Color Palette</span>
        {mix && (
          <span
            className="text-[8px] font-bold tracking-wider px-1.5 py-0.5 rounded-sm border"
            style={{ color: accent, borderColor: `${accent}40`, backgroundColor: `${accent}10` }}
          >
            {mix.dominant_family.toUpperCase()}
          </span>
        )}
      </div>

      {/* Swatch bar — full-width proportional color blocks */}
      <div className="flex w-full h-4 rounded-sm overflow-hidden mb-2">
        {palette.colors.map((c) => (
          <div
            key={c.label}
            style={{ width: `${c.percentage}%`, backgroundColor: c.hex_color }}
            title={`${c.label} ${c.percentage}%`}
          />
        ))}
      </div>

      {/* Per-color rows: swatch dot + label + percentage bar */}
      <div className="flex flex-col gap-1 mb-2">
        {palette.colors.map((c) => (
          <div key={c.label} className="flex items-center gap-1.5">
            <div
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: c.hex_color, boxShadow: `0 0 4px ${c.hex_color}80` }}
            />
            <span className="text-[8px] text-[#8888aa] w-10 shrink-0">{c.label}</span>
            <div className="flex-1 h-1 bg-[#1a1a3e] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${c.percentage}%`, backgroundColor: c.hex_color }}
              />
            </div>
            <span className="text-[8px] w-8 text-right shrink-0" style={{ color: c.hex_color }}>
              {c.percentage}%
            </span>
          </div>
        ))}
      </div>

      {/* Mix label + short semantic (first sentence only) */}
      {mix && (
        <div
          className="border rounded-sm px-2 py-1.5 mt-1"
          style={{ borderColor: `${accent}30`, backgroundColor: `${accent}07` }}
        >
          <div className="text-[8px] font-bold tracking-wider mb-0.5" style={{ color: accent }}>
            {mix.label}
          </div>
          <p className="text-[8px] leading-tight" style={{ color: `${accent}99` }}>
            {/* Show first sentence only to keep the widget compact */}
            {mix.semantic.split('. ')[0]}.
          </p>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// v1.1 — QuantumMetricsWidget (unchanged)
// ─────────────────────────────────────────────────────────────────────────────

function QuantumMetricsWidget({ qfm }) {
  if (!qfm) {
    return (
      <div className="border border-[#1a1a3e] rounded-sm px-3 py-2">
        <span className="text-[9px] text-[#4a5568] tracking-widest uppercase">Quantum Field Metrics</span>
        <p className="text-[9px] text-[#2a2a4e] mt-1">Awaiting scan...</p>
      </div>
    );
  }

  const isUnstable = qfm.stability_status.includes('Unstable');
  const isLuxury   = qfm.luxury_particle_detected;
  const isEMBreak  = qfm.electromagnetic_break_detected;
  const isOscill   = qfm.oscillating_field_active;
  const isCompress = qfm.active_hyperdimensional_compression;
  const qvColor    = isLuxury ? '#ffd700' : isUnstable ? '#ff6b1a' : '#a855f7';

  return (
    <div
      className={`border rounded-sm px-3 py-2 transition-colors duration-300
        ${isUnstable ? 'border-[#ff2d55]/40' : isEMBreak ? 'border-[#ff6b1a]/40' : isLuxury ? 'border-[#ffd700]/30' : 'border-[#1a1a3e]'}
      `}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[9px] tracking-widest text-[#4a5568] uppercase">Quantum Field</span>
        <div className={`w-1.5 h-1.5 rounded-full ${isUnstable ? 'bg-[#ff2d55]' : isLuxury ? 'bg-[#ffd700]' : 'bg-[#00ff88]'} animate-pulse`} />
      </div>

      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-[9px] text-[#4a5568] uppercase">QV</span>
        <span className="text-2xl font-bold leading-none" style={{ color: qvColor, textShadow: `0 0 12px ${qvColor}80` }}>
          ×{qfm.quantum_value_multiplier.toFixed(2)}
        </span>
        {isLuxury && <span className="text-[9px] text-[#ffd700] tracking-widest">HIGH-VALUE</span>}
      </div>

      <div className={`text-[9px] px-2 py-1 rounded-sm mb-2 tracking-wide border
        ${isUnstable ? 'text-[#ff2d55] bg-[#ff2d55]/10 border-[#ff2d55]/30' : 'text-[#00ff88] bg-[#00ff88]/10 border-[#00ff88]/20'}`}>
        {isUnstable ? '⚠ UNSTABLE — STRUCTURALLY WEAKENED' : '✓ STABLE — STRUCTURAL INTEGRITY OK'}
      </div>

      <div className="flex items-center gap-2 mb-2">
        <span className="text-[8px] text-[#4a5568] w-8 shrink-0">GRV</span>
        <div className="flex-1 h-1 bg-[#1a1a3e] rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-700"
            style={{ width: `${Math.round(qfm.gravitational_density * 100)}%`, backgroundColor: '#7c3aed', boxShadow: '0 0 4px #7c3aed80' }} />
        </div>
        <span className="text-[8px] text-[#7c3aed] w-8 text-right">
          {(qfm.gravitational_density * 100).toFixed(0)}%
        </span>
      </div>

      <div className="flex flex-col gap-1">
        {isEMBreak  && <AlertTag color="orange" icon="⚡">EM BREAK — SYMMETRY COLLAPSE</AlertTag>}
        {isOscill   && <AlertTag color="cyan"   icon="∿">OSCILLATING FIELD 2-3-2-3 ACTIVE</AlertTag>}
        {isCompress && <AlertTag color="purple" icon="▣">HYPERDIM. COMPRESSION ACTIVE</AlertTag>}
        {isLuxury   && <AlertTag color="gold"   icon="◆">LUXURY PARTICLE — BLACK/SILVER/WHITE</AlertTag>}
      </div>

      <div className="mt-2 border-t border-[#1a1a3e] pt-2 grid grid-cols-3 gap-1">
        <ParticleCount icon="○" label="Atoms"  value={qfm.detected_particles.circle_count}        color="#00d4ff" />
        <ParticleCount icon="□" label="Cubes"  value={qfm.detected_particles.square_count}        color="#ff6b1a" />
        <ParticleCount icon="·" label="Micro"  value={qfm.detected_particles.micro_cluster_count} color="#a855f7" />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared sub-components
// ─────────────────────────────────────────────────────────────────────────────

function AlertTag({ color, icon, children }) {
  const colorMap = {
    orange: 'text-[#ff6b1a] border-[#ff6b1a]/30 bg-[#ff6b1a]/08',
    cyan:   'text-[#00d4ff] border-[#00d4ff]/30 bg-[#00d4ff]/08',
    purple: 'text-[#a855f7] border-[#a855f7]/30 bg-[#a855f7]/08',
    gold:   'text-[#ffd700] border-[#ffd700]/30 bg-[#ffd700]/08',
  };
  return (
    <div className={`flex items-center gap-1.5 text-[8px] tracking-wide border px-2 py-0.5 rounded-sm ${colorMap[color] ?? colorMap.orange}`}>
      <span>{icon}</span>
      <span>{children}</span>
    </div>
  );
}

function ParticleCount({ icon, label, value, color }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="text-[10px]" style={{ color }}>{icon}</span>
      <span className="text-[10px] font-bold" style={{ color }}>{value}</span>
      <span className="text-[8px] text-[#4a5568]">{label}</span>
    </div>
  );
}

function ReadoutRow({ dim, label, value, color }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[8px] text-[#4a5568] w-7 shrink-0">D{dim}</span>
      <div className="flex-1 h-1 bg-[#1a1a3e] rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700"
          style={{
            width: value != null ? `${Math.round(value * 100)}%` : '0%',
            backgroundColor: color,
            boxShadow: value != null ? `0 0 4px ${color}80` : 'none',
          }} />
      </div>
      <span className="text-[8px] w-14 text-right shrink-0" style={{ color }}>{label}</span>
    </div>
  );
}

function colorForFreq(freq) {
  if (!freq) return '#4a5568';
  return freq === 'Orange' ? '#ff6b1a' : freq === 'Green' ? '#00ff88' : '#00d4ff';
}
