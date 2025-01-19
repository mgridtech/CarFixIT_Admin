// import React, { useState } from "react";
// import PageHeader from "../layout/PageHeader";
// import Spring from "../components/Spring";
// import PasswordInput from "../components/PasswordInput";
// import { useNavigate } from "react-router-dom";
// import classNames from "classnames";
// import PlacesAutocomplete, {
//   geocodeByAddress,
//   getLatLng,
// } from "react-places-autocomplete";
// import { toast } from "react-toastify";
// import trash from "../assets/icons/trash.svg";
// import { postData } from "../db/databaseFunction";
// const AddEmployUsers = () => {
//   const navigate = useNavigate();
//   const [formData, setformData] = useState({
//     phone: "",
//     password: "",
//     role: "",
//     cityName: "",
//     longitude: 0,
//     latitude: 0,
//     teamName: "",
//   });
//   const [teamInfo, setteamInfo] = useState({ name: "", phone: "", id: "" });
//   const [teamMembers, setteamMembers] = useState([]);
//   const [locationString, setlocationString] = useState("");
//   const handleSelect = (address) => {
//     setlocationString(address);
//     geocodeByAddress(address)
//       .then((results) => getLatLng(results[0]))
//       .then((latLng) => {
//         setformData({
//           ...formData,
//           latitude: latLng.lat,
//           longitude: latLng.lng,
//         });
//       })
//       .catch((error) => console.error("Error", error));
//   };
//   const postEmployToDb = async () => {
//     const dataToPost = {
//       jobId: "+966" + formData.phone,
//       password: formData.password,
//       phone: "+966" + formData.phone,
//       role: formData.role,
//       teamInfo:
//         formData.role === "SingleTeam" || formData.role === "SingleDTeam"
//           ? {
//               cityName: formData.cityName,
//               locationCoordinates: {
//                 latitude: formData.latitude,
//                 longitude: formData.longitude,
//               },
//               members: teamMembers.map((dat, index) => {
//                 return {
//                   ...dat,
//                   id: formData.teamName + " User " + index,
//                   userImage: "",
//                 };
//               }),
//               name: formData.teamName,
//             }
//           : null,
//       userImage: "",
//     };
//     await postData("employ", { ...dataToPost })
//       .then(() => {
//         toast.success("Employ Created Successfully");
//         navigate(-1);
//       })
//       .catch((e) => toast.error("Error", e));
//   };
//   const handlePasswordReminder = async (e) => {
//     e.preventDefault();
//     if (
//       formData.phone.length >= 3 &&
//       !formData.phone.includes("+") &&
//       !formData.phone.includes("966")
//     ) {
//       if (formData.password.length >= 4) {
//         if (formData.role !== "") {
//           if (
//             formData.role === "SingleTeam" ||
//             formData.role === "SingleDTeam"
//           ) {
//             if (formData.teamName?.length > 0) {
//               if (formData.cityName?.length > 0) {
//                 if (
//                   locationString?.length > 0 &&
//                   formData.latitude !== 0 &&
//                   formData.longitude !== 0
//                 ) {
//                   postEmployToDb();
//                 } else {
//                   toast.error(
//                     "Please enter valid location and choose the option"
//                   );
//                 }
//               } else {
//                 toast.error("Please enter team city name");
//               }
//             } else {
//               toast.error("Please enter valid team name");
//             }
//           } else {
//             await postEmployToDb();
//           }
//         } else {
//           toast.error("Please select the employ role");
//         }
//       } else {
//         toast.error("Please enter atleast 4 letters password");
//       }
//     } else {
//       toast.error("Please enter valid phone number without +966");
//     }
//   };
//   return (
//     <>
//       <PageHeader title="Add Employ" />
//       <div className="bg-widget flex items-center justify-center w-full py-10 px-4 lg:p-[60px]">
//         <Spring
//           className="w-full max-w-[560px]"
//           type="slideUp"
//           duration={400}
//           delay={300}
//         >
//           <form
//             className="mt-5 flex flex-col gap-5"
//             onSubmit={handlePasswordReminder}
//           >
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//               <div className="field-wrapper">
//                 <label htmlFor="phone" className="field-label">
//                   Phone
//                 </label>
//                 <input
//                   className={classNames("field-input")}
//                   required
//                   id="phone"
//                   type="number"
//                   placeholder="Phone without +966"
//                   value={formData.phone}
//                   onChange={(e) =>
//                     setformData({ ...formData, phone: e.target.value })
//                   }
//                 />
//               </div>

//               <PasswordInput
//                 id="password"
//                 placeholder="Your password"
//                 value={formData.password}
//                 onChange={(e) =>
//                   setformData({ ...formData, password: e.target.value })
//                 }
//               />
//             </div>
//             <div className="field-wrapper">
//               <label htmlFor="role" className="field-label">
//                 Role
//               </label>

//               <select
//                 className={classNames("field-input")}
//                 id="role"
//                 type="text"
//                 placeholder="Role"
//                 required
//                 defaultValue={""}
//                 value={formData.role}
//                 onChange={(e) =>
//                   setformData({ ...formData, role: e.target.value })
//                 }
//               >
//                 <option value={""}>Select Role</option>
//                 <option value={"SingleTeam"}>Single Team</option>
//                 <option value={"SingleDTeam"}>Dedicated Team</option>
//                 <option value={"supervisor"}>Supervisor</option>
//               </select>
//             </div>
//             {formData.role === "SingleTeam" ||
//             formData.role === "SingleDTeam" ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                 <div className="field-wrapper">
//                   <label htmlFor="teamName" className="field-label">
//                     Team Name
//                   </label>
//                   <input
//                     required
//                     className={classNames("field-input")}
//                     id="teamName"
//                     type="text"
//                     placeholder="Team Name"
//                     value={formData.teamName}
//                     onChange={(e) =>
//                       setformData({ ...formData, teamName: e.target.value })
//                     }
//                   />
//                 </div>
//                 <div className="field-wrapper">
//                   <label htmlFor="cityname" className="field-label">
//                     Team City Name
//                   </label>
//                   <input
//                     required
//                     className={classNames("field-input")}
//                     id="cityname"
//                     type="text"
//                     placeholder="Team City Name"
//                     value={formData.cityName}
//                     onChange={(e) =>
//                       setformData({ ...formData, cityName: e.target.value })
//                     }
//                   />
//                 </div>
//               </div>
//             ) : null}

//             {formData.role === "SingleTeam" ||
//             formData.role === "SingleDTeam" ? (
//               <PlacesAutocomplete
//                 value={locationString}
//                 onChange={(e) => setlocationString(e)}
//                 onSelect={handleSelect}
//               >
//                 {({
//                   getInputProps,
//                   suggestions,
//                   getSuggestionItemProps,
//                   loading,
//                 }) => (
//                   <div className="field-wrapper">
//                     <label htmlFor="location" className="field-label">
//                       Location
//                     </label>
//                     <input
//                       id="location"
//                       {...getInputProps({
//                         placeholder: "Exact location of office",
//                         className: "field-input",
//                       })}
//                       required
//                     />
//                     <div className="autocomplete-dropdown-container">
//                       {loading && <div>Loading...</div>}
//                       {suggestions.map((suggestion) => {
//                         const className = `suggestion-item ${
//                           suggestion.active ? "suggestion-item--active" : ""
//                         }`;
//                         return (
//                           <div
//                             {...getSuggestionItemProps(suggestion, {
//                               className,
//                             })}
//                           >
//                             <span>{suggestion.description}</span>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}
//               </PlacesAutocomplete>
//             ) : null}
//             {formData.role === "SingleTeam" ||
//             formData.role === "SingleDTeam" ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                 <div className="field-wrapper">
//                   <label htmlFor="teamMemberName" className="field-label">
//                     Team Member Name
//                   </label>
//                   <input
//                     className={classNames("field-input")}
//                     id="teamMemberName"
//                     type="text"
//                     placeholder="Member Name"
//                     value={teamInfo.name}
//                     onChange={(e) =>
//                       setteamInfo({ ...teamInfo, name: e.target.value })
//                     }
//                   />
//                 </div>
//                 <div className="field-wrapper">
//                   <label htmlFor="memberPhone" className="field-label">
//                     Team Member Phone
//                   </label>
//                   <input
//                     className={classNames("field-input")}
//                     id="memberPhone"
//                     type="text"
//                     placeholder="Full Member Phone"
//                     value={teamInfo.phone}
//                     onChange={(e) =>
//                       setteamInfo({ ...teamInfo, phone: e.target.value })
//                     }
//                   />
//                 </div>
//                 <div className="field-wrapper">
//                   <button
//                     onClick={() => {
//                       if (teamInfo.phone.includes("+966")) {
//                         setteamMembers(
//                           teamMembers?.length > 0
//                             ? [
//                                 ...teamMembers,
//                                 { name: teamInfo.name, phone: teamInfo.phone },
//                               ]
//                             : [{ name: teamInfo.name, phone: teamInfo.phone }]
//                         );
//                         setteamInfo({ name: "", phone: "" });
//                       } else {
//                         toast.error(
//                           "Please enter a valid Team Member phone number starting with +966"
//                         );
//                       }
//                     }}
//                     className="btn btn--primary w-[120px]"
//                   >
//                     Add
//                   </button>
//                 </div>
//               </div>
//             ) : null}
//             {teamMembers?.length > 0 ? (
//               <>
//                 <label className="field-label">Team Members</label>
//                 {teamMembers?.map((dat, index) => (
//                   <div
//                     key={index}
//                     className="flex flex-row items-center justify-start"
//                   >
//                     <div className="flex flex-col item-center justify-start grow">
//                       <h5>{dat.name}</h5>
//                       <p>{dat.phone}</p>
//                     </div>
//                     <div
//                       onClick={() =>
//                         setteamMembers(
//                           teamMembers.filter((dat, ind) => ind !== index)
//                         )
//                       }
//                       className="flex flex-col item-center justify-start"
//                     >
//                       <img
//                         style={{
//                           width: "30px",
//                           height: "25px",
//                           objectFit: "contain",
//                         }}
//                         src={trash}
//                         alt="trash"
//                       />
//                     </div>
//                   </div>
//                 ))}
//               </>
//             ) : null}
//             <div className="flex flex-col items-center gap-6 mt-4 mb-10">
//               <button type="submit" className="btn btn--primary w-full">
//                 Upload
//               </button>
//             </div>
//           </form>
//         </Spring>
//       </div>
//     </>
//   );
// };

// export default AddEmployUsers;





import React, { useState } from "react";
import PageHeader from "../layout/PageHeader";
import Spring from "../components/Spring";
import PasswordInput from "../components/PasswordInput";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { toast } from "react-toastify";
import trash from "../assets/icons/trash.svg";
import { postData } from "../db/databaseFunction";

const AddEmployUsers = () => {
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    phone: "",
    password: "",
    role: "",
    cityName: "",
    longitude: 0,
    latitude: 0,
    teamName: "",
  });
  const [teamInfo, setteamInfo] = useState({ name: "", phone: "+966" }); // Default phone number prefix
  const [teamMembers, setteamMembers] = useState([]);
  const [locationString, setlocationString] = useState("");

  const handleSelect = (address) => {
    setlocationString(address);
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        setformData({
          ...formData,
          latitude: latLng.lat,
          longitude: latLng.lng,
        });
      })
      .catch((error) => console.error("Error", error));
  };

  const postEmployToDb = async () => {
    const dataToPost = {
      jobId: "+966" + formData.phone,
      password: formData.password,
      phone: "+966" + formData.phone,
      role: formData.role,
      teamInfo:
        formData.role === "SingleTeam" || formData.role === "SingleDTeam"
          ? {
              cityName: formData.cityName,
              locationCoordinates: {
                latitude: formData.latitude,
                longitude: formData.longitude,
              },
              members: teamMembers.map((dat, index) => {
                return {
                  ...dat,
                  id: formData.teamName + " User " + index,
                  userImage: "",
                };
              }),
              name: formData.teamName,
            }
          : null,
      userImage: "",
    };
    await postData("employ", { ...dataToPost })
      .then(() => {
        toast.success("Employ Created Successfully");
        navigate(-1);
      })
      .catch((e) => toast.error("Error", e));
  };

  const handleAddMember = () => {
    const phoneNumber = teamInfo.phone.startsWith("+966")
      ? teamInfo.phone
      : `+966${teamInfo.phone}`; // Ensure phone number starts with +966
    if (phoneNumber.length > 4) { // Update condition to check for valid phone number length
      setteamMembers([
        ...teamMembers,
        { name: teamInfo.name, phone: phoneNumber },
      ]);
      setteamInfo({ name: "", phone: "+966" }); // Reset phone to default +966
    } else {
      toast.error(
        "Please enter a valid Team Member phone number starting with +966"
      );
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (
      formData.phone.length >= 3 &&
      !formData.phone.includes("+") &&
      !formData.phone.includes("966")
    ) {
      if (formData.password.length >= 4) {
        if (formData.role !== "") {
          if (
            formData.role === "SingleTeam" ||
            formData.role === "SingleDTeam"
          ) {
            if (formData.teamName?.length > 0) {
              if (formData.cityName?.length > 0) {
                if (
                  locationString?.length > 0 &&
                  formData.latitude !== 0 &&
                  formData.longitude !== 0
                ) {
                  postEmployToDb();
                } else {
                  toast.error(
                    "Please enter valid location and choose the option"
                  );
                }
              } else {
                toast.error("Please enter team city name");
              }
            } else {
              toast.error("Please enter valid team name");
            }
          } else {
            await postEmployToDb();
          }
        } else {
          toast.error("Please select the employ role");
        }
      } else {
        toast.error("Please enter at least 4 letters password");
      }
    } else {
      toast.error("Please enter valid phone number without +966");
    }
  };

  return (
    <>
      <PageHeader title="Add Employ" />
      <div className="bg-widget flex items-center justify-center w-full py-10 px-4 lg:p-[60px]">
        <Spring
          className="w-full max-w-[560px]"
          type="slideUp"
          duration={400}
          delay={300}
        >
          <form
            className="mt-5 flex flex-col gap-5"
            onSubmit={handleUpload}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="field-wrapper">
                <label htmlFor="phone" className="field-label">
                  Phone
                </label>
                <input
                  className={classNames("field-input")}
                  required
                  id="phone"
                  type="number"
                  placeholder="Phone without +966"
                  value={formData.phone}
                  onChange={(e) =>
                    setformData({ ...formData, phone: e.target.value })
                  }
                />
              </div>

              <PasswordInput
                id="password"
                placeholder="Your password"
                value={formData.password}
                onChange={(e) =>
                  setformData({ ...formData, password: e.target.value })
                }
              />
            </div>
            <div className="field-wrapper">
              <label htmlFor="role" className="field-label">
                Role
              </label>

              <select
                className={classNames("field-input")}
                id="role"
                type="text"
                placeholder="Role"
                required
                defaultValue={""}
                value={formData.role}
                onChange={(e) =>
                  setformData({ ...formData, role: e.target.value })
                }
              >
                <option value={""}>Select Role</option>
                <option value={"SingleTeam"}>Single Team</option>
                <option value={"SingleDTeam"}>Dedicated Team</option>
                <option value={"supervisor"}>Supervisor</option>
              </select>
            </div>
            {formData.role === "SingleTeam" ||
            formData.role === "SingleDTeam" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="field-wrapper">
                  <label htmlFor="teamName" className="field-label">
                    Team Name
                  </label>
                  <input
                    required
                    className={classNames("field-input")}
                    id="teamName"
                    type="text"
                    placeholder="Team Name"
                    value={formData.teamName}
                    onChange={(e) =>
                      setformData({ ...formData, teamName: e.target.value })
                    }
                  />
                </div>
                <div className="field-wrapper">
                  <label htmlFor="cityname" className="field-label">
                    Team City Name
                  </label>
                  <input
                    required
                    className={classNames("field-input")}
                    id="cityname"
                    type="text"
                    placeholder="Team City Name"
                    value={formData.cityName}
                    onChange={(e) =>
                      setformData({ ...formData, cityName: e.target.value })
                    }
                  />
                </div>
              </div>
            ) : null}

            {formData.role === "SingleTeam" ||
            formData.role === "SingleDTeam" ? (
              <PlacesAutocomplete
                value={locationString}
                onChange={(e) => setlocationString(e)}
                onSelect={handleSelect}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                }) => (
                  <div className="field-wrapper">
                    <label htmlFor="location" className="field-label">
                      Location
                    </label>
                    <input
                      id="location"
                      {...getInputProps({
                        placeholder: "Exact location of office",
                        className: "field-input",
                      })}
                      required
                    />
                    <div className="autocomplete-dropdown-container">
                      {loading && <div>Loading...</div>}
                      {suggestions.map((suggestion) => {
                        const className = `suggestion-item ${
                          suggestion.active ? "suggestion-item--active" : ""
                        }`;
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                            })}
                          >
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
            ) : null}
            {formData.role === "SingleTeam" ||
            formData.role === "SingleDTeam" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="field-wrapper">
                  <label htmlFor="teamMemberName" className="field-label">
                    Team Member Name
                  </label>
                  <input
                    className={classNames("field-input")}
                    id="teamMemberName"
                    type="text"
                    placeholder="Member Name"
                    value={teamInfo.name}
                    onChange={(e) =>
                      setteamInfo({ ...teamInfo, name: e.target.value })
                    }
                  />
                </div>
                <div className="field-wrapper">
                  <label htmlFor="memberPhone" className="field-label">
                    Team Member Phone
                  </label>
                  <input
                    className={classNames("field-input")}
                    id="memberPhone"
                    type="text"
                    placeholder="Full Member Phone"
                    value={teamInfo.phone}
                    onChange={(e) =>
                      setteamInfo({ ...teamInfo, phone: e.target.value })
                    }
                  />
                </div>
                <div className="field-wrapper">
                  <button
                    onClick={handleAddMember}
                    type="button"
                    className="btn btn--primary w-[120px]"
                  >
                    Add
                  </button>
                </div>
              </div>
            ) : null}
            {teamMembers.length > 0 ? (
              <>
                <label className="field-label">Team Members</label>
                {teamMembers.map((dat, index) => (
                  <div
                    key={index}
                    className="flex flex-row items-center justify-start"
                  >
                    <div className="flex flex-col item-center justify-start grow">
                      <h5>{dat.name}</h5>
                      <p>{dat.phone}</p>
                    </div>
                    <div
                      onClick={() =>
                        setteamMembers(
                          teamMembers.filter((dat, ind) => ind !== index)
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
                ))}
              </>
            ) : null}
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

export default AddEmployUsers;
