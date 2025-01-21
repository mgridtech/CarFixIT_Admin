import React, { useState } from "react";
import PageHeader from "../layout/PageHeader";
import Search from "../ui/Search";
import { useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
import ProductManagementTable from "../widgets/ProductManagementTable";

const ProductsManagement = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Static product data for export
  const productsData = [
    {
      id: 1,
      name: "Oil Filter",
      category: "Filters",
      description: "High-quality oil filter for efficient performance",
    },
    {
      id: 2,
      name: "Car Battery",
      category: "Batteries",
      description: "Long-lasting and durable car battery",
    },
    {
      id: 3,
      name: "Engine Oil",
      category: "Oils",
      description: "Premium engine oil for smooth operation",
    },
    {
      id: 4,
      name: "Brake Pads",
      category: "Brakes",
      description: "Reliable brake pads for safety and control",
    },
  ];

  const csvData = [
    ["Product Id", "Name", "Category", "Description"],
    ...productsData.map((product) => [
      product.id,
      product.name,
      product.category,
      product.description,
    ]),
  ];

  return (
    <>
      <PageHeader title="Products Management" />
      <div className="flex flex-col-reverse gap-4 mb-5 md:flex-col lg:flex-row lg:justify-between">
      <div className="flex flex-col gap-4 md:flex-row md:gap-[14px]">
      <button
        onClick={() => navigate("/addProducts")}
        className="btn btn--primary"
      >
        Add new product <i className="icon-circle-plus-regular" />
      </button>
      <CSVLink 
        className="btn btn--outline blue !h-[44px]" 
        data={csvData}
        filename={"products.csv"}
      >
        Export CSV <i className="icon-file-export-solid" />
      </CSVLink>
    </div>
        <Search
          wrapperClass="lg:w-[326px]"
          placeholder="Search Product"
          query={searchQuery}
          setQuery={setSearchQuery}
        />
      </div>
      <ProductManagementTable searchQuery={searchQuery} />
    </>
  );
};

export default ProductsManagement;
