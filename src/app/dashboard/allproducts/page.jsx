"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsBySalon } from "@/redux/features/products/productsSlice";
import { ProductCard } from "@/component/allproduct/product-card";

const AllProducts = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { data: products, status, error } = useSelector((state) => state.products);

  const salonId = sessionStorage.getItem("adminId");

  useEffect(() => {
    if (salonId) dispatch(fetchProductsBySalon(salonId));
  }, [dispatch, salonId]);

  // ✅ Handle "no products" and "product not found" both as empty state
  const showNoProducts =
    (Array.isArray(products) && products.length === 0) ||
    error?.toLowerCase().includes("product not found");

  return (
    <main className="allproducts_gradientBg w-100">
      {/* header */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h1 className="h4 mb-0 allproducts_title">All Products</h1>
        <button
          className="btn btn-accept py-2 rounded-pill fw-semibold px-3"
          onClick={() => router.push("/dashboard/addproduct")}
        >
          Add Product
        </button>
      </div>

      {/* grid */}
      {status === "loading" ? (
        <p>Loading products...</p>
      ) : status === "failed" && !error?.toLowerCase().includes("product not found") ? (
        <p className="text-danger">{error}</p>
      ) : showNoProducts ? (
        <p>No products found.</p>
      ) : (
        <div className="row g-3 g-lg-4">
          {products.map((p) => (
            <div key={p._id} className="col-12 col-sm-6 col-md-4 col-lg-3 col-xxl-2">
              <ProductCard
                title={p.productName}
                price={p.price}
                image={
                  p.images?.length > 0
                    ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${p.images[0]}`
                    : "/images/product2.png"
                }
                sellerName={p.salonId?.bName || "Unknown Salon"}
                sellerAvatar={
                  p.salonId?.bImage
                    ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${p.salonId.bImage}`
                    : "/images/order-prof.png"
                }
                onAction={() => router.push(`/dashboard/allproducts/${p._id}`)}
                onActionBtn={(e) => {
                  e.stopPropagation();
                  router.push(`/dashboard/allproducts/edit/${p._id}`);
                }}
              />
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default AllProducts;
