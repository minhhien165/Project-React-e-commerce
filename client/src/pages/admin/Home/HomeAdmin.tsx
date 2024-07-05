import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import HeaderAdmin from '../header/HeaderAdmin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faChartArea, faLock, faUsers, faQuestionCircle, faEnvelope, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const HomeAdmin = () => {
  const navigate = useNavigate();

  const onLogout = () => {
    // Xóa thông tin đăng nhập (ví dụ: xóa token khỏi localStorage)
    localStorage.removeItem('userToken');
    // Điều hướng về trang chủ
    navigate('/');
  };

  return (
    <>
      <HeaderAdmin />
      <div className="d-flex" style={{ marginTop: '60px' }}>
        <nav className="d-lg-block bg-white sidebar" style={{ width: '250px', height: 'calc(100vh - 56px)', position: 'fixed', zIndex: 1000 }}>
          <ul className="list-group list-group-flush mx-3 mt-4">
            <li className="list-group-item border-0 border-bottom rounded">
              <NavLink to="/admin/dashboard" className="nav-link">
                <FontAwesomeIcon icon={faTachometerAlt} className="me-3" />
                Dashboard
              </NavLink>
            </li>
            <li className="list-group-item border-0 border-bottom rounded">
              <NavLink to="/admin/products" className="nav-link">
                <FontAwesomeIcon icon={faChartArea} className="me-3" />
                Products
              </NavLink>
            </li>
            <li className="list-group-item border-0 border-bottom rounded">
              <NavLink to="/admin/orders" className="nav-link">
                <FontAwesomeIcon icon={faLock} className="me-3" />
                Orders
              </NavLink>
            </li>
            <li className="list-group-item border-0 border-bottom rounded">
              <NavLink to="/admin/customers" className="nav-link">
                <FontAwesomeIcon icon={faUsers} className="me-3" />
                Customers
              </NavLink>
            </li>
          </ul>
          <ul className="list-group list-group-flush mx-3 mt-4" style={{ position: 'absolute', bottom: '20px', width: '100%' }}>
            <li className="list-group-item border-0 rounded">
              <NavLink to="/admin/help" className="nav-link">
                <FontAwesomeIcon icon={faQuestionCircle} className="me-3" />
                Help
              </NavLink>
            </li>
            <li className="list-group-item border-0 rounded">
              <NavLink to="/admin/contact-us" className="nav-link">
                <FontAwesomeIcon icon={faEnvelope} className="me-3" />
                Contact Us
              </NavLink>
            </li>
            <li className="list-group-item border-0 rounded" onClick={onLogout}>
              <a className="nav-link" href="#">
                <FontAwesomeIcon icon={faSignOutAlt} className="me-3" />
                Logout
              </a>
            </li>
          </ul>
        </nav>

        <div className="ms-5 w-100 p-4">
          <Outlet /> {/* Render child routes here */}
        </div>
      </div>
    </>
  );
};

export default HomeAdmin;
