/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { FaX } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useEditModelMutation } from "../../services/adminApi";

const EditModal = ({ item, updateBrands, setEditModal }) => {
  const [name, setName] = useState('');
  const [brand_title, setBrand_Title] = useState('');

  const [editModel, { isLoading }] = useEditModelMutation();

  useEffect(() => {
    if (item) {
      setName(item?.name || '');
      setBrand_Title(item?.brand_title || '');
      // Optionally set the picture if needed
    }
  }, [item]);

  const handleCancelModal = () => {
    setEditModal(false);
  };

  const handleXModal = () => {
    setEditModal(false);
  };

  const handleEditBrand = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("brand_title", brand_title);
    

    try {
      await editModel({ id: item?.id, formData }).unwrap();
      toast.success("Category edited successfully!");
      setEditModal(false);
      updateBrands();
    } catch (error) {
      console.error("Failed to edit category:", error);
      toast.error("Failed to edit category.");
      setEditModal(false);
    }
  };

  return (
    <div className="w-full h-svh flex items-center justify-center top-0 left-0 inset-0 fixed z-10 bg-[#0000004D]">
      <div className="bg-white rounded text-black w-[30rem] px-8 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-medium">Edit Model</h1>
          <button
            onClick={handleXModal}
            className="hover:bg-gray-300 px-3 py-2 rounded duration-200 transition-all"
          >
            <FaX />
          </button>
        </div>

        <form
          onSubmit={handleEditBrand}
          className="flex flex-col gap-8 mt-6 px-4 pb-4"
        >
          <div>
            <label htmlFor="en">Modal Name</label>
            <input
              id="en"
              name="en"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 outline-none w-full py-1 px-4 rounded border-solid border-2 border-gray-200 
                         hover:border-blue-400 hover:shadow-md hover:shadow-blue-300"
              required
            />
          </div>

          <div>
            <label htmlFor="ru">Brand Name</label>
            <input
              id="ru"
              name="ru"
              type="text"
              value={brand_title}
              onChange={(e) => setBrand_Title(e.target.value)}
              className="mt-2 outline-none w-full py-1 px-4 rounded border-solid border-2 border-gray-200 
                         hover:border-blue-400 hover:shadow-md hover:shadow-blue-300"
              required
            />
          </div>


          <div className="duration-200 transition-all text-right">
            <button
              type="button"
              onClick={handleCancelModal}
              className="py-0.5 px-4 rounded border-solid border-2 border-gray-300 
                         hover:border-blue-400 hover:text-blue-400 duration-300 transition-all"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="ml-4 py-1 px-4 rounded bg-blue-500 hover:bg-blue-400 
                         text-white duration-300 transition-all"
            >
              {isLoading ? "Editing..." : "Edit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
