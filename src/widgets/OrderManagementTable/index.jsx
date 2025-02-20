import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StyledTable from "./styles";
import Empty from "../../components/Empty";
import Pagination from "../../ui/Pagination";
import { useWindowSize } from "react-use";
import { FaEye } from "react-icons/fa";
import Select from "../../ui/Select";
import usePagination from "../../hooks/usePagination";

const OrderManagementTable = ({ searchQuery }) => {
  const { width } = useWindowSize();
  const navigate = useNavigate();

  // Dummy data for orders
  const dummyOrders = [
    {
      id: 1,
      orderId: "ORD1001",
      userId: "USER101",
      date: "2023-10-01",
      orderValue: 120.5,
      status: "Pending",
    },
    {
      id: 2,
      orderId: "ORD1002",
      userId: "USER102",
      date: "2023-10-02",
      orderValue: 250.75,
      status: "Shipped",
    },
    {
      id: 3,
      orderId: "ORD1003",
      userId: "USER103",
      date: "2023-10-03",
      orderValue: 99.99,
      status: "Delivered",
    },
    {
      id: 4,
      orderId: "ORD1004",
      userId: "USER104",
      date: "2023-10-04",
      orderValue: 450.0,
      status: "Pending",
    },
    {
      id: 5,
      orderId: "ORD1005",
      userId: "USER105",
      date: "2023-10-05",
      orderValue: 199.99,
      status: "Shipped",
    },
  ];

  const [orders, setOrders] = useState(dummyOrders); // State to store orders
  const [filteredData, setFilteredData] = useState(dummyOrders); // State to store filtered orders
  const [statusFilter, setStatusFilter] = useState("all"); // State for status filter
  const pagination = usePagination(filteredData, 10); // Pagination hook

  // Navigate to order details page
  const handleViewClick = (orderId) => {
    navigate(`/orderDetails/${orderId}`);
  };

  // Clear all filters
  const handleClearFilters = () => {
    setStatusFilter("all");
    setFilteredData(orders);
  };

  // Filter data by search query and status
  useEffect(() => {
    let filtered = orders;

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((order) =>
        order.orderId.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredData(filtered);
  }, [searchQuery, statusFilter, orders]);

  return (
    <div className="flex flex-col flex-1">
      {/* Filter Options */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-x-6 xl:grid-cols-6 mb-4">
        <Select
          options={[
            { label: "All Statuses", value: "all" },
            { label: "Pending", value: "Pending" },
            { label: "Shipped", value: "Shipped" },
            { label: "Delivered", value: "Delivered" },
          ]}
          value={{
            label: statusFilter === "all" ? "All Statuses" : statusFilter,
            value: statusFilter,
          }}
          placeholder="Select Status"
          onChange={(e) => setStatusFilter(e.value)}
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
                title: "Sno",
                dataIndex: "id",
                key: "id",
                align: "center",
                render: (_, __, index) => <span>{index + 1}</span>,
              },
              {
                title: "Order ID",
                dataIndex: "orderId",
                key: "orderId",
              },
              {
                title: "User ID",
                dataIndex: "userId",
                key: "userId",
              },
              {
                title: "Date",
                dataIndex: "date",
                key: "date",
              },
              {
                title: "Order Value",
                dataIndex: "orderValue",
                key: "orderValue",
                align: "right",
                render: (value) => `$${value.toFixed(2)}`,
              },
              {
                title: "Status",
                dataIndex: "status",
                key: "status",
                align: "center",
                render: (status) => (
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : status === "Shipped"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {status}
                  </span>
                ),
              },
              {
                title: "Actions",
                key: "actions",
                align: "center",
                render: (_, record) => (
                  <div className="flex gap-2 justify-center">
                    {/* View Button */}
                    <button
                      className="px-3 py-1 text-green-500 hover:text-green-700 flex items-center"
                      onClick={() => handleViewClick(record.orderId)}
                    >
                      <FaEye className="mr-2" />
                      View
                    </button>
                  </div>
                ),
              },
            ]}
            dataSource={pagination.currentItems()}
            rowKey={(record) => record.id}
            locale={{
              emptyText: <Empty text="No orders found" />,
            }}
            pagination={false}
          />
        ) : (
          <div className="flex flex-col gap-5">
            {pagination.currentItems().map((item) => (
              <div className="card" key={`order-${item.id}`}>
                <h6>Order ID: {item.orderId}</h6>
                <p>User ID: {item.userId}</p>
                <p>Date: {item.date}</p>
                <p>Order Value: ${item.orderValue.toFixed(2)}</p>
                <p>
                  Status:{" "}
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      item.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : item.status === "Shipped"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {item.status}
                  </span>
                </p>
                <div className="flex items-center justify-center gap-3">
                  <button
                    className="px-3 py-1 text-green-500 hover:text-green-700"
                    onClick={() => handleViewClick(item.orderId)}
                  >
                    <FaEye className="mr-2" />
                    View
                  </button>
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

export default OrderManagementTable;