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
import { useDispatch } from "react-redux";
import { setBooking } from "@/redux/features/booking/bookingSlice";

const UserStylistsDetails = () => {
  const { id } = useParams();
  const [getService, setGetService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const router = useRouter();
    const dispatch = useDispatch();

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

  // getService?.technicianId
  return (
    <div className="userdashboard-product-details">
      {loading ? (
        <div className="d-flex justify-content-center align-items-center py-4">
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row">
          {getService?.technicianId?.map((item) => (
            <div key={item._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <UserProductCard
                image={item?.image}
                title={item?.fullName}
                subTitle={item?.designation}
                onCardClick={() => {
                  router.push(`/user/book-appointment/${item?._id}`);
                  dispatch(setBooking({ technicianId: item?._id }));
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserStylistsDetails;
