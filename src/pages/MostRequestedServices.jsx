import React from "react";
import PageHeader from "../layout/PageHeader";
import ServicesCollapseItem from "../components/ServicesCollapseItem";

function MostRequestedServices() {
  return (
    <>
      <PageHeader title="Most Requested Services" />
      <ServicesCollapseItem />
    </>
  );
}

export default MostRequestedServices;
