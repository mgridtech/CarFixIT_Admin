// GA
import ReactGA from "react-ga4";

// utils
import { lazy, Suspense } from "react";

// styles
import "./styles/index.scss";
import "react-toastify/dist/ReactToastify.min.css";
import ThemeStyles from "./styles/theme";

// fonts
import "./fonts/icomoon/icomoon.woff";

// contexts
import { SidebarProvider } from "./contexts/sidebarContext";
import { ThemeProvider } from "styled-components";

// hooks
import { useTheme } from "./contexts/themeContext";
import { useEffect, useRef } from "react";
import { useWindowSize } from "react-use";

// components
import ScrollToTop from "./components/ScrollToTop";
import Loader from "./components/Loader";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Sidebar from "./layout/Sidebar";

import AppBar from "./layout/AppBar";
import { useDispatch, useSelector } from "react-redux";
import { database } from "./db/databaseFunction";
import {
  setAdminCarsData,
  setAdminMesgs,
  setBatteryData,
  setCityArr,
  setClientAccountData,
  setEngineOilPetrolData,
  setClientsBanner,
  setEmployAcountData,
  setEmploysData,
  setDiscountData,
  setEngineOilData,
  setFiltersDta,
  setMobileClientsBanner,
  // setMyOrdersData,
  setNeighborArr,
  setOilsData,
  setTireData,
} from "./store/projectSlice";
import AddProduct from "./pages/AddProduct";
import AddCategory from "./pages/AddCategory";

import UpdateProduct from "./pages/UpdateProduct";
import { setAuth } from "./store/authSlice";
import CategoryManagement from "./pages/CategoryManagement";
// import AddCarsData from "./pages/AddCarsData";
import AddBrand from "./pages/AddBrand";
import BrandManagement from "./pages/BrandManagement";
import BrandDetails from "./pages/BrandDetails";
import ProductDetails from "./pages/ProductDetails";
import UpdateCategory from "./pages/UpdateCategory";
import UpdateBrandDetails from "./pages/UpdateBrandDetails";
import UpdateBrand from "./pages/UpdateBrand";
import AddSuitableCategory from "./components/AddSuitableCategory";
import CarBrandManagement from "./pages/CarBrandManagement";
import AddCarBrand from "./pages/AddCarBrand";
import UpdateCarBrand from "./pages/UpdateCarBrand";
import CarModelManagement from "./pages/CarModelManagement";
import AddCar from "./pages/AddCar";
import UpdateCarModel from "./pages/UpdateCarModel";
import AddCarForm1 from "./components/AddCarForm1";
import AddCarForm2 from "./components/AddCarForm2";
import OrderManagement from "./pages/OrderManagement";
import OrderDetails from "./pages/OrderDetails";
import UserManagement from "./pages/UserManagement";
import CarByModelManagement from "./pages/CarByModelManagement";
import UpdateCarbyModel from "./pages/UpdateCarbyModel";
import AddCarByModel from "./pages/AddCarByModel";

// pages
const Login = lazy(() => import("./pages/Login"));
const SalesAnalytics = lazy(() => import("./pages/SalesAnalytics"));
// const SellersList = lazy(() => import("./pages/SellersList"));
// const TopProducts = lazy(() => import("./pages/TopProducts"));
const Banners = lazy(() => import("./pages/Banners"));

// const GeneralSettings = lazy(() => import("./pages/GeneralSettings"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const ProductsManagement = lazy(() => import("./pages/ProductsManagement"));

function App() {
  const { width } = useWindowSize();
  const appRef = useRef(null);
  const { theme } = useTheme();
  const path = useLocation().pathname;
  const withSidebar = path !== "/" && path !== "/404";
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);

  // Google Analytics init
  const gaKey = import.meta.env?.VITE_GA ? import.meta.env?.VITE_GA : "";
  gaKey && ReactGA.initialize(gaKey);

  useEffect(() => {
    appRef.current && appRef.current.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const result = window.localStorage.getItem("aczurex_admin_login");
    if (result) {
      dispatch(setAuth({ isAuth: result }));
    }

    database.ref("employ").on("value", async (snapshot) => {
      let returnArr = [];
      const result = await snapshot.val();
      if (result) {
        await Object.entries(result).forEach((dat) => {
          returnArr.push({ dbId: dat[0], ...dat[1] });
        });
        dispatch(setEmployAcountData({ employAcountData: returnArr }));
      } else {
        dispatch(setEmployAcountData({ employAcountData: [] }));
      }
    });
    database.ref("user").on("value", async (snapshot) => {
      let returnArr = [];
      const result = await snapshot.val();
      if (result) {
        await Object.entries(result).forEach((dat) => {
          returnArr.push({ dbId: dat[0], ...dat[1] });
        });
        dispatch(setClientAccountData({ clientAccountData: returnArr }));
      } else {
        dispatch(setClientAccountData({ clientAccountData: [] }));
      }
    });
    database.ref("webClientsBanner").on("value", async (snapshot) => {
      let returnArr = [];
      const result = await snapshot.val();
      if (result) {
        await Object.entries(result).forEach((dat) => {
          returnArr.push({ dbId: dat[0], ...dat[1] });
        });
        dispatch(setClientsBanner({ clientsBanner: returnArr }));
      } else {
        dispatch(setClientsBanner({ clientsBanner: [] }));
      }
    });
    database.ref("mobClientsBanner").on("value", async (snapshot) => {
      let returnArr = [];
      const result = await snapshot.val();
      if (result) {
        await Object.entries(result).forEach((dat) => {
          returnArr.push({ dbId: dat[0], ...dat[1] });
        });
        dispatch(setMobileClientsBanner({ mobileClientsBanner: returnArr }));
      } else {
        dispatch(setMobileClientsBanner({ mobileClientsBanner: [] }));
      }
    });
    database.ref("btteries").on("value", async (snapshot) => {
      let returnArr = [];
      const result = await snapshot.val();
      if (result) {
        await Object.entries(result).forEach((dat) => {
          returnArr.push({ dbId: dat[0], ...dat[1], reference: "btteries" });
        });
        dispatch(setBatteryData({ batteryData: returnArr }));
      } else {
        dispatch(setBatteryData({ batteryData: [] }));
      }
    });
    database.ref("Tyres").on("value", async (snapshot) => {
      let returnArr = [];
      const result = await snapshot.val();
      if (result) {
        await Object.entries(result).forEach((dat) => {
          returnArr.push({ dbId: dat[0], ...dat[1], reference: "Tyres" });
        });
        dispatch(setTireData({ tireData: returnArr }));
      } else {
        dispatch(setTireData({ tireData: [] }));
      }
    });
    database.ref("Filters").on("value", async (snapshot) => {
      let returnArr = [];
      const result = await snapshot.val();
      if (result) {
        await Object.entries(result).forEach((dat) => {
          returnArr.push({ dbId: dat[0], ...dat[1], reference: "Filters" });
        });
        dispatch(setFiltersDta({ filtersData: returnArr }));
      } else {
        dispatch(setFiltersDta({ filtersData: [] }));
      }
    });

    database.ref("engineOil").on("value", async (snapshot) => {
      let returnArr = [];
      const result = await snapshot.val();
      if (result) {
        await Object.entries(result).forEach((dat) => {
          returnArr.push({ dbId: dat[0], ...dat[1], reference: "engineOil" });
        });
        dispatch(setEngineOilData({ engineOilData: returnArr }));
      } else {
        dispatch(setEngineOilData({ engineOilData: [] }));
      }
    });

    database.ref("engineOilPetrol").on("value", async (snapshot) => {
      let returnArr = [];
      const result = await snapshot.val();

      if (result) {
        await Object.entries(result).forEach((dat) => {
          returnArr.push({
            dbId: dat[0],
            ...dat[1],
            reference: "engineOilPetrol",
          });
        });

        dispatch(setEngineOilPetrolData({ engineOilPetrolData: returnArr }));
      } else {
        dispatch(setEngineOilPetrolData({ engineOilPetrolData: [] }));
      }
    });

    database.ref("discount").on("value", async (snapshot) => {
      let returnArr = [];
      const result = await snapshot.val();
      if (result) {
        await Object.entries(result).forEach((dat) => {
          returnArr.push({ dbId: dat[0], ...dat[1] });
        });
        dispatch(setDiscountData({ discountData: returnArr }));
      } else {
        dispatch(setDiscountData({ discountData: [] }));
      }
    });

    database.ref("Oils").on("value", async (snapshot) => {
      let returnArr = [];
      const result = await snapshot.val();
      if (result) {
        await Object.entries(result).forEach((dat) => {
          returnArr.push({ dbId: dat[0], ...dat[1], reference: "Oils" });
        });
        dispatch(setOilsData({ oilsData: returnArr }));
      } else {
        dispatch(setOilsData({ oilsData: [] }));
      }
    });
    database.ref("adminMesg").on("value", async (snapshot) => {
      let returnArr = [];
      const result = await snapshot.val();
      if (result) {
        await Object.entries(result).forEach((dat) => {
          returnArr.push({ dbId: dat[0], ...dat[1] });
        });
        dispatch(setAdminMesgs({ adminMesgs: returnArr }));
      } else {
        dispatch(setAdminMesgs({ adminMesgs: [] }));
      }
    });

    database.ref("OrderCity").on("value", async (snapshot) => {
      let returnArr = [];
      const result = await snapshot.val();
      if (result) {
        await Object.entries(result).forEach((dat) => {
          returnArr.push({ dbId: dat[0], ...dat[1] });
        });
        dispatch(setCityArr({ cityArr: returnArr }));
      } else {
        dispatch(setCityArr({ cityArr: [] }));
      }
    });
    database.ref("NeighborHodCity").on("value", async (snapshot) => {
      let returnArr = [];
      const result = await snapshot.val();
      if (result) {
        await Object.entries(result).forEach((dat) => {
          returnArr.push({ dbId: dat[0], ...dat[1] });
        });
        dispatch(setNeighborArr({ neighborArr: returnArr }));
      } else {
        dispatch(setNeighborArr({ neighborArr: [] }));
      }
    });
    database.ref("adminCarsData").on("value", async (snapshot) => {
      let returnArr = [];
      const result = await snapshot.val();
      if (result) {
        await Object.entries(result).forEach((dat) => {
          returnArr.push({ dbId: dat[0], ...dat[1] });
        });
        dispatch(setAdminCarsData({ adminCarsData: returnArr }));
      } else {
        dispatch(setAdminCarsData({ adminCarsData: [] }));
      }
    });
    database.ref("employ").on("value", async (snapshot) => {
      let returnArr = [];
      const result = await snapshot.val();
      if (result) {
        await Object.entries(result).forEach((dat) => {
          returnArr.push({ dbId: dat[0], ...dat[1] });
        });
        dispatch(setEmploysData({ employsData: returnArr }));
      } else {
        dispatch(setEmploysData({ employsData: [] }));
      }
    });
  }, [dispatch]);

  return (
    <>
      <SidebarProvider>
        <ThemeProvider theme={{ theme: theme }}>
          <ThemeStyles />
          <ToastContainer
            theme={theme}
            autoClose={2000}
            style={{ padding: "20px" }}
          />
          {width < 1280 && withSidebar && <AppBar />}
          <div className={`app ${!withSidebar ? "fluid" : ""}`} ref={appRef}>
            <ScrollToTop />
            {withSidebar && <Sidebar />}
            <div className="app_content">
              {width >= 1280 && withSidebar && <AppBar />}
              <Suspense fallback={<Loader />}>
                <div className="main">
                  <Routes>
                    <Route
                      path="/"
                      element={
                        isAuth === "Authenticated" ? (
                          <Navigate to={"/home"} />
                        ) : (
                          <Login />
                        )
                      }
                    />
                    <Route
                      path="/home"
                      element={
                        isAuth === "Authenticated" ? (
                          <SalesAnalytics />
                        ) : (
                          <Navigate to="/" />
                        )
                      }
                    />

                    <Route
                      path="products-management"
                      element={
                        isAuth === "Authenticated" ? (
                          <ProductsManagement />
                        ) : (
                          <Navigate to="/" />
                        )
                      }
                    />

                    <Route
                      path="category-management"
                      element={
                        isAuth === "Authenticated" ? (
                          <CategoryManagement />
                        ) : (
                          <Navigate to="/" />
                        )
                      }
                    />
                    <Route
                      path="/updateCategory/:id"
                      element={
                        isAuth === "Authenticated" ? (
                          <UpdateCategory />
                        ) : (
                          <Navigate to="/" />
                        )
                      }
                    />
                    <Route
                      path="brand-management"
                      element={
                        isAuth === "Authenticated" ? (
                          <BrandManagement />
                        ) : (
                          <Navigate to="/" />
                        )
                      }
                    />
                    <Route
                      path="/updateBrandDetail/:id"
                      element={
                        isAuth === "Authenticated" ? (
                          <UpdateBrandDetails />
                        ) : (
                          <Navigate to="/" />
                        )
                      }
                    />
                    <Route
                      path="/updateProduct/:id"
                      element={
                        isAuth === "Authenticated" ? (
                          <UpdateProduct />
                        ) : (
                          <Navigate to="/" />
                        )
                      }
                    />
                    <Route
                      path="addProducts"
                      element={
                        isAuth === "Authenticated" ? (
                          <AddProduct />
                        ) : (
                          <Navigate to="/" />
                        )
                      }
                    />
                    <Route
                      path="addCategory"
                      element={
                        isAuth === "Authenticated" ? (
                          <AddCategory />
                        ) : (
                          <Navigate to="/" />
                        )
                      }
                    />
                    <Route
                      path="addBrand"
                      element={
                        isAuth === "Authenticated" ? (
                          <AddBrand />
                        ) : (
                          <Navigate to="/" />
                        )
                      }
                    />
                    <Route
                      path="/update/:productBrandId/brand"
                      element={
                        isAuth === "Authenticated" ? (
                          <UpdateBrand />
                        ) : (
                          <Navigate to="/" />
                        )
                      }
                    />
                    <Route
                      path="/brandDetails/:id"
                      element={
                        isAuth === "Authenticated" ? (
                          <BrandDetails />
                        ) : (
                          <Navigate to="/" />
                        )
                      }
                    />
                    {/* <Route
                      path="add-suitableCategory"
                      element={
                        isAuth === "Authenticated" ? (
                          <AddSuitableCategory />
                        ) : (
                          <Navigate to="/" />
                        )
                      }
                    /> */}
                    <Route
                      path="/brandDetails/:id/add-suitableCategory"
                      element={
                        isAuth === "Authenticated" ? (
                          <AddSuitableCategory />
                        ) : (
                          <Navigate to="/" />
                        )
                      }
                    />
                    <Route
                      path="/productDetails/:productId"
                      element={
                        isAuth === "Authenticated" ? (
                          <ProductDetails />
                        ) : (
                          <Navigate to="/" />
                        )
                      }
                    />

                    <Route
                      path="/car-brand-management"
                      element={
                        isAuth === "Authenticated" ? (
                          <CarBrandManagement />
                        ) : (
                          <Navigate to="/" />
                        )
                      }
                    />
                    <Route
                      path="/addCarBrand"
                      element={
                        isAuth === "Authenticated" ? (
                          <AddCarBrand />
                        ) : (
                          <Navigate to="/" />
                        )
                      }
                    />
                    <Route
                      path="/updateCarBrand/:id"
                      element={
                        isAuth === "Authenticated" ? (
                          <UpdateCarBrand />
                        ) : (
                          <Navigate to="/" />
                        )
                      }
                    />
                    <Route
                      path="/car-model-management"
                      element={
                        isAuth === "Authenticated" ? (
                          <CarModelManagement />
                        ) : (
                          <Navigate to="/" />
                        )
                      }
                    />
                    <Route
                      path="/addCarModel"
                      element={
                        isAuth === "Authenticated" ? (
                          <AddCar />
                        ) : (
                          <Navigate to="/" />
                        )
                      }
                    />
                    <Route
                      path="/add-car-form1"
                      element={
                        isAuth === "Authenticated" ? (
                          <AddCarForm1 />
                        ) : (
                          <Navigate to="/" />
                        )
                      }
                    />
                    <Route
                      path="/add-car-form2/:model"
                      element={
                        isAuth === "Authenticated" ? (
                          <AddCarForm2 />
                        ) : (
                          <Navigate to="/" />
                        )
                      }
                    />

                    <Route
                      path="/UpdateCarModel/:id"
                      element={
                        isAuth === "Authenticated" ? (
                          <UpdateCarModel />
                        ) : (
                          <Navigate to="/" />
                        )
                      }
                    />
                    <Route
                    path="/adminCar/:modelId/CarsByModel"
                    element={
                      isAuth === "Authenticated" ? (
                        <CarByModelManagement />
                      ) : (
                        <Navigate to="/" />
                      )
                    }
                  />
                  <Route
                  path="/adminCar/:modelId/update"
                  element={
                    isAuth === "Authenticated" ? (
                      <UpdateCarbyModel />
                    ) : (
                      <Navigate to="/" />
                    )
                  }
                />
                <Route
                path="/adminCar/:modelId/addcarbymodel"
                element={
                  isAuth === "Authenticated" ? (
                    <AddCarByModel />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
                    <Route
                      path="/Order-management"
                      element={
                        isAuth === "Authenticated" ? (
                          <OrderManagement />
                        ) : (
                          <Navigate to="/" />
                        )
                      }
                    />
                    <Route
                    path="/orderDetails/:orderId"
                    element={
                      isAuth === "Authenticated" ? (
                        <OrderDetails />
                      ) : (
                        <Navigate to="/" />
                      )
                    }
                  />
                  <Route
                  path="/user-management"
                  element={
                    isAuth === "Authenticated" ? (
                      <UserManagement />
                    ) : (
                      <Navigate to="/" />
                    )
                  }
                />
                    <Route
                      path="banners"
                      element={
                        isAuth === "Authenticated" ? (
                          <Banners />
                        ) : (
                          <Navigate to="/" />
                        )
                      }
                    />

                    <Route path="*" element={<Navigate to="/404" />} />
                    <Route path="/404" element={<PageNotFound />} />
                  </Routes>
                </div>
              </Suspense>
            </div>
          </div>
        </ThemeProvider>
      </SidebarProvider>
    </>
  );
}

export default App;
