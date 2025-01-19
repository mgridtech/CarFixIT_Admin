import React from "react";
import Spring from "./Spring";
import ServiceItemCustom from "./ServiceItemCustom";
function ServicesCollapseItem() {
  const servicesArray = [
    {
      name: "Oil Change",
      value: 34,
      byBrand: [
        { name: "TOTAL", value: 50 },
        { name: "Mobil", value: 30 },
        { name: "Shell", value: 20 },
      ],
      byType: [
        { name: "Mineral motor oil", value: 40 },
        { name: "Synthetic motor oil", value: 35 },
        { name: "Mixed motor oil", value: 25 },
      ],
      byCity: [
        { name: "Al Madinah", value: 30 },
        { name: "Riyadh", value: 24 },
        { name: "Jeddah", value: 16 },
        { name: "New York", value: 15 },
        { name: "Jersy", value: 10 },
        { name: "Los Vegas", value: 5 },
      ],
      byTeam: [],
      byCar: [],
      byNeighbourhod: [],
    },
    {
      name: "Other Oils",
      value: 12,
      byBrand: [],
      byType: [],
      byCar: [],
      byTeam: [
        { name: "Team 1", value: 30 },
        { name: "Team 2", value: 24 },
        { name: "Team 3", value: 16 },
        { name: "Team 4", value: 15 },
      ],
      byCity: [
        { name: "Al Madinah", value: 30 },
        { name: "Riyadh", value: 24 },
        { name: "Jeddah", value: 16 },
        { name: "New York", value: 15 },
        { name: "Jersy", value: 10 },
        { name: "Los Vegas", value: 5 },
      ],
      byNeighbourhod: [],
    },
    {
      name: "Filters",
      value: 4,
      byBrand: [],
      byType: [],
      byCity: [
        { name: "Al Madinah", value: 30 },
        { name: "Riyadh", value: 24 },
        { name: "Jeddah", value: 16 },
        { name: "New York", value: 15 },
        { name: "Jersy", value: 10 },
        { name: "Los Vegas", value: 5 },
      ],
      byCar: [
        { name: "Car Name 1", value: 50 },
        { name: "Car Name 2", value: 35 },
        { name: "Car Name 3", value: 15 },
      ],
      byTeam: [],
      byNeighbourhod: [],
    },
    {
      name: "Tires",
      value: 18,
      byBrand: [],
      byType: [],
      byCity: [
        { name: "Al Madinah", value: 30 },
        { name: "Riyadh", value: 24 },
        { name: "Jeddah", value: 16 },
        { name: "New York", value: 15 },
        { name: "Jersy", value: 10 },
        { name: "Los Vegas", value: 5 },
      ],
      byCar: [
        { name: "Car Name 1", value: 50 },
        { name: "Car Name 2", value: 35 },
        { name: "Car Name 3", value: 15 },
      ],
      byTeam: [],
      byNeighbourhod: [
        { name: "Al Madinah", value: 30 },
        { name: "Riyadh", value: 24 },
        { name: "Jeddah", value: 16 },
        { name: "New York", value: 15 },
        { name: "Jersy", value: 10 },
        { name: "Los Vegas", value: 5 },
      ],
    },
    {
      name: "Batteries",
      value: 12,
      byBrand: [
        { name: "AC Zurex", value: 55 },
        { name: "AC Zurex", value: 45 },
      ],
      byType: [],
      byCity: [
        { name: "Al Madinah", value: 30 },
        { name: "Riyadh", value: 24 },
        { name: "Jeddah", value: 16 },
        { name: "New York", value: 15 },
        { name: "Jersy", value: 10 },
        { name: "Los Vegas", value: 5 },
      ],
      byCar: [
        { name: "Car Name 1", value: 50 },
        { name: "Car Name 2", value: 35 },
        { name: "Car Name 3", value: 15 },
      ],
      byTeam: [],
      byNeighbourhod: [],
    },
    {
      name: "Support Services",
      value: 20,
      byBrand: [],
      byType: [],
      byCity: [
        { name: "Al Madinah", value: 30 },
        { name: "Riyadh", value: 24 },
        { name: "Jeddah", value: 16 },
        { name: "New York", value: 15 },
        { name: "Jersy", value: 10 },
        { name: "Los Vegas", value: 5 },
      ],
      byCar: [
        { name: "Car Name 1", value: 50 },
        { name: "Car Name 2", value: 35 },
        { name: "Car Name 3", value: 15 },
      ],
      byTeam: [],
      byNeighbourhod: [],
    },
  ];
  return (
    <>
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
      {servicesArray?.map((dat, index) => (
        <ServiceItemCustom data={dat} key={index} />
      ))}
    </>
  );
}

export default ServicesCollapseItem;
