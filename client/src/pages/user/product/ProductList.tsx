import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { Product } from '../../../interfaces/ProductsInterface';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>('http://localhost:8080/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div className="container my-4">
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <Card>
              <Card.Img variant="top" src={product.image} />
              <Card.Body>
                <Card.Title>{product.product_name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>Price: ${product.unit_price}</Card.Text>
                <Link to={`/product/${product.id}`}>
                  <Button variant="primary">View Details</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
