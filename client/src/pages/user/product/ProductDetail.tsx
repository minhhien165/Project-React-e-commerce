import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Button, Alert } from 'react-bootstrap';
import { Product } from '../../../interfaces/ProductsInterface';
import { useAuth } from '../../../context/auth-context';
import { CartItem } from '../../../interfaces/CartItem';
import './ProductDetail.css'; // Import the CSS file

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  useEffect(() => {
    fetchProductDetails();
    fetchCartItems();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get<Product>(`http://localhost:8080/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy chi tiết sản phẩm:', error);
    }
  };

  const fetchCartItems = async () => {
    try {
      const response = await axios.get<CartItem[]>('http://localhost:8080/cart');
      setCart(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy giỏ hàng:', error);
    }
  };

  const addToCart = async () => {
    if (!user) {
      setShowLoginAlert(true);
      return;
    }

    if (product) {
      try {
        const updatedCart = [...cart];
        const existingItem = updatedCart.find(item => item.product_id === product.id);

        if (existingItem) {
          existingItem.order_quantity += 1;
          await axios.put(`http://localhost:8080/cart/${existingItem.id}`, existingItem);
        } else {
          const cartItem: CartItem = {
            id: Math.floor(Math.random() * 1000),
            product_id: product.id,
            name: product.product_name,
            unit_price: product.unit_price,
            order_quantity: 1,
          };
          updatedCart.push(cartItem);
          await axios.post('http://localhost:8080/cart', cartItem);
        }

        setCart(updatedCart);
        setShowSuccessAlert(true);
      } catch (error) {
        console.error('Lỗi khi thêm vào giỏ hàng:', error);
      }
    }
  };

  if (!product) {
    return <div>Đang tải...</div>;
  }

  return (
    <div className="container my-4">
      {showLoginAlert && (
        <Alert variant="danger" onClose={() => setShowLoginAlert(false)} dismissible>
          Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng. <a href="/login">Đăng nhập</a>
        </Alert>
      )}
      {showSuccessAlert && (
        <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
          Sản phẩm đã được thêm vào giỏ hàng thành công!
        </Alert>
      )}
      <div className="row">
        <div className="col-md-6">
          <img src={product.image} alt={product.product_name} className="product-image" />
        </div>
        <div className="col-md-6 d-flex flex-column justify-content-between">
          <div>
            <h3>{product.product_name}</h3>
            <p className="product-description">{product.description}</p>
            <p>Giá: ${product.unit_price}</p>
            <p>Kho: {product.stock_quantity}</p>
          </div>
          <Button variant="primary" onClick={addToCart}>
            Thêm vào giỏ hàng
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
