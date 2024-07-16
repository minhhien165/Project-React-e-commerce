import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Product } from '../../../interfaces/ProductsInterface';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]); // Danh sách các danh mục
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // Danh mục được chọn

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>('http://localhost:8080/products');
        const sortedProducts = response.data.sort((a, b) => a.category.localeCompare(b.category));
        setProducts(sortedProducts);

        // Lấy danh sách các danh mục từ dữ liệu sản phẩm
        const uniqueCategories = Array.from(new Set(response.data.map(product => product.category)));
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const addToFavorites = (product: Product) => {
    console.log(`Adding ${product.product_name} to favorites`);
    // Thêm logic để thêm sản phẩm vào danh sách yêu thích
  };

  const filterProductsByCategory = (category: string | null) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const getCategoryProducts = (category: string) => {
    return products.filter(product => product.category === category);
  };

  const uniqueCategories = ['All', ...categories]; // Thêm 'All' vào danh sách danh mục

  return (
    <Container className="my-5">
      <header className="mb-4">
        <h3>New products</h3>
      </header>

      {/* Bảng lọc sản phẩm */}
      <div className="mb-4">
        <h5>Filter by Category:</h5>
        <div className="btn-group">
          {uniqueCategories.map(category => (
            <button
              key={category}
              className={`btn btn-outline-primary ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => filterProductsByCategory(category === 'All' ? null : category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {selectedCategory !== null && (
        <h4>Category: {selectedCategory === 'All' ? 'All Products' : selectedCategory}</h4>
      )}

      <Row>
        {selectedCategory === null
          ? products.map(product => (
              <Col key={product.id} lg={3} md={6} sm={6} className="d-flex mb-4">
                <Card className="w-100 shadow-2-strong">
                  <Card.Img variant="top" src={product.image} style={{ aspectRatio: '1 / 1' }} alt={product.product_name} />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{product.product_name}</Card.Title>
                    <Card.Text>${product.unit_price}</Card.Text>
                    <div className="mt-auto">
                      <Link to={`/product/${product.id}`}>
                        <Button variant="primary">View Details</Button>
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          : getCategoryProducts(selectedCategory).map(product => (
              <Col key={product.id} lg={3} md={6} sm={6} className="d-flex mb-4">
                <Card className="w-100 shadow-2-strong">
                  <Card.Img variant="top" src={product.image} style={{ aspectRatio: '1 / 1' }} alt={product.product_name} />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{product.product_name}</Card.Title>
                    <Card.Text>${product.unit_price}</Card.Text>
                    <div className="mt-auto">
                    <Link to={`/product/${product.id}`}>
                      <Button variant="primary">View Details</Button>
                    </Link>
                      <Button variant="light" onClick={() => addToFavorites(product)}>
                        <i className="fas fa-heart fa-lg text-secondary"></i>
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
      </Row>
    </Container>
  );
};

export default HomePage;
