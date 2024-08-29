/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { FaX } from "react-icons/fa6";
import { useEditCarMutation, useGetBrandsDetailsQuery, useGetCityDetailsQuery, useGetLocationDetailsQuery, useGetModelsDetailsQuery} from "../../services/adminApi";
import { toast } from "react-toastify";

const EditCars = ({ item, updateBrands, setEditModal }) => {
  const [brand_id, setBrand_Id] = useState('');
  const [color, setColor] = useState('');
  const [model_id, setModel_Id] = useState('');
  const [city_id, setCity_Id] = useState('');
  const [location_id, setLocation_id] = useState('');

  const [editCar, { isLoading }] = useEditCarMutation();
  const { data: brand } = useGetBrandsDetailsQuery();
  const { data: models } = useGetModelsDetailsQuery();
  const { data: locations } = useGetLocationDetailsQuery();
  const { data: cities } = useGetCityDetailsQuery();


  useEffect(() => {
    if (item) {
      setBrand_Id(item?.brand?.id || '');
      // setTitle(item?.title || '');
      setModel_Id(item?.model?.id || '');
      setCity_Id(item?.city?.id || '');
      setColor(item?.color || '');
      setLocation_id(item?.location?.id || '');

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
    formData.append("brand_id", brand_id);
    formData.append("model_id", model_id);
    formData.append("color", color);
    formData.append("city_id", city_id);
    formData.append("location_id", location_id);

    console.log("FormData being sent:", [...formData.entries()]);
    

    try {
     await editCar({ id: item?.id, formData }).unwrap();
      // console.log("API Response:", response);
      toast.success("Car edited successfully!");
      setEditModal(false);
      updateBrands();
    } catch (error) {
      console.error("Failed to edit car:", error);
      toast.error("Failed to edit car.");
      setEditModal(false);
    }
    console.log("Nimaga");
    
  };

  return (
    <div className="w-full h-svh flex items-center justify-center top-0 left-0 inset-0 fixed z-10 bg-[#0000004D]">
      <div className="bg-white rounded text-black w-[30rem] px-8 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-medium">Edit Car</h1>
          <button
            onClick={handleXModal}
            className="hover:bg-gray-300 px-3 py-2 rounded duration-200 transition-all"
          >
            <FaX />
          </button>
        </div>

        <form
          onSubmit={handleEditBrand}
          className="flex flex-col gap-5   mt-6 px-4 pb-4"
        >
          {/* Brand */}

        <div>
          <label htmlFor="brand_title">Brand</label>
          <select
            id="brand_title"
            onChange={(e) => setBrand_Id(e.target.value)}
            value={brand_id}
            className="mt-2 outline-none w-full py-1 px-4 rounded border-solid border-2 border-gray-200 hover:border-blue-400 hover:shadow-md hover:shadow-blue-300"
            required
            name="brand_title"
          >
          
            {brand?.data?.map((item, index) => (
              <option

                value={item?.id} key={index}>{item?.title}</option>
            ))}
          </select>
        </div>

         {/* Model */}

         <div>
          <label htmlFor="model_title">Model</label>
          <select
            id="model_title"
            onChange={(e) => setModel_Id(e.target.value)}
            value={model_id}
            className="mt-2 outline-none w-full py-1 px-4 rounded border-solid border-2 border-gray-200 hover:border-blue-400 hover:shadow-md hover:shadow-blue-300"
            required
            name="model_title"
          >
          
            {models?.data?.map((item, index) => (
              <option value={item?.id} key={index}>{item?.name}</option>
            ))}
          </select>
        </div>

            {/* City */}
        <div>
          <label htmlFor="city_title">City</label>
          <select
            id="city_title"
            onChange={(e) => setCity_Id(e.target.value)}
            value={city_id}
            className="mt-2 outline-none w-full py-1 px-4 rounded border-solid border-2 border-gray-200 hover:border-blue-400 hover:shadow-md hover:shadow-blue-300"
            required
            name="city_title"
          >
            
            {cities?.data?.map((item, index) => (
              <option value={item?.id} key={index}>{item?.name}</option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location_title">Location</label>
          <select
            id="location_title"
            onChange={(e) => setLocation_id(e.target.value)}
            value={location_id}
            className="mt-2 outline-none w-full py-1 px-4 rounded border-solid border-2 border-gray-200 hover:border-blue-400 hover:shadow-md hover:shadow-blue-300"
            required
            name="location_title"
          >
           
            {locations?.data?.map((item, index) => (
              <option value={item?.id} key={index}>{item?.name}</option>
            ))}
          </select>
        </div>

        {/* Color */}
        <div>
          <label htmlFor="color">Color</label>
          <input
            id="color"
            name="color"
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="mt-2 outline-none w-full py-1 px-4 rounded border-solid border-2 border-gray-200 hover:border-blue-400 hover:shadow-md hover:shadow-blue-300"
            required
          />
        </div>

          {/* <div>
            <label htmlFor="ru">Name </label>
            <input
              id="ru"
              name="ru"
              type="text"
              value={model_id}
              onChange={(e) => setModel_Id(e.target.value)}
              className="mt-2 outline-none w-full py-1 px-4 rounded border-solid border-2 border-gray-200 
                         hover:border-blue-400 hover:shadow-md hover:shadow-blue-300"
              required
            />
          </div> */}

          

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

export default EditCars;
