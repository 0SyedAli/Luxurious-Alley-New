"use client";
import { useState } from "react";
import ProfileHeader from "@/component/new/profile-header";
import BorderTabs from "@/component/new/tabs/border-tabs";
import RatingCard from "@/component/new/cards/rating-card";
import TabPanel from "@/component/new/tabs/tab-panel";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("in-progress");

  const tabs = [
    {
      id: 1,
      value: "in-progress",
      label: "In-progress",
    },
    {
      id: 2,
      value: "completed",
      label: "Completed",
    },
    {
      id: 3,
      value: "delivered",
      label: "Delivered",
    },
    {
      id: 4,
      value: "history",
      label: "History",
    },
  ];
  return (
    <div className="w-100">
      <ProfileHeader
        defaultCoverSrc="/images/profile_cover.png"
        defaultAvatarSrc="/images/profile_demo.jpg"
        name="Sarah J."
        location="47 Hennepard Street, San Diego (92139)"
        statusLabel="Active"
      />
      {/* Tabs Card section */}
      <div className="mt-4">
        <h3 className="txt_color mb-3">My Bookings</h3>
        <BorderTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          className="mb-3"
        />

        {/* Tab Panels */}
        <div className="tab-content">
          <TabPanel value={activeTab} tabValue="in-progress">
            <div className="row g-3 g-lg-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <RatingCard
                    productName="Omni Este"
                    subTitle="1609 Oak, St. (2km)"
                    label={activeTab}
                    date="18.10.2023"
                    rating="4.8"
                    image="/images/cart.jpg"
                    onShopClick={() => console.log("Add to cart")}
                    onCardClick={() => console.log("Card clicked")}
                  />
                </div>
              ))}
            </div>
          </TabPanel>
          <TabPanel value={activeTab} tabValue="completed">
            <div className="row g-3 g-lg-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <RatingCard
                    productName="Premium Office Chair"
                    subTitle="Ergonomic Design"
                    label={activeTab}
                    date="15 Dec 2023"
                    rating="4.8"
                    image="/images/cart.jpg"
                    onShopClick={() => console.log("Add to cart")}
                    onCardClick={() => console.log("Card clicked")}
                  />
                </div>
              ))}
            </div>
          </TabPanel>
          <TabPanel value={activeTab} tabValue="delivered">
            <div className="row g-3 g-lg-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="col-12 col-sm-6 col-md-4 col-lg-3">
                   <RatingCard
                    productName="Premium Office Chair"
                    subTitle="Ergonomic Design"
                    label={activeTab}
                    date="15 Dec 2023"
                    rating="4.8"
                    image="/images/cart.jpg"
                    onShopClick={() => console.log("Add to cart")}
                    onCardClick={() => console.log("Card clicked")}
                  />
                </div>
              ))}
            </div>
          </TabPanel>
          <TabPanel value={activeTab} tabValue="history">
            <div className="row g-3 g-lg-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="col-12 col-sm-6 col-md-4 col-lg-3">
                   <RatingCard
                    productName="Premium Office Chair"
                    subTitle="Ergonomic Design"
                    label={activeTab}
                    date="15 Dec 2023"
                    rating="4.8"
                    image="/images/cart.jpg"
                    onShopClick={() => console.log("Add to cart")}
                    onCardClick={() => console.log("Card clicked")}
                  />
                </div>
              ))}
            </div>
          </TabPanel>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
