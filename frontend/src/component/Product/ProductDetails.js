import React, { Fragment, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails, clearErrors } from "../../actions/productAction";
import { useParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { toast } from "react-toastify";
import Loader from "../layout/Loader/Loader"; // Assuming you have a Loader component

const ProductDetails = () => {
  const { id } = useParams(); // Get the id from the URL
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    if (error) {
      toast.error(error); // Show error toast notification
      dispatch(clearErrors()); // Clear the errors
    }
    dispatch(getProductDetails(id)); // Fetch product details using id
  }, [dispatch, id, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader /> // Correct usage of the Loader component
      ) : (
        <Fragment>
          <MetaData title={`${product.name} -- ECOMMERCE`} />
          <div className="ProductDetails">
            <div>
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={item.url}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
