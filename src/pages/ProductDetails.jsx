import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Services from "./Services/Services";
import PageHeader from "../layout/PageHeader";
import { Spin, Empty } from "antd";

const ProductDetails = () => {
  const { productId } = useParams(); // Get the productId from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const response = await Services.getInstance().getProductById(productId); // Fetch product details

        if (response.data) {
          setProduct(response.data); // Set the product data directly from response.data
        } else {
          setError("Product not found");
        }
      } catch (error) {
        setError("Failed to fetch product details");
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (loading) {
    return <Spin size="large" />; // Show a spinner while loading
  }

  if (error) {
    return <Empty description={error} />; // Show an error message if there's an error
  }

  if (!product) {
    return <Empty description="No product details available" />; // Show a message if no product data is found
  }

  return (
    <>
      <PageHeader title="Product Details" />
      <div className="bg-widget flex items-center justify-center w-full py-10 px-4 lg:p-[60px]">
        <div className="w-full max-w-[960px]">
          {/* Product Information Section */}
          <div className="mb-8 bg-widget p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Product Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <p>
                <strong>ID:</strong> {product.id}
              </p>
              <p>
                <strong>Name:</strong> {product.name}
              </p>
              <p>
                <strong>Quantity:</strong> {product.quantity}
              </p>
              <p>
                <strong>Original Price:</strong> {product.originalPrice} USD
              </p>
              <p>
                <strong>Price:</strong> {product.price} USD
              </p>
              <p>
                <strong>Status:</strong> {product.status}
              </p>
            </div>
          </div>

          {/* Properties Section */}
          <div className="mb-8 bg-widget p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Properties</h2>
            <ul className="list-disc ml-5">
              {product.properties.map((property, index) => (
                <li key={index} className="mb-2">
                  <strong>{property.description}:</strong> {property.value}
                </li>
              ))}
            </ul>
          </div>

          {/* Product Images Section */}
          <div className="mb-8 bg-widget p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Product Images</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image.image_data || "https://via.placeholder.com/150"} // Fallback for empty image_data
                    alt={`Product ${index + 1}`}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  {image.is_primary && (
                    <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      Primary
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Services Section */}
          {product.services && product.services.length > 0 && (
            <div className="mb-8 bg-widget p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Services</h2>
              <ul className="list-disc ml-5">
                {product.services.map((service, index) => (
                  <li key={index} className="mb-2">
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;