"use client";
import { UserProductCard } from "@/component/new/cards/product-card";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const TopStylists = () => {
  const [salons, setSalons] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();

  // Fetch all salons without category filtering
  const getAllSalons = async () => {
    setLoading(true);
    try {
      const response = await api.get("/getSalons");
      if (response.data.success) {
        // Handle different response structures
        const salonsData = response.data.data;
        
        if (Array.isArray(salonsData)) {
          setSalons(salonsData);
        } else if (typeof salonsData === "object") {
          // If data is an object, find the first array
          const salonArrays = Object.values(salonsData).filter((item) =>
            Array.isArray(item)
          );
          if (salonArrays.length > 0) {
            setSalons(salonArrays[0]);
          } else {
            setSalons([]);
          }
        } else {
          setSalons([]);
        }
      } else {
        setSalons([]);
      }
    } catch (error) {
      console.log("Error fetching salons:", error);
      setSalons([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all salons on component mount
  useEffect(() => {
    getAllSalons();
  }, []);

  return (
    <div className="w-100">
      <div className="mb-5">
        <h4 className="txt_color mb-4">All Salons</h4>

        {loading ? (
          <div className="d-flex justify-content-center align-items-center py-5">
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Loading salons...</span>
            </div>
          </div>
        ) : salons.length > 0 ? (
          <div className="row g-3 g-lg-4">
            {salons.map((item) => (
              <div
                className="col-md-3 col-sm-6 col-12"
                key={item?._id}
              >
                <UserProductCard
                  showSellerName={true}
                  onCardClick={() => {
                    router.push(`/user/${item?._id}`);
                    dispatch(setBooking({ salonId: item?._id }));
                  }}
                  items={item}
                  title={item?.bName}
                  sellerName={item?.fullName}
                  sellerImage={item?.image}
                  image={item?.bImage}
                  subTitle={item?.bAddress}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5">
            <p className="text-light">No salons available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopStylists;