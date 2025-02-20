import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageHeader from "../layout/PageHeader";
import Spring from "../components/Spring";
import Services from "./Services/Services";

const UpdateBrand = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const [brand, setBrand] = useState(
    location.state?.brand || {
      name: "",
      imagedata: null,
      status: false,
    }
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("Brand data from location state:", location.state?.brand);
    console.log("Image data:", location.state?.brand?.imagedata);
  }, [location.state]);

  const handleInputChange = (e) => {
    setBrand({ ...brand, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setBrand((prev) => ({ ...prev, imagedata: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setBrand((prev) => ({ ...prev, imagedata: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isBrandNameChanged = brand.bName !== location.state?.brand?.bName;
    const isBrandImageChanged = brand.imagedata !== location.state?.brand?.imagedata;

    const payload = new FormData();

    if (isBrandNameChanged) {
      payload.append("name", brand.bName);
    }

    if (isBrandImageChanged && brand.imagedata) {
      const imageFile = await fetch(brand.imagedata).then((res) => res.blob());
      payload.append("image", imageFile, "brand-logo.png");
    }

    for (let [key, value] of payload.entries()) {
      console.log(key, value);
    }

    try {
      setLoading(true);
      const response = await Services.getInstance().updateBrand(
        location.state?.brand.id,
        payload,
        isBrandNameChanged,
        isBrandImageChanged
      );

      if (response.error) {
        setError(response.error);
      } else {
        setTimeout(() => {
          toast.success("Brand updated successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          navigate("/brand-management");
        }, 3000);
      }
    } catch (error) {
      setError("Failed to update brand");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader title="Update Product Brand" />
      <ToastContainer />

      <div className="bg-widget flex items-center justify-center w-full py-10 px-4 lg:p-[60px]">
        <Spring className="w-full max-w-[560px]" type="slideUp" duration={400} delay={300}>
          <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-5">
            <div className="field-wrapper">
              <label className="field-label">Brand Name</label>
              <input
                className="field-input"
                type="text"
                name="bName"
                value={brand.bName}
                onChange={handleInputChange}
              />
            </div>

            <div className="field-wrapper">
              <label htmlFor="image" className="field-label">
                Brand Image
              </label>
              <div className="flex items-center gap-4">
                <img
                  src={brand.imagedata ? `data:image/jpeg;base64,${brand.imagedata}` : "https://via.placeholder.com/150"}
                  alt="Brand"
                  className="w-16 h-16 rounded border"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full border border-input-border rounded px-4 py-2"
                />
                {brand.imagedata && (
                  <button
                    type="button"
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={handleImageRemove}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>

            <button type="submit" className="btn btn--primary w-full" disabled={loading}>
              {loading ? "Updating..." : "Update Brand"}
            </button>
          </form>
        </Spring>
      </div>
    </>
  );
};

export default UpdateBrand;