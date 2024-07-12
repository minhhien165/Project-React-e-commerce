import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../../login/LoginPage'
import HeaderUser from '../headerUser/HeaderUser';
import HomePage from '../HomePage/HomePage';

export default function Home() {
  return (
    <div>
      <header>
        <HeaderUser></HeaderUser>
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
          <div className="container justify-content-center justify-content-md-between">
            <button className="navbar-toggler border py-2 text-dark" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarLeftAlignExample" aria-controls="navbarLeftAlignExample" aria-expanded="false" aria-label="Toggle navigation">
              <i className="fas fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarLeftAlignExample">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to="/" className="nav-link text-dark" aria-current="page">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to="/Products" className="nav-link text-dark">Products</Link>
                </li>
                <li className="nav-item">
                  <Link to="/hot-offers" className="nav-link text-dark">Hot offers</Link>
                </li>
                <li className="nav-item">
                  <Link to="/gift-boxes" className="nav-link text-dark">Gift boxes</Link>
                </li>
                <li className="nav-item">
                  <Link to="/projects" className="nav-link text-dark">Projects</Link>
                </li>
                <li className="nav-item">
                  <Link to="/menu-item" className="nav-link text-dark">Menu item</Link>
                </li>
                <li className="nav-item">
                  <Link to="/menu-name" className="nav-link text-dark">Menu name</Link>
                </li>
                <li className="nav-item dropdown">
                  <Link to="/others" className="nav-link dropdown-toggle text-dark" id="navbarDropdown" role="button" data-mdb-toggle="dropdown" aria-expanded="false">Others</Link>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><Link to="/action" className="dropdown-item">Action</Link></li>
                    <li><Link to="/another-action" className="dropdown-item">Another action</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><Link to="/something-else" className="dropdown-item">Something else here</Link></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <section>
        <Outlet></Outlet>
      </section>
    </div>
  );
}
