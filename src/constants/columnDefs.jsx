// components
import RatingStars from "../ui/RatingStars";
import SubmenuTrigger from "../ui/SubmenuTrigger";
import Timestamp from "../ui/Timestamp";
import { NavLink } from "react-router-dom";
import Trend from "../ui/Trend";
import trash from "../assets/icons/trash.svg";
// import ViewIcon from "../assets/icons/eye.svg";
import moment from "moment";

import Counter from "../components/Counter";

import { Input, Select, Button, Switch ,DatePicker} from "antd";
import { EditOutlined, SaveOutlined, CloseOutlined } from "@ant-design/icons";
// import { NavLink } from 'react-router-dom';

// utils
import {
  getStatusColor,
  getStatusColorNew,
  numFormatter,
} from "../utils/helpers";
import { removeData } from "../db/databaseFunction";
import { toast } from "react-toastify";
import ShowTeamInfo from "../components/ShowTeamInfo";
// import ShowDiemensions from "../components/ShowDiemensions";

// export const ORDERS_COLUMN_DEFS = [
//   {
//     title: "# order",
//     dataIndex: "id",
//     render: (text) => <span className="subheading-2">{text}</span>,
//   },
//   {
//     title: "Total Products",
//     dataIndex: "products",
//     className: "product-cell",
//     // render: (product) => {
//     //   const findQuantity = (data) => {
//     //     let quantity = 0;
//     //     data.map((dat) => {
//     //       quantity = quantity + dat.quantity ? dat.quantity : 1;
//     //       return null;
//     //     });
//     //     return quantity;
//     //   };
//     render: (product = []) => {
//       const findQuantity = (data) => {
//         let quantity = 0;
//         data.forEach((dat) => {
//           quantity += dat.quantity ? dat.quantity : 1;
//         });
//         return quantity;
//       };
//       const oilData = product.filter((dat) => dat.referance === "Oils");
//       const filterData = product.filter((dat) => dat.referance === "Filters");
//       const batteryData = product.filter((dat) => dat.referance === "btteries");
//       const tyreData = product.filter((dat) => dat.referance === "Tyres");
//       const engineOilData = product.filter(
//         (dat) => dat.referance === "engineOil"
//       );
//       const engineOilPetrolData = product.filter(
//         (dat) => dat.referance === "engineOilPetrol"
//       );
//       const oilsQuantity = findQuantity(oilData);
//       const filterQuantity = findQuantity(filterData);
//       const batteryQuantity = findQuantity(batteryData);
//       const tyreQuantity = findQuantity(tyreData);
//       const engineOilQuantity = findQuantity(engineOilData);
//       const engineOilPetrolQuantity = findQuantity(engineOilPetrolData);
//       const engileTotalQuantity = engineOilQuantity + engineOilPetrolQuantity;
//       return (
//         <div className="flex gap-6">
//           <h5 className="text-sm max-w-[195px] mb-1.5">
//             Filters :{filterQuantity}
//           </h5>
//           <h5 className="text-sm max-w-[195px] mb-1.5">Oils :{oilsQuantity}</h5>
//           <h5 className="text-sm max-w-[195px] mb-1.5">
//             Tyres :{tyreQuantity}
//           </h5>
//           <h5 className="text-sm max-w-[195px] mb-1.5">
//             Batteries :{batteryQuantity}
//           </h5>
//           <h5 className="text-sm max-w-[195px] mb-1.5">
//             Engine Oil :{engileTotalQuantity}
//           </h5>
//         </div>
//       );
//     },
//     responsive: ["lg"],
//   },
//   {
//     title: "Warrenty",
//     dataIndex: "warentyEnabled",
//     render: (Warrenty) => {
//       return (
//         <div className="flex flex-col px-6">
//           <span className="font-heading font-bold text-header">
//             {Warrenty ? "Yes" : "No"}
//           </span>
//         </div>
//       );
//     },
//   },
//   // {
//   //   title: "Category",
//   //   dataIndex: "category",
//   //   render: (category) => (
//   //     <div className="flex items-center gap-4">
//   //       <div
//   //         className={`badge-icon badge-icon--sm bg-${
//   //           getCategory(category).color
//   //         }`}
//   //       >
//   //         <i className={`${getCategory(category).icon} text-base`} />
//   //       </div>
//   //       <span className="label-text">{getCategory(category).label}</span>
//   //     </div>
//   //   ),
//   //   responsive: ["lg"],
//   // },
//   {
//     title: "Payment",
//     dataIndex: "totalPrice",
//     render: (payment) => {
//       return (
//         <div className="flex flex-col">
//           <span className="font-heading font-bold text-header">
//             {payment} SAR
//           </span>
//         </div>
//       );
//     },
//   },
//   {
//     title: "Order Status",
//     dataIndex: "orderStatus",
//     render: (status) => (
//       <span
//         className="badge-status badge-status--lg"
//         style={{ backgroundColor: `var(--${getStatusColor(status)})` }}
//       >
//         {status}
//       </span>
//     ),
//   },
//   {
//     title: "Rate",
//     dataIndex: "serviceRating",
//     render: (rating) => <RatingStars rating={rating ? rating : 0} />,
//     responsive: ["xl"],
//   },
//   {
//     title: "Actions",
//     dataIndex: "id",
//     //width: "70px",
//     render: (id) => {
//       const deleteOrder = async (id) => {
//         if (
//           !window.confirm(
//             `Are you sure you want to delete order with id ${id}?`
//           )
//         ) {
//           return;
//         } else {
//           await removeData("orders", id)
//             .then(() => {
//               toast.success("Order Deleted");
//             })
//             .catch((e) => {
//               toast.error(`Error: ${e}`);
//             });
//         }
//       };
//       return (
//         <div className="flex items-center justify-between gap-11">
//           <NavLink to={`/orderDetails/${id}`} aria-label="Details">
//             <img src={ViewIcon} alt="view" />
//           </NavLink>
//           <button onClick={() => deleteOrder(id)} aria-label="Edit">
//             <img src={trash} alt="trash" />
//           </button>
//         </div>
//       );
//     },
//   },
// ];


export const USERS_COLUMN_DEFS = [
  {
    title: "# user",
    dataIndex: "dbId",
    render: (text) => <span className="subheading-2">#{text}</span>,
  },
  // {
  //   title: "Profiless",
  //   dataIndex: "userImage",
  //   className: "product-cell",
  //   render: (profileImg) => (
  //     <div className="flex gap-6">
  //       <div className="img-wrapper w-[70px] h-[64px] flex items-center justify-center shrink-0">
  //         <img
  //           src={
  //             profileImg
  //               ? profileImg
  //               : "data:image/png;base64,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"
  //           }
  //           alt={"profilePicture"}
  //         />
  //       </div>
  //     </div>
  //   ),
  //   responsive: ["lg"],
  // },
  {
    title: "Name",
    dataIndex: "name",
    className: "product-cell",
    render: (text) => <h5 className="text-sm max-w-[195px] mb-1.5">{text}</h5>,
    responsive: ["lg"],
  },
  {
    title: "Phone",
    dataIndex: "phoneNumber",
  },
  {
    title: "Email",
    dataIndex: "userEmail",
  },

  {
    title: "Actions",
    dataIndex: "dbId",
    render: (id) => {
      const deleteOrder = async (id) => {
        if (
          !window.confirm(
            `Are you sure you want to delete order with id ${id}?`
          )
        ) {
          return;
        } else {
          await removeData("user", id)
            .then(() => {
              toast.success("Customer Account Deleted");
            })
            .catch((e) => {
              toast.error(`Error: ${e}`);
            });
        }
      };
      return (
        <div className="flex items-center justify-center">
          <button onClick={() => deleteOrder(id)} aria-label="Edit">
            <img src={trash} alt="trash" />
          </button>
        </div>
      );
    },
  },
];

export const PRODUCT_DETAIL_COLUMN_DEFS = [
  {
    title: "Item",
    render: (Product) => (
      <>
        <span className="inline-block h6 mb-1 !text-sm">
          {Product?.productNameEng}
        </span>
        <br />
        <span className="inline-block h6 !text-sm">
          {Product?.productNameArab}
        </span>
      </>
    ),
  },
  {
    title: "Description",
    render: (Product) => (
      <>
        <span className="inline-block mb-1 max-w-[250px] h6 !text-sm">
          {Product?.productDescEng}
        </span>
        <br />
        <span className="inline-block max-w-[250px] h6 !text-sm">
          {Product?.productDescArab}
        </span>
      </>
    ),
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
  },
  {
    title: "Price (1)",
    render: (Product) => (
      <span
        className="inline-block h6 !text-sm"
        style={{ textAlign: "right", width: "100%" }}
      >
        {Product?.type?.length > 0
          ? Product?.type === "original"
            ? Product?.originalPrice
            : Product?.commercialPrice
          : Product?.originalPrice}{" "}
        SAR
      </span>
    ),
  },
];
export const EMPLOY_USERS_COLUMN_DEFS = [
  {
    title: "# id",
    dataIndex: "dbId",
    render: (text) => <span className="subheading-2">{text}</span>,
  },

  {
    title: "Phone",
    dataIndex: "phone",
  },
  {
    title: "Job Id",
    dataIndex: "jobId",
  },
  {
    title: "Role",
    dataIndex: "role",
    render: (text) => {
      return (
        <h5 className="text-sm">
          {text === "SingleTeam"
            ? "Single Team"
            : text === "SingleDTeam"
            ? "Dedicated Team"
            : text === "supervisor"
            ? "Supervisor"
            : text === "dev"
            ? "Developer"
            : text === "admin"
            ? "Admin"
            : ""}
        </h5>
      );
    },
  },
  {
    title: "Team Info",
    dataIndex: "teamInfo",
    render: (teamInfo) => {
      return <ShowTeamInfo teamInfo={teamInfo} />;
    },
    responsive: ["lg"],
  },

  {
    title: "Actions",
    dataIndex: "dbId",
    render: (id) => {
      const deleteOrder = async (id) => {
        if (
          !window.confirm(
            `Are you sure you want to delete Employ with id ${id}?`
          )
        ) {
          return;
        } else {
          await removeData("employ", id)
            .then(() => {
              toast.success("Employ Deleted");
            })
            .catch((e) => {
              toast.error(`Error: ${e}`);
            });
        }
      };
      return (
        <div className="flex items-center justify-center gap-11">
          <button onClick={() => deleteOrder(id)} aria-label="Edit">
            <img src={trash} alt="trash" />
          </button>
        </div>
      );
    },
  },
];
export const CATEGORY_COLUMN_DEFS = [
  {
    title: "# ID",
    dataIndex: "id",
    width: "100px",
    render: (text) => <span className="subheading-2">#{text}</span>,
  },
  {
    title: "Name",
    dataIndex: "name",
    className: "product-cell",
    render: (text) => <h5 className="text-sm max-w-[195px] mb-1.5">{text}</h5>,
    responsive: ["lg"],
  },
  {
    title: "Created At",
    dataIndex: "time",
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (status) => (
      <span
        className="badge-status badge-status--lg"
        style={{ backgroundColor: `var(--${getStatusColorNew(status)})` }}
      >
        {status}
      </span>
    ),
  },

  {
    title: "Actions",
    dataIndex: "actions",
    render: () => (
      <div className="flex items-center justify-end gap-11">
        <NavLink to="#" aria-label="Edit">
          <i className="icon icon-pen-to-square-regular text-lg leading-none" />
        </NavLink>
        <NavLink to="#" aria-label="Edit">
          <img src={trash} alt="trash" />
        </NavLink>
      </div>
    ),
  },
];
export const EMPLOY_ROLE_COLUMN_DEFS = [
  {
    title: "# ID",
    dataIndex: "id",
    width: "100px",
    render: (text) => <span className="subheading-2">#{text}</span>,
  },
  {
    title: "Name",
    dataIndex: "name",
    className: "product-cell",
    render: (text) => <h5 className="text-sm max-w-[195px] mb-1.5">{text}</h5>,
    responsive: ["lg"],
  },
  {
    title: "Created At",
    dataIndex: "time",
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (status) => (
      <span
        className="badge-status badge-status--lg"
        style={{ backgroundColor: `var(--${getStatusColorNew(status)})` }}
      >
        {status}
      </span>
    ),
  },

  {
    title: "Actions",
    dataIndex: "actions",
    render: () => (
      <div className="flex items-center justify-end gap-11">
        <NavLink to="#" aria-label="Edit">
          <i className="icon icon-pen-to-square-regular text-lg leading-none" />
        </NavLink>
        <NavLink to="#" aria-label="Edit">
          <img src={trash} alt="trash" />
        </NavLink>
      </div>
    ),
  },
];
export const TRANSACTIONS_COLUMN_DEFS = [
  {
    title: "Order Id",
    dataIndex: "id",
    render: (prd) => {
      return <span className="subheading-2">{prd}</span>;
    },
  },
  {
    title: "Date & Time",
    dataIndex: "updatedAt",
    render: (timestamp) => <Timestamp date={timestamp} />,
  },
  // {
  //   title: "Seller",
  //   dataIndex: "seller",
  //   render: (text, record) => {
  //     return (
  //       <>
  //         {record.seller ? (
  //           <div className="flex items-center gap-[18px]">
  //             <div className="img-wrapper w-[60px] h-[60px] flex items-center justify-center shrink-0">
  //               <img
  //                 className="max-w-[50px]"
  //                 src={record.seller.logo}
  //                 alt={record.seller.name}
  //               />
  //             </div>
  //             <span className="hidden truncate lg:inline">
  //               {record.seller.name}
  //             </span>
  //           </div>
  //         ) : (
  //           "N/A"
  //         )}
  //       </>
  //     );
  //   },
  // },
  // {
  //   title: "SKU",
  //   dataIndex: "sku",
  //   responsive: ["lg"],
  // },
  // {
  //   title: "Method",
  //   dataIndex: "method",
  //   responsive: ["xxl"],
  // },
  // {
  //   title: "Type",
  //   dataIndex: "type",
  //   render: (type) => <span className="capitalize">{type}</span>,
  // },
  {
    title: "Status",
    dataIndex: "orderStatus",
    render: (status) => (
      <span
        className="badge-status"
        style={{ backgroundColor: `var(--${getStatusColor(status)})` }}
      >
        {status}
      </span>
    ),
  },
  // {
  //   title: "Country",
  //   dataIndex: "country",
  //   responsive: ["xxl"],
  // },
  // {
  //   title: "Curr",
  //   dataIndex: "currency",
  //   responsive: ["xl"],
  // },
  // {
  //   title: "Fee",
  //   dataIndex: "fee",
  //   responsive: ["xl"],
  // },
  // {
  //   title: "Tax",
  //   dataIndex: "tax",
  //   responsive: ["xl"],
  // },
  {
    title: "Total",
    dataIndex: "totalPrice",
    render: (text) => {
      return (
        <span className="font-heading font-semibold text-header">
          {text} SAR
        </span>
      );
    },
  },
];

export const SELLERS_COLUMN_DEFS = [
  {
    title: "Seller",
    dataIndex: "seller",
    render: (text, record) => (
      <div className="flex gap-[26px]">
        <div className="img-wrapper flex items-center justify-center w-[63px] h-[63px] shrink-0">
          <img className="max-w-[50px]" src={record.logo} alt={record.name} />
        </div>
        <div className="flex flex-col items-start">
          <a className="mt-3 mb-2.5" href={`tel:${record.phone}`}>
            {record.phone}
          </a>
          <a href={`mailto:${record.email}`}>{record.email}</a>
        </div>
      </div>
    ),
  },
  {
    title: "Orders value",
    dataIndex: "ordersValue",
    render: () => (
      <div className="flex flex-col">
        <Counter className="h3" num={65874} />
        <span className="label-text mt-0.5 mb-2.5">New orders</span>
        <Trend value={55.96} />
      </div>
    ),
    responsive: ["lg"],
  },
  {
    title: "Income value",
    dataIndex: "incomeValue",
    render: () => (
      <div className="flex flex-col">
        <Counter className="h3" num={23000} prefix="$" isFormatted />
        <span className="label-text mt-0.5 mb-2.5">Income</span>
        <Trend value={14.56} />
      </div>
    ),
    responsive: ["lg"],
  },
  {
    title: "Review rate",
    dataIndex: "rating",
    render: (rating) => <RatingStars rating={rating} />,
  },
  {
    title: "Sales categories value",
    dataIndex: "salesCategoriesValue",
    render: (text, record) => (
      <div className="flex flex-col gap-2.5 max-w-[220px]">
        <div className="flex justify-between font-heading font-bold text-sm">
          <span>Electronics</span>
          <span className="text-header text-right">
            {numFormatter(record.profit.electronics, 2, "$")}
          </span>
        </div>
        <div className="flex justify-between font-heading font-bold text-sm">
          <span>Fashion</span>
          <span className="text-header text-right">
            {numFormatter(record.profit.fashion, 2, "$")}
          </span>
        </div>
        <div className="flex justify-between font-heading font-bold text-sm">
          <span>Food & Drinks</span>
          <span className="text-header text-right">
            {numFormatter(record.profit.food, 2, "$")}
          </span>
        </div>
        <div className="flex justify-between font-heading font-bold text-sm">
          <span>Services</span>
          <span className="text-header text-right">
            {numFormatter(record.profit.services, 2, "$")}
          </span>
        </div>
      </div>
    ),
    responsive: ["xl"],
  },
  {
    title: "Other",
    dataIndex: "other",
    render: () => (
      <div className="flex items-center justify-end gap-5">
        <button aria-label="Edit">
          <i className="icon icon-pen-to-square-regular text-lg leading-none" />
        </button>
        <SubmenuTrigger />
      </div>
    ),
  },
];


  export const CATEGORY_MANAGEMENT_COLUMN_DEFS = [
    { title: "Category Name", dataIndex: "categoryName", key: "categoryName" },
    { title: "Created At", dataIndex: "createdAt", key: "createdAt" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Actions", dataIndex: "actions", key: "actions" },
  ];

  // export const PRODUCTS_MANAGEMENT_COLUMN_DEFS = [
  //   {
  //     title: "#Id",
  //     render: (image) => (
  //       <span className="inline-block h6 w-auto text-sm">
  //         {image?.skuId ? image?.skuId : image?.dbId}
  //       </span>
  //     ),
  //   },
  //   {
  //     title: "Product name",
  //     render: (Product) => (
  //       <>
  //         <span className="inline-block h6 !text-sm">
  //           English: {Product?.productNameEng}
  //         </span>
  //         <br />
  //         <span className="inline-block h6 !text-sm">
  //           Arabic: {Product?.productNameArab}
  //         </span>
  //       </>
  //     ),
  //   },
  //   // {
  //   //   title: "Stock",
  //   //   dataIndex: "stock",
  //   //   width: 130,
  //   //   render: (stock) => (
  //   //     <div className="flex items-center gap-5">
  //   //       {stock == null ? (
  //   //         "On Demand"
  //   //       ) : (
  //   //         <span>
  //   //           <span className={`${stock !== 0 ? "text-green" : "text-red"}`}>
  //   //             {stock !== 0
  //   //               ? stock >= 10
  //   //                 ? "In stock "
  //   //                 : "Low Inventory "
  //   //               : "Out of stock "}
  //   //           </span>
  //   //           ({stock})
  //   //         </span>
  //   //       )}
  //   //     </div>
  //   //   ),
  //   // },
  //   {
  //     title: "Price (SAR)",
  //     render: (Product) => (
  //       <>
  //         <span className="inline-block h6 !text-sm max-w-[155px]">
  //           Original: {Product?.originalPrice}
  //         </span>
  //         <br />
  //         {Product?.commercialPrice && (
  //           <span className="inline-block h6 !text-sm max-w-[155px]">
  //             Commercial: {Product?.commercialPrice}
  //           </span>
  //         )}
  //       </>
  //     ),
  //   },
  //   {
  //     title: "Type",
  //     dataIndex: "reference",
  //     render: (type) => (
  //       <span className="capitalize">
  //         {type === "Oils"
  //           ? "Oil"
  //           : type === "Filters"
  //           ? "Filter"
  //           : type === "Tyres"
  //           ? "Tyre"
  //           : type === "btteries"
  //           ? "Battery"
  //           : type === "engineOil"
  //           ? "Engine Oil"
  //           : type === "engineOilPetrol"
  //           ? "Engine Oil Petrol"
  //           : "-"}
  //       </span>
  //     ),
  //     responsive: ["lg"],
  //   },
  //   {
  //     title: "Warenty",
  //     dataIndex: "warenty",
  //     render: (type) => (
  //       <span className="capitalize">{type ? type : 0} Years</span>
  //     ),
  //   },

  //   {
  //     title: "Diemensions",
  //     render: (product) => (
  //       <>
  //         {product?.productDiemensions?.length > 0 ? (
  //           <ShowDiemensions dim={product.productDiemensions} />
  //         ) : (
  //           "-"
  //         )}
  //       </>
  //     ),
  //     responsive: ["lg"],
  //   },
  //   {
  //     title: "Actions",
  //     render: (product) => {
  //       const deleteOrder = async (id, refer) => {
  //         if (id?.length > 0 && refer?.length > 0) {
  //           if (
  //             !window.confirm(
  //               `Are you sure you want to delete product with id ${id}?`
  //             )
  //           ) {
  //             return;
  //           } else {
  //             await removeData(refer, id)
  //               .then(() => {
  //                 toast.success("Product Deleted");
  //               })
  //               .catch((e) => {
  //                 toast.error(`Error: ${e}`);
  //               });
  //           }
  //         } else {
  //           toast.error("Product Id or Type not found");
  //         }
  //       };
  //       return (
  //         <div className="flex items-center justify-end gap-7">
  //           <NavLink
  //             to={`/editProduct/${product.dbId}/${product.reference}`}
  //             aria-label="Edit"
  //           >
  //             <i className="icon icon-pen-to-square-regular text-lg leading-none" />
  //           </NavLink>
  //           <button
  //             onClick={() => deleteOrder(product.dbId, product.reference)}
  //             to="#"
  //             aria-label="Edit"
  //           >
  //             <img src={trash} alt="trash" />
  //           </button>
  //           {/* <SubmenuTrigger /> */}
  //         </div>
  //       );
  //     },
  //   },
  // ];

const { Option } = Select;
export const getDiscountsColumnDefs = ({
  handleStatusToggle,
  handleEditClick,
  handleSave,
  handleCancel,
  editingRowId,
  editableData,
  handleChange,
  handleSelectChange,
}) => [
  {
    title: "S.No",
    dataIndex: "serialNumber",
    key: "serialNumber",
    render: (text, record, index) => index + 1,
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
      render: (text) => text,
    // render: (text, record) =>
    //   editingRowId === record.id || editingRowId === record.dbId ? (
    //     <Input
    //       value={editableData.category}
    //       onChange={(e) => handleChange(e, "category")}
    //       style={{ width: "200px" }}
    //     />
    //   ) : (
    //     text
    //   ),
  },
  {
    title: "Type (%/Amt)",
    dataIndex: "type",
    key: "type",
    render: (text, record) =>
      editingRowId === record.id || editingRowId === record.dbId ? (
        <Select
          value={editableData.type}
          onChange={(value) => handleSelectChange(value, "type")}
          style={{ width: "200px" }}
        >
          <Option value="Percentage">Percentage</Option>
          <Option value="Amount">Amount</Option>
        </Select>
      ) : (
        text
      ),
  },
  {
    title: "Value",
    dataIndex: "value",
    key: "value",
    render: (text, record) =>
      editingRowId === record.id || editingRowId === record.dbId ? (
        <Input
          value={editableData.value}
          type="number"
          onChange={(e) => handleChange(e, "value")}
          style={{ width: "200px" }}
        />
      ) : (
        <span className="font-heading font-bold text-header">{text}</span>
      ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status, record) => (
      <div className="flex items-center gap-2">
        <Switch
          checked={status}
          onChange={(checked) => handleStatusToggle(record, checked)}
        />
        <span>{status ? "On" : "Off"}</span>
      </div>
    ),
  },
  {
    title: "Actions",
    key: "actions",
    render: (text, record) =>
      editingRowId === record.id || editingRowId === record.dbId ? (
        <div className="flex items-center gap-2">
          <Button
            type="link"
            icon={<SaveOutlined />}
            onClick={handleSave}
          />
          <Button
            type="link"
            icon={<CloseOutlined />}
            onClick={handleCancel}
          />
        </div>
      ) : (
        <Button
          type="link"
          icon={<EditOutlined />}
          onClick={() => handleEditClick(record)}
        />
      ),
  },
];



export const getCouponsColumnDefs = ({
  handleEditClick,
  handleSave,
  handleCancel,
  editingRowId,
  editableData,
  handleChange,
  handleSelectChange,
  handleDateChange,
  handleStatusToggle,
}) => [
  {
    title: "S.No",
    dataIndex: "serialNumber",
    key: "serialNumber",
    render: (text, record, index) => index + 1,
  },
  {
    title: "Coupon Name",
    dataIndex: "couponName",
    key: "couponName",
    render: (text, record) =>
      editingRowId === record.id ? (
        <Input
          value={editableData.couponName}
          onChange={(e) => handleChange(e, "couponName")}
          style={{ width: "200px" }}
        />
      ) : (
        text
      ),
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    render: (text, record) =>
      editingRowId === record.id ? (
        <Select
          value={editableData.category}
          onChange={(value) => handleSelectChange(value, "category")}
          style={{ width: "200px" }}
        >
          <Option value="Filters">Filters</Option>
          <Option value="Oils">Oils</Option>
          <Option value="Batteries">Batteries</Option>
          <Option value="Tyres">Tyres</Option>
          <Option value="Engine Oil Petrol">Engine Oil Petrol</Option>
          <Option value="Engine Oil Diesel">Engine Oil Diesel</Option>
        </Select>
      ) : (
        text
      ),
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    render: (text, record) =>
      editingRowId === record.id ? (
        <Select
          value={editableData.type}
          onChange={(value) => handleSelectChange(value, "type")}
          style={{ width: "200px" }}
        >
          <Option value="Percentage">Percentage</Option>
          <Option value="Amount">Amount</Option>
        </Select>
      ) : (
        text
      ),
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: (text, record) =>
      editingRowId === record.id ? (
        <Input
          value={editableData.amount}
          type="number"
          onChange={(e) => handleChange(e, "amount")}
          style={{ width: "200px" }}
        />
      ) : (
        text
      ),
  },
  {
    title: "Order Min Amount",
    dataIndex: "orderMinAmount",
    key: "orderMinAmount",
    render: (text, record) =>
      editingRowId === record.id ? (
        <Input
          value={editableData.orderMinAmount}
          type="number"
          onChange={(e) => handleChange(e, "orderMinAmount")}
          style={{ width: "200px" }}
        />
      ) : (
        text
      ),
  },
   {
    title: "Expiry Date",
    dataIndex: "expiryDate",
    key: "expiryDate",
    render: (text, record) =>
      editingRowId === record.id ? (
        <DatePicker
          showTime
          value={editableData.expiryDate ? moment(editableData.expiryDate) : null}
          onChange={(date) => handleDateChange(date)}
          // disabledDate={(current) => current && current < moment().startOf('day')}
          style={{ width: "200px" }}
          format="YYYY-MM-DD HH:mm:ss"
        />
      ) : (
        text ? moment(text).format("YYYY-MM-DD HH:mm:ss") : ""
      ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status, record) => (
      <Switch
        checked={status}
        onChange={(checked) => handleStatusToggle(record.id, checked)}
      />
    ),
  },
  {
    title: "Actions",
    key: "actions",
    render: (text, record) =>
      editingRowId === record.id ? (
        <div className="flex items-center gap-2">
          <Button type="link" icon={<SaveOutlined />} onClick={handleSave} />
          <Button type="link" icon={<CloseOutlined />} onClick={handleCancel} />
        </div>
      ) : (
        <Button
          type="link"
          icon={<EditOutlined />}
          onClick={() => handleEditClick(record)}
        />
      ),
  },
];



