import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../layout/PageHeader";
import Spring from "../components/Spring";
import Services from "../pages/Services/Services";  // Import Services

const AddSuitableCategory = () => {
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);
  const [brandId, setBrandId] = useState(null);

  // Fetch brandId from sessionStorage
  useEffect(() => {
    const storedBrandId = sessionStorage.getItem("brandId");
    if (storedBrandId) {
      setBrandId(storedBrandId);
    } else {
      console.log("No brand ID found in sessionStorage.");
    }
  }, []);

  // Fetch non-associated categories when brandId changes
  useEffect(() => {
    if (brandId) {
      const fetchNonAssociatedCategories = async () => {
        setLoading(true);
        try {
          const { data } = await Services.getInstance().getNonAssociatedCategories(brandId);
          setCategoryOptions(data);
        } catch (error) {
          console.error("Error fetching non-associated categories:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchNonAssociatedCategories();
    }
  }, [brandId]);

  // Toggle category selection
  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  // Remove category from selected list
  const handleRemoveCategory = (category) => {
    setSelectedCategories(selectedCategories.filter((item) => item !== category));
  };

  // Close dropdown when clicking outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle the Add Category button click and make API call
  const handleAddCategory = async () => {
    if (selectedCategories.length === 0) {
      alert("Please select at least one category.");
      return;
    }

    // Convert selected category names to category IDs
    const categoryIds = selectedCategories.map((category) => {
      const categoryObj = categoryOptions.find((option) => option.name === category);
      return categoryObj ? categoryObj.id : null;
    }).filter((id) => id !== null);

    // Call the addBrandCategory API with brandId and categoryIds
    try {
      const result = await Services.getInstance().addBrandCategory(brandId, categoryIds);
      if (result.error) {
        console.error("Error adding categories:", result.error);
      } else {
        console.log("Categories added successfully:", result);
        navigate(`/brandDetails/${brandId}`); // Navigate back to brand details
      }
    } catch (error) {
      console.error("Error while adding categories:", error);
    }
  };

  return (
    <>
      <PageHeader title="Add Suitable Category" />
      <div className="bg-widget flex items-center justify-center w-full py-10 px-4 lg:p-[60px]">
        <Spring className="w-full max-w-[600px]" type="slideUp" duration={400} delay={300}>
          <form className="mt-5 flex flex-col gap-6">
            <div className="relative" ref={dropdownRef}>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Suitable Category <span className="text-red-500">*</span>
              </label>
              <div
                className="border p-3 rounded bg-white cursor-pointer flex justify-between items-center hover:border-blue-400 focus:border-blue-500 transition-all"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className={`text-gray-600 ${selectedCategories.length === 0 ? "text-gray-400" : ""}`}>
                  {selectedCategories.length > 0 ? selectedCategories.join(", ") : "Select categories"}
                </span>
                <span className="text-gray-500">{dropdownOpen ? "▲" : "▼"}</span>
              </div>

              {dropdownOpen && (
                <div className="absolute left-0 right-0 mt-2 border bg-white rounded shadow-lg z-10 py-2">
                  {categoryOptions.length > 0 ? (
                    categoryOptions.map((category) => (
                      <label key={category.id} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer transition">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category.name)}
                          onChange={() => handleCategoryToggle(category.name)}
                        />
                        <span className="text-gray-700">{category.name}</span>
                      </label>
                    ))
                  ) : (
                    <p className="px-4 py-2 text-gray-500">No categories available</p>
                  )}
                </div>
              )}
            </div>

            {/* Selected Categories Display */}
            {selectedCategories.length > 0 && (
              <div className="flex flex-wrap gap-2 bg-gray-50 p-4 rounded border">
                {selectedCategories.map((category) => (
                  <div key={category} className="bg-blue-500 text-white px-3 py-1 rounded-full flex items-center gap-2 transition-all">
                    {category}
                    <button type="button" className="ml-2 text-white hover:text-gray-200" onClick={() => handleRemoveCategory(category)}>
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-center">
              <button type="button" className="btn btn--primary px-12 py-3 text-lg font-medium" onClick={handleAddCategory}>
                Add Category
              </button>
            </div>
          </form>
        </Spring>
      </div>
    </>
  );
};

export default AddSuitableCategory;
