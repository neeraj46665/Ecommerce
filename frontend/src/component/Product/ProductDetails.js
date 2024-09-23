import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {
  getProductDetails,
  clearErrors,
  newReview,
} from "../../actions/productAction";
import { addItemsToCart } from "../../actions/cartAction";
import { useNavigate, useParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { toast } from "react-toastify";
import Loader from "../layout/Loader/Loader"; // Assuming you have a Loader component
import ReviewCard from "./ReviewCard.js";

import Rating from "@mui/material/Rating";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

const ProductDetails = () => {
  const { id } = useParams(); // Get the id from the URL
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    toast.success("Item Added To Cart");
    dispatch(addItemsToCart(id, quantity));
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };
  const reviewSubmitHandler = () => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      toast.error("Please log in to submit a review.");
      navigate("/login");
    } else {
      // Proceed with review submission logic
      toast.success("Submitting review...");

      const myForm = new FormData();

      myForm.set("rating", rating);
      myForm.set("comment", comment);
      myForm.set("productId", id);

      dispatch(newReview(myForm));

      setOpen(false);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors()); // Clear the errors
    }

    if (reviewError) {
      toast.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Review Submitted Successfully ");
    }
    dispatch(getProductDetails(id)); // Fetch product details using id
  }, [dispatch, id, error, success, reviewError]);

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

            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}>
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? " utOfStock" : " InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>
          <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}>
            <DialogTitle>.</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
