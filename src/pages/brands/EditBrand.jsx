/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { FaX } from "react-icons/fa6";

import { toast } from "react-toastify";
import { useEditBrandMutation } from "../../services/adminApi";

const EditBrand = ({ item, updateBrands, setEditModal }) => {
  const [title, setTitle] = useState('');
  const [picture, setPicture] = useState(null);

  const [EditBrand, { isLoading }] = useEditBrandMutation();

  useEffect(() => {
    if (item) {
      setTitle(item?.title || '');
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
    formData.append("title", title);
    if (picture) {
      formData.append("images", picture);
    }

    try {
      await EditBrand({ id: item?.id, formData }).unwrap();
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
          <h1 className="text-2xl font-medium">Edit Brand</h1>
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
            <label htmlFor="en">Name (EN)</label>
            <input
              id="en"
              name="en"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 outline-none w-full py-1 px-4 rounded border-solid border-2 border-gray-200 
                         hover:border-blue-400 hover:shadow-md hover:shadow-blue-300"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="rasm">Image</label>
            <input
              id="rasm"
              name="rasm"
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={(e) => setPicture(e.target.files[0])}
              className="mt-2 outline-none rounded border-solid border-2 border-gray-200 
                         hover:border-blue-400 hover:shadow-md hover:shadow-blue-300"
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

export default EditBrand;
