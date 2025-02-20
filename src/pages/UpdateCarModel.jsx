import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageHeader from "../layout/PageHeader";
import Spring from "../components/Spring";
import Services from "./Services/Services";

const UpdateCarModel = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const [carData, setCarData] = useState(
    location.state?.carModel || {
      brand: "",
      model: "",
      carImage: null,
    }
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!location.state?.carModel) {
      const fetchCarModel = async () => {
        try {
          const response = await Services.getInstance().getCarModel(id);
          if (response.data) {
            setCarData({
              brand: response.data.brandName,
              model: response.data.name,
              carImage: response.data.image ? `data:image/png;base64,${response.data.image}` : null,
            });
          }
        } catch (error) {
          console.error("Error fetching car model data:", error);
          setError("Failed to fetch car model data");
        }
      };
      fetchCarModel();
    }
  }, [id, location.state?.carModel]);

  const handleInputChange = (e) => {
    setCarData({ ...carData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCarData((prev) => ({ ...prev, carImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setCarData((prev) => ({ ...prev, carImage: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const isBrandChanged = carData.brand !== location.state?.carModel?.brand;
    const isModelChanged = carData.model !== location.state?.carModel?.model;
    const isImageChanged = carData.carImage !== location.state?.carModel?.carImage;
  
    if (!isModelChanged && !isImageChanged && !isBrandChanged) {
      toast.info("No changes detected");
      return;
    }
  
    const payload = new FormData();
    
    // Always append these if they've changed, regardless of image status
    if (isBrandChanged) payload.append("brandName", carData.brand);
    if (isModelChanged) payload.append("name", carData.model);
    
    // Handle image separately
    if (isImageChanged) {
      if (carData.carImage) {
        try {
          const imageFile = await fetch(carData.carImage).then((res) => res.blob());
          payload.append("image", imageFile, "car-model.png");
        } catch (error) {
          console.error("Error processing image:", error);
          toast.error("Error processing image");
          return;
        }
      } else {
        // If carImage is null and it's changed, it means we're removing the image
        payload.append("image", null);
      }
    }
  
    try {
      setLoading(true);
      setError("");
  
      const response = await Services.getInstance().updateCarModel(
        id,
        payload,
        isBrandChanged,
        isModelChanged,
        isImageChanged
      );
  
      if (response.error) {
        setError(response.error);
        toast.error(response.error);
      } else {
        toast.success("Car model updated successfully!");
        setTimeout(() => navigate("/car-model-management"), 3000);
      }
    } catch (error) {
      const errorMessage = error.message || "Failed to update car model";
      setError(errorMessage);
      toast.error(errorMessage);
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader title="Update Car Model" />
      <ToastContainer />

      <div className="bg-widget flex items-center justify-center w-full py-10 px-4 lg:p-[60px]">
        <Spring className="w-full max-w-[560px]" type="slideUp" duration={400} delay={300}>
          <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-5">
            <div className="field-wrapper">
              <label className="field-label">Brand</label>
              <input className="field-input" type="text" name="brand" value={carData.brand} onChange={handleInputChange} readOnly/>
            </div>
            <div className="field-wrapper">
              <label className="field-label">Model</label>
              <input className="field-input" type="text" name="model" value={carData.model} onChange={handleInputChange} />
            </div>
            <div className="field-wrapper">
              <label className="field-label">Car Image</label>
              <div className="flex items-center gap-4">
                <img src={carData.carImage || "https://via.placeholder.com/150"} alt="Car" className="w-16 h-16 rounded border object-cover" />
                <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full border border-input-border rounded px-4 py-2" />
                {carData.carImage && (
                  <button type="button" className="bg-red-500 text-white px-2 py-1 rounded" onClick={handleImageRemove}>
                    Remove
                  </button>
                )}
              </div>
            </div>
            <button type="submit" className="btn btn--primary w-full" disabled={loading}>
              {loading ? "Updating..." : "Update Car Model"}
            </button>
          </form>
        </Spring>
      </div>
    </>
  );
};

export default UpdateCarModel;