
const img = (q) => `/images/product2.png?height=200&width=300&query=${encodeURIComponent(q)}`

export const products = Array.from({ length: 16 }).map((_, i) => ({
  id: String(i + 1),
  title: "Deep mask",
  price: 59,
  image: img("cosmetic product on table, soft light"),
  sellerName: "Sarah J",
  sellerAvatar: "/images/order-prof.png",
  onAction: () => {
    console.log("[v0] Add to cart clicked for product", i + 1)
  },
}))


const userimg = (q) => `/images/product2.png?height=200&width=300&query=${encodeURIComponent(q)}`

export const userproducts = Array.from({ length: 8 }).map((_, i) => {
  const productId = i + 1;
  return {
    id: String(productId),
    title: "Deep mask",
    price: 59,
    image: userimg("cosmetic product on table, soft light"),
    sellerName: "Sarah J",
    sellerAvatar: "/images/order-prof.png",
    // Remove onAction from here
  }
})

const userTwoimg = (q) => `/images/product2s.png?height=200&width=300&query=${encodeURIComponent(q)}`

export const userproductsTwo = Array.from({ length: 4 }).map((_, i) => {
  const productId = i + 1;
  return {
    id: String(productId),
    title: "Deep mask",
    price: 59,
    image: userTwoimg("cosmetic product on table, soft light"),
    sellerName: "Sarah J",
    sellerAvatar: "/images/order-prof.png",
    // Remove onAction from here
  }
})