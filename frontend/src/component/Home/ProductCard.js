import React from "react";
import { Link } from "react-router-dom";

import StarRatings from "react-star-ratings";

const ProductCard = ({ product }) => {
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <StarRatings
          rating={product.ratings}
          starRatedColor="orange"
          numberOfStars={5}
          name="rating"
          starDimension={window.innerWidth < 500 ? "12px" : "17px"}
          starSpacing="2px"
        />
        <span className="productCardSpan">
          ({product.numOfReviews} Reviews)
        </span>
      </div>
      <span>{`₹${product.price}`}</span>
    </Link>
  );
};

export default ProductCard;
