import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StyledTable from "./styles";
import Empty from "../../components/Empty";
import Pagination from "../../ui/Pagination";
import { useWindowSize } from "react-use";
import { FaEye } from "react-icons/fa";
import Select from "../../ui/Select";
import usePagination from "../../hooks/usePagination";

const UserManagementTable = ({ searchQuery }) => {
  const { width } = useWindowSize();
  const navigate = useNavigate();

  // Dummy data for users
  const dummyUsers = [
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
    {
      id: 4,
      userName: "Bob Brown",
      email: "bob.brown@example.com",
      phoneNumber: "111-222-3333",
    },
    {
      id: 5,
      userName: "Charlie Davis",
      email: "charlie.davis@example.com",
      phoneNumber: "444-555-6666",
    },
  ];

  const [users, setUsers] = useState(dummyUsers); // State to store users
  const [filteredData, setFilteredData] = useState(dummyUsers); // State to store filtered users
  const pagination = usePagination(filteredData, 10); // Pagination hook

  // Navigate to user details page
  const handleViewClick = (userId) => {
    navigate(`/userDetails/${userId}`);
  };

  // Filter data by search query
  useEffect(() => {
    let filtered = users;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((user) =>
        user.userName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredData(filtered);
  }, [searchQuery, users]);

  return (
    <div className="flex flex-col flex-1">
      {/* Table or Cards */}
      <div className="flex flex-1 flex-col gap-[22px] mt-4">
        {width >= 768 ? (
          <StyledTable
            columns={[
              {
                title: "S.no",
                dataIndex: "id",
                key: "id",
                align: "center",
                render: (_, __, index) => <span>{index + 1}</span>,
              },
              {
                title: "User Name",
                dataIndex: "userName",
                key: "userName",
              },
              {
                title: "Email",
                dataIndex: "email",
                key: "email",
              },
              {
                title: "Phone Number",
                dataIndex: "phoneNumber",
                key: "phoneNumber",
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
                      onClick={() => handleViewClick(record.id)}
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
              emptyText: <Empty text="No users found" />,
            }}
            pagination={false}
          />
        ) : (
          <div className="flex flex-col gap-5">
            {pagination.currentItems().map((item) => (
              <div className="card" key={`user-${item.id}`}>
                <h6>User Name: {item.userName}</h6>
                <p>Email: {item.email}</p>
                <p>Phone Number: {item.phoneNumber}</p>
                <div className="flex items-center justify-center gap-3">
                  <button
                    className="px-3 py-1 text-green-500 hover:text-green-700"
                    onClick={() => handleViewClick(item.id)}
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

export default UserManagementTable;