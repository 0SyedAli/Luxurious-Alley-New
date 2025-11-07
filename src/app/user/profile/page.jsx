"use client";
import { useEffect, useState } from "react";
import ProfileHeader from "@/component/new/profile-header";
import BorderTabs from "@/component/new/tabs/border-tabs";
import RatingCard from "@/component/new/cards/rating-card";
import TabPanel from "@/component/new/tabs/tab-panel";
import api from "@/lib/api";
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
const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("in-progress");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try {
      const { data } = await api.get(
        `/getUserById?userId=68ed9c864236c9662a1ac69c`
      );
      if (data.success) {
        setUserData(data.data);
        console.log(data.data);
      }
    } catch (error) {
      console.log("Error fetching salons:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleUpdatePicture = async (file) => {
    const formData = new FormData();
    formData.append("userId", "68ed9c864236c9662a1ac69c");
    formData.append("image", file);

    try {
      const { data } = await api.post("/updateUserById", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (data.success) {
        console.log(data.data);
        getUser();
      }
    } catch (error) {
      console.log("Error fetching salons:", error);
    }
  };

  // Fix: Properly construct avatar URL with fallback
  const getAvatarSrc = () => {
    if (!userData?.image) {
      return "/images/noimage.jpg";
    }
    return `${process.env.NEXT_PUBLIC_IMAGE_URL}/${userData.image}`;
  };

  return (
    <div className="w-100">
      <ProfileHeader
        defaultCoverSrc="/images/profile_cover.png"
        defaultAvatarSrc={getAvatarSrc()}
        name={userData?.username || "N/A"}
        location={userData?.locationName || "N/A"}
        statusLabel="Active"
        loading={loading}
        handleUpdatePicture={handleUpdatePicture}
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
