import React, { useState } from "react";
import PageHeader from "../layout/PageHeader";
import Search from "../ui/Search";
import { useNavigate } from "react-router-dom";
// import { CSVLink } from "react-csv";
import BrandDetailsTable from "../widgets/BrandDetailsTable"; // Placeholder for the table component

const BrandDetails = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <PageHeader title="Brand Details" />
      <div className="flex flex-col-reverse gap-4 mb-5 md:flex-col lg:flex-row lg:justify-between">
        <div className="flex flex-col gap-4 md:flex-row md:gap-[14px]">
          <button
            onClick={() => navigate("/addCategory")}
            className="btn btn--primary"
          >
            Add New Category <i className="icon-circle-plus-regular" />
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
