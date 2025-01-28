// import React, { useState, useEffect, useRef } from "react";

// const MultiSelectDropdown = ({
//   options,
//   selectedOptions,
//   setSelectedOptions,
//   keyExtractor,
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const dropdownRef = useRef(null);

//   const toggleDropdown = () => setIsOpen((prevState) => !prevState);

//   const handleOptionToggle = (option) => {
//     if (
//       selectedOptions.some(
//         (selected) => keyExtractor(selected) === keyExtractor(option)
//       )
//     ) {
//       // If already selected, remove from selectedOptions
//       setSelectedOptions(
//         selectedOptions.filter(
//           (selected) => keyExtractor(selected) !== keyExtractor(option)
//         )
//       );
//     } else {
//       // Otherwise, add to selectedOptions
//       setSelectedOptions([...selectedOptions, option]);
//     }
//   };

//   const isOptionSelected = (option) =>
//     selectedOptions.some(
//       (selected) => keyExtractor(selected) === keyExtractor(option)
//     );

//   const handleSelectAll = () => {
//     if (selectedOptions.length === options.length) {
//       // If all are selected, deselect all
//       setSelectedOptions([]);
//     } else {
//       // Otherwise, select all
//       setSelectedOptions(options);
//     }
//   };

//   const handleSearch = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const filteredOptions = options.filter((option) =>
//     `${option.carCompany} ${option.carName} ${option.carModal}`
//       .toLowerCase()
//       .includes(searchQuery.toLowerCase())
//   );

//   useEffect(() => {
//     const closeDropdown = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("click", closeDropdown);

//     return () => {
//       document.removeEventListener("click", closeDropdown);
//     };
//   }, []);

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <button
//         type="button"
//         className="field-input bg-[#00193b] text-white border border-gray-300 rounded p-2 w-full text-left flex justify-between items-center"
//         onClick={toggleDropdown}
//       >
//         <span>
//           {selectedOptions.length > 0
//             ? `${selectedOptions.length} Vehicles Selected`
//             : "Select Vehicles"}
//         </span>
//         <svg
//           className={`w-4 h-4 transform transition-transform ${
//             isOpen ? "rotate-180" : ""
//           }`}
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M19 9l-7 7-7-7"
//           />
//         </svg>
//       </button>
//       {isOpen && (
//         <div className="absolute left-0 right-0 max-h-64 overflow-y-auto border border-gray-300 rounded bg-[#00193b] z-10 text-white">
//           <div className="p-2">
//             <input
//               type="text"
//               placeholder="Search Vehicles..."
//               value={searchQuery}
//               onChange={handleSearch}
//               className="w-full p-2 rounded text-black"
//             />
//           </div>
//           <ul>
//             <li className="p-2 border-b border-gray-300 hover:bg-gray-700 cursor-pointer">
//               <label className="flex items-center">
//                 <input
//                   type="checkbox"
//                   checked={selectedOptions.length === options.length}
//                   onChange={handleSelectAll}
//                   className="mr-2"
//                 />
//                 Select All
//               </label>
//             </li>
//             {filteredOptions.map((option) => (
//               <li
//                 key={keyExtractor(option)}
//                 className="p-2 border-b border-gray-300 hover:bg-gray-700 cursor-pointer"
//               >
//                 <label className="flex items-center">
//                   <input
//                     type="checkbox"
//                     checked={isOptionSelected(option)}
//                     onChange={() => handleOptionToggle(option)}
//                     className="mr-2"
//                   />
//                   {`${option.carCompany} ${option.carName} ${option.carModal}`}
//                 </label>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MultiSelectDropdown;


import React, { useState, useEffect, useRef } from "react";

const MultiSelectDropdown = ({
  options,
  selectedOptions,
  setSelectedOptions,
  keyExtractor,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen((prevState) => !prevState);

  const handleOptionToggle = (option) => {
    if (
      selectedOptions.some(
        (selected) => keyExtractor(selected) === keyExtractor(option)
      )
    ) {
      // If already selected, remove from selectedOptions
      setSelectedOptions(
        selectedOptions.filter(
          (selected) => keyExtractor(selected) !== keyExtractor(option)
        )
      );
    } else {
      // Otherwise, add to selectedOptions
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const isOptionSelected = (option) =>
    selectedOptions.some(
      (selected) => keyExtractor(selected) === keyExtractor(option)
    );

    const handleSelectAll = () => {
      if (
        filteredOptions.every((option) =>
          selectedOptions.some(
            (selected) => keyExtractor(selected) === keyExtractor(option)
          )
        )
      ) {
        // If all filtered options are selected, deselect them
        const remainingSelectedOptions = selectedOptions.filter(
          (selected) =>
            !filteredOptions.some(
              (option) => keyExtractor(selected) === keyExtractor(option)
            )
        );
        setSelectedOptions(remainingSelectedOptions);
      } else {
        // Otherwise, select all filtered options
        const allFilteredProductIds = filteredOptions.map((option) => option);
        setSelectedOptions(allFilteredProductIds);
      }
    };
    

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredOptions = options.filter((option) =>
    `${option.carCompany} ${option.carName} ${option.carModal}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const closeDropdown = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", closeDropdown);

    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="field-input bg-[#00193b] text-white border border-gray-300 rounded p-2 w-full text-left flex justify-between items-center"
        onClick={toggleDropdown}
      >
        <span>
          {selectedOptions.length > 0
            ? `${selectedOptions.length} Vehicles Selected`
            : "Select Vehicles"}
        </span>
        <svg
          className={`w-4 h-4 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute left-0 right-0 max-h-64 overflow-y-auto border border-gray-300 rounded bg-[#00193b] z-10 text-white">
          <div className="p-2">
            <input
              type="text"
              placeholder="Search Vehicles..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full p-2 rounded text-black"
            />
          </div>
          <ul>
            <li className="p-2 border-b border-gray-300 hover:bg-gray-700 cursor-pointer">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={
                    filteredOptions.length > 0 &&
                    filteredOptions.every((option) =>
                      selectedOptions.some(
                        (selected) =>
                          keyExtractor(selected) === keyExtractor(option)
                      )
                    )
                  }
                  onChange={handleSelectAll}
                  className="mr-2"
                />
                Select All
              </label>
            </li>
            {filteredOptions.map((option) => (
              <li
                key={keyExtractor(option)}
                className="p-2 border-b border-gray-300 hover:bg-gray-700 cursor-pointer"
              >
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={isOptionSelected(option)}
                    onChange={() => handleOptionToggle(option)}
                    className="mr-2"
                  />
                  {`${option.carCompany} ${option.carName} ${option.carModal}`}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
