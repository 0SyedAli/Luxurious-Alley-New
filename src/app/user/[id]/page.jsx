"use client";
import { UserProductCard } from "@/component/new/cards/product-card";
import ReviewCard from "@/component/new/cards/review-card";
import BorderTabs from "@/component/new/tabs/border-tabs";
import TabPanel from "@/component/new/tabs/tab-panel";
import api from "@/lib/api";
import { userproducts } from "@/lib/products-data";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiMessageSquare } from "react-icons/fi";

const reviews = [
  {
    id: 1,
    userName: "John Doe",
    date: "18 Oct 2023",
    rating: 5,
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
    avatar: "/images/review_img.jpg",
  },
  {
    id: 2,
    userName: "Jane Smith",
    date: "15 Oct 2023",
    rating: 4,
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
    avatar: "/images/review_img.jpg",
  },
];

const tabs = [
  {
    id: 1,
    value: "products",
    label: "Products",
  },
  {
    id: 2,
    value: "services",
    label: "Services",
  },
  {
    id: 3,
    value: "stylists",
    label: "Stylists",
  },
  {
    id: 4,
    value: "customers reviews",
    label: "Customers Reviews",
  },
];

const TabPanelApi = {
  products: "/getAllProductsBySalonId?salonId=",
  services: "/getAllServicesBySalonId?salonId=",
  stylists: "/getAllStylistsBySalonId?salonId=",
  "customers reviews": "/getRatingBySalonOrStar?salonId=",
};

const UserDashboardProductServiceDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("products");
  const [getSalon, setGetSalon] = useState(null);
  const [getSalonTab, setGetSalonTab] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabLoading, setTabLoading] = useState(true);
  const router = useRouter();

  const getOneSalon = async () => {
    try {
      const response = await api.get(`/getAdminById?salonId=${id}`);
      if (response.data.success) {
        setGetSalon(response.data.data);
      }
    } catch (error) {
      console.log("Error fetching salons:", error);
    } finally {
      setLoading(false);
    }
  };

  const getSalonTabData = async () => {
    setTabLoading(true);
    try {
      const response = await api.get(TabPanelApi[activeTab] + id);
      if (response.data.success) {
        setGetSalonTab(response.data.data);
      }
    } catch (error) {
      console.log("Error fetching salons:", error);
    } finally {
      setTabLoading(false);
    }
  };

  useEffect(() => {
    getOneSalon();
  }, [id]);

  useEffect(() => {
    getSalonTabData();
  }, [activeTab, id]);

  return (
    <div className="userdashboard-product-details">
      <div className="row w-100">
        <div className="col-md-4 d-flex flex-column gap-3">
          {/* Main Image */}
          <div className="rounded-4 overflow-hidden shadow-sm h-100">
            <img
              src={
                `${process.env.NEXT_PUBLIC_IMAGE_URL}/${getSalon?.salon?.bImage}` ||
                "/images/noimage.jpg"
              }
              alt="main product"
              className="object-fit-cover w-100 rounded-4"
              style={{ height: "300px" }}
            />
          </div>

          {/* Thumbnail Images */}
          {/* <div className="d-flex flex-row gap-3 w-100">
            <div
              className="rounded-4 overflow-hidden shadow-sm cursor-pointer"
              style={{ flex: 1 }}
            >
              <img
                src="/images/p_view_1.png"
                alt="product view 1"
                className="object-fit-cover w-100 rounded-4"
                style={{ height: "150px" }}
              />
            </div>
            <div
              className="rounded-4 overflow-hidden shadow-sm cursor-pointer"
              style={{ flex: 1 }}
            >
              <img
                src="/images/p_view_2.png"
                alt="product view 2"
                className="object-fit-cover w-100 rounded-4"
                style={{ height: "150px" }}
              />
            </div>
          </div> */}
        </div>

        {/* Content Section */}
        <div className="col-md-8 d-flex flex-column justify-content-start">
          <div className="ps-md-2 ps-0 pt-3 pt-md-0">
            <div className="d-flex  justify-content-between gap-3  mb-4">
              <div>
                <h3 className="fw-bold  mb-3 txt_color">
                  {getSalon?.salon?.bName || "N/A"}
                </h3>
                <h5 className="fw-medium text-light mb-3">
                  {getSalon?.salon?.bLocationName || "N/A"}
                </h5>
                <h5 className="fw-medium mb-3 text-light">
                  <span className="txt_color">
                    {getSalon?.salon?.avgRating || "0"} Rating
                  </span>{" "}
                  Out of 5
                </h5>
              </div>
              <div className="d-flex flex-column justify-content-between ">
                <div className="d-flex flex-row gap-3 align-items-center justify-content-end">
                  <button
                    className="d-flex text-light align-items-center gap-2 rounded-circle p-2"
                    style={{
                      backgroundColor: "#19CC89",
                      border: "1px solid #19CC89",
                    }}
                  >
                    <FiMessageSquare size={28} />
                  </button>
                  {/* <button
                    className="user-dashboard-box-btn"
                    onClick={() => router.push("/user/book-appointment")}
                  >
                    Book Now
                  </button> */}
                </div>
                <div className="d-flex flex-row gap-3 align-items-center justify-content-end">
                  <p className="text-light mb-0">Explore</p>
                  <div className="rounded-4 overflow-hidden shadow-sm cursor-pointer">
                    <img
                      src="/images/p_map.png"
                      alt="map"
                      className="object-fit-cover w-100 rounded-4"
                      style={{ height: "60px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <p className="text-light lh-lg mb-4 fw-light">
              {getSalon?.salon?.bDetails || "N/A"}
            </p>
          </div>
        </div>
      </div>
      {/* Tabs Card section */}
      <div className="mt-5">
        <BorderTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          className="mb-3"
        />

        {/* Tab Panels */}
        <div className="tab-content">
          <TabPanel value={activeTab} tabValue="products">
            <div className="row g-3 g-lg-4">
              {tabLoading ? (
                <div className="col-12 d-flex justify-content-center align-items-center py-4">
                  <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                getSalonTab.length !== 0 &&
                getSalonTab.map((item) => (
                  <div
                    key={item._id}
                    className="col-12 col-sm-6 col-md-4 col-lg-3"
                  >
                    <UserProductCard
                      image={item?.images?.[0]}
                      title={item?.brandName}
                      subTitle={`$${Number(item?.price)?.toFixed(2)}`}
                      onCardClick={() =>
                        router.push(`/user/products/${item._id}`)
                      }
                    />
                  </div>
                ))
              )}
            </div>
            {/* Show message if no salons available */}
            {!tabLoading && getSalonTab.length === 0 && (
              <div className="text-center py-4">
                <p className="text-light">
                  No salons products available at the moment.
                </p>
              </div>
            )}
          </TabPanel>

          <TabPanel value={activeTab} tabValue="services">
              <div className="row g-3 g-lg-4">
              {tabLoading ? (
                <div className="col-12 d-flex justify-content-center align-items-center py-4">
                  <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                getSalonTab.length !== 0 &&
                getSalonTab.map((item) => (
                  <div
                    key={item._id}
                    className="col-12 col-sm-6 col-md-4 col-lg-3"
                  >
                    <UserProductCard
                      image={item?.images?.[0]}
                      title={item?.serviceName}
                      subTitle={`$${Number(item?.price)?.toFixed(2)}`}
                      onCardClick={() =>
                        router.push(`/user/products/${item._id}`)
                      }
                    />
                  </div>
                ))
              )}
            </div>
            {/* Show message if no salons available */}
            {!tabLoading && getSalonTab.length === 0 && (
              <div className="text-center py-4">
                <p className="text-light">
                  No salons products available at the moment.
                </p>
              </div>
            )}
          </TabPanel>

          <TabPanel value={activeTab} tabValue="stylists">
            {/* {reviews.map((review) => (
               <UserProductCard
                    showSellerName={true}
                    showCalender={true}
                    image={item?.images?.[0]}
                    title={item?.brandName}
                    subTitle={`$${Number(item?.price)?.toFixed()}`}
                    onCardClick={() => router.push(`/user/products/${item._id}`)}
                  />
            ))} */}
          </TabPanel>

          <TabPanel value={activeTab} tabValue="customers reviews">
            {reviews.map((review) => (
              <ReviewCard
                key={review.id}
                {...review}
                className="mb-4"
                maxTextLength={150}
              />
            ))}
          </TabPanel>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardProductServiceDetails;
