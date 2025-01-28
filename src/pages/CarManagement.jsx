import React, { useState } from "react";
import PageHeader from "../layout/PageHeader";
import Search from "../ui/Search";
import { useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
import CarManagementTable from "../widgets/CarManagementTable";

const CarManagement = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Static car data for export
  const carsData = [
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
    ["Car Id", "Name (English)", "Brand", "Year", "Description"],
    ...carsData.map((car) => [
      car.id,
      car.nameEng,
      car.brand,
      car.year,
      car.description,
    ]),
  ];

  return (
    <>
      <PageHeader title="Car Management" />
      <div className="flex flex-col-reverse gap-4 mb-5 md:flex-col lg:flex-row lg:justify-between">
        <div className="flex flex-col gap-4 md:flex-row md:gap-[14px]">
          <button
            onClick={() => navigate("/addCar")}
            className="btn btn--primary"
          >
            Add new car <i className="icon-circle-plus-regular" />
          </button>
          <button
          onClick={() => navigate("/addCarBrand")}
          className="btn btn--primary"
        >
          Add new brand <i className="icon-circle-plus-regular" />
        </button>
          <CSVLink
            className="btn btn--outline blue !h-[44px]"
            data={csvData}
            filename={"cars.csv"}
          >
            Export CSV <i className="icon-file-export-solid" />
          </CSVLink>
        </div>
        <Search
          wrapperClass="lg:w-[326px]"
          placeholder="Search Car"
          query={searchQuery}
          setQuery={setSearchQuery}
        />
      </div>
      <CarManagementTable searchQuery={searchQuery} />
    </>
  );
};

export default CarManagement;
