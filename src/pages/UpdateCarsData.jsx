import React, { useEffect } from "react";
import PageHeader from "../layout/PageHeader";
import Spring from "../components/Spring";
import { useState } from "react";
import classNames from "classnames";
import { toast } from "react-toastify";
import { UpdateDataWithId } from "../db/databaseFunction";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const UpdateCarsData = () => {
  const { id } = useParams();
  const [formData, setformData] = useState({
    carCompany: "",
    carCompanyAr: "",
    carName: "",
    carNameAr: "",
    carModal: "",
    oilCapacity: "",
  });
  const navigate = useNavigate();
  const { adminCarsData } = useSelector((state) => state.project);
  useEffect(() => {
    const filterCurrentData = async () => {
      const result = await adminCarsData?.filter((car) => car.dbId === id);
      if (result?.length > 0) {
        setformData({
          carCompany: result[0]?.carCompany,
          carCompanyAr: result[0]?.carCompanyAr,
          carModal: result[0]?.carModal,
          carName: result[0]?.carName,
          carNameAr: result[0]?.carNameAr,
          oilCapacity: result[0]?.oilCapacity,
        });
      } else {
        navigate("/404");
      }
    };
    if (id.length > 0) {
      filterCurrentData();
    } else {
      navigate("/404");
    }
  }, [id, adminCarsData, navigate]);

  const handlePasswordReminder = async (e) => {
    e.preventDefault();
    const checkExistingCar = adminCarsData?.filter(
      (car) =>
        `${car.carCompany} ${car.carName} ${car.carCompanyAr} ${car.carNameAr} ${car.carModal}`
          .toLowerCase()
          .includes(
            `${formData.carCompany} ${formData.carName} ${formData.carCompanyAr} ${formData.carNameAr} ${formData.carModal}`.toLowerCase()
          ) && car.dbId !== id
    );
    if (checkExistingCar?.length > 0) {
      toast.error("This car data is already present in database");
    } else {
      const dataToPost = {
        carCompany: formData.carCompany,
        carCompanyAr: formData.carCompanyAr,
        carName: formData.carName,
        carNameAr: formData.carNameAr,
        carModal: formData.carModal,
        oilCapacity: formData.oilCapacity,
      };
      await UpdateDataWithId("adminCarsData", id, { ...dataToPost })
        .then(() => {
          toast.success("Car Added");
          navigate(-1);
        })
        .catch((e) => toast.error("Error" + e));
    }
  };

  return (
    <>
      <PageHeader title="Update Car" />
      <div className="bg-widget flex items-center justify-center w-full py-10 px-4 lg:p-[60px]">
        <Spring
          className="w-full max-w-[560px]"
          type="slideUp"
          duration={400}
          delay={300}
        >
          <form
            className="mt-5 flex flex-col gap-5"
            onSubmit={handlePasswordReminder}
          >
            <div className="field-wrapper">
              <label htmlFor="skuId" className="field-label">
                Car Company English
              </label>
              <input
                className={classNames("field-input")}
                required
                id="skuId"
                type="text"
                minLength={3}
                placeholder="Car Company English"
                value={formData.carCompany}
                onChange={(e) =>
                  setformData({ ...formData, carCompany: e.target.value })
                }
              />
            </div>
            <div className="field-wrapper">
              <label htmlFor="skuId" className="field-label">
                Car Company Arabic
              </label>
              <input
                className={classNames("field-input")}
                required
                id="skuId"
                type="text"
                minLength={3}
                placeholder="Car Company Arabic"
                value={formData.carCompanyAr}
                onChange={(e) =>
                  setformData({ ...formData, carCompanyAr: e.target.value })
                }
              />
            </div>
            <div className="field-wrapper">
              <label htmlFor="skuId" className="field-label">
                Car Name English
              </label>
              <input
                className={classNames("field-input")}
                required
                id="skuId"
                type="text"
                minLength={3}
                placeholder="Car Name English"
                value={formData.carName}
                onChange={(e) =>
                  setformData({ ...formData, carName: e.target.value })
                }
              />
            </div>
            <div className="field-wrapper">
              <label htmlFor="skuId" className="field-label">
                Car Name Arabic
              </label>
              <input
                className={classNames("field-input")}
                required
                id="skuId"
                type="text"
                minLength={3}
                placeholder="Car Name Arabic"
                value={formData.carNameAr}
                onChange={(e) =>
                  setformData({ ...formData, carNameAr: e.target.value })
                }
              />
            </div>
            <div className="field-wrapper">
              <label htmlFor="skuId" className="field-label">
                Car Modal
              </label>
              <input
                className={classNames("field-input")}
                required
                id="skuId"
                type="number"
                minLength={4}
                placeholder="Car Modal"
                value={formData.carModal}
                onChange={(e) =>
                  setformData({ ...formData, carModal: e.target.value })
                }
              />
            </div>
            <div className="field-wrapper">
              <label htmlFor="skuId" className="field-label">
                Car Oil Capacity
              </label>
              <input
                className={classNames("field-input")}
                required
                id="skuId"
                type="number"
                minLength={1}
                placeholder="Car Oil Capacity"
                value={formData.oilCapacity}
                onChange={(e) =>
                  setformData({ ...formData, oilCapacity: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col items-center gap-6 mt-4 mb-10">
              <button type="submit" className="btn btn--primary w-full">
                Update
              </button>
            </div>
          </form>
        </Spring>
      </div>
    </>
  );
};

export default UpdateCarsData;
