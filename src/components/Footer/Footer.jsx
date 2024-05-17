import React from 'react'
import footer from './footer.module.css'
import { Link } from 'react-router-dom'
export default function Footer() {
  return <>

    <footer className={footer.background + " mt-5 text-dark py-5 text-center "}>
      <div className="container">
        <div className="row">
          <div className="col-md-3 ">
            <h3 className="">Categories</h3>
            <ul className={footer.footerText + " list-unstyled"}>
              <li className="" style={{ cursor: 'pointer' }}>Electronics</li>
              <li className="" style={{ cursor: 'pointer' }}>Mobiles</li>
              <li className="" style={{ cursor: 'pointer' }}>Home Appliances</li>
            </ul>
          </div>
          <div className="col-md-3">
            <h3>Brands</h3>
            <ul className={footer.footerText + " list-unstyled"}>
              <li style={{ cursor: 'pointer' }}>Samsung</li>
              <li style={{ cursor: 'pointer' }}>Apple</li>
              <li style={{ cursor: 'pointer' }}>LG</li>
            </ul>
          </div>
          <div className="col-md-3">
            <h3>Support</h3>
            <ul className={footer.footerText + " list-unstyled"}>
              <li style={{ cursor: 'pointer' }}>FAQ</li>
              <li style={{ cursor: 'pointer' }}>Terms & Conditions</li>
              <li style={{ cursor: 'pointer' }}>Privacy Policy</li>
              <li style={{ cursor: 'pointer' }}>Contact Us</li>
            </ul>
          </div>
          <div className="col-md-3">
            <h3 className='mb-2 '>Follow Us</h3>
            <div className={footer.footerText + " d-flex justify-content-center align-items-center wrapper"}>
              <Link target='_blank' to={"https://www.facebook.com/profile.php?id=100003654834862" } className=" icon"><i className='fa-brands fa-facebook-f me-2' style={{ cursor: 'pointer' }}></i></Link>
              <Link target='_blank' to={"https://www.instagram.com/mostafaelkhashab79/?hl=ar"}>
              <i className='fa-brands fa-instagram me-2' style={{ cursor: 'pointer' }}></i>
              </Link>
              <Link target='_blank' to={"https://twitter.com/MostafaElkhas10"}>
              <i className='fa-brands fa-twitter me-2' style={{ cursor: 'pointer' }}></i>
              </Link>
              <Link target='_blank' to={"/"}>
              <i className='fa-brands fa-youtube me-2' style={{ cursor: 'pointer' }}></i>
              </Link>
              <Link target='_blank' to={"https://www.linkedin.com/in/mostafa-elkhashab-4923b32b5/"}>
              <i className='fa-brands fa-linkedin me-2' style={{ cursor: 'pointer' }}></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </>
}
