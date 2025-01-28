import React, { useState } from "react";
import PageHeader from "../layout/PageHeader";
import Search from "../ui/Search";
import { useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
import CategoryManagementTable from "../widgets/CategoryManagementTable";

const CategoryManagement = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Static category data for export
  const categoriesData = [
    {
      id: 1,
      nameEng: "Filters",
      nameArab: "الفلاتر",
      description: "High-quality filters for all car types",
    },
    {
      id: 2,
      nameEng: "Oils",
      nameArab: "الزيوت",
      description: "Premium oils for engine performance",
    },
    {
      id: 3,
      nameEng: "Batteries",
      nameArab: "البطاريات",
      description: "Durable and long-lasting batteries",
    },
    {
      id: 4,
      nameEng: "Tyres",
      nameArab: "الإطارات",
      description: "Wide range of tyres for various vehicles",
    },
  ];

  const csvData = [
    ["Category Id", "Name (English)", "Name (Arabic)", "Description"],
    ...categoriesData.map((category) => [
      category.id,
      category.nameEng,
      category.nameArab,
      category.description,
    ]),
  ];

  return (
    <>
      <PageHeader title="Category Management" />
      <div className="flex flex-col-reverse gap-4 mb-5 md:flex-col lg:flex-row lg:justify-between">
        <div className="flex flex-col gap-4 md:flex-row md:gap-[14px]">
          <button
            onClick={() => navigate("/addCategory")}
            className="btn btn--primary"
          >
            Add new category <i className="icon-circle-plus-regular" />
          </button>
          <CSVLink
            className="btn btn--outline blue !h-[44px]"
            data={csvData}
            filename={"categories.csv"}
          >
            Export CSV <i className="icon-file-export-solid" />
          </CSVLink>
        </div>
        <Search
          wrapperClass="lg:w-[326px]"
          placeholder="Search Category"
          query={searchQuery}
          setQuery={setSearchQuery}
        />
      </div>
      <CategoryManagementTable searchQuery={searchQuery} />
    </>
  );
};

export default CategoryManagement;