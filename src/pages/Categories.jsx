// components
import PageHeader from "../layout/PageHeader";
// import CustomerRetentionRate from "../widgets/CustomerRetentionRate";
// import DemographicSegmentation from "../widgets/DemographicSegmentation";
// import ConversionRate from "../widgets/ConversionRate";
import CustomersInfobox from "../components/CustomersInfobox";
import CategoryTables from "../widgets/CategoryTable/CategoryTables";

function Categories() {
  return (
    <>
      <PageHeader title="Categories" />
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
              Add new category <i className="icon-circle-plus-regular" />
            </button>
          </div>
        </div>
      </div>
      <CategoryTables status={{ value: "default" }} name={""} />
    </>
  );
}

export default Categories;
