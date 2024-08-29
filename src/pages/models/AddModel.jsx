/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaX } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useAddModelsMutation,   useGetModelsDetailsQuery  } from "../../services/adminApi";

const AddModel = ({ setAddModal,updateBrands }) => {
  const [name, setName] = useState('');
  const [brand_id, setBrand_Id] = useState();
  const [addModels, { isLoading }] = useAddModelsMutation();
  const {data:info} = useGetModelsDetailsQuery();

  const handleChangeBrandTitle = (event)=>{
    const selectedValue = event?.target?.value;
    setBrand_Id(selectedValue)
  }

  const handleCancelModal = () => {
    setAddModal(false);
  };

  const handleXModal = () => {
    setAddModal(false);
  };

  const handleAddNewBrand = async (event) => {
    event.preventDefault();
    // const payload = { name, brand_title };
    
    // console.log("Payload to be sent:", payload); // Log the payload to check the values
    
    const formData = new FormData();
    formData.append("name", name);
    formData.append("brand_id", brand_id);
    console.log("Submitting data:", { name, brand_id });
    console.log("formdatada nima keldi:",formData);
    
    
    // Construct the payload
    // const payload = { name, brand_title };
    // console.log("Payload to be sent:", payload);


    try {
        const response = await addModels( formData).unwrap();
      toast.success(response?.message || "Model added successfully!");
      setAddModal(false);
      setName('');
      setBrand_Id('');
      updateBrands(); // Update the list of brands
    } catch (error) {
      console.error("Failed to add model:", error);
      toast.error(error?.data?.message || "Failed to add model.");
    }
  };
  console.log("data keldimi:", info?.data);
  

  return (
    <div className="bg-white rounded text-black w-[30rem] px-8 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium">Add Model</h1>
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
          <label htmlFor="name">Modal Name</label>
          <input
            id="name"
            name='name'
            type="text"
            value={name}
            onChange={(e) => setName(e?.target?.value)}
            className="mt-2 outline-none w-full py-1 px-4 rounded border-solid border-2 border-gray-200 
                       hover:border-blue-400 hover:shadow-md hover:shadow-blue-300"
            required
          />
        </div>

        <div>
          <label htmlFor='brand_title'>Brand Name</label>
          <select
            id="brand_title"
            onChange={handleChangeBrandTitle}
            value={brand_id}
            className="mt-2 outline-none w-full py-1 px-4 rounded border-solid border-2 border-gray-200 
                       hover:border-blue-400 hover:shadow-md hover:shadow-blue-300"
            required
          >
            <option value="">Select a brand</option>
            {info?.data?.map((item, index) => (
              <option value={item?.brand_id} key={index}>{item?.brand_title}</option>
            ))}
          </select>
          
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

export default AddModel;
