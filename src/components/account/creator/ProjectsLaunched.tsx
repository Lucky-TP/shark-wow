// import { useState, useEffect } from "react"
// import { ChevronDown } from "lucide-react"




// export default function ProjectsDrafted() {
//   const [projectStatus, setProjectStatus] = useState("launched")
//   const [isOpen, setIsOpen] = useState(false)

//   const handleStatusChange = (newStatus: string) => {
//     setProjectStatus(newStatus)
//     setIsOpen(false)
    
//     if (typeof window !== 'undefined') {
//       if (newStatus === "drafted") {
//         window.location.href = "/creator/projects/drafted"
//       } else if (newStatus === "end") {
//         window.location.href = "/creator/projects/end"
//       }
//     }
//   }

//   return (
//     <div className=" mx-auto p-6 ">
//       <div className="relative mb-6">
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="text-4xl font-bold flex items-center focus:outline-none"
//         >
//           Project {projectStatus.charAt(0).toUpperCase() + projectStatus.slice(1)}
//           <ChevronDown className="ml-2 h-8 w-8" />
//         </button>
//         {isOpen && (
//           <div className="absolute top-full left-0 mt-2 w-[180px] bg-[#FB923C] border-none rounded-md shadow-lg">
//             <button
//               className="block w-full text-left px-4 py-2 hover:bg-orange-500"
//               onClick={() => handleStatusChange("launched")}
//             >
//               Launched
//             </button>
//             <button
//               className="block w-full text-left px-4 py-2 hover:bg-orange-500"
//               onClick={() => handleStatusChange("drafted")}
//             >
//               Drafted
//             </button>
//             <button
//               className="block w-full text-left px-4 py-2 hover:bg-orange-500"
//               onClick={() => handleStatusChange("end")}
//             >
//               End
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }