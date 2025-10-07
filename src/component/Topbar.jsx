import Image from "next/image";

export default function Topbar() {
  return (
    <div className="dash_top_header my-4 ">
      <header className="d-flex align-items-center justify-content-between dth_content">
        <div>
          <h2 className="display-6 fw-semibold text-balance text-brand-primary mb-1">Hi Hair Affair,</h2>
          <p className="text-white small mb-0">A reason to dye</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <Image
            src="/images/dashboard-prof.png"
            alt="User avatar"
            width={44}
            height={44}
            className="rounded-circle object-fit-cover text-white"
            style={{ width: 44, height: 44 }}
          />
          <div className="text-start me-2">
            <h4 className="fw-medium text-white">Hi HairAffair</h4>
            <div className="text-white small">Los Angeles</div>
          </div>
        </div>
      </header>
    </div>
  );
}