import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../layout/PageHeader";
import Spring from "../components/Spring";
import Services from "./Services/Services";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddBrand = () => {
  const navigate = useNavigate();

  const [brandData, setBrandData] = useState({
    brandName: "",
    brandImage: null,
    suitableCategories: [], // Changed to an array for multiple selections
    addedBrands: [],
  });

  const [editIndex, setEditIndex] = useState(null);
  const [categories, setCategories] = useState([]);  // Categories state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const { data } = await Services.getInstance().getCategories();
        console.log(data);
        // Filter categories with categoryType: "ecommerce"
        const ecommerceCategories = data.filter((category) => category.categoryType === "ecommerce");
        setCategories(ecommerceCategories);
      } catch (error) {
        setError("Failed to fetch categories");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []); // Empty dependency array ensures this runs on component mount

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBrandData({ ...brandData, brandImage: file });  // Directly store the file
    }
  };

  const handleImageRemove = () => {
    setBrandData({ ...brandData, brandImage: null });
  };

  const handleCategoryChange = (categoryName) => {
    setBrandData((prev) => {
      const newCategories = prev.suitableCategories.includes(categoryName)
        ? prev.suitableCategories.filter((cat) => cat !== categoryName)  // Remove category
        : [...prev.suitableCategories, categoryName];  // Add category
      return {
        ...prev,
        suitableCategories: newCategories,
      };
    });
  };

  const handleSubmitBrand = async () => {
    if (!brandData.brandName || brandData.suitableCategories.length === 0) {
      alert("Please fill in required brand fields");
      return;
    }

    try {
      // Call the service method to add the brand
      const response = await Services.getInstance().addBrandWithFormData(
        brandData.brandName,
        brandData.suitableCategories,
        brandData.brandImage 
      );

      if (response.error) {
        alert("Error adding brand: " + response.error);
      } else {
        // Navigate to brand management page after successfully adding
        toast.success("Your Brand has been added successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/brand-management");
      }
    } catch (error) {
      console.error("Error submitting brand:", error);
      alert("Failed to submit brand");
    }
  };

  return (
    <>
      <PageHeader title="Add Brand" />
      <ToastContainer /> 


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
                value={brandData.brandName}
                onChange={(e) =>
                  setBrandData({ ...brandData, brandName: e.target.value })
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
                  onChange={(e) => handleImageUpload(e)}
                />
                {brandData.brandImage ? (
                  <div className="relative h-full w-full">
                    <img
                      src={URL.createObjectURL(brandData.brandImage)}
                      alt="Brand Preview"
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
            </div>

            {/* Suitable Categories Dropdown with Multiple Checkboxes */}
            <div className="field-wrapper">
              <label className="field-label">
                Suitable Categories<span className="text-red-500">*</span>
              </label>
              <div className="max-h-48 overflow-y-auto p-2 border border-gray-300 rounded-md">
                {loading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p>{error}</p>
                ) : (
                  categories.map((category, index) => (
                    <div key={category.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`category-${category.id}`}
                        value={category.name}
                        checked={brandData.suitableCategories.includes(category.name)}
                        onChange={() => handleCategoryChange(category.name)}
                      />
                      <label htmlFor={`category-${category.id}`} className="ml-2">
                        {category.name}
                      </label>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Submit Brand Button */}
            <div className="flex justify-center gap-5 mt-6">
              <button
                type="button"
                className="btn btn--primary px-10 py-3"
                onClick={handleSubmitBrand}
              >
                Submit Brand
              </button>
            </div>
          </form>
        </Spring>
      </div>
    </>
  );
};

export default AddBrand;
