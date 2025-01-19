import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useWindowSize } from "react-use";
import Spring from "../components/Spring";
import PasswordInput from "../components/PasswordInput";
import { setAuth } from "../store/authSlice";
import classNames from "classnames";
// import LoginMain from "../assets/LoginMain.jpg";

const AuthLayout = () => {
  const { width } = useWindowSize();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (formData.password?.length > 5) {
      if (
        formData.email.toLowerCase() === "carfixit_admin@gmail.com" &&
        formData.password === "carfixit1234"
      ) {
        dispatch(setAuth({ isAuth: "Authenticated" }));
        await window.localStorage.setItem(
          "aczurex_admin_login",
          "Authenticated"
        );
      } else {
        toast.error("Please use right email and password");
      }
    } else {
      toast.error("Password should be atleast 5 letters");
    }
  };

  return (
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 4xl:grid-cols-[minmax(0,_1030px)_minmax(0,_1fr)]">
      {/* Left Section: Illustration */}
      {width >= 1024 && (
        <div className="flex flex-col justify-center items-center lg:p-[60px]">
          <img
            src={require("../assets/logo.png")}
            alt="carFixIt"
            className="w-[350px]"
          />

        </div>
      )}

      {/* Right Section: Login Form */}
      <div className="bg-widget flex items-center justify-center w-full py-10 px-4 lg:p-[60px]">
        <Spring
          className="max-w-[460px] w-full"
          type="slideUp"
          duration={400}
          delay={300}
        >
          <div className="text-center mb-5">
            <h1>Welcome Back!</h1>
          </div>
          <form onSubmit={handleFormSubmit}>
            <div className="flex flex-col gap-5">
              {/* Email Input */}
              <div className="field-wrapper">
                <label htmlFor="email" className="field-label">
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  minLength={5}
                  placeholder="Your E-mail Address"
                  className={classNames("field-input")}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              {/* Password Input */}
              <PasswordInput
                placeholder="Your Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="btn btn--primary w-full"
              >
                Log In
              </button>
            </div>
          </form>
        </Spring>
      </div>
    </div>
  );
};

export default AuthLayout;
