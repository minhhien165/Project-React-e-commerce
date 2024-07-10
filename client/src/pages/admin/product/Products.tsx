import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Product } from '../../../interfaces/ProductsInterface';
import { Button, Form, Table } from 'react-bootstrap';

interface FormProduct {
  id: number;
  product_name: string;
  description: string;
  unit_price: number;
  stock_quantity: number;
  image: string;
  category: string;
  created_at: string;
  updated_at: string;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentProduct, setCurrentProduct] = useState<FormProduct>({
    id: 0,
    product_name: '',
    description: '',
    unit_price: 0,
    stock_quantity: 0,
    image: '',
    category: '',
    created_at: '',
    updated_at: '',
  });
  const [isEdit, setIsEdit] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/products');
      if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        console.error('API response is not an array:', response.data);
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };

  const addProduct = async () => {
    try {
      const currentDate = new Date().toLocaleDateString();
      const response = await axios.post('http://localhost:8080/products', {
        ...currentProduct,
        created_at: currentDate,
        updated_at: currentDate,
      });
      setProducts([...products, response.data]);
      setShowForm(false);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const updateProduct = async (id: number) => {
    try {
      const currentDate = new Date().toLocaleDateString();
      const response = await axios.put(`http://localhost:8080/products/${id}`, {
        ...currentProduct,
        updated_at: currentDate,
      });
      setProducts(products.map(product => product.id === id ? response.data : product));
      setIsEdit(false);
      setShowForm(false);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/products/${id}`);
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit) {
      updateProduct(currentProduct.id);
    } else {
      addProduct();
    }
    setCurrentProduct({
      id: 0,
      product_name: '',
      description: '',
      unit_price: 0,
      stock_quantity: 0,
      image: '',
      category: '',
      created_at: '',
      updated_at: '',
    });
  };

  const handleAddClick = () => {
    setIsEdit(false);
    setShowForm(true);
    setCurrentProduct({
      id: 0,
      product_name: '',
      description: '',
      unit_price: 0,
      stock_quantity: 0,
      image: '',
      category: '',
      created_at: '',
      updated_at: '',
    });
  };

  const handleEditClick = (product: Product) => {
    setIsEdit(true);
    setShowForm(true);
    setCurrentProduct({
      id: product.id,
      product_name: product.product_name,
      description: product.description,
      unit_price: product.unit_price,
      stock_quantity: product.stock_quantity,
      image: product.image,
      category: product.category,
      created_at: product.created_at,
      updated_at: product.updated_at,
    });
  };

  return (
    <div className="container my-4">
      <h1 className="mb-4">Product Management</h1>
      <Button
        onClick={handleAddClick}
        variant="primary"
        className="mb-4"
      >
        Add Product
      </Button>

      {showForm && (
        <div className="mb-4 p-4 border rounded shadow-sm bg-light">
          <h2 className="mb-3">{isEdit ? 'Edit Product' : 'Add New Product'}</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="product_name"
                value={currentProduct.product_name}
                onChange={handleInputChange}
                placeholder="Enter product name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={currentProduct.description}
                onChange={handleInputChange}
                placeholder="Enter description"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Unit Price</Form.Label>
              <Form.Control
                type="number"
                name="unit_price"
                value={currentProduct.unit_price}
                onChange={handleInputChange}
                placeholder="Enter unit price"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Stock Quantity</Form.Label>
              <Form.Control
                type="number"
                name="stock_quantity"
                value={currentProduct.stock_quantity}
                onChange={handleInputChange}
                placeholder="Enter stock quantity"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={currentProduct.image}
                onChange={handleInputChange}
                placeholder="Enter image URL"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={currentProduct.category}
                onChange={handleInputChange}
                placeholder="Enter category"
              />
            </Form.Group>
            <Button type="submit" variant="success">
              {isEdit ? 'Update Product' : 'Add Product'}
            </Button>
          </Form>
        </div>
      )}

      <Table striped bordered hover responsive className="shadow-sm">
        <thead className="bg-light">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id} className={index % 2 === 0 ? 'bg-light' : 'bg-white'}>
              <td>{product.id}</td>
              <td>{product.product_name}</td>
              <td>{product.description}</td>
              <td>{product.unit_price}</td>
              <td>{product.stock_quantity}</td>
              <td>{product.category}</td>
              <td>{product.created_at}</td>
              <td>
                <Button
                  onClick={() => handleEditClick(product)}
                  variant="warning"
                  className="me-2"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => deleteProduct(product.id)}
                  variant="danger"
                  className="me-2"
                >
                  Delete
                </Button>
                <Button
                  onClick={() => alert('View product details')}
                  variant="info"
                >
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Products;
