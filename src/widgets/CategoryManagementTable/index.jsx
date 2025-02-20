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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CategoryManagementTable = () => {
  const navigate = useNavigate();
  const { width } = useWindowSize();

  const [staticData, setStaticData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const pagination = usePagination(filteredData || [], 10);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const { data } = await Services.getInstance().getCategories();
        setStaticData(data);
      } catch (error) {
        setError("Failed to fetch categories");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (category === "all") {
      setFilteredData(staticData);
    } else {
      setFilteredData(staticData.filter((item) => item.name === category));
    }
  }, [category, staticData]);

  const handleClearFilters = () => {
    setCategory("all");
    setFilteredData(staticData);
  };

  const toggleStatus = async (id) => {
    const categoryToUpdate = staticData.find((item) => item.id === id);
    const newStatus = !categoryToUpdate.status;

    try {
      const result = await Services.getInstance().updateCategoryStatus(id, newStatus);

      if (result.error) {
        throw new Error(result.error);
      }

      const updatedData = staticData.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      );
      setStaticData(updatedData);
      setFilteredData(updatedData);

      toast.success(`Category status updated to ${newStatus ? "Active" : "Inactive"}!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("Error updating category status:", error);
      toast.error("Failed to update category status", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleDelete = async (record) => {
    if (window.confirm(`Are you sure you want to delete ${record.name}?`)) {
      try {
        const result = await Services.getInstance().deleteCategory(record.id);

        if (result.error) {
          throw new Error(result.error);
        }

        setFilteredData((prevData) => prevData.filter((item) => item.id !== record.id));
        setStaticData((prevData) => prevData.filter((item) => item.id !== record.id));

        toast.success(`Category "${record.name}" deleted successfully!`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } catch (error) {
        console.error("Error deleting category:", error);
        toast.error("Failed to delete category", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <ToastContainer />
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
                render: (_, __, index) => <span>{index + 1}</span>,
              },
              {
                title: "Category Name",
                dataIndex: "name",
                key: "name",
              },
              {
                title: "Image",
                dataIndex: "image_data",
                key: "image_data",
                align: "center",
                render: (image_data) => (
                  <img
                    src={`data:image/jpeg;base64,${image_data}`}
                    alt="Category"
                    className="w-[50px] h-[50px] rounded m-auto"
                  />
                ),
              },
              {
                title: "Promo",
                dataIndex: "categoryStatus",
                key: "categoryStatus",
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
                      onClick={() => navigate(`/updateCategory/${record.id}`)}
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
                  src={`data:image/jpeg;base64,${item.image_data}`}
                  alt={item.name}
                  className="w-[50px] h-[50px] rounded"
                />
                <p>Promo: {item.categoryStatus}</p>
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