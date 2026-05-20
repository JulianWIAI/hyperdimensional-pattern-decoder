/**
 * FrequencyOscilloscope.jsx — Dimension 10 frequency spectrum chart.
 *
 * Renders as an oscilloscope-style animated line chart using Chart.js.
 * The waveform is synthesised from the impulse_rate_hz and intensity_multiplier
 * values to visually represent the 10th-dimensional frequency field.
 */
import React, { useEffect, useMemo, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

/** Number of data points along the X-axis (time samples). */
const SAMPLES = 80;

/**
 * Generates a waveform dataset simulating a composite frequency signal.
 *
 * @param {number} hz            - Primary impulse frequency (Dim 10)
 * @param {number} multiplier    - Intensity multiplier (Dim 10)
 * @param {number} coherence     - Coherence score from Dim 6-8 (adds harmonic noise)
 * @returns {number[]}
 */
function buildWaveform(hz, multiplier, coherence) {
  const amplitude = multiplier * 0.4;         // scale to chart range
  const noise = (1 - coherence) * 0.15;       // incoherent = more noise

  return Array.from({ length: SAMPLES }, (_, i) => {
    const t = i / SAMPLES;
    const primary = Math.sin(2 * Math.PI * hz * t) * amplitude;
    const harmonic = Math.sin(2 * Math.PI * hz * 3 * t) * amplitude * 0.25;
    const randomNoise = (Math.random() - 0.5) * noise;
    return primary + harmonic + randomNoise;
  });
}

/**
 * @param {{ result: object | null }} props
 */
export default function FrequencyOscilloscope({ result }) {
  const chartRef = useRef(null);

  const { hz, multiplier, coherence } = useMemo(() => {
    if (!result) return { hz: 4, multiplier: 1.2, coherence: 0.5 };
    const d = result.dimensions_analysis;
    return {
      hz: d.dim_10_frequency.impulse_rate_hz,
      multiplier: d.dim_10_frequency.intensity_multiplier,
      coherence: d.dim_6_8_rhythm.coherence_score,
    };
  }, [result]);

  const waveform = useMemo(() => buildWaveform(hz, multiplier, coherence), [hz, multiplier, coherence]);

  const labels = Array.from({ length: SAMPLES }, (_, i) => (i % 20 === 0 ? `${i}ms` : ''));

  const data = {
    labels,
    datasets: [
      {
        label: 'Dim-10 Frequency',
        data: waveform,
        borderColor: '#00ff88',
        borderWidth: 1.5,
        backgroundColor: 'rgba(0, 255, 136, 0.06)',
        fill: true,
        pointRadius: 0,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 600 },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: '#0d0d1a',
        borderColor: '#00ff8840',
        borderWidth: 1,
        titleColor: '#00ff88',
        bodyColor: '#e2e8f0',
        callbacks: {
          label: ctx => ` ${ctx.parsed.y.toFixed(3)} V`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(0,212,255,0.05)' },
        ticks: { color: '#4a5568', font: { size: 8, family: 'JetBrains Mono' } },
        border: { color: '#1a1a3e' },
      },
      y: {
        min: -1,
        max: 1,
        grid: { color: 'rgba(0,212,255,0.05)' },
        ticks: {
          color: '#4a5568',
          font: { size: 8, family: 'JetBrains Mono' },
          callback: v => v.toFixed(1),
          maxTicksLimit: 5,
        },
        border: { color: '#1a1a3e' },
      },
    },
  };

  return (
    <div className="flex flex-col gap-2 h-full">
      {/* Chart header */}
      <div className="flex items-center justify-between">
        <span className="text-[9px] tracking-widest text-[#00ff88]/60 uppercase">
          Frequency Spectrum · Dim 10
        </span>
        {result && (
          <span className="text-[9px] text-[#00ff88] font-bold">
            {hz} Hz · ×{multiplier.toFixed(2)}
          </span>
        )}
      </div>

      {/* Oscilloscope chart */}
      <div className="flex-1 relative min-h-0">
        <Line ref={chartRef} data={data} options={options} />
      </div>

      {/* Horizontal scanline decoration */}
      <div className="flex items-center gap-1">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#00ff88]/20 to-transparent" />
        <span className="text-[8px] text-[#4a5568]">CH1</span>
      </div>
    </div>
  );
}
