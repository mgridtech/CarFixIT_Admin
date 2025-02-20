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

const CarModelManagementTable = () => {
  const { width } = useWindowSize();
  const navigate = useNavigate();

  const [carModels, setCarModels] = useState([]); // State to store the fetched car models
  const [filteredData, setFilteredData] = useState([]);
  const [brand, setBrand] = useState("all");
  const [editingRowId, setEditingRowId] = useState(null);
  const [editableData, setEditableData] = useState({});
  const pagination = usePagination(filteredData, 17);

  // Fetch car models from the API
  useEffect(() => {
    const fetchCarModels = async () => {
      try {
        const { data } = await Services.getInstance().getCarModels(); // Fetch car models from the service
        console.log(data); // Log the response to check structure

        // Map the API response to the expected structure
        const mappedData = data.map((model) => ({
          id: model.id,
          brand: model.brandName, // Map 'brandName' to 'brand'
          model: model.name, // Map 'name' to 'model'
          carImage: model.image ? `data:image/png;base64,${model.image}` : "https://via.placeholder.com/150", // Provide a fallback image if 'image' is empty
          status: model.status,
        }));

        setCarModels(mappedData); // Set the mapped car models
        setFilteredData(mappedData); // Initialize filtered data with the mapped car models
      } catch (error) {
        console.error("Error fetching car models:", error);
      }
    };

    fetchCarModels();
  }, []);

  // Clear all filters
  const handleClearFilters = () => {
    setBrand("all");
    setFilteredData(carModels); // Reset to all car models when clearing filters
  };

  // Toggle status (active/inactive) for a car model
  const toggleStatus = async (id) => {
    const carModelToUpdate = carModels.find((item) => item.id === id);
    const newStatus = !carModelToUpdate.status;

    try {
      // Call the updateCarModelStatus API to update the car model's status
      const response = await Services.getInstance().updateCarModelStatus(id, newStatus);
      if (response.error) {
        throw new Error(response.error);
      }

      // If the status is successfully updated, update the local state
      const updatedData = carModels.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      );
      setCarModels(updatedData);
      setFilteredData(updatedData);
    } catch (error) {
      console.error("Error updating car model status:", error);
    }
  };

  // Edit functionality
  const handleEditClick = (record) => {
    navigate(`/updateCarModel/${record.id}`, { 
      state: { 
        carModel: {
          brand: record.brand,
          model: record.model,
          carImage: record.carImage,
          selectedYears: record.selectedYears || [], // Add this if you have years data
          status: record.status
        } 
      } 
    });
  };

  // Delete functionality
  const handleDelete = (record) => {
    if (window.confirm(`Are you sure you want to delete ${record.model}?`)) {
      const updatedData = carModels.filter((item) => item.id !== record.id);
      setCarModels(updatedData);
      setFilteredData(updatedData);
    }
  };

  // Navigate to car model details page
  const handleCarModelClick = (carModelId) => {
    navigate(`/adminCar/${carModelId}/CarsByModel`);
  };
  

  // Filter data by car brand
  useEffect(() => {
    if (brand === "all") {
      setFilteredData(carModels);
    } else {
      setFilteredData(carModels.filter((item) => item.brand === brand));
    }
  }, [brand, carModels]);

  return (
    <div className="flex flex-col flex-1">
      {/* Filter Options */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-x-6 xl:grid-cols-6 mb-4">
        <Select
          options={carModels.map((model) => ({ label: model.brand, value: model.brand }))}
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
                title: "Brand",
                dataIndex: "brand",
                key: "brand",
              },
              {
                title: "Model",
                dataIndex: "model",
                key: "model",
              },
              {
                title: "Car Image",
                dataIndex: "carImage",
                key: "carImage",
                align: "center",
                render: (image) => (
                  <img
                    src={image}
                    alt="Car"
                    className="w-[50px] h-[50px] object-cover rounded"
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
                    <button
                      className="px-3 py-1 text-green-500 hover:text-green-700 flex items-center"
                      onClick={() => handleCarModelClick(record.id)}
                    >
                      <FaEye className="mr-2" />
                    </button>

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
              emptyText: <Empty text="No car models found" />,
            }}
            pagination={false}
          />
        ) : (
          <div className="flex flex-col gap-5">
            {pagination.currentItems().map((item) => (
              <div className="card" key={`carModel-${item.id}`}>
                <h6>{item.model}</h6>
                <p>Brand: {item.brand}</p>
                <img
                  src={item.carImage}
                  alt={item.model}
                  className="w-[50px] h-[50px] rounded"
                />
                <Switch checked={item.status} onChange={() => toggleStatus(item.id)} />
                <div className="flex items-center justify-center gap-3">
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

export default CarModelManagementTable;