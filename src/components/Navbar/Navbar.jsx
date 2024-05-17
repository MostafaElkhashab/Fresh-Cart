import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import ImageLogo from '../../images/freshcart-logo.svg'
import { authContext } from '../../context/authentication'
import { cartContext } from '../../context/cartContext';
import navbar from './navbar.module.css'
import { wishListContext } from '../../context/wishListContext';



export default function Navbar() {
  const navFunc = useNavigate();
  const { token, setToken, setUserData } = useContext(authContext);
  const { numberOfCartItems } = useContext(cartContext)
  const { numberOfWishListItems } = useContext(wishListContext);
  function logOut() {

    localStorage.removeItem("tkn")
    localStorage.removeItem("profile")
    localStorage.removeItem("account")
    setToken(null)
    setUserData(null)
    setTimeout(function () {
      navFunc("/Login")
    }, 1000)

  }
  const navBarStyle = ({ isActive }) => {
    return {
      borderBottom: isActive ? "2px solid #0AAD0A" : "",
      color: isActive ? "#0AAD0A" : "",
      fontWeight: isActive ? "bold" : ""
    }
  }
  return <>

    <nav className={navbar.background + " navbar navbar-expand-lg p-3 fixed-top shadow"}>


      <div className="container">
        <NavLink className="navbar-brand" to="/" >
          <img src={ImageLogo} alt="freshCart" className='' />
        </NavLink>
        <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarNav">
          <ul className={navbar.mobileView + " navbar-nav   "}>
            {token ? <>
              <li className="nav-item navhover">
                <NavLink style={navBarStyle} className="nav-link active fs-5 " aria-current="page" to="/products">Products</NavLink>
              </li>
              <li className="nav-item navhover">
                <NavLink className="nav-link fs-5" style={navBarStyle} to="/categories">Categories</NavLink>
              </li>
              <li className="nav-item navhover">
                <NavLink className="nav-link fs-5" style={navBarStyle} to="/brands">Brands</NavLink>
              </li>

              <li className="nav-item navhover" >
                <NavLink className="nav-link fs-5" to="/allorders" style={navBarStyle}>All Orders</NavLink>
              </li>
            </> : <>
              <li className="nav-item navhover">
                <NavLink className="nav-link active fs-5" aria-current="page" to="/products" style={navBarStyle}>Products</NavLink>
              </li>
              <li className="nav-item navhover">
                <NavLink className="nav-link fs-5" to="/categories" style={navBarStyle}>Categories</NavLink>
              </li>
              <li className="nav-item navhover">
                <NavLink className="nav-link fs-5" to="/brands" style={navBarStyle}>Brands</NavLink>
              </li>
            </>
            }
          </ul>
          <ul className="navbar-nav ms-auto justify-content-center align-items-center">
            {token ?
              <>
                <li className="nav-item navhover">
                  <NavLink className="nav-link position-relative fs-6" to="/wishList" style={navBarStyle}>
                    WishList
                    <i className="fa-regular fa-heart ms-1 fw-bold" style={{ color: "#ff3d3d" }}>
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {numberOfWishListItems}
                        <span className="visually-hidden">unread messages </span>
                      </span>
                    </i>
                  </NavLink>
                </li>
                <li className="nav-item navhover">
                  <NavLink className="nav-link position-relative fs-6" to="/cart" style={navBarStyle}>
                    Cart
                    <i className="fa-solid fa-cart-shopping " style={{ color: "#0AAD0A" }}>
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {numberOfCartItems}
                        <span className="visually-hidden">unread messages</span>
                      </span>
                    </i>
                  </NavLink>
                </li>
              </> :

              <>



              </>
            }



            {token ? <>
              <li className="nav-item navhover">
                <NavLink className="nav-link fs-6 text-uppercase mx-1" to="/profile" style={navBarStyle}>
                  <i className="fa-solid fa-user me-1"></i> {localStorage.getItem("profile")}
                </NavLink>
              </li>
              <li className="nav-item navhover">
                <span onClick={logOut} style={{ cursor: 'pointer' }} className="nav-link" to="#">
                  <i className="fa-solid fa-arrow-right-from-bracket me-1"></i>
                  Logout


                </span>
              </li>
            </> : <>

              <li className="nav-item navhover">

                <NavLink className="nav-link active fs-5" aria-current="page" to="/login" style={navBarStyle}>
                  <i className="fa-solid fa-right-to-bracket me-1"></i>
                  Login
                </NavLink>
              </li>
              <li className="nav-item fs-5 navhover">
                <NavLink className="nav-link" to="/Registeration" style={navBarStyle}>
                  <i className="fa-solid fa-user me-1"></i>
                  Register</NavLink>
              </li>
            </>}
          </ul>
        </div>
      </div>
    </nav>
  </>
}
