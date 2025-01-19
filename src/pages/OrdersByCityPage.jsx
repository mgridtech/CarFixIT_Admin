import React from "react";
import PageHeader from "../layout/PageHeader";
import Counter from "../components/Counter";
import Spring from "../components/Spring";

function OrdersByCityPage() {
  const orderByCityData = [
    { name: "Al Madinah", value: 30 },
    { name: "Riyadh", value: 24 },
    { name: "Jeddah", value: 16 },
    { name: "New York", value: 15 },
    { name: "Jersy", value: 10 },
    { name: "Los Vegas", value: 5 },
  ];
  return (
    <>
      <PageHeader title="Orders By City" />
      <Spring className="card grid  xl:pt-[33px] xl:pb-5 xl:pr-[31px] xl:pl-[37px] mt-[10px]">
        <div className="widgets-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:col-span-2">
          <div className="flex flex-col gap-5 lg:gap-[14px]">
            <h5>From Date</h5>
            <div className="flex flex-col gap-4">
              <div className="field-wrapper">
                <input className="field-input" type="date" id="fromDate" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5 lg:gap-[14px]">
            <h5>To Date</h5>
            <div className="flex flex-col gap-4">
              <div className="field-wrapper">
                <input className="field-input" type="date" id="toDate" />
              </div>
            </div>
          </div>
        </div>
      </Spring>
      <Spring className="card grid  xl:pt-[33px] xl:pb-5 xl:pr-[31px] xl:pl-[37px] mt-[10px]">
        {orderByCityData?.map((data, index) => (
          <div
            className="flex pt-3 pb-3 items-center justify-between"
            style={{
              borderBottom:
                orderByCityData?.length !== index + 1
                  ? "1px solid grey"
                  : "0px solid grey",
            }}
          >
            <span className="subheading-1">{data?.name}</span>
            <div className="flex items-center gap-4">
              <span className="h5">
                <Counter className="h5" num={data?.value} />%
              </span>
            </div>
          </div>
        ))}
      </Spring>
    </>
  );
}

export default OrdersByCityPage;
