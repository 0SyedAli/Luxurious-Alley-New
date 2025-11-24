"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  fetchProductsBySalon,
} from "@/redux/features/products/productsSlice";
import { ProductCard } from "@/component/allproduct/product-card";
import api from "@/lib/api";

const AllProducts = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    data: products,
    status,
    error,
  } = useSelector((state) => state.products);

  const salonId = sessionStorage.getItem("adminId");

  useEffect(() => {
    if (salonId) dispatch(fetchProductsBySalon(salonId));
  }, [dispatch, salonId]);

  // ✅ Handle "no products" and "product not found" both as empty state
  const showNoProducts =
    (Array.isArray(products) && products.length === 0) ||
    error?.toLowerCase().includes("product not found");

  // ========== Delete Product ==========
  const handleDeleteProduct = async (id) => {
    try {
      await api.post("/deleteProduct", { id });

      // Remove deleted product from UI
      dispatch(fetchProductsBySalon(salonId));
    } catch (error) {
      console.error("Delete product failed:", error);
    }
  };

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
      ) : status === "failed" &&
        !error?.toLowerCase().includes("product not found") ? (
        <p className="text-danger">{error}</p>
      ) : showNoProducts ? (
        <p>No products found.</p>
      ) : (
        <div className="table-responsive">
          <table
            className="product_table table table-dark table-hover align-middle rounded-3 overflow-hidden"
            style={{ backgroundColor: "#f4bb0140" }}
          >
            <thead className="text-dark bg-transparent">
              <tr>
                <th style={{ width: 80 }}>Image</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Seller</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p) => {
                const productImage = p?.images?.length
                  ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${p.images[0]}`
                  : "/images/product2.png";

                const productName = p?.productName || "Unnamed Product";

                const price = p?.price ? p.price.toFixed(2) : "0.00";

                const stock = p?.stock !== undefined && p?.stock !== null ? p.stock : "N/A";

                const sellerAvatar = p?.salonId?.bImage
                  ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${p.salonId.bImage}`
                  : "/images/order-prof.png";

                const sellerName = p?.salonId?.bName || "Unknown";

                const status = p?.status || "Pending";

                return (
                  <tr key={p._id}>
                    <td>
                      <img
                        src={productImage}
                        alt="product"
                        width={50}
                        height={50}
                        className="rounded border"
                        style={{ objectFit: "cover" }}
                      />
                    </td>

                    <td className="text-white ">{productName}</td>

                    <td className="text-white ">${price}</td>

                    <td className="text-white ">{stock}</td>

                    <td className="text-white">
                      <div className="d-flex align-items-center gap-2">
                        <img
                          src={sellerAvatar}
                          width={35}
                          height={35}
                          className="rounded-circle"
                        />
                        {sellerName}
                      </div>
                    </td>

                    <td className="text-white ">{status}</td>

                    <td style={{ width: "200px" }}>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-sm btn-outline-warning fw-bold px-2"
                          style={{ fontSize: "12px" }}
                          onClick={() =>
                            router.push(`/dashboard/allproducts/edit/${p._id}`)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-sm btn-outline-info fw-bold  px-2"
                          style={{ fontSize: "12px" }}
                          onClick={() =>
                            router.push(`/dashboard/allproducts/${p._id}`)
                          }
                        >
                          View
                        </button>

                        <button
                          className="btn btn-sm btn-outline-danger fw-bold  px-2"
                          style={{ fontSize: "12px" }}
                          onClick={() => {
                            if (confirm("Are you sure you want to delete this product?")) {
                              handleDeleteProduct(p._id);
                            }
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      )}

    </main>
  );
};

export default AllProducts;