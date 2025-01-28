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

const ProductManagementTable = ({ searchQuery }) => {
  const { width } = useWindowSize();
  const navigate = useNavigate();

  const [staticData, setStaticData] = useState([
    {
      id: 1,
      brandName: "Brand A",
      image: "https://via.placeholder.com/50",
      price: 100,
      status: true,
    },
    {
      id: 2,
      brandName: "Brand B",
      image: "https://via.placeholder.com/50",
      price: 200,
      status: false,
    },
    {
      id: 3,
      brandName: "Brand C",
      image: "https://via.placeholder.com/50",
      price: 300,
      status: true,
    },
  ]);

  const [filteredData, setFilteredData] = useState(staticData);
  const [brand, setBrand] = useState("all");
  const pagination = usePagination(filteredData, 10);

  const handleClearFilters = () => {
    setBrand("all");
    setFilteredData(staticData);
  };

  const toggleStatus = (id) => {
    const updatedData = staticData.map((item) =>
      item.id === id ? { ...item, status: !item.status } : item
    );
    setStaticData(updatedData);
    setFilteredData(updatedData);
  };

  const handleViewProduct = (productId) => {
    navigate(`/productDetails/${productId}`);
  };

  const handleEditProduct = (productId) => {
    navigate(`/editProduct/${productId}`, { state: { productId } });
  };

  const handleDeleteProduct = (productId) => {
    const updatedData = staticData.filter((item) => item.id !== productId);
    setStaticData(updatedData);
    setFilteredData(updatedData);
    alert(`Product with ID ${productId} has been deleted.`);
  };

  useEffect(() => {
    let updatedData = staticData;
    if (brand !== "all") {
      updatedData = updatedData.filter((item) => item.brandName === brand);
    }
    if (searchQuery) {
      updatedData = updatedData.filter((item) =>
        item.brandName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredData(updatedData);
  }, [brand, searchQuery, staticData]);

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
                  <span>{pagination.pageIndex * 10 + index + 1}</span>
                ),
              },
              {
                title: "Brand Name",
                dataIndex: "brandName",
                key: "brandName",
                render: (text) => <span>{text}</span>,
              },
              {
                title: "Product Image",
                dataIndex: "image",
                key: "image",
                align: "center",
                render: (image) => (
                  <img
                    src={image}
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
                render: (price) => <span>${price}</span>,
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
                <h6>{item.brandName}</h6>
                <img
                  src={item.image}
                  alt={item.brandName}
                  className="w-[50px] h-[50px] rounded"
                />
                <p>Price: ${item.price}</p>
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

export default ProductManagementTable;
