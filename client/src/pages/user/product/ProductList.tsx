import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Button, Form } from 'react-bootstrap';
import { Product } from '../../../interfaces/ProductsInterface';
import './ProductList.css';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortType, setSortType] = useState<string>(''); // 'price_asc', 'price_desc', 'name_asc', 'name_desc'

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [products, selectedCategory, searchTerm, sortType]);

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

  const applyFilters = () => {
    let filtered = products;

    // Lọc theo danh mục
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Tìm kiếm
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(product =>
        product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sắp xếp
    switch (sortType) {
      case 'price_asc':
        filtered.sort((a, b) => a.unit_price - b.unit_price);
        break;
      case 'price_desc':
        filtered.sort((a, b) => b.unit_price - a.unit_price);
        break;
      case 'name_asc':
        filtered.sort((a, b) => a.product_name.localeCompare(b.product_name));
        break;
      case 'name_desc':
        filtered.sort((a, b) => b.product_name.localeCompare(a.product_name));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortType(e.target.value);
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSearchTerm('');
    setSortType('');
  };

  return (
    <div className="container my-4">
      {/* Bảng điều khiển */}
      <div className="mb-4">
        <div className="d-flex align-items-center">
          <Form.Control
            type="text"
            placeholder="Search by product name"
            value={searchTerm}
            onChange={handleSearchChange}
            className="mr-3"
          />
          <Form.Control as="select" value={sortType} onChange={handleSortChange}>
            <option value="">Sort by...</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="name_asc">Name: A to Z</option>
            <option value="name_desc">Name: Z to A</option>
          </Form.Control>
          <Button variant="secondary" className="ml-3" onClick={clearFilters}>
            Clear Filters
          </Button>
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
