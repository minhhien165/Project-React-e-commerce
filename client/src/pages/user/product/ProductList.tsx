import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { Product } from '../../../interfaces/ProductsInterface';
import './ProductList.css'

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]); // Danh sách các danh mục
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // Danh mục được chọn

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>('http://localhost:8080/products');
      setProducts(response.data);

      // Lấy danh sách các danh mục từ dữ liệu sản phẩm
      const uniqueCategories = Array.from(new Set(response.data.map(product => product.category)));
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Lọc sản phẩm theo danh mục được chọn
  const filterProductsByCategory = (category: string | null) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  // Render danh sách sản phẩm với bộ lọc
  const filteredProducts = selectedCategory ? products.filter(product => product.category === selectedCategory) : products;

  return (
    <div className="container my-4">
      {/* Bảng lọc sản phẩm */}
      <div className="mb-4">
        <h5>Filter by Category:</h5>
        <div className="btn-group">
          <button
            className={`btn btn-outline-primary ${selectedCategory === null ? 'active' : ''}`}
            onClick={() => filterProductsByCategory(null)}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category}
              className={`btn btn-outline-primary ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => filterProductsByCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="row">
        {filteredProducts.map(product => (
          <div className="col-md-4 mb-4" key={product.id}>
            <Card>
              <Card.Img variant="top" src={product.image} style={{ height: '200px', objectFit: 'cover' }} />
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
