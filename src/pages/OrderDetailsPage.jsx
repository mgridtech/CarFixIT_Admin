
  // // import React, { useEffect, useState, useRef } from "react";
  // // import PageHeader from "../layout/PageHeader";
  // // import { useNavigate, useParams } from "react-router-dom";
  // // import { useSelector } from "react-redux";
  // // import { getStatusColor } from "../utils/helpers";
  // // import Spring from "../components/Spring";


  // // import StyledTable from "../widgets/UsersTable/styles";
  // // import { PRODUCT_DETAIL_COLUMN_DEFS } from "../constants/columnDefs";
  // // import Empty from "../components/Empty";
  // // import OrderDetailCollapseItem from "../components/OrderDetailCollapseItem";
  // // import { useWindowSize } from "react-use";
  // // import { getDataWithRef, getUserData } from "../db/databaseFunction"; // Import the corrected function
  // // import { useReactToPrint } from "react-to-print"; // Import react-to-print hook
  // // import OrderPrintComponent from "./OrderPrintComponent"; // Import the print component
  // // import TeamInvoiceForm from "../components/TeamInvoiceForm";

  // // function OrderDetailsPage() {
  // //   const { id } = useParams();
  // //   const {
  // //     myOrdersData,
  // //     clientAccountData,
  // //     filtersData,
  // //     oilsData,
  // //     tireData,
  // //     batteryData,
  // //     engineOilData,
  // //     engineOilPetrolData,
  // //   } = useSelector((state) => state.project);
  // //   const navigate = useNavigate();
  // //   const { width } = useWindowSize();
  // //   const [activeCollapse, setActiveCollapse] = useState("");
  // //   const [currentOrderData, setCurrentOrderData] = useState(null);
  // //   const [userData, setUserData] = useState(null);
  // //   const componentRef = useRef(null); // Ref for the print component
  // //   const [teamInvoiceData, setTeamInvoiceData] = useState(null);


  // //   useEffect(() => {
  // //     // Fetching order data and user data logic...
      
  // //     // Dummy customer data (replace with real data fetching logic)
  // //     setTeamInvoiceData({
  // //       name: "John Doe",
  // //       branch: "Main Branch",
  // //       invoiceDate: "2023-08-28",
  // //       invoiceNumber: "INV-12345",
  // //       phoneNumber: "+123456789",
  // //       carModel: "YARIS",
  // //       year: "2010",
  // //       make: "TOYOTA",
  // //       vin: "VIN123456789",
  // //       teamName: "Team A",
  // //       teamNumber: "123",
  // //       kilometer: "15000",
  // //       services: [
  // //         { name: "Tires and Check Tire Air Pressure", status: "done" },
  // //         { name: "Transmission Performance Check (if applicable)", status: "not-done" },
  // //         { name: "Brake System Check", status: "done" },
  // //         { name: "Bolts and Nuts", status: "done" },
  // //         { name: "Steering Operation and Linkages", status: "not-done" },
  // //         { name: "Fuel Lines and Hoses", status: "done" },
  // //         { name: "Safety Belts and Locks", status: "not-done" },
  // //         { name: "Inspect Filter Battery", status: "done" },
  // //         { name: "Battery Fluid", status: "done" },
  // //         { name: "Tank Solution Injector Cleaner", status: "not-done" },
  // //         { name: "Brake Fluid", status: "done" },
  // //         { name: "Front and Rear Suspension", status: "not-done" },
  // //         { name: "Drive Dust Boots", status: "done" },
  // //         { name: "Exhaust System", status: "done" },
  // //         { name: "Exterior Interior Lights", status: "done" },
  // //         { name: "Tire Rotation", status: "done" },
  // //       ],
  // //     });
  // //     getDataWithRef("teaminvoiceform", orderId);
  // //   }, [orderId]);
    


  // //   const handleBackClick = () => {
  // //     navigate("/orders");
  // //   };

  // //   const handleCollapse = (sku) => {
  // //     setActiveCollapse(activeCollapse === sku ? "" : sku);
  // //   };

  // //   useEffect(() => {
  // //     setActiveCollapse("");
  // //   }, [width]);

  // //   useEffect(() => {
  // //     const fetchData = async () => {
  // //       try {
  // //         if (id?.length > 0) {
  // //           console.log(`123455`,id)
  // //           const fetchedData = myOrdersData?.find((order) => order?.id === id);

  // //           if (!fetchedData) {
  // //             console.error("Order not found");
  // //             return;
  // //           }
  // //           const referencedata = await getDataWithRef(
  // //             "orderPayments",
  // //             fetchedData.id
  // //           );
  // //           const paymentinfo = referencedata?.paymentInfo.ref;
  // //           const fetchedUserData = await getUserData(
  // //             fetchedData?.OrderedByUserId
  // //           );

  // //           if (!fetchedUserData) {
  // //             console.error("User not found for order:", fetchedData);
  // //             return;
  // //           }
  // //           const finalData = {
  // //             ...fetchedData,
  // //             products: fetchedData?.products?.map((product) => {
  // //               const { id, quantity, referance } = product;
  // //               let dataToChoose = [];

  // //               switch (referance) {
  // //                 case "Oils":
  // //                   dataToChoose = oilsData;
  // //                   break;
  // //                 case "Filters":
  // //                   dataToChoose = filtersData;
  // //                   break;
  // //                 case "Tyres":
  // //                   dataToChoose = tireData;
  // //                   break;
  // //                 case "btteries":
  // //                   dataToChoose = batteryData;
  // //                   break;
  // //                 case "engineOil":
  // //                   dataToChoose = engineOilData;
  // //                   break;
  // //                 case "engineOilPetrol":
  // //                   dataToChoose = engineOilPetrolData;
  // //                   break;
  // //                 default:
  // //                   dataToChoose = [];
  // //                   break;
  // //               }

  // //               // Ensure there's data to choose from
  // //               if (!dataToChoose || dataToChoose.length === 0) {
  // //                 console.error("No data found for reference:", referance);
  // //                 return {
  // //                   id,
  // //                   quantity,
  // //                   name: "Unknown Product",
  // //                   description: "No details available",
  // //                   type: product?.type || "",
  // //                 };
  // //               }

  // //               const filteredData = dataToChoose?.find(
  // //                 (dat) => dat?.dbId === id
  // //               );

  // //               // Fallback for missing product data
  // //               if (!filteredData) {
  // //                 console.error("No matching product found in data for ID:", id);
  // //                 return {
  // //                   id,
  // //                   quantity,
  // //                   name: "Unknown Product",
  // //                   description: "No details available",
  // //                   type: product?.type || "",
  // //                 };
  // //               }

  // //               return {
  // //                 ...filteredData,
  // //                 quantity,
  // //                 type: product?.type || "",
  // //               };
  // //             }),
  // //             userInfo: {
  // //               phone: fetchedUserData?.phoneNumber,
  // //               name: fetchedUserData?.name,
  // //               email: fetchedUserData?.userEmail,
  // //             },
  // //             fuelType: fetchedData?.fuelType,
  // //             paymentinfo,
  // //           };

  // //           setCurrentOrderData(finalData);
  // //           setUserData(fetchedUserData);
  // //         } else {
  // //           navigate("/404");
  // //         }
  // //       } catch (error) {
  // //         console.error("Error fetching order details:", error);
  // //       }
  // //     };

  // //     fetchData();
  // //   }, [
  // //     myOrdersData,
  // //     id,
  // //     clientAccountData,
  // //     navigate,
  // //     batteryData,
  // //     engineOilData,
  // //     engineOilPetrolData,
  // //     filtersData,
  // //     oilsData,
  // //     tireData,
  // //   ]);
  // //   const handlePrint = useReactToPrint({
  // //     content: () => componentRef.current, // Define content to print
  // //   });

  // //   if (!currentOrderData || !userData) {
  // //     return null; // or return loading state if needed
  // //   }

  // //   return (
  // //     <>
  // //       <div className="order-details-content">
  // //         <button
  // //           className="btn btn--outline blue mb-3 !h-[44px]"
  // //           onClick={handleBackClick}
  // //         >
  // //           Back to Orders
  // //         </button>
  // //         <button
  // //           className="btn btn--outline blue mb-3 ml-2 !h-[44px]"
  // //           onClick={handlePrint} // Print button trigger
  // //         >
  // //           Print Order
  // //         </button>
  // //       </div>

  // //       <PageHeader title="Order Details" />

  // //       <div className="flex flex-col">
  // //         {/* Separate Component for Printing */}
  // //         <div className="flex flex-col">
  // //           <Spring className="card flex flex-col gap-5 md:gap-[26px] mb-[20px]">
  // //             <label className="h3 w-fit">Order Id :</label>
  // //             <label className="h5 w-fit">{id}</label>

  // //             <label className="h5 w-fit my-[10px]">
  // //               Status:{" "}
  // //               <span
  // //                 style={{
  // //                   color: `var(--${getStatusColor(
  // //                     currentOrderData?.orderStatus
  // //                   )})`,
  // //                   textTransform: "capitalize",
  // //                 }}
  // //               >
  // //                 {currentOrderData?.orderStatus}
  // //               </span>
  // //             </label>
  // //             <div className="flex-1 grid content-start gap-5 mb-8 sm:grid-cols-1 md:grid-cols-2 md:gap-[26px]">
  // //               <div className="w-full flex flex-col items-start justify-center">
  // //                 <label className="h3 my-3 md:my-[15px] w-fit">
  // //                   Billing To:
  // //                 </label>
  // //                 <label className="h5 w-fit mb-2">Name: {userData?.name}</label>{" "}
  // //                 {/* Render user data */}
  // //                 <label className="h5 w-fit mb-2">
  // //                   Email: {userData?.email}
  // //                 </label>{" "}
  // //                 {/* Render user data */}
  // //                 <label className="h5 w-fit mb-2">
  // //                   Phone Number: {userData?.phoneNumber} {/* Render user data */}
  // //                 </label>
  // //                 {currentOrderData?.fuelType && (
  // //                   <label className="h5 w-fit mb-2">
  // //                     Fuel Type: {currentOrderData?.fuelType}
  // //                   </label>
  // //                 )}
  // //                 <label className="h5 w-fit mb-2">
  // //                   Appointment Date: {currentOrderData?.appointment?.date}
  // //                 </label>
  // //                 <label className="h5 w-fit mb-2">
  // //                   Appointment Time: {currentOrderData?.appointment?.time}
  // //                 </label>
  // //                 <label className="h5 w-fit mb-2">
  // //                   Location: {currentOrderData?.deliveryInfo?.locationName}
  // //                 </label>
  // //                 <label className="h5 w-fit mb-2">
  // //                   Ordered At:{" "}
  // //                   {new Date(currentOrderData?.createdAt).toDateString()}
  // //                 </label>
  // //                 <label className="h5 w-fit mb-2">
  // //                   Payment Method:{" "}
  // //                   {currentOrderData?.paymentMethodName ===
  // //                   "Installment Companies Al-rajhi"
  // //                     ? "Electronic Pay"
  // //                     : currentOrderData?.paymentMethodName}
  // //                 </label>
  // //                 {currentOrderData?.cancelReasonTxt?.length > 0 && (
  // //                   <label className="h5 w-fit mb-2">
  // //                     Cancel Reason: {currentOrderData?.cancelReasonTxt}
  // //                   </label>
  // //                 )}
  // //                 <label className="h5 w-fit mb-2">
  // //                   Reference Id:{" "}
  // //                   {currentOrderData?.paymentinfo
  // //                     ? currentOrderData.paymentinfo
  // //                     : "- - -"}
  // //                 </label>
  // //               </div>
  // //             </div>
  // //           </Spring>

  // //           {width >= 768 ? (
  // //             <StyledTable
  // //               className="mb-[26px] mt-[26px]"
  // //               columns={PRODUCT_DETAIL_COLUMN_DEFS}
  // //               dataSource={currentOrderData?.products}
  // //               pagination={false}
  // //               locale={{
  // //                 emptyText: <Empty text="No Products found" />,
  // //               }}
  // //               rowKey={(record) => record.id}
  // //             />
  // //           ) : (
  // //             <div className="flex flex-1 flex-col gap-5 mb-[26px] mt-[26px]">
  // //               {currentOrderData?.products.map((order) => (
  // //                 <OrderDetailCollapseItem
  // //                   key={order.id}
  // //                   category={order}
  // //                   activeCollapse={activeCollapse}
  // //                   handleCollapse={handleCollapse}
  // //                 />
  // //               ))}
  // //             </div>
  // //           )}

  // //           <div className="self-end mt-8 md:mt-0 md:w-1/3 md:pl-4">
  // //             <Spring className="card flex flex-col gap-5 md:gap-[26px] mb-[20px]">
  // //               <label className="h3 my-[15px] w-fit">Total Prices:</label>
  // //               <label className="h5 w-fit">
  // //                 Sub Total :&nbsp;&nbsp;&nbsp;{currentOrderData?.orderPrice} SAR
  // //               </label>

  // //               <label className="h5 w-fit">
  // //                 Discount : &nbsp;&nbsp;&nbsp;{currentOrderData?.discountPrice}{" "}
  // //                 ---
  // //               </label>
  // //               <label className="h5 w-fit">
  // //                 Tax : &nbsp;&nbsp;&nbsp;{currentOrderData?.taxPrice} SAR
  // //               </label>
  // //               <label className="h5 w-fit">
  // //                 Total : &nbsp;&nbsp;&nbsp;{currentOrderData?.totalPrice} SAR
  // //               </label>
  // //             </Spring>
  // //           </div>

  // //    {/* Insert the TeamInvoiceForm Component Here */}
  // //       <TeamInvoiceForm data={teamInvoiceData} />


  // //         </div>
  // //       </div>
  // //       {/* Hidden component for printing */}
  // //       <div style={{ display: "none" }}>
  // //         <OrderPrintComponent
  // //           ref={componentRef}
  // //           orderData={currentOrderData}
  // //           userData={userData}
  // //         />
  // //       </div>
  // //     </>
  // //   );
  // // }

  // // export default OrderDetailsPage;

  // import React, { useEffect, useState, useRef } from "react";
  // import PageHeader from "../layout/PageHeader";
  // import { useNavigate, useParams } from "react-router-dom";
  // import { useSelector } from "react-redux";
  // import { getStatusColor } from "../utils/helpers";
  // import Spring from "../components/Spring";


  // import StyledTable from "../widgets/UsersTable/styles";
  // import { PRODUCT_DETAIL_COLUMN_DEFS } from "../constants/columnDefs";
  // import Empty from "../components/Empty";
  // import OrderDetailCollapseItem from "../components/OrderDetailCollapseItem";
  // import { useWindowSize } from "react-use";
  // import { getDataWithRef, getUserData } from "../db/databaseFunction"; // Import the corrected function
  // import { useReactToPrint } from "react-to-print"; // Import react-to-print hook
  // import OrderPrintComponent from "./OrderPrintComponent"; // Import the print component
  // import TeamInvoiceForm from "../components/TeamInvoiceForm";

  // function OrderDetailsPage() {
  //   const { id } = useParams();
  //   const {
  //     myOrdersData,
  //     clientAccountData,
  //     filtersData,
  //     oilsData,
  //     tireData,
  //     batteryData,
  //     engineOilData,
  //     engineOilPetrolData,
  //   } = useSelector((state) => state.project);
  //   const navigate = useNavigate();
  //   const { width } = useWindowSize();
  //   const [activeCollapse, setActiveCollapse] = useState("");
  //   const [currentOrderData, setCurrentOrderData] = useState(null);
  //   const [userData, setUserData] = useState(null);
  //   const componentRef = useRef(null); // Ref for the print component
  //   const [teamInvoiceData, setTeamInvoiceData] = useState(null);


  //   useEffect(() => {
  //     const fetchTeamInvoiceData = async (orderId) => {
  //       try {
  //         const fetchedTeamInvoiceData = await getDataWithRef("teaminvoiceform", orderId);
  //         setTeamInvoiceData(fetchedTeamInvoiceData);
  //       } catch (error) {
  //         console.error("Error fetching team invoice data:", error);
  //       }
  //     };

  //     if (id) {
  //       fetchTeamInvoiceData(id);
  //     }
  //   }, [id]);
   


  //   const handleBackClick = () => {
  //     navigate("/orders");
  //   };

  //   const handleCollapse = (sku) => {
  //     setActiveCollapse(activeCollapse === sku ? "" : sku);
  //   };

  //   useEffect(() => {
  //     setActiveCollapse("");
  //   }, [width]);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         if (id?.length > 0) {
  //           console.log(`123455`,id)
  //           const fetchedData = myOrdersData?.find((order) => order?.id === id);

  //           if (!fetchedData) {
  //             console.error("Order not found");
  //             return;
  //           }
  //           const referencedata = await getDataWithRef(
  //             "orderPayments",
  //             fetchedData.id
  //           );
  //           const paymentinfo = referencedata?.paymentInfo.ref;
  //           const fetchedUserData = await getUserData(
  //             fetchedData?.OrderedByUserId ? fetchedData.OrderedByUserId 
  //             :fetchedData.selectedCar.userId
  //           );

  //           if (!fetchedUserData) {
  //             console.error("User not found for order:", fetchedData);
  //             return;
  //           }
  //           const finalData = {
  //             ...fetchedData,
  //             products: fetchedData?.products?.map((product) => {
  //               const { id, quantity, referance } = product;
  //               let dataToChoose = [];

  //               switch (referance) {
  //                 case "Oils":
  //                   dataToChoose = oilsData;
  //                   break;
  //                 case "Filters":
  //                   dataToChoose = filtersData;
  //                   break;
  //                 case "Tyres":
  //                   dataToChoose = tireData;
  //                   break;
  //                 case "btteries":
  //                   dataToChoose = batteryData;
  //                   break;
  //                 case "engineOil":
  //                   dataToChoose = engineOilData;
  //                   break;
  //                 case "engineOilPetrol":
  //                   dataToChoose = engineOilPetrolData;
  //                   break;
  //                 default:
  //                   dataToChoose = [];
  //                   break;
  //               }

  //               // Ensure there's data to choose from
  //               if (!dataToChoose || dataToChoose.length === 0) {
  //                 console.error("No data found for reference:", referance);
  //                 return {
  //                   id,
  //                   quantity,
  //                   name: "Unknown Product",
  //                   description: "No details available",
  //                   type: product?.type || "",
  //                 };
  //               }

  //               const filteredData = dataToChoose?.find(
  //                 (dat) => dat?.dbId === id
  //               );

  //               // Fallback for missing product data
  //               if (!filteredData) {
  //                 console.error("No matching product found in data for ID:", id);
  //                 return {
  //                   id,
  //                   quantity,
  //                   name: "Unknown Product",
  //                   description: "No details available",
  //                   type: product?.type || "",
  //                 };
  //               }

  //               return {
  //                 ...filteredData,
  //                 quantity,
  //                 type: product?.type || "",
  //               };
  //             }),
  //             userInfo: {
  //               phone: fetchedUserData?.phoneNumber,
  //               name: fetchedUserData?.name,
  //               email: fetchedUserData?.userEmail,
  //             },
  //             fuelType: fetchedData?.fuelType,
  //             paymentinfo,
  //           };

  //           setCurrentOrderData(finalData);
  //           setUserData(fetchedUserData);
  //         } else {
  //           navigate("/404");
  //         }
  //       } catch (error) {
  //         console.error("Error fetching order details:", error);
  //       }
  //     };

  //     fetchData();
  //   }, [
  //     myOrdersData,
  //     id,
  //     clientAccountData,
  //     navigate,
  //     batteryData,
  //     engineOilData,
  //     engineOilPetrolData,
  //     filtersData,
  //     oilsData,
  //     tireData,
  //   ]);
  //   const handlePrint = useReactToPrint({
  //     content: () => componentRef.current, // Define content to print
  //   });

  //   if (!currentOrderData || !userData) {
  //     return null; // or return loading state if needed
  //   }

  //   return (
  //     <>
  //       <div className="order-details-content">
  //         <button
  //           className="btn btn--outline blue mb-3 !h-[44px]"
  //           onClick={handleBackClick}
  //         >
  //           Back to Orders
  //         </button>
  //         <button
  //           className="btn btn--outline blue mb-3 ml-2 !h-[44px]"
  //           onClick={handlePrint} // Print button trigger
  //         >
  //           Print Order
  //         </button>
  //       </div>

  //       <PageHeader title="Order Details" />

  //       <div className="flex flex-col">
  //         {/* Separate Component for Printing */}
  //         <div className="flex flex-col">
  //           <Spring className="card flex flex-col gap-5 md:gap-[26px] mb-[20px]">
  //             <label className="h3 w-fit">Order Id :</label>
  //             <label className="h5 w-fit">{id}</label>

  //             <label className="h5 w-fit my-[10px]">
  //               Status:{" "}
  //               <span
  //                 style={{
  //                   color: `var(--${getStatusColor(
  //                     currentOrderData?.orderStatus
  //                   )})`,
  //                   textTransform: "capitalize",
  //                 }}
  //               >
  //                 {currentOrderData?.orderStatus}
  //               </span>
  //             </label>
  //             <div className="flex-1 grid content-start gap-5 mb-8 sm:grid-cols-1 md:grid-cols-2 md:gap-[26px]">
  //               <div className="w-full flex flex-col items-start justify-center">
  //                 <label className="h3 my-3 md:my-[15px] w-fit">
  //                   Billing To:
  //                 </label>
  //                 <label className="h5 w-fit mb-2">Name: {userData?.name}</label>{" "}
  //                 {/* Render user data */}
  //                 <label className="h5 w-fit mb-2">
  //                   Email: {userData?.email}
  //                 </label>{" "}
  //                 {/* Render user data */}
  //                 <label className="h5 w-fit mb-2">
  //                   Phone Number: {userData?.phoneNumber} {/* Render user data */}
  //                 </label>
  //                 {currentOrderData?.fuelType && (
  //                   <label className="h5 w-fit mb-2">
  //                     Fuel Type: {currentOrderData?.fuelType}
  //                   </label>
  //                 )}
  //                 <label className="h5 w-fit mb-2">
  //                   Appointment Date: {currentOrderData?.appointment?.date}
  //                 </label>
  //                 <label className="h5 w-fit mb-2">
  //                   Appointment Time: {currentOrderData?.appointment?.time}
  //                 </label>
  //                 <label className="h5 w-fit mb-2">
  //                   Location: {currentOrderData?.deliveryInfo?.locationName}
  //                 </label>
  //                 <label className="h5 w-fit mb-2">
  //                   Ordered At:{" "}
  //                   {new Date(currentOrderData?.createdAt).toDateString()}
  //                 </label>
  //                 <label className="h5 w-fit mb-2">
  //                   Payment Method:{" "}
  //                   {currentOrderData?.paymentMethodName ===
  //                   "Installment Companies Al-rajhi"
  //                     ? "Electronic Pay"
  //                     : currentOrderData?.paymentMethodName}
  //                 </label>
  //                 {currentOrderData?.cancelReasonTxt?.length > 0 && (
  //                   <label className="h5 w-fit mb-2">
  //                     Cancel Reason: {currentOrderData?.cancelReasonTxt}
  //                   </label>
  //                 )}
  //                 <label className="h5 w-fit mb-2">
  //                   Reference Id:{" "}
  //                   {currentOrderData?.paymentinfo
  //                     ? currentOrderData.paymentinfo
  //                     : "- - -"}
  //                 </label>
  //               </div>
  //             </div>
  //           </Spring>

  //           {width >= 768 ? (
  //             <StyledTable
  //               className="mb-[26px] mt-[26px]"
  //               columns={PRODUCT_DETAIL_COLUMN_DEFS}
  //               dataSource={currentOrderData?.products}
  //               pagination={false}
  //               locale={{
  //                 emptyText: <Empty text="No Products found" />,
  //               }}
  //               rowKey={(record) => record.id}
  //             />
  //           ) : (
  //             <div className="flex flex-1 flex-col gap-5 mb-[26px] mt-[26px]">
  //               {currentOrderData?.products.map((order) => (
  //                 <OrderDetailCollapseItem
  //                   key={order.id}
  //                   category={order}
  //                   activeCollapse={activeCollapse}
  //                   handleCollapse={handleCollapse}
  //                 />
  //               ))}
  //             </div>
  //           )}

  //           <div className="self-end mt-8 md:mt-0 md:w-1/3 md:pl-4">
  //             <Spring className="card flex flex-col gap-5 md:gap-[26px] mb-[20px]">
  //               <label className="h3 my-[15px] w-fit">Total Prices:</label>
  //               <label className="h5 w-fit">
  //                 Sub Total :&nbsp;&nbsp;&nbsp;{currentOrderData?.orderPrice} SAR
  //               </label>

  //               <label className="h5 w-fit">
  //                 Discount : &nbsp;&nbsp;&nbsp;{currentOrderData?.discountPrice}{" "}
  //                 ---
  //               </label>
  //               <label className="h5 w-fit">
  //                 Tax : &nbsp;&nbsp;&nbsp;{currentOrderData?.taxPrice} SAR
  //               </label>
  //               <label className="h5 w-fit">
  //                 Total : &nbsp;&nbsp;&nbsp;{currentOrderData?.totalPrice} SAR
  //               </label>
  //             </Spring>
  //           </div>

  //   {/* Insert the TeamInvoiceForm Component Here */}
  //       <TeamInvoiceForm data={teamInvoiceData} />


  //         </div>
  //       </div>
  //       {/* Hidden component for printing */}
  //       <div style={{ display: "none" }}>
  //           <OrderPrintComponent
  //             ref={componentRef}
  //             orderData={currentOrderData}
  //             userData={userData}
  //             data={teamInvoiceData}
  //           />
  //       </div>
  //     </>
  //   );
  // }

  // export default OrderDetailsPage;
