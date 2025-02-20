import React, { useState } from "react";
import PageHeader from "../layout/PageHeader";
import Search from "../ui/Search";
import { useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
import CarModelManagementTable from "../widgets/CarModelManagementTable";

const CarModelManagement = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Static car model data for export
  const carModelsData = [
    {
      id: 1,
      nameEng: "Corolla",
      brand: "Toyota",
      year: 2022,
      description: "A compact and efficient car.",
    },
    {
      id: 2,
      nameEng: "3 Series",
      brand: "BMW",
      year: 2023,
      description: "Luxury sedan with premium features.",
    },
    {
      id: 3,
      nameEng: "Mustang",
      brand: "Ford",
      year: 2021,
      description: "High-performance sports car.",
    },
    {
      id: 4,
      nameEng: "Civic",
      brand: "Honda",
      year: 2022,
      description: "Reliable and fuel-efficient.",
    },
  ];

  const csvData = [
    ["Model Id", "Name (English)", "Brand", "Year", "Description"],
    ...carModelsData.map((model) => [
      model.id,
      model.nameEng,
      model.brand,
      model.year,
      model.description,
    ]),
  ];

  return (
    <>
      <PageHeader title="Car Model Management" />
      <div className="flex flex-col-reverse gap-4 mb-5 md:flex-col lg:flex-row lg:justify-between">
        <div className="flex flex-col gap-4 md:flex-row md:gap-[14px]">
          <button
            onClick={() => navigate("/addCarModel")}
            className="btn btn--primary"
          >
            Add new model <i className="icon-circle-plus-regular" />
          </button>
          <CSVLink
            className="btn btn--outline blue !h-[44px]"
            data={csvData}
            filename={"car-models.csv"}
          >
            Export CSV <i className="icon-file-export-solid" />
          </CSVLink>
        </div>
        <Search
          wrapperClass="lg:w-[326px]"
          placeholder="Search Model"
          query={searchQuery}
          setQuery={setSearchQuery}
        />
      </div>
      <CarModelManagementTable searchQuery={searchQuery} />
    </>
  );
};

export default CarModelManagement;