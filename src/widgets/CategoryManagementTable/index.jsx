import React, { useState, useEffect } from "react";
import Select from "../../ui/Select";
import StyledTable from "./styles";
import Empty from "../../components/Empty";
import Pagination from "../../ui/Pagination";
import { useNavigate } from "react-router-dom";
import usePagination from "../../hooks/usePagination";
import { useWindowSize } from "react-use";
import { CATEGORY_OPTIONS } from "../../constants/options";
import { Switch } from "antd";
import { FaEdit, FaTrash } from "react-icons/fa";
import Services from "../../pages/Services/Services";

const CategoryManagementTable = () => {
  const navigate = useNavigate();
  const { width } = useWindowSize();

  const [staticData, setStaticData] = useState([]); // Initialize as empty array
  const [filteredData, setFilteredData] = useState([]); // Initialize as empty array
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState(null); // For error state
  const pagination = usePagination(filteredData || [], 10); // Ensure filteredData is an array

  // Fetch categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const { data } = await Services.getInstance().getCategories(); // Destructure to get the data
        console.log(data); // Log the fetched data
        setStaticData(data); // Set the fetched categories to staticData
      } catch (error) {
        setError("Failed to fetch categories"); // Handle error
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []); // Fetch on mount

  // Update filteredData when category or staticData changes
  useEffect(() => {
    if (category === "all") {
      setFilteredData(staticData); // Set filtered data to staticData
    } else {
      setFilteredData(staticData.filter((item) => item.name === category)); // Filter by category
    }
  }, [category, staticData]); // Re-run when category or staticData changes

  // Handle clearing filters
  const handleClearFilters = () => {
    setCategory("all");
    setFilteredData(staticData); // Reset filtered data to all categories
  };

  // Toggle the status of a category
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

  // Handle category deletion
  const handleDelete = (record) => {
    if (window.confirm(`Are you sure you want to delete ${record.name}?`)) {
      setFilteredData((prevData) => prevData.filter((item) => item.id !== record.id));
      setStaticData((prevData) => prevData.filter((item) => item.id !== record.id));
    }
  };

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
        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {width >= 768 ? (
          <StyledTable
            columns={[
              {
                title: "Sr. No.",
                dataIndex: "id",
                key: "id",
                align: "center",
                render: (_, __, index) => (
                  <span>{index+1}</span>
                ),
              },
              {
                title: "Category Name",
                dataIndex: "name",
                key: "name",
              },
             
              {
                title: "Image",
                dataIndex: "image_data", // Assuming image_data contains base64 string
                key: "image_data",
                align: "center",
                render: (image_data) => (
                  <img
                    src={`data:image/jpeg;base64,${image_data}`} // Assuming image_data is base64 encoded string
                    alt="Category"
                    className="w-[50px] h-[50px] rounded"
                  />
                ),
              },
              {
                title: "Promo",
                dataIndex: "categoryStatus", // Correct field name
                key: "categoryStatus", // Use categoryStatus from the API
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
                render: (_, record) => (
                  <div className="flex gap-2 justify-center">
                    <button
                      className="px-3 py-1 text-blue-500 hover:text-blue-700 flex items-center"
                      onClick={() => navigate(`/updateCategory/${record.id}`)} // Correct navigation
                    >
                      <FaEdit className="mr-2" />
                    </button>
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
                  src={`data:image/jpeg;base64,${item.image_data}`} // Display base64 image on mobile as well
                  alt={item.name}
                  className="w-[50px] h-[50px] rounded"
                />
                <p>Promo: {item.categoryStatus}</p> {/* Show categoryStatus */}
                <Switch
                  checked={item.status}
                  onChange={() => toggleStatus(item.id)}
                />
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
