"use client"
import { ServiceCard } from "@/components/allservices/service-card"
import { products } from "../../../lib/products-data"
const AllProducts = () => {
  return (
    <main className="allproducts_gradientBg">
      <div className="container">
        {/* header */}
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h1 className={`h4 mb-0 allproducts_title`}>All Services</h1>
          <button className="btn btn-accept py-2 rounded-pill fw-semibold px-3">Add Services</button>
        </div>

        {/* grid */}
        <div className="row g-3 g-lg-4">
          {products.map((p) => (
            <div key={p.id} className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
              <ServiceCard {...p} />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default AllProducts