/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaX } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useAddBrandsMutation } from "../../services/adminApi";

const AddBrands = ({ setAddModal,updateBrands }) => {
  const [title, setTitle] = useState('');
  const [picture, setPicture] = useState(null);

  const [AddBrand, { isLoading }] = useAddBrandsMutation();

  const handleCancelModal = () => {
    setAddModal(false);
  };

  const handleXModal = () => {
    setAddModal(false);
  };

  const handleAddNewBrand = async (event) => {
    event.preventDefault();

    // Check if a picture has been selected
    if (!picture) {
      toast.error("Please select an image file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("images", picture); // Use 'image' as per the API requirement

    try {
      const response = await AddBrand(formData).unwrap();
      toast.success(response?.message || "Category added successfully!");
      setAddModal(false);
      setTitle('');
      setPicture(null);
      updateBrands(); // Update the list of brands
    } catch (error) {
      console.error("Failed to add category:", error);
      toast.error(error?.data?.message || "Failed to add category.");
    }
  };

  return (
    <div className="bg-white rounded text-black w-[30rem] px-8 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium">Add Brand</h1>
        <button
          onClick={handleXModal}
          className="hover:bg-gray-300 px-3 py-2 rounded duration-200 transition-all"
        >
          <FaX />
        </button>
      </div>

      <form
        onSubmit={handleAddNewBrand}
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
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBrands;
