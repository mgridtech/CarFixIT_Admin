import React, { useState, useMemo } from "react";
import PageHeader from "../layout/PageHeader";
import CustomersInfobox from "../components/CustomersInfobox";
import UsersTable from "../widgets/UsersTable/UsersTable";
import { useSelector } from "react-redux";
import { CSVLink } from "react-csv";
import Search from "../ui/Search";

const Customers = () => {
  const { clientAccountData } = useSelector((state) => state.project);
  const [searchQuery, setSearchQuery] = useState("");

  // Create CSV data dynamically from clientAccountData
  const csvData = useMemo(() => {
    // Define CSV headers
    const headers = ["UserId", "Name", "Email", "Phone Number"];
    
    // Map clientAccountData to CSV row format
    const rows = clientAccountData?.map((customer) => [
      customer.skuId || customer.dbId || "N/A",  // UserId
      customer.name || "N/A",  // Name
      customer.userEmail || "N/A",  // Email
      `'${customer.phoneNumber || "N/A"}'`,  // Phone Number (as a string to preserve format)
    ]) || [];
  
    return [headers, ...rows]; // Add headers as the first row
  }, [clientAccountData]);
  

  return (
    <>
      <PageHeader title="Customers" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full items-center">
        <CustomersInfobox
          count={clientAccountData?.length}
          color="green"
          label="All"
          carlabel="Cars"
          customerlabel="Customers"
        />
        <CSVLink
          className="btn btn--outline blue !h-[44px] max-w-[320px] mx-auto"
          data={csvData} // Use dynamic customer data
          filename="customers.csv" // Optional filename for the CSV
        >
          Export CSV <i className="icon-file-export-solid" />
        </CSVLink>
        <Search
          wrapperClass="lg:w-[350px] h-[44px] mx-auto"
          placeholder="Search"
          query={searchQuery}
          setQuery={setSearchQuery}
        />
      </div>

      <UsersTable status={{ value: "default" }} name={searchQuery} />
    </>
  );
};

export default Customers;
