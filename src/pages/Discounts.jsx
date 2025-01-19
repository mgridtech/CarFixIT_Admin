import React from 'react';
import PageHeader from "../layout/PageHeader";
import DiscountTable from "../widgets/DiscountTable";

function Discounts() {
  return (
    <>
      <PageHeader title="Discount Management" />
      <DiscountTable />
    </>
  );
}

export default Discounts;



// import React from 'react';
// import PageHeader from "../layout/PageHeader";

// function Discounts() {
//   return (
//     <>
//       <PageHeader title="Discount Management" />

//       <div className="flex items-center justify-center min-h-screen bg-gray-100">
//         <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full text-center">
//           <h1 className="text-3xl font-bold text-gray-800 mb-4">Coming Soon...</h1>
//           <p className="text-lg text-gray-600 mb-6">
//             This page is currently under construction. We're working hard to bring you this feature. Stay tuned!
//           </p>
//           <div className="flex justify-center gap-4">
//             <a href="/" className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition">
//               Go Back Home
//             </a>
//             <button
//               onClick={() => window.location.reload()}
//               className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg shadow hover:bg-gray-400 transition"
//             >
//               Refresh
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Discounts;
