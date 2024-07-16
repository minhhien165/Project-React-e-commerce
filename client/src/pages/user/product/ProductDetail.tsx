import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Button, Alert, Row, Col, Image } from 'react-bootstrap';
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
  const [comments, setComments] = useState<string[]>([]); // State for comments
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]); // State for related products
  const [ratings, setRatings] = useState<number[]>([]); // State for ratings

  useEffect(() => {
    fetchProductDetails();
    fetchCartItems();
    fetchComments();
    fetchRelatedProducts();
    fetchRatings();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get<Product>(`http://localhost:8080/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const fetchCartItems = async () => {
    try {
      const response = await axios.get<CartItem[]>('http://localhost:8080/cart');
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const fetchComments = async () => {
    try {
      // Replace with actual API endpoint to fetch comments for the product
      const response = await axios.get<string[]>(`http://localhost:8080/products/${id}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching product comments:', error);
    }
  };

  const fetchRelatedProducts = async () => {
    try {
      // Replace with actual API endpoint to fetch related products
      const response = await axios.get<Product[]>(`http://localhost:8080/products/${id}/related`);
      setRelatedProducts(response.data);
    } catch (error) {
      console.error('Error fetching related products:', error);
    }
  };

  const fetchRatings = async () => {
    try {
      // Replace with actual API endpoint to fetch ratings or average rating
      const response = await axios.get<number[]>(`http://localhost:8080/products/${id}/ratings`);
      setRatings(response.data);
    } catch (error) {
      console.error('Error fetching product ratings:', error);
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
        console.error('Error adding to cart:', error);
      }
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container my-4">
      {showLoginAlert && (
        <Alert variant="danger" onClose={() => setShowLoginAlert(false)} dismissible>
          Please log in to add the product to cart. <a href="/login">Log In</a>
        </Alert>
      )}
      {showSuccessAlert && (
        <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
          Product added to cart successfully!
        </Alert>
      )}

      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.product_name} fluid className="product-image" />
        </Col>
        <Col md={6}>
          <div className="product-details">
            <h3>{product.product_name}</h3>
            <p className="product-description">{product.description}</p>
            <p>Price: ${product.unit_price}</p>
            <p>Stock: {product.stock_quantity}</p>
            <Button variant="primary" onClick={addToCart}>
              Add to Cart
            </Button>
          </div>
        </Col>
      </Row>

      {/* Comments Section */}
      <div className="mt-4">
        <h4>Comments</h4>
        {comments.length === 0 ? (
          <p>No comments for this product yet.</p>
        ) : (
          <ul>
            {comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Related Products Section */}
      <div className="mt-4">
        <h4>Related Products</h4>
        <Row>
          {relatedProducts.map(relatedProduct => (
            <Col key={relatedProduct.id} md={3} className="mb-3">
              <Card>
                <Card.Img variant="top" src={relatedProduct.image} />
                <Card.Body>
                  <Card.Title>{relatedProduct.product_name}</Card.Title>
                  <Card.Text>Price: ${relatedProduct.unit_price}</Card.Text>
                  <Button variant="primary" onClick={() => navigate(`/product/${relatedProduct.id}`)}>
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Ratings Section */}
      <div className="mt-4">
        <h4>Ratings</h4>
        {ratings.length === 0 ? (
          <p>No ratings for this product yet.</p>
        ) : (
          <p>Average Rating: {calculateAverageRating(ratings)}</p>
        )}
      </div>
    </div>
  );
};

// Function to calculate average rating
const calculateAverageRating = (ratings: number[]): number => {
  const total = ratings.reduce((acc, rating) => acc + rating, 0);
  return total / ratings.length;
};

export default ProductDetail;
