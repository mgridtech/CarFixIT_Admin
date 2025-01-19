import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  discountData: [],
  TeamFormData:[],
  filtersData: [],
  oilCompaniesData: [],
  oilsData: [],
  engineOilData: [],
  engineOilPetrolData: [],
  tireCompaniesData: [],
  tireData: [],
  batteryData: [],
  batteryCompaniesData: [],
  myOrdersData: [],
  supportServicesData: [],
  mySupportServicesData: [],
  clientCarsData: [],
  employAcountData: [],
  clientsBanner: [],
  clientAccountData: [],
  adminMesgs: [],
  clientReviewsWeb: [],
  cityArr: [],
  neighborArr: [],
  employsData: [],
  mobileClientsBanner: [],
  adminCarsData: [],
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setEngineOilData: (state, action) => {
      if (action.payload.engineOilData === null) {
        state.engineOilData = [];
      } else {
        state.engineOilData = action.payload.engineOilData;
      }
    },
    setEngineOilPetrolData: (state, action) => {
      // Added new reducer
      if (action.payload.engineOilPetrolData === null) {
        state.engineOilPetrolData = [];
      } else {
        state.engineOilPetrolData = action.payload.engineOilPetrolData;
      }
    },
    setFiltersDta: (state, action) => {
      if (action.payload.filtersData === null) {
        state.filtersData = [];
      } else {
        state.filtersData = action.payload.filtersData;
      }
    },
    setOilCompaniesData: (state, action) => {
      if (action.payload.oilCompaniesData === null) {
        state.oilCompaniesData = [];
      } else {
        state.oilCompaniesData = action.payload.oilCompaniesData;
      }
    },
    setOilsData: (state, action) => {
      if (action.payload.oilsData === null) {
        state.oilsData = [];
      } else {
        state.oilsData = action.payload.oilsData;
      }
    },
    setDiscountData: (state, action) => {
      if (action.payload.discountData === null) {
        state.discountData = [];
      } else {
        state.discountData = action.payload.discountData;
      }
    },
    setTireCompaniesData: (state, action) => {
      if (action.payload.tireCompaniesData === null) {
        state.tireCompaniesData = [];
      } else {
        state.tireCompaniesData = action.payload.tireCompaniesData;
      }
    },
    setTireData: (state, action) => {
      if (action.payload.tireData === null) {
        state.tireData = [];
      } else {
        state.tireData = action.payload.tireData;
      }
    },
    setBatteryData: (state, action) => {
      if (action.payload.batteryData === null) {
        state.batteryData = [];
      } else {
        state.batteryData = action.payload.batteryData;
      }
    },
    setBatteryCompaniesData: (state, action) => {
      if (action.payload.batteryCompaniesData === null) {
        state.batteryCompaniesData = [];
      } else {
        state.batteryCompaniesData = action.payload.batteryCompaniesData;
      }
    },
    setMyOrdersData: (state, action) => {
      if (action.payload.myOrdersData === null) {
        state.myOrdersData = [];
      } else {
        state.myOrdersData = action.payload.myOrdersData;
      }
    },
    setTeamFormData: (state, action) => {
      if (action.payload.TeamFormData === null) {
        state.TeamFormData = [];
      } else {
        state.TeamFormData = action.payload.TeamFormData;
      }
    },
    setSupportServicesData: (state, action) => {
      if (action.payload.supportServicesData === null) {
        state.supportServicesData = [];
      } else {
        state.supportServicesData = action.payload.supportServicesData;
      }
    },
    setMySupportServicesData: (state, action) => {
      if (action.payload.mySupportServicesData === null) {
        state.mySupportServicesData = [];
      } else {
        state.mySupportServicesData = action.payload.mySupportServicesData;
      }
    },
    setClientCarsData: (state, action) => {
      if (action.payload.clientCarsData === null) {
        state.clientCarsData = [];
      } else {
        state.clientCarsData = action.payload.clientCarsData;
      }
    },
    setEmployAcountData: (state, action) => {
      if (action.payload.employAcountData === null) {
        state.employAcountData = [];
      } else {
        state.employAcountData = action.payload.employAcountData;
      }
    },
    setClientAccountData: (state, action) => {
      if (action.payload.clientAccountData === null) {
        state.clientAccountData = [];
      } else {
        state.clientAccountData = action.payload.clientAccountData;
      }
    },
    setClientsBanner: (state, action) => {
      if (action.payload.clientsBanner === null) {
        state.clientsBanner = [];
      } else {
        state.clientsBanner = action.payload.clientsBanner;
      }
    },
    setMobileClientsBanner: (state, action) => {
      if (action.payload.mobileClientsBanner === null) {
        state.mobileClientsBanner = [];
      } else {
        state.mobileClientsBanner = action.payload.mobileClientsBanner;
      }
    },
    setAdminMesgs: (state, action) => {
      if (action.payload.adminMesgs === null) {
        state.adminMesgs = [];
      } else {
        state.adminMesgs = action.payload.adminMesgs;
      }
    },
    setClientReviewsWeb: (state, action) => {
      if (action.payload.clientReviewsWeb === null) {
        state.clientReviewsWeb = [];
      } else {
        state.clientReviewsWeb = action.payload.clientReviewsWeb;
      }
    },
    setCityArr: (state, action) => {
      if (action.payload.cityArr === null) {
        state.cityArr = [];
      } else {
        state.cityArr = action.payload.cityArr;
      }
    },
    setNeighborArr: (state, action) => {
      if (action.payload.neighborArr === null) {
        state.neighborArr = [];
      } else {
        state.neighborArr = action.payload.neighborArr;
      }
    },
    setEmploysData: (state, action) => {
      if (action.payload.employsData === null) {
        state.employsData = [];
      } else {
        state.employsData = action.payload.employsData;
      }
    },
    setAllTeamsData: (state, action) => {
      if (action.payload.allTeamsData === null) {
        state.allTeamsData = [];
      } else {
        state.allTeamsData = action.payload.allTeamsData;
      }
    },
    setAllSupervisorsData: (state, action) => {
      if (action.payload.allSupervisorsData === null) {
        state.allSupervisorsData = [];
      } else {
        state.allSupervisorsData = action.payload.allSupervisorsData;
      }
    },
    setAdminCarsData: (state, action) => {
      if (action.payload.adminCarsData === null) {
        state.adminCarsData = [];
      } else {
        state.adminCarsData = action.payload.adminCarsData;
      }
    },
  },
});

export const {
  setAllSupervisorsData,
  setAllTeamsData,
  setCityArr,
  setEmploysData,
  setNeighborArr,
  setEmployAcountData,
  setBatteryData,
  setFiltersDta,
  setOilCompaniesData,
  setOilsData,
  setDiscountData,
  setTireCompaniesData,
  setTireData,
  setBatteryCompaniesData,
  setMyOrdersData,
  setTeamFormData,
  setSupportServicesData,
  setMySupportServicesData,
  setClientCarsData,
  setClientsBanner,
  setClientAccountData,
  setAdminMesgs,
  setClientReviewsWeb,
  setMobileClientsBanner,
  setAdminCarsData,
  setEngineOilData,
  setEngineOilPetrolData,
} = projectSlice.actions;

export default projectSlice.reducer;
