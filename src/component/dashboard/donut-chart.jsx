export default function DonutChart({
  percent,
  size = 220,
  strokeWidth = 16,
  strokeColor = "var(--brand-primary)",
  trackColor = "rgba(255,255,255,0.12)",
}) {
  const r = (size - strokeWidth) / 2
  const c = 2 * Math.PI * r
  const dash = (percent / 100) * c
  const center = size / 2

  return (
    <div className="d-flex align-items-center justify-content-center h-100">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Donut progress">
        <defs>
          <linearGradient id="donutGrad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--brand-primary)" />
            <stop offset="100%" stopColor="var(--brand-accent)" />
          </linearGradient>
        </defs>
        <circle cx={center} cy={center} r={r} stroke={trackColor} strokeWidth={strokeWidth} fill="none" />
        <circle
          cx={center}
          cy={center}
          r={r}
          stroke="url(#donutGrad)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${dash} ${c - dash}`}
          strokeLinecap="round"
          transform={`rotate(-90 ${center} ${center})`}
        />
        <g transform={`translate(${center}, ${center})`} textAnchor="middle">
          <text className="fw-semibold" fontSize="28" fill="var(--brand-primary)" dy="8">
            {percent}%
          </text>
        </g>
      </svg>
    </div>
  )
}
