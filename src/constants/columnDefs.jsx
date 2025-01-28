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

import { Input, Select, Button, Switch, DatePicker } from "antd";
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

export const USERS_COLUMN_DEFS = [
  {
    title: "# user",
    dataIndex: "dbId",
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
          value={
            editableData.expiryDate ? moment(editableData.expiryDate) : null
          }
          onChange={(date) => handleDateChange(date)}
          // disabledDate={(current) => current && current < moment().startOf('day')}
          style={{ width: "200px" }}
          format="YYYY-MM-DD HH:mm:ss"
        />
      ) : text ? (
        moment(text).format("YYYY-MM-DD HH:mm:ss")
      ) : (
        ""
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
