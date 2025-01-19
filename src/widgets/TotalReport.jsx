// components
import Spring from "../components/Spring";
import ReportItem from "../components/ReportItem";

const TotalReport = () => {
  // Static data for total revenue
  const data = [
    {
      dataKey: "revenue",
      title: "Monthly",
      amount: 250000, // Static monthly revenue
    },
    {
      dataKey: "revenue",
      title: "Yearly",
      amount: 3200000, // Static yearly revenue
    },
  ];

  return (
    <Spring className="card flex flex-col lg:col-span-3 xl:col-span-1">
      <div>
        <div className="flex items-center justify-between">
          <h4>Total Sales Report</h4>
        </div>
        <p className="mt-1.5 mb-4 text-sm md:text-base">
          A complete and comprehensive report about sales.
        </p>
      </div>
      <div
        className="flex flex-col flex-1 gap-6 mb-6"
        style={{ alignItems: "center", justifyContent: "space-evenly" }}
      >
        {data.map((item, index) => (
          <ReportItem key={index} data={item} />
        ))}
      </div>
    </Spring>
  );
};

export default TotalReport;
