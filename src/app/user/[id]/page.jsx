"use client";
import { UserProductCard } from "@/component/new/cards/product-card";
import ReviewCard from "@/component/new/cards/review-card";
import BorderTabs from "@/component/new/tabs/border-tabs";
import TabPanel from "@/component/new/tabs/tab-panel";
import { userproducts } from "@/lib/products-data";
import { setActiveVendorId, setCurrentUser } from "@/redux/features/chat/chatSlice";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FiMessageSquare } from "react-icons/fi";
import { useDispatch } from "react-redux";

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

const UserDashboardProductServiceDetails = () => {
  const [activeTab, setActiveTab] = useState("products");
  const router = useRouter();
  const dispatch = useDispatch();

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
      value: "customers reviews",
      label: "Customers Reviews",
    },
  ];

   const handleChatClick = () => {
    // Set current user (replace with your actual user from auth)
    const userData = {
      id: "68ed9c864236c9662a1ac69c", // User ID from your DB
      name: "Faraz Tariq",
      email: "faraz@example.com",
      role: "user",
      avatar: "1760484156598-image.jpg"
    };
    
    dispatch(setCurrentUser(userData));
    
    // Store vendorId in Redux
    dispatch(setActiveVendorId('68efdfa53cb294e3c05e1f9d'));
    
    // Navigate to inbox page
    router.push('/user/inbox');
  };

  return (
    <div className="userdashboard-product-details">
      <div className="row w-100">
        <div className="col-md-4 d-flex flex-column gap-3">
          {/* Main Image */}
          <div className="rounded-4 overflow-hidden shadow-sm">
            <img
              src="/images/p_view_main.png"
              alt="main product"
              className="object-fit-cover w-100 rounded-4"
              style={{ height: "300px" }}
            />
          </div>

          {/* Thumbnail Images */}
          <div className="d-flex flex-row gap-3 w-100">
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
          </div>
        </div>

        {/* Content Section */}
        <div className="col-md-8 d-flex flex-column justify-content-start">
          <div className="ps-md-2 ps-0 pt-3 pt-md-0">
            <div className="d-flex  justify-content-between gap-3 flex-wrap mb-4">
              <div>
                <h3 className="fw-bold  mb-3 txt_color">Omni iste</h3>
                <h4 className="fw-medium text-light mb-3">
                  1609 Oak, St. (2km)
                </h4>
                <h5 className="fw-medium mb-3 txt_color">About Omni iste</h5>
              </div>
              <div className="d-flex flex-column justify-content-between ">
                <div className="d-flex flex-row gap-3 align-items-center justify-content-end">
                  <button
                    className="d-flex text-light align-items-center gap-2 rounded-circle p-2"
                    style={{
                      backgroundColor: "#19CC89",
                      border: "1px solid #19CC89",
                    }}
                    onClick={handleChatClick}
                  >
                    <FiMessageSquare size={28} />
                  </button>
                  <button
                    className="user-dashboard-box-btn"
                    onClick={() => router.push("/user/book-appointment")}
                  >
                    Book Now
                  </button>
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est
              laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum.
            </p>
          </div>
        </div>
      </div>
      {/* Tabs Card section */}
      <div className="mt-4">
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
              {userproducts.map((item) => (
                <div
                  key={item.id}
                  className="col-12 col-sm-6 col-md-4 col-lg-3"
                >
                  <UserProductCard
                    showSellerName={true}
                    showCalender={true}
                    // onCardClick={() => router.push(`/user/${item.id}`)}
                    {...item}
                  />
                </div>
              ))}
            </div>
          </TabPanel>

          <TabPanel value={activeTab} tabValue="services">
            <div className="row g-3 g-lg-4">
              {userproducts.map((item) => (
                <div
                  key={item.id}
                  className="col-12 col-sm-6 col-md-4 col-lg-3"
                >
                  <UserProductCard
                    showOrderBtn={true}
                    showProgress={true}
                    onCardClick={() => router.push(`/user/${item.id}`)}
                    onChairClick={() => alert("Chair icon clicked")}
                    onBagClick={() => alert("Beg icon clicked")}
                    {...item}
                  />
                </div>
              ))}
            </div>
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
