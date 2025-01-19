import React from "react";
import PageHeader from "../layout/PageHeader";
import SalesStatsNew from "../widgets/SalesStatsNew";
import Counter from "../components/Counter";
import Spring from "../components/Spring";

function RevenuePage() {
  return (
    <>
      <PageHeader title="Revenues" />
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
      <div className="flex-1 grid grid-cols-1 gap-6 md:grid-cols-2 lg:flex justify-between mb-[20px]">
        <Spring className="card flex-1 grid  xl:pt-[33px] xl:pb-5 xl:pr-[31px] xl:pl-[37px] mt-[10px]">
          <div className="flex gap-3" style={{ width: "100%" }}>
            <div className="badge-icon bg-green">
              <h1 className="text-[30px] mt-1">$</h1>
            </div>
            <div>
              <Counter
                className="block -mt-1 font-heading font-semibold leading-[1.1] text-header text-[26px] md:text-[32px]"
                num={15412}
                prefix=""
              />
              <span className="block label-text mb-2">Today</span>
            </div>
          </div>
        </Spring>
        <Spring className="card flex-1 grid  xl:pt-[33px] xl:pb-5 xl:pr-[31px] xl:pl-[37px] mt-[10px]">
          <div className="flex gap-3" style={{ width: "100%" }}>
            <div className="badge-icon bg-red">
              <h1 className="text-[30px] mt-1">$</h1>
            </div>
            <div>
              <Counter
                className="block -mt-1 font-heading font-semibold leading-[1.1] text-header text-[26px] md:text-[32px]"
                num={53487}
                prefix=""
              />
              <span className="block label-text mb-2">This Week</span>
            </div>
          </div>
        </Spring>
        <Spring className="card flex-1 grid  xl:pt-[33px] xl:pb-5 xl:pr-[31px] xl:pl-[37px] mt-[10px]">
          <div className="flex gap-3" style={{ width: "100%" }}>
            <div className="badge-icon bg-accent">
              <h1 className="text-[30px] mt-1">$</h1>
            </div>
            <div>
              <Counter
                className="block -mt-1 font-heading font-semibold leading-[1.1] text-header text-[26px] md:text-[32px]"
                num={5412}
              />
              <span className="block label-text mb-2">This Month</span>
            </div>
          </div>
        </Spring>
        <Spring className="card flex-1 grid  xl:pt-[33px] xl:pb-5 xl:pr-[31px] xl:pl-[37px] mt-[10px]">
          <div className="flex gap-3" style={{ width: "100%" }}>
            <div className="badge-icon bg-yellow">
              <h1 className="text-[30px] mt-1">$</h1>
            </div>
            <div>
              <Counter
                className="block -mt-1 font-heading font-semibold leading-[1.1] text-header text-[26px] md:text-[32px]"
                num={5412}
              />
              <span className="block label-text mb-2">This Year</span>
            </div>
          </div>
        </Spring>
      </div>
      <SalesStatsNew />
    </>
  );
}

export default RevenuePage;
