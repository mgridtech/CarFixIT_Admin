import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StyledTable from "./styles";
import Empty from "../../components/Empty";
import Pagination from "../../ui/Pagination";
import { useWindowSize } from "react-use";
import { Switch } from "antd";
import usePagination from "../../hooks/usePagination";
import { FaEdit, FaTrash } from "react-icons/fa";

const BrandDetailsTable = () => {
  const { width } = useWindowSize();
  const navigate = useNavigate();

  const [staticData, setStaticData] = useState([
    { id: 1, categoryName: "Category A", status: true },
    { id: 2, categoryName: "Category B", status: false },
    { id: 3, categoryName: "Category C", status: true },
  ]);

  const [filteredData, setFilteredData] = useState(staticData);
  const [category, setCategory] = useState("all");
  const pagination = usePagination(filteredData, 10);

  const toggleStatus = (id) => {
    const updatedData = staticData.map((item) =>
      item.id === id ? { ...item, status: !item.status } : item
    );
    setStaticData(updatedData);
    setFilteredData(updatedData);
  };

  const handleDelete = (record) => {
    if (window.confirm(`Are you sure you want to delete ${record.categoryName}?`)) {
      const updatedData = staticData.filter((item) => item.id !== record.id);
      setStaticData(updatedData);
      setFilteredData(updatedData);
    }
  };

  useEffect(() => {
    if (category === "all") {
      setFilteredData(staticData);
    } else {
      setFilteredData(staticData.filter((item) => item.categoryName === category));
    }
  }, [category, staticData]);

  const handleEdit = (id) => {
    navigate(`/updateBrandDetail/${id}`);
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="mb-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">All Categories</option>
          <option value="Category A">Category A</option>
          <option value="Category B">Category B</option>
          <option value="Category C">Category C</option>
        </select>
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
                dataIndex: "categoryName",
                key: "categoryName",
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
                    <button
                      className="px-3 py-1 text-blue-500 hover:text-blue-700"
                      onClick={() => handleEdit(record.id)}
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
                  <button
                    className="px-3 py-1 text-blue-500 hover:text-blue-700"
                    onClick={() => handleEdit(item.id)}
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

        {pagination.maxPage > 1 && <Pagination pagination={pagination} />}
      </div>
    </div>
  );
};

export default BrandDetailsTable;
