import React, { useEffect, useState } from 'react'
import { getPosts } from "../redux/actionCreators/postsActionCreator"; 
import Loader from "../Loader"
import {  useDispatch,  } from "react-redux";
import { auth } from '../Config/config'
import { Link } from 'react-router-dom'
import "./login.css"

// export const Login = (props) => {

//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');

//     const login = (e) => {
//         e.preventDefault();
//         auth.signInWithEmailAndPassword(email, password).then(() => {
//             setEmail('');
//             setPassword('');
//             setError('');
//             props.history.push('/');
//         }).catch(err => setError(err.message));
//     }

//     return (
//         <div className='container'>
//             <br />
//             <h2>Login</h2>
//             <br />
//             <form autoComplete="off" className='form-group' onSubmit={login}>
//                 <label htmlFor="email">Email</label>
//                 <input type="email" className='form-control' required
//                     onChange={(e) => setEmail(e.target.value)} value={email} />
//                 <br />
//                 <label htmlFor="password">Password</label>
//                 <input type="password" className='form-control' required
//                     onChange={(e) => setPassword(e.target.value)} value={password} />
//                 <br />
//                 <button type="submit" className='btn btn-success btn-md mybtn'>LOGIN</button>
//             </form>
//             {error && <span className='error-msg'>{error}</span>}
//             <br/>
//             <span>Don't have an account? Register
//                 <Link to="signup"> Here</Link>
//             </span>
//         </div>
//     )
// }
import Google from "../images/google.png";
import Facebook from "../images/facebook.png";
import Github from "../images/github.png";
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';



export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const handleGoogleSignIn = (data) => console.log('handleGoogleSignIn', data);
    const handleFBSignIn = (data) => console.log('handleFBSignIn', data);;
    const [loading , setLoading] = useState(false);
    const dispatch = useDispatch();
    useEffect(() =>{
        setLoading(true)
        setTimeout(() =>{
        setLoading(false)
        }, 2000 )
        dispatch(getPosts());
      }, [])


    const login = (e) => {
      
            
      
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password).then(() => {
            setEmail('');
            setPassword('');
            setError('');
            props.history.goBack();
        }).catch(err => setError(err.message));
    }




    const google = () => {
        window.open("http://localhost:5000/auth/google", "_self");
    };

    const github = () => {
        window.open("http://localhost:5000/auth/github", "_self");
    };

    const facebook = () => {
        window.open("http://localhost:5000/auth/facebook", "_self");
    };

    return (
       
        <form autoComplete="off" className='form-group' onSubmit={login}>
             { loading ? (
            <Loader />
          ) : (<>
            <div className="login">
                <h1 className="loginTitle">Choose a Login Method</h1>
                <div className="wrapper1">
              
                    <div className="left">
                        <GoogleLogin
                            clientId='568290849976-jr284jc01jjqm2li24u8sfarr3ombtju.apps.googleusercontent.com'
                            buttonText="Google"
                            scope='https://www.googleapis.com/auth/drive.file'
                            // onSuccess={this.responseGoogle}
                            // onFailure={this.responseErrorGoogle}
                            onSuccess={(success) => console.log('success', success)}
                            // onSuccess={onLoginSuccess}
                             onFailure={(fail) => console.log('fail', fail)}
                             //onFailure={onFailureSuccess}
                              onClick={handleGoogleSignIn}
                            cookiePolicy={'single_host_origin'}
                            isSignedIn={true}
                            fetchBasicProfile={true}
                        />
                         {/* <div className="loginButton google" onClick={google}>
                        <img src={Google} alt="" className="icon" />
                         Google
                        </div>  */}
      
                        <div className="loginButton facebook" onClick={facebook}>
                            <img src={Facebook} alt="" className="icon" />
                            Facebook
                        </div>
                        {/* <div className="loginButton github" onClick={github}>
                            <img src={Github} alt="" className="icon" />
                            Github
                        </div> */}
                    </div>
                    <div className="center">
                        <div className="line" />
                        <div className="or">OR</div>
                    </div>
                    <div className="right">
                        <input type='email' className='log' placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)} value={email} />
                        <input type="password" className='log' placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)} value={password} />
                        {error && <span className='error-msg'>{error}</span>}
                        <button className="submit">Login</button>
                        <Link to='/Admin/login' className="submit" style={{marginTop: '5px', textAlign: 'center'}}>Login With Admin</Link>
                        <br />
                        <span>Don't have an account? Register
                            <Link to="signup"> Here</Link>
                        </span>

                    </div>

                </div>
            </div>
            </>) }
        </form> 
        

    );
};

