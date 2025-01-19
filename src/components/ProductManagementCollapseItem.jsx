// // components
// import Collapse from "@mui/material/Collapse";
// import { NavLink } from "react-router-dom";
// // import SubmenuTrigger from "@ui/SubmenuTrigger";
// // import { Checkbox } from "antd";
// import trash from "../assets/icons/trash.svg";

// // utils
// import PropTypes from "prop-types";
// import { useState } from "react";
// import ShowDiemensions from "./ShowDiemensions";
// import { removeData } from "../db/databaseFunction";
// import { toast } from "react-toastify";

// const ProductManagementCollapseItem = ({
//   product,
//   activeCollapse,
//   handleCollapse,
// }) => {
//   const [isExpand, setisExpand] = useState(false);
//   const deleteOrder = async (id, refer) => {
//     if (id?.length > 0 && refer?.length > 0) {
//       if (
//         !window.confirm(
//           `Are you sure you want to delete product with id ${id}?`
//         )
//       ) {
//         return;
//       } else {
//         await removeData(refer, id)
//           .then(() => {
//             toast.success("Product Deleted");
//           })
//           .catch((e) => {
//             toast.error(`Error: ${e}`);
//           });
//       }
//     } else {
//       toast.error("Product Id or Type not found");
//     }
//   };
//   return (
//     <div className="card">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-4">
//           {/* <Checkbox /> */}
//           <div className="flex items-center gap-2.5">
//             <h6 className="text-sm">
//               {product?.skuId ? product?.skuId : product?.dbId}
//             </h6>
//           </div>
//         </div>
//         <div className="flex items-center gap-4">
//           <button
//             className={`collapse-btn ${isExpand ? "active" : ""}`}
//             aria-label="Toggle view"
//             onClick={() => setisExpand(!isExpand)}
//           >
//             <i className="icon icon-caret-down-solid" />
//           </button>
//         </div>
//       </div>
//       <Collapse in={isExpand}>
//         <table className="basic-table">
//           <tbody>
//             <tr>
//               <td colSpan={2}>Product</td>
//             </tr>
//             <tr>
//               <td>Product Id</td>
//               <td>{product?.skuId ? product?.skuId : product?.dbId}</td>
//             </tr>
//             <tr>
//               <td>Name:</td>
//               <td>
//                 <span className="inline-block h6 !text-sm">
//                   English: {product?.productNameEng}
//                 </span>
//                 <br />
//                 <span className="inline-block h6 !text-sm">
//                   Arabic: {product?.productNameArab}
//                 </span>
//               </td>
//             </tr>

//             <tr>
//               <td>Price (SAR):</td>
//               <td>
//                 <span className="inline-block h6 !text-sm max-w-[155px]">
//                   Original: {product?.originalPrice}
//                 </span>
//                 <br />
//                 {product?.commercialPrice && (
//                   <span className="inline-block h6 !text-sm max-w-[155px]">
//                     Commercial: {product?.commercialPrice}
//                   </span>
//                 )}
//               </td>
//             </tr>
//             <tr>
//               <td>Type:</td>
//               <td>
//                 {product?.reference === "Oils"
//                   ? "Oil"
//                   : product?.reference === "Filters"
//                   ? "Filter"
//                   : product?.reference === "Tyres"
//                   ? "Tyre"
//                   : product?.reference === "btteries"
//                   ? "Battery"
//                   : product?.reference === "engineOil"
//                   ? "Engine Oil"
//                   : "-"}
//               </td>
//             </tr>
//             <tr>
//               <td>Warenty:</td>
//               <td>{product?.warenty ? product?.warenty : 0}</td>
//             </tr>
//             <tr>
//               <td>Diemensions:</td>
//               <td>
//                 {product?.productDiemensions?.length > 0 ? (
//                   <ShowDiemensions dim={product.productDiemensions} />
//                 ) : (
//                   "-"
//                 )}
//               </td>
//             </tr>
//             <tr>
//               <td>Actions:</td>
//               <td>
//                 <div className="flex items-center justify-evenly gap-11">
//                   <NavLink
//                     to={`/editProduct/${product.dbId}/${product.reference}`}
//                     aria-label="Edit"
//                   >
//                     <i className="icon icon-pen-to-square-regular text-lg leading-none" />
//                   </NavLink>
//                   <button
//                     onClick={() => deleteOrder(product.dbId, product.reference)}
//                     to="#"
//                     aria-label="Edit"
//                   >
//                     <img src={trash} alt="trash" />
//                   </button>
//                   {/* <SubmenuTrigger /> */}
//                 </div>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </Collapse>
//     </div>
//   );
// };

// ProductManagementCollapseItem.propTypes = {
//   product: PropTypes.object.isRequired,
//   activeCollapse: PropTypes.string.isRequired,
//   handleCollapse: PropTypes.func.isRequired,
// };

// export default ProductManagementCollapseItem;
