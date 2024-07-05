import React from 'react';

const HomePage: React.FC = () => {
  return (
    
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
  );
}

export default HomePage;
