import React, { useState } from "react";
import PageHeader from "../layout/PageHeader";
import Search from "../ui/Search";
import { useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
import CarBrandManagementTable from "../widgets/CarBrandManagementTable";

const CarBrandManagement = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Static car brand data for export
  const carBrandsData = [
    {
      id: 1,
      nameEng: "Toyota",
      country: "Japan",
      foundedYear: 1937,
      description: "Leading automotive manufacturer.",
    },
    {
      id: 2,
      nameEng: "BMW",
      country: "Germany",
      foundedYear: 1916,
      description: "Luxury vehicles and motorcycles.",
    },
    {
      id: 3,
      nameEng: "Ford",
      country: "USA",
      foundedYear: 1903,
      description: "American multinational automaker.",
    },
    {
      id: 4,
      nameEng: "Honda",
      country: "Japan",
      foundedYear: 1948,
      description: "Manufacturer of automobiles and motorcycles.",
    },
  ];

  const csvData = [
    ["Brand Id", "Name (English)", "Country", "Founded Year", "Description"],
    ...carBrandsData.map((brand) => [
      brand.id,
      brand.nameEng,
      brand.country,
      brand.foundedYear,
      brand.description,
    ]),
  ];

  return (
    <>
      <PageHeader title="Car Brand Management" />
      <div className="flex flex-col-reverse gap-4 mb-5 md:flex-col lg:flex-row lg:justify-between">
        <div className="flex flex-col gap-4 md:flex-row md:gap-[14px]">
          <button
            onClick={() => navigate("/addCarBrand")}
            className="btn btn--primary"
          >
            Add new brand <i className="icon-circle-plus-regular" />
          </button>
          <CSVLink
            className="btn btn--outline blue !h-[44px]"
            data={csvData}
            filename={"car-brands.csv"}
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
      <CarBrandManagementTable searchQuery={searchQuery} />
    </>
  );
};

export default CarBrandManagement;