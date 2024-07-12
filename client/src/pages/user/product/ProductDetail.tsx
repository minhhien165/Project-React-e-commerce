import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { Product } from '../../../interfaces/ProductsInterface';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get<Product>(`http://localhost:8080/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container my-4">
      <Card>
        <Card.Img variant="top" src={product.image} />
        <Card.Body>
          <Card.Title>{product.product_name}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <Card.Text>Price: ${product.unit_price}</Card.Text>
          <Card.Text>Stock: {product.stock_quantity}</Card.Text>
          <Button variant="primary">Add to Cart</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductDetail;
