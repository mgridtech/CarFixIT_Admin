// import React, { useState } from "react";
// import PageHeader from "../layout/PageHeader";
// import Search from "../ui/Search";
// import { CSVLink } from "react-csv";
// import ProductManagementTable from "../widgets/ProductManagementTable";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// const ProductsManagement = () => {
//   const navigate = useNavigate();
//   const [query, setQuery] = useState("");
  
//   // Assuming this is the product data used in your table
//   const { filtersData, oilsData, tireData, batteryData, engineOilData, engineOilPetrolData } =
//     useSelector((state) => state.project);

//   const mergedData = [
//     ...(filtersData?.length > 0 ? filtersData : []),
//     ...(oilsData?.length > 0 ? oilsData : []),
//     ...(tireData?.length > 0 ? tireData : []),
//     ...(batteryData?.length > 0 ? batteryData : []),
//     ...(engineOilData?.length > 0 ? engineOilData : []),
//     ...(engineOilPetrolData?.length > 0 ? engineOilPetrolData : []),
//   ];

//   // Filter data based on query
//   const filteredData = mergedData?.filter(
//     (dat) =>
//       `${dat?.productNameArab}`
//         .toLowerCase()
//         .includes(`${query}`.toLowerCase()) ||
//       `${dat?.productNameEng}`
//         .toLowerCase()
//         .includes(`${query}`.toLowerCase())
//   );

//   // Prepare CSV Data for exporting
// // Prepare CSV Data for exporting
// const csvData = [
//   [
//     "Product Id", 
//     "Name (English)", 
//     "Name (Arabic)", 
//     "Original Price", 
//     "Commercial Price", 
//     "Type", 
//     "Warranty", 
//     "Dimensions"
//   ], // CSV Header
//   ...filteredData.map((product) => [
//     product?.skuId || product?.dbId || "N/A",   // Product Id (skuId or dbId)
//     product?.productNameEng || "N/A",           // Name (English)
//     product?.productNameArab || "N/A",          // Name (Arabic)
//     product?.originalPrice || "N/A",            // Original Price
//     product?.commercialPrice || "N/A",          // Commercial Price (if available)
//     product?.reference === "Oils" ? "Oil" :
//     product?.reference === "Filters" ? "Filter" :
//     product?.reference === "Tyres" ? "Tyre" :
//     product?.reference === "batteries" ? "Battery" :
//     product?.reference === "engineOil" ? "Engine Oil" : "-",  // Type
//     product?.warenty || 0,                      // Warranty
//     product?.productDiemensions?.length > 0 
//       ? product?.productDiemensions.map(d => 
//           `English: ${d?.nameEng || "N/A"}, Arabic: ${d?.nameArab || "N/A"}, Value: ${d?.value || "N/A"}`  // Display nameEng, nameArab, and value
//         ).join(" | ") 
//       : "N/A"                                   // Handle missing dimensions
//   ])
// ];


//   return (
//     <>
//       <PageHeader title="Products Management" />
//       <div className="flex flex-col-reverse gap-4 mb-5 md:flex-col lg:flex-row lg:justify-between">
//         <div className="flex flex-col gap-4 md:flex-row md:gap-[14px]">
//           <button
//             onClick={() => navigate("/addProducts")}
//             className="btn btn--primary"
//           >
//             Add new product <i className="icon-circle-plus-regular" />
//           </button>
//           <CSVLink 
//             className="btn btn--outline blue !h-[44px]" 
//             data={csvData}
//             filename={"products.csv"}
//           >
//             Export CSV <i className="icon-file-export-solid" />
//           </CSVLink>
//         </div>
//         <Search
//           wrapperClass="lg:w-[326px]"
//           placeholder="Search Product"
//           query={query}
//           setQuery={setQuery}
//         />
//       </div>
//       <ProductManagementTable searchQuery={query} setSearchQuery={setQuery} />
//     </>
//   );
// };

// export default ProductsManagement;
