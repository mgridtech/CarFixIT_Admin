import React, { useState } from "react";
import PageHeader from "../layout/PageHeader";
import Search from "../ui/Search";
import { useNavigate, useParams } from "react-router-dom";
import { CSVLink } from "react-csv";
import CarByModelManagementTable from "../widgets/CarByModelManagement";

const CarByModelManagement = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { modelId } = useParams();
  console.log('222', modelId);
  // Static car model data for export
  const carModelsData = [
    {
      id: 1,
      brand: "Toyota",
      model: "Corolla",
      year: 2022,
      status: "Active",
    },
    {
      id: 2,
      brand: "BMW",
      model: "X5",
      year: 2023,
      status: "Inactive",
    },
    {
      id: 3,
      brand: "Ford",
      model: "Mustang",
      year: 2021,
      status: "Active",
    },
    {
      id: 4,
      brand: "Honda",
      model: "Civic",
      year: 2022,
      status: "Active",
    },
  ];

  const csvData = [
    ["Model Id", "Brand", "Model", "Year", "Status"],
    ...carModelsData.map((car) => [car.id, car.brand, car.model, car.year, car.status]),
  ];

  return (
    <>
      <PageHeader title="Car By Model Management" />
      <div className="flex flex-col-reverse gap-4 mb-5 md:flex-col lg:flex-row lg:justify-between">
        <div className="flex flex-col gap-4 md:flex-row md:gap-[14px]">
          <button
        onClick={() => navigate(`/adminCar/${modelId}/addcarbymodel`)}
            className="btn btn--primary"
          >
            Add new car <i className="icon-circle-plus-regular" />
          </button>
          <CSVLink
            className="btn btn--outline blue !h-[44px]"
            data={csvData}
            filename={"car_models.csv"}
          >
            Export CSV <i className="icon-file-export-solid" />
          </CSVLink>
        </div>
        <Search
          wrapperClass="lg:w-[326px]"
          placeholder="Search Car Model"
          query={searchQuery}
          setQuery={setSearchQuery}
        />
      </div>
      <CarByModelManagementTable searchQuery={searchQuery} />
    </>
  );
};

export default CarByModelManagement;
