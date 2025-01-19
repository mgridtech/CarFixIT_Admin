import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Select from "../../ui/Select";
import StyledTable from "./styles";
import Empty from "../../components/Empty";
import Pagination from "../../ui/Pagination";
import { useWindowSize } from "react-use";
// import { CATEGORY_OPTIONS } from "../../constants/options"; // Category filter options
import { Switch } from "antd";
import usePagination from "../../hooks/usePagination";

const BrandDetailsTable = () => {
  const { width } = useWindowSize();
//   const navigate = useNavigate();

  // Static brand data
  const [staticData, setStaticData] = useState([
    {
      id: 1,
      categoryName: "Category A",
      status: true,
    },
    {
      id: 2,
      categoryName: "Category B",
      status: false,
    },
    {
      id: 3,
      categoryName: "Category C",
      status: true,
    },
  ]);

  const [filteredData, setFilteredData] = useState(staticData);
  const [category, setCategory] = useState("all");
  const [editingRowId, setEditingRowId] = useState(null);
  const [editableData, setEditableData] = useState({});
  const pagination = usePagination(filteredData, 10);

//   // Clear all filters
//   const handleClearFilters = () => {
//     setCategory("all");
//     setFilteredData(staticData);
//   };

  // Toggle status (active/inactive) for a category
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
    if (window.confirm(`Are you sure you want to delete ${record.categoryName}?`)) {
      const updatedData = staticData.filter((item) => item.id !== record.id);
      setStaticData(updatedData);
      setFilteredData(updatedData);
    }
  };

  // Filter data by category
  useEffect(() => {
    if (category === "all") {
      setFilteredData(staticData);
    } else {
      setFilteredData(staticData.filter((item) => item.categoryName === category));
    }
  }, [category, staticData]);

  return (
    <div className="flex flex-col flex-1">
 

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
                title: "Category Name",
                dataIndex: "categoryName",
                key: "categoryName",
                render: (text, record) => (
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => handleEditClick(record)}
                  >
                    {editingRowId === record.id ? (
                      <input
                        type="text"
                        value={editableData.categoryName}
                        onChange={(e) => handleInputChange(e, "categoryName")}
                        className="border p-1"
                      />
                    ) : (
                      text
                    )}
                  </button>
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
                        Edit
                      </button>
                      <button
                        className="px-3 py-1 text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(record)}
                      >
                        Delete
                      </button>
                    </div>
                  ),
              },
            ]}
            dataSource={pagination.currentItems()}
            rowKey={(record) => record.id}
            locale={{
              emptyText: <Empty text="No categories found" />,
            }}
            pagination={false}
          />
        ) : (
          <div className="flex flex-col gap-5">
            {pagination.currentItems().map((item) => (
              <div className="card" key={`category-${item.id}`}>
                <h6>{item.categoryName}</h6>
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

export default BrandDetailsTable;
