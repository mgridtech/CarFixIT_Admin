// import React, { useEffect, useState } from "react";
// import styled from "styled-components";

// // Styled components for the team invoice form
// const TeamInvoiceFormSection = styled.div`
//   background-color: var(--widget); /* Matches the card background color */
//   padding: 20px;
//   border-radius: 10px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
// `;

// const FormTitle = styled.h2`
//   font-size: 24px;
//   font-weight: bold;
//   color: var(--primary); /* Primary color */
//   border-bottom: 2px solid var(--primary);
//   padding-bottom: 10px;
//   margin-bottom: 20px;
// `;

// const FormItem = styled.div`
//   margin-bottom: 15px;
// `;

// const FormLabel = styled.span`
//   font-size: 18px;
//   font-weight: bold;
//   color: var(--primary); /* Primary color */
//   margin-right: 10px;
// `;

// const FormValue = styled.p`
//   font-size: 16px;
//   color: var(--text-color); /* Text color (assuming --text-color is defined) */
//   margin: 0;
// `;

// const TeamInvoiceForm = () => {
//   const [teamInvoiceData, setTeamInvoiceData] = useState(null);

//   useEffect(() => {
//     // Dummy team invoice data (replace with real data fetching logic)
//     setTeamInvoiceData({
//       name: "John Doe",
//       branch: "Main Branch",
//       invoiceDate: "2023-08-28",
//       invoiceNumber: "INV-12345",
//       phoneNumber: "+123456789",
//       carModel: "YARIS",
//       year: "2010",
//       make: "TOYOTA",
//       vin: "VIN123456789",
//       teamName: "Team A",
//       teamNumber: "123",
//       kilometer: "15000",
//       services: [
//         { name: "Tires and Check Tire Air Pressure", status: "done" },
//         { name: "Transmission Performance Check (if applicable)", status: "not-done" },
//         { name: "Brake System Check", status: "done" },
//         { name: "Bolts and Nuts", status: "done" },
//         { name: "Steering Operation and Linkages", status: "not-done" },
//         { name: "Fuel Lines and Hoses", status: "done" },
//         { name: "Safety Belts and Locks", status: "not-done" },
//         { name: "Inspect Filter Battery", status: "done" },
//         { name: "Battery Fluid", status: "done" },
//         { name: "Tank Solution Injector Cleaner", status: "not-done" },
//         { name: "Brake Fluid", status: "done" },
//         { name: "Front and Rear Suspension", status: "not-done" },
//         { name: "Drive Dust Boots", status: "done" },
//         { name: "Exhaust System", status: "done" },
//         { name: "Exterior Interior Lights", status: "done" },
//         { name: "Tire Rotation", status: "done" },
//       ],
//     });
//   }, []);

//   if (!teamInvoiceData) return <p>Loading...</p>;

//   return (
//     <TeamInvoiceFormSection>
//       <FormTitle>Team Invoice Form</FormTitle>
      
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
//         <FormItem>
//           <FormLabel>Name:</FormLabel>
//           <FormValue>{teamInvoiceData.name}</FormValue>
//         </FormItem>
        
//         <FormItem>
//           <FormLabel>Branch:</FormLabel>
//           <FormValue>{teamInvoiceData.branch}</FormValue>
//         </FormItem>
        
//         <FormItem>
//           <FormLabel>Invoice Date:</FormLabel>
//           <FormValue>{teamInvoiceData.invoiceDate}</FormValue>
//         </FormItem>
        
//         <FormItem>
//           <FormLabel>Invoice Number:</FormLabel>
//           <FormValue>{teamInvoiceData.invoiceNumber}</FormValue>
//         </FormItem>
        
//         <FormItem>
//           <FormLabel>Phone Number:</FormLabel>
//           <FormValue>{teamInvoiceData.phoneNumber}</FormValue>
//         </FormItem>
        
//         <FormItem>
//           <FormLabel>Car Model:</FormLabel>
//           <FormValue>{teamInvoiceData.carModel}</FormValue>
//         </FormItem>
        
//         <FormItem>
//           <FormLabel>Year:</FormLabel>
//           <FormValue>{teamInvoiceData.year}</FormValue>
//         </FormItem>
        
//         <FormItem>
//           <FormLabel>Make:</FormLabel>
//           <FormValue>{teamInvoiceData.make}</FormValue>
//         </FormItem>
        
//         <FormItem>
//           <FormLabel>VIN:</FormLabel>
//           <FormValue>{teamInvoiceData.vin}</FormValue>
//         </FormItem>
        
//         <FormItem>
//           <FormLabel>Team Name:</FormLabel>
//           <FormValue>{teamInvoiceData.teamName}</FormValue>
//         </FormItem>
        
//         <FormItem>
//           <FormLabel>Team Number:</FormLabel>
//           <FormValue>{teamInvoiceData.teamNumber}</FormValue>
//         </FormItem>
        
//         <FormItem>
//           <FormLabel>Kilometer:</FormLabel>
//           <FormValue>{teamInvoiceData.kilometer}</FormValue>
//         </FormItem>
        
//         {teamInvoiceData.services.map((service, index) => (
//           <FormItem key={index}>
//             <FormLabel>{service.name}:</FormLabel>
//             <FormValue>{service.status === "done" ? "Done" : "Not Done"}</FormValue>
//           </FormItem>
//         ))}
//       </div>
//     </TeamInvoiceFormSection>
//   );
// };

// export default TeamInvoiceForm;


import React from "react";
import styled from "styled-components";

// Styled components for the team invoice form
const TeamInvoiceFormSection = styled.div`
  background-color: var(--widget); /* Matches the card background color */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: var(--primary); /* Primary color */
  border-bottom: 2px solid var(--primary);
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

const FormItem = styled.div`
  margin-bottom: 15px;
`;

const FormLabel = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: var(--primary); /* Primary color */
  margin-right: 10px;
`;

const FormValue = styled.p`
  font-size: 16px;
  color: var(--text-color); /* Text color (assuming --text-color is defined) */
  margin: 0;
`;

const services = [
  "Tires and Check Tire Air Pressure",
  "Transmission Performance Check (if applicable)",
  "Brake System Check",
  "Bolts and Nuts",
  "Steering Operation and Linkages",
  "Fuel Lines and Hoses",
  "Safety Belts and Locks",
  "Inspect Filter Battery",
  "Battery Fluid",
  "Tank Solution Injector Cleaner",
  "Brake Fluid",
  "Front and Rear Suspension",
  "Drive Dust Boots",
  "Exhaust System",
  "Exterior Interior Lights",
  "Tire Rotation",
];
const TeamInvoiceForm = ({ data }) => {
  if (!data) return <p>Loading...</p>;

  return (
    <TeamInvoiceFormSection>
      <FormTitle>Team Invoice Form</FormTitle>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
        <FormItem>
          <FormLabel>Name:</FormLabel>
          <FormValue>{data.customerName}</FormValue>
        </FormItem>
        
        <FormItem>
          <FormLabel>Branch:</FormLabel>
          <FormValue>{data.branch}</FormValue>
        </FormItem>
        
        <FormItem>
          <FormLabel>Invoice Date:</FormLabel>
          <FormValue>{data.invoiceDate}</FormValue>
        </FormItem>
        
        <FormItem>
          <FormLabel>Invoice Number:</FormLabel>
          <FormValue>{data.invoiceNumber}</FormValue>
        </FormItem>
        
        <FormItem>
          <FormLabel>Phone Number:</FormLabel>
          <FormValue>{data.phoneNumber}</FormValue>
        </FormItem>
        
        <FormItem>
          <FormLabel>Car Model:</FormLabel>
          <FormValue>{data.carModel}</FormValue>
        </FormItem>
        
        <FormItem>
          <FormLabel>Year:</FormLabel>
          <FormValue>{data.modelYear}</FormValue>
        </FormItem>
        
        <FormItem>
          <FormLabel>Make:</FormLabel>
          <FormValue>{data.carBrand}</FormValue>
        </FormItem>
        
        <FormItem>
          <FormLabel>VIN:</FormLabel>
          <FormValue>{data.vin}</FormValue>
        </FormItem>
        
        <FormItem>
          <FormLabel>Team Name:</FormLabel>
          <FormValue>{data.teamName}</FormValue>
        </FormItem>
        
        <FormItem>
          <FormLabel>Team Number:</FormLabel>
          <FormValue>{data.teamNumber}</FormValue>
        </FormItem>
        
        <FormItem>
          <FormLabel>Kilometer:</FormLabel>
          <FormValue>{data.kilometer}</FormValue>
        </FormItem>
        
        {services.map((service, index) => (
          <FormItem key={index}>
            <FormLabel>{service}:</FormLabel>
            <FormValue>
              {data.dropdownValues && data.dropdownValues[index] 
                ? data.dropdownValues[index] 
                : "-"}
            </FormValue>
          </FormItem>
        ))}

      </div>
    </TeamInvoiceFormSection>
  );
};

export default TeamInvoiceForm;
