import React, { useState } from "react";
import classNames from "classnames";
import Spring from "../components/Spring";
import { useNavigate } from 'react-router-dom';
import PageHeader from "../layout/PageHeader";

const AddCategory = () => {
  const navigate = useNavigate();

  const [categoryData, setCategoryData] = useState({
    categoryName: "",
    categoryImage: null,
    categoryType: "",
    categoryLabel: "",
    addedCategories: [],
    showPropertyTable: false,
  });

  const [propertyData, setPropertyData] = useState({
    propertyName: "",
    propertyDescription: "",
    propertyType: "",
  });

  const handleImageUpload = (e, isProperty = false) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (isProperty) {
          setPropertyData({ ...propertyData, propertyImage: reader.result });
        } else {
          setCategoryData({ ...categoryData, categoryImage: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = (isProperty = false) => {
    if (isProperty) {
      setPropertyData({ ...propertyData, propertyImage: null });
    } else {
      setCategoryData({ ...categoryData, categoryImage: null });
    }
  };

  const handleCategoryAdd = () => {
    const { categoryName, categoryType, categoryLabel } = categoryData;
    if (!categoryName || !categoryType || !categoryLabel) {
      alert("Please fill all category fields.");
      return;
    }

    const newCategory = {
      id: Date.now(),
      categoryName,
      categoryImage: categoryData.categoryImage,
      categoryType,
      categoryLabel,
    };

    setCategoryData((prev) => ({
      ...prev,
      addedCategories: [...prev.addedCategories, newCategory],
      categoryName: "",
      categoryImage: null,
      categoryType: "",
      categoryLabel: "",
    }));
  };

  const handlePropertyAdd = () => {
    const { propertyName, propertyDescription, propertyType } = propertyData;
    if (!propertyName || !propertyDescription || !propertyType) {
      alert("Please fill all property fields.");
      return;
    }

    setCategoryData((prev) => ({
      ...prev,
      categoryProperties: [
        ...prev.categoryProperties,
        { ...propertyData, id: Date.now() },
      ],
    }));

    setPropertyData({
      propertyName: "",
      propertyDescription: "",
      propertyType: "",
    });
  };

  const handlePropertyDelete = (id) => {
    setCategoryData((prev) => ({
      ...prev,
      categoryProperties: prev.categoryProperties.filter((prop) => prop.id !== id),
    }));
  };

  const handlePropertyEdit = (id) => {
    const propertyToEdit = categoryData.categoryProperties.find(
      (prop) => prop.id === id
    );
    setPropertyData(propertyToEdit);
    handlePropertyDelete(id);
  };

  const handleDeleteCategory = (id) => {
    setCategoryData((prev) => ({
      ...prev,
      addedCategories: prev.addedCategories.filter((category) => category.id !== id),
    }));
  };

  const handleSaveCategory = () => {
    const { addedCategories } = categoryData;
    if (addedCategories.length === 0) {
      alert("No categories to save.");
      return;
    }

    // Save categories logic here (e.g., send data to the backend)
    console.log("Categories saved: ", addedCategories);

    // Optionally reset the form data after saving
    setCategoryData({
      categoryName: "",
      categoryImage: null,
      categoryType: "",
      categoryLabel: "",
      addedCategories: [],
    });

    // Optionally navigate to another page
    navigate("/category-management");
  };

  return (
    <>
      <PageHeader title="Add Category" />

      <div className="bg-widget flex items-center justify-center w-full py-10 px-4 lg:p-[60px]">
        <Spring
          className="w-full max-w-[560px]"
          type="slideUp"
          duration={400}
          delay={300}
        >
          <form className="mt-5 flex flex-col gap-5">
            {/* Category Name */}
            <div className="field-wrapper">
              <label htmlFor="categoryName" className="field-label">
                Category Name
              </label>
              <input
                className={classNames("field-input")}
                required
                id="categoryName"
                type="text"
                placeholder="Category name"
                value={categoryData.categoryName}
                onChange={(e) =>
                  setCategoryData({ ...categoryData, categoryName: e.target.value })
                }
              />
            </div>

            {/* Category Image Upload */}
            <div className="field-wrapper">
              <label className="field-label">Category Image</label>
              <div className="image-upload-wrapper relative w-full h-48 border-dashed border-2 border-primary flex items-center justify-center cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => handleImageUpload(e)}
                />
                {categoryData.categoryImage ? (
                  <div className="relative h-full w-full">
                    <img
                      src={categoryData.categoryImage}
                      alt="Category Preview"
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                      onClick={() => handleImageRemove()}
                    >
                      &#10005;
                    </button>
                  </div>
                ) : (
                  <span className="text-gray-500">Click to upload an image</span>
                )}
              </div>
            </div>

            {/* Category Type Dropdown (Service/E-commerce) */}
            <div className="field-wrapper">
              <label htmlFor="categoryType" className="field-label">
                Category Type
              </label>
              <select
                className="field-input"
                id="categoryType"
                value={categoryData.categoryType}
                onChange={(e) =>
                  setCategoryData({
                    ...categoryData,
                    categoryType: e.target.value,
                  })
                }
              >
                <option value="">Select Type</option>
                <option value="Service">Service</option>
                <option value="E-commerce">E-commerce</option>
              </select>
            </div>

            {/* Category Label/Tag Name */}
            <div className="field-wrapper">
              <label htmlFor="categoryLabel" className="field-label">
                Category Label/Tag Name
              </label>
              <input
                className="field-input"
                id="categoryLabel"
                type="text"
                placeholder="Enter label/tag name"
                value={categoryData.categoryLabel}
                onChange={(e) =>
                  setCategoryData({
                    ...categoryData,
                    categoryLabel: e.target.value,
                  })
                }
              />
            </div>

            {/* Add Category Button (Before Properties Table) */}
            <div className="flex justify-center gap-5 mt-8">
              <button
                type="button"
                className="btn btn--primary px-10 py-3"
                onClick={handleCategoryAdd}
              >
                Add Category
              </button>
            </div>

            {/* Category Properties Table */}
            {categoryData.addedCategories.length > 0 && (
              <div className="category-properties-table mt-6">
                <h3 className="text-lg font-bold">Added Categories</h3>
                <table className="w-full mt-4 border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-300 p-2">S.No</th>
                      <th className="border border-gray-300 p-2">Name</th>
                      <th className="border border-gray-300 p-2">Type</th>
                      <th className="border border-gray-300 p-2">Label</th>
                      <th className="border border-gray-300 p-2">Image</th>
                      <th className="border border-gray-300 p-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryData.addedCategories.map((category, index) => (
                      <tr key={category.id} className="hover:bg-gray-100">
                        <td className="border border-gray-300 p-2">{index + 1}</td>
                        <td className="border border-gray-300 p-2">{category.categoryName}</td>
                        <td className="border border-gray-300 p-2">{category.categoryType}</td>
                        <td className="border border-gray-300 p-2">{category.categoryLabel}</td>
                        <td className="border border-gray-300 p-2">
                          {category.categoryImage ? (
                            <img src={category.categoryImage} alt="Category" className="h-12 w-12 object-cover" />
                          ) : (
                            "No Image"
                          )}
                        </td>
                        <td className="border border-gray-300 p-2">
                          <button className="text-red-500" onClick={() => handleDeleteCategory(category.id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Save Category Button */}
            <div className="flex justify-center gap-5 mt-8">
              <button
                type="button"
                className="btn btn--primary px-10 py-3"
                onClick={handleSaveCategory}
              >
                Save Category
              </button>
            </div>
          </form>
        </Spring>
      </div>
    </>
  );
};

export default AddCategory;
