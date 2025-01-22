import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../layout/PageHeader";
import Spring from "../components/Spring";
import { Switch } from "antd";

const UpdateBrandDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Extracting the id from the URL
  const [brandData, setBrandData] = useState({
    id: "",
    brandName: "",
    categoryName: "",
    status: false,
    logo: "",
  });

  useEffect(() => {
    // Simulate fetching brand data (replace with API call)
    const fetchBrandData = async () => {
      const fetchedData = {
        id,
        brandName: "Brand A",
        categoryName: "Category A",
        status: true,
        logo: "https://via.placeholder.com/150",
      };
      setBrandData(fetchedData);
    };

    fetchBrandData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBrandData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setBrandData((prev) => ({ ...prev, logo: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleStatusToggle = (checked) => {
    setBrandData((prev) => ({ ...prev, status: checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Brand Data: ", brandData);

    // After updating the brand, navigate to the /brand-management page
    navigate("/brand-management");
  };

  return (
    <>
      <PageHeader title="Update Brand Details" />
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
                Brand ID
              </label>
              <input
                className="field-input"
                readOnly
                id="id"
                type="text"
                value={brandData.id}
              />
            </div>

            <div className="field-wrapper">
              <label htmlFor="brandName" className="field-label">
                Brand Name
              </label>
              <input
                className="field-input"
                required
                id="brandName"
                type="text"
                placeholder="Enter brand name"
                value={brandData.brandName}
                onChange={handleInputChange}
                name="brandName"
              />
            </div>

            <div className="field-wrapper">
              <label htmlFor="categoryName" className="field-label">
                Category Name
              </label>
              <input
                className="field-input"
                required
                id="categoryName"
                type="text"
                placeholder="Enter category name"
                value={brandData.categoryName}
                onChange={handleInputChange}
                name="categoryName"
              />
            </div>

            <div className="field-wrapper">
              <label htmlFor="logo" className="field-label">
                Brand Logo
              </label>
              <div className="flex items-center gap-4">
                <img
                  src={brandData.logo || "https://via.placeholder.com/50"}
                  alt="Brand"
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
                <span className="text-sm">{brandData.status ? "Active" : "Inactive"}</span>
                <Switch
                  checked={brandData.status}
                  onChange={handleStatusToggle}
                  className="status-switch"
                />
              </div>
            </div>

            <div className="flex flex-col items-center gap-6 mt-4 mb-10">
              <button type="submit" className="btn btn--primary w-full">
                Update Brand
              </button>
            </div>
          </form>
        </Spring>
      </div>
    </>
  );
};

export default UpdateBrandDetails;
