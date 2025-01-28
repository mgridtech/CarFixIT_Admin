import React, { useState } from "react";
import PageHeader from "../layout/PageHeader";
import Search from "../ui/Search";
import { useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
import BrandManagementTable from "../widgets/BrandManagementTable";

const BrandManagement = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Static brand data for export
  const brandsData = [
    {
      id: 1,
      nameEng: "Toyota",
      nameArab: "تويوتا",
      description: "Reliable and durable vehicles",
    },
    {
      id: 2,
      nameEng: "BMW",
      nameArab: "بي إم دبليو",
      description: "Luxury cars with high performance",
    },
    {
      id: 3,
      nameEng: "Ford",
      nameArab: "فورد",
      description: "Innovative and powerful vehicles",
    },
    {
      id: 4,
      nameEng: "Honda",
      nameArab: "هوندا",
      description: "Efficient and fuel-saving cars",
    },
  ];

  const csvData = [
    ["Brand Id", "Name (English)", "Name (Arabic)", "Description"],
    ...brandsData.map((brand) => [
      brand.id,
      brand.nameEng,
      brand.nameArab,
      brand.description,
    ]),
  ];

  return (
    <>
      <PageHeader title="Brand Management" />
      <div className="flex flex-col-reverse gap-4 mb-5 md:flex-col lg:flex-row lg:justify-between">
        <div className="flex flex-col gap-4 md:flex-row md:gap-[14px]">
          <button
            onClick={() => navigate("/addBrand")}
            className="btn btn--primary"
          >
            Add new brand <i className="icon-circle-plus-regular" />
          </button>
          <CSVLink
            className="btn btn--outline blue !h-[44px]"
            data={csvData}
            filename={"brands.csv"}
          >
            Export CSV <i className="icon-file-export-solid" />
          </CSVLink>
        </div>
        <Search
          wrapperClass="lg:w-[326px]"
          placeholder="Search Brand"
          query={searchQuery}
          setQuery={setSearchQuery}
        />
      </div>
      <BrandManagementTable searchQuery={searchQuery} />
    </>
  );
};

export default BrandManagement;
