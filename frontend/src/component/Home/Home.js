import React, { Fragment, useEffect } from "react";
import { PiMouseScroll } from "react-icons/pi";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { getProduct, clearErrors } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";

// import Loader from "../layout/Loader/Loader";
// import { useAlert } from "react-alert";

import "./Home.css";

const Home = () => {
  // const alert = useAlert();
  const dispatch = useDispatch();
  const { products, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error]);
  return (
    <Fragment>
      <MetaData title="E-Commerce" />
      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>

        <a href="#container">
          <button>
            Scroll <PiMouseScroll />
          </button>
        </a>
      </div>

      <h2 className="homeHeading">Featured Products</h2>

      <div className="container" id="container">
        {products &&
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
    </Fragment>
  );
};

export default Home;
