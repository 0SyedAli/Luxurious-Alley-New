"use client"

import { useMemo } from "react"

export default function LineChart({
  labels,
  series,
  height = 260,
}) {
  const width = 900
  const padding = { l: 40, r: 20, t: 10, b: 30 }

  const maxY = useMemo(() => {
    const all = series.flatMap((s) => s.data)
    return Math.max(10, Math.ceil(Math.max(...all) / 5) * 5)
  }, [series])

  const points = (arr) =>
    arr
      .map((v, i) => {
        const x = padding.l + (i * (width - padding.l - padding.r)) / (labels.length - 1)
        const y = padding.t + (height - padding.t - padding.b) * (1 - v / maxY)
        return `${x},${y}`
      })
      .join(" ")

  return (
    <svg
      style={{width:"100%", height:"auto"}}
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height={height}
      role="img"
      aria-label="Monthly bookings line chart"
    >
      {/* background grid */}
      <defs>
        <linearGradient id="chartBg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width={width} height={height} fill="url(#chartBg)" rx="12" />
      {/* axes */}
      <g stroke="rgba(255,255,255,0.15)" strokeWidth="1">
        {/* horizontal lines */}
        {Array.from({ length: 5 }).map((_, i) => {
          const y = padding.t + (i * (height - padding.t - padding.b)) / 4
          return <line key={i} x1={padding.l} x2={width - padding.r} y1={y} y2={y} />
        })}
        {/* vertical lines */}
        {labels.map((_, i) => {
          const x = padding.l + (i * (width - padding.l - padding.r)) / (labels.length - 1)
          return <line key={i} x1={x} x2={x} y1={padding.t} y2={height - padding.b} opacity={0.25} />
        })}
      </g>
      {/* series lines */}
      {series.map((s, idx) => (
        <polyline
          key={s.name}
          fill="none"
          stroke={s.color}
          strokeWidth={3}
          points={points(s.data)}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      ))}
      {/* labels */}
      <g fontSize="10" fill="transparent">
        {labels.map((m, i) => {
          const x = padding.l + (i * (width - padding.l - padding.r)) / (labels.length - 1)
          const y = height - 10
          return (
            <text key={m} x={x} y={y} textAnchor="middle">
              {m}
            </text>
          )
        })}
      </g>
    </svg>
  )
}
