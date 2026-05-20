/**
 * DecoderOutput.jsx — Bottom terminal-style decoder output panel.
 *
 * Displays:
 *   - A "[DECODE SUCCESSFUL]" header with typewriter reveal animation.
 *   - The full steganographic interpretation text.
 *   - The dimensional prognosis.
 *   - The raw JSON data model (collapsible).
 *   - An error state if the analysis pipeline fails.
 */
import React, { useEffect, useRef, useState } from 'react';

/** Characters to display after "[DECODE SUCCESSFUL]" flickers in. */
const BOOT_LINES = [
  '> Kaluza-Klein Engine v1.0.0 — Dimensional Analysis Complete',
  '> Steganographic Pattern Extraction: OK',
  '> Translating Vector Field to Semantic Output...',
];

/**
 * @param {{
 *   result: object | null,
 *   isScanning: boolean,
 *   error: string | null,
 * }} props
 */
export default function DecoderOutput({ result, isScanning, error }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showJSON, setShowJSON] = useState(false);
  const outputRef = useRef(null);

  // Animate boot lines sequentially when a result arrives
  useEffect(() => {
    if (!result) { setVisibleLines(0); return; }
    setVisibleLines(0);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setVisibleLines(i);
      if (i >= BOOT_LINES.length) clearInterval(id);
    }, 250);
    return () => clearInterval(id);
  }, [result]);

  // Auto-scroll to bottom when content updates
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [result, visibleLines]);

  return (
    <div className="panel h-64 flex flex-col overflow-hidden">
      {/* ── Terminal header bar ── */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#1a1a3e] shrink-0">
        <div className="flex items-center gap-3">
          {/* Traffic light dots */}
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff2d55]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff6b1a]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#00ff88]" />
          </div>
          <span className="text-[10px] tracking-[0.25em] text-[#00ff88]/70 uppercase">
            {result
              ? `[${result.decoder_output.status}] · ${result.meta.sector_label}`
              : isScanning
              ? '[PROCESSING...]'
              : '[AWAITING INPUT]'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {result && (
            <>
              <span className="text-[9px] text-[#4a5568]">
                {new Date(result.meta.timestamp).toLocaleTimeString()}
              </span>
              <button
                onClick={() => setShowJSON(v => !v)}
                className="text-[9px] tracking-widest text-[#4a5568] hover:text-[#00d4ff] transition-colors uppercase"
              >
                {showJSON ? '< Hide JSON' : '{ View JSON }'}
              </button>
            </>
          )}
        </div>
      </div>

      {/* ── Terminal body ── */}
      <div
        ref={outputRef}
        className="flex-1 overflow-y-auto px-4 py-3 font-mono text-xs leading-relaxed"
      >
        {/* Error state */}
        {error && (
          <p className="text-[#ff2d55]">
            <span className="text-[#4a5568]">ERR &gt; </span>
            {error}
          </p>
        )}

        {/* Scanning state */}
        {isScanning && !error && (
          <div className="flex items-center gap-2 text-[#00ff88]/60">
            <span className="inline-block w-2 h-2 border border-[#00ff88] border-t-transparent rounded-full animate-spin" />
            <span>Analysing dimensional vectors... please wait</span>
          </div>
        )}

        {/* Idle state */}
        {!isScanning && !result && !error && (
          <span className="text-[#2a2a4e]">
            Upload an image and initiate scan to decode dimensional patterns.
            <span className="cursor-blink" />
          </span>
        )}

        {/* Result state */}
        {result && !showJSON && (
          <div className="flex flex-col gap-2">
            {/* Boot lines */}
            {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
              <p key={i} className="text-[#4a5568] text-[10px]">{line}</p>
            ))}

            {visibleLines >= BOOT_LINES.length && (
              <>
                <div className="h-px bg-[#1a1a3e] my-1" />

                {/* Interpretation */}
                <div>
                  <span className="text-[#00ff88]/50 text-[10px]">INTERPRETATION &gt; </span>
                  <span className="text-[#e2e8f0]">
                    {result.decoder_output.interpretation}
                  </span>
                </div>

                {/* Prognosis */}
                <div>
                  <span className="text-[#ff6b1a]/70 text-[10px]">PROGNOSIS &gt; </span>
                  <span className="text-[#ff6b1a]">
                    {result.decoder_output.prognosis}
                  </span>
                </div>

                {/* Symmetry state */}
                <div>
                  <span className="text-[#00d4ff]/50 text-[10px]">SUSY/SYM &gt; </span>
                  <span className="text-[#00d4ff]">
                    {result.dimensions_analysis.symmetry.semantic_state}
                  </span>
                </div>

                <span className="cursor-blink" />
              </>
            )}
          </div>
        )}

        {/* JSON view */}
        {result && showJSON && (
          <pre className="text-[9px] text-[#4a5568] whitespace-pre-wrap break-all leading-relaxed">
            <span className="text-[#00d4ff]">{'// Raw AnalysisResult JSON\n'}</span>
            {JSON.stringify(result, null, 2)
              .split('\n')
              .map((line, i) => {
                // Colour-code JSON keys vs values for readability
                const coloured = line
                  .replace(/"([^"]+)":/g, '<k>"$1":</k>')
                  .replace(/: "([^"]+)"/g, ': <s>"$1"</s>')
                  .replace(/: (true|false)/g, ': <b>$1</b>')
                  .replace(/: (-?[\d.]+)/g, ': <n>$1</n>');
                return (
                  <span
                    key={i}
                    // dangerouslySetInnerHTML is safe here — content is our own JSON, not user HTML
                    dangerouslySetInnerHTML={{
                      __html: coloured
                        .replace(/<k>/g, '<span style="color:#00d4ff">')
                        .replace(/<\/k>/g, '</span>')
                        .replace(/<s>/g, '<span style="color:#00ff88">')
                        .replace(/<\/s>/g, '</span>')
                        .replace(/<b>/g, '<span style="color:#ff6b1a">')
                        .replace(/<\/b>/g, '</span>')
                        .replace(/<n>/g, '<span style="color:#a855f7">')
                        .replace(/<\/n>/g, '</span>'),
                    }}
                  />
                );
              })
              .reduce((acc, el, i, arr) => {
                acc.push(el);
                if (i < arr.length - 1) acc.push('\n');
                return acc;
              }, [])}
          </pre>
        )}
      </div>
    </div>
  );
}
