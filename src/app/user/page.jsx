"use client";
import { UserProductCard } from "@/component/new/cards/product-card";
import { userproducts, userproductsTwo } from "@/lib/products-data";
import { useRouter } from "next/navigation";
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";
import React, { useRef } from "react";
import Slider from "react-slick";

// Import React Slick CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

const SmallCardData = [
  { id: 1, image: "/images/fire.png", text: "Trending" },
  { id: 2, image: "/images/pointer.png", text: "Nearby" },
  { id: 3, image: "/images/time.png", text: "Recents" },
  { id: 4, image: "/images/star.png", text: "Popular" },
];

// Custom Slider Component
const ProductSlider = ({ title, products, onProductClick }) => {
  const router = useRouter();
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    arrows: false, // Disable default arrows since we're using custom ones
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-section mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="txt_color mb-0">{title}</h4>
        <div className="slider-controls">
          {/* <button
            className="arrow-button me-2"
            onClick={() => sliderRef.current?.slickPrev()}
          >
            <IoIosArrowDropleft />
          </button> */}
          <button
            className="arrow-button"
            onClick={() => sliderRef.current?.slickNext()}
          >
            <IoIosArrowDropright />
          </button>
        </div>
      </div>

      <Slider ref={sliderRef} {...settings}>
        {products.map((item) => (
          <div key={item.id} className="px-2">
            <div className="h-100">
              <UserProductCard
                showOrderBtn={true}
                showProgress={true}
                onCardClick={() => router.push(`/user/${item.id}`)}
                onChairClick={() => alert("Chair icon clicked")}
                onBagClick={() => alert("Beg icon clicked")}
                {...item}
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

const UserDashboard = () => {
  const router = useRouter();

  const handleViewProduct = (id) => {
    router.push(`/user/${id}`);
  };

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
      {/* small image icon cards */}
      <div className="d-flex align-items-center justify-content-end gap-3 flex-wrap mb-5">
        {SmallCardData.map((item) => (
          <div
            key={item.id}
            className="small-img-card d-flex flex-column justify-content-center align-items-center gap-3"
          >
            <img
              src={item.image}
              alt="pointer"
              className="object-fit-contain"
              height={50}
              width={50}
            />
            <p className="mb-0">{item.text}</p>
          </div>
        ))}
      </div>

      <div className="mb-5">
        <div className="d-flex justify-content-between mb-4 align-items-center">
          <h4 className="txt_color">Top Stylists</h4>
          <Link href={"/user/top-stylists"} className="text-light">
            View More
          </Link>
        </div>

        <div className="row g-3 g-lg-4">
          {userproductsTwo.map((item) => (
            <div className="col-md-3 col-sm-6 col-12" key={item.id}>
              <UserProductCard
                showSellerName={true}
                showCalender={true}
                onCardClick={() => router.push(`/user/${item.id}`)}
                {...item}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mb-3">
        <div className="d-flex justify-content-between mb-4 align-items-center">
          <h4 className="txt_color ">Recent Products</h4>
          <Link href={"/user/recent-stylists"} className="text-light">
            View More
          </Link>
        </div>
        <div className="row g-3 g-lg-4">
          {userproductsTwo.map((item) => (
            <div className="col-md-3 col-sm-6 col-12" key={item.id}>
              <UserProductCard
                showSellerName={true}
                showCalender={true}
                onCardClick={() => router.push(`/user/${item.id}`)}
                {...item}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Multiple Sliders */}
      {/* <div className="row">
        <div className="col-12">
          <ProductSlider
            title="Top Stylists"
            products={userproducts}
            onProductClick={handleViewProduct}
          />
        </div>
      </div> */}

      {/* <div className="row">
        <div className="col-12">
          <ProductSlider
            title="Recent Products"
            products={userproducts}
            onProductClick={handleViewProduct}
          />
        </div>
      </div> */}
    </div>
  );
};

export default UserDashboard;
