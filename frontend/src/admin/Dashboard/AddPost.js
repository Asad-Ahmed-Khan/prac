import React, { useState ,useEffect  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { newPost } from "../../redux/actionCreators/postsActionCreator";
import Loader from "../../Loader";
const AddPost = () => {

 
  const userId = useSelector((state) => state.auth.userId);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() =>{
    // setLoading(true)
    // setTimeout(() =>{
    // setLoading(false)
    // }, 2000 )
  }, [])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title || !category || !price || !description) {
      return toast.warning("Please fill in all fields!");
    }

    if (!image || image === undefined) {
      return toast.warning("Please select an image!");
    }
   
  

    if (description.length < 50) {
      return toast.info("Description should be of atleast 100");
    }
    // if (title.trim().split(" ").length < 2) {
    //   return toast.info("Title should be of atleast 2 words");
    // }
    if (image.size > 5242880) {
      return toast.info("Image should be less than or equal to 5 MB");
    }
    const data = {
      title,
      category,
      price,
      description,
      image,
    };

    dispatch(newPost(data, userId, user?.displayName || 'user', setProgress, setLoading));
  };

  const rules = {
    pattern : '^0-9',
    message : 'Error'
  }

  return (
    <div className="container">
     
      <div className="row">
        <div className="col-md-12 my-5 text-right">
          <Link to="/admin/dashboard" className="btn btn-dark mr-2">
            Go Back
          </Link>
        </div>
       
        <div className="col-md-12 mb-3">
          <h1 className="display-3 text-dark text-center">Add Post</h1>
        </div>
       
        {console.log('loading', loading)}
        <div className="col-md-6 mx-auto mb-5 shadow p-5">
          {loading ? (
            <Loader />
          )
           : progress <= 100 && progress > 0 ? (
              <div className="mx-auto p-5   text-center ">
              <i className="fa fa-tick text-success mx-auto my-2"></i>
              <h1 className="text-center my-2">Post Uploaded successfully  </h1>
              
              <Link
                to={"/admin/posts"}
                className="my-2 mx-auto btn btn-primary"
              >
                See Posts 
              </Link>
            </div>
             
            ) 
           : (
            <form onSubmit={handleSubmit} >
           
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Title"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="category"
                  placeholder="Categories"
                  className="form-control"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Price"
                  className="form-control"
                  
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  pattern="^[0-9]+"
                />
              </div>
              <div className="form-group">
                <textarea
                  placeholder="Enter Description"
                  className="form-control"
                  rows="8"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="form-group">
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setImage(e.target.files[0])}
                  accept="image/png, image/jpeg, image/jpg"
                />
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  className="btn btn-dark btn-block"
                  value="Add Post"
                />
              </div>
            </form>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default AddPost;
