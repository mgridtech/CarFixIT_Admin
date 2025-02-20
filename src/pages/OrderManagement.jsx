import React, { useState } from "react";
import PageHeader from "../layout/PageHeader";
import Search from "../ui/Search";
import { useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
import OrderManagementTable from "../widgets/OrderManagementTable";

const OrderManagement = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Static order data for export
  const ordersData = [
    {
      id: 1,
      orderNumber: "ORD12345",
      customerName: "John Doe",
      orderDate: "2023-10-01",
      status: "Shipped",
      totalAmount: 150.75,
    },
    {
      id: 2,
      orderNumber: "ORD12346",
      customerName: "Jane Smith",
      orderDate: "2023-10-02",
      status: "Pending",
      totalAmount: 200.5,
    },
    {
      id: 3,
      orderNumber: "ORD12347",
      customerName: "Alice Johnson",
      orderDate: "2023-10-03",
      status: "Delivered",
      totalAmount: 99.99,
    },
  ];

  const csvData = [
    ["Order Id", "Order Number", "Customer Name", "Order Date", "Status", "Total Amount"],
    ...ordersData.map((order) => [
      order.id,
      order.orderNumber,
      order.customerName,
      order.orderDate,
      order.status,
      order.totalAmount,
    ]),
  ];

  return (
    <>
      <PageHeader title="Order Management" />
      <div className="flex flex-col-reverse gap-4 mb-5 md:flex-col lg:flex-row lg:justify-between">
        <div className="flex flex-col gap-4 md:flex-row md:gap-[14px]">
          <button
            onClick={() => navigate("/addOrder")}
            className="btn btn--primary"
          >
            Add new order <i className="icon-circle-plus-regular" />
          </button>
          <CSVLink
            className="btn btn--outline blue !h-[44px]"
            data={csvData}
            filename={"orders.csv"}
          >
            Export CSV <i className="icon-file-export-solid" />
          </CSVLink>
        </div>
        <Search
          wrapperClass="lg:w-[326px]"
          placeholder="Search Order"
          query={searchQuery}
          setQuery={setSearchQuery}
        />
      </div>
      <OrderManagementTable searchQuery={searchQuery} />
    </>
  );
};

export default OrderManagement;