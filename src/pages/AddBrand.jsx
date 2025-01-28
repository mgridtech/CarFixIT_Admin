import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../layout/PageHeader";
import Spring from "../components/Spring";

const AddBrand = () => {
  const navigate = useNavigate();

  const [brandData, setBrandData] = useState({
    brandName: "",
    brandImage: null,
    suitableCategory: "",
    addedBrands: [],
  });

  const [editIndex, setEditIndex] = useState(null);
  const [categories] = useState([
    "Filters",
    "Oils",
    "Batteries",
    "Tyres",
    "Engine Oil Petrol",
    "Engine Oil Diesel",
  ]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setBrandData({ ...brandData, brandImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setBrandData({ ...brandData, brandImage: null });
  };

  const handleBrandAdd = () => {
    if (!brandData.brandName || !brandData.suitableCategory) {
      alert("Please fill in required brand fields");
      return;
    }

    const newBrand = {
      id: Date.now(),
      brandName: brandData.brandName,
      suitableCategory: brandData.suitableCategory,
      brandImage: brandData.brandImage,
    };

    setBrandData((prev) => ({
      ...prev,
      addedBrands: [...prev.addedBrands, newBrand],
      brandName: "",
      suitableCategory: "",
      brandImage: null,
    }));
  };

  const handleDeleteBrand = (id) => {
    setBrandData((prev) => ({
      ...prev,
      addedBrands: prev.addedBrands.filter((brand) => brand.id !== id),
    }));
  };

  const handleEditBrand = (index) => {
    const brandToEdit = brandData.addedBrands[index];
    setBrandData({
      ...brandData,
      brandName: brandToEdit.brandName,
      suitableCategory: brandToEdit.suitableCategory,
      brandImage: brandToEdit.brandImage,
    });
    setEditIndex(index);
  };

  const handleUpdateBrand = () => {
    if (editIndex === null) return;

    const updatedBrands = brandData.addedBrands.map((brand, index) =>
      index === editIndex
        ? {
            ...brand,
            brandName: brandData.brandName,
            suitableCategory: brandData.suitableCategory,
            brandImage: brandData.brandImage,
          }
        : brand
    );

    setBrandData((prev) => ({
      ...prev,
      addedBrands: updatedBrands,
      brandName: "",
      suitableCategory: "",
      brandImage: null,
    }));
    setEditIndex(null);
  };

  const handleSubmitBrand = () => {
    if (brandData.addedBrands.length === 0) {
      alert("Please add at least one brand before saving");
      return;
    }
    console.log("Brand Data: ", brandData);
    navigate("/brand-management");
  };

  return (
    <>
      <PageHeader title="Add Brand" />

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
                      src={brandData.brandImage}
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

            {/* Suitable Category Dropdown */}
            <div className="field-wrapper">
              <label htmlFor="suitableCategory" className="field-label">
                Suitable Category<span className="text-red-500">*</span>
              </label>
              <select
                className="field-input"
                id="suitableCategory"
                required
                value={brandData.suitableCategory}
                onChange={(e) =>
                  setBrandData({
                    ...brandData,
                    suitableCategory: e.target.value,
                  })
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

            {/* Add or Update Brand Button */}
            <div className="flex justify-center gap-5">
              {editIndex !== null ? (
                <button
                  type="button"
                  className="btn btn--primary px-10 py-3"
                  onClick={handleUpdateBrand}
                >
                  Update Brand
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn--primary px-10 py-3"
                  onClick={handleBrandAdd}
                >
                  Add Brand
                </button>
              )}
            </div>

            {/* Added Brands Table */}
            {brandData.addedBrands.length > 0 && (
              <div className="brand-properties-table mt-6">
                <h3 className="text-lg font-bold mb-4">Added Brands</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border border-gray-300 p-2">S.No</th>
                        <th className="border border-gray-300 p-2">Name</th>
                        <th className="border border-gray-300 p-2">Category</th>
                        <th className="border border-gray-300 p-2">Image</th>
                        <th className="border border-gray-300 p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {brandData.addedBrands.map((brand, index) => (
                        <tr key={brand.id} className="hover:bg-gray-100">
                          <td className="border border-gray-300 p-2">
                            {index + 1}
                          </td>
                          <td className="border border-gray-300 p-2">
                            {brand.brandName}
                          </td>
                          <td className="border border-gray-300 p-2">
                            {brand.suitableCategory}
                          </td>
                          <td className="border border-gray-300 p-2">
                            {brand.brandImage ? (
                              <img
                                src={brand.brandImage}
                                alt="Brand"
                                className="h-12 w-12 object-cover"
                              />
                            ) : (
                              "No Image"
                            )}
                          </td>
                          <td className="border border-gray-300 p-2">
                            <button
                              type="button"
                              className="text-blue-500 mr-2"
                              onClick={() => handleEditBrand(index)}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              className="text-red-500"
                              onClick={() => handleDeleteBrand(brand.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

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
