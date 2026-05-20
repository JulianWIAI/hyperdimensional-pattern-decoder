/**
 * SectorDropdown.jsx — Analysis sector mode selector.
 *
 * Renders a styled <select> with one option per sector.
 * Each sector mode triggers a different vocabulary in the decoder output.
 */
import React from 'react';

const SECTORS = [
  { id: 'URBAN_AREA', label: 'Urban Area (Cities)',          icon: '🏙' },
  { id: 'INDIVIDUUM', label: 'Individuum (Look / Apparel)',  icon: '👤' },
  { id: 'STOCKS',     label: 'Stocks (Financial Markets)',    icon: '📈' },
  { id: 'CARDS',      label: 'Cards (Trading Cards)',         icon: '🃏' },
  { id: 'TOYS',       label: 'Toys (Play Design)',            icon: '🎮' },
];

/**
 * @param {{ value: string, onChange: (id: string) => void, disabled: boolean }} props
 */
export default function SectorDropdown({ value, onChange, disabled }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] tracking-widest text-[#00ff88]/60 uppercase">
        Sector Mode
      </label>

      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          disabled={disabled}
          className="
            w-full appearance-none
            bg-[#07071a] border border-[#1a1a3e]
            text-[#e2e8f0] text-xs font-mono
            px-3 py-2 pr-8
            rounded-sm
            focus:outline-none focus:border-[#00ff88]/60
            hover:border-[#00ff88]/40
            disabled:opacity-40 disabled:cursor-not-allowed
            transition-colors duration-200
            cursor-pointer
          "
        >
          {SECTORS.map(s => (
            <option key={s.id} value={s.id}>
              {s.icon}  {s.label}
            </option>
          ))}
        </select>

        {/* Custom dropdown arrow */}
        <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
          <svg className="w-3 h-3 text-[#00ff88]/60" fill="none" viewBox="0 0 10 6">
            <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Active sector badge */}
      <p className="text-[9px] text-[#4a5568] tracking-widest mt-0.5">
        ACTIVE: <span className="text-[#00d4ff]">{value}</span>
      </p>
    </div>
  );
}
