import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../layout/PageHeader";
import Spring from "../components/Spring";
import Services from "./Services/Services";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCategory = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [categoryData, setCategoryData] = useState({
    categoryName: "",
    categoryImage: null,
    categoryType: "",
    categoryLabel: "",
    categoryProperties: [],
    addedCategories: [],
  });

  const [propertyData, setPropertyData] = useState({
    name: "",
    description: "",
    dataType: "",
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCategoryData((prev) => ({ ...prev, categoryImage: file }));
    }
  };

  const handleEditCategory = (id) => {
    const categoryToEdit = categoryData.addedCategories.find(
      (category) => category.id === id
    );
    if (categoryToEdit) {
      setCategoryData((prev) => ({
        ...prev,
        categoryName: categoryToEdit.categoryName,
        categoryType: categoryToEdit.categoryType,
        categoryLabel: categoryToEdit.categoryLabel,
        categoryImage: categoryToEdit.categoryImage,
      }));
      setEditMode(true);
      setEditCategoryId(id);
      setShowForm(true);
    }
  };

  const handleImageRemove = () => {
    setCategoryData((prev) => ({ ...prev, categoryImage: null }));
  };

  const handleDeleteCategory = (id) => {
    const updatedCategories = categoryData.addedCategories.filter(
      (category) => category.id !== id
    );
    setCategoryData((prev) => ({
      ...prev,
      addedCategories: updatedCategories,
    }));
    setShowForm(updatedCategories.length === 0);
  };

  const handlePropertyAdd = () => {
    const { name, description, dataType } = propertyData;
    if (!name || !description || !dataType) {
      alert("Please fill all property fields.");
      return;
    }

    setCategoryData((prev) => ({
      ...prev,
      categoryProperties: [...prev.categoryProperties, { ...propertyData, id: Date.now() }],
    }));

    setPropertyData({
      name: "",
      description: "",
      dataType: "",
    });
  };

  const handlePropertyDelete = (id) => {
    setCategoryData((prev) => ({
      ...prev,
      categoryProperties: prev.categoryProperties.filter(
        (prop) => prop.id !== id
      ),
    }));
  };

  const handlePropertyEdit = (id) => {
    const propertyToEdit = categoryData.categoryProperties.find(
      (prop) => prop.id === id
    );
    if (propertyToEdit) {
      setPropertyData(propertyToEdit);
      handlePropertyDelete(id);
    }
  };

  const handleSubmitCategory = () => {
    const { categoryName, categoryType, categoryImage, categoryProperties } = categoryData;

    Services.getInstance()
      .addCategoryWithFormData(categoryName, categoryType, categoryImage, categoryProperties)
      .then((result) => {
        console.log("API Response:", result); // Log the API response for debugging
        // if (result && result.status === 200) {
          if (result && result.message === "Category and properties created successfully.") {
            // Show success toast message
        toast.success("Your Category has been added successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
          navigate("/category-management");
        } else {
          alert("Error while saving category. Please try again.");
          navigate("/category-management");
        }
      })
      .catch((error) => {
        console.error("Error submitting category:", error); // Log the error for debugging
        alert("An error occurred while submitting the category. Please try again.");
      });

    if (editMode && editCategoryId) {
      const updatedCategories = categoryData.addedCategories.map((category) =>
        category.id === editCategoryId
          ? {
              ...category,
              categoryName,
              categoryType,
              categoryLabel: categoryData.categoryLabel,
              categoryImage,
            }
          : category
      );

      setCategoryData((prev) => ({
        ...prev,
        addedCategories: updatedCategories,
        categoryName: "",
        categoryType: "",
        categoryLabel: "",
        categoryImage: null,
      }));

      setEditMode(false);
      setEditCategoryId(null);
      setShowForm(false);
    } else {
      const newCategory = {
        id: Date.now(), // Generate a unique ID for the new category
        categoryName,
        categoryType,
        categoryLabel: categoryData.categoryLabel,
        categoryImage,
        categoryProperties: [...categoryProperties],
      };

      setCategoryData((prev) => ({
        ...prev,
        addedCategories: [...prev.addedCategories, newCategory],
        categoryName: "",
        categoryType: "",
        categoryLabel: "",
        categoryImage: null,
      }));
      setShowForm(false);
    }
  };

  return (
    <>
      <PageHeader title="Add Category" />
      <ToastContainer /> 
      <div className="bg-widget flex items-center justify-center w-full py-10 px-4 lg:p-[60px]">
        <Spring
          className="w-full max-w-[560px]"
          type="slideUp"
          duration={400}
          delay={300}
        >
          <div className="mt-5 flex flex-col gap-5">
            {showForm && (
              <div className="mt-5 flex flex-col gap-5">
                {/* Category Form */}
                <div className="field-wrapper">
                  <label htmlFor="categoryName" className="field-label">
                    Category Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="field-input"
                    required
                    id="categoryName"
                    type="text"
                    placeholder="Category name"
                    value={categoryData.categoryName}
                    onChange={(e) =>
                      setCategoryData((prev) => ({
                        ...prev,
                        categoryName: e.target.value,
                      }))
                    }
                  />
                </div>

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
                      setCategoryData((prev) => ({
                        ...prev,
                        categoryLabel: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="field-wrapper">
                  <label className="field-label">Category Image</label>
                  <div className="image-upload-wrapper relative w-full h-48 border-dashed border-2 border-primary flex items-center justify-center cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handleImageUpload}
                    />
                    {categoryData.categoryImage ? (
                      <div className="relative h-full w-full">
                        <img
                          src={URL.createObjectURL(categoryData.categoryImage)}
                          alt="Category Preview"
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
                      <span className="text-gray-500">
                        Click to upload an image
                      </span>
                    )}
                  </div>
                </div>

                <div className="field-wrapper">
                  <label htmlFor="categoryType" className="field-label">
                    Category Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="field-input"
                    id="categoryType"
                    required
                    value={categoryData.categoryType}
                    onChange={(e) =>
                      setCategoryData((prev) => ({
                        ...prev,
                        categoryType: e.target.value,
                      }))
                    }
                  >
                    <option value="">Select Type</option>
                    <option value="service">Service</option>
                    <option value="ecommerce">E-commerce</option>
                  </select>
                </div>
              </div>
            )}

            {categoryData.addedCategories.length > 0 && (
              <div className="category-properties-table mt-6">
                <h3 className="text-lg font-bold mb-4">Added Categories</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
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
                              <img
                                src={category.categoryImage}
                                alt="Category"
                                className="h-12 w-12 object-cover"
                              />
                            ) : (
                              "No Image"
                            )}
                          </td>
                          <td className="border border-gray-300 p-2">
                            <button
                              type="button"
                              className="text-blue-500 mr-4"
                              onClick={() => handleEditCategory(category.id)}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              className="text-red-500"
                              onClick={() => handleDeleteCategory(category.id)}
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

            {/* Properties Section */}
            <div className="category-properties-table mt-6">
              <div className="grid gap-4">
                <div className="field-wrapper">
                  <label htmlFor="propertyName" className="field-label">
                    Property Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    className="field-input"
                    id="propertyName"
                    type="text"
                    value={propertyData.name}
                    onChange={(e) =>
                      setPropertyData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="field-wrapper">
                  <label htmlFor="propertyDescription" className="field-label">
                    Property Description<span className="text-red-500">*</span>
                  </label>
                  <input
                    className="field-input"
                    id="propertyDescription"
                    type="text"
                    value={propertyData.description}
                    onChange={(e) =>
                      setPropertyData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="field-wrapper">
                  <label htmlFor="propertyType" className="field-label">
                    Property Type<span className="text-red-500">*</span>
                  </label>
                  <select
                    className="field-input"
                    id="propertyType"
                    value={propertyData.dataType}
                    onChange={(e) =>
                      setPropertyData((prev) => ({
                        ...prev,
                        dataType: e.target.value,
                      }))
                    }
                  >
                    <option value="">Select Type</option>
                    <option value="string">Text</option>
                    <option value="number">Number</option>
                  </select>
                </div>

                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={handlePropertyAdd}
                >
                  Add Property
                </button>
              </div>

              {/* Properties Table */}
              {categoryData.categoryProperties.length > 0 && (
                <div className="overflow-x-auto mt-6">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border border-gray-300 p-2">S.No</th>
                        <th className="border border-gray-300 p-2">Name</th>
                        <th className="border border-gray-300 p-2">
                          Description
                        </th>
                        <th className="border border-gray-300 p-2">Type</th>
                        <th className="border border-gray-300 p-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categoryData.categoryProperties.map((property, index) => (
                        <tr key={property.id} className="hover:bg-gray-100">
                          <td className="border border-gray-300 p-2">{index + 1}</td>
                          <td className="border border-gray-300 p-2">{property.name}</td>
                          <td className="border border-gray-300 p-2">{property.description}</td>
                          <td className="border border-gray-300 p-2">{property.dataType}</td>
                          <td className="border border-gray-300 p-2">
                            <button
                              type="button"
                              className="text-blue-500 mr-2"
                              onClick={() => handlePropertyEdit(property.id)}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              className="text-red-500"
                              onClick={() => handlePropertyDelete(property.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center gap-5 mt-8">
              <button
                type="button"
                className="btn btn--primary px-10 py-3"
                onClick={handleSubmitCategory}
              >
                Save Category
              </button>
            </div>
          </div>
        </Spring>
      </div>
    </>
  );
};

export default AddCategory;