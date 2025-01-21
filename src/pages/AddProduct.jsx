import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../layout/PageHeader";
import Spring from "../components/Spring";

const AddProduct = () => {
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    skuid: "",
    name: "",
    quantity: "",
    videoUrl: "",
    status: "",
    price: "",
    category: "",
    brand: "",
    properties: [
      { description: "", type: "", value: "" },
      { description: "", type: "", value: "" },
    ],
    images: [],
    suitableCars: [],
  });

  const [categories] = useState([
    "Filters",
    "Oils",
    "Batteries",
    "Tyres",
    "Engine Oil Petrol",
    "Engine Oil Diesel",
  ]);

  const [brands] = useState(["Brand A", "Brand B", "Brand C"]);

  const [cars] = useState(["Car Model A", "Car Model B", "Car Model C"]);
  const [selectedCars, setSelectedCars] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProductData({
          ...productData,
          images: [...productData.images, reader.result],
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = (index) => {
    const updatedImages = productData.images.filter((_, i) => i !== index);
    setProductData({ ...productData, images: updatedImages });
  };

  const handleProductAdd = () => {
    if (
      !productData.name ||
      !productData.price ||
      !productData.category ||
      !productData.brand
    ) {
      alert("Please fill in required product fields");
      return;
    }
    console.log("Product Data: ", productData);
    // You can save the data or navigate as needed
    navigate('/products-management');

  };
  // Handle car selection with checkboxes
  const handleCarSelection = (car) => {
    const updatedSelectedCars = selectedCars.includes(car)
      ? selectedCars.filter((selectedCar) => selectedCar !== car)
      : [...selectedCars, car];

    setSelectedCars(updatedSelectedCars);
  };

  // Add selected cars to the suitableCars array
  const handleAddCars = () => {
    setProductData({
      ...productData,
      suitableCars: [...productData.suitableCars, ...selectedCars],
    });

    // Optionally clear the selectedCars list after adding
    setSelectedCars([]);
    setIsOpen(false); // Close the dropdown after adding cars
  };

  const handleRemoveCar = (car) => {
    const updatedCars = productData.suitableCars.filter((item) => item !== car);
    setProductData({ ...productData, suitableCars: updatedCars });
  };

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
          <form className="mt-5 flex flex-col gap-5">
            {/* Section A: Product Details - Two Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="field-wrapper">
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
                    setProductData({ ...productData, skuid: e.target.value })
                  }
                />
              </div>

              <div className="field-wrapper">
                <label htmlFor="name" className="field-label">
                  Product Name<span className="text-red-500">*</span>
                </label>
                <input
                  className="field-input"
                  required
                  id="name"
                  type="text"
                  placeholder="Product Name"
                  value={productData.name}
                  onChange={(e) =>
                    setProductData({ ...productData, name: e.target.value })
                  }
                />
              </div>

              <div className="field-wrapper">
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
                    setProductData({ ...productData, quantity: e.target.value })
                  }
                />
              </div>

              <div className="field-wrapper">
                <label htmlFor="videoUrl" className="field-label">
                  Video URL
                </label>
                <input
                  className="field-input"
                  id="videoUrl"
                  type="url"
                  placeholder="Video URL"
                  value={productData.videoUrl}
                  onChange={(e) =>
                    setProductData({ ...productData, videoUrl: e.target.value })
                  }
                />
              </div>

              <div className="field-wrapper">
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
                  <option value="">Select Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="field-wrapper">
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

              <div className="field-wrapper">
                <label htmlFor="category" className="field-label">
                  Category<span className="text-red-500">*</span>
                </label>
                <select
                  className="field-input"
                  id="category"
                  required
                  value={productData.category}
                  onChange={(e) =>
                    setProductData({ ...productData, category: e.target.value })
                  }
                >
                  <option value="">Select Category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field-wrapper">
                <label htmlFor="brand" className="field-label">
                  Brand<span className="text-red-500">*</span>
                </label>
                <select
                  className="field-input"
                  id="brand"
                  required
                  value={productData.brand}
                  onChange={(e) =>
                    setProductData({ ...productData, brand: e.target.value })
                  }
                >
                  <option value="">Select Brand</option>
                  {brands.map((brand, index) => (
                    <option key={index} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Section B: Properties */}
            {productData.properties.map((property, index) => (
              <div key={index} className="flex gap-5">
                <div className="field-wrapper w-full">
                  <label className="field-label">
                    Category Property {index + 1} (Description)
                  </label>
                  <input
                    className="field-input"
                    type="text"
                    placeholder="Property Description"
                    value={property.description}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        properties: productData.properties.map((prop, i) =>
                          i === index
                            ? { ...prop, description: e.target.value }
                            : prop
                        ),
                      })
                    }
                  />
                </div>
                <div className="field-wrapper w-full">
                  <label className="field-label">Value</label>
                  <input
                    className="field-input"
                    type="text"
                    placeholder="Property Value"
                    value={property.value}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        properties: productData.properties.map((prop, i) =>
                          i === index
                            ? { ...prop, value: e.target.value }
                            : prop
                        ),
                      })
                    }
                  />
                </div>
              </div>
            ))}

            {/* Section C: Product Images */}
            <div className="field-wrapper">
              <label className="field-label">Product Images</label>
              <div className="image-upload-wrapper relative w-full h-48 border-dashed border-2 border-primary flex items-center justify-center cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleImageUpload}
                  multiple
                />
                {productData.images.length > 0 ? (
                  <div className="relative h-full w-full">
                    <img
                      src={productData.images[0]}
                      alt="Product Preview"
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      className="absolute top-2 right-2 bg-red-500 text-red rounded-full p-1"
                      onClick={() => handleImageRemove(0)}
                    >
                      &#10005;
                    </button>
                  </div>
                ) : (
                  <span className="text-gray-500">Click to upload images</span>
                )}
              </div>
            </div>

            {/* Section D: Suitable Cars */}
            <div className="field-wrapper">
              <label className="field-label">Suitable Cars</label>
              <div className="relative flex items-center">
                <button
                  type="button"
                  className="field-input w-full md:w-auto flex justify-between items-center"
                  onClick={toggleDropdown}
                >
                  {selectedCars.length
                    ? `${selectedCars.length} car(s) selected`
                    : "Select Cars"}
                  <span>{isOpen ? "▲" : "▼"}</span>
                </button>
                <button
                  type="button"
                  className="btn btn--primary ml-3"
                  onClick={handleAddCars}
                >
                  Add Car
                </button>
                {isOpen && (
                  <div
                    className="absolute left-0 top-full w-full bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto z-10"
                    style={{
                      maxHeight: "200px",
                      top: "calc(100% + 8px)",
                    }}
                  >
                    <ul className="p-2">
                      {cars.map((car, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={car}
                            value={car}
                            checked={selectedCars.includes(car)}
                            onChange={() => handleCarSelection(car)}
                            className="checkbox-input"
                          />
                          <label htmlFor={car} className="text-sm">
                            {car}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Display Selected Cars Table */}
            <div className="field-wrapper mt-5">
              <table className="table-auto w-full text-left">
                <thead>
                  <tr>
                    <th>Selected Cars</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {productData.suitableCars.map((car, index) => (
                    <tr key={index}>
                      <td>{car}</td>
                      <td>
                        <button
                          type="button"
                          className="text-red-500"
                          onClick={() =>
                            setProductData({
                              ...productData,
                              suitableCars: productData.suitableCars.filter(
                                (selectedCar) => selectedCar !== car
                              ),
                            })
                          }
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Save Product Button */}
            <div className="flex justify-center gap-5">
              <button
                type="button"
                className="btn btn--primary"
                onClick={handleProductAdd}
              >
                Save Product
              </button>
            </div>
          </form>
        </Spring>
      </div>
    </>
  );
};

export default AddProduct;
