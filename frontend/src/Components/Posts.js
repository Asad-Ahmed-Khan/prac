

import React, { useEffect, useContext } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPosts } from "../redux/actionCreators/postsActionCreator";
import { CartContext } from '../Global/CartContext'
import StarRating from "../Components/StarRating"
import '../admin/Dashboard/postcard.css'
import Loader from "../Loader"
const Posts = () => {

  const { posts, postsLoading, isLoggedIn, userId } = useSelector(
    (state) => ({
      posts: state.posts.posts,
      postsLoading: state.posts.postsLoading,
      isLoggedIn: state.auth.isLoggedIn,
      userId: state.auth.userId,
    }),
    shallowEqual
  );
  const latestPosts = posts;
  latestPosts.sort((a, b) => {
    const postA = new Date(a.post.createdAt);
    const postB = new Date(b.post.createdAt);

    if (postA < postB) return 1;
    if (postA > postB) return -1;
    return 0;
  });

  const dispatch = useDispatch();
  const contextArea = useContext(CartContext);
  useEffect(() => {
    //if (postsLoading) {
      dispatch(getPosts());
   // }
  }, []);
  return (
   
    <div className="container-fluid">
      <div className="row px-5">
      
        <div className="w-100 py-5">
          <div className="latestPostsHeading border-bottom border-primary d-flex mx-5">
            
            <p className="bg-dark text-white col-md-12 d-flex align-items-center justify-content-center py-2 h5">
              All Posts
            </p>
          </div>
          <div className=" my-5">
          <div class= 'bigContainer cards   m-2 '>
            <div class='products-container'>
            {postsLoading
              ? <Loader />
              : latestPosts.map((post, id) => (
                  <div
                    className="product-card"
                    key={id}
                  >
                    <div className='product-img'>
                    <img
                      src={post.post.image}
                      alt={post.post.title}
                      className="card-img-top border-bottom"
                    />
                    </div>
                    <div className="product-name">
                      <h4 className="card-title text-capitalize">
                        {post.post.title}
                      </h4>
                    </div>
                    <div className='product-price'>
                      <h2 className="card-title text-capitalize">
                        {post.post.price}
                      </h2>
                      <p className="texts">
                        {post.post.description.substring(0, 1).toUpperCase() +
                          post.post.description.substring(1, 100)}
                        ...
                      </p>
                      <div className="d-flex">
                        {post.post.category.split(",").map((ctg, i) => (
                          <p
                            className="small bg-dark mr-2 py-1 px-2 text-white"
                            key={i}
                          >
                            {ctg.trim()}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div style={{margin:'auto'}} >
                    <StarRating product={post}  /></div>
                    <p style={{margin:'auto'}}>{Number(post?.post?.rating || 0).toFixed(2)}</p>
                        <button className='addcarts-btn' onClick={() => contextArea.dispatch({ type: 'ADD_TO_CART', id: post.postId, post })}>ADD TO CART</button>
                  </div>
                ))}
                </div>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
