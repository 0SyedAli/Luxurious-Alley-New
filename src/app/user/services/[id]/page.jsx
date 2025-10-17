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

const UserServicesDetails = () => {
  const { id } = useParams();
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
                {/* <div className="d-flex flex-column justify-content-between">
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
                      onClick={handleIncrement}
                    >
                      +
                    </button>
                    <span className="inc-dec-count">{count}</span>
                    <button
                      className="inc-dec-btn rounded-circle"
                      onClick={handleDecrement}
                    >
                      -
                    </button>
                  </div>
                </div> */}
              </div>

              {/* <h5 className="fw-medium mb-3 txt_color">Description</h5> */}
              <p className="text-light lh-lg mb-4 fw-light">
                {getService?.description ||
                  "Discription not available at the moment."}
              </p>
              {/* Stylists Details */}
              <h3 className="fw-bold mb-3 txt_color">Stylists</h3>
              <div className="card border-0 shadow-none bg-transparent">
                <div className="card-body bg-transparent ps-0">
                  <div className="d-flex align-items-start gap-3">
                    {/* Image */}
                    <img
                      src={
                        getService?.technicianId?.[0]?.image
                          ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${getService?.technicianId?.[0]?.image}`
                          : "/images/noimage.jpg"
                      }
                      alt="technician"
                      className="object-fit-cover rounded-circle flex-shrink-0"
                      style={{ height: "65px", width: "65px" }}
                    />

                    {/* Content */}
                    <div className="flex-grow-1">
                      <h6 className="card-title fw-bold mb-1 text-light">
                        {getService?.technicianId?.[0]?.fullName}
                      </h6>
                      <span className="badge bg-dark text-light border mb-2">
                        {getService?.technicianId?.[0]?.designation}
                      </span>

                      <div className="row g-2 fs-7">
                        {getService?.technicianId?.[0]?.email && (
                          <div className="col-12">
                            <strong className="text-light">Email: </strong>
                            <a
                              href={`mailto:${getService?.technicianId?.[0]?.email}`}
                              className="text-decoration-none text-light"
                            >
                              {getService?.technicianId?.[0]?.email}
                            </a>
                          </div>
                        )}

                        {getService?.technicianId?.[0]?.phoneNumber && (
                          <div className="col-12">
                            <strong className="text-light">Phone: </strong>
                            <a
                              href={`tel:${getService?.technicianId?.[0]?.phoneNumber}`}
                              className="text-decoration-none text-light"
                            >
                              {getService?.technicianId?.[0]?.phoneNumber}
                            </a>
                          </div>
                        )}

                        {getService?.technicianId?.[0]?.description && (
                          <div className="col-12 mt-1">
                            <strong className="text-light">About: </strong>
                            <span className="text-light">
                              {getService?.technicianId?.[0]?.description}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h5 className="fw-bold text-light mb-3 txt_color">
                  Available These days
                </h5>
              </div>
              <div className="d-flex flex-row gap-4 mb-4 flex-wrap">
                {getService?.technicianId?.[0]?.workingDays?.map((day, i) => {
                  return (
                    <div key={i}>
                      <div
                        className="fw-bold text-dark bg-light p-2 rounded-4 d-flex justify-content-center align-items-center"
                        style={{ width: "60px", height: "50px" }}
                      >
                        {day.day.slice(0, 3)}{" "}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div>
                <h5 className="fw-bold text-light mb-3 txt_color">
                  Time Range
                </h5>
              </div>
              <div className="d-flex flex-row gap-4 mb-4 flex-wrap align-items-center">
                <div
                  className="fw-bold text-dark bg-light py-2 px-3  rounded-4 d-flex justify-content-center align-items-center"
                  style={{ height: "50px" }}
                >
                  {getService?.technicianId?.[0]?.workingDays?.[0]?.startTime}
                </div>
                <span className="text-light">To</span>
                <div
                  className="fw-bold text-dark bg-light py-2 px-3 rounded-4 d-flex justify-content-center align-items-center"
                  style={{ height: "50px" }}
                >
                  {getService?.technicianId?.[0]?.workingDays?.[0]?.endTime}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserServicesDetails;
