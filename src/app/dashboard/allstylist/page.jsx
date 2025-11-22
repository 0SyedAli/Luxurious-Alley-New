"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import api from "@/lib/api";

const AllStylists = () => {
  const router = useRouter();

  const [stylists, setStylists] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const salonId = typeof window !== "undefined"
    ? sessionStorage.getItem("adminId")
    : null;

  // ======== Fetch Stylists ========
  const getAllStylists = async () => {
    try {
      setStatus("loading");

      const res = await api.get(`/getAllStylistsBySalonId?salonId=${salonId}`);
      const json = res.data;

      if (json.success) {

        // 🔥 FILTER OUT isDeleted === true
        const activeStylists = json.data.filter(s => s.isDeleted === false);

        setStylists(activeStylists);
        setStatus("succeeded");

      } else {
        setError(json.message || "Failed to load stylist data");
        setStatus("failed");
      }
    } catch (err) {
      setError(err.message);
      setStatus("failed");
    }
  };



  useEffect(() => {
    if (salonId) getAllStylists();
  }, [salonId]);

  // ========== Delete Stylist ==========
  const handleDelete = async (id) => {
    try {
      await api.post('/deleteStylists',
        { technicianId: id }
      );

      setStylists((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  // === empty state ===
  const showNoStylists =
    (Array.isArray(stylists) && stylists.length === 0) ||
    error?.toLowerCase().includes("not found");

  return (
    <main className="allproducts_gradientBg w-100">
      {/* header */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h1 className="h4 mb-0 allproducts_title">All Stylists</h1>
        <button
          className="btn btn-accept py-2 rounded-pill fw-semibold px-3"
          onClick={() => router.push("/dashboard/addstylist")}
        >
          Add Stylist
        </button>
      </div>

      {/* grid */}
      {status === "loading" ? (
        <p>Loading stylists...</p>
      ) : status === "failed" &&
        !error?.toLowerCase().includes("not found") ? (
        <p className="text-danger">{error}</p>
      ) : showNoStylists ? (
        <p>No stylists found.</p>
      ) : (
        <div className="row g-3 g-lg-4">
          {stylists.map((s) => (
            <div key={s._id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
              <div
                className="card p-3 h-100 rounded-4 text-center shadow-sm glass2"
                style={{ cursor: "pointer" }}
              >
                {/* Image */}
                <img
                  src={
                    s.image
                      ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${s.image}`
                      : "/images/order-prof.png"
                  }
                  alt="stylist"
                  className="img-fluid rounded-circle mb-3 mx-auto"
                  style={{ height: "120px", width: "120px", objectFit: "cover" }}
                />

                <h5 className="fw-bold mb-1">{s.fullName}</h5>
                <p className=" small mb-2">{s.designation}</p>
                <p className="small mb-2">📞 {s.phoneNumber}</p>

                <div className="d-flex justify-content-between mt-3">

                  <button
                    className="btn btn-sm btn-danger w-100"
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete stylist?`)) {
                        handleDelete(s._id);
                      }
                    }}
                  >
                    Delete
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default AllStylists;
