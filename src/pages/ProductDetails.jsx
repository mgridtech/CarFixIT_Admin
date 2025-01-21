import React from "react";
import PageHeader from "../layout/PageHeader";

const ProductDetails = () => {
  const productData = {
    skuid: "12345",
    name: "Example Product",
    quantity: 50,
    videoUrl: "https://example.com/video",
    status: "Active",
    price: "199.99",
    category: "Oils",
    brand: "Brand A",
    properties: [
      { description: "Weight", value: "1kg" },
      { description: "Material", value: "Synthetic" },
    ],
    images: [
      "https://via.placeholder.com/150", // Example image URL
    ],
    suitableCars: ["Car Model A", "Car Model B"],
  };

  return (
    <>
      <PageHeader title="Product Details" />
      <div className="bg-widget flex items-center justify-center w-full py-10 px-4 lg:p-[60px]">
        <div className="w-full max-w-[960px]">
          <div className="mb-5">
            <h2 className="text-xl font-bold">Product Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
              <p>
                <strong>SKU ID:</strong> {productData.skuid}
              </p>
              <p>
                <strong>Name:</strong> {productData.name}
              </p>
              <p>
                <strong>Quantity:</strong> {productData.quantity}
              </p>
              <p>
                <strong>Video URL:</strong>{" "}
                <a
                  href={productData.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary"
                >
                  Watch Video
                </a>
              </p>
              <p>
                <strong>Status:</strong> {productData.status}
              </p>
              <p>
                <strong>Price:</strong> {productData.price} USD
              </p>
              <p>
                <strong>Category:</strong> {productData.category}
              </p>
              <p>
                <strong>Brand:</strong> {productData.brand}
              </p>
            </div>
          </div>

          <div className="mb-5">
            <h2 className="text-xl font-bold">Properties</h2>
            <ul className="list-disc ml-5 mt-3">
              {productData.properties.map((property, index) => (
                <li key={index}>
                  <strong>{property.description}:</strong> {property.value}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-5">
            <h2 className="text-xl font-bold">Product Images</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
              {productData.images.map((image, index) => (
                <img
                key={index}
                src={image}
                alt={`Product ${index + 1}`}
                className="w-full h-40 object-cover"
              />
              
              ))}
            </div>
          </div>

          <div className="mb-5">
            <h2 className="text-xl font-bold">Suitable Cars</h2>
            <ul className="list-disc ml-5 mt-3">
              {productData.suitableCars.map((car, index) => (
                <li key={index}>{car}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
