import React, { Fragment, useEffect, useState } from 'react'
import Carousel from "react-material-ui-carousel";
import './ProductDetails.css'
import { useDispatch, useSelector } from "react-redux"
import { clearErrors, getProductDetails, newReview } from "../../actions/productAction"
import { useParams } from 'react-router-dom';
import StarRating from '../Home/StarRating';
import ReviewCard from "./ReviewCard.js"
import Loader from "../../component/layout/Loader/Loader.js"
import { toast } from "react-toastify";
import MetaData from '../layout/MetaData.js';
import { addItemsToCart } from '../../actions/cartAction.js'; 
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
    
  const { product, loading, error } = useSelector((state) => state.productDetails)
  
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  
  // Check if user is admin
  const isAdmin = isAuthenticated && user  && user.role === "admin"; 

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const increasequantity = () => {
    if (product?.Stock <= quantity) return;
    setQuantity(quantity + 1);
  }

  const decreasequantity = () => {
    if (1 >= quantity) return;
    setQuantity(quantity - 1);
  }

  const addToCartHandler = () => {
    if (!isAuthenticated) {
      toast.error("Please login first");
      return;
    }
    
    if (isAdmin) {
      toast.error("Admin cannot add items to cart");
      return;
    }

    dispatch(addItemsToCart(id, quantity));
    toast.success("Item Added To Cart");
  }

  const submitReviewToggle = () => {
    if (!isAuthenticated) {
      toast.error("Please login to submit a review");
      return;
    }
    setOpen(!open);
  };

  const reviewSubmitHandler = () => {
    if (!rating) {
      toast.error("Please provide a rating");
      return;
    }
    
    if (!comment.trim()) {
      toast.error("Please provide a comment");
      return;
    }

    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));
    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      toast.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }

    dispatch(getProductDetails(id))
  }, [dispatch, id, error, success, reviewError])

  return (
    <Fragment>
      {loading ? (
        <Loader/>
      ) : (
        product && (
          <Fragment>
            <MetaData title={`${product?.name || 'Product'} ----SURABHI MOBILE`}/>
            <div className='ProductDetails'>
              <div className="carousel-container">
                <Carousel 
                  className="product-carousel"
                  indicatorContainerProps={{
                    style: { marginTop: "20px" }
                  }}
                >
                  {product.images?.map((item, i) => (
                    <img 
                      className='carouselImage' 
                      key={item.url} 
                      src={item.url}
                      alt={`${i} Slide`} 
                    />
                  ))}
                </Carousel>
              </div>
              <div>
                <div className='detailsBlock-1'>
                  <h2>{product?.name}</h2>
                  <p>Product # {product?._id}</p>
                </div>
                <div className='detailsBlock-2'>
                  <StarRating 
                    value={product?.ratings || 0}  
                    size={window.innerWidth < 600 ? 20 : 25}
                    count={5}
                  />
                  <span>({product?.numOfReviews || 0} Reviews)</span>
                </div>
                <div className='detailsBlock-3'>
                  <h1>{`₹ ${product?.price || 0}`}</h1>
                  <div className='detailsBlock-3-1'>
                    {/* Show quantity selector and add to cart only for non-admin users */}
                    {!isAdmin && (
                      <>
                        <div className='detailsBlock-3-1-1'>
                          <button onClick={decreasequantity}>-</button>
                          <input readOnly value={quantity} type="number" />
                          <button onClick={increasequantity}>+</button>
                        </div>
                        <button 
                          disabled={product?.Stock < 1 || !isAuthenticated} 
                          onClick={addToCartHandler}
                          title={!isAuthenticated ? "Please login to add to cart" : ""}
                        >
                          {!isAuthenticated ? "Login to Add to Cart" : "Add to Cart"}
                        </button>
                      </>
                    )}
                    
                    {/* Show admin message */}
                    {isAdmin && (
                      <div className="admin-message" style={{
                        padding: "10px",
                        backgroundColor: "#f0f0f0",
                        borderRadius: "5px",
                        textAlign: "center",
                        color: "#666"
                      }}>
                        <p>You are logged in as Admin. Cart functionality is disabled.</p>
                      </div>
                    )}
                  </div>
                  <p>
                    Status:
                    <b className={product?.Stock < 1 ? "redColor" : "greenColor"}>
                      {product?.Stock < 1 ? "OutOfStock" : "InStock"}
                    </b>
                  </p>
                </div>
                <div className='detailsBlock-4'>
                  Description: <p>{product?.description}</p>
                </div>
                
                {/* Show submit review button for authenticated users */}
                {isAuthenticated && (
                  <button onClick={submitReviewToggle} className='submitReview'>
                    Submit Review
                  </button>
                )}
                
                {/* Show login message for unauthenticated users */}
                {!isAuthenticated && (
                  <div className="login-message" style={{
                    padding: "10px",
                    backgroundColor: "#e3f2fd",
                    borderRadius: "5px",
                    textAlign: "center",
                    color: "#1976d2",
                    marginTop: "10px"
                  }}>
                    <p>Please login to submit reviews and add items to cart</p>
                  </div>
                )}
              </div>
            </div>

            <h3 className='reviewHeading'>REVIEWS</h3>
            
            <Dialog 
              aria-labelledby="simple-dialog-title"
              open={open}
              onClose={submitReviewToggle}
            >
              <DialogTitle>Submit Review</DialogTitle>
              <DialogContent className="submitDialog">
                <StarRating 
                  value={rating} 
                  onChange={(newRating) => setRating(newRating)}
                  editable={true}
                  count={5}
                />
                <textarea
                  className="submitDialogTextArea"
                  cols="30"
                  rows="5"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write your review here..."
                ></textarea>
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
        )
      )}
    </Fragment>
  )
}

export default ProductDetails;