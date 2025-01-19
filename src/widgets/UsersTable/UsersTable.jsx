import React from "react";
import usePagination from "../../hooks/usePagination";
import { useEffect, useState } from "react";
import { useWindowSize } from "react-use";

import Spring from "../../components/Spring";
import StyledTable from "./styles";
import Pagination from "../../ui/Pagination";
import Empty from "../../components/Empty";
import { USERS_COLUMN_DEFS } from "../../constants/columnDefs";
import UserCollapseItem from "../../components/UserCollapseItem";
import { useSelector } from "react-redux";

function UsersTable({ status, name }) {
  const { width } = useWindowSize();
  const { clientAccountData } = useSelector((state) => state.project);
  const [activeCollapse, setActiveCollapse] = useState("");
  const filteredDataRaw =
    name?.lenght <= 0
      ? clientAccountData
      : clientAccountData.filter(
          (order) =>
            order.name.toLowerCase().includes(`${name}`.toLowerCase()) ||
            order.name === `${name}` ||
            order.phoneNumber.toLowerCase().includes(`${name}`.toLowerCase()) ||
            order.phoneNumber === `${name}` ||
            order.userEmail.toLowerCase().includes(`${name}`.toLowerCase()) ||
            order.userEmail === `${name}`
        );
  const filteredData =
    status.value === "default"
      ? filteredDataRaw
      : filteredDataRaw.filter((order) => order.status === status.value);

  const pagination = usePagination(filteredData, 25);

  useEffect(() => {
    setActiveCollapse("");
  }, [pagination.currentPage, width]);

  const handleCollapse = (sku) => {
    if (activeCollapse === sku) {
      setActiveCollapse("");
    } else {
      setActiveCollapse(sku);
    }
  };

  return (
    <Spring className="flex flex-col flex-1 w-full">
      {width >= 768 ? (
        <StyledTable
          className="mb-[26px] mt-[26px]"
          columns={USERS_COLUMN_DEFS}
          dataSource={pagination.currentItems()}
          pagination={false}
          locale={{
            emptyText: <Empty text="No orders found" />,
          }}
          rowKey={(record) => record.id}
        />
      ) : (
        <div className="flex flex-1 flex-col gap-5 mb-[26px] mt-[26px]">
          {pagination.currentItems().map((order) => (
            <UserCollapseItem
              key={order.id}
              user={order}
              activeCollapse={activeCollapse}
              handleCollapse={handleCollapse}
            />
          ))}
        </div>
      )}
      {pagination.maxPage > 1 && <Pagination pagination={pagination} />}
    </Spring>
  );
}

export default UsersTable;
