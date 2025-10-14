"use client";
import { ServiceCard } from "@/component/allservices/service-card";
import { products } from "../../../lib/products-data";
import { useRouter } from "next/navigation";

const AllProducts = () => {
  const router = useRouter();

  return (
    <main className="allproducts_gradientBg">
      <div className="container">
        {/* header */}
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h1 className={`h4 mb-0 allproducts_title`}>All Services</h1>
          <button className="btn btn-accept py-2 rounded-pill fw-semibold px-3" onClick={()=> router.push("/dashboard/addservices")}>
            Add Services
          </button>
        </div>

        {/* grid */}
        <div className="row g-3 g-lg-4">
          {products.map((p) => (
            <div
              key={p.id}
              className="col-12 col-sm-6 col-md-4 col-lg-3 col-xxl-2"
            >
              <ServiceCard
                {...p}
                onAction={() => router.push(`/dashboard/allservices/${p.id}`)} // ✅ Correct
                onActionBtn={(e) => {
                  e.stopPropagation(); // ✅ Prevent parent click
                  router.push(`/dashboard/allservices/edit/${p.id}`); // ✅ Correct
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default AllProducts;
