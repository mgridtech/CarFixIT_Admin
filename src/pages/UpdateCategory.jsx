import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import PageHeader from "../layout/PageHeader";
import Spring from "../components/Spring";
import { Switch } from "antd";

const UpdateCategory = () => {
  const navigate = useNavigate(); // Initialize navigate hook
  const [categoryData, setCategoryData] = useState({
    id: "",
    name: "",
    promo: "",
    image: "",
    status: false,
  });

  useEffect(() => {
    // Simulate fetching data; replace with actual API call
    const fetchCategoryData = async () => {
      const id = window.location.pathname.split("/").pop();
      const fetchedData = {
        id,
        name: "Filters",
        promo: "Promo 1",
        image: "https://via.placeholder.com/150",
        status: true,
      };
      setCategoryData(fetchedData);
    };

    fetchCategoryData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setCategoryData((prev) => ({ ...prev, image: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleStatusToggle = (checked) => {
    setCategoryData((prev) => ({ ...prev, status: checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Category Data: ", categoryData);

    // After updating the category, navigate to the /category-management page
    navigate("/category-management");
  };

  return (
    <>
      <PageHeader title="Update Category" />
      <div className="bg-widget flex items-center justify-center w-full py-10 px-4 lg:p-[60px]">
        <Spring
          className="w-full max-w-[560px]"
          type="slideUp"
          duration={400}
          delay={300}
        >
          <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-5">
            <div className="field-wrapper">
              <label htmlFor="id" className="field-label">
                Category ID
              </label>
              <input
                className="field-input"
                readOnly
                id="id"
                type="text"
                value={categoryData.id}
              />
            </div>

            <div className="field-wrapper">
              <label htmlFor="name" className="field-label">
                Category Name
              </label>
              <input
                className="field-input"
                required
                id="name"
                type="text"
                placeholder="Enter category name"
                value={categoryData.name}
                onChange={handleInputChange} // Bind to handleInputChange
                name="name" // Ensure name is correctly bound
              />
            </div>

            <div className="field-wrapper">
              <label htmlFor="promo" className="field-label">
                Promo
              </label>
              <input
                className="field-input"
                id="promo"
                type="text"
                placeholder="Enter promo details"
                value={categoryData.promo}
                onChange={handleInputChange} // Bind to handleInputChange
                name="promo" // Ensure name is correctly bound
              />
            </div>

            <div className="field-wrapper">
              <label htmlFor="image" className="field-label">
                Category Image
              </label>
              <div className="flex items-center gap-4">
                <img
                  src={categoryData.image || "https://via.placeholder.com/50"}
                  alt="Category"
                  className="w-16 h-16 rounded border"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full border border-input-border rounded px-4 py-2"
                />
              </div>
            </div>

            {/* Status Toggle Switch */}
            <div className="field-wrapper">
              <label htmlFor="status" className="field-label">
                Status
              </label>
              <div className="flex items-center gap-4">
                <span className="text-sm">{categoryData.status ? "Active" : "Inactive"}</span>
                <Switch
                  checked={categoryData.status}
                  onChange={handleStatusToggle}
                  className="status-switch"
                />
              </div>
            </div>

            <div className="flex flex-col items-center gap-6 mt-4 mb-10">
              <button type="submit" className="btn btn--primary w-full">
                Update Category
              </button>
            </div>
          </form>
        </Spring>
      </div>
    </>
  );
};

export default UpdateCategory;
