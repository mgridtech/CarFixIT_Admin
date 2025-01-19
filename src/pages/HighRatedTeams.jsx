import React from "react";
import PageHeader from "../layout/PageHeader";
import TeamCollapseItemTable from "../components/TeamCollapseItemTable";

function HighRatedTeams() {
  const teamsData = [
    {
      name: "Team 1",
      rating: 4.7,
      orderRevenue: 1201,
      orders: 2100,
      id: 0,
    },
    {
      name: "Team 2",
      rating: 4.8,
      orderRevenue: 1204,
      orders: 4500,
      id: 1,
    },
    {
      name: "Team 3",
      rating: 4.9,
      orderRevenue: 1240,
      orders: 8500,
      id: 2,
    },
  ];
  return (
    <>
      <PageHeader title="Highest Rated Teams" />
      {teamsData?.map((dat) => (
        <TeamCollapseItemTable data={dat} />
      ))}
    </>
  );
}

export default HighRatedTeams;
