
function Icon({ name }) {
  const common = { width: 22, height: 22, fill: "none", stroke: "var(--brand-primary)", strokeWidth: 2 }
  switch (name) {
    case "sales":
      return (
        <svg {...common} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 7h16M6 7V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2M6 7l1.5 12a2 2 0 0 0 2 2h5a2 2 0 0 0 2-2L18 7" />
        </svg>
      )
    case "service":
      return (
        <svg {...common} viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21a8 8 0 0 1 16 0" />
        </svg>
      )
    case "booking":
      return (
        <svg {...common} viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M3 10h18M8 2v4M16 2v4" />
        </svg>
      )
    default:
      return (
        <svg {...common} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      )
  }
}

export default function StatCard({
  icon,
  title,
  value,
  delta,
  deltaPositive = true,
  subtitle,
}) {
  return (
    <div className="card glass border-0 h-100">
      <div className="card-body">
        <div className="d-flex align-items-center gap-2 mb-2">
          <div className="icon-circle">
            <Icon name={icon} />
          </div>
          <span className="text-white small">{title}</span>
        </div>
        <div className="d-flex align-items-end justify-content-between">
          <div>
            <div className="fs-4 fw-semibold">{value}</div>
            <div className="small d-flex align-items-center gap-1">
              {/* <span className={`fw-semibold ${deltaPositive ? "text-success" : "text-danger"}`}>
                {deltaPositive ? "▲" : "▼"} {delta}
              </span> */}
              <span className="text-success">{subtitle}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
