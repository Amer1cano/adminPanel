/* eslint-disable react/prop-types */

import { useState } from "react"
import { RiErrorWarningFill } from "react-icons/ri";
import { toast } from 'react-toastify';
import EditModal from "./EditModal";
import { useDeleteModelMutation } from "../../services/adminApi";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";


const CardModel = ({item,updateBrands}) => {
    const [warning, setWarning] = useState(false);
    const [deleteModel] = useDeleteModelMutation();
    const [editModal, setEditModal] = useState(false)

    const handleDelete = ()=>{
        setWarning(!warning)
    }
    const handleNoFunction = ()=>{
        setWarning(false)
    }
    const handleYesDelete = async () => {
        try {
          await deleteModel(item?.id).unwrap();
          toast.success("Category deleted successfully!");
          updateBrands();
          setWarning(false)
        } catch (error) {
          console.error("Failed to delete category:", error);
          toast.error("Failed to delete category.");
          setWarning(false)
        }
      };

  return (
    
          <tr className="bg-gray-100 hover:bg-gray-200">
            <td className="py-3 px-4 border-b border-gray-300">{item?.name}</td>
            <td className="py-3 px-4 border-b border-gray-300">{item?.brand_title}</td>
            <td className="py-3 px-4 border-b border-gray-300">
                <div>
                {warning && (
        <div className="fixed z-10 bg-white p-4 rounded-xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg">
          <div className="flex items-center gap-2 font-medium">
            <RiErrorWarningFill className="text-yellow-400" />
            <h1>Delete the task</h1>
          </div>
          <p className="mt-2">Are you sure you want to delete this task?</p>
          <div className="text-right mt-4">
            <button 
              className="px-3 py-1 border-2 rounded border-gray-300 hover:bg-gray-100"
              onClick={handleNoFunction}
            >
              No
            </button>
            <button 
              className="ml-2 px-3 py-1 bg-blue-500 rounded text-white hover:bg-blue-400"
              onClick={handleYesDelete}
            >
              Yes
            </button>
          </div>
        </div>
      )}
                </div>
                <div className="">
                    {
                        editModal &&
                        <EditModal item={item} setEditModal={setEditModal} updateBrands={updateBrands}/>
                    }
                </div>
                <button onClick={()=>setEditModal(true)} className="py-1 px-3 bg-blue-500 text-white rounded text-xl"><FaEdit /></button>
                <button onClick={()=>handleDelete(item?.id)} className="py-1 ml-4 px-3 bg-red-500 text-white rounded text-xl"><MdDeleteForever /></button>
            </td>
            <td></td>


          </tr>
      
  )
}

export default CardModel