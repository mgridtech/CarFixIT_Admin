import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../layout/PageHeader";
import Spring from "../components/Spring";
import Services from "./Services/Services";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);
  const [productData, setProductData] = useState({});
  const [activeProductStatus, setActiveProductStatus] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categoryType, setCategoryType] = useState("");
  const [properties, setProperties] = useState([]);
  const [primaryImage, setPrimaryImage] = useState(null);
  const [editedServiceName, setEditedServiceName] = useState("");
  const [editingState, setEditingState] = useState({
    serviceIndex: null,
    serviceName: "",
    propertyIndex: null,
    propertyValue: "",
  });
  const [isEditingImages, setIsEditingImages] = useState(false);
  const [tempImages, setTempImages] = useState([]);
  const [tempPrimaryImage, setTempPrimaryImage] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const response = await Services.getInstance().getProductById(id);
        if (response.data) {
          setProduct(response.data);
          const fetchedData = {
            category: response.data.categoryInfo.categoryType,
            skuid: response.data.skuId || "",
            name: response.data.name,
            quantity: response.data.quantity || 0,
            videoUrl: response.data.video || "",
            status: response.data.status,
            price: response.data.price,
            brand: response.data.brandName || "",
            properties: response.data.properties || [],
            images: response.data.images.map((img) => img.image_data),
            services: response.data.services || [],
          };
          setProductData(fetchedData);
          setProperties(fetchedData.properties);
          setPrimaryImage(
            fetchedData.images.find((img) => img.is_primary) || null
          );
          setTempImages([...fetchedData.images]);
          setTempPrimaryImage(
            fetchedData.images.find((img) => img.is_primary) || null
          );
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
  }, [id]);

  useEffect(() => {
    const fetchBrandsByCategory = async () => {
      if (!productData.category || categoryType !== "ecommerce") {
        setBrands([]);
        return;
      }

      setLoading(true);
      try {
        const brandsResponse = await Services.getInstance().getProductBrands(
          productData.category
        );
        if (brandsResponse.error) throw new Error(brandsResponse.error);
        setBrands(brandsResponse.data || []);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching brands:", error);
        setBrands([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBrandsByCategory();
  }, [productData.category, categoryType]);

  useEffect(() => {
    const fetchActiveProductStatus = async () => {
      if (!productData.category) return;

      setLoading(true);
      try {
        const response = await Services.getInstance().getActiveProductStatus(
          productData.category
        );
        if (response.error) throw new Error(response.error);

        console.log("Active Product Status Data:", response.data);
        setActiveProductStatus(response.data || []);
      } catch (error) {
        console.error("Error fetching active product status:", error);
        setError(error.message);
        setActiveProductStatus([]);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveProductStatus();
  }, [productData.category]);

  useEffect(() => {
    if (product?.images?.length > 0) {
      // Map images to include both image_data and id
      setTempImages(product.images.map(img => ({
        image_data: img.image_data,
        id: img.id,
      })));
  
      // Find the primary image
      const primary = product.images.find(img => img.is_primary);
      setTempPrimaryImage(primary ? primary.image_data : null);
      
      console.log("Loaded Images:", product.images);
      console.log("Primary Image Set:", primary ? primary.image_data : "None");
    }
  }, [product]);
  
  const handleSetPrimary = (image) => {
    setTempPrimaryImage((prev) => (prev === image ? null : image));
    console.log("Primary Image Updated:", image);
  };
  
const handleImageRemove = async (index, imageId) => {
  try {
    console.log("Removing Image:", imageId);

    // Call API to delete image
    const response = await Services.getInstance().deleteProductImage(imageId);

    if (response.error) {
      console.error("Error deleting image:", response.error);
      return;
    }

    // Update state only if API call is successful
    setTempImages((prev) => {
      const updatedImages = prev.filter((_, i) => i !== index);
      console.log("Updated Image List After Deletion:", updatedImages);
      return updatedImages;
    });

    // If the deleted image was the primary image, reset primary image state
    if (tempImages[index] === tempPrimaryImage) {
      setTempPrimaryImage(null);
      console.log("Primary Image Removed");
    }

    console.log("Image deleted successfully");
  } catch (error) {
    console.error("Failed to remove image:", error);
  }
};

  
const handleImageUpload = (event) => {
  const files = event.target.files;
  if (files.length > 0) {
    const newImages = Array.from(files).map((file) => ({
      image_data: URL.createObjectURL(file),
      id: `temp-${Date.now()}`, // Generate a temporary ID for new images
    }));

    // Only allow one image to be uploaded
    if (tempImages.length + newImages.length <= 1) {
      setTempImages((prev) => {
        const updatedImages = [...prev, ...newImages];
        console.log("Updated Image List After Upload:", updatedImages);
        return updatedImages;
      });

      // Automatically set the uploaded image as primary
      if (newImages.length > 0) {
        setTempPrimaryImage(newImages[0].image_data);
        console.log("Primary Image Automatically Set:", newImages[0].image_data);
      }
    } else {
      alert("You can only upload one image.");
    }
  }
};                                                                                

  
const handleSaveImages = () => {
  setProductData((prev) => ({
    ...prev,
    images: tempImages.map((img) => ({
      image_data: img.image_data,
      id: img.id,
      is_primary: img.image_data === tempPrimaryImage, // Mark primary image
    })),
    primaryImage: tempPrimaryImage,
  }));

  console.log("Final Image List:", tempImages);
  console.log("Final Primary Image:", tempPrimaryImage);

  setIsEditingImages(false);
};  
  
  const handleAddService = () => {
    if (!editedServiceName.trim()) return;
    setProductData((prev) => ({
      ...prev,
      services: [...prev.services, editedServiceName.trim()],
    }));
    setEditedServiceName("");
  };

  const handleDeleteService = (service) => {
    setProductData((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s !== service),
    }));
  };

  const handleEditService = (index) => {
    setEditingState({
      ...editingState,
      serviceIndex: index,
      serviceName: productData.services[index],
    });
  };

  const saveEditedService = () => {
    if (!editingState.serviceName.trim()) return;
    const updatedServices = [...productData.services];
    updatedServices[editingState.serviceIndex] =
      editingState.serviceName.trim();
    setProductData({ ...productData, services: updatedServices });
    setEditingState({ ...editingState, serviceIndex: null, serviceName: "" });
  };

  const cancelEdit = () => {
    setEditingState({ ...editingState, serviceIndex: null, serviceName: "" });
  };

  const handleProductUpdate = () => {
    // Validate required fields
      // const requiredFields =
      //   productData.category === "ecommerce"
      //     ? ["name", "price", "brand", "skuid", "quantity", "status"]
      //     : ["name", "price", "status"];
    
      // const missingFields = requiredFields.filter((field) => !productData[field]);
    
      // if (missingFields.length > 0) {
      //   alert(`Please fill in all required fields: ${missingFields.join(", ")}`);
      //   return;
      // }
  
    // Prepare the updated product data
    const updatedProductData = {
      name: productData.name,
      price: productData.price,
      status: productData.status,
      videoUrl: productData.videoUrl || "", // Optional for ecommerce, required for service
    };
  
    // Add ecommerce-specific fields if category is "ecommerce"
    if (productData.category === "ecommerce") {
      updatedProductData.brand = productData.brand;
      updatedProductData.skuid = productData.skuid;
      updatedProductData.quantity = productData.quantity;
    }
  
    // Set the updated data in editingState
    setEditingState((prev) => ({
      ...prev,
      productData: updatedProductData,
    }));
  
    // Call saveEditedProduct to update the product
    saveEditedProduct();
  };
  
  const saveEditedProduct = async () => {
    try {
      console.log("Updating Product ID:", id); // id from useParams()
      console.log("Updated Product Data:", editingState.productData);
  
      // Call the API to update the product
      const response = await Services.getInstance().updateProduct(
        id, // Product ID from useParams()
        editingState.productData // Updated product data object
      );
  
      console.log("API Response:", response);
  
      if (response.error) {
        setError(response.error);
      } else {
        // Update the local state to reflect the changes
        setProductData((prevData) => ({
          ...prevData,
          ...editingState.productData,
        }));
  
        // Reset the editing state
        setEditingState({
          ...editingState,
          productData: {},
        });
  
        // Navigate back to the products management page
        navigate("/products-management");
      }
    } catch (error) {
      setError("Failed to update product");
      console.error("Error updating product:", error);
    }
  };

  const handleValueChange = (index, newValue) => {
    setProperties((prev) => {
      const updated = [...prev];
      updated[index].value = newValue;
      return updated;
    });
  };

  const handleEditProperty = (index, value) => {
    setEditingState({
      ...editingState,
      propertyIndex: index,
      propertyValue: value,
    });
  };

  const saveEditedProperty = async (index) => {
    try {
      const property = properties[index];
  
      console.log("Updating Property for Category:", productData.category);
      console.log("Updating Property ID:", property.id, "Value:", editingState.propertyValue);
  
      const response = await Services.getInstance().updateProductProperty(
        id, // productId from useParams()
        property.id, // propertyId
        editingState.propertyValue // Only updating value
      );
  
      console.log("API Response:", response);
  
      if (response.error) {
        setError(response.error);
      } else {
        // Update the local state to reflect the changes
        const updatedProperties = [...properties];
        updatedProperties[index].value = editingState.propertyValue;
        setProperties(updatedProperties);
  
        // Reset the editing state
        setEditingState({
          ...editingState,
          propertyIndex: null,
          propertyValue: "",
        });
      }
    } catch (error) {
      setError("Failed to update property");
      console.error("Error updating property:", error);
    }
  };
  
  // const saveEditedProduct = async () => {
  //   try {
  //     console.log("Updating Product ID:", id); // id from useParams()
  //     console.log("Updated Product Data:", editingState.productData);
  
  //     const response = await Services.getInstance().updateProduct(
  //       id, // Product ID from useParams()
  //       editingState.productData // Updated product data object
  //     );
  
  //     console.log("API Response:", response);
  
  //     if (response.error) {
  //       setError(response.error);
  //     } else {
  //       // Update the local state to reflect the changes
  //       setProductData((prevData) => ({
  //         ...prevData,
  //         ...editingState.productData,
  //       }));
  
  //       // Reset the editing state
  //       setEditingState({
  //         ...editingState,
  //         productData: {},
  //       });
  //     }
  //   } catch (error) {
  //     setError("Failed to update product");
  //     console.error("Error updating product:", error);
  //   }
  // };
  
  
    const cancelEditProperty = () => {
    setEditingState({
      ...editingState,
      propertyIndex: null,
      propertyValue: "",
    });
  };

  const renderServiceInput = () => (
    <div className="col-span-2 mt-5">
      <label htmlFor="serviceName" className="field-label">
        Add Service Name
      </label>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          id="serviceName"
          className="field-input w-full md:w-2/3"
          value={editedServiceName}
          onChange={(e) => setEditedServiceName(e.target.value)}
          placeholder="Enter Service Name"
        />
        <button
          type="button"
          className="btn btn--primary ml-4"
          onClick={handleAddService}
        >
          Add
        </button>
      </div>
      <div className="mt-5">
        <h4 className="font-semibold mb-3">Added Services:</h4>
        <ul className="space-y-3">
          {productData.services.map((service, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-100 rounded-md p-3 shadow-md"
            >
              {editingState.serviceIndex === index ? (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    className="field-input"
                    value={editingState.serviceName}
                    onChange={(e) =>
                      setEditingState({
                        ...editingState,
                        serviceName: e.target.value,
                      })
                    }
                  />
                  <button
                    type="button"
                    className="btn btn--primary text-xs"
                    onClick={saveEditedService}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn--secondary text-xs"
                    onClick={cancelEdit}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex justify-between items-center w-full">
                  <span>{service}</span>
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      className="text-blue-500 text-xs hover:text-blue-700"
                      onClick={() => handleEditService(index)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="text-red-500 text-xs hover:text-red-700"
                      onClick={() => handleDeleteService(service)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const renderPropertiesTable = () => (
    <div className="col-span-2 mt-5">
      <h3 className="text-lg font-semibold mb-3">Properties</h3>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Sr. No.</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Value</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {  properties.map((property, index) => (
            <tr key={index} className="text-center">
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{property.name}</td>
              <td className="border px-4 py-2">{property.description}</td>
              <td className="border px-4 py-2">
                {editingState.propertyIndex === index ? (
                  <input
                    type="text"
                    value={editingState.propertyValue}
                    onChange={(e) =>
                      setEditingState({
                        ...editingState,
                        propertyValue: e.target.value,
                      })
                    }
                    className="field-input w-full"
                  />
                ) : (
                  property.value || "N/A"
                )}
              </td>
              <td className="border px-4 py-2">
                {editingState.propertyIndex === index ? (
                  <div className="flex space-x-2 justify-center">
                    <button
                      type="button"
                      className="btn btn--primary text-xs"
                      onClick={() => saveEditedProperty(index)}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="btn btn--secondary text-xs"
                      onClick={cancelEditProperty}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <button
                      type="button"
                      className="btn btn--secondary text-xs"
                      onClick={() => handleEditProperty(index, property.value)}
                    >
                      Edit
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  console.log("product data here", product);
  return (
    <>
      <PageHeader title="Update Product" />
      <div className="bg-widget flex items-center justify-center w-full py-10 px-4 lg:p-[60px]">
        <Spring
          className="w-full max-w-[960px]"
          type="slideUp"
          duration={400}
          delay={300}
        >
          <form className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="col-span-2">
              <label htmlFor="category" className="field-label">
                Category<span className="text-red-500">*</span>
              </label>
              <input
                className="field-input"
                id="category"
                type="text"
                value={productData.category}
                readOnly
              />
            </div>

            {productData.category && (
              <>
                {productData.category === "ecommerce" && (
                  <div>
                    <label htmlFor="brand" className="field-label">
                      Brand<span className="text-red-500">*</span>
                    </label>
                    <select
                      className="field-input"
                      id="brand"
                      required
                      value={productData.brand || ""}
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          brand: e.target.value,
                        })
                      }
                    >
                      <option value="">{productData.brand}</option>
                      {brands.map((brand, index) => (
                        <option key={index} value={brand}>
                          {brand}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label htmlFor="name" className="field-label">
                    {productData.category === "Service" ? "Service" : "Product"}{" "}
                    Name
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="field-input"
                    required
                    id="name"
                    type="text"
                    placeholder="Name"
                    value={productData.name}
                    onChange={(e) =>
                      setProductData({ ...productData, name: e.target.value })
                    }
                  />
                </div>

                {productData.category === "ecommerce" && (
                  <>
                    <div>
                      <label htmlFor="skuid" className="field-label">
                        SKU ID<span className="text-red-500">*</span>
                      </label>
                      <input
                        className="field-input"
                        required
                        id="skuid"
                        type="text"
                        placeholder="SKU ID"
                        value={productData.skuid}
                        onChange={(e) =>
                          setProductData({
                            ...productData,
                            skuid: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <label htmlFor="quantity" className="field-label">
                        Quantity<span className="text-red-500">*</span>
                      </label>
                      <input
                        className="field-input"
                        required
                        id="quantity"
                        type="number"
                        placeholder="Quantity"
                        value={productData.quantity}
                        onChange={(e) =>
                          setProductData({
                            ...productData,
                            quantity: e.target.value,
                          })
                        }
                      />
                    </div>
                  </>
                )}

                <div>
                  <label htmlFor="videoUrl" className="field-label">
                    Video URL
                    {productData.categoryType === "service" && (
                      <span className="text-red-500">*</span>
                    )}
                  </label>
                  <input
                    className="field-input"
                    id="videoUrl"
                    type="url"
                    placeholder="Video URL"
                    value={productData.videoUrl || ""}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        videoUrl: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label htmlFor="status" className="field-label">
                    Status<span className="text-red-500">*</span>
                  </label>
                  <select
                    className="field-input"
                    id="status"
                    required
                    value={productData.status}
                    onChange={(e) =>
                      setProductData({ ...productData, status: e.target.value })
                    }
                  >
                    <option value="">{productData.status}</option>
                    {Array.isArray(activeProductStatus) &&
                      activeProductStatus
                        .filter((s) => s.id !== productData.status) // Prevent duplicate
                        .map((status) => (
                          <option key={status.id} value={status.id}>
                            {status.name}
                          </option>
                        ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="price" className="field-label">
                    Price<span className="text-red-500">*</span>
                  </label>
                  <input
                    className="field-input"
                    required
                    id="price"
                    type="number"
                    placeholder="Price"
                    value={productData.price}
                    onChange={(e) =>
                      setProductData({ ...productData, price: e.target.value })
                    }
                  />
                </div>

                <div className="col-span-2">
                <label className="field-label">
                  {productData.category === "Service" ? "Service" : "Product"} Images
                  {productData.category === "Service" && (
                    <span className="text-red-500">*</span>
                  )}
                </label>
                <div className="image-upload-wrapper relative w-full border-dashed border-2 border-primary rounded-lg p-4">
                  <div className="flex flex-wrap gap-4">
                    {/* Upload Button - Conditionally Rendered */}
                    {tempImages.length === 0 && (
                      <label className="cursor-pointer w-32 h-32 flex flex-col items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg border-2 border-dashed border-gray-300 text-gray-500 transition-colors">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 mb-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                          />
                        </svg>
                        <span className="text-sm font-medium">Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </label>
                    )}
              
                    {/* Display Images with Toggle and Delete */}
                    {tempImages.map((image, index) => (
                      <div
                        key={index}
                        className="relative w-32 h-32 group transition-transform transform hover:scale-105"
                      >
                        {/* Image */}
                        <img
                          src={image.image_data} // Use image.image_data for the src
                          alt={`Image ${index}`}
                          className="w-full h-full object-cover rounded-lg shadow-md"
                        />
                    
                        {/* Delete Icon */}
                        <button
                          type="button"
                          className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full p-1 opacity-100 transition-opacity"
                          onClick={() => handleImageRemove(index, image.id)} // Pass image.id here
                        >
                          ✕
                        </button>
                    
                        {/* Toggle Button for Primary Image */}
                        <div className="absolute bottom-2 left-2 right-2 flex justify-center">
                          <button
                            type="button"
                            className={`text-xs px-2 py-1 rounded-full ${
                              tempPrimaryImage === image.image_data
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-700"
                            }`}
                            onClick={() => handleSetPrimary(image.image_data)}
                          >
                            {tempPrimaryImage === image.image_data ? "Primary" : "Set as Primary"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

                {renderPropertiesTable()}

                {productData.category === "service" && renderServiceInput()}

                <div className="col-span-2 flex justify-center mt-5">
                  <button
                    type="button"
                    className="btn btn--primary"
                    onClick={handleProductUpdate}
                  >
                    Update{" "}
                    {productData.category === "Service" ? "Service" : "Product"}
                  </button>
                </div>
              </>
            )}
          </form>
        </Spring>
      </div>
    </>
  );
};

export default UpdateProduct;
