"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FiMessageSquare } from "react-icons/fi";
import BorderTabs from "@/component/new/tabs/border-tabs";
import TabPanel from "@/component/new/tabs/tab-panel";
import ReviewCard from "@/component/new/cards/review-card";
import api from "@/lib/api";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const [activeTab, setActiveTab] = useState("customers reviews");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const pathname = usePathname(); // ✅ get full path
  const id = pathname.split("/").pop(); // ✅ extract ID from URL

  const tabs = [{ id: 1, value: "customers reviews", label: "Customers Reviews" }];

  useEffect(() => {
    if (id) fetchProductDetails(id);
  }, [id]);

  const fetchProductDetails = async (productId) => {
    try {
      setLoading(true);
      const res = await api.get(`/getProductById?id=${productId}`);
      if (res.data.success) {
        setProduct(res.data.data);
      } else {
        toast.error("Failed to load product details.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error loading product details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center text-white mt-5">Loading product details...</p>;
  if (!product) return <p className="text-center text-white mt-5">No product found.</p>;



  return (
    <div className="userdashboard-product-details">
      <div className="row w-100">
        {/* Left: Product Images */}
        <div className="col-md-4 d-flex flex-column gap-3">
          <div className="rounded-4 overflow-hidden shadow-sm">
            <img
              src={
                product?.images?.length
                  ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${product.images[0]}`
                  : "/images/p_view_main.png"
              }
              alt={product?.productName || "product"}
              className="object-fit-cover w-100 rounded-4"
              style={{ height: "300px" }}
            />
          </div>

          <div className="d-flex flex-row gap-3 w-100">
            {product?.images?.slice(1).map((img, i) => (
              <div key={i} className="rounded-4 overflow-hidden shadow-sm cursor-pointer" style={{ flex: 1 }}>
                <img
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${img}`}
                  alt={`thumbnail-${i}`}
                  className="object-fit-cover w-100 rounded-4"
                  style={{ height: "150px" }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="col-md-8 d-flex flex-column justify-content-start">
          <div className="ps-md-2 ps-0 pt-3 pt-md-0">
            <div className="d-flex justify-content-between gap-3 flex-wrap mb-4">
              <div>
                <h3 className="fw-bold mb-3 text-white">{product?.productName}</h3>
                <h4 className="fw-medium text-light mb-3">
                  {product?.salonId?.bAddress || "No address found"}
                </h4>
                <h5 className="fw-medium mb-3 text-white">
                  About {product?.salonId?.bName || "Salon"}
                </h5>
              </div>

              <div className="d-flex flex-column justify-content-between">
                <div className="d-flex flex-row gap-3 align-items-center justify-content-end">
                  <button
                    className="theme-btn2"
                    onClick={() => router.push(`/dashboard/allproducts/edit/${product._id}`)}
                  >
                    Edit Now
                  </button>
                </div>
              </div>
            </div>

            <p className="text-light lh-lg mb-4 fw-light">
              {product?.description || "No description available."}
            </p>

            <div className="text-light mt-2">
              <p className="mb-1"><strong>Brand:</strong> {product?.brandName || "N/A"}</p>
              <p className="mb-1"><strong>Model:</strong> {product?.modelName || "N/A"}</p>
              <p className="mb-1"><strong>Price:</strong> ${product?.price || "0"}</p>
              <p className="mb-1"><strong>Stock:</strong> {product?.stock || 0}</p>
              <p className="mb-1"><strong>Category:</strong> {product?.categoryId?.categoryName || "N/A"}</p>
              <p className="mb-1"><strong>Status:</strong> {product?.status || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-4">
        <BorderTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} className="mb-3 apd" />

        <div className="tab-content">
          <TabPanel value={activeTab} tabValue="customers reviews">
            {product?.reviews?.length > 0 ? (
              product.reviews.map((review) => (
                <ReviewCard key={review.id} {...review} className="mb-4" maxTextLength={150} />
              ))
            ) : (
              <p className="text-left text-white">No reviews for this product.</p>
            )}
          </TabPanel>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
