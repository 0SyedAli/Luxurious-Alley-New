"use client";
import { UserProductCard } from "@/component/new/cards/product-card";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";
import { useDispatch } from "react-redux";
import { setBooking } from "@/redux/features/booking/bookingSlice";
import CardTabs from "@/component/new/tabs/card-tabs";

// Tab Panel Component
const TabPanel = ({ children, value, tabValue }) => {
  return value === tabValue ? children : null;
};

const UserDashboard = () => {
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState("");
  const [salonsData, setSalonsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  // Fetch all categories and their salons
  const getAllData = async () => {
    setLoading(true);
    try {
      // Get all categories
      const categoriesResponse = await api.get("/getAllCategories");
      if (categoriesResponse.data.success) {
        const categoriesData = categoriesResponse.data.data;
        setCategories(categoriesData);

        // Fetch salons for each category
        const salonsPromises = categoriesData.map(async (category) => {
          try {
            const salonsResponse = await api.get(
              `/getSalons?categoryId=${
                category._id
              }`
              // `/getSalons?bLongitude=${-73.902}&bLatitude=${40.758}&categoryId=${
              //   category._id
              // }`
            );
            return {
              categoryId: category._id,
              data: salonsResponse.data.success ? salonsResponse.data.data : [],
            };
          } catch (error) {
            console.log(
              `Error fetching salons for ${category.categoryName}:`,
              error
            );
            return {
              categoryId: category._id,
              data: [],
            };
          }
        });

        const salonsResults = await Promise.all(salonsPromises);

        // Convert array to object
        const salonsDataObj = {};
        salonsResults.forEach((result) => {
          salonsDataObj[result.categoryId] = result.data;
        });

        setSalonsData(salonsDataObj);
        setAllDataLoaded(true);

        // Set first category with data as active tab
        const firstCategoryWithData = categoriesData.find((category) =>
          hasSalonsData(salonsDataObj[category._id])
        );
        if (firstCategoryWithData) {
          setActiveTab(firstCategoryWithData._id);
        } else if (categoriesData.length > 0) {
          setActiveTab(categoriesData[0]._id);
        }
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to check if salons data exists
  const hasSalonsData = (salons) => {
    if (!salons) return false;

    if (Array.isArray(salons)) {
      return salons.length > 0;
    }

    if (typeof salons === "object") {
      const salonArrays = Object.values(salons).filter((item) =>
        Array.isArray(item)
      );
      return salonArrays.some((array) => array.length > 0);
    }

    return false;
  };

  // Filter categories that have data
  const getCategoriesWithData = () => {
    if (!allDataLoaded) return [];
    return categories.filter((category) =>
      hasSalonsData(salonsData[category._id])
    );
  };

  useEffect(() => {
    getAllData();
  }, []);

  const categoriesWithData = getCategoriesWithData();
  const tabs = categoriesWithData.map((category) => ({
    value: category._id,
    label: category.categoryName,
  }));

  // Get salons for current active tab
  const getCurrentTabSalons = () => {
    if (!activeTab || !salonsData[activeTab]) return [];

    const data = salonsData[activeTab];
    if (Array.isArray(data)) return data.slice(0, 8);

    if (typeof data === "object") {
      const salonArrays = Object.values(data).filter((item) =>
        Array.isArray(item)
      );
      if (salonArrays.length > 0) return salonArrays[0].slice(0, 8);
    }

    return [];
  };

  const currentSalons = getCurrentTabSalons();

  return (
    <div className="user-dashboard container-fluid">
      {/* Box */}
      <div className="user-dashboard-box d-flex justify-content-between align-items-center">
        <p className="user-dashboard-box-title txt_color">
          Let your hair, <br />
          Speak for itself.
        </p>
        <button className="user-dashboard-box-btn">Start Now</button>
      </div>

      {/* Categories Tabs Section */}
      <div className="mt-5">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center py-4">
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Loading categories...</span>
            </div>
          </div>
        ) : categoriesWithData.length > 0 ? (
          <>
            <h4 className="txt_color mb-3">Services</h4>
            <CardTabs
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              className="mb-5"
            />
            <div className="d-flex justify-content-between mb-4 align-items-center">
              <h4 className="txt_color">Nearby Salons</h4>
              <Link
                href={"/user/salons"}
                className="text-light text-decoration-underline"
              >
                View More
              </Link>
            </div>
            {/* Tab Panels */}
            <div className="tab-content">
              {categoriesWithData.map((category) => (
                <TabPanel
                  key={category._id}
                  value={activeTab}
                  tabValue={category._id}
                >
                  <div className="row g-3 g-lg-4">
                    {currentSalons.length > 0 ? (
                      currentSalons.map((item) => (
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
                      ))
                    ) : (
                      <div className="col-12 text-center py-5">
                        <p className="text-light">
                          No salons available in {category.categoryName}{" "}
                          category.
                        </p>
                      </div>
                    )}
                  </div>
                </TabPanel>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <p className="text-light">
              {categories.length > 0
                ? "No salons available in any category at the moment."
                : "No categories available."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
