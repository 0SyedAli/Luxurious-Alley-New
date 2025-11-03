"use client";

import { useMemo, useState } from "react";

export default function LineChart({ labels, series, height = 260, yLabel }) {
  const width = 900;
  const padding = { l: 50, r: 30, t: 20, b: 40 };
  const [tooltip, setTooltip] = useState(null);

  const maxY = useMemo(() => {
    const all = series.flatMap((s) => s.data);
    return Math.max(10, Math.ceil(Math.max(...all) / 5) * 5);
  }, [series]);

  const points = (arr) =>
    arr
      .map((v, i) => {
        const x =
          padding.l + (i * (width - padding.l - padding.r)) / (labels.length - 1);
        const y =
          padding.t + (height - padding.t - padding.b) * (1 - v / maxY);
        return `${x},${y}`;
      })
      .join(" ");

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - padding.l;
    const index = Math.round(
      (x / (width - padding.l - padding.r)) * (labels.length - 1)
    );
    if (index >= 0 && index < labels.length) {
      setTooltip({ x: e.clientX - rect.left, y: e.clientY - rect.top, index });
    }
  };

  const handleMouseLeave = () => setTooltip(null);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <svg
        style={{ width: "100%", height: "auto", cursor: "crosshair" }}
        viewBox={`0 0 ${width} ${height}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Grid lines */}
        <g stroke="rgba(255,255,255,0.1)" strokeWidth="1">
          {Array.from({ length: 5 }).map((_, i) => {
            const y = padding.t + (i * (height - padding.t - padding.b)) / 4;
            return (
              <line
                key={i}
                x1={padding.l}
                x2={width - padding.r}
                y1={y}
                y2={y}
              />
            );
          })}
        </g>

        {/* Y-axis labels */}
        <g fontSize="10" fill="rgba(255,255,255,0.8)">
          {Array.from({ length: 5 }).map((_, i) => {
            const value = maxY - (i * maxY) / 4;
            const y = padding.t + (i * (height - padding.t - padding.b)) / 4;
            return (
              <text key={i} x={5} y={y + 4}>
                ${value}
              </text>
            );
          })}
          <text
            x={10}
            y={padding.t - 10}
            fontWeight="bold"
            fill="rgba(255,255,255,0.7)"
          >
            {yLabel}
          </text>
        </g>

        {/* X-axis labels */}
        <g fontSize="10" fill="rgba(255,255,255,0.8)">
          {labels.map((m, i) => {
            const x =
              padding.l + (i * (width - padding.l - padding.r)) / (labels.length - 1);
            const y = height - 10;
            return (
              <text key={m} x={x} y={y} textAnchor="middle">
                {m}
              </text>
            );
          })}
        </g>

        {/* Data lines */}
        {series.map((s) => (
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
      </svg>

      {/* Tooltip */}
      {tooltip && (
        <div
          style={{
            position: "absolute",
            left: tooltip.x + 10,
            top: tooltip.y - 30,
            background: "rgba(0,0,0,0.7)",
            color: "#fff",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "12px",
            pointerEvents: "none",
          }}
        >
          <div>
            <strong>{labels[tooltip.index]}</strong>
          </div>
          <div>
            ${series[0].data[tooltip.index]?.toLocaleString() || 0}
          </div>
        </div>
      )}
    </div>
  );
}
