// components
import PageHeader from "../layout/PageHeader";
import MainProfileInfo from "../widgets/MainProfileInfo";
import SalesStats from "../widgets/SalesStats";
import TotalReport from "../widgets/TotalReport";

// hooks

const SalesAnalytics = () => {
  return (
    <>
      <PageHeader title="Home" />
      {/* MainProfileInfo taking up the entire column */}
      <div className="widgets-grid grid-cols-1 mb-8">
        <MainProfileInfo />
      </div>

      {/* SalesStats and TotalReport in a separate grid */}
      <div className="widgets-grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-[minmax(0,_951px)_minmax(0,_1fr)]">
        <SalesStats />
        <TotalReport />
      </div>
    </>
  );
};

export default SalesAnalytics;
