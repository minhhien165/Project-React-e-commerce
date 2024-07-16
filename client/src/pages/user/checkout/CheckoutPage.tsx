// src/pages/CheckoutPage.tsx
import React, { useState, useEffect } from 'react';
import { Button, Form, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Order } from '../../../interfaces/OderInterface'; 
import { CartItem } from '../../../interfaces/CartItem';

const CheckoutPage: React.FC = () => {
  const [formData, setFormData] = useState({
    receive_name: '',
    receive_address: '',
    receive_phone: '',
    note: '',
  });

  const [cart, setCart] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get<CartItem[]>('http://localhost:8080/cart');
      setCart(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy giỏ hàng:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newOrder: Order = {
      id: Date.now(), // Generating ID based on current timestamp for simplicity
      serial_number: `ORD-${Date.now()}`,
      user_id: 1, // Assuming a fixed user ID for this example
      order_at: new Date().toISOString(),
      total_price: getTotalPrice(),
      status: 1, // Assuming status 1 for new order
      note: formData.note,
      order_details: cart.map(item => ({
        id: Date.now(), // Generating ID based on current timestamp for simplicity
        product_id: item.id,
        quantity: item.order_quantity,
        price: item.unit_price,
      })),
      receive_name: formData.receive_name,
      receive_address: formData.receive_address,
      receive_phone: formData.receive_phone,
      created_at: new Date().toLocaleDateString(),
      updated_at: new Date().toLocaleDateString(),
    };

    try {
      const response = await axios.post('http://localhost:8080/orders', newOrder);
      console.log('Order created:', response.data);
      navigate('/checkout-success');
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.unit_price * item.order_quantity), 0);
  };

  return (
    <div className="container mt-4">
      <h2>Thanh toán</h2>
      <ListGroup>
        {cart.map((item, index) => (
          <ListGroup.Item key={item.id} className="d-flex align-items-center justify-content-between">
            <div>
              <h5>ID sản phẩm: {item.id}</h5>
              <h5>Tên sản phẩm: {item.name}</h5>
              <p>Mã đơn hàng: ORD-{item.id}</p>
              <p>ID người dùng: 1</p>
              <p>Trạng thái: 1 (Đơn hàng mới)</p>
              <p>Đơn giá: ${item.unit_price}</p>
              <p>Số lượng: {item.order_quantity}</p>
              <p>Ngày: {new Date().toLocaleDateString()}</p>
              <p>Ghi chú: {formData.note}</p>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formReceiveName">
          <Form.Label>Họ và tên người nhận</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập họ và tên người nhận"
            name="receive_name"
            value={formData.receive_name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formReceiveAddress">
          <Form.Label>Địa chỉ nhận hàng</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập địa chỉ nhận hàng"
            name="receive_address"
            value={formData.receive_address}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formReceivePhone">
          <Form.Label>Số điện thoại liên hệ</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập số điện thoại"
            name="receive_phone"
            value={formData.receive_phone}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formNote">
          <Form.Label>Ghi chú</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Thêm ghi chú nếu cần"
            name="note"
            value={formData.note}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Xác nhận đơn hàng
        </Button>
      </Form>
    </div>
  );
};

export default CheckoutPage;
