"use client";
import { UserProductCard } from "@/component/new/cards/product-card";
import ReviewCard from "@/component/new/cards/review-card";
import BorderTabs from "@/component/new/tabs/border-tabs";
import TabPanel from "@/component/new/tabs/tab-panel";
import { userproducts } from "../../../../lib/products-data";
import { useRouter } from "next/navigation";
import React, { use, useState } from "react";
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

const UserProductDetails = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [count, setCount] = useState(0);
  const router = useRouter();

  const tabs = [
    {
      id: 1,
      value: "products",
      label: "Products",
    },
    {
      id: 2,
      value: "customers reviews",
      label: "Customers Reviews",
    },
  ];

  const handleIncrement = () => {
    setCount(count + 1);
  };
  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <div className="userdashboard-product-details">
      <div className="row w-100">
        <div className="col-md-3 d-flex flex-column gap-3">
          {/* Main Image */}
          <div className="rounded-4 overflow-hidden shadow-sm">
            <img
              src="/images/p_view_main.png"
              alt="main product"
              className="object-fit-cover w-100 rounded-4"
              style={{ height: "100%" }}
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="col-md-9 d-flex flex-column justify-content-start">
          <div className="ps-md-2 ps-0 pt-3 pt-md-0">
            <div className="d-flex  justify-content-between gap-3 flex-wrap mb-4">
              <div>
                <h3 className="fw-bold  mb-3 txt_color">
                  Deep Mask Conditioner
                </h3>
                <h4 className="fw-medium text-light mb-3">
                  $24.00 (34 available)
                </h4>
              </div>
              <div className="d-flex flex-column justify-content-between ">
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
              </div>
            </div>
            <h5 className="fw-medium mb-3 txt_color">Description</h5>
            <p className="text-light lh-lg mb-4 fw-light">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est
              laborum.Lorem ipsum dolor sit amet,
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

export default UserProductDetails;
