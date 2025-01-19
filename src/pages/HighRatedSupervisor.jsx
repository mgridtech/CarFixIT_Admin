import React from "react";
import PageHeader from "../layout/PageHeader";
import SupervisorsCollapseItemTable from "../components/SupervisorsCollapseItemTable";

function HighRatedSupervisor() {
  const supervisorData = [
    {
      name: "Supervisor 1",
      rating: 4.7,
      orderRevenue: 1201,
      orders: 2100,
      id: 0,
    },
    {
      name: "Supervisor 2",
      rating: 4.8,
      orderRevenue: 1204,
      orders: 4500,
      id: 1,
    },
    {
      name: "Supervisor 3",
      rating: 4.9,
      orderRevenue: 1240,
      orders: 8500,
      id: 2,
    },
  ];
  return (
    <>
      <PageHeader title="Highest Rated Supervisors" />
      {supervisorData?.map((dat) => (
        <SupervisorsCollapseItemTable data={dat} />
      ))}
    </>
  );
}

export default HighRatedSupervisor;
