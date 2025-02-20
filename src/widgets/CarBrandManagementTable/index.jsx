import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "../../ui/Select";
import StyledTable from "./styles";
import Empty from "../../components/Empty";
import Pagination from "../../ui/Pagination";
import { useWindowSize } from "react-use";
import { Switch } from "antd";
import usePagination from "../../hooks/usePagination";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import Services from "../../pages/Services/Services"; // Assuming your service is located here

const CarBrandManagementTable = () => {
  const { width } = useWindowSize();
  const navigate = useNavigate();

  const [carBrands, setCarBrands] = useState([]); // State to store the fetched car brands
  const [filteredData, setFilteredData] = useState([]);
  const [brand, setBrand] = useState("all");
  const [editingRowId, setEditingRowId] = useState(null);
  const [editableData, setEditableData] = useState({});
  const pagination = usePagination(filteredData, 17);

  // Fetch car brands from the API
  useEffect(() => {
    const fetchCarBrands = async () => {
      try {
        const { data } = await Services.getInstance().getCarBrands(); // Fetch car brands from the service
        console.log(data); // Log the response to check structure

        // Map the API response to the expected structure
        const mappedData = data.map((brand) => ({
          id: brand.id,
          brandName: brand.name, // Map 'name' to 'brandName'
          brandLogo: `data:image/png;base64,${brand.image}`, // Prepend data URL scheme to base64 image
          status: brand.status,
        }));

        setCarBrands(mappedData); // Set the mapped car brands
        setFilteredData(mappedData); // Initialize filtered data with the mapped car brands
      } catch (error) {
        console.error("Error fetching car brands:", error);
      }
    };

    fetchCarBrands();
  }, []);

  // Clear all filters
  const handleClearFilters = () => {
    setBrand("all");
    setFilteredData(carBrands); // Reset to all car brands when clearing filters
  };

  // Toggle status (active/inactive) for a car brand
  const toggleStatus = async (id) => {
    const carBrandToUpdate = carBrands.find((item) => item.id === id);
    const newStatus = !carBrandToUpdate.status;

    try {
      // Call the updateCarBrandStatus API to update the car brand's status
      const response = await Services.getInstance().updateCarBrandStatus(id, newStatus);
      if (response.error) {
        throw new Error(response.error);
      }

      // If the status is successfully updated, update the local state
      const updatedData = carBrands.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      );
      setCarBrands(updatedData);
      setFilteredData(updatedData);
    } catch (error) {
      console.error("Error updating car brand status:", error);
    }
  };

  // Edit functionality
  // const handleEditClick = (record) => {
  //   setEditingRowId(record.id);
  //   setEditableData({ ...record });
  //   navigate(`/updateCarBrand/${record.id}`);
  //   // Save carBrandId to sessionStorage when editing
  //   sessionStorage.setItem("carBrandId", record.id);
  // };
  const handleEditClick = (record) => {
    navigate(`/updateCarBrand/${record.id}`, { state: { carBrand: record } });
  };

  const handleInputChange = (e, fieldName) => {
    setEditableData({
      ...editableData,
      [fieldName]: e.target.value,
    });
  };

  const handleSave = () => {
    const updatedData = carBrands.map((item) =>
      item.id === editingRowId ? { ...item, ...editableData } : item
    );
    setCarBrands(updatedData);
    setFilteredData(updatedData);
    setEditingRowId(null);
  };

  const handleCancel = () => {
    setEditingRowId(null);
  };

  // Delete functionality
  const handleDelete = (record) => {
    if (window.confirm(`Are you sure you want to delete ${record.brandName}?`)) {
      const updatedData = carBrands.filter((item) => item.id !== record.id);
      setCarBrands(updatedData);
      setFilteredData(updatedData);
    }
  };

  // Navigate to car brand details page and save carBrandId to sessionStorage
  const handleCarBrandClick = (carBrandId) => {
    console.log(carBrandId, "pppppppppppppppp");

    // Save the carBrandId to sessionStorage when navigating
    sessionStorage.setItem("carBrandId", carBrandId);
    navigate(`/carBrandDetails/${carBrandId}`);
  };

  // Filter data by car brand
  useEffect(() => {
    if (brand === "all") {
      setFilteredData(carBrands);
    } else {
      setFilteredData(carBrands.filter((item) => item.brandName === brand));
    }
  }, [brand, carBrands]);

  return (
    <div className="flex flex-col flex-1">
      {/* Filter Options */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-x-6 xl:grid-cols-6 mb-4">
        <Select
          options={carBrands.map((brand) => ({ label: brand.brandName, value: brand.brandName }))}
          value={{ label: brand === "all" ? "All Brands" : brand, value: brand }}
          placeholder="Select Brand"
          onChange={(e) => setBrand(e.value)}
        />
        <div className="grid grid-cols-2 gap-3">
          <button
            className="btn btn--outline blue !h-[44px]"
            onClick={handleClearFilters}
          >
            Clear
          </button>
        </div>
      </div>

      {/* Table or Cards */}
      <div className="flex flex-1 flex-col gap-[22px] mt-4">
        {width >= 768 ? (
          <StyledTable
            columns={[
              {
                title: "Sr. No.",
                dataIndex: "id",
                key: "id",
                align: "center",
                render: (_, __, index) => <span>{index + 1}</span>,
              },
              {
                title: "Brand Name",
                dataIndex: "brandName",
                key: "name",
              },
              {
                title: "Brand Image",
                dataIndex: "brandLogo",
                key: "image",
                align: "center",
                render: (logo) => (
                  <img
                    src={logo}
                    alt="Brand Logo"
                    className="w-[50px] h-[50px] rounded"
                  />
                ),
              },
              {
                title: "Status",
                dataIndex: "status",
                key: "status",
                align: "center",
                render: (status, record) => (
                  <Switch checked={status} onChange={() => toggleStatus(record.id)} />
                ),
              },
              {
                title: "Actions",
                key: "actions",
                align: "center",
                render: (_, record) => (
                  <div className="flex gap-2 justify-center">
                    {/* View Button */}
                     {/* 
      <button
        className="px-3 py-1 text-green-500 hover:text-green-700 flex items-center"
        onClick={() => handleCarBrandClick(record.id)}
      >
        <FaEye className="mr-2" />
      </button>
      */}

                    {/* Edit Button */}
                    <button
                      className="px-3 py-1 text-blue-500 hover:text-blue-700 flex items-center"
                      onClick={() => handleEditClick(record)}
                    >
                      <FaEdit className="mr-2" />
                    </button>

                    {/* Delete Button */}
                    <button
                      className="px-3 py-1 text-red-500 hover:text-red-700 flex items-center"
                      onClick={() => handleDelete(record)}
                    >
                      <FaTrash className="mr-2" />
                    </button>
                  </div>
                ),
              },
            ]}
            dataSource={pagination.currentItems()}
            rowKey={(record) => record.id}
            locale={{
              emptyText: <Empty text="No car brands found" />,
            }}
            pagination={false}
          />
        ) : (
          <div className="flex flex-col gap-5">
            {pagination.currentItems().map((item) => (
              <div className="card" key={`carBrand-${item.id}`}>
                <h6>{item.brandName}</h6>
                <img
                  src={item.brandLogo}
                  alt={item.brandName}
                  className="w-[50px] h-[50px] rounded"
                />
                <Switch checked={item.status} onChange={() => toggleStatus(item.id)} />
                <div className="flex items-center justify-center gap-3">
                  {editingRowId === item.id ? (
                    <>
                      <button
                        className="px-3 py-1 text-green-500 hover:text-green-700"
                        onClick={handleSave}
                      >
                        Save
                      </button>
                      <button
                        className="px-3 py-1 text-gray-500 hover:text-gray-700"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="px-3 py-1 text-blue-500 hover:text-blue-700"
                        onClick={() => handleEditClick(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-3 py-1 text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(item)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination.maxPage > 1 && <Pagination pagination={pagination} />}
      </div>
    </div>
  );
};

export default CarBrandManagementTable;