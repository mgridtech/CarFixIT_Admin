  import React, { forwardRef } from "react";
  import { PRODUCT_DETAIL_COLUMN_DEFS } from "../constants/columnDefs";
  import StyledTable from "../widgets/UsersTable/styles";
  import Empty from "../components/Empty";
  import logo from "../assets/logo.png";
  import TeamInvoiceForm from "../components/TeamInvoiceForm"; // Ensure this import is correct

  const fontSize = "12px"; // Font size for text
  const tableFontSize = "10px"; // Font size for table content
  const tablePadding = "2px"; // Padding for table cells
  const margin = "4px"; // Margin for spacing

  const OrderPrintComponent = forwardRef(({ orderData, userData, data }, ref) => {
    if (!orderData || !userData) {
      return <div>Loading...</div>; // Show a loading message if data is not yet available
    }

    return (
      <div
        ref={ref}
        className="text-black bg-white p-2 font-sans"
        style={{
          fontFamily: "Arial, sans-serif",
          pageBreakInside: "avoid",
          overflow: "hidden",
          boxSizing: "border-box",
        }}
      >
        {/* Company Logo */}
        <div className="flex justify-center mb-2">
          <img
            src={logo}
            alt="Company Logo"
            style={{
              maxWidth: "250px",
              height: "auto",
              marginBottom: "20px",
            }}
          />
        </div>

        {/* Content to be printed */}
        <div style={{ marginBottom: margin, marginTop: "14px" }}>
          <h1 className="text-blue-600" style={{ fontSize }}>
            Order Details
          </h1>
          <h2 className="text-blue-600" style={{ fontSize }}>
            Order Id: {orderData.id}
          </h2>
          <h3 className="text-blue-600" style={{ fontSize }}>
            Status: {orderData.orderStatus}
          </h3>
        </div>

        {/* Billing and Company Address */}
        <div className="flex justify-between mt-1" style={{ marginBottom: margin }}>
          <div style={{ flex: 1 }}>
            <h3 className="text-blue-600" style={{ fontSize }}>
              Billing To:
            </h3>
            <p style={{ fontSize }}>Name: {userData.name}</p>
            <p style={{ fontSize }}>Email: {userData.email}</p>
            <p style={{ fontSize }}>Phone Number: {userData.phoneNumber}</p>
            {orderData?.fuelType && <p style={{ fontSize }}>Fuel Type: {orderData.fuelType}</p>}
            <p style={{ fontSize }}>Appointment Date: {orderData.appointment.date}</p>
            <p style={{ fontSize }}>Appointment Time: {orderData.appointment.time}</p>
            <p style={{ fontSize }}>Location: {orderData.deliveryInfo.locationName}</p>
            <p style={{ fontSize }}>Ordered At: {new Date(orderData.createdAt).toDateString()}</p>
            <p style={{ fontSize }}>
              Payment Method:{" "}
              {orderData.paymentMethodName === "Installment Companies Al-rajhi"
                ? "Electronic Pay"
                : orderData.paymentMethodName}
            </p>
            {orderData.cancelReasonTxt?.length > 0 && (
              <p style={{ fontSize }}>Cancel Reason: {orderData.cancelReasonTxt}</p>
            )}
          </div>
          <div className="text-left" style={{ flex: 1, marginRight: "auto", paddingLeft: "220px" }}>
            <h3 className="text-blue-600" style={{ fontSize }}>
              Seller Information:
            </h3>
            <p style={{ fontSize }}>Company Name: Ismail Al Hamrani Trading Co.,</p>
            <p style={{ fontSize }}>Building No: 2524</p>
            <p style={{ fontSize }}>Address: Ibn Zyadun Street 2524, Al Malaz,</p>
            <p style={{ fontSize }}>City: Riyadh,</p>
            <p style={{ fontSize }}>Area: Riyadh,</p>
            <p style={{ fontSize }}>Country: Saudi Arabia,</p>
            <p style={{ fontSize }}>Postal Code: 12836,</p>
            <p style={{ fontSize }}>Vat No: 312146998700003,</p>
          </div>
        </div>

        <StyledTable
          className="w-full border-collapse mt-1 bg-white text-black"
          columns={PRODUCT_DETAIL_COLUMN_DEFS}
          dataSource={orderData.products}
          pagination={false}
          locale={{
            emptyText: <Empty text="No Products found" />,
          }}
          rowKey={(record) => record.id}
          headerStyle={{
            backgroundColor: "#f2f2f2",
            color: "black",
            padding: tablePadding,
            textAlign: "left",
            borderBottom: "1px solid #ddd",
            fontSize: tableFontSize,
          }}
          bodyStyle={{
            padding: tablePadding,
            borderBottom: "1px solid #ddd",
            fontSize: tableFontSize,
          }}
        />

        <div className="flex justify-end mt-1" style={{ marginTop: "33px" }}>
          <div className="text-right">
            <h3 className="text-blue-600" style={{ fontSize }}>
              Total Prices:
            </h3>
            <p style={{ fontSize }}>Sub Total: {orderData.orderPrice} SAR</p>
            <p style={{ fontSize }}>Discount: {orderData.discountPrice} ---</p>
            <p style={{ fontSize }}>Tax: {orderData.taxPrice} SAR</p>
            <p style={{ fontSize }}>Total: {orderData.totalPrice} SAR</p>
          </div>
        </div>

        {/* Page break before the Team Invoice Form */}
        <div
          style={{
            pageBreakBefore: "always", // Start on a new page
            marginTop: "10px",
            fontSize: "10px", // Reduced font size for TeamInvoiceForm
            color: "blue", // Text color
            padding: "5px", // Reduced padding to save space
            border: "1px solid #ddd", // Add a border for better structure
            borderRadius: "4px", // Slightly rounded corners
            backgroundColor: "#f9f9f9", // Light background for contrast
          }}
        >
          <TeamInvoiceForm data={data} />
        </div>
      </div>
    );
  });

  export default OrderPrintComponent;
