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
import { setBooking } from "@/redux/features/booking/bookingSlice";
import { useSelector } from "react-redux";

const UserServicesDetails = () => {
  const { id } = useParams();
  const state = useSelector((state) => state.booking);
  const [getService, setGetService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const router = useRouter();

  const getOneService = async () => {
    try {
      const { data } = await api.get(`/getServiceById?id=${id}`);
      if (data.success) {
        setGetService(data.data);
      }
    } catch (error) {
      console.log("Error fetching salons:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOneService();
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
                  getService?.images && getService.images.length > 0
                    ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${getService.images[selectedImageIndex]}`
                    : "/images/noimage.jpg"
                }
                alt="main product"
                className="object-fit-cover w-100 rounded-4"
                style={{ height: "300px" }} // Fixed height
              />
            </div>

            {/* Thumbnails */}
            {getService?.images && getService.images.length > 1 && (
              <div className="d-flex flex-row gap-3 w-100">
                {getService.images.map((image, index) => (
                  <div
                    key={index}
                    className={`rounded-4 overflow-hidden shadow-sm cursor-pointer ${
                      selectedImageIndex === index ? "border border-dark" : ""
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
              <div className="d-flex justify-content-between gap-3 ">
                <div className="flex-grow-1">
                  <h3 className="fw-bold mb-3 txt_color">
                    {getService?.serviceName || "N/A"}
                  </h3>
                  <h4 className="fw-medium text-light mb-3">
                    ${Number(getService?.price).toFixed(2) || "0"}
                  </h4>
                </div>
                <div className="d-flex flex-column justify-content-between">
                  <div className="mb-3">
                    <button
                      className="user-dashboard-box-btn"
                      onClick={() => {
                        router.push(
                          state.isService
                            ? `/user/stylists/${id}`
                            : `/user/book-appointment/${state.technicianId}`
                        );
                      }}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>

              {/* <h5 className="fw-medium mb-3 txt_color">Description</h5> */}
              <p className="text-light lh-lg mb-4 fw-light">
                {getService?.description ||
                  "Discription not available at the moment."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserServicesDetails;
