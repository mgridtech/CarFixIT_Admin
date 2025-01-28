import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "../../ui/Select";
import StyledTable from "./styles";
import Empty from "../../components/Empty";
import Pagination from "../../ui/Pagination";
import { useWindowSize } from "react-use";
import { Switch } from "antd";
import usePagination from "../../hooks/usePagination";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

const BrandManagementTable = () => {
  const { width } = useWindowSize();
  const navigate = useNavigate();

  // State management
  const [brandData, setBrandData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [brand, setBrand] = useState("all");
  const [editingRowId, setEditingRowId] = useState(null);
  const [editableData, setEditableData] = useState({});

  // Pagination logic
  const pagination = usePagination(filteredData, 10); // 10 items per page

  // Fetch brand data from API
  useEffect(() => {
    const fetchBrandData = async () => {
      try {
        const response = await axios.get("http://localhost:3009/get/brands");
        if (response.data && response.data.data) {
          const formattedData = response.data.data.map((brand) => ({
            ...brand,
            brandId: brand.id, // Storing brandId
          }));
          setBrandData(formattedData);
        } else {
          console.error("No brand data in the response:", response);
        }
      } catch (error) {
        console.error("Error fetching brand data:", error);
      }
    };

    fetchBrandData();
  }, []);

  useEffect(() => {
    setFilteredData(brandData);
  }, [brandData]);

  useEffect(() => {
    if (brand === "all") {
      setFilteredData(brandData);
    } else {
      setFilteredData(brandData.filter((item) => item.bName === brand));
    }
  }, [brand, brandData]);

  const handleClearFilters = () => {
    setBrand("all");
    setFilteredData(brandData);
  };

  const toggleStatus = (brandId) => {
    setBrandData((prevData) =>
      prevData.map((item) =>
        item.brandId === brandId
          ? { ...item, status: !item.status }
          : item
      )
    );
  };

  const handleSave = () => {
    setBrandData((prevData) =>
      prevData.map((item) =>
        item.brandId === editingRowId
          ? { ...item, ...editableData }
          : item
      )
    );
    setEditingRowId(null);
  };

  const handleCancel = () => {
    setEditingRowId(null);
    setEditableData({});
  };

  const handleEditClick = (record) => {
    setEditingRowId(record.brandId);
    setEditableData(record);
  };

  const handleDelete = (record) => {
    setBrandData((prevData) =>
      prevData.filter((item) => item.brandId !== record.brandId)
    );
  };

  return (
    <div className="flex flex-col flex-1">
      {/* Filter Options */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-x-6 xl:grid-cols-6 mb-4">
        <Select
          options={brandData.map((item) => ({ label: item.bName, value: item.bName }))}
          value={{ label: brand === "all" ? "All Brands" : brand, value: brand }}
          placeholder="Select Brand"
          onChange={(e) => setBrand(e.value)}
        />
        <div className="grid grid-cols-2 gap-3">
          <button className="btn btn--outline blue !h-[44px]" onClick={handleClearFilters}>
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
                render: (_, record, index) => <span>{index + 1}</span>,
              },
              {
                title: "Brand Name",
                dataIndex: "bName",
                key: "bName",
                render: (text, record) => (
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => navigate(`/brandDetails/${record.brandId}`)}
                  >
                    {editingRowId === record.brandId ? (
                      <input
                        type="text"
                        value={editableData.bName}
                        onChange={(e) => setEditableData({ ...editableData, bName: e.target.value })}
                        className="border p-1"
                      />
                    ) : (
                      text
                    )}
                  </button>
                ),
              },
              {
                title: "Brand Image",
                dataIndex: "imagedata",
                key: "imagedata",
                align: "center",
                render: (imagedata) => {
                  const imageUrl = imagedata ? `data:image/png;base64,${imagedata}` : "https://via.placeholder.com/50";
                  return <img src={imageUrl} alt="Brand Logo" className="w-[50px] h-[50px] rounded" />;
                },
              },
              {
                title: "Status",
                dataIndex: "status",
                key: "status",
                align: "center",
                render: (status, record) => (
                  <Switch checked={status} onChange={() => toggleStatus(record.brandId)} />
                ),
              },
              {
                title: "Actions",
                key: "actions",
                align: "center",
                render: (_, record) =>
                  editingRowId === record.brandId ? (
                    <div className="flex gap-2 justify-center">
                      <button className="px-3 py-1 text-green-500 hover:text-green-700" onClick={handleSave}>
                        Save
                      </button>
                      <button className="px-3 py-1 text-gray-500 hover:text-gray-700" onClick={handleCancel}>
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2 justify-center">
                      <button className="px-3 py-1 text-blue-500 hover:text-blue-700" onClick={() => handleEditClick(record)}>
                        <FaEdit className="mr-2" />
                      </button>
                      <button className="px-3 py-1 text-red-500 hover:text-red-700" onClick={() => handleDelete(record)}>
                        <FaTrash className="mr-2" />
                      </button>
                    </div>
                  ),
              },
            ]}
            dataSource={filteredData.length > 0 ? filteredData : []}
            rowKey="id"
          />
        ) : (
          <Empty message="No data available" />
        )}

        {/* Pagination Component */}
        <Pagination pagination={pagination} />
      </div>
    </div>
  );
};

export default BrandManagementTable;
