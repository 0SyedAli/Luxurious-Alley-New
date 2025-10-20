"use client";
import { UserProductCard } from "@/component/new/cards/product-card";
import ReviewCard from "@/component/new/cards/review-card";
import ReviewModal from "@/component/new/modals/review-modal/page";
import BorderTabs from "@/component/new/tabs/border-tabs";
import TabPanel from "@/component/new/tabs/tab-panel";
import api from "@/lib/api";
import { userproducts } from "@/lib/products-data";
import { setBooking } from "@/redux/features/booking/bookingSlice";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiMessageSquare } from "react-icons/fi";
import { useDispatch } from "react-redux";

const tabs = [
  {
    id: 1,
    value: "services",
    label: "Services",
  },

  {
    id: 2,
    value: "stylists",
    label: "Stylists",
  },
  {
    id: 3,
    value: "products",
    label: "Products",
  },
  {
    id: 4,
    value: "customers reviews",
    label: "Customers Reviews",
  },
];

const TabPanelApi = {
  products: "/getAllProductsBySalonId?salonId=",
  services: "/getAllServicesBySalonId?salonId=",
  stylists: "/getAllStylistsBySalonId?salonId=",
  "customers reviews": "/getRatingBySalonOrStar?salonId=",
};

const UserDashboardProductServiceDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("services");
  const [open, setOpen] = useState(false);
  const [getSalon, setGetSalon] = useState(null);
  const [getSalonTab, setGetSalonTab] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabLoading, setTabLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  // These would typically come from your app context or props

  const userId = "68f11c79f180d3689c7ca111";

  const getOneSalon = async () => {
    try {
      const response = await api.get(`/getAdminById?salonId=${id}`);
      if (response.data.success) {
        setGetSalon(response.data.data);
      }
    } catch (error) {
      console.log("Error fetching salons:", error);
    } finally {
      setLoading(false);
    }
  };

  const getSalonTabData = async () => {
    setTabLoading(true);
    try {
      const response = await api.get(TabPanelApi[activeTab] + id);
      if (response.data.success) {
        setGetSalonTab(response.data.data);
      }
    } catch (error) {
      console.log("Error fetching salons:", error);
    } finally {
      setTabLoading(false);
    }
  };

  const handleSubmitReview = async (reviewData) => {
    setIsSubmitting(true);

    try {
      const { data } = await api.post("/giveRatingToSalon", {
        ...reviewData,
      });

      console.log(data);
      setOpen(false);
      getSalonTabData();
    } catch (error) {
      console.log("Error submitting review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    getOneSalon();
  }, [id]);

  useEffect(() => {
    getSalonTabData();
  }, [activeTab, id]);

  return (
    <div className="userdashboard-product-details">
      {loading ? (
        <div className="d-flex justify-content-center align-items-center py-4">
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row w-100">
          <div className="col-md-4 d-flex flex-column gap-3">
            {/* Main Image */}
            <div className="rounded-4 overflow-hidden shadow-sm h-100">
              <img
                src={
                  `${process.env.NEXT_PUBLIC_IMAGE_URL}/${getSalon?.salon?.bImage}` ||
                  "/images/noimage.jpg"
                }
                alt="main product"
                className="object-fit-cover w-100 rounded-4 h-100"
                // style={{ height: "300px" }}
              />
            </div>

            {/* Thumbnail Images */}
            {/* <div className="d-flex flex-row gap-3 w-100">
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
          </div> */}
          </div>

          {/* Content Section */}
          <div className="col-md-8 d-flex flex-column justify-content-start">
            <div className="ps-md-2 ps-0 pt-3 pt-md-0">
              <div className="d-flex  justify-content-between gap-3  mb-4">
                <div>
                  <h3 className="fw-bold  mb-3 txt_color">
                    {getSalon?.salon?.bName || "N/A"}
                  </h3>
                  <h5 className="fw-medium text-light mb-3">
                    {getSalon?.salon?.bLocationName || "N/A"}
                  </h5>
                  <h5 className="fw-medium mb-3 text-light">
                    <span className="txt_color">
                      {getSalon?.salon?.avgRating || "0"} Rating
                    </span>{" "}
                    Out of 5
                  </h5>
                </div>
                <div className="d-flex flex-column justify-content-between ">
                  <div className="d-flex flex-row gap-3 align-items-center justify-content-end">
                    <button
                      className="d-flex text-light align-items-center gap-2 rounded-circle p-2"
                      style={{
                        backgroundColor: "#19CC89",
                        border: "1px solid #19CC89",
                      }}
                    >
                      <FiMessageSquare size={28} />
                    </button>
                    {/* <button
                    className="user-dashboard-box-btn"
                    onClick={() => router.push("/user/book-appointment")}
                  >
                    Book Now
                  </button> */}
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
                {getSalon?.salon?.bDetails ||
                  "Discription not available at the moment."}
              </p>
              <div>
                <h5 className="fw-bold text-light mb-3 txt_color">
                  Available These days
                </h5>
              </div>
              <div className="d-flex flex-row gap-4 mb-4 flex-wrap">
                {getSalon?.salon?.workingDays?.map((day, i) => {
                  return (
                    <div key={i}>
                      <div
                        className="fw-bold text-dark bg-light p-2 rounded-4 d-flex justify-content-center align-items-center"
                        style={{ width: "60px", height: "50px" }}
                      >
                        {day.day.slice(0, 3)}{" "}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div>
                <h5 className="fw-bold text-light mb-3 txt_color">
                  Time Range
                </h5>
              </div>
              <div className="d-flex flex-row gap-4 mb-4 flex-wrap align-items-center">
                <div
                  className="fw-bold text-dark bg-light py-2 px-3  rounded-4 d-flex justify-content-center align-items-center"
                  style={{ height: "50px" }}
                >
                  {getSalon?.salon?.workingDays?.[0]?.startTime}
                </div>
                <span className="text-light">To</span>
                <div
                  className="fw-bold text-dark bg-light py-2 px-3 rounded-4 d-flex justify-content-center align-items-center"
                  style={{ height: "50px" }}
                >
                  {getSalon?.salon?.workingDays?.[0]?.endTime}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Tabs Card section */}
      <div className="mt-5">
        <BorderTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          className="mb-3"
          onWriteReviewClick={() => setOpen(true)}
        />

        {/* Tab Panels */}
        <div className="tab-content">
          <TabPanel value={activeTab} tabValue="products">
            <div className="row g-3 g-lg-4">
              {tabLoading ? (
                <div className="col-12 d-flex justify-content-center align-items-center py-4">
                  <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                getSalonTab.length !== 0 &&
                getSalonTab.map((item) => (
                  <div
                    key={item._id}
                    className="col-12 col-sm-6 col-md-4 col-lg-3"
                  >
                    <UserProductCard
                      image={item?.images?.[0]}
                      title={item?.brandName}
                      subTitle={`$${Number(item?.price)?.toFixed(2)}`}
                      onCardClick={() =>
                        router.push(`/user/products/${item._id}`)
                      }
                    />
                  </div>
                ))
              )}
            </div>
            {/* Show message if no salons available */}
            {!tabLoading && getSalonTab.length === 0 && (
              <div className="text-center py-4">
                <p className="text-light">
                  No salons products available at the moment.
                </p>
              </div>
            )}
          </TabPanel>

          <TabPanel value={activeTab} tabValue="services">
            <div className="row g-3 g-lg-4">
              {tabLoading ? (
                <div className="col-12 d-flex justify-content-center align-items-center py-4">
                  <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                getSalonTab.length !== 0 &&
                getSalonTab.map((item) => (
                  <div
                    key={item._id}
                    className="col-12 col-sm-6 col-md-4 col-lg-3"
                  >
                    <UserProductCard
                      image={item?.images?.[0]}
                      title={item?.serviceName}
                      subTitle={`$${Number(item?.price)?.toFixed(2)}`}
                      onCardClick={() => {
                        dispatch(
                          setBooking({ serviceId: item?._id, isService: true })
                        );
                        router.push(`/user/services/${item?._id}`);
                      }}
                    />
                  </div>
                ))
              )}
            </div>
            {/* Show message if no salons available */}
            {!tabLoading && getSalonTab.length === 0 && (
              <div className="text-center py-4">
                <p className="text-light">
                  No salons services available at the moment.
                </p>
              </div>
            )}
          </TabPanel>

          <TabPanel value={activeTab} tabValue="stylists">
            <div className="row g-3 g-lg-4">
              {tabLoading ? (
                <div className="col-12 d-flex justify-content-center align-items-center py-4">
                  <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                getSalonTab.length !== 0 &&
                getSalonTab.map((item) => (
                  <div
                    key={item._id}
                    className="col-12 col-sm-6 col-md-4 col-lg-3"
                  >
                    <UserProductCard
                      image={item?.image}
                      title={item?.fullName}
                      subTitle={item?.designation}
                      onCardClick={() => {
                        dispatch(setBooking({ technicianId: item?._id, isService: false }));
                        router.push(`/user/all-services`);
                      }}
                    />
                  </div>
                ))
              )}
            </div>
            {/* Show message if no salons available */}
            {!tabLoading && getSalonTab.length === 0 && (
              <div className="text-center py-4">
                <p className="text-light">
                  No salons stylists available at the moment.
                </p>
              </div>
            )}
          </TabPanel>

          <TabPanel value={activeTab} tabValue="customers reviews">
            {tabLoading ? (
              <div className="w-100 d-flex justify-content-center align-items-center py-4">
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              getSalonTab.length !== 0 &&
              getSalonTab.map((review, i) => (
                <ReviewCard
                  key={i}
                  avatar={review.userId?.image}
                  date={review?.createdAt?.split("T")?.[0]}
                  text={review?.message}
                  userName={review.userId?.username}
                  rating={review?.stars}
                  className="mb-4"
                  maxTextLength={150}
                />
              ))
            )}

            {/* Show message if no salons available */}
            {!tabLoading && getSalonTab.length === 0 && (
              <div className="text-center py-4">
                <p className="text-light">
                  No salons customers review available at the moment.
                </p>
              </div>
            )}
          </TabPanel>
        </div>
      </div>
      <ReviewModal
        show={open}
        onHide={() => setOpen(false)}
        onSubmit={handleSubmitReview}
        salonId={id}
        userId={userId}
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default UserDashboardProductServiceDetails;
