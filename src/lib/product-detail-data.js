export const productsDetail = [
  {
    id: "1",
    slug: "deep-mask-conditioner",
    name: "Deep Mask Conditioner",
    price: 24.0,
    availability: 34,
    modelName: "Brand Name",
    brandName: "Hairshop",
    category: "Conditioner",
    vendor: "Hairshop",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    mainImage: "/black-hair-conditioner-bottles-and-comb-on-white-b.jpg",
    thumbnails: ["/black-conditioner-bottles-set.jpg", "/conditioner-bottle-close-up.jpg"],
    reviews: [
      {
        name: "John doe",
        avatar: "/male-avatar-portrait.jpg",
        rating: 5,
        date: "18 Oct 2023",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
      {
        name: "John doe",
        avatar: "/male-avatar-portrait.jpg",
        rating: 5,
        date: "18 Oct 2023",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
    ],
  },
]

export function getProductBySlug(slug) {
  return productsDetail.find((p) => p.slug === slug)
}
