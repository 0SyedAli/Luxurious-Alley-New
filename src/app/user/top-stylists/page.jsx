"use client";

import { UserProductCard } from "@/component/new/cards/product-card";
import { userproducts } from "@/lib/products-data";

const TopStylists = () => {
  return (
    <div>
      <h4 className="txt_color mb-4">Top Stylists</h4>
      <div className="row g-3 g-lg-4">
        {userproducts.map((item) => (
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
  );
};

export default TopStylists;
