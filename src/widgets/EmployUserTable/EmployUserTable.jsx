import React from "react";
import usePagination from "../../hooks/usePagination";
import { useEffect, useState } from "react";
import { useWindowSize } from "react-use";
import Spring from "../../components/Spring";
import StyledTable from "./styles";
import Pagination from "../../ui/Pagination";
import Empty from "../../components/Empty";
import { EMPLOY_USERS_COLUMN_DEFS } from "../../constants/columnDefs";
import EmployUserCollapseTable from "../../components/EmployUserCollapseTable";
import { useSelector } from "react-redux";

function EmployUserTable({ status, name }) {
  const { employAcountData } = useSelector((state) => state.project);
  const { width } = useWindowSize();
  const [activeCollapse, setActiveCollapse] = useState("");

  const pagination = usePagination(employAcountData, 5);

  // go to first page when period or sort changes and reset active collapse

  // reset active collapse when page or window width changes
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
          columns={EMPLOY_USERS_COLUMN_DEFS}
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
            <EmployUserCollapseTable
              key={order.dbId}
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

export default EmployUserTable;
