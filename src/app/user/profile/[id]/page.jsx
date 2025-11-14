"use client";
import { useRouter } from "next/navigation";
import ProfileHeader from "@/component/new/profile-header";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { showErrorToast, showSuccessToast } from "@/lib/toast";

const UserEditProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);

  const getUser = async () => {
    try {
      const { data } = await api.get(`/getUserById?userId=${user?._id || ""}`);
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
      <div className="mb-5">
        <ProfileHeader
          defaultCoverSrc="/images/profile_cover.png"
          defaultAvatarSrc={getAvatarSrc()}
          name={userData?.username || "N/A"}
          location={userData?.locationName || "N/A"}
          statusLabel="Active"
          handleUpdatePicture={handleUpdatePicture}
          loading={loading}
        />
      </div>
      <div className="auth_container">
        <div className="row justify-content-between">
          <div className="col-sm-12 col-md-7">
            <h4 className="txt_color mb-4 text-start">Edit Profile</h4>
            <form autoComplete="off">
              <div className="row g-3">
                <div className="col-md-6">
                  {/* Full name */}
                  <input
                    type="text"
                    placeholder="First name *"
                    // {...register("firstName")} // Register as 'firstName'
                    // className={errors.email ? "input-error" : ""}
                  />
                  {/* {errors.email && (
                  <p className="text-danger mt-1">{errors.email.message}</p>
                  )} */}
                </div>
                <div className="col-md-6">
                  {/* Last name */}
                  <input
                    type="text"
                    placeholder="Last name *"
                    // {...register("lastName")} // Register as 'lastName'
                    // className={errors.email ? "input-error" : ""}
                  />
                  {/* {errors.email && (
                  <p className="text-danger mt-1">{errors.email.message}</p>
                  )} */}
                </div>
                <div className="col-md-6">
                  {/* Last name */}
                  <input
                    type="text"
                    placeholder="Country / Region *"
                    // {...register("country")} // Register as 'country'
                    // className={errors.email ? "input-error" : ""}
                  />
                  {/* {errors.email && (
                  <p className="text-danger mt-1">{errors.email.message}</p>
                  )} */}
                </div>
                <div className="col-md-6">
                  {/* Last name */}
                  <input
                    type="text"
                    placeholder="Town / City *"
                    // {...register("email")} // Register as 'email'
                    // className={errors.email ? "input-error" : ""}
                  />
                  {/* {errors.email && (
                  <p className="text-danger mt-1">{errors.email.message}</p>
                  )} */}
                </div>
                <div className="col-12">
                  {/* Last name */}
                  <input
                    type="text"
                    placeholder="Street address *"
                    // {...register("address")} // Register as 'address'
                    // className={errors.email ? "input-error" : ""}
                  />
                  {/* {errors.email && (
                  <p className="text-danger mt-1">{errors.email.message}</p>
                  )} */}
                </div>
                <div className="col-md-6">
                  {/* Pin Code */}
                  <input
                    type="text"
                    placeholder="PIN Code *"
                    // {...register("pinCode")} // Register as 'pinCode'
                    // className={errors.email ? "input-error" : ""}
                  />
                  {/* {errors.email && (
                  <p className="text-danger mt-1">{errors.email.message}</p>
                  )} */}
                </div>
                <div className="col-md-6">
                  {/* State */}
                  <input
                    type="text"
                    placeholder="State *"
                    // {...register("state")} // Register as 'state'
                    // className={errors.email ? "input-error" : ""}
                  />
                  {/* {errors.email && (
                  <p className="text-danger mt-1">{errors.email.message}</p>
                  )} */}
                </div>
                <div className="col-md-6">
                  {/* Pin Code */}
                  <input
                    type="number"
                    placeholder="Phone"
                    // {...register("phone")} // Register as 'phone'
                    // className={errors.email ? "input-error" : ""}
                  />
                  {/* {errors.email && (
                  <p className="text-danger mt-1">{errors.email.message}</p>
                  )} */}
                </div>

                <div className="col-md-12 text-start">
                  <button
                    type="button"
                    className="user-dashboard-box-btn px-5"
                    onClick={() => router.push("/user/new-card")}
                  >
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-sm-12 col-md-4 text-start">
            <h4 className="txt_color mb-4">Set up your location</h4>
            <div className="map-wrapper">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1690000000000!5m2!1sen!2s"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="New York Location Map"
                className="new-york-iframe"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserEditProfile;
