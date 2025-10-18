import React, { useState } from "react";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCreateProductMutation } from "../../slices/productsApiSlice";
import Message from "../../components/Message";
import { toast } from "react-toastify";

const ProductAddScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();
  const [createProduct, { isLoading, error }] = useCreateProductMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
  
    if (!image) return toast.error("Product Image is required");
    if (name.trim() === "") return toast.error("Product Name is required");
    if (category.trim() === "") return toast.error("Product Category is required");
    if (description.trim() === "") return toast.error("Product Description is required");
    if (brand.trim() === "") return toast.error("Product Brand is required");
    if (parseInt(price) <= 0) return toast.error("Product Price must be positive number");
    if (parseInt(countInStock) <= 0) return toast.error("Product count in stock must be positive number");
  
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      formData.append('brand', brand);
      formData.append('category', category);
      formData.append('countInStock', countInStock);
      formData.append('description', description);
      formData.append('image', image);
  
      // DEBUG: Vérifiez le contenu de FormData
      console.log('FormData content:');
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
  
      const result = await createProduct(formData).unwrap();
      console.log('Success:', result);
      navigate('/admin/productlist');
    } catch (err) {
      console.error('Error details:', err);
      toast.error(err?.data?.message || "Failed to create product");
    }
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-md-center">
        <Col xs={12} md={8} lg={6}>
          <h2 className="text-center mb-4">Add New Product</h2>
          {error && (
            <Message variant="danger">
              {error?.data?.message || error.error}
            </Message>
          )}
          <Form
            onSubmit={submitHandler}
            encType="multipart/form-data"
            className="p-4 border rounded shadow-sm bg-light"
          >
            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="price" className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="brand" className="mb-3">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="category" className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="countInStock" className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter stock quantity"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="description" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="image" className="mb-4">
              <Form.Label>Product Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                required
              />
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              className="w-100 py-2 fw-bold"
              disabled={isLoading}
            >
              {isLoading ? (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                "Create Product"
              )}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductAddScreen;