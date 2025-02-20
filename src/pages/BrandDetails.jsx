import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import PageHeader from "../layout/PageHeader";
import Search from "../ui/Search";
import BrandDetailsTable from "../widgets/BrandDetailsTable"; 

const BrandDetails = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [brandId, setBrandId] = useState(null);

  // Use useEffect to fetch the brandId from sessionStorage when the component mounts
  useEffect(() => {
    const storedBrandId = sessionStorage.getItem("brandId");  // Retrieve the brandId from sessionStorage
    if (storedBrandId) {
      setBrandId(storedBrandId);  // Set the brandId to state
    } else {
      console.log("No brand ID found in sessionStorage.");
    }
  }, []);  // The empty dependency array ensures this runs once when the component mounts

  const handleAddSuitableCategoryClick = () => {
    if (brandId) {
      navigate(`/brandDetails/${brandId}/add-suitableCategory`);  // Use the brandId to navigate
    } else {
      console.log("No brand ID available.");
    }
  };

  return (
    <>
      <PageHeader title="Brand Details" />
      <div className="flex flex-col-reverse gap-4 mb-5 md:flex-col lg:flex-row lg:justify-between">
        <div className="flex flex-col gap-4 md:flex-row md:gap-[14px]">
          <button
            onClick={handleAddSuitableCategoryClick}  // Triggered on button click
            className="btn btn--primary"
          >
            Add Suitable Category <i className="icon-circle-plus-regular" />
          </button>
        </div>
        <Search
          wrapperClass="lg:w-[326px]"
          placeholder="Search Brand Details"
          query={searchQuery}
          setQuery={setSearchQuery}
        />
      </div>
      <BrandDetailsTable searchQuery={searchQuery} />
    </>
  );
};

export default BrandDetails;
