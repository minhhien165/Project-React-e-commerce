// Client/src/layout/UserLayout.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const UserLayout: React.FC = ({ children }) => {
  return (
    <div>
      <header>
        <h1>Our Website</h1>
        <nav>
          <ul>
            <li><Link to="/">Trang chủ</Link></li>
            <li><Link to="/products">Sản phẩm</Link></li>
            {/* Add more links as needed */}
          </ul>
        </nav>
      </header>
      <main>
        {children}
      </main>
      <footer>
        {/* Footer content */}
      </footer>
    </div>
  );
}

export default UserLayout;
