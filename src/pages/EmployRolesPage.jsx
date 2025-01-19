import React from "react";
import PageHeader from "../layout/PageHeader";
import EmployRoleTable from "../widgets/EmployRoleTable/EmployRoleTable";
import CustomersInfobox from "../components/CustomersInfobox";

function EmployRolesPage() {
  return (
    <>
      <PageHeader title="Employee Roles" />
      <div className="widgets-grid grid-cols-1 xl:grid-cols-3">
        <div className="widgets-grid grid-cols-1 md:grid-cols-4 xl:col-span-3">
          <CustomersInfobox
            count={32987}
            iconClass="layer-group-regular"
            customer={false}
          />
          <CustomersInfobox
            label="Active"
            count={17153}
            color="green"
            iconClass="layer-group-regular"
            customer={false}
          />
          <CustomersInfobox
            label="Inactive"
            count={7587}
            color="red"
            iconClass="layer-group-regular"
            customer={false}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <button className="btn btn--primary">
              Add Role <i className="icon-circle-plus-regular" />
            </button>
          </div>
        </div>
      </div>
      <EmployRoleTable name={""} status={{ value: "default" }} />
    </>
  );
}

export default EmployRolesPage;
