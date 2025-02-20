import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../layout/PageHeader";
import Spring from "../components/Spring";
import Services from "./Services/Services";

const AddProduct = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categoryType, setCategoryType] = useState("");
  const [categoryProperties, setCategoryProperties] = useState([]);
  const [activeProductStatus, setActiveProductStatus] = useState([]);
  const [productData, setProductData] = useState({
    category: "",
    skuid: "",
    name: "",
    quantity: "",
    videoUrl: "",
    status: "",
    price: "",
    brand: "",
    properties: [],
    images: [],
    // suitableCars: [],
    services: [],
  });

  console.log("222",categories);

  const [serviceName, setServiceName] = useState("");
  const [primaryImageIndex, setPrimaryImageIndex] = useState(null);

  // Fetch categories and brands on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [categoriesResponse, brandsResponse] = await Promise.all([
          Services.getInstance().getCategories(),
          // Services.getInstance().getBrands(),
        ]);

        if (categoriesResponse.error) throw new Error(categoriesResponse.error);
        // if (brandsResponse.error) throw new Error(brandsResponse.error);

        setCategories(categoriesResponse.data);
        // setBrands(brandsResponse.data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetch brands when category changes & categoryType is "ecommerce"
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

  // Fetch category properties when category changes
  useEffect(() => {
    const fetchCategoryProperties = async () => {
      if (!productData.category) return; // Skip if no category is selected

      setLoading(true);
      try {
        const response = await Services.getInstance().getCategoryProperties(
          productData.category
        );
        if (response.error) throw new Error(response.error);

        setCategoryProperties(response.data || []);
        // Update productData with the fetched properties
        setProductData((prevData) => ({
          ...prevData,
          properties: response.data || [],
        }));
      } catch (error) {
        console.error("Error fetching category properties:", error);
        setError(error.message);
        setCategoryProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProperties();
  }, [productData.category]);

  // Fetch active product status when category changes
  useEffect(() => {
    const fetchActiveProductStatus = async () => {
      if (!productData.category) return; // Skip if no category is selected

      setLoading(true);
      try {
        const response = await Services.getInstance().getActiveProductStatus(
          productData.category
        );
        if (response.error) throw new Error(response.error);

        console.log("Active Product Status Data:", response.data); // Log the data
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

  const handleValueChange = useCallback((index, newValue) => {
    setCategoryProperties((prevProperties) => {
      const updatedProperties = [...prevProperties];
      updatedProperties[index].value = newValue;
      // Update productData with the new property value
      setProductData((prevData) => ({
        ...prevData,
        properties: updatedProperties.map(({ id, value }) => [id, value]),
      }));
      return updatedProperties;
    });
  }, []);

  // Handle category selection
  const handleCategoryChange = useCallback(
    (e) => {
      const selectedCategoryId = Number(e.target.value);
      const selectedCategory = categories.find(
        (category) => category.id === selectedCategoryId
      );

      setCategoryType(selectedCategory?.categoryType || "");
      setProductData((prevData) => ({
        ...prevData,
        category: selectedCategoryId,
        brand: "",
      }));
    },
    [categories]
  );

  // Handle image upload
  // const handleImageUpload = useCallback((e) => {
  //   const files = Array.from(e.target.files);
  //   Promise.all(
  //     files.map(
  //       (file) =>
  //         new Promise((resolve) => {
  //           const reader = new FileReader();
  //           reader.onload = () => resolve(reader.result);
  //           reader.readAsDataURL(file);
  //         })
  //     )
  //   ).then((imageUrls) => {
  //     setProductData((prevData) => ({
  //       ...prevData,
  //       images: [...prevData.images, ...imageUrls],
  //     }));
  //   });
  // }, []);

 // Handle image upload
const handleImageUpload = useCallback((e) => {
  const file = e.target.files[0]; // Get the first file only
  if (file) {
    setProductData((prevData) => ({
      ...prevData,
      images: [file], // Replace the images array with the new single image
    }));
  }
}, []);

  

// Handle image removal
const handleImageRemove = useCallback(() => {
  setProductData((prevData) => ({
    ...prevData,
    images: [], // Clear the images array
  }));
  setPrimaryImageIndex(null); // Reset the primary image index
}, []);

  // // Set primary image
  // const handleSetPrimaryImage = useCallback((index) => {
  //   setProductData((prevData) => {
  //     const images = [...prevData.images]; // Create a copy of the images array
  //     const primaryImage = images.splice(index, 1)[0]; // Remove the image at the selected index
  //     images.unshift(primaryImage); // Add the primary image to the beginning of the array
  //     return {
  //       ...prevData,
  //       images, // Update the images array
  //     };
  //   });
  //   setPrimaryImageIndex(0); // Set the primary image index to 0
  // }, []);

  const handleSetPrimaryImage = useCallback(() => {
    setPrimaryImageIndex(0); // Set the primary image index to 0
  }, []);


  // Add a service
  const handleAddService = useCallback(() => {
    if (serviceName) {
      setProductData((prevData) => ({
        ...prevData,
        services: [...prevData.services, serviceName],
      }));
      setServiceName("");
    } else {
      alert("Please enter a service name.");
    }
  }, [serviceName]);

  const handleQuantityChange = useCallback((e) => {
    const quantity = Number(e.target.value);
    setProductData((prev) => ({ ...prev, quantity }));
  }, []);

  const handleSkuidChange = useCallback((e) => {
    const skuid = Number(e.target.value);
    setProductData((prev) => ({ ...prev, skuid }));
  }, []);

  const handleBrandChange = useCallback((e) => {
    const brandId = Number(e.target.value);
    setProductData((prev) => ({ ...prev, brand: brandId }));
  }, []);

  // Delete a service
  const handleDeleteService = useCallback((serviceName) => {
    setProductData((prevData) => ({
      ...prevData,
      services: prevData.services.filter((service) => service !== serviceName),
    }));
  }, []);

  // Log all product data before submission
  const logProductData = useCallback(() => {
    console.log("Product Data:", productData);
    console.log("Category Properties:", categoryProperties);
    console.log("Active Product Status:", activeProductStatus);
    console.log("Primary Image Index:", primaryImageIndex);
    console.log("Services:", productData.services);
    console.log("Brands:", brands);
    console.log("Categories:", categories);
  }, [
    productData,
    categoryProperties,
    activeProductStatus,
    primaryImageIndex,
    brands,
    categories,
  ]);

  const handleProductAdd = useCallback(async () => {
    const requiredFields =
      categoryType === "ecommerce"
        ? ["name", "price", "brand", "skuid", "quantity", "status"]
        : ["name", "price", "status", "videoUrl", "services"];
  
    const missingFields = requiredFields.filter((field) => !productData[field]);
  
    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(", ")}`);
      return;
    }
  
    // Log only the fields relevant to the selected category
    const logProductData = () => {
      const commonFields = {
        category: productData.category,
        images: productData.images,
        name: productData.name,
        price: Number(productData.price),
        properties: productData.properties,
        status: productData.status,
        videoUrl: productData.videoUrl,
      };
  
      const ecommerceFields = {
        ...commonFields,
        brand: Number(productData.brand),
        quantity: Number(productData.quantity),
        skuid: Number(productData.skuid),
      };
  
      const serviceFields = {
        ...commonFields,
        services: productData.services,
      };
  
      const logData = categoryType === "ecommerce" 
        ? { type: "Ecommerce Product Data", fields: ecommerceFields } 
        : categoryType === "service" 
        ? { type: "Service Product Data", fields: serviceFields } 
        : { type: "No category selected", fields: {} };
  
      console.log(`${logData.type}:`, logData.fields);
  
      // Log additional data (optional)
      console.log("Category Properties:", categoryProperties);
      console.log("Active Product Status:", activeProductStatus);
      console.log("Primary Image Index:", primaryImageIndex);
      console.log("Brands:", brands);
      console.log("Categories:", categories);
    };
  
    // Log the product data before submission
    logProductData();
  
    try {
      setLoading(true);
      setError(null);
  
      // Simulate a delay to mimic an API call (optional)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(productData);
      const response = await Services.getInstance().addProductWithFormData(productData, categoryType);
  
      if (response.error) {
        throw new Error(response.error);
      }
  
      // Log success message
      console.log("Product data validated successfully. Navigating to /products-management...");
  
      // Navigate to /products-management
      navigate("/products-management");
    } catch (error) {
      console.error("Error during submission simulation:", error);
      setError(error.message);
      alert("Failed to simulate product submission: " + error.message);
    } finally {
      setLoading(false);
    }
  }, [
    categoryType,
    productData,
    navigate,
    categoryProperties,
    activeProductStatus,
    primaryImageIndex,
    brands,
    categories,
  ]);

  // Memoized JSX for better performance
  const renderCategoryDropdown = useMemo(
    () => (
      <div className="col-span-2">
        <label htmlFor="category" className="field-label">
          Category<span className="text-red-500">*</span>
        </label>
        <select
          className="field-input"
          id="category"
          required
          value={productData.category}
          onChange={handleCategoryChange}
        >
          <option value="">Select Category</option>
          {loading ? (
            <option>Loading...</option>
          ) : error ? (
            <option>{error}</option>
          ) : (
            categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))
          )}
        </select>
      </div>
    ),
    [categories, error, loading, productData.category, handleCategoryChange]
  );

  const renderBrandDropdown = useMemo(
    () =>
      categoryType === "ecommerce" && (
        <div>
          <label htmlFor="brand" className="field-label">
            Brand<span className="text-red-500">*</span>
          </label>
          <select
            className="field-input"
            id="brand"
            required
            value={productData.brand}
            onChange={(e) =>
              setProductData((prev) => ({ ...prev, brand: e.target.value }))
            }
          >
            <option value="">Select Brand</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.bName}
              </option>
            ))}
          </select>
        </div>
      ),
    [brands, categoryType, productData.brand]
  );

  const renderImageUpload = useMemo(
    () => (
      <div className="col-span-2">
        <label className="field-label">
          {categoryType === "service" ? "Service" : "Product"} Image
          {categoryType === "service" && (
            <span className="text-red-500">*</span>
          )}
        </label>
        <div className="image-upload-wrapper relative w-full border-dashed border-2 border-primary flex flex-wrap gap-4 p-2">
          {productData.images.length === 0 ? (
            // Show upload button only if no image is uploaded
            <label className="cursor-pointer w-32 h-32 flex items-center justify-center border border-dashed border-gray-300">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <span className="text-gray-500">+ Upload</span>
            </label>
          ) : (
            // Show the uploaded image and controls
            <div className="relative w-32 h-32">
              <img
                src={URL.createObjectURL(productData.images[0])} // Create a temporary URL for preview
                alt="preview"
                className="w-full h-full object-cover rounded-md"
              />
              <button
                type="button"
                className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full px-2 py-1"
                onClick={handleImageRemove}
              >
                ✕
              </button>
              <button
                type="button"
                className={`absolute bottom-1 right-1 bg-blue-500 text-white text-xs rounded-full px-2 py-1 ${
                  primaryImageIndex === 0 ? "bg-green-500" : ""
                }`}
                onClick={handleSetPrimaryImage}
              >
                {primaryImageIndex === 0 ? "Primary" : "Set Primary"}
              </button>
            </div>
          )}
        </div>
      </div>
    ),
    [
      categoryType,
      handleImageUpload,
      handleImageRemove,
      handleSetPrimaryImage,
      primaryImageIndex,
      productData.images,
    ]
  );

  const renderPropertiesTable = useMemo(
    () => (
      <div className="col-span-2 mt-5">
        <h3 className="text-lg font-semibold mb-3">Properties</h3>
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Sr. No.</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Value</th>
            </tr>
          </thead>
          <tbody>
            {categoryProperties.map((property, index) => (
              <tr key={index} className="text-center">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{property.name}</td>
                <td className="border px-4 py-2">{property.description}</td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    value={property.value || ""}
                    onChange={(e) => handleValueChange(index, e.target.value)}
                    className="field-input"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
    [handleValueChange, categoryProperties]
  );

  const renderServicesSection = useMemo(
    () =>
      categoryType === "service" && (
        <div className="col-span-2 mt-5">
          <label htmlFor="serviceName" className="field-label">
            Add Service Name
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              id="serviceName"
              className="field-input w-full md:w-2/3"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
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
                  <span>{service}</span>
                  <button
                    type="button"
                    className="text-red-500 text-xs hover:text-red-700"
                    onClick={() => handleDeleteService(service)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ),
    [
      categoryType,
      handleAddService,
      handleDeleteService,
      productData.services,
      serviceName,
    ]
  );

  return (
    <>
      <PageHeader title="Add Product" />
      <div className="bg-widget flex items-center justify-center w-full py-10 px-4 lg:p-[60px]">
        <Spring
          className="w-full max-w-[960px]"
          type="slideUp"
          duration={400}
          delay={300}
        >
          <form className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
            {renderCategoryDropdown}
            {categoryType && (
              <>
                {renderBrandDropdown}
                <div>
                  <label htmlFor="name" className="field-label">
                    {categoryType === "service" ? "Service" : "Product"} Name
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
                      setProductData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                </div>
                {categoryType === "ecommerce" && (
                  <>
                    <div>
                      <label htmlFor="skuid" className="field-label">
                        SKU ID<span className="text-red-500">*</span>
                      </label>
                      <input
                        className="field-input"
                        required
                        id="skuid"
                        type="number"
                        placeholder="SKU ID"
                        value={productData.skuid}
                        onChange={handleSkuidChange}
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
                        onChange={handleQuantityChange}
                      />
                    </div>
                  </>
                )}
                <div>
                  <label htmlFor="videoUrl" className="field-label">
                    Video URL
                    {categoryType === "service" && (
                      <span className="text-red-500">*</span>
                    )}
                  </label>
                  <input
                    className="field-input"
                    id="videoUrl"
                    type="url"
                    placeholder="Video URL"
                    value={productData.videoUrl}
                    onChange={(e) =>
                      setProductData((prev) => ({
                        ...prev,
                        videoUrl: e.target.value,
                      }))
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
                      setProductData((prev) => ({
                        ...prev,
                        status: Number(e.target.value), // Store only the status ID
                      }))
                    }
                  >
                    <option value="">Select Status</option>
                    {Array.isArray(activeProductStatus) &&
                    activeProductStatus.length > 0 ? (
                      activeProductStatus.map((status) => (
                        <option key={status.id} value={status.id}>
                          {status.name}
                        </option>
                      ))
                    ) : (
                      <option disabled>No statuses available</option>
                    )}
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
                      setProductData((prev) => ({
                        ...prev,
                        price: e.target.value,
                      }))
                    }
                  />
                </div>
                {renderImageUpload}
                {renderPropertiesTable}
                {renderServicesSection}
                <div className="col-span-2 flex justify-center mt-5">
                  <button
                    type="button"
                    className="btn btn--primary"
                    onClick={handleProductAdd}
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save"}{" "}
                    {categoryType === "service" ? "Service" : "Product"}
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

export default AddProduct;