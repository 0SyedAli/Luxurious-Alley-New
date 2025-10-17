"use client";
import { UserProductCard } from "@/component/new/cards/product-card";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const TopStylists = () => {
  const [getSalons, setGetSalons] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getAllSalons = async () => {
    setLoading(true);
    try {
      const response = await api.get("/getSalons");
      if (response.data.success) {
        setGetSalons(response.data.data);
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
        <h4 className="txt_color mb-4">Salons</h4>
        <div className="row g-3 g-lg-4">
          {loading ? (
            <div
              className="col-12 d-flex justify-content-center align-items-center py-4"
              style={{ height: "50vh" }}
            >
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            getSalons?.map((item) => (
              <div className="col-md-3 col-sm-6 col-12" key={item?._id}>
                <UserProductCard
                  showSellerName={true}
                  onCardClick={() => router.push(`/user/${item?._id}`)}
                  items={item}
                  title={item?.bName}
                  sellerName={item?.fullName}
                  sellerImage={item?.image}
                  image={item?.bImage}
                  subTitle={item?.bAddress}
                />
              </div>
            ))
          )}
        </div>
      </div>
      {/* Show message if no salons available */}
      {!loading && getSalons?.length === 0 && (
        <div className="text-center py-4">
          <p className="text-light">No salons available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default TopStylists;
