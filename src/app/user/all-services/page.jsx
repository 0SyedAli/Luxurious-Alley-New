"use client";
import { UserProductCard } from "@/component/new/cards/product-card";
import api from "@/lib/api";
import { setBooking } from "@/redux/features/booking/bookingSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AllServices = () => {
  const [loading, setLoading] = useState(false);
  const [getServices, setGetServices] = useState([]);
  const state = useSelector((state) => state.booking);
  const router = useRouter()
  const dispatch = useDispatch()

  const getAllSalons = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(
        `/getAllServicesBySalonId?salonId=${state.salonId}`
      );
      if (data.success) {
        setGetServices(data.data);
      }
    } catch (error) {
      console.log("Error fetching salons:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllSalons();
  }, []);

  return (
    <div className="w-100">
      <div className="mb-5">
        <h4 className="txt_color mb-4">Choose services</h4>

        <div className="row g-3 g-lg-4">
          {loading ? (
            <div className="col-12 d-flex justify-content-center align-items-center py-4">
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            getServices.length !== 0 &&
            getServices.map((item) => (
              <div key={item._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <UserProductCard
                  image={item?.images?.[0]}
                  title={item?.serviceName}
                  subTitle={`$${Number(item?.price)?.toFixed(2)}`}
                  onCardClick={() => {
                    dispatch(setBooking({ serviceId: item?._id }));
                    router.push(`/user/services/${item?._id}`);
                  }}
                />
              </div>
            ))
          )}
        </div>
      </div>
      {/* Show message if no salons available */}
      {!loading && getServices.length === 0 && (
        <div className="text-center py-4">
          <p className="text-light">No services available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default AllServices;
