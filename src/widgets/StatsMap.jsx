// components
import Spring from "../components/Spring";
import Counter from "../components/Counter";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataWholeCollection } from "../db/databaseFunction";
import { setAllTeamsData, setAllSupervisorsData } from "../store/projectSlice";
const StatsMap = () => {
  const [fromDateValue, setfromDateValue] = useState(
    `${
      new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0]
    }`
  );
  const [toDateValue, settoDateValue] = useState(
    `${new Date().toISOString().split("T")[0]}`
  );
  const [AllTeamsDataState, setAllTeamsDataState] = useState([]);
  const [AllSuperviosrs, setAllSuperviosrs] = useState([]);
  const dispatch = useDispatch();
  const [totalRevenue, settotalRevenue] = useState(0);
  const [totalOrders, settotalOrders] = useState(0);
  const [orderByCity, setorderByCity] = useState([]);
  const [neighborCityOrder, setneighborCityOrder] = useState([]);
  const { myOrdersData, cityArr, neighborArr, employsData } = useSelector(
    (state) => state.project
  );
  const [wholeDataYouWant, setWholeDataYouWant] = useState({
    oil: 0,
    tyre: 0,
    battery: 0,
    filter: 0,
  });
  console.log(orderByCity, neighborCityOrder);

  useEffect(() => {
    const getTotalRevOrder = () => {
      let totalRevenueT = 0;
      const fromDate = Date.parse(fromDateValue);
      const toDate = Date.parse(toDateValue);
    
      myOrdersData?.forEach((dat) => {
        const updatedAt = Date.parse(dat?.updatedAt);
    
        if (isNaN(updatedAt)) {
          console.error(`Invalid date format: ${dat?.updatedAt}`);
          return;
        }
    
        if (dat?.orderStatus === "completed" && updatedAt >= fromDate && updatedAt <= toDate) {
          totalRevenueT += dat?.orderPrice || 0;
        }
      });
    
      settotalRevenue(totalRevenueT);
    
      const filteredOrders = myOrdersData?.filter((dat) => {
        const updatedAt = Date.parse(dat?.updatedAt);
        if (isNaN(updatedAt)) {
          return false;
        }
        return updatedAt >= fromDate && updatedAt <= toDate;
      });
    
      settotalOrders(filteredOrders?.length || 0);
    };
    
const calculateOrdersWithCity = async () => {
  const formatedData = [];
  const fromDate = Date.parse(fromDateValue);
  const toDate = Date.parse(toDateValue);

  cityArr?.forEach((dat) => {
    const filteredByCity = myOrdersData?.filter((order) => {
      const updatedAt = Date.parse(order?.updatedAt);
      if (isNaN(updatedAt)) {
        return false;
      }
      return (
        order?.orderStatus === "completed" &&
        order?.deliveryInfo?.cityName?.toLowerCase() === dat.productNameEng?.toLowerCase() &&
        updatedAt >= fromDate &&
        updatedAt <= toDate
      );
    });
    formatedData.push({
      title: dat.productNameEng,
      value: filteredByCity?.length || 0,
      products: filteredByCity || [],
    });
  });
  setorderByCity(formatedData);
};

    
    const calculateOrdersWithNegborCity = async () => {
      const formatedData = [];
      neighborArr?.map((dat) => {
        const filteredByCity = myOrdersData?.filter(
          (dat) =>
            dat?.orderStatus === "completed" &&
            `${dat?.deliveryInfo.cityName}`.toLowerCase() ===
              `${dat.productNameEng}`.toLowerCase &&
            dat?.updatedAt >= Date.parse(fromDateValue) &&
            dat?.updatedAt <= Date.parse(toDateValue)
        );
        formatedData.push({
          title: dat.productNameEng,
          value: filteredByCity?.length,
          products: filteredByCity,
        });
        return null;
      });
      setneighborCityOrder(formatedData);
    };
  const calculateAvrageRating = async () => {
  const teamReslt = employsData?.filter(
    (dat) => dat?.role === "SingleDTeam" || dat?.role === "SingleTeam"
  ) || [];
  const formatedTeamResult = teamReslt.map((dac) => {
    // let sumRating = 0;
    // let count = 0;
    let sum = 0;
    const filteredData = myOrdersData?.filter(
      (dat) =>
        dat?.orderStatus === "completed" &&
        dat?.serviceProviderRating >= 0 &&
        dat?.TeamId === dac?.id
    ) || [];
    filteredData.forEach((datr, index) => {
      const rati = datr?.serviceProviderRating || 0;
      // count += rati;
      sum += rati * (index + 1);
      // sumRating += rati;
    });
    const check = sum / filteredData.length || 0;
    return {
      ...dac,
      title: dac?.dbId,
      value: check,
    };
  });
  const sortedDtat = formatedTeamResult.sort((a, b) => b.value - a.value);
  setAllTeamsDataState(sortedDtat);
  dispatch(setAllTeamsData({ allTeamsData: sortedDtat }));
};

  const calculteAvrgSupervisor = async () => {
  const SupervisorReslt = await getDataWholeCollection("employ");
  const filterSuper = SupervisorReslt?.filter(
    (dat) => dat.role === "supervisor"
  ) || [];
  const formatedSuperVisorResult = filterSuper.map((dac) => {
    // let sumRating = 0;
    // let count = 0;
    let sum = 0;
    const filteredData = myOrdersData?.filter(
      (dat) =>
        dat?.orderStatus === "completed" &&
        dat?.serviceProviderRating >= 0 &&
        dat?.TeamId === dac?.teamId
    ) || [];
    filteredData.forEach((datr, index) => {
      const rati = datr?.serviceProviderRating || 0;
      // count += rati;
      sum += rati * (index + 1);
      // sumRating += rati;
    });
    const check = sum / filteredData.length || 0;
    return {
      ...dac,
      title: dac?.jobId ? dac?.jobId : dac?.id,
      value: check,
      teamId: dac?.teamId,
    };
  });
  const sortedDtat = formatedSuperVisorResult.sort((a, b) => b.value - a.value);
  setAllSuperviosrs(sortedDtat);
  dispatch(setAllSupervisorsData({ allSupervisorsData: sortedDtat }));
};

    const findAllPercentData = () => {
  let wholeProducts = [];
  myOrdersData?.forEach((dat) => {
    if (dat?.products) {
      wholeProducts.push(
        ...dat.products.map((dal) => ({
          ...dal,
          updatedAt: Date.parse(new Date(dat.updatedAt).toISOString().split("T")[0]),
        }))
      );
    }
  });

  console.log(wholeProducts, Date.parse(fromDateValue), Date.parse(toDateValue));

  const filtersProducts = wholeProducts.filter(
    (dat) =>
      dat.referance === "Filters" &&
      dat.updatedAt >= Date.parse(fromDateValue) &&
      dat.updatedAt <= Date.parse(toDateValue)
  );

  const batteryProducts = wholeProducts.filter(
    (dat) =>
      dat.referance === "btteries" &&
      dat.updatedAt >= Date.parse(fromDateValue) &&
      dat.updatedAt <= Date.parse(toDateValue)
  );

  const tyreProducts = wholeProducts.filter(
    (dat) =>
      dat.referance === "Tyres" &&
      dat.updatedAt >= Date.parse(fromDateValue) &&
      dat.updatedAt <= Date.parse(toDateValue)
  );

  const oilProducts = wholeProducts.filter(
    (dat) =>
      dat.referance === "Oils" &&
      dat.updatedAt >= Date.parse(fromDateValue) &&
      dat.updatedAt <= Date.parse(toDateValue)
  );

  setWholeDataYouWant({
    oil: oilProducts.length,
    tyre: tyreProducts.length,
    battery: batteryProducts.length,
    filter: filtersProducts.length,
  });
};

    findAllPercentData();
    calculateAvrageRating();
    calculateOrdersWithCity();
    calculateOrdersWithNegborCity();
    calculteAvrgSupervisor();
    getTotalRevOrder();
  }, [
    fromDateValue,
    myOrdersData,
    toDateValue,
    cityArr,
    dispatch,
    employsData,
    neighborArr,
  ]);
  const servicesArray = [
    { title: "Oils", quantity: wholeDataYouWant.oil },
    { title: "Filters", quantity: wholeDataYouWant.filter },
    { title: "Tyres", quantity: wholeDataYouWant.tyre },
    { title: "Batteries", quantity: wholeDataYouWant.battery },
    { title: "Support Services", quantity: 0 },
  ];
  return (
    <>
      <Spring className="card flex-1 grid  xl:pt-[33px] xl:pb-5 xl:pr-[31px] xl:pl-[37px] mt-[10px]">
        <div className="widgets-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:col-span-2">
          <div className="flex flex-col gap-5 lg:gap-[14px]">
            <h5>From Date</h5>
            <div className="flex flex-col gap-4">
              <div className="field-wrapper">
                <input
                  className="field-input"
                  type="date"
                  id="fromDate"
                  value={fromDateValue}
                  onChange={(e) => setfromDateValue(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5 lg:gap-[14px]">
            <h5>To Date</h5>
            <div className="flex flex-col gap-4">
              <div className="field-wrapper">
                <input
                  className="field-input"
                  type="date"
                  id="toDate"
                  value={toDateValue}
                  onChange={(e) => settoDateValue(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </Spring>

      <div className="widgets-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:col-span-2 mt-[10px]">
        <Spring
          className="card flex-1 grid gap-[30px] md:gap-10 lg:grid-cols-[minmax(0,100%)_,minmax(0,1fr)]
                xl:pt-[33px] xl:pb-5 xl:pr-[31px] xl:pl-[37px]"
        >
          <div className="flex gap-3" style={{ width: "100%" }}>
            <div className="badge-icon bg-yellow">
              <i className="icon-diamond text-[23px] mt-1" />
            </div>
            <div>
              <Counter
                className="block -mt-1 font-heading font-semibold leading-[1.1] text-header text-[26px] md:text-[32px]"
                num={totalRevenue}
                prefix=""
              />
              <span className="block label-text mb-2">Revenue</span>
              {/* <Trend value={45.21} /> */}
            </div>
          </div>
        </Spring>

        <Spring
          className="card flex-1 grid gap-[30px] md:gap-10 lg:grid-cols-[minmax(0,100%)_,minmax(0,1fr)]
                xl:pt-[33px] xl:pb-5 xl:pr-[31px] xl:pl-[37px]"
        >
          <div className="flex gap-3" style={{ width: "100%" }}>
            <div className="badge-icon bg-green">
              <i className="icon-boxes-stacked-regular text-[23px] mt-1" />
            </div>

            <div>
              <Counter
                className="block -mt-1 font-heading font-semibold leading-[1.1] text-header text-[26px] md:text-[32px]"
                num={totalOrders}
                prefix=""
              />
              <span className="block label-text mb-2">Number of Orders</span>
              {/* <Trend value={-12} /> */}
            </div>
          </div>
        </Spring>
      </div>
      <div className="widgets-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:col-span-2 mt-[10px]">
        <Spring className="card flex-1 grid  xl:pt-[33px] xl:pb-5 xl:pr-[31px] xl:pl-[37px]">
          <div className="flex flex-col gap-5 lg:gap-[14px]">
            <h5>Highest Rated Supervisiors</h5>
            <div className="flex flex-col gap-4">
              {AllSuperviosrs?.map((dat, index) => (
                <div className="grid grid-cols-2 rounded-md bg-body border p-[13px]">
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      flexDirection: "row",
                    }}
                  >
                    <span className="block label-text">{dat?.title}</span>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      flexDirection: "row",
                    }}
                  >
                    <span className="block label-text">({dat?.value})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Spring>

        <Spring className="card flex-1 grid  xl:pt-[33px] xl:pb-5 xl:pr-[31px] xl:pl-[37px]">
          <div className="flex flex-col gap-5 lg:gap-[14px]">
            <h5>Highest Rated Teams</h5>
            <div className="flex flex-col gap-4">
              {AllTeamsDataState?.map((dat, index) => (
                <div className="grid grid-cols-2 rounded-md bg-body border p-[13px]">
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      flexDirection: "row",
                    }}
                  >
                    <span className="block label-text">{dat?.title}</span>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      flexDirection: "row",
                    }}
                  >
                    <span className="block label-text">({dat?.value})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Spring>
      </div>
      <Spring className="card flex-1 grid  xl:pt-[33px] xl:pb-5 xl:pr-[31px] xl:pl-[37px] mt-[10px]">
        <div className="flex flex-col gap-5 lg:gap-[14px]">
          <h5>Most Requested Services</h5>
          <div className="flex flex-col gap-4">
            {servicesArray.map((dat, index) => (
              <div className="grid grid-cols-2 rounded-md bg-body border p-[13px]">
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    flexDirection: "row",
                  }}
                >
                  <span className="block label-text">{dat.title}</span>
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    flexDirection: "row",
                  }}
                >
                  <Counter
                    className="block font-heading font-semibold leading-[1.1] text-header label-text"
                    num={dat.quantity}
                    prefix=""
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Spring>
      <div className="widgets-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:col-span-2 mt-[10px]">
        <Spring className="card flex-1 grid  xl:pt-[33px] xl:pb-5 xl:pr-[31px] xl:pl-[37px]">
          <div className="flex flex-col gap-5 lg:gap-[14px]">
            <h5>Orders By City</h5>
            <div className="flex flex-col gap-4">
              {orderByCity.map((dat, index) => (
                <div className="grid grid-cols-2 rounded-md bg-body border p-[13px]">
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      flexDirection: "row",
                    }}
                  >
                    <span className="block label-text">{dat?.title}</span>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      flexDirection: "row",
                    }}
                  >
                    <Counter
                      className="block font-heading font-semibold leading-[1.1] text-header label-text"
                      num={dat?.value ? dat?.value : 0}
                      prefix=""
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Spring>

        <Spring className="card flex-1 grid  xl:pt-[33px] xl:pb-5 xl:pr-[31px] xl:pl-[37px]">
          <div className="flex flex-col gap-5 lg:gap-[14px]">
            <h5>Orders By Neighborhood</h5>
            <div className="flex flex-col gap-4">
              {neighborCityOrder.map((dat, index) => (
                <div className="grid grid-cols-2 rounded-md bg-body border p-[13px]">
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      flexDirection: "row",
                    }}
                  >
                    <span className="block label-text">{dat?.title}</span>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      flexDirection: "row",
                    }}
                  >
                    <Counter
                      className="block font-heading font-semibold leading-[1.1] text-header label-text"
                      num={dat?.value ? dat?.value : 0}
                      prefix=""
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Spring>
      </div>
    </>
  );
};

export default StatsMap;
