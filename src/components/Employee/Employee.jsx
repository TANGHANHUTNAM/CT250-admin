// import React from "react";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import Avatar from "../avatar/Avatar";
// import { FaPhoneAlt } from "react-icons/fa";
// import { HiMail } from "react-icons/hi";

// const Employee = ({ employee, onEdit, onDelete }) => {
//   return (
//     <tr className="bg-white border-b hover:bg-gray-100 transition !items-center">
//       {/* Avatar */}
//       <td className="px-4 py-3">
//         <Avatar size={48} src={employee.avatar.url} className="rounded-full" />
//       </td>

//       {/* Employee Info */}
//       <td className="px-4 py-3 !align-middle">
//         <p className="text-lg font-semibold">{employee.username}</p>
//       </td>

//       {/* Role */}
//       <td className="px-4 py-3 !align-middle">
//         <span className="truncate">{employee.role}</span>
//       </td>

//       {/* Email */}
//       <td className="px-4 py-3 !align-middle">
//         <div className="flex items-center">
//           <span className="truncate">{employee.email}</span>
//         </div>
//       </td>

//       {/* Phone */}
//       <td className="px-4 py-3 !align-middle">
//         <div className="flex items-center">          
//           <span>{employee.phoneNumber}</span>
//         </div>
//       </td>

//       {/* Action Buttons */}
//       <td className="px-4 py-3 !align-middle">
//         <div className="flex gap-4">
//           <button
//             className="flex items-center bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition"
//             onClick={() => onEdit(employee._id.$oid)}
//           >Edit
//           </button>
//           <button
//             className="flex items-center bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
//             onClick={() => onDelete(employee._id.$oid)}
//           >Delete
//           </button>
//         </div>
//       </td>
//     </tr>
//   );
// };

// export default Employee;
