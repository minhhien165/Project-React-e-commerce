import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Spinner } from 'react-bootstrap';
import { Order, OrderDetail } from '../../../interfaces/OderInterface';

const OrderManagementPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updatedStatus, setUpdatedStatus] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get<Order[]>('http://localhost:8080/orders');
      setOrders(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setIsLoading(false);
    }
  };

  const handleDetail = (order: Order) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  const handleUpdate = (order: Order) => {
    setSelectedOrder(order);
    setUpdatedStatus(order.status);
    setShowUpdateModal(true);
  };

  const handleUpdateStatus = async () => {
    if (selectedOrder) {
      try {
        const updatedOrder = { ...selectedOrder, status: updatedStatus, updated_at: new Date().toLocaleDateString() };
        await axios.put(`http://localhost:8080/orders/${selectedOrder.id}`, updatedOrder);
        setShowUpdateModal(false);
        fetchOrders();
      } catch (error) {
        console.error('Error updating order status:', error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>Order Management</h2>
      {isLoading ? (
        <Spinner animation="border" />
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Order Number</th>
              <th>User ID</th>
              <th>Status</th>
              <th>Total Price</th>
              <th>Date</th>
              <th>Note</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.order_details?.map(detail => detail.product_id).join(', ')}</td>
                <td>{order.serial_number}</td>
                <td>{order.user_id}</td>
                <td>{order.status}</td>
                <td>${order.total_price}</td>
                <td>{order.order_at}</td>
                <td>{order.note}</td>
                <td>
                  <Button variant="info" onClick={() => handleDetail(order)}>Detail</Button>{' '}
                  <Button variant="warning" onClick={() => handleUpdate(order)}>Update</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Detail Modal */}
      <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Order Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <div>
              <p>ID: {selectedOrder.id}</p>
              <p>Order Number: {selectedOrder.serial_number}</p>
              <p>User ID: {selectedOrder.user_id}</p>
              <p>Status: {selectedOrder.status}</p>
              <p>Total Price: ${selectedOrder.total_price}</p>
              <p>Date: {selectedOrder.order_at}</p>
              <p>Note: {selectedOrder.note}</p>
              <h5>Order Details:</h5>
              <ul>
                {selectedOrder.order_details?.map((detail: OrderDetail, index: number) => (
                  <li key={index}>
                    Product ID: {detail.product_id}, Quantity: {detail.quantity}, Price: ${detail.price}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Update Modal */}
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Order Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control as="select" value={updatedStatus} onChange={(e) => setUpdatedStatus(Number(e.target.value))}>
              <option value={1}>1: New Order</option>
              <option value={2}>2: Verified</option>
              <option value={3}>3: Shipping</option>
              <option value={4}>4: Delivered</option>
              <option value={5}>5: Paid</option>
              <option value={6}>6: Completed</option>
              <option value={7}>7: Rejected</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleUpdateStatus}>Update</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OrderManagementPage;
