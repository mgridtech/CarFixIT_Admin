import Select from "../../ui/Select";
import StyledTable from "./styles";
import Empty from "../../components/Empty";
import Pagination from "../../ui/Pagination";
import { useState, useEffect } from "react";
import usePagination from "../../hooks/usePagination";
import { useWindowSize } from "react-use";
import { CATEGORY_OPTIONS } from "../../constants/options";
import { Switch } from "antd";

const CategoryManagementTable = () => {
  const { width } = useWindowSize();

  // Static data for the table
  const [staticData, setStaticData] = useState([
    {
      id: 1,
      name: "Filters",
      image: "https://via.placeholder.com/50",
      promo: "Promo 1",
      status: true,
    },
    {
      id: 2,
      name: "Oils",
      image: "https://via.placeholder.com/50",
      promo: "Promo 2",
      status: false,
    },
    {
      id: 3,
      name: "Batteries",
      image: "https://via.placeholder.com/50",
      promo: "Promo 3",
      status: true,
    },
  ]);

  const [filteredData, setFilteredData] = useState(staticData);
  const [category, setCategory] = useState("all");
  const [editingRowId, setEditingRowId] = useState(null);
  const [editableData, setEditableData] = useState({});
  const pagination = usePagination(filteredData, 10);

  const handleClearFilters = () => {
    setCategory("all");
    setFilteredData(staticData);
  };

  const toggleStatus = (id) => {
    setFilteredData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, status: !item.status } : item
      )
    );
    setStaticData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, status: !item.status } : item
      )
    );
  };

  const handleEditClick = (record) => {
    setEditingRowId(record.id);
    setEditableData({ ...record });
  };

  const handleSave = () => {
    setStaticData((prevData) =>
      prevData.map((item) =>
        item.id === editingRowId ? { ...item, ...editableData } : item
      )
    );
    setFilteredData((prevData) =>
      prevData.map((item) =>
        item.id === editingRowId ? { ...item, ...editableData } : item
      )
    );
    setEditingRowId(null);
  };

  const handleCancel = () => {
    setEditingRowId(null);
  };

  const handleChange = (e, fieldName) => {
    setEditableData({
      ...editableData,
      [fieldName]: e.target.value,
    });
  };

  const handleDelete = (record) => {
    if (window.confirm(`Are you sure you want to delete ${record.name}?`)) {
      setFilteredData(prevData => prevData.filter(item => item.id !== record.id));
      setStaticData(prevData => prevData.filter(item => item.id !== record.id));
    }
  };

  useEffect(() => {
    if (category === "all") {
      setFilteredData(staticData);
    } else {
      setFilteredData(staticData.filter((item) => item.name === category));
    }
  }, [category, staticData]);

  return (
    <div className="flex flex-col flex-1">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-x-6 xl:grid-cols-6 mb-4">
        <Select
          options={CATEGORY_OPTIONS}
          value={{ label: category === "all" ? "All Categories" : category, value: category }}
          placeholder="Select Category"
          onChange={(e) => setCategory(e.value)}
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
                dataIndex: "name",
                key: "name",
                render: (text, record) =>
                  editingRowId === record.id ? (
                    <select
                      className="w-full p-2 border rounded"
                      value={editableData.name}
                      onChange={(e) => handleChange(e, "name")}
                    >
                      {CATEGORY_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    text
                  ),
              },
              {
                title: "Promo",
                dataIndex: "promo",
                key: "promo",
                render: (text, record) =>
                  editingRowId === record.id ? (
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={editableData.promo}
                      onChange={(e) => handleChange(e, "promo")}
                    />
                  ) : (
                    text
                  ),
              },
              {
                title: "Image",
                dataIndex: "image",
                key: "image",
                align: "center",
                render: (image) => (
                  <img
                    src={image}
                    alt="Category"
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
                  <Switch
                    checked={status}
                    onChange={() => toggleStatus(record.id)}
                  />
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
                <h6>{item.name}</h6>
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-[50px] h-[50px] rounded"
                />
                <p>Promo: {item.promo}</p>
                <Switch
                  checked={item.status}
                  onChange={() => toggleStatus(item.id)}
                />
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
        {pagination.maxPage > 1 && <Pagination pagination={pagination} />}
      </div>
    </div>
  );
};

export default CategoryManagementTable;