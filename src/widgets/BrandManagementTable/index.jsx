import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "../../ui/Select";
import StyledTable from "./styles";
import Empty from "../../components/Empty";
import Pagination from "../../ui/Pagination";
import { useWindowSize } from "react-use";
import { BRAND_OPTIONS } from "../../constants/options"; // Brand filter options
import { Switch } from "antd";
import usePagination from "../../hooks/usePagination";
import {  FaEdit, FaTrash } from "react-icons/fa";


const BrandManagementTable = () => {
  const { width } = useWindowSize();
  const navigate = useNavigate();

  // Static brand data
  const [staticData, setStaticData] = useState([
    {
      id: 1,
      name: "Brand A",
      logo: "https://via.placeholder.com/50",
      promo: "Promo A",
      status: true,
    },
    {
      id: 2,
      name: "Brand B",
      logo: "https://via.placeholder.com/50",
      promo: "Promo B",
      status: false,
    },
    {
      id: 3,
      name: "Brand C",
      logo: "https://via.placeholder.com/50",
      promo: "Promo C",
      status: true,
    },
  ]);

  const [filteredData, setFilteredData] = useState(staticData);
  const [brand, setBrand] = useState("all");
  const [editingRowId, setEditingRowId] = useState(null);
  const [editableData, setEditableData] = useState({});
  const pagination = usePagination(filteredData, 10);

  // Clear all filters
  const handleClearFilters = () => {
    setBrand("all");
    setFilteredData(staticData);
  };

  // Toggle status (active/inactive) for a brand
  const toggleStatus = (id) => {
    const updatedData = staticData.map((item) =>
      item.id === id ? { ...item, status: !item.status } : item
    );
    setStaticData(updatedData);
    setFilteredData(updatedData);
  };

  // Edit functionality
  const handleEditClick = (record) => {
    setEditingRowId(record.id);
    setEditableData({ ...record });
  };

  const handleInputChange = (e, fieldName) => {
    setEditableData({
      ...editableData,
      [fieldName]: e.target.value,
    });
  };

  const handleSave = () => {
    const updatedData = staticData.map((item) =>
      item.id === editingRowId ? { ...item, ...editableData } : item
    );
    setStaticData(updatedData);
    setFilteredData(updatedData);
    setEditingRowId(null);
  };

  const handleCancel = () => {
    setEditingRowId(null);
  };

  // Delete functionality
  const handleDelete = (record) => {
    if (window.confirm(`Are you sure you want to delete ${record.name}?`)) {
      const updatedData = staticData.filter((item) => item.id !== record.id);
      setStaticData(updatedData);
      setFilteredData(updatedData);
    }
  };

  // Navigate to brand details page
  const handleBrandClick = (brandId) => {
    navigate(`/brandDetails/${brandId}`);
  };

  // Filter data by brand
  useEffect(() => {
    if (brand === "all") {
      setFilteredData(staticData);
    } else {
      setFilteredData(staticData.filter((item) => item.name === brand));
    }
  }, [brand, staticData]);

  return (
    <div className="flex flex-col flex-1">
      {/* Filter Options */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-x-6 xl:grid-cols-6 mb-4">
        <Select
          options={BRAND_OPTIONS}
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
                render: (_, __, index) => (
                  <span>{pagination.pageIndex * 10 + index + 1}</span>
                ),
              },
              {
                title: "Brand Name",
                dataIndex: "name",
                key: "name",
                render: (text, record) => (
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => handleBrandClick(record.id)}
                  >
                    {editingRowId === record.id ? (
                      <input
                        type="text"
                        value={editableData.name}
                        onChange={(e) => handleInputChange(e, "name")}
                        className="border p-1"
                      />
                    ) : (
                      text
                    )}
                  </button>
                ),
              },
              {
                title: "Promotion",
                dataIndex: "promo",
                key: "promo",
                align: "center",
                render: (promo, record) => (
                  <span>
                    {editingRowId === record.id ? (
                      <input
                        type="text"
                        value={editableData.promo}
                        onChange={(e) => handleInputChange(e, "promo")}
                        className="border p-1"
                      />
                    ) : (
                      promo
                    )}
                  </span>
                ),
              },
              {
                title: "Brand Image",
                dataIndex: "logo",
                key: "logo",
                align: "center",
                render: (logo) => (
                  <img src={logo} alt="Brand Logo" className="w-[50px] h-[50px] rounded" />
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
                render: (_, record) =>
                  editingRowId === record.id ? (
                    <div className="flex gap-2 justify-center">
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
                    </div>
                  ) : (
                    <div className="flex gap-2 justify-center">
                      <button
                        className="px-3 py-1 text-blue-500 hover:text-blue-700"
                        onClick={() => handleEditClick(record)}
                      >
                      <FaEdit className="mr-2" /> 

                      </button>
                      <button
                        className="px-3 py-1 text-red-500 hover:text-red-700"
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
                <h6>{item.name}</h6>
                <img src={item.logo} alt={item.name} className="w-[50px] h-[50px] rounded" />
                <p>Promo: {item.promo}</p>
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
