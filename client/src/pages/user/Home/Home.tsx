import React from 'react';
import { Link } from 'react-router-dom';
import '../../login/LoginPage'

export default function Home() {
  return (
    <div>
      <header>
        <div className="p-3 text-center bg-white border-bottom">
          <div className="container">
            <div className="row gy-3">
              <div className="col-lg-2 col-sm-4 col-4">
                <a href="/" target="_blank" className="float-start">
                 <p className='h-35px'>HIENSHOP</p>
                </a>
              </div>
              <div className="order-lg-last col-lg-5 col-sm-8 col-8">
                <div className="d-flex float-end">                    
                  <a href="client/src/pages/login/LoginPage.tsx" className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center" target="_blank" rel="noopener noreferrer">
                    <i className="fas fa-user-alt m-1 me-md-2"></i>
                    <p className="d-none d-md-block mb-0">Sign in</p>
                  </a>
                  <a href="#" className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center" target="_blank" rel="noopener noreferrer">
                    <i className="fas fa-heart m-1 me-md-2"></i>
                    <p className="d-none d-md-block mb-0">Wishlist</p>
                  </a>
                  <a href="#" className="border rounded py-1 px-3 nav-link d-flex align-items-center" target="_blank" rel="noopener noreferrer">
                    <i className="fas fa-shopping-cart m-1 me-md-2"></i>
                    <p className="d-none d-md-block mb-0">My cart</p>
                  </a>
                </div>
              </div>
              <div className="col-lg-5 col-md-12 col-12">
                <div className="input-group float-center">
                  <div className="form-outline">
                    <input type="search" id="form1" className="form-control" />
                    <label className="form-label" htmlFor="form1">Search</label>
                  </div>
                  <button type="button" className="btn btn-primary shadow-0">
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
          <div className="container justify-content-center justify-content-md-between">
            <button className="navbar-toggler border py-2 text-dark" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarLeftAlignExample" aria-controls="navbarLeftAlignExample" aria-expanded="false" aria-label="Toggle navigation">
              <i className="fas fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarLeftAlignExample">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link text-dark" aria-current="page" href="#">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-dark" href="#">Categories</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-dark" href="#">Hot offers</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-dark" href="#">Gift boxes</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-dark" href="#">Projects</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-dark" href="#">Menu item</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-dark" href="#">Menu name</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle text-dark" href="#" id="navbarDropdown" role="button" data-mdb-toggle="dropdown" aria-expanded="false">
                    Others
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                      <a className="dropdown-item" href="#">Action</a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">Another action</a>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <a className="dropdown-item" href="#">Something else here</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="bg-primary text-white py-5">
          <div className="container py-5">
            <h1>
              Best products & <br />
              brands in our store
            </h1>
            <p>
              Trendy Products, Factory Prices, Excellent Service
            </p>
            <button type="button" className="btn btn-outline-light">
              Learn more
            </button>
            <button type="button" className="btn btn-light shadow-0 text-primary pt-2 border border-white">
              <span className="pt-1">Purchase now</span>
            </button>
          </div>
        </div>
      </header>
      <section>
        <div className="container my-5">
          <header className="mb-4">
            <h3>New products</h3>
          </header>
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6 d-flex">
              <div className="card w-100 my-2 shadow-2-strong">
                <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/1.webp" className="card-img-top" style={{ aspectRatio: "1 / 1" }} alt="GoPro HERO6" />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">GoPro HERO6 4K Action Camera - Black</h5>
                  <p className="card-text">$790.50</p>
                  <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                    <a href="#!" className="btn btn-primary shadow-0 me-1">Add to cart</a>
                    <a href="#!" className="btn btn-light border px-2 pt-2 icon-hover"><i className="fas fa-heart fa-lg text-secondary px-1"></i></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 d-flex">
              <div className="card w-100 my-2 shadow-2-strong">
                <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/2.webp" className="card-img-top" style={{ aspectRatio: "1 / 1" }} alt="Canon camera" />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">Canon camera 20x zoom, Black color EOS 2000</h5>
                  <p className="card-text">$320.00</p>
                  <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                    <a href="#!" className="btn btn-primary shadow-0 me-1">Add to cart</a>
                    <a href="#!" className="btn btn-light border px-2 pt-2 icon-hover"><i className="fas fa-heart fa-lg text-secondary px-1"></i></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 d-flex">
              <div className="card w-100 my-2 shadow-2-strong">
                <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/3.webp" className="card-img-top" style={{ aspectRatio: "1 / 1" }} alt="Xiaomi Redmi" />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">Xiaomi Redmi 8 Original Global Version 4GB</h5>
                  <p className="card-text">$120.00</p>
                  <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                    <a href="#!" className="btn btn-primary shadow-0 me-1">Add to cart</a>
                    <a href="#!" className="btn btn-light border px-2 pt-2 icon-hover"><i className="fas fa-heart fa-lg text-secondary px-1"></i></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 d-flex">
              <div className="card w-100 my-2 shadow-2-strong">
                <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/4.webp" className="card-img-top" style={{ aspectRatio: "1 / 1" }} alt="Apple iPhone X" />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">Apple iPhone X 128GB, Black</h5>
                  <p className="card-text">$890.00</p>
                  <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                    <a href="#!" className="btn btn-primary shadow-0 me-1">Add to cart</a>
                    <a href="#!" className="btn btn-light border px-2 pt-2 icon-hover"><i className="fas fa-heart fa-lg text-secondary px-1"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
