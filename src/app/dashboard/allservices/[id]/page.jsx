"use client";
import React, { useEffect, useState } from "react";
import { FiMessageSquare } from "react-icons/fi";
import BorderTabs from "@/component/new/tabs/border-tabs";
import TabPanel from "@/component/new/tabs/tab-panel";
import ReviewCard from "@/component/new/cards/review-card";
import api from "@/lib/api";
import { usePathname, useRouter } from "next/navigation";

const UserDashboardProductServiceDetails = () => {
  const [activeTab, setActiveTab] = useState("customers reviews");
  const [serviceData, setServiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname(); // ✅ get full path
  const id = pathname.split("/").pop(); // ✅ extract ID from URL
  const router = useRouter();
  const tabs = [{ id: 1, value: "customers reviews", label: "Customers Reviews" }];

  // const reviews = [
  //   {
  //     id: 1,
  //     userName: "John Doe",
  //     date: "18 Oct 2023",
  //     rating: 5,
  //     text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.`,
  //     avatar: "/images/review_img.jpg",
  //   },
  // ];

  // ✅ Fetch Service Detail
  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const token = sessionStorage.getItem("authToken");
        const response = await api.get(`/getServiceById?id=${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response?.data?.success) {
          setServiceData(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch service:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [id]);

  if (loading) {
    return <p className="text-center text-light mt-5">Loading service details...</p>;
  }

  if (!serviceData) {
    return <p className="text-center text-danger mt-5">No service found.</p>;
  }

  // ✅ Extract data safely
  const {
    serviceName,
    price,
    description,
    images = [],
    salonId,
    review
  } = serviceData;

  const salonName = salonId?.bName || "Unnamed Salon";
  const salonAddress = salonId?.bAddress || "Address not available";
  const coverImage = images.length
    ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${images[0]}`
    : "/images/empty.png";
  const reviews = review
  return (
    <div className="userdashboard-product-details">
      <div className="row w-100">
        {/* Left Images Section */}
        <div className="col-md-4 d-flex flex-column gap-3">
          <div className="rounded-4 overflow-hidden shadow-sm">
            <img
              src={coverImage}
              alt="main product"
              className="object-fit-cover w-100 rounded-4"
              style={{ height: "300px" }}
            />
          </div>

          {/* Thumbnails — only show if there are 2 or more images */}
          {images.length > 1 && (
            <div className="d-flex flex-row gap-3 w-100">
              {images.slice(1).map((thumb, i) => (
                <div
                  key={i}
                  className="rounded-4 overflow-hidden shadow-sm cursor-pointer"
                  style={{ flex: 1 }}
                >
                  <img
                    src={
                      thumb.startsWith("http")
                        ? thumb
                        : `${process.env.NEXT_PUBLIC_IMAGE_URL}/${thumb}`
                    }
                    alt={`thumbnail-${i}`}
                    className="object-fit-cover w-100 rounded-4"
                    style={{ height: "150px" }}
                  />
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Right Content Section */}
        <div className="col-md-8 d-flex flex-column justify-content-start">
          <div className="ps-md-2 ps-0 pt-3 pt-md-0">
            <div className="d-flex justify-content-between gap-3 mb-4">
              <div>
                <h3 className="fw-bold mb-3 txt_color">{serviceName}</h3>
                <h5 className="fw-medium text-light mb-3">
                  {salonAddress} ({salonId?.city || "Unknown City"})
                </h5>
                <h5 className="fw-medium mb-3 txt_color">About {salonName}</h5>
                <p className="text-light lh-lg mb-0 fw-light">{description}</p>
              </div>
              <div className="d-flex flex-column justify-content-between">
                <div className="d-flex flex-row gap-3 align-items-center justify-content-end">
                  <button className="user-dashboard-box-btn" onClick={() => router.push(`/dashboard/allservices/edit/${id}`)}>Edit Now</button>
                </div>
              </div>
            </div>


            <h5 className="fw-bold txt_color">Price: ${price}</h5>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-4">
        <BorderTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          className="mb-3 apd"
        />

        <div className="tab-content">
          <TabPanel value={activeTab} tabValue="customers reviews">
            {reviews?.length > 0 ? (
              reviews.map((review) => (
                <ReviewCard key={review.id} {...review} className="mb-4" maxTextLength={150} />
              ))
            ) : (
              <p className="text-left text-white">No reviews for this product.</p>
            )}
            {/* {reviews.map((review) => (
              <ReviewCard
                key={review.id}
                {...review}
                className="mb-4"
                maxTextLength={150}
              />
            ))} */}
          </TabPanel>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardProductServiceDetails;
