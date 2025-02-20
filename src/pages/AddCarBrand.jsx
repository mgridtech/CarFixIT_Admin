import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageHeader from "../layout/PageHeader";
import Spring from "../components/Spring";
import Services from "./Services/Services"; // Import Services for API call

const AddCarBrand = () => {
  const navigate = useNavigate();

  const [carBrandData, setCarBrandData] = useState({
    brandName: "",
    brandImage: null,
  });

  const [error, setError] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCarBrandData({ ...carBrandData, brandImage: file }); // Store file directly
    }
  };

  const handleImageRemove = () => {
    setCarBrandData({ ...carBrandData, brandImage: null });
  };

  const handleSaveCarBrand = async () => {
    if (!carBrandData.brandName.trim()) {
      alert("Please enter a brand name.");
      return;
    }

    try {
      // Call the API function to add the car brand
      const response = await Services.getInstance().addCarBrandWithFormData(
        carBrandData.brandName,
        carBrandData.brandImage
      );

      if (response.error) {
        alert("Error adding car brand: " + response.error);
      } else {
        // Show success toast message
        toast.success("Your car brand has been added successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // Navigate to car brand management page after success
        navigate("/car-brand-management");
      }
    } catch (error) {
      console.error("Error submitting car brand:", error);
      alert("Failed to submit car brand");
    }
  };

  return (
    <>
      <PageHeader title="Add Car Brand" />
      <ToastContainer /> {/* Add this line to include the toast container */}

      <div className="bg-widget flex items-center justify-center w-full py-10 px-4 lg:p-[60px]">
        <Spring
          className="w-full max-w-[560px]"
          type="slideUp"
          duration={400}
          delay={300}
        >
          <form className="mt-5 flex flex-col gap-5">
            {/* Brand Name */}
            <div className="field-wrapper">
              <label htmlFor="brandName" className="field-label">
                Brand Name<span className="text-red-500">*</span>
              </label>
              <input
                className="field-input"
                required
                id="brandName"
                type="text"
                placeholder="Brand name"
                value={carBrandData.brandName}
                onChange={(e) =>
                  setCarBrandData({ ...carBrandData, brandName: e.target.value })
                }
              />
            </div>

            {/* Brand Image Upload */}
            <div className="field-wrapper">
              <label className="field-label">Brand Image</label>
              <div className="image-upload-wrapper relative w-full h-48 border-dashed border-2 border-primary flex items-center justify-center cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleImageUpload}
                />
                {carBrandData.brandImage ? (
                  <div className="relative h-full w-full">
                    <img
                      src={URL.createObjectURL(carBrandData.brandImage)}
                      alt="Brand Preview"
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                      onClick={handleImageRemove}
                      aria-label="Remove image"
                    >
                      &#10005;
                    </button>
                  </div>
                ) : (
                  <span className="text-gray-500">Click to upload an image</span>
                )}
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-center gap-5">
              <button
                type="button"
                className="btn btn--primary px-10 py-3"
                onClick={handleSaveCarBrand}
              >
                Add Car Brand
              </button>
            </div>
          </form>
        </Spring>
      </div>
    </>
  );
};

export default AddCarBrand;