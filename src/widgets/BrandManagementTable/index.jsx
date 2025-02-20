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

const BrandManagementTable = () => {
  const { width } = useWindowSize();
  const navigate = useNavigate();

  const [brands, setBrands] = useState([]); // State to store the fetched brands
  const [filteredData, setFilteredData] = useState([]);
  const [brand, setBrand] = useState("all");
  const [editingRowId, setEditingRowId] = useState(null);
  const [editableData, setEditableData] = useState({});
  const pagination = usePagination(filteredData, 17);

  // Fetch brands from the API
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const { data } = await Services.getInstance().getBrands(); // Fetch brands from the service
        console.log(data); // Log the response to check structure
        setBrands(data); // Set the fetched brands
        setFilteredData(data); // Initialize filtered data with the fetched brands
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchBrands();
  }, []);

  // Clear all filters
  const handleClearFilters = () => {
    setBrand("all");
    setFilteredData(brands); // Reset to all brands when clearing filters
  };

  // Toggle status (active/inactive) for a brand
  const toggleStatus = async (id) => {
    const brandToUpdate = brands.find((item) => item.id === id);
    const newStatus = !brandToUpdate.status;

    try {
      // Call the updateBrandStatus API to update the brand's status
      const response = await Services.getInstance().updateBrandStatus(id, newStatus);
      if (response.error) {
        throw new Error(response.error);
      }

      // If the status is successfully updated, update the local state
      const updatedData = brands.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      );
      setBrands(updatedData);
      setFilteredData(updatedData);
    } catch (error) {
      console.error("Error updating brand status:", error);
    }
  };

  // Edit functionality
  // const handleEditClick = (record) => {
  //   setEditingRowId(record.id);
  //   setEditableData({ ...record });
  //   navigate(`/updateBrand/${record.id}`);
  //   // Save brandId to sessionStorage when editing
  //   sessionStorage.setItem("brandId", record.id);
  // };
  const handleEditClick = (record) => {
    navigate(`/update/${record.id}/brand/`, { state: { brand: record } });
  };

  const handleInputChange = (e, fieldName) => {
    setEditableData({
      ...editableData,
      [fieldName]: e.target.value,
    });
  };

  const handleSave = () => {
    const updatedData = brands.map((item) =>
      item.id === editingRowId ? { ...item, ...editableData } : item
    );
    setBrands(updatedData);
    setFilteredData(updatedData);
    setEditingRowId(null);
  };

  const handleCancel = () => {
    setEditingRowId(null);
  };

  // Delete functionality
  const handleDelete = (record) => {
    if (window.confirm(`Are you sure you want to delete ${record.bName}?`)) {
      const updatedData = brands.filter((item) => item.id !== record.id);
      setBrands(updatedData);
      setFilteredData(updatedData);
    }
  };

  // Navigate to brand details page and save brandId to sessionStorage
  const handleBrandClick = (brandId) => {
    console.log(brandId,"pppppppppppppppp");
    
    // Save the brandId to sessionStorage when navigating
    sessionStorage.setItem("brandId", brandId);
    navigate(`/brandDetails/${brandId}`);
  };

  // Filter data by brand
  useEffect(() => {
    if (brand === "all") {
      setFilteredData(brands);
    } else {
      setFilteredData(brands.filter((item) => item.bName === brand));
    }
  }, [brand, brands]);

  return (
    <div className="flex flex-col flex-1">
      {/* Filter Options */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-x-6 xl:grid-cols-6 mb-4">
        <Select
          options={brands.map((brand) => ({ label: brand.bName, value: brand.bName }))}
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
                dataIndex: "bName",
                key: "bName",
              },
              {
                title: "Brand Image",
                dataIndex: "imagedata",
                key: "imagedata",
                align: "center",
                render: (logo) => {
                  const imageSrc = `data:image/jpeg;base64,${logo}`; // Adjust MIME type if necessary
                  return (
                    <img
                      src={imageSrc}
                      alt="Brand Logo"
                      className="w-[50px] h-[50px] rounded"
                    />
                  );
                },
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
                      onClick={()=>handleBrandClick(record.id)} // Adjust route as needed
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
              emptyText: <Empty text="No brands found" />,
            }}
            pagination={false}
          />
        ) : (
          <div className="flex flex-col gap-5">
            {pagination.currentItems().map((item) => (
              <div className="card" key={`brand-${item.id}`}>
                <h6>{item.bName}</h6>
                {/* Render base64 image here */}
                <img
                  src={`data:image/jpeg;base64,${item.imagedata}`} // Adjust MIME type if necessary
                  alt={item.bName}
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

export default BrandManagementTable;
