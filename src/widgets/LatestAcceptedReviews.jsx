// // components
// import Spring from "../components/Spring";
// //import Select from "../ui/Select";
// import Review from "../components/Review";
// import Pagination from "../ui/Pagination";

// // hooks
// //import { useState } from "react";
// import usePagination from "../hooks/usePagination";

// // constants
// //import { REVIEW_SORT_OPTIONS } from "../constants/options";

// // data placeholder
// //import reviews from "../db/reviews";
// import { useSelector } from "react-redux";

// const LatestAcceptedReviews = () => {
//   const { clientReviewsWeb } = useSelector((state) => state.project);

//   const pagination = usePagination(clientReviewsWeb, 4);

//   return (
//     <Spring className="flex flex-1 flex-col gap-[26px]">
//       <div className="card !p-0 flex-1">
//         <span className="block h-[1px] bg-input-border opacity-60" />
//         <div>
//           {pagination.currentItems().map((review, index) => (
//             <Review key={`${review.dbId}`} data={review} index={index} />
//           ))}
//         </div>
//       </div>
//       {pagination.maxPage > 1 && <Pagination pagination={pagination} />}
//     </Spring>
//   );
// };

// export default LatestAcceptedReviews;
