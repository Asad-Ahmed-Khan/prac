import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

const Navbar = ({ logoutUser }) => {
  const { isLoggedIn, user } = useSelector(
    (state) => ({
      isLoggedIn: state.auth.isLoggedIn,
      user: state.auth.user,
    }),
    shallowEqual
  );

  return (
    <nav className="navbar navbar-expand-lg py-3 navbar-dark bg-dark shadow">
      <Link to="/admin" className="navbar-brand ml-5">
        AdmiDashboard
      </Link>
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink exact to="/admin" className="nav-link">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink exact to="/admin/addPost" className="nav-link">
            Add Post
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink exact to="/admin/posts" className="nav-link">
            All Posts
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink exact to="/admin/orders" className="nav-link">
            Order List
          </NavLink>
        </li>
      </ul>

      {isLoggedIn && (
        <div className="profile text-white font-weight-bold ml-auto mr-5">
          Welcome Admin,{" "}
          <span className="text-warning">{user?.displayName}</span>
          <button className="btn btn-primary ml-3" onClick={() => logoutUser()}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
