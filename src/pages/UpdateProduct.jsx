import React from "react";
import PageHeader from "../layout/PageHeader";
import Spring from "../components/Spring";
import { useState } from "react";
import classNames from "classnames";
import { toast } from "react-toastify";
import trash from "../assets/icons/trash.svg";
import { UpdateDataWithId } from "../db/databaseFunction";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import DropFiles from "../components/DropFiles";
import { uploadTheImage } from "../db/databaseFunction";
import MultiSelectDropdown from "../components/MultiSelectDropdown.js"; // Import the new component

const UpdateProduct = () => {
  const [isLoadingModal, setisLoadingModal] = useState(false);
  const { adminCarsData } = useSelector((state) => state.project);
  // const [compatibleValue, setcompatibleValue] = useState("");
  const [compatibleVehicles, setcompatibleVehicles] = useState([]);
  const [selectedVehicles, setSelectedVehicles] = useState([]);

  const [imagesArray, setimagesArray] = useState([]);
  const { id, refer } = useParams();
  const {
    filtersData,
    oilsData,
    tireData,
    batteryData,
    engineOilData,
    engineOilPetrolData,
  } = useSelector((state) => state.project);
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    nameEng: "",
    nameArab: "",
    descEng: "",
    descArab: "",
    ogPrice: "",
    cmPrice: "",
    type: refer,
    warenty: "",
    skuId: "",
    quantity: 0, // Add this line
  });
  const [diemensionAaay, setdiemensionAaay] = useState([]);
  const [diemsensionValue, setdiemsensionValue] = useState({
    engName: "",
    arabName: "",
    value: "",
  });

  useEffect(() => {
    const findCurrentData = () => {
      const dataApproch =
        refer === "Oils"
          ? oilsData
          : refer === "Filters"
          ? filtersData
          : refer === "Tyres"
          ? tireData
          : refer === "btteries"
          ? batteryData
          : refer === "engineOil"
          ? engineOilData
          : refer === "engineOilPetrol"
          ? engineOilPetrolData
          : refer === "Filters"
          ? filtersData
          : [];
      const fiLterDataNow = dataApproch.filter((dat) => dat.dbId === id);
      setformData({
        nameEng: fiLterDataNow[0]?.productNameEng
          ? `${fiLterDataNow[0]?.productNameEng}`
          : "",
        nameArab: fiLterDataNow[0]?.productNameArab
          ? `${fiLterDataNow[0]?.productNameArab}`
          : "",
        descEng: fiLterDataNow[0]?.productDescEng
          ? `${fiLterDataNow[0]?.productDescEng}`
          : "",
        descArab: fiLterDataNow[0]?.productDescArab
          ? `${fiLterDataNow[0]?.productDescArab}`
          : "",
        ogPrice: fiLterDataNow[0]?.originalPrice
          ? `${fiLterDataNow[0]?.originalPrice}`
          : "",
        cmPrice: fiLterDataNow[0]?.commercialPrice
          ? `${fiLterDataNow[0]?.commercialPrice}`
          : "",
        quantity: fiLterDataNow[0]?.quantity
          ? `${fiLterDataNow[0]?.quantity}`
          : "",
        type: fiLterDataNow[0]?.reference,
        warenty: fiLterDataNow[0]?.warenty
          ? `${fiLterDataNow[0]?.warenty}`
          : "",
        skuId: fiLterDataNow[0]?.skuId
          ? fiLterDataNow[0]?.skuId
          : fiLterDataNow[0]?.dbId,
      });
      setdiemensionAaay(fiLterDataNow[0].productDiemensions);
      setimagesArray(
        fiLterDataNow[0]?.images?.length > 0 ? fiLterDataNow[0]?.images : []
      );
      setcompatibleVehicles(
        fiLterDataNow[0]?.suitableVehicles?.length > 0
          ? fiLterDataNow[0]?.suitableVehicles
          : []
      );
    };
    if (
      (refer === "Oils" ||
        refer === "Filters" ||
        refer === "engineOil" ||
        refer === "engineOilPetrol" ||
        refer === "Tyres" ||
        refer === "btteries") &&
      id.length > 0
    ) {
      findCurrentData();
    } else {
      navigate("/404");
    }
  }, [
    id,
    refer,
    batteryData,
    filtersData,
    navigate,
    oilsData,
    tireData,
    engineOilData,
    engineOilPetrolData,
  ]);

  const handlePasswordReminder = async (e) => {
    e.preventDefault();

    const extraData = {
      warenty: formData?.warenty
        ? Number(parseFloat(formData.warenty).toFixed(1))
        : 0,
      productDiemensions: diemensionAaay
        ? diemensionAaay.map((dat, index) => {
            return { ...dat, id: index };
          })
        : [],
    };
    const dataToPost = {
      skuId: formData?.skuId,
      originalPrice: Number(parseFloat(formData.ogPrice).toFixed(2)),
      productDescArab: formData.descArab,
      productDescEng: formData.descEng,
      productNameArab: formData.nameArab,
      productNameEng: formData.nameEng,
      images: imagesArray,
      suitableVehicles: compatibleVehicles,
      quantity: parseInt(formData.quantity, 10), // Add this line to ensure quantity is an integer
    };
    const commercialObject = {
      commercialPrice: Number(parseFloat(formData.cmPrice).toFixed(2)),
    };
    const finaldata = {
      ...dataToPost,
      ...(formData.type !== "Oils" &&
      formData.type !== "Filters" &&
      formData.type !== "engineOil" &&
      formData.type !== "engineOilPetrol" &&
      formData.type !== ""
        ? extraData
        : {}),
      ...(formData.type === "Filters" && formData.type !== ""
        ? commercialObject
        : {}),
    };
    if (compatibleVehicles?.length > 0) {
      if (imagesArray?.length > 0) {
        await UpdateDataWithId(formData.type, id, { ...finaldata })
          .then(() => {
            toast.success("Product Updated");
            navigate(-1);
          })
          .catch((e) => toast.error("Error" + e));
      } else {
        toast.error("Please Upload atleast one product image");
      }
    } else {
      toast.error("Please Add atleast one vehicle");
    }
  };
  const removeImageFromDb = async (index) => {
    if (
      !window.confirm(
        `Are you sure you want to delete number ${index + 1} image ?`
      )
    ) {
      return;
    } else {
      setisLoadingModal(true);
      setimagesArray(imagesArray.filter((dat, indexs) => index !== indexs));
      setisLoadingModal(false);
    }
  };
  const uploadImageFunction = async (e) => {
    setisLoadingModal(true);
    await uploadTheImage(e[0])
      .then(async (dat) => {
        if (dat) {
          setimagesArray(
            imagesArray?.length > 0
              ? [...imagesArray, { imgLink: dat }]
              : [{ imgLink: dat }]
          );
          toast.success("Image Uploaded.");
        }
      })
      .catch((e) => {
        toast.error("Error" + e);
      });
    setisLoadingModal(false);
  };

  const handleAddCompatibleVehicles = () => {
    if (selectedVehicles.length > 0) {
      // Filter out vehicles already in the compatibleVehicles state to avoid duplicates
      const newVehicles = selectedVehicles.filter(
        (vehicle) =>
          !compatibleVehicles.some((existing) => existing.dbId === vehicle.dbId)
      );

      setcompatibleVehicles([...compatibleVehicles, ...newVehicles]);
      setSelectedVehicles([]); // Clear the selected vehicles after adding
      toast.success("Vehicles added successfully");
    } else {
      toast.error("Please select at least one vehicle");
    }
  };

  return (
    <>
      <PageHeader title="Update Product" />
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
                Product Sku Id
              </label>
              <input
                className={classNames("field-input")}
                required
                id="skuId"
                type="text"
                minLength={6}
                placeholder="Product Sku Id"
                value={formData.skuId}
                onChange={(e) =>
                  setformData({ ...formData, skuId: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="field-wrapper">
                <label htmlFor="phone" className="field-label">
                  English Name
                </label>
                <input
                  className={classNames("field-input")}
                  required
                  id="phone"
                  type="text"
                  minLength={10}
                  placeholder="Product name in english"
                  value={formData.nameEng}
                  onChange={(e) =>
                    setformData({ ...formData, nameEng: e.target.value })
                  }
                />
              </div>
              <div className="field-wrapper">
                <label htmlFor="phone" className="field-label">
                  Arabic Name
                </label>
                <input
                  className={classNames("field-input")}
                  required
                  id="phone"
                  type="text"
                  minLength={10}
                  placeholder="Product name in arabic"
                  value={formData.nameArab}
                  onChange={(e) =>
                    setformData({ ...formData, nameArab: e.target.value })
                  }
                />
              </div>

              <div className="field-wrapper">
                <label htmlFor="phone" className="field-label">
                  English Description
                </label>
                <textarea
                  rows={4}
                  className={"field-input"}
                  style={{ height: "120px", padding: "0.5rem" }}
                  required
                  minLength={15}
                  id="phone"
                  type="text"
                  placeholder="Product Description in english"
                  value={formData.descEng}
                  onChange={(e) =>
                    setformData({ ...formData, descEng: e.target.value })
                  }
                />
              </div>
              <div className="field-wrapper">
                <label htmlFor="phone" className="field-label">
                  Arabic Description
                </label>
                <textarea
                  rows={4}
                  className={"field-input"}
                  minLength={15}
                  style={{ height: "120px", padding: "0.5rem" }}
                  required
                  id="phone"
                  type="text"
                  placeholder="Product Description in arabic"
                  value={formData.descArab}
                  onChange={(e) =>
                    setformData({ ...formData, descArab: e.target.value })
                  }
                />
              </div>
              <div className="field-wrapper">
                <label htmlFor="phone" className="field-label">
                  Product Orignal Price
                </label>
                <input
                  className={"field-input"}
                  required
                  id="phone"
                  type="number"
                  minLength={1}
                  placeholder="0"
                  value={formData.ogPrice}
                  onChange={(e) =>
                    setformData({ ...formData, ogPrice: e.target.value })
                  }
                />
              </div>

              <div className="field-wrapper">
                <label htmlFor="quantity" className="field-label">
                  Quantity
                </label>
                <input
                  className={classNames("field-input")}
                  required
                  id="quantity"
                  type="number"
                  min={0} // Ensure the quantity can't be negative
                  placeholder="Quantity"
                  value={formData.quantity}
                  onChange={(e) =>
                    setformData({ ...formData, quantity: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="field-wrapper">
              <h6 htmlFor="warrenty" className="h6 text-sm">
                Select Vehicles
              </h6>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="field-wrapper">
                <label htmlFor="phone" className="field-label">
                  Select Vehicle
                </label>
                {/*<select
                  className={classNames("field-input")}
                  id="role"
                  type="text"
                  placeholder="Select Vehicle"
                  defaultValue={""}
                  value={compatibleValue}
                  onChange={(e) => setcompatibleValue(e.target.value)}
                >
                  <option value={""}>Select Vehicle</option>
                  {adminCarsData?.map((dat) => (
                    <option
                      key={dat?.dbId}
                      value={`${dat.carCompany} ${dat.carName} ${dat?.carModal}`}
                    >
                      {dat.carCompany} {dat?.carName} {dat?.carModal}
                    </option>
                  ))}
                </select>
                */}
                <MultiSelectDropdown
                  options={adminCarsData}
                  selectedOptions={selectedVehicles}
                  setSelectedOptions={setSelectedVehicles}
                  keyExtractor={(item) => item.dbId} // Use dbId as the unique key for each vehicle
                />
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleAddCompatibleVehicles();
                }}
                className="btn btn--primary max-w-[120px] mt-6"
              >
                Add
              </button>
              <div className="flex flex-col items-center gap-2">
                <label
                  htmlFor="warrenty"
                  className="field-label"
                  style={{ color: "transparent" }}
                >
                  btn
                </label>
                {/*  <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (compatibleValue?.length > 0) {
                      const fetchTheWholeObject = adminCarsData?.filter(
                        (dac) =>
                          `${dac.carCompany} ${dac.carName} ${dac.carModal}` ===
                          compatibleValue
                      );
                      const { dbId, ...rest } = fetchTheWholeObject[0];
                      setcompatibleVehicles(
                        compatibleVehicles.length > 0
                          ? [
                              ...compatibleVehicles,
                              {
                                ...rest,
                              },
                            ]
                          : [
                              {
                                ...rest,
                              },
                            ]
                      );
                      setcompatibleValue("");
                    } else {
                      toast.error("Please Select a car first");
                    }
                  }}
                  className="btn btn--primary max-w-[120px]"
                >
                  Add
                </button>*/}
              </div>
            </div>

            {compatibleVehicles?.length > 0
              ? compatibleVehicles.map((dat, index) => (
                  <div
                    key={index}
                    className="flex flex-row items-center justify-start"
                  >
                    <div className="flex flex-col item-center justify-start grow">
                      <p>
                        {dat.carCompany} {dat.carName} {dat.carModal}
                      </p>
                      <p>
                        {dat.carCompanyAr} {dat.carNameAr} {dat.carModal}
                      </p>
                    </div>
                    <div
                      onClick={() =>
                        setcompatibleVehicles(
                          compatibleVehicles.filter((dat, ind) => ind !== index)
                        )
                      }
                      className="flex flex-col item-center justify-start"
                    >
                      <img
                        style={{
                          width: "30px",
                          height: "25px",
                          objectFit: "contain",
                        }}
                        src={trash}
                        alt="trash"
                      />
                    </div>
                  </div>
                ))
              : null}
            {formData.type === "Filters" && formData.type !== "" ? (
              <div className="field-wrapper">
                <label htmlFor="phone" className="field-label">
                  Product Commercial Price
                </label>
                <input
                  className={"field-input"}
                  required
                  id="phone"
                  type="number"
                  placeholder="0"
                  minLength={1}
                  value={formData.cmPrice}
                  onChange={(e) =>
                    setformData({ ...formData, cmPrice: e.target.value })
                  }
                />
              </div>
            ) : null}
            {formData.type !== "Oils" &&
            formData.type !== "Filters" &&
            formData.type !== "engineOil" &&
            formData.type !== "" ? (
              <div className="field-wrapper">
                <label htmlFor="warrenty" className="field-label">
                  Warrenty
                </label>

                <input
                  className={classNames("field-input")}
                  id="warrenty"
                  type="number"
                  minLength={1}
                  placeholder="0"
                  required
                  value={formData.warenty}
                  onChange={(e) =>
                    setformData({ ...formData, warenty: e.target.value })
                  }
                />
              </div>
            ) : null}
            {formData.type !== "Oils" &&
            formData.type !== "Filters" &&
            formData.type !== "engineOil" &&
            formData.type !== "" ? (
              <div className="field-wrapper">
                <h6 htmlFor="warrenty" className="h6 text-sm">
                  Product Diemensions
                </h6>
              </div>
            ) : null}
            {formData.type !== "Oils" &&
            formData.type !== "Filters" &&
            formData.type !== "engineOil" &&
            formData.type !== "" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="field-wrapper">
                  <label htmlFor="warrenty" className="field-label">
                    Property Name English
                  </label>

                  <input
                    className={classNames("field-input")}
                    id="warrenty"
                    type="text"
                    placeholder="English"
                    value={diemsensionValue.engName}
                    onChange={(e) =>
                      setdiemsensionValue({
                        ...diemsensionValue,
                        engName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="field-wrapper">
                  <label htmlFor="warrenty" className="field-label">
                    Property Name Arabic
                  </label>

                  <input
                    className={classNames("field-input")}
                    id="warrenty"
                    type="text"
                    placeholder="Arabic"
                    value={diemsensionValue.arabName}
                    onChange={(e) =>
                      setdiemsensionValue({
                        ...diemsensionValue,
                        arabName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="field-wrapper">
                  <label htmlFor="warrenty" className="field-label">
                    Property Value
                  </label>

                  <input
                    className={classNames("field-input")}
                    id="warrenty"
                    type="text"
                    placeholder="Value"
                    value={diemsensionValue.value}
                    onChange={(e) =>
                      setdiemsensionValue({
                        ...diemsensionValue,
                        value: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <label
                    htmlFor="warrenty"
                    className="field-label"
                    style={{ color: "transparent" }}
                  >
                    btn
                  </label>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (
                        diemsensionValue.arabName.length >= 3 &&
                        diemsensionValue.engName.length >= 3 &&
                        diemsensionValue.value.length >= 2
                      ) {
                        setdiemensionAaay(
                          diemensionAaay.length > 0
                            ? [
                                ...diemensionAaay,
                                {
                                  nameEng: diemsensionValue.engName,
                                  nameArab: diemsensionValue.arabName,
                                  value: diemsensionValue.value,
                                },
                              ]
                            : [
                                {
                                  nameEng: diemsensionValue.engName,
                                  nameArab: diemsensionValue.arabName,
                                  value: diemsensionValue.value,
                                },
                              ]
                        );
                        setdiemsensionValue({
                          engName: "",
                          arabName: "",
                          value: "",
                        });
                      } else {
                        toast.error(
                          "Product Diemension Name in arabic and english must be atleat 3 letters and value should be atleast 2 letters"
                        );
                      }
                    }}
                    className="btn btn--primary max-w-[120px]"
                  >
                    Add
                  </button>
                </div>
              </div>
            ) : null}
            {formData.type !== "Oils" &&
            formData.type !== "Filters" &&
            formData.type !== "engineOil" &&
            formData.type !== "" &&
            diemensionAaay?.length > 0
              ? diemensionAaay.map((dat, index) => (
                  <div
                    key={index}
                    className="flex flex-row items-center justify-start"
                  >
                    <div className="flex flex-col item-center justify-start grow">
                      <h5>
                        {dat.nameEng},{dat.nameArab}
                      </h5>
                      <p>{dat.value}</p>
                    </div>
                    <div
                      onClick={() =>
                        setdiemensionAaay(
                          diemensionAaay.filter((dat, ind) => ind !== index)
                        )
                      }
                      className="flex flex-col item-center justify-start"
                    >
                      <img
                        style={{
                          width: "30px",
                          height: "25px",
                          objectFit: "contain",
                        }}
                        src={trash}
                        alt="trash"
                      />
                    </div>
                  </div>
                ))
              : null}
            <label className="field-label">Product Images</label>
            <div className="widgets-grid grid-cols-1 md:grid-cols-2">
              {imagesArray &&
                imagesArray?.map((dat, index) => (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "relative",
                    }}
                  >
                    <div
                      onClick={() => removeImageFromDb(index)}
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        width: "50px",
                        height: "50px",
                        background: "rgba(0,0,0,0.5)",
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        src={trash}
                        style={{
                          width: "30px",
                          height: "25px",
                          objectFit: "contain",
                        }}
                        alt="trash"
                      />
                    </div>
                    <img
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                      key={index}
                      src={dat.imgLink}
                      alt="banner"
                    />
                  </div>
                ))}
              {isLoadingModal ? (
                <div className="flex justify-center min-h-[120px] items-center w-100 h-100 btn--primary rounded-lg">
                  <img
                    className="w-[40px] h-[40px]"
                    src="https://upload.wikimedia.org/wikipedia/commons/a/ad/YouTube_loading_symbol_3_%28transparent%29.gif"
                    alt="loading"
                  />
                </div>
              ) : (
                <DropFiles
                  type="image"
                  multiple={false}
                  onChange={uploadImageFunction}
                  wrapperClass="flex justify-center min-h-[120px] items-center w-100 h-100 btn--primary rounded-lg"
                >
                  <i
                    className="icon-circle-plus-regular"
                    style={{ fontSize: "5rem" }}
                  />
                </DropFiles>
              )}
            </div>
            <div className="flex flex-col items-center gap-6 mt-4 mb-10">
              <button type="submit" className="btn btn--primary w-full">
                Upload
              </button>
            </div>
          </form>
        </Spring>
      </div>
    </>
  );
};

export default UpdateProduct;
