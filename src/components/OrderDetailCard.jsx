import React from "react";
import Spring from "./Spring";
import { useSelector } from "react-redux";

const OrderDetailCard = ({ data }) => {
  const { id, quantity, referance } = data;
  const { filtersData, oilsData, tireData, batteryData, engineOilData } =
    useSelector((state) => state.project);
  const dataToChoose =
    referance === "Oils"
      ? oilsData
      : referance === "Filters"
      ? filtersData
      : referance === "Tyres"
      ? tireData
      : referance === "btteries"
      ? batteryData
      : referance === "engineOil"
      ? engineOilData
      : [];
  const fiLterDataNow = dataToChoose?.filter((dat) => dat?.dbId === id);
  return (
    <Spring className="card flex flex-col gap-5 md:gap-[26px]">
      <div className="flex flex-col flex-1 gap-5 w-full">
        <div className="flex flex-col shrink-0 gap-5">
          <div className="img-wrapper h-[156px] flex justify-center items-center">
            <img
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
              src={fiLterDataNow[0]?.images[0]?.imgLink}
              alt={fiLterDataNow[0]?.productNameEng}
            />
          </div>
        </div>
        <div>
          <h3 style={{ textTransform: "capitalize" }} className="truncate ">
            {fiLterDataNow[0]?.productNameEng}
          </h3>
          <div className="flex flex-col items-start mt-[15px]">
            <p className="max-w-[220px]">Quantity : {quantity}</p>
            <p className="max-w-[220px]">
              Type : {data?.type ? data?.type : "-"}
            </p>
          </div>
        </div>
      </div>
    </Spring>
  );
};

export default OrderDetailCard;
