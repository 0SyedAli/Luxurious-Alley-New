"use client";
import { useEffect, useState } from "react";
import ProfileHeader from "@/component/new/profile-header";
import BorderTabs from "@/component/new/tabs/border-tabs";
import RatingCard from "@/component/new/cards/rating-card";
import TabPanel from "@/component/new/tabs/tab-panel";
import api from "@/lib/api";
import { useSelector } from "react-redux";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { showErrorToast, showSuccessToast } from "@/lib/toast";
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
  const { user } = useSelector((state) => state.auth);

  const getUser = async () => {
    try {
      const { data } = await api.get(`/getUserById?userId=${user?._id}`);
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
    formData.append("userId", user?._id || "");
    formData.append("image", file);

    try {
      const { data } = await api.post("/updateUserById", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        console.log(data.data);
        // Update Firebase chat with new profile picture
        await updateFirebaseChatProfilePicture(user?._id, data.data.image);
        showSuccessToast("Profile picture updated successfully");

        getUser();
      }
    } catch (error) {
      showErrorToast(error?.message || "Failed to update profile picture");
      console.log("Error updating profile picture:", error);
    }
  };

  const updateFirebaseChatProfilePicture = async (userId, newImageUrl) => {
    try {
      // Get all chats where this user is a participant
      const chatsQuery = query(collection(db, "chats"));

      const snapshot = await getDocs(chatsQuery);
      const updatePromises = [];

      snapshot.docs.forEach((doc) => {
        const chatData = doc.data();

        // Check if user is a participant in this chat
        if (chatData.participants && chatData.participants.includes(userId)) {
          // Update the participantImages for this user
          const updatedParticipantImages = {
            ...chatData.participantImages,
            [userId]: newImageUrl,
          };

          // Update the chat document
          updatePromises.push(
            updateDoc(doc.ref, {
              participantImages: updatedParticipantImages,
            })
          );

          // Also update all messages sent by this user in this chat
          updateUserMessagesInChat(doc.id, userId, newImageUrl);
        }
      });

      // Wait for all chat updates to complete
      if (updatePromises.length > 0) {
        await Promise.all(updatePromises);
        console.log(
          `Updated profile picture in ${updatePromises.length} chats`
        );
      }
    } catch (error) {
      console.error("Error updating Firebase chat profile picture:", error);
    }
  };

  // Function to update user's messages in a specific chat
  const updateUserMessagesInChat = async (chatId, userId, newImageUrl) => {
    try {
      const messagesQuery = query(
        collection(db, "chats", chatId, "messages"),
        where("senderId", "==", userId)
      );

      const snapshot = await getDocs(messagesQuery);
      const updatePromises = [];

      snapshot.docs.forEach((doc) => {
        // Update senderImage in each message
        updatePromises.push(
          updateDoc(doc.ref, {
            senderImage: newImageUrl,
          })
        );
      });

      if (updatePromises.length > 0) {
        await Promise.all(updatePromises);
        console.log(
          `Updated ${updatePromises.length} messages in chat ${chatId}`
        );
      }
    } catch (error) {
      console.error("Error updating user messages:", error);
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
