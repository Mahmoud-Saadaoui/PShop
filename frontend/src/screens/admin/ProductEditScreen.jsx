import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Form,
  Button,
  Row,
  Col,
  Card,
  Image,
  InputGroup,
} from "react-bootstrap";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUpdateProductImageMutation,
} from "../../slices/productsApiSlice";

const ProductEditScreen = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  // ✅ Local states
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  // ✅ API hooks
  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const [updateProductImage, { isLoading: loadingImage }] =
    useUpdateProductImageMutation();

  // ✅ Prefill fields when product fetched
  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image?.secureUrl || "");
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  // ✅ Update text fields
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        price,
        brand,
        category,
        description,
        countInStock,
      }).unwrap();
      toast.success("✅ Product updated successfully");
      refetch();
      navigate("/admin/productlist");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  // ✅ Update image
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await updateProductImage({ productId, formData }).unwrap();
      toast.success(res.message || "Image updated");
      setImage(res.updatedProduct.image.secureUrl);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>

      <FormContainer>
        <Card className="shadow p-4 border-0 rounded-4">
          <div className="text-center mb-4">
            {image ? (
              <Image
                src={image}
                alt="product"
                fluid
                rounded
                className="border shadow-sm"
                style={{
                  maxHeight: "250px",
                  objectFit: "contain",
                  backgroundColor: "#f8f9fa",
                }}
              />
            ) : (
              <div
                className="d-flex align-items-center justify-content-center border rounded bg-light"
                style={{
                  height: "200px",
                  color: "#6c757d",
                  fontSize: "1rem",
                }}
              >
                No image uploaded yet
              </div>
            )}
          </div>

          <Card.Title
            as="h2"
            className="mb-4 text-center fw-semibold text-primary"
          >
            Edit Product
          </Card.Title>

          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error?.data?.message}</Message>
          ) : (
            <Form onSubmit={submitHandler}>
              <Row className="g-3">
                <Col xs={12}>
                  <Form.Group controlId="image">
                    <Form.Label className="fw-semibold">
                      Product Image
                    </Form.Label>
                    <Form.Control
                      type="file"
                      onChange={uploadFileHandler}
                      accept="image/*"
                      className="py-2"
                    />
                    {loadingImage && <Loader />}
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group controlId="name">
                    <Form.Label className="fw-semibold">Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group controlId="price">
                    <Form.Label className="fw-semibold">Price ($)</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group controlId="brand">
                    <Form.Label className="fw-semibold">Brand</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter brand"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group controlId="category">
                    <Form.Label className="fw-semibold">Category</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group controlId="countInStock">
                    <Form.Label className="fw-semibold">Stock</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter stock count"
                      value={countInStock}
                      onChange={(e) => setCountInStock(e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col xs={12}>
                  <Form.Group controlId="description">
                    <Form.Label className="fw-semibold">Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter product description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col xs={12} className="text-center mt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    className="px-5 py-2 fw-semibold shadow-sm"
                    disabled={loadingUpdate}
                  >
                    {loadingUpdate ? "Updating..." : "Update Product"}
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Card>
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;