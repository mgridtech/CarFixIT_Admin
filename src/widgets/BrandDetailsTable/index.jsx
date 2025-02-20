import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StyledTable from "./styles";
import Empty from "../../components/Empty";
import Pagination from "../../ui/Pagination";
import { useWindowSize } from "react-use";
import { Switch } from "antd";
import usePagination from "../../hooks/usePagination";
import { FaEdit, FaTrash } from "react-icons/fa";
import Services from "../../pages/Services/Services";

const BrandDetailsTable = ({ brandId }) => {
  const { width } = useWindowSize();
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  

  const [staticData, setStaticData] = useState([]); // Default to an empty array
  const [filteredData, setFilteredData] = useState([]); // Default to an empty array
  const [category, setCategory] = useState("all");

  const pagination = usePagination(filteredData || [], 10); // Ensure an array is passed

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
    const fetchBrandCategories = async () => {
      try {
        const response = await Services.getInstance().getBrandCategories(id);
        if (response.error) {
          console.error("Error fetching categories:", response.error);
        } else {
          const fetchedData = response.data?.categories || []; // Extract categories array
          setStaticData(fetchedData);
          setFilteredData(fetchedData);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    

    fetchBrandCategories();
  }, [brandId,id]);

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
                  <span>{index + 1}</span>
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
