import React from "react";
import PageHeader from "../layout/PageHeader";

const OrderDetails = () => {
  // Dummy data for the order
  const order = {
    orderId: "ORD1001",
    userId: "USER101",
    date: "2023-10-01",
    orderValue: 120.5,
    status: "Pending",
    products: [
      {
        id: 1,
        name: "Product A",
        quantity: 2,
        price: 50.0,
        total: 100.0,
      },
      {
        id: 2,
        name: "Product B",
        quantity: 1,
        price: 20.5,
        total: 20.5,
      },
    ],
    shippingAddress: {
      name: "John Doe",
      address: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
    },
    paymentMethod: "Credit Card",
  };

  return (
    <>
      <PageHeader title="Order Details" />
      <div className="p-6 bg-widget rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Order Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-gray-600">Order ID:</p>
            <p className="font-medium">{order.orderId}</p>
          </div>
          <div>
            <p className="text-gray-600">User ID:</p>
            <p className="font-medium">{order.userId}</p>
          </div>
          <div>
            <p className="text-gray-600">Order Date:</p>
            <p className="font-medium">{order.date}</p>
          </div>
          <div>
            <p className="text-gray-600">Order Value:</p>
            <p className="font-medium">${order.orderValue.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-gray-600">Status:</p>
            <p
              className={`px-2 py-1 rounded text-sm font-medium ${
                order.status === "Pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : order.status === "Shipped"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {order.status}
            </p>
          </div>
        </div>

        {/* Products Table */}
        <h3 className="text-lg font-semibold mb-4">Products</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-widget border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b text-left">Product Name</th>
                <th className="px-4 py-2 border-b text-center">Quantity</th>
                <th className="px-4 py-2 border-b text-right">Price</th>
                <th className="px-4 py-2 border-b text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.products.map((product) => (
                <tr key={product.id}>
                  <td className="px-4 py-2 border-b text-left">{product.name}</td>
                  <td className="px-4 py-2 border-b text-center">
                    {product.quantity}
                  </td>
                  <td className="px-4 py-2 border-b text-right">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-4 py-2 border-b text-right">
                    ${product.total.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Shipping Address */}
        <h3 className="text-lg font-semibold mt-6 mb-4">Shipping Address</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-600">{order.shippingAddress.name}</p>
          <p className="text-gray-600">{order.shippingAddress.address}</p>
          <p className="text-gray-600">
            {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
            {order.shippingAddress.zipCode}
          </p>
          <p className="text-gray-600">{order.shippingAddress.country}</p>
        </div>

        {/* Payment Method */}
        <h3 className="text-lg font-semibold mt-6 mb-4">Payment Method</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-600">{order.paymentMethod}</p>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;