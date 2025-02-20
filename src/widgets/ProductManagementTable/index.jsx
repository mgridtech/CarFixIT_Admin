import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "../../ui/Select";
import StyledTable from "./styles";
import Empty from "../../components/Empty";
import Pagination from "../../ui/Pagination";
import { useWindowSize } from "react-use";
import { BRAND_OPTIONS } from "../../constants/options";
import { Switch } from "antd";
import usePagination from "../../hooks/usePagination";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import Services from "../../pages/Services/Services";

const ProductManagementTable = ({ searchQuery }) => {
  const { width } = useWindowSize();
  const navigate = useNavigate();

  const [staticData, setStaticData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [brand, setBrand] = useState("all");
  const pagination = usePagination(filteredData, 10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await Services.getInstance().getProducts(); // Assuming this method exists in Services
  
        // Check if 'products' is an array inside the 'data' object
        const products = data?.products;
  
        if (Array.isArray(products)) {
          console.log("API Response:", products);
          setStaticData(products); // Set the products in staticData
          setFilteredData(products); // Initialize filteredData with products
        } else {
          console.error("Error: Expected an array of products, but got", data);
          setError("Failed to fetch products. Data format is invalid.");
        }
      } catch (error) {
        setError("Failed to fetch products");
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, []); // Empty dependency array to run on component mount
  
  useEffect(() => {
    let updatedData = staticData;
    if (brand !== "all") {
      updatedData = updatedData.filter((item) => item.brandName === brand);
    }
    if (searchQuery) {
      updatedData = updatedData.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredData(updatedData);
  }, [brand, searchQuery, staticData]);

  const handleClearFilters = () => {
    setBrand("all");
    setFilteredData(staticData);
  };

  const toggleStatus = async (id) => {
    const productToUpdate = staticData.find((item) => item.id === id);
    const newStatus = !productToUpdate.status;

    try {
      // Call the updateProductStatus API to update the product's status
      const response = await Services.getInstance().updateProductStatus(id, newStatus);
      if (response.error) {
        throw new Error(response.error);
      }

      // If the status is successfully updated, update the local state
      const updatedData = staticData.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      );
      setStaticData(updatedData);
      setFilteredData(updatedData);
    } catch (error) {
      console.error("Error updating product status:", error);
    }
  };

  const handleViewProduct = (productId) => {
    navigate(`/productDetails/${productId}`);
  };

  const handleEditProduct = (productId) => {
    navigate(`/updateProduct/${productId}`, { state: { productId } });
  };

  const handleDeleteProduct = (productId) => {
    const updatedData = staticData.filter((item) => item.id !== productId);
    setStaticData(updatedData);
    setFilteredData(updatedData);
    alert(`Product with ID ${productId} has been deleted.`);
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-x-6 xl:grid-cols-6 mb-4">
        <Select
          options={BRAND_OPTIONS}
          value={{
            label: brand === "all" ? "All Brands" : brand,
            value: brand,
          }}
          placeholder="Select Brand"
          onChange={(e) => setBrand(e.value)}
        />
        <button
          className="btn btn--outline blue !h-[44px]"
          onClick={handleClearFilters}
        >
          Clear
        </button>
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
                title: "Product Name",
                dataIndex: "name",
                key: "name",
                render: (text) => <span>{text}</span>,
              },
              {
                title: "Product Image",
                dataIndex: "image_data",
                key: "image_data",
                align: "center",
                render: (image_data) => (
                  <img
                    src={`data:image/jpeg;base64,${image_data}`}
                    // src={image_data}
                    alt="Product"
                    className="w-[50px] h-[50px] rounded"
                  />
                ),
              },
              {
                title: "Price",
                dataIndex: "price",
                key: "price",
                align: "center",
                render: (price) => <span>{price}</span>,
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
                  <div className="flex gap-3 justify-center">
                    <FaEye
                      className="text-blue-500 cursor-pointer"
                      onClick={() => handleViewProduct(record.id)}
                    />
                    <FaEdit
                      className="text-green-500 cursor-pointer"
                      onClick={() => handleEditProduct(record.id)}
                    />
                    <FaTrash
                      className="text-red-500 cursor-pointer"
                      onClick={() => handleDeleteProduct(record.id)}
                    />
                  </div>
                ),
              },
            ]}
            dataSource={pagination.currentItems()}
            rowKey={(record) => record.id}
            locale={{
              emptyText: <Empty text="No products found" />,
            }}
            pagination={false}
          />
        ) : (
          <div className="flex flex-col gap-5">
            {pagination.currentItems().map((item) => (
              <div className="card" key={`product-${item.id}`}>
                <h6>{item.name}</h6>
                <img
                  src={`data:image/jpeg;base64,${item.image_data}`}
                  alt={item.name}
                  className="w-[50px] h-[50px] rounded"
                />
                <p>Price: ${item.price}</p>
                <Switch
                  checked={item.status}
                  onChange={() => toggleStatus(item.id)}
                />
                <div className="flex items-center justify-center gap-3">
                  <FaEye
                    className="text-blue-500 cursor-pointer"
                    onClick={() => handleViewProduct(item.id)}
                  />
                  <FaEdit
                    className="text-green-500 cursor-pointer"
                    onClick={() => handleEditProduct(item.id)}
                  />
                  <FaTrash
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleDeleteProduct(item.id)}
                  />
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

export default ProductManagementTable;