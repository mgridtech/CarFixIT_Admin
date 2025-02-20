import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Services from "../pages/Services/Services";

const AddCarForm1 = () => {
  const navigate = useNavigate();
  const [carBrands, setCarBrands] = useState([]);
  const [carData, setCarData] = useState({ brandId: "", model: "", carImage: null });
  const [errors, setErrors] = useState({ brandId: "", model: "", carImage: "" });

  useEffect(() => {
    const fetchCarBrands = async () => {
      try {
        const response = await Services.getInstance().getCarBrands();
        if (response.error) {
          console.error("Error fetching car brands:", response.error);
        } else {
          setCarBrands(response.data);
        }
      } catch (error) {
        console.error("Error fetching car brands:", error);
      }
    };
    fetchCarBrands();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setCarData((prev) => ({ ...prev, carImage: file }));
      setErrors((prev) => ({ ...prev, carImage: "" }));
    } else {
      setErrors((prev) => ({ ...prev, carImage: "Invalid file type. Only images are allowed." }));
    }
  };

  const handleImageRemove = () => {
    setCarData((prev) => ({ ...prev, carImage: null }));
  };

  const validateForm = () => {
    const newErrors = { brandId: "", model: "", carImage: "" };
    if (!carData.brandId) newErrors.brandId = "Brand is required.";
    if (!carData.model) newErrors.model = "Model is required.";
    if (!carData.carImage) newErrors.carImage = "Car image is required.";
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await Services.getInstance().addCarModelWithFormData(
          carData.brandId,
          carData.model,
          carData.carImage
        );
        if (response.error) {
          alert("Error adding car model: " + response.error);
        } else {
          console.log("Car model added successfully:", response);
          navigate(`/add-car-form2/${response.data.id}`);
          
        }
      } catch (error) {
        console.error("Submission error:", error);
      }
    } else {
      alert("Please fix the errors before submitting.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-5">
      {/* Brand Dropdown */}
      <div className="field-wrapper">
        <label htmlFor="brandId" className="field-label">
          Brand<span className="text-red-500">*</span>
        </label>
        <select
          className={`field-input ${errors.brandId ? "border-red-500" : ""}`}
          id="brandId"
          name="brandId"
          value={carData.brandId}
          onChange={handleInputChange}
        >
          <option value="">Select Brand</option>
          {carBrands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
        {errors.brandId && <p className="text-red-500 text-sm mt-1">{errors.brandId}</p>}
      </div>

      {/* Model Input */}
      <div className="field-wrapper">
        <label htmlFor="model" className="field-label">
          Model<span className="text-red-500">*</span>
        </label>
        <input
          className={`field-input ${errors.model ? "border-red-500" : ""}`}
          id="model"
          name="model"
          type="text"
          placeholder="Car model"
          value={carData.model}
          onChange={handleInputChange}
        />
        {errors.model && <p className="text-red-500 text-sm mt-1">{errors.model}</p>}
      </div>

      {/* Car Image Upload */}
      <div className="field-wrapper">
        <label className="field-label">
          Car Image<span className="text-red-500">*</span>
        </label>
        <div className="image-upload-wrapper relative w-full h-48 border-dashed border-2 border-primary flex items-center justify-center cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleImageUpload}
          />
          {carData.carImage ? (
            <div className="relative h-full w-full">
              <img
                src={URL.createObjectURL(carData.carImage)}
                alt="Car Preview"
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                onClick={handleImageRemove}
              >
                &#10005;
              </button>
            </div>
          ) : (
            <span className="text-gray-500">Click to upload an image</span>
          )}
        </div>
        {errors.carImage && <p className="text-red-500 text-sm mt-1">{errors.carImage}</p>}
      </div>

      {/* Next Button */}
      <div className="flex justify-center gap-5 mt-6">
        <button type="submit" className="btn btn--primary w-full">
          Next
        </button>
      </div>
    </form>
  );
};

export default AddCarForm1;