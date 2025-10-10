"use client";

import CartTable from "@/components/user/tables/cart-table";
import { useRouter } from "next/navigation";

const demoItems = [
  {
    id: "1",
    name: "Deep Mask",
    price: 43.6,
    quantity: 5,
    imageSrc: "/images/cart.jpg",
  },
  {
    id: "2",
    name: "Deep Mask",
    price: 43.6,
    quantity: 5,
    imageSrc: "/images/cart.jpg",
  },
  {
    id: "3",
    name: "Deep Mask",
    price: 43.6,
    quantity: 5,
    imageSrc: "/images/cart.jpg",
  },
  {
    id: "4",
    name: "Deep Mask",
    price: 43.6,
    quantity: 5,
    imageSrc: "/images/cart.jpg",
  },
];

const UserCart = () => {
    const router = useRouter();
  return (
    <main className="container py-4" aria-label="Cart">
      <h4 className="txt_color mb-4 display-6">Cart Summary</h4>
      <div className="row">
        <div className="col-12 col-md-8">
          <CartTable items={demoItems} />
        </div>
        <div className="col-12 col-md-4 mt-4">
          <h4 className="txt_color mb-4 display-6">Cart totals</h4>
          <div
            style={{ borderBottom: "1px solid #573D1A" }}
            className=" mb-3"
          >
            <h5 className="text-light">Sub Total</h5>
            <p style={{ color: "#D99C15" }}>$65.00</p>
          </div>
          <div
            style={{ borderBottom: "1px solid #573D1A" }}
            className=" mb-4"
          >
            <h5 className="text-light">Sub Total</h5>
            <p style={{ color: "#D99C15" }}>$65.00</p>
          </div>
          <button className="user-dashboard-box-btn" onClick={() => router.push('/user/checkout')}>
            Proceed to checkout
          </button>
        </div>
      </div>
    </main>
  );
};

export default UserCart;
