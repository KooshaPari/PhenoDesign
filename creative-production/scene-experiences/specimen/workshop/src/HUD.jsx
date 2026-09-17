import React, { useMemo } from 'react'

export default function HUD({ beat, beatIndex, beats, aperture, onAperture, progress, reducedMotion, onToggleMotion }) {
  // Listen for aperture changes from 3D scene drag
  React.useEffect(() => {
    const handler = (e) => onAperture(e.detail)
    window.addEventListener('pd:aperture', handler)
    return () => window.removeEventListener('pd:aperture', handler)
  }, [onAperture])

  const cssVars = useMemo(() => {
    const a = aperture
    return `:root {
  --pd-glass-opacity: ${(0.15 + a * 0.7).toFixed(2)};
  --pd-glass-blur: ${(2 + a * 14).toFixed(0)}px;
  --pd-glass-tint: #7eb8da;
  --pd-keycap-shadow: ${(1 + a * 7).toFixed(1)}px;
  --pd-keycap-relief: ${(0.5 + a * 3.5).toFixed(1)}px;
  --pd-keycap-surface: #1a1a2e;
  --pd-neumorphism-shadow: ${(2 + a * 8).toFixed(1)}px;
  --pd-neumorphism-relief: ${(1 + a * 4).toFixed(1)}px;
  --pd-neumorphism-surface: #2a2a3e;
  --pd-polygon-opacity: ${(0.3 + a * 0.7).toFixed(2)};
}`
  }, [aperture])

  const copyCSS = () => {
    navigator.clipboard.writeText(cssVars).catch(() => {})
  }

  return (
    <>
      {/* Progress bar */}
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress * 100}%` }} />
      </div>

      {/* Scene label */}
      <div className="scene-label">
        Workshop / {String(beatIndex + 1).padStart(2, '0')} — {beat.title}
      </div>

      {/* Bottom HUD */}
      <div className="hud">
        <div className="hud-text">
          <h2 className="hud-title">{beat.title}</h2>
          <p className="hud-sub">{beat.sub}</p>
          <p className="hud-hint">{beat.hint}</p>
        </div>

        <div className="hud-controls">
          <label className="control-group">
            <span className="control-label">Aperture</span>
            <input
              type="range"
              min="0"
              max="100"
              value={Math.round(aperture * 100)}
              onChange={(e) => onAperture(Number(e.target.value) / 100)}
              className="aperture-slider"
            />
            <span className="aperture-value">{Math.round(aperture * 100)}%</span>
          </label>

          <button
            className="control-btn"
            onClick={onToggleMotion}
            aria-pressed={reducedMotion}
          >
            {reducedMotion ? 'Motion off' : 'Motion on'}
          </button>

          <button className="control-btn" onClick={() => onAperture(0.5)}>
            Reset
          </button>
        </div>
      </div>

      {/* CSS output panel — visible on beat 5-6 */}
      {beatIndex >= 4 && (
        <div className="css-panel">
          <button className="copy-btn" onClick={copyCSS}>Copy CSS</button>
          <pre className="css-output">{cssVars}</pre>
        </div>
      )}

      {/* Beat dots */}
      <div className="beat-dots">
        {beats.map((b, i) => (
          <div
            key={b.id}
            className={`beat-dot ${i === beatIndex ? 'active' : ''} ${i < beatIndex ? 'passed' : ''}`}
          />
        ))}
      </div>
    </>
  )
}
