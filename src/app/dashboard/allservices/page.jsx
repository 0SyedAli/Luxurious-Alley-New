"use client";
import { ServiceCard } from "@/component/allservices/service-card";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchServicesBySalon } from "@/redux/features/services/servicesSlice";

const AllServices = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { data: services, status, error } = useSelector((state) => state.services);

  const salonId = sessionStorage.getItem("adminId");

  useEffect(() => {
    if (salonId) dispatch(fetchServicesBySalon(salonId));
  }, [dispatch, salonId]);

  // ✅ Handle "no products" and "product not found" both as empty state
  const showNoServices =
    (Array.isArray(services) && services.length === 0) ||
    error?.toLowerCase().includes("product not found");

  return (
    <main className="allproducts_gradientBg w-100">
      {/* header */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h1 className={`h4 mb-0 allproducts_title`}>All Services</h1>
        <button className="btn btn-accept py-2 rounded-pill fw-semibold px-3" onClick={() => router.push("/dashboard/addservices")}>
          Add Services
        </button>
      </div>

      {status === "loading" ? (
        <p>Loading services...</p>
      ) : status === "failed" && !error?.toLowerCase().includes("product not found") ? (
        <p className="text-danger">{error}</p>
      ) : showNoServices ? (
        <p>No services found.</p>
      ) : (
        <div className="row g-3 g-lg-4">
          {services.map((p) => (
            <div
              key={p._id}
              className="col-12 col-sm-6 col-md-4 col-lg-3 col-xxl-2"
            >
              <ServiceCard
                {...p}
                onAction={() => router.push(`/dashboard/allservices/${p._id}`)} // ✅ Correct
                onActionBtn={(e) => {
                  e.stopPropagation(); // ✅ Prevent parent click
                  router.push(`/dashboard/allservices/edit/${p._id}`); // ✅ Correct
                }}
              />
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default AllServices;
