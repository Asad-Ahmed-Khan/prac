import React, {useState}  from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { postDel } from "../../redux/actionCreators/postsActionCreator";
import Loader  from "../../Loader";


import './postcard.css'
const PostCard = ({  posts, id }) => {
  
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const postDelete = (postId) => {
    dispatch(postDel(postId, setLoading));
    toast.success("Post deleted successfully!");
  };
  

  return (
    <>
    {console.log('post', posts)}
    {loading ? (
            <Loader />
          ) : (
    <div className="cards col-md-5 px-0 m-2 " key={id}>
    
        {posts.length !== 0 && <h1>Products</h1>}
        <div className='products-container'>
        
            {posts.length === 0 && <div>slow internet...no products to display</div>}
            {posts.map(post => (
                <div className='product-card' key={post.postId}>
                    <div className='product-img'>
                        <img src={post.post.image} alt="not found" />
                    </div>
                    <div className='product-name'>
                    {post.post.title.toUpperCase()}
                    </div>
                    <div className='product-price'>
                        Rs {post.post.price}.00
                </div>
              

                    <div className="">
       
          <div className="text-right">  
                    <button
              type="button"
              onClick={() =>
                history.push(`/admin/post/${post.postId}/edit`)
              }
              className="btn btn-outline-primary  my-2  mx-1"
            >
              <i className="fa fa-pencil"></i> Edit Post
            </button>
            <button
            
              type="button"
              onClick={() => postDelete(post.postId)}
              className="btn btn-danger my-2ss"
            >
              <i className="fa fa-trash-o"></i> Delete Post
            </button>
            </div>
               </div>
                 
                </div>
            ))}
        </div>
         
        </div> )}
    </>
)
 
};

export default PostCard;
