import React from "react"
import ContentLoader from "react-content-loader"


const CartItemSkeleton: React.FC = () => (
  <ContentLoader 
    speed={2}
    width={300}
    height={400}
    viewBox="0 0 300 400"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="11" ry="11" width="270" height="350" />
  </ContentLoader>
)

export default CartItemSkeleton