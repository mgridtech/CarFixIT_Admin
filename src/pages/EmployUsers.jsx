import React from "react";
import PageHeader from "../layout/PageHeader";
import EmployUserTable from "../widgets/EmployUserTable/EmployUserTable";
import { CSVLink } from "react-csv";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function EmployUsers() {
  const csvData = [
    ["firstname", "lastname", "email"],
    ["John", "Doe", "johndoe@domain.com"],
    ["Jane", "Doe", "janedoe@domain.com"],
  ];
  const { employAcountData } = useSelector((state) => state.project);
  console.log(employAcountData);
  const navigate = useNavigate();
  return (
    <>
      <PageHeader title="Employee" />
      <div className="widgets-grid grid-cols-1 xl:grid-cols-3">
        <div className="widgets-grid grid-cols-1 md:grid-cols-4 xl:col-span-3">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <button
              onClick={() => navigate("/addEmploy")}
              className="btn btn--primary"
            >
              Add Employ <i className="icon-circle-plus-regular" />
            </button>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CSVLink className="btn btn--outline blue !h-[44px]" data={csvData}>
              Export CSV <i className="icon-file-export-solid" />
            </CSVLink>
          </div>
        </div>
      </div>
      <EmployUserTable status={{ value: "default" }} name={""} />
    </>
  );
}

export default EmployUsers;
