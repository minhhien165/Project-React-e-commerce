import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function H() {
  const [showShow, setShowShow] = useState(false);

  const toggleShow = () => setShowShow(!showShow);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light w-100" style={{ position: 'fixed', top: 0, zIndex: 1000 }}>
        <div className="container-fluid">
          <ul className="navbar-nav d-flex flex-row align-items-center w-auto">
            <button className="navbar-toggler" type="button" aria-label="Toggle navigation" onClick={toggleShow}>
              <span className="navbar-toggler-icon"></span>
            </button>
            <a className="navbar-brand" href="#">
              <img src="https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.webp" height="30" alt="" loading="lazy" />
            </a>

            <div className="collapse navbar-collapse">
              <div className="navbar-nav d-flex align-items-center">
                <input className="form-control" type="text" placeholder="Search (ctrl + '/' to focus)" />
                <i className="fa fa-search mx-2"></i>
              </div>
            </div>
          </ul>
          <ul className="navbar-nav d-flex flex-row justify-content-end w-auto">
            <li className="nav-item me-3 me-lg-0 d-flex align-items-center">
              <div className="nav-link dropdown">
                <a className="nav-link dropdown-toggle hidden-arrow" href="#!" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="fa fa-bell"></i>
                  <span className="badge bg-danger rounded-pill">1</span>
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a className="dropdown-item" href="#">Some news</a></li>
                  <li><a className="dropdown-item" href="#">Another news</a></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </div>
            </li>

            <li className="nav-item me-3 me-lg-0">
              <a className="nav-link" href="#">
                <i className="fa fa-fill-drip"></i>
              </a>
            </li>
            <li className="nav-item me-3 me-lg-0">
              <a className="nav-link" href="#">
                <i className="fa fa-github"></i>
              </a>
            </li>

            <li className="nav-item me-3 me-lg-0 d-flex align-items-center">
              <div className="nav-link dropdown">
                <a className="nav-link dropdown-toggle hidden-arrow" href="#!" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src="https://mdbootstrap.com/img/Photos/Avatars/img (31).jpg" className="rounded-circle" height="22" alt="" loading="lazy" />
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a className="dropdown-item" href="#">My profile</a></li>
                  <li><a className="dropdown-item" href="#">Settings</a></li>
                  <li><a className="dropdown-item" href="#">Logout</a></li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </nav>

      <nav className={`collapse ${showShow ? 'show' : ''} d-lg-block bg-white sidebar`} style={{ position: 'fixed', top: '56px', left: 0, height: 'calc(100vh - 56px)', width: '250px', zIndex: 1000 }}>
        <div className="position-sticky">
          <ul className="list-group list-group-flush mx-3 mt-4">
            <li className="list-group-item border-0 border-bottom rounded" aria-current="true">
              <i className="fa fa-tachometer-alt me-3"></i>
              Main Dashboard
            </li>
            <li className="list-group-item border-0 border-bottom rounded active">
              <i className="fa fa-chart-area me-3"></i>
              Website traffic
            </li>
            <li className="list-group-item border-0 border-bottom rounded">
              <i className="fa fa-lock me-3"></i>
              Password
            </li>
            <li className="list-group-item border-0 border-bottom rounded">
              <i className="fa fa-chart-line me-3"></i>
              Analytics
            </li>
            <li className="list-group-item border-0 border-bottom rounded">
              <i className="fa fa-chart-pie me-3"></i>
              SEO
            </li>
            <li className="list-group-item border-0 border-bottom rounded">
              <i className="fa fa-chart-bar me-3"></i>
              Orders
            </li>
            <li className="list-group-item border-0 border-bottom rounded">
              <i className="fa fa-globe me-3"></i>
              International
            </li>
            <li className="list-group-item border-0 border-bottom rounded">
              <i className="fa fa-building me-3"></i>
              Partners
            </li>
            <li className="list-group-item border-0 border-bottom rounded">
              <i className="fa fa-calendar me-3"></i>
              Calendar
            </li>
            <li className="list-group-item border-0 border-bottom rounded">
              <i className="fa fa-users me-3"></i>
              User
            </li>
            <li className="list-group-item border-0 rounded">
              <i className="fa fa-money-bill me-3"></i>
              Sales
            </li>
          </ul>
        </div>
      </nav>

      <div style={{ marginLeft: '250px', paddingTop: '56px' }}>
        <div className="container">
          <h1>Main Content</h1>
          <p>This is the main content area.</p>
        </div>
      </div>
    </>
  );
}
