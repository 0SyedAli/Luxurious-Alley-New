"use client";
import { useEffect, useState } from "react";
import ProfileHeader from "@/component/new/vendor-profile-header";
import OrderCard from "@/component/dashboard/order-card";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointments } from "@/redux/features/appointments/appointmentsSlice";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("Accepted");
  const dispatch = useDispatch();

  // ✅ Appointments data
  const { data: appointments, status, error } = useSelector(
    (state) => state.appointments
  );

  // ✅ Logged-in user data
  const user = useSelector((state) => state.auth.user);

  // ✅ Fetch appointments once
  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  // ✅ Filtered appointments by tab
  const filteredAppointments =
    appointments?.filter((item) => item.status === activeTab) || [];

  // ✅ Image fallbacks
  const defaultCover = "/images/profile_cover.png";
  const defaultAvatar = "/images/profile_demo.jpg";

  // ✅ Dynamic images from API
  const profileCover = user?.bCover
    ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${user.bCover}`
    : defaultCover;

  const profileAvatar = user?.image
    ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${user.image}`
    : defaultAvatar;

  // ✅ User info
  const fullName = user?.fullName || "Unknown User";
  const location = user?.bAddress || user?.city || "Location not provided";
  // const statusLabel = user?.is_active ? "Active" : "Inactive";

  // ✅ Extract active working day
  const activeWorkingDay = user?.workingDays?.find((d) => d.isActive);

  const workingTime = activeWorkingDay
    ? `${activeWorkingDay.startTime || "N/A"} - ${activeWorkingDay.endTime || "N/A"}`
    : "No active working hours";

  // ✅ Tabs
  const tabs = [
    { id: 1, value: "Accepted", label: "Ongoing" },
    { id: 2, value: "Completed", label: "Completed" },
  ];

  return (
    <div className="w-100">
      {/* ✅ Profile Header */}
      <ProfileHeader
        defaultCoverSrc={profileCover}
        defaultAvatarSrc={profileAvatar}
        name={fullName}
        location={location}
        // statusLabel={statusLabel}
        workingTime={workingTime} // 🕒 show time range if header supports it
      />

      {/* ✅ Appointments Section */}
      <section className="mt-4">
        <h5 className="mb-3 text-white allproducts_title">My Appointments</h5>

        {/* Tabs */}
        <ul className="nav nav-pills nav-pills-tabs gap-2 mb-3" role="tablist">
          {tabs.map((t) => (
            <li className="nav-item nav-item-tabs" key={t.id}>
              <button
                className={`nav-link ${activeTab === t.value ? "active" : ""}`}
                onClick={() => setActiveTab(t.value)}
                type="button"
                role="tab"
              >
                {t.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Tab Content */}
        <div className="tab-content">
          {status === "loading" ? (
            <p>Loading appointments...</p>
          ) : status === "failed" ? (
            <p className="text-danger">{error}</p>
          ) : filteredAppointments.length === 0 ? (
            <p>No appointments found in this tab.</p>
          ) : (
            <div className="row g-3">
              {filteredAppointments.map((item) => (
                <div key={item._id} className="col-12 col-sm-6 col-lg-3">
                  <OrderCard
                    bookingId={item._id}
                    title={item?.serviceId?.serviceName || "Unknown Service"}
                    time={`${item?.time || "N/A"} | ${item?.date || "N/A"}`}
                    image={
                      item?.serviceId?.images?.length > 0
                        ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${item.serviceId.images[0]}`
                        : "/images/order-prof.png"
                    }
                    price={`$${item?.totalAmount || 0}`}
                    technician={item?.technicianId?.fullName || "N/A"}
                    status={item?.status}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default UserProfile;
