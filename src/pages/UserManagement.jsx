import React, { useState } from "react";
import PageHeader from "../layout/PageHeader";
import Search from "../ui/Search";
import { useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
import UserManagementTable from "../widgets/UserManagementTable";

const UserManagement = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Static user data for export
  const usersData = [
    {
      id: 1,
      userName: "John Doe",
      email: "john.doe@example.com",
      phoneNumber: "123-456-7890",
    },
    {
      id: 2,
      userName: "Jane Smith",
      email: "jane.smith@example.com",
      phoneNumber: "987-654-3210",
    },
    {
      id: 3,
      userName: "Alice Johnson",
      email: "alice.johnson@example.com",
      phoneNumber: "555-555-5555",
    },
  ];

  const csvData = [
    ["User Id", "User Name", "Email", "Phone Number"],
    ...usersData.map((user) => [
      user.id,
      user.userName,
      user.email,
      user.phoneNumber,
    ]),
  ];

  return (
    <>
      <PageHeader title="User Management" />
      <div className="flex flex-col-reverse gap-4 mb-5 md:flex-col lg:flex-row lg:justify-between">
        <div className="flex flex-col gap-4 md:flex-row md:gap-[14px]">
          <button
            onClick={() => navigate("/addUser")}
            className="btn btn--primary"
          >
            Add new user <i className="icon-circle-plus-regular" />
          </button>
          <CSVLink
            className="btn btn--outline blue !h-[44px]"
            data={csvData}
            filename={"users.csv"}
          >
            Export CSV <i className="icon-file-export-solid" />
          </CSVLink>
        </div>
        <Search
          wrapperClass="lg:w-[326px]"
          placeholder="Search User"
          query={searchQuery}
          setQuery={setSearchQuery}
        />
      </div>
      <UserManagementTable searchQuery={searchQuery} />
    </>
  );
};

export default UserManagement;