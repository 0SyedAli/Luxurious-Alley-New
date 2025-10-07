import { ProductGallery } from "@/components/allproduct/product-gallery"
import { ReviewCard } from "@/components/allproduct/review-card"
import { getProductBySlug } from "@/lib/product-detail-data"
import { notFound } from "next/navigation"
import styles from "./page.module.css"

export default async function ProductPage({ params }) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return (
    <div className={styles.productContainer}>
      <div className="container">
        <div className="row g-4">
          {/* Left: Gallery */}
          <div className="col-12 col-md-4 col-lg-3">
            <ProductGallery mainImage={product.mainImage} thumbnails={product.thumbnails} alt={product.name} />
          </div>

          {/* Right: Details */}
          <div className="col-12 col-md-8 col-lg-9">
            <div className={styles.detailsSection}>
              {/* Header */}
              <div className="d-flex justify-content-between align-items-start mb-4">
                <div>
                  <h1 className={styles.productTitle}>{product.name}</h1>
                  <p className={styles.priceText}>
                    ${product.price.toFixed(2)}{" "}
                    <span className={styles.availabilityText}>({product.availability} available)</span>
                  </p>
                </div>
                <button className={styles.editButton}>Edit</button>
              </div>

              {/* Attributes */}
              <div className="row mb-4">
                <div className="col-6 col-md-3 mb-3">
                  <p className={styles.attributeLabel}>Model Name:</p>
                  <p className={styles.attributeValue}>{product.modelName}</p>
                </div>
                <div className="col-6 col-md-3 mb-3">
                  <p className={styles.attributeLabel}>Brand Name</p>
                  <p className={styles.attributeValue}>{product.brandName}</p>
                </div>
                <div className="col-6 col-md-3 mb-3">
                  <p className={styles.attributeLabel}>Category</p>
                  <p className={styles.attributeValue}>{product.category}</p>
                </div>
                <div className="col-6 col-md-3 mb-3">
                  <p className={styles.attributeLabel}>Vendor</p>
                  <p className={styles.attributeValue}>{product.vendor}</p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-5">
                <h2 className={styles.descriptionTitle}>Description</h2>
                <p className={styles.descriptionText}>{product.description}</p>
              </div>

              {/* Reviews */}
              <div>
                <h2 className={styles.reviewsTitle}>Customers Reviews</h2>
                {product.reviews.map((review, idx) => (
                  <ReviewCard key={idx} {...review} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
