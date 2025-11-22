"use client";
import { UserProductCard } from "@/component/new/cards/product-card";
import ReviewCard from "@/component/new/cards/review-card";
import BorderTabs from "@/component/new/tabs/border-tabs";
import TabPanel from "@/component/new/tabs/tab-panel";
import { userproducts } from "../../../../lib/products-data";
import { useParams, useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import { FiMessageSquare } from "react-icons/fi";
import api from "@/lib/api";
import ReviewModal from "@/component/new/modals/review-modal/page";

const tabs = [
  {
    id: 1,
    value: "customers reviews",
    label: "Customers Reviews",
  },
];

const UserProductDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("customers reviews");
  const [count, setCount] = useState(0);
  const [getProduct, setGetProduct] = useState(null);
  const [getProductTab, setGetProductTab] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabLoading, setTabLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const router = useRouter();

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const userId = "68f11c79f180d3689c7ca111";

  const getOneProduct = async () => {
    try {
      const { data } = await api.get(`/getProductById?id=${id}`);
      if (data.success) {
        setGetProduct(data.data);
      }
    } catch (error) {
      console.log("Error fetching salons:", error);
    } finally {
      setLoading(false);
    }
  };

  const getProductTabData = async () => {
    setTabLoading(true);
    try {
      const { data } = await api.get(
        `/getRatingByProductOrStar?productId=${id}`
      );
      if (data.success) {
        setGetProductTab(data.data);
      }
    } catch (error) {
      console.log("Error fetching salons:", error);
    } finally {
      setTabLoading(false);
    }
  };

  const handleSubmitReview = async (reviewData) => {
    setIsSubmitting(true);

    try {
      const { data } = await api.post("/giveRatingToProduct", {
        productId: id,
        userId: userId,
        stars: reviewData.stars,
        message: reviewData.message,
      });

      console.log(data);
      setOpen(false);
      getProductTabData();
    } catch (error) {
      console.log("Error submitting review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    getOneProduct();
    getProductTabData();
  }, [id]);

  return (
    <div className="userdashboard-product-details">
      {loading ? (
        <div className="d-flex justify-content-center align-items-center py-4">
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row w-100 mb-5">
          {/* Image Section - Left Side */}
          <div className="col-md-4 d-flex flex-column gap-3">
            {/* Main Image */}
            <div className="rounded-4 overflow-hidden shadow-sm">
              <img
                src={
                  getProduct?.images && getProduct.images.length > 0
                    ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${getProduct.images[selectedImageIndex]}`
                    : "/images/noimage.jpg"
                }
                alt="main product"
                className="object-fit-cover w-100 rounded-4"
                style={{ height: "300px" }} // Fixed height
              />
            </div>

            {/* Thumbnails */}
            {getProduct?.images && getProduct.images.length > 1 && (
              <div className="d-flex flex-row gap-3 w-100">
                {getProduct.images.map((image, index) => (
                  <div
                    key={index}
                    className={`rounded-4 overflow-hidden shadow-sm cursor-pointer ${selectedImageIndex === index ? "border border-dark" : ""
                      }`}
                    style={{ flex: 1 }}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <img
                      src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${image}`}
                      alt={`product view ${index + 1}`}
                      className="object-fit-cover w-100 rounded-4"
                      style={{ height: "100px" }} // Smaller thumbnails
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Content Section - Right Side */}
          <div className="col-md-8 d-flex flex-column justify-content-start">
            <div className=" pt-3 pt-md-0">
              <div className="d-flex justify-content-between gap-3 mb-4">
                <div className="flex-grow-1">
                  <h3 className="fw-bold mb-3 txt_color">
                    {getProduct?.productName || "N/A"}
                  </h3>
                  <h4 className="fw-medium text-light mb-3">
                    ${Number(getProduct?.price).toFixed(2) || "0"} (
                    {getProduct?.stock || "0"} available)
                  </h4>
                </div>
                <div className="d-flex flex-column justify-content-between">
                  <div className="d-flex flex-row gap-3 align-items-center justify-content-end mb-3">
                    <button
                      className="d-flex text-light align-items-center gap-2 rounded-circle p-2"
                      style={{
                        backgroundColor: "#19CC89",
                        border: "1px solid #19CC89",
                      }}
                    >
                      <FiMessageSquare size={28} />
                    </button>
                    <button
                      className="user-dashboard-box-btn-two"
                      onClick={() => router.push("/user/cart")}
                    >
                      Add to Cart
                    </button>
                    <button className="user-dashboard-box-btn">Buy Now</button>
                  </div>
                  <div className="d-flex flex-row gap-3 align-items-center justify-content-end">
                    <button
                      className="inc-dec-btn rounded-circle"
                      onClick={handleDecrement}
                    >
                      -
                    </button>
                    <span className="inc-dec-count">{count}</span>
                    <button
                      className="inc-dec-btn rounded-circle"
                      onClick={handleIncrement}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* <h5 className="fw-medium mb-3 txt_color">Description</h5> */}
              <p className="text-light lh-lg mb-4 fw-light">
                {getProduct?.description ||
                  `Discription not available at the moment.`}
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Tabs Card section */}
      <div className="mt-4">
        <BorderTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          className="mb-3"
          onWriteReviewClick={() => setOpen(true)}
        />

        {/* Tab Panels */}
        <div className="tab-content">
          <TabPanel value={activeTab} tabValue="customers reviews">
            {tabLoading ? (
              <div className="w-100 d-flex justify-content-center align-items-center py-4">
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              getProductTab.length !== 0 &&
              getProductTab.map((review, i) => (
                <ReviewCard
                  key={i}
                  avatar={review.userId?.image}
                  date={review?.createdAt?.split("T")?.[0]}
                  text={review?.message}
                  userName={review.userId?.username}
                  rating={review?.stars}
                  className="mb-4"
                  maxTextLength={150}
                />
              ))
            )}

            {/* Show message if no salons available */}
            {!tabLoading && getProductTab.length === 0 && (
              <div className="text-center py-4">
                <p className="text-light">
                  No product customers review available at the moment.
                </p>
              </div>
            )}
          </TabPanel>
        </div>
      </div>
      <ReviewModal
        show={open}
        onHide={() => setOpen(false)}
        onSubmit={handleSubmitReview}
        salonId={id}
        userId={userId}
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default UserProductDetails;
